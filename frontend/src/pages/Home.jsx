import React, { useState, useEffect } from 'react';

const Home = () => {
    const [datos, setDatos] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/canciones'); 
                const data = await response.json();
                
                setDatos(data);
                setCargando(false);
            } catch (error) {
                console.error("Error al conectar con el backend:", error);
                setCargando(false);
            }
        };

        obtenerDatos();
    }, []);

    if (cargando) return <p>Cargando música desde el servidor...</p>;

    return (
        <div>
            <h1>Catálogo Musical</h1>
            <ul>
                {datos.map((item) => (
                    <li key={item._id}>
                        {item.titulo} - {item.artista} ({item.genero})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;