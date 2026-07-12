import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Detail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    setData({ id: id, titulo: 'Cargando datos del elemento...' });
  }, [id]);

  return (
    <main className="home detail-container">
      <h2 className="hero-heading">Detalle del elemento {id}</h2>
      {data ? <p>{data.titulo}</p> : <p>Cargando...</p>}
    </main>
  );
};

export default Detail;