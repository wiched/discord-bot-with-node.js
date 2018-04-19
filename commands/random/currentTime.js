const commando = require('discord.js-commando');

class CurrentTime extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'time',
      group: 'random',
      memberName: 'time',
      description: 'Get the current time'
    });
  }

  async run(message, args) {
    function currentTime(message) {
      const time = new Date().toLocaleTimeString();
      message.channel.send(time);
    }
    if (message.content === '!time') {
      currentTime(message);
    }
  }
}

module.exports = CurrentTime;
