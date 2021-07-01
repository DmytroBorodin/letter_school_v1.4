let pages = [...document.querySelectorAll(".wrapper")];
let appBtns = [...document.querySelectorAll(".app__btn")];
let appBtnsWraps = [...document.querySelectorAll(".button__wrapper")];
let backBtns = [...document.querySelectorAll(".back__btn")];
let progressBars = [...document.querySelectorAll(".progress__bar")];
let barProgress = 100 / progressBars.length;
let wrap = document.querySelector(".wrap");
let colorizedItems = [...document.querySelectorAll(".colorized")];
let currentPageNumber = null;
let body = document.querySelector("body");

window.addEventListener("resize", () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});

appBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    let btnIndex = appBtns.indexOf(btn);
    currentPageNumber = btnIndex + 1;
    if (!appBtnsWraps[btnIndex].classList.contains("disabled")) {
      btnIndex === appBtns.length - 1
        ? false
        : pages.forEach((page) => {
            page.classList.add("disabled");
            pages[btnIndex + 1].classList.remove("disabled");
            if (pages[btnIndex + 1].getAttribute("id") === "page_ten") {
              body.classList.add("darkmode");
            } else if (body.classList.contains("darkmode")) {
              body.classList.remove("darkmode");
            }
          });
    } else {
      return;
    }
  });
  btn.addEventListener("mousedown", (event) => {
    event.path[0].classList.add("clicked");
  });
  btn.addEventListener("mouseup", (event) => {
    event.path[0].classList.remove("clicked");
  });
});

backBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    let btnIndex = backBtns.indexOf(btn);
    pages.forEach((page) => {
      page.classList.add("disabled");
      pages[btnIndex].classList.remove("disabled");
    });
  });
});

progressBars.forEach((bar) => {
  let index = progressBars.indexOf(bar) + 1;
  let barWidth = barProgress * index;
  bar.style.width = `${barWidth}%`;
});

let emailInput = document.getElementById("email__input");
let childNameInput = document.getElementById("child__name__input");
let childNameBlocks = [...document.querySelectorAll(".child__name")];
let childNameVal = null;
let firstLetter = null;

let inputs = [childNameInput];

childNameInput.addEventListener("focusout", (e) => {
  childNameVal = e.target.value;
  firstLetter = childNameVal[0].toUpperCase();
  childNameBlocks.forEach((block) => {
    block.innerText = e.target.value;
  });
});

inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    console.log(currentPageNumber);
    e.target.value === "" ? false : appBtnsWraps[currentPageNumber].classList.remove("disabled");
  });
});

// third page settings

let ageBtns = [...document.querySelectorAll(".age__btn")];
ageBtns.forEach((btn) => {
  btn.addEventListener("mousedown", () => {});
  btn.addEventListener("click", () => {
    ageBtns.forEach((btn) => {
      btn.classList.remove("selected");
      btn.classList.remove("active");
    });
    btn.classList.add("selected");
    btn.classList.add("active");
    appBtnsWraps[currentPageNumber].classList.remove("disabled");
  });
});

// fourth page settings
const colorBtns = [...document.querySelectorAll(".color__btn")];
const colorizedElms = [...document.querySelectorAll(".colorized")];
let currentColor = "primary";

colorBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    let btnColor = btn.getAttribute("data-color");
    colorBtns.forEach((cBtn) => {
      cBtn.style.opacity = "0.2";
    });
    btn.style.opacity = "1";
    if (btnColor === currentColor) {
      return;
    } else {
      colorizedElms.forEach((elem) => {
        elem.classList.remove(currentColor);
        elem.classList.add(btnColor);
      });
      currentColor = btnColor;
    }
  });
});

// fifth page settings

let inteterestsWraps = [...document.querySelectorAll(".interest__wrapper")];
const pageFive = document.getElementById("page_five");

inteterestsWraps.forEach((wrapper) => {
  wrapper.addEventListener("click", () => {
    wrapper.classList.toggle("selected");
    if (wrapper.classList.contains("selected")) {
      pageFive.classList.remove("btn__disabled");
    } else {
      inteterestsWraps.find((item) => item.classList.contains("selected"))
        ? pageFive.classList.remove("btn__disabled")
        : pageFive.classList.add("btn__disabled");
    }
  });
});

