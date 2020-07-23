const Discord = require('discord.js');
const fs = require('fs');
module.exports.run = async (client, message, args, hypixel) => {
  let name = args.join(" ");
  hypixel.getPlayer(name).then(async (player) => {
    if(!player) return;
    let game = player.stats
    const embed = new Discord.MessageEmbed()
    .setAuthor(player.nickname)
    .setDescription("Murder Mystery Stats")
    .addField('Wins', game.murdermystery.wins, true)
    .addField('Total Games', game.murdermystery.playedGames, true)
    .addField('Kills', game.murdermystery.kills, true)
    .addField('Won as murderer', game.murdermystery.winsAsMurderer, true)
    .addField('Won as detective', game.murdermystery.winsAsDetective, true)
    .addField('Coins', game.murdermystery.coins, true)
    .setThumbnail(`http://cravatar.eu/helmhead/${name}.png`)
    if (player.isOnline != false){
      embed.setColor("#51eb39")
      embed.setFooter("User is currently online")
    }else{
      embed.setColor("#eb3939")
      embed.setFooter("User is currently offline")
    }
    message.channel.send({embed})
}).catch((err) => {
    console.log(err)
    message.reply("The player you specified doesn't exist or hasn't joined the hypixel network")
})
}
module.exports.help = {
  name: 'murdermystery'
}
