FROM maven:3.8.4-jdk-11-slim AS builder

COPY . /app/
WORKDIR /app
RUN mvn dependency:resolve \
  && mvn package

FROM openjdk:11-jre-slim

WORKDIR /src
COPY --from=builder /app/target/worker-jar-with-dependencies.jar .

CMD ["java", "-jar", "worker-jar-with-dependencies.jar"]