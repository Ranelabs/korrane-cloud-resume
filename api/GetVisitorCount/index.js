module.exports = async function (context, req) {
  context.log('GetVisitorCount test function hit');

  context.res = {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
    body: {
      message: 'API is working',
      time: new Date().toISOString()
    }
  };
};
