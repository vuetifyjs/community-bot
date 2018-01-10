// The MESSAGE event runs anytime a message is received
// Note that due to the binding of client to every event, every event
// goes `client, other, args` when this function is run.

module.exports = (client, message) => {
  if (!client.lastMessage) client.lastMessage = new Date();

  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if (message.author.bot) return;

  // Grab the settings for this server from the PersistentCollection
  // If there is no guild, get default conf (DMs)
  const settings = message.guild
    ? client.settings.get(message.guild.id)
    : client.config.defaultSettings;

  // For ease of use in commands and functions, we'll attach the settings
  // to the message object, so `message.settings` is accessible.
  message.settings = settings;

  // Also good practice to ignore any message that does not start with our prefix,
  // which is set in the configuration file.
  if (message.content.indexOf(settings.prefix) !== 0) {
    //Return if message is from anyone with an permission level higher than a user.
    if (settings.whitelist === "true"  && client.permlevel(message) > 0) return;

    //Check if the difference between the last help message and message is greater than time in config.js
    let diff = Math.floor((message.createdTimestamp - client.lastMessage) / 1000);
    if (diff > 0 && diff < (settings.helpTimeout * 60)) return;

    const keywords = settings.helpKeywords;
    const ignoreWords = settings.ignoreHelpKeywords;
    const helpChannel = settings.helpChannel;
    const bugChannel = settings.bugChannel;
    const helpChannelID = message.guild.channels.find('name', helpChannel);
    const bugChannelID = message.guild.channels.find('name', bugChannel);

    if (!helpChannelID || !bugChannelID) return;

    let msgWrongChannel = `It looks like you asked a question, but may be in the wrong channel. For help go to <#${helpChannelID.id}>, to report a bug, go to <#${bugChannelID.id}>.`;
    let msgReproduction = `It looks like you asked a question but did not provide a reproduction environment. You can create one at <${settings.codepenURL}>.`;

    let found = false;
    let rx = new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?");

    //Remove non alphaumeric characters
    let rxMessage = message.content.replace(/[^\w]/g, "");

    //Look for help keywords, if found, set found to true
    if (keywords.some(keyword => rxMessage.includes(keyword))) found = true;

    //Look for ignore help keywords, if found, set found to false
    //if (ignoreWords.some(keyword => rxMessage.includes(keyword))) found = false;
 
    if (found) {
      if (message.channel.name === helpChannel || message.channel.name === bugChannel) {
        if (!rx.test(message.content)) {
          message.reply(msgReproduction);
        }
      } else {
        message.reply(msgWrongChannel);
      }
  
      client.lastMessage = message.createdTimestamp;
    }

    return;
  }

  // Here we separate our "command" name, and our "arguments" for the command.
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // Get the user or member's permission level from the elevation
  const level = client.permlevel(message);

  // Check whether the command, or alias, exist in the collections defined
  // in app.js.
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
  // using this const varName = thing OR otherthing; is a pretty efficient
  // and clean way to grab one of 2 values!
  if (!cmd) return;

  // Check if cmd is enabled
  if (!cmd.conf.enabled) return;

  // Some commands may not be useable in DMs. This check prevents those commands from running
  // and return a friendly error message.
  if (cmd && !message.guild && cmd.conf.guildOnly)
    return message.channel.send("This command is unavailable via private message. Please run this command in a guild.");

  if (level < client.levelCache[cmd.conf.permLevel]) {
    if (settings.systemNotice === "true") {
      return message.channel.send(`You do not have permission to use this command.
            Your permission level is ${level} (${client.config.permLevels.find(l => l.level === level).name})
            This command requires level ${client.levelCache[cmd.conf.permLevel]} (${cmd.conf.permLevel})`);
    } else {
      return;
    }
  }

  // To simplify message arguments, the author's level is now put on level (not member so it is supported in DMs)
  // The "level" command module argument will be deprecated in the future.
  message.author.permLevel = level;
  
  message.flags = [];
  while (args[0] && args[0][0] === "-") {
    message.flags.push(args.shift().slice(1));
  }

  // If the command exists, **AND** the user has permission, run it.
  client.log("log", `${client.config.permLevels.find(l => l.level === level).name} ${message.author.username} (${message.author.id}) ran command ${cmd.help.name}`, "CMD");
  cmd.run(client, message, args, level);
};
