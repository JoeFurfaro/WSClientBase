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

    auth = function(user_name, password) {
        this.request({
            type: "request",
            code: "auth",
            user_name: user_name,
            password: password
        });
    }

    on_new_session = function(response) {
        $(document).ready(function() {
            $.cookie("wssb_session_id", response.session_id);
        });
    }

    /*
    * These functions will be handled and can be user defined
    */
}
