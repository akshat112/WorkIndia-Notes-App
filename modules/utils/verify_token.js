const { verify } = require("jsonwebtoken");

module.exports = {
  verifyToken: (req, res, next) => {
    const authHeaders = req.headers.authorization;
    if (authHeaders) {
      const token = authHeaders.split(" ")[1];
      let result;
      result = verify(token, process.env.JSON_TOKEN, (err, result) => {
        if (err)
          return res.json({
            success: 0,
            status: "Invalid token, unauthorised!",
          });
        req.token_data = result;
        next();
      });
    } else {
      return res.json({
        success: 0,
        status: "Invalid token, unauthorised!",
      });
    }
  },
};
