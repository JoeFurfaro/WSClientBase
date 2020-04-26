var wscb = new WSClientBase("localhost", 8765, false);

// Define the on open function
wscb.on_open = function() {
    wscb.auth("joe"); // <- Automatically attempt to authenticate a user named joe when connection is established
    wscb.stop();
}

wscb.on_auth = function() {
    console.log("Logged in  YAY");
}

wscb.on_auth_user_not_found = function() {
    console.log("Couldn't find user :(");
}

wscb.connect();
