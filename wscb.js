/*
* The parent object used to create dynamic custom WSCB plugins
*/
class WSCBPlugin {
    /*
    * Create a new plugin instance
    */
    constructor(wscb) {
        this.wscb = wscb;
        this.handlers = {};
    }

    /*
    * Returns the plugin handlers
    */
    get_handlers = function() {
        return this.handlers;
    }

    /*
    * Handles a server response targetted at the plugin should be developer defined
    */
    handle = function(response) { }

    /*
    * Sends a request to the WSSB server
    */
    request = function(data) {
        this.wscb.request(data);
    }
}

/*
* The entry point object to using the WSClientBase library
*/
class WSClientBase {
    /*
    * Create a new WSClientBase instance
    */
    constructor(server_address, server_port, use_ssl) {
        this.addr = "ws://" + server_address + ":" + server_port;
        if(use_ssl)
            this.addr = "wss://" + server_address + ":" + server_port;
        this.plugins = [];
    }

    /*
    * Registers a plugin instance
    */
    register = function(plugin_instance) {
        this.plugins.push(plugin_instance);
    }

    /*
    * Instructs the client base to connect to WSSB
    */
    connect = function() {
        this.socket = new WebSocket(this.addr);
        this.socket.wscb = this;

        this.socket.onopen = function(e) {
            console.log("Connected to WSSB server on " + this.wscb.addr);
            this.wscb.on_open();
        }

        this.socket.onclose = function(e) {
            console.log("Connection to WSSB server on " + this.wscb.addr + " has been closed");
            this.wscb.on_close();
        }

        this.socket.onmessage = function(e) {
            let response = JSON.parse(e.data);
            console.log(response);

            let responses = {
                WSSB_AUTH_USER_NOT_FOUND: this.wscb.on_auth_user_not_found,
                WSSB_AUTH_INVALID_SYNTAX: this.wscb.on_auth_invalid_syntax,
                WSSB_USER_AUTHENTICATED: this.wscb.on_auth,
                WSSB_USER_KICKED: this.wscb.on_kick,
                WSSB_ALREADY_AUTHENTICATED: this.wscb.on_already_auth,
                WSSB_USER_NOT_AUTHENTICATED: this.wscb.on_not_auth,
                WSSB_REQUEST_CODE_NOT_FOUND: this.wscb.on_code_not_found,
                WSSB_STOPPING_SERVER: this.wscb.on_stop,
                WSSB_ACCESS_DENIED: this.wscb.on_access_denied,
                WSSB_CONFIG_RELOADED: this.wscb.on_reload_config,
                WSSB_RELOADED: this.wscb.on_reload,
                WSSB_PLUGINS_RELOADED: this.wscb.on_reload_plugins,
                WSSB_USERS_RELOADED: this.wscb.on_reload_users,
            }

            if(response.code in responses)
                responses[response.code](response);

            for(var plugin of this.wscb.plugins)
                plugin.handle(response);
        }
    }

    /*
    * Sends a request to the WSSB server
    */
    request = function(data) {
        this.socket.send(JSON.stringify(data));
    }

    /*
    * Attempts to authenticate a user
    */
    auth = function(user_name) {
        this.request({
            type: "request",
            code: "auth",
            user_name: user_name
        });
    }

    /*
    * Attempts to reload server config
    */
    reloadcfg = function() {
        this.request({
            type: "request",
            code: "reloadcfg"
        });
    }

    /*
    * Attempts to restart users service
    */
    reloadusers = function() {
        this.request({
            type: "request",
            code: "reloadusers"
        });
    }

    /*
    * Attempts to reload server plugins
    */
    reloadplugins = function() {
        this.request({
            type: "request",
            code: "reloadplugins"
        });
    }

    /*
    * Attempts to fully reload the server
    */
    reload = function() {
        this.request({
            type: "request",
            code: "reload"
        });
    }

    /*
    * Attempts to stop the server
    */
    stop = function() {
        this.request({
            type: "request",
            code: "stop"
        });
    }

    /*
    * The following functions should be user defined
    */
    on_open = function() {}
    on_close = function() {}
    on_auth_user_not_found = function(response) {}
    on_auth_invalid_syntax = function(response) {}
    on_auth = function(response) {}
    on_kick = function(response) {}
    on_already_auth = function(response) {}
    on_not_auth = function(response) {}
    on_code_not_found = function(response) {}
    on_stop = function(response) {}
    on_access_denied = function(response) {}
    on_reload_config = function(response) {}
    on_reload = function(response) {}
    on_reload_plugins = function(response) {}
    on_reload_users = function(response) {}
}
