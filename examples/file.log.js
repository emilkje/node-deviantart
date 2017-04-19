const Client = require('../').Client;
const client = new Client(process.argv[2] || "emilkje");

client.images((err,images) => {
    if(err) throw err;
    console.log(JSON.stringify(images[0], null, 4));
});