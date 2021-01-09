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