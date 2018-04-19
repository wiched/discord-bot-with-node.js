const commando = require('discord.js-commando');

class Tea extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'tea',
      group: 'random',
      memberName: 'tea',
      description: 'Get a cup of tea'
    });
  }

  async run(message, args) {
    if (message.content === '+tea') {
      message.channel.send('☕');
    }
  }
}

module.exports = Tea;
