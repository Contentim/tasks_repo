#websoft #DB #платформа

db set type mssql
db create
db init

## Узнать имя сервера SQL
```
sqlcmd -S .\ -Q "SELECT @@SERVERNAME"
```