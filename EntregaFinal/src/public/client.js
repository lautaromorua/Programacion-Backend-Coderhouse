const socket = io();

const chatPool = document.querySelector('#chat-pool');
const inputMail = document.querySelector('#email');
const inputMessage = document.querySelector('#mensaje');
const inputName = document.querySelector('#nombre');
const btn = document.querySelector('#btn-send');

const sendMessage = (msgInfo) => {
    socket.emit('cliente:msg', msgInfo)
}

const renderMessages = (msgsInfo) => {
    const html = msgsInfo.map(msgInfo => {
        return (`<div>
        <span >${msgInfo.autor.nombre}</span>
        [<span >${msgInfo.fecha}<span>]: 
        <span >${msgInfo.texto}</span>
        </div>`)
    }).join(' ');

    chatPool.innerHTML = html;
}


const submitMsg = (event) => {
    event.preventDefault();
    const timeStamp = new Date();
    const fecha = timeStamp.toLocaleString()
    const msgInfo = {
        autor: {
            email: inputMail.value,
            nombre: inputName.value,
        },
        texto: inputMessage.value,
        fecha: fecha
    };

    sendMessage(msgInfo);
    inputMessage.value = '';
}

inputForm.addEventListener('submit', submitMsg);

socket.on('server:msgs', async messages => {
    renderMessages(messages)
});
