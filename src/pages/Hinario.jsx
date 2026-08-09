import { useState } from "react";
import style from "./Hinario.module.css";

import hinos from "../data/Hinario.json";

const Hinario = () => {

    const [hinoSelecionado, setHinoSelecionado] = useState(hinos[0]);

    console.log(hinos);
    const selecionarHino = (event) => {

        const numero = Number(event.target.value);

        const hino = hinos.find(
            (item) => item.numero === numero
        );
        console.log(hinoSelecionado);

        setHinoSelecionado(hino || null);
    };


    return (

        <div className={style.container}>

            {/* =========================
                TOPO
            ========================= */}

            <div className={style.topo_hinarios}>

                <div className={style.logo}>

                    <h2>
                        Hinários de Restauração
                    </h2>

                </div>


                <div className={style.menuSuperior}>

                    <label>

                        Hino:

                        <select
                            value={
                                hinoSelecionado
                                    ? hinoSelecionado.numero
                                    : ""
                            }
                            onChange={selecionarHino}
                        >
                            {hinos.map((hino) => (

                                <option
                                    key={hino.numero}
                                    value={hino.numero}
                                >

                                    {String(hino.numero).padStart(3, "0")}
                                    {" - "}
                                    {hino.titulo}

                                </option>

                            ))}

                        </select>

                    </label>

                </div>

            </div>


            {/* =========================
                CONTEÚDO
            ========================= */}

            <main>

                <div className={style.letra}>

                    {!hinoSelecionado && (

                        <div className={style.primeira_estrofe}>

                            <h1>
                                Escolha um hino
                            </h1>

                            <p>
                                Selecione um hino no menu acima
                                para iniciar a leitura.
                            </p>

                        </div>

                    )}


                    {hinoSelecionado && (

                        <>

                            {/* PRIMEIRA ESTROFE */}

                            {hinoSelecionado.estrofes?.[0] && (

                                <div className={style.primeira_estrofe}                                >

                                    <p>

                                        {/* <span className={style.numero_estrofe}>
                                            1.
                                        </span> */}

                                        {hinoSelecionado.estrofes[0]}

                                    </p>

                                </div>

                            )}


                            {/* CORO */}

                            {hinoSelecionado.coro && (

                                <div
                                    className={style.coro}
                                >

                                    <p>

                                        <strong>
                                            CORO
                                        </strong>

                                        <br />

                                        {hinoSelecionado.coro}

                                    </p>

                                </div>

                            )}


                            {/* OUTRAS ESTROFES */}

                            {hinoSelecionado.estrofes
                                ?.slice(1)
                                .map((estrofe, index) => (

                                    <div className={style.outras_estrofes} key={index}>

                                        <p>

                                            {estrofe}
                                        </p>
                                    </div>))}</>)}</div></main></div>
    );
}


export default Hinario;
