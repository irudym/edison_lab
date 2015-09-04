/**
 * Created by igor on 31/08/15.
 */

var mqtt = require('mqtt');


var host_address = "mqtt://cloud2logic.com";
var client_name = "Edison";
var client_mac = '1234567890';


var topic = "IOT/" + client_name + ":" + client_mac +"/data";
var manage = "IOT/" +client_name + ":" + client_mac +"/manage";

console.log('Start mqtt client');
var client = mqtt.connect(host_address);
var next_step = true;

client.on('connect', (function() {
    console.log("Connected to " + host_address);
    client.subscribe(manage);

    setInterval(function(){
        client.publish(topic, '{"d":{"temperature":' + Math.random()*24 + '}}'); //Payload is JSON
    }, 2000);//Keeps publishing every 2000 milliseconds.
}));

client.on('message', function(topic, message) {
    try {
        jdata = JSON.parse(message);
        console.log("Got command to motor: " + jdata["d"]["motor"]);
    } catch (error) {
        console.log(error.message);
    }
});

