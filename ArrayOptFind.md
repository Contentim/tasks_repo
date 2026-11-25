---
tags:
  - websoft
  - решения
---
```
БЫЛО
is_std: ArrayOptFind(arrStandartCodeLibs, "This=='" + oLibAccess.library_code + "'") != undefined

СТАЛО
is_std: ArrayOptFind(arrStandartCodeLibs, (e) => {return e == oLibAccess.library_code}) != undefined
                        
```