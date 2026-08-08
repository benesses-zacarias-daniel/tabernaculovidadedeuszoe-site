import Button from "../../button/Button";
import Img from "../../img/Img";
import style from "./Header.module.css";
//Imagens
import { useState } from "react";
import AbrirMenu from "../../../assets/icons/configu.svg";
import Menu from "../Sidebar/Menu";

const Header = () => {
    const [contador, setContador] = useState(8);
    const [click, setClick] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const onClickCarinho = () => {
        setClick(true);
        setTimeout(() => {
            setClick(false);
        }, 95)
    }

    const onClickMenu = (val) => {
        setShowMenu(val);
    }

    return (
        <header>
            <div className={style.area_bnt_menu}>
                <Button children={
                    <Img src={AbrirMenu} alt={"Ícone de barras!"} className={style.icone} />
                } onClick={() => { onClickMenu(true); }} className={""} />
            </div>
            <Menu mostrarMenu={showMenu} mostrarIcone={true} mostrarIconesMenu={true} onClickOcultar={(val) => {
                onClickMenu(val);
            }} />
        </header>
    )
}


export default Header;