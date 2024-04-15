/*
 * @Author: Ada J
 * @Date: 2022-03-04 13:10:17
 * @LastEditTime: 2022-05-12 21:53:24
 * @Description: Just for Quizlet format
 */
const fs = require('fs');
const path = require('path');
const data = require(path.join(__dirname, '../terms.json'));

let quizletObject = {};
data.forEach(item => {
  quizletObject[item.term] = item.definition + '***';
})

fs.writeFileSync(path.join(__dirname, '../quizlet.json'), JSON.stringify(quizletObject));

