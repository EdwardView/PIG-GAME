/* Game */

var scores,roundScore,activePlayer,dice,gamePlaying,lastDice;
init();

document.querySelector('.btn-roll').addEventListener('click',function(){
    if(gamePlaying){
      //1. Random Number.
      var dice1 = Math.floor(Math.random()*6)+1;
      var dice2 = Math.floor(Math.random()*6)+1;
      //2. Display Result.
      //var diceDOM = document.querySelector('.dice');
      document.getElementById('dice-1').style.display = 'block';
      document.getElementById('dice-2').style.display = 'block';

      document.getElementById('dice-1').src = 'image/dice-' + dice1 + '.png';
      document.getElementById('dice-2').src = 'image/dice-' + dice2 + '.png';
      //3.Update the round score when dice != 1.
      // if(lastDice === 6 && dice === 6){        //Player Losses all scores
      //   scores[activePlayer] = 0;
      //   document.getElementById('score-'+activePlayer).textContent = '0';
      //   nextPlayer();
      // }else if(dice !== 1){
      //   //Add Score.
      //   roundScore += dice;
      //   document.querySelector('#current-' + activePlayer).textContent = roundScore;
      // }else{
      //   //Next Payer.
      //   nextPlayer();
      // }
      // lastDice = dice;
      if(dice1 !== 1 && dice2 !== 1){
        //Add Score.
        roundScore += (dice1+dice2);
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
      }else{
        //Next Payer.
        nextPlayer();
      }
    }
});

document.querySelector('.btn-hold').addEventListener('click',function(){
  if(gamePlaying){
    // ADD current score to the globle score.
     scores[activePlayer] += roundScore;
    //Update the UI.
     document.getElementById('score-'+activePlayer).textContent = scores[activePlayer];
     var input = document.querySelector('.final-score').value;
     if(input){
       winningScore = input;
     }else{
       winningScore = 100;
     }
    // check that which player is win.
    if(scores[activePlayer] >= winningScore){
        document.querySelector('#name-'+activePlayer).textContent='Winner';
        hideDice();
        document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
        document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
        gamePlaying = false;
    }else{
      //Next PLAYERS
      nextPlayer();
    }
  }
});

function nextPlayer(){
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore=0;
  document.getElementById('current-0').textContent='0';
  document.getElementById('current-1').textContent='0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  hideDice();
}

document.querySelector('.btn-new').addEventListener('click',init);

function init(){
  scores = [0,0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  hideDice();
  document.getElementById('score-0').textContent='0';
  document.getElementById('score-1').textContent='0';
  document.getElementById('current-0').textContent='0';
  document.getElementById('current-1').textContent='0';
  document.getElementById('name-0').textContent='Player 1';
  document.getElementById('name-1').textContent='Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}

function hideDice(){
  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';
}
// dice = Math.floor(Math.random()*6)+1;
// //console.log(dice);
// document.querySelector('#current-' + activePlayer).textContent=dice;
// //document.querySelector('#current-' + activePlayer).innerHTML = '<em>'+dice+'</em>';
// var x = document.querySelector('#score-0').textContent;
// console.log(x);
