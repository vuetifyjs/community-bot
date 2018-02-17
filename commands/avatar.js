exports.run = async (client, message, args, level) => {
    let member = message.mentions.members.first();
    let msg;

    if(member) {
        msg = `${member}, please add an avatar. This helps us identify who you are. Plus, it makes you look cool!`;
    } else {
        client.log("log", "No member entered.", "Command");
        return;
    }
    
    if (client.config.defaultSettings.allowDeleteMessages === "true" && message.guild.me.hasPermission('MANAGE_MESSAGES')) {
        message.delete()
            .catch(err => {
                client.log("error", err, " Avatar Command")
            });
    } else {
        if (client.config.defaultSettings.allowDeleteMessages === "true") client.log("log", "No permission to delete message", "Command");
    }


    let channelID = args[1].replace(/[#<>]/gi, '');
    let channel = client.channels.get(channelID);

    if (channel) {
        channel.send(msg).catch(console.error);
    } else {
        message.channel.send(msg).catch(console.error);
    }
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["a"],
    permLevel: "Moderator"
  };
  
  exports.help = {
    name: "avatar",
    category: "Mod",
    description: "Recommend to a user to add an avatar.",
    usage: "avatar"
  };
  