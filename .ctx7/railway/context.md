### Install Dependencies and Start Development Server

Source: https://docs.railway.com/guides/solid

Commands to install project dependencies and launch the Vite development server.

```bash
npm install
```

```bash
npm run dev
```

--------------------------------

### Install Dependencies and Start Express App

Source: https://docs.railway.com/guides/express

Install project dependencies and start the Express application locally. Access the app at http://localhost:3000.

```bash
npm install
npm start
```

--------------------------------

### Create React App Start Command

Source: https://docs.railway.com/deployments/troubleshooting/no-start-command-could-be-found

Serve static site files for a Create React App project. Similar to Vite, this uses the `serve` command (install with `npm install serve`). The `--listen $PORT` flag directs it to the correct port, and `build` indicates the output directory.

```bash
serve --single --listen $PORT build
```

--------------------------------

### Environment configuration examples

Source: https://docs.railway.com/cli/environment

Examples for viewing environment configuration with different flags.

```bash
railway environment config
```

```bash
railway environment config --environment staging
```

```bash
railway environment config --json
```

--------------------------------

### Define Package Scripts

Source: https://docs.railway.com/guides/sveltekit

Example package.json configuration including the necessary start script for the Node build.

```json
{	"name": "svelteapp",	"version": "0.0.1",	"type": "module",	"scripts": {		"dev": "vite dev",		"build": "vite build",		"start": "node build/index.js",		"preview": "vite preview",		"check": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json",		"check:watch": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json --watch",		"format": "prettier --write .",		"lint": "prettier --check . && eslint ."	},	"devDependencies": {		"@fontsource/fira-mono": "^5.0.0",		"@neoconfetti/svelte": "^2.0.0",		"@sveltejs/adapter-auto": "^3.0.0",		"@sveltejs/adapter-node": "^5.2.9",		"@sveltejs/kit": "^2.0.0",		"@sveltejs/vite-plugin-svelte": "^4.0.0",		"@types/eslint": "^9.6.0",		"autoprefixer": "^10.4.20",		"eslint": "^9.7.0",		"eslint-config-prettier": "^9.1.0",		"eslint-plugin-svelte": "^2.36.0",		"globals": "^15.0.0",		"prettier": "^3.3.2",		"prettier-plugin-svelte": "^3.2.6",		"prettier-plugin-tailwindcss": "^0.6.5",		"svelte": "^5.0.0",		"svelte-check": "^4.0.0",		"tailwindcss": "^3.4.9",		"typescript": "^5.0.0",		"typescript-eslint": "^8.0.0",		"vite": "^5.0.3"	}}
```

--------------------------------

### Vite Start Command

Source: https://docs.railway.com/deployments/troubleshooting/no-start-command-could-be-found

Serve static site files for a Vite project. The `serve` command, which can be installed via `npm install serve`, is used here. The `--listen $PORT` flag ensures it listens on the correct port, and `dist` specifies the build output directory.

```bash
serve --single --listen $PORT dist
```

--------------------------------

### Railway Start Command Configuration

Source: https://docs.railway.com/guides/phoenix-distillery

Configure this as the 'Start command' in Railway service settings. It sets up the database and then starts the application release in the foreground.

```bash
mix ecto.setup && _build/prod/rel/helloworld_distillery/bin/helloworld_distillery foreground
```

--------------------------------

### Install Dependencies Locally

Source: https://docs.railway.com/guides/react

Navigate into your project directory and install the necessary dependencies.

```bash
npm install
```

--------------------------------

### Successful build output example

Source: https://docs.railway.com/guides/phoenix-distillery

This output indicates a successful release build. It provides commands to start, stop, and interact with the built release.

```text
...==> Packaging release..Release successfully built!To start the release you have built, you can use one of the following tasks:    # start a shell, like 'iex -S mix'    > _build/prod/rel/helloworld_distillery/bin/helloworld_distillery console    # start in the foreground, like 'mix run --no-halt'    > _build/prod/rel/helloworld_distillery/bin/helloworld_distillery foreground    # start in the background, must be stopped with the 'stop' command    > _build/prod/rel/helloworld_distillery/bin/helloworld_distillery startIf you started a release elsewhere, and wish to connect to it:    # connects a local shell to the running node    > _build/prod/rel/helloworld_distillery/bin/helloworld_distillery remote_console    # connects directly to the running node's console    > _build/prod/rel/helloworld_distillery/bin/helloworld_distillery attachFor a complete listing of commands and their use:    > _build/prod/rel/helloworld_distillery/bin/helloworld_distillery help
```

--------------------------------

### Start local development

Source: https://docs.railway.com/cli/dev

Starts image-based services and prompts for code-based service configuration.

```bash
railway dev
```

--------------------------------

### Define Start Command

Source: https://docs.railway.com/config-as-code/reference

Specify the command to run when the container starts. Can be set to `null`.

```json
{
  "$schema": "https://railway.com/railway.schema.json",
  "deploy": {
    "startCommand": "node index.js"
  }
}
```

--------------------------------

### Install Flask

Source: https://docs.railway.com/guides/flask

Install the Flask framework within your activated virtual environment.

```bash
python -m pip install flask
```

--------------------------------

### Run Play App Locally

Source: https://docs.railway.com/guides/play

Start the Play application locally using this command. It builds the project, installs dependencies, and starts the embedded server.

```bash
sbt run
```

--------------------------------

### Start the local development server

Source: https://docs.railway.com/guides/astro

Run the development server to preview your application at http://localhost:4321.

```bash
npm run dev
```

--------------------------------

### Install Django

Source: https://docs.railway.com/guides/django

Install the Django framework using pip within your activated virtual environment.

```bash
python -m pip install django
```

--------------------------------

### Equivalent Configuration Definitions

Source: https://docs.railway.com/guides/config-as-code

These examples demonstrate how to define build and deploy settings in both TOML and JSON formats.

```toml
[build]
builder = "railpack"
buildCommand = "echo building!"

[deploy]
preDeployCommand = ["npm run db:migrate"]
startCommand = "echo starting!"
healthcheckPath = "/"
healthcheckTimeout = 100
restartPolicyType = "never"
```

```json
{
  "build": {
    "builder": "railpack",
    "buildCommand": "echo building!"
  },
  "deploy": {
    "preDeployCommand": ["npm run db:migrate"],
    "startCommand": "echo starting!",
    "healthcheckPath": "/",
    "healthcheckTimeout": 100,
    "restartPolicyType": "never"
  }
}
```

--------------------------------

### Install Dependencies

Source: https://docs.railway.com/guides/deploy-node-express-api-with-auto-scaling-secrets-and-zero-downtime

Install Express, dotenv, and TypeScript development dependencies.

```bash
npm install express dotenvnpm install -D typescript @types/node @types/express tsx
```

--------------------------------

### Node.js Start Command

Source: https://docs.railway.com/deployments/troubleshooting/no-start-command-could-be-found

Use this command to start a Node.js application. Replace `main.js` with your application's entry point file (e.g., `index.js`, `server.js`, `app.js`).

```bash
node main.js
```

--------------------------------

### Start release in foreground

Source: https://docs.railway.com/guides/phoenix-distillery

Use this command to start the built release in the foreground for local testing. Ensure environment variables are set beforehand.

```bash
_build/prod/rel/helloworld_distillery/bin/helloworld_distillery foreground
```

--------------------------------

### Install pg-promise Package

Source: https://docs.railway.com/guides/express

Install the pg-promise package to enable interaction with a PostgreSQL database.

```bash
npm i pg-promise
```

--------------------------------

### Install Phoenix App Generator

Source: https://docs.railway.com/guides/phoenix

Installs the Phoenix application generator using the mix archive.install command. Ensure Elixir and Hex are installed first.

```bash
mix archive.install hex phx_new
```

--------------------------------

### Create a new Beego app

Source: https://docs.railway.com/guides/beego

Run this command to create a new Beego app and install dependencies. Ensure Go and Bee tool are installed.

```bash
bee new helloworldcd helloworldgo mod tidy
```

--------------------------------

### Run Next.js Development Server

Source: https://docs.railway.com/guides/nextjs

Navigates to the project directory and starts the local development server.

```bash
cd helloworldnpm run dev
```

--------------------------------

### Configure Start Command for SIGTERM Handling

Source: https://docs.railway.com/deployments/troubleshooting/nodejs-sigterm-handling

Replace the package manager start command with a direct node execution to ensure the application receives termination signals.

```bash
npm run start
```

```bash
node index.js
```

--------------------------------

### Start the Rails server

Source: https://docs.railway.com/guides/rails

Launches the local development server.

```bash
bin/rails server
```

--------------------------------

### Install Railway plugin

Source: https://docs.railway.com/ai/claude-code-plugin

Installs the Railway plugin from the previously added marketplace.

```bash
/plugin install railway@railway-skills
```

--------------------------------

### Set Custom Start Command for Rails App

Source: https://docs.railway.com/guides/rails

Configure the Custom Start Command in your app service's Settings to prepare the database and start the server. This is useful for deployments from GitHub.

```bash
bin/rails db:prepare && bin/rails server -b ::
```

--------------------------------

### Install Production Dependencies

Source: https://docs.railway.com/guides/django

Install gunicorn for serving the application, whitenoise for static files, and psycopg2 for PostgreSQL database connectivity. These are essential for production deployment.

```bash
python -m pip install gunicorn whitenoise psycopg[binary,pool]
```

--------------------------------

### Check CLI Install Method

Source: https://docs.railway.com/cli/upgrade

Displays the detected installation method and the corresponding upgrade command without performing an update.

```bash
railway upgrade --check
```

```text
Install method: Homebrew
Binary path: /opt/homebrew/bin/railway
Upgrade command: brew upgrade railway
```

--------------------------------

### Dockerfile with Custom Node.js Setup for Playwright

Source: https://docs.railway.com/guides/playwright

This Dockerfile installs Playwright and its dependencies manually on a Node.js image, allowing for more control or single-browser installations.

```docker
FROM node:20-bookworm
# Install only Chromium and its system dependencies
RUN npx playwright install --with-deps chromium
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . ./
ENTRYPOINT ["node", "index.js"]
```

--------------------------------

### Natural Language Prompt: Deploy from Template (Database)

Source: https://docs.railway.com/ai/mcp-server

Example natural language prompt to deploy a Postgres database using a template.

```text
Deploy a Postgres database
```

--------------------------------

### Initialize Fastify project

Source: https://docs.railway.com/guides/add-a-cdn-using-cloudfront

Commands to initialize a Node.js project and install necessary Fastify dependencies.

```bash
npm init -ynpm i fastify @fastify/etag
```

--------------------------------

### Install Stripe CLI and Projects Plugin

Source: https://docs.railway.com/integrations/stripe

Install the Stripe CLI and the projects plugin to begin provisioning Railway resources.

```bash
stripe plugin install projects
stripe projects init
```

--------------------------------

### FastAPI Start Command

Source: https://docs.railway.com/deployments/troubleshooting/no-start-command-could-be-found

Start a FastAPI application using Uvicorn. Ensure `main` refers to the file containing your `app` instance. The `--host 0.0.0.0` and `--port $PORT` flags are necessary for proper network accessibility.

```bash
uvicorn main:app --host 0.0.0.0 --port $PORT
```

--------------------------------

### Structured log examples

Source: https://docs.railway.com/guides/logs

Examples of valid single-line JSON log formats.

```json
{ "level": "info", "message": "A minimal structured log" }
```

```json
{ "level": "error", "message": "Something bad happened" }
```

```json
{ "level": "info", "message": "New purchase!", "productId": 123, "userId": 456 }
```

```json
{  "level": "info",  "message": "User roles updated",  "roles": ["editor", "viewer"],  "userId": 123}
```

--------------------------------

### Install Node.js Dependencies

Source: https://docs.railway.com/guides/deploy-an-otel-collector-stack

Install necessary npm packages for an Express.js application with OpenTelemetry instrumentation. Ensure you have Node.js and npm installed.

```bash
npm i express @opentelemetry/api @opentelemetry/auto-instrumentations-node @opentelemetry/exporter-metrics-otlp-proto @opentelemetry/exporter-trace-otlp-proto @opentelemetry/resources @opentelemetry/sdk-metrics @opentelemetry/sdk-node @opentelemetry/semantic-conventions
```

--------------------------------

### Install TypeORM dependencies

Source: https://docs.railway.com/guides/nest

Installs the necessary packages for TypeORM and PostgreSQL connectivity.

```bash
npm i @nestjs/typeorm typeorm pg
```

--------------------------------

### Get current user in JSON format

Source: https://docs.railway.com/cli/whoami

Use the `--json` flag to get detailed user information in JSON format, which is useful for scripting or programmatic access. Ensure you have the Railway CLI installed.

```bash
railway whoami --json
```

--------------------------------

### Ruby on Rails Start Command

Source: https://docs.railway.com/deployments/troubleshooting/no-start-command-could-be-found

Start a Ruby on Rails application. The `-b 0.0.0.0` and `-p $PORT` flags ensure the server listens on the correct host and port.

```bash
bundle exec rails server -b 0.0.0.0 -p $PORT
```

--------------------------------

### Django Start Command

Source: https://docs.railway.com/deployments/troubleshooting/no-start-command-could-be-found

Start a Django application using Gunicorn. Replace `myproject` with the name of the directory containing your `wsgi.py` file.

```bash
gunicorn myproject.wsgi
```

--------------------------------

### Node.js Dockerfile for Railway Deployment

Source: https://docs.railway.com/guides/nuxt

This Dockerfile uses the Node.js LTS Alpine image to build and serve a Node.js application. It installs dependencies, copies code, builds the app, and sets the start command.

```dockerfile
# Use the Node alpine official image
# https://hub.docker.com/_/node
FROM node:lts-alpine AS build

# Create and change to the app directory.
WORKDIR /app

# Copy the files to the container image
COPY package*.json ./

# Install packages
RUN npm ci

# Copy local code to the container image.
COPY . .

# Build the app.
RUN npm run build

# Copy files to the container image.
COPY --from=build /app ./

# Serve the app
CMD ["npm", "run", "start"]
```

--------------------------------

### Natural Language Prompt: Deploy from Template (Database)

Source: https://docs.railway.com/ai/mcp-server

Example natural language prompt to deploy a single node ClickHouse database using a template.

```text
Deploy a single node ClickHouse database
```

--------------------------------

### Start the local Symfony server

Source: https://docs.railway.com/guides/symfony

Launches the local development server for the Symfony application.

```bash
symfony server:start
```

--------------------------------

### Example Cache Mount for Python

Source: https://docs.railway.com/builds/dockerfiles

Example of a cache mount for Python's pip cache directory.

```plaintext
--mount=type=cache,id=s/<service id>-/root/cache/pip,target=/root/.cache/pip
```

--------------------------------

### Get a Service Instance

Source: https://docs.railway.com/integrations/api/manage-services

Get detailed service configuration for a specific environment.

```APIDOC
## GET /api/services/{serviceId}/environments/{environmentId}

### Description
Retrieves detailed configuration for a specific service instance within a given environment.

### Method
GET

### Endpoint
`/api/services/{serviceId}/environments/{environmentId}`

### Parameters
#### Path Parameters
- **serviceId** (string) - Required - The ID of the service.
- **environmentId** (string) - Required - The ID of the environment.

### Response
#### Success Response (200)
- **id** (string) - The service instance ID.
- **serviceName** (string) - The name of the service.
- **startCommand** (string) - The command to start the service.
- **buildCommand** (string) - The command to build the service.
- **rootDirectory** (string) - The root directory for the service.
- **healthcheckPath** (string) - The path for health checks.
- **region** (string) - The region where the service instance is deployed.
- **numReplicas** (integer) - The number of replicas for the service instance.
- **restartPolicyType** (string) - The type of restart policy.
- **restartPolicyMaxRetries** (integer) - The maximum number of retries for the restart policy.
- **latestDeployment** (object) - Information about the latest deployment.
  - **id** (string) - The ID of the latest deployment.
  - **status** (string) - The status of the latest deployment.
  - **createdAt** (string) - The timestamp when the latest deployment was created.

### Response Example
```json
{
  "id": "instance-id",
  "serviceName": "My Service",
  "startCommand": "npm start",
  "buildCommand": "npm run build",
  "rootDirectory": "/app",
  "healthcheckPath": "/health",
  "region": "us-east-1",
  "numReplicas": 1,
  "restartPolicyType": "ON_FAILURE",
  "restartPolicyMaxRetries": 3,
  "latestDeployment": {
    "id": "deploy-id",
    "status": "SUCCESS",
    "createdAt": "2023-01-01T12:00:00Z"
  }
}
```
```

--------------------------------

### Start with verbose output

Source: https://docs.railway.com/cli/dev

Executes the development environment with verbose logging enabled.

```bash
railway dev --verbose
```

--------------------------------

### Update package.json Scripts

Source: https://docs.railway.com/guides/nextjs

Configures the start script to execute the standalone server file.

```json
{  "scripts": {    "dev": "next dev",    "build": "next build",    "start": "node .next/standalone/server.js",    "lint": "next lint"  }}
```

--------------------------------

### Install Node Adapter

Source: https://docs.railway.com/guides/sveltekit

Adds the required SvelteKit Node adapter as a development dependency.

```bash
npm i -D @sveltejs/adapter-node
```

--------------------------------

### Initialize a project

Source: https://docs.railway.com/cli/init

Basic command to initialize a new project.

```bash
railway init [OPTIONS]
```

--------------------------------

### Web Service Start Command

Source: https://docs.railway.com/guides/rails

Set this command in the Railway dashboard for your web service to start the Rails server.

```bash
bin/rails server -b ::
```

--------------------------------

### Connect to Redis Instance

Source: https://docs.railway.com/integrations/stripe

Example connection string for connecting to a provisioned Redis instance using redis-cli.

```shell
redis-cli -u "redis://default:PASSWORD@HOST:PORT"
```

--------------------------------

### Get Resource Limits

Source: https://docs.railway.com/integrations/api/manage-services

Get the resource limits for a service instance.

```APIDOC
## GET /api/services/{serviceId}/environments/{environmentId}/limits

### Description
Retrieves the resource limits configured for a specific service instance.

### Method
GET

### Endpoint
`/api/services/{serviceId}/environments/{environmentId}/limits`

### Parameters
#### Path Parameters
- **serviceId** (string) - Required - The ID of the service.
- **environmentId** (string) - Required - The ID of the environment.

### Response
#### Success Response (200)
- Returns a JSON object containing the resource limits for the service instance.

### Response Example
```json
{
  "cpu": "1000m",
  "memory": "512Mi"
}
```
```

--------------------------------

### Natural Language Prompt: Create New Environment

Source: https://docs.railway.com/ai/mcp-server

Example natural language prompt to create a new development environment cloned from production and set it as linked.

```text
Create a development environment called `development` 
cloned from production and set it as linked
```

--------------------------------

### Configure Railway start command for Luminus app

Source: https://docs.railway.com/guides/luminus

Set this command in your Railway service settings to run database migrations and then start the application. It finds the JAR file in the `target` directory and excludes SNAPSHOT versions.

```bash
java -jar $(find ./target -name '*.jar' ! -name '*SNAPSHOT*') migrate && java -jar $(find ./target -name '*.jar' ! -name '*SNAPSHOT*') 
```

--------------------------------

### Connect to PostgreSQL Database

Source: https://docs.railway.com/integrations/stripe

Example connection string for connecting to a provisioned PostgreSQL database using psql.

```sql
psql "postgresql://postgres:PASSWORD@HOST:PORT/railway"
```

--------------------------------

### Install Railway CLI with Scoop

Source: https://docs.railway.com/cli

Use this command to install the Railway CLI on Windows via Scoop.

```powershell
scoop install railway
```

--------------------------------

### Interactive project creation

Source: https://docs.railway.com/cli/init

Starts an interactive prompt to select a workspace and name the project.

```bash
railway init
```

--------------------------------

### Create a New Nuxt App

Source: https://docs.railway.com/guides/nuxt

Use this command to initialize a new Nuxt application. Ensure Node.js is installed.

```bash
npx nuxi@latest init helloworld
```

--------------------------------

### Create Django Project

Source: https://docs.railway.com/guides/django

Use the django-admin command to start a new Django project. This command initializes the project structure.

```bash
django-admin startproject liftoff
```

--------------------------------

### Install Production Web Server (Gunicorn)

Source: https://docs.railway.com/guides/flask

Install gunicorn, a production-ready WSGI HTTP server for Python, to serve your Flask app.

```bash
pip install gunicorn
```

--------------------------------

### Create project with specific name

Source: https://docs.railway.com/cli/init

Initializes a project with a predefined name.

```bash
railway init --name my-api
```

--------------------------------

### Get Volume Instance Details

Source: https://docs.railway.com/integrations/api/manage-volumes

Get details about a volume instance in a specific environment.

```APIDOC
## Get Volume Instance Details

### Description
Get details about a volume instance (volume in a specific environment).

### Method
GET (or GraphQL query)

### Endpoint
`/api/volume-instances/{volumeInstanceId}` (Conceptual REST endpoint)

### Request Example
```graphql
query volumeInstance($id: String!) {
  volumeInstance(id: $id) {
    id
    mountPath
    currentSizeMB
    state
    volume {
      id
      name
    }
    serviceInstance {
      serviceName
    }
  }
}
```

Variables
```json
{
  "id": "volume-instance-id"
}
```

### Response
#### Success Response (200)
- **id** (string) - The ID of the volume instance.
- **mountPath** (string) - The path where the volume is mounted.
- **currentSizeMB** (integer) - The current size of the volume in MB.
- **state** (string) - The current state of the volume instance.
- **volume** (object) - Information about the associated volume.
  - **id** (string) - The ID of the volume.
  - **name** (string) - The name of the volume.
- **serviceInstance** (object) - Information about the associated service instance.
  - **serviceName** (string) - The name of the service.

#### Response Example
```json
{
  "data": {
    "volumeInstance": {
      "id": "vol-inst-456",
      "mountPath": "/data",
      "currentSizeMB": 1024,
      "state": "mounted",
      "volume": {
        "id": "vol-123",
        "name": "my-volume"
      },
      "serviceInstance": {
        "serviceName": "my-service"
      }
    }
  }
}
```
```

--------------------------------

### Node.js OpenTelemetry SDK Setup

Source: https://docs.railway.com/guides/deploy-an-otel-collector-stack

This code initializes the OpenTelemetry Node.js SDK, configuring it with service name, version, trace and metric exporters, and auto-instrumentations. Ensure the OTEL_EXPORTER_OTLP_ENDPOINT environment variable is set.

```javascript
// Otel Docs Reference - https://opentelemetry.io/docs/languages/js/instrumentationconst { NodeSDK } = require("@opentelemetry/sdk-node");const {  getNodeAutoInstrumentations,} = require("@opentelemetry/auto-instrumentations-node");const {  OTLPTraceExporter,} = require("@opentelemetry/exporter-trace-otlp-proto");const { Resource } = require("@opentelemetry/resources");const {  SEMRESATTRS_SERVICE_NAME,  SEMRESATTRS_SERVICE_VERSION,} = require("@opentelemetry/semantic-conventions");const {  OTLPMetricExporter,} = require("@opentelemetry/exporter-metrics-otlp-proto");const {  PeriodicExportingMetricReader,} = require("@opentelemetry/sdk-metrics");const sdk = new NodeSDK({  resource: new Resource({    [SEMRESATTRS_SERVICE_NAME]: "dice-server",    [SEMRESATTRS_SERVICE_VERSION]: "0.1.0",  }),  traceExporter: new OTLPTraceExporter({    url: `http://${process.env.OTEL_EXPORTER_OTLP_ENDPOINT}/v1/traces`,  }),  metricReader: new PeriodicExportingMetricReader({    exporter: new OTLPMetricExporter({      url: `http://${process.env.OTEL_EXPORTER_OTLP_ENDPOINT}/v1/metrics`,    }),  }),  instrumentations: [getNodeAutoInstrumentations()],});sdk.start();
```

--------------------------------

### Initialize Node.js Project

Source: https://docs.railway.com/guides/deploy-node-express-api-with-auto-scaling-secrets-and-zero-downtime

Create a new directory and initialize a package.json file.

```bash
mkdir my-express-apicd my-express-apinpm init -y
```

--------------------------------

### Dice Rolling Logic with OpenTelemetry Spans

Source: https://docs.railway.com/guides/deploy-an-otel-collector-stack

Implements dice rolling functions with OpenTelemetry tracing. It demonstrates how to get a tracer, start and end spans for operations, and set attributes on spans for detailed telemetry.

```javascript
// Otel Docs Reference - https://opentelemetry.io/docs/languages/js/instrumentation/const { trace } = require("@opentelemetry/api");// obtain a traceconst tracer = trace.getTracer("dice-lib");function rollOnce(i, min, max) {  // start a span  return tracer.startActiveSpan(`rollOnce:${i}`, span => {    const result = Math.floor(Math.random() * (max - min) + min);    // Add an attribute to the span    span.setAttribute("dicelib.rolled", result.toString());    // end the span    span.end();    return result;  });}function rollTheDice(rolls, min, max) {  // Create a span. A span must be closed.  return tracer.startActiveSpan("rollTheDice", parentSpan => {    const result = [];    for (let i = 0; i < rolls; i++) {      result.push(rollOnce(i, min, max));    }    // Be sure to end the span!    parentSpan.end();    return result;  });}module.exports = { rollTheDice };
```

--------------------------------

### Natural Language Prompt: Create and Deploy App

Source: https://docs.railway.com/ai/mcp-server

Example natural language prompt to create a new Next.js app, deploy it to Railway, and assign a domain.

```text
Create a Next.js app in this directory and deploy it to Railway.
Also assign it a domain.
```

--------------------------------

### Nuxt.js Start Command

Source: https://docs.railway.com/deployments/troubleshooting/no-start-command-could-be-found

Run a Nuxt.js application in production mode using its built-in Nitro server. This command starts the server located at `.output/server/index.mjs`.

```bash
node .output/server/index.mjs
```

--------------------------------

### Install MCP Server in Cursor

Source: https://docs.railway.com/ai/mcp-server

Add this configuration to your `.cursor/mcp.json` file to manually install the Railway MCP server in Cursor.

```json
{
  "mcpServers": {
    "Railway": {
      "command": "npx",
      "args": ["-y", "@railway/mcp-server"]
    }
  }
}
```

--------------------------------

### Run a Node.js app

Source: https://docs.railway.com/cli/run

Executes the npm start command with environment variables from the linked service.

```bash
railway run npm start
```

--------------------------------

### Install Sails Globally

Source: https://docs.railway.com/guides/sails

Install the Sails.js framework globally using npm. This command is required before creating a new Sails application.

```bash
npm install sails -g
```

--------------------------------

### Install Railway CLI with npm

Source: https://docs.railway.com/cli

Install the Railway CLI globally using npm. Requires Node.js version 16 or higher.

```bash
npm i -g @railway/cli
```

--------------------------------

### Next.js Start Command

Source: https://docs.railway.com/deployments/troubleshooting/no-start-command-could-be-found

Start a Next.js application in production mode. The `--port $PORT` flag is crucial for ensuring the application listens on the correct port assigned by Railway.

```bash
npx next start --port $PORT
```

--------------------------------

### Run database migrations and start app locally

Source: https://docs.railway.com/guides/luminus

Execute database migrations using `lein run migrate` and then start the Luminus application locally by running `lein run`. Access the app at `http://localhost:3000`.

```bash
lein run migrate
```

```bash
lein run
```

--------------------------------

### Worker Service (SolidQueue) Start Command

Source: https://docs.railway.com/guides/rails

Configure this command in the Railway dashboard to start a SolidQueue worker service.

```bash
bin/jobs
```

--------------------------------

### Install Railway CLI with Homebrew

Source: https://docs.railway.com/cli

Use this command to install the Railway CLI on macOS via Homebrew.

```bash
brew install railway
```

--------------------------------

### Install PostgreSQL Adapter

Source: https://docs.railway.com/guides/sails

Install the `sails-postgresql` adapter locally to enable your Sails app to connect to a PostgreSQL database.

```bash
npm install sails-postgresql --save
```

--------------------------------

### Configure Cron Service Start Command

Source: https://docs.railway.com/guides/django

Set the custom start command for the Celery Beat service to manage scheduled tasks.

```bash
celery -A liftoff beat -l info --concurrency=3
```

--------------------------------

### Fastify server implementation

Source: https://docs.railway.com/guides/add-a-cdn-using-cloudfront

A Fastify server setup with dynamic, static, and ETag-enabled routes for testing CDN caching behavior.

```javascript
const Fastify = require("fastify");const fastifyEtag = require("@fastify/etag");const fastify = Fastify();fastify.register(fastifyEtag);fastify.get("/dynamic", async (request, reply) => {  console.log("Received request on dynamic route");  const staticContent = {    message: "This is some dynamic content",    timestamp: new Date().toISOString(),  };  reply.type("application/json");  reply.headers({    "cache-control": "must-revalidate, max-age=60",  });  reply.send(staticContent);});fastify.get("/static", async (request, reply) => {  console.log("Received request on static route");  const staticContent = {    message: "This is some static content",  };  reply.type("application/json");  reply.headers({    "cache-control": "must-revalidate, max-age=60",  });  reply.send(staticContent);});fastify.get("/staticEtag", async (request, reply) => {  console.log("Received request on staticEtag route");  const staticContent = {    message: "This will serve a static etag",  };  reply.type("application/json");  reply.headers({    "cache-control": "must-revalidate, max-age=60",  });  reply.header("etag", '"foobar"');  reply.send(staticContent);});const start = async () => {  try {    await fastify.listen({      port: Number(process.env.PORT) || 3000,      host: "0.0.0.0",    });    console.log(      `Server is running at PORT:${Number(process.env.PORT) || 3000}`,    );  } catch (err) {    fastify.log.error(err);    process.exit(1);  }};start();
```

--------------------------------

### Run Angular app locally

Source: https://docs.railway.com/guides/angular

Starts the development server for local testing.

```bash
npm start
```

--------------------------------

### Install Railway CLI with Shell Script

Source: https://docs.railway.com/cli

Install the Railway CLI using a shell script. For Windows, use WSL with a Bash shell.

```bash
bash <(curl -fsSL cli.new)
```

--------------------------------

### Worker Service (Sidekiq) Start Command

Source: https://docs.railway.com/guides/rails

Use this command in the Railway dashboard to start a Sidekiq worker service.

```bash
bundle exec sidekiq
```

--------------------------------

### Create Project

Source: https://docs.railway.com/integrations/api/api-cookbook

Initialize a new project with a specified name.

```graphql
mutation projectCreate($input: ProjectCreateInput!) {    projectCreate(input: $input) {      id    }  }
```

```json
{  "input": {    "name": "My Project"  }}
```

--------------------------------

### Install MCP Server in VS Code

Source: https://docs.railway.com/ai/mcp-server

Add this configuration to your `.vscode/mcp.json` file to install the Railway MCP server in VS Code.

```json
{
  "servers": {
    "Railway": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@railway/mcp-server"]
    }
  }
}
```

--------------------------------

### Create a SvelteKit App

Source: https://docs.railway.com/guides/sveltekit

Initializes a new SvelteKit project using the Vite scaffolding tool.

```bash
npx sv create svelteapp
```

--------------------------------

### Start Sails App Locally

Source: https://docs.railway.com/guides/sails

Navigate into your newly created Sails application directory and start the development server. Access your app at http://localhost:1337.

```bash
cd workapp
sails lift
```

--------------------------------

### Flask Start Command

Source: https://docs.railway.com/deployments/troubleshooting/no-start-command-could-be-found

Run a Flask application using Gunicorn. Replace `main` with the name of the Python file containing your Flask `app` instance.

```bash
gunicorn main:app
```

--------------------------------

### Run the Beego app locally

Source: https://docs.railway.com/guides/beego

Starts the Beego application locally. Access it via http://localhost:8080.

```bash
bee run
```

--------------------------------

### Initialize Git and Push to GitHub

Source: https://docs.railway.com/platform/migrate-from-bolt

Use these commands to initialize a Git repository, add all project files, commit them with a message, set the remote origin to your GitHub repository, and push the changes to the main branch.

```bash
cd your-project
git init
git add .
git commit -m "Initial commit from Bolt"
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main
```

--------------------------------

### railway dev - Start local development

Source: https://docs.railway.com/cli/dev

Starts image-based services (databases, etc.) via Docker Compose and prompts you to configure code-based services.

```APIDOC
## POST /websites/railway/dev

### Description
Starts image-based services (databases, etc.) via Docker Compose and prompts you to configure code-based services.

### Method
POST

### Endpoint
/websites/railway/dev

### Query Parameters
- **--verbose** (boolean) - Optional - Show verbose domain replacement info
- **--no-https** (boolean) - Optional - Disable HTTPS and pretty URLs
- **--dry-run** (boolean) - Optional - Generate docker-compose.yml without starting
- **--no-tui** (boolean) - Optional - Disable TUI, stream logs to stdout
- **-e, --environment** (string) - Optional - Environment to use
- **-o, --output** (string) - Optional - Output path for docker-compose.yml
```

--------------------------------

### Add Start Script to package.json

Source: https://docs.railway.com/guides/nuxt

Add the 'start' script to your package.json to enable Railway to run your Nuxt app. This script is used by Railpack for deployment.

```json
{
    "name": "nuxt-app",
    "private": true,
    "type": "module",
    "scripts": {
        "build": "nuxt build",
        "dev": "nuxt dev",
        "start": "node .output/server/index.mjs",
        "generate": "nuxt generate",
        "preview": "nuxt preview",
        "postinstall": "nuxt prepare"
    },
    "dependencies": {
        "nuxt": "^3.13.0",
        "vue": "latest",
        "vue-router": "latest"
    }
}
```

--------------------------------

### Configure Worker Service Start Command

Source: https://docs.railway.com/guides/django

Set the custom start command for the Celery worker service to process background jobs.

```bash
celery -A liftoff worker -l info --concurrency=3
```

--------------------------------

### Configure PostgreSQL in application.conf

Source: https://docs.railway.com/guides/play

Set up the default database connection for PostgreSQL in the `conf/application.conf` file. Remember to replace placeholder credentials with your actual username and password.

```hocon
# Default database configuration using PostgreSQLdb.default.driver = org.postgresql.Driverdb.default.url = "jdbc:postgresql://username:password@127.0.0.1:5432/scala_play"  # Replace with correct credentials
```

--------------------------------

### Install CDK CloudFront Packages

Source: https://docs.railway.com/guides/add-a-cdn-using-cloudfront

Install the necessary AWS CDK packages for CloudFront and core functionality. These are required for defining and deploying your CloudFront distribution.

```bash
npm install @aws-cdk/aws-cloudfront @aws-cdk aws-cloudfront-origins @aws-cdk/core
```

--------------------------------

### Add Axum and Tokio dependencies

Source: https://docs.railway.com/guides/axum

Installs the necessary dependencies for the Axum framework and the Tokio runtime with full features enabled.

```bash
cargo add axumcargo add tokio --features full
```

--------------------------------

### Install Railway Agent Skills via Shell

Source: https://docs.railway.com/ai/agent-skills

Use this command to install the Railway agent skills directly using a shell script.

```bash
curl -fsSL railway.com/skills.sh | bash
```

--------------------------------

### Create a Remix App

Source: https://docs.railway.com/guides/remix

Initializes a new Remix project in the current directory.

```bash
npx create-remix@latest
```

--------------------------------

### Get Project Details

Source: https://docs.railway.com/integrations/api/api-cookbook

Fetch project services and environments by ID.

```graphql
query project($id: String!) {    project(id: $id) {      id      name      services {        edges {          node { id name }        }      }      environments {        edges {          node { id name }        }      }    }  }
```

```json
{  "id": "project-id"}
```

--------------------------------

### Modify package.json for production

Source: https://docs.railway.com/guides/astro

Update the start script to point to the server entry point generated during the build process.

```json
{
    "name": "astroblog",
    "type": "module",
    "version": "0.0.1",
    "scripts": {
        "dev": "astro dev",
        "start": "node ./dist/server/entry.mjs",
        "build": "astro check && astro build",
        "preview": "astro preview",
        "astro": "astro"
    },
    "dependencies": {
        "@astrojs/check": "^0.9.4",
        "@astrojs/mdx": "^3.1.8",
        "@astrojs/node": "^8.3.4",
        "@astrojs/rss": "^4.0.9",
        "@astrojs/sitemap": "^3.2.1",
        "astro": "^4.16.6",
        "typescript": "^5.6.3"
    }
}
```

