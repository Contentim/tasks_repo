Решение я нашел в комментариях на оригинальном GitHub от ValdikSS (подходит только для последней версии 0.2.3rc3-2).

![[Pasted image 20240923182923.png]]
1. Переходим на [указанный сайт](https://www.browserling.com/tools/random-hex), выставляем 116 символов для генерации чисел и выбираем 1 результат.
    
2. Открываем .cmd файл из архива GoodbyeDPI, который обычно используете (например, 1_russia_blacklist, 1_russia_blacklist_dnsredir, service_install_russia_blacklist и т.д.), через блокнот или любую другую текстовую программу для редактирования.
    
3. Рядом с цифрой перед --blacklist добавляем -e1 -q --fake-gen 29 и вставляем ранее сгенерированные числа. В результате строка будет выглядеть так:

```
-9 -e1 -q --fake-gen 29 --fake-from-hex c8ff56a41f90e5b49909a47e8f77c9cd5e2102a24e95078fcd2cee2ec28a6ea30615d95c64e7d71db6ef41a554029d9e50eeeeb5fb277aa3c77b
```

![[Pasted image 20240923183026.png]]
