const blacklist = ["badword1", "nword", "slur"];

module.exports = async (message) => {
  if (!message.guild || message.author.bot) return;

  const content = message.content.toLowerCase();

  if (blacklist.some(word => content.includes(word))) {
    await message.delete();
    await message.channel.send(`${message.author}, watch your language.`);
  }

  if (message.mentions.users.size > 5) {
    await message.delete();
    await message.channel.send(`${message.author}, too many mentions.`);
  }
};
