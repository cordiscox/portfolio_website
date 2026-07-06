# Infraestructura AWS del portfolio

Este proyecto se despliega como sitio estatico en AWS:

```text
GitHub Actions
  -> OIDC hacia AWS
  -> npm ci
  -> npm run build
  -> sync de build/ a S3 privado
  -> invalidacion de CloudFront

Usuarios
  -> joaquincordisco.me
  -> CloudFront + ACM
  -> S3 privado via Origin Access Control
```

## Deteccion del proyecto

- Framework: Vite + React 18 + TypeScript.
- Build: `npm run build`.
- Directorio de salida: `build/`, definido en `vite.config.ts`.
- Node: el proyecto no define `engines`; el workflow usa Node 22.
- Lint: no hay script `lint`; el workflow lo ejecuta solo si existe.
- Remote GitHub detectado: `https://github.com/cordiscox/portfolio_website.git`.
- Rama local detectada: `master`.
- Rama configurada para CI/CD: `main`, segun el objetivo de despliegue.

## Estructura

```text
infra/terraform/bootstrap
  Bucket S3 para remote state.

infra/terraform/dns
  Hosted zone publica de Route 53.

infra/terraform/site
  S3 privado, CloudFront, OAC, ACM, DNS records, OIDC provider, IAM role y variables opcionales de GitHub Actions.
```

Los stacks `dns` y `site` usan backend S3 con:

```hcl
use_lockfile = true
```

No se usa DynamoDB para locking. Terraform recomienda S3 locking con `use_lockfile`; DynamoDB locking esta deprecado en la documentacion actual del backend S3.

## 1. Bootstrap del estado remoto

Este paso es el unico que usa estado local, porque el bucket remoto todavia no existe.

```bash
cd infra/terraform/bootstrap
cp terraform.tfvars.example terraform.tfvars
terraform init
terraform apply
```

Anotar el output:

```bash
terraform output state_bucket_name
```

Despues, crear la configuracion local del backend para `dns` y `site`. Estos archivos no se suben al repo:

```bash
STATE_BUCKET=$(terraform output -raw state_bucket_name)

cp ../dns/backend.hcl.example ../dns/backend.hcl
sed -i "s/REPLACE_WITH_TERRAFORM_STATE_BUCKET/${STATE_BUCKET}/" ../dns/backend.hcl

cp ../site/backend.hcl.example ../site/backend.hcl
sed -i "s/REPLACE_WITH_TERRAFORM_STATE_BUCKET/${STATE_BUCKET}/" ../site/backend.hcl
```

`backend.hcl` solo contiene el bucket. `backend.tf` ya define `region`, `key`, `encrypt` y `use_lockfile`.

## 2. Crear DNS en Route 53

```bash
cd ../dns
cp terraform.tfvars.example terraform.tfvars
terraform init -reconfigure -backend-config=backend.hcl
terraform apply
```

Anotar:

```bash
terraform output hosted_zone_id
terraform output name_servers
```

## 3. Delegar DNS desde Namecheap

Como `joaquincordisco.me` es el dominio principal, conviene delegar todo el dominio a Route 53 si esta web va a ser el sitio principal y queres que Terraform maneje apex, `www`, validacion ACM y futuros records.

Antes de cambiar nameservers, copiar a Route 53 cualquier record existente que quieras conservar, por ejemplo MX, TXT de verificacion, SPF, DKIM, DMARC u otros subdominios. Al delegar el dominio completo, Route 53 pasa a ser la fuente autoritativa.

En Namecheap:

1. Entrar a Domain List.
2. Abrir `joaquincordisco.me`.
3. Ir a Nameservers.
4. Elegir Custom DNS.
5. Cargar los 4 NS devueltos por `terraform output name_servers`.
6. Guardar.

La propagacion puede tardar desde minutos hasta 24-48 horas.

Si en el futuro quisieras que AWS maneje solo un subdominio, por ejemplo `app.joaquincordisco.me`, convendria crear una hosted zone para ese subdominio y delegar solo `app` con registros NS en Namecheap. Para este caso, al usar apex `joaquincordisco.me`, la delegacion completa del dominio es la opcion mas simple.

