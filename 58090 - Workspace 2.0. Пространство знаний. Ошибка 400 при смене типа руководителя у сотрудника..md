#websoft #баг

в ситуациях, когда нет отчества и требуется сформировать короткое имя, 
*например Иванов И.И.*
```
function short_name(sFullname)
{
   var arrFullname = String(sFullname).split(" ");
   var sFirstname = ArrayCount( arrFullname ) > 1 ? " " + StrLeftCharRange(arrFullname[1], 1) +"." : "";
   var sMiddlename = ArrayCount( arrFullname ) > 2 ? "" + StrLeftCharRange(arrFullname[2], 1) + "." : "";
   return " (" + arrFullname[0] + "" + sFirstname + "" + sMiddlename + ")";
}
```