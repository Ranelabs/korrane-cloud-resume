module.exports = async function (context, req) {
  // Simple test value so we know the function is working
  const count = 1;

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
