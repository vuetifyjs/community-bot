const config = {
  // Bot Owner, level 10 by default. A User ID. Should never be anything else than the bot owner's ID.
  "ownerID": "349038518732980227",

  // Bot Admins, level 9 by default. Array of user ID strings.
  "admins": ["135847747122233344"],

  // Bot Support, level 8 by default. Array of user ID strings
  "support": [],

  // Your Bot's Token. Available on https://discordapp.com/developers/applications/me
  "token": "MzkzNDY1ODAxMTY2MDI4ODEw.DR2LOQ.BdxJ9UYGvVeS9MqZeFunViG5EKc",

  // Default per-server settings. New guilds have these settings. 

  // DO NOT LEAVE ANY OF THESE BLANK, AS YOU WILL NOT BE ABLE TO UPDATE THEM
  // VIA COMMANDS IN THE GUILD.
  
  "defaultSettings": {
    "prefix": "!",
    "helpChannel": "need-help",
    "bugChannel": "bugs",
    "modLogChannel": "mod-log",
    "modRole": "Moderator",
    "devRole": "Developer",
    "adminRole": "Administrator",
    "communityMgrRole": "Community Mgr",
    "welcomeEnabled": "true",
    "vuetifyURL": "https://vuetifyjs.com/",
    "codepenURL": "https://template.vuetifyjs.com/",
    "issueTrackerURL": "https://issues.vuetifyjs.com/",
    "releaseNotesURL": "https://github.com/vuetifyjs/vuetify/releases",
    "helpKeywords": ["can someone help", "please help", "i need help", "need help", "help I dont understand", "help me understand", "help plz", "plz help"],
    "ignoreHelpKeywords": ["thanks for the help", "thanks for helping"],
    "helpTimeout": "5",
    "allowDeleteMessages": "false",
    "whitelist": "true"
  },

  // PERMISSION LEVEL DEFINITIONS.

  permLevels: [
    // This is the lowest permisison level, this is for non-roled users.
    { level: 0,
      name: "User", 
      // Don't bother checking, just return true which allows them to execute any command their
      // level allows them to.
      check: () => true
    },

    // This is your permission level, the staff levels should always be above the rest of the roles.
    { level: 1,
      // This is the name of the role.
      name: "Moderator",
      // The following lines check the guild the message came from for the roles.
      // Then it checks if the member that authored the message has the role.
      // If they do return true, which will allow them to execute the command in question.
      // If they don't then return false, which will prevent them from executing the command.
      check: (message) => {
        try {
          const modRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.modRole.toLowerCase());
          return (modRole && message.member.roles.has(modRole.id));
        } catch (e) {
          return false;
        }
      }
    },

    { level: 2,
      name: "CommunityManager", 
      check: (message) => {
        try {
          const devRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.communityMgrRole.toLowerCase());
          return (devRole && message.member.roles.has(devRole.id));
        } catch (e) {
          return false;
        }
      }
    },

    { level: 3,
      name: "DevTeam", 
      check: (message) => {
        try {
          const devRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.devRole.toLowerCase());
          return (devRole && message.member.roles.has(devRole.id));
        } catch (e) {
          return false;
        }
      }
    },

    { level: 4,
      name: "Administrator", 
      check: (message) => {
        try {
          const adminRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.adminRole.toLowerCase());
          return (adminRole && message.member.roles.has(adminRole.id));
        } catch (e) {
          return false;
        }
      }
    },
    // This is the server owner.
    { level: 5,
      name: "Server Owner", 
      // Simple check, if the guild owner id matches the message author's ID, then it will return true.
      // Otherwise it will return false.
      check: (message) => message.channel.type === "text" ? (message.guild.owner.user.id === message.author.id ? true : false) : false
    },

    // Bot Support is a special inbetween level that has the equivalent of server owner access
    // to any server they joins, in order to help troubleshoot the bot on behalf of owners.
    { level: 8,
      name: "Bot Support",
      // The check is by reading if an ID is part of this array. Yes, this means you need to
      // change this and reboot the bot to add a support user. Make it better yourself!
      check: (message) => config.support.includes(message.author.id)
    },

    // Bot Admin has some limited access like rebooting the bot or reloading commands.
    { level: 9,
      name: "Bot Admin",
      check: (message) => config.admins.includes(message.author.id)
    },

    // This is the bot owner, this should be the highest permission level available.
    // The reason this should be the highest level is because of dangerous commands such as eval
    // or exec (if the owner has that).
    { level: 10,
      name: "Bot Owner", 
      // Another simple check, compares the message author id to the one stored in the config file.
      check: (message) => message.client.config.ownerID === message.author.id
    }
  ]
};

module.exports = config;
