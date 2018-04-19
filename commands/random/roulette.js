const commando = require('discord.js-commando');
const Discord = module.require('discord.js');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
var url = 'mongodb://atlantius:idioticons@ds235169.mlab.com:35169/devbot';

class Roulette extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'roulette',
      group: 'random',
      memberName: 'roulette',
      description: 'Gamble with your experience'
    });
  }

  async run(message, args) {
    // console.log(message)
    let target = message.mentions.users.first() || message.author;

    MongoClient.connect(url, function (err, client) {
      if (err) throw err;
      var db = client.db('devbot');
      db
        .collection('test')
        .findOne({ id: `${message.author.id}` }, function (findErr, result) {
          if (findErr) throw findErr;
          let xp = db
            .collection('test')
            .findOne({})

            .then(function (numItems) {
              let gamble = Number(args);
              if (!isNaN(gamble)) {
                const roll = Math.floor(Math.random() * 6) + 1;
                if (gamble > numItems.xp) return;

                if (roll >= 3) {
                  db
                    .collection('test')
                    .update(
                      { id: message.author.id },
                      { $inc: { xp: parseInt(gamble) } },
                      false
                    );
                  message.reply(
                    `Amazing! You rolled a ${roll} and won ${gamble} points`
                  );
                } else {
                  db
                    .collection('test')
                    .update(
                      { id: message.author.id },
                      { $inc: { xp: - parseInt(gamble) } },
                      false
                    );
                  message.reply(
                    `Sorry but you rolled a ${roll}. You lose ${gamble} points`
                  );
                }
              } else {
                message.channel.send(
                  'You have to enter number that you want to gamble with'
                );
              }

              //  message.channel.send({embed});
            })
            .catch(err => {
              console.log(err);
            });
        });
    });
  }
}

module.exports = Roulette;
