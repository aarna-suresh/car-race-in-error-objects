/*
  ● Game object  should be able to hold the state of the game.
    It should be able to display form when the game state is 0(WAIT) 
    or the game when the game state is 1(PLAY) or leaderboard when the game state is 2(END).
  ● GAMESTATES: 
    0 WAIT
    1 START
    2 END
*/

class Game {
  /*   
    writing code to create objects even though the blueprint/CONSTRUCTOR isn't
    defined yet. This is called writing code using abstraction 
  */
  constructor() { }

  //function definition to READ/RETRIEVE/GET existing value of gameState from database
  getState() {
    var gameStateRef = databaseObj.ref("GAMESTATE");
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    });
  }

  /*
    function definition to change existing value of gameState to a 
    new one based on the value of paramter passed in the database
  */
  updateState(stateInput) {
    databaseObj.ref("/").update({
      GAMESTATE: stateInput,
    });
  }

  /*
    function defintion to start the GAME i.e. gameState will remain in WAIT(0) state 
    displaying the FORM until all 4 players are registered
  */
  async start() {
    if (gameState === 0) {
      //as long as gameState is on WAIT
      playerObj = new Player(); //generate a new playerObj

      var playerCountRef = await databaseObj.ref("playerCount").once("value");
      if (playerCountRef.exists()) {
        playerCount = playerCountRef.val();
        playerObj.getCount(); //get the number of players registered
      }

      formObj = new Form(); //create new formObj for registration
      formObj.display(); //display the generated formObj
    }

    car1 = createSprite(100, 200);
    car1.addImage("Car1Img", car1Img);
    car2 = createSprite(300, 200);
    car2.addImage("car2Img", car2Img);
    car3 = createSprite(500, 200);
    car3.addImage("car3Img", car3Img);
    car4 = createSprite(700, 200);
    car4.addImage("car4Img", car4Img);
    cars = [car1, car2, car3, car4];
  }

  /*
    function defintion to activate the gameObj to START 1 mode and 
    aligned all players to starting positions at the start line
  */
  play() {
    formObj.hide();

    /*
        static function call to retrieve existing playerObj records: name and distance 
        value for all registered players according to the index in the database  
    */
    Player.getPlayerInfo();

    console.log(allPlayers);

  }
}
