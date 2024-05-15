import {box, boxes, columns, displyBoxes, rows} from './moduleFunction.js';

let arrayRowed= "";
let points= {score: 0, best: 0};

let best;

try {
    best= JSON.parse(localStorage.getItem('best'));
    if(typeof best.best == "number"){
    
        points.best= best.best;
        document.getElementById("best").textContent= points.best;
    }
} catch (error) {
    console.log("no no no")
    
}


function increaseScore(number){
    points.score+= Number(number);
    document.getElementById("score").textContent= points.score;
    saveBest();
}
function saveBest(){
    if(points.score > points.best){
        points.best= points.score;
        localStorage.setItem('best', JSON.stringify(points));
    }
    document.getElementById("best").textContent= points.best;
}


// generates a number on a number between 2 or 4 & adds it on a random empty box on the grid
function randomPosition(num){
    let tries= 1;
    let empty= true;
    let random= Math.floor(Math.random() * (16 - 1) + 1);
    do {
        let number= Number(box[boxes[random]]);
        
        if(isNaN(number) || number < 2){
           box[boxes[random]]= num;
           document.getElementById(displyBoxes[random]).textContent= box[boxes[random]];
           empty= false
        }
        else{
            random= Math.floor(Math.random() * (16 - 1) + 1);
        }


        if(tries > 45){
            break
        }
        else{
            tries++
        }
    } while (empty== true); 

}

function randomNumber(){
    let numbers= [2, 2, 2, 2, 2, 4, 2, 2, 2, 2];
    let random= Math.floor(Math.random() * (9 - 0) + 1);
    return (numbers[random])
}

// THIS FUCTION CHECKS & COMPARE ALL VERTICALLY VALUES
function evaluateSine(direction){
    for(let i= 0; i < direction.length; i++){
        for(let b= 0; b < direction[i].length; b++){
            arrayRowed+= `${box[direction[i][b]]}  `;
        }
        arrayRowed= arrayRowed.split(" ").filter(n => n);//the filter method from stackOverflow
                                            //filters out empty strings i.e " "
        //checks if the first two are eqaul
        if(checkPair(0, 1)){
            checkPair(1, 2)
        }
        else if(checkPair(1, 2)){
            checkPair(2, 3)
        }
        else{
            checkPair(2, 3)
        }

        for(let b= 0; b < direction[i].length; b++){
            box[direction[i][b]] = " " ;
            if(typeof arrayRowed[b]==  "string" || typeof arrayRowed[b]== "number"){
                box[direction[i][b]] = Number(arrayRowed[b]) ;
            }
        }
        arrayRowed= ""
    }
    randomPosition(randomNumber());    
    
    alternateBox()
}
function evaluateCos(direction){
    for(let i= 0; i < direction.length; i++){
        for(let b= 3; b >= 0; b--){
            arrayRowed+= `${box[direction[i][b]]}  `;
        }
        arrayRowed= arrayRowed.split(" ").filter(n => n);//the filter method from stackOverflow
                                            //filters out empty strings i.e " "
        //checks if the first two are eqaul
        if(checkPair(0, 1)){
            checkPair(1, 2)
        }
        else if(checkPair(1, 2)){
            checkPair(2, 3)
        }
        else{
            checkPair(2, 3)
        }
        let pos= 0;
        for(let b= 3; b >= 0 ; b--){
            box[direction[i][b]] = " " ;  //clears the current number in the number box object
            if(typeof arrayRowed[pos]==  "string" || typeof arrayRowed[pos]== "number"){
                box[direction[i][b]] = Number(arrayRowed[pos]) ;
                pos++
            }
        }
        arrayRowed= ""
    }
    randomPosition(randomNumber());    
    
    alternateBox()
}
   
