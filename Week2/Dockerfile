FROM ubuntu:22.04

ENV TZ=Europe/Warsaw
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN apt-get update \
    && apt-get -y upgrade \
    && apt-get -y install software-properties-common curl bash unzip zip

RUN curl -s "https://get.sdkman.io" | bash
RUN bash -c "source $HOME/.sdkman/bin/sdkman-init.sh && sdk install java 8.0.362-amzn"
RUN bash -c "source $HOME/.sdkman/bin/sdkman-init.sh && sdk install sbt 1.8.2"
RUN bash -c "source $HOME/.sdkman/bin/sdkman-init.sh && sdk install scala 2.13.10"

ENV PATH=$PATH:/root/.sdkman/candidates/sbt/1.8.2/bin
ENV PATH=$PATH:/root/.sdkman/candidates/java/8.0.362-amzn/bin/
ENV PATH=$PATH:/root/.sdkman/candidates/scala/2.13.10/bin

WORKDIR /play-scala-seed

COPY /play-scala-seed .

EXPOSE 9000

CMD ["sbt", "run"]
