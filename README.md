# ACME Corp · **RetailHub – Checkout Service**

Welcome! This repository contains the **Checkout API** for *RetailHub*, one of ACME Corp’s flagship demo products used
to showcase the breadth of PlantonCloud’s multi‑cloud CI/CD and infrastructure automation platform.

---

## ✨ Purpose & Demo Value

| Why this service exists                                               | What it lets us demonstrate in PlantonCloud                                                                                  |
|-----------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------|
| **Core e‑commerce flow** (taking a cart and turning it into an order) | API‑first micro‑service coupled to other RetailHub components (store‑front, catalog, orders DB).                             |
| **Dockerfile‑based build** (instead of Buildpacks)                    | Shows that PlantonCloud supports explicit Dockerfile pipelines **and** Buildpacks side‑by‑side.                              |
| **TypeScript + PNPM**                                                 | Highlights language‑level type‑safety and an increasingly popular JS package manager used by many customers.                 |
| **Deploy to AWS  ECS  Fargate**                                       | Perfect for “zero‑to‑ECS in 20 min” demo playbook, pushing images to **ECR** via CI, then spinning tasks via an Infra‑Chart. |

> **Big picture:** Prospects see a realistic Node.js service—complete with typed source, lock‑file, and
> Dockerfile—moving through a full delivery pipeline into a live AWS environment in minutes.

---

## 🏗️ Tech  Stack

| Layer           | Choice                                                        | Rationale                                                                                                        |
|-----------------|---------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------|
| Runtime         | **Node.js 18**                                                | LTS, widely adopted in enterprise JavaScript.                                                                    |
| Language        | **TypeScript**                                                | Compile‑time safety, clean domain models, great for demoing tsc ↔ dist output.                                   |
| Framework       | **Express  4**                                                | Minimal, unopinionated, instantly recognisable.                                                                  |
| Package manager | **PNPM**                                                      | Faster installs & deterministic lock‑file; showcases PlantonCloud’s compatibility with alternative Node tooling. |
| Container build | **Dockerfile** (multi‑stage)                                  | Explicit control over layers; shows classic Docker workflow for teams not yet on Buildpacks.                     |
| CI pipeline     | PlantonCloud **Docker‑build template** → push to **AWS  ECR** | Mirrors common production setups.                                                                                |
| Deploy target   | **AWS  ECS  Fargate** via Infra‑Chart `aws-ecs-webapp`        | No servers to manage; infra‑chart handles VPC, ALB, IAM, task definition.                                        |

---

## 🚚 Repository Layout

```
retail-hub-checkout-service/
├─ src/                  # TypeScript source
│  ├─ app.ts             # Express bootstrap
│  └─ routes/checkout.ts # POST /api/checkout logic
├─ dist/                 # Transpiled JS (tsc outDir)
├─ Dockerfile            # Multi-stage build & runtime image
├─ Makefile              # Convenience scripts (lint, build, test)
├─ package.json          # Scripts & deps
├─ pnpm-lock.yaml        # Deterministic dependency graph
└─ tsconfig.json         # TypeScript compiler settings
```

---

## 🧑‍💻 Local Development

```bash
# 1. Clone
git clone https://github.com/planton-acmecorp/retail-hub-checkout-service.git
cd retail-hub-checkout-service

# 2. Install deps
pnpm install   # needs pnpm >=8

# 3. Run in dev mode (auto‑reload)
pnpm dev       # http://localhost:3000/healthz
```

### Useful scripts

| Command      | Purpose                            |
|--------------|------------------------------------|
| `pnpm lint`  | Run ESLint (coming soon).          |
| `pnpm build` | Transpile TS → JS in `dist/`.      |
| `pnpm start` | Run compiled JS (production‑like). |

Environment variables:

| Var    | Default | Notes                              |
|--------|---------|------------------------------------|
| `PORT` | `3000`  | Overridden by ECS task definition. |

---

## 🌐 API Reference

### `GET /healthz`

| Response | Example              |
|----------|----------------------|
| `200 OK` | `{ "status": "ok" }` |

### `POST /api/checkout`

Consumes a simplified cart model, calculates a total, returns an order stub.

```
Request (JSON)
{
  "cart": [
    { "sku": "ABC‑123", "qty": 2, "price": 19.99 },
    { "sku": "XYZ‑987", "qty": 1, "price": 4.50 }
  ],
  "customer": { "email": "maria@example.com" }
}
```

```
Response  201
{
  "orderId": "0d1e5c10‑8f3c‑4b6a‑9c70‑8b92f62bea6e",
  "total": 44.48,
  "createdAt": "2025‑07‑29T17:56:04.123Z"
}
```

*(Persistence layer intentionally stubbed—focus is on pipeline, not business logic.)*

---

## 🐳 Building the Docker Image

```bash
# Build locally
docker build -t checkout-service:local .

# Run
docker run -p 3000:3000 checkout-service:local
```

PlantonCloud’s Docker‑build pipeline mirrors these steps, authenticates to AWS ECR using the linked secret, and tags
images with the Git SHA.

---

## 📦 CI/CD with PlantonCloud

Pipeline highlights:

1. **Install** –`pnpm install --frozen-lockfile`
2. **Test** –(Optional) Jest placeholder
3. **Build** –`docker build --build-arg SHA=$GIT_SHA ...`
4. **Push** –`docker push $ECR_REPO:$GIT_SHA`
5. **Deploy** – Trigger infra‑chart `aws-ecs-webapp` with new tag

> **Why Dockerfile instead of Buildpacks?**
> Many legacy Node apps still rely on handcrafted Dockerfiles. Including one proves PlantonCloud accommodates both
> modern Buildpacks **and** traditional Docker workflows.

---

## 🛠️ Customisation Guide

* **Switch package manager** – swap `pnpm` for `npm` or `yarn`; pipeline auto‑detects.
* **Add database** – extend infra‑chart to provision RDS and inject connection string as secret.
* **Scale out** – change `desiredCount` parameter in ECS chart; redeploy via PlantonCloud UI.

---

## 🔒 Security & Compliance Notes

* No customer PII stored—service is stateless for demo safety.
* Container runs as non‑root (`node:18-alpine`, USER node) and exposes only port 3000.
* Images are scanned by PlantonCloud’s built‑in Trivy integration before release.

---

## 📄 License

MIT – use, fork, and adapt for your own demos or proof‑of‑concepts.

---

## 🙋 Questions / Feedback

* Slack channel: **#acmecorp-demo** on [https://slack.planton.ai](https://slack.planton.ai)
* Email: **[support@planton.ai](mailto:support@planton.ai)**
* Issues: feel free to open a ticket in this repository—PRs welcome!

---

Happy hacking,
**— The PlantonCloud / ACME Corp team**
