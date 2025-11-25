# Usar una imagen base de Java 21, que coincide con la versión de tu proyecto.
FROM eclipse-temurin:21-jdk

# Argumento para el archivo JAR que se generará con Maven.
ARG JAR_FILE=target/m3-game-service-0.0.1-SNAPSHOT.jar

# Copiar el archivo JAR generado al contenedor con un nombre genérico 'app.jar'.
COPY ${JAR_FILE} app.jar

# Comando para ejecutar la aplicación cuando se inicie el contenedor.
ENTRYPOINT ["java","-jar","/app.jar"]
