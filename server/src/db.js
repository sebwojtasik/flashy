const { PrismaClient } = require("@prisma/client");

module.exports = {
  prisma: new PrismaClient(),
};
