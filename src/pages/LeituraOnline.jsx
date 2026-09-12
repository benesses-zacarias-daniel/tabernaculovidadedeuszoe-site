import { useEffect, useRef, useState } from "react";

import style from "./LeituraOnline.module.css";

import {
    buscarLivros,
    buscarCapitulo
} from "../services/biblia";


const Leitura = () => {

    // ==========================================
    // ESTADOS
    // ==========================================

    const [livros, setLivros] = useState([]);

    const [livroSelecionado, setLivroSelecionado] = useState("");

    const [capitulo, setCapitulo] = useState(1);

    const [versiculos, setVersiculos] = useState([]);

    const [versiculoSelecionado, setVersiculoSelecionado] = useState(1);

    const [versiculoInput, setVersiculoInput] = useState("1");

    const [carregandoLivros, setCarregandoLivros] = useState(true);

    const [carregandoCapitulo, setCarregandoCapitulo] = useState(false);

    const [erro, setErro] = useState("");


    // ==========================================
    // REFERÊNCIA DOS VERSÍCULOS
    // ==========================================

    const versiculosRef = useRef({});


    // ==========================================
    // CARREGAR LIVROS
    // ==========================================

    useEffect(() => {

        const carregarLivros = async () => {

            try {

                setCarregandoLivros(true);

                setErro("");


                const dados = await buscarLivros();


                setLivros(dados);


                // Começar automaticamente pelo primeiro livro
                if (dados.length > 0) {

                    setLivroSelecionado(
                        dados[0].abbrev.pt
                    );

                }


            } catch (error) {

                console.error(error);

                setErro(
                    "Não foi possível carregar os livros da Bíblia."
                );

            } finally {

                setCarregandoLivros(false);

            }

        };


        carregarLivros();

    }, []);


    // ==========================================
    // CARREGAR CAPÍTULO
    // ==========================================

    useEffect(() => {

        if (!livroSelecionado) {
            return;
        }


        const carregarCapitulo = async () => {

            try {

                setCarregandoCapitulo(true);

                setErro("");


                const dados = await buscarCapitulo(
                    livroSelecionado,
                    capitulo
                );


                setVersiculos(
                    dados.verses || []
                );


                // Sempre começar no primeiro versículo
                setVersiculoSelecionado(1);

                setVersiculoInput("1");


            } catch (error) {

                console.error(error);

                setErro(
                    "Não foi possível carregar este capítulo."
                );

                setVersiculos([]);

            } finally {

                setCarregandoCapitulo(false);

            }

        };


        carregarCapitulo();

    }, [livroSelecionado, capitulo]);


    // ==========================================
    // FOCAR NO VERSÍCULO
    // ==========================================

    const focarVersiculo = (numero) => {

        setVersiculoSelecionado(numero);

        setVersiculoInput(
            String(numero)
        );


        setTimeout(() => {

            const elemento =
                versiculosRef.current[numero];


            if (elemento) {

                elemento.scrollIntoView({

                    behavior: "smooth",

                    block: "center"

                });

            }

        }, 50);

    };


    // ==========================================
    // MUDAR LIVRO
    // ==========================================

    const mudarLivro = (event) => {

        const novoLivro =
            event.target.value;


        setLivroSelecionado(novoLivro);


        // Ao mudar o livro,
        // voltar para capítulo 1
        setCapitulo(1);


        // E versículo 1
        setVersiculoSelecionado(1);

        setVersiculoInput("1");

    };


    // ==========================================
    // MUDAR CAPÍTULO
    // ==========================================

    const mudarCapitulo = (event) => {

        const novoCapitulo =
            Number(event.target.value);


        setCapitulo(novoCapitulo);


        // Sempre começar no versículo 1
        setVersiculoSelecionado(1);

        setVersiculoInput("1");

    };


    // ==========================================
    // MUDAR VERSÍCULO
    // ==========================================

    const escolherVersiculo = (event) => {

        const numero =
            Number(event.target.value);


        if (!numero) {
            return;
        }


        focarVersiculo(numero);

    };


    // ==========================================
    // DIGITAR VERSÍCULO + ENTER
    // ==========================================

    const procurarVersiculo = (event) => {

        if (event.key !== "Enter") {
            return;
        }


        const numero =
            Number(versiculoInput);


        if (!numero) {
            return;
        }


        const existe =
            versiculos.some(
                (versiculo) =>
                    versiculo.number === numero
            );


        if (existe) {

            focarVersiculo(numero);

        } else {

            alert(
                `O versículo ${numero} não existe neste capítulo.`
            );

        }

    };


    // ==========================================
    // PRÓXIMO VERSÍCULO
    // ==========================================

    const proximoVersiculo = () => {

        const atual =
            versiculoSelecionado;


        const proximo =
            atual + 1;


        // --------------------------------------
        // AINDA EXISTE VERSÍCULO
        // --------------------------------------

        const existeProximo =
            versiculos.some(
                (versiculo) =>
                    versiculo.number === proximo
            );


        if (existeProximo) {

            focarVersiculo(proximo);

            return;

        }


        // --------------------------------------
        // TERMINOU O CAPÍTULO
        // --------------------------------------

        const livroAtual =
            livros.find(
                (livro) =>
                    livro.abbrev.pt ===
                    livroSelecionado
            );


        if (!livroAtual) {
            return;
        }


        // --------------------------------------
        // EXISTE OUTRO CAPÍTULO
        // --------------------------------------

        if (capitulo < livroAtual.chapters) {

            setCapitulo(
                capitulo + 1
            );

            return;

        }


        // --------------------------------------
        // TERMINOU O LIVRO
        // --------------------------------------

        const indiceLivro =
            livros.findIndex(
                (livro) =>
                    livro.abbrev.pt ===
                    livroSelecionado
            );


        const proximoLivro =
            livros[indiceLivro + 1];


        if (proximoLivro) {

            setLivroSelecionado(
                proximoLivro.abbrev.pt
            );

            setCapitulo(1);

            setVersiculoSelecionado(1);

            setVersiculoInput("1");

        }

    };


    // ==========================================
    // LIVRO ATUAL
    // ==========================================

    const livroAtual =
        livros.find(
            (livro) =>
                livro.abbrev.pt ===
                livroSelecionado
        );


    // ==========================================
    // CARREGANDO LIVROS
    // ==========================================

    if (carregandoLivros) {

        return (

            <div className={style.loading}>

                <p>
                    Carregando Bíblia...
                </p>

            </div>

        );

    }


    // ==========================================
    // INTERFACE
    // ==========================================

    return (

        <div className={style.container}>

            {/* =================================
                CABEÇALHO
            ================================= */}

            <div className={style.header}>

                <h1>
                    {livroAtual?.name || "Bíblia"}
                </h1>

                <h2>
                    Capítulo {capitulo}
                </h2>

            </div>


            {/* =================================
                CONTROLES
            ================================= */}

            <div className={style.controles}>


                {/* LIVRO */}

                <div className={style.controle}>

                    <label>
                        Livro
                    </label>

                    <select
                        value={livroSelecionado}
                        onChange={mudarLivro}
                    >

                        {livros.map((livro) => (

                            <option
                                key={livro.abbrev.pt}
                                value={livro.abbrev.pt}
                            >

                                {livro.name}

                            </option>

                        ))}

                    </select>

                </div>


                {/* CAPÍTULO */}

                <div className={style.controle}>

                    <label>
                        Capítulo
                    </label>

                    <select
                        value={capitulo}
                        onChange={mudarCapitulo}
                    >

                        {Array.from(
                            {
                                length:
                                    livroAtual?.chapters || 1
                            },
                            (_, index) => (

                                <option
                                    key={index + 1}
                                    value={index + 1}
                                >

                                    {index + 1}

                                </option>

                            )
                        )}

                    </select>

                </div>


                {/* VERSÍCULO */}

                <div className={style.controle}>

                    <label>
                        Versículo
                    </label>

                    <select
                        value={versiculoSelecionado}
                        onChange={escolherVersiculo}
                    >

                        {versiculos.map(
                            (versiculo) => (

                                <option
                                    key={versiculo.number}
                                    value={versiculo.number}
                                >

                                    {versiculo.number}

                                </option>

                            )
                        )}

                    </select>

                </div>


                {/* IR PARA */}

                <div className={style.controle}>

                    <label>
                        Ir para
                    </label>

                    <input
                        type="number"
                        min="1"
                        value={versiculoInput}
                        onChange={(event) =>
                            setVersiculoInput(
                                event.target.value
                            )
                        }
                        onKeyDown={procurarVersiculo}
                        placeholder="Versículo"
                    />

                </div>


                {/* PRÓXIMO */}

                <button
                    className={style.proximo}
                    onClick={proximoVersiculo}
                >

                    Próximo

                </button>

            </div>


            {/* =================================
                ERRO
            ================================= */}

            {erro && (

                <div className={style.erro}>

                    {erro}

                </div>

            )}


            {/* =================================
                VERSÍCULOS
            ================================= */}

            <div className={style.content}>

                {carregandoCapitulo ? (

                    <div className={style.loading}>

                        <p>
                            Carregando capítulo...
                        </p>

                    </div>

                ) : (

                    versiculos.map(
                        (versiculo) => (

                            <div
                                key={versiculo.number}

                                ref={(elemento) => {

                                    versiculosRef.current[
                                        versiculo.number
                                    ] = elemento;

                                }}

                                className={`
                                    ${style.verse}
                                    ${versiculoSelecionado ===
                                        versiculo.number
                                        ? style.verseAtivo
                                        : ""
                                    }
                                `}

                                onClick={() =>
                                    focarVersiculo(
                                        versiculo.number
                                    )
                                }
                            >

                                <span
                                    className={
                                        style.number
                                    }
                                >

                                    {versiculo.number}

                                </span>


                                <span
                                    className={
                                        style.texto
                                    }
                                >

                                    {versiculo.text}

                                </span>

                            </div>

                        )
                    )

                )}

            </div>

        </div>

    );

};


export default Leitura;