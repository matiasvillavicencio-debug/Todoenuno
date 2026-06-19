import { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';

const DISCOS = [
  { _id: '1', titulo: 'Kind of Blue', genero: 'Jazz', año: 1959, artista: 'Miles Davis' },
  { _id: '2', titulo: 'Thriller', genero: 'Pop/R&B', año: 1982, artista: 'Michael Jackson' },
  { _id: '3', titulo: 'Rumours', genero: 'Rock', año: 1977, artista: 'Fleetwood Mac' },
  { _id: '4', titulo: 'To Pimp a Butterfly', genero: 'Hip-hop', año: 2015, artista: 'Kendrick Lamar' },
  { _id: '5', titulo: 'Abbey Road', genero: 'Rock', año: 1969, artista: 'The Beatles' },
  { _id: '6', titulo: 'Nevermind', genero: 'Grunge', año: 1991, artista: 'Nirvana' },
  { _id: '7', titulo: 'Let It Be', genero: 'Rock', año: 1970, artista: 'The Beatles' },
];

const ARTISTAS = [
  { _id: 'a1', nombre: 'Miles Davis', nacionalidad: 'Estadounidense', generoPrincipal: 'Jazz' },
  { _id: 'a2', nombre: 'Michael Jackson', nacionalidad: 'Estadounidense', generoPrincipal: 'Pop' },
  { _id: 'a3', nombre: 'Fleetwood Mac', nacionalidad: 'Británica', generoPrincipal: 'Rock' },
];

const getAccentClass = (genre) => {
  const classes = {
    'Jazz': 'accent-jazz',
    'Pop': 'accent-pop',
    'Pop/R&B': 'accent-pop-rb',
    'Rock': 'accent-rock',
    'Grunge': 'accent-grunge',
    'Hip-hop': 'accent-hiphop',
  };
  return classes[genre] || 'accent-default';
};

const Home = () => {
  const [seccion, setSeccion] = useState('discos');

  return (
    <main className="home">
      <section className="hero-section">
        <h2 className="hero-heading">Catálogo Musical</h2>
        <p className="hero-text">
          Explorá los discos y artistas más conocidos del mundo.
        </p>

        <div className="action-bar">
          <button
            className={`btn ${seccion === 'discos' ? 'btn-active' : ''}`}
            onClick={() => setSeccion('discos')}
          >
            🎶 Discos
          </button>
          <button
            className={`btn ${seccion === 'artistas' ? 'btn-active' : ''}`}
            onClick={() => setSeccion('artistas')}
          >
            🎤 Artistas
          </button>
        </div>
      </section>

      {seccion === 'discos' && (
        <section className="grid-section">
          <h3 className="section-title">
            {DISCOS.length} discos encontrados
          </h3>
          <div className="card-grid">
            {DISCOS.map((disco) => (
              <Card
                key={disco._id}
                title={disco.titulo}
                subtitle={disco.artista}
                tag={disco.genero}
                accentClass={getAccentClass(disco.genero)}
              >
                <p className="card-year">📅 {disco.año}</p>
                <Link to={`/detalle/${disco._id}`} className="btn btn-sm">
                  Ver detalle
                </Link>
              </Card>
            ))}
          </div>
        </section>
      )}

      {seccion === 'artistas' && (
        <section className="grid-section">
          <h3 className="section-title">
            {ARTISTAS.length} artistas encontrados
          </h3>
          <div className="card-grid">
            {ARTISTAS.map((artista) => (
              <Card
                key={artista._id}
                title={artista.nombre}
                subtitle={artista.nacionalidad}
                tag={artista.generoPrincipal}
                accentClass={getAccentClass(artista.generoPrincipal)}
              >
                <p className="card-detail">🎵 Género: {artista.generoPrincipal}</p>
                <p className="card-detail">🌎 {artista.nacionalidad}</p>
                <Link to={`/detalle/${artista._id}`} className="btn btn-sm">
                  Ver discografía
                </Link>
              </Card>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default Home;