output "state_bucket_name" {
  description = "S3 bucket name to use in the dns and site backend blocks."
  value       = aws_s3_bucket.terraform_state.bucket
}

output "state_bucket_region" {
  description = "AWS region of the Terraform state bucket."
  value       = var.aws_region
}
