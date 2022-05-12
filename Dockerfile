# 1. Alpine is a lightweight base image, use Eclipse Temurin 17.
FROM eclipse-temurin:17-jdk-alpine as builder
RUN apk update
RUN apk add maven
WORKDIR /home/app
COPY . .
RUN mvn package -DskipTests -f pom.xml

FROM eclipse-temurin:17-jre-alpine

# 2. Create the directory and navigate to it.
EXPOSE 8080/tcp
WORKDIR /home/app
# 3. Copy our packaged jar to the working directory and rename.
COPY --from=builder /home/app/target/dev10-capstone-1.0-SNAPSHOT.jar app.jar
# 4. Run the jar.
CMD ["java", "-jar", "./app.jar"]
