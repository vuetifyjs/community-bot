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

    message.channel.send(msg);
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
  