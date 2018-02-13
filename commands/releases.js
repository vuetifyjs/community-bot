exports.run = async (client, message) => {
    const msg = {
        embed: {
          color: 3447003,
          description: `You can find the release notes at <${client.config.defaultSettings.releaseNotesURL}>.`
        }
      }

      message.channel.send(msg);
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["rel"],
    permLevel: "Moderator"
  };
  
  exports.help = {
    name: "release",
    category: "Mod",
    description: "Provide the link to the Vuetify release notes.",
    usage: "release"
  };
  