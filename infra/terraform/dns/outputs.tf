output "hosted_zone_id" {
  description = "Route 53 hosted zone ID. Pass this to the site stack."
  value       = aws_route53_zone.primary.zone_id
}

output "name_servers" {
  description = "Name servers to configure in Namecheap for domain delegation."
  value       = aws_route53_zone.primary.name_servers
}
