var playerName = window.prompt("What is your robot's name?");

// delete this console message before finishing
console.log("logging this message to the console");

var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;


// function fight
var fight = function(enemyName) {
    while (playerHealth > 0 && enemyHealth > 0) {

      // ask player if they'd like to fight or run
      var promptFight = window.prompt('fight() msg: Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
  
      // if player picks "skip" confirm and then stop the loop
      if (promptFight === "skip" || promptFight === "SKIP") {
        // confirm player wants to skip
        var confirmSkip = window.confirm("fight() msg: Are you sure you'd like to quit?");
  
        // if yes (true), leave fight
        if (confirmSkip) {
          window.alert("fight() msg: " + playerName + ' has decided to skip this fight. Goodbye!');
          // subtract money from playerMoney for skipping
          playerMoney = Math.max(0, playerMoney - 10);
          console.log("playerMoney is now " + playerMoney)
          break;
        }
      }
        
      // generate random damage value based on player's attack power
      var damage = randomNumber(playerAttack - 3, playerAttack);
      // remove enemy's health by subtracting the amount set in the playerAttack variable
      enemyHealth = Math.max(0, enemyHealth - damage);
      console.log('fight() msg: ' + playerName + ' attacked ' + enemyName + '. ' + enemyName + ' now has ' + enemyHealth + ' health remaining.');
  
      // check enemy's health
      if (enemyHealth <= 0) {
        window.alert('fight() msg: ' + enemyName + ' has died!');
  
        // award player money for winning
        playerMoney = playerMoney + 20;
        console.log('fight() msg: ' + playerName + '\'s money increased by 20 and is now ' + playerMoney);
  
        // leave while() loop since enemy is dead
        break;
      } else {
        window.alert('fight() msg: ' + enemyName + ' still has ' + enemyHealth + ' health left.');
      }
  
      //generate random damage value based on player's attack power
      var damage = randomNumber(enemyAttack - 3, enemyAttack);
      // remove players's health by subtracting the amount set in the enemyAttack variable
      playerHealth = Math.max(0, playerHealth - damage);
      console.log('fight() msg: ' + enemyName + ' attacked ' + playerName + '. ' + playerName + ' now has ' + playerHealth + ' health remaining.');
  
      // check player's health
      if (playerHealth <= 0) {
        window.alert(playerName + ' has died!');
        // leave while() loop if player is dead
        break;
      } else {
        window.alert('fight() msg: ' + playerName + ' still has ' + playerHealth + ' health left.');
      }
    }
};


// function to start a new game
var startGame = function () {

  // start debugger here?
  debugger;

  // reset player stats
  playerHealth = 100;
  playerAttack = 10;
  playerMoney = 10;

  for (let i = 0; i < enemyNames.length; i++) {
      if (playerHealth > 0) {
          // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
          window.alert("startGame() msg: Welcome to Robot Gladiators! Round " + (i + 1));
      
          // pick new enemy to fight based on the index of the enemyNames array
          var pickedEnemyName = enemyNames[i];
      
          // reset enemyHealth before starting new fight
          enemyHealth = randomNumber(40,60);
      
          // use debugger to pause script from running and check what's going on at that moment in the code
          // debugger;
      
          // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
          fight(pickedEnemyName);

          // if player is still alive and we're not at the last enemy in the array
          if (playerHealth > 0 && i < enemyNames.length - 1) {
            // ask if player wants to use the store before next round
            var storeConfirm = window.confirm("startGame() msg: The fight is over, visit the store before the next round?");
          
            // if yes, take them to the store() function
            if (storeConfirm) {
              shop();
            }
          }
      } else {
          window.alert("startGame() msg: You have lost your robot in battle! Game Over!");
          break;
      }
  }

  // after the loop ends, player is either out of health or enemies to fight, so run the endGame function
  endGame();

}


// function to end the entire game
var endGame = function() {
  // if player is still alive, player wins!
  if (playerHealth > 0) {
    window.alert("endGame() function msg: Great job, you've survived the game! You now have a score of " + playerMoney + ".");
  } 
  else {
    window.alert("endGame() msg: You've lost your robot in battle.");
  }

  // ask player if they'd like to play again
  var playAgainConfirm = window.confirm("endGame() msg: Would you like to play again?");

  if (playAgainConfirm) {
    // restart the game
    startGame();
  } 
  else {
    window.alert("endGame() msg: Thank you for playing Robot Gladiators! Come back soon!");
  }
}


// function to shop for things i.e. more health, attack power, etc.
var shop = function() {

    // ask player what they'd like to do
    var shopOptionPrompt = window.prompt(
      "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );

    // use switch to carry out action
    switch (shopOptionPrompt) {
      case "REFILL": // new case
      case "refill":
        if (playerMoney >= 7) {
          window.alert("Refilling player's health by 20 for 7 dollars.");
    
          playerHealth = playerHealth + 20;
          playerMoney = playerMoney - 7;
        }
        else {
          window.alert("You don't have enough money!");
        }
    
        break;
      case "UPGRADE": // new case
      case "upgrade":
        if (playerMoney >= 7) {
          window.alert("Upgrading player's attack by 6 for 7 dollars.");
    
          playerAttack = playerAttack + 6;
          playerMoney = playerMoney - 7;
        }
        else {
          window.alert("You don't have enough money!");
        }
    
        break;
      case "LEAVE": // new case
      case "leave":
        window.alert("Leaving the store.");
        break;
      default:
        window.alert("You did not pick a valid option. Try again.");
        shop();
        break;
    }
}

// function to generate a random numeric value
var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);

  return value;
};

// start the game when the page loads
startGame();