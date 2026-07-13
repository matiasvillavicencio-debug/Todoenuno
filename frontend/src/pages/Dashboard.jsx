import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import AdminPanel from '../components/AdminPanel.jsx';

const DISCO_FIELDS = [
    { name: 'titulo', label: 'Título' },
    { name: 'artista', label: 'Artista' },
    { name: 'genero', label: 'Género' },
    { name: 'año', label: 'Año', type: 'number' },
];

const ARTISTA_FIELDS = [
    { name: 'nombre', label: 'Nombre' },
    { name: 'nacionalidad', label: 'Nacionalidad' },
    { name: 'generoPrincipal', label: 'Género principal' },
];

const CANCION_FIELDS = [
    { name: 'titulo', label: 'Título' },
    { name: 'artista', label: 'Artista' },
    { name: 'genero', label: 'Género' },
    { name: 'duracion', label: 'Duración (mm:ss)' },
];

const Dashboard = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [vista, setVista] = useState('discos');

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const onAuthError = () => {
        alert('Tu sesión expiró o no es válida. Iniciá sesión de nuevo.');
        cerrarSesion();
    };

    const navLinks = [
        { path: '/', label: 'Inicio' },
        { path: '/admin/dashboard', label: 'Panel', isBtn: true },
    ];

    const tabs = [
        { key: 'discos', label: 'Discos', endpoint: '/discos', fields: DISCO_FIELDS },
        { key: 'artistas', label: 'Artistas', endpoint: '/artistas', fields: ARTISTA_FIELDS },
        { key: 'canciones', label: 'Canciones', endpoint: '/canciones', fields: CANCION_FIELDS },
    ];

    const activa = tabs.find((t) => t.key === vista);

    return (
        <>
            <Header title="TodoMusica" navLinks={navLinks} />

            <main className="home">
                <section className="hero-section">
                    <h2 className="hero-heading">Panel de administración</h2>
                    <p className="hero-text">
                        Gestioná el catálogo: alta, edición y baja de discos, artistas y
                        canciones.
                    </p>

                    <div className="action-bar">
                        <button className="btn" onClick={cerrarSesion}>
                            Cerrar sesión
                        </button>
                    </div>
                </section>

                <section className="grid-section">
                    <div className="action-bar">
                        {tabs.map((tab) => (
                            <button
                                key={tab.key}
                                className={`btn ${vista === tab.key ? 'btn-active' : ''}`}
                                onClick={() => setVista(tab.key)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <AdminPanel
                        key={activa.key}
                        title={activa.label}
                        endpoint={activa.endpoint}
                        fields={activa.fields}
                        token={token}
                        onAuthError={onAuthError}
                    />
                </section>
            </main>

            <Footer
                author="Matias Villavicencio"
                subject="Aplicaciones Híbridas"
                teacher="CRUZ, Jonathan Emanuel"
                commission="A-1331"
            />
        </>
    );
};

export default Dashboard;