var play = document.getElementById("play");
var pause = document.getElementById("pause");
var reset = document.getElementById("reset");
var playDiv = document.getElementById("play-button");
var pauseDiv = document.getElementById("pause-button");
var circle = document.getElementById("circle");
var robot = document.getElementById("robot-div");
// var robot_div = document.getElementById("robot-div");
circle.addEventListener("click", choiceFunction);
play.addEventListener("click", playFunction);
pause.addEventListener("click", pauseFunction);
reset.addEventListener("click", resetFunction);

//variables for the interval

var timeInterval=0;
let completedTime=0;
var isPaused = true;

//function for displaying buttons play/pause
function displayButton(key){
    let shownButton;
    let hiddenButton;
    if(key == "play"){
        shownButton = play;
        hiddenButton = pause;
    }
    else{
        shownButton = pause;
        hiddenButton = play;
    }
    var hidden_or_none = robot.style.display;
    // var robot_hidden = robot_div.style.display;
    // robot_div.style.display = robot_hidden == "block"? "none" : "block";
    robot.style.display = hidden_or_none == "block"? "none" : "block";
    hiddenButton.style.display = "none";
    shownButton.style.display = "block";

}
//funciton to start the timer
function playFunction(){
    const timeStart = Date.now()-completedTime; //getting the time if staaopwatch starts from pause state
    timeInterval = setInterval(function printTime(){
        
        completedTime = Date.now()-timeStart;
        printing(changeToString(completedTime));
    }, 10);
    displayButton("pause");
    isPaused=false;
}

//function for pausing the stopwatch
function pauseFunction(){
    clearInterval(timeInterval);
    displayButton("play");
    isPaused = true;
    robot.style.display = "none";

}

//function for resetting the stopwatch back to 00:00:00
function resetFunction(){
    clearInterval(timeInterval);
    timeInterval = null;
    printing("00 : 00 : 00");
    //setting completed time back to 0
    completedTime=0;
    displayButton("play");
    robot.style.display = "none";
    isPaused = false;
}


//function to print time again and again
function printing(txt){
    document.getElementById("time").innerHTML = txt;
}


//function to convert time to String to paste on webpage

function changeToString(time){
    let hrs = time/3600000; 
    let hr = Math.floor(hrs);
    
    let mins = (hrs-hr)*60;
    let min = Math.floor(mins);
    
    let secs = (mins-min)*60;
    let sec = Math.floor(secs);

    let milis = (secs-sec)*100;
    let mili = Math.floor(milis);

    let minuteFormat = min.toString().padStart(2, "0");
    let secondsFormat = sec.toString().padStart(2, "0");
    let miliSeconds = mili.toString().padStart(2, "0");
    return `${minuteFormat} : ${secondsFormat} :    ${miliSeconds}`;
}

function choiceFunction(){
    if(isPaused){
        console.log("i'm called play");
       playFunction(); 
    }
    else{
        pauseFunction();
        console.log("i'm called pause");
    }
}