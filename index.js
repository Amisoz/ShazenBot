const Discord = require("discord.js");
var bot = new Discord.Client();
var logChannel = '457612965470797825';
var idBot = '457614601723576330';
var idNewRole = '457839811303178250';
var idRoleChannel = '458343998403379200';

bot.on("ready", function(){
    bot.user.setPresence({ game: { name: 'https://discord.gg/SHZGFBs', type: 0 } });
    console.log("Bot prêt");

    
    bot.channels.get(idRoleChannel).send("Vous avez la possibilitée d'obtenir le rôle 'Fortnite' vous permettant de montrer que vous êtes un joueur.\nAfin de l'obtenir, réagissez à ce message en cliquant sur le "+ bot.emojis.get("458345217712455681") +". Si vous ne le voulez plus, retirez votre réaction.\nNote : Il n'ajoute aucunes permissions, prenez-le seulement si vous jouez.")
            .then(function (message) {
              message.react("458345217712455681");
            }).catch(function() {
              console.log("Erreur lors de l'envoie du message.");
             });
})  

bot.on("guildMemberAdd", member => {
    var role = member.guild.roles.get(idNewRole);
    member.addRole(role);
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

bot.on('messageReactionAdd', (reaction, user) => {
    if (user.bot) return;
    if (reaction.message.channel.id != idRoleChannel) return;

    const roles = {
        "fortnite": "458350720421199873"
    };
  
    if (!roles[reaction.emoji.name]) return;
    const guild = reaction.message.guild;
    const role = guild.roles.get(roles[reaction.emoji.name]);  
    guild.members.get(user.id).addRole(role).then(_ => console.log("Rôle ajouté")).catch(console.error)
});

bot.on('messageReactionRemove', (reaction, user) => {
    if (user.bot) return;
    if (reaction.message.channel.id != idRoleChannel) return;
    
    const roles = {
        "fortnite": "458350720421199873"
    };
  
    if (!roles[reaction.emoji.name]) return;
    const guild = reaction.message.guild;
    const role = guild.roles.get(roles[reaction.emoji.name]);  
    guild.members.get(user.id).removeRole(role).then(_ => console.log("Rôle retiré")).catch(console.error)
});

bot.login(process.env.TOKEN);
