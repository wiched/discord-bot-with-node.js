const commando = require('discord.js-commando');
const Discord = module.require('discord.js');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
var url = 'mongodb://atlantius:idioticons@ds235169.mlab.com:35169/devbot';

class Roulette extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'roulette',
      group: 'game',
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
                if (gamble > numItems.xp) {
                  message.reply('Sorry but you do not have the XP to enter the game');
                  console.log(`I am ${message.author.username} and my id is ${message.author.id}`)
                  console.log(`I gamble with ${numItems.xp} but i need ${gamble}`)
                  return
                }
                if (!args) {

                  message.channel.send(
                    'You have to enter number that you want to gamble with'
                  );
                  return
                }

                if (roll > 4) {
                  console.log(roll)
                  db
                    .collection('test')
                    .update(
                      { id: message.author.id },
                      { $inc: { xp: parseInt(gamble) * 2 } },
                      false
                    );
                  message.reply(
                    `Amazing! You rolled a ${roll} and won ${gamble * 2} points`
                  );
                } else if (roll <= 4) {
                  console.log(roll)
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
