// browserdaki etkileşimleri alacağız. Bunları socket.io yardımıyla server.js dosyasına göndericez. Ve server.js içerisinde bunları işleyeceğiz.

const socket = io.connect('http://localhost:4000')

const sender = document.getElementById('sender')
const message = document.getElementById('message')
const submitBtn = document.getElementById('submitBtn')
const output = document.getElementById('output')
const feedback = document.getElementById('feedback')


submitBtn.addEventListener('click', () => { //click işlemini kontrol ediyoruz. Click işlemi gelirse serverdaki socketimiz ile bağlantı kuracağız ve onun içerisinde emityde köprü oluşturacağız, böylelikle browser tarafından server tarafına, server tarafından browser tarafına bilgilerin akışını sağlayacağız. 
    //ilk olarak socketimize gelen bilgileri göndermemiz gerekiyor;
    socket.emit('chat', {
        message: message.value,
        sender: sender.value
    })
})

//socketten gelen bilgiyi işliyoruz;
socket.on('chat', data => {
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.sender + ' : </strong>' + data.message + '</p>'
    message.value = '';
})

message.addEventListener('keypress', () => {
    socket.emit('typing', sender.value)
})

socket.on('typing', data => {
    feedback.innerHTML = '<p>' + data + ' yaziyor...</p>'
})