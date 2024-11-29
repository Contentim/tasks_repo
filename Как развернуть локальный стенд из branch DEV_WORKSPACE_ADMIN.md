# Как развернуть локальный стенд из branch DEV#WORKSPACE_ADMIN

1. Склонировать ветку DEV#WORKSPACE_ADMIN и развернуть стенд по инструкции с портала

2. Загрузить компонент "applications_management" [https://gitea.websoft.ru/WebSoft.Components/applications_management.git](https://gitea.websoft.ru/WebSoft.Components/applications_management.git) в папку **components**

3. Добавить в профиль безопасности "Базовые API" библиотеку "libAppsMgmt"

4. В конфигурации workspace включить модуль приложений

5. Обработать пакет с агентом convert_roles_to_config и запустить, чтобы изменить механизм доступа в конфигурации [https://devopssrv.websoft.ru/DefaultCollection/webtutor4/_workitems/edit/28604](https://devopssrv.websoft.ru/DefaultCollection/webtutor4/_workitems/edit/28604)

6. Перезапустить сервер с перестройкой каталогов