const { TableClient } = require("@azure/data-tables");

module.exports = async function (context, req) {
    context.log("GetVisitorCount function hit");

    // Read settings you added in the Static Web App
    const connectionString = process.env.COSMOS_TABLE_CONN;
    const tableName = process.env.VISITOR_TABLE_NAME || "VisitorCount";
    const partitionKey = process.env.VISITOR_PARTITION_KEY || "site";
    const rowKey = process.env.VISITOR_ROW_KEY || "resume";

    // Connect to your Cosmos Table
    const client = TableClient.fromConnectionString(connectionString, tableName);

    try {
        // 1) Try to get the existing entity (your row)
        let entity;
        try {
            entity = await client.getEntity(partitionKey, rowKey);
        } catch (err) {
            // If the row doesn't exist yet, create it with Count = 0
            if (err.statusCode === 404) {
                entity = { partitionKey, rowKey, Count: 0 };
                await client.createEntity(entity);
            } else {
                throw err;
            }
        }

        // 2) Increment the Count field
        const currentCount = entity.Count || 0;
        const newCount = currentCount + 1;
        entity.Count = newCount;

        // 3) Save the updated entity back to Cosmos
        await client.updateEntity(entity, "Replace");

        // 4) Return the new count to the caller (your frontend)
        context.res = {
            status: 200,
            headers: { "Content-Type": "application/json" },
            body: { count: newCount }
        };
    } catch (error) {
        context.log("Error updating visitor count:", error);

        context.res = {
            status: 500,
            body: { error: "Failed to update visitor count" }
        };
    }
};