--------------------------------

### Add TailwindCSS to existing Rails app

Source: https://docs.railway.com/guides/rails

Install the tailwindcss-rails gem and run the installer script to integrate Tailwind into an existing project.

```bash
bundle add tailwindcss-railsbin/rails tailwindcss:install
```

--------------------------------

### Generate requirements.txt

Source: https://docs.railway.com/guides/flask

Create a 'requirements.txt' file to list all installed Python packages and their versions. This is crucial for deployment.

```bash
pip freeze > requirements.txt
```

--------------------------------

### Configure Pre-Deploy Command

Source: https://docs.railway.com/config-as-code/reference

Set a command to execute before the main deployment starts. This field can be omitted.

```json
{
  "$schema": "https://railway.com/railway.schema.json",
  "deploy": {
    "preDeployCommand": ["npm run db:migrate"]
  }
}
```

--------------------------------

### Initialize an Astro project

Source: https://docs.railway.com/guides/astro

Use this command to scaffold a new Astro application in your local environment.

```bash
npm create astro@latest
```

--------------------------------

### Create a New Phoenix App

Source: https://docs.railway.com/guides/phoenix

Generates a new Phoenix application named 'helloworld'. You will be prompted to install dependencies.

```bash
mix phx.new helloworld
```

--------------------------------

### Create a new Luminus app

Source: https://docs.railway.com/guides/luminus

Use this command to create a new Luminus app with PostgreSQL support and a production-ready server. Ensure JDK and Leiningen are installed.

```bash
lein new luminus helloworld +postgres +immutant
```

--------------------------------

### Create Source Directory

Source: https://docs.railway.com/guides/deploy-node-express-api-with-auto-scaling-secrets-and-zero-downtime

Create the source directory for the application code.

```bash
mkdir src
```

--------------------------------

### Create a project

Source: https://docs.railway.com/integrations/api/manage-projects

Create a new empty project by providing a name.

```GraphQL
mutation projectCreate($input: ProjectCreateInput!) {projectCreate(input: $input) {  id  name}}
```

```JSON
{
  "input": {
    "name": "My New Project"
  }
}
```

--------------------------------

### Check version with --version

Source: https://docs.railway.com/cli/global-options

Display the currently installed version of the Railway CLI.

```bash
railway --version
```

--------------------------------

### Create a New React App with Vite

Source: https://docs.railway.com/guides/react

Use this command to create a new React application using Vite. Ensure Node.js is installed.

```bash
npm create vite@latest helloworld -- --template react
```

--------------------------------

### Install Node.js dependencies

Source: https://docs.railway.com/guides/set-up-a-datadog-agent

Required packages for the Express application to send logs and metrics to the Datadog agent.

```bash
npm i express winston winston-syslog dd-trace
```

--------------------------------

### Get Project Volumes

Source: https://docs.railway.com/integrations/api/manage-volumes

List all volumes in a project.

```APIDOC
## Get Project Volumes

### Description
List all volumes in a project.

### Method
GET (or GraphQL query)

### Endpoint
`/api/projects/{projectId}/volumes` (Conceptual REST endpoint)

### Request Example
```graphql
query project($id: String!) {
  project(id: $id) {
    volumes {
      edges {
        node {
          id
          name
          createdAt
        }
      }
    }
  }
}
```

Variables
```json
{
  "id": "project-id"
}
```

### Response
#### Success Response (200)
- **id** (string) - The ID of the volume.
- **name** (string) - The name of the volume.
- **createdAt** (string) - The timestamp when the volume was created.

#### Response Example
```json
{
  "data": {
    "project": {
      "volumes": {
        "edges": [
          {
            "node": {
              "id": "vol-123",
              "name": "my-volume",
              "createdAt": "2023-10-27T10:00:00Z"
            }
          }
        ]
      }
    }
  }
}
```
```

--------------------------------

### Get Deployment Logs

Source: https://docs.railway.com/integrations/api/api-cookbook

Fetch logs for a specific deployment.

```graphql
query deploymentLogs($deploymentId: String!, $limit: Int) {    deploymentLogs(deploymentId: $deploymentId, limit: $limit) {      timestamp      message      severity    }  }
```

```json
{  "deploymentId": "deployment-id",  "limit": 100}
```

--------------------------------

### Bind Next.js to IPv4 and IPv6

Source: https://docs.railway.com/private-networking

Configure Next.js start command or custom server to bind to all interfaces.

```bash
next start --hostname :: --port ${PORT-3000}
```

```javascript
const port = process.env.PORT || 3000;const app = next({  // ...  hostname: "::",  port: port,});
```

--------------------------------

### Get Variables

Source: https://docs.railway.com/integrations/api/api-cookbook

Retrieve environment variables for a project, environment, and service.

```graphql
query variables($projectId: String!, $environmentId: String!, $serviceId: String) {    variables(projectId: $projectId, environmentId: $environmentId, serviceId: $serviceId)  }
```

```json
{  "projectId": "project-id",  "environmentId": "environment-id",  "serviceId": "service-id"}
```

--------------------------------

### Create run-app.sh for Symfony App Service

Source: https://docs.railway.com/guides/symfony

This script executes database migrations and starts the Nginx server. Ensure the file has executable permissions using chmod +x run-app.sh.

```bash
#!/bin/bash# Make sure this file has executable permissions, run `chmod +x run-app.sh`# Run migrations, process the Nginx configuration template and start Nginxphp bin/console doctrine:migrations:migrate --no-interaction && node /assets/scripts/prestart.mjs /assets/nginx.template.conf /nginx.conf && (php-fpm -y /assets/php-fpm.conf & nginx -c /nginx.conf)
```

--------------------------------

### Run Phoenix App Locally

Source: https://docs.railway.com/guides/phoenix

Starts the Phoenix application server. The app will be accessible at http://localhost:4000 by default.

```bash
mix phx.server
```

--------------------------------

### Create a SolidJS Application

Source: https://docs.railway.com/guides/solid

Initializes a new SolidJS project from a template using degit.

```bash
npx degit solidjs/templates/js solidjsapp
```

--------------------------------

### Get a single project

Source: https://docs.railway.com/integrations/api/manage-projects

Fetch a project by its ID, including its services and environments.

```APIDOC
## Get a single project

### Description
Fetch a project by ID with its services and environments.

### Method
GET

### Endpoint
/api/projects/{id}

### Query Parameters
- **id** (string) - Required - The ID of the project to retrieve.

### Request Example
```graphql
query project($id: String!) {
  project(id: $id) {
    id
    name
    description
    createdAt
    services {
      edges {
        node {
          id
          name
          icon
        }
      }
    }
    environments {
      edges {
        node {
          id
          name
        }
      }
    }
  }
}
```

### Request Variables
```json
{
  "id": "project-id"
}
```

### Response
#### Success Response (200)
- **id** (string) - The unique identifier for the project.
- **name** (string) - The name of the project.
- **description** (string) - A description of the project.
- **createdAt** (string) - The timestamp when the project was created.
- **services** (array) - A list of services associated with the project.
  - **id** (string) - The unique identifier for the service.
  - **name** (string) - The name of the service.
  - **icon** (string) - The icon associated with the service.
- **environments** (array) - A list of environments associated with the project.
  - **id** (string) - The unique identifier for the environment.
  - **name** (string) - The name of the environment.

#### Response Example
```json
{
  "data": {
    "project": {
      "id": "project-id",
      "name": "My Project",
      "description": "Details of my project.",
      "createdAt": "2023-01-01T10:00:00Z",
      "services": {
        "edges": [
          {
            "node": {
              "id": "service-id-1",
              "name": "Frontend Service",
              "icon": "react"
            }
          }
        ]
      },
      "environments": {
        "edges": [
          {
            "node": {
              "id": "env-id-1",
              "name": "Production"
            }
          }
        ]
      }
    }
  }
}
```
```

--------------------------------

### Get a service instance

Source: https://docs.railway.com/integrations/api/manage-services

Retrieve detailed configuration for a service instance within a specific environment.

```GraphQL
query serviceInstance($serviceId: String!, $environmentId: String!) {serviceInstance(serviceId: $serviceId, environmentId: $environmentId) {  id  serviceName  startCommand  buildCommand  rootDirectory  healthcheckPath  region  numReplicas  restartPolicyType  restartPolicyMaxRetries  latestDeployment {    id    status    createdAt  }}}
```

```JSON
{  "serviceId": "service-id",  "environmentId": "environment-id"}
```

--------------------------------

### Example CAA Record for Let's Encrypt

Source: https://docs.railway.com/networking/troubleshooting/ssl

This is an example of a valid CAA record that permits Let's Encrypt to issue certificates for your domain. Ensure your domain's CAA records include this if you are using Let's Encrypt.

```dns
yourdomain.com.  CAA  0 issue "letsencrypt.org"
```

--------------------------------

### Initialize a new Cargo project

Source: https://docs.railway.com/guides/axum

Creates a new binary-based Cargo project in a directory named helloworld.

```bash
cargo new helloworld --bin
```

--------------------------------

### Get a single project

Source: https://docs.railway.com/integrations/api/manage-projects

Retrieve details for a specific project, including its services and environments.

```GraphQL
query project($id: String!) {project(id: $id) {  id  name  description  createdAt  services {    edges {      node {        id        name        icon      }    }  }  environments {    edges {      node {        id        name      }    }  }}}
```

```JSON
{
  "id": "project-id"
}
```

--------------------------------

### Deploy a template interactively

Source: https://docs.railway.com/cli/deploy

Initiates the deployment process in interactive mode.

```bash
railway deploy
```

--------------------------------

### Get workspace

Source: https://docs.railway.com/integrations/api/api-cookbook

Fetches details and member information for a specific workspace.

```GraphQL
query workspace($workspaceId: String!) {    workspace(workspaceId: $workspaceId) {      id      name      members {        id        name        email        role      }    }  }
```

```JSON
{  "workspaceId": "workspace-id"}
```

--------------------------------

### Get a Service

Source: https://docs.railway.com/integrations/api/manage-services

Fetch a service by its ID.

```APIDOC
## GET /api/services/{id}

### Description
Fetches a service by its unique identifier.

### Method
GET

### Endpoint
`/api/services/{id}`

### Parameters
#### Path Parameters
- **id** (string) - Required - The unique identifier of the service.

### Response
#### Success Response (200)
- **id** (string) - The service ID.
- **name** (string) - The name of the service.
- **icon** (string) - The icon associated with the service.
- **createdAt** (string) - The timestamp when the service was created.
- **projectId** (string) - The ID of the project the service belongs to.

### Response Example
```json
{
  "id": "service-id",
  "name": "My Service",
  "icon": "",
  "createdAt": "2023-01-01T12:00:00Z",
  "projectId": "project-id"
}
```
```

--------------------------------

### Get build logs

Source: https://docs.railway.com/integrations/api/manage-deployments

Retrieves build logs for a specific deployment.

```APIDOC
## POST /graphql

### Description
Fetch build logs for a deployment.

### Method
POST

### Request Body
- **deploymentId** (String) - Required - The deployment ID
- **limit** (Int) - Optional - Number of log lines to return

### Request Example
{
  "deploymentId": "deployment-id",
  "limit": 500
}
```

--------------------------------

### POST /graphql - Get Workspace

Source: https://docs.railway.com/integrations/api/api-cookbook

Retrieves details about a specific workspace.

```APIDOC
## POST /graphql

### Description
Fetches workspace details.

### Request Body
- **workspaceId** (String) - Required

### Request Example
{
  "workspaceId": "workspace-id"
}
```

--------------------------------

### Natural Language Prompt: Pull Environment Variables

Source: https://docs.railway.com/ai/mcp-server

Example natural language prompt to pull environment variables and save them to a .env file.

```text
Pull environment variables for my project and save them to a .env file
```

--------------------------------

### Volume Backups - List Backups

Source: https://docs.railway.com/integrations/api/manage-volumes

Get all backups for a volume instance.

```APIDOC
## Volume Backups - List Backups

### Description
Get all backups for a volume instance.

### Method
GET (or GraphQL query)

### Endpoint
`/api/volume-instances/{volumeInstanceId}/backups` (Conceptual REST endpoint)

### Parameters
#### Query Parameters
- **volumeInstanceId** (string) - Required - The ID of the volume instance.

### Request Example
```graphql
query volumeInstanceBackupList($volumeInstanceId: String!) {
  volumeInstanceBackupList(volumeInstanceId: $volumeInstanceId) {
    id
    name
    createdAt
    expiresAt
    usedMB
    referencedMB
  }
}
```

Variables
```json
{
  "volumeInstanceId": "volume-instance-id"
}
```

### Response
#### Success Response (200)
- **id** (string) - The ID of the backup.
- **name** (string) - The name of the backup.
- **createdAt** (string) - The timestamp when the backup was created.
- **expiresAt** (string) - The timestamp when the backup expires.
- **usedMB** (integer) - The size of the backup in MB.
- **referencedMB** (integer) - The referenced size of the backup in MB.

#### Response Example
```json
{
  "data": {
    "volumeInstanceBackupList": [
      {
        "id": "backup-abc",
        "name": "backup-20231027",
        "createdAt": "2023-10-27T10:00:00Z",
        "expiresAt": "2023-11-27T10:00:00Z",
        "usedMB": 512,
        "referencedMB": 500
      }
    ]
  }
}
```
```

--------------------------------

### Update Service Settings

Source: https://docs.railway.com/integrations/api/api-cookbook

Modify service configuration such as start commands.

```graphql
mutation serviceInstanceUpdate($serviceId: String!, $environmentId: String!, $input: ServiceInstanceUpdateInput!) {    serviceInstanceUpdate(serviceId: $serviceId, environmentId: $environmentId, input: $input)  }
```

```json
{  "serviceId": "service-id",  "environmentId": "environment-id",  "input": {    "startCommand": "npm start"  }}
```

--------------------------------

### POST /graphql/v2 - Get Deployment Logs

Source: https://docs.railway.com/integrations/api/api-cookbook

Retrieves logs for a specific deployment.

```APIDOC
## POST /graphql/v2

### Description
Fetches logs for a given deployment ID.

### Method
POST

### Endpoint
https://backboard.railway.com/graphql/v2

### Parameters
#### Query Parameters
- **deploymentId** (String) - Required - The ID of the deployment.
- **limit** (Int) - Optional - Number of log lines to return.

### Request Example
```graphql
query deploymentLogs($deploymentId: String!, $limit: Int) { deploymentLogs(deploymentId: $deploymentId, limit: $limit) { timestamp message severity } }
```
```

--------------------------------

### Clone Example Terraform Project

Source: https://docs.railway.com/guides/bridge-railway-to-rds-with-tailscale

Clone the provided Terraform project repository to set up AWS resources for RDS connectivity testing.

```bash
git clone git@github.com:echohack/rds-tailscale.git
```

--------------------------------

### Run Flask App Locally

Source: https://docs.railway.com/guides/flask

Start the Flask development server to test your application locally. Access it at http://127.0.0.1:5000.

```bash
flask --app helloworld run
```

--------------------------------

### Create a Next.js Application

Source: https://docs.railway.com/guides/nextjs

Initializes a new Next.js project using the latest version.

```bash
npx create-next-app@latest helloworld
```

--------------------------------

### Get a service

Source: https://docs.railway.com/integrations/api/manage-services

Fetch details for a specific service by its ID.

```GraphQL
query service($id: String!) {service(id: $id) {  id  name  icon  createdAt  projectId}}
```

```JSON
{  "id": "service-id"}
```

--------------------------------

### Get resource limits

Source: https://docs.railway.com/integrations/api/manage-services

Retrieve the resource limits for a service instance.

```GraphQL
query serviceInstanceLimits($serviceId: String!, $environmentId: String!) {serviceInstanceLimits(serviceId: $serviceId, environmentId: $environmentId)}
```

```JSON
{  "serviceId": "service-id",  "environmentId": "environment-id"}
```

--------------------------------

### Add the Node adapter for SSR

Source: https://docs.railway.com/guides/astro

Install the Node adapter to enable server-side rendering capabilities in your Astro project.

```bash
npx astro add node
```

--------------------------------

### Configure MongoDB Docker Container for IPv6

Source: https://docs.railway.com/networking/private-networking/library-configuration

Use the --ipv6 and --bind_ip flags in the start command to allow the MongoDB instance to listen on IPv6.

```bash
docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0
```

--------------------------------

### Get environment logs

Source: https://docs.railway.com/integrations/api/manage-environments

Fetches logs from all services within a specific environment.

```APIDOC
## POST /graphql

### Description
Retrieve logs for an environment, optionally filtered by a string.

### Method
POST

### Parameters
#### Request Body
- **environmentId** (String) - Required - The ID of the environment.
- **filter** (String) - Optional - Filter string for logs.
```

--------------------------------

### Create a new Rails application

Source: https://docs.railway.com/guides/rails

Initializes a new Rails project with PostgreSQL as the database configuration.

```bash
rails new blog --database=postgresql
```

--------------------------------

### Get a single deployment

Source: https://docs.railway.com/integrations/api/manage-deployments

Fetches detailed information about a specific deployment by its ID.

```APIDOC
## POST /graphql

### Description
Fetch a deployment by ID.

### Method
POST

### Request Body
- **id** (String) - Required - The unique deployment ID

### Request Example
{
  "id": "deployment-id"
}
```

--------------------------------

### GraphQL Mutation for Project Creation

Source: https://docs.railway.com/integrations/api/graphql-overview

Example of a GraphQL mutation to create a new project. It takes an input object and returns the ID and name of the newly created project.

```graphql
mutation projectCreate($input: ProjectCreateInput!) {
  projectCreate(input: $input) {
    id
    name
  }
}
```

```json
{
  "input": {
    "name": "my-new-project"
  }
}
```

--------------------------------

### Get rendered variables for deployment

Source: https://docs.railway.com/integrations/api/manage-variables

Fetch all variables as they will appear during a deployment, with all references resolved.

```GraphQL
query variablesForServiceDeployment($projectId: String!, $environmentId: String!, $serviceId: String!) {
variablesForServiceDeployment(
  projectId: $projectId
  environmentId: $environmentId
  serviceId: $serviceId
)
}
```

```JSON
{
  "projectId": "project-id",
  "environmentId": "environment-id",
  "serviceId": "service-id"
}
```

--------------------------------

### Install Flyway SBT Plugin

Source: https://docs.railway.com/guides/play

Add the Flyway SBT plugin to your `project/plugin.sbt` file to manage database migrations.

```scala
addSbtPlugin("io.github.davidmweber" % "flyway-sbt" % "7.4.0")
```

--------------------------------

### Custom Start Command for Express App

Source: https://docs.railway.com/guides/deploy-an-otel-collector-stack

This command wraps your Express application startup with the Node.js instrumentation SDK. It ensures that all telemetry data is captured before the application begins processing requests.

```bash
node --require ./instrumentation.js app.js
```

--------------------------------

### Create a new Symfony application

Source: https://docs.railway.com/guides/symfony

Initializes a new Symfony project with the webapp skeleton.

```bash
symfony new --webapp apphelloworld
```

--------------------------------

### Get project members

Source: https://docs.railway.com/integrations/api/manage-projects

List all members associated with a specific project.

```APIDOC
## Get project members

### Description
List all members of a project.

### Method
GET

### Endpoint
/api/projects/{projectId}/members

### Query Parameters
- **projectId** (string) - Required - The ID of the project to list members from.

### Request Example
```graphql
query projectMembers($projectId: String!) {
  projectMembers(projectId: $projectId) {
    id
    role
    user {
      id
      name
      email
    }
  }
}
```

### Request Variables
```json
{
  "projectId": "project-id"
}
```

### Response
#### Success Response (200)
- **id** (string) - The unique identifier for the membership.
- **role** (string) - The role of the user in the project (e.g., 'owner', 'member').
- **user** (object) - Information about the user.
  - **id** (string) - The unique identifier for the user.
  - **name** (string) - The name of the user.
  - **email** (string) - The email address of the user.

#### Response Example
```json
{
  "data": {
    "projectMembers": [
      {
        "id": "membership-id-1",
        "role": "owner",
        "user": {
          "id": "user-id-1",
          "name": "Jane Doe",
          "email": "jane.doe@example.com"
        }
      }
    ]
  }
}
```
```

--------------------------------

### Initialize and Apply Terraform Configuration

Source: https://docs.railway.com/guides/bridge-railway-to-rds-with-tailscale

Initialize the Terraform working directory, plan the deployment, and apply the configuration to provision AWS resources. Review changes and confirm with 'yes'.

```bash
terraform init
terraform plan
terraform apply
```

--------------------------------

### Create a project

Source: https://docs.railway.com/integrations/api/manage-projects

Create a new empty project.

```APIDOC
## Create a project

### Description
Create a new empty project.

### Method
POST

### Endpoint
/api/projects

### Request Body
- **input** (object) - Required - Input object for creating a project.
  - **name** (string) - Required - The name of the new project.

### Request Example
```graphql
mutation projectCreate($input: ProjectCreateInput!) {
  projectCreate(input: $input) {
    id
    name
  }
}
```

### Request Variables
```json
{
  "input": {
    "name": "My New Project"
  }
}
```

### Response
#### Success Response (200)
- **id** (string) - The unique identifier for the newly created project.
- **name** (string) - The name of the newly created project.

#### Response Example
```json
{
  "data": {
    "projectCreate": {
      "id": "new-project-id",
      "name": "My New Project"
    }
  }
}
```
```

--------------------------------

### List all projects via CLI

Source: https://docs.railway.com/cli/list

Displays a list of all projects organized by workspace.

```bash
railway list [OPTIONS]
```

```bash
railway list
```

--------------------------------

### Install Sidekiq dependencies

Source: https://docs.railway.com/guides/rails

Add the necessary gems to your Rails application to enable Sidekiq and cron job functionality.

```bash
bundle add sidekiqbundle add sidekiq-cron
```

--------------------------------

### Run NestJS application locally

Source: https://docs.railway.com/guides/nest

Starts the development server. Use the PORT environment variable to override the default port.

```bash
npm run start
```

```bash
PORT=8080 npm run start
```

--------------------------------

### Get project members

Source: https://docs.railway.com/integrations/api/manage-projects

Retrieve a list of all members associated with a specific project.

```GraphQL
query projectMembers($projectId: String!) {projectMembers(projectId: $projectId) {  id  role  user {    id    name    email  }}}
```

```JSON
{
  "projectId": "project-id"
}
```

--------------------------------

### Example Railway Project Configuration

Source: https://docs.railway.com/guides/rails

Use this configuration for shared settings like build configuration and pre-deploy commands across multiple services. It specifies Dockerfile usage for builds and a pre-deploy command for database migrations.

```json
{
  "$schema": "https://railway.com/railway.schema.json",
  "build": {
    "builder": "DOCKERFILE",
    "dockerfilePath": "Dockerfile"
  },
  "deploy": {
    "preDeployCommand": "bundle exec rails db:prepare"
  }
}
```

--------------------------------

### Basic Flask App Code

Source: https://docs.railway.com/guides/flask

This is a simple Flask application that returns a greeting. It requires Flask to be installed.

```python
import os
from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello world, welcome to Railway!'
```

--------------------------------

### Run deployment command

Source: https://docs.railway.com/guides/phoenix-distillery

Execute this command as a super user to deploy the application after updating mix.exs. It includes fetching dependencies, compiling, and creating the release.

```bash
sudo npm run deploy --prefix assets && MIX_ENV=prod mix do phx.digest, distillery.release --env=prod
```

--------------------------------

### Integrate TailwindCSS with Puma

Source: https://docs.railway.com/guides/rails

Configure the Puma server to automatically start the TailwindCSS watcher.

```ruby
plugin :tailwindcss
```

--------------------------------

### Display current user

Source: https://docs.railway.com/cli/whoami

Use this command to see basic information about the logged-in user. No special setup is required.

```bash
railway whoami
```

--------------------------------

### Shared Monorepo Directory Structure

Source: https://docs.railway.com/deployments/monorepo

Example directory structure for a shared monorepo where components share a common root directory.

```text
├── package.json
└── packages
    ├── backend
    │   └── index.js
    ├── common
    │   └── index.js
    └── frontend
        └── index.jsx
```

--------------------------------

### Shell command with environment variable expansion

Source: https://docs.railway.com/builds/build-and-start-commands

Use this format to wrap your start command in a shell when environment variables are needed for services deployed from Dockerfiles or images. This enables variable expansion, which is not supported in exec form commands.

```shell
/bin/sh -c "exec python main.py --port $PORT"
```

--------------------------------

### Get Project Status in JSON Format

Source: https://docs.railway.com/cli/status

Outputs detailed project information, including all services and environments, in JSON format. Use this for programmatic access to status details.

```bash
railway status --json
```

--------------------------------

### Deploy with variables

Source: https://docs.railway.com/cli/deploy

Deploys a template while setting environment variables.

```bash
railway deploy --template postgres --variable "POSTGRES_USER=admin"
```

--------------------------------

### Run TailwindCSS watcher

Source: https://docs.railway.com/guides/rails

Start the TailwindCSS compilation process to watch for style changes during development.

```bash
bin/rails tailwindcss:watch
```

--------------------------------

### Get project token info

Source: https://docs.railway.com/integrations/api/api-cookbook

Retrieves project and environment IDs associated with the current project token.

```GraphQL
query {    projectToken {      projectId      environmentId    }  }
```

--------------------------------

### Show environment configuration

Source: https://docs.railway.com/cli/environment

Display the current configuration for an environment.

```bash
railway environment config
```

--------------------------------

### Initiate Login Redirect

Source: https://docs.railway.com/integrations/oauth/login-and-tokens

Redirect users to this endpoint to start the OAuth 2.0 authorization code flow. Ensure all required parameters are correctly included.

```http
GET https://backboard.railway.com/oauth/auth
```

--------------------------------

### Generate a presigned download URL

Source: https://docs.railway.com/guides/storage-buckets-guide

Creates a temporary GET URL for secure file retrieval from the bucket.

```javascript
import { GetObjectCommand } from '@aws-sdk/client-s3';async function getDownloadUrl(key) {  const command = new GetObjectCommand({    Bucket: process.env.BUCKET_NAME,    Key: key,  });  return getSignedUrl(s3, command, { expiresIn: 3600 });}
```

--------------------------------

### Create a New Phoenix App

Source: https://docs.railway.com/guides/phoenix-distillery

Generates a new Phoenix application named 'helloworld_distillery'. This command may prompt to install optional dependencies like Ecto or LiveView.

```bash
mix phx.new helloworld_distillery
```

--------------------------------

### Isolated Monorepo Directory Structure

Source: https://docs.railway.com/deployments/monorepo

Example directory structure for a monorepo containing two completely isolated projects.

```text
├── frontend/
│   ├── index.js
│   └── ...
└── backend/
    ├── server.py
    └── ...
```

--------------------------------

### Add database services

Source: https://docs.railway.com/cli/add

Provisions one or more database instances.

```bash
railway add --database postgres
```

```bash
railway add --database postgres --database redis
```

--------------------------------

### View logs since specific time

Source: https://docs.railway.com/cli/logs

Retrieves logs starting from a specific ISO 8601 timestamp.

```bash
railway logs --since 2024-01-15T10:00:00Z
```

--------------------------------

### Configure CloudFront CDK Entry Point

Source: https://docs.railway.com/guides/add-a-cdn-using-cloudfront

Replace the contents of '/bin/cloudfront.ts' with this code to set up the CDK application. It imports the stack and initializes the CloudFront distribution with environment variables for account and region.

```typescript
#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { CloudfrontCdkStack } from "../lib/cloudfront-stack";

const app = new cdk.App();
new CloudfrontCdkStack(app, "CloudfrontCdkStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});

```

--------------------------------

### Filter deployment logs

Source: https://docs.railway.com/observability/logs

Examples of using the Railway filter syntax to query specific deployment log patterns.

```text
request
```

```text
"POST /api"
```

```text
@level:error
```

```text
@level:warn
```

```text
@level:error AND "failed to send batch"
```

```text
@customAttribute:value
```

```text
@arrayAttribute[i]:value
```

```text
@task_duration:>=600
```

```text
@batch_size:>100
```

```text
@retries:1..3
```

--------------------------------

### Configure Beego app with Postgres database

Source: https://docs.railway.com/guides/beego

Modifies the main.go file to configure the Postgres database connection and register the Users model. Ensure the Postgres driver is installed.

```go
package mainimport (	"fmt"	_ "helloworld/routers"	_ "github.com/lib/pq"	"github.com/beego/beego/v2/client/orm"	beego "github.com/beego/beego/v2/server/web")// Users -type Users struct {	ID        int    `orm:"column(id)"`	FirstName string `orm:"column(first_name)"`	LastName  string `orm:"column(last_name)"`}
func init() {	// set default database	orm.RegisterDriver("postgres", orm.DRPostgres)	// set default database	orm.RegisterDataBase("default", "postgres", "postgres://unicodeveloper:@localhost/helloworld_dev?sslmode=disable")	// register model	orm.RegisterModel(new(Users))	// create table	orm.RunSyncdb("default", false, true)}
func main() {	o := orm.NewOrm()	// Create a slice of Users to insert	users := []Users{		{FirstName: "John", LastName: "Doe"},		{FirstName: "Jane", LastName: "Doe"},		{FirstName: "Railway", LastName: "Deploy Beego"},	}
	// Iterate over the slice and insert each user	for _, user := range users {		id, err := o.Insert(&user)		if err != nil {			fmt.Printf("Failed to insert user %s %s: %v\n", user.FirstName, user.LastName, err)		} else {			fmt.Printf("Inserted user ID: %d, Name: %s %s\n", id, user.FirstName, user.LastName)		}	}	beego.Run()}
```

--------------------------------

### Create a New Express App

Source: https://docs.railway.com/guides/express

Use this command to generate a new Express application with Pug as the view engine. Ensure Node.js is installed.

```bash
npx express-generator --view=pug
```

--------------------------------

### Custom domain DNS record output

Source: https://docs.railway.com/cli/domain

Example of the DNS record information displayed by the CLI after adding a custom domain.

```text
To finish setting up your custom domain, add the following DNS records to example.com:

    Type     Name    Value
    CNAME    @       your-service.up.railway.app
```

--------------------------------

### Initialize and Deploy with Railway CLI

Source: https://docs.railway.com/guides/spring-boot

Commands to initialize a project and deploy the application to the Railway platform.

```bash
railway init
```

```bash
railway up
```

--------------------------------

### Get environment logs

Source: https://docs.railway.com/integrations/api/manage-environments

Retrieve logs from all services within a specific environment, optionally filtered by a string.

```GraphQL
query environmentLogs($environmentId: String!, $filter: String) {environmentLogs(environmentId: $environmentId, filter: $filter) {  timestamp  message  severity  tags {    serviceId    deploymentId  }}}
```

```JSON
{  "environmentId": "environment-id"}
```

--------------------------------

### GraphQL Type Signature Examples

Source: https://docs.railway.com/integrations/api/graphql-overview

Demonstrates GraphQL type signatures, including optional and required fields and lists. The '!' denotes a non-null (required) type.

```graphql
name: String          # Optional string (can be null)
```

```graphql
name: String!         # Required string (cannot be null)
```

```graphql
services: [Service!]! # Required list of required Service objects
```

--------------------------------

### REST API Endpoints Example

Source: https://docs.railway.com/integrations/api/graphql-overview

Illustrates typical REST API endpoints for fetching project and service data, which often require multiple requests.

```http
GET /projects/123           → returns project details
```

```http
GET /projects/123/services  → returns list of services
```

```http
GET /services/456           → returns one service's details
```

--------------------------------

### Create a new NestJS application

Source: https://docs.railway.com/guides/nest

Initializes a new NestJS project directory.

```bash
nest new helloworld
```

--------------------------------

### Install MCP Server in Claude Code

Source: https://docs.railway.com/ai/mcp-server

Use this command to add the Railway MCP server to Claude Code.

```bash
claude mcp add Railway npx @railway/mcp-server
```

--------------------------------

### Enable SolidQueue Plugin in Puma

Source: https://docs.railway.com/guides/rails

Add this line to your config/puma.rb file to run SolidQueue within the same process as your Rails application, simplifying setup.

```ruby
plugin :solid_queue
```

--------------------------------

### Run Database Migrations

Source: https://docs.railway.com/guides/play

Execute this command to apply all pending database migrations, including the creation of the `employee` table.

```bash
sbt flywayMigrate
```

--------------------------------

### Get a single environment

Source: https://docs.railway.com/integrations/api/manage-environments

Fetch details for a specific environment by ID, including its associated service instances and deployment statuses.

```GraphQL
query environment($id: String!) {environment(id: $id) {  id  name  createdAt  serviceInstances {    edges {      node {        id        serviceName        latestDeployment {          id          status        }      }    }  }}}
```

```JSON
{  "id": "environment-id"}
```

--------------------------------

### Basic Rocket App Structure

Source: https://docs.railway.com/guides/rocket

This Rust code defines a simple Rocket web server with a single route that responds to GET requests at the root URL with 'Hello world, Rocket!'. Ensure Rocket is added as a dependency.

```rust
#[macro_use]extern crate rocket;#[get("/")]fn index() -> &'static str {    "Hello world, Rocket!"}#[launch]fn rocket() -> _ {    rocket::build().mount("/", routes![index])}
```

--------------------------------

### Install Railway Agent Skills via NPX

Source: https://docs.railway.com/ai/agent-skills

Use this command to add the Railway skills package to your environment using npx.

```bash
npx skills add railwayapp/railway-skills
```

--------------------------------

### List all projects

Source: https://docs.railway.com/cli/project

Displays all projects associated with the current account.

```bash
railway project list
```

--------------------------------

### Link to Project and Deploy

Source: https://docs.railway.com/cli/deploying

Link your local directory to your Railway project and then deploy the current directory. This command scans, compresses, and uploads your app's files to Railway, showing real-time deployment logs.

```bash
railway link

railway up
```

--------------------------------

### Add Healthcheck Endpoint

Source: https://docs.railway.com/guides/deploy-node-express-api-with-auto-scaling-secrets-and-zero-downtime

This snippet adds a healthcheck endpoint to your application. Ensure this is added before starting your server.

```bash
git add .
git commit -m "Add healthcheck endpoint"
git push origin main
```

--------------------------------

### Open Railway Documentation

Source: https://docs.railway.com/cli/docs

Executes the command to launch the documentation website in the default browser.

```bash
railway docs
```

```bash
railway docs
```

--------------------------------

### Rate limit warning message

Source: https://docs.railway.com/guides/logs

Example of the warning message displayed when the logging throughput limit is exceeded.

```text
Railway rate limit of 500 logs/sec reached for replica, update your application to reduce the logging rate. Messages dropped: 50
```

--------------------------------

### Configure Caddyfile for Static Site Serving

Source: https://docs.railway.com/guides/caddy

Configure the Caddyfile to serve static assets from the 'www' directory. This setup assumes your static files are located in a 'www' folder within your repository.

```caddyfile
root ./www
file_server
```

--------------------------------

### Create empty service

Source: https://docs.railway.com/cli/add

Initializes an empty service, optionally with a custom name.

```bash
railway add --service
```

```bash
railway add --service my-api
```

--------------------------------

### Request Projects via cURL

Source: https://docs.railway.com/integrations/oauth/fetching-workspaces-or-projects

Example cURL request to fetch projects using the Railway GraphQL API.

```bash
curl -X POST https://backboard.railway.com/graphql/v2 \  -H "Authorization: Bearer ACCESS_TOKEN" \  -H "Content-Type: application/json" \  -d '{"query": "query { externalWorkspaces { id name projects { id name } } }"}'
```

--------------------------------

### Add an empty service and set DATABASE_URL environment variable

Source: https://docs.railway.com/guides/luminus

Create an empty service named `app-service` and set the `DATABASE_URL` environment variable to reference your PostgreSQL database. `${{Postgres.DATABASE_URL}}` dynamically injects the database URL.

```bash
railway add
```

```bash
Enter a variable: DATABASE_URL=${{Postgres.DATABASE_URL}}
```

--------------------------------

### Scale service interactively

Source: https://docs.railway.com/cli/scale

Launches an interactive prompt to select regions and instance counts.

```bash
railway scale
```

--------------------------------

### Manual Upgrade Commands

