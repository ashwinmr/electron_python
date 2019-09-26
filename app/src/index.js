const {ipcRenderer} = require('electron')
const path = require('path')
const url = require('url')
const zerorpc = require("zerorpc")

// Connect to python process
let client = new zerorpc.Client()
client.connect("tcp://127.0.0.1:4242")

client.invoke("echo", "Hello from python", (error, res) => {
    if (error) {
        console.error(error)
    } else {
        document.getElementById('hello').innerHTML = res
    }
})