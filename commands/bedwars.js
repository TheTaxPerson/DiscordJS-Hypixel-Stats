const Discord = require('discord.js');
const fs = require('fs');
module.exports.run = async (client, message, args, hypixel) => {
  let name = args.join(" ");
  hypixel.getPlayer(name).then(async (player) => {
    if(!player) return;
    let game = player.stats
    const embed = new Discord.MessageEmbed()
    .setAuthor(player.nickname)
    .setDescription("Bedwars Stats")
    .addField('Total Games', game.bedwars.playedGames, true)
    .addField('Wins', game.bedwars.wins, true)
    .addField('Kills', game.bedwars.kills, true)
    .addField('Final Kills', game.bedwars.finalKills, true)
    .addField('Coins', game.bedwars.coins, true)
    .addField('Level', game.bedwars.level, true)
    .addField('KDR', game.bedwars.KDRatio, true)
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
  name: 'bedwars'
}