function checkPair(first, second){
    if(arrayRowed[first] === arrayRowed[second]){
        let number = arrayRowed[first] ;

        if(!isNaN(number)){
            number= (Number(number) * 2);
            increaseScore(number);
            saveBest()
            
            let clone= [];
            delete arrayRowed[first];
            delete arrayRowed[second];
            arrayRowed= arrayRowed.filter(n => n);


            let counter;
            for(counter= 0; counter < first; counter++){
                clone.push(Number(arrayRowed[counter]));
            }
            clone.push(number);
            for(let i= first; i< arrayRowed.length ; i++){
                clone.push(Number(arrayRowed[i]));
            }
            arrayRowed= clone;
        }
        return true
    }
    else{
        return false
    }
    
}

randomPosition(randomNumber());
randomPosition(randomNumber());

alternateBox()

function alternateBox(){
    let index=0;
    for(let i=0; i < boxes.length; i++){
        let boxNumber= box[boxes[index]];

        document.getElementById(displyBoxes[index]).textContent= boxNumber;
        if(boxNumber > 8){
            document.getElementById(displyBoxes[index]).style.color= "#ffffff";
        }
        else{
            document.getElementById(displyBoxes[index]).style.color= "#000000"
        }

        switch (boxNumber) {
            case 2:
                document.getElementById(displyBoxes[index]).style.backgroundColor= "hsl(30, 37%, 89%)";    
                break;
            case 4:
                document.getElementById(displyBoxes[index]).style.backgroundColor= "hsl(40, 49%, 85%)";   
                break;
            case 8:
                document.getElementById(displyBoxes[index]).style.backgroundColor= "hsl(30, 37%, 89%)";    
                break;
            case 16:
                document.getElementById(displyBoxes[index]).style.backgroundColor= "#f59562";   
                break;
            case 32:
                document.getElementById(displyBoxes[index]).style.backgroundColor= "#f47d5c";    
                break;
            case 64:
                document.getElementById(displyBoxes[index]).style.backgroundColor= "#f45d3a";   
                break;
            case 128:
                document.getElementById(displyBoxes[index]).style.backgroundColor= "#edce70";    
                break;
            case 256:
                document.getElementById(displyBoxes[index]).style.backgroundColor= "#edcc60";   
                break;
            case 512:
                document.getElementById(displyBoxes[index]).style.backgroundColor= "#ecc750";    
                break;
            case 1024:
                document.getElementById(displyBoxes[index]).style.backgroundColor= "#edc53e";   
                break;
            case 2048:
                document.getElementById(displyBoxes[index]).style.backgroundColor= "#ecc400"; 
                document.getElementById("game-name").innerHTML+=  `<style> ${displyBoxes[index]}{box-shadow: 2px 2px 15px #ecc400; </style>`;   
                break;
            default: document.getElementById(displyBoxes[index]).style.backgroundColor= "hsl(32, 20%, 75%)";
                break;
        }
        index++
    }

}
 
const buttonUp=   document.getElementById("up");
const buttonLeft=   document.getElementById("left");
const buttonRight=   document.getElementById("right");
const buttonDown=   document.getElementById("down");

function uped(){
    evaluateSine(columns)
}
function downed(){
    evaluateCos(columns)
}

function lefted(){
    evaluateSine(rows)
}
function righted(){
    evaluateCos(rows)
}

// THIS IS FOR THE DESKTOP MOVEMENT
buttonUp.addEventListener('click', uped);
buttonDown.addEventListener('click',downed );
buttonLeft.addEventListener("click", lefted);
buttonRight.addEventListener('click', righted)

// THIS IS FOR THE  MOBILE MOVEMENT
let strtX, strtY, movingX, movingY;

// function touchStrt(evt){
// }

function touchMove(evt){
}
function touchEnd(){
}


document.addEventListener('touchstart', e => {
    //e.preventDefault();
    strtX= e.touches[0].clientX;
    strtY= e.touches[0].clientY;

})

document.addEventListener('touchmove', e =>{
    movingX= e.touches[0].clientX;
    movingY= e.touches[0].clientY;
})
    
document.addEventListener('touchend', e =>{
    
    if(strtX +100 < movingX){
        righted()
    }
    else if(strtX-100 > movingX){
        lefted()
    }

    
    if(strtY +100 < movingY){
        downed()
    }
    else if(strtY-100 > movingY){
        uped()
    }
})