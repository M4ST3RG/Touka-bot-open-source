var fs = require("fs");
const {Discord, Intents, Client, Collection} = require("discord.js");
require('dotenv').config();
const mongoose = require("mongoose");


const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
client.commands = new Collection();
client.alias = new Collection();

fs.readdir("./comandos/", (err, files) => {
  if (err) console.error(err);
  let jsfiles = files.filter(f => f.split(".").pop() === "js");

  if (jsfiles.length <= 0) return console.log("...");

  console.log(`Cargando ${jsfiles.length} comandos...`);
  jsfiles.forEach((f, i) => {
    let props = require(`./comandos/${f}`);
    console.log(`${i + 1}: ${f} se ha cargado!`);
    client.commands.set(props.help.name, props);
    props.help.alias.forEach(alias => {
        client.alias.set(alias, props.help.name);
    });
  });
});

fs.readdir('./eventos/', (err, files) => {
    if (err) return console.error;
    files.forEach(file => {
      if (!file.endsWith('.js')) return;
      const evt = require(`./eventos/${file}`);
      let evtName = file.split('.')[0];
      console.log(`cargando evento: '${evtName}'`);
      client.on(evtName, evt.bind(null, client));
    });
  });

  client.models = { server: require('./database/models/server.js') }
  require('./database/main.js')

client.login(process.env.TOKEN);