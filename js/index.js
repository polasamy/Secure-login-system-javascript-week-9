var userName = document.querySelector('input[name="userName"]');
var userEmail = document.querySelector('input[name="userEmail"]');
var userPassword = document.querySelector('input[name="userPassword"]');
var pageId = document.body.id;
var accountsOfUsers = [];
if (localStorage.getItem("users") != null) {
    accountsOfUsers = JSON.parse(localStorage.getItem("users"));
}
if (pageId === "signUpPage") {
    function addUser() {
        var newUser = { name: userName.value, email: userEmail.value, password: userPassword.value };
        if (newUser.name != "" && newUser.email != "" && newUser.password != "") {
            if (checkEmail(newUser.email) === true) {
                accountsOfUsers.push(newUser);
                updateUserList();
                clearFields();
                document.querySelector(".success-msg").classList.remove("d-none")
                document.querySelector(".failure-email").classList.add("d-none")
                document.querySelector(".failure-inputs").classList.add("d-none")

            }
            else {
                document.querySelector(".failure-email").classList.remove("d-none")
            }
        } else {
            document.querySelector(".failure-inputs").classList.remove("d-none")
        }
    }
    function checkEmail(email) {
        for (var i = 0; i < accountsOfUsers.length; i++) {
            if (accountsOfUsers[i].email == email) {
                return false;
            }
        }
        return true;
    }

    function clearFields() {
        userName.value = ""
        userEmail.value = ""
        userPassword.value = ""
    }
    function updateUserList() {
        localStorage.setItem("users", JSON.stringify(accountsOfUsers))
        // we are using json.stringify because when talking to the local storage and ssaving on it the file format is needed to be in json format and when bringing back the array from the local storage we use json.parse to return to its original state
    }
    document.querySelector("#signUpButton").addEventListener("click", function () {
        addUser()
    });
}
// need to put if statments to read the id of the body of the html page that i am on, when using queryselector on one page the rest of eventlistners works on the same page so if i need to handl an event in another html page i wont be able to do that without using and id on each body of each html and i can separate the two codes using if statment to specify which code works on which hml page

else if (pageId == "signInPage") {
    function loggedIn() {
        var url = "home.html"
        window.open(url, "_self");
    }

    function signIn() {

        var user = { email: userEmail.value, password: userPassword.value };
        // for loop to go throught the array to find whether the client is an old user or new , if he is old and had an account before he will be logged in
        for (let i = 0; i < accountsOfUsers.length; i++) {
            if (user.email === accountsOfUsers[i].email && user.password === accountsOfUsers[i].password) {
                localStorage.setItem("user", JSON.stringify(user))
                loggedIn();

            }
            else if (user.email === "" || user.password === "") {
                document.querySelector(".failure-inputs").classList.remove("d-none")
                document.querySelector(".wrong-data").classList.add("d-none")

            }

            else if (user.email !== accountsOfUsers[i].email || user.password !== accountsOfUsers[i].password) {
                document.querySelector(".wrong-data").classList.remove("d-none")
                document.querySelector(".failure-inputs").classList.add("d-none")
            }
        }
    }
    document.querySelector("#logInButton").addEventListener("click", function () {
        signIn();


    })
} else if (pageId == "homePage") {
    // it get the enterd user data from local storage that he enterd when logging in so that i can find his name and use it in the welcome msg
    user = JSON.parse(localStorage.getItem("user"));
    //search throught the users list to find the identical email and password of the user so that it can use his name to say hello to
    for (let i = 0; i < accountsOfUsers.length; i++) {
        if (user.email === accountsOfUsers[i].email && user.password === accountsOfUsers[i].password) {
            document.querySelector(".welcome-msg ").innerHTML = `Welcome ${accountsOfUsers[i].name}`
        }
        else { console.log("you are not signed in you cant enter"); }
    }

    // log out function
    function logOut() {
        var url = "index.html";
        window.open(url, "_self");
    }
    // call the logout function when logout button is pressed
    document.querySelector(".log-out").addEventListener("click", function () {
        logOut();
    })
}
