"use client";

import { useId, useState } from "react";

import { MysticBackground } from "@/components/ui/mystic-background";

type FlowerOfLifeRevealProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
};

type GradientStop = {
  offset: string;
  color: string;
  opacity: number;
};

type GradientPreset = {
  id: string;
  name: string;
  description: string;
  plume: string;
  stops: GradientStop[];
};

type PatternPreset = {
  id: string;
  name: string;
  description: string;
  href: string;
  kind: "tile" | "single";
  preserveAspectRatio: "xMidYMid slice" | "xMidYMid meet";
  previewSize: string;
  previewRepeat: "repeat" | "no-repeat";
};

type ScalePreset = {
  id: string;
  name: string;
  description: string;
  multiplier: number;
};

type MotionPreset = {
  id: string;
  name: string;
  description: string;
  plumeDurationMultiplier: number;
  beamDurationMultiplier: number;
  plumeDelay: number;
  sharpDelay: number;
};

type PatternTuningPreset = {
  presetId: string;
  scaleId: string;
  motionId: string;
  duration: number;
  rotation: number;
  plumeBlur: number;
  maskGlow: number;
  glowGain: number;
  coreOpacity: number;
  travel: number;
  bandWidth: number;
};

type SliderControlProps = {
  label: string;
  valueLabel: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
};

const MASK_VIEWBOX_WIDTH = 1440;
const MASK_VIEWBOX_HEIGHT = 900;

