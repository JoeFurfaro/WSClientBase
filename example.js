var wscb = new WSClientBase("localhost", 8765, false);
var foo = new FooPlugin(wscb);

// Define a custom plugin welecome function
foo.on_example = function(response) {
    console.log("We got the example :)");
}

wscb.register(foo);

// Define the on open function
wscb.on_open = function() {
    wscb.auth("joe"); // <- Automatically attempt to authenticate a user named joe when connection is established
}

wscb.on_auth = function() {
    foo.foo();
}

wscb.connect();