Source: https://docs.railway.com/cli/upgrade

Commands to manually update the Railway CLI based on the specific installation method used.

```bash
brew upgrade railway
```

```bash
npm update -g @railway/cli
```

```bash
bun update -g @railway/cli
```

```bash
cargo install railwayapp
```

```bash
scoop update railway
```

```bash
bash <(curl -fsSL cli.new)
```

--------------------------------

### Create a new Angular application

Source: https://docs.railway.com/guides/angular

Initializes a new Angular project using the Angular CLI.

```bash
ng new gratitudeapp
```

--------------------------------

### Define a Database Service in Docker Compose

Source: https://docs.railway.com/guides/docker-compose

Example of a standard database service definition in a docker-compose.yml file that should be replaced by a managed Railway database service.

```yaml
db:  image: postgres:16  environment:    - POSTGRES_DB=myapp    - POSTGRES_USER=user    - POSTGRES_PASSWORD=pass
```

--------------------------------

### Link an environment

Source: https://docs.railway.com/cli/environment

Link an environment to the current project.

```bash
railway environment
```

```bash
railway environment staging
```

--------------------------------

### Initiating Login (Authorization Code Flow)

Source: https://docs.railway.com/integrations/oauth/login-and-tokens

Redirect users to this endpoint to start the OAuth 2.0 authorization code flow. Users will be prompted to log in and authorize your application.

```APIDOC
## GET /oauth/auth

### Description
Initiates the OAuth 2.0 Authorization Code flow by redirecting the user to Railway's authorization endpoint.

### Method
GET

### Endpoint
https://backboard.railway.com/oauth/auth

### Parameters
#### Query Parameters
- **response_type** (string) - Required - Must be `code`.
- **client_id** (string) - Required - Your OAuth app's client ID.
- **redirect_uri** (string) - Required - Must exactly match a registered URI.
- **scope** (string) - Required - Space-separated scopes (e.g., `openid email profile`). `openid` is required.
- **state** (string) - Recommended - A random string for CSRF protection.
- **code_challenge** (string) - Native Apps: Required, Web Apps: Recommended - PKCE challenge.
- **code_challenge_method** (string) - With PKCE - Must be `S256`.
- **prompt** (string) - No - Set to `consent` to force the user consent screen.
```

--------------------------------

### GraphQL Input Type Definition

Source: https://docs.railway.com/integrations/api/graphql-overview

An example of a GraphQL input type definition, specifying required and optional fields for mutation arguments.

```graphql
input ProjectCreateInput {
  name: String!       # Required field
  description: String # Optional field
}
```

--------------------------------

### Communicate via Internal DNS

Source: https://docs.railway.com/private-networking

Example of making an HTTP request to another service using its internal domain.

```javascript
app.get("/fetch-secret", async (req, res) => {  axios.get("http://api.railway.internal:3000/secret").then(response => {    res.json(response.data);  });});
```

--------------------------------

### Configure Service Reference Variables

Source: https://docs.railway.com/private-networking

Define a backend URL using reference variables and consume it in application code.

```bash
BACKEND_URL=http://${{api.RAILWAY_PRIVATE_DOMAIN}}:${{api.PORT}}
```

```javascript
app.get("/fetch-secret", async (req, res) => {  axios.get(`${process.env.BACKEND_URL}/secret`).then(response => {    res.json(response.data);  });});
```

--------------------------------

### Get a single environment

Source: https://docs.railway.com/integrations/api/manage-environments

Fetches details for a specific environment by its ID, including associated service instances and their latest deployment status.

```APIDOC
## POST /graphql

### Description
Retrieve detailed information about a specific environment.

### Method
POST

### Parameters
#### Request Body
- **id** (String) - Required - The unique identifier of the environment.
```

--------------------------------

### Connect to Fly.io Postgres

Source: https://docs.railway.com/platform/migrate-from-fly

Use the flyctl CLI to establish a connection to your Fly.io Postgres instance.

```bash
fly postgres connect -a <postgres-app-name>
```

--------------------------------

### Get staged changes

Source: https://docs.railway.com/integrations/api/manage-environments

Retrieve pending variable changes that have been staged for an environment.

```GraphQL
query environmentStagedChanges($environmentId: String!) {environmentStagedChanges(environmentId: $environmentId)}
```

```JSON
{  "environmentId": "environment-id"}
```

--------------------------------

### Generate Base64 Secrets

Source: https://docs.railway.com/templates/create

Examples of generating Base64 encoded secrets of varying lengths using the secret function.

```text
${{secret(22, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/")}}==
```

```text
${{secret(43, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/")}}=
```

```text
${{secret(86, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/")}}==
```

--------------------------------

### Define Environment Variables

Source: https://docs.railway.com/guides/deploy-node-express-api-with-auto-scaling-secrets-and-zero-downtime

Create a .env file to store configuration variables.

```text
# .EnvAPP_NAME=My Express APINODE_ENV=developmentPORT=3000
```

--------------------------------

### Get Volume Instance Details

Source: https://docs.railway.com/integrations/api/manage-volumes

Retrieves detailed information about a specific volume instance, including its mount path, size, state, and associated volume and service.

```GraphQL
query volumeInstance($id: String!) {
  volumeInstance(id: $id) {
    id
    mountPath
    currentSizeMB
    state
    volume {
      id
      name
    }
    serviceInstance {
      serviceName
    }
  }
}
```

```JSON
{
  "id": "volume-instance-id"
}
```

--------------------------------

### Scale service usage syntax

Source: https://docs.railway.com/cli/scale

General command structure for scaling services.

```bash
railway scale [OPTIONS] [--<REGION>=<INSTANCES>...]
```

--------------------------------

### Request Workspaces via cURL

Source: https://docs.railway.com/integrations/oauth/fetching-workspaces-or-projects

Example cURL request to fetch workspaces using the Railway GraphQL API.

```bash
curl -X POST https://backboard.railway.com/graphql/v2 \  -H "Authorization: Bearer ACCESS_TOKEN" \  -H "Content-Type: application/json" \  -d '{"query": "query { me { workspaces { id name } } }"}'
```

--------------------------------

### Update Railway plugin

Source: https://docs.railway.com/ai/claude-code-plugin

Refreshes the marketplace to update the installed plugin to the latest version.

```bash
/plugin marketplace update railway-skills
```

--------------------------------

### Generate Hex Secrets

Source: https://docs.railway.com/templates/create

Examples of generating Hex encoded secrets of varying lengths using the secret function.

```text
${{secret(32, "abcdef0123456789")}}
```

```text
${{secret(64, "abcdef0123456789")}}
```

```text
${{secret(128, "abcdef0123456789")}}
```

--------------------------------

### Create an environment

Source: https://docs.railway.com/integrations/api/manage-environments

Create a new environment within a project by providing the project ID and a name.

```GraphQL
mutation environmentCreate($input: EnvironmentCreateInput!) {environmentCreate(input: $input) {  id  name}}
```

```JSON
{  "input": {    "projectId": "project-id",    "name": "staging"  }}
```

--------------------------------

### Get Latest Active Deployment

Source: https://docs.railway.com/integrations/api/manage-deployments

Fetch the most recent successful deployment for a service in an environment. Useful for identifying the currently running version.

```GraphQL
query latestDeployment($input: DeploymentListInput!) {
  deployments(input: $input, first: 1) {
    edges {
      node {
        id
        status
        url
        createdAt
      }
    }
  }
}
```

```JSON
{
  "input": {
    "projectId": "project-id",
    "serviceId": "service-id",
    "environmentId": "environment-id",
    "status": {
      "successfulOnly": true
    }
  }
}
```

--------------------------------

### List all projects

Source: https://docs.railway.com/integrations/api/manage-projects

Fetch all projects in your personal account.

```APIDOC
## List all projects

### Description
Fetch all projects in your personal account.

### Method
GET

### Endpoint
/api/projects

### Request Example
```graphql
query {
  projects {
    edges {
      node {
        id
        name
        description
        createdAt
        updatedAt
      }
    }
  }
}
```

### Response
#### Success Response (200)
- **id** (string) - The unique identifier for the project.
- **name** (string) - The name of the project.
- **description** (string) - A description of the project.
- **createdAt** (string) - The timestamp when the project was created.
- **updatedAt** (string) - The timestamp when the project was last updated.

#### Response Example
```json
{
  "data": {
    "projects": {
      "edges": [
        {
          "node": {
            "id": "project-id-1",
            "name": "My Project 1",
            "description": "This is my first project.",
            "createdAt": "2023-01-01T10:00:00Z",
            "updatedAt": "2023-01-01T10:00:00Z"
          }
        }
      ]
    }
  }
}
```
```

--------------------------------

### View build logs

Source: https://docs.railway.com/cli/logs

Displays build logs for the current deployment.

```bash
railway logs --build
```

--------------------------------

### Display help information with --help

Source: https://docs.railway.com/cli/global-options

Show usage information for any Railway CLI command.

```bash
railway --help
railway up --help
railway logs -h
```

--------------------------------

### Dockerfile for SvelteKit App

Source: https://docs.railway.com/guides/sveltekit

This Dockerfile is used to build and deploy a SvelteKit application on Railway. It uses the Node alpine image, installs dependencies, builds the app, and serves it.

```dockerfile
# Use the Node alpine official image# https://hub.docker.com/_/node
FROM node:lts-alpine

# Create and change to the app directory.
WORKDIR /app

# Copy the files to the container image
COPY package*.json ./

# Install packages
RUN npm ci

# Copy local code to the container image.
COPY . .

# Build the app.
RUN npm run build

# Serve the app
CMD ["npm", "run", "start"]
```

--------------------------------

### Provision Railway Resources

Source: https://docs.railway.com/integrations/stripe

Provision a PostgreSQL database and a hosting service with a Docker welcome image using the Stripe CLI.

```bash
stripe projects add railway/postgres --name my-databasestripe projects add railway/hosting --config '{"repo":"docker/welcome-to-docker"}'
```

--------------------------------

### Filter environment logs

Source: https://docs.railway.com/observability/logs

Examples of using the Railway filter syntax to query logs across multiple services within an environment.

```text
-@service:<postgres_service_id>
```

```text
-@service:<postgres_service_id> AND -@service:<redis_service_id>
```

```text
@service:<postgres_service_id> OR @service:<redis_service_id>
```

--------------------------------

### Get User Claims via /oauth/me

Source: https://docs.railway.com/integrations/oauth/login-and-tokens

Call this endpoint to retrieve user claims like sub, email, name, and picture. Requires an Authorization header with a Bearer token.

```bash
curl https://backboard.railway.com/oauth/me \
  -H "Authorization: Bearer ACCESS_TOKEN"
```

```json
{
  "sub": "user_abc123",
  "email": "user@example.com",
  "name": "Jane Developer",
  "picture": "https://avatars.githubusercontent.com/u/12345"
}
```

--------------------------------

### Execute deployment command

Source: https://docs.railway.com/cli/deployment

General syntax for running deployment commands via the CLI.

```bash
railway deployment <COMMAND> [OPTIONS]
```

--------------------------------

### Initialize Distillery Release

Source: https://docs.railway.com/guides/phoenix-distillery

Initializes Distillery for the project, creating necessary configuration files like rel/config.exs and rel/vm.args.

```bash
mix distillery.init
```

--------------------------------

### Structured log with custom attributes

Source: https://docs.railway.com/observability/logs

An example of a structured log including custom attributes like `productId` and `userId` for detailed event tracking. The JSON must be on a single line.

```json
{ "level": "info", "message": "New purchase!", "productId": 123, "userId": 456 }
```

--------------------------------

### POST /graphql/v2 - Get Current User

Source: https://docs.railway.com/integrations/api/api-cookbook

Retrieves the profile information of the currently authenticated user.

```APIDOC
## POST /graphql/v2

### Description
Retrieves the ID, name, and email of the currently authenticated user.

### Method
POST

### Endpoint
https://backboard.railway.com/graphql/v2

### Request Example
```graphql
query { me { id name email } }
```
```

--------------------------------

### Add service with environment variables

Source: https://docs.railway.com/cli/add

Configures environment variables during service creation.

```bash
railway add --service api --variables "PORT=3000" --variables "NODE_ENV=production"
```

--------------------------------

### Reference Shared Variables

Source: https://docs.railway.com/guides/deploy-node-express-api-with-auto-scaling-secrets-and-zero-downtime

Example of how to reference a shared variable, such as a database URL, within a service using Railway's template syntax.

```plaintext
DATABASE_URL=${{shared.DATABASE_URL}}
```

--------------------------------

### Create a Service

Source: https://docs.railway.com/integrations/api/manage-services

Create a new service from a GitHub repository, Docker image, or as an empty service.

```APIDOC
## POST /api/services

### Description
Creates a new service. This can be done by specifying a GitHub repository, a Docker image, or by creating an empty service to be configured later.

### Method
POST

### Endpoint
`/api/services`

### Parameters
#### Request Body
- **projectId** (string) - Required - The ID of the project to create the service in.
- **name** (string) - Required - The name of the new service.
- **source** (object) - Optional - Specifies the source of the service.
  - **repo** (string) - Required if `source` is provided - The GitHub repository in the format `username/repo-name`.
  - **image** (string) - Required if `source` is provided and `repo` is not - The Docker image to use, e.g., `redis:7-alpine`.

### Request Example (from GitHub repository)
```json
{
  "projectId": "project-id",
  "name": "My API",
  "source": {
    "repo": "username/repo-name"
  }
}
```

### Request Example (from Docker image)
```json
{
  "projectId": "project-id",
  "name": "Redis",
  "source": {
    "image": "redis:7-alpine"
  }
}
```

### Request Example (empty service)
```json
{
  "projectId": "project-id",
  "name": "Backend API"
}
```

### Response
#### Success Response (200)
- **id** (string) - The ID of the newly created service.
- **name** (string) - The name of the newly created service.

### Response Example
```json
{
  "id": "new-service-id",
  "name": "My API"
}
```
```

--------------------------------

### GitHub Actions: Post-Deployment Actions

Source: https://docs.railway.com/cli/deploying

Configure GitHub Actions to run commands after a successful Railway deployment using the `deployment_status` event. This example shows how to trigger actions specifically for production deployments.

```yaml
name: Post-Deployment Actions

on:
  deployment_status:
    states: [success]

jobs:
  post-deploy:
    runs-on: ubuntu-latest
    if: github.event.deployment_status.state == 'success'
    steps:
      - name: Run post-deploy actions
        if: github.event.deployment.environment == 'production'
        run: |
          echo "Production deployment succeeded"
          # Add your post-deploy commands here
```

--------------------------------

### Implement Axum application logic

Source: https://docs.railway.com/guides/axum

Configures the main application entry point with a root route and a dynamic port listener.

```rust
use axum::{    routing::get,    Router,};#[tokio::main]async fn main() {    // build your application with a single route    let app = Router::new().route("/", get(root));    // Get the port number from the environment, default to 3000    let port: u16 = std::env::var("PORT")        .unwrap_or_else(|_| "3000".to_string()) // Get the port as a string or default to "3000"        .parse() // Parse the port string into a u16        .expect("Failed to parse PORT");    // Create a socket address (IPv6 binding)    let address = SocketAddr::from(([0, 0, 0, 0, 0, 0, 0, 0], port));    let listener = tokio::net::TcpListener::bind(&address).await.unwrap();    // Run the app with hyper, listening on the specified address    axum::serve(listener, app).await.unwrap();}// basic handler that responds with a static stringasync fn root() -> &'static str {    "Hello World, from Axum!"}
```

--------------------------------

### Connect to database (interactive)

Source: https://docs.railway.com/cli/connect

Opens an interactive shell, prompting for a service if multiple databases are available.

```bash
railway connect
```

--------------------------------

### List deployments in JSON format

Source: https://docs.railway.com/cli/deployment

Output the deployment list as JSON for programmatic access.

```bash
railway deployment list --json
```

```bash
# Get the latest deployment ID
railway deployment list --json --limit 1 | jq -r '.[0].id'
```

--------------------------------

### Create Python Virtual Environment

Source: https://docs.railway.com/guides/flask

Set up a virtual environment for your Python project to manage dependencies.

```bash
python -m venv env
```

--------------------------------

### Complete Express App with Healthcheck

Source: https://docs.railway.com/guides/deploy-node-express-api-with-auto-scaling-secrets-and-zero-downtime

A full Express.js application example including environment variable loading, basic routes for the root and API users, and a '/health' endpoint for zero-downtime deployments. It listens on a port defined by the PORT environment variable or defaults to 3000.

```typescript
import express from 'express';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Express API is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    appName: process.env.APP_NAME || 'My Express API'
  });
});

app.get('/api/users', (req, res) => {
  res.json([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ]);
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    appName: process.env.APP_NAME || 'My Express API'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

--------------------------------

### Create a service from GitHub

Source: https://docs.railway.com/integrations/api/manage-services

Create a new service linked to a GitHub repository.

```GraphQL
mutation serviceCreate($input: ServiceCreateInput!) {serviceCreate(input: $input) {  id  name}}
```

```JSON
{  "input": {    "projectId": "project-id",    "name": "My API",    "source": {      "repo": "username/repo-name"    }  }}
```

--------------------------------

### Add Cheshire JSON library dependency

Source: https://docs.railway.com/guides/luminus

Add the `cheshire` library to your project's dependencies in `project.clj` to enable JSON encoding and decoding. Run `lein deps` to install it.

```clojure
...[cheshire "5.10.0"]
```

```bash
lein deps
```

--------------------------------

### List projects in JSON format

Source: https://docs.railway.com/cli/list

Outputs the project list as a JSON array including workspace information.

```bash
railway list --json
```

--------------------------------

### Create environment

Source: https://docs.railway.com/integrations/api/api-cookbook

Creates a new environment within a specified project.

```GraphQL
mutation environmentCreate($input: EnvironmentCreateInput!) {    environmentCreate(input: $input) {      id    }  }
```

```JSON
{  "input": {    "projectId": "project-id",    "name": "staging"  }}
```

--------------------------------

### Configure PostgreSQL Database

Source: https://docs.railway.com/guides/django

Replace the default SQLite database configuration in `settings.py` with PostgreSQL settings. Ensure you have created a database named `liftoff_dev` locally.

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'liftoff_dev',
    }
}
```

--------------------------------

### List all projects

Source: https://docs.railway.com/integrations/api/manage-projects

Fetch all projects associated with the personal account.

```GraphQL
query {projects {  edges {    node {      id      name      description      createdAt      updatedAt    }  }}}
```

--------------------------------

### Create a new environment

Source: https://docs.railway.com/cli/environment

Create a new environment, optionally duplicating an existing one.

```bash
railway environment new staging
```

```bash
railway environment new staging --duplicate production
```

```bash
railway environment new staging --copy production
```

--------------------------------

### Configure local Postgres database URL

Source: https://docs.railway.com/guides/luminus

Update the `dev-config.edn` file with your local PostgreSQL database URL. Replace `username:password` with your credentials and `helloworld_dev` with your database name.

```clojure
:database-url "postgresql://username:password@127.0.0.1:5432/helloworld_dev"
```

--------------------------------

### Usage syntax for railway up

Source: https://docs.railway.com/cli/up

General command structure for deploying projects.

```bash
railway up [PATH] [OPTIONS]
```

--------------------------------

### Bootstrap CDK Environment

Source: https://docs.railway.com/guides/add-a-cdn-using-cloudfront

Run this command to bootstrap your AWS environment for the CDK. This command sets up the necessary resources in your AWS account to deploy CDK applications.

```bash
cdk bootstrap
```

--------------------------------

### Get User Claims (/oauth/me)

Source: https://docs.railway.com/integrations/oauth/login-and-tokens

Retrieve user claims such as sub, email, name, and picture by calling the /oauth/me endpoint with an access token. The 'sub' claim is a stable, unique identifier for the user.

```APIDOC
## GET /oauth/me

### Description
Retrieves user claims from the ID token. These claims are not directly present in the ID token but are obtained by calling this endpoint.

### Method
GET

### Endpoint
https://backboard.railway.com/oauth/me

### Parameters
#### Headers
- **Authorization** (string) - Required - Bearer token for authentication.

### Request Example
```bash
curl https://backboard.railway.com/oauth/me \
  -H "Authorization: Bearer ACCESS_TOKEN"
```

### Response
#### Success Response (200)
- **sub** (string) - User's unique identifier.
- **email** (string) - User's email address.
- **name** (string) - User's display name.
- **picture** (string) - URL to user's avatar.

#### Response Example
```json
{
  "sub": "user_abc123",
  "email": "user@example.com",
  "name": "Jane Developer",
  "picture": "https://avatars.githubusercontent.com/u/12345"
}
```
```

--------------------------------

### Deploy multiple templates

Source: https://docs.railway.com/cli/deploy

Deploys multiple templates in a single command.

```bash
railway deploy --template postgres --template redis
```

--------------------------------

### Set Healthcheck Path

Source: https://docs.railway.com/config-as-code/reference

Define the path Railway should check to ensure the deployment is healthy after starting. Can be set to `null`.

```json
{
  "$schema": "https://railway.com/railway.schema.json",
  "deploy": {
    "healthcheckPath": "/health"
  }
}
```

--------------------------------

### Get unrendered variables

Source: https://docs.railway.com/integrations/api/manage-variables

Retrieve variables with their references intact, not yet resolved. This is useful for inspecting variable definitions.

```GraphQL
query variables($projectId: String!, $environmentId: String!, $serviceId: String, $unrendered: Boolean) {
variables(
  projectId: $projectId
  environmentId: $environmentId
  serviceId: $serviceId
  unrendered: $unrendered
)
}
```

```JSON
{
  "projectId": "project-id",
  "environmentId": "environment-id",
  "serviceId": "service-id",
  "unrendered": true
}
```

--------------------------------

### Show status for all services

Source: https://docs.railway.com/cli/service

Display the deployment status for all services within the current environment using the --all flag.

```bash
railway service status --all
```

--------------------------------

### Add service from GitHub repository

Source: https://docs.railway.com/cli/add

Creates a service linked to a specific GitHub repository.

```bash
railway add --repo user/my-repo
```

--------------------------------

### Link a project

Source: https://docs.railway.com/cli/project

Associates a project with the current working directory.

```bash
railway project link
```

--------------------------------

### Initialize Rails with TailwindCSS

Source: https://docs.railway.com/guides/rails

Use the CSS flag during project creation to automatically configure TailwindCSS.

```bash
rails new myapp --css tailwind
```

--------------------------------

### List variables

Source: https://docs.railway.com/cli/variable

Display environment variables for a service.

```bash
railway variable list
```

```bash
railway variable list --kv
```

--------------------------------

### Configure Flyway and Project Settings

Source: https://docs.railway.com/guides/play

Enable the Flyway plugin and configure database connection details, including the URL and migration locations, within your `build.sbt` file. Replace `<username>` with your database username.

```scala
name := """helloworld"""
organization := "com.railwayguide"
version := "1.0-SNAPSHOT"
executableScriptName := "main"
lazy val root = (project in file(".")).enablePlugins(PlayScala).enablePlugins(FlywayPlugin)
scalaVersion := "2.13.15"
libraryDependencies += guicelibraryDependencies += "org.scalatestplus.play" %% "scalatestplus-play" % "7.0.1" % TestlibraryDependencies += "org.postgresql" % "postgresql" % "42.7.4" // Latest version
flywayUrl := "jdbc:postgresql://127.0.0.1:5432/scala_play?user=<username>"  # Replace with correct credentials
flywayLocations := Seq("filesystem:src/main/resources/db/migration")
```

--------------------------------

### Push code to GitHub

Source: https://docs.railway.com/platform/migrate-from-replit

Commands to initialize a local repository and push code to a new GitHub repository after downloading it from Replit.

```bash
cd your-project
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/your-repo.git
git branch -M main
git push -u origin main
```

--------------------------------

### Create project in specific workspace

Source: https://docs.railway.com/cli/init

Initializes a project within a specific workspace by name.

```bash
railway init --name my-api --workspace "My Team"
```

--------------------------------

### Configure Dockerfile for Solid App

Source: https://docs.railway.com/guides/solid

Multi-stage Dockerfile using Node.js for building and Caddy for serving the application.

```dockerfile
# Use the Node alpine official image
# https://hub.docker.com/_/node
FROM node:lts-alpine AS build

# Set config
ENV NPM_CONFIG_UPDATE_NOTIFIER=false
ENV NPM_CONFIG_FUND=false

# Create and change to the app directory.
WORKDIR /app

# Copy the files to the container image
COPY package*.json ./

# Install packages
RUN npm ci

# Copy local code to the container image.
COPY . ./

# Build the app.
RUN npm run build

# Use the Caddy image
FROM caddy

# Create and change to the app directory.
WORKDIR /app

# Copy Caddyfile to the container image.
COPY Caddyfile ./

# Copy local code to the container image.
RUN caddy fmt Caddyfile --overwrite

# Copy files to the container image.
COPY --from=build /app/dist ./dist

# Use Caddy to run/serve the app
CMD ["caddy", "run", "--config", "Caddyfile", "--adapter", "caddyfile"]
```

--------------------------------

### Webhook JSON Payload Example

Source: https://docs.railway.com/observability/webhooks

The structure of the JSON payload sent by Railway to the configured webhook URL when an event occurs.

```json
{
  "type": "Deployment.failed",
  "details": {
    "id": "8107edff-4b8e-44fc-b43a-04566e847a2a",
    "source": "GitHub",
    "status": "SUCCESS",
    "branch": "...",
    "commitHash": "...",
    "commitAuthor": "...",
    "commitMessage": "...",
  },
  "resource": {
    "workspace": { "id": "<workspace id>", "name": "<workspace name>" },
    "project": { "id": "<project id>", "name": "<project name>" },
    "environment": { "id": "<environment id>", "name": "<environment name>", "isEphemeral": false },
    "service": { "id": "<service id>", "name": "<service name>" },
    "deployment": { "id": "<deployment id>" }
  },
  "severity": "WARNING",
  "timestamp": "2025-11-21T23:48:42.311Z"}
```

--------------------------------

### Initialize CDK Project

Source: https://docs.railway.com/guides/add-a-cdn-using-cloudfront

Use this command to initialize a new AWS CDK project in TypeScript within your 'cloudfront' folder. Ensure you are in the 'fastify' directory before running.

```bash
cdk init app --language typescript
```

--------------------------------

### Initialize Datadog Tracer and Configure Services

Source: https://docs.railway.com/guides/set-up-a-datadog-agent

This code initializes the Datadog tracer and configures an Express server with StatsD for metrics and Winston for logging. Ensure the tracer is imported before any other modules. It sets up transports for logs and metrics to the Datadog agent.

```javascript
// ** it is important to import the tracer before anything else **
const tracer = require("dd-trace").init();
const express = require("express");
const app = express();
const StatsD = require("hot-shots");
const { createLogger, format, transports } = require("winston");
require("winston-syslog").Syslog;
const port = process.env.PORT || 3000;

// Configure the StatsD client
const statsdClient = new StatsD({
  host: process.env.DD_AGENT_HOST,
  port: process.env.DD_AGENT_STATSD_PORT,
  protocol: "udp",
  cacheDns: true,
  udpSocketOptions: {
    type: "udp6",
    reuseAddr: true,
    ipv6Only: true,
  },
});

// Configure Winston logger
const logger = createLogger({
  level: "info",
  exitOnError: false,
  format: format.json(),
  transports: [
    new transports.Syslog({
      host: process.env.DD_AGENT_HOST,
      port: process.env.DD_AGENT_SYSLOG_PORT,
      protocol: "udp6",
      format: format.json(),
      app_name: "node-app",
    }),
  ],
});

app.get("/", (req, res) => {
  // Increment a counter for the root path
  statsdClient.increment("data_dog_example.homepage.hits");
  statsdClient.gauge("data_dog_example.homepage.hits", 124);
  // forward logs from root path
  logger.info("Root route was accessed");
  res.send("Hello World!");
});

app.get("/test", (req, res) => {
  // Increment a counter for the test path
  statsdClient.increment("data_dog_example.testpage.hits");
  // forward logs from test path
  logger.info("Test route was accessed");
  res.send("This is the test endpoint!");
});

app.listen(port, () => {
  console.log(`Example app listening at port ${port}`);
});

```

--------------------------------

### Generate a Rails controller

Source: https://docs.railway.com/guides/rails

Creates a controller named HelloWorld with an index action.

```bash
rails g controller HelloWorld index
```

--------------------------------

### Update init function for dynamic database URL

Source: https://docs.railway.com/guides/beego

Modifies the init function in main.go to retrieve the database URL from the application configuration, making it dynamic for deployment.

```go
func init() {	// set default database	orm.RegisterDriver("postgres", orm.DRPostgres)	// set default database	dbURL, err := beego.AppConfig.String("db_url")	if err != nil {		log.Fatal("Error getting database URL: ", err)	}	orm.RegisterDataBase("default", "postgres", dbURL)	// register model	orm.RegisterModel(new(Users))	// create table	orm.RunSyncdb("default", false, true)}
```

--------------------------------

### Basic Bucket Info Command

Source: https://docs.railway.com/cli/bucket

Use this command to retrieve general information about a specific bucket. It requires the bucket name and environment to be specified.

```bash
railway bucket -b my-bucket -e production info
```

--------------------------------

### Show Bucket Info Command

Source: https://docs.railway.com/cli/bucket

Displays detailed information about a bucket, including storage size and object count. Use --json for structured output.

```bash
railway bucket info
```

```plaintext
Name:          my-bucket
Bucket ID:     bucket-id
Environment:   production
Region:        sjc
Storage:       1.2 GB
Objects:       3,456
```

```json
{
  "id": "bucket-id",
  "name": "my-bucket",
  "environmentId": "environment-id",
  "environment": "production",
  "region": "sjc",
  "storageBytes": 1200000000,
  "storage": "1.2 GB",
  "objects": 3456
}
```

--------------------------------

### CLI Command: railway up

Source: https://docs.railway.com/cli/up

Upload and deploy your project from the current directory to Railway.

```APIDOC
## railway up

### Description
Upload and deploy your project from the current directory to Railway. This command compresses the directory, uploads it, and streams build and deployment logs.

### Usage
`railway up [PATH] [OPTIONS]`

### Parameters
#### Path Parameters
- **PATH** (string) - Optional - The directory path to deploy. Defaults to the current directory.

#### Options
- **-d, --detach** (boolean) - Optional - Don't attach to the log stream.
- **-c, --ci** (boolean) - Optional - Stream build logs only, then exit (CI mode).
- **-s, --service <SERVICE>** (string) - Optional - Service to deploy to (defaults to linked service).
- **-e, --environment <ENV>** (string) - Optional - Environment to deploy to (defaults to linked environment).
- **-p, --project <ID>** (string) - Optional - Project ID to deploy to (defaults to linked project).
- **--no-gitignore** (boolean) - Optional - Don't ignore paths from .gitignore.
- **--path-as-root** (boolean) - Optional - Use the path argument as the archive root.
- **--verbose** (boolean) - Optional - Verbose output.
- **--json** (boolean) - Optional - Output logs in JSON format (implies CI mode).

### Request Example
```bash
railway up --service backend --environment staging
```

### Response
#### Success Response (0)
- **Exit Code** (integer) - Deployment succeeded.

#### Error Response (1)
- **Exit Code** (integer) - Deployment failed or crashed.
```

--------------------------------

### Activate Virtual Environment

Source: https://docs.railway.com/guides/flask

Activate the virtual environment. For Windows, use 'env\Scripts\activate'.

```bash
source env/bin/activate
```

--------------------------------

### Create backup

Source: https://docs.railway.com/integrations/api/api-cookbook

Creates a backup for a specific volume instance.

```GraphQL
  mutation volumeInstanceBackupCreate($volumeInstanceId: String!) {    volumeInstanceBackupCreate(volumeInstanceId: $volumeInstanceId)  }
```

```JSON
{  "volumeInstanceId": "volume-instance-id"}
```

--------------------------------

### Filter logs by response time range

Source: https://docs.railway.com/observability/logs

Use `@responseTime:start..end` to find responses within a specific millisecond range.

```log-query
@responseTime:100..500
```

--------------------------------

### Provision Hosting with GitHub Repository

Source: https://docs.railway.com/integrations/stripe

Provision a Railway hosting service by specifying a GitHub repository owner and name.

```bash
stripe projects add railway/hosting --config '{"repo":"owner/repo"}'
```

--------------------------------

### Provision Hosting with Docker Image

Source: https://docs.railway.com/integrations/stripe

Provision a Railway hosting service by specifying a Docker image to deploy.

```bash
stripe projects add railway/hosting --config '{"image":"nginx:latest"}'
```

--------------------------------

### Connect a service to a repo

Source: https://docs.railway.com/integrations/api/manage-services

Link an existing service to a GitHub repository and branch.

```GraphQL
mutation serviceConnect($id: String!, $input: ServiceConnectInput!) {serviceConnect(id: $id, input: $input) {  id}}
```

```JSON
{  "id": "service-id",  "input": {    "repo": "username/repo-name",    "branch": "main"  }}
```

--------------------------------

### Add New API Endpoint

Source: https://docs.railway.com/guides/deploy-node-express-api-with-auto-scaling-secrets-and-zero-downtime

Add a new GET endpoint to your TypeScript application to expose status information. This route should be added before the app.listen() call.

```typescript
// Add this route before app.listen()
app.get('/api/status', (req, res) => {
  res.json({
    status: 'Preview environment is working!',
    timestamp: new Date().toISOString(),
    appName: process.env.APP_NAME || 'My Express API',
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0-preview'
  });
});
```

--------------------------------

### Trigger Deployment for a Service in an Environment

Source: https://docs.railway.com/integrations/api/manage-deployments

Initiate a new deployment for a specific service within an environment. Requires environment, project, and service IDs.

```GraphQL
mutation environmentTriggersDeploy($input: EnvironmentTriggersDeployInput!) {
  environmentTriggersDeploy(input: $input)
}
```

```JSON
{
  "input": {
    "environmentId": "environment-id",
    "projectId": "project-id",
    "serviceId": "service-id"
  }
}
```

--------------------------------

### Create an environment

Source: https://docs.railway.com/integrations/api/manage-environments

Creates a new environment within a specified project.

```APIDOC
## POST /graphql

### Description
Create a new environment using the EnvironmentCreateInput object.

### Method
POST

### Parameters
#### Request Body
- **input** (EnvironmentCreateInput) - Required - Object containing projectId and name.
```

--------------------------------

### Run database migrations

Source: https://docs.railway.com/cli/run

Executes database migration commands using the environment variables provided by the project.

```bash
railway run npx prisma migrate deploy
```

--------------------------------

### Connect to database in specific environment

Source: https://docs.railway.com/cli/connect

Connects to a database service using variables from the specified environment.

```bash
railway connect postgres --environment staging
```

--------------------------------

### Service-specific deployment

Source: https://docs.railway.com/cli/up

Deploys the project to a specific service.

```bash
railway up --service backend
```

--------------------------------

### Interactive service addition

Source: https://docs.railway.com/cli/add

Launches an interactive prompt to select the service type.

```bash
railway add
```

--------------------------------

### Update Project Dependencies

Source: https://docs.railway.com/guides/play

Run this command to download the PostgreSQL driver and any other updated dependencies for your project.

```bash
sbt update
```

--------------------------------

### List volumes

Source: https://docs.railway.com/cli/volume

Displays a list of all existing volumes.

```bash
railway volume list
```

--------------------------------

### Create a Volume Backup

Source: https://docs.railway.com/integrations/api/manage-volumes

Initiates the creation of a backup for a specified volume instance. Requires the volume instance ID.

```GraphQL
mutation volumeInstanceBackupCreate($volumeInstanceId: String!) {
  volumeInstanceBackupCreate(volumeInstanceId: $volumeInstanceId)
}
```

```JSON
{
  "volumeInstanceId": "volume-instance-id"
}
```

--------------------------------

### List Buckets Command

Source: https://docs.railway.com/cli/bucket

Lists all buckets in the current environment. Use the --json flag for machine-readable output.

```bash
railway bucket list
```

```json
[
  {
    "id": "bucket-id",
    "name": "my-bucket"
  },
  {
    "id": "another-bucket-id",
    "name": "another-bucket"
  }
]
```

--------------------------------

### Initiate Authorization Request with PKCE

Source: https://docs.railway.com/integrations/oauth/creating-an-app

