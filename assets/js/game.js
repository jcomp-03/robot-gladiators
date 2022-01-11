// delete this console message before finishing
console.log("logging this message to the console");

var fightOrSkip = function() {
  // ask player if they'd like to fight or skip using fightOrSkip function
  var promptFight = window.prompt('fightOrSkip() msg: Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
  promptFight = promptFight.toLowerCase();
  // if the `promptFight` is NOT a valid value, then execute the following statements.
  if (!promptFight) {
    window.alert("fightOrSkip() msg: You need to provide a valid answer! Please try again.");
    return fightOrSkip();
  }
  // if player picks "skip" confirm and then stop the loop
  if (promptFight === "skip") {
    // confirm player wants to skip
    var confirmSkip = window.confirm("fightOrSkip() msg: Are you sure you'd like to quit?");
    // if yes (true), leave fight
    if (confirmSkip) {
      window.alert("fightOrSkip() msg: " + playerInfo.name + " has decided to skip this fight. Goodbye!");
      // subtract money from playerMoney for skipping, but don't let them go into the negative
      playerInfo.money = Math.max(0, playerInfo.money - 10);
      // return true if player wants to leave
      return true;
    }
  }
  return false;
}

// function to fight
var fight = function(enemy) {
  // keep track of who goes first
  var isPlayerTurn = true;
  if (Math.random() > 0.5) {
    isPlayerTurn = false;
  }
  // repeat and execute as long as the enemy-robot and player-robot is alive
  while (playerInfo.health > 0 && enemy.health > 0) {
    if (isPlayerTurn) {
      if (fightOrSkip()) {
        // if fightOrSkip() returns true, leave fight by breaking loop. You also leave the fight() function.
        break;
      };
      // generate random damage value based on player's attack power
      var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
      // remove enemy's health by subtracting the amount set in the playerAttack variable
      enemy.health = Math.max(0, enemy.health - damage);
      console.log('fight() msg: ' + playerInfo.name + ' attacked ' + enemy.name + '. ' + enemy.name + ' now has ' + enemy.health + ' health remaining.');
      // check enemy's health
      if (enemy.health <= 0) {
        window.alert('fight() msg: ' + enemy.name + ' has died!');
        // award player money for winning
        playerInfo.money = playerInfo.money + 20;
        console.log('fight() msg: ' + playerInfo.name + '\'s money is increased by 20 and is now ' + playerInfo.money);
        // leave while() loop since enemy is dead
        break;
      } else {
        window.alert('fight() msg: ' + enemy.name + ' still has ' + enemy.health + ' health left.');
      }
    } else {
      // generate random damage value based on enemy's attack power
      var damage = randomNumber(enemy.attack - 3, enemy.attack);
      // remove players's health by subtracting the amount set in the enemyAttack variable
      playerInfo.health = Math.max(0, playerInfo.health - damage);
      console.log('fight() msg: ' + enemy.name + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.health + ' health remaining.');
      // check player's health
      if (playerInfo.health <= 0) {
        window.alert(playerInfo.name + ' has died!');
        // leave while() loop if player is dead
        break;
      } else {
        window.alert('fight() msg: ' + playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
      }      
    }
    isPlayerTurn = !isPlayerTurn;
  } //end while loop
};

// function to start a new game
var startGame = function () {
  // reset player stats
  playerInfo.reset();
  for (let i = 0; i < enemyInfo.length; i++) {
    if (playerInfo.health > 0) {
      // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
      window.alert("startGame() msg: Welcome to Robot Gladiators! Round " + (i + 1));
      // pick new enemy to fight based on the index of the enemyNames array
      var pickedEnemyObj = enemyInfo[i];
      // reset enemyHealth before starting new fight
      pickedEnemyObj.health = randomNumber(15,20);
      // use debugger to pause script from running and check what's going on at that moment in the code
      // debugger;
      // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
      fight(pickedEnemyObj);
      // if player is still alive and we're not at the last enemy in the array
      if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
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
  
  // after the loop ends, player is either out of health or enemies to fight, so run the endGame() function
  endGame();
};

// function to end the entire game
var endGame = function() {
  // if player is still alive, player wins!
  debugger;
  if (playerInfo.health > 0) {
    window.alert("endGame() function msg: Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
  } 
  else {
    window.alert("endGame() msg: You've lost your robot in battle.");
  }

  // high score logic here
  // check if there's a saved score in local storage
  // if there isn't, the current score is the new high score!
  // if there is a saved score, compare the current score to
  // saved score to determine if there's a new high score
  
  var savedScore = localStorage.getItem("storedLocalScore");
  
  if (!savedScore) {
    localStorage.setItem("storedLocalScore", playerInfo.money);
    window.alert("No saved local score. Setting " + playerInfo.money + " as the new high score."); 
  } else if (playerInfo.money > parseInt(savedScore)) {
    localStorage.setItem("storedLocalScore", playerInfo.money);
    window.alert("Player just reached a new high score in local storage!");
  } else {
    window.alert("Player did not beat saved high score");
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
};

// function to shop for things i.e. more health, attack power, etc.
var shop = function() {
  // ask player what they'd like to do
  var shopOptionPrompt = window.prompt(
    "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE."
  );
  shopOptionPrompt = parseInt(shopOptionPrompt);
  // debugger;
  // use switch to carry out action
  switch (shopOptionPrompt) {
    case 1:
      playerInfo.refillHealth();
      break;
    case 2:
      playerInfo.upgradeAttack();
      break;
    case 3: // new case
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

var getPlayerName = function () {
  var name = "";
  // add loop her with prompt and condition
  while (name === "" || name === null) {
    name = window.prompt("getPlayerName(): What is your robot's name?");
  }
  console.log("getPlayerName(): Your robot's name is " + name);
  return name;
};

var playerInfo = {
  name: getPlayerName(),
  health: 50,
  attack: 10,
  money: 10,
  reset: function() {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  }, // comma!
  refillHealth: function() {
    if (this.money >= 7) {
      window.alert("Refilling player's health by 20 for 7 dollars.");
      this.health += 20;
      this.money -= 7;
    } 
    else {
      window.alert("You don't have enough money!");
    }
  }, // comma!
  upgradeAttack: function() {
    if (this.money >= 7) {
      window.alert("Upgrading player's attack by 6 for 7 dollars.");
      this.attack += 6;
      this.money -= 7;
    } 
    else {
      window.alert("You don't have enough money!");
    }
  }
};

var enemyInfo = [
  {
    name: "Roberto",
    attack: randomNumber(10,14)
  },
  {
    name: "Amy Android",
    attack: randomNumber(10,14)
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10,14)
  }
];

// start the game when the page loads
startGame();