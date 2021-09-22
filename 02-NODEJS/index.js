/*
Obter usúario
Obter número de telefone a partir do id do usúario
Obter endereco do usuario
*/

//asfasfasfasfas

function obterUsuario(callback) {
    setTimeout(() => {
        return callback(null, {
            id: 1,
            nome: 'Aladin',
            dataNascimento: new Date()
        })
    }, 1000)
}

function obterTelefoneDoUsuario(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            telefone: '11990002',
            ddd: 11
        })
    }, 2000)
}

function obterEnderecoDoUsuario(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'dos bobos',    
            numero: 0
        })
    }, 2000)
}

function resolverUsuario(errp, usuario){
    console.log('Usuario', usuario)
}

obterUsuario(function resolverUsuario(error, usuario) {
    if(error) {
        console.error('DEU RUIM em USUARIO', error)
        return
    }
    obterTelefoneDoUsuario(usuario.id, function resolverTelefone(error1, telefone){
        if(error1){
            console.error('DEU RUIM em USUARIO')
            return
        }
        obterEnderecoDoUsuario(usuario.id, function resolverEndereco(error2, endereco) {
            if(error2){
                console.error('DEU RUIM em USUARIO')
                return
            }

            console.log(`
            Nome: ${usuario.nome}
            Endereco: ${endereco.rua}, Numero: ${endereco.numero}
            Telefone: ${telefone.ddd}, ${telefone.telefone}
            `)
        })
    })
})