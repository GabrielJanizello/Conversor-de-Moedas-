let valor = document.getElementById('valor');
let moedaInicial = document.getElementById('inicial');
let moedaConversora = document.getElementById('conversora');
let resultado = document.getElementById('res');

const API_KEY = "a13179911581bb8a34e1b5df";
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/BRL`;

let taxasDeCambio = {};

// Função para atualizar as taxas de câmbio
async function atualizarMoedas() {
    try {
        let resposta = await fetch(API_URL);
        let dados = await resposta.json();
        taxasDeCambio = dados.conversion_rates;

        moedaInicial.innerHTML = "";
        moedaConversora.innerHTML = "";

        for (let moeda in taxasDeCambio) {
            let option1 = document.createElement("option");
            option1.value = moeda;
            option1.textContent = moeda;
            moedaInicial.appendChild(option1);

            let option2 = document.createElement("option");
            option2.value = moeda;
            option2.textContent = moeda;
            moedaConversora.appendChild(option2);
        }
    } catch (erro) {
        console.error("Erro ao obter taxas de câmbio:", erro);
        alert("Falha ao atualizar as taxas de câmbio. Verifique sua conexão.");
    }
}

// Função para conversão de moedas
function converter() {
    let valorDigitado = (valor.value)

    if (!numValor(valorDigitado)) {
        alert("Valor inválido, verifique antes de converter!");
        return false;
    }

    let moedaOrigem = moedaInicial.value;
    let moedaDestino = moedaConversora.value;
    let valorConvertido = Number(valorDigitado);

    if (taxasDeCambio[moedaOrigem] && taxasDeCambio[moedaDestino]) {
        let taxaOrigem = taxasDeCambio[moedaOrigem];
        let taxaDestino = taxasDeCambio[moedaDestino];

        let resultadoFinal = (valorConvertido / taxaOrigem) * taxaDestino;
        resultado.innerHTML = `<p>A moeda convertida será: ${resultadoFinal.toFixed(2)} ${moedaDestino}</p>`;
        resultado.innerHTML += `Valores apresentados já incluem taxas!`
    } else {
        alert("Erro ao converter moedas. Tente novamente.");
    }
}

// Função para validar se o valor é positivo
function numValor(n) {
    return Number(n) > 0;
}

// Atualiza as taxas ao carregar a página
atualizarMoedas();

function updateRelogio(){
    const now = new Date()
    const horas = String(now.getHours()).padStart(2,'0')
    const minutos = String(now.getMinutes()).padStart(2,'0')
    const segundos = String(now.getSeconds()).padStart(2,'0')

    const tempoString = `${horas}:${minutos}:${segundos}`
    document.getElementById('relogioHoras').textContent = tempoString

    const dataExt = {weekday:'long', year:'numeric', month:'long', day:'numeric'}
    const dataString = now.toLocaleDateString('pt-br', dataExt)
    document.getElementById('data').textContent = dataString
}

setInterval(updateRelogio, 1000)
updateRelogio()

document.addEventListener("DOMContentLoaded", function () {
    let items = document.querySelectorAll(".carrossel-item");
    let dots = document.querySelectorAll(".dot");
    let index = 0;
    let interval;

    function changeSlide(newIndex) {
        items[index].classList.remove("active");
        dots[index].classList.remove("active");

        index = newIndex;

        items[index].classList.add("active");
        dots[index].classList.add("active");

        resetTimer();
    }

    function nextSlide() {
        changeSlide((index + 1) % items.length);
    }

    function resetTimer() {
        clearInterval(interval);
        interval = setInterval(nextSlide, 15000);
    }

    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => changeSlide(i));
    });

    interval = setInterval(nextSlide, 15000);
});







