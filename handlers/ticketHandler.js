const config = require('../config.js');

module.exports = async (interaction, client) => {
  const roleMap = {
    support: config.roles.support,
    report: config.roles.report,
    partner: config.roles.partner
  };

  const selected = interaction.values[0];
  const roleToPing = roleMap[selected];

  const thread = await interaction.channel.threads.create({
    name: `${interaction.user.username}-${selected}-ticket`,
    type: 12,
    reason: `Ticket: ${selected}`,
    invitable: false
  });

  await thread.members.add(interaction.user.id);
  await thread.send(`<@&${roleToPing}> New ticket from <@${interaction.user.id}>`);
  await interaction.reply({ content: `✅ Your ticket has been opened in ${thread}`, ephemeral: true });
};
