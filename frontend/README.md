Idea del proyecto: 

Un sitio que te muestre la información de cada artista, al igual que sus álbumes, y poder filtrarlo (Año, Banda, Disco y Género musical), teniendo una interfaz similar a la de Spotify.

Decisiones del Wireframe:

Nuestro diseño fue pensado con una estructura simple y clara:

- Un header con navegación principal.

- Una sección hero introductoria.

- Una área de interacción mediante botones.

- Un grid dinámico de tarjetas.

- Y un footer con información académica.

Aparte la interfaz utiliza una estética oscura inspirada en plataformas musicales modernas.

Además utiliza `children` para renderizar contenido dinámico interno.

Esto permite reutilizar el componente para:

- discos.

- artistas.

- futuras playlists.

Se utilizó `map()` para renderizar listas dinámicas de:

- discos

- artistas

Actualmente los datos están simulados mediante arrays locales.

Recibe múltiples `props`:

- title

- subtitle

- tag

- accent

Nombre y Apellido: Matías Villavicencio

Materia: Aplicaciones Híbridas