const gradientPresets: GradientPreset[] = [
  {
    id: "current",
    name: "Default",
    description: "O gradiente atual da pagina, com cyan, azul e magenta.",
    plume:
      "linear-gradient(90deg, rgba(10, 10, 12, 0) 0%, rgba(10, 10, 12, 0) 28%, rgba(42, 245, 152, 0.08) 40%, rgba(20, 241, 255, 0.22) 49%, rgba(91, 140, 255, 0.36) 54%, rgba(255, 79, 216, 0.26) 61%, rgba(255, 184, 77, 0.08) 69%, rgba(10, 10, 12, 0) 76%, rgba(10, 10, 12, 0) 100%)",
    stops: [
      { offset: "0%", color: "#0A0A0C", opacity: 0 },
      { offset: "18%", color: "#2AF598", opacity: 0.18 },
      { offset: "34%", color: "#14F1FF", opacity: 0.78 },
      { offset: "50%", color: "#5B8CFF", opacity: 0.92 },
      { offset: "64%", color: "#FF4FD8", opacity: 0.82 },
      { offset: "78%", color: "#FFB84D", opacity: 0.24 },
      { offset: "100%", color: "#0A0A0C", opacity: 0 },
    ],
  },
  {
    id: "acid",
    name: "Acid Beam",
    description: "Lima, aqua e violeta para um acendimento mais quimico.",
    plume:
      "linear-gradient(90deg, rgba(10, 10, 12, 0) 0%, rgba(10, 10, 12, 0) 28%, rgba(212, 255, 71, 0.08) 40%, rgba(70, 255, 197, 0.2) 48%, rgba(0, 235, 255, 0.34) 54%, rgba(157, 92, 255, 0.26) 61%, rgba(255, 255, 255, 0.08) 69%, rgba(10, 10, 12, 0) 76%, rgba(10, 10, 12, 0) 100%)",
    stops: [
      { offset: "0%", color: "#0A0A0C", opacity: 0 },
      { offset: "20%", color: "#D4FF47", opacity: 0.16 },
      { offset: "36%", color: "#46FFC5", opacity: 0.66 },
      { offset: "51%", color: "#00EBFF", opacity: 0.94 },
      { offset: "66%", color: "#9D5CFF", opacity: 0.78 },
      { offset: "81%", color: "#FFFFFF", opacity: 0.18 },
      { offset: "100%", color: "#0A0A0C", opacity: 0 },
    ],
  },
  {
    id: "sunset",
    name: "Sunset Plasma",
    description: "Coral, amber e pink para um reveal mais quente.",
    plume:
      "linear-gradient(90deg, rgba(10, 10, 12, 0) 0%, rgba(10, 10, 12, 0) 28%, rgba(255, 196, 87, 0.08) 40%, rgba(255, 132, 92, 0.2) 49%, rgba(255, 88, 155, 0.34) 55%, rgba(191, 121, 255, 0.26) 62%, rgba(255, 240, 194, 0.08) 70%, rgba(10, 10, 12, 0) 76%, rgba(10, 10, 12, 0) 100%)",
    stops: [
      { offset: "0%", color: "#0A0A0C", opacity: 0 },
      { offset: "18%", color: "#FFC457", opacity: 0.14 },
      { offset: "35%", color: "#FF845C", opacity: 0.62 },
      { offset: "50%", color: "#FF589B", opacity: 0.92 },
      { offset: "65%", color: "#BF79FF", opacity: 0.78 },
      { offset: "80%", color: "#FFF0C2", opacity: 0.16 },
      { offset: "100%", color: "#0A0A0C", opacity: 0 },
    ],
  },
  {
    id: "ice",
    name: "Ice Signal",
    description: "Gelo, azul eletrico e prata para um reveal mais frio.",
    plume:
      "linear-gradient(90deg, rgba(10, 10, 12, 0) 0%, rgba(10, 10, 12, 0) 28%, rgba(214, 247, 255, 0.08) 40%, rgba(131, 227, 255, 0.2) 49%, rgba(82, 145, 255, 0.34) 55%, rgba(155, 219, 255, 0.24) 62%, rgba(255, 255, 255, 0.08) 69%, rgba(10, 10, 12, 0) 76%, rgba(10, 10, 12, 0) 100%)",
    stops: [
      { offset: "0%", color: "#0A0A0C", opacity: 0 },
      { offset: "18%", color: "#D6F7FF", opacity: 0.14 },
      { offset: "36%", color: "#83E3FF", opacity: 0.58 },
      { offset: "50%", color: "#5291FF", opacity: 0.9 },
      { offset: "66%", color: "#9BDBFF", opacity: 0.68 },
      { offset: "82%", color: "#FFFFFF", opacity: 0.16 },
      { offset: "100%", color: "#0A0A0C", opacity: 0 },
    ],
  },
  {
    id: "aurora",
    name: "Aurora Veil",
    description: "Faixa larga e difusa, mais atmosferica e respirada.",
    plume:
      "linear-gradient(90deg, rgba(10, 10, 12, 0) 0%, rgba(10, 10, 12, 0) 18%, rgba(147, 255, 211, 0.04) 28%, rgba(88, 243, 255, 0.12) 40%, rgba(126, 255, 236, 0.28) 52%, rgba(112, 152, 255, 0.18) 64%, rgba(196, 255, 238, 0.08) 78%, rgba(10, 10, 12, 0) 92%, rgba(10, 10, 12, 0) 100%)",
    stops: [
      { offset: "0%", color: "#0A0A0C", opacity: 0 },
      { offset: "16%", color: "#93FFD3", opacity: 0.08 },
      { offset: "34%", color: "#58F3FF", opacity: 0.38 },
      { offset: "52%", color: "#7EFFE4", opacity: 0.88 },
      { offset: "68%", color: "#7098FF", opacity: 0.52 },
      { offset: "84%", color: "#C4FFEE", opacity: 0.14 },
      { offset: "100%", color: "#0A0A0C", opacity: 0 },
    ],
  },
  {
    id: "laser",
    name: "Laser Core",
    description: "Nucleo estreito, branco quente e queda brusca nas bordas.",
    plume:
      "linear-gradient(90deg, rgba(10, 10, 12, 0) 0%, rgba(10, 10, 12, 0) 42%, rgba(28, 198, 255, 0.08) 46%, rgba(255, 255, 255, 0.76) 49%, rgba(170, 240, 255, 0.98) 50%, rgba(255, 255, 255, 0.8) 51%, rgba(70, 140, 255, 0.12) 55%, rgba(10, 10, 12, 0) 61%, rgba(10, 10, 12, 0) 100%)",
    stops: [
      { offset: "0%", color: "#0A0A0C", opacity: 0 },
      { offset: "44%", color: "#1CC6FF", opacity: 0.14 },
      { offset: "49%", color: "#FFFFFF", opacity: 0.9 },
      { offset: "50%", color: "#AAF0FF", opacity: 1 },
      { offset: "51%", color: "#FFFFFF", opacity: 0.92 },
      { offset: "56%", color: "#468CFF", opacity: 0.24 },
      { offset: "100%", color: "#0A0A0C", opacity: 0 },
    ],
  },
  {
    id: "ember",
    name: "Ember Arc",
    description: "Cobre, brasa e ouro queimado com leitura mais ritualistica.",
    plume:
      "linear-gradient(90deg, rgba(10, 10, 12, 0) 0%, rgba(10, 10, 12, 0) 24%, rgba(88, 25, 11, 0.1) 34%, rgba(168, 57, 20, 0.22) 44%, rgba(255, 154, 51, 0.34) 54%, rgba(255, 223, 171, 0.18) 62%, rgba(117, 39, 15, 0.08) 72%, rgba(10, 10, 12, 0) 84%, rgba(10, 10, 12, 0) 100%)",
    stops: [
      { offset: "0%", color: "#0A0A0C", opacity: 0 },
      { offset: "24%", color: "#58190B", opacity: 0.1 },
      { offset: "42%", color: "#A83914", opacity: 0.42 },
      { offset: "54%", color: "#FF9A33", opacity: 0.92 },
      { offset: "64%", color: "#FFDFAB", opacity: 0.42 },
      { offset: "78%", color: "#75270F", opacity: 0.12 },
      { offset: "100%", color: "#0A0A0C", opacity: 0 },
    ],
  },
  {
    id: "prism",
    name: "Prism Fold",
    description: "Branco no centro com espectro quebrado nas bordas.",
    plume:
      "linear-gradient(90deg, rgba(10, 10, 12, 0) 0%, rgba(10, 10, 12, 0) 24%, rgba(255, 80, 80, 0.08) 36%, rgba(255, 194, 46, 0.14) 43%, rgba(255, 255, 255, 0.82) 50%, rgba(98, 231, 255, 0.18) 57%, rgba(108, 120, 255, 0.18) 64%, rgba(198, 112, 255, 0.1) 72%, rgba(10, 10, 12, 0) 84%, rgba(10, 10, 12, 0) 100%)",
    stops: [
      { offset: "0%", color: "#0A0A0C", opacity: 0 },
      { offset: "34%", color: "#FF5050", opacity: 0.16 },
      { offset: "43%", color: "#FFC22E", opacity: 0.3 },
      { offset: "50%", color: "#FFFFFF", opacity: 0.96 },
      { offset: "58%", color: "#62E7FF", opacity: 0.34 },
      { offset: "66%", color: "#6C78FF", opacity: 0.32 },
      { offset: "74%", color: "#C670FF", opacity: 0.16 },
      { offset: "100%", color: "#0A0A0C", opacity: 0 },
    ],
  },
];

