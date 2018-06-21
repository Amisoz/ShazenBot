const Discord = require("discord.js");
var bot = new Discord.Client();
var logChannel = '457612965470797825';
var idBot = '457614601723576330';
var idNewRole = '457839811303178250';
var idRoleChannel = '459434388657274880';

bot.on("ready", function(){
    bot.user.setPresence({ game: { name: 'https://discord.gg/SHZGFBs', type: 0 } });
    console.log("Bot prêt");

    bot.channels.get(idRoleChannel).bulkDelete(1);
    
    bot.channels.get(idRoleChannel).send("Vous avez la possibilité d'obtenir les rôles suivant les jeux que vous jouez.\nPour ceci, cliquez sur les logos correspondant.\nCela vous permet de parler dans les canaux liés à ce dernier.\nInutile de prendre tous les rôles dans l'unique but de pouvoir parler partout.")
            .then(function (message) {
              message.react("458345217712455681");
              message.react("459127446063546379");
              message.react("459127531442929667");
              message.react("459127299988652053");
              message.react("459125423985393675");
              message.react("459124825898745870");
              message.react("459127889216929796");
              message.react("459128122831405066");
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
        "fortnite": "458350720421199873",
        "rust": "459119782852034561",
        "leagueoflegend" : "459119815424999435",
        "rocketleague": "459119705001558028",
        "raimbowsix": "459119653760008214",
        "ark": "459119588576329738",
        "pubg": "459119409840259072",
        "smite": "459119552484081665"
    };
  
    if (!roles[reaction.emoji.name]) return;
    const guild = reaction.message.guild;
    const role = guild.roles.get(roles[reaction.emoji.name]);  
    guild.members.get(user.id).addRole(role).then(_ => console.log("Rôle ajouté")).catch(console.error)
});

bot.on('messageReactionRemove', (reaction, user) => {
    if (user.bot) return;
    
    const roles = {
        "fortnite": "458350720421199873",
        "rust": "459119782852034561",
        "leagueoflegend" : "459119815424999435",
        "rocketleague": "459119705001558028",
        "raimbowsix": "459119653760008214",
        "ark": "459119588576329738",
        "pubg": "459119409840259072",
        "smite": "459119552484081665"
    };
  
    if (!roles[reaction.emoji.name]) return;
    const guild = reaction.message.guild;
    const role = guild.roles.get(roles[reaction.emoji.name]);  
    guild.members.get(user.id).removeRole(role).then(_ => console.log("Rôle retiré")).catch(console.error)
});

bot.login(process.env.TOKEN);
