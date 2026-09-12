import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import style from "./Menu.module.css";
import Button from "../../button/Button";
import Img from "../../img/Img";



const Menu = ({ mostrarIcone = false, mostrarMenu = false, onClickOcultar, classContaner = style.contaner_menu, classeLinkMenu = style.link_menu, classeBtnMenu = style.btn_menu, mostrarIconesMenu = false }) => {
    const { pathname } = useLocation();
    const [paginaActiva, setPaginaActiva] = useState(pathname);

    useEffect(() => {
        // console.log(pathname);
        setPaginaActiva(pathname);
        // console.log(paginaActiva);
    }, [pathname])

    return (

        mostrarMenu && (
            <nav>

                <div className={classContaner} id="contaner_menu" onClick={(evt) => {
                    if (evt.target.id === "contaner_menu") {
                        onClickOcultar(false);
                    }
                }}>
                    <div className={style.contedeudo_contaner}>

                        {mostrarIcone && (<div className={style.icone_faxar_menu}>
                            {/* <Button children={
                                <Img src={Fexar} alt={"Ícone de Menu com X"} />
                            } onClick={() => {
                                onClickOcultar(false);
                            }} /> */}
                            <div className={style.nome_marca_menu}>
                                <div className={style.nome}>
                                    Tabernáculo Vida de Deus - Zoe
                                </div>
                                <span className={style.min_desc}>Nampula</span>
                            </div>
                        </div>)}
                        <div className={style.area_menu}>
                            <Link to={"/"} className={`${classeLinkMenu} ${(paginaActiva === "/") ? style.pagina_activa : ""}`}>
                                <Button children={
                                    <>
                                        {/* {mostrarIconesMenu && (<Img src={(paginaActiva === "/") ? "" : Home} alt={"Ícone de Casa"} className={style.img_menu} />
                                        )} */}
                                        <p>Tema</p>
                                    </>
                                } onClick={() => {
                                    onClickOcultar(false);
                                }} className={classeBtnMenu} />

                            </Link>
                            <Link to={"/leitura"} className={`${classeLinkMenu} ${(paginaActiva === "/leitura") ? style.pagina_activa : ""}`}>
                                <Button children={
                                    <>
                                        {/* {mostrarIconesMenu && (<Img src={(paginaActiva === "/leitura") ? "" : Home} alt={"Ícone de Casa"} className={style.img_menu} />
                                        )} */}
                                        <p>Leitura</p>
                                    </>
                                } onClick={() => {
                                    onClickOcultar(false);
                                }} className={classeBtnMenu} />

                            </Link>
                            <Link to={"/leituraonline"} className={`${classeLinkMenu} ${(paginaActiva === "/leituraonline") ? style.pagina_activa : ""}`}>
                                <Button children={
                                    <>
                                        {/* {mostrarIconesMenu && (<Img src={(paginaActiva === "/leitura") ? "" : Home} alt={"Ícone de Casa"} className={style.img_menu} />
                                        )} */}
                                        <p>Leitura Online</p>
                                    </>
                                } onClick={() => {
                                    onClickOcultar(false);
                                }} className={classeBtnMenu} />

                            </Link>
                            <Link to={"/hinario"} className={`${classeLinkMenu} ${(paginaActiva === "/hinario") ? style.pagina_activa : ""}`}>
                                <Button children={
                                    <>
                                        {/* {mostrarIconesMenu && (<Img src={(paginaActiva === "/hinario") ? "" : Home} alt={"Ícone de Casa"} className={style.img_menu} />
                                        )} */}
                                        <p>Hinario</p>
                                    </>
                                } onClick={() => {
                                    onClickOcultar(false);
                                }} className={classeBtnMenu} />

                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        )

    )
}



export default Menu;