const patternPresets: PatternPreset[] = [
  {
    id: "flower",
    name: "Flower",
    description: "A malha classica da flor da vida com repeticao mais organica.",
    href: "/flife.svg",
    kind: "tile",
    preserveAspectRatio: "xMidYMid slice",
    previewSize: "72px",
    previewRepeat: "repeat",
  },
  {
    id: "seed",
    name: "Seed",
    description: "Sete circulos nucleares, mais aberta e com leitura imediata.",
    href: "/seed-of-life.svg",
    kind: "tile",
    preserveAspectRatio: "xMidYMid slice",
    previewSize: "72px",
    previewRepeat: "repeat",
  },
  {
    id: "vesica",
    name: "Vesica",
    description: "Intersecoes mais tensas, com ritmo de malha e eixo horizontal forte.",
    href: "/vesica-mesh.svg",
    kind: "tile",
    preserveAspectRatio: "xMidYMid slice",
    previewSize: "72px",
    previewRepeat: "repeat",
  },
  {
    id: "metatron",
    name: "Metatron",
    description: "Rede mais tecnica, com linhas estruturais e pontos conectados.",
    href: "/metatron-grid.svg",
    kind: "tile",
    preserveAspectRatio: "xMidYMid slice",
    previewSize: "88px",
    previewRepeat: "repeat",
  },
  {
    id: "flower-sigil",
    name: "Flower Hero",
    description: "Uma unica flor da vida, centralizada e dominante no viewport.",
    href: "/flower-of-life-symbol.svg",
    kind: "single",
    preserveAspectRatio: "xMidYMid meet",
    previewSize: "contain",
    previewRepeat: "no-repeat",
  },
  {
    id: "metatron-sigil",
    name: "Metatron Hero",
    description: "Um unico simbolo de Metatron grande, mais iconico e ceremonial.",
    href: "/metatron-symbol.svg",
    kind: "single",
    preserveAspectRatio: "xMidYMid meet",
    previewSize: "contain",
    previewRepeat: "no-repeat",
  },
  {
    id: "fibonacci",
    name: "Fibonacci",
    description: "Versao visual inspirada na imagem de referencia, com leitura mais artistica do que matematica.",
    href: "/fibonacci-spiral.svg",
    kind: "single",
    preserveAspectRatio: "xMidYMid meet",
    previewSize: "contain",
    previewRepeat: "no-repeat",
  },
  {
    id: "fibonacci-true",
    name: "Fibonacci Real",
    description: "Construcao correta com quadrados Fibonacci e arcos de quarto de circulo continuos.",
    href: "/fibonacci-spiral-true.svg",
    kind: "single",
    preserveAspectRatio: "xMidYMid meet",
    previewSize: "contain",
    previewRepeat: "no-repeat",
  },
  {
    id: "mandala",
    name: "Mandala",
    description: "Mandala ornamental unica, mais rica e contemplativa.",
    href: "/mandala-bloom.svg",
    kind: "single",
    preserveAspectRatio: "xMidYMid meet",
    previewSize: "contain",
    previewRepeat: "no-repeat",
  },
];

const scalePresets: ScalePreset[] = [
  {
    id: "normal",
    name: "Normal",
    description: "Repeticao mais presente no viewport.",
    multiplier: 1,
  },
  {
    id: "grande",
    name: "Grande",
    description: "Menos repeticoes e leitura mais hero.",
    multiplier: 1.85,
  },
  {
    id: "gigante",
    name: "Gigante",
    description: "Escala ampla para deixar a geometria dominante.",
    multiplier: 2.8,
  },
];

const motionPresets: MotionPreset[] = [
  {
    id: "scan",
    name: "Scan",
    description: "Varredura limpa e tecnica, com plume e beam quase sincronizados.",
    plumeDurationMultiplier: 0.92,
    beamDurationMultiplier: 1,
    plumeDelay: -0.15,
    sharpDelay: -1.2,
  },
  {
    id: "pulse",
    name: "Pulse",
    description: "A luz acelera, respira no centro e sai com reforco ritmico.",
    plumeDurationMultiplier: 1.2,
    beamDurationMultiplier: 1.08,
    plumeDelay: -0.3,
    sharpDelay: -0.45,
  },
  {
    id: "ritual",
    name: "Ritual",
    description: "Passagem mais lenta, com permanencia central e acendimento solene.",
    plumeDurationMultiplier: 1.36,
    beamDurationMultiplier: 1.5,
    plumeDelay: -0.45,
    sharpDelay: -1.75,
  },
  {
    id: "drift",
    name: "Drift",
    description: "Deslocamento mais organico, com deriva vertical e leve oscilacao.",
    plumeDurationMultiplier: 1.7,
    beamDurationMultiplier: 1.34,
    plumeDelay: -0.22,
    sharpDelay: -0.9,
  },
];

