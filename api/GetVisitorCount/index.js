module.exports = async function (context, req) {
  // Log that the function was called (shows in Azure logs)
  context.log("GetVisitorCount function called");

  // Hard-coded value just to verify things work
  const count = 1;

  // Build the response object
  const response = {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: {
      count: count
    }
  };

  context.log("Sending response:", response);

  // Return the response
  return response;
};
