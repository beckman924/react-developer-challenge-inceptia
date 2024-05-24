# React Developer Challenge para InceptiaIA

Este proyecto ha sido creado como parte de un challenge de React para la empresa InceptiaIA. A continuación, se describen los pasos para configurar y ejecutar el proyecto utilizando Docker Compose.

## Requisitos Previos

- Docker
- Docker Compose

## Configuración del Entorno

1. **Clonar el Repositorio**

   Clona este repositorio en tu máquina local:
   ```bash
   git clone https://github.com/beckman924/react-developer-challenge-inceptia.git
   cd react-developer-challenge-inceptia
   ```

2. **Crear el Archivo `.env.local`**

   Crea un archivo `.env.local` en el directorio raíz del proyecto con el siguiente formato:

   ```env
   API_URL=*Url proporcionada por InceptiaIA*
   API_USER=*Usuario proporcionado por InceptiaIA*
   API_PASSWORD=*Contraseña proporcionada por InceptiaIA*
   JWT_SECRET=*Misma contraseña utilizada en API_PASSWORD, se utiliza para codificar el token*
   ```

## Levantar el Proyecto

Para levantar el proyecto, ejecuta el siguiente comando en el directorio raíz del proyecto:

```bash
docker compose up
```

Este comando construirá las imágenes de Docker y levantará los contenedores definidos en el archivo `docker-compose.yml`.

## Acceso a la Aplicación

Una vez que los contenedores estén en funcionamiento, podrás acceder a la aplicación a través de tu navegador web en `http://localhost:3000`.

## Notas Adicionales

- Para detener los contenedores, utiliza `Ctrl + C` en la terminal donde ejecutaste `docker compose up`, o ejecuta `docker compose down` en otra terminal.
- Si necesitas reconstruir las imágenes, utiliza `docker compose up --build`.
