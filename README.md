### SYSTEM_CONFIG: toolsArg_V3
**CONTEXT:** Desarrollo de plataforma "toolsArg" de nivel profesional. Estilo Hacker/CLI (freeCodeCamp inspired).
**STACK_TECNICO_Y_LIBRERIAS:**
- **Astro:** Framework base (SSG/SSR) para estructura ultrarrápida y enrutamiento.
- **React:** Motor UI interactivo. Se usa en `client:load` para componentes dinámicos.
- **Tailwind CSS v4:** Sistema de estilos utilitarios (temática consola/terminal).
- **Zustand:** Estado global en el cliente (Store de logs, Auth session, UI state). Evita prop-drilling y no usa Context API.
- **Firebase Auth & Firestore:** Autenticación (Email/Password) y almacenamiento futuro de órdenes y roles.
- **Mongoose:** ODM para MongoDB. Garantiza estructuración estricta (Schemas), validación y caché de conexiones en Node.js. Sustituye al driver nativo de Mongo.
- **Cloudinary + Sharp:** (Pendiente de lógica completa) Sharp comprimirá el Buffer en el servidor Astro y lo enviará a Cloudinary para optimizar almacenamiento.
- **Nodemailer:** Notificaciones por correo electrónico al cliente usando SMTP gratuito.

**REGLAS_DE_ESTILO:**
- Colores: Fondo #3C3C3B, Acentos #00FF00, Texto #FFFFFF.
- Fuente: Monospace / Fira Code. Escapar los símbolos {">"} en archivos TSX.

**REGLAS_DE_NEGOCIO & ARQUITECTURA:**
1. IDIOMA: Todo en ESPAÑOL.
2. PARADIGMA: Feature-Driven Development. Lógica limpia separada de la UI.
3. FILTRO: Solo procesar o inyectar servicios medidos en HORAS, MESES o AÑOS.
4. ANONIMATO: Usar "root@toolsArg". 
5. CÓDIGO: Declarativo y listo para producción.

**TAREA_ACTUAL:**