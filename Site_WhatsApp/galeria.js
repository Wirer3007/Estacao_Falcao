
const filtros = document.querySelectorAll(".filtro");
const itensGaleria = document.querySelectorAll(".item-galeria");

const lightbox = document.getElementById("lightbox");
const imagemAmpliada = document.getElementById("imagemAmpliada");
const contador = document.getElementById("contador");

const botaoFechar = document.getElementById("fechar");
const botaoAnterior = document.getElementById("anterior");
const botaoProximo = document.getElementById("proximo");

let imagensVisiveis = [];
let indiceAtual = 0;
let ultimoElementoFocado = null;


const imagensBanner = [
    "15AR.jpeg",
    "mesa.jpeg",
    "rosa.jpeg",
    "bonito.jpeg",
    "verde.jpeg",
    "Pcolorido.jpeg"
];

let indiceBanner = 0;

const imagemBannerGaleria =
    document.getElementById("imagemBannerGaleria");

setInterval(() => {
    indiceBanner =
        (indiceBanner + 1) % imagensBanner.length;

    imagemBannerGaleria.style.opacity = "0";

    setTimeout(() => {
        imagemBannerGaleria.src = imagensBanner[indiceBanner];
        imagemBannerGaleria.style.opacity = "0.55";
    }, 500);

}, 3000);


function atualizarGaleria(categoria) {
    itensGaleria.forEach((item) => {
        const corresponde =
            categoria === "todos" ||
            item.dataset.categoria === categoria;

        item.classList.toggle("oculto", !corresponde);
    });

    imagensVisiveis = Array.from(itensGaleria).filter(
        item => !item.classList.contains("oculto")
    );
}

filtros.forEach((botao) => {
    botao.addEventListener("click", () => {
        filtros.forEach(filtro => {
            filtro.classList.remove("ativo");
        });

        botao.classList.add("ativo");

        atualizarGaleria(botao.dataset.categoria);
    });
});


function abrirImagem(indice) {
    if (imagensVisiveis.length === 0) return;

    indiceAtual =
        (indice + imagensVisiveis.length) %
        imagensVisiveis.length;

    const item = imagensVisiveis[indiceAtual];
    const imagem = item.querySelector("img");

    imagemAmpliada.src = imagem.src;
    imagemAmpliada.alt = imagem.alt;

    contador.textContent =
        `${indiceAtual + 1} / ${imagensVisiveis.length}`;

    lightbox.classList.add("aberto");
    lightbox.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";
    botaoFechar.focus();
}

itensGaleria.forEach((item) => {
    item.addEventListener("click", () => {
        imagensVisiveis = Array.from(itensGaleria).filter(
            foto => !foto.classList.contains("oculto")
        );

        const indice = imagensVisiveis.indexOf(item);

        if (indice !== -1) {
            ultimoElementoFocado = item;
            abrirImagem(indice);
        }
    });
});



function fecharImagem() {
    lightbox.classList.remove("aberto");
    lightbox.setAttribute("aria-hidden", "true");

    imagemAmpliada.src = "";
    document.body.style.overflow = "";

    if (ultimoElementoFocado) {
        ultimoElementoFocado.focus();
    }
}

botaoFechar.addEventListener("click", fecharImagem);



botaoProximo.addEventListener("click", () => {
    abrirImagem(indiceAtual + 1);
});

botaoAnterior.addEventListener("click", () => {
    abrirImagem(indiceAtual - 1);
});



document.addEventListener("keydown", (evento) => {
    if (!lightbox.classList.contains("aberto")) return;

    if (evento.key === "Escape") {
        fecharImagem();
    }

    if (evento.key === "ArrowRight") {
        abrirImagem(indiceAtual + 1);
    }

    if (evento.key === "ArrowLeft") {
        abrirImagem(indiceAtual - 1);
    }
});



atualizarGaleria("todos");
