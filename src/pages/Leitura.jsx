import style from "./Leitura.module.css";
import leitura from "../data/Leitura.json";
const Leitura = () => {
    return (
        <div className={style.container}>
            <div className={style.header}>
                <h1>
                    {
                        leitura[1].livro
                    }
                </h1>
            </div>
            <div className={style.content}>
                {
                    leitura[1].versiculos.map((versiculo) => {
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