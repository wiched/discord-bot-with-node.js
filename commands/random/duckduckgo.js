const commando = require('discord.js-commando');
const ddg = require('ddg');

class Duck extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'wiki',
      group: 'random',
      memberName: 'wiki',
      description: 'Check something on wikipedia'
    });
  }

  async run(message, args) {
    ddg.query(args, function(err, data){
    message.channel.send(data.AbstractURL)
    });
  }
}

module.exports = Duck;
