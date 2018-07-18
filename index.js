const Discord = require("discord.js");
const fs = require("fs");
const moment = require("moment");
const ms = require("ms");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const colors = require("colors");
let dev = "406819407097233430";


fs.readdir("./comenzi/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Nu s-au gasit comenzi.".red);
    return;
  }

  console.log("——————————————————————————————————————".green);
  jsfile.forEach((f, i) =>{
    let props = require(`./comenzi/${f}`);
    console.log(`[———] ${f} a fost incarcat cu succes. [———]`.green);
    bot.commands.set(props.help.name, props);
  });
})

bot.on("ready", async () => {
  console.log("——————————————————————————————————————".green);
  console.log("Sunt in " + bot.guilds.size + " servere.");

});

bot.on('guildMemberAdd', member => {
  member.guild.channels.get("469275607881089025").setName(`🏆 Total Membrii: ${member.guild.memberCount}`)

  member.guild.channels.get("469275697353850881").setName(`⚽ Newest: ${member.user.username}`)

  member.guild.channels.get("469275809035583508").setName(`📝 Goal: ${member.guild.memberCount}/100`)

    let canal = member.guild.channels.find('id', '469264668540796940');
    canal.send("[**+**] " + member.user.tag + "");
});

bot.on('guildMemberRemove', member => {
  member.guild.channels.get("469275607881089025").setName(`🌐 Total Membrii: ${member.guild.memberCount}`)

  member.guild.channels.get("469275697353850881").setName(`👤 Newest: ${member.user.username}`)

  member.guild.channels.get("469275809035583508").setName(`⭐ Goal: ${member.guild.memberCount}/100`)

    let canal = member.guild.channels.find('id', '469264668540796940');
    canal.send("[**-**] " + member.user.tag + "");
});


bot.on("message", async message => {

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  const ceva = ["https://", "http://", "www.", "discord.gg", ".gg", ".rip", ".me"];
  if(ceva.some(cuvant => message.content.includes(cuvant)) ) {
    if(message.member.hasPermission("ADMINISTRATOR")) return;
    message.channel.send("Reclama nu e permisa, " + message.author + ".");
   message.delete();
 }
  if(message.content.indexOf("-") !== 0) return;

  let prefix = "-";
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);


});

bot.login("NDY5MjcxNDMyODc5NDA3MTA3.DjFVug.VqX_5QKmL2lRUrIL40isGGMxGF");
