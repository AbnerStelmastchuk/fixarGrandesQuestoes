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

    async remover(id){
        if(!id){
            return this.escreverArquivo([]) 
        }

        const dados = await this.obterDadosArquivos()
        const indice = dados.findIndex(item => item.id === parseInt(id))
        if(indice === -1){
            throw Error('O usuario informado nao existe')
        }
        dados.splice(indice, 1)
        return await this.escreverArquivo(dados)
    }

    async atualizar(id, modificacoes){
        const dados = await this.obterDadosArquivos()
        const indice = dados.findIndex(item => item.id === parseInt(id))
        if(indice === -1){
            throw Error('O heroi informado não existe')
        }
        const atual = dados[indice]
        const objetoAtualizar = {
            ...atual,
            ...modificacoes
        }
        dados.splice(indice, 1)

        return await this.escreverArquivo([
            ...dados,
            objetoAtualizar
        ])
    }
}

module.exports = new Database()