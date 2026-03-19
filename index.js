if (message.content === '!hswifi') {

  const embed = new EmbedBuilder()
    .setTitle('📶🔥 HS WIFI 🔥📶')
    .setDescription(`
🔥 **HS WIFI** 🔥
    `)
    .setImage('https://media.discordapp.net/attachments/1482528899903782932/1484254280088027216/file_000000008530720eb8922a615208f883.png')
    .setColor(0x00ff88);

  const botao = new ButtonBuilder()
    .setCustomId('comprar_hswifi')
    .setLabel('Comprar HS WIFI')
    .setStyle(ButtonStyle.Success);

  const row = new ActionRowBuilder().addComponents(botao);

  message.channel.send({
    embeds: [embed],
    components: [row]
  });
}
