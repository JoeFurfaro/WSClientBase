class PasswordsPlugin extends WSCBPlugin {
    constructor(wscb) {
        super(wscb);
    }

    handle = function(response) {
        let handlers = {}

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

    /*
    * These functions will be handled and can be user defined
    */


}
