#log #логирование #debug #alert #LogEvent
#### Вывод логов в консоль браузера
```js
LogEvent('', tools.object_to_text(oResult,'json'))
```

#### Вывод логов в файл *DEVELOPER_REPORT*
```js
EnableLog('DEVELOPER_REPORT', true );

// текст
LogEvent('DEVELOPER_REPORT', alert(value))

// объект
LogEvent('DEVELOPER_REPORT', tools.object_to_text(value,'json'))
```

#### Отображение ИД объектов на странице портала(GET-параметр)
```php
?tracing=verbose
```
##### Пример
```
URL: https://my.websoft.ru/_wt/doc_std_20203_mywebsoft/7176312992668802317?tracing=verbose
```

![[Pasted image 20240531125110.png]]
[[Демо тест 2 - изменение]]

```
var sTracingLogName = "tracing-1"; 
EnableLog(sTracingLogName); 
var curTiming = GetCurTicks(); 
var curAllTiming = GetCurTicks();

LogEvent(sTracingLogName,'libMain: GetPersonCollaborators: get_user_collaborators: ' + (GetCurTicks() - curTiming) + ' ms. (' + (GetCurTicks() - curAllTiming) + ' ms.)'); curTiming = GetCurTicks();
```

## Функция для библиотеки
```js
function Developer(value, param){
    EnableLog('DEVELOPER_FILE', true );
    if(alert == 'alert')
    {
        LogEvent('DEVELOPER_REPORT', alert(value))
    } else {
        LogEvent('DEVELOPER_FILE', tools.object_to_text(res,'json'))
    }
}
```

Варианты вызова функции
```js
tools.call_code_library_method( "libMain", "Developer", [ oResult, '_alert' ] );


```