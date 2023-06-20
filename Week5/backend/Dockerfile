FROM golang:1.20

RUN groupadd -g 1001 myuser && \
    useradd -u 1001 -g myuser -s /bin/sh myuser

WORKDIR /app

COPY controllers /app/controllers
COPY models /app/models
COPY server.go /app/server.go
COPY go.mod /app/go.mod
COPY go.sum /app/go.sum


RUN go build -o app

RUN chown -R myuser:myuser /app
USER myuser

EXPOSE 1323

CMD ["./app"]