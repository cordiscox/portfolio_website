variable "aws_region" {
  description = "Primary AWS region for S3, IAM, and Route 53 operations."
  type        = string
  default     = "us-east-1"
}

variable "domain_name" {
  description = "Primary domain served by CloudFront."
  type        = string
  default     = "joaquincordisco.me"
}

variable "alternate_domain_names" {
  description = "Additional CloudFront aliases, usually www."
  type        = list(string)
  default     = ["www.joaquincordisco.me"]
}

variable "hosted_zone_id" {
  description = "Route 53 hosted zone ID created by the dns stack."
  type        = string
}

variable "site_bucket_name" {
  description = "Optional explicit S3 bucket name for the static site. Leave null to derive one from the domain and AWS account ID."
  type        = string
  default     = null
}

variable "github_owner" {
  description = "GitHub owner or organization."
  type        = string
  default     = "cordiscox"
}

variable "github_repo" {
  description = "GitHub repository name."
  type        = string
  default     = "portfolio_website"
}

variable "github_branch" {
  description = "Branch allowed to assume the deploy role."
  type        = string
  default     = "main"
}

variable "create_github_oidc_provider" {
  description = "Create the GitHub IAM OIDC provider. Keep false if the account already has token.actions.githubusercontent.com configured."
  type        = bool
  default     = false
}

variable "manage_github_actions_variables" {
  description = "Create GitHub Actions repository variables with the Terraform outputs. Requires GITHUB_TOKEN with repo/admin access."
  type        = bool
  default     = false
}

variable "price_class" {
  description = "CloudFront price class."
  type        = string
  default     = "PriceClass_100"
}

variable "tags" {
  description = "Tags applied to site resources."
  type        = map(string)
  default = {
    Project   = "portfolio-website"
    ManagedBy = "terraform"
  }
}
