let from;
let to;
let text;
let type;
let time;
let nome = prompt("Digite seu lindo nome");
let message;
let texto;
let nomes = []; 
let mensagens = [];

entrarNaSala()
function entrarNaSala(){
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


buscarMensagens();

function buscarMensagens() {
    
    const mensagens = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages",{
        from: nome,
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
    ul.innerHTML = ''
    for (let i = 0; i < mensagens.length; i++){
        if(mensagens[i].type === "message") {
        ul.innerHTML +=
        ` 
       
        <li class="mensagem">  <span class="horario"> (${mensagens[i].time})</span> <span class="texto"> <bold>${mensagens[i].from}</bold> para <bold>${mensagens[i].to}</bold>: ${mensagens[i].text} </span> </li>
        `}
        else if (mensagens[i].type === "status") {
            ul.innerHTML +=
            ` 
            <li class="entrada"> <span class="horario"> (${mensagens[i].time})</span> <span class="texto"> <bold>${mensagens[i].from}</bold> ${mensagens[i].text} </span> </li>
            `
        }

        else if (mensagens[i].type === "private_message") {
            ul.innerHTML +=
            ` 
        <li class="reservado">(${mensagens[i].time}) <bold>${mensagens[i].from}</bold> reservadamente para <bold>${mensagens[i].to}</bold>: ${mensagens[i].text} </li>
        `
        }
    }

}

setInterval(buscarMensagens, 3000); 

function enviarMensagem() {
    const destinatario = "Todos";
    const tipo = "message";
    let textarea = document.getElementById('novaMsg').value;
    const novamensagem = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", {
    from: nome,
	to: destinatario,
	text: textarea,
	type: tipo,
    });
    document.getElementById('novaMsg').value = ""
    console.log(nome);
    console.log(textarea);
    console.log(tipo);
    console.log(destinatario);
    novamensagem.then(mandaMsg);
    novamensagem.catch(deuErro);
}

function deuErro() {
    console.log('deuMerda!!')
}

function mandaMsg() {
    const ul = document.querySelector('.conversas');
    ul.innerHTML +=  ` 
    <li>${nome} para Todos: ${texto} </li>
    `
}
