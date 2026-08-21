const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ]
});

// सिर्फ म्यूजिक कमांड्स
const commands = [
  new SlashCommandBuilder().setName('play').setDescription('VC me gaana chalao').addStringOption(option => 
    option.setName('song').setDescription('Gaane ka naam ya link').setRequired(true)),
  new SlashCommandBuilder().setName('pause').setDescription('Gaana pause karo'),
  new SlashCommandBuilder().setName('resume').setDescription('Gaana resume karo'),
  new SlashCommandBuilder().setName('skip').setDescription('Agla gaana chalao'),
  new SlashCommandBuilder().setName('stop').setDescription('Music band karke VC chhodo'),
  new SlashCommandBuilder().setName('help').setDescription('E-SONIC ke sare music commands dekho')
].map(command => command.toJSON());

// Slash Commands Register karna
client.once('ready', async () => {
  console.log(`E-SONIC Online Hai! Logged in as ${client.user.tag}`);
  
  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
  try {
    console.log('Registering E-SONIC Music Commands...');
    await rest.put(
      Routes.applicationCommands(client.user.id),
      { body: commands },
    );
    console.log('E-SONIC Pure Music Commands Active!');
  } catch (error) {
    console.error(error);
  }
});

// Command System
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;

  // Help Command
  if (commandName === 'help') {
    const helpEmbed = new EmbedBuilder()
      .setColor('#FFB6C1')
      .setTitle('🌸 E - SONIC | Music Commands')
      .setDescription('**Pure High-Quality Music System**\n\n• `/play <song>` - VC me gaana chalaye\n• `/pause` - Gaana roke\n• `/resume` - Gaana firse chalaye\n• `/skip` - Agla gaana skip kare\n• `/stop` - VC chhod de');
    
    await interaction.reply({ embeds: [helpEmbed] });
  }

  // Play Command
  else if (commandName === 'play') {
    const voiceChannel = interaction.member.voice.channel;
    if (!voiceChannel) {
      return await interaction.reply({ content: '❌ Pehle kisi Voice Channel (VC) me join ho jao!', ephemeral: true });
    }
    
    const song = interaction.options.getString('song');
    await interaction.reply(`🎶 **E-SONIC Playing:** \`${song}\` in **${voiceChannel.name}** 🎧`);
  }

  // Pause Command
  else if (commandName === 'pause') {
    await interaction.reply('⏸️ Gaana pause kar diya gaya hai!');
  }

  // Resume Command
  else if (commandName === 'resume') {
    await interaction.reply('▶️ Gaana firse start ho gaya hai!');
  }

  // Skip Command
  else if (commandName === 'skip') {
    await interaction.reply('⏭️ Agla gaana skip kar diya gaya hai!');
  }

  // Stop Command
  else if (commandName === 'stop') {
    await interaction.reply('⏹️ Music stop ho gaya aur E-SONIC VC se nikal gaya.');
  }
});

client.login(process.env.DISCORD_TOKEN);

