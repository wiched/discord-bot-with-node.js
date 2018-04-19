const commando = require('discord.js-commando');

class Coffee extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'coffee',
      group: 'random',
      memberName: 'coffee',
      description: 'Get a cup of coffee'
    });
  }

  async run(message, args) {
    if (message.content === '+coffee') {
      message.channel.send('☕');
    }
  }
}

module.exports = Coffee;
