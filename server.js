'use strict';

/**
 * Created by Zubin on 14/09/2018.
 */

//External Dependencies
var Hapi = require('hapi');

//Internal Dependencies
var Config = require('./Configuration');
var Routes = require('./Routes');
var Plugins = require('./Plugins');
var Bootstrap = require('./Utils/BootStrap');

//Create Server
var server = new Hapi.Server({
    app: {
        name: "Socket_Chat"
    }
});

server.connection({
    port: Config.APP_CONSTANTS.SERVER.PORTS.HAPI,
    routes: { cors: true }
});

//Register All Plugins
server.register(Plugins, function (err) {
    if (err){
        server.error('Error while loading plugins : ' + err)
    }else {
        server.log('info','Plugins Loaded')
    }
});

//Default Routes
server.route(
    {
        method: 'GET',
        path: '/',
        handler: function (req, res) {
            //TODO Change for production server
            res.view('index')
        }
    }
);

//API Routes
server.route(Routes);

//Connect To Socket.io
Bootstrap.connectSocket(server);

//Bootstrap admin data
Bootstrap.bootstrapAdmin(function (err, message) {
    if (err) {
        console.log('Error while bootstrapping admin : ' + err)
    } else {
        console.log(message);
    }
});

//Adding Views
server.views({
    relativeTo: __dirname,
    path: './Views/'
});

//Start Server
server.start(function () {
    server.log('info', 'Server running at: ' + server.info.uri);
});

