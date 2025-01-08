#  Aplicación Front-End en Angular

Este repositorio contiene el front-end para un sistema de gestión de clientes desarrollado con Angular, TypeScript y SCSS. La aplicación interactúa con una API basada en Java para obtener y gestionar los datos de los clientes.

## Características

- **Ver clientes registrados**: Muestra una lista de todos los clientes recuperados de la base de datos a través de la API.
- **Agregar nuevos clientes**:
  - Individualmente a través de un formulario de registro.
  - Carga masiva utilizando un archivo `.txt`, que se puede subir directamente desde el navegador.

## Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instalado lo siguiente:

- **Node.js** (v16 o superior)
- **Angular CLI** (v18 o superior): Instálalo globalmente con `npm install -g @angular/cli`.

## Instrucciones para la carga de archivos

- La funcionalidad de carga masiva acepta archivos con extensión `.txt`.

- Cada línea en el archivo `.txt` debe representar un cliente con sus respectivos datos. Por ejemplo:

  ```
  Juan Perez|juanperez@ejemplo.com|123456789
  Maria Lopez|marialopez@ejemplo.com|987654321
  ```

- Sube el archivo a través de la sección dedicada en la aplicación.

## Estructura del proyecto

```
├── src
│   ├── app
│   │   ├── pages
│   │   │   └── inicio
│   ├── services
│   ├── styles
│   └── index.html
└── angular.json
```

## Integración con la API

La aplicación se comunica con la API backend para:

- Obtener la lista de clientes registrados.
- Enviar nuevos registros de clientes.
- Procesar cargas masivas de clientes.

Asegúrate de que la API esté ejecutándose y sea accesible antes de iniciar la aplicación de Angular con los puertos correspondientes.

## Scripts

- `ng serve`: Inicia el servidor de desarrollo.
