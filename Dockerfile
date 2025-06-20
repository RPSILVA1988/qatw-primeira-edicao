# Usando a imagem base do Playwright
FROM mcr.microsoft.com/playwright:v1.52.0-noble

# Instalação de dependências e o OpenJDK 21
RUN apt-get update && apt-get install -y \
    openjdk-21-jdk \
    wget \
    unzip \
    && apt-get clean

# Definindo a variável de ambiente JAVA_HOME
ENV JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64
ENV PATH="${JAVA_HOME}/bin:${PATH}"
