# 1) Resource Group
resource "azurerm_resource_group" "resume" {
  name     = "cloud-resume"
  location = "eastus" # e.g. "eastus"
}

# 2) Storage Account (same name as your existing one)
resource "azurerm_storage_account" "resume_sa" {
  name                     = "korraneresumehtml" # must match your current storage account name
  resource_group_name      = azurerm_resource_group.resume.name
  location                 = azurerm_resource_group.resume.location
  account_tier             = "Standard"
  account_replication_type = "LRS"

  allow_nested_items_to_be_public = false
}

# 3) Storage Table for your visitor count
resource "azurerm_storage_table" "visitor_table" {
  name                 = "VisitorCount"  # keep this the same
  storage_account_name = azurerm_storage_account.resume_sa.name
}

# 4) Seed the first entity so your function can read it
resource "azurerm_storage_table_entity" "visitor_entity" {
  storage_account_name = azurerm_storage_account.resume_sa.name
  table_name           = azurerm_storage_table.visitor_table.name

  partition_key = "site"
  row_key       = "resume"

  entity = {
    count = "0"
  }
}
