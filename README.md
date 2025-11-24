# DDD Todo (TypeScript)

Ejemplo mínimo de arquitectura DDD en TypeScript para una entidad Todo.

Instrucciones:

- Instalar dependencias: npm install
- Compilar: npm run build
- Ejecutar: npm start

También se puede ejecutar en modo desarrollo con ts-node: npm run dev

Nota sobre credenciales locales
-----------------------------

La implementación de Firestore ahora detecta credenciales locales automáticamente en este orden:

1. `FIREBASE_SERVICE_ACCOUNT` — JSON completo en una variable de entorno.
2. `FIREBASE_SERVICE_ACCOUNT_PATH` — ruta a un archivo JSON con las credenciales.
3. Si `NODE_ENV` es `local`, o existe `./atomchatchallengecredentials.json` en el directorio de trabajo,
   se usará ese archivo.
4. `GOOGLE_APPLICATION_CREDENTIALS` — ruta a credenciales (legacy / Cloud Run style).

Esto facilita correr el proyecto localmente leyendo `atomchatchallengecredentials.json` sin tener que inyectar el JSON manualmente en la variable de entorno.
