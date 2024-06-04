#!/bin/bash

# Thông tin kết nối đến container MySQL
CONTAINER_NAME="mysql-db"
MYSQL_USER="your_mysql_user"
MYSQL_PASSWORD="your_mysql_password"
MYSQL_DATABASE="your_database_name"

# Thực thi truy vấn SQL để thêm bản ghi
query="INSERT INTO your_table_name (column1, column2) VALUES ('value1', 'value2');"

# Thực thi truy vấn sử dụng MySQL Client trong container MySQL
docker exec $CONTAINER_NAME mysql -u$MYSQL_USER -p$MYSQL_PASSWORD $MYSQL_DATABASE -e "$query"
