#!/usr/bin/env node
module.exports = {
  chooseGame,
}

const fs = require("fs");
const chalk = require("chalk");
const inquirer = require('inquirer');
const path = require('path');
const { addNewTerm } = require('./addNew');
const { playFlashcard } = require('./flashcard');

// define global variables
let termsArray = [];
let termsLen = 0;
const termsFilePath = path.join(__dirname, "../terms.json");

// read data from file
function readData(){
  let dataSource = fs.readFileSync(termsFilePath);
  let stats = fs.statSync(termsFilePath);
  let fileSizeInMB = stats.size / (1024*1024);
  if(fileSizeInMB > 10){
    console.log(chalk.red(`${termsFilePath} is too large, please delete it and try again!`));
    process.exit();
  }

  termsArray = dataSource.length > 0 ? JSON.parse(dataSource) : []; 
  termsLen = termsArray.length;
}

// resolve argv and call functions
if(
  process.argv.includes('--game')
  && !process.argv.includes('--at') 
  && !process.argv.includes('--ad')){
  // play game
  readData()
  chooseGame();
}else if(
  !process.argv.includes('--game')
  && (process.argv.includes('--at') 
  || process.argv.includes('--ad'))){
  // add a term
  readData()
  addNewTerm(termsArray, termsFilePath) 
}else if(
  process.argv.includes('--game')
  && (process.argv.includes('--at') 
  || process.argv.includes('--ad'))){
  console.log(chalk.red("Please choose GAME or ADD a term!")); 
}

// choose game
function chooseGame(){
  inquirer.prompt([
    /* Pass your questions in here */
    {
      name: 'Menu',
      type: 'list',
      message: 'SELECT A GAME',
      // choices may be defined as an array or a function that returns an array
      choices: [
          '- Flashcard -',
          '- Others -'
      ]
    }
  ]).then((answers) => {
    if(answers.Menu === '- Flashcard -'){
      if(!termsLen){
        console.log(chalk.red("There is no term in database, please add a term first!"));
        return;
      }
      playFlashcard(termsArray);
    }else if(answers.Menu === '- Others -'){
      console.log(chalk.yellow("I am thinking~ 😬😬😬"));
    }else{
      console.log(chalk.red("There is something wrong...Try it again!"));
      return;
    }
  })
}