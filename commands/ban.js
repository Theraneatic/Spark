const n = require("../n.json");
const Discord = require("discord.js");
const human = require('humanize');
exports.run = (client, message, args) => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.member.hasPermission("BAN_MEMBERS") && message.author.id !== n.oID) {
    message.channel.send("You are missing the permission(s): Ban Members.");
  } else {
    let time = new Date();
    function amPm() {
      if (time.getHours() >= 11) {
        return "PM";
      } else return "AM";
    }
    var testCont = message.content.split(" ");
    var content = message.content.split(" ").slice(2).join(' ');
    var banned = message.mentions.users.first();
    if (message.mentions.users.size < 1) {
      message.channel.send("You must provide a user to ban!");
    } else if (testCont.length <= 2) {
      message.channel.send("Please provide a reason for the ban.");
    } else if (message.guild.member(banned).bannable) {
      client.users.get(banned.id).send(`You have been banned from ${message.guild.name} for: ${content} by ${message.author.username}`);
      message.guild.member(banned).ban().then(banned => {
        var embed = new Discord.RichEmbed()
        .setTitle("Ban")
        .setDescription(`Banned ${banned.displayName}.`)
        .setAuthor(message.author.username + "#" + message.author.discriminator, `${message.author.avatarURL}`)
        .addField("Time",
          `Ban occured at ${human.date('m-d-y | h:i:s', new Date())} ${amPm()}`)
        .addField("Moderator",
          `Ban administered by ${message.author.username}#${message.author.discriminator}`)
        .addField("Reason",
          `${content}`)
        .setColor("#ff0000")
        .setTimestamp()
        message.channel.send(embed);
      });
    } else message.channel.send("I am unable to ban that member.");
  }
}
