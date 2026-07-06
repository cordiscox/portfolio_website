variable "aws_region" {
  description = "AWS region where the Terraform state bucket will be created."
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Project prefix used to name bootstrap resources."
  type        = string
  default     = "portfolio-website"
}

variable "state_bucket_name" {
  description = "Optional explicit S3 bucket name for Terraform remote state. Leave null to derive one from the AWS account ID."
  type        = string
  default     = null
}

variable "force_destroy" {
  description = "Whether Terraform may delete a non-empty state bucket. Keep false for safety."
  type        = bool
  default     = false
}

variable "tags" {
  description = "Tags applied to bootstrap resources."
  type        = map(string)
  default = {
    Project   = "portfolio-website"
    ManagedBy = "terraform"
  }
}
