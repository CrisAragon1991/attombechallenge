
# DDD Todo (TypeScript)

Ejemplo mínimo de arquitectura DDD en TypeScript para una entidad Todo.

## Tecnologías usadas

- **TypeScript**: Tipado estático sobre JavaScript.
- **Node.js**: Entorno de ejecución.
- **Express.js**: Framework para APIs REST.
- **Firebase Firestore**: Base de datos NoSQL en la nube.
- **firebase-admin**: SDK para acceso a Firestore desde backend.
- **tsyringe**: Inyección de dependencias (DI) basada en decoradores.
- **Jest**: Framework de testing unitario.
- **Docker**: Contenerización para despliegue y desarrollo local.
- **CORS**: Middleware para control de acceso cross-origin.
- **Render**: Plataforma de despliegue cloud.
- **GitHub Actions**: CI/CD automatizado.

## Conocimientos y técnicas aplicadas

- **Domain-Driven Design (DDD)**: Separación de capas (domain, application, infra, presentation).
- **Inyección de dependencias**: Uso de tsyringe para desacoplar casos de uso y repositorios.
- **Testing unitario con mocks**: Pruebas de casos de uso y repositorios usando Jest y mocks de firebase-admin.
- **Validación de datos**: Uso de express-validator para validar entradas en endpoints.
- **Autenticación JWT**: Middleware para proteger rutas y extraer usuario de tokens.
- **CORS seguro**: Configuración de orígenes permitidos para frontend local y producción.
- **Manejo de errores y respuestas estándar**: Uso de envoltorios de respuesta y manejo centralizado de errores.
- **Contenerización**: Dockerfile para desarrollo y despliegue.
- **Configuración flexible de credenciales**: Detección automática de credenciales para Firestore en local y producción.
- **CI/CD**: Integración y despliegue continuo con GitHub Actions.

## CI/CD y despliegue

- El repositorio cuenta con integración continua (CI) y despliegue continuo (CD) usando **GitHub Actions**.
- En cada push o pull request a la rama principal, se ejecutan automáticamente los tests y el build.
- El despliegue se realiza en la plataforma **Render** ([https://render.com](https://render.com)), donde se construye y publica la imagen Docker del backend.
- El pipeline asegura que solo código probado y compilado llegue a producción.

---

## Ejecución del proyecto

Puedes ejecutar el backend de dos formas:

1. **Con Docker (recomendado para evitar problemas de dependencias):**

	```sh
	npm run docker:build-run
	```
	Esto construye y ejecuta el contenedor temporalmente. **Necesitas tener el archivo `atomchatchallengecredentials.json` en la raíz del proyecto** para que el backend pueda conectarse a Firestore, incluso dentro del contenedor.

2. **En modo desarrollo local:**

	```sh
	npm run dev
	```
	También necesitas el archivo `atomchatchallengecredentials.json` en la raíz del proyecto. Si no lo tienes, solicítalo al responsable del repositorio para poder ejecutar el backend localmente con acceso a Firestore.

