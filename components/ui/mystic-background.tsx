"use client";

import { useEffect, useRef, useState } from "react";

/* ── GLSL source ──────────────────────────────────────────────────────────── */

const VERT_SRC = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

/**
 * Mystic Vortex nebula — Quilez-style domain-warped FBM.
 *
 * Palette
 *   #0A0A0C  — deep black base
 *   #6B21A8  — neon purple wisps (edges + centre glow)
 *   #2563EB  — electric blue highlights (noise peaks)
 *
 * Kept deliberately dark and slow so the background never fights
 * the foreground content.
 */
const FRAG_SRC = `
precision mediump float;

uniform float u_time;
uniform vec2  u_res;

/* --- Gradient noise kernel ---------------------------------------- */
vec2 h2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453);
}

float gn(vec2 p) {
  vec2 i = floor(p), f = fract(p), u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(dot(h2(i          ), f          ),
        dot(h2(i+vec2(1,0)), f-vec2(1,0)), u.x),
    mix(dot(h2(i+vec2(0,1)), f-vec2(0,1)),
        dot(h2(i+vec2(1,1)), f-vec2(1,1)), u.x),
    u.y
  );
}

/* --- Fractional Brownian Motion (5 octaves) ----------------------- */
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * gn(p);
    p  = p * 2.07 + vec2(1.3, 0.7);
    a *= 0.5;
  }
  return v;
}

void main() {
  /* Centred, aspect-corrected UVs */
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_res) / min(u_res.x, u_res.y);
  float t  = u_time * 0.030;           /* very slow drift             */

  /* --- Quilez two-level domain warping ----------------------------- */
  vec2 q = vec2(
    fbm(uv * 1.4  + t * 0.42),
    fbm(uv * 1.4  + vec2(5.2, 1.3) + t * 0.37)
  );
  vec2 r = vec2(
    fbm(uv + q + vec2(1.7, 9.2) + 0.16 * t),
    fbm(uv + q + vec2(8.3, 2.8) + 0.13 * t)
  );

  float f = clamp(fbm(uv + 1.3 * r) * 0.5 + 0.5, 0.0, 1.0);
  float d = length(uv);                /* distance from centre        */

  /* --- Brand palette (linear sRGB) --------------------------------- */
  vec3 dark   = vec3(0.0392, 0.0392, 0.0471); /* #0A0A0C               */
  vec3 purple = vec3(0.4196, 0.1294, 0.6588); /* #6B21A8               */
  vec3 blue   = vec3(0.1451, 0.3882, 0.9216); /* #2563EB               */

  /* Purple mist — mid-range noise, weighted away from centre */
  float pm = smoothstep(0.34, 0.68, f) * 0.34
           * (0.5 + 0.5 * smoothstep(0.10, 0.90, d));

  /* Blue highlight — noise peaks, slightly stronger near centre */
  float bm = smoothstep(0.56, 0.84, f) * 0.24
           * (1.0 - 0.40 * smoothstep(0.0, 0.55, d));

  /* Slow breath — ~57 s period */
  float breath = 0.5 + 0.5 * sin(u_time * 0.11);

  vec3 col = dark;
  col = mix(col, purple, pm);
  col = mix(col, blue,   bm);
  col += purple * exp(-d * d * 2.5) * 0.14;             /* vortex glow  */
  col += blue   * exp(-d * d * 3.4) * 0.06;             /* cold core    */
  col += purple * breath * 0.024 * smoothstep(0.48, 1.0, f); /* pulse */
  col  = mix(col, dark, 0.22);                          /* keep readable */

  gl_FragColor = vec4(col, 1.0);
}`;

/* ── WebGL helpers ────────────────────────────────────────────────────────── */

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  src: string
): WebGLShader | null {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    if (process.env.NODE_ENV !== "production")
      console.error("[MysticBg] shader:", gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

function createProgram(gl: WebGLRenderingContext): WebGLProgram | null {
  const vs = compileShader(gl, gl.VERTEX_SHADER, VERT_SRC);
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAG_SRC);
  if (!vs || !fs) return null;

  const prog = gl.createProgram();
  if (!prog) return null;

  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  gl.deleteShader(vs);
  gl.deleteShader(fs);

  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    if (process.env.NODE_ENV !== "production")
      console.error("[MysticBg] link:", gl.getProgramInfoLog(prog));
    gl.deleteProgram(prog);
    return null;
  }
  return prog;
}

/* ── Component ────────────────────────────────────────────────────────────── */

