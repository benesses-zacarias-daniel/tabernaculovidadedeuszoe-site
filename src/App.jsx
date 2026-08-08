import { BrowserRouter } from 'react-router-dom';
import './App.css';
import "./style/global.css";
import Rotas from './routes/Routes';
import Header from './components/layout/Header/Header';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Rotas />
    </BrowserRouter>
  )
}

export default App
