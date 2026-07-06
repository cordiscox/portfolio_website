output "site_bucket_name" {
  description = "Private S3 bucket used for static site files."
  value       = aws_s3_bucket.site.bucket
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID used by GitHub Actions invalidations."
  value       = aws_cloudfront_distribution.site.id
}

output "cloudfront_domain_name" {
  description = "CloudFront generated domain name."
  value       = aws_cloudfront_distribution.site.domain_name
}

output "github_actions_role_arn" {
  description = "IAM role ARN assumed by GitHub Actions via OIDC."
  value       = aws_iam_role.github_actions_deploy.arn
}

output "acm_certificate_arn" {
  description = "ACM certificate ARN in us-east-1."
  value       = aws_acm_certificate.site.arn
}

output "github_actions_variables" {
  description = "Repository variables required by the deploy workflow."
  value = {
    AWS_REGION                 = var.aws_region
    AWS_ROLE_ARN               = aws_iam_role.github_actions_deploy.arn
    S3_BUCKET                  = aws_s3_bucket.site.bucket
    CLOUDFRONT_DISTRIBUTION_ID = aws_cloudfront_distribution.site.id
  }
}
