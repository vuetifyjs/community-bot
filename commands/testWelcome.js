exports.run = async (client, message) => {
    client.emit("guildMemberAdd", message.member);
  };
  
  exports.conf = {
    enabled: false,
    guildOnly: true,
    aliases: ["tw"],
    permLevel: "Administrator"
  };
  
  exports.help = {
    name: "testwelcome",
    category: "Test Commands",
    description: "Test Welcome command.",
    usage: "testwelcome"
  };
  