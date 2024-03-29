const socket = io();
const userList = document.getElementById('users');
const roomName = document.getElementById('room-name');
const chatSend = document.getElementById('send-msg');
const chatMessages = document.querySelector('.chat-messages');

// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});


// Message from server
socket.on('message', (message) => {
  outputMessage(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;

});

// Join chatroom
socket.emit('joinRoom', { username, room });

// Get room and users
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});


function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  const p = document.createElement('p');
  p.classList.add('meta');
  p.innerText = message.username;
  p.innerHTML += `<span>  ${message.time}</span>`;
  div.appendChild(p);
  const para = document.createElement('p');
  para.classList.add('text');
  para.innerText = message.text;
  div.appendChild(para);
  document.querySelector('.chat-messages').appendChild(div);
}




// Message submit
chatSend.addEventListener('submit', (e) => {
  e.preventDefault();
  let msg = e.target.elements.msg.value;
  msg = msg.trim();

  if (!msg) {
    return false;
  }

  socket.emit('chatMessage', msg);
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();

});

function outputUsers(users) {
  userList.innerHTML = '';
  users.forEach((user) => {
    const li = document.createElement('li');
    li.innerText = user.username;
    userList.appendChild(li);
  });
}

function outputRoomName(room) {
  roomName.innerText = room;
}

//Prompt the user before leave chat room
document.getElementById('leave-btn').addEventListener('click', () => {
  const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
  if (leaveRoom) {
    window.location = '../index.html';
  } else {
  }
});

document.getElementsByClassName("darkButton")[0].addEventListener('click', () => {
  if(document.getElementsByClassName("darkButton")[0].innerHTML == "Switch to Dark Mode") {
    document.getElementsByName("body").classList.remove("white");
    document.getElementsByName("body").classList.add("dark");
    document.getElementsByClassName("darkButton")[0].innerHTML = "Switch to Light Mode"
  } else {
    document.getElementsByName("body").classList.remove("dark");
    document.getElementsByName("body").classList.add("white");
    document.getElementsByClassName("darkButton")[0].innerHTML = "Switch to Dark Mode"
  }
})


//Prompt the user before reloading chat page
window.onbeforeunload = function() {
  return true;
};
