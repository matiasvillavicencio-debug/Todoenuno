// frontend/src/pages/Home.jsx
import React, { useState, useEffect } from 'react';

const Home = () => {
    const [canciones, setCanciones] = useState([]);

    useEffect(() => {
        // Asegúrate de que esta URL sea la correcta
        fetch('http://localhost:3000/api/canciones') 
            .then(res => res.json())
            .then(data => {
                console.log("Datos recibidos:", data); // Mira esto en la consola F12
                setCanciones(data);
            })
            .catch(err => console.error("Error al conectar:", err));
    }, []);

    return (
        <div>
            <h1>Catálogo Musical</h1>
            {canciones.length === 0 ? (
                <p>No hay canciones cargadas o error de conexión.</p>
            ) : (
                canciones.map(c => (
                    <div key={c._id}>
                        <h3>{c.titulo}</h3>
                        <p>{c.artista}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default Home;