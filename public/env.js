const retrieveMessages = () => {
    $.get('/message', function (messages) {


        $('#messages').empty()
        messages.forEach((element) => {
            console.log(element.message)
            $('#messages').append('<div class="row">' + element.message + '<div>')
        });
    })
}



$(document).ready(function () {
    console.log('ready')
    $('#btnMessage').click(() => {
        let message = $('#messageBox').val()
        let data = {
            message
        }
        $.get('/insert?message=' + message, function () {
            $('#messageBox').val()
        })
    })

    setInterval(() => {
        retrieveMessages()

    }, 2000);

})