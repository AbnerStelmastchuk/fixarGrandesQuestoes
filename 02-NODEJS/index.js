/*
Obter usúario
Obter número de telefone a partir do id do usúario
Obter endereco do usuario
*/

//Agora é pra valer

function usuario(){
    return new Promise((resolve, reject) => {
        return resolve({
            id: 10,
            nome: 'Abner',
            dataNascimento: new Date()
        })
    })
}

function telefone(){
    return new Promise((resolve, reject) => {
        return resolve({
            telefone: '999604805',
            ddd: '43'
        })
    })
}

function endereco(){
    return new Promise((resolve, reject) => {
        return resolve ({
            rua: 'Rua 8',
            numero: '145'
        })
    })
}

async function chamarUsuario(){
    const chamada = await usuario()
    usuario().then(usuario => console.log(`O idUser é: ${chamada.id} Nome: ${chamada.nome} DataNasc: ${chamada.dataNascimento}`))
}

async function chamarTelefone(){
    const chamada = await telefone()
    telefone().then(telefone => console.log(`O telefone é: ${chamada.ddd} ${chamada.telefone}`))
}

async function chamarEndereco(){
    const chamada = await endereco()
    endereco().then(endereco => console.log(`O endereço é: ${chamada.rua} Numero:${chamada.numero}`))
}

chamarUsuario()
chamarTelefone()
chamarEndereco()