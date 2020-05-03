class SessionsPlugin extends WSCBPlugin {
    constructor(wscb) {
        super(wscb);
    }

    handle = function(response) {
        let handlers = {
            SESSIONS_NEW: this.on_new_session,
        }

        if(response.code in handlers)
            handlers[response.code](response);
    }

    has_key = function() {
        return !($.cookie("wssb_session_id") == undefined);
    }

    has_user = function() {
        return !($.cookie("wssb_session_user") == undefined);
    }

    get_id = function() {
        return $.cookie("wssb_session_id");
    }

    get_user = function() {
        return $.cookie("wssb_session_user");
    }

    auth = function() {
        console.log("Trying to send cookie!");
        if(this.has_key() && this.has_user()) {
            console.log("Sending session cookie!");
            let auth_token = {
                type: "request",
                code: "auth",
                session_id: this.get_id(),
                user_name: this.get_user(),
            };
            console.log(auth_token);
            this.request(auth_token);
            return true;
        }
        return false;
    }

    on_new_session = function(response) {
        $.cookie("wssb_session_id", response.session_id);
        $.cookie("wssb_session_user", response.user_name)
        console.log($.cookie("wssb_session_id"));
    }

    /*
    * These functions will be handled and can be user defined
    */
}
