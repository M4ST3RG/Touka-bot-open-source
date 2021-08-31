const { Discord, MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args, opts) => {
    let servers = await client.models.server.findById(message.guild.id);

    if(!args[0]){
        const alert = new MessageEmbed()
        .setAuthor(' || Error de sintaxis', message.author.displayAvatarURL())
        .setDescription(`\`\`${opts.prefix}${exports.help.ayuda}\`\``)
        .setFooter('<opcional> [obligatorio]')
        .setColor('#ba0606')

        message.channel.send({ embeds: [alert]})
    }else{

        if(!message.member.permissions.has('MANAGE_GUILD')) return message.reply(":x: No tienes permisos para hacer esta acción.")

        servers.set('prefix', args[0])
        servers.save()

        const embed = new MessageEmbed()
        .setAuthor(' || Cambio exitoso', message.author.displayAvatarURL())
        .setDescription(`:white_check_mark: El cambio fue hecho correctamente, el prefijo ahora es \`\`${args[0]}\`\``)
        .setColor('#4aff5f')
        .setTimestamp()

        message.channel.send({ embeds: [ embed ]})
    }
}

module.exports.help = {
  name: "prefix",
  alias: [],
  category: "config",
  descripcion: "Cambiará el prefijo del bot",
  ayuda: "prefix [prefijo nuevo]"
}