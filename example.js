var wscb = new WSClientBase("localhost", 8765, false);

var foo = new FooPlugin(wscb);
var passwords = new PasswordsPlugin(wscb);
var sessions = new SessionsPlugin(wscb);

wscb.register(foo);
wscb.register(passwords);
wscb.register(sessions);

// Define a custom plugin welecome function
foo.on_example = function(response) {
    console.log("Example response received!");
}

// Define the on open function
wscb.on_open = function() {
    if(!sessions.auth())
        passwords.auth("joe", "password")
}

// Will be called when authenticated
wscb.on_auth = function() {
    //wscb.reload();
}

// Connect to the socket
wscb.connect();
