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
            return "Error";
    }
}

function isPlayerSelectionValid (playerSelection) {
    if (!/[^a-zA-Z]/.test(playerSelection)) {
        if (playerSelection === "rock" || playerSelection === "paper" || playerSelection === "scissors") {
            return true;
        }
    }
    return false;
}

function playerPlay () {
    let selection = prompt("Rock, paper or scissors?").toLowerCase();
    let validPlay = isPlayerSelectionValid(selection);
    while (!validPlay) {
        selection = prompt("Hey, no numbers or symbols! Just rock, paper or scissors?").toLowerCase();
        validPlay = isPlayerSelectionValid(selection);
    }
    return selection;
}

function playRound (playerSelection, computerSelection) {
    //0 tie / 1 player win / 2 computer win
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
        if (roundWinner === 1){
            console.log(`You lose! ${capitalizeWord(computerSelection)} beats ${capitalizeWord(playerSelection)}`);
            computerWins++;
        } else if (roundWinner === 2) {
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

//calling the function so the game starts when page is loaded/reloaded
game();