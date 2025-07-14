const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('../config.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('drop')
    .setDescription('Start a quick drop (staff only)'),

  async execute(interaction) {
    if (!interaction.member.roles.cache.has(config.roles.staff)) {
      return interaction.reply({ content: '❌ Staff only.', ephemeral: true });
    }

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('drop_button')
        .setLabel('Claim!')
        .setStyle(ButtonStyle.Primary)
    );

    const msg = await interaction.channel.send({
      content: '🎁 **Quick Drop!** First to click the button wins!',
      components: [row]
    });

    const collector = msg.createMessageComponentCollector({ max: 1, time: 30000 });

    collector.on('collect', async i => {
      await i.reply({ content: `🎉 <@${i.user.id}> claimed the drop!` });
      await msg.edit({ components: [] });
    });

    collector.on('end', collected => {
      if (collected.size === 0) {
        msg.edit({ content: '❌ No one claimed the drop.', components: [] });
      }
    });
  }
};
