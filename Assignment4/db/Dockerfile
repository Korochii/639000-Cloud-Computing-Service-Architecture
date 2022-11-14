FROM ubuntu:20.04
ARG DEBIAN_FRONTEND=noninteractive
COPY . .
EXPOSE 5432
EXPOSE 5433
RUN chmod +x /script.sh
RUN /script.sh
CMD ["sleep", "1d"]