import Logo from "../assets/logo/log.png";
import Img from "../components/img/Img";
import style from "./Tema.module.css";

import tema from "../data/Temas.json";

const Tema = () => {
    return (
        <div className={style.container}>
            <div className={style.area_info}>

                <Img src={Logo} className={style.logo} />
                <h2 className={style.tab_nome}>
                    Tabernáculo Vida de Deus - Zoe
                </h2>
                <div className={style.tema}>

                    <div className={style.linhaTema}>

                        <span className={style.tituloTema}>
                            TEMA:
                        </span>

                        <span className={style.foco}>
                            {tema[0].tema.toUpperCase()}
                        </span>

                    </div>

                </div>
            </div>

            <div className={style.referencia_biblicas}>

                <div>

                    <h1 className={style.livros}>
                        {
                            tema[0].livros.map((livro, pos) => {
                                return (

                                    <li key={pos}>
                                        {livro}
                                    </li>
                                )
                            })
                        }
                    </h1>

                </div>

            </div>

            <div className={style.footer}>
                # Ao Serviço do Senhor Mestre Jesus Cristo
            </div>

        </div>
    )
}

export default Tema;