const { Discord, MessageEmbed, MessageAttachment } = require("discord.js");
const { createCanvas, loadImage, registerFont } = require('canvas');
registerFont('Gelion-SemiBold.ttf', { family: 'Gelion' });

module.exports.run = async (client, message, args, opts) => {
    const servers = await client.models.server.findById(message.guild.id);
    let u = message.mentions.users.first() || message.author;
    let mencionado = message.guild.members.cache.get(u.id)
    const users = await servers.get("users")
    const ord = new Map([...users.entries()].sort());
    let arrOrd = Array.from(ord.keys());

    if(!servers.users.has(mencionado.id)) return message.reply(`:x: ${mencionado} no tiene xp en este servidor.`)
    let { xp, nivel } = await servers.users.get(mencionado.id)
    let up = 6 * (nivel ** 2) + 70 * nivel + 200;

    const canvas = createCanvas(1077, 354);
    const ctx = canvas.getContext('2d');

    const fondo = await loadImage('./img/rank.png')
    ctx.drawImage(fondo, 0, 0, canvas.width, canvas.height);

    ctx.font = "48px Gelion";
    ctx.fillStyle = "#ffffff"
    ctx.fillText(mencionado.user.username, 430, 120, 334)

    ctx.font = "35px Gelion";
    ctx.fillStyle = mencionado.displayHexColor;
    ctx.fillText("#"+mencionado.user.discriminator, 430, 150, 334)

    ctx.fillStyle = '#fff';
    ctx.font = "35px Gelion";
    ctx.fillText(`Nivel: ${nivel}`, 420, 300)
    ctx.fillText(`XP: ${xp}/${up}`, 420, 270)
    
    const pi = Math.PI;
    let por = (xp/up)*100;
    let circulo = por*2/100;

    ctx.save();

    ctx.beginPath();
    ctx.strokeStyle = mencionado.displayHexColor;
    ctx.lineWidth = 4
    ctx.arc(177, 177, 174, 0, circulo*pi, false);
    ctx.stroke()
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(177, 177, 170, 0, pi * 2, true);
    ctx.clip();
    ctx.closePath();

    const avatar = await loadImage(mencionado.user.displayAvatarURL({ format: "jpg" }));
    ctx.drawImage(avatar, 0, 0, 350, 350);

    ctx.restore()
    
    ctx.beginPath();
    ctx.fillStyle = mencionado.displayHexColor;
    ctx.moveTo(294+5 , 149);
    ctx.arcTo(294, 149, 294, 205, 5);
    ctx.arcTo(294, 205, 413, 205, 5);
    ctx.arcTo(413, 205, 413, 149, 5);
    ctx.arcTo(413, 149, 294, 149, 5)
    ctx.fill();
    ctx.closePath();

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#fff";
    ctx.font = "50px Gelion";
    var height = 56;
    var width = 119;
    var posX = 294;
    var posY = 149;

    for (var i = 0; i < arrOrd.length; i++) {
        var n = i;
        if (arrOrd[i] == mencionado.id) {
            if ((i + 1) >= 1000) {
                n = (n + 1) / 1000
                n = n.toFixed(1)
                ctx.fillText(`${n}k`, posX+(width/2), posY+(height/2))
            }else{
                ctx.fillText(`${i+1}`, posX+(width/2), posY+(height/2))
            }
        }
    }

    const img = new MessageAttachment(canvas.toBuffer(), "levelup.png");

    message.reply({ files: [img], allowedMentions: { repliedUser: false }});
}

module.exports.help = {
  name: "rank",
  alias: [],
  category: "util",
  descripcion: "Tarjeta de rango",
  ayuda: "rank <user>"
}