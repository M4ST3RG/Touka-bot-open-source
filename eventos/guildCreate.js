const mongoose = require("mongoose");

module.exports = async (client, guild) => {
    let servers = await client.models.server.findById(guild.id);
    //let id = client.members.cache.get("310265734074728448")

    if(!servers){
        await  client.models.server.create({
            _id: guild.id,
            users: new Map(),
            roles: new Map(),
        })
    }

    console.log("He sido invitada a el server "+  guild.name)
};