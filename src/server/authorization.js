const User = require("./models/User");

module.exports = function authorizationLogic() {
  return async ({ req }) => {
    //----------------------------------------------------------------
    //shitty logic,there must be another way
    // PLOX FIX ME!
    const mutationbody = req.body.query.replace(/ /g, "");
    if (
      mutationbody.trim().startsWith("mutation{\nlogin") ||
      mutationbody.startsWith("mutation{\naddUser")
    ) {
      return;
    }

    const token = req.headers.authorization || "";
    if (!["", "Bearer "].includes(token)) {
      var splittedToken = token.split(":");
      const email = splittedToken[0];
      const password = splittedToken[1];
      //----------------------------- this part will be replaced by jwt
      const returnedUser = await User.findOne(
        { email: email, password: password },
        { email: 1, password: 1 }
      );
      if (returnedUser == null) {
        throw new Error("INVALID TOKEN");
      } else return { user: returnedUser._doc };
    }
    throw new Error("YOU MUST PROVIDE TOKEN. HACKERMANE!");
  };
};
