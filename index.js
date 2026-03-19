const { 
  Client, 
  GatewayIntentBits, 
  EmbedBuilder, 
  ActionRowBuilder, 
  ButtonBuilder, 
  ButtonStyle,
  ChannelType,
  PermissionsBitField
} = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// ONLINE
client.once('clientReady', () => {
  console.log(`🔥 Bot online como ${client.user.tag}`);
});

// COMANDO !wifi
client.on('messageCreate', async (message) => {

  if (message.author.bot) return;

  if (message.content === '!wifi') {

    const embed = new EmbedBuilder()
      .setTitle('📶🔥 HS WIFI 🔥📶')
      .setDescription('🔥 **HS WIFI** 🔥')
      .setImage('https://media.discordapp.net/attachments/1482528899903782932/1484254280088027216/file_000000008530720eb8922a615208f883.png')
      .setColor(0x00ff88);

    const botao = new ButtonBuilder()
      .setCustomId('comprar_wifi')
      .setLabel('Comprar HS WIFI')
      .setStyle(ButtonStyle.Success);

    const row = new ActionRowBuilder().addComponents(botao);

    await message.channel.send({
      embeds: [embed],
      components: [row]
    });
  }
});

// INTERAÇÃO
client.on('interactionCreate', async (interaction) => {

  // CRIAR TICKET
  if (interaction.isButton() && interaction.customId === 'comprar_wifi') {

    const canal = await interaction.guild.channels.create({
      name: `wifi-${interaction.user.username}`,
      type: ChannelType.GuildText,
      permissionOverwrites: [
        {
          id: interaction.guild.id,
          deny: [PermissionsBitField.Flags.ViewChannel]
        },
        {
          id: interaction.user.id,
          allow: [PermissionsBitField.Flags.ViewChannel]
        }
      ]
    });

    const confirmar = new ButtonBuilder()
      .setCustomId('confirmar_pagamento')
      .setLabel('Confirmar Pagamento')
      .setStyle(ButtonStyle.Success);

    const fechar = new ButtonBuilder()
      .setCustomId('fechar_ticket')
      .setLabel('Fechar Ticket')
      .setStyle(ButtonStyle.Danger);

    const row = new ActionRowBuilder().addComponents(confirmar, fechar);

    const embedPix = new EmbedBuilder()
      .setTitle('💰 Pagamento HS WIFI')
      .setDescription(`
📲 Chave PIX:
21983873874

📌 Após pagar, aguarde confirmação do dono
      `)
      .setColor(0x00ff88);

    await canal.send({
      content: `📶 Ticket HS WIFI - ${interaction.user}`,
      embeds: [embedPix],
      components: [row]
    });

    return interaction.reply({
      content: `✅ Ticket criado: ${canal}`,
      ephemeral: true
    });
  }

  // CONFIRMAR
  if (interaction.isButton() && interaction.customId === 'confirmar_pagamento') {

    const dono = process.env.DONO_ID;

    if (interaction.user.id != dono) {
      return interaction.reply({
        content: '❌ Apenas o dono pode confirmar!',
        ephemeral: true
      });
    }

    await interaction.channel.send(`
✅ Pagamento confirmado!

📦 Sua key será enviada quando o dono estiver online.
    `);

    await interaction.reply({
      content: '✔️ Confirmado!',
      ephemeral: true
    });
  }

  // FECHAR
  if (interaction.isButton() && interaction.customId === 'fechar_ticket') {

    const dono = process.env.DONO_ID;

    if (interaction.user.id != dono) {
      return interaction.reply({
        content: '❌ Apenas o dono pode fechar!',
        ephemeral: true
      });
    }

    await interaction.reply({
      content: '🗑️ Fechando ticket...',
      ephemeral: true
    });

    setTimeout(() => {
      interaction.channel.delete().catch(() => {});
    }, 2000);
  }

});

client.login(process.env.TOKEN);
