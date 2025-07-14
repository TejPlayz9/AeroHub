const { SlashCommandBuilder } = require('discord.js');
const config = require('../config.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('giveaway')
    .setDescription('Start a giveaway (staff only)'),

  async execute(interaction) {
    if (!interaction.member.roles.cache.has(config.roles.staff)) {
      return interaction.reply({ content: '❌ Staff only.', ephemeral: true });
    }

    const msg = await interaction.channel.send("🎉 **Giveaway Started!** React with 🎉 to enter!");
    await msg.react("🎉");

    setTimeout(async () => {
      const users = await msg.reactions.cache.get("🎉").users.fetch();
      const filtered = users.filter(u => !u.bot);
      const winner = filtered.random();
      if (winner) {
        interaction.channel.send(`🎉 Congrats <@${winner.id}>! You won!`);
      } else {
        interaction.channel.send(`😢 No valid entries.`);
      }
    }, 60000); // 1 minute demo
  }
};
