/*
* This class demonstrates an example structure for a client side WSCB plugin
*/
class FooPlugin extends WSCBPlugin {
    /*
    * Creates a new instance of the FooPlugin
    */
    constructor(wscb) {
        super(wscb);
    }

    /*
    * Handles responses from the server
    */
    handle = function(response) {
        let handlers = {
            FOO_WELCOME: this.on_welcome,
            FOO_EXAMPLE: this.on_example,
        }

        if(response.code in handlers)
            handlers[response.code](response);
    }

    /*
    * Example plugin function
    */
    foo = function() {
        this.request({
            type: "request",
            code: "foo"
        });
    }

    /*
    * These functions will be handled and can be user defined
    */
    on_welcome = function(response) {}
    on_example = function(response) {}

}
