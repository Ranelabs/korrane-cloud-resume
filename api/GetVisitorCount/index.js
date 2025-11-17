const { TableClient } = require("@azure/data-tables");

module.exports = async function (context, req) {
  try {
    // Connection string from Static Web App config
    const connectionString = process.env["Cosmos_Table_Conn"];

    // Your table name from Azure (exactly as shown)
    const tableName = "VisitorCount";

    // Create client for the table
    const tableClient = TableClient.fromConnectionString(connectionString, tableName);

    // Keys from your screenshot
    const partitionKey = "site";
    const rowKey = "resume";

    // Read the existing entity
    const entity = await tableClient.getEntity(partitionKey, rowKey);

    // Safely convert count to a number and increment
    const currentCount = Number(entity.count || 0);
    const newCount = currentCount + 1;

    // Update the entity
    entity.count = newCount;
    await tableClient.updateEntity(entity, "Replace");

    // Return the new count to the website
    context.res = {
      status: 200,
      headers: { "Content-Type": "application/json" },
      body: { count: newCount }
    };
  } catch (error) {
    context.log("Error in GetVisitorCount:", error);

    context.res = {
      status: 500,
      body: { error: "Failed to update visitor count" }
    };
  }
};
