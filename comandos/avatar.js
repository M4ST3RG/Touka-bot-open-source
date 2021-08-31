const { Discord, MessageEmbed } = require("discord.js");

module.exports.run = (client, message, args, opts) => {
    const mencionado = message.mentions.users.first() || message.author;

    const embed = new MessageEmbed()
    .setImage(mencionado.displayAvatarURL())
    .setColor("RANDOM")
    .setFooter(`Pedido por: ${mencionado.username}`)
    .setTimestamp()
    .setDescription(`Avatar de [**${mencionado.username}**](${mencionado.avatarURL()})`)

    message.channel.send({ embeds: [embed]})

}

module.exports.help = {
  name: "avatar",
  alias: ["icon"],
  category: "utiles",
  descripcion: "mostraré la foto de perfil de quien lo haga o menciones.",
  ayuda: "avatar <user>"
}