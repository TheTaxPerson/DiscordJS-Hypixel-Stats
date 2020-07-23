const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
const config = require("./config.json");
const prefix = config.prefix
const Hypixel = require('hypixel-api-reborn');
const hypixel = new Hypixel.Client(config.hypixelapi);
client.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0) {
    console.log(new Error("An error occurred!"));
    process.exit(1);
    return;
  }

  jsfile.forEach((f) =>{
    let props = require(`./commands/${f}`);
    console.log(`Loaded ${f}.`);
    client.commands.set(props.help.name, props);
  });
})

if (process.version.slice(1).split('.')[0] < 8) {
  console.log(new Error(`You must have NodeJS 12.x or higher installed on your PC.`));
  process.exit(1);
};

client.login(config.token)

client.on('ready', () => {
  console.log("I'm online")
});
client.on("message", (message) => {

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  let messageArray = message.content.toLowerCase().split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(!message.content.startsWith(prefix)) return;
  let commandfile = client.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(client,message,args,hypixel);


});
