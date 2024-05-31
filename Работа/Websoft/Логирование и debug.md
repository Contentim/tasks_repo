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




[[Демо тест 2 - изменение]]

