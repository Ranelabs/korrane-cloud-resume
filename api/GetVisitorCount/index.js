module.exports = async function (context, req) {
  // Just a hard-coded test value to make sure everything works
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
    }
  };
}
