import { Route, Routes } from "react-router-dom"
import Tema from "../pages/Tema"
import Hinario from "../pages/Hinario"
import Leitura from "../pages/Leitura"

const Rotas = () => {
    return (
        <Routes>
            <Route path="/" element={<Tema />} />
            <Route path="/hinario" element={<Hinario />} />
            <Route path="/leitura" element={<Leitura />} />
        </Routes>
    )
}


export default Rotas;