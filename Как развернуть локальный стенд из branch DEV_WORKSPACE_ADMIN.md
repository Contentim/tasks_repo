![image](https://github.com/user-attachments/assets/9f7ac014-370d-41bf-9fe6-a715b6e69244)#websoft #стенд 
# Как развернуть локальный стенд из branch DEV#WORKSPACE_ADMIN

1. Склонировать ветку DEV#WORKSPACE_ADMIN и развернуть стенд по инструкции с портала

2. Загрузить компонент **core_application_mng** [https://gitea.websoft.ru/WebSoft.Components/core_application_mng](https://gitea.websoft.ru/WebSoft.Components/core_application_mng) в папку **components**

3. Добавить в профиль безопасности "Базовые API" библиотеку "libAppsMgmt"
![[Pasted image 20241129143459.png]]
![[Pasted image 20250124114014.png]]

4. В конфигурации workspace включить модуль приложений
![[Pasted image 20241129143342.png]]
![[Pasted image 20241129143409.png]]

5. Обработать пакет с агентом **convert_roles_to_config** и **ЗАПУСТИТЬ АГЕНТ**, чтобы изменить механизм доступа в конфигурации [https://devopssrv.websoft.ru/DefaultCollection/webtutor4/_workitems/edit/28604](https://devopssrv.websoft.ru/DefaultCollection/webtutor4/_workitems/edit/28604)
6. Остановить сервер
7. В папке **WebSoftServer\wt_data** удалить папку **catalogs**
8. Перезапустить сервер с перестройкой каталогов
9. http://localhost/vchat/apps

![image](https://github.com/user-attachments/assets/fc12e504-cbb7-42dc-a920-9f66d6e90e50)
