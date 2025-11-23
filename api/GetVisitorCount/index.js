// api/GetVisitorCount/index.js
const { TableClient } = require("@azure/data-tables");

const connectionString = process.env.COSMOS_TABLE_CONN; // must match your app setting name
const tableName = "VisitorCount"; // you can rename if you want

module.exports = async function (context, req) {
  context.log("GetVisitorCount function hit");

  try {
    if (!connectionString) {
      throw new Error("Cosmos_Table_Conn setting is missing");
    }

    const tableClient = TableClient.fromConnectionString(connectionString, tableName);

    // Create table if it doesn't exist
    try {
      await tableClient.createTable();
      context.log(`Table '${tableName}' created.`);
    } catch (err) {
      // Ignore "already exists" errors
      if (err.statusCode !== 409) {
        throw err;
      }
    }

    const partitionKey = "1";
    const rowKey = "1";

    // Get current count or create it if not there
    let entity;
    try {
      entity = await tableClient.getEntity(partitionKey, rowKey);
    } catch (err) {
      if (err.statusCode === 404) {
        entity = {
          partitionKey,
          rowKey,
          count: 0
        };
        await tableClient.createEntity(entity);
      } else {
        throw err;
      }
    }

    const currentCount = Number(entity.count || 0);
    const newCount = currentCount + 1;

    entity.count = newCount;

    await tableClient.updateEntity(entity, "Replace");

    context.res = {
      status: 200,
      headers: { "Content-Type": "application/json" },
      body: {
        count: newCount
      }
    };
  } catch (error) {
    context.log.error("Error in GetVisitorCount:", error.message);

    context.res = {
      status: 500,
      headers: { "Content-Type": "application/json" },
      body: {
        error: "Error getting visitor count",
        details: error.message
      }
    };
  }
};
