const {
    deepEqual,
    ok
} = require('assert')

const database = require('./dataBase')

const default_item_cadastrar = {nome: 'Flash', poder: 'Speed', id: 1}
const default_item_atualizar = {nome: 'Lanterna Verde', poder: 'Energia do anel', id: 2}

describe('Suite de manipulção de Herois', () => {
    before(async () => {
        await database.cadastrar(default_item_cadastrar)
        await database.cadastrar(default_item_atualizar)
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
    it('deve remover um heroi por id', async() => {
        const expected = true
        const resultado = await database.remover(default_item_cadastrar.id)

        deepEqual(resultado, expected)
    })
    it('deve atualizar um heroi pelo id', async () => {
        const expected = {
            ...default_item_atualizar,
            nome: 'Batman',
            poder: 'Dinheiro'
        }
        const novoDado = {
            nome: 'Batman',
            poder: 'Dinheiro'
        }
        await  database.atualizar(default_item_atualizar.id, novoDado)
        const [resultado] = await database.listar(default_item_atualizar.id)

        deepEqual(resultado, expected)
    })
})