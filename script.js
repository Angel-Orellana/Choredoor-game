const doorImage1 = document.getElementById('door1');
const doorImage2 = document.getElementById('door2');
const doorImage3 = document.getElementById('door3');
const startButton = document.getElementById('start');
const closedDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg";
const botDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg";
const beachDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg";
const spaceDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg";
let openDoor1 = "";
let openDoor2 = "";
let openDoor3 = "";
let highScore = 0;
let score = 0;
let numClosedDoor = 3;
let currentlyPlaying = true;
const currentStreak = document.getElementById('score');
const bestStreak = document.getElementById('high-score');
currentStreak.innerHTML = score;
bestStreak.innerHTML = highScore;

const isBot = door =>{
    if (door.src === botDoorPath){
        return true;
    } else {
        return false; 
    }
}

const isClicked = door =>{
    if (door.src === closedDoorPath){
        return false; 
    } else {
        return true;
    }
}
const playDoor = (door) =>{
    numClosedDoor --;
    if (numClosedDoor == 0){
        gameOver('win');
    }else if(isBot(door)){
        gameOver('lose');
    }
}

const randomDoorGenerator = () =>{
    let choreDoor = Math.floor(Math.random() * numClosedDoor); 
    if (choreDoor == 0){
        openDoor1 = botDoorPath;
        openDoor2 = beachDoorPath;
        openDoor3 = spaceDoorPath;
    } else if (choreDoor == 1){
        openDoor1 = spaceDoorPath;
        openDoor2 = botDoorPath;
        openDoor3 = beachDoorPath;
    } else if (choreDoor == 2){
        openDoor1 = beachDoorPath;
        openDoor2 = spaceDoorPath;
        openDoor3 = botDoorPath;
    }
}

doorImage1.onclick = () => {
    if (currentlyPlaying && !isClicked(doorImage1)){
        doorImage1.src = openDoor1;
        playDoor(doorImage1); 
    }
}

doorImage2.onclick = () =>{
    if (currentlyPlaying && !isClicked(doorImage2)){
        doorImage2.src = openDoor2;
        playDoor(doorImage2);
    }
}

doorImage3.onclick = () =>{
    if (currentlyPlaying && !isClicked(doorImage3)){
    doorImage3.src = openDoor3;
    playDoor(doorImage3);
    }
}

startButton.onclick = () =>{
    if (!currentlyPlaying){
    startRound();
    }
}

const startRound = () =>{
    numClosedDoor = 3;
    doorImage1.src = closedDoorPath;
    doorImage2.src = closedDoorPath;
    doorImage3.src = closedDoorPath;
    startButton.innerHTML = 'Good Luck!';
    currentlyPlaying = true; 
    randomDoorGenerator();
}

const gameOver = (status) =>{
    if (status === 'win'){
        startButton.innerHTML = 'You win! Start again?';
        getYourScore();
    }else if (status === 'lose'){
        startButton.innerHTML = 'Game over! Play again?';
        score=0; 
        currentStreak.innerHTML = score;
    }
    currentlyPlaying = false;
}

const getYourScore = () => {
    score++;
    currentStreak.innerHTML = score;
    if (score > highScore) {
      highScore = score;
      bestStreak.innerHTML = highScore;
    }
  }
  

startRound();