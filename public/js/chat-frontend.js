$(function() {
    "use strict"

    var inputEmail = $('#email')
    var inputPassword = $('#password')
    var btnValidate = $('#validate')

    var messageArea = $('#message-area')
    var inputMsg = $('#message')
    var status = $('#status')
    var btnSend = $('#send')

    var connectionArea = $('#connection-area')

    inputMsg.hide()
    btnSend.hide()

    var sessionId = false
    var user = false

    window.WebSocket = window.WebSocket || window.MozWebSocket

    if(!window.WebSocket) {
        status.text('Sorry, your browser doesn\'t support WebSocket')
        return
    }

    var connection = new WebSocket('ws://127.0.0.1:1337')

    connection.onopen = function() {
        status.text('Let\'s authenticate: ')
    }

    connection.onerror = function(error) {
        console.log(error)
        status.text('Sorry, there\'s some problem with your connection or the server is down')
    }

    connection.onmessage = function(message) {

        try {
            var json = JSON.parse(message.data)
        } catch (e) {
            console.log('This doesn\'t look like a vaid JSON: ', message.data)
            return
        }

        switch(json.type) {
            case 'welcome':
                sessionId = json.data.session_id
                addMessage(json.data.sender_name, json.data.message,
                    json.data.color, new Date(json.data.time))
                break

            case 'error':
                status.text(json.error)
                if(!sessionId || !user) enableLogIn()
                break

            case 'connection':
                updateConnection(json.data.connection, json.data.status)
                break
            
            case 'history':
                user = json.user
                enableMessaging()
                for (var i = 0; i < json.data.length; i++) {
                    var color = 'blue'
                    if(json.data[i].sender_name === user.name) color = 'green'
                    addMessage(json.data[i].sender_name, json.data[i].message, color, 
                        new Date(json.data[i].time))
                }
                
                for(var i = 0; i < json.online_users.length; i++) {
                    updateConnection(json.online_users[i], 'connect')
                }
                break

            case 'message':
                enableMessaging ()
                var color = 'blue'
                if(json.data.sender_name === user.name) color = 'green'
                addMessage(json.data.sender_name, json.data.message,color, new Date(json.data.time))
                break

            default:
                console.log('Hmm... I\'ve never seen JSON like this:', json)
                break
        }
    }

    btnValidate.click(function() {
        var email = inputEmail.val()
        var password = inputPassword.val()
        if(!email || !password) return

        var credentials = {
            'session_id': sessionId,
            'type': 'authenticate',
            'email': email,
            'password': password
        }

        connection.send(JSON.stringify(credentials))
        console.log('sent to websocket: ' + JSON.stringify(credentials))

        inputEmail.attr('disabled', 'disabled')
        inputPassword.attr('disabled', 'disabled')
        btnValidate.attr('disabled', 'disabled')
    })

    inputMsg.keydown(function(e) {
        if(e.keyCode === 13) {
            var msg = $(this).val()
            if(!msg) return

            var msgObj = {
                'session_id': sessionId,
                'type': 'broadcast',
                'message': msg
            }
            connection.send(JSON.stringify(msgObj))
            console.log('sent to websocket: ' + msg)
            $(this).val('')

            inputMsg.attr('disabled', 'disabled')
        }
    })

    btnSend.click(function() {
        var msg = inputMsg.val()
        if(!msg) return

        var msgObj = {
            'session_id': sessionId,
            'type': 'broadcast',
            'message': msg
        }
        connection.send(JSON.stringify(msgObj))
        console.log('sent to websocket: ' + msg)
        inputMsg.val('')

        inputMsg.attr('disabled', 'disabled')
    })

    setInterval(function() {
        if(connection.readyState !== 1) {
            status.text('Error: Unable to communicate with the WebSocket server')
        }
    }, 3000)

    function enableLogIn () {
        inputEmail.show()
        inputPassword.show()
        btnValidate.show()

        inputEmail.removeAttr('disabled')
        inputPassword.removeAttr('disabled')
        btnValidate.removeAttr('disabled')

        inputMsg.hide()
        btnSend.hide()
    }

    function enableMessaging () {
        status.text('Logged in as ' + user.name)

        inputEmail.hide()
        inputPassword.hide()
        btnValidate.hide()

        inputMsg.show()
        btnSend.show()

        inputMsg.removeAttr('disabled')
    }

    function addMessage(senderName, message, color, dt) {
        messageArea.append('<p><span style="color:' + color + '">'
            + senderName + '</span> @ ' + (dt.getHours() < 10 ? '0'
            + dt.getHours() : dt.getHours()) + ':'
            + (dt.getMinutes() < 10? '0' + dt.getMinutes() : dt.getMinutes())
            + ': ' + message + '</p></ br>')
    }

    function updateConnection(connection, status) {
        $('#' + connection.session_id).remove()

        if(status === 'connect') {
            connectionArea.append('<li id="' + connection.session_id 
                + '"><span style="color:green;">'+ connection.user.name 
                + '</span> @ ' + connection.session_id + '</li>')
        }
    }
})