import { Route, Routes } from "react-router-dom"
import Tema from "../pages/Tema"
import Hinario from "../pages/Hinario"
import Leitura from "../pages/Leitura"
import LeituraOnline from "../pages/LeituraOnline"

const Rotas = () => {
    return (
        <Routes>
            <Route path="/" element={<Tema />} />
            <Route path="/hinario" element={<Hinario />} />
            <Route path="/leitura" element={<Leitura />} />
            <Route path="/leituraonline" element={<LeituraOnline />} />
        </Routes>
    )
}


export default Rotas;