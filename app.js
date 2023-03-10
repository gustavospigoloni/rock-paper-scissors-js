const getRandomInt = () => Math.floor(Math.random() * 3);
const capitalizeWord = (word) => word[0].toUpperCase() + word.slice(1);

function computerPlay () {
    let computerSelection = getRandomInt();
    switch (computerSelection) {
        case 0:
            return "rock";
        case 1:
            return "paper";
        case 2:
            return "scissors";
        default:
            //never gets here because the function getRandomInt can only return 0, 1 or 2
            return;
    }
}

function isPlayerSelectionValid (playerSelection) {
    if (/^[a-zA-Z]+$/.test(playerSelection) && playerSelection != null && playerSelection != undefined) {
        if (playerSelection === "rock" || playerSelection === "paper" || playerSelection === "scissors") {
            return true;
        }
    }
    return false;
}

function playerPlay () {
    let selection = prompt("Rock, paper or scissors?");
    if (selection === null) throw "You clicked on Cancel so the game stopped. Reload the page if you want to play again.";
    let validPlay = isPlayerSelectionValid(selection.toLocaleLowerCase());
    while (!validPlay) {
        selection = prompt("Hey, no numbers, symbols or spaces! Just rock, paper or scissors?");
        if (selection === null) throw "You clicked on Cancel so the game stopped. Reload the page if you want to play again.";
        validPlay = isPlayerSelectionValid(selection.toLocaleLowerCase());
    }
    return selection;
}

function playRound (playerSelection, computerSelection) {
    //  0 is a tie / 1 player wins / 2 computer wins
    if (playerSelection === computerSelection) return 0;

    if (playerSelection === "rock") {
        if (computerSelection ==="paper") {
            return 2;
        } else {
            return 1;
        }
    } else if (playerSelection === "paper") {
        if (computerSelection ==="scissors") {
            return 2;
        } else {
            return 1;
        }
    } else {
        if (computerSelection ==="rock") {
            return 2;
        } else {
            return 1;
        }
    }
}

function game () {
    console.clear();
    let playerWins = 0,
    computerWins =  0,
    ties = 0,
    playerSelection,
    computerSelection,
    roundWinner;
    for (let i = 0; i < 5; i++) {
        playerSelection = playerPlay();
        computerSelection = computerPlay();
        roundWinner = playRound (playerSelection, computerSelection);
        if (roundWinner === 2){
            console.log(`You lose! ${capitalizeWord(computerSelection)} beats ${capitalizeWord(playerSelection)}`);
            computerWins++;
        } else if (roundWinner === 1) {
            console.log(`You win! ${capitalizeWord(playerSelection)} beats ${capitalizeWord(computerSelection)}`);
            playerWins++;
        } else {
            console.log(`It's a tie! ${capitalizeWord(playerSelection)} x ${capitalizeWord(computerSelection)}`);
            ties++;
        }
    }
    if (playerWins > computerWins) {
        console.log(`You won the BO5! ${playerWins} player wins x ${computerWins} computer wins and ${ties} ties`);
    } else if (computerWins > playerWins) {
        console.log(`You lost the BO5! HAHA! ${computerWins} computer wins x ${playerWins} player wins and ${ties} ties`);
    } else {
        console.log(`It's a tie! ${ties} ties, ${computerWins} computer wins and ${playerWins} player wins`);
    }
}

let consoleOpen = window.confirm("If your browser console is not open, please press Ctrl + Shift + J (or Cmd + Shift + J on a Mac) "
+ "to open it and the reload the page. You need the console to see the game results. If your console is open click 'OK' for the game "
+ "to start or click 'Cancel' for you to open the console and then reload the page.");

if (consoleOpen) {
    game();
    let playerWantNewGame = true;

    while(playerWantNewGame) {
        playerWantNewGame = window.confirm("Do you wanna play another bo5 match of rock, paper or scissors? Click 'OK' to begin the game or 'Cancel' to exit.");
        if (playerWantNewGame) {
            game();
        } else {
            console.log("You clicked on Cancel so the game stopped. Reload the page if you want to play.");
            playerWantNewGame = false;
        }
    }
}