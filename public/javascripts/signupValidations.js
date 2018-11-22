function validateSignupForm() {
    var validFlag = true;

    clearErrors();

    const userName = document.forms["signupForm"]["userName"].value;
    const email = document.forms["signupForm"]["email"].value;
    const password = document.forms["signupForm"]["password"].value;
    const phone = document.forms["signupForm"]["phone"].value;

    // Name empty validations
    if (userName === "") {
        document.getElementById("userNameError").innerHTML = "Name can not be empty";
        validFlag = false;
    }

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

    // Phone empty validations
    if (phone === "") {
        document.getElementById("phoneError").innerHTML = "Phone can not be empty";
        validFlag = false;
    }

    // Phone format validations
    if (phone != ""){
        const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

        if( !phoneRegex.test(phone)){
            document.getElementById("phoneError").innerHTML = "Invalid Phone. Try xxx-xxx-xxxx";
            validFlag = false;
        }
    }

    return validFlag;
}

// Clear errors on form
function clearErrors(){
    document.getElementById("userNameError").innerHTML = "";
    document.getElementById("emailError").innerHTML = "";
    document.getElementById("passwordError").innerHTML = "";
    document.getElementById("phoneError").innerHTML = "";
}

function clearForm(){
    clearErrors();
    document.forms["signupForm"]["userName"].value = "";
    document.forms["signupForm"]["email"].value = "";
    document.forms["signupForm"]["password"].value = "";
    document.forms["signupForm"]["phone"].value = "";

}