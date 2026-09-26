import style from "./Leitura.module.css";
import leitura from "../data/Leitura.json";
import Button from "../components/button/Button"
import { useState } from "react";

const Leitura = () => {
    const [posLeitura, setPosLeitur] = useState(2);

    const onClickLeitura = (val) => {
        setPosLeitur(posLeitura + val);;
    };

    return (
        <div className={style.container}>
            <div className={style.poroximoLivro}> <Button onClick={() => { onClickLeitura(1) }}>Proximo</Button> </div>
            <div className={style.anteriorLivro}> <Button onClick={() => { onClickLeitura(-1) }}>Anterior</Button> </div>
            <div className={style.header}>
                <h1>
                    {
                        leitura[posLeitura].livro
                    }
                </h1>
            </div>
            <div className={style.content}>
                {
                    leitura[posLeitura].versiculos.map((versiculo) => {
                        return (

                            <div key={versiculo.num_vers} className={style.verse}>
                                <span className={style.number}>{versiculo.num_vers}</span>
                                {versiculo.vers}
                            </div>
                        )
                    }
                    )
                }
            </div>
        </div>
    )
}

export default Leitura;