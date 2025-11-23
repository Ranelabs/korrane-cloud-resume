const { TableClient } = require("@azure/data-tables");

module.exports = async function (context, req) {
  try {
    // 1) Get connection string from app settings
    const connectionString = process.env["COSMOS_TABLE_CONN"];
    if (!connectionString) {
      throw new Error("COSMOS_TABLE_CONN is not set in app settings");
    }

    // 2) Connect to the VisitorCount table
    const tableName = "VisitorCount";
    const tableClient = TableClient.fromConnectionString(connectionString, tableName);

    const partitionKey = "site";
    const rowKey = "resume";

    // 3) Read existing entity (or create it if it doesn't exist)
    let entity;
    try {
      entity = await tableClient.getEntity(partitionKey, rowKey);
    } catch (err) {
      if (err.statusCode === 404) {
        entity = { partitionKey, rowKey, count: 0 };
        await tableClient.createEntity(entity);
      } else {
        throw err;
      }
    }

    // 4) Increment the count
    const currentCount = Number(entity.count || 0);
    const newCount = currentCount + 1;
    entity.count = newCount;

    // 5) Save the updated entity
    await tableClient.updateEntity(entity, "Replace");

    // 6) Return the new count to the frontend
    context.res = {
      status: 200,
      headers: { "Content-Type": "application/json" },
      body: { count: newCount }
    };
  } catch (error) {
    context.log("Error in GetVisitorCount:", error);

    context.res = {
      status: 500,
      headers: { "Content-Type": "application/json" },
      body: {
        error: "Failed to update visitor count",
        message: error.message
      }
    };
  }
};
