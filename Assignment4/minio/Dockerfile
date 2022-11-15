FROM minio/minio:latest
WORKDIR /src/app
COPY . .
COPY --from=minio/mc:latest /usr/bin/mc /usr/bin/mc
EXPOSE 8001
EXPOSE 8000

RUN mkdir /buckets
RUN minio server /buckets & \
    server_pid=$!; \
    until mc alias set local http://localhost:9000 minioadmin minioadmin; do \
        sleep 1; \
    done; \
    mc mb local/buckets; \
    curl https://files.tofugu.com/articles/japanese/2016-04-05-hiragana-chart/hiragana-chart-by-tofugu.jpg | mc pipe local/buckets/hiragana.jpg; \
    curl https://files.tofugu.com/articles/japanese/2017-07-13-katakana-chart/katakana-chart-by-tofugu.jpg | mc pipe local/buckets/katakana.jpg; \
    mc anonymous set public local/buckets; \
    kill $server_pid

CMD ["minio", "server", "/buckets", "--address", ":8000", "--console-address", ":8001"]


