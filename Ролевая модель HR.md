#websoft #model_role #data #hr

```js
arrSubordinateIDs = oModelRoles.subordinate_ids.hr;
                        arrOrgIDs = oModelRoles.org_ids.hr;

arrOrgPersonIDs = [];
if (ArrayOptFirstElem(arrOrgIDs) != undefined)
{
	sQuery = 'for $elem_qc in collaborators where MatchSome($elem_qc/org_id, (' + ArrayMerge(arrOrgIDs, 'This', ',') + ')) return $elem_qc/Fields(\'id\')';
	xarrOrgPersonIDs = tools.xquery(sQuery);
	arrOrgPersonIDs = ArrayExtract(xarrOrgPersonIDs, 'This.id.Value');
}

arrGroupIDs = oModelRoles.group_ids.hr;
arrGroupPersonIDs = [];

if (ArrayOptFirstElem(arrGroupIDs) != undefined)
{
	sQuery = 'for $elem_qc in group_collaborators where MatchSome($elem_qc/group_id, (' + ArrayMerge(arrGroupIDs, 'This', ',') + ')) return $elem_qc/Fields(\'collaborator_id\')';
	xarrGroupPersonIDs = tools.xquery(sQuery);
	arrGroupPersonIDs = ArrayExtract(xarrGroupPersonIDs, 'This.collaborator_id.Value');
}

arrSubdivisionIDs = oModelRoles.subdivision_ids.hr;
arrSubdivisionPersonIDs = [];

if (ArrayOptFirstElem(arrSubdivisionIDs) != undefined)
{
	sQuery = 'for $elem_qc in collaborators where MatchSome($elem_qc/position_parent_id, (' + ArrayMerge(arrSubdivisionIDs, 'This', ',') + ')) return $elem_qc/Fields(\'id\')';
	xarrSubdivisionPersonIDs = tools.xquery(sQuery);
	arrSubdivisionPersonIDs = ArrayExtract(xarrSubdivisionPersonIDs, 'This.id.Value');
}

_arrPersonIDs = ArrayUnion(arrOrgPersonIDs, arrSubordinateIDs, arrGroupPersonIDs, arrSubdivisionPersonIDs);

if (ArrayOptFirstElem(_arrPersonIDs) != undefined)
{
	arrPersonIDs = ArraySelect(_arrPersonIDs, 'This != curUserID');
}
```

```js
switch( oModelRoles.type )
{
	case 'hr':
	{
		// код ролевой модели
	}
}

// !!! обязательно !!!
if(ArrayCount(arrPersonIDs) > 0){
	sXQueryQual = ' MatchSome($elem_qc/person_id, (' + ArrayMerge(arrPersonIDs, 'This', ',') + '))';
}
```