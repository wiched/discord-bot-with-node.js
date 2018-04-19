const config = require("../../config.json");
const fs = require("fs")

const commando = require('discord.js-commando');
const Chuck  = require('chucknorris-io'),
      client = new Chuck();

class PrefixChange extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'newprefix',
      group: 'moderator',
      memberName: 'newprefix',
      description: 'Change the command prefix sign'
    });
  }

  async run(message, args) {

// Change the prefix

if (message.content.startsWith(config.prefix + "prefix")) {
  let newPrefix = message.content.split(" ").slice(1, 2)[0];
  config.prefix = newPrefix;
  fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
}
  }
}

module.exports = PrefixChange;
