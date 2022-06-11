let point;
let liv;
let time;
let dronningContainer = document.querySelector("#dronning_container");
let dronningSprite = document.querySelector("#dronning_sprite");
let babyContainer = document.querySelector("#baby_container");
let babySprite = document.querySelector("#baby_sprite");
let paveContainer = document.querySelector("#pave_container");
let paveSprite = document.querySelector("#pave_sprite");
let henryContainer = document.querySelector("#henry_container");
let henrySprite = document.querySelector("#henry_sprite");
let timeContainer = document.querySelector("#time_container");
let timeSprite = document.querySelector("#time_sprite");
let startGameMenu = document.querySelector("#start");
let gameScreen = document.querySelector("#game");
let loseMenu = document.querySelector("#game_over");
let winMenu = document.querySelector("#level_complete");

window.addEventListener("load", sidenVises);

function sidenVises() {
  windowResize();
  gameScreen.style.display = "none";
  loseMenu.style.display = "none";
  winMenu.style.display = "none";
  console.log("sidenVises");
  document
    .querySelector("#start_knap")
    .addEventListener("mousedown", startGame);

  // Tilføj eventlistener til retry knap
  document
    .querySelector("#genstart_knap")
    .addEventListener("mousedown", startGame);
  // Tilføj eventlistener til retry knap
  document
    .querySelector("#genstart_knap2")
    .addEventListener("mousedown", startGame);
}

function startGame() {
  loseMenu.style.display = "none";
  winMenu.style.display = "none";
  startGameMenu.style.display = "none";
  gameScreen.style.display = "";
  point = 0;
  liv = 3;

  document.querySelector("#score_board").innerHTML = point;
  document.querySelector("#liv1").style.filter = "grayscale(0%)";
  document.querySelector("#liv2").style.filter = "grayscale(0%)";
  document.querySelector("#liv3").style.filter = "grayscale(0%)";

  //spawnElement (Container og sprite);
  spawnElement(babyContainer, babySprite);
  spawnElement(dronningContainer, dronningSprite);
  spawnElement(paveContainer, paveSprite);

  dronningContainer.addEventListener("mousedown", clickQueen);
  babyContainer.addEventListener("mousedown", clickBaby);
  paveContainer.addEventListener("mousedown", clickPave);
  timeSprite.addEventListener("animationend", endGame);
}

function clickQueen() {
  console.log("CLICKQUEEN");
  point = point + 2;
  clickElement(dronningContainer, dronningSprite);

  // Points for dronning
  document.querySelector("#score_board").innerHTML = point;

  // Lyd - tilfældig af 1 el. 2
  randomSound = randomIntFromInterval(0, 1);
  if (randomSound) {
    playSound(document.querySelector("#sound_dronning1"), 0.5);
  } else {
    playSound(document.querySelector("#sound_dronning2"), 0.5);
  }
  // START - ERSTAT DRONNING MED DØD DRONNING
  dronningSprite.style.backgroundImage = "url(spil_svg/dronning-dod.svg)";
  dronningSprite.style.backgroundSize = "contain";
  dronningContainer.style.width = "18%";
  // slice - skær sidste bogstav af tekststrengen "xx%" af
  // parseInt() - konverter udfaldet af slice() til et tal: xx
  // + 10, læg 10 til udfaldet af parseInt()
  topVal = parseInt(dronningContainer.style.top.slice(0, -1));
  topVal = topVal + 10;
  dronningContainer.style.top = topVal + "%";
  // SLUT ERSTAT DRONNING MED DØD DRONNING
}

function clickPave() {
  console.log("CLICKPAVE");
  point++;
  document.querySelector("#score_board").innerHTML = point;
  clickElement(paveContainer, paveSprite);

  // Lyd ved clickPave - tilfældig af 1 el. 2
  randomSound = randomIntFromInterval(0, 1);
  if (randomSound) {
    playSound(document.querySelector("#sound_pave1"), 0.5);
  } else {
    playSound(document.querySelector("#sound_pave_jesus"), 0.5);
  }

  // START - ERSTAT PAVE MED DØD PAVE
  paveSprite.style.backgroundImage = "url(spil_svg/pave-dod.svg)";
  paveSprite.style.backgroundSize = "contain";
  paveContainer.style.width = "20%";
  // slice - skær sidste bogstav af tekststrengen "xx%" af
  // parseInt() - konverter udfaldet af slice() til et tal: xx
  // + 10, læg 10 til udfaldet af parseInt()
  topVal = parseInt(paveContainer.style.top.slice(0, -1));
  topVal = topVal + 10;
  paveContainer.style.top = topVal + "%";
  // SLUT ERSTAT PAVE MED DØD PAVE
}

