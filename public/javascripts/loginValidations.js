function validateLoginForm() {
    var validFlag = true;

    clearErrors();

    const email = document.forms["loginForm"]["email"].value;
    const password = document.forms["loginForm"]["password"].value;

    // Email empty validations
    if (email === "") {
        document.getElementById("emailError").innerHTML = "Email can not be empty";
        validFlag = false;
    }

    // Email structure validations
    if (email != ""){
        const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if( !emailRegex.test(email)){
            document.getElementById("emailError").innerHTML = "Invalid email.";
            validFlag = false;
        }
    }

    // Password empty validations
    if (password === "") {
        document.getElementById("passwordError").innerHTML = "Password can not be empty";
        validFlag = false;
    }

    // Password policy validations
    if (password != ""){
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

        if( !passwordRegex.test(password)){
            document.getElementById("passwordError").innerHTML = "Your password must be at least 8 characters long, contain at " +
                "least one number and a special character";
            validFlag = false;
        }
    }


    return validFlag;
}

// Clear errors on form
function clearErrors() {
    document.getElementById("emailError").innerHTML = "";
    document.getElementById("passwordError").innerHTML = "";
}

function clearForm(){
    clearErrors();
    document.forms["loginForm"]["email"].value = "";
    document.forms["loginForm"]["password"].value = "";
}