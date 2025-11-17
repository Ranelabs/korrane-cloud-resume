module.exports = async function (context, req) {
    context.log("GetVisitorCount function called");

    const count = 1; // test value

    context.res = {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        },
        body: {
            count: count
        }
    };
};