Use this URL to initiate the OAuth authorization flow for web applications, including PKCE parameters. Ensure `redirect_uri` matches a registered URI.

```http
https://backboard.railway.com/oauth/auth  ?response_type=code  &client_id=YOUR_CLIENT_ID  &redirect_uri=https://yourapp.com/callback  &scope=openid  &code_challenge=CODE_CHALLENGE  &code_challenge_method=S256
```

--------------------------------

### Push Code to GitHub Repository

Source: https://docs.railway.com/guides/deploy-node-express-api-with-auto-scaling-secrets-and-zero-downtime

Initialize a Git repository, add all files, commit them with a message, set the remote origin to your GitHub repository, and push the changes to the main branch.

```bash
git init
git add .
git commit -m "Initial Express API"
git remote add origin https://github.com/yourusername/my-express-api.git
git push -u origin main
```

--------------------------------

### Run Express App on a Different Port

Source: https://docs.railway.com/guides/express

To run the Express app on a different port, specify the PORT environment variable before starting the app. Access it at http://localhost:8080.

```bash
PORT=8080 npm start
```

--------------------------------

### Create Flask Project Directory

Source: https://docs.railway.com/guides/flask

Use these commands to create and navigate into a new project directory for your Flask application.

```bash
mkdir flaskproject
cd flaskproject
```

--------------------------------

### Connect and Run Project Locally

Source: https://docs.railway.com/platform/migrate-from-vercel

Commands to link a local directory to a Railway project and execute the application using production environment variables.

```bash
railway link
```

```bash
railway run
```

--------------------------------

### POST /graphql - Create Environment

Source: https://docs.railway.com/integrations/api/api-cookbook

Creates a new environment within a specified project.

```APIDOC
## POST /graphql

### Description
Creates a new environment for a project.

### Request Body
- **input** (EnvironmentCreateInput) - Required - The input object containing projectId and name.

### Request Example
{
  "input": {
    "projectId": "project-id",
    "name": "staging"
  }
}
```

--------------------------------

### Create a new Scala Play app

Source: https://docs.railway.com/guides/play

Use this command to create a new Scala Play application using the playframework/play-scala-seed.g8 template. Follow the prompts to name your application and organization.

```bash
sbt new
```

--------------------------------

### Authenticate API Request with Access Token

Source: https://docs.railway.com/integrations/oauth/login-and-tokens

Include the access token in the Authorization header when making requests to Railway's Public API. This example shows a GraphQL query.

```curl
curl -X POST https://backboard.railway.com/graphql/v2 \
  -H "Authorization: Bearer ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"query": "query { me { name email } }"}'
```

--------------------------------

### Create a service from Docker image

Source: https://docs.railway.com/integrations/api/manage-services

Create a new service using a specific Docker image.

```GraphQL
mutation serviceCreate($input: ServiceCreateInput!) {serviceCreate(input: $input) {  id  name}}
```

```JSON
{  "input": {    "projectId": "project-id",    "name": "Redis",    "source": {      "image": "redis:7-alpine"    }  }}
```

--------------------------------

### Connect a Service to a Repo

Source: https://docs.railway.com/integrations/api/manage-services

Connect an existing service to a GitHub repository.

```APIDOC
## POST /api/services/{id}/connect

### Description
Connects an existing service to a specified GitHub repository and branch.

### Method
POST

### Endpoint
`/api/services/{id}/connect`

### Parameters
#### Path Parameters
- **id** (string) - Required - The ID of the service to connect.

#### Request Body
- **repo** (string) - Required - The GitHub repository in the format `username/repo-name`.
- **branch** (string) - Required - The name of the branch to connect to.

### Request Example
```json
{
  "repo": "username/repo-name",
  "branch": "main"
}
```

### Response
#### Success Response (200)
- **id** (string) - The ID of the service.

### Response Example
```json
{
  "id": "service-id"
}
```
```

--------------------------------

### Get custom domain status

Source: https://docs.railway.com/integrations/api/manage-domains

Retrieves the status of a custom domain, including DNS record configuration and certificate issuance status. Requires the custom domain ID and project ID.

```graphql
query customDomain($id: String!, $projectId: String!) {
  customDomain(id: $id, projectId: $projectId) {
    id
    domain
    status {
      dnsRecords {
        hostlabel
        requiredValue
        currentValue
        status
      }
      certificateStatus
    }
  }
}
```

```json
{
  "id": "custom-domain-id",
  "projectId": "project-id"
}
```

--------------------------------

### Add a custom domain

Source: https://docs.railway.com/cli/domain

Configures a custom domain and returns the necessary DNS records.

```bash
railway domain example.com
```

--------------------------------

### Link a service interactively

Source: https://docs.railway.com/cli/service

Use this command to interactively select and link a service to your current project. No arguments are needed.

```bash
railway service
```

--------------------------------

### Link to a Specific Service

Source: https://docs.railway.com/cli/link

Link to a specific project, environment, and service by including the `--service` flag.

```bash
railway link --project my-api --service backend
```

--------------------------------

### Deploy with service-specific variables

Source: https://docs.railway.com/cli/deploy

Sets environment variables for a specific service by prefixing the variable name.

```bash
railway deploy --template my-app --variable "Backend.PORT=3000"
```

--------------------------------

### POST /graphql/v2 - Create Project

Source: https://docs.railway.com/integrations/api/api-cookbook

Creates a new project with the specified name.

```APIDOC
## POST /graphql/v2

### Description
Creates a new project.

### Method
POST

### Endpoint
https://backboard.railway.com/graphql/v2

### Request Body
- **input** (ProjectCreateInput) - Required - The project creation input containing the name.

### Request Example
```graphql
mutation projectCreate($input: ProjectCreateInput!) { projectCreate(input: $input) { id } }
```

### Variables
```json
{ "input": { "name": "My Project" } }
```
```

--------------------------------

### Add Healthcheck Endpoint to Express App

Source: https://docs.railway.com/guides/deploy-node-express-api-with-auto-scaling-secrets-and-zero-downtime

Add a '/health' GET route to your Express application. This endpoint should return a 200 status with a JSON payload indicating the application's status, current timestamp, and uptime. Ensure this route is added before app.listen().

```typescript
// Add this route before app.listen()
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});
```

--------------------------------

### Enable Route Acceptance via CLI

Source: https://docs.railway.com/guides/bridge-railway-to-rds-with-tailscale

Configure your local devices to accept subnet routes advertised by the Tailscale subnet router using the Tailscale CLI command.

```bash
tailscale set --accept-routes=true
```

--------------------------------

### Deploy to a Specific Service

Source: https://docs.railway.com/cli/deploying

Specify the target service for deployment using the `--service` flag if your project contains multiple services.

```bash
railway up --service my-api
```

--------------------------------

### Add service from Docker image

Source: https://docs.railway.com/cli/add

Creates a service based on a specified Docker image.

```bash
railway add --image nginx:latest
```

--------------------------------

### Create an empty service

Source: https://docs.railway.com/integrations/api/manage-services

Create a service without a source, to be configured later.

```GraphQL
mutation serviceCreate($input: ServiceCreateInput!) {serviceCreate(input: $input) {  id  name}}
```

```JSON
{  "input": {    "projectId": "project-id",    "name": "Backend API"  }}
```

--------------------------------

### Configure Next.js to Listen on Correct Port

Source: https://docs.railway.com/networking/troubleshooting/application-failed-to-respond

Use the --port flag to ensure Next.js respects the PORT environment variable.

```bash
next start --port ${PORT-3000}
```

--------------------------------

### Deploying from a Local Directory using Railway CLI

Source: https://docs.railway.com/guides/services

Use the Railway CLI to deploy a local directory to an empty service. Ensure you have linked your project and chosen the correct service target.

```bash
railway link
railway up
```

--------------------------------

### Initialize Laravel App Service

Source: https://docs.railway.com/guides/laravel

Script to run migrations and cache application components during the app service deployment.

```bash
#!/bin/bash# Make sure this file has executable permissions, run `chmod +x railway/init-app.sh`# Exit the script if any command failsset -e# Run migrationsphp artisan migrate --force# Clear cachephp artisan optimize:clear# Cache the various components of the Laravel applicationphp artisan config:cachephp artisan event:cachephp artisan route:cachephp artisan view:cache
```

--------------------------------

### Implement SSE Server and Client for Reconnection

Source: https://docs.railway.com/guides/sse-vs-websockets

Demonstrates handling the 15-minute connection limit by using the Last-Event-ID header for stateful reconnection.

```javascript
// Server (Node.js)app.get('/events', (req, res) => {  const lastId = req.headers['last-event-id'];  res.writeHead(200, {    'Content-Type': 'text/event-stream',    'Cache-Control': 'no-cache',    'Connection': 'keep-alive',  });  let id = parseInt(lastId) || 0;  const interval = setInterval(() => {    id++;    res.write(`id: ${id}\ndata: ${JSON.stringify({ time: Date.now() })}\n\n`);  }, 1000);  req.on('close', () => clearInterval(interval));});
```

```javascript
// Clientconst source = new EventSource('/events');source.onmessage = (event) => {  console.log(event.data);};// EventSource automatically reconnects and sends Last-Event-ID
```

--------------------------------

### Configure Ecto for Runtime Database Credentials

Source: https://docs.railway.com/guides/phoenix-distillery

Modifies the lib/helloworld_distillery/repo.ex file to fetch database credentials from the DATABASE_URL environment variable at runtime.

```elixir
defmodule HelloworldDistillery.Repo do
  use Ecto.Repo,
    otp_app: :helloworld_distillery,
    adapter: Ecto.Adapters.Postgres,
    pool_size: 10
  def init(_type, config) do
    {:ok, Keyword.put(config, :url, System.get_env("DATABASE_URL"))}
  end
end
```

--------------------------------

### Deploy a service

Source: https://docs.railway.com/integrations/api/manage-services

Trigger a new deployment for a specific service instance.

```GraphQL
mutation serviceInstanceDeployV2($serviceId: String!, $environmentId: String!) {serviceInstanceDeployV2(serviceId: $serviceId, environmentId: $environmentId)}
```

```JSON
{  "serviceId": "service-id",  "environmentId": "environment-id"}
```

--------------------------------

### Create a Vue App with Vite

Source: https://docs.railway.com/guides/vue

Use this command to create a new Vue.js application using Vite. Follow the prompts to configure your project.

```bash
npm create vue@latest
```

--------------------------------

### Deploy to a Specific Project and Environment

Source: https://docs.railway.com/cli/deploying

Deploy to a project without linking it first by using the `--project` flag. The `--environment` flag is required when using `--project`.

```bash
railway up --project <project-id> --environment production
```

--------------------------------

### Deploy PostgreSQL template

Source: https://docs.railway.com/cli/deploy

Deploys a specific template using the template code.

```bash
railway deploy --template postgres
```

--------------------------------

### Create Service from Docker Image

Source: https://docs.railway.com/integrations/api/api-cookbook

Create a new service using a public Docker image.

```graphql
mutation serviceCreate($input: ServiceCreateInput!) {    serviceCreate(input: $input) {      id    }  }
```

```json
{  "input": {    "projectId": "project-id",    "name": "Ubuntu",    "source": {      "image": "ubuntu"    }  }}
```

--------------------------------

### Link to a Specific Environment

Source: https://docs.railway.com/cli/link

Link to a specific project and environment by providing both `--project` and `--environment` flags.

```bash
railway link --project my-api --environment staging
```

--------------------------------

### Enable verbose output for debugging

Source: https://docs.railway.com/cli/deploying

Provides detailed logs during the deployment process to assist in troubleshooting.

```bash
railway up --verbose
```

--------------------------------

### Configure Go net/http to Listen on Correct Port

Source: https://docs.railway.com/networking/troubleshooting/application-failed-to-respond

Use the PORT environment variable to define the listening address for the Go server.

```go
func main() {  // ...  // Use `PORT` provided in environment or default to 3000  port := cmp.Or(os.Getenv("PORT"), 3000)  log.Fatal(http.ListenAndServe((":" + port), handler))  // ...}
```

--------------------------------

### Show Current Project Status

Source: https://docs.railway.com/cli/status

Displays basic information about the current project, environment, and service.

```bash
railway status
```

--------------------------------

### Volume Backups - Create Backup

Source: https://docs.railway.com/integrations/api/manage-volumes

Create a backup for a volume instance.

```APIDOC
## Volume Backups - Create Backup

### Description
Create a backup for a volume instance.

### Method
POST (or GraphQL mutation)

### Endpoint
`/api/volume-instances/{volumeInstanceId}/backups` (Conceptual REST endpoint)

### Parameters
#### Query Parameters
- **volumeInstanceId** (string) - Required - The ID of the volume instance.

### Request Example
```graphql
mutation volumeInstanceBackupCreate($volumeInstanceId: String!) {
  volumeInstanceBackupCreate(volumeInstanceId: $volumeInstanceId)
}
```

Variables
```json
{
  "volumeInstanceId": "volume-instance-id"
}
```

### Response
#### Success Response (200)
(No specific fields returned in the example, typically indicates success)

#### Response Example
```json
{
  "data": {
    "volumeInstanceBackupCreate": null
  }
}
```
```

--------------------------------

### Create a feature branch for PR previews

Source: https://docs.railway.com/guides/static-hosting

Use these Git commands to create a new branch and push changes to trigger an automatic Railway preview environment.

```bash
git checkout -b feature/new-page# Make your changesgit add .git commit -m "Add new page"git push origin feature/new-page
```

--------------------------------

### Run the application locally

Source: https://docs.railway.com/guides/axum

Compiles and executes the Rust application in the current directory.

```bash
cargo run
```

--------------------------------

### Create Phoenix App Database

Source: https://docs.railway.com/guides/phoenix

Creates the database for your Phoenix application. Ensure your database configuration in config/dev.exs is correct.

```bash
mix ecto.create
```

--------------------------------

### Export environment variables

Source: https://docs.railway.com/guides/phoenix-distillery

Set the DATABASE_URL and SECRET_KEY_BASE environment variables. Replace placeholders with your actual database credentials and secret key.

```bash
export DATABASE_URL=postgresql://username:password@127.0.0.1:5432/helloworld_distilleryexport SECRET_KEY_BASE=<your-secret-key-base>
```

--------------------------------

### Configure PostgreSQL Database Settings

Source: https://docs.railway.com/guides/django

Set default environment variables for PostgreSQL connection details if they are not already defined. Ensure your local credentials are used for PGUSER and PGPASSWORD.

```python
import os
os.environ.setdefault("PGDATABASE", "liftoff_dev")
os.environ.setdefault("PGUSER", "username")
os.environ.setdefault("PGPASSWORD", "")
os.environ.setdefault("PGHOST", "localhost")
os.environ.setdefault("PGPORT", "5432")
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ["PGDATABASE"],
        'USER': os.environ["PGUSER"],
        'PASSWORD': os.environ["PGPASSWORD"],
        'HOST': os.environ["PGHOST"],
        'PORT': os.environ["PGPORT"],
    }
}
```

--------------------------------

### Transfer a project to a workspace

Source: https://docs.railway.com/integrations/api/manage-projects

Move an existing project to a different workspace.

```GraphQL
mutation projectTransfer($projectId: String!, $input: ProjectTransferInput!) {projectTransfer(projectId: $projectId, input: $input)}
```

```JSON
{
  "projectId": "project-id",
  "input": {
    "workspaceId": "target-workspace-id"
  }
}
```

--------------------------------

### Deploy a Service

Source: https://docs.railway.com/integrations/api/manage-services

Trigger a new deployment for a service instance in a specific environment.

```APIDOC
## POST /api/services/{serviceId}/environments/{environmentId}/deployments

### Description
Initiates a new deployment for a specified service instance within a given environment.

### Method
POST

### Endpoint
`/api/services/{serviceId}/environments/{environmentId}/deployments`

### Parameters
#### Path Parameters
- **serviceId** (string) - Required - The ID of the service.
- **environmentId** (string) - Required - The ID of the environment.

### Response
#### Success Response (200)
- **id** (string) - The ID of the new deployment.

### Response Example
```json
{
  "id": "deployment-id"
}
```
```

--------------------------------

### Configure Rails routes

Source: https://docs.railway.com/guides/rails

Sets the root route to the hello_world#index action in config/routes.rb.

```ruby
Rails.application.routes.draw do    get "hello_world/index"    # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html    # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.    # Can be used by load balancers and uptime monitors to verify that the app is live.    get "up" => "rails/health#show", as: :rails_health_check    # Render dynamic PWA files from app/views/pwa/*    get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker    get "manifest" => "rails/pwa#manifest", as: :pwa_manifest    # Defines the root path route ("/")    root "hello_world#index"end
```

--------------------------------

### Link a specific service by name

Source: https://docs.railway.com/cli/service

Link a service to the current project by providing its name as an argument.

```bash
railway service backend
```

--------------------------------

### Import NPM Package with Version Pinning

Source: https://docs.railway.com/functions

Demonstrates how to import an NPM package and pin it to a specific version using the 'package@version' syntax.

```typescript
import { Hono } from "hono@4"
```

--------------------------------

### List Deployments for a Service

Source: https://docs.railway.com/integrations/api/manage-deployments

Retrieve a list of all deployments for a specific service within an environment. Requires project, service, and environment IDs.

```GraphQL
query deployments($input: DeploymentListInput!, $first: Int) {
  deployments(input: $input, first: $first) {
    edges {
      node {
        id
        status
        createdAt
        url
        staticUrl
      }
    }
  }
}
```

```JSON
{
  "input": {
    "projectId": "project-id",
    "serviceId": "service-id",
    "environmentId": "environment-id"
  },
  "first": 10
}
```

--------------------------------

### Service configuration with dot-path notation

Source: https://docs.railway.com/cli/environment

Use dot-path notation to update nested configuration values.

```bash
# Set a variable value
railway environment edit --service-config backend variables.API_KEY.value "secret"

# Set a service configuration
railway environment edit --service-config api buildCommand "npm run build"
```

--------------------------------

### Configure Express to Listen on Correct Host and Port

Source: https://docs.railway.com/networking/troubleshooting/application-failed-to-respond

Bind the Express server to 0.0.0.0 and use the PORT environment variable.

```javascript
// Use PORT provided in environment or default to 3000const port = process.env.PORT || 3000;// Listen on `port` and 0.0.0.0app.listen(port, "0.0.0.0", function () {  // ...});
```

--------------------------------

### Configure Fiber for Dual-Stack

Source: https://docs.railway.com/networking/private-networking/library-configuration

Set the Network field to tcp in the Fiber configuration to listen on both IPv4 and IPv6.

```go
app := fiber.New(fiber.Config{    Network:       "tcp",    ServerHeader:  "Fiber",    AppName: "Test App v1.0.1",})
```

--------------------------------

### Dockerfile for React App with Caddy

Source: https://docs.railway.com/guides/react

This Dockerfile builds a React app and serves it using Caddy. It includes multi-stage builds for optimization.

```dockerfile
# Use the Node alpine official image# https://hub.docker.com/_/nodeFROM node:lts-alpine AS build# Set configENV NPM_CONFIG_UPDATE_NOTIFIER=falseENV NPM_CONFIG_FUND=false# Create and change to the app directory.WORKDIR /app# Copy the files to the container imageCOPY package*.json ./# Install packagesRUN npm ci# Copy local code to the container image.COPY . ./# Build the app.RUN npm run build# Use the Caddy imageFROM caddy# Create and change to the app directory.WORKDIR /app# Copy Caddyfile to the container image.COPY Caddyfile ./# Copy local code to the container image.RUN caddy fmt Caddyfile --overwrite# Copy files to the container image.COPY --from=build /app/dist ./dist# Use Caddy to run/serve the appCMD ["caddy", "run", "--config", "Caddyfile", "--adapter", "caddyfile"]
```

--------------------------------

### Push changes with watch mode

Source: https://docs.railway.com/cli/functions

Deploy changes and enable watch mode to automatically redeploy on file save.

```bash
railway functions push --watch
```

--------------------------------

### Create Bucket

Source: https://docs.railway.com/cli/bucket

Creates a new bucket in the target environment. An optional name can be provided; otherwise, a default name is assigned. The operation can be staged if the environment has unmerged changes.

```APIDOC
## POST /websites/railway/buckets

### Description
Create a new bucket and deploy it to the target environment. An optional name can be passed as a positional argument; if omitted, the API assigns a default.

### Method
POST

### Endpoint
`/websites/railway/buckets`

### Query Parameters
- **-r, --region** (string) - Required - Bucket region. Prompted interactively if omitted.
- **--json** (boolean) - Optional - Output in JSON format

### Request Body
- **name** (string) - Optional - The name for the new bucket. If omitted, a default name is assigned.

### Request Example
```json
{
  "name": "my-bucket",
  "region": "sjc"
}
```

### Response
#### Success Response (200)
- **id** (string) - The unique identifier of the created bucket.
- **name** (string) - The name of the created bucket.
- **region** (string) - The region where the bucket was created.
- **staged** (boolean) - Indicates if the operation was staged due to unmerged changes.
- **committed** (boolean) - Indicates if the operation was committed directly.

#### Response Example (JSON)
```json
{
  "id": "bucket-id",
  "name": "my-bucket",
  "region": "sjc",
  "staged": false,
  "committed": true
}
```
```

--------------------------------

### List functions

Source: https://docs.railway.com/cli/functions

Use this command to view all functions in your Railway project.

```bash
railway functions list
```

--------------------------------

### Access a REPL

Source: https://docs.railway.com/cli/run

Opens an interactive shell or REPL with the project's environment variables loaded.

```bash
railway run rails console
railway run python
```

--------------------------------

### Open shell with variables

Source: https://docs.railway.com/cli/shell

Opens a subshell using the default linked service variables.

```bash
railway shell
```

--------------------------------

### Configure database URL in app.conf

Source: https://docs.railway.com/guides/beego

Adds the DATABASE_URL environment variable to the conf/app.conf file for deployment configuration.

```ini
db_url = ${DATABASE_URL}
```

--------------------------------

### Execute API Query with Project Token

Source: https://docs.railway.com/integrations/api

Uses a project token via the Project-Access-Token header to authenticate requests for a specific environment.

```bash
curl --request POST \
  --url https://backboard.railway.com/graphql/v2 \
  --header 'Project-Access-Token: <PROJECT_TOKEN_GOES_HERE>' \
  --header 'Content-Type: application/json' \
  --data '{"query":"query { projectToken { projectId environmentId } }"}'
```

--------------------------------

### List environments

Source: https://docs.railway.com/integrations/api/manage-environments

Retrieve all environments associated with a specific project ID.

```GraphQL
query environments($projectId: String!) {environments(projectId: $projectId) {  edges {    node {      id      name      createdAt    }  }}}
```

```JSON
{  "projectId": "project-id"}
```

--------------------------------

### Deploy CloudFront Distribution

Source: https://docs.railway.com/guides/add-a-cdn-using-cloudfront

Execute this command to deploy your configured CloudFront distribution to AWS. This will create the distribution and provide you with a unique domain name.

```bash
cdk deploy
```

--------------------------------

### Create Bucket Command

Source: https://docs.railway.com/cli/bucket

Creates a new bucket in the specified region. If the environment has staged changes, the creation will be staged.

```bash
railway bucket create my-bucket --region sjc
```

```plaintext
Created bucket my-bucket (sjc) and staged it for production (use 'railway environment edit' to commit)
```

```json
{
  "id": "bucket-id",
  "name": "my-bucket",
  "region": "sjc",
  "staged": false,
  "committed": true
}
```

--------------------------------

### Configure Distillery Release Environment

Source: https://docs.railway.com/guides/phoenix-distillery

Sets up the production environment configuration for Distillery, including Ecto database URL retrieval from environment variables.

```elixir
import Config
port = String.to_integer(System.get_env("PORT") || "4000")
default_secret_key_base = :crypto.strong_rand_bytes(43) |> Base.encode64()
config :helloworld_distillery, HelloworldDistilleryWeb.Endpoint,
  http: [port: port],
  url: [host: "localhost", port: port],
  secret_key_base: System.get_env("SECRET_KEY_BASE") || default_secret_key_base
```

```elixir
environment :prod do
  set include_erts: true
  set include_src: false
  set cookie: :
```

```elixir
set config_providers: [
    {Distillery.Releases.Config.Providers.Elixir, ["${RELEASE_ROOT_DIR}/etc/config.exs"]}
  ]
  set overlays: [
    {:copy, "rel/config/config.exs", "etc/config.exs"}
  ]
end
```

--------------------------------

### Connect to specific database

Source: https://docs.railway.com/cli/connect

Directly connects to the specified database service.

```bash
railway connect postgres
```

--------------------------------

### Provision Hosting with Specific Branch

Source: https://docs.railway.com/integrations/stripe

Provision a Railway hosting service, deploying code from a specified branch of a GitHub repository.

```bash
stripe projects add railway/hosting --config '{"repo":"owner/repo","branch":"staging"}'
```

--------------------------------

### Configure Multi-Region Deployment

Source: https://docs.railway.com/config-as-code/reference

Set up horizontal scaling across multiple regions, specifying the number of replicas per region. Can be set to `null`.

```json
{
  "$schema": "https://railway.com/railway.schema.json",
  "deploy": {
    "multiRegionConfig": {
      "us-west2": {
        "numReplicas": 2
      },
      "us-east4-eqdc4a": {
        "numReplicas": 2
      },
      "europe-west4-drams3a": {
        "numReplicas": 2
      },
      "asia-southeast1-eqsg3a": {
        "numReplicas": 2
      }
    }
  }
}
```

--------------------------------

### Connect to RDS via PostgreSQL

Source: https://docs.railway.com/guides/bridge-railway-to-rds-with-tailscale

Establishes a connection to the RDS instance using standard PostgreSQL client tools.

```bash
psql -h <rds_endpoint> -U postgres -d tailscale_test_db
```

--------------------------------

### Define Express Application

Source: https://docs.railway.com/guides/deploy-node-express-api-with-auto-scaling-secrets-and-zero-downtime

Create the main application file with Express routes and server listener.

```typescript
import express from 'express';import dotenv from 'dotenv';// Load environment variablesdotenv.config();const app = express();const PORT = process.env.PORT || 3000;// Middlewareapp.use(express.json());// Routesapp.get('/', (req, res) => {  res.json({     message: 'Express API is running!',    timestamp: new Date().toISOString(),    environment: process.env.NODE_ENV || 'development',    appName: process.env.APP_NAME || 'My Express API'  });});app.get('/api/users', (req, res) => {  res.json([    { id: 1, name: 'John Doe', email: 'john@example.com' },    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }  ]);});app.listen(PORT, () => {  console.log(`Server running on port ${PORT}`);});
```

--------------------------------

### List Buckets

Source: https://docs.railway.com/cli/bucket

Lists all buckets deployed in the current environment. Supports JSON output.

```APIDOC
## GET /websites/railway/buckets

### Description
List all buckets deployed in the current environment.

### Method
GET

### Endpoint
`/websites/railway/buckets`

### Query Parameters
- **--json** (boolean) - Optional - Output in JSON format

### Response
#### Success Response (200)
- **id** (string) - The unique identifier of the bucket.
- **name** (string) - The name of the bucket.

#### Response Example (JSON)
```json
[
  {
    "id": "bucket-id",
    "name": "my-bucket"
  },
  {
    "id": "another-bucket-id",
    "name": "another-bucket"
  }
]
```
```

--------------------------------

### Dockerfile for Actix Web Deployment

Source: https://docs.railway.com/guides/actix-web

A multi-stage Dockerfile using cargo-chef to optimize build times for Rust applications.

```dockerfile
FROM lukemathwalker/cargo-chef:latest-rust-1 AS chefWORKDIR /appFROM chef AS plannerCOPY . ./RUN cargo chef prepare --recipe-path recipe.jsonFROM chef AS builderCOPY --from=planner /app/recipe.json recipe.jsonRUN cargo chef cook --release --recipe-path recipe.jsonCOPY . ./RUN cargo build --releaseCMD ["./target/release/app"]
```

--------------------------------

### Run Spring Boot Locally

Source: https://docs.railway.com/guides/spring-boot

Execute the application locally using the Maven wrapper.

```bash
./mvnw spring-boot:run
```

--------------------------------

### Usage of railway deploy

Source: https://docs.railway.com/cli/deploy

Basic command structure for deploying templates.

```bash
railway deploy [OPTIONS]
```

--------------------------------

### Configure ioredis for Dual-Stack

Source: https://docs.railway.com/networking/private-networking/library-configuration

Specify family=0 in the connection string to enable both IPv4 and IPv6 support.

```javascript
import Redis from "ioredis";const redis = new Redis(process.env.REDIS_URL + "?family=0");const ping = await redis.ping();
```

--------------------------------

### Add a volume

Source: https://docs.railway.com/cli/volume

Creates a new volume with a specified mount path.

```bash
railway volume add --mount-path /data
```

--------------------------------

### Querying services with Relay-style pagination

Source: https://docs.railway.com/integrations/api/graphql-overview

Demonstrates the structure of a Relay-style list query using edges and nodes.

```graphql
services {  edges {    node {      id      name    }  }}
```

--------------------------------

### Configure Watch Paths with Gitignore Patterns

Source: https://docs.railway.com/builds/build-configuration

Define patterns to trigger deployments only when specific file paths change. Patterns operate from the root directory.

```gitignore
# Match all TypeScript files under src/
/src/**/*.ts
```

```gitignore
# Match Go files in the root, but not in subdirectories
/*.go
```

```gitignore
# Ignore all markdown files
**
!/*.md
```

--------------------------------

### Show status for a specific service

Source: https://docs.railway.com/cli/service

View the deployment status for a particular service.

```bash
railway service status
```

--------------------------------

### Deploy to a Specific Environment

Source: https://docs.railway.com/cli/deploying

Target a specific deployment environment using the `--environment` flag.

```bash
railway up --environment staging
```

--------------------------------

### List deployments

Source: https://docs.railway.com/cli/deployment

Retrieve a list of recent deployments with their status and timestamps.

```bash
railway deployment list
```

--------------------------------

### Add a Postgres database service using CLI

Source: https://docs.railway.com/guides/luminus

Add a PostgreSQL database service to your Railway project by running this command and pressing Enter when prompted.

```bash
railway add -d postgres
```

--------------------------------

### Railway CLI deployment commands

Source: https://docs.railway.com/guides/add-a-cdn-using-cloudfront

Commands to initialize, deploy, and manage a service on the Railway platform.

```bash
railway init
```

```bash
railway up -d
```

```bash
railway domain
```

```bash
railway open
```

--------------------------------

### Fetch Build Logs for a Deployment

Source: https://docs.railway.com/integrations/api/manage-deployments

Retrieve build logs associated with a specific deployment. Allows limiting the number of log entries returned.

```GraphQL
query buildLogs($deploymentId: String!, $limit: Int) {
  buildLogs(deploymentId: $deploymentId, limit: $limit) {
    timestamp
    message
    severity
  }
}
```

```JSON
{
  "deploymentId": "deployment-id",
  "limit": 500
}
```

--------------------------------

### Configure Watch Patterns for Deploys

Source: https://docs.railway.com/config-as-code/reference

Define patterns to conditionally trigger deployments. Useful for monorepos or specific file changes.

```json
{
  "$schema": "https://railway.com/railway.schema.json",
  "build": {
    "watchPatterns": ["src/**"]
  }
}
```

--------------------------------

### Define project directory structure

Source: https://docs.railway.com/guides/set-up-a-datadog-agent

The expected directory layout for the Datadog agent and application components.

```text
railway-project/├── agent/└── expressapi/
```

--------------------------------

### POST /graphql/v2 - List Projects

Source: https://docs.railway.com/integrations/api/api-cookbook

Fetches a list of all projects associated with the authenticated account.

```APIDOC
## POST /graphql/v2

### Description
Lists all projects available to the user.

### Method
POST

### Endpoint
https://backboard.railway.com/graphql/v2

### Request Example
```graphql
query { projects { edges { node { id name } } } }
```
```

--------------------------------

### Upload file to presigned URL from frontend

Source: https://docs.railway.com/guides/storage-buckets-guide

Fetches a presigned URL from the backend and performs a direct PUT request to the storage bucket.

```javascript
const response = await fetch('/api/upload-url?filename=photo.jpg');const { url } = await response.json();await fetch(url, {  method: 'PUT',  body: file,  headers: { 'Content-Type': file.type },});
```

--------------------------------

### Target a service with --service

Source: https://docs.railway.com/cli/global-options

Use the service name or ID to target a specific service for a command.

```bash
railway logs --service backend
railway up --service api
railway variable list -s my-service
```

--------------------------------

### Usage of railway add

Source: https://docs.railway.com/cli/add

General command structure for adding services.

```bash
railway add [OPTIONS]
```

--------------------------------

### Shell for specific service

Source: https://docs.railway.com/cli/shell

Opens a subshell using environment variables from the specified service.

```bash
railway shell --service backend
```

--------------------------------

### Stream live logs

Source: https://docs.railway.com/cli/logs

Streams logs in real-time by default.

```bash
railway logs
```

--------------------------------

### Paginating through deployment results

Source: https://docs.railway.com/integrations/api/graphql-overview

Uses the first and after arguments to fetch paginated results, utilizing pageInfo to determine if more data is available.

```graphql
query deployments($input: DeploymentListInput!, $first: Int, $after: String) {  deployments(input: $input, first: $first, after: $after) {    edges {      node {        id        status        createdAt      }    }    pageInfo {      hasNextPage      endCursor    }  }}
```

--------------------------------

### Run with specific service variables

Source: https://docs.railway.com/cli/run

Overrides the default service selection to pull variables from the 'backend' service.

```bash
railway run --service backend npm start
```

--------------------------------

### Fetch Runtime Logs for a Deployment

Source: https://docs.railway.com/integrations/api/manage-deployments

Retrieve runtime logs for a specific deployment. Useful for debugging application behavior. Supports limiting the number of log entries.

```GraphQL
query deploymentLogs($deploymentId: String!, $limit: Int) {
  deploymentLogs(deploymentId: $deploymentId, limit: $limit) {
    timestamp
    message
    severity
  }
}
```

```JSON
{
  "deploymentId": "deployment-id",
  "limit": 500
}
```

--------------------------------

### Configure server host in Astro config

Source: https://docs.railway.com/guides/astro

Ensure the server listens on 0.0.0.0 to accept external traffic on Railway.

```javascript
...server: {    host: '0.0.0.0'},
```

--------------------------------

### Backup Schedules - List Backup Schedules

Source: https://docs.railway.com/integrations/api/manage-volumes

List all backup schedules for a volume instance.

```APIDOC
## Backup Schedules - List Backup Schedules

### Description
List all backup schedules for a volume instance.

### Method
GET (or GraphQL query)

### Endpoint
`/api/volume-instances/{volumeInstanceId}/backup-schedules` (Conceptual REST endpoint)

### Parameters
#### Query Parameters
- **volumeInstanceId** (string) - Required - The ID of the volume instance.

### Request Example
```graphql
query volumeInstanceBackupScheduleList($volumeInstanceId: String!) {
  volumeInstanceBackupScheduleList(volumeInstanceId: $volumeInstanceId) {
    id
    name
    cron
    kind
    retentionSeconds
    createdAt
  }
}
```

Variables
```json
{
  "volumeInstanceId": "volume-instance-id"
}
```

### Response
#### Success Response (200)
- **id** (string) - The ID of the backup schedule.
- **name** (string) - The name of the backup schedule.
- **cron** (string) - The cron expression for the schedule.
- **kind** (string) - The type of backup schedule.
- **retentionSeconds** (integer) - The retention period in seconds.
- **createdAt** (string) - The timestamp when the backup schedule was created.

#### Response Example
```json
{
  "data": {
    "volumeInstanceBackupScheduleList": [
      {
        "id": "schedule-xyz",
        "name": "daily-backup",
        "cron": "0 0 * * *",
        "kind": "daily",
        "retentionSeconds": 2592000,
        "createdAt": "2023-10-27T10:00:00Z"
      }
    ]
  }
}
```
```

--------------------------------

### Detached deployment

Source: https://docs.railway.com/cli/up

Uploads the project and returns immediately without streaming logs.

```bash
railway up --detach
```

--------------------------------

### Dockerfile Configuration

Source: https://docs.railway.com/guides/astro

Standard Dockerfile configuration for building and serving a Node.js application.

