let nomes = []; 
/* entrarNaSala()
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
} */
const promessa = axios.get("https://mock-api.driven.com.br/api/v6/uol/participants");
promessa.then(chegou)
console.log(promessa);

function chegou(resposta){
    console.log("Os dados chegaram");
    console.log(resposta.data);
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