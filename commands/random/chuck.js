const commando = require('discord.js-commando');
const Chuck  = require('chucknorris-io'),
      client = new Chuck();

class ChuckJoke extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'chuck',
      group: 'random',
      memberName: 'chuck',
      description: 'Get a random chuck norris joke'
    });
  }

  async run(message, args) {
    client.getRandomJoke().then(function (response) {
      console.log(response)
      message.channel.send(response.value)
  }).catch(function (err) {
     console.log(err)
  });
  }
}

module.exports = ChuckJoke;
