const imagens = [
    'boloP.jpeg',
    'bonito.jpeg',
    'mesa.jpeg',
    'rosa.jpeg',
    'verde.jpeg',
    '15AR.jpeg'
];

let indiceAtual = 0;

const Banner = document.getElementById('imagemBanner');

function MostrarImagem(Direcao) {

    indiceAtual = (indiceAtual + Direcao + imagens.length) % imagens.length;

    Banner.src = imagens[indiceAtual];
}

setInterval(() => {
    MostrarImagem(1);
}, 3000);