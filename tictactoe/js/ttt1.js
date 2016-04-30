function startGame(){
  document.turn = "X";

  messageBox(document.turn + " goes next");
}

function messageBox(msg){
  document.getElementById("messages").innerHTML = msg;
}

function nextMove(square){
  if(square.innerHTML === "")
  {square.innerHTML = document.turn;
  changeTurn();
  } else {
    messageBox("Square taken"); 
  }
}

function changeTurn(){
  if (document.turn === "X"){
  document.turn = "O"; 
  }
  else {
  document.turn = "X";

  }
   messageBox("It's " + document.turn + "'s turn");
}

function checkWinner (a,b,c,move) {
  var result = false;
  if (getBox(a)=== move && getBox(b)=== move && getBox(c)=== move){
    result = true;
  }
  return result;
}

function getBox(number){
  return document.getElementById("s" + number).innerHTML;
  document.getElementById("b" + number)innerHTML:
}
