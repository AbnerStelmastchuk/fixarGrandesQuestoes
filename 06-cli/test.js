const {
    deepEqual,
    ok
} = require('assert')

const database = require('./dataBase')

const default_item_cadastrar = {nome: 'Flash', poder: 'Speed', id: 1}

describe('Suite de manipulção de Herois', () => {
    before(async () => {
        await database.cadastrar(default_item_cadastrar)
    })
    it('deve pesquisar um heroi usando arquivos', async () => {
        const expected = default_item_cadastrar
        const [resultado] = await database.listar(expected.id)
        //const posicaoUm = resultado[0]
        deepEqual(resultado, expected)
    })
    
    
    it('deve cadastrar um heroi, usando arquivos', async () => {
        const expected = default_item_cadastrar
        const resultado = await database.cadastrar(default_item_cadastrar)
        const [actual] = await database.listar(default_item_cadastrar.id)
        deepEqual(actual, expected)
    })
})