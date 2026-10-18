const imagens = [
    'XV.jpeg',
    'bonito.jpeg',
    'doceF.jpe',
    'macaron.jpeg',
    'verde.jpeg',
    'cereja.jpeg'
];

const cardapios = {
    Tradicional: [
        "salgadinhos1.png",
        "frios.jpeg"
    ],

    Jantar: [
        "comida1.jpeg",
        "comida2.jpeg"
    ]
};

const descricoes = {
    Tradicional: `
        <h2>Cardápio Tradicional</h2>
        <p>Inclui:</p>
        <ul>
            <li>Salgadinhos variados</li>
            <li>Frios</li>
            <li>Batata Frita</li>
            <li>Mini Pizzas</li>
            <li>Mini Hamburgueres</li>
            <li>Doces a se definir com o responsável</li>

        </ul>
    `,

    Jantar: `
        <h2>Cardápio Jantar</h2>
        <p>Inclui:</p>
        <ul>
            <li>Buffe com pratos variados, que inclui</li>
            <li>Saladas</li>
            <li>Acompanhamentos</li>
            <li>Proteínas</li>
            <li>Massas</li>
            <li>Doces a se definir com o responsável</li>
        </ul>
    `
};

let indiceAtual = 0;

const Banner = document.getElementById('imagemBanner');

function MostrarImagem(Direcao) {

    indiceAtual = (indiceAtual + Direcao + imagens.length) % imagens.length;

    Banner.src = imagens[indiceAtual];
}

setInterval(() => {
    MostrarImagem(1);
}, 3000);

let cardapioAtual = [];
let paginaAtual = 0;
let nomeCardapioAtual = "";

const visualizador = document.getElementById("visualizador");
const imagemAtual = document.getElementById("imagemAtual");
const contador = document.getElementById("contador");


function abrirCardapio(nome) {

    nomeCardapioAtual = nome;
    cardapioAtual = cardapios[nome];
    paginaAtual = 0;

    document.getElementById("opcoesCardapio").style.display = "none";

    visualizador.classList.remove("oculto");
    MostrarPagina();
}


function MostrarPagina() {
    imagemAtual.src = cardapioAtual[paginaAtual];

    contador.textContent =
        `Página ${paginaAtual + 1} de ${cardapioAtual.length}`;
}


document.getElementById("proximo").addEventListener("click", () => {
    paginaAtual = (paginaAtual + 1) % cardapioAtual.length;
    MostrarPagina();
});


document.getElementById("anterior").addEventListener("click", () => {
    paginaAtual = (paginaAtual - 1 + cardapioAtual.length)
        % cardapioAtual.length;

    MostrarPagina();
});


document.getElementById("fechar").addEventListener("click", () => {
    visualizador.classList.add("oculto");
    document.getElementById("opcoesCardapio").style.display = "";
    imagemAtual.src = "";
    document.getElementById("descricao").classList.add("oculto");
});


document.getElementById("verDescricao").addEventListener("click", () => {
    const descricao = document.getElementById("descricao");

    descricao.innerHTML = descricoes[nomeCardapioAtual];
    descricao.classList.toggle("oculto");
});