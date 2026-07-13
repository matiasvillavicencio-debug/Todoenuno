import { useState, useEffect } from 'react';
import { apiGet, apiPost, apiPut, apiDelete } from '../services/api.js';

const valoresIniciales = (fields) =>
    Object.fromEntries(fields.map((f) => [f.name, '']));

const normalizarLista = (data) => (Array.isArray(data) ? data : data?.data || []);

const AdminPanel = ({ title, endpoint, fields, token, onAuthError }) => {
    const [items, setItems] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(false);
    const [formData, setFormData] = useState(valoresIniciales(fields));
    const [editandoId, setEditandoId] = useState(null);
    const [mensaje, setMensaje] = useState({ text: '', type: '' });

    const cargar = async () => {
        setCargando(true);
        setError(false);
        const res = await apiGet(endpoint);
        if (res.ok) {
            setItems(normalizarLista(res.data));
        } else {
            setError(true);
        }
        setCargando(false);
    };

    useEffect(() => {
        cargar();
        setFormData(valoresIniciales(fields));
        setEditandoId(null);
        setMensaje({ text: '', type: '' });
    }, [endpoint]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const body = { ...formData };
        fields.forEach((f) => {
            if (f.type === 'number' && body[f.name] !== '') {
                body[f.name] = Number(body[f.name]);
            }
        });

        const res = editandoId
            ? await apiPut(`${endpoint}/${editandoId}`, body, token)
            : await apiPost(endpoint, body, token);

        if (res.status === 401 || res.status === 403) {
            onAuthError?.();
            return;
        }

        if (res.ok) {
            setMensaje({
                text: editandoId ? 'Actualizado correctamente.' : 'Creado correctamente.',
                type: 'success',
            });
            setFormData(valoresIniciales(fields));
            setEditandoId(null);
            cargar();
        } else {
            setMensaje({ text: res.data?.msg || 'Error al guardar.', type: 'error' });
        }
    };

    const handleEditar = (item) => {
        const datos = {};
        fields.forEach((f) => (datos[f.name] = item[f.name] ?? ''));
        setFormData(datos);
        setEditandoId(item._id);
        setMensaje({ text: '', type: '' });
    };

    const handleCancelar = () => {
        setFormData(valoresIniciales(fields));
        setEditandoId(null);
        setMensaje({ text: '', type: '' });
    };

    const handleBorrar = async (item) => {
        const etiqueta = item[fields[0].name] || 'este elemento';
        if (!window.confirm(`¿Seguro que querés borrar "${etiqueta}"?`)) return;

        const res = await apiDelete(`${endpoint}/${item._id}`, token);

        if (res.status === 401 || res.status === 403) {
            onAuthError?.();
            return;
        }

        if (res.ok) {
            cargar();
        } else {
            setMensaje({ text: res.data?.msg || 'Error al borrar.', type: 'error' });
        }
    };

    return (
        <div className="admin-panel">
            <h3 className="section-title">{title}</h3>

            {mensaje.text && (
                <p className={`auth-message ${mensaje.type}`}>{mensaje.text}</p>
            )}

            <form className="admin-form" onSubmit={handleSubmit}>
                {fields.map((f) => (
                    <div className="form-group" key={f.name}>
                        <label className="form-label">{f.label}</label>
                        <input
                            className="form-input"
                            type={f.type || 'text'}
                            name={f.name}
                            value={formData[f.name] ?? ''}
                            onChange={handleChange}
                            required
                        />
                    </div>
                ))}

                <div className="action-bar">
                    <button type="submit" className="btn btn-active">
                        {editandoId ? 'Guardar cambios' : 'Agregar'}
                    </button>
                    {editandoId && (
                        <button type="button" className="btn" onClick={handleCancelar}>
                            Cancelar edición
                        </button>
                    )}
                </div>
            </form>

            {cargando && <p className="hero-text">Cargando...</p>}
            {!cargando && error && (
                <p className="hero-text">
                    No se pudo conectar con el servidor. Revisá que el backend esté
                    corriendo en el puerto 3000.
                </p>
            )}
            {!cargando && !error && items.length === 0 && (
                <p className="hero-text">Todavía no hay elementos cargados.</p>
            )}

            {!cargando && !error && items.length > 0 && (
                <ul className="admin-list">
                    {items.map((item) => (
                        <li className="admin-list-item" key={item._id}>
                            <div className="admin-list-info">
                                <strong>{item[fields[0].name]}</strong>
                                <span className="admin-list-detail">
                                    {fields
                                        .slice(1)
                                        .map((f) => item[f.name])
                                        .filter(Boolean)
                                        .join(' · ')}
                                </span>
                            </div>
                            <div className="card-actions">
                                <button
                                    type="button"
                                    className="btn btn-outline"
                                    onClick={() => handleEditar(item)}
                                >
                                    Editar
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => handleBorrar(item)}
                                >
                                    Borrar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AdminPanel;