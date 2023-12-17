document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const nick = document.getElementById('nick').value;
        const contenido = document.getElementById('contenido').value;
        socket.emit('mensaje', { sender: nick, content: contenido });
        document.getElementById('contenido').value = '';
    });
    socket.on('nuevoMensaje', (mensaje) => {
        const newMessage = document.createElement('div');
        newMessage.classList.add('message');
        newMessage.innerHTML = `
            <p><strong>${mensaje.sender}</strong>: ${mensaje.content}</p>
            <p>${mensaje.timestamp}</p>
        `;
        const messagesContainer = document.getElementById('messages-container');
        messagesContainer.appendChild(newMessage);
    });
});