function clickBaby() {
  console.log("CLICKBABY");
  clickElement(babyContainer, babySprite);
  document.querySelector("#liv" + liv).style.filter = "grayscale(100%)";

  // START - ERSTAT BABY MED DØD
  babySprite.style.backgroundImage = "url(spil_svg/baby-dod.svg)";
  babySprite.style.backgroundSize = "contain";
  babyContainer.style.width = "20%";
  // slice - skær sidste bogstav af tekststrengen "xx%" af
  // parseInt() - konverter udfaldet af slice() til et tal: xx
  // + 10, læg 10 til udfaldet af parseInt()
  topVal = parseInt(babyContainer.style.top.slice(0, -1));
  topVal = topVal + 10;
  babyContainer.style.top = topVal + "%";
  // SLUT ERSTAT BABY MED DØD

  // Game over ved tre klik på baby
  liv--;
  if (liv == 0) {
    console.log("No more lives!");
    loseMenu.style.display = "";
    gameScreen.style.display = "none";
    document.querySelector("#loseText").innerHTML =
      "What have you done?! You killed three potential male heirs to King Henry! <br>Cheer up - at least you got " +
      point +
      " points.";
    playSound(document.querySelector("#sound_taber"), 0.5);
  }

  // Lyd der afspilles ved clickBaby - tilfældig af 1 el. 2
  randomSound = randomIntFromInterval(0, 1);
  if (liv > 0) {
    if (randomSound) {
      playSound(document.querySelector("#sound_baby1"), 0.75);
    } else {
      playSound(document.querySelector("#sound_baby2"), 0.75);
    }
  }
}

function endGame() {
  gameScreen.style.display = "none";
  // Vinder ved 6 points eller flere. Taber ved under 6 points
  if (point >= 6) {
    console.log("You win!");
    winMenu.style.display = "";
    playSound(document.querySelector("#sound_vinder"), 0.5);
    document.querySelector("#winText").innerHTML =
      "Congratulations! <br> You gave King Henry VIII a male heir and acquired " +
      point +
      " points!";
  } else {
    console.log("You lose!");
    loseMenu.style.display = "";
    playSound(document.querySelector("#sound_taber"), 0.5);
    document.querySelector("#loseText").innerHTML =
      "Unfortunately you failed to secure a male heir for the King. <br>Cheer up - at least you got " +
      point +
      " points.";
  }
}

function clickElement(container, sprite) {
  //frys (pause), op_ned-animationen
  container.classList.add("frys");

  //Start forsvind-animationer på sprite element (firstElementChild er sprite elementet)
  sprite.classList.add("forsvind");
  console.log(container + " " + sprite);

  container.addEventListener("animationend", () => {
    spawnElement(container, sprite);
  });
  // elementer kan kun klikkes på 1 gang pr spawn
  switch (container) {
    case paveContainer:
      container.removeEventListener("mousedown", clickPave);
      break;
    case dronningContainer:
      container.removeEventListener("mousedown", clickQueen);
      break;
    case babyContainer:
      container.removeEventListener("mousedown", clickBaby);
      break;
  }
}

function spawnElement(container, sprite) {
  // reset hvis eksisterer
  container.classList = "";
  sprite.classList = "";
  container.offsetLeft;

  // generer tilfældige værdier
  randTop = randomIntFromInterval(35, 45) + "%";
  delayTimer = randomIntFromInterval(0, 1) + "s";
  speed = randomIntFromInterval(2, 5) + "s";
  leftToRight = randomIntFromInterval(0, 1);

  if (container == paveContainer) {
    randTop = randomIntFromInterval(7, 20) + "%";
    paveSprite.style.backgroundImage = "url(spil_svg/pave.svg)";
    paveContainer.style.width = "11%";
    sprite = paveSprite;
    container.addEventListener("mousedown", clickPave);
  }

  if (container == babyContainer) {
    babySprite.style.backgroundImage = "url(spil_svg/baby.svg)";
    babyContainer.style.width = "9%";
    sprite = babySprite;
    container.addEventListener("mousedown", clickBaby);
  }

  if (container == dronningContainer) {
    dronningSprite.style.backgroundImage = "url(spil_svg/dronning.svg)";
    dronningContainer.style.width = "14%";
    sprite = dronningSprite;
    container.addEventListener("mousedown", clickQueen);
  }

  // tillæg style-elementer
  container.style.position = "absolute";
  container.style.top = randTop;
  container.style.animationDelay = delayTimer;
  container.style.animationDuration = speed;

  // evaluerer til true hvis leftToRight = 1
  if (leftToRight) {
    container.classList.add("flyv2");
    container.style.left = "-20%";
  } else {
    container.classList.add("flyv");
    container.style.left = "100%";
  }
}

function playSound(soundElement, time) {
  soundElement.currentTime = time;
  soundElement.volume = 0.5;
  soundElement.play();
}

// Kode lånt fra https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Kode lånt fra Mikkel
function windowResize() {
  console.log("windowResize");
  let widthScreen = document.querySelector("#screen").clientWidth;
  let myFontInProcent1 = 4;
  let myFont1 = (widthScreen / 100) * myFontInProcent1;
  document.querySelector("#score_board").style.fontSize = myFont1 + "px";
  let myFontInProcent2 = 2;
  let myFont2 = (widthScreen / 100) * myFontInProcent2;
  document.querySelector("#level_complete").style.fontSize = myFont2 + "px";
  document.querySelector("#game_over").style.fontSize = myFont2 + "px";
  document.querySelector("#start").style.fontSize = myFont2 + "px";
}
