FROM alpine:3.20

WORKDIR /app

# Installing curl
RUN apk add --no-cache curl

COPY traffic-generator.sh traffic-generator.sh

# Making the script executable
RUN chmod +x traffic-generator.sh

ENTRYPOINT ["./traffic-generator.sh"]