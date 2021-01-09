const Methods = require('./methods');

const commands = {
    add_redirect: {
        method: Methods.addRedirect
    },
    redirect: {
        method: Methods.redirect
    },
    fetch_api_filmes: {
        method: Methods.getFilmsByCategory
    },
    mute_all: {
        method: Methods.muteAll
    },
    desmute_all: {
        method: Methods.desmuteAll
    }
}

const execute = (handler, command, args) => {
    const value = commands[command];
    if(value != undefined){
        return value.method(handler, args);
    }
    return ''
};
  
exports.execute = execute;