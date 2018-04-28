const Discord = require('discord.js');
const commando = require('discord.js-commando');
const config = require("./config.json");

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
var url = 'mongodb://atlantius:idioticons@ds235169.mlab.com:35169/devbot'

MongoClient.connect(url, function (err, client) {
  if (err) throw err;
  var db = client.db('devbot');
  db.collection('test').findOne({}, function (findErr, result) {
    if (findErr) throw findErr;
    console.log(result.name);
    console.log('Connected to mlab')
    client.close();
  });
});

function generateXp() {
  let min = 10
  let max = 30
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const bot = new commando.Client({
  commandPrefix: '+',
  owner: config.ownerID,
  unknownCommandResponse: false,
  disableEveryone: true
});

bot.registry.registerGroup('random', 'Random');
bot.registry.registerGroup('moderator', 'Moderator');
bot.registry.registerGroup('game', 'Game');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + '/commands');

// points system
bot.login(config.token);
bot.on('guildMemberAdd', member => {
  member.guild.channels.get('435661684200308739').send(`Welcome to Keep On Hacking, ${member.toString()}`);
});

// Console log if bot is connected successfully

bot.on("message", message => {
  let command = message.content.split(" ")[0];
  let args = message.content.split(" ").slice(1);

  if (command === "!say") {
    message.delete()
    message.channel.send(args.join(" "));
  }
})


bot.on('ready', () => console.log('DevBot is connected!'))
bot.on("message", (message) => {
  MongoClient.connect(url, function (err, client) {
    if (err) throw err;
    var db = client.db('devbot');

    db.collection('test').findOne({ id: message.author.id }, function (findErr, result) {

      if (message.author.name == "DevBot" || message.author.id == "435773786982187028") return;
      if (findErr) throw findErr;
      if (result === null || result.length < 1) {
        // select author id and run generate xp

        db.collection('test').insert({ xp: generateXp(), id: `${message.author.id}`, level: 0, name: `${message.author.username}` });
        //  console.log('no info about that user')
      } else {


        db.collection('test').update({ id: message.author.id }, { $inc: { xp: generateXp() } }, false);

        let xp = db.collection('test').findOne({ id: message.author.id }).then(function (numItems) {
          //  console.log(numItems)
          let curLevel = Math.floor(0.1 * Math.sqrt(numItems.xp));
          if (curLevel > numItems.level) {
            // Level up!
            console.log(curLevel)
            db.collection('test').updateOne({ id: message.author.id }, { $set: { "level": curLevel } })

            message.reply(`You"ve leveled up to level **${curLevel}**! Ain"t that dandy?`);
          }
        })

      }

    });

  });
});