const patternTuningPresets: Record<string, PatternTuningPreset> = {
  flower: {
    presetId: "current",
    scaleId: "grande",
    motionId: "scan",
    duration: 11,
    rotation: -10,
    plumeBlur: 72,
    maskGlow: 24,
    glowGain: 0.58,
    coreOpacity: 0.9,
    travel: 168,
    bandWidth: 1180,
  },
  seed: {
    presetId: "aurora",
    scaleId: "grande",
    motionId: "pulse",
    duration: 12,
    rotation: -6,
    plumeBlur: 86,
    maskGlow: 28,
    glowGain: 0.64,
    coreOpacity: 0.84,
    travel: 160,
    bandWidth: 1080,
  },
  vesica: {
    presetId: "laser",
    scaleId: "grande",
    motionId: "scan",
    duration: 9,
    rotation: -3,
    plumeBlur: 48,
    maskGlow: 16,
    glowGain: 0.46,
    coreOpacity: 0.98,
    travel: 152,
    bandWidth: 860,
  },
  metatron: {
    presetId: "prism",
    scaleId: "normal",
    motionId: "ritual",
    duration: 14,
    rotation: -8,
    plumeBlur: 68,
    maskGlow: 32,
    glowGain: 0.68,
    coreOpacity: 0.9,
    travel: 176,
    bandWidth: 1120,
  },
  "flower-sigil": {
    presetId: "sunset",
    scaleId: "gigante",
    motionId: "ritual",
    duration: 15,
    rotation: -9,
    plumeBlur: 80,
    maskGlow: 34,
    glowGain: 0.7,
    coreOpacity: 0.84,
    travel: 154,
    bandWidth: 1200,
  },
  "metatron-sigil": {
    presetId: "prism",
    scaleId: "gigante",
    motionId: "ritual",
    duration: 13,
    rotation: -7,
    plumeBlur: 62,
    maskGlow: 30,
    glowGain: 0.62,
    coreOpacity: 0.94,
    travel: 166,
    bandWidth: 1040,
  },
  fibonacci: {
    presetId: "ember",
    scaleId: "gigante",
    motionId: "drift",
    duration: 13,
    rotation: -4,
    plumeBlur: 76,
    maskGlow: 26,
    glowGain: 0.6,
    coreOpacity: 0.88,
    travel: 160,
    bandWidth: 980,
  },
  "fibonacci-true": {
    presetId: "laser",
    scaleId: "gigante",
    motionId: "scan",
    duration: 10,
    rotation: -2,
    plumeBlur: 42,
    maskGlow: 18,
    glowGain: 0.44,
    coreOpacity: 0.98,
    travel: 148,
    bandWidth: 860,
  },
  mandala: {
    presetId: "aurora",
    scaleId: "gigante",
    motionId: "ritual",
    duration: 16,
    rotation: -12,
    plumeBlur: 92,
    maskGlow: 36,
    glowGain: 0.78,
    coreOpacity: 0.82,
    travel: 158,
    bandWidth: 1260,
  },
};

const defaultPatternId = patternPresets[0].id;
const defaultPatternTuning = patternTuningPresets[defaultPatternId];

function formatControlValue(value: number, unit: string) {
  return `${value}${unit}`;
}

function getMaskFrame(multiplier: number) {
  const width = MASK_VIEWBOX_WIDTH * multiplier;
  const height = MASK_VIEWBOX_HEIGHT * multiplier;

  return {
    width,
    height,
    x: (MASK_VIEWBOX_WIDTH - width) / 2,
    y: (MASK_VIEWBOX_HEIGHT - height) / 2,
  };
}

function getSingleSymbolFrame(multiplier: number) {
  const size = Math.min(MASK_VIEWBOX_WIDTH, MASK_VIEWBOX_HEIGHT) * multiplier;

  return {
    width: size,
    height: size,
    x: (MASK_VIEWBOX_WIDTH - size) / 2,
    y: (MASK_VIEWBOX_HEIGHT - size) / 2,
  };
}

function getPresetButtonClasses(active: boolean) {
  return `rounded-[0.95rem] border px-2.5 py-2.5 text-left transition ${
    active
      ? "border-[#8AF3FF]/45 bg-white/[0.09] text-white"
      : "border-white/10 bg-white/[0.03] text-white/66 hover:border-white/20 hover:bg-white/[0.06]"
  }`;
}

