const cores = ["#FFD700", "#FF69B4", "#00BFFF", "#32CD32", "#ff571aff", "#ca9bf7ff", "#FF6347"];

function selecionar(idGenero, botao) {
    document.querySelectorAll(".container button").forEach(b => {
        b.classList.remove("ativo");
        b.style.backgroundColor = "";
        b.style.color = "";
    });
    
    botao.classList.add("ativo");

    buscarMusica(idGenero);
    document.getElementById("conteudo").innerHTML = "Carregando...";

    corEscolhida = cores[Math.floor(Math.random() * cores.length)];
    document.body.style.backgroundColor = corEscolhida;
    botao.style.backgroundColor = corEscolhida;

    document.querySelectorAll(".container button").forEach(b => {
        if (!b.classList.contains("ativo")) {
            b.style.color = corEscolhida;
        } else {
            b.style.color = "";
        }
    });
}

function buscarMusica(idGenero) {
    const script = document.createElement("script");
    script.src = `https://api.deezer.com/genre/${idGenero}/artists?output=jsonp&callback=exibirArtistas`;
    document.body.appendChild(script);
}

function exibirArtistas(dadosArtistas) {
    const artista = dadosArtistas.data[Math.floor(Math.random() * dadosArtistas.data.length)];
    const script = document.createElement("script");
    script.src = `https://api.deezer.com/artist/${artista.id}/top?output=jsonp&callback=exibirMusicas`;
    document.body.appendChild(script);
}

function exibirMusicas(dadosMusicas) {
    const faixa = dadosMusicas.data[Math.floor(Math.random() * dadosMusicas.data.length)];
    const embed = `
        <h2>${faixa.title}</h2>
        <p>Artista: ${faixa.artist.name}</p>
        <iframe scrolling=no frameborder=no allowTransparency=true
            src="https://widget.deezer.com/widget/dark/track/${faixa.id}" width="100%" height="230">
        </iframe>
    `;
    document.getElementById("conteudo").innerHTML = embed;
}