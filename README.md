📝 To-Do List App
Una aplicación web para gestionar tareas, construida con React en el frontend y Django como backend. Permite crear, listar y guardar tareas con nombre, descripción y estado.

🚀 Tecnologías utilizadas

  🔧 Backend
  
    Django 4.x
    
    Django REST Framework
    
    SQLite (puede cambiarse a PostgreSQL fácilmente)

  🎨 Frontend
  
    React 18+
    
    Vite
    
    TypeScript
    
    Tailwind CSS
    
    React Hook Form + Zod

    Context API
🖼️ Características principales

  Crear tareas con:
  
    Nombre (obligatorio)
    
    Descripción (obligatoria)
    
    Estado (check_task: booleano)
  
  Validación de formularios con Zod
  
  Modal para agregar tareas usando React Context
  
  UI responsive y amigable con Tailwind CSS
  
  Comunicación con backend mediante fetch

📁 Estructura del proyecto

  project/
  ├── backend/
  │   └── manage.py, settings.py, api/, etc.
  ├── frontend/
  │   ├── src/
  │   │   ├── components/
  │   │   ├── model/
  │   │   ├── Modal/
  │   │   ├── hooks/
  │   │   └── App.tsx, main.tsx
  │   ├── public/
  │   └── index.html

👨‍💻 Autor
Juan Carlos Alonso
GitHub: @juanAD2022
