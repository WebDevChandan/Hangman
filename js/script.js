// Initial References
const optionsContainer = document.getElementById("options-container"),
  letterContainer = document.getElementById("letter-container"),
  newGameContainer = document.getElementById("new-game-container"),
  newGameButton = document.getElementById("new-game-button"),
  userInputSection = document.getElementById("user-input-section"),
  canvas = document.getElementById("canvas"),
  resultText = document.getElementById("result-text");

// Options values for buttons

let options = {
  fruits: [
    "Apple",
    "Buleberry",
    "Mandarin",
    "Pineapple",
    "Pomegranate",
    "Watermelon",
  ],
  animals: ["Hedgehog", "Rhinoceros", "Squirrel", "Panther", "Walrus", "Zebra"],
  countries: [
    "India",
    "Hungary",
    "Kyrgyzstan",
    "Switzerland",
    "Zimbabwe",
    "Dominica",
  ],
};

// count
let winCount = 0,
  count = 0,
  chosenWord = "";

// Display opiton buttons
const displayOptions = () => {
  optionsContainer.innerHTML += `<h3>Please Select An Option </h3>`;

  let buttonCon = document.createElement("div");
  for (let value in options) {
    buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
  }
  optionsContainer.appendChild(buttonCon);
};

//Block all the buttons
const blocker = () => {
  let optionsButtons = document.querySelectorAll(".options");
  let letterButtons = document.querySelectorAll(".letters");

  //disable all options
  optionsButtons.forEach((buttons) => {
    buttons.disabled = true;
  });

  //disable all letters
  letterButtons.forEach((button) => {
    button.disabled = true;
  });
  newGameContainer.classList.remove("hide");
};

// Word Generator
const generateWord = (optionValue) => {
  let optionButtons = document.querySelectorAll(".options");
  // If optionValue matches the button innerText then highlight the button
  optionButtons.forEach((button) => {
    if (button.innerText.toLowerCase() === optionValue)
      button.classList.add("active");
    button.disabled = true;
  });

  //Initially hide letters,  clear previous Word
  letterContainer.classList.remove("hide");
  userInputSection.innerText = "";

  let optionsArray = options[optionValue];

  //choose random word;
  chosenWord = optionsArray[Math.floor(Math.random() * optionsArray.length)];
  chosenWord = chosenWord.toUpperCase();
  console.log(chosenWord);

  //replace every letter with span containing dash
  let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');

  //Displayeach element as span
  userInputSection.innerHTML = displayItem;
};

// Initial Function (Called when page loads/user presses new game)
const initializer = () => {
  winCount = 0;
  count = 0;

  //Initially erase all content and hide letters and new game button
  userInputSection.innerHTML = "";
  optionsContainer.innerHTML = "";
  letterContainer.classList.add("hide");
  newGameContainer.classList.add("hide");
  letterContainer.innerHTML = "";

  // For creating Letter buttons
  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");

    //character button click
    button.addEventListener("click", () => {
      let charArray = chosenWord.split(""),
        dashes = document.getElementsByClassName("dashes");

      //if array (charArray) contains the clicked value, replace the matched dash with letter else draw on canvas
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          //if character in array is same as clicked button
          if (char === button.innerText) {
            //replacedash with letter
            dashes[index].innerText = char;
            //increment counter;
            winCount += 1;
            // if winCount equals word length
            if (winCount === charArray.length) {
              resultText.innerHTML = `<h2 class='win-msg'>You Win!!</h2><p>The word was <span>${chosenWord}</span></p>`;
              //Block all buttons
              blocker();
            }
          }
        });
      }
      else {
        //Lose count
        count += 1;
        //for drawing Mandarin
        drawMan(count);
        //Count==6 because head, body, left arm, right arm, left leg, right leg
        if (count === 6) {
          resultText.innerHTML = `<h2 class='lose-msg'>You Lose!!</h2><p>The word was <span>${chosenWord}</span></p>`;
          blocker();
        }
      }
      //disabled clicked button
      button.disabled = true;
    });

    // Number to ASCII[A-Z]
    button.innerText = String.fromCharCode(i);
    letterContainer.appendChild(button);
  }

  displayOptions();


  // Call to canvasCreator (for clearing previous canvas and creating initial canvas)
  let { initialDrawing } = canvasCreator();
  //initialDrawing would draw the frame
  initialDrawing();
};

//canvas
const canvasCreator = () => {
  let context = canvas.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#000";
  context.lineWidth = 2;

  //For drawing lines
  const drawLine = (fromX, fromY, toX, toY) => {
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
  };

  const body = () => {
    drawLine(70, 40, 70, 80);
  };
  
  const head = () => {
    context.beginPath();
    context.arc(70, 30, 10, 0, Math.PI * 2, true);
    context.stroke();
  };


  const leftArm = () => {
    drawLine(70, 50, 50, 70);
  };
  const rightArm = () => {
    drawLine(70, 50, 90, 70);
  };
  const leftLeg = () => {
    drawLine(70, 80, 50, 110);
  };
  const rightLeg = () => {
    drawLine(70, 80, 90, 110);
  };

  //Initial frame
  const initialDrawing = () => {
    // clear canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    // bottom line
    drawLine(10, 130, 130, 130);
    //left line
    drawLine(10, 10, 10, 131);
    // top line
    drawLine(10, 10, 70, 10);
    // small top line
    drawLine(70, 10, 70, 20);
  };

  return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
};

//draw the man
const drawMan = (count) => { 
  let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
  switch (count) {
    case 1:
      head();
      break;
    case 2:
      body();
      break;
    case 3:
      leftArm();
      break;
    case 4:
      rightArm();
      break;
    case 5:
      leftLeg();
      break;
    case 6:
      rightLeg();
      break;
    default:
      break;
  }
}


// New Game
newGameButton.addEventListener("click", initializer);
window.onload = initializer;
