FROM ubuntu:22.04
ENV TZ=Europe/Warsaw
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN apt-get update \
    && apt-get -y upgrade \ 
    && apt-get install -y software-properties-common curl bash zip unzip
RUN add-apt-repository ppa:deadsnakes/ppa \
    && apt-get update \
    && apt-get install -y python3.8 
RUN curl -s "https://get.sdkman.io" | bash
SHELL ["/bin/bash", "-c"]
RUN source "/root/.sdkman/bin/sdkman-init.sh" \
    && sdk install java 8.0.302-open \
    && sdk install kotlin \
    && sdk install gradle

RUN mkdir /app
WORKDIR /app/
COPY build.gradle /app
RUN source "/root/.sdkman/bin/sdkman-init.sh" \
    && gradle wrapper \
    && ./gradlew dependencies
RUN source "/root/.sdkman/bin/sdkman-init.sh" && gradle -q helloWorld