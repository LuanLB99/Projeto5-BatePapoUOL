entrarNaSala()
function entrarNaSala(){
    let nome = prompt("Digite seu lindo nome")

    const promessa = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants",{
        name: nome,
    });

    promessa.then(podeEntrar);
    promessa.catch(escolhaOutronome);
};

function podeEntrar() {
    console.log("deu certo!")
}

function escolhaOutronome(erro){
    const status = erro.response.status;
    if(status === 400) {
       entrarNaSala();
    }
}

function carregaMensagens(){
    const promessa = axio.get("https://mock-api.driven.com.br/api/v6/uol/participants")
}
