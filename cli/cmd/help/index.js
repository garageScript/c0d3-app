const menu = {
  main: `
    Usage:  c0d3 [OPTIONS] COMMAND

    A command line interface (CLI) for c0d3.com

    Options:
      -h, --help                 Display help menu
      -u, --username <string>    Identify username
          --url      <string>    Set url endpoint for http request
      -v, --version              Print version information

    Commands:
      submit      Submits git diff of challenge to c0d3.com
      version     Show the c0d3 cli version information

    Run 'c0d3 COMMAND --help' for more information on a command.
`,
  submit: `
    Usage:  c0d3 submit [OPTIONS]

    Submits git diff between master branch and working branch within current
    respository

    Options:
      -u, --username <string>    Identify username
          --url      <string>    Set url endpoint for http request

    Example:
      c0d3 submit --username "android" --url "https://server.c0d3.com/graphql"
  `,
  version: `
    Usage:  c0d3 --version

    Print version information

    Options:
      -v, --version              Print version information

    Example:
      c0d3 --version
  `
}

module.exports = inputs => {
  const command = inputs._[0] === 'help' ? inputs._[1] : inputs._[0]

  console.log(menu[command] || menu.main)
}
