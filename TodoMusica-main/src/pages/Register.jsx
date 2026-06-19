import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MiGifBienvenida from '../assets/Mesirve5.gif';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'El nombre es obligatorio';
    
    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El formato del email no es válido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Debe tener al menos 6 caracteres';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    try {
      const response = await fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.username,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok && data.status === 'ok') {
        setMessage({ text: '¡Usuario registrado con éxito!', type: 'success' });
        setFormData({ username: '', email: '', password: '', confirmPassword: '' });
      } else {
        setMessage({ text: data.msg || 'Error al registrar el usuario', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Error de conexión con el servidor', type: 'error' });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <img 
          src={MiGifBienvenida} 
          alt="Bienvenida" 
          className="auth-gif"
        />
        
        <h2 className="auth-title">Crear Cuenta</h2>
        
        {message.text && (
          <p className={`auth-message ${message.type}`}>
            {message.text}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Nombre de usuario</label>
            <input type="text" name="username" className="form-input" value={formData.username} onChange={handleChange} placeholder="Ej: MatiasV" />
            {errors.username && <span className="form-error">{errors.username}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input type="email" name="email" className="form-input" value={formData.email} onChange={handleChange} placeholder="correo@ejemplo.com" />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <input type="password" name="password" className="form-input" value={formData.password} onChange={handleChange} placeholder="••••••••" />
            {errors.password && <span className="form-error">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Confirmar Contraseña</label>
            <input type="password" name="confirmPassword" className="form-input" value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" />
            {errors.confirmPassword && <span className="form-error">{errors.confirmPassword}</span>}
          </div>

          <button type="submit" className="btn btn-active btn-sm auth-btn-submit">
            Registrarse
          </button>
        </form>

        <p className="auth-switch">
          ¿Ya tienes cuenta?{' '}
          <span className="auth-link" onClick={() => navigate('/login')}>
            Inicia sesión
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;