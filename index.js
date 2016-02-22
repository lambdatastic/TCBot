//import NPM dependencies
var Discord = require("discord.js");
var R = require("ramda");

// initialize Knex and set up the sqlite connection
var knex = require('knex')({
  client: 'sqlite3',
  // debug: true,
  connection: {
    filename: "./data.sqlite"
  }
});

// load config object
var config = require("./config/config.js");

// initialize Discord bot
var bot = new Discord.Client()

var messageHandler = function(commands) {
  return function(message) {
    var command = R.match(/^!(\w+)/, message.content);
    if (command.length > 1 && commands[command[1]]) {
      commands[command[1]](message);
    }
  };
};

bot.on("message", messageHandler(commandList));

bot.login(config.user.email, config.user.password, function(err, token) {
  if (err) {
    console.log("Login error: " + err);
  }
});
