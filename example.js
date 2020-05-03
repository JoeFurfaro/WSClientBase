var wscb = new WSClientBase("localhost", 8765, false);

var foo = new FooPlugin(wscb);
var passwords = new PasswordsPlugin(wscb);

wscb.register(foo);
wscb.register(passwords);

// Define a custom plugin welecome function
foo.on_example = function(response) {
    console.log("Example response received!");
}

// Define the on open function
wscb.on_open = function() {
    passwords.auth("joe", "password"); // <- Automatically attempt to authenticate a user named joe when connection is established
}

// Will be called when authenticated
wscb.on_auth = function() {
    //wscb.reload();
}

// Connect to the socket
wscb.connect();
