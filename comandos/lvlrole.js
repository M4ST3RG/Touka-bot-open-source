const { Discord, MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args, opts) => {
    let servers = await client.models.server.findById(message.guild.id);
    let rolesSave = await servers.get("roles")

    function SearchRole(k){
        var res = [false];
        rolesSave.forEach(async(key, r, map)=> {
            if(key === k){
                res = [true, r]
            }
        })
        return res
    }

    if(!args[0]){
        const alert = new MessageEmbed()
        .setAuthor(' || Error de sintaxis', message.author.displayAvatarURL())
        .setDescription(`\`\`${opts.prefix}${exports.help.ayuda}\`\``)
        .setFooter('<opcional> [obligatorio]')
        .setColor('#ba0606')

        message.channel.send({ embeds: [alert]})
    }else if(args[0] == 'delete' || args[0] == "remove"){
        if(!args[1]){
            const alert = new MessageEmbed()
            .setAuthor(' || Error de sintaxis', message.author.displayAvatarURL())
            .setDescription(`\`\`${opts.prefix}${exports.help.ayuda}\`\``)
            .setFooter('<opcional> [obligatorio]')
            .setColor('#ba0606')
    
            message.channel.send({ embeds: [alert]})
        }else{
            const rol = message.guild.roles.cache.find(r => r.name == args[1]) || message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);

            if(!message.member.permissions.has('MANAGE_GUILD')) return message.reply(":x: No tienes permisos para hacer esta acción.")
            if(!rol) return message.reply(':x: No encuentro este rol en el servidor.')
            if(!rolesSave || !SearchRole(rol.id)) return message.reply(':x: No encuentro ese rol en la base de datos.')
            
            let borrar = SearchRole(rol.id)[1]

            rolesSave.delete(borrar)

            servers.set(rolesSave)
            servers.save()

            const embed = new MessageEmbed()
            .setAuthor(' || Cambio exitoso', message.author.displayAvatarURL())
            .setDescription(`:white_check_mark: El rol se ha borrado correctamente de la lista.`)
            .setColor('#4aff5f')
            .setTimestamp()
    
            message.channel.send({ embeds: [ embed ]})

        }
    }else{
        const rol = message.guild.roles.cache.find(r => r.name == args[0]) || message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
        let num = args[1];

        if(!message.member.permissions.has('MANAGE_GUILD')) return message.reply(":x: No tienes permisos para hacer esta acción.")
        if(!rol) return message.reply(':x: No encuentro este rol en el servidor.')
        if(!num || isNaN(num)) return message.reply(':x: Especifica en que nivel ses consigue este rol.')
        num = parseInt(num)+'';

        seachred = SearchRole(rol.id)
        if(seachred[0] || rolesSave.has(num)) return message.reply(':x: No puedes poner el mismo rol 2 veces o usar el mismo nivel 2 veces')


        rolesSave.set(num, rol.id)
        servers.save()

        const embed = new MessageEmbed()
        .setAuthor(' || Cambio exitoso', message.author.displayAvatarURL())
        .setDescription(`:white_check_mark: El rol \`\`${rol.name}\`\` se asignará al nivel ${num}`)
        .setColor('#4aff5f')
        .setTimestamp()

        message.channel.send({ embeds: [ embed ]})
    }
}

module.exports.help = {
  name: "lvlrole",
  alias: ['lvlrol', "lvlr"],
  category: "config",
  descripcion: "Añadirá un rol a la lista de roles por nivel",
  ayuda: "lvlrole <remove> [rol] <nivel>"
}