const { ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  createPanel: () => {
    const embed = new EmbedBuilder()
      .setTitle("🎫 Need Help?")
      .setDescription("Select a category below to open a ticket.")
      .setColor("Blue");

    const menu = new StringSelectMenuBuilder()
      .setCustomId("ticket_select")
      .setPlaceholder("Choose a ticket type")
      .addOptions([
        { label: "Support", value: "support", emoji: "🛠️" },
        { label: "Report", value: "report", emoji: "🚨" },
        { label: "Partnership", value: "partner", emoji: "🤝" },
      ]);

    return {
      embeds: [embed],
      components: [new ActionRowBuilder().addComponents(menu)],
    };
  }
};
