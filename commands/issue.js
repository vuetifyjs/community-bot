exports.run = async (client, message) => {
    const msg = {
        embed: {
          color: 3447003,
          description: `Please create a bug report using the [Vuetify Issue Tracker](${client.config.defaultSettings.issueTrackerURL}).`
        }
      }

      message.channel.send(msg);
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["i"],
    permLevel: "Moderator"
  };
  
  exports.help = {
    name: "issue",
    category: "Mod",
    description: "Provide the link to the Vuetify issue tracker.",
    usage: "issue"
  };
  