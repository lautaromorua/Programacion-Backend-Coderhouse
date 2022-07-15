const socket = io()
const messagesPool = document.querySelector('#messagesPool')
const messagesForm = document.querySelector('#messagesForm')
const emailInput = document.querySelector('#emailInput')
const messageInput = document.querySelector('#messageInput')

const productForm = document.querySelector('#productForm');
const urlInput = document.querySelector('#urlInput');
const priceInput = document.querySelector('#priceInput');
const descriptionInput = document.querySelector('#descriptionInput');

function sendProduct (productInfo) {
    socket.emit('client:product', productInfo)
};
async function renderProducts (productos) {

    const response = await fetch('./partials/listaProductos.ejs');
    const pagina = await response.text();
    document.querySelector('#products').innerHTML = "";
    productos.forEach(product => {
    
        const html = ejs.render(pagina, product);
        document.querySelector('#products').innerHTML += html;
    });
}

function submitHandlerProduct (event) {

    event.preventDefault();
    const productoInfo = { thumbnail: urlInput.value, price: priceInput.value, description: descriptionInput.value };
    sendProduct(productoInfo);

};

function sendMessage(messageInfo) {

    socket.emit('client:message', messageInfo)

}
function renderMesseges (messageInfo) {

    const html = messageInfo.map(msgInfo => {
        return(`
        <div>
            <strong style='color:blue;'>${msgInfo.username}</strong>:
            <span style='color: brown;'>[ ${msgInfo.time} ]: </span>
            <em>${msgInfo.message}</em>
        </div>`)
    }).join(" ");
    messagesPool.innerHTML = html;

}
function submitHandlerMessage (event) {
    event.preventDefault()
    const date = dayjs().set().format('DD-MM-YYYY HH:mm:ss');
    const messageInfo = { username: emailInput.value, time: date, message: messageInput.value }
    sendMessage(messageInfo)
}

productForm.addEventListener('submit', submitHandlerProduct)
socket.on('server:products', renderProducts);

messagesForm.addEventListener('submit', submitHandlerMessage)
socket.on('server:messeges', renderMesseges)