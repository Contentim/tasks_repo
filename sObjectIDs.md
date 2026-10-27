---
tags:
  - websoft
  - решения
---
```js
var sObjectIDs = Trim(SCOPE_WVARS.GetOptProperty("sObjectIDs", ""));
if (!IsEmptyValue(sObjectIDs))
{
	oCollectionParams.sObjectIDs = StrReplace(StrReplace( sObjectIDs,' ',''),',',';')
}
```