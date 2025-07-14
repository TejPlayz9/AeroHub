const automod = require('../utils/automod.js');

module.exports = {
  name: 'messageCreate',
  async execute(message, client) {
    automod(message);
  }
};
