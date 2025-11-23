module.exports = async function (context, req) {
  context.log('HTTP trigger function processed a request.');

  const body = { message: 'Hello from the API' };

  context.res = {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
    body
  };
};
