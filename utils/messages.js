const moment = require('moment');

function displayMsg(username, text) {
  return {
    username,
    text,
    time: moment().format('h:mm a')
  };
}

module.exports = displayMsg;
