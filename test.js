const imdb = require('imdb-api');

const getFilmsByCategory = async (args) =>{

    if(!args.length){
        // Otacun film comedia / isso no canal geral /
        // logo message.channel é "geral"
        return console.log("Coloca o nome do filme né caralho")
    }

    //                                     "token" 
    //  ====== COLOCAR NO ENV FILE ======
    // SE POR ACASO O PROCESS.ENV FOR UNDEFINED MESMO VC COLOCANDO LA
    // Colocar o seguinte comando no começo do arquivo: require('dotenv').config()
    const client = new imdb.Client({apiKey: "1bf5f1c9"})

    let movie = await client.search({'genres': args[0]})

    console.log(JSON.stringify(movie, null, 2));
}

const mockOfArgs = ["Comedy"]

getFilmsByCategory(mockOfArgs);