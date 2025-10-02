#websoft #
```
/**

 * @typedef {Object} oCourseLogList
 * @property {date} date
 * @property {string} type
 * @property {string} location
 * @property {string} text
 * @property {string} log
 * @property {string} comment
*/

/**
 * @typedef {Object} ReturnCourseLogList
 * @property {number} error – Код ошибки.
 * @property {string} errorText – Текст ошибки.
 * @property {oCourseLogList[]} array – Коллекция задач раздела курса.
*/

/**
 * @function GetCourseLogs
 * @memberof Websoft.WT.DistanceLearningManagement
 * @author IG
 * @description Сводные результаты. Задачи раздела курса
 * @param {bigint} iLearningID - ID курса
 * @param {string} sPartCode - Код раздела курса
 * @param {bigint} iCurUserID - ID пользователя
 * @param {oCollectionParam} oCollectionParams - Набор интерактивных параметров (отбор, сортировка, пейджинг)
 * @returns {ReturnCourseLogList}
*/
```