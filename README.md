# ACME Corp · RetailHub ‑ Checkout Service

A lightweight **Node.js Express** API that handles order check‑out
for RetailHub.  
Used in demo environments to illustrate:

* Buildpacks‑based CI/CD on PlantonCloud  
* Deployment to AWS ECS Fargate (or any other infra chart)  
* Basic REST + JSON workflow

Run locally:

```bash
make deps           # or: pnpm install
make start          # or: pnpm start
                    # http://localhost:3000/healthz
```