```dockerfile
# Use the Node alpine official image# https://hub.docker.com/_/nodeFROM node:lts-alpine# Create and change to the app directory.WORKDIR /app# Copy the files to the container imageCOPY package*.json ./# Install packagesRUN npm ci# Copy local code to the container image.COPY . ./# Build the app.RUN npm run build# Serve the appCMD ["npm", "run", "start"]
```

--------------------------------

### List available regions

Source: https://docs.railway.com/integrations/api/api-cookbook

Lists all regions available for deployment.

```GraphQL
query {    regions {      name      country      location    }  }
```

--------------------------------

### Basic Usage of railway link

Source: https://docs.railway.com/cli/link

Use this command to initiate the linking process. It will prompt for necessary details if not provided.

```bash
railway link [OPTIONS]
```

--------------------------------

### POST /graphql/v2 - Create Service

Source: https://docs.railway.com/integrations/api/api-cookbook

Creates a new service within a project from a GitHub repository or Docker image.

```APIDOC
## POST /graphql/v2

### Description
Creates a service from a source (GitHub or Docker).

### Method
POST

### Endpoint
https://backboard.railway.com/graphql/v2

### Request Body
- **input** (ServiceCreateInput) - Required - The service creation input.

### Request Example
```graphql
mutation serviceCreate($input: ServiceCreateInput!) { serviceCreate(input: $input) { id } }
```
```

--------------------------------

### Create a new function

Source: https://docs.railway.com/cli/functions

Add a new function to your project, specifying its path and name.

```bash
railway functions new --path ./my-function.ts --name my-function
```

--------------------------------

### Deploy Service

Source: https://docs.railway.com/integrations/api/api-cookbook

Trigger a new deployment for a service in a specific environment.

```graphql
mutation serviceInstanceDeploy($serviceId: String!, $environmentId: String!) {    serviceInstanceDeploy(serviceId: $serviceId, environmentId: $environmentId)  }
```

```json
{  "serviceId": "service-id",  "environmentId": "environment-id"}
```

--------------------------------

### Export Fly.io Database

Source: https://docs.railway.com/platform/migrate-from-fly

Use pg_dump to create a custom format dump of your database.

```bash
pg_dump -Fc --no-acl --no-owner -h localhost -p 5432 -U <your-db-username> -d <your-db-name> -f flyio_db_backup.dump
```

--------------------------------

### List projects in a workspace

Source: https://docs.railway.com/integrations/api/manage-projects

Fetch all projects within a specific workspace.

```APIDOC
## List projects in a workspace

### Description
Fetch all projects in a specific workspace.

### Method
GET

### Endpoint
/api/workspaces/{workspaceId}/projects

### Query Parameters
- **workspaceId** (string) - Required - The ID of the workspace to list projects from.

### Request Example
```graphql
query workspaceProjects($workspaceId: String!) {
  projects(workspaceId: $workspaceId) {
    edges {
      node {
        id
        name
        description
      }
    }
  }
}
```

### Request Variables
```json
{
  "workspaceId": "workspace-id"
}
```

### Response
#### Success Response (200)
- **id** (string) - The unique identifier for the project.
- **name** (string) - The name of the project.
- **description** (string) - A description of the project.

#### Response Example
```json
{
  "data": {
    "projects": {
      "edges": [
        {
          "node": {
            "id": "project-id-1",
            "name": "Project Alpha",
            "description": "Workspace project A"
          }
        }
      ]
    }
  }
}
```
```

--------------------------------

### Deploy using Project Token

Source: https://docs.railway.com/cli/deploying

Automate deployments in CI/CD pipelines by using a Project Token. Set the `RAILWAY_TOKEN` environment variable to authenticate.

```bash
RAILWAY_TOKEN=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX railway up
```

--------------------------------

### Build Release with Distillery

Source: https://docs.railway.com/guides/phoenix-distillery

Builds the production release for the Phoenix application using Distillery. This command also handles asset digestion.

```bash
npm run deploy --prefix assets && MIX_ENV=prod mix do phx.digest, distillery.release --env=prod
```

--------------------------------

### Deploy in Detached Mode

Source: https://docs.railway.com/cli/deploying

Deploy your application and return immediately after uploading by using the `-d` or `--detach` flag. The deployment will continue in the background, and you can check its status via the dashboard or `railway logs`.

```bash
railway up -d
```

--------------------------------

### Create terraform.tfvars for Variables

Source: https://docs.railway.com/guides/bridge-railway-to-rds-with-tailscale

Define your AWS account ID, RDS password, and Tailscale authentication key in the terraform.tfvars file. Ensure the RDS password matches the one in userlist.txt.

```hcl
aws_account = "your-aws-account-id"
rds_password = "your-secure-rds-password"
tailscale_auth_key = "tskey-your-tailscale-auth-key"
```

--------------------------------

### Attach volume to service

Source: https://docs.railway.com/cli/volume

Associates an existing volume with a specific service.

```bash
railway volume attach --volume my-volume --service backend
```

--------------------------------

### Construct variable values

Source: https://docs.railway.com/variables/reference

Combine static text and existing variables to build new configuration values.

```text
DOMAIN=${{shared.DOMAIN}}GRAPHQL_PATH=/v1/gqlGRAPHQL_ENDPOINT=https://${{DOMAIN}}/${{GRAPHQL_PATH}}
```

--------------------------------

### Configure Static Files Settings

Source: https://docs.railway.com/guides/django

Configure Django to serve static files using WhiteNoise. Set the static URL, root directory for collected static files, and directories for additional static files.

```python
STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / "staticfiles"
STATICFILES_DIRS = [BASE_DIR / "static"]
```

--------------------------------

### List Variables

Source: https://docs.railway.com/cli/variable

Lists environment variables for a specified service and environment. Supports key-value format and JSON output.

```APIDOC
## GET /api/variables

### Description
Lists environment variables for a service.

### Method
GET

### Endpoint
/api/variables

### Query Parameters
- **service** (string) - Required - The service to list variables for.
- **environment** (string) - Required - The environment to list variables from.
- **kv** (boolean) - Optional - Show variables in KEY=VALUE format.
- **json** (boolean) - Optional - Output in JSON format.

### Response
#### Success Response (200)
- **variables** (object) - An object containing the environment variables.

### Response Example
```json
{
  "DATABASE_URL": "postgres://...",
  "API_KEY": "secret123"
}
```
```

--------------------------------

### List deployments with limit

Source: https://docs.railway.com/cli/deployment

Restrict the number of deployments returned in the list.

```bash
railway deployment list --limit 50
```

--------------------------------

### Define a Dockerfile for Beego

Source: https://docs.railway.com/guides/beego

Use this Dockerfile configuration to containerize a Go application for deployment on Railway.

```dockerfile
# Use the Go 1.22 official image# https://hub.docker.com/_/golangFROM golang:1.22# Create and change to the app directory.WORKDIR /app# Copy local code to the container image.COPY . ./# Install project dependenciesRUN go mod download# Build the appRUN go build -o app# Run the service on container startup.ENTRYPOINT ["./app"]
```

--------------------------------

### Serve Files with Presigned URLs

Source: https://docs.railway.com/storage-buckets/uploading-serving

Generate a presigned URL to allow clients to download files directly from the bucket. This avoids service egress costs. The URL is valid for the specified duration.

```typescript
import { s3 } from 'bun'async function handleFileRequest(fileKey: string) {
  const isAuthorized = isUserAuthorized(currentUser, fileKey)
  if (!isAuthorized) throw unauthorized()

  const presignedUrl = s3.presign(fileKey, {
    expiresIn: 3600 // 1 hour
  })

  return Response.redirect(presignedUrl, 302)
}
```

--------------------------------

### Configure SvelteKit Adapter

Source: https://docs.railway.com/guides/sveltekit

Updates the svelte.config.js file to use the Node adapter for production builds.

```javascript
import adapter from "@sveltejs/adapter-node";import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";/** @type {import('@sveltejs/kit').Config} */const config = {  // Consult https://svelte.dev/docs/kit/integrations  // for more information about preprocessors  preprocess: vitePreprocess(),  kit: {    // adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.    // If your environment is not supported, or you settled on a specific environment, switch out the adapter.    // See https://svelte.dev/docs/kit/adapters for more information about adapters.    adapter: adapter(),  },};export default config;
```

--------------------------------

### Browse Available Railway Services

Source: https://docs.railway.com/integrations/stripe

Use the Stripe CLI to view the catalog of Railway services available for provisioning.

```bash
stripe projects catalog railway
```

--------------------------------

### List deployments for specific service

Source: https://docs.railway.com/cli/deployment

Filter the deployment list by a specific service name.

```bash
railway deployment list --service backend
```

--------------------------------

### Railway CLI Utilities

Source: https://docs.railway.com/cli

Commands for generating shell completions, opening documentation, and upgrading the CLI.

```bash
railway completion bash         # Generate shell completions
railway docs                    # Open documentation
railway upgrade                 # Upgrade CLI
```

--------------------------------

### Configure bullmq connection with dual-stack support

Source: https://docs.railway.com/databases/troubleshooting/enotfound-redis-railway-internal

Set the family option to 0 within the connection object to enable dual-stack hostname resolution for bullmq.

```js
import { Queue } from "bullmq";

const redisURL = new URL(process.env.REDIS_URL);

const queue = new Queue("Queue", {
  connection: {
    family: 0,
    host: redisURL.hostname,
    port: redisURL.port,
    username: redisURL.username,
    password: redisURL.password,
  },
});

const jobs = await queue.getJobs();

console.log(jobs);
```

--------------------------------

### Test SSL Connectivity and Certificate Details

Source: https://docs.railway.com/networking/troubleshooting/ssl

Use OpenSSL to verify the SSL handshake and inspect certificate validity dates for a specific domain.

```bash
# Test SSL connection
openssl s_client -connect yourdomain.com:443 -servername yourdomain.com
# Check certificate details
echo | openssl s_client -connect yourdomain.com:443 -servername yourdomain.com 2>/dev/null | openssl x509 -noout -dates
```

--------------------------------

### Create a Volume

Source: https://docs.railway.com/integrations/api/manage-volumes

Create a new persistent volume attached to a service.

```APIDOC
## Create a Volume

### Description
Create a new persistent volume attached to a service.

### Method
POST (or GraphQL mutation)

### Endpoint
`/api/volumes` (Conceptual REST endpoint)

### Parameters
#### Request Body
- **projectId** (string) - Required - The ID of the project.
- **serviceId** (string) - Required - The ID of the service to attach the volume to.
- **mountPath** (string) - Required - The path where the volume will be mounted.

### Request Example
```graphql
mutation volumeCreate($input: VolumeCreateInput!) {
  volumeCreate(input: $input) {
    id
    name
  }
}
```

Variables
```json
{
  "input": {
    "projectId": "project-id",
    "serviceId": "service-id",
    "mountPath": "/data"
  }
}
```

### Response
#### Success Response (200)
- **id** (string) - The ID of the newly created volume.
- **name** (string) - The name of the newly created volume.

#### Response Example
```json
{
  "data": {
    "volumeCreate": {
      "id": "vol-789",
      "name": "new-volume"
    }
  }
}
```
```

--------------------------------

### Fetch HTTP Logs for a Deployment

Source: https://docs.railway.com/integrations/api/manage-deployments

Retrieve HTTP request logs for a deployment. Provides details like request method, path, status, and source IP. Allows limiting results.

```GraphQL
query httpLogs($deploymentId: String!, $limit: Int) {
  httpLogs(deploymentId: $deploymentId, limit: $limit) {
    timestamp
    requestId
    method
    path
    httpStatus
    totalDuration
    srcIp
  }
}
```

```JSON
{
  "deploymentId": "deployment-id",
  "limit": 100
}
```

--------------------------------

### POST /graphql - List TCP Proxies

Source: https://docs.railway.com/integrations/api/api-cookbook

Retrieves a list of TCP proxies for a given service and environment.

```APIDOC
## POST /graphql

### Description
Lists TCP proxies.

### Request Body
- **serviceId** (String) - Required
- **environmentId** (String) - Required

### Request Example
{
  "serviceId": "service-id",
  "environmentId": "environment-id"
}
```

--------------------------------

### Dockerfile for Bun Application

Source: https://docs.railway.com/guides/bun

Use this Dockerfile configuration to enable Railway to build and deploy your Bun application.

```dockerfile
FROM oven/bun:1-alpine
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile
COPY . ./
ENTRYPOINT ["bun", "run", "src/index.ts"]
```

--------------------------------

### Configure code services

Source: https://docs.railway.com/cli/dev

Interactively configures local code service execution parameters.

```bash
railway dev configure
```

--------------------------------

### Create a New Persistent Volume

Source: https://docs.railway.com/integrations/api/manage-volumes

Creates a new persistent volume and attaches it to a specified service. Requires project ID, service ID, and mount path.

```GraphQL
mutation volumeCreate($input: VolumeCreateInput!) {
  volumeCreate(input: $input) {
    id
    name
  }
}
```

```JSON
{
  "input": {
    "projectId": "project-id",
    "serviceId": "service-id",
    "mountPath": "/data"
  }
}
```

--------------------------------

### Configure .gitignore

Source: https://docs.railway.com/guides/deploy-node-express-api-with-auto-scaling-secrets-and-zero-downtime

Exclude sensitive files and build artifacts from version control.

```text
# Environment variables.env# Dependenciesnode_modules/# Build outputdist/# Logs*.log
```

--------------------------------

### Delete a project via CLI

Source: https://docs.railway.com/cli/delete

Basic command structure for deleting a project.

```bash
railway delete [OPTIONS]
```

--------------------------------

### Configure Express App with PostgreSQL

Source: https://docs.railway.com/guides/express

This code sets up an Express route handler that connects to a PostgreSQL database using pg-promise and fetches the current time. It renders an index view with the time or sends a 500 error if the query fails. The page is rendered only after a successful database response.

```javascript
const express = require("express");
const pgp = require("pg-promise")();
const db = pgp("postgres://username:password@127.0.0.1:5432/expresshelloworld_dev");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  db.one("SELECT NOW()")
    .then(function (data) {
      // Render the page only after receiving the data
      res.render("index", {
        title: "Hello World, Railway!",
        timeFromDB: data.now,
      });
    })
    .catch(function (error) {
      console.error("ERROR:", error);
      // If there’s an error, send a 500 response and do not call res.render
      res.status(500).send("Error querying the database");
    });
});

module.exports = router;
```

--------------------------------

### Configure specific service

Source: https://docs.railway.com/cli/dev

Configures a specific service by name.

```bash
railway dev configure --service backend
```

--------------------------------

### Configure n8n to use Postgres

Source: https://docs.railway.com/guides/n8n

Sets environment variables to configure n8n to use a PostgreSQL database instead of the default SQLite. Ensure you have a Postgres database service added to your project.

```bash
DB_TYPE=postgresdb
```

```bash
DB_POSTGRESDB_HOST=${{Postgres.PGHOST}}
```

```bash
DB_POSTGRESDB_PORT=${{Postgres.PGPORT}}
```

```bash
DB_POSTGRESDB_DATABASE=${{Postgres.PGDATABASE}}
```

```bash
DB_POSTGRESDB_USER=${{Postgres.PGUSER}}
```

```bash
DB_POSTGRESDB_PASSWORD=${{Postgres.PGPASSWORD}}
```

--------------------------------

### Initiate Pushed Authorization Request (PAR)

Source: https://docs.railway.com/integrations/oauth/login-and-tokens

Use this endpoint to POST authorization parameters securely. It returns a request_uri to be used in the subsequent authorization redirect.

```bash
curl -X POST https://backboard.railway.com/oauth/request \
  -u "YOUR_CLIENT_ID:YOUR_CLIENT_SECRET" \
  -d "redirect_uri=https://yourapp.com/callback" \
  -d "scope=openid email profile" \
  -d "response_type=code"
```

--------------------------------

### Define a Dockerfile for a Gin application

Source: https://docs.railway.com/guides/gin

Use this Dockerfile configuration to containerize a Go Gin application for deployment on Railway.

```dockerfile
# Use the Go 1.23 alpine official image# https://hub.docker.com/_/golangFROM golang:1.23-alpine# Create and change to the app directory.WORKDIR /app# Copy go mod and sum filesCOPY go.mod go.sum ./# Copy local code to the container image.COPY . ./# Install project dependenciesRUN go mod download# Build the appRUN go build -o app# Run the service on container startup.ENTRYPOINT ["./app"]
```

--------------------------------

### Generate Fish Completion Script

Source: https://docs.railway.com/cli/completion

Save the output to the specified Fish configuration directory for completion.

```fish
railway completion fish > ~/.config/fish/completions/railway.fish
```

--------------------------------

### Authentication Token

Source: https://docs.railway.com/integrations/api/api-cookbook

Set the environment variable for API authentication.

```bash
# Set your token (get one from railway.com/account/tokens)export RAILWAY_TOKEN="your-token"
```

--------------------------------

### Fetch Project Name and Service Names

Source: https://docs.railway.com/integrations/api/graphql-overview

Use this GraphQL query to fetch a project's name and the names of its associated services. The server returns data that precisely matches the query structure.

```graphql
query project($id: String!) {
  project(id: $id) {
    name
    services {
      edges {
        node {
          name
        }
      }
    }
  }
}
```

```json
{
  "id": "your-project-id"
}
```

```json
{
  "data": {
    "project": {
      "name": "my-app",
      "services": {
        "edges": [
          { "node": { "name": "api" } },
          { "node": { "name": "postgres" } }
        ]
      }
    }
  }
}
```

--------------------------------

### Configure build.sbt for JavaAppPackaging and PlayScala

Source: https://docs.railway.com/guides/play

Enable `JavaAppPackaging` and `PlayScala` plugins in `build.sbt`, set the `executableScriptName`, and include necessary dependencies. Ensure FlywayPlugin is also enabled if using Flyway.

```scala
name := """helloworld"""
organization := "com.railwayguide"
version := "1.0-SNAPSHOT"
executableScriptName := "main"
lazy val root = (project in file(".")).enablePlugins(PlayScala).enablePlugins(JavaAppPackaging).enablePlugins(FlywayPlugin)
scalaVersion := "2.13.15"
libraryDependencies += guice
libraryDependencies += "org.scalatestplus.play" %% "scalatestplus-play" % "7.0.1" % Test
libraryDependencies += "org.postgresql" % "postgresql" % "42.7.4" // Always use the latest stable version
flywayUrl := sys.env.getOrElse("DATABASE_URL", "jdbc:postgresql://127.0.0.1:5432/scala_play?user=username")
flywayLocations := Seq("filesystem:src/main/resources/db/migration")
```

--------------------------------

### Dockerfile for Nuxt App

Source: https://docs.railway.com/guides/nuxt

This is a sample Dockerfile content to be placed in your Nuxt app's root directory for deployment.

```dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./ 

RUN npm install

COPY . .

RUN npx nuxi build

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]

```

--------------------------------

### Generate a Railway domain

Source: https://docs.railway.com/cli/domain

Creates a free *.up.railway.app domain for the service.

```bash
railway domain
```

--------------------------------

### Railway Build Command Configuration

Source: https://docs.railway.com/guides/phoenix-distillery

Configure this as the 'Build command' in Railway service settings. It ensures Hex and Rebar are updated, dependencies are fetched, and the release is compiled and packaged.

```bash
mix local.hex --force && mix local.rebar --force && mix deps.get --only prod && mix compile && mkdir -p _build/prod/rel/helloworld_distillery/releases/RELEASES && mix do phx.digest, distillery.release --env=prod
```

--------------------------------

### Dockerfile for ASP.NET Core App

Source: https://docs.railway.com/guides/aspnet-core

This Dockerfile builds and runs an ASP.NET Core application. It uses a multi-stage build to create a smaller production image. Ensure 'App.dll' is replaced with your project's actual assembly name.

```docker
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS buildWORKDIR /appCOPY *.csproj ./RUN dotnet restoreCOPY . ./RUN dotnet publish -c Release -o outFROM mcr.microsoft.com/dotnet/aspnet:9.0WORKDIR /appCOPY --from=build /app/out ./ENTRYPOINT ["dotnet", "App.dll"]
```

--------------------------------

### Dockerfile for Ktor App Build

Source: https://docs.railway.com/guides/ktor

A Dockerfile to build a fat JAR for a Ktor application using Gradle and then create a minimal JRE image for deployment. Ensure your Ktor app binds to 0.0.0.0 and reads the port from the PORT environment variable.

```docker
FROM gradle:8-jdk21 AS build
WORKDIR /app
COPY . ./
RUN gradle buildFatJar --no-daemon
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/build/libs/*-all.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
```

--------------------------------

### Create Employee Table Migration SQL

Source: https://docs.railway.com/guides/play

Define the SQL schema for the `employee` table in a migration file. This file should be placed in the `src/main/resources/db/migration` directory.

```sql
CREATE TABLE employee (
  id VARCHAR(20) PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  email VARCHAR(30),
  admin BOOLEAN
);
```

--------------------------------

### Scale a service across regions

Source: https://docs.railway.com/cli/service

Adjust the number of instances for a service in specific regions. Specify the region and desired instance count.

```bash
railway service scale --us-west1=2
```

--------------------------------

### Railway project command usage

Source: https://docs.railway.com/cli/project

General syntax for executing project-related commands.

```bash
railway project <COMMAND>
```

--------------------------------

### Configure TypeORM in AppModule

Source: https://docs.railway.com/guides/nest

Sets up the TypeORM module with hardcoded database credentials for local development.

```typescript
import { Module } from "@nestjs/common";import { AppController } from "./app.controller";import { AppService } from "./app.service";import { TypeOrmModule } from "@nestjs/typeorm";@Module({  imports: [    TypeOrmModule.forRoot({      type: "postgres",      host: "localhost",      port: 5432,      username: "username",      password: "password",      database: "nestjshelloworld_dev",      entities: [],      synchronize: true,    }),  ],  controllers: [AppController],  providers: [AppService],})export class AppModule {}
```

--------------------------------

### Set a variable

Source: https://docs.railway.com/cli/variable

Assign values to environment variables.

```bash
railway variable set API_KEY=secret123
```

```bash
railway variable set API_KEY=secret123 DEBUG=true
```

```bash
echo "my-secret-value" | railway variable set SECRET_KEY --stdin
```

--------------------------------

### Logs from specific deployment

Source: https://docs.railway.com/cli/logs

Retrieves build logs for a specific deployment ID.

```bash
railway logs 7422c95b-c604-46bc-9de4-b7a43e1fd53d --build
```

--------------------------------

### Configure syslog.yaml

Source: https://docs.railway.com/guides/set-up-a-datadog-agent

Instructs the agent to listen for syslog traffic on port 514.

```yaml
logs:  - type: udp    port: 514    service: "node-app"    source: syslog
```

--------------------------------

### Non-interactive project creation

Source: https://docs.railway.com/cli/init

Used for CI/CD pipelines to create a project without prompts, outputting results in JSON format.

```bash
railway init --name my-api --workspace my-team-id --json
```

--------------------------------

### Troubleshoot Subnet Router

Source: https://docs.railway.com/guides/bridge-railway-to-rds-with-tailscale

Commands to verify IP forwarding status and Tailscale service health.

```bash
cat /proc/sys/net/ipv4/ip_forward
```

```bash
sudo systemctl status tailscaled
```

--------------------------------

### Configure environment variables for database

Source: https://docs.railway.com/guides/nest

Updates the AppModule to use process.env variables for database connectivity, enabling dynamic configuration during deployment.

```typescript
import { Module } from "@nestjs/common";import { AppController } from "./app.controller";import { AppService } from "./app.service";import { TypeOrmModule } from "@nestjs/typeorm";@Module({  imports: [    TypeOrmModule.forRoot({      type: "postgres",      host: process.env.DB_HOST,      port: 5432,      username: process.env.DB_USERNAME,      password: process.env.DB_PASSWORD,      database: process.env.DB_DATABASE,      entities: [],      synchronize: true,    }),  ],  controllers: [AppController],  providers: [AppService],})export class AppModule {}
```

--------------------------------

### Caddyfile Configuration for Railway

Source: https://docs.railway.com/guides/vue

Configures global options and site blocks for Railway deployment, including JSON logging, proxy trust, and static file serving from a dist directory.

```Caddyfile
global options{    admin off # there's no need for the admin api in railway's environment    persist_config off # storage isn't persistent anyway    auto_https off # railway handles https for us, this would cause issues if left enabled    # runtime logs    log {        format json # set runtime log format to json mode    }    # server options    servers {        trusted_proxies static private_ranges 100.0.0.0/8 # trust railway's proxy    }}# site block, listens on the $PORT environment variable, automatically assigned by railway:{$PORT:3000} {    # access logs    log {        format json # set access log format to json mode    }    # health check for railway    rewrite /health /*    # serve from the 'dist' folder (Vite builds into the 'dist' folder)    root * dist    # enable gzipping responses    encode gzip    # serve files from 'dist'    file_server    # if path doesn't exist, redirect it to 'index.html' for client side routing    try_files {path} /index.html}
```

--------------------------------

### Volume Backups - Restore from Backup

Source: https://docs.railway.com/integrations/api/manage-volumes

Restore a volume instance from a backup.

```APIDOC
## Volume Backups - Restore from Backup

### Description
Restore a volume instance from a backup.

### Method
POST (or GraphQL mutation)

### Endpoint
`/api/volume-instances/{volumeInstanceId}/backups/{volumeInstanceBackupId}/restore` (Conceptual REST endpoint)

### Parameters
#### Query Parameters
- **volumeInstanceBackupId** (string) - Required - The ID of the backup to restore from.
- **volumeInstanceId** (string) - Required - The ID of the volume instance to restore to.

### Request Example
```graphql
mutation volumeInstanceBackupRestore($volumeInstanceBackupId: String!, $volumeInstanceId: String!) {
  volumeInstanceBackupRestore(volumeInstanceBackupId: $volumeInstanceBackupId, volumeInstanceId: $volumeInstanceId)
}
```

Variables
```json
{
  "volumeInstanceBackupId": "backup-id",
  "volumeInstanceId": "volume-instance-id"
}
```

### Response
#### Success Response (200)
(No specific fields returned in the example, typically indicates success)

#### Response Example
```json
{
  "data": {
    "volumeInstanceBackupRestore": null
  }
}
```
```

--------------------------------

### Create RELEASES directory

Source: https://docs.railway.com/guides/phoenix-distillery

Manually create the RELEASES directory if you encounter the 'Failed to archive release' error. This directory is essential for the release packaging process.

```bash
mkdir -p _build/prod/rel/helloworld_distillery/releases/RELEASES
```

--------------------------------

### Execute API Query with Account Token

Source: https://docs.railway.com/integrations/api

Uses an account token in the Authorization header to fetch personal user details.

```bash
curl --request POST \
  --url https://backboard.railway.com/graphql/v2 \
  --header 'Authorization: Bearer <API_TOKEN_GOES_HERE>' \
  --header 'Content-Type: application/json' \
  --data '{"query":"query { me { name email } }"}'
```

--------------------------------

### POST /graphql - Create Volume

Source: https://docs.railway.com/integrations/api/api-cookbook

Creates a new volume for a service.

```APIDOC
## POST /graphql

### Description
Creates a volume.

### Request Body
- **input** (VolumeCreateInput) - Required - Contains projectId, serviceId, and mountPath.

### Request Example
{
  "input": {
    "projectId": "project-id",
    "serviceId": "service-id",
    "mountPath": "/data"
  }
}
```

--------------------------------

### Logs from specific service

Source: https://docs.railway.com/cli/logs

Targets logs from a specific service and environment.

```bash
railway logs --service backend --environment production
```

--------------------------------

### Fetch a Single Deployment by ID

Source: https://docs.railway.com/integrations/api/manage-deployments

Retrieve details for a specific deployment using its unique ID. Includes metadata and redeploy/rollback capabilities.

```GraphQL
query deployment($id: String!) {
  deployment(id: $id) {
    id
    status
    createdAt
    url
    staticUrl
    meta
    canRedeploy
    canRollback
  }
}
```

```JSON
{
  "id": "deployment-id"
}
```

--------------------------------

### Subdirectory deployment

Source: https://docs.railway.com/cli/up

Deploys a specific subdirectory instead of the root directory.

```bash
railway up ./backend
```

--------------------------------

### Match Go files in root

Source: https://docs.railway.com/guides/build-configuration

Use this pattern to match Go files in the root directory, but not in subdirectories. This helps in monorepos to specify which files trigger a build.

```shell
# Match Go files in the root, but not in subdirectories/*.go
```

--------------------------------

### Dockerfile for Clojure Luminus App

Source: https://docs.railway.com/guides/luminus

A Dockerfile configuration using the official Clojure image to build and run a Luminus application via Leiningen.

```dockerfile
# Use the Clojure official image# https://hub.docker.com/_/clojureFROM clojure:temurin-23-lein-bookworm# Create and change to the app directory.WORKDIR /app# Copy local code to the container image.COPY . ./# Build the app.RUN lein uberjar# Run the app by dynamically finding the standalone JAR file in the target/uberjar directoryCMD ["sh", "-c", "java -jar $(find target/uberjar -name '*.jar' ! -name '*SNAPSHOT*')"]
```

--------------------------------

### Test Connection

Source: https://docs.railway.com/integrations/api/api-cookbook

Verify authentication by fetching current user details.

```graphql
query {    me {      id      name      email    }  }
```

--------------------------------

### Set Database URL in application.conf

Source: https://docs.railway.com/guides/play

Configure the default database URL in `application.conf` to read from the `DATABASE_URL` environment variable.

```scala
db.default.url="jdbc:${?DATABASE_URL}"
```

--------------------------------

### Bind Python Servers to IPv4 and IPv6

Source: https://docs.railway.com/private-networking

Configure Gunicorn, Hypercorn, or Uvicorn to bind to all interfaces.

```bash
gunicorn app:app --bind [::]:${PORT-3000}
```

```bash
hypercorn app:app --bind [::]:${PORT-3000}
```

```bash
uvicorn app:app --host "" --port ${PORT-3000}
```

--------------------------------

### View service logs

Source: https://docs.railway.com/cli/service

Fetch and display logs from a service. This command can be used with various flags to filter or specify log types.

```bash
railway service logs
```

--------------------------------

### Delete a project with 2FA

Source: https://docs.railway.com/cli/delete

Provides a 2FA code to authorize the deletion of a project when 2FA is enabled.

```bash
railway delete --project my-project --yes --2fa-code 123456
```

--------------------------------

### Export Supabase Data with pg_dump

Source: https://docs.railway.com/platform/migrate-from-lovable

Use this command to export data from your Supabase instance for migration. Ensure you replace placeholders with your actual host and database name.

```bash
pg_dump -h <supabase-host> -U postgres -d postgres -F c -f backup.dump
```

--------------------------------

### Configure Astro for SSR

Source: https://docs.railway.com/guides/astro

Update the configuration file to set the output mode to server and specify the adapter mode.

```javascript
// @ts-checkimport { defineConfig } from "astro/config";import mdx from "@astrojs/mdx";import sitemap from "@astrojs/sitemap";import node from "@astrojs/node";// https://astro.build/configexport default defineConfig({  site: "https://example.com",  integrations: [mdx(), sitemap()],  output: "server",  adapter: node({    mode: "standalone",  }),});
```

--------------------------------

### Configure GitHub Actions Workflow for NuxtJS with Bun

Source: https://docs.railway.com/guides/github-actions-runners

A basic workflow configuration for running eslint checks on a NuxtJS project using Bun on a self-hosted Railway runner.

```yaml
name: eslint checkon:  pull_request:    branches:      - mainpermissions:  contents: readjobs:  build:    name: Check    runs-on: [self-hosted, railway]    steps:      - name: Checkout        uses: actions/checkout@v4        with:          token: ${{ secrets.GITHUB_TOKEN }}      - name: Install bun        uses: oven-sh/setup-bun@v2      - name: Set up Node        uses: actions/setup-node@v4        with:          node-version: 22      - name: Cache Files        uses: actions/cache@v4        with:          path: |            ~/.bun/install/cache            path: ${{ github.workspace }}/**/node_modules            path: ${{ github.workspace }}/**/.nuxt          key: ${{ runner.os }}-bun-${{ hashFiles('**/bun.lock', 'nuxt.config.ts', 'app.config.ts', 'app.vue') }}      - name: Install packages        run: bun install --prefer-offline      - name: Lint        run: bun run lint
```

--------------------------------

### Create a service domain

Source: https://docs.railway.com/integrations/api/manage-domains

Generates a new Railway-provided domain for a service. Requires the service ID and environment ID.

```graphql
mutation serviceDomainCreate($input: ServiceDomainCreateInput!) {
  serviceDomainCreate(input: $input) {
    id
    domain
  }
}
```

```json
{
  "input": {
    "serviceId": "service-id",
    "environmentId": "environment-id"
  }
}
```

--------------------------------

### Cache Mount Syntax

Source: https://docs.railway.com/builds/dockerfiles

Use this format for cache mounts in your Dockerfile. Replace `<service id>` with your service's ID.

```plaintext
--mount=type=cache,id=s/<service id>-<target path>,target=<target path>
```

--------------------------------

### Specify Dockerfile Path

Source: https://docs.railway.com/config-as-code/reference

Indicate the location of a non-standard Dockerfile. Can be set to `null`.

```json
{
  "$schema": "https://railway.com/railway.schema.json",
  "build": {
    "dockerfilePath": "Dockerfile.backend"
  }
}
```

--------------------------------

### List Recent Deployments

Source: https://docs.railway.com/integrations/api/api-cookbook

Retrieve the five most recent deployments for a specific service.

```graphql
query deployments($input: DeploymentListInput!) {    deployments(input: $input, first: 5) {      edges {        node {          id          status          createdAt        }      }    }  }
```

```json
{  "input": {    "projectId": "project-id",    "serviceId": "service-id"  }}
```

--------------------------------

### Scopes for Workspace Queries

Source: https://docs.railway.com/integrations/oauth/troubleshooting

When querying workspaces, ensure your authorization request includes `openid`, `email`, `profile`, and `workspace:viewer` scopes for proper resolution.

```text
&scope=openid email profile workspace:viewer
```

--------------------------------

### Create volume

Source: https://docs.railway.com/integrations/api/api-cookbook

Provisions a new volume for a specific service.

```GraphQL
  mutation volumeCreate($input: VolumeCreateInput!) {    volumeCreate(input: $input) {      id    }  }
```

```JSON
{  "input": {    "projectId": "project-id",    "serviceId": "service-id",    "mountPath": "/data"  }}
```

--------------------------------

### Configure Precompile Assets via railway.json

Source: https://docs.railway.com/guides/rails

Use the preDeployCommand in railway.json to automatically compile assets before each deployment, ensuring Tailwind CSS works in production.

```json
{
  "$schema": "https://railway.com/railway.schema.json",
  "deploy": {
    "preDeployCommand": "bundle exec rails db:prepare && bundle exec rails assets:precompile"
  }
}
```

--------------------------------

### Redeploy command usage

Source: https://docs.railway.com/cli/redeploy

Basic syntax for the redeploy command.

```bash
railway redeploy [OPTIONS]
```

--------------------------------

### Enable Basic Authentication for n8n

Source: https://docs.railway.com/guides/n8n

Enables basic authentication for the n8n editor, protecting it from unauthorized access. Set the username and password using the respective variables.

```bash
N8N_BASIC_AUTH_ACTIVE=true
```

```bash
N8N_BASIC_AUTH_USER=Your username
```

```bash
N8N_BASIC_AUTH_PASSWORD=Your password
```

--------------------------------

### Initial package.json scripts configuration

Source: https://docs.railway.com/guides/angular

The default scripts section generated by Angular for a project with SSR enabled.

```json
"scripts": {    "ng": "ng",    "start": "ng serve",    "build": "ng build",    "watch": "ng build --watch --configuration development",    "test": "ng test",    "serve:ssr:gratitudeapp": "node dist/gratitudeapp/server/server.mjs"  },
```

--------------------------------

### Configure Frontend Backend Host Variable

Source: https://docs.railway.com/guides/deploying-a-monorepo

Set the VITE_BACKEND_HOST variable in the frontend service to point to the backend's public domain.

```text
VITE_BACKEND_HOST=${{Backend.RAILWAY_PUBLIC_DOMAIN}}
```

--------------------------------

### Precompile Assets in Dockerfile

Source: https://docs.railway.com/guides/rails

Add this command to your Dockerfile to precompile assets during the Docker build process, resolving Tailwind CSS production errors.

