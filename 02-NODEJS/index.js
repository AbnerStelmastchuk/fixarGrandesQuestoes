/*
Obter usúario
Obter número de telefone a partir do id do usúario
Obter endereco do usuario
*/

//Agora é pra valer

const util = require('util')
const obterEnderecoAsync = util.promisify(endereco)

function usuario(){
    return new Promise((resolve, reject) => {
        return resolve({
            id: 10,
            nome: 'Abner',
            dataNascimento: new Date()
        })
    })
}
function telefone(idUsuario){
    return new Promise((resolve, reject) => {
        return resolve({
            numeroTel: '999604805',
            ddd: '43'
        })
    })
}
function endereco(idUsuario, callback){
        return callback (null, {
            rua: 'Rua 8',
            numero: '145'
        })
    }

usuario()
    .then(function (usuario) {
        return telefone(usuario.id)
            .then(function pegarTelefone(result) {
                return {
                    usuario: {
                        nome: usuario.nome,
                        id: usuario.id
                    },
                    telefone: result
                }
            })
    })
    .then(resultado => {
        const endereco = obterEnderecoAsync(resultado.usuario.id)
        return endereco.then(result => {
            return {
                usuario: resultado.usuario,
                telefone: resultado.telefone,
                endereco: result
            }
        })
    })
    .then(imprimir => console.log(`
        Nome: ${imprimir.usuario.nome}
        Endereco: ${imprimir.endereco.rua}, ${imprimir.endereco.numero}
        Telefone: ${imprimir.telefone.ddd}, ${imprimir.telefone.numeroTel}
    `))
    .catch(error => console.error('Deu Ruim!!!', error))
