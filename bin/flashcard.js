/*
 * @Author: Ada J
 * @Date: 2022-03-04 09:46:37
 * @LastEditTime: 2022-03-04 13:19:57
 * @Description: flashcard game
 */

const inquirer = require('inquirer');
const chalk = require('chalk');
const boxen = require("boxen");
const { chooseGame } = require('./index');

const defBoxenOptions = {
  padding: 1,
  margin: 1,
  borderStyle: "classic",
  borderColor: "#ff9800"
};

// play flashcard
let currentIndex = 0;
let correctAnswer = 0;
let incorrectAnswer = 0;

// set a divide line
function setDivideLine(sign){
  const success = chalk.green("--------:)------------------------:)------------------------:)--------");
  const fail = chalk.red("--------:(------------------------:(------------------------:(--------");
  const divideLine = chalk.cyan("--------:(------------------------ =) ------------------------:)--------");
  console.log(sign === 'success' ? success : sign === 'fail' ? fail : divideLine);
}

function playFlashcard(termsArray){
  let termsLen = termsArray.length;
  const definition = chalk.green.bold(termsArray[currentIndex].definition);
  const msgBox = boxen(definition, defBoxenOptions);
  console.log(msgBox);
  inquirer.prompt([
    {
      type: 'input',
      message: 'Your answer is:',
      name: 'userInput'
    }
  ]).then((answers) => {
    if(answers.userInput === termsArray[currentIndex].term){
      console.log(chalk.green("WELL DONE!"));
      setDivideLine('success');
      correctAnswer++;
    }else{
      console.log(chalk.red("STUDY AGAIN!"));
      console.log(chalk.white.bgGreen("The correct answer is: " + termsArray[currentIndex].term));
      setDivideLine('fail');
      incorrectAnswer++;
    }

    if(currentIndex < termsLen - 1){
      currentIndex++;
      playFlashcard(termsArray);
    }else{
      console.log(chalk.yellow("GAME IS OVER!"));
      console.log(chalk.bgGreen.gray("Correct answer: " + correctAnswer));
      console.log(chalk.bgYellow.gray("Incorrect answer: " + incorrectAnswer));
      setDivideLine();
      if(correctAnswer === termsLen){
        console.log(chalk.green(`
        🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉
        🎉🎉🎉🎉🎉🎉 BRAVO! 🎉🎉🎉🎉🎉🎉
        🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉
        🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉`));
      }
      if(incorrectAnswer === termsLen){
        console.log(chalk.red(`
        😮😮😮😮😮😮😮😮😮😮😮😮😮😮😮😮
        😮😮😮 KEEP PRACTICING! 😮😮😮😮
        😮😮😮😮😮😮😮😮😮😮😮😮😮😮😮😮
        😮😮😮😮😮😮😮😮😮😮😮😮😮😮😮😮`));

      }
      inquirer.prompt([
        {
            type: 'confirm',
            message: 'Would you like to back to the main menu?',
            name: 'mainMenu'
        }
      ]).then(function (answers) {
        if (answers.mainMenu) {
            // Reset the game
            currentIndex = 0;
            correctAnswer = 0;
            incorrectAnswer = 0;
            chooseGame();
        } else {
            // Exit the game
            console.log('See ya next time!');
        }
      })
    }

  })

}

module.exports = {
  playFlashcard,
  setDivideLine
}