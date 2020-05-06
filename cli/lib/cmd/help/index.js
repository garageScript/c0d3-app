"use strict";
var menu = {
    main: "\n    Usage:  c0d3 [OPTIONS] COMMAND\n\n    A command line interface (CLI) for c0d3.com\n\n    Options:\n      -h, --help                 Display help menu\n      -u, --username <string>    Identify username\n          --url      <string>    Set url endpoint for http request\n      -v, --version              Print version information\n\n    Commands:\n      submit      Submits git diff of challenge to c0d3.com\n      version     Show the c0d3 cli version information\n\n    Run 'c0d3 COMMAND --help' for more information on a command.\n",
    submit: "\n    Usage:  c0d3 submit [OPTIONS]\n\n    Submits git diff between master branch and working branch within current\n    respository\n\n    Options:\n      -u, --username <string>    Identify username\n          --url      <string>    Set url endpoint for http request\n\n    Example:\n      c0d3 submit --username \"android\" --url \"https://server.c0d3.com/graphql\"\n  ",
    version: "\n    Usage:  c0d3 --version\n\n    Print version information\n\n    Options:\n      -v, --version              Print version information\n\n    Example:\n      c0d3 --version\n  "
};
module.exports = function (inputs) {
    var command = inputs._[0] === 'help' ? inputs._[1] : inputs._[0];
    console.log(menu[command] || menu.main);
};
