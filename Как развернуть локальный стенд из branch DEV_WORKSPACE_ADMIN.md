#websoft #стенд 
# Как развернуть локальный стенд из branch DEV#WORKSPACE_ADMIN

1. Склонировать ветку DEV#WORKSPACE_ADMIN и развернуть стенд по инструкции с портала

2. Загрузить компонент **core_application_mng** [https://gitea.websoft.ru/WebSoft.Components/core_application_mng](https://gitea.websoft.ru/WebSoft.Components/core_application_mng) в папку **components**

3. Добавить в профиль безопасности "Базовые API" библиотеку "libAppsMgmt"
![image](https://github.com/user-attachments/assets/1fc60bc8-f114-4e85-afe6-c1bb3b64af5b)
![image](https://github.com/user-attachments/assets/796afae5-f7c9-470c-ba82-8386e400ed08)

4. В конфигурации workspace включить модуль приложений
![image](https://github.com/user-attachments/assets/09add689-3891-4347-a22f-4d358ead4cb2)
![image](https://github.com/user-attachments/assets/2d5097c2-9c4b-4546-997e-3f43caaa1b58)

5. Скачать агент https://devopssrv.websoft.ru/DefaultCollection/_apis/wit/attachments/51bf6485-6cd6-4bb1-bed8-0468764ca120?filename=Агент%20миграции%20ролей.zip&download=false
6. Обработать пакет с агентом **convert_roles_to_config** (Агент миграции ролей) и **ЗАПУСТИТЬ АГЕНТ**, чтобы изменить механизм доступа в конфигурации [https://devopssrv.websoft.ru/DefaultCollection/webtutor4/_workitems/edit/28604](https://devopssrv.websoft.ru/DefaultCollection/webtutor4/_workitems/edit/28604)
7. Остановить сервер
8. В папке **WebSoftServer\wt_data** удалить папку **catalogs**
9. Перезапустить сервер с перестройкой каталогов
10. http://localhost/vchat/apps