```bash
RUN SECRET_KEY_BASE_DUMMY=1 ./bin/rails assets:precompile
```

--------------------------------

### List deployments

Source: https://docs.railway.com/integrations/api/manage-deployments

Retrieves a list of deployments for a specific service within an environment.

```APIDOC
## POST /graphql

### Description
Get all deployments for a service in an environment.

### Method
POST

### Request Body
- **input** (DeploymentListInput) - Required - Contains projectId, serviceId, and environmentId
- **first** (Int) - Optional - Number of items to return

### Request Example
{
  "input": {
    "projectId": "project-id",
    "serviceId": "service-id",
    "environmentId": "environment-id"
  },
  "first": 10
}
```

--------------------------------

### Create run-worker.sh for Symfony Worker Service

Source: https://docs.railway.com/guides/symfony

This script initiates the Symfony messenger queue worker. Ensure the file has executable permissions using chmod +x run-worker.sh.

```bash
#!/bin/bash# Make sure this file has executable permissions, run `chmod +x run-worker.sh`# This command runs the queue worker.php bin/console messenger:consume async --time-limit=3600 --memory-limit=128M &
```

--------------------------------

### Deploy in Attached Mode

Source: https://docs.railway.com/cli/deploying

Use the default attached mode to stream build and deployment logs directly to your terminal. This is useful for monitoring the build process and identifying errors immediately.

```bash
railway up
```

--------------------------------

### Add Caddy Plugins via Environment Variable

Source: https://docs.railway.com/guides/caddy

Specify Caddy plugins using Go module paths, separated by spaces, in the CADDY_PLUGINS variable. This is done during the one-click deployment configuration or by setting the environment variable in your Railway project.

```bash
github.com/caddy-dns/cloudflare github.com/mholt/caddy-ratelimit
```

--------------------------------

### List environments

Source: https://docs.railway.com/integrations/api/manage-environments

Retrieves a list of all environments associated with a specific project, with an option to filter out ephemeral environments.

```APIDOC
## POST /graphql

### Description
Fetch all environments for a given project ID. Supports filtering by ephemeral status.

### Method
POST

### Parameters
#### Request Body
- **projectId** (String) - Required - The ID of the project.
- **isEphemeral** (Boolean) - Optional - Filter to include or exclude PR/preview environments.
```

--------------------------------

### Display S3 Credentials

Source: https://docs.railway.com/cli/bucket

Show S3-compatible credentials for a bucket. The default output is suitable for shell environments. Use `--reset` to invalidate existing credentials and generate new ones. The `--yes` flag skips confirmation when resetting.

```bash
railway bucket credentials
```

```bash
railway bucket credentials --reset --yes
```

--------------------------------

### Add a custom domain

Source: https://docs.railway.com/integrations/api/manage-domains

Adds a custom domain to a service. Requires project, environment, service IDs, and the domain name. The response includes DNS record information needed for configuration.

```graphql
mutation customDomainCreate($input: CustomDomainCreateInput!) {
  customDomainCreate(input: $input) {
    id
    domain
    status {
      dnsRecords {
        hostlabel
        requiredValue
        status
      }
    }
  }
}
```

```json
{
  "input": {
    "projectId": "project-id",
    "environmentId": "environment-id",
    "serviceId": "service-id",
    "domain": "api.example.com"
  }
}
```

--------------------------------

### Add domain to specific service

Source: https://docs.railway.com/cli/domain

Targets a specific service by name when adding a domain.

```bash
railway domain example.com --service api
```

--------------------------------

### Add PostgreSQL Driver Dependency

Source: https://docs.railway.com/guides/play

Add the PostgreSQL JDBC driver to your `build.sbt` file to enable database connectivity. Always use the latest stable version.

```scala
libraryDependencies += "org.postgresql" % "postgresql" % "42.7.4" // Always use the latest stable version
```

--------------------------------

### Configure AWS Credentials and SSH Key

Source: https://docs.railway.com/guides/bridge-railway-to-rds-with-tailscale

Set your AWS access keys and generate an SSH key for EC2 instance provisioning. Supports direct export or retrieval via 1Password Secret References.

```bash
# Set your AWS credentials
export AWS_ACCESS_KEY_ID=my-access-key
export AWS_SECRET_ACCESS_KEY=my-secret-key

# Or with 1password
export AWS_ACCESS_KEY_ID=$(op read op://vault-name/aws-personal-access-key/access_key_id)
export AWS_SECRET_ACCESS_KEY=$(op read op://vault-name/aws-personal-access-key/secret_access_key)

# Generate an SSH key for the EC2 instance if you don't have one
ssh-keygen -t rsa -b 2048 -f ~/.ssh/tailscale-rds

# Set your Tailscale auth key
# terraform.tfvars
# ...
tailscale_auth_key = "tskey-auth-1234567890"

# Or with 1password
tailscale_auth_key = $(op read op://vault-name/tailscale-auth-key/credential)
```

--------------------------------

### List Backup Schedules

Source: https://docs.railway.com/integrations/api/manage-volumes

Retrieves a list of all backup schedules configured for a volume instance. Requires the volume instance ID.

```GraphQL
query volumeInstanceBackupScheduleList($volumeInstanceId: String!) {
  volumeInstanceBackupScheduleList(volumeInstanceId: $volumeInstanceId) {
    id
    name
    cron
    kind
    retentionSeconds
    createdAt
  }
}
```

```JSON
{
  "volumeInstanceId": "volume-instance-id"
}
```

--------------------------------

### Update package.json Scripts

Source: https://docs.railway.com/guides/deploy-node-express-api-with-auto-scaling-secrets-and-zero-downtime

Add scripts for development, building, and production execution.

```json
{  "scripts": {    "dev": "tsx src/app.ts",    "build": "tsc",    "start": "node dist/app.js"  }}
```

--------------------------------

### Query Projects

Source: https://docs.railway.com/integrations/oauth/fetching-workspaces-or-projects

GraphQL query to retrieve external workspaces and their associated projects.

```graphql
query {  externalWorkspaces {    id    name    projects {      id      name    }  }}
```

--------------------------------

### List TCP proxies

Source: https://docs.railway.com/integrations/api/api-cookbook

Retrieves a list of TCP proxies for a given service and environment.

```GraphQL
query tcpProxies($serviceId: String!, $environmentId: String!) {    tcpProxies(serviceId: $serviceId, environmentId: $environmentId) {      id      domain      proxyPort      applicationPort    }  }
```

```JSON
{  "serviceId": "service-id",  "environmentId": "environment-id"}
```

--------------------------------

### Use Build-Time Variables in Dockerfile

Source: https://docs.railway.com/builds/dockerfiles

Declare and use build-time environment variables in your Dockerfile using the ARG command.

```dockerfile
# Specify the variable you need
ARG RAILWAY_SERVICE_NAME
# Use the variable
RUN echo $RAILWAY_SERVICE_NAME
```

```dockerfile
FROM node

ARG RAILWAY_ENVIRONMENT
```

--------------------------------

### List Volume Backups

Source: https://docs.railway.com/integrations/api/manage-volumes

Retrieves a list of all backups for a given volume instance. Requires the volume instance ID.

```GraphQL
query volumeInstanceBackupList($volumeInstanceId: String!) {
  volumeInstanceBackupList(volumeInstanceId: $volumeInstanceId) {
    id
    name
    createdAt
    expiresAt
    usedMB
    referencedMB
  }
}
```

```JSON
{
  "volumeInstanceId": "volume-instance-id"
}
```

--------------------------------

### Railway CLI Project Management Commands

Source: https://docs.railway.com/cli

Commands for initializing, linking, unlinking, listing, and managing the status of your Railway projects.

```bash
railway init                    # Create a new project
```

```bash
railway link                    # Link to existing project
```

```bash
railway unlink                  # Unlink current directory
```

```bash
railway list                    # List all projects
```

```bash
railway status                  # Show project info
```

```bash
railway open                    # Open in browser
```

--------------------------------

### GitHub Actions Post-Deployment Workflow

Source: https://docs.railway.com/guides/github-actions-post-deploy

This workflow triggers on a successful deployment status. It includes a debug step to print the event context and a conditional step to run actions only for production deployments.

```yaml
name: Post-Deployment Actions
on:
  deployment_status:
    states: [success]
jobs:
  post-deploy:
    runs-on: ubuntu-latest
    if: github.event.deployment_status.state == 'success'
    steps:
      - name: Debug - Print github.event object
        run: |
          echo "github.event context:"
          echo '${{ toJSON(github.event) }}'
      # Only run if this is a production environment deployment that succeeded
      - name: Run post-deploy actions
        if: github.event.deployment.environment == 'production'
        run: |
          echo "Production deployment succeeded"
```

--------------------------------

### Configure Dockerfile for Flask Deployment

Source: https://docs.railway.com/guides/flask

Use this Dockerfile configuration to define the environment and startup command for a Python Flask application on Railway.

```dockerfile
# Use the Python 3 official image# https://hub.docker.com/_/pythonFROM python:3# Run in unbuffered modeENV PYTHONUNBUFFERED=1# Create and change to the app directory.WORKDIR /app# Copy local code to the container image.COPY . ./# Install project dependenciesRUN pip install --no-cache-dir -r requirements.txt# Run the web service on container startup.CMD ["gunicorn", "main:app"]
```

--------------------------------

### List Project Volumes

Source: https://docs.railway.com/integrations/api/manage-volumes

Lists all volumes within a specified project. Requires the project ID.

```GraphQL
query project($id: String!) {
  project(id: $id) {
    volumes {
      edges {
        node {
          id
          name
          createdAt
        }
      }
    }
  }
}
```

```JSON
{
  "id": "project-id"
}
```

--------------------------------

### Deploy Project using Railway CLI

Source: https://docs.railway.com/guides/playwright

Deploy your project to Railway using the CLI. This command uploads your project files and triggers a Docker build if a Dockerfile is present.

```bash
railway login
railway link
railway up
```

--------------------------------

### View logs for a specific deployment

Source: https://docs.railway.com/cli/deployment

Use a deployment ID obtained from the list command to view its logs.

```bash
# Get deployment ID from list
railway deployment list

# View logs for specific deployment
railway logs 7422c95b-c604-46bc-9de4-b7a43e1fd53d
```

--------------------------------

### Implement structured logging

Source: https://docs.railway.com/guides/logs

Emit logs as JSON strings to include custom metadata and ensure proper parsing.

```javascript
console.log(  JSON.stringify({    message: "A minimal structured log", // (required) The content of the log    level: "info", // Severity of the log (debug, info, warn, error)    customAttribute: "value", // Custom attributes (query via @name:value)  }),);
```

--------------------------------

### Interactive project deletion

Source: https://docs.railway.com/cli/delete

Initiates an interactive prompt to select and confirm the deletion of a project.

```bash
railway delete
```

--------------------------------

### Usage of railway connect

Source: https://docs.railway.com/cli/connect

The base command syntax for connecting to a database service.

```bash
railway connect [SERVICE_NAME] [OPTIONS]
```

--------------------------------

### Prepare Client-Side File Upload with Presigned URLs

Source: https://docs.railway.com/storage-buckets/uploading-serving

Server-side function to generate presigned POST data for a client to upload a file directly to the bucket. It enforces authorization, defines the storage key, and sets conditions like file type and size.

```typescript
// server-side
import { S3Client } from '@aws-sdk/client-s3'
import { createPresignedPost } from '@aws-sdk/s3-presigned-post'

async function prepareImageUpload(fileName: string) {
  const isAuthorized = isUserAuthorized(currentUser, fileKey)
  if (!isAuthorized) throw unauthorized()

  // The key under which the uploaded file will be stored.
  // Make sure that it's unique and users cannot override
  // each other's files.
  const Key = `user-uploads/${currentUser.id}/${fileName}`

  const { url, fields } = await createPresignedPost(new S3Client(), {
    Bucket: process.env.S3_BUCKET,
    Key,
    Expires: 3600,
    Conditions: [
      { bucket: process.env.S3_BUCKET },
      ['eq', '$key', Key],
      // restrict which content types can be uploaded
      ['starts-with', '$Content-Type', 'image/'],
      // restrict content length, to prevent users
      // from uploading suspiciously large files.
      // max 2 MB in this example.
      ['content-length-range', 5_000, 2_000_000],
    ],
  })

  return Response.json({ url, fields })
}
```

--------------------------------

### Authenticate with Railway CLI

Source: https://docs.railway.com/cli

Log in to your Railway account using the CLI. For environments without a browser, use the --browserless flag.

```bash
railway login
```

```bash
railway login --browserless
```

--------------------------------

### Fetching nested project data

Source: https://docs.railway.com/integrations/api/graphql-overview

Retrieves a project, its services, and the latest deployment status for each service instance.

```graphql
query project($id: String!) {  project(id: $id) {    name    services {      edges {        node {          name          serviceInstances {            edges {              node {                latestDeployment {                  status                }              }            }          }        }      }    }  }}
```

--------------------------------

### Remove all service configurations

Source: https://docs.railway.com/cli/dev

Removes configuration for all services.

```bash
railway dev configure --remove
```

--------------------------------

### Clone Caddy Railway Template

Source: https://docs.railway.com/guides/caddy

Clone the official Caddy Railway repository to your local machine to begin deployment using the CLI. This sets up the necessary project structure.

```bash
git clone https://github.com/caddyserver/caddy-railway.git my-caddy
cd my-caddy
```

--------------------------------

### Authorization Request with PKCE

Source: https://docs.railway.com/integrations/oauth/creating-an-app

Initiate the OAuth authorization flow for PKCE-enabled applications.

```APIDOC
## GET /oauth/auth

### Description
Initiates the OAuth authorization code flow with PKCE.

### Method
GET

### Endpoint
https://backboard.railway.com/oauth/auth

### Query Parameters
- **response_type** (string) - Required - Must be 'code'.
- **client_id** (string) - Required - Your application's client ID.
- **redirect_uri** (string) - Required - The URI to redirect the user to after authorization. Must match a registered URI.
- **scope** (string) - Required - The scope of the requested access (e.g., 'openid').
- **code_challenge** (string) - Required - The transformed code verifier for PKCE.
- **code_challenge_method** (string) - Required - The method used to transform the code verifier (e.g., 'S256').
```

--------------------------------

### View and Reveal Credentials

Source: https://docs.railway.com/integrations/stripe

Display environment variables for provisioned Railway services, with an option to reveal sensitive credentials.

```bash
stripe projects env
stripe projects env --reveal
```

--------------------------------

### Enable dual-stack lookup in ioredis

Source: https://docs.railway.com/databases/troubleshooting/enotfound-redis-railway-internal

Append the family=0 query parameter to the REDIS_URL to allow the client to resolve both IPv4 and IPv6 addresses.

```js
import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL + "?family=0");

const ping = await redis.ping();
```

--------------------------------

### Configure n8n Protocol

Source: https://docs.railway.com/guides/n8n

Sets the protocol for generated URLs within n8n. Use 'https' for secure connections.

```bash
N8N_PROTOCOL=https
```

--------------------------------

### Fetching Projects within Workspaces

Source: https://docs.railway.com/integrations/oauth/fetching-workspaces-or-projects

Retrieve a list of workspaces along with the specific projects within each workspace that the user has authorized your application to access. This requires project scopes.

```APIDOC
## POST /graphql/v2

### Description
Fetches workspaces and the projects within them that a user has granted access to. Requires project scopes (e.g., `project:viewer`).

### Method
POST

### Endpoint
https://backboard.railway.com/graphql/v2

### Request Body
- **query** (string) - Required - The GraphQL query string.

### Request Example
```json
{
  "query": "query { externalWorkspaces { id name projects { id name } } }"
}
```

### Response
#### Success Response (200)
- **data.externalWorkspaces** (array) - A list of workspace objects, each containing projects.
  - **id** (string) - The unique identifier for the workspace.
  - **name** (string) - The name of the workspace.
  - **projects** (array) - A list of project objects within the workspace.
    - **id** (string) - The unique identifier for the project.
    - **name** (string) - The name of the project.

#### Response Example
```json
{
  "data": {
    "externalWorkspaces": [
      {
        "id": "...",
        "name": "My Workspace",
        "projects": [
          {
            "id": "...",
            "name": "mywebsite.com"
          },
          {
            "id": "...",
            "name": "workflow automations"
          }
        ]
      }
    ]
  }
}
```
```

--------------------------------

### Prisma Migration Command

Source: https://docs.railway.com/guides/nextjs

Use this command to deploy database migrations for Prisma when using Railway's pre-deploy command feature.

```bash
npx prisma migrate deploy
```

--------------------------------

### SSH to Specific Service

Source: https://docs.railway.com/cli/ssh

Connects to a particular service within your project. Specify the service name when you need to target a non-default service.

```bash
railway ssh --service backend
```

--------------------------------

### Railway CLI Logs and Debugging Commands

Source: https://docs.railway.com/cli

Commands for streaming deployment logs, viewing build logs, and SSHing into service containers.

```bash
railway logs                    # Stream deployment logs
```

```bash
railway logs --build            # View build logs
```

```bash
railway logs -n 100             # View last 100 lines
```

```bash
railway ssh                     # SSH into service container
```

```bash
railway connect                 # Connect to database shell
```

--------------------------------

### Update Service Instance Settings

Source: https://docs.railway.com/integrations/api/manage-services

Update build or deploy settings for a service instance in a specific environment.

```APIDOC
## PUT /api/services/{serviceId}/environments/{environmentId}

### Description
Updates the build and deploy settings for a service instance within a specified environment. Additional settings are available upon request.

### Method
PUT

### Endpoint
`/api/services/{serviceId}/environments/{environmentId}`

### Parameters
#### Path Parameters
- **serviceId** (string) - Required - The ID of the service.
- **environmentId** (string) - Required - The ID of the environment.

#### Request Body
- **startCommand** (string) - Optional - The command to start the service.
- **buildCommand** (string) - Optional - The command to build the service.
- **rootDirectory** (string) - Optional - The root directory for the service.
- **healthcheckPath** (string) - Optional - The path for health checks.
- **region** (string) - Optional - The region for the service instance.
- **numReplicas** (integer) - Optional - The number of replicas for the service instance.
- **restartPolicyType** (string) - Optional - The type of restart policy.
- **restartPolicyMaxRetries** (integer) - Optional - The maximum number of retries for the restart policy.

### Request Example
```json
{
  "startCommand": "npm run start"
}
```

### Response
#### Success Response (200)
This endpoint does not return a response body upon successful update.
```

--------------------------------

### List Volumes

Source: https://docs.railway.com/cli/volume

Lists all persistent storage volumes associated with a project.

```APIDOC
## List Volumes

### Description
Lists all persistent storage volumes associated with a project.

### Method
GET

### Endpoint
/v1/volumes

### Query Parameters
- **environment** (string) - Optional - Environment ID to filter volumes.
- **json** (boolean) - Optional - Output in JSON format.

### Response
#### Success Response (200)
- **volumes** (array) - An array of volume objects.
  - **id** (string) - The unique identifier of the volume.
  - **name** (string) - The name of the volume.
  - **mountPath** (string) - The path where the volume is mounted within the service.
  - **createdAt** (string) - The timestamp when the volume was created.

#### Response Example
```json
{
  "volumes": [
    {
      "id": "vol-abcdef123456",
      "name": "my-data-volume",
      "mountPath": "/data",
      "createdAt": "2023-10-27T10:00:00Z"
    }
  ]
}
```
```

--------------------------------

### Generate Bash Completion Script

Source: https://docs.railway.com/cli/completion

Redirect the output to a file in your bash completion directory or source it in your .bashrc for interactive completion.

```bash
railway completion bash > /etc/bash_completion.d/railway
```

```bash
source <(railway completion bash)
```

--------------------------------

### Deploy in CI Mode

Source: https://docs.railway.com/cli/deploying

Stream only build logs and exit upon completion using the `-c` or `--ci` flag. This mode is ideal for CI/CD pipelines. Use `--json` to output logs in JSON format, which also implies CI mode.

```bash
railway up --ci
```

--------------------------------

### Link to a Specific Project

Source: https://docs.railway.com/cli/link

Specify the project name or ID directly to link the current directory to that particular Railway project.

```bash
railway link --project my-api
```

--------------------------------

### Configure Environment Variables on Railway

Source: https://docs.railway.com/guides/sails

Set `DATABASE_URL` and `REDIS_URL` in your app's service Variables section on Railway. These reference the URLs of your newly added database services.

```bash
DATABASE_URL: ${{Postgres.DATABASE_URL}}
REDIS_URL: ${{Redis.REDIS_URL}}
```

--------------------------------

### Scale a Service

Source: https://docs.railway.com/cli/scale

This command allows you to scale a service by configuring the number of instances in different regions. It supports interactive mode or direct configuration via flags.

```APIDOC
## POST /websites/railway/scale

### Description
Scales a service by configuring the number of instances in different regions.

### Method
POST

### Endpoint
/websites/railway/scale

### Parameters
#### Query Parameters
- **--service** (string) - Optional - Service to scale (defaults to linked service)
- **--environment** (string) - Optional - Environment the service is in (defaults to linked environment)
- **--json** (boolean) - Optional - Output in JSON format
- **--<REGION>** (integer) - Optional - Set the number of instances for a specific region (e.g., --us-west1=2)

### Request Example
```json
{
  "service": "backend",
  "environment": "production",
  "regions": {
    "us-west1": 2,
    "us-east4": 1
  }
}
```

### Response
#### Success Response (200)
- **message** (string) - Confirmation message of the scaling operation.
- **service** (object) - Details of the scaled service.
  - **id** (string) - Service ID.
  - **name** (string) - Service name.
  - **environmentId** (string) - Environment ID.
  - **regionInstances** (object) - Current instance configuration per region.

#### Response Example
```json
{
  "message": "Service scaled successfully.",
  "service": {
    "id": "srv_abc123",
    "name": "backend",
    "environmentId": "env_xyz789",
    "regionInstances": {
      "us-west1": 2,
      "us-east4": 1
    }
  }
}
```
```

--------------------------------

### Project Response Format

Source: https://docs.railway.com/integrations/oauth/fetching-workspaces-or-projects

JSON response structure for a project query.

```json
{  "data": {    "externalWorkspaces": [      {        "id": "...",        "name": "My Workspace",        "projects": [          {            "id": "...",            "name": "mywebsite.com"          },          {            "id": "...",            "name": "workflow automations"          }        ]      }    ]  }}
```

--------------------------------

### POST /graphql - Create Custom Domain

Source: https://docs.railway.com/integrations/api/api-cookbook

Registers a custom domain for a specific service within an environment.

```APIDOC
## POST /graphql

### Description
Registers a custom domain.

### Request Body
- **input** (CustomDomainCreateInput) - Required - Contains projectId, environmentId, serviceId, and domain.

### Request Example
{
  "input": {
    "projectId": "project-id",
    "environmentId": "environment-id",
    "serviceId": "service-id",
    "domain": "api.example.com"
  }
}
```

--------------------------------

### Generate a presigned upload URL in Node.js

Source: https://docs.railway.com/guides/storage-buckets-guide

Uses the AWS SDK to create a PUT URL for direct client-side uploads. Requires environment variables for bucket credentials.

```javascript
// Node.js with @aws-sdk/client-s3 and @aws-sdk/s3-request-presignerimport { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';import { getSignedUrl } from '@aws-sdk/s3-request-presigner';const s3 = new S3Client({  region: 'us-east-1',  endpoint: process.env.BUCKET_ENDPOINT,  credentials: {    accessKeyId: process.env.BUCKET_ACCESS_KEY_ID,    secretAccessKey: process.env.BUCKET_SECRET_ACCESS_KEY,  },});async function getUploadUrl(key) {  const command = new PutObjectCommand({    Bucket: process.env.BUCKET_NAME,    Key: key,  });  return getSignedUrl(s3, command, { expiresIn: 3600 });}
```

--------------------------------

### Configure Caddyfile for Railway

Source: https://docs.railway.com/guides/solid

Caddy configuration for serving static files, handling client-side routing, and integrating with Railway's environment.

```caddyfile
{
    # global options
    admin off # there's no need for the admin api in railway's environment
    persist_config off # storage isn't persistent anyway
    auto_https off # railway handles https for us, this would cause issues if left enabled

    # runtime logs
    log {
        format json # set runtime log format to json mode
    }

    # server options
    servers {
        trusted_proxies static private_ranges 100.0.0.0/8 # trust railway's proxy
    }
}

# site block, listens on the $PORT environment variable, automatically assigned by railway:
{$PORT:3000} {
    # access logs
    log {
        format json # set access log format to json mode
    }

    # health check for railway
    rewrite /health /*

    # serve from the 'dist' folder (Vite builds into the 'dist' folder)
    root * dist

    # enable gzipping responses
    encode gzip

    # serve files from 'dist'
    file_server

    # if path doesn't exist, redirect it to 'index.html' for client side routing
    try_files {path} /index.html
}
```

--------------------------------

### Transfer a project to a workspace

Source: https://docs.railway.com/integrations/api/manage-projects

Transfer a project to a different workspace.

```APIDOC
## Transfer a project to a workspace

### Description
Transfer a project to a different workspace.

### Method
POST

### Endpoint
/api/projects/{projectId}/transfer

### Path Parameters
- **projectId** (string) - Required - The ID of the project to transfer.

### Request Body
- **input** (object) - Required - Input object for transferring a project.
  - **workspaceId** (string) - Required - The ID of the target workspace.

### Request Example
```graphql
mutation projectTransfer($projectId: String!, $input: ProjectTransferInput!) {
  projectTransfer(projectId: $projectId, input: $input)
}
```

### Request Variables
```json
{
  "projectId": "project-id",
  "input": {
    "workspaceId": "target-workspace-id"
  }
}
```

### Response
#### Success Response (200)
Indicates successful transfer. The response body may be empty or contain a confirmation.

#### Response Example
```json
{
  "data": {
    "projectTransfer": true
  }
}
```
```

--------------------------------

### Configure Dockerfile for Axum Deployment

Source: https://docs.railway.com/guides/axum

Use this Dockerfile to build and deploy an Axum application on Railway. It utilizes cargo-chef for efficient dependency caching.

```dockerfile
FROM lukemathwalker/cargo-chef:latest-rust-1 AS chef# Create and change to the app directory.WORKDIR /appFROM chef AS plannerCOPY . ./RUN cargo chef prepare --recipe-path recipe.jsonFROM chef AS builderCOPY --from=planner /app/recipe.json recipe.json# Build dependencies - this is the caching Docker layer!RUN cargo chef cook --release --recipe-path recipe.json# Build applicationCOPY . ./RUN cargo build --releaseCMD ["./target/release/helloworld"]
```

--------------------------------

### Scale service to specific regions

Source: https://docs.railway.com/cli/scale

Directly sets instance counts for specified regions via flags.

```bash
railway scale --us-west1=2 --us-east4=1
```

--------------------------------

### Delete a project

Source: https://docs.railway.com/cli/project

Removes a specific project by name.

```bash
railway project delete --project my-old-project
```

--------------------------------

### List projects in a workspace

Source: https://docs.railway.com/integrations/api/manage-projects

Fetch projects belonging to a specific workspace using a workspace ID.

```GraphQL
query workspaceProjects($workspaceId: String!) {projects(workspaceId: $workspaceId) {  edges {    node {      id      name      description    }  }}}
```

```JSON
{
  "workspaceId": "workspace-id"
}
```

--------------------------------

### Configure Environment Variables for Rails App

Source: https://docs.railway.com/guides/rails

Set essential environment variables like SECRET_KEY_BASE or RAILS_MASTER_KEY and DATABASE_URL in your app's Variables section. Use the Raw Editor for bulk additions.

```bash
SECRET_KEY_BASE: "value"
DATABASE_URL: "${{Postgres.DATABASE_PUBLIC_URL}}"
```

--------------------------------

### Deploy a specific service

Source: https://docs.railway.com/integrations/api/manage-deployments

Triggers a new deployment for a specific service in an environment.

```APIDOC
## POST /graphql

### Description
Trigger a deployment for a specific service.

### Method
POST

### Request Body
- **input** (EnvironmentTriggersDeployInput) - Required - Contains environmentId, projectId, and serviceId

### Request Example
{
  "input": {
    "environmentId": "environment-id",
    "projectId": "project-id",
    "serviceId": "service-id"
  }
}
```

--------------------------------

### POST /graphql/v2 - Set Variables

Source: https://docs.railway.com/integrations/api/api-cookbook

Updates or creates environment variables for a specific project, environment, and service.

```APIDOC
## POST /graphql/v2

### Description
Upserts a collection of variables.

### Method
POST

### Endpoint
https://backboard.railway.com/graphql/v2

### Request Body
- **input** (VariableCollectionUpsertInput) - Required - The variables to set.

### Request Example
```graphql
mutation variableCollectionUpsert($input: VariableCollectionUpsertInput!) { variableCollectionUpsert(input: $input) }
```
```

--------------------------------

### Fetching Workspaces

Source: https://docs.railway.com/integrations/oauth/fetching-workspaces-or-projects

Retrieve a list of workspaces that the user has authorized your application to access. This requires specific workspace scopes and the email/profile scopes.

```APIDOC
## POST /graphql/v2

### Description
Fetches the workspaces a user has granted access to. Requires workspace scopes (e.g., `workspace:viewer`) and `email`, `profile` scopes.

### Method
POST

### Endpoint
https://backboard.railway.com/graphql/v2

### Request Body
- **query** (string) - Required - The GraphQL query string.

### Request Example
```json
{
  "query": "query { me { workspaces { id name } } }"
}
```

### Response
#### Success Response (200)
- **data.me.workspaces** (array) - A list of workspace objects.
  - **id** (string) - The unique identifier for the workspace.
  - **name** (string) - The name of the workspace.

#### Response Example
```json
{
  "data": {
    "me": {
      "workspaces": [
        {
          "id": "...",
          "name": "My Workspace"
        },
        {
          "id": "...",
          "name": "ACME Inc."
        }
      ]
    }
  }
}
```
```

--------------------------------

### Configure a reference variable for a private domain

Source: https://docs.railway.com/networking/domains/working-with-domains

Define a dynamic environment variable to reference another service's private domain and port.

```text
BACKEND_URL=http://${{api.RAILWAY_PRIVATE_DOMAIN}}:${{api.PORT}}
```

--------------------------------

### Access a service via environment variable

Source: https://docs.railway.com/networking/domains/working-with-domains

Use the configured environment variable to perform requests to the internal service.

```javascript
app.get("/fetch-data", async (req, res) => {  axios.get(`${process.env.BACKEND_URL}/data`).then(response => {    res.json(response.data);  });});
```

--------------------------------

### Run traceroute to Railway anycast IP

Source: https://docs.railway.com/networking/edge-networking

Use this command to test network paths to the Railway anycast IP address for diagnostic purposes.

```bash
traceroute 66.33.22.11
```

--------------------------------

### Exchange Authorization Code for Tokens with PKCE

Source: https://docs.railway.com/integrations/oauth/creating-an-app

Use this `curl` command to exchange an authorization code for tokens. Include the `code_verifier` to complete the PKCE flow. The `client_id` and `client_secret` are required for authentication.

```bash
curl -X POST https://backboard.railway.com/oauth/token \
  -u "YOUR_CLIENT_ID:YOUR_CLIENT_SECRET" \
  -d "grant_type=authorization_code" \
  -d "code=AUTHORIZATION_CODE" \
  -d "redirect_uri=https://yourapp.com/callback" \
  -d "code_verifier=CODE_VERIFIER"
```

--------------------------------

### Add Railway marketplace

Source: https://docs.railway.com/ai/claude-code-plugin

Registers the Railway plugin marketplace within Claude Code.

```bash
/plugin marketplace add railwayapp/railway-skills
```

--------------------------------

### Configure Ktor Port in application.conf

Source: https://docs.railway.com/guides/ktor

Set the Ktor deployment port to read from the PORT environment variable, with a fallback to 8080. This is necessary for Railway deployments.

```kotlin
ktor {
    deployment {
        port = ${?PORT}
        port = 8080
    }
}
```

--------------------------------

### Injecting Runtime Variables via RootLayout

Source: https://docs.railway.com/builds/skipped-builds

Pass server-side environment variables to the client by injecting them into a global window object within the RootLayout. Ensure only non-sensitive public data is exposed.

```tsx
// app/layout.tsx
export default function RootLayout({ children }) {
  const publicEnv = {
    apiUrl: process.env.API_URL,
  };

  return (
    <html>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__env = ${JSON.stringify(publicEnv)}`
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

--------------------------------

### Add domain with specific port

Source: https://docs.railway.com/cli/domain

Assigns a custom domain to a specific port on the service.

```bash
railway domain example.com --port 8080
```

--------------------------------

### Edit environment configuration

Source: https://docs.railway.com/cli/environment

Modify environment configuration settings.

```bash
railway environment edit --service-config backend variables.API_KEY.value "secret"
```

--------------------------------

### Define the Spring Boot Application Controller

Source: https://docs.railway.com/guides/spring-boot

Replace the default application file content to include a REST controller and a root mapping.

```java
package com.railwayguide.helloworld;import org.springframework.boot.SpringApplication;import org.springframework.boot.autoconfigure.SpringBootApplication;import org.springframework.web.bind.annotation.GetMapping;import org.springframework.web.bind.annotation.RestController;@SpringBootApplication@RestControllerpublic class HelloworldApplication {	public static void main(String[] args) {		SpringApplication.run(HelloworldApplication.class, args);	}	@GetMapping("/")    public String hello() {      return String.format("Hello world from Java Spring Boot!");    }}
```

--------------------------------

### Connect to Redis locally using public URL

Source: https://docs.railway.com/databases/troubleshooting/enotfound-redis-railway-internal

Use the REDIS_PUBLIC_URL environment variable to bypass private network restrictions when developing locally.

```js
import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_PUBLIC_URL);

const ping = await redis.ping();
```

--------------------------------

### Define a Dockerfile for FastAPI

Source: https://docs.railway.com/guides/fastapi

Use this Dockerfile to containerize a FastAPI application using the Python 3 alpine image and Hypercorn as the server.

```dockerfile
# Use the Python 3 alpine official image# https://hub.docker.com/_/pythonFROM python:3-alpine# Create and change to the app directory.WORKDIR /app# Copy local code to the container image.COPY . .# Install project dependenciesRUN pip install --no-cache-dir -r requirements.txt# Run the web service on container startup.CMD ["hypercorn", "main:app", "--bind", "::"]
```

--------------------------------

### Railway CLI Local Development Commands

Source: https://docs.railway.com/cli

Commands for running local commands with Railway environment variables, opening a shell, and running services locally with Docker.

```bash
railway run npm start           # Run command with Railway env vars
```

```bash
railway shell                   # Open shell with Railway env vars
```

```bash
railway dev                     # Run services locally with Docker
```

--------------------------------

### Create an HTTP function

Source: https://docs.railway.com/cli/functions

Create a new function that is accessible via an HTTP endpoint.

```bash
railway functions new --path ./api.ts --name api --http
```

--------------------------------

### Add sbt-native-packager Plugin

Source: https://docs.railway.com/guides/play

Add the `sbt-native-packager` plugin to your project by including it in `project/plugins.sbt`.

```scala
addSbtPlugin("com.github.sbt" % "sbt-native-packager" % "x.x.x")
```

--------------------------------

### Link a function

Source: https://docs.railway.com/cli/functions

Manually link a local function directory to a function in your Railway project.

```bash
railway functions link --function my-function --path ./local-function.ts
```

--------------------------------

### Create a service domain

Source: https://docs.railway.com/integrations/api/manage-domains

Generates a new Railway-provided domain for a service.

```APIDOC
## POST /graphql

### Description
Generate a Railway-provided domain.

### Method
POST

### Request Body
- **input** (Object) - Required - Contains serviceId and environmentId.

### Request Example
{
  "query": "mutation serviceDomainCreate($input: ServiceDomainCreateInput!) { serviceDomainCreate(input: $input) { id domain } }",
  "variables": {
    "input": {
      "serviceId": "service-id",
      "environmentId": "environment-id"
    }
  }
}
```

--------------------------------

### Ignore markdown files

Source: https://docs.railway.com/guides/build-configuration

Use this pattern to ignore all markdown files. Negations only work if you include files in a preceding rule. This is useful for excluding certain file types from triggering builds.

```shell
# Ignore all markdown files**!/*.md
```

--------------------------------

### Generate Zsh Completion Script

