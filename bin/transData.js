/*
 * @Author: Ada J
 * @Date: 2022-03-04 13:10:17
 * @LastEditTime: 2022-03-06 20:17:58
 * @Description: Just for Quizlet format
 */
const fs = require('fs');
const path = require('path');
const data = require(path.join(__dirname, '../terms.json'));

let quizletObject = {};
data.forEach(item => {
  quizletObject[item.term] = item.definition;
})

fs.writeFileSync(path.join(__dirname, '../quizlet.json'), JSON.stringify(quizletObject));

