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

```
/* 
tools.create_notification( 
iCollaboratorNotificationID, // ID template OptInt(itemPerson), 
// ID Object - objDocID sAddText, 
// Text 0 
// ID Object Second - objDocSecID undefined, 
// Object First - objDoc docDevelopmentProgramTE 
// Object Second - objDocSec ); 
*/

/* 5 параметр должен идти TopElem от iRecipientID 6 параметр должен идти TopElem от docCareerReserve.DocID (у тебя curTask) */ //tools.create_notification( iNotificationID, iRecipientID, "", docCareerReserve.DocID, null, teCareerReserve ); tools.create_notification( iNotificationID, iRecipientID, "", docCareerReserve.DocID, null, curTask );
```