Source: https://docs.railway.com/cli/completion

Place the generated script in your fpath directory or source it in your .zshrc for Zsh completion.

```zsh
railway completion zsh > "${fpath[1]}/_railway"
```

```zsh
source <(railway completion zsh)
```

--------------------------------

### Making a GraphQL request with JavaScript

Source: https://docs.railway.com/integrations/api/graphql-overview

Uses the fetch API to perform a POST request with an authorization header.

```javascript
const response = await fetch("https://backboard.railway.com/graphql/v2", {  method: "POST",  headers: {    "Authorization": `Bearer ${process.env.RAILWAY_TOKEN}`,    "Content-Type": "application/json",  },  body: JSON.stringify({    query: `query { me { name email } }`,  }),});const { data, errors } = await response.json();
```

--------------------------------

### Update service instance settings

Source: https://docs.railway.com/integrations/api/manage-services

Update build or deployment settings for a service instance in a specific environment.

```GraphQL
mutation serviceInstanceUpdate($serviceId: String!, $environmentId: String!, $input: ServiceInstanceUpdateInput!) {serviceInstanceUpdate(serviceId: $serviceId, environmentId: $environmentId, input: $input)}
```

```JSON
{  "serviceId": "service-id",  "environmentId": "environment-id",  "input": {    "startCommand": "npm run start"  }}
```

--------------------------------

### Dockerfile for Fastify App Deployment

Source: https://docs.railway.com/guides/fastify

This Dockerfile is used to build and deploy a Fastify application on Railway. Ensure the host in your Fastify app's .listen method is set to '::'.

```docker
# Use the Node.js 18 alpine official image# https://hub.docker.com/_/nodeFROM node:18-alpine# Create and change to the app directory.WORKDIR /app# Copy local code to the container image.COPY . .# Install project dependenciesRUN npm ci# Run the web service on container startup.CMD ["npm", "start"]
```

--------------------------------

### Dockerfile for Scala Play App

Source: https://docs.railway.com/guides/play

Use this Dockerfile to build and deploy a Scala Play application on Railway. It utilizes the official sbt Scala image and includes steps to build the application using sbt stage and run the main executable.

```docker
# Use the Scala sbt official image# https://hub.docker.com/r/sbtscala/scala-sbt/tagsFROM sbtscala/scala-sbt:eclipse-temurin-21.0.5_11_1.10.5_3.5.2# Create and change to the app directory.WORKDIR /app# Copy local code to the container image.COPY . ./# Build the app.RUN sbt stage# Run the appCMD ["./target/universal/stage/bin/main"]
```

--------------------------------

### Set Variables

Source: https://docs.railway.com/integrations/api/api-cookbook

Upsert a collection of environment variables.

```graphql
mutation variableCollectionUpsert($input: VariableCollectionUpsertInput!) {    variableCollectionUpsert(input: $input)  }
```

```json
{  "input": {    "projectId": "project-id",    "environmentId": "environment-id",    "serviceId": "service-id",    "variables": {      "KEY1": "value1",      "KEY2": "value2"    }  }}
```

--------------------------------

### Reference a Variable in the Same Service

Source: https://docs.railway.com/variables

Use this syntax to reference variables defined within the same service.

```plaintext
${{ VARIABLE_NAME }}
```

--------------------------------

### Restart specific service

Source: https://docs.railway.com/cli/restart

To restart a specific service, provide its name using the --service flag. This command reuses the existing deployment image and waits for the service to become healthy.

```bash
railway restart --service backend
```

--------------------------------

### Configure datadog.yaml

Source: https://docs.railway.com/guides/set-up-a-datadog-agent

Forces the agent to use HTTP for log transmission instead of the default TCP.

```yaml
logs_config:  force_use_http: true
```

--------------------------------

### Configure restart policy type

Source: https://docs.railway.com/config-as-code/reference

Defines the behavior when a deployment crashes. Supported values include ON_FAILURE, ALWAYS, and NEVER.

```json
{
  "$schema": "https://railway.com/railway.schema.json",
  "deploy": {
    "restartPolicyType": "ALWAYS"
  }
}
```

--------------------------------

### Dynamic Client Registration Endpoint

Source: https://docs.railway.com/integrations/oauth/creating-an-app

This is the endpoint for dynamically registering OAuth clients programmatically. Use a POST request to register new clients.

```http
POST https://backboard.railway.com/oauth/register
```

--------------------------------

### Output results as JSON with --json

Source: https://docs.railway.com/cli/global-options

Format command output as JSON for use in scripts and automation.

```bash
railway status --json
railway variable list --json
railway logs --json
```

--------------------------------

### Deploy a specific path with Railway CLI

Source: https://docs.railway.com/cli/deploying

Specifies a directory to deploy. Use the --path-as-root flag to treat the target directory as the archive root.

```bash
railway up ./backend
```

```bash
railway up ./backend --path-as-root
```

--------------------------------

### Dockerfile for Hono Application

Source: https://docs.railway.com/guides/hono

Standard Dockerfile configuration for building and running a Node.js-based Hono application on Railway.

```dockerfile
FROM node:20-alpineWORKDIR /appCOPY package*.json ./RUN npm installCOPY . ./RUN npm run buildENTRYPOINT ["node", "dist/index.js"]
```

--------------------------------

### Configure deployment overlap seconds

Source: https://docs.railway.com/config-as-code/reference

Sets the duration in seconds that the previous deployment overlaps with the new one during zero-downtime updates.

```json
{
  "$schema": "https://railway.com/railway.schema.json",
  "deploy": {
    "overlapSeconds": "60"
  }
}
```

--------------------------------

### Run railway dev command

Source: https://docs.railway.com/cli/dev

Basic usage of the railway dev command.

```bash
railway dev [COMMAND] [OPTIONS]
```

--------------------------------

### Interactive Linking with railway link

Source: https://docs.railway.com/cli/link

Run this command without arguments to be interactively prompted for workspace, project, and environment selection.

```bash
railway link
```

--------------------------------

### Open Railway Dashboard

Source: https://docs.railway.com/cli/open

Opens the project dashboard in your default browser. This is the default behavior when no options are specified.

```bash
railway open
```

--------------------------------

### Target an environment with --environment

Source: https://docs.railway.com/cli/global-options

Use the environment name or ID to target a specific environment for a command.

```bash
railway logs --environment staging
railway up --environment production
railway variable list -e dev
```

--------------------------------

### Use Environment Variable for Database URL

Source: https://docs.railway.com/guides/express

Replace the hardcoded database URL in routes/index.js with an environment variable (process.env.DATABASE_URL) for dynamic configuration during deployment.

```javascript
...const db = pgp(process.env.DATABASE_URL);...
```

--------------------------------

### Modify the index view

Source: https://docs.railway.com/guides/rails

Updates the index.html.erb file to display a Hello World message.

```erb
<h1>Hello World</h1><p> This is a Rails app running on Railway</p>
```

--------------------------------

### Restore Volume from Backup

Source: https://docs.railway.com/integrations/api/manage-volumes

Restores a volume instance to a previous state using a specific backup. Requires both the backup ID and the volume instance ID.

```GraphQL
mutation volumeInstanceBackupRestore($volumeInstanceBackupId: String!, $volumeInstanceId: String!) {
  volumeInstanceBackupRestore(volumeInstanceBackupId: $volumeInstanceBackupId, volumeInstanceId: $volumeInstanceId)
}
```

```JSON
{
  "volumeInstanceBackupId": "backup-id",
  "volumeInstanceId": "volume-instance-id"
}
```

--------------------------------

### Configure cron schedule

Source: https://docs.railway.com/config-as-code/reference

Sets the cron schedule for the deployed service.

```json
{
  "$schema": "https://railway.com/railway.schema.json",
  "deploy": {
    "cronSchedule": "*/15 * * * *"
  }
}
```

--------------------------------

### Configure Next.js for Standalone Output

Source: https://docs.railway.com/guides/nextjs

Sets the output mode to standalone in the Next.js configuration file for optimized self-hosted deployment.

```typescript
import type { NextConfig } from "next";const nextConfig: NextConfig = {  output: "standalone",};export default nextConfig;
```

--------------------------------

### View logs from time range

Source: https://docs.railway.com/cli/logs

Fetches logs within a specific relative time window.

```bash
railway logs --since 30m --until 10m
```

--------------------------------

### Reference a variable

Source: https://docs.railway.com/variables/reference

Use this syntax to reference variables from shared scopes or other services.

```text
${{NAMESPACE.VAR}}
```

--------------------------------

### Calculate total resource capacity

Source: https://docs.railway.com/guides/static-hosting

Formula to determine the aggregate compute resources available when deploying multiple replicas across regions.

```text
Total resources = number of replicas × maximum compute allocation per replica
```

--------------------------------

### Railway volume command usage

Source: https://docs.railway.com/cli/volume

General syntax for executing volume management commands.

```bash
railway volume <COMMAND> [OPTIONS]
```

--------------------------------

### Reference variables from other services

Source: https://docs.railway.com/integrations/api/manage-variables

Demonstrates how to use variable references in the format `${{ServiceName.VARIABLE_NAME}}` when updating a variable.

```GraphQL
mutation variableUpsert($input: VariableUpsertInput!) {
variableUpsert(input: $input)
}
```

```JSON
{
  "input": {
    "projectId": "project-id",
    "environmentId": "environment-id",
    "serviceId": "service-id",
    "name": "DATABASE_URL",
    "value": "${{Postgres.DATABASE_URL}}"
  }
}
```

--------------------------------

### Configure Phoenix Endpoint for Production

Source: https://docs.railway.com/guides/phoenix-distillery

Updates the config/prod.exs file to configure the Phoenix endpoint for production. This includes settings for static file caching, server, root directory, and versioning.

```elixir
config :helloworld_distillery, HelloworldDistilleryWeb.Endpoint,
  cache_static_manifest: "priv/static/cache_manifest.json",
  server: true,
  root: ".",
  version: Application.spec(:phoenix_distillery, :vsn)
```

--------------------------------

### Railway CLI Environment Management Commands

Source: https://docs.railway.com/cli

Commands for switching between, creating, and deleting environments within your Railway project.

```bash
railway environment             # Switch environment (interactive)
```

```bash
railway environment new staging # Create new environment
```

```bash
railway environment delete dev  # Delete an environment
```

--------------------------------

### Dockerfile for Spring Boot App

Source: https://docs.railway.com/guides/spring-boot

This Dockerfile is used to build and deploy a Spring Boot application on Railway. It sets up the Java environment, copies the application code, builds the project using Maven, and defines the command to run the application.

```docker
# Use the Eclipse temurin alpine official image# https://hub.docker.com/_/eclipse-temurin
FROM eclipse-temurin:21-jdk-alpine
# Create and change to the app directory.
WORKDIR /app
# Copy local code to the container image.
COPY . ./# Build the app.RUN ./mvnw -DoutputFile=target/mvn-dependency-list.log -B -DskipTests clean dependency:list install# Run the app by dynamically finding the JAR file in the target directory
CMD ["sh", "-c", "java -jar target/*.jar"]

```

--------------------------------

### List domains for a service

Source: https://docs.railway.com/integrations/api/manage-domains

Retrieves all domains, including Railway-provided and custom domains, associated with a specific service. Requires project, environment, and service IDs.

```graphql
query domains($projectId: String!, $environmentId: String!, $serviceId: String!) {
domains(
  projectId: $projectId
  environmentId: $environmentId
  serviceId: $serviceId
) {
  serviceDomains {
    id
    domain
    suffix
    targetPort
  }
  customDomains {
    id
    domain
    status {
      dnsRecords {
        hostlabel
        requiredValue
        currentValue
        status
      }
    }
  }
}
}
```

```json
{
  "projectId": "project-id",
  "environmentId": "environment-id",
  "serviceId": "service-id"
}
```

--------------------------------

### Add Volume

Source: https://docs.railway.com/cli/volume

Adds a new persistent storage volume to a project.

```APIDOC
## Add Volume

### Description
Adds a new persistent storage volume to a project. A mount path is required.

### Method
POST

### Endpoint
/v1/volumes

### Query Parameters
- **environment** (string) - Optional - Environment ID where the volume will be created.

### Request Body
- **name** (string) - Optional - Name for the new volume. If not provided, a default name will be generated.
- **mountPath** (string) - Required - The path where the volume will be mounted within the service. Must start with `/`.

### Request Example
```json
{
  "name": "my-new-volume",
  "mountPath": "/app/data"
}
```

### Response
#### Success Response (201)
- **id** (string) - The unique identifier of the newly created volume.
- **name** (string) - The name of the newly created volume.
- **mountPath** (string) - The mount path of the newly created volume.

#### Response Example
```json
{
  "id": "vol-ghijkl789012",
  "name": "my-new-volume",
  "mountPath": "/app/data"
}
```
```

--------------------------------

### Create Feature Branch

Source: https://docs.railway.com/guides/deploy-node-express-api-with-auto-scaling-secrets-and-zero-downtime

Create a new branch for developing a new feature or endpoint.

```bash
git checkout -b feature/new-endpoint
```

--------------------------------

### Deployment Configuration Schema

Source: https://docs.railway.com/config-as-code/reference

Endpoints and configuration fields for managing deployment behavior, healthchecks, and restart policies.

```APIDOC
## Deployment Configuration

### Description
Configure deployment-specific settings including healthchecks, restart policies, and cron schedules.

### Request Body
- **deploy.healthcheckTimeout** (integer) - Optional - Number of seconds to wait for the healthcheck path to become healthy. Can be null.
- **deploy.restartPolicyType** (string) - Optional - How to handle the deployment crashing. Values: ON_FAILURE, ALWAYS, NEVER.
- **deploy.restartPolicyMaxRetries** (integer) - Optional - Max number of retries for the restart policy. Can be null.
- **deploy.cronSchedule** (string) - Optional - Cron schedule of the deployed service. Can be null.
- **deploy.overlapSeconds** (string) - Optional - Time in seconds that the previous deploy will overlap with the newest one. Can be null.
- **deploy.drainingSeconds** (string) - Optional - Time in seconds between SIGTERM and SIGKILL for the previous deployment. Can be null.

### Request Example
{
  "deploy": {
    "healthcheckPath": "/health",
    "healthcheckTimeout": 300,
    "restartPolicyType": "ALWAYS",
    "restartPolicyMaxRetries": 5,
    "cronSchedule": "*/15 * * * *",
    "overlapSeconds": "60",
    "drainingSeconds": "10"
  }
}
```

```APIDOC
## Environment Overrides

### Description
Configuration can be overridden for specific environments or pull request deployments by nesting settings in an environments block.

### Request Body
- **environments.[name]** (object) - Optional - Configuration block for a specific environment name.
- **environments.pr** (object) - Optional - Configuration block specifically for pull request ephemeral environments.

### Request Example
{
  "environments": {
    "staging": {
      "deploy": {
        "startCommand": "npm run staging"
      }
    },
    "pr": {
      "deploy": {
        "startCommand": "npm run pr"
      }
    }
  }
}
```

--------------------------------

### Specify Private Image Path

Source: https://docs.railway.com/builds/private-registries

When referencing a private image, include the full registry domain. For Docker Hub, the domain can be omitted.

```bash
ghcr.io/your-org/your-image:tag
registry.gitlab.com/your-group/your-project:tag
your-dockerhub-username/private-repo:tag
```

```bash
your-username/private-image:latest
```

--------------------------------

### Configure Laravel Logging via Railway CLI

Source: https://docs.railway.com/guides/laravel

Sets the required environment variables to ensure logs are captured by Railway's logging system.

```bash
railway variables --set "LOG_CHANNEL=stderr" --set "LOG_STDERR_FORMATTER=\Monolog\Formatter\JsonFormatter"
```

--------------------------------

### Define Datadog Agent Dockerfile

Source: https://docs.railway.com/guides/set-up-a-datadog-agent

Configuration for the Datadog agent container, including environment variables for logs, APM, and network traffic.

```dockerfile
FROM datadog/agent:7# Set environment variablesENV DD_LOGS_ENABLED=trueENV DD_APM_ENABLED=trueENV DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=trueENV DD_DOGSTATSD_NON_LOCAL_TRAFFIC=trueENV DD_APM_NON_LOCAL_TRAFFIC=trueENV DD_BIND_HOST=::1# Reference Variables defined in RailwayARG DD_API_KEYARG DD_HOSTNAMEARG DD_SITE# Copy datadog.yaml into the containerCOPY datadog.yaml /etc/datadog-agent/datadog.yaml# Copy syslog configuration fileCOPY syslog.yaml /etc/datadog-agent/conf.d/syslog.d/# DogStatsD port, APM port, and the syslog portEXPOSE 8125/udpEXPOSE 8126EXPOSE 514/udp
```

--------------------------------

### Import Environment Variables to Railway

Source: https://docs.railway.com/platform/migrate-from-render

Manually migrate environment variables from Render to Railway by pasting them into the Raw Editor of the Variables section for the relevant service.

```bash
On Render :
  1. Go to the **Environment Variables** page of your service.
  2. Copy all the variables and their values.

On Railway :
  1. Open the **Variables** section for the relevant service.
  2. Switch to the **Raw Editor** and paste the copied environment variables.
  3. Deploy the changes to apply the configuration.
```

--------------------------------

### Filter Environment Logs by Multiple Service Exclusions

Source: https://docs.railway.com/guides/logs

Exclude logs from multiple specific services by combining exclusion filters with AND.

```plaintext
-@service:<postgres_service_id> AND -@service:<redis_service_id>
```

--------------------------------

### Restart a Running Deployment

Source: https://docs.railway.com/integrations/api/manage-deployments

Restart a currently running deployment without triggering a new build. Requires the deployment ID.

```GraphQL
mutation deploymentRestart($id: String!) {
  deploymentRestart(id: $id)
}
```

```JSON
{
  "id": "deployment-id"
}
```

--------------------------------

### Show Bucket Info

Source: https://docs.railway.com/cli/bucket

Retrieves detailed information about a specific bucket, including storage size, object count, and region. Supports JSON output.

```APIDOC
## GET /websites/railway/buckets/{bucketName}/info

### Description
Display bucket instance details including storage size, object count, and region.

### Method
GET

### Endpoint
`/websites/railway/buckets/{bucketName}/info`

### Path Parameters
- **bucketName** (string) - Required - The name or ID of the bucket to retrieve information for.

### Query Parameters
- **--json** (boolean) - Optional - Output in JSON format

### Response
#### Success Response (200)
- **id** (string) - The unique identifier of the bucket.
- **name** (string) - The name of the bucket.
- **environmentId** (string) - The ID of the environment the bucket belongs to.
- **environment** (string) - The name of the environment the bucket belongs to.
- **region** (string) - The region where the bucket is located.
- **storageBytes** (integer) - The total storage used by the bucket in bytes.
- **storage** (string) - A human-readable representation of the storage used.
- **objects** (integer) - The number of objects stored in the bucket.

#### Response Example (JSON)
```json
{
  "id": "bucket-id",
  "name": "my-bucket",
  "environmentId": "environment-id",
  "environment": "production",
  "region": "sjc",
  "storageBytes": 1200000000,
  "storage": "1.2 GB",
  "objects": 3456
}
```
```

--------------------------------

### GitHub Actions: Manage PR Environments

Source: https://docs.railway.com/cli/deploying

Automate the creation and deletion of Railway environments for pull requests using GitHub Actions. This workflow creates a new environment when a PR is opened and deletes it when closed.

```yaml
name: Manage PR environments (Railway)

on:
  pull_request:
    types: [opened, closed]

env:
  RAILWAY_API_TOKEN: ${{ secrets.RAILWAY_API_TOKEN }}
  LINK_PROJECT_ID: "your-project-id"
  DUPLICATE_FROM_ID: "environment-to-duplicate"

jobs:
  pr_opened:
    if: github.event.action == 'opened'
    runs-on: ubuntu-latest
    container: ghcr.io/railwayapp/cli:latest
    steps:
      - name: Link to project
        run: railway link --project ${{ env.LINK_PROJECT_ID }} --environment ${{ env.DUPLICATE_FROM_ID }}
      - name: Create Railway Environment for PR
        run: railway environment new pr-${{ github.event.pull_request.number }} --copy ${{ env.DUPLICATE_FROM_ID }}

  pr_closed:
    if: github.event.action == 'closed'
    runs-on: ubuntu-latest
    container: ghcr.io/railwayapp/cli:latest
    steps:
      - name: Link to project
        run: railway link --project ${{ env.LINK_PROJECT_ID }} --environment ${{ env.DUPLICATE_FROM_ID }}
      - name: Delete Railway Environment for PR
        run: railway environment delete pr-${{ github.event.pull_request.number }} || true
```

--------------------------------

### Combine multiple log filters

Source: https://docs.railway.com/guides/logs

Chain multiple filters to narrow down complex performance or error issues.

```text
@totalDuration:>5000 @httpStatus:>=500
```

```text
@responseTime:>1000 @txBytes:>100000
```

--------------------------------

### Railway CLI Deployment Commands

Source: https://docs.railway.com/cli

Commands for deploying code, redeploying, restarting services, and removing deployments.

```bash
railway up                      # Deploy current directory
```

```bash
railway up --detach             # Deploy without streaming logs
```

```bash
railway deploy --template postgres # Deploy a template
```

```bash
railway redeploy                # Redeploy latest deployment
```

```bash
railway restart                 # Restart a service
```

```bash
railway down                    # Remove latest deployment
```

--------------------------------

### Configure PR environment overrides

Source: https://docs.railway.com/config-as-code/reference

Applies specific configuration to ephemeral environments created for pull requests using the pr environment key.

```json
{
  "$schema": "https://railway.com/railway.schema.json",
  "environments": {
    "pr": {
      "deploy": {
        "startCommand": "npm run pr"
      }
    }
  }
}
```

--------------------------------

### Dynamic Client Registration

Source: https://docs.railway.com/integrations/oauth/creating-an-app

Register OAuth clients programmatically using the dynamic client registration endpoint.

```APIDOC
## POST /oauth/register

### Description
Dynamically registers a new OAuth client application. This is useful for development tools that need to bootstrap OAuth configuration programmatically.

### Method
POST

### Endpoint
https://backboard.railway.com/oauth/register

### Parameters
#### Request Body
- **client_name** (string) - Required - A recognizable name for the OAuth app.
- **redirect_uris** (array of strings) - Required - A list of valid redirect URIs for the application.
- **application_type** (string) - Optional - The type of application ('web' or 'native'). Defaults to 'web' if not specified.

### Response
#### Success Response (201 Created)
- **client_id** (string) - The unique identifier for the registered client.
- **client_secret** (string) - The client secret (only for 'web' applications, displayed once).
- **registration_access_token** (string) - A token used to manage the dynamically registered client.
- **registration_client_uri** (string) - The URI for managing this client.
- **expires_at** (string) - The expiration time of the registration access token.
```

--------------------------------

### Combine filters for slow and large responses

Source: https://docs.railway.com/observability/logs

Combine `@responseTime` and `@txBytes` to identify requests that are both slow and large.

```log-query
@responseTime:>1000 @txBytes:>100000
```

--------------------------------

### Add custom domain

Source: https://docs.railway.com/integrations/api/api-cookbook

Adds a custom domain to a service, returning DNS record requirements.

```GraphQL
mutation customDomainCreate($input: CustomDomainCreateInput!) {    customDomainCreate(input: $input) {      id      status {        dnsRecords {          hostlabel          requiredValue        }      }    }  }
```

```JSON
{  "input": {    "projectId": "project-id",    "environmentId": "environment-id",    "serviceId": "service-id",    "domain": "api.example.com"  }}
```

--------------------------------

### Import into Railway Postgres with pg_restore

Source: https://docs.railway.com/platform/migrate-from-lovable

Use this command to import your exported Supabase data into a Railway Postgres instance. Replace placeholders with your Railway host and database name.

```bash
pg_restore -h <railway-host> -U postgres -d railway -F c backup.dump
```

--------------------------------

### Update a project

Source: https://docs.railway.com/integrations/api/manage-projects

Modify the name or description of an existing project.

```GraphQL
mutation projectUpdate($id: String!, $input: ProjectUpdateInput!) {projectUpdate(id: $id, input: $input) {  id  name  description}}
```

```JSON
{
  "id": "project-id",
  "input": {
    "name": "Updated Project Name"
  }
}
```

--------------------------------

### Manage Railway Functions

Source: https://docs.railway.com/cli

Commands for listing, creating, and pushing updates to Railway functions.

```bash
railway functions list          # List functions
railway functions new           # Create a function
railway functions push          # Push function changes
```

--------------------------------

### Execute API Query with Workspace Token

Source: https://docs.railway.com/integrations/api

Uses a workspace token to authenticate requests scoped to a specific workspace.

```bash
curl --request POST \
  --url https://backboard.railway.com/graphql/v2 \
  --header 'Authorization: Bearer <WORKSPACE_TOKEN_GOES_HERE>' \
  --header 'Content-Type: application/json' \
  --data '{"query":"query { workspace(workspaceId: \"<WORKSPACE_ID_GOES_HERE>\") { name id } }"}'
```

--------------------------------

### Dockerfile for Next.js Standalone Output

Source: https://docs.railway.com/guides/nextjs

This Dockerfile is designed for Next.js applications configured with `output: "standalone"`. It optimizes the build process for production deployment.

```docker
FROM node:lts-alpine AS base# Install dependenciesFROM base AS depsWORKDIR /appCOPY package*.json ./
RUN npm ci# Build the appFROM base AS builderWORKDIR /appCOPY --from=deps /app/node_modules ./node_modulesCOPY . .RUN npm run build# Production imageFROM base AS runnerWORKDIR /appENV NODE_ENV=productionRUN addgroup --system --gid 1001 nodejsRUN adduser --system --uid 1001 nextjsCOPY --from=builder /app/public ./publicCOPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/staticUSER nextjsEXPOSE 3000ENV PORT=3000ENV HOSTNAME="0.0.0.0"CMD ["node", "server.js"]
```

--------------------------------

### Rollback Deployment

Source: https://docs.railway.com/integrations/api/api-cookbook

Revert to a previous deployment state.

```graphql
mutation deploymentRollback($id: String!) {    deploymentRollback(id: $id) {      id    }  }
```

```json
{  "id": "deployment-id"}
```

--------------------------------

### Run Single Command via SSH

Source: https://docs.railway.com/cli/ssh

Executes a single command within the service container and displays its output. Useful for quick checks or specific tasks.

```bash
railway ssh -- ls -la
```

--------------------------------

### Skip confirmation for restart

Source: https://docs.railway.com/cli/restart

Use the --yes flag to skip the confirmation dialog when restarting a service. This command reuses the existing deployment image and waits for the service to become healthy.

```bash
railway restart --yes
```

--------------------------------

### Python FastAPI App with Datadog Integration

Source: https://docs.railway.com/guides/set-up-a-datadog-agent

This Python code configures FastAPI to send logs via SysLog and metrics via StatsD to a Datadog Agent. Ensure environment variables for Datadog agent host, ports, and API key are set.

```python
import logging.handlersfrom fastapi import FastAPIfrom datadog import initialize, statsd, DogStatsdimport loggingimport randomimport osimport json_log_formatter## Configuration for sending logsformatter = json_log_formatter.JSONFormatter()json_handler = logging.handlers.SysLogHandler(address=(os.getenv("DD_AGENT"), os.getenv("DD_AGENT_SYSLOG_PORT")))
json_handler.setFormatter(formatter)
logger = logging.getLogger('python-app')
logger.addHandler(json_handler)
logger.setLevel(logging.INFO)# Configuration for sending metricsconfig = {    "api_key": os.getenv("DD_API_KEY"),    "statsd_host": os.getenv("DD_AGENT_HOST"),    "statsd_port": os.getenv("DD_AGENT_STATSD_PORT"),    "statsd_constant_tags": ["env:prod"],}
initialize(**config)
app = FastAPI()# Use dogstatsd client for more custom metricsdog_statsd = DogStatsd()
@app.get("/")async def root():    # Increment a simple counter    statsd.increment('example_app.page.views')    # Record a random gauge value    gauge_value = random.uniform(1, 100)
    statsd.gauge('example_app.random_value', gauge_value)    # Log a message    logger.info(f"Page viewed, gauge value: {gauge_value}")    # Custom metric using DogStatsd    dog_statsd.histogram('example_app.response_time', random.uniform(50, 300))    return {"message": "Hello World"}# Additional route for testing@app.get("/test")async def test():    # Custom metrics and logging    statsd.increment('example_app.test.endpoint.hits')    test_value = random.randint(1, 10)
    dog_statsd.gauge('example_app.test.value', test_value)
    logger.info(f"Test endpoint hit, value: {test_value}")    return {"test_value": test_value}
```

--------------------------------

### Railway CLI Deployment

Source: https://docs.railway.com/guides/deploy-an-otel-collector-stack

These commands deploy your Express application to Railway using the CLI. 'railway link' connects your local directory to your Railway project and service, and 'railway up -d' deploys the application.

```bash
railway link
```

```bash
railway up -d
```

--------------------------------

### Railway CLI Service Management Commands

Source: https://docs.railway.com/cli

Commands for adding, linking, scaling, and deleting services within your Railway project.

```bash
railway add                     # Add a service (interactive)
```

```bash
railway add --database postgres # Add PostgreSQL
```

```bash
railway add --repo user/repo    # Add from GitHub repo
```

```bash
railway service                 # Link a service
```

```bash
railway scale                   # Scale a service
```

```bash
railway delete                  # Delete a project
```

--------------------------------

### Restore Database to Railway

Source: https://docs.railway.com/platform/migrate-from-fly

Use pg_restore to import the dump file into your Railway database instance.

```bash
pg_restore -U <username> -h <host> -p <port> -W -F t -d <db_name> <dump_file_name>
```

--------------------------------

### Delete a project

Source: https://docs.railway.com/integrations/api/manage-projects

Delete a project. This action is irreversible.

```APIDOC
## Delete a project

### Description
This is a destructive action and cannot be undone.

### Method
DELETE

### Endpoint
/api/projects/{id}

### Path Parameters
- **id** (string) - Required - The ID of the project to delete.

### Request Example
```graphql
mutation projectDelete($id: String!) {
  projectDelete(id: $id)
}
```

### Request Variables
```json
{
  "id": "project-id"
}
```

### Response
#### Success Response (200)
Indicates successful deletion. The response body may be empty or contain a confirmation message.

#### Response Example
```json
{
  "data": {
    "projectDelete": true
  }
}
```
```

--------------------------------

### Restart current service

Source: https://docs.railway.com/cli/restart

Use this command to restart the currently linked service without rebuilding the deployment. The existing image is reused, and the command waits for the service to become healthy.

```bash
railway restart
```

--------------------------------

### Filter Environment Logs by Multiple Service Inclusions

Source: https://docs.railway.com/guides/logs

Show logs only from specified services by using OR to combine inclusion filters.

```plaintext
@service:<postgres_service_id> OR @service:<redis_service_id>
```

--------------------------------

### Configure Site Block for Railway Deployment

Source: https://docs.railway.com/guides/react

Define site-specific configurations for your Railway deployment, including access log format, health check endpoint, static file serving from the 'dist' folder, gzip encoding, and client-side routing fallback to index.html.

```plaintext
site block, listens on the $PORT environment variable, automatically assigned by railway:{$PORT:3000} {
    log {
        format json
    }
    rewrite /health /*
    root * dist
    encode gzip
    file_server
    try_files {path} /index.html
}
```

--------------------------------

### Bind Node/Express to IPv4 and IPv6

Source: https://docs.railway.com/private-networking

Configure an Express server to listen on all interfaces.

```javascript
const port = process.env.PORT || 3000;app.listen(port, "::", () => {  console.log(`Server listening on [::]${port}`);});
```

--------------------------------

### Translate Docker Compose to Railway Services

Source: https://docs.railway.com/guides/docker-compose

This YAML configuration defines services for a web application, a PostgreSQL database, and a Redis cache. It specifies build contexts, ports, environment variables, dependencies, and volumes.

```yaml
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/myapp
      - REDIS_URL=redis://cache:6379
    depends_on:
      - db
      - cache
  db:
    image: postgres:16
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
    volumes:
      - pgdata:/var/lib/postgresql/data
  cache:
    image: redis:7-alpine
volumes:
  pgdata:
```

--------------------------------

### Filter logs by response time (less than)

Source: https://docs.railway.com/observability/logs

Use `@responseTime:<` to find fast responses below a specified millisecond threshold.

```log-query
@responseTime:<100
```

--------------------------------

### Delete a project without confirmation

Source: https://docs.railway.com/cli/delete

Skips the confirmation dialog when deleting a specific project.

```bash
railway delete --project my-old-project --yes
```

--------------------------------

### Redirect to Authorization Endpoint

Source: https://docs.railway.com/integrations/oauth/quickstart

Redirect the user's browser to this URL to initiate the OAuth authorization flow.

```text
https://backboard.railway.com/oauth/auth  ?response_type=code  &client_id=YOUR_CLIENT_ID  &redirect_uri=https://yourapp.com/callback  &scope=openid+email+profile  &state=RANDOM_STATE_VALUE
```

--------------------------------

### Scale specific service

Source: https://docs.railway.com/cli/scale

Targets a specific service by name before applying region scaling.

```bash
railway scale --service backend --us-west1=3
```

--------------------------------

### Run a Python script

Source: https://docs.railway.com/cli/run

Executes a Python script using the environment configuration from Railway.

```bash
railway run python main.py
```

--------------------------------

### Manage Railway Volumes

Source: https://docs.railway.com/cli

Commands for listing, adding, and deleting volumes within a Railway project.

```bash
railway volume list             # List volumes
railway volume add              # Add a volume
railway volume delete           # Delete a volume
```

--------------------------------

### Create a cron function

Source: https://docs.railway.com/cli/functions

Create a new function that runs on a schedule defined by a cron expression.

```bash
railway functions new --path ./job.ts --name cleanup --cron "0 * * * *"
```

--------------------------------

### List Functions

Source: https://docs.railway.com/cli/functions

Lists all functions within the current Railway project.

```APIDOC
## List Functions

### Description
Lists all functions within the current Railway project.

### Method
GET

### Endpoint
/functions

### Parameters
#### Query Parameters
- **environment** (string) - Optional - Environment ID or name to list functions from.

### Response
#### Success Response (200)
- **functions** (array) - A list of function objects.
  - **id** (string) - The unique identifier of the function.
  - **name** (string) - The name of the function.
  - **path** (string) - The path to the function's code.
  - **type** (string) - The type of the function (e.g., 'web', 'worker', 'cron').

### Response Example
```json
{
  "functions": [
    {
      "id": "func-12345",
      "name": "my-api",
      "path": "./api.ts",
      "type": "web"
    }
  ]
}
```
```

--------------------------------

### Configure Ktor Port Programmatically

Source: https://docs.railway.com/guides/ktor

Programmatically configure the Ktor embedded server to use the PORT environment variable, defaulting to 8080 if not set. This is required for Railway deployments.

```kotlin
embeddedServer(Netty, port = System.getenv("PORT")?.toInt() ?: 8080)
```

--------------------------------

### Configure TypeScript

Source: https://docs.railway.com/guides/deploy-node-express-api-with-auto-scaling-secrets-and-zero-downtime

Define the tsconfig.json file for TypeScript compilation settings.

```json
{  "compilerOptions": {    "target": "ES2020",    "module": "commonjs",    "lib": ["ES2020"],    "outDir": "./dist",    "rootDir": "./src",    "strict": true,    "esModuleInterop": true,    "skipLibCheck": true,    "forceConsistentCasingInFileNames": true,    "resolveJsonModule": true  },  "include": ["src/**/*"],  "exclude": ["node_modules", "dist"]}
```

--------------------------------

### Railway CLI Networking Commands

Source: https://docs.railway.com/cli

Commands for generating Railway domains and adding custom domains to your project.

```bash
railway domain                  # Generate Railway domain
```

```bash
railway domain example.com      # Add custom domain
```

--------------------------------

### Skip confirmation prompts with --yes

Source: https://docs.railway.com/cli/global-options

Bypass interactive confirmation prompts, suitable for CI/CD pipelines and automated scripts.

```bash
railway down --yes
railway redeploy -y
railway environment delete staging --yes
```

--------------------------------

### Configure Backend Allowed Origins Variable

Source: https://docs.railway.com/guides/deploying-a-monorepo

