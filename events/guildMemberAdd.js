// This event executes when a new member joins a server. Let's welcome them!

module.exports = (client, member) => {
  const settings = client.settings.get(member.guild.id);

  // If welcome is off, don't proceed (don't welcome the user)
  if (settings.welcomeEnabled !== "true") return;

  const message = {
    embed: {
      color: 3447003,
      title: `${member.displayName}, Welcome to the Vuetify Discord Channel!`,
      author: {
        name: "Vuetify Dev Team",
        url: settings.vuetifyURL
      },
      description: "Here are some helpful tips to get the most out of this channel.",
      fields: [
        {
          name: "Channels",
          value: `**1.** Use the appropriate channels for your topic (ie: use need-help for help related topics).
          \n**2.** Please don't paste code dumps into the chat unless requested by another user.
          \n**3.** Please provide a basic codepen with relevant details only.`
        },
        {
          name: "Codepen",
          value: `Here is a Codepen template to be used when providing code. [${settings.codepenURL}](${settings.codepenURL})`
        },
        {
          name: "Documentation",
          value: `You can visit the official documentation @ [vuetifyjs.com](${settings.vuetifyURL}).`
        }
      ],
      timestamp: new Date()
    }
  }

  member.send(message).catch(console.error);
};
