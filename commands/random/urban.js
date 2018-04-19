const commando = require('discord.js-commando');
const Discord = module.require('discord.js');
const urban = module.require('urban');

class Urban extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'urban',
      group: 'random',
      memberName: 'urban',
      description: 'Check something in Urban Dictionary'
    });
  }

  async run(message, args) {

    if(args < 1) return message.channel.send('Please enter something');
    urban(args).first(json => {
      if(!json) return message.channel.send('No results found');
      // console.log(json)
      let embed = new Discord.RichEmbed()
      .setTitle(json.word)
      .setDescription(json.definition)

      .addField('Upvotes', json.thumbs_up, true)
      .addField('Downvotes', json.thumbs_down, true)
      // .addField('Example', json.example, true)
      .setFooter(`Written by ${json.author}`)
      if(!json.word) return message.channel.send('No results found');
      message.channel.send({embed});
    })
    // console.log(args)
  }
}

module.exports = Urban;
