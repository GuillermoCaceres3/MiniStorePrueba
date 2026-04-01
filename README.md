# Mini Store

Mini Store es una prueba técnica frontend desarrollada con React, Vite, TypeScript, Tailwind CSS, React Router y Zustand.

La aplicación implementa un flujo de e-commerce con autenticación, exploración de productos, carrito de compras, creación de órdenes y un panel de administración para gestionar usuarios, órdenes y visibilidad de categorías.

## Demo en producción

Agregar aquí la URL desplegada en Vercel:

`https://mini-store-prueba-qytc.vercel.app/`

## Repositorio

Agregar aquí la URL del repositorio:

`https://github.com/GuillermoCaceres3/MiniStorePrueba`

## Tecnologías utilizadas

- React
- Vite
- TypeScript
- Tailwind CSS
- React Router DOM
- Zustand

## Funcionalidades por rol

### Invitado
Un usuario no autenticado puede:
- Visualizar productos
- Ver el detalle de los productos
- Buscar productos por nombre o categoría
- Filtrar productos por categoría
- Ordenar productos por precio
- Navegar con paginación
- Acceder a inicio de sesión, registro y recuperación de contraseña

### Usuario
Un usuario autenticado puede:
- Realizar todas las acciones del invitado
- Agregar productos al carrito
- Aumentar o disminuir cantidades dentro del carrito
- Eliminar productos del carrito
- Vaciar el carrito con confirmación
- Confirmar una compra
- Visualizar su historial de órdenes

### Administrador
Un administrador puede:
- Realizar todas las acciones del invitado
- Acceder al panel de administración
- Visualizar usuarios registrados
- Activar y desactivar usuarios
- Eliminar usuarios
- Visualizar todas las órdenes del sistema
- Filtrar órdenes por rango de fechas
- Activar y desactivar categorías
- Ocultar productos de categorías inactivas en la tienda

## Manejo de estado y persistencia

Zustand se utiliza para el manejo de estado global del lado cliente.

En esta implementación, la persistencia se maneja desde el navegador mediante almacenamiento local para:
- sesión autenticada
- usuarios registrados
- órdenes
- estado de categorías activas e inactivas

Además, el catálogo de productos se consume desde una API externa, y se implementó una capa de mapeo en el servicio de productos para normalizar la respuesta hacia el modelo interno utilizado por la aplicación.

## Credenciales de administrador para prueba

Para probar las funcionalidades del administrador, se puede utilizar el usuario semilla configurado en variables de entorno:

- **Correo:** `admin@ministore.com`
- **Contraseña:** `admin123`

Un usuario normal puede registrarse directamente desde la pantalla de registro.

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
VITE_ADMIN_EMAIL=admin@ministore.com
VITE_ADMIN_PASSWORD=admin123
VITE_API_URL=https://api.escuelajs.co/api/v1
```


## Consideraciones de implementación

Esta solución se enfoca en entregar de forma funcional y ordenada los flujos principales requeridos en la prueba técnica, incluyendo navegación, autenticación, carrito, órdenes y administración.

Para esta versión se priorizó completar la experiencia frontend end-to-end y asegurar una aplicación estable, navegable y desplegable. Por esa razón, la lógica de autenticación, usuarios, órdenes y administración fue resuelta del lado cliente, con persistencia local en el navegador.

La implementación de una API propia y una base de datos persistente compartida quedó identificada como la evolución natural del proyecto, pero no se incluyó en esta entrega para mantener el alcance alineado con el tiempo disponible y priorizar el cumplimiento completo de las funcionalidades principales.

Debido a este enfoque, la información almacenada en la aplicación se conserva por navegador y por dispositivo. Por lo tanto, usuarios, órdenes y sesiones no se comparten entre diferentes dispositivos.

