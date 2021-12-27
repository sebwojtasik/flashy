const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./schema");
const resolvers = require("./resolvers");
const jwt = require("jsonwebtoken");

const port = process.env.PORT || 4000;

const whitelist = [
  process.env.FRONTEND_URL,
  "http://localhost",
  "http://localhost:3000",
  "https://studio.apollographql.com",
];

const app = new ApolloServer({
  resolvers,
  typeDefs,
  context: ({ req, res }) => {
    // parse the cookies from header
    if (req.headers.cookie) {
      const cookies = req.headers.cookie
        .split("; ")
        .reduce((allCookies, cookie) => {
          const [key, value] = cookie.split("=");
          allCookies[key] = value;
          return allCookies;
        }, {});
      // get the user token from the cookies.
      const token = cookies.token;
      if (token) {
        const user = getUser(token);
        if (user) {
          // add the user to the context
          return { req, res, userId: user.userId };
        }
      }
    }
    // try to retrieve a user with the token
    return { req, res };
  },
  cors: {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      }
    },
    credentials: true, // <-- REQUIRED backend setting
  },
  debug: true,
});

const getUser = (token) => {
  // verify user token
  try {
    const user = jwt.verify(token, process.env.TOKEN_SECRET);
    return user;
  } catch (err) {
    return null;
  }
};

module.exports = app;
