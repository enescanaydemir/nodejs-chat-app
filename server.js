const express = require('express')
const socket = require('socket.io')

const app = express();
const server = app.listen(4000, () => {
    console.log('Server started on 4000')
})

app.use(express.static('public')); //public klasöründe bulunan statik dosyaları kullanmamızı sağlar.

const io = socket(server)

io.on('connection', (socket) => {
    console.log(socket.id)

    socket.on('chat', data => {
        io.sockets.emit('chat', data) //datadan gelen bilgileri bütün browserlara gönderiyoruz
    })


    socket.on('typing', data => {
        socket.broadcast.emit('typing', data)
    })

})