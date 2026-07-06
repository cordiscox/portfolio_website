variable "aws_region" {
  description = "AWS region used by the AWS provider. Route 53 is global, but the provider still requires a region."
  type        = string
  default     = "us-east-1"
}

variable "domain_name" {
  description = "Domain name to host in Route 53."
  type        = string
  default     = "joaquincordisco.me"
}

variable "tags" {
  description = "Tags applied to DNS resources."
  type        = map(string)
  default = {
    Project   = "portfolio-website"
    ManagedBy = "terraform"
  }
}
