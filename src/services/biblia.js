const API_URL = "https://abibliadigital.api.br/api";


// ==========================================
// BUSCAR TODOS OS LIVROS
// ==========================================

export const buscarLivros = async () => {

    const resposta = await fetch(`${API_URL}/books`);

    if (!resposta.ok) {
        throw new Error(
            "Não foi possível carregar os livros da Bíblia."
        );
    }

    const dados = await resposta.json();

    return dados;
};


// ==========================================
// BUSCAR UM CAPÍTULO
// ==========================================

export const buscarCapitulo = async (livro, capitulo) => {

    const resposta = await fetch(
        `${API_URL}/verses/acf/${livro}/${capitulo}`
    );

    if (!resposta.ok) {
        throw new Error(
            `Não foi possível carregar ${livro} capítulo ${capitulo}.`
        );
    }

    const dados = await resposta.json();

    return dados;
};