function SliderControl({
  label,
  valueLabel,
  min,
  max,
  step,
  value,
  onChange,
}: SliderControlProps) {
  return (
    <label className="block rounded-[1rem] border border-white/10 bg-white/[0.03] px-3 py-3">
      <div className="flex items-center justify-between gap-4">
        <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/58">
          {label}
        </span>
        <span className="text-xs text-white/72">{valueLabel}</span>
      </div>
      <input
        className="art-range mt-3"
        type="range"
        min={String(min)}
        max={String(max)}
        step={String(step)}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

export function FlowerOfLifeReveal({
  eyebrow = "Experimento visual",
  title = "Geometrias sagradas em revelacao neon.",
  description = "Troque a mascara, altere a escala do pattern e deixe a malha acender apenas quando a faixa neon cruza a composicao.",
}: FlowerOfLifeRevealProps) {
  const gradientId = useId();
  const [presetId, setPresetId] = useState(defaultPatternTuning.presetId);
  const [patternId, setPatternId] = useState(defaultPatternId);
  const [scaleId, setScaleId] = useState(defaultPatternTuning.scaleId);
  const [motionId, setMotionId] = useState(defaultPatternTuning.motionId);
  const [duration, setDuration] = useState(defaultPatternTuning.duration);
  const [rotation, setRotation] = useState(defaultPatternTuning.rotation);
  const [plumeBlur, setPlumeBlur] = useState(defaultPatternTuning.plumeBlur);
  const [maskGlow, setMaskGlow] = useState(defaultPatternTuning.maskGlow);
  const [glowGain, setGlowGain] = useState(defaultPatternTuning.glowGain);
  const [coreOpacity, setCoreOpacity] = useState(defaultPatternTuning.coreOpacity);
  const [travel, setTravel] = useState(defaultPatternTuning.travel);
  const [bandWidth, setBandWidth] = useState(defaultPatternTuning.bandWidth);

  function applyPatternTuning(patternKey: string) {
    const tuning = patternTuningPresets[patternKey];

    if (!tuning) {
      return;
    }

    setPresetId(tuning.presetId);
    setScaleId(tuning.scaleId);
    setMotionId(tuning.motionId);
    setDuration(tuning.duration);
    setRotation(tuning.rotation);
    setPlumeBlur(tuning.plumeBlur);
    setMaskGlow(tuning.maskGlow);
    setGlowGain(tuning.glowGain);
    setCoreOpacity(tuning.coreOpacity);
    setTravel(tuning.travel);
    setBandWidth(tuning.bandWidth);
  }

  const activePreset =
    gradientPresets.find((preset) => preset.id === presetId) ?? gradientPresets[0];
  const activePattern =
    patternPresets.find((pattern) => pattern.id === patternId) ?? patternPresets[0];
  const activeScale = scalePresets.find((scale) => scale.id === scaleId) ?? scalePresets[0];
  const activeMotion = motionPresets.find((motion) => motion.id === motionId) ?? motionPresets[0];
  const sharpWidth = Math.max(420, Math.round(bandWidth * 0.64));
  const wideX = -Math.round(bandWidth * 0.82);
  const sharpX = wideX + 40;
  const maskFrame =
    activePattern.kind === "single"
      ? getSingleSymbolFrame(activeScale.multiplier)
      : getMaskFrame(activeScale.multiplier);
  const previewSize = activePattern.previewRepeat === "repeat" ? activePattern.previewSize : "76%";
  const glowRectOpacity = Math.min(glowGain + 0.14, 0.98);

  return (
    <section
      className={`relative flex min-h-screen items-center overflow-hidden bg-[#0A0A0C] text-white art-motion--${activeMotion.id}`}
      style={
        {
          "--art-duration": `${duration}s`,
          "--art-rotation": `${rotation}deg`,
          "--art-plume-duration": `${(duration * activeMotion.plumeDurationMultiplier).toFixed(2)}s`,
          "--art-beam-duration": `${(duration * activeMotion.beamDurationMultiplier).toFixed(2)}s`,
          "--art-plume-delay": `${activeMotion.plumeDelay}s`,
          "--art-sharp-delay": `${activeMotion.sharpDelay}s`,
          "--art-plume-blur": `${plumeBlur}px`,
          "--art-glow-gain": glowGain,
          "--art-core-opacity": coreOpacity,
          "--art-travel": `${travel}%`,
          "--art-travel-soft": `${Math.round(travel * 0.42)}%`,
          "--art-travel-mid": `${Math.round(travel * 0.56)}%`,
          "--art-travel-focus": `${Math.round(travel * 0.66)}%`,
          "--art-travel-late": `${Math.round(travel * 0.82)}%`,
          "--art-plume": activePreset.plume,
        } as React.CSSProperties
      }
    >
      <div className="absolute inset-0 z-0">
        <MysticBackground />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 18% 24%, rgba(37,99,235,0.18), transparent 28%), radial-gradient(circle at 78% 18%, rgba(255,58,174,0.14), transparent 26%), radial-gradient(circle at 50% 68%, rgba(107,33,168,0.22), transparent 34%), linear-gradient(180deg, rgba(7,7,11,0.1), rgba(7,7,11,0.72))",
          }}
        />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
      >
        <div className="art-neon-plume absolute inset-y-[-18%] left-[-45%] w-[190%] will-change-transform" />
      </div>

      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        viewBox={`0 0 ${MASK_VIEWBOX_WIDTH} ${MASK_VIEWBOX_HEIGHT}`}
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            {activePreset.stops.map((stop) => (
              <stop
                key={`${activePreset.id}-${stop.offset}`}
                offset={stop.offset}
                stopColor={stop.color}
                stopOpacity={stop.opacity}
              />
            ))}
          </linearGradient>
          <mask id="art-flower-mask" maskUnits="userSpaceOnUse">
            <rect width={MASK_VIEWBOX_WIDTH} height={MASK_VIEWBOX_HEIGHT} fill="black" />
            <image
              href={activePattern.href}
              x={maskFrame.x}
              y={maskFrame.y}
              width={maskFrame.width}
              height={maskFrame.height}
              preserveAspectRatio={activePattern.preserveAspectRatio}
            />
          </mask>
          <filter id="art-soft-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation={maskGlow} />
          </filter>
        </defs>

        <g mask="url(#art-flower-mask)">
          <rect
            className="art-mask-sweep art-mask-sweep--glow"
            x={wideX}
            y="-80"
            width={bandWidth}
            height="1060"
            fill={`url(#${gradientId})`}
            filter="url(#art-soft-glow)"
            opacity={glowRectOpacity}
          />
          <rect
            className="art-mask-sweep art-mask-sweep--sharp"
            x={sharpX}
            y="-20"
            width={sharpWidth}
            height="940"
            fill={`url(#${gradientId})`}
            opacity={coreOpacity}
          />
        </g>
      </svg>

      <div className="relative z-30 mx-auto grid w-full max-w-7xl gap-8 px-6 pb-14 pt-32 sm:px-10 lg:grid-cols-[minmax(0,1.05fr)_24rem] lg:px-16">
        <div className="self-end max-w-2xl rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,8,12,0.46),rgba(8,8,12,0.22))] px-6 py-6 shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.42em] text-[#79F2FF]">
            {eyebrow}
          </p>
          <h1 className="font-display mt-4 max-w-[12ch] text-4xl font-extrabold uppercase tracking-[-0.06em] text-white sm:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/66 sm:text-base">
            {description}
          </p>
        </div>

        <aside className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(10,12,18,0.92),rgba(8,8,12,0.74))] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.34)] backdrop-blur-2xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-[#BFCBFF]">
                Animation Config
              </p>
              <h2 className="font-display mt-3 text-2xl font-extrabold uppercase tracking-[-0.05em] text-white">
                Ajuste o reveal.
              </h2>
            </div>
            <div
              aria-hidden="true"
              className="h-12 w-12 rounded-2xl border border-white/10"
              style={{
                backgroundImage: `${activePreset.plume}, url(${activePattern.href})`,
                backgroundPosition: "center, center",
                backgroundRepeat: `no-repeat, ${activePattern.previewRepeat}`,
                backgroundSize: `cover, ${previewSize}`,
              }}
            />
          </div>

          <div className="mt-6 space-y-4">
            <div className="grid grid-cols-2 gap-2 rounded-[1.2rem] border border-white/10 bg-black/20 p-3">
              <div className="rounded-[0.9rem] border border-white/10 bg-white/[0.03] px-3 py-2">
                <p className="text-[10px] uppercase tracking-[0.22em] text-white/46">Mascara</p>
                <p className="mt-1 text-sm font-semibold text-white">{activePattern.name}</p>
              </div>
              <div className="rounded-[0.9rem] border border-white/10 bg-white/[0.03] px-3 py-2">
                <p className="text-[10px] uppercase tracking-[0.22em] text-white/46">Gradiente</p>
                <p className="mt-1 text-sm font-semibold text-white">{activePreset.name}</p>
              </div>
              <div className="rounded-[0.9rem] border border-white/10 bg-white/[0.03] px-3 py-2">
                <p className="text-[10px] uppercase tracking-[0.22em] text-white/46">Movimento</p>
                <p className="mt-1 text-sm font-semibold text-white">{activeMotion.name}</p>
              </div>
              <div className="rounded-[0.9rem] border border-white/10 bg-white/[0.03] px-3 py-2">
                <p className="text-[10px] uppercase tracking-[0.22em] text-white/46">Escala</p>
                <p className="mt-1 text-sm font-semibold text-white">{activeScale.name}</p>
              </div>
            </div>

            <details open className="art-panel-section">
              <summary className="art-panel-summary flex cursor-pointer list-none items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#BFCBFF]">
                    Presets
                  </p>
                  <p className="mt-1 text-xs text-white/46">
                    Cada simbolo aplica um setup recomendado ao ser selecionado.
                  </p>
                </div>
                <span className="art-panel-toggle text-[10px] uppercase tracking-[0.28em] text-white/36">
                  Toggle
                </span>
              </summary>

              <div className="mt-4 space-y-4">
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/58">
                      Mascara
                    </p>
                    <span className="text-[10px] uppercase tracking-[0.24em] text-[#8AF3FF]">
                      {activePattern.name}
                    </span>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {patternPresets.map((pattern) => {
                      const active = pattern.id === activePattern.id;
                      const tilePreviewSize =
                        pattern.previewRepeat === "repeat" ? pattern.previewSize : "80%";

                      return (
                        <button
                          key={pattern.id}
                          type="button"
                          onClick={() => {
                            setPatternId(pattern.id);
                            applyPatternTuning(pattern.id);
                          }}
                          className={getPresetButtonClasses(active)}
                        >
                          <span
                            aria-hidden="true"
                            className="block h-9 rounded-[0.8rem] border border-white/10 bg-center"
                            style={{
                              backgroundImage: `url(${pattern.href})`,
                              backgroundRepeat: pattern.previewRepeat,
                              backgroundSize: tilePreviewSize,
                            }}
                          />
                          <span className="mt-2 block text-xs font-semibold uppercase tracking-[0.14em]">
                            {pattern.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-white/48">{activePattern.description}</p>
                </div>

                <div>
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/58">
                      Gradiente
                    </p>
                    <span className="text-[10px] uppercase tracking-[0.24em] text-[#8AF3FF]">
                      {activePreset.name}
                    </span>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {gradientPresets.map((preset) => {
                      const active = preset.id === activePreset.id;

                      return (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => setPresetId(preset.id)}
                          className={getPresetButtonClasses(active)}
                        >
                          <span
                            aria-hidden="true"
                            className="block h-9 rounded-[0.8rem]"
                            style={{ background: preset.plume }}
                          />
                          <span className="mt-2 block text-xs font-semibold uppercase tracking-[0.14em]">
                            {preset.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-white/48">{activePreset.description}</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_8rem]">
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/58">
                        Movimento
                      </p>
                      <span className="text-[10px] uppercase tracking-[0.24em] text-[#8AF3FF]">
                        {activeMotion.name}
                      </span>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {motionPresets.map((motion) => {
                        const active = motion.id === activeMotion.id;

                        return (
                          <button
                            key={motion.id}
                            type="button"
                            onClick={() => setMotionId(motion.id)}
                            className={getPresetButtonClasses(active)}
                          >
                            <span className="block text-xs font-semibold uppercase tracking-[0.14em]">
                              {motion.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    <p className="mt-2 text-sm leading-6 text-white/48">{activeMotion.description}</p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/58">
                        Escala
                      </p>
                      <span className="text-[10px] uppercase tracking-[0.24em] text-[#8AF3FF]">
                        {activeScale.name}
                      </span>
                    </div>
                    <div className="mt-2 grid gap-2">
                      {scalePresets.map((scale) => {
                        const active = scale.id === activeScale.id;

                        return (
                          <button
                            key={scale.id}
                            type="button"
                            onClick={() => setScaleId(scale.id)}
                            className={getPresetButtonClasses(active)}
                          >
                            <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8AF3FF]">
                              {scale.name}
                            </span>
                            <span className="mt-1 block text-xs text-white/72">
                              {scale.multiplier.toFixed(scale.multiplier % 1 === 0 ? 0 : 2)}x
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </details>

            <details open className="art-panel-section">
              <summary className="art-panel-summary flex cursor-pointer list-none items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#BFCBFF]">
                    Light
                  </p>
                  <p className="mt-1 text-xs text-white/46">
                    Glow, nucleo e difusao do beam.
                  </p>
                </div>
                <span className="art-panel-toggle text-[10px] uppercase tracking-[0.28em] text-white/36">
                  Toggle
                </span>
              </summary>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <SliderControl
                  label="Plume blur"
                  valueLabel={formatControlValue(plumeBlur, "px")}
                  min={20}
                  max={120}
                  step={2}
                  value={plumeBlur}
                  onChange={setPlumeBlur}
                />
                <SliderControl
                  label="Mask glow"
                  valueLabel={formatControlValue(maskGlow, "px")}
                  min={8}
                  max={54}
                  step={1}
                  value={maskGlow}
                  onChange={setMaskGlow}
                />
                <SliderControl
                  label="Glow gain"
                  valueLabel={glowGain.toFixed(2)}
                  min={0.18}
                  max={1}
                  step={0.02}
                  value={glowGain}
                  onChange={setGlowGain}
                />
                <SliderControl
                  label="Core opacity"
                  valueLabel={coreOpacity.toFixed(2)}
                  min={0.25}
                  max={1}
                  step={0.01}
                  value={coreOpacity}
                  onChange={setCoreOpacity}
                />
              </div>
            </details>

            <details className="art-panel-section">
              <summary className="art-panel-summary flex cursor-pointer list-none items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#BFCBFF]">
                    Sweep
                  </p>
                  <p className="mt-1 text-xs text-white/46">
                    Ajustes finos de deslocamento e abertura.
                  </p>
                </div>
                <span className="art-panel-toggle text-[10px] uppercase tracking-[0.28em] text-white/36">
                  Toggle
                </span>
              </summary>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <SliderControl
                  label="Velocidade"
                  valueLabel={formatControlValue(duration, "s")}
                  min={4}
                  max={24}
                  step={1}
                  value={duration}
                  onChange={setDuration}
                />
                <SliderControl
                  label="Angulo"
                  valueLabel={formatControlValue(rotation, "deg")}
                  min={-18}
                  max={18}
                  step={1}
                  value={rotation}
                  onChange={setRotation}
                />
                <SliderControl
                  label="Faixa do beam"
                  valueLabel={formatControlValue(bandWidth, "px")}
                  min={720}
                  max={1640}
                  step={20}
                  value={bandWidth}
                  onChange={setBandWidth}
                />
                <SliderControl
                  label="Distancia"
                  valueLabel={formatControlValue(travel, "%")}
                  min={110}
                  max={220}
                  step={2}
                  value={travel}
                  onChange={setTravel}
                />
              </div>
            </details>
          </div>
        </aside>
      </div>

      <style jsx>{`
        .art-neon-plume {
          background: var(--art-plume);
          filter: blur(var(--art-plume-blur));
          opacity: var(--art-glow-gain);
          transform-origin: center;
          will-change: transform, opacity;
          animation-duration: var(--art-plume-duration);
          animation-delay: var(--art-plume-delay);
          animation-iteration-count: infinite;
          animation-fill-mode: both;
        }

        .art-mask-sweep {
          will-change: transform, opacity;
          transform-origin: center;
          animation-duration: var(--art-beam-duration);
          animation-iteration-count: infinite;
          animation-fill-mode: both;
        }

        .art-mask-sweep--sharp {
          animation-delay: var(--art-sharp-delay);
        }

        .art-motion--scan .art-neon-plume {
          animation-name: art-plume-scan;
          animation-timing-function: linear;
        }

        .art-motion--scan .art-mask-sweep {
          animation-name: art-beam-scan;
          animation-timing-function: linear;
        }

        .art-motion--pulse .art-neon-plume {
          animation-name: art-plume-pulse;
          animation-timing-function: ease-in-out;
        }

        .art-motion--pulse .art-mask-sweep {
          animation-name: art-beam-pulse;
          animation-timing-function: ease-in-out;
        }

        .art-motion--ritual .art-neon-plume {
          animation-name: art-plume-ritual;
          animation-timing-function: cubic-bezier(0.2, 0.9, 0.12, 1);
        }

        .art-motion--ritual .art-mask-sweep {
          animation-name: art-beam-ritual;
          animation-timing-function: cubic-bezier(0.24, 0.88, 0.18, 1);
        }

        .art-motion--drift .art-neon-plume {
          animation-name: art-plume-drift;
          animation-timing-function: cubic-bezier(0.32, 0.08, 0.18, 0.98);
        }

        .art-motion--drift .art-mask-sweep {
          animation-name: art-beam-drift;
          animation-timing-function: cubic-bezier(0.28, 0.18, 0.18, 0.98);
        }

        .art-range {
          width: 100%;
          appearance: none;
          height: 0.5rem;
          border-radius: 999px;
          background: linear-gradient(90deg, rgba(117, 191, 255, 0.55), rgba(173, 98, 255, 0.55));
          outline: none;
        }

        .art-range::-webkit-slider-thumb {
          appearance: none;
          width: 1rem;
          height: 1rem;
          border-radius: 999px;
          border: 2px solid rgba(255, 255, 255, 0.72);
          background: #05070d;
          box-shadow: 0 0 0 4px rgba(133, 210, 255, 0.18);
        }

        .art-range::-moz-range-thumb {
          width: 1rem;
          height: 1rem;
          border-radius: 999px;
          border: 2px solid rgba(255, 255, 255, 0.72);
          background: #05070d;
          box-shadow: 0 0 0 4px rgba(133, 210, 255, 0.18);
        }

        .art-panel-section {
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 1.15rem;
          background: rgba(255, 255, 255, 0.03);
          padding: 0.9rem;
        }

        .art-panel-summary::-webkit-details-marker {
          display: none;
        }

        .art-panel-toggle {
          transition: transform 180ms ease;
        }

        .art-panel-section[open] .art-panel-toggle {
          transform: rotate(180deg);
        }

        @keyframes art-plume-scan {
          0% {
            transform: translate3d(-32%, 0, 0) skewX(-12deg);
          }
          100% {
            transform: translate3d(calc(var(--art-travel) - 32%), 0, 0) skewX(-12deg);
          }
        }

        @keyframes art-beam-scan {
          0% {
            transform: translate3d(0, 0, 0) rotate(var(--art-rotation));
          }
          100% {
            transform: translate3d(var(--art-travel), 0, 0) rotate(var(--art-rotation));
          }
        }

        @keyframes art-plume-pulse {
          0% {
            transform: translate3d(-32%, 6%, 0) skewX(-10deg) scaleX(0.94);
          }
          40% {
            transform: translate3d(calc(var(--art-travel-soft) - 32%), 2%, 0) skewX(-10deg)
              scaleX(1);
          }
          56% {
            transform: translate3d(calc(var(--art-travel-focus) - 32%), -1%, 0) skewX(-8deg)
              scaleX(1.08);
          }
          68% {
            transform: translate3d(calc(var(--art-travel-focus) - 32%), -1%, 0) skewX(-8deg)
              scaleX(1.08);
          }
          100% {
            transform: translate3d(calc(var(--art-travel) - 32%), 4%, 0) skewX(-12deg)
              scaleX(0.96);
          }
        }

        @keyframes art-beam-pulse {
          0% {
            transform: translate3d(0, 0, 0) rotate(var(--art-rotation)) scaleX(0.94);
          }
          44% {
            transform: translate3d(var(--art-travel-mid), 0, 0) rotate(var(--art-rotation))
              scaleX(0.98);
          }
          58% {
            transform: translate3d(var(--art-travel-focus), 0, 0) rotate(var(--art-rotation))
              scaleX(1.04);
          }
          68% {
            transform: translate3d(var(--art-travel-focus), 0, 0) rotate(var(--art-rotation))
              scaleX(1.04);
          }
          100% {
            transform: translate3d(var(--art-travel), 0, 0) rotate(var(--art-rotation))
              scaleX(0.96);
          }
        }

        @keyframes art-plume-ritual {
          0% {
            transform: translate3d(-34%, 10%, 0) skewX(-8deg) scaleX(0.9);
          }
          32% {
            transform: translate3d(calc(var(--art-travel-soft) - 34%), 4%, 0) skewX(-8deg)
              scaleX(0.98);
          }
          48% {
            transform: translate3d(calc(var(--art-travel-focus) - 34%), -2%, 0) skewX(-6deg)
              scaleX(1.12);
          }
          70% {
            transform: translate3d(calc(var(--art-travel-focus) - 34%), -2%, 0) skewX(-6deg)
              scaleX(1.12);
          }
          100% {
            transform: translate3d(calc(var(--art-travel) - 34%), 8%, 0) skewX(-10deg)
              scaleX(0.94);
          }
        }

        @keyframes art-beam-ritual {
          0% {
            transform: translate3d(0, 0, 0) rotate(var(--art-rotation)) scaleX(0.9);
          }
          34% {
            transform: translate3d(var(--art-travel-mid), 0, 0) rotate(var(--art-rotation))
              scaleX(0.96);
          }
          52% {
            transform: translate3d(var(--art-travel-focus), 0, 0) rotate(var(--art-rotation))
              scaleX(1.06);
          }
          72% {
            transform: translate3d(var(--art-travel-focus), 0, 0) rotate(var(--art-rotation))
              scaleX(1.06);
          }
          100% {
            transform: translate3d(var(--art-travel), 0, 0) rotate(var(--art-rotation))
              scaleX(0.94);
          }
        }

        @keyframes art-plume-drift {
          0% {
            transform: translate3d(-36%, -5%, 0) skewX(-13deg) scaleX(0.96);
          }
          38% {
            transform: translate3d(calc(var(--art-travel-soft) - 36%), -1%, 0) skewX(-11deg)
              scaleX(1.02);
          }
          68% {
            transform: translate3d(calc(var(--art-travel-late) - 36%), 5%, 0) skewX(-14deg)
              scaleX(1.05);
          }
          100% {
            transform: translate3d(calc(var(--art-travel) - 36%), 8%, 0) skewX(-12deg)
              scaleX(0.98);
          }
        }

        @keyframes art-beam-drift {
          0% {
            transform: translate3d(0, 0, 0) rotate(calc(var(--art-rotation) - 1deg)) scaleX(0.96);
          }
          42% {
            transform: translate3d(var(--art-travel-soft), -1%, 0)
              rotate(calc(var(--art-rotation) + 1deg)) scaleX(1);
          }
          72% {
            transform: translate3d(var(--art-travel-late), 1%, 0)
              rotate(calc(var(--art-rotation) + 2deg)) scaleX(1.02);
          }
          100% {
            transform: translate3d(var(--art-travel), 0, 0) rotate(var(--art-rotation)) scaleX(0.98);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .art-neon-plume,
          .art-mask-sweep,
          .art-mask-sweep--sharp {
            animation: none;
          }

          .art-neon-plume {
            transform: translate3d(-32%, 0, 0) skewX(-12deg);
          }

          .art-mask-sweep {
            transform: translate3d(0, 0, 0) rotate(var(--art-rotation));
          }
        }
      `}</style>
    </section>
  );
}