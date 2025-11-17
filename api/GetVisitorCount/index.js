module.exports = async function (context, req) {
    context.log("Test GetVisitorCount function hit (no Cosmos)");

    context.res = {
        status: 200,
        headers: { "Content-Type": "application/json" },
        body: { message: "Function is alive", test: true }
    };
};
