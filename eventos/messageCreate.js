const { MessageAttachment, Discord } = require("discord.js");
const { loadImage, createCanvas, registerFont } = require('canvas')
registerFont('Gelion-SemiBold.ttf', { family: 'Gelion' });

module.exports = async (client, message) => {
  let servers = await client.models.server.findById(message.guild.id);
    if(message.author.bot) return;

    let prefix = servers.prefix ? await servers.get('prefix') : '--';

    if(!message.content.startsWith(prefix)) {
      let users = await servers.get("users")
      let roles = await servers.get("roles")
      let persona = message.author.id;

      if(!users.has(persona)){
        users.set(persona, { 'nivel': 1, "xp": 0 })
        servers.save()
      }else{
        let { xp, nivel } = await users.get(message.author.id)
        let randomXP = Math.floor(Math.random() * 9) + 10;
        let up = 6 * (nivel ** 2) + 70 * nivel + 200;

        if((xp + randomXP) >= up){

          const canvas = createCanvas(100, 144);
          const ctx = canvas.getContext('2d');

          const fondo = await loadImage('./img/levelup.png')
          ctx.drawImage(fondo, 0, 0, canvas.width, canvas.height);

          ctx.font = "14px Gelion";
          ctx.fillStyle = "#ffffff"
          ctx.fillText('LEVEL UP!', 15, 117)

          var r = 10;

          ctx.beginPath();
          ctx.fillStyle = message.member.displayHexColor;
          ctx.moveTo(0, 144 - r);
          ctx.arcTo(0, 144, 100, 144, r);
          ctx.arcTo(100, 144, 100, 51, r);
          ctx.arcTo(100, 51, 96, 51, r);
          ctx.arcTo(96, 51, 96, 140, r);
          ctx.arcTo(96, 140, 4, 140, r);
          ctx.arcTo(4, 140, 4, 51, r);
          ctx.arcTo(4, 51, 0, 51, r);
          ctx.fill();
          ctx.closePath();


          ctx.beginPath();
          ctx.arc(50, 50, 50, 0, Math.PI * 2, true);
          ctx.closePath();
          ctx.clip();

          const avatar = await loadImage(message.author.displayAvatarURL({ format: "png" }));
          ctx.drawImage(avatar, 0, 0, 100, 100);

          const img = new MessageAttachment(canvas.toBuffer(), "levelup.png");

          message.channel.send({ files: [img] });

          if(roles.has((nivel+1)+'')){
            var add = message.guild.roles.cache.get(roles.get((nivel+1)+''))
            message.member.roles.add(add)
          }

          users.set(message.author.id, {'nivel': nivel+1, 'xp': 0 })
          servers.save()

        }else{
          users.set(message.author.id, {'nivel': nivel, 'xp': (xp + randomXP) })
          servers.save()
        }
      }
    }

    if (message.content.indexOf(prefix) !== 0) return;
      let opts = {
      ownerID: "310265734074728448",
      prefix: prefix
    };

      let messageArray = message.content.split(" ")
      let cmd = messageArray[0];
      let args = messageArray.slice(1);

      let commandfile = client.commands.get(cmd.slice(prefix.length)) || client.commands.get(client.alias.get(cmd.slice(prefix.length)))
      if(commandfile) commandfile.run(client, message, args, opts)
  };