Set the ALLOWED_ORIGINS variable in the backend service to point to the frontend's public domain.

```text
ALLOWED_ORIGINS=${{Frontend.RAILWAY_PUBLIC_DOMAIN}}
```

--------------------------------

### Configure Allowed Hosts

Source: https://docs.railway.com/guides/django

Set the ALLOWED_HOSTS setting to allow all hosts for your Django project. This is a broad setting and should be reviewed for production environments.

```python
ALLOWED_HOSTS = ["*"]
```

--------------------------------

### Show or Reset Credentials

Source: https://docs.railway.com/cli/bucket

Retrieves or resets S3-compatible credentials for a specific bucket. This endpoint is documented conceptually but lacks specific HTTP method and path details in the provided text.

```APIDOC
## [Method] /websites/railway/buckets/{bucketName}/credentials

### Description
Show or reset S3-compatible credentials for a bucket.

### Method
[HTTP Method - e.g., GET, POST]

### Endpoint
`/websites/railway/buckets/{bucketName}/credentials`

### Path Parameters
- **bucketName** (string) - Required - The name or ID of the bucket for which to manage credentials.

### Query Parameters
- **--reset** (boolean) - Optional - If set, resets the credentials and returns new ones.

### Response
#### Success Response (200)
- **accessKeyId** (string) - The S3 access key ID.
- **secretAccessKey** (string) - The S3 secret access key.
- **sessionToken** (string) - The S3 session token (if applicable).

#### Response Example
```json
{
  "accessKeyId": "EXAMPLE_ACCESS_KEY_ID",
  "secretAccessKey": "EXAMPLE_SECRET_ACCESS_KEY"
}
```
```

--------------------------------

### Set Build Command in Railway Config

Source: https://docs.railway.com/config-as-code/reference

Specify the command to be executed by the builder. Can be set to `null`.

```json
{
  "$schema": "https://railway.com/railway.schema.json",
  "build": {
    "buildCommand": "yarn run build"
  }
}
```

--------------------------------

### Flush Local DNS Cache on Windows

Source: https://docs.railway.com/networking/troubleshooting/ssl

Execute this command in the Windows command prompt to clear your local DNS cache. This is useful for troubleshooting network-related issues.

```bash
ipconfig /flushdns
```

--------------------------------

### Configure Global Options for Railway

Source: https://docs.railway.com/guides/react

Set global options for your Railway deployment, such as disabling the admin API, persistent configuration, and auto-HTTPS. Configure runtime log format to JSON.

```plaintext
global options{
    admin off
    persist_config off
    auto_https off
    log {
        format json
    }
    servers {
        trusted_proxies static private_ranges 100.0.0.0/8
    }
}
```

--------------------------------

### Configure ASP.NET Core Port with Environment Variable

Source: https://docs.railway.com/guides/aspnet-core

Set the ASPNETCORE_URLS environment variable in your Railway service settings to ensure Kestrel binds to the correct address and port. This is necessary because Kestrel defaults to localhost, which is not accessible on Railway.

```bash
ASPNETCORE_URLS=http://+:${PORT}
```

--------------------------------

### Non-interactive Linking for CI/CD

Source: https://docs.railway.com/cli/link

Use this command in automated environments like CI/CD pipelines by providing all necessary identifiers and the `--json` flag for machine-readable output.

```bash
railway link --project abc123 --environment def456 --json
```

--------------------------------

### Making a GraphQL request with Python

Source: https://docs.railway.com/integrations/api/graphql-overview

Uses the requests library to send a JSON-encoded GraphQL query.

```python
import osimport requestsresponse = requests.post(    "https://backboard.railway.com/graphql/v2",    headers={        "Authorization": f"Bearer {os.environ['RAILWAY_TOKEN']}",        "Content-Type": "application/json",    },    json={        "query": "query { me { name email } }",    },)data = response.json()
```

--------------------------------

### Default S3 Credentials Output

Source: https://docs.railway.com/cli/bucket

This is the default output format for S3-compatible credentials, providing environment variables for direct use with tools like `eval` or `.env` files.

```plaintext
AWS_ENDPOINT_URL=https://storage.railway.app
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_S3_BUCKET_NAME=my-bucket-abc123
AWS_DEFAULT_REGION=auto
AWS_S3_URL_STYLE=virtual
```

--------------------------------

### Set Zipkin PORT environment variable

Source: https://docs.railway.com/guides/deploy-an-otel-collector-stack

Set the PORT environment variable for the Zipkin service to access its UI.

```shell
PORT=9411
```

--------------------------------

### Attach Volume

Source: https://docs.railway.com/cli/volume

Attaches a persistent storage volume to a service.

```APIDOC
## Attach Volume

### Description
Attaches a persistent storage volume to a service. Confirmation may be required.

### Method
POST

### Endpoint
/v1/volumes/{volumeId}/attach

### Path Parameters
- **volumeId** (string) - Required - The ID or name of the volume to attach.

### Query Parameters
- **service** (string) - Required - The ID of the service to attach the volume to.
- **yes** (boolean) - Optional - Skip confirmation prompt.
- **environment** (string) - Optional - Environment ID.
- **json** (boolean) - Optional - Output in JSON format.

### Response
#### Success Response (204)
No content is returned upon successful attachment.
```

--------------------------------

### Reference Another Service's Variable

Source: https://docs.railway.com/variables

Use this syntax to reference variables defined in another service within the same project.

```plaintext
${{SERVICE_NAME.VAR}}
```

--------------------------------

### Railway environment command usage

Source: https://docs.railway.com/cli/environment

General syntax for the environment command.

```bash
railway environment [ENVIRONMENT] [COMMAND]
```

--------------------------------

### Restart the latest deployment

Source: https://docs.railway.com/cli/service

Restart the most recent deployment of a service. The -y flag can be used to bypass the confirmation prompt.

```bash
railway service restart
```

--------------------------------

### Match TypeScript files

Source: https://docs.railway.com/guides/build-configuration

Use this pattern to match all TypeScript files under the src directory. This is useful for monorepos to trigger builds only when backend code changes.

```shell
# Match all TypeScript files under src//src/**/*.ts
```

--------------------------------

### Embed 'Deploy on Railway' Button in Markdown

Source: https://docs.railway.com/templates/publish-and-share

Use this Markdown code to add a 'Deploy on Railway' button to your README files. Replace the template code and optionally customize the UTM campaign parameter.

```markdown
[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/ZweBXA?utm_medium=integration&utm_source=button&utm_campaign=generic)
```

--------------------------------

### Run Laravel Queue Worker

Source: https://docs.railway.com/guides/laravel

Script to execute the Laravel queue worker process for background job handling.

```bash
#!/bin/bash# Make sure this file has executable permissions, run `chmod +x railway/run-worker.sh`# This command runs the queue worker.# An alternative is to use the php artisan queue:listen commandphp artisan queue:work
```

--------------------------------

### Configure NestJS to Listen on Correct Host and Port

Source: https://docs.railway.com/networking/troubleshooting/application-failed-to-respond

Ensure the NestJS bootstrap function uses the PORT environment variable and binds to 0.0.0.0.

```typescript
// Use `PORT` provided in environment or default to 3000const port = process.env.PORT || 3000;// Listen on `port` and 0.0.0.0async function bootstrap() {  // ...  await app.listen(port, "0.0.0.0");}
```

--------------------------------

### Workspace Response Format

Source: https://docs.railway.com/integrations/oauth/fetching-workspaces-or-projects

JSON response structure for a workspace query.

```json
{  "data": {    "me": {      "workspaces": [        {          "id": "...",          "name": "My Workspace"        },        {          "id": "...",          "name": "ACME Inc."        }      ]    }  }}
```

--------------------------------

### Configure deployment draining seconds

Source: https://docs.railway.com/config-as-code/reference

Defines the time in seconds between sending a SIGTERM and a SIGKILL to the previous deployment.

```json
{
  "$schema": "https://railway.com/railway.schema.json",
  "deploy": {
    "drainingSeconds": "10"
  }
}
```

--------------------------------

### Delete an environment

Source: https://docs.railway.com/integrations/api/manage-environments

Remove an environment and all associated deployments permanently.

```GraphQL
mutation environmentDelete($id: String!) {environmentDelete(id: $id)}
```

```JSON
{  "id": "environment-id"}
```

--------------------------------

### Configure Webhook URL

Source: https://docs.railway.com/guides/n8n

Sets the full public URL for webhooks. This must be updated after generating a domain for your service to ensure external services can reach your n8n instance.

```bash
WEBHOOK_URL=https://your-service.railway.app
```

--------------------------------

### Update a project

Source: https://docs.railway.com/integrations/api/manage-projects

Update the name or description of an existing project.

```APIDOC
## Update a project

### Description
Update project name or description.

### Method
PUT

### Endpoint
/api/projects/{id}

### Path Parameters
- **id** (string) - Required - The ID of the project to update.

### Request Body
- **input** (object) - Required - Input object for updating a project.
  - **name** (string) - Optional - The new name for the project.
  - **description** (string) - Optional - The new description for the project.

### Request Example
```graphql
mutation projectUpdate($id: String!, $input: ProjectUpdateInput!) {
  projectUpdate(id: $id, input: $input) {
    id
    name
    description
  }
}
```

### Request Variables
```json
{
  "id": "project-id",
  "input": {
    "name": "Updated Project Name"
  }
}
```

### Response
#### Success Response (200)
- **id** (string) - The unique identifier for the updated project.
- **name** (string) - The updated name of the project.
- **description** (string) - The updated description of the project.

#### Response Example
```json
{
  "data": {
    "projectUpdate": {
      "id": "project-id",
      "name": "Updated Project Name",
      "description": "This is the updated description."
    }
  }
}
```
```

--------------------------------

### Configure Hot-shots for IPv6

Source: https://docs.railway.com/networking/private-networking/library-configuration

Configure the StatsD client to use udp6 and enable IPv6-specific socket options.

```javascript
const StatsD = require("hot-shots");const statsdClient = new StatsD({  host: process.env.AGENT_HOST,  port: process.env.AGENT_PORT,  protocol: "udp",  cacheDns: true,  udpSocketOptions: {    type: "udp6",    reuseAddr: true,    ipv6Only: true,  },});
```

--------------------------------

### Login to Railway CLI

Source: https://docs.railway.com/cli/login

Opens your default browser to authenticate your CLI session. This is the default login method.

```bash
railway login
```

--------------------------------

### Clean up services

Source: https://docs.railway.com/cli/dev

Stops services and removes associated volumes and data.

```bash
railway dev clean
```

--------------------------------

### Open Interactive Shell

Source: https://docs.railway.com/cli/ssh

Opens a bash shell in the service container for interactive debugging or command execution.

```bash
railway ssh
```

--------------------------------

### Check for CAA Records

Source: https://docs.railway.com/networking/troubleshooting/ssl

Use the `dig` command to query for CAA (Certificate Authority Authorization) records for your domain. This helps determine which certificate authorities are permitted to issue certificates.

```bash
dig CAA yourdomain.com
```

--------------------------------

### Create Function

Source: https://docs.railway.com/cli/functions

Adds a new serverless function to your Railway project.

```APIDOC
## Create Function

### Description
Adds a new serverless function to your Railway project. You can specify the path to the function file, a name, and configure it as an HTTP function or a cron job.

### Method
POST

### Endpoint
/functions

### Parameters
#### Query Parameters
- **environment** (string) - Optional - Environment ID or name to create the function in.

#### Request Body
- **path** (string) - Required - Path to the function file.
- **name** (string) - Required - Name of the function.
- **cron** (string) - Optional - Cron schedule for the function (if type is 'cron').
- **http** (boolean) - Optional - Set to true to enable HTTP access for the function.
- **serverless** (boolean) - Optional - Enable serverless mode (sleeping).
- **watch** (boolean) - Optional - Watch for changes and deploy on save.

### Request Example
```json
{
  "path": "./my-function.ts",
  "name": "my-function",
  "http": true
}
```

### Response
#### Success Response (201)
- **id** (string) - The unique identifier of the newly created function.
- **name** (string) - The name of the function.
- **path** (string) - The path to the function's code.
- **type** (string) - The type of the function.

#### Response Example
```json
{
  "id": "func-67890",
  "name": "my-function",
  "path": "./my-function.ts",
  "type": "web"
}
```
```

--------------------------------

### Unlink service only

Source: https://docs.railway.com/cli/unlink

Keeps the project and environment link but removes the service association. Use this if you only want to detach a specific service from your local directory while retaining the project connection.

```bash
railway unlink --service
```

--------------------------------

### Configure Caddyfile for Reverse Proxy

Source: https://docs.railway.com/guides/caddy

Set up Caddy as a reverse proxy to forward traffic to another service within your Railway project. Disable auto_https when using hostnames to prevent certificate conflicts with Railway's TLS termination.

```caddyfile
{ 
  # Global options 
  # If you use hostnames or IP addresses as site addresses in the Caddyfile, 
  # be sure to disable auto-HTTPS since Railway does that for you: 
  auto_https off
}:8080 reverse_proxy my-app.railway.internal:3000
```

--------------------------------

### Configure Rocket to Accept Non-Local Connections

Source: https://docs.railway.com/guides/rocket

Set the ROCKET_ADDRESS environment variable to '0.0.0.0' to allow your Rocket application to accept external connections. This is necessary for deployments on platforms like Railway.

```bash
railway variables --set "ROCKET_ADDRESS=0.0.0.0"
```

--------------------------------

### Reference a Shared Variable

Source: https://docs.railway.com/variables

Use this syntax to reference a shared variable within your project.

```plaintext
${{ shared.VARIABLE_KEY }}
```

--------------------------------

### Dockerfile using Official Playwright Image

Source: https://docs.railway.com/guides/playwright

Use this Dockerfile to leverage the official Playwright image, which includes all supported browsers and system dependencies.

```docker
FROM mcr.microsoft.com/playwright:v1.52.0-noble
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . ./
# Include this line if your project has a build step
RUN npm run build
ENTRYPOINT ["node", "index.js"]
```

--------------------------------

### Specify Builder in Railway Config

Source: https://docs.railway.com/config-as-code/reference

Use this to set the build system for your deployment. Defaults to `RAILPACK` unless a Dockerfile is present.

```json
{
  "$schema": "https://railway.com/railway.schema.json",
  "build": {
    "builder": "RAILPACK"
  }
}
```

--------------------------------

### Filter logs by path and multiple HTTP statuses

Source: https://docs.railway.com/observability/logs

Use `OR` within parentheses to filter logs for a specific path and multiple HTTP status codes.

```log-query
@path:/api/v1/users AND (@httpStatus:500 OR @httpStatus:501)
```

--------------------------------

### Create run-cron.sh for Symfony Cron Service

Source: https://docs.railway.com/guides/symfony

This script runs the CronBundle scheduler every minute. Ensure the file has executable permissions using chmod +x run-cron.sh.

```bash
#!/bin/bash# Make sure this file has executable permissions, run `chmod +x run-cron.sh`# This block of code runs the scheduler every minutewhile [ true ]    do        echo "Running the scheduler..."        php bin/console cron:start [--blocking] --no-interaction &        sleep 60    done
```

--------------------------------

### Configure Socket Connection

Source: https://docs.railway.com/guides/sails

Add this function to the `socket` object in `config/env/production.js` to reject socket connection attempts. This is useful if sockets are not needed for your application.

```javascript
beforeConnect: function(handshake, proceed) {  // Send back `true` to allow the socket to connect.  // (Or send back `false` to reject the attempt.)  return proceed(undefined, false);},
```

--------------------------------

### Update Index View with Database Time

Source: https://docs.railway.com/guides/express

Update the index.pug view file to display the time retrieved from the database.

```pug
extends layout
block content
  h1= title
  p Welcome to #{title}
  p This is the time retrieved from the database:
  p #{timeFromDB}
```

--------------------------------

### Railway domain command usage

Source: https://docs.railway.com/cli/domain

General syntax for the railway domain command.

```bash
railway domain [DOMAIN] [OPTIONS]
```

--------------------------------

### Upgrade Railway CLI

Source: https://docs.railway.com/cli/upgrade

Executes the automatic upgrade process for the Railway CLI.

```bash
railway upgrade [OPTIONS]
```

```bash
railway upgrade
```

--------------------------------

### Push changes to a function

Source: https://docs.railway.com/cli/functions

Deploy local changes to a function in your Railway project.

```bash
railway functions push
```

--------------------------------

### Deploying Public Docker Images on Railway

Source: https://docs.railway.com/guides/services

Specify the image path when prompted during service creation. Railway supports images from Docker Hub, GitHub Container Registry, Quay.io, and GitLab Container Registry.

```text
bitnami/redis
```

```text
ghcr.io/railwayapp-templates/postgres-ssl:latest
```

```text
registry.gitlab.com/gitlab-cicd15/django-project
```

```text
mcr.microsoft.com/dotnet/aspire-dashboard
```

```text
quay.io/username/repo:tag
```

--------------------------------

### Token Exchange with PKCE

Source: https://docs.railway.com/integrations/oauth/creating-an-app

Exchange an authorization code for access tokens, including the code verifier for PKCE.

```APIDOC
## POST /oauth/token

### Description
Exchanges an authorization code for access tokens. This endpoint is used in the OAuth code grant flow, particularly when PKCE is enabled.

### Method
POST

### Endpoint
https://backboard.railway.com/oauth/token

### Parameters
#### Request Body
- **grant_type** (string) - Required - Must be 'authorization_code'.
- **code** (string) - Required - The authorization code received from the authorization server.
- **redirect_uri** (string) - Required - The redirect URI used in the initial authorization request. Must match a registered URI.
- **code_verifier** (string) - Required - The original, un-transformed code verifier used for PKCE.

### Request Example
```json
{
  "grant_type": "authorization_code",
  "code": "AUTHORIZATION_CODE",
  "redirect_uri": "https://yourapp.com/callback",
  "code_verifier": "CODE_VERIFIER"
}
```

### Headers
- **Authorization** (string) - Required - Basic authentication header with client ID and client secret (e.g., `Basic YOUR_CLIENT_ID:YOUR_CLIENT_SECRET`).
```

--------------------------------

### Export and Import PostgreSQL Data

Source: https://docs.railway.com/platform/migrate-from-render

Export your PostgreSQL database from Render using pg_dump and import it into Railway using psql. Update the DATABASE_URL in your Railway app to point to the new database.

```bash
1. Export your database from Render using tools like `pg_dump`.
2. Import the data into Railway using `psql`.
```

--------------------------------

### Show or Reset S3 Credentials

Source: https://docs.railway.com/cli/bucket

Display S3-compatible credentials for a selected bucket. Credentials can be reset to invalidate existing ones and generate new ones. Supports various output formats and confirmation skipping.

```APIDOC
## Show or Reset S3 Credentials

### Description
Display S3-compatible credentials for the selected bucket. The default output uses `AWS_*=value` lines suitable for `eval` or piping into `.env` files. Pass `--reset` to invalidate existing credentials and generate new ones.

### Method
`railway bucket credentials`

### Endpoint
N/A (CLI Command)

### Parameters
#### Query Parameters
- **`--reset`** (boolean) - Optional - Reset S3 credentials (invalidates existing credentials).
- **`-y, --yes`** (boolean) - Optional - Skip confirmation when resetting (requires `--reset`).
- **`--2fa-code <CODE>`** (string) - Optional - 2FA code for verification when resetting (requires `--reset`).
- **`--json`** (boolean) - Optional - Output in JSON format.

### Request Example
```bash
railway bucket credentials
railway bucket credentials --reset --yes
```

### Response
#### Success Response (Default Output)
- **`AWS_ENDPOINT_URL`** (string) - The S3 endpoint URL.
- **`AWS_ACCESS_KEY_ID`** (string) - The access key ID.
- **`AWS_SECRET_ACCESS_KEY`** (string) - The secret access key.
- **`AWS_S3_BUCKET_NAME`** (string) - The name of the S3 bucket.
- **`AWS_DEFAULT_REGION`** (string) - The default region.
- **`AWS_S3_URL_STYLE`** (string) - The S3 URL style.

#### Success Response (With `--reset` and no `--json`)
- Confirmation message indicating credentials have been reset.

#### Success Response (With `--json`)
- **`endpoint`** (string) - The S3 endpoint URL.
- **`accessKeyId`** (string) - The access key ID.
- **`secretAccessKey`** (string) - The secret access key.
- **`bucketName`** (string) - The name of the S3 bucket.
- **`region`** (string) - The region.
- **`urlStyle`** (string) - The URL style.

### Response Example
```plaintext
AWS_ENDPOINT_URL=https://storage.railway.app
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_S3_BUCKET_NAME=my-bucket-abc123
AWS_DEFAULT_REGION=auto
AWS_S3_URL_STYLE=virtual
```

```plaintext
Credentials reset for my-bucket
```

```json
{
  "endpoint": "https://storage.railway.app",
  "accessKeyId": "your-access-key",
  "secretAccessKey": "your-secret-key",
  "bucketName": "my-bucket-abc123",
  "region": "auto",
  "urlStyle": "virtual"
}
```
```

--------------------------------

### Check custom domain availability

Source: https://docs.railway.com/integrations/api/manage-domains

Verifies if a custom domain is available to be added to your Railway project. Requires the domain name.

```graphql
query customDomainAvailable($domain: String!) {
  customDomainAvailable(domain: $domain) {
    available
    message
  }
}
```

```json
{
  "domain": "api.example.com"
}
```

--------------------------------

### Verify Tailscale Routing

Source: https://docs.railway.com/guides/bridge-railway-to-rds-with-tailscale

Executes the verification script to ensure proper routing to the RDS endpoint.

```bash
./verify_tailscale_routing.sh <rds_endpoint> postgres <password> rds-tailscale
```

--------------------------------

### Proxy assets through a backend

Source: https://docs.railway.com/guides/storage-buckets-guide

Streams private bucket objects to the client via a backend route, allowing for access control and caching.

```javascript
app.get('/assets/:key', async (req, res) => {  const command = new GetObjectCommand({    Bucket: process.env.BUCKET_NAME,    Key: req.params.key,  });  const object = await s3.send(command);  res.set('Content-Type', object.ContentType);  res.set('Cache-Control', 'public, max-age=86400');  object.Body.pipe(res);});
```

--------------------------------

### Retrieve Authenticated User Profile

Source: https://docs.railway.com/integrations/oauth/quickstart

Fetch the profile information of the authenticated user using the access token.

```bash
curl https://backboard.railway.com/oauth/me \  -H "Authorization: Bearer ACCESS_TOKEN"
```

```json
{  "sub": "user_abc123",  "email": "user@example.com",  "name": "Jane Developer",  "picture": "https://avatars.githubusercontent.com/u/12345"}
```

--------------------------------

### railway dev configure - Configure code services

Source: https://docs.railway.com/cli/dev

Interactively configure how your code services run locally, including command, directory, and port.

```APIDOC
## POST /websites/railway/dev/configure

### Description
Interactively configure how your code services run locally, including command, directory, and port.

### Method
POST

### Endpoint
/websites/railway/dev/configure

### Query Parameters
- **--service** (string) - Optional - Specific service to configure (by name)
- **--remove** (string) - Optional - Remove configuration for a service (optionally specify service name)
```

--------------------------------

### Native App Token Exchange

Source: https://docs.railway.com/integrations/oauth/troubleshooting

Use this command for native applications to exchange an authorization code for tokens. Do not include a client secret; instead, provide the PKCE code verifier.

```curl
curl -X POST https://backboard.railway.com/oauth/token \
  -d "grant_type=authorization_code" \
  -d "code=AUTH_CODE" \
  -d "redirect_uri=EXACT_REDIRECT_URI" \
  -d "client_id=YOUR_CLIENT_ID" \
  -d "code_verifier=YOUR_CODE_VERIFIER"
```

--------------------------------

### Redeploy a Service

Source: https://docs.railway.com/integrations/api/manage-services

Redeploy the latest deployment for a service instance.

```APIDOC
## POST /api/services/{serviceId}/environments/{environmentId}/redeploy

### Description
Triggers a redeployment of the most recent successful deployment for a service instance.

### Method
POST

### Endpoint
`/api/services/{serviceId}/environments/{environmentId}/redeploy`

### Parameters
#### Path Parameters
- **serviceId** (string) - Required - The ID of the service.
- **environmentId** (string) - Required - The ID of the environment.

### Response
#### Success Response (200)
This endpoint does not return a response body upon successful redeployment.
```

--------------------------------

### Make Public API Requests

Source: https://docs.railway.com/integrations/oauth/quickstart

Execute GraphQL queries against the Railway Public API using the access token.

```bash
curl https://backboard.railway.com/graphql/v2 \  -H "Authorization: Bearer ACCESS_TOKEN" \  -H "Content-Type: application/json" \  -d '{"query": "query { me { name email } }"}'
```

```json
{  "data": {    "me": {      "name": "Jane",      "email": "jane.doe@example.tld"    }  }}
```

--------------------------------

### Run Laravel Scheduler

Source: https://docs.railway.com/guides/laravel

Script to run the Laravel scheduler every minute within a dedicated cron service.

```bash
#!/bin/bash# Make sure this file has executable permissions, run `chmod +x railway/run-cron.sh`# This block of code runs the Laravel scheduler every minutewhile [ true ]    do        echo "Running the scheduler..."        php artisan schedule:run --verbose --no-interaction &        sleep 60    done
```

--------------------------------

### Add :sasl to extra_applications in mix.exs

Source: https://docs.railway.com/guides/phoenix-distillery

Include :sasl in the extra_applications list within the application function of your mix.exs file to resolve the 'Invalid application :sasl' error.

```elixir
def application do    [      mod: {HelloworldDistillery.Application, []},      extra_applications: [:logger, :runtime_tools, :sasl]    ]  end
```

--------------------------------

### Test Railway service with curl

Source: https://docs.railway.com/networking/troubleshooting/405-method-not-allowed

Use this command to verify your application endpoint using HTTPS to avoid method conversion issues.

```bash
curl -X POST https://your-app.railway.app/api
```

--------------------------------

### Call an internal service using a private domain

Source: https://docs.railway.com/networking/domains/working-with-domains

Use the internal hostname and port to communicate between services. Ensure the protocol is set to http.

```javascript
// Example: Frontend service calling an API serviceapp.get("/fetch-data", async (req, res) => {  axios.get("http://api.railway.internal:3000/data").then(response => {    res.json(response.data);  });});
```

--------------------------------

### Starship Prompt JSON Output

Source: https://docs.railway.com/cli/starship

This JSON output contains linked project information, including project ID, project name, environment ID, and environment name. It is generated by the 'railway starship' command.

```json
{
  "project": "project-id",
  "name": "my-project",
  "environment": "environment-id",
  "environmentName": "production"
}
```

--------------------------------

### Query Workspaces

Source: https://docs.railway.com/integrations/oauth/fetching-workspaces-or-projects

GraphQL query to retrieve the ID and name of workspaces granted by the user.

```graphql
query {  me {    workspaces {      id      name    }  }}
```

--------------------------------

### Generate PowerShell Completion Script

Source: https://docs.railway.com/cli/completion

Append the completion script to your PowerShell profile for automatic loading.

```powershell
railway completion powershell >> $PROFILE
```

--------------------------------

### Add Railway Hosts to Allowed Hosts in application.conf

Source: https://docs.railway.com/guides/play

Update the `play.filters.hosts.allowed` setting in `application.conf` to include Railway's domain `".up.railway.app"`. Remember to update this if you add a custom domain.

```scala
play.filters.hosts.allowed=[ ".up.railway.app" ]
```

--------------------------------

### railway add

Source: https://docs.railway.com/cli/add

Add a new service to your Railway project. This command allows you to add various types of services, including databases, GitHub repositories, Docker images, or empty services. It can also be used to set environment variables for the new service.

```APIDOC
## POST /api/services

### Description
Adds a new service to the specified Railway project. This can be a database, a service from a GitHub repository, a Docker image, or an empty service. Environment variables can also be configured during the addition process.

### Method
POST

### Endpoint
`/api/services`

### Parameters
#### Query Parameters
- **database** (string) - Optional - Specifies the type of database to add (e.g., postgres, mysql, redis, mongo).
- **service** (string) - Optional - Creates an empty service, optionally with a specified name.
- **repo** (string) - Optional - Specifies a GitHub repository to create a service from (e.g., user/my-repo).
- **image** (string) - Optional - Specifies a Docker image to create a service from (e.g., nginx:latest).
- **variables** (string) - Optional - Sets environment variables for the service in the format KEY=VALUE. Can be specified multiple times.
- **verbose** (boolean) - Optional - Enables verbose logging.
- **json** (boolean) - Optional - Outputs the result in JSON format.

### Request Example
```json
{
  "command": "railway add --service api --variables \"PORT=3000\" --variables \"NODE_ENV=production\""
}
```

### Response
#### Success Response (200)
- **serviceId** (string) - The ID of the newly created service.
- **status** (string) - The status of the service creation.

#### Response Example
```json
{
  "serviceId": "srv_abcdef1234567890",
  "status": "created"
}
```
```

--------------------------------

### Update Volume Instance

Source: https://docs.railway.com/integrations/api/manage-volumes

Update the mount path for a volume instance.

```APIDOC
## Update Volume Instance

### Description
Update the mount path for a volume instance.

### Method
PUT (or GraphQL mutation)

### Endpoint
`/api/volume-instances/{volumeId}` (Conceptual REST endpoint)

### Parameters
#### Path Parameters
- **volumeId** (string) - Required - The ID of the volume instance to update.

#### Request Body
- **mountPath** (string) - Required - The new mount path for the volume instance.

### Request Example
```graphql
mutation volumeInstanceUpdate($volumeId: String!, $input: VolumeInstanceUpdateInput!) {
  volumeInstanceUpdate(volumeId: $volumeId, input: $input)
}
```

Variables
```json
{
  "volumeId": "volume-id",
  "input": {
    "mountPath": "/new/path"
  }
}
```

### Response
#### Success Response (200)
(No specific fields returned in the example, typically indicates success)

#### Response Example
```json
{
  "data": {
    "volumeInstanceUpdate": null
  }
}
```
```

--------------------------------

### Filter logs by response size (greater than)

Source: https://docs.railway.com/observability/logs

Use `@txBytes:>` to find large responses exceeding a specified byte threshold (1MB).

```log-query
@txBytes:>1000000
```

--------------------------------

### Authorization Redirect with request_uri

Source: https://docs.railway.com/integrations/oauth/login-and-tokens

Construct the authorization redirect URL using the client ID and the request_uri obtained from the PAR endpoint.

```url
https://backboard.railway.com/oauth/auth
?client_id=YOUR_CLIENT_ID
&request_uri=urn:ietf:params:oauth:request_uri:abc123
```

--------------------------------

### Update AppService response

Source: https://docs.railway.com/guides/nest

Modifies the service to return a custom welcome message.

```typescript
import { Injectable } from "@nestjs/common";@Injectable()export class AppService {  getHello(): string {    return "Hello World, Welcome to Railway!";  }}
```

--------------------------------

### Accessing Services via Internal DNS

Source: https://docs.railway.com/guides/private-networking

Reference other services within your Railway project using their internal DNS name followed by `.railway.internal`. Ensure the service name and port are correctly specified.

```plaintext
http://api.railway.internal:PORT
```

--------------------------------

### Fetch variables for a service

Source: https://docs.railway.com/integrations/api/manage-variables

Use this query to retrieve environment variables for a specific service. Omit `serviceId` to fetch shared variables for the environment.

```GraphQL
query variables($projectId: String!, $environmentId: String!, $serviceId: String) {
variables(
  projectId: $projectId
  environmentId: $environmentId
  serviceId: $serviceId
)
}
```

```JSON
{
  "projectId": "project-id",
  "environmentId": "environment-id",
  "serviceId": "service-id"
}
```

```JSON
{
  "data": {
    "variables": {
      "DATABASE_URL": "postgres://...",
      "NODE_ENV": "production",
      "PORT": "3000"
    }
  }
}
```

--------------------------------

### Set environment overrides

Source: https://docs.railway.com/config-as-code/reference

Overrides configuration for specific environments by nesting settings within an environments block.

```json
{
  "$schema": "https://railway.com/railway.schema.json",
  "environments": {
    "staging": {
      "deploy": {
        "startCommand": "npm run staging"
      }
    }
  }
}
```

--------------------------------

### Run Railway Starship Command

Source: https://docs.railway.com/cli/starship

Execute this command in your terminal to output Railway project metadata for Starship prompt integration. This command is used to display Railway project information in your terminal prompt.

```bash
railway starship
```

--------------------------------

### Redeploy a service

Source: https://docs.railway.com/integrations/api/manage-services

Redeploy the most recent deployment for a service instance.

```GraphQL
mutation serviceInstanceRedeploy($serviceId: String!, $environmentId: String!) {serviceInstanceRedeploy(serviceId: $serviceId, environmentId: $environmentId)}
```

```JSON
{  "serviceId": "service-id",  "environmentId": "environment-id"}
```

--------------------------------

### Railway CLI Variable Management Commands

Source: https://docs.railway.com/cli

Commands for listing, setting, and deleting environment variables for your Railway project.

```bash
railway variable list           # List variables
```

```bash
railway variable set KEY=value  # Set a variable
```

```bash
railway variable delete KEY     # Delete a variable
```

--------------------------------

### Add Rocket as a dependency

Source: https://docs.railway.com/guides/rocket

Add the Rocket framework to your Rust project's dependencies. This will update your Cargo.toml file.

```bash
cargo add rocket
```

--------------------------------

### Delete an environment

Source: https://docs.railway.com/cli/environment

Remove an existing environment.

```bash
railway environment delete staging
```

--------------------------------

### Export Replit Database to JSON

Source: https://docs.railway.com/platform/migrate-from-replit

Python script to export all keys and values from Replit Database to a local JSON file.

```python
from replit import db
import json
data = dict(db)
with open("replit_db_export.json", "w") as f:
    json.dump(data, f)
```

--------------------------------

### Delete a project

Source: https://docs.railway.com/integrations/api/manage-projects

Permanently remove a project. This action cannot be undone.

```GraphQL
mutation projectDelete($id: String!) {projectDelete(id: $id)}
```

```JSON
{
  "id": "project-id"
}
```

--------------------------------

### Skip confirmation

Source: https://docs.railway.com/cli/redeploy

Executes the redeploy command without prompting for confirmation.

```bash
railway redeploy --yes
```

--------------------------------

### Updated package.json scripts for production

Source: https://docs.railway.com/guides/angular

Modified scripts section to ensure Railway uses the production server command for deployment.

```json
..."scripts": {    "ng": "ng",    "dev": "ng serve",    "build": "ng build",    "watch": "ng build --watch --configuration development",    "test": "ng test",    "start": "node dist/gratitudeapp/server/server.mjs"  },...
```

--------------------------------

### Define Railway Configuration

Source: https://docs.railway.com/config-as-code

Equivalent configuration definitions using TOML and JSON formats.

```toml
[build]
builder = "railpack"
buildCommand = "echo building!"

[deploy]
preDeployCommand = ["npm run db:migrate"]
startCommand = "echo starting!"
healthcheckPath = "/"
healthcheckTimeout = 100
restartPolicyType = "never"
```

```json
{
    "$schema": "https://railway.com/railway.schema.json",
    "build": {
      "builder": "RAILPACK",
      "buildCommand": "echo building!"
    },
    "deploy": {
      "preDeployCommand": ["npm run db:migrate"],
      "startCommand": "echo starting!",
      "healthcheckPath": "/",
      "healthcheckTimeout": 100,
      "restartPolicyType": "never"
    }
}
```

--------------------------------

### Default Bucket Rename Output

Source: https://docs.railway.com/cli/bucket

The default output after successfully renaming a bucket shows the old and new names.

```plaintext
Renamed my-bucket -> new-name
```

--------------------------------

### Trigger a Redeploy of a Deployment

Source: https://docs.railway.com/integrations/api/manage-deployments

Initiate a redeploy for an existing deployment using its ID. Returns the updated deployment status.

```GraphQL
mutation deploymentRedeploy($id: String!) {
  deploymentRedeploy(id: $id) {
    id
    status
  }
}
```

```JSON
{
  "id": "deployment-id"
}
```

--------------------------------

### Filter logs for successful responses (1xx, 2xx, 3xx)

Source: https://docs.railway.com/observability/logs

Use `@httpStatus:<400` to filter for informational, successful, and redirection responses.

```log-query
@httpStatus:<400
```