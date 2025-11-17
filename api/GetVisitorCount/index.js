module.exports = async function (context, req) {
  // Hard-coded count just to test the front end
  const count = 1;

  return {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      count: count
    }
  };
};
