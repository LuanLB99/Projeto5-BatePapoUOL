 /* let nomes = []; 
entrarNaSala()
function entrarNaSala(){
    let nome = prompt("Digite seu lindo nome")

    const usuario = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants",{
        name: nome,
    });

    usuario.then(podeEntrar);
    usuario.catch(escolhaOutronome);
};

function podeEntrar() {
    puxaParticipantes();
}

function escolhaOutronome(erro){
    const status = erro.response.status;
    if(status === 400) {
       entrarNaSala();
    }
}
function puxaParticipantes() {
    const participantes = axios.get("https://mock-api.driven.com.br/api/v6/uol/participants");
    participantes.then(chegou);
}

function chegou(resposta){
    nomes = resposta.data;
    atualizaNomes();

}

function atualizaNomes(){
    const ul = document.querySelector('.conversas');
    for (let i = 0; i < nomes.length; i++) {
        ul.innerHTML +=
        `
        <li>${nomes[i].name} entrou na sala</li>
        `
    }
}
}*/

let mensagens = [];
buscarMensagens();

function buscarMensagens() {
    let from;
    let to;
    let text;
    let type;
    let time;
    const mensagens = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages",{
        from: from,
        to: to,
        text: text,
        type: type,
        time: time,
    } );

    mensagens.then(puxaMensagens);
}

function puxaMensagens(mensagem){
    mensagens = mensagem.data;
    insereMensagens();
}

function insereMensagens(){
    const ul = document.querySelector('.conversas');
    for (let i = 0; i < mensagens.length; i++){
        if(mensagens[i].type === "message") {
        ul.innerHTML +=
        ` 
        <li>${mensagens[i].from} para ${mensagens[i].to}: ${mensagens[i].text} </li>
        `}
        else if (mensagens[i].type === "status") {
            ul.innerHTML +=
            ` 
            <li>${mensagens[i].from} entra na sala... </li>
            `
        }

        else if (mensagens[i].type === "private_message") {
            ul.innerHTML +=
            ` 
        <li>${mensagens[i].from} reservadamente para ${mensagens[i].to}: ${mensagens[i].text} </li>
        `
        }
    }
}

setInterval(buscarMensagens, 3000);