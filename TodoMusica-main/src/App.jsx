import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Detail from './pages/Detail';

function App() {
  const navLinks = [
    { label: 'Inicio', path: '/', isBtn: false },
    { label: 'Discos', path: '/', isBtn: false },
    { label: 'Artistas', path: '/', isBtn: false },
    { label: 'Iniciar Sesión', path: '/login', isBtn: true },
    { label: 'Registrarse', path: '/register', isBtn: true },
  ];

  return (
    <BrowserRouter>
      <Header title="TodoMúsica" navLinks={navLinks} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/detalle/:id" element={<Detail />} />
      </Routes>

      <Footer
        author="Matias Villavicencio"
        subject="Aplicaciones Híbridas"
        teacher="Jonathan Emanuel Cruz"
        commission="DWM4AP"
      />
    </BrowserRouter>
  );
}

export default App;