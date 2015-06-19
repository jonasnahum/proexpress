[![Build Status](https://travis-ci.org/rogithub/jimenez-http-communication.svg?branch=importclasses)](https://travis-ci.org/rogithub/jimenez-http-communication)

# jimenez-http-communication
It provides js classes to make http calls

##Install

    $ npm install jimenez-http-communication

##Content
It contains the following classes:

 1. ServerInfo
 2. EndPoint
 3. Request
 4. Database

##Usage

###ServerInfo class
Creates a url to a server using protocol, domain name and optionally port.

####Example
    var jhc = require('jimenez-http-communication');

    var serverInfo = new jhc.ServerInfo("https", "localhost", 5984);    

    console.log(serverInfo.getUrl());

output:

    "https://localhost:5984"

###EndPoint class

Creates the uri part for an endpoint. Its constructor receives a configuration object with the following properties:

####Example
    var jhc = require('jimenez-http-communication');

    var config = {
    	uri: "contribuyentes/:id/:name",
    	urlParams: { rev: 12345, tax: 18.3 },
    	routeParams: { id: "abcd", name: "test" }
    };

    var ep = new jhc.EndPoint(config);

    console.log(ep.getUrl());

output:

"contribuyentes/abcd/test?rev=12345&tax=18.3"

###Request class

Returns a [Q](https://github.com/kriskowal/q) promise based on endPoint and serverInfo objects.

####Example
    var jhc = require('jimenez-http-communication');

    var request = new jhc.Request();  

    var promise = request.getPromise(serverInfo, endPoint);
    
###Database class

Is a interface to communicate with a RESTful database system. It internally constructs a serverInfo object from the environmental variables: process.env.DB_PROTOCOL, process.env.DB_DOMAIN, process.env.DB_PORT and exposes methods for CRUD operations.

####Example
    var jhc = require('jimenez-http-communication');

    var Database = new jhc.Database();
   
    var db = new Database(databaseName);
    var savePromise = db.save(model);
    var updatePromise = db.update(model, id, rev);
    var viewPromise = db.view(id);
    var delPromise = db.delete(id, rev);
