# EvenUp-Website

EvenUp es una aplicación web diseñada para gestionar eventos y actividades grupales, facilitando la comunicación y la administración de gastos entre amigos, familiares o compañeros de trabajo.

## Características principales

- Gestion de eventos y actividades grupales
- Control de gastos compartidos
- Registro y gestión de usuarios
- Creación y edición de eventos
- Gestión de contactos
- Creación y edición de actividades dentro de eventos
- Control de saldos y pagos entre participantes

## Funcionalidades clave

### Registro y gestión de usuarios

- Registro con correo electrónico, nombre completo, apodo y foto/avatar
- Modificación de información del usuario (excepto correo electrónico)
- Opción para dar de baja la cuenta

### Gestión de contactos

- Agregar contactos mediante correos electrónicos
- Eliminar contactos (con restricciones si hay eventos asociados)
- Visualización de contactos en los eventos participados

### Creación y modificación de eventos

- Crear eventos con nombre, descripción, tipo y imagen
- Restricción para modificar eventos una vez creados (si ya se han registrado actividades)
- Agregar o quitar contactos solo por el creador del evento (sin actividades registradas)

### Actividades y control de gastos

- Crear actividades dentro de eventos
- Detallar gastos específicos
- Sugerencia automática de división igualitaria de costes
- Permite ajustes personalizados de participaciones
- Verificar saldos pendientes por evento
- Realizar pagos parciales o totales entre participantes

## Diseño y experiencia del usuario

EvenUp está diseñado como una aplicación web colaborativa que integra funcionalidades de gestión de eventos y control de gastos compartidos. Su diseño modular permite a los usuarios interactuar de manera efectiva, haciendo que la experiencia de planificación y organización de eventos sea más fluida y organizada.

## Requisitos técnicos

- Lenguaje principal: TypeScript
- Frameworks: React, Tailwind, Redux Toolkit
- Build Tool: Vite
- Base de datos: PostgreSQL

## Cómo instalar y ejecutar

1. Clonar el repositorio:
   ```bash

2. Instalar dependencias:
   ```bash
   npm install

3. Ejecutar la aplicación:
   ```bash
   npm run dev
   

La aplicación se ejecutará en `http://localhost:5173` por defecto.

## Contribuir

Contribuciones de código, pruebas y mejoras son bienvenidas! Por favor, crea una nueva rama (`git checkout -b nombre-de-la-nueva-rama`) y haz un pull request.
