const {
    readFile,
    writeFile
} = require('fs')

const {
    promisify
} = require('util')

const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)

// outra forma de obter dados do json
//const dadosJson = require('./herois.json')

class Database {
    constructor(){
        this.FILENAME = 'herois.json'
    }
    async obterDadosArquivos() {
        const arquivo = await readFileAsync(this.FILENAME)
        return JSON.parse(arquivo.toString())

    }
    async escreverArquivo(dados) {
        await writeFileAsync(this.FILENAME, JSON.stringify(dados))
        return true
    }
    async cadastrar(heroi) {
        const dados = await this.obterDadosArquivos()
        const id = heroi.id <= 2 ? heroi.id : Date.now();
        const heroiComId = {
            ...heroi,
            id
        }
        return this.escreverArquivo([...dados, heroiComId])
    }
    async listar(id){
        const dados = await this.obterDadosArquivos()
        return dados.filter(item =>(id ? (item.id === id ) : true))
    }
}

module.exports = new Database()