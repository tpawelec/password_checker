$(document).ready(function () {

    // CALLBACKS FOR PASSWORD CHECK
    function show404password() {
        $('.modal h2').html('This password hasn\'t been compromised');
    }

    function show200password() {
        $('.modal h2').html('This password has been compromised');
    }

    // CALLBACKS FOR EMAIL CHECK

    function show404mail() {

        $('.modal h2').html('This email hasn\'t been compromised');
    }

    function show200mail(response) {

        $('.modal h2').html('This email has been compromised on these websites:');
        response.forEach(function (data) {
            $(".modal ul").append($('<li>').html(data.Name));
        })
    }
    // Base url for API
    var baseUrl = "https://haveibeenpwned.com/api/v2/";

    // Grab form from html file
    var formData = $('#passwordCheck');

    //Event
    formData.submit(function (e) {
        var textField = $('#passemail').val();

        $('.modal h2, ul').empty();
        
        // Check if user typed email or not email (if not this will have to be password)
        var patt = /\S+@\S+\.\S+/;
        if (patt.test(textField)) {
            console.log("asdffs");
            $.ajax({
                url: baseUrl + 'breachedaccount/' + textField + '?truncateResponse=true',
                method: 'GET',
                statusCode: {
                    404: show404mail,
                    200: show200mail
                }
            })
        } else {

            $.ajax({
                url: baseUrl + 'pwnedpassword/' + textField,
                method: 'GET',
                statusCode: {
                    404: show404password,
                    200: show200password
                }
            })
        }


        e.preventDefault();
    });

})