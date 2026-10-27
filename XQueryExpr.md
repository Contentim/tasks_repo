---
tags:
  - websoft
  - решения
---
Было
```
if (!IsEmptyValue(arrSelectedObjects))
{
	arrCond.push("MatchSome( $elem/id, (" + ArrayMerge(String(oCollectionParams.sObjectIDs).split(';'), (f) => {return XQueryLiteral(OptInt(Trim(f), 0), TypeInteger)}, ",") + "))");

}
```

Стало
```
var aSelectedObjectIDs = ArrayExtract(ArraySelect(String(oCollectionParams.GetOptProperty("sObjectIDs", "")).split(';'), (f) => { return OptInt(Trim(f)) != undefined; }), (f) => { return OptInt(Trim(f)); });
    
if (ArrayCount(aSelectedObjectIDs) > 0)
{
	oXqe = oXqe.WhereMatchSome("wf", "id", aSelectedObjectIDs, TypeInteger);
}
```