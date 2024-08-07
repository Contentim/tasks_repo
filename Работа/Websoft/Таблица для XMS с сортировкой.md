Работу таблицы можно посмотреть в **Процессы -> Обучение -> Управление дистанционным обучением -> Статистика -> По отзывам**
## Файл 
```js
wtv_view_course_integral_efficiency_report.xms
```
## Листинг
```xml
<LIST NAME="ViewGrid" HEIGHT="-32vpx" ROW-AUTO-HEIGHT="1" VERT-SCROLL="1" LOOP-EXPR="
		try
		{
			arrColumnsInfo = StrReplace( List.GetCurCodeSortInfo(), '\'', '' ).split( ',' );
			sColumnName = Trim( arrColumnsInfo[0] );
			sSortDir = Trim( arrColumnsInfo[1] );

			Ps.data_course_integral_efficiencys.Sort( sColumnName, sSortDir )
			return Ps.data_course_integral_efficiencys;
		}
		catch( ex )
		{
			return Ps.data_course_integral_efficiencys;
		}
	" ON-SEL-CHANGE="
		if ( TopElem.ChildExists( 'count_sel' ) )
		{
			TopElem.set_sel_action( List );
		}
	">
	<ROW DELETE-ACTION="" OPEN-ACTION="ObtainDocScreen( UrlFromDocID( ListElem.id ) )" IMAGE-URL="ico/event.ico">
		<COL WIDTH="25zr" COL-TITLE-EXPR="ms_tools.get_const('c_coll')" TITLE-EXPR="ListElem.person_fullname" ORDER="person_fullname"/>
		<COL WIDTH="25zr" COL-TITLE-EXPR="'Оценка (от 1 до 5)'" TITLE-EXPR="ListElem.basic_score_field" ORDER="basic_score_field"/>
	</ROW>
</LIST>
```