output "storage_account_name" {
  value = azurerm_storage_account.resume_sa.name
}

output "storage_connection_string" {
  value     = azurerm_storage_account.resume_sa.primary_connection_string
  sensitive = true
}
