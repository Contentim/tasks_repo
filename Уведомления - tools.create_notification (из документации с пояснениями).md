---
tags:
  - websoft
  - помощь
---
```
tools.create_notification(

   sNameNotification // [oTypeParam],

   iObjectIDParam // <%=objDocID%>,

   sTextParam // <%=Text%>,

   iSecondObjectIDParam // <%=objDocSecID%>,

   oObjectParam // <%=objDoc.Xml %> TopElem iObjectIDParam,

   oSecondObjectParam // <%=objDocSec.Xml %> TopElem iSecondObjectIDParam,

   teSourceParam // необязательный, используется, если атрибут oTypeParam пустой ('') или равен '0' 

);
```