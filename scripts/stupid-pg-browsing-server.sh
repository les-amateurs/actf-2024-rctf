# docker pull dpage/pgadmin4
docker run -p 0.0.0.0:8082:80 \
    -e 'PGADMIN_DEFAULT_EMAIL=example@ctf.gg' \
    -e 'PGADMIN_DEFAULT_PASSWORD=password' \
    -e 'PGADMIN_CONFIG_ENHANCED_COOKIE_PROTECTION=True' \
    -e 'PGADMIN_CONFIG_LOGIN_BANNER="The password is password!"' \
    -e 'PGADMIN_CONFIG_CONSOLE_LOG_LEVEL=10' \
    -d dpage/pgadmin4
