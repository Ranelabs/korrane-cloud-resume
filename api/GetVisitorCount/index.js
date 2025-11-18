const { TableClient } = require("@azure/data-tables");

module.exports = async function (context, req) {
  try {
    // Connection string from Static Web App config
    const connectionString = process.env["COSMOS_TABLE_CONN"];

    if (!connectionString) {
      throw new Error("COSMOS_TABLE_CONN is not set in app settings");
    }

    // Your table name from Azure
    const tableName = "VisitorCount";

    // Create client for the table
    const tableClient = TableClient.fromConnectionString(connectionString, tableName);

    // Keys that match your entity in the table
    const partitionKey = "site";
    const rowKey = "resume";

    // Read the existing entity
    const entity = await tableClient.getEntity(partitionKey, rowKey);

    // Safely convert count to a number and increment
    const currentCount = Number(entity.count || 0);
    const newCount = currentCount + 1;

    // Update the entity with the new count
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

    // Send the error back so we can see exactly what's wrong if it fails
    context.res = {
      status: 500,
      headers: { "Content-Type": "application/json" },
      body: {
        error: "Failed to update visitor count",
        message: error.message,
        code: error.code
      }
    };
  }
};

    };
  }
};
