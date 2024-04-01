echo Starting temporary postgres
docker run -p 5432:5432 -v /tmp/rctf-postgres:/var/lib/postgresql/data -e POSTGRES_PASSWORD=rctf -e POSTGRES_USER=rctf -e POSTGRES_DB=rctf --network host --rm postgres:16.1
echo Stopped temporary postgres