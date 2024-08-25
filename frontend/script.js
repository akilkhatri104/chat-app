

const socket = io()

const sendBtn = document.querySelector('#sendBtn')
const chatInput = document.querySelector('#chatInput')
const chats = document.querySelector('#chats')
const usernameInput = document.querySelector('#usernameInput')

socket.on('chat', chatObject => {
    console.log(chatObject);
    const chat = document.createElement('p')
    const username = chatObject.username
    const chatFromUser = chatObject.chat
    const timestamp = new Date(chatObject.timestamp)
    const timestampString = timestamp.toLocaleTimeString()
    chat.innerHTML = `<span class="secondary-text">${timestampString}</span> <strong>${username}</strong>: ${chatFromUser}`
    chats.appendChild(chat)

})

sendBtn.addEventListener('click', (e) => {
    const username = usernameInput.value
    const msg = chatInput.value
    const timestamp = new Date()
    const chatObject = {
        'username': username,
        'timestamp': timestamp,
        'chat': msg
    }
    socket.emit('chat',chatObject)
})