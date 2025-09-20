# 🔹 1️⃣ Usa una imagen oficial de Node.js como base
FROM node:18-alpine

# Instalar TypeScript globalmente
RUN npm install -g typescript

# Instala Koyeb CLI
RUN curl -sSL https://get.koyeb.app | sh

# 🔹 2️⃣ Establece el directorio de trabajo en el contenedor
WORKDIR /app

# 🔹 3️⃣ Copia el archivo de dependencias
COPY package*.json ./

# 🔹 4️⃣ Instala las dependencias de producción
#RUN npm install --omit=dev

# Instalar dependencias y RECONSTRUIR libsql
RUN npm install && \
    npm rebuild @libsql/client

# 🔹 4️⃣ Instala TODAS las dependencias (incluyendo dev para los tipos)
#RUN npm ci

# 🔹 5️⃣ Copia el código fuente al contenedor
COPY . .

# Compilar TypeScript
RUN npm run build

# Limpiar node_modules y reinstalar solo production + reconstruir
RUN rm -rf node_modules && \
    npm install --only=production && \
    npm rebuild @libsql/client

# Variables de entorno para Turso
ENV LIBSQL_CLIENT_PLATFORM=linux-x64-gnu
ENV LIBSQL_CLIENT_NATIVE=1

# 🔹 6️⃣ Expone el puerto en el que corre la app
EXPOSE 3000

# 🔹 7️⃣ Comando para iniciar la aplicación
CMD ["node", "dist/index.js"]