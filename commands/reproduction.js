exports.run = async (client, message, args, level) => {
    let member = message.mentions.members.first();
    let msg;

    if(member) {
        msg = `${member}, please provide a reproduction environment.`;
    } else {
        msg = `Please provide a reproduction environment.`;
    }

    msg += ` You can find a codepen template at <${client.config.defaultSettings.codepenURL}>.`
    
    message.delete()
        .catch(client.log("log", "No permission to delete message", "Command"));
    message.channel.send(msg);
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Moderator"
  };
  
  exports.help = {
    name: "repro",
    category: "Mod",
    description: "Let a user know they need to provide a test environment.",
    usage: "repro"
  };
  