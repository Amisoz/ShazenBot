const Discord = require("discord.js");
var bot = new Discord.Client();
var logChannel = '457612965470797825';
var idBot = '457614601723576330';

bot.on("ready", function(){
    bot.user.setPresence({ game: { name: 'https://discord.gg/SHZGFBs', type: 0 } });
})  

bot.on("messageDelete", message => {
    var sender = message.author;
    var msg = message.content;
    
    if(sender.id == idBot) return;

    /** Logs de message (modération) */
    var date = new Date();
    var dateResult = date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear() + " à " + date.getHours() + ":" + date.getMinutes();   

    bot.channels.get(logChannel).send([dateResult] + " " + sender.username + " - " + message.channel.name + " : " + msg);
    
    /** Fin de log */
})

bot.login(process.env.TOKEN);
