function pageLoaded() {
  //START GAME TILE
  const startBtn = document.querySelector("#startButton");
  const startTile = document.querySelector("#startgameTile");
  const map = document.querySelector("#map");
  const obstackle = document.querySelector("#obstackle");
  const obstackle2 = document.querySelector("#obstackle2");
  const obstackle3 = document.querySelector("#obstackle3");
  const level = document.querySelector("#level");

  const obstackleArray = [obstackle, obstackle2, obstackle3];

  obstackle.classList.add("displayNone");
  obstackle2.classList.add("displayNone");
  obstackle3.classList.add("displayNone");

  map.classList.add("displayNone");

  startBtn.addEventListener("click", startGame);
  startBtn.addEventListener("click", hideStartTile);
  startBtn.addEventListener("click", obstackleRandomizerTimer);
  startBtn.addEventListener("click", timeOutTimer);

  function hideStartTile() {
    startTile.classList.add("displayNone");
    map.classList.add("mapAnimation");
    map.classList.remove("displayNone");
  }

  function timeOutTimer() {
    setTimeout(function () {
      map.style.backgroundImage = "url('/img/moonn.jpg')";
      level.innerHTML = "Level 2";
      obstackle.style.backgroundImage = "url('/img/patakyAttila.png')";
      obstackle3.style.backgroundImage = "url('/img/1979_Alien_Design.png')";
      obstackle2.style.backgroundImage = "url('/img/predator.png')";
    }, 12000);
  }
  // SEND OBSTACKLES RANDOMLY AND continuously
  function obstackleRandomizerTimer() {
    const intervalTimer = setInterval(myTimer, 2000);
    function myTimer() {
      let changingObstackle = obstackleArray[Math.floor(Math.random() * 3)];
      changingObstackle.classList.remove("displayNone");
      changingObstackle.classList.add("obstackleAnimation");
      setTimeout(function () {
        changingObstackle.classList.add("displayNone");
        changingObstackle.classList.remove("obstackleAnimation");
      }, 1999);
    }
  }
}
window.addEventListener("load", pageLoaded);

//STARTGAME FUNCTION
function startGame() {
  document.addEventListener("keydown", jumpFunc);
  //JUMP
  function jumpFunc() {
    const char = document.querySelector("#char");
    if (char.classList.contains("jump")) {
    } else {
      char.classList.add("jump");
      char.classList.add("charbg");

      setTimeout(function () {
        char.classList.remove("jump");
        char.classList.remove("charbg");
      }, 1000);
    }
  }
  let score = 0;

  //CHECK POSITION OF ELEMENTS continuously
  const intervalTimer = setInterval(myTimer, 10);

  function myTimer() {
    const char = document.querySelector("#char");
    const obstackle = document.querySelector("#obstackle");
    const obstackle2 = document.querySelector("#obstackle2");
    const obstackle3 = document.querySelector("#obstackle3");

    const endgameTile = document.querySelector("#endgameTile");
    const map = document.querySelector("#map");
    let charPos = parseInt(char.offsetTop);
    let obstacklePos = parseInt(obstackle.offsetLeft);
    let obstacklePos2 = parseInt(obstackle2.offsetLeft);
    let obstacklePos3 = parseInt(obstackle3.offsetLeft);

    score += 10;
    const scoreDiv = document.querySelector("#score");
    scoreDiv.innerHTML = `<div>Incoming NASA cash: ${score}$</div>`;

    //HIGHSCORE TO LOCAL SAVE
    let highscore = localStorage.getItem("highscore");

    if (highscore !== null) {
      if (score > highscore) {
        localStorage.setItem("highscore", score);
      }
    } else {
      localStorage.setItem("highscore", score);
    }

    document.querySelector(
      "#highscore"
    ).innerHTML = `<div>Highest earning:</div> ${highscore}$`;

    //Collision DETECTION
    if (
      (obstacklePos < 225 && obstacklePos > 50 && charPos > 270) ||
      (obstacklePos2 < 225 && obstacklePos2 > 50 && charPos > 240) ||
      (obstacklePos3 < 225 && obstacklePos3 > 50 && charPos > 240)
    ) {
      endgameTile.classList.remove("displayNone");

      obstackle.classList.remove("obstackleAnimation");
      obstackle.classList.add("obstackleAnimationQuit");

      obstackle2.classList.remove("obstackleAnimation");
      obstackle2.classList.add("obstackleAnimationQuit");

      obstackle3.classList.remove("obstackleAnimation");
      obstackle3.classList.add("obstackleAnimationQuit");

      map.classList.remove("mapAnimation");
      char.classList.remove("charbg");
      char.classList.add("charbg2");
      function stopInter() {
        clearInterval(intervalTimer);
      }
      stopInter();
      //END GAME ONLY AFTER COLLISION
      endgameTile.insertAdjacentHTML(
        "afterbegin",
        `<div>The Journey is over</div>
        <div>Elon is deep fried</div>
        <img src="/img/rotateEarth.gif" width = "200" />
        <div><img src="/img/arrowUp.png" width = "40" /></div>
        <div><button id="retry">Go back to EARTH</button> </div>
        <div>Your sweet NASA cash: ${score}$ </div>`
      );

      const retryButton = document.querySelector("#retry");
      retryButton.addEventListener("click", reload);
      function reload() {
        location.reload();
      }
    }
  }
}
