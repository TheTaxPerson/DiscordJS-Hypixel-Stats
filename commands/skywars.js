const Discord = require('discord.js');
const fs = require('fs');
module.exports.run = async (client, message, args, hypixel) => {
  let name = args.join(" ");
  hypixel.getPlayer(name).then(async (player) => {
    if(!player) return;
    let game = player.stats
    const embed = new Discord.MessageEmbed()
    .setAuthor(player.nickname)
    .setDescription("Skywars Stats")
    .addField('Total Games', game.skywars.playedGames, true)
    .addField('Wins', game.skywars.wins, true)
    .addField('Kills', game.skywars.kills, true)
    .addField('Coins', game.skywars.coins, true)
    .addField('Souls', game.skywars.souls, true)
    .addField('Level', game.skywars.level, true)
    .addField('KDR', game.skywars.KDRatio, true)
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
  name: 'skywars'
}
