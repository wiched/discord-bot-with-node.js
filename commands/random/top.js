const commando = require('discord.js-commando');
const Discord = module.require('discord.js');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
var url = 'mongodb://atlantius:idioticons@ds235169.mlab.com:35169/devbot';

class Top extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'top',
      group: 'random',
      memberName: 'top',
      description: 'Check the game Top statistics'
    });
  }

  async run(message, args) {
    // console.log(message)

    MongoClient.connect(url, function(err, client) {
      if (err) throw err;
      var db = client.db('devbot');
      const resultCursor = db
        .collection('test')
        .find({})
        .sort({ xp: -1 })
        .limit(8)
        .toArray()
        .then(value => {
          let embed = new Discord.RichEmbed();
          embed.setTitle('Top Members');
          embed.setDescription('The most active members by their level');
          value.forEach(result => {
            embed.addField('Name', result.name, true);
            embed.addField('Level', result.level, true);
            embed.addField('XP', result.xp, true);
          });
          embed.setFooter(`Written by DevBot`);

          message.channel.send({ embed });
        });
      client.close();
    });
  }
}

module.exports = Top;
