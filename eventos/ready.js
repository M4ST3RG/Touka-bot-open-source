module.exports = async (client) => {
    console.log(
      `${client.user.username} esta lista en ${client.guilds.cache.size} servers!`
    );
    function richPresent() {
      let elementos = [`--help || Yuuki Konno`, `${client.guilds.cache.size} servers`];
  
      client.user.setActivity(elementos[Math.floor(elementos.length * Math.random())], {
        status: "online",
        name: elementos[Math.floor(elementos.length * Math.random())],
        type: "WATCHING",
        url: null
      });
    }
    setInterval(richPresent, 4000);
  };