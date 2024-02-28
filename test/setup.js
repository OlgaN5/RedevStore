const server = require('../src/index');

module.exports = async () => {
  await server.listen(3000);
};