Validar delegacion:

```bash
dig NS joaquincordisco.me
dig +short NS joaquincordisco.me
```

## 4. Aplicar site

Editar `infra/terraform/site/terraform.tfvars` con el `hosted_zone_id` del stack DNS.

```bash
cd ../site
cp terraform.tfvars.example terraform.tfvars
terraform init -reconfigure -backend-config=backend.hcl
terraform apply
```

Si la cuenta AWS ya tiene el OIDC provider de GitHub, usar:

```hcl
create_github_oidc_provider = false
```

Este es el caso normal si ya viste el error `EntityAlreadyExists: Provider with url https://token.actions.githubusercontent.com already exists`.

Si la cuenta AWS no tiene ese provider, usar:

```hcl
create_github_oidc_provider = true
```

Si queres que Terraform cree las repository variables de GitHub, usar:

```hcl
manage_github_actions_variables = true
```

Y ejecutar Terraform con un token de GitHub en el entorno:

```bash
export GITHUB_TOKEN=ghp_xxx
terraform apply
```

No guardar `GITHUB_TOKEN` en archivos del repo.

## 5. Variables de GitHub Actions

El workflow `.github/workflows/deploy-static-site.yml` necesita estas repository variables:

- `AWS_REGION`: `us-east-1`
- `AWS_ROLE_ARN`: output `github_actions_role_arn`
- `S3_BUCKET`: output `site_bucket_name`
- `CLOUDFRONT_DISTRIBUTION_ID`: output `cloudfront_distribution_id`

Se pueden cargar manualmente en GitHub o crearlas con Terraform usando `manage_github_actions_variables = true`.

Tambien mantener estos repository secrets si el frontend los usa:

- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

## 6. CI/CD

El workflow se ejecuta en push a `main` y manualmente con `workflow_dispatch`.

Pasos:

1. Checkout.
2. Node 22.
3. `npm ci`.
4. `npm run lint`, solo si existe.
5. `npm run build`.
6. Assume role AWS via GitHub OIDC.
7. Upload de `build/` a S3 privado.
8. Invalidacion de CloudFront.

Importante: `package-lock.json` debe estar versionado para que `npm ci` funcione en GitHub Actions.

## 7. Troubleshooting OIDC

Error `No OpenIDConnect provider found`:

- Aplicar `site` con `create_github_oidc_provider = true`.
- Si el provider ya existe pero no esta en el estado, usar `create_github_oidc_provider = false` o importarlo.

Error `Not authorized to perform sts:AssumeRoleWithWebIdentity`:

- Verificar que el repo sea `cordiscox/portfolio_website`.
- Verificar que el push sea a `main`.
- Verificar que el workflow tenga:

```yaml
permissions:
  contents: read
  id-token: write
```

Error de branch:

- El trust policy permite solo `repo:cordiscox/portfolio_website:ref:refs/heads/main`.
- Si el repo sigue usando `master`, cambiar `github_branch` y el workflow, o renombrar la rama a `main`.

Error `EntityAlreadyExists` al crear OIDC provider:

- Ya existe `token.actions.githubusercontent.com` en la cuenta.
- Cambiar `create_github_oidc_provider = false`.

## 8. Comandos de validacion

Terraform:

```bash
terraform -chdir=infra/terraform/bootstrap fmt -check
terraform -chdir=infra/terraform/dns fmt -check
terraform -chdir=infra/terraform/site fmt -check

terraform -chdir=infra/terraform/bootstrap validate
terraform -chdir=infra/terraform/dns validate
terraform -chdir=infra/terraform/site validate
```

AWS:

```bash
aws route53 list-hosted-zones-by-name --dns-name joaquincordisco.me
aws cloudfront get-distribution --id CLOUDFRONT_DISTRIBUTION_ID
aws s3api get-public-access-block --bucket S3_BUCKET
```

DNS y sitio:

```bash
dig NS joaquincordisco.me
dig A joaquincordisco.me
dig AAAA joaquincordisco.me
curl -I https://joaquincordisco.me
curl -I https://joaquincordisco.me/projects
```
