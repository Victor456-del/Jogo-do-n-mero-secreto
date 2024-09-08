let numerosSorteados = []
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTexto(tag, texto)
{
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

exibirMensagemInicial();

function verificarChute()
{
    let chute = document.querySelector('input').value;
    console.log(numeroSecreto);
    if(chute == numeroSecreto)
    {
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        exibirTexto('h1', 'Acertou');
        let mensagemTentativas = `Você adivinhou o número secreto em ${tentativas} ${palavraTentativa}`;
        exibirTexto('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }
    else
    {
        if(chute > numeroSecreto)
        {
            exibirTexto('p', `O número secreto é menor que ${chute}` );
        }
        else
        {
            exibirTexto('p', `O número secreto é maior que ${chute}` );
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio()
{
    let numeroEscolhido =  parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementos = numerosSorteados.length;

    if(quantidadeDeElementos == 9)
    {
        numerosSorteados = [];
    }
    if(numerosSorteados.includes(numeroEscolhido))
    {
        return gerarNumeroAleatorio();
    }
    else
    {
        numerosSorteados.push(numeroEscolhido);
        console.log(numerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo()
{
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciar()
{
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    document.getElementById('reiniciar').setAttribute('disabled', 'true');
    exibirMensagemInicial();
}

function exibirMensagemInicial()
{
    exibirTexto('h1', 'Jogo do número secreto');
    exibirTexto('p', 'digite um número de 1 a 10');
}