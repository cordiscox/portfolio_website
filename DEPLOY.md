# Deploy

El deploy productivo de este proyecto queda definido en Terraform y GitHub Actions.

Guia completa: [infra/README.md](infra/README.md)

Resumen:

- Framework: Vite + React.
- Build: `npm run build`.
- Output: `build/`.
- Hosting: S3 privado.
- CDN: CloudFront con Origin Access Control.
- TLS: ACM en `us-east-1`.
- DNS: Route 53 con records A/AAAA alias hacia CloudFront.
- CI/CD: GitHub Actions con OIDC, sin AWS access keys permanentes.
- Terraform state: backend S3 con `use_lockfile = true`, sin DynamoDB.

Orden de aplicacion:

```bash
cd infra/terraform/bootstrap
terraform init
terraform apply

STATE_BUCKET=$(terraform output -raw state_bucket_name)
cp ../dns/backend.hcl.example ../dns/backend.hcl
sed -i "s/REPLACE_WITH_TERRAFORM_STATE_BUCKET/${STATE_BUCKET}/" ../dns/backend.hcl
cp ../site/backend.hcl.example ../site/backend.hcl
sed -i "s/REPLACE_WITH_TERRAFORM_STATE_BUCKET/${STATE_BUCKET}/" ../site/backend.hcl

cd ../dns
terraform init -reconfigure -backend-config=backend.hcl
terraform apply

cd ../site
terraform init -reconfigure -backend-config=backend.hcl
terraform apply
```

Los archivos `backend.hcl` y `terraform.tfvars` son locales y estan ignorados por git.
`backend.hcl` solo contiene el bucket. `backend.tf` define `region`, `key`, `encrypt` y `use_lockfile`.