// sixthth page settings

const pageSix = document.getElementById("page_six");

let qaBlocks = [...document.querySelectorAll(".question")];

let answersArr = [];

function createAnswerObj(index, answer) {
  let answerObj = {
    index,
    answer,
  };
  answersArr.push(answerObj);
}

qaBlocks.forEach((block) => {
  let btns = [...block.querySelectorAll(".answer__btn")];
  let index = null;
  block.addEventListener("mouseover", () => {
    qaBlocks.forEach((block) => {
      block.classList.remove("selected");
    });
    block.classList.add("selected");
    block.style.height = "auto";
    block.style.opacity = "100%";
  });

  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      btns.forEach((btn) => btn.classList.remove("selected"));
      btn.classList.add("selected");
      let answer = btn.innerText;
      createAnswerObj(index, answer);
      block.classList.remove("selected");
      block.style.height = "auto";
      block.style.opacity = "100%";

      if (index + 1 < qaBlocks.length) {
        qaBlocks[index + 1].classList.add("selected");
      }
      if (answersArr.length === qaBlocks.length) {
        appBtnsWraps[currentPageNumber].classList.remove("disabled");
        pageSix.classList.remove("btn__disabled");
      }
    });
  });

  block.addEventListener("mouseover", () => {
    index = qaBlocks.indexOf(block);
    qaBlocks.forEach((block) => block.classList.remove("active"));
    block.classList.add("active");
  });
  block.addEventListener("mouseout", () => {
    block.classList.remove("active");
  });
});

// page seven settings

let circleProgress = document.querySelector(".circle__animation__c");
let circleBg = document.querySelector(".bg__circle");
let progressCounter = document.querySelector(".percentages");
let circleRadius = null;
let circumference = null;
let animatedText = document.getElementById("animated__text");

function circleSizeCounter(sizes) {
  changeCircleSize(circleProgress, ...sizes);
  changeCircleSize(circleBg, ...sizes);
  circleRadius = circleProgress.r.baseVal.value;
  circumference = circleRadius * 2 * Math.PI;
  circleProgress.style.strokeDasharray = `${circumference} ${circumference}`;
  circleProgress.style.strokeDashoffset = circumference;
}

function windowWidthWatcher() {
  if (window.innerWidth < 525) {
    circleSizeCounter([100, 100, 85, 15]);
  } else {
    circleSizeCounter([150, 150, 130, 20]);
  }
}
windowWidthWatcher();

function setProgress(percents) {
  let offset = circumference - (percents / 100) * circumference;
  circleProgress.style.strokeDashoffset = offset;
}

let percents = 0;

window.addEventListener("resize", () => {
  windowWidthWatcher();
});

function changeCircleSize(circle, cx, cy, r, sw) {
  circle.setAttribute("cx", cx);
  circle.setAttribute("cy", cy);
  circle.setAttribute("r", r);
  circle.setAttribute("stroke-width", sw);
}

appBtns[5].addEventListener("click", () => {
  let run = setInterval(runAnimation, 80);

  function runAnimation() {
    percents = percents + 1;

    if (percents === 33) {
      animatedText.innerText = "Combining learning stage...";
    } else if (percents == 66) {
      animatedText.innerText = "Working our magic...";
    } else if (percents == 101) {
      clearInterval(run);
      pages[6].classList.add("disabled");
      pages[7].classList.remove("disabled");
    } else {
      setProgress(percents);
      progressCounter.innerText = percents + "%";
    }
  }
});

// page nine settings

let planBlocks = [...document.querySelectorAll(".plan__wrapper")];

planBlocks.forEach((block) => {
  block.addEventListener("click", () => {
    planBlocks.forEach((block) => {
      block.classList.remove("active");
    });
    block.classList.add("active");
  });
});

// page ten settings

let startLetter = document.querySelector(".child__name__start__letter");
appBtns[appBtns.length - 2].addEventListener("click", () => {
  startLetter.innerText = firstLetter;
});
