/*
 * @Author: Ada J
 * @Date: 2022-03-04 09:51:48
 * @LastEditTime: 2022-03-04 13:19:48
 * @Description: add a new term
 */
const inquirer = require('inquirer');
const boxen = require("boxen");
const fs = require("fs");
const yargs = require("yargs");
const chalk = require("chalk");

const termBoxenOptions = {
  padding: 1,
  margin: 1,
  borderStyle: "classic",
  borderColor: "#8bc34a"
};
const options = yargs
 .usage(`Usage: \n $0 --at [term] --ad [definition] \n $0 --game`)
 .option("at", {describe: "Add a term", type: "string"})
 .option("ad", {describe: "Add a definition", type: "string"})
 .option("game", {describe: "Play games", type: "string"})
 .argv;

// add a new term
async function addNewTerm(termsArray, termsFilePath){
  let termsLen = termsArray.length;
  if (options.at && !options.ad) {
    console.log(chalk.red("Please add a definition!"));
    return
  }else if(!options.at && options.ad){
    console.log(chalk.red("Please add a term first!"));
    return
  }else if(options.at && options.ad){
    // add/update a term
    if (termsLen > 0) {
      for(let i of termsArray){
        if(i.term === options.at){
          await inquirer.prompt([
            {
              type: 'confirm',
              message: 'Term already exists, do you want to replace it?',
              name: 'termExists'
            }
          ]).then((answers) => {
            if(answers.termExists){
              i.definition = options.ad;
              fs.writeFileSync(termsFilePath, JSON.stringify(termsArray));
              console.log(chalk.green("Term updated!"));
              process.exit();
            }else{
              process.exit();
            }
          })
        }
      }
      termsArray.push({
        term: options.at,
        definition: options.ad
      });
    }else{
      termsArray.push({
        term: options.at,
        definition: options.ad
      });
    }
    
    fs.writeFileSync(termsFilePath, JSON.stringify(termsArray));
    const tip = chalk.white.bold(`You add a new term, ${chalk.green.bold(options.at)}`);
    const msgBox = boxen(tip, termBoxenOptions);
    console.log(msgBox);
  }else{
    console.log(chalk.red("Please add a term and a definition!"));
    return;
  }
}

module.exports = {
  addNewTerm,
}