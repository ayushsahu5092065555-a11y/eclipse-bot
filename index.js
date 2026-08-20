const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ]
});

client.once('ready', () => {
  console.log(`Eclipse Bot Online Hai! Logged in as ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
  if (message.author.bot) return;

  // !help कमांड
  if (message.content === '!help') {
    message.reply('**🌸 Eclipse Bot Commands:**\n• `!play <song>` - Gaana chalao\n• `!skip` - Agla gaana\n• `!stop` - Music band karo\n• `!ping` - Bot speed check karo');
  }

  // !ping कमांड
  if (message.content === '!ping') {
    message.reply('Pong! 🏓 Bot mst chal raha hai!');
  }

  // !play कमांड
  if (message.content.startsWith('!play')) {
    const song = message.content.split(' ').slice(1).join(' ');
    if (!song) return message.reply('Bhai gaane ka naam bhi likho!');
    message.reply(`🎶 **Playing:** ${song}`);
  }

  // !skip कमांड
  if (message.content === '!skip') {
    message.reply('⏭️ Gaana skip kar diya gaya hai!');
  }

  // !stop कमांड
  if (message.content === '!stop') {
    message.reply('⏹️ Music stop ho gaya hai.');
  }
});

client.login(process.env.DISCORD_TOKEN);