type Mode = "webgl" | "css" | "static";

/**
 * Full-viewport animated background.
 *
 * Layer stack (bottom → top):
 *   1. This canvas / fallback div  → position: fixed, z-index: -10
 *   2. Page content                → z-index: 0 (normal flow)
 *   3. Grain overlay               → position: fixed, z-index: 50
 *
 * Fallback strategy:
 *   prefers-reduced-motion → static multi-stop radial gradient
 *   touch/mobile           → CSS keyframe animated gradients (GPU-light)
 *   WebGL unavailable      → CSS keyframe animated gradients
 *   default (desktop)      → WebGL fragment shader
 */
export function MysticBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<Mode>("webgl");

  useEffect(() => {
    let fallbackRaf: number | null = null;
    const scheduleMode = (nextMode: Mode) => {
      if (fallbackRaf !== null) {
        cancelAnimationFrame(fallbackRaf);
      }

      fallbackRaf = requestAnimationFrame(() => {
        fallbackRaf = null;
        setMode(nextMode);
      });
    };

    /* ── 1. Honour accessibility preference ── */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      scheduleMode("static");
      return () => {
        if (fallbackRaf !== null) {
          cancelAnimationFrame(fallbackRaf);
        }
      };
    }

    /* ── 2. Skip WebGL on touch/mobile to preserve battery ── */
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
      scheduleMode("css");
      return () => {
        if (fallbackRaf !== null) {
          cancelAnimationFrame(fallbackRaf);
        }
      };
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    /* ── 3. Attempt WebGL context ── */
    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    }) as WebGLRenderingContext | null;

    if (!gl) {
      scheduleMode("css");
      return () => {
        if (fallbackRaf !== null) {
          cancelAnimationFrame(fallbackRaf);
        }
      };
    }

    const prog = createProgram(gl);
    if (!prog) {
      scheduleMode("css");
      return () => {
        if (fallbackRaf !== null) {
          cancelAnimationFrame(fallbackRaf);
        }
      };
    }

    /* ── 4. Full-screen quad (triangle strip, 4 vertices) ── */
    const buf = gl.createBuffer();
    if (!buf) {
      scheduleMode("css");
      return () => {
        if (fallbackRaf !== null) {
          cancelAnimationFrame(fallbackRaf);
        }
      };
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1,  1, -1,  -1,  1,  1,  1]),
      gl.STATIC_DRAW
    );

    gl.useProgram(prog);

    const aPos  = gl.getAttribLocation(prog, "a_pos");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uRes  = gl.getUniformLocation(prog, "u_res");

    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    /* ── 5. Responsive canvas size ── */
    const resize = () => {
      // Cap DPR at 1.5 — imperceptible quality loss, significant perf gain
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width  = Math.round(window.innerWidth  * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(document.documentElement);

    /* ── 6. Render loop ── */
    let raf: number;
    let t0: number | null = null;

    const frame = (ts: number) => {
      if (t0 === null) t0 = ts;
      gl.uniform1f(uTime, (ts - t0) / 1000);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);

    /* ── 7. Cleanup ── */
    return () => {
      if (fallbackRaf !== null) {
        cancelAnimationFrame(fallbackRaf);
      }
      cancelAnimationFrame(raf);
      ro.disconnect();
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
    };
  }, []);

  /* ── Static fallback (prefers-reduced-motion) ── */
  if (mode === "static") {
    return (
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 110%, rgba(107,33,168,0.14) 0%, transparent 55%)," +
            "radial-gradient(ellipse 60% 50% at 80% 15%, rgba(37,99,235,0.10) 0%, transparent 55%)," +
            "#0A0A0C",
        }}
      />
    );
  }

  /* ── CSS animated fallback (mobile / no WebGL) ── */
  if (mode === "css") {
    return (
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10 overflow-hidden bg-[#0A0A0C]"
      >
        <div
          className="mystic-a absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 70% at 50% 110%, rgba(107,33,168,0.28) 0%, transparent 55%)",
            willChange: "opacity, transform",
          }}
        />
        <div
          className="mystic-b absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 78% 8%, rgba(37,99,235,0.24) 0%, transparent 55%)",
            willChange: "opacity, transform",
          }}
        />
        <div
          className="mystic-c absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 18% 82%, rgba(107,33,168,0.18) 0%, transparent 50%)",
            willChange: "opacity",
          }}
        />
      </div>
    );
  }

  /* ── WebGL canvas ── */
  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 h-full w-full pointer-events-none"
    />
  );
}
