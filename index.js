const readline = require("readline");
var rl = readline.createInterface(process.stdin, process.stdout);

var dict = {};

function printKeys() {
    for (let i in dict) {
        console.log(i)
    }
}

function printMembers(key) {
    if (dict[key]) {
        let values = new Array(...dict[key])
        for (let i in values) {
            console.log(`${values[i]}`)
        }
    } else {
        console.log("ERROR, key does not exist.");
    }
}

function addMember(key, member) {
    if (!dict[key])
        dict[key] = new Set();
    let values = dict[key]
    if (values.has(member))
        console.log("ERROR, member already exists for the key")
    else {
        values.add(member)
        dict[key] = values;
        console.log("Added")
    }
}

function removeMember(key, member) {
    if (!dict[key]) {
        console.log("ERROR, key does not exist")
    } else {
        let values = dict[key]
        if (values.has(member)) {
            values.delete(member)
            console.log("Removed")
        } else {
            console.log("ERROR, member does not exist")
        }
        if (values.size === 0)
            delete dict[key];
    }
}

function removeAll(key) {
    if (dict[key]) {
        delete dict[key]
        console.log("Removed")
    }
    else
        console.log("ERROR, key does not exist")
}

function clear() {
    dict = {}
    console.log("cleared")
}

function keyExists(key) {
    if (dict[key])
        console.log(true);
    else
        console.log(false)
}

function memberExists(key, member) {
    if (!dict[key])
        console.log(false);
    else {
        let values = dict[key]
        if (values.has(member)) {
            console.log(true)
        } else
            console.log(false)
    }
}

function getAllMembers() {
    for (let i in dict) {
        let values = dict[i]
        console.log(new Array(...values).join(' '));
    }
}

function getAllItems() {
    for (let i in dict) {
        let values = new Array(...dict[i])
        for (let j in values) {
            console.log(`${i}:${values[j]}`)
        }
    }
}

rl.setPrompt('> ');
rl.prompt();
rl.on('line', function(line) {
    let splitInput = line.split(' ');

    switch (splitInput[0].toLowerCase()) {
        case "add":
            addMember(splitInput[1], splitInput[2]);
            break;
        case "keys":
            printKeys();
            break;
        case "members":
            printMembers(splitInput[1]);
            break;
        case "remove":
            removeMember(splitInput[1], splitInput[2]);
            break;
        case "removeall":
            removeAll(splitInput[1])
            break;
        case "clear":
            clear();
            break;
        case "keyexists":
            keyExists(splitInput[1]);
            break;
        case "memberexists":
            memberExists(splitInput[1], splitInput[2]);
            break;
        case "allmembers":
            getAllMembers();
            break;
        case "items":
            getAllItems();
            break;
        default:
            console.log("Incorrect option")
    }
    rl.prompt();
}).on('close', function() {
    process.exit(0);
});