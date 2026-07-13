import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import Card from '../components/Card.jsx';
import { apiGet } from '../services/api.js';

const GENERO_ACCENT = {
    jazz: 'accent-jazz',
    pop: 'accent-pop',
    'pop/r&b': 'accent-pop-rb',
    'r&b': 'accent-pop-rb',
    rock: 'accent-rock',
    grunge: 'accent-grunge',
    'hip hop': 'accent-hiphop',
    hiphop: 'accent-hiphop',
};

const accentFor = (genero) => GENERO_ACCENT[genero?.toLowerCase()] || 'accent-default';

const Home = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const [vista, setVista] = useState('discos');
    const [discos, setDiscos] = useState([]);
    const [artistas, setArtistas] = useState([]);
    const [canciones, setCanciones] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const cargarTodo = async () => {
            try {
                const [resDiscos, resArtistas, resCanciones] = await Promise.all([
                    apiGet('/discos'),
                    apiGet('/artistas'),
                    apiGet('/canciones'),
                ]);

                setDiscos(resDiscos.data?.data || []);
                setArtistas(resArtistas.data?.data || []);
                setCanciones(Array.isArray(resCanciones.data) ? resCanciones.data : []);
            } catch (err) {
                console.error('Error al conectar con el backend:', err);
                setError(true);
            } finally {
                setCargando(false);
            }
        };

        cargarTodo();
    }, []);

    const navLinks = token
        ? [
              { path: '/', label: 'Inicio' },
              { path: '/admin/dashboard', label: 'Panel', isBtn: true },
          ]
        : [
              { path: '/', label: 'Inicio' },
              { path: '/login', label: 'Ingresar', isBtn: true },
          ];

    const tabs = [
        { key: 'discos', label: 'Discos', data: discos },
        { key: 'artistas', label: 'Artistas', data: artistas },
        { key: 'canciones', label: 'Canciones', data: canciones },
    ];

    const activa = tabs.find((t) => t.key === vista);

    return (
        <>
            <Header title="TodoMusica" navLinks={navLinks} />

            <main className="home">
                <section className="hero-section">
                    <h2 className="hero-heading">Catálogo Musical</h2>
                    <p className="hero-text">
                        Explorá discos, artistas y canciones cargados en la plataforma.
                        Iniciá sesión para sumar tu propio contenido al catálogo.
                    </p>

                    {!token && (
                        <div className="action-bar">
                            <span className="btn btn-active" onClick={() => navigate('/login')}>
                                Iniciar sesión
                            </span>
                            <span className="btn" onClick={() => navigate('/register')}>
                                Crear cuenta
                            </span>
                        </div>
                    )}
                </section>

                <section className="grid-section">
                    <div className="action-bar">
                        {tabs.map((tab) => (
                            <button
                                key={tab.key}
                                className={`btn ${vista === tab.key ? 'btn-active' : ''}`}
                                onClick={() => setVista(tab.key)}
                            >
                                {tab.label} ({tab.data.length})
                            </button>
                        ))}
                    </div>

                    <h3 className="section-title">{activa.label}</h3>

                    {cargando && <p className="hero-text">Cargando catálogo...</p>}
                    {!cargando && error && (
                        <p className="hero-text">
                            No se pudo conectar con el servidor. Revisá que el backend esté
                            corriendo en el puerto 3000.
                        </p>
                    )}
                    {!cargando && !error && activa.data.length === 0 && (
                        <p className="hero-text">Todavía no hay {activa.label.toLowerCase()} cargados.</p>
                    )}

                    {!cargando && !error && activa.data.length > 0 && (
                        <div className="card-grid">
                            {vista === 'discos' &&
                                discos.map((disco) => (
                                    <Link key={disco._id} to={`/detail/${disco._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <Card
                                            title={disco.titulo}
                                            subtitle={disco.artista}
                                            tag={disco.genero}
                                            accentClass={accentFor(disco.genero)}
                                        >
                                            <p className="card-year">Año: {disco.año}</p>
                                        </Card>
                                    </Link>
                                ))}

                            {vista === 'artistas' &&
                                artistas.map((artista) => (
                                    <Card
                                        key={artista._id}
                                        title={artista.nombre}
                                        subtitle={artista.generoPrincipal}
                                        tag={artista.generoPrincipal}
                                        accentClass={accentFor(artista.generoPrincipal)}
                                    >
                                        <p className="card-detail">{artista.nacionalidad}</p>
                                    </Card>
                                ))}

                            {vista === 'canciones' &&
                                canciones.map((cancion) => (
                                    <Card
                                        key={cancion._id}
                                        title={cancion.titulo}
                                        subtitle={cancion.artista}
                                        tag={cancion.genero}
                                        accentClass={accentFor(cancion.genero)}
                                    >
                                        {cancion.duracion && (
                                            <p className="card-detail">Duración: {cancion.duracion}</p>
                                        )}
                                    </Card>
                                ))}
                        </div>
                    )}
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

export default Home;