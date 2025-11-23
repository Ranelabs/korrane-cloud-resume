const { TableClient } = require("@azure/data-tables");

module.exports = async function (context, req) {
  try {
    const connectionString = process.env["COSMOS_TABLE_CONN"];
    const tableName = "VisitorCount";

    const tableClient = TableClient.fromConnectionString(connectionString, tableName);

    const partitionKey = "site";
    const rowKey = "resume";

    // Get existing entity
    const entity = await tableClient.getEntity(partitionKey, rowKey);

    // Increment
    const newCount = Number(entity.count || 0) + 1;

    // Create clean update object
    const updatedEntity = {
      partitionKey,
      rowKey,
      count: newCount
    };

    await tableClient.updateEntity(updatedEntity, "Replace");

    context.res = {
      status: 200,
      headers: { "Content-Type": "application/json" },
      body: { count: newCount }
    };

  } catch (error) {
    context.log("Error in GetVisitorCount:", error);
    context.res = {
      status: 500,
      body: {
        error: "Failed to update visitor count",
        message: error.message
      }
    };
  }
};
