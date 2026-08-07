import { Route, Routes } from "react-router-dom"
import Tema from "../pages/Tema"
import Hinarios from "../pages/Hinarios"
import Leitura from "../pages/Leitura"

const Rotas = () => {
    return (
        <Routes>
            <Route path="/tema" element={<Tema />} />
            <Route path="/hinarios" element={<Hinarios />} />
            <Route path="/leitura" element={<Leitura />} />
        </Routes>
    )
}