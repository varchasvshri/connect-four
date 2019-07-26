var rows = 6;
var columns = 7;

var player1 = prompt("Player One: Enter Your Name , you will be Blue");
var player1Color = 'rgb(0, 0, 255)';

var player2 = prompt("Player Two: Enter Your Name, you will be Red");
var player2Color = 'rgb(255, 0, 0)';

function whatcolor(row, col){
  return $('table tr').eq(row).find('td').eq(col).find('button').css('background-color');
}
// console.log(whatcolor(5, 1));
function rowavail(col) {
  for (var i = 5; i >= 0; i--) {
    if(whatcolor(i, col) === 'rgb(128, 128, 128)'){return i;}
  }return -10;
}

function changeColor(row, col, color){
  return $('table tr').eq(row).find('td').eq(col).find('button').css('background-color',color);
}

function check_4(c1,c2,c3,c4) {
  if(c1!=='rgb(128, 128, 128)' && c1==c2 && c1==c3 && c1==c4 && c1!==undefined) return true;
  return false;
}

// function undoit(row,col) {
//   return $('table tr').eq(row).find('td').eq(col).find('button').css('background-color','rgb(128, 128, 128)');
// }

function horiz(){
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns-3; j++) {
      if(check_4(whatcolor(i,j), whatcolor(i,j+1), whatcolor(i,j+2), whatcolor(i,j+3))) return true;
    }
  }
  return false;
}

function vertical(){
  for (var i = 0; i < rows-3; i++) {
    for (var j = 0; j < columns; j++) {
      if(check_4(whatcolor(i,j), whatcolor(i+1,j), whatcolor(i+2,j), whatcolor(i+3,j))) return true;
    }
  }
  return false;
}

function diagonald(){
  for (var i = 0; i <3; i++) {
    for (var j = 0; j <4 ; j++) {
      if(check_4(whatcolor(i,j), whatcolor(i+1,j+1), whatcolor(i+2,j+2), whatcolor(i+3,j+3))) return true;
    }
  }
  return false;
}

function diagonalu(){
  for (var i = 5; i >2; i--) {
    for (var j = 0; j <4 ; j++) {
      if(check_4(whatcolor(i,j), whatcolor(i-1,j+1), whatcolor(i-2,j+2), whatcolor(i-3,j+3))) return true;
    }
  }
  return false;
}

function gameover(name) {
  $('h1').text(name+" has won!").css("fontSize", "100px");
  // $('h1').text("Congratulations "+ name + " !!!").css("fontSize", "50px");
  $('h3').fadeOut('3000');
  $('h2').fadeOut('3000');
   // $('h1').toggle('3000');
   // $('table tr').fadeOut('50000');
  // return 0;
}

var currentPlayer = 1;
var currentName = player1;
var currentColor = player1Color;

// Start with Player One
$('h3').text(player1+": it is your turn, please pick a column to drop your blue chip.");

$('.board button').on('click',function() {
  var col = $(this).closest("td").index();
  var bottomAvail = rowavail(col);

  changeColor(bottomAvail,col,currentColor);
  $('.tired').on('click',function(){
    changeColor(bottomAvail,col,'rgb(128, 128, 128)');
  })

  if (horiz() || vertical() || diagonalu() || diagonald()) {
    gameover(currentName);
  }
  if(rowavail(col)!=-10){
  currentPlayer = currentPlayer * -1 ;
}
  if (currentPlayer === 1) {
    currentName = player1;
    $('h3').text(currentName+": it is your turn, please pick a column to drop your blue chip.");
    currentColor = player1Color;
  }else {
    currentName = player2
    $('h3').text(currentName+": it is your turn, please pick a column to drop your red chip.");
    currentColor = player2Color;
  }
})
