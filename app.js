const coinAudio = document.querySelector("audio");
const soundInput = document.querySelector(".sound__checkbox");
let heads = 0;
let tails = 0;
let user = {};
let coin = document.querySelector(".coin");
let flipBtn = document.querySelector("#flip-button");
let resetBtn = document.querySelector("#reset-button");

// Flip Coin Event 1
coin.addEventListener("click", () => {
  let i = Math.floor(Math.random() * 2);
  coin.style.animation = "none";
  if (i) {
    setTimeout(() => {
      coin.style.animation = "spin-heads 3s forwards";
    }, 100);
    heads++;
  } else {
    setTimeout(() => {
      coin.style.animation = "spin-tails 3s forwards";
    }, 100);
    tails++;
  }
  if (soundInput.checked === true) {
    coinAudio.play();
  }
  setTimeout(updateStats, 3000);
  disableButton();
});
// Flip Coin event 2
flipBtn.addEventListener("click", () => {
  let i = Math.floor(Math.random() * 2);
  coin.style.animation = "none";
  coin.style.pointerEvents = "none";
  if (i) {
    setTimeout(() => {
      coin.style.animation = "spin-heads 3s forwards";
    }, 100);
    heads++;
  } else {
    setTimeout(() => {
      coin.style.animation = "spin-tails 3s forwards";
    }, 100);
    tails++;
  }
  if (soundInput.checked === true) {
    coinAudio.play();
  }

  setTimeout(updateStats, 3000);
  disableButton();
});

// Update Stats
function updateStats() {
  document.querySelector("#heads-count").textContent = `Heads : ${heads}`;
  document.querySelector("#tails-count").textContent = `Tails : ${tails}`;
}

// Disable button Function
function disableButton() {
  flipBtn.disabled = true;
  coin.style.pointerEvents = "none";
  setTimeout(() => {
    flipBtn.disabled = false;
    coin.style.pointerEvents = "all";
  }, 3000);
}

// reset Button event
resetBtn.addEventListener("click", () => {
  coin.style.transform = `rotateX(0)`;
  heads = 0;
  tails = 0;
  updateStats();
});

// Share Api
const shareBtn = document.querySelector(".nav__share");
shareBtn.addEventListener("click", async () => {
  try {
    await navigator.share({
      title: "Play Flip a coin",
      url: "https://twitter.com/probablyabhinav",
    });
  } catch (err) {
    console.log(err);
  }
});

// Settings Toggle
const settingsToggle = document.querySelector(".settings__header");
const settingsBody = document.querySelector(".settings__body");
settingsToggle.addEventListener("click", (e) => {
  e.preventDefault();
  settingsBody.classList.toggle("hide");
  settingsToggle.querySelector(".settings__open").classList.toggle("hide");
  settingsToggle.querySelector(".settings__close").classList.toggle("hide");
});

const tabs = document.querySelector(".tabs");
const tabsWrapper = document.querySelector(".tabbed__wrapper");

// Tabs Switch Event
tabs.addEventListener("click", (e) => {
  if (e.target.classList.contains("tab")) {
    tabs
      .querySelectorAll(".tab")
      .forEach((item) => item.classList.remove("tab--active"));
    e.target.classList.add("tab--active");
    tabsWrapper.querySelectorAll(".tabbed__section").forEach((item) => {
      if (item.classList.contains("tabbed__section--active")) {
        item.classList.remove("tabbed__section--active");
      }
    });
    let tabSection = tabsWrapper.querySelector(`.${e.target.dataset.tab}`);
    tabSection.classList.add("tabbed__section--active");
  }
});

const tailsText = document.querySelector("#text-tails");
const headsText = document.querySelector("#text-heads");
const coinHeadsText = document.querySelector(".coin__text-heads");
const coinTailsText = document.querySelector(".coin__text-tails");
// Update Local Storage Function
function updateLocalStorage(prop) {
  const localData = JSON.parse(localStorage.getItem("userdata"));
  if (localData) {
    localData[`${prop}`] = user[`${prop}`];
    localStorage.setItem("userdata", JSON.stringify(localData));
  } else {
    localStorage.setItem("userdata", JSON.stringify(user));
  }
}
// Add Heads Text
headsText.addEventListener("input", () => {
  coinHeadsText.textContent = headsText.value;
});
headsText.addEventListener("blur", (e) => {
  user.headsTitle = headsText.value;
  updateLocalStorage("headTitle");
});
headsText.addEventListener("keydown", (e) => {
  // e.preventDefault();
  if (e.keyCode === 13) {
    user.headsTitle = headsText.value;
    updateLocalStorage("headsTitle");
    headsText.blur();
  }
});

// Add text on tails
tailsText.addEventListener("input", () => {
  coinTailsText.textContent = tailsText.value;
});
tailsText.addEventListener("blur", (e) => {
  user.tailsTitle = tailsText.value;
  updateLocalStorage("tailsTitle");
});
tailsText.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    user.tailsTitle = tailsText.value;
    updateLocalStorage("tailsTitle");
    tailsText.blur();
  }
});

// Color Theme Switcher
const colorGrid = document.querySelector(".color__grid");
colorGrid.addEventListener("click", (e) => {
  if (e.target.classList.contains("color__label")) {
    const btn = e.target;
    setColor(btn.dataset.pri, btn.dataset.sec);
    user.priClr = btn.dataset.pri;
    user.secClr = btn.dataset.sec;
    updateLocalStorage("priClr");
    updateLocalStorage("secClr");
  }
});

// Set Color Function
function setColor(primaryColor, secondaryColor) {
  document.body.style.background = `linear-gradient(to right, ${primaryColor}, ${secondaryColor})  fixed`;
  flipBtn.style.background = `${primaryColor}`;
  flipBtn.style.borderColor = `${primaryColor}`;
  resetBtn.style.borderColor = `${primaryColor}`;
  resetBtn.style.color = `${primaryColor}`;
}

// On Reload Or On Load
document.addEventListener("DOMContentLoaded", (e) => {
  const localData = JSON.parse(localStorage.getItem("userdata"));
  if (localData) {
    user = Object.assign({}, localData);
    setColor(user.priClr, user.secClr);
    coinHeadsText.textContent = headsText.value = localData.headsTitle;
    coinTailsText.textContent = tailsText.value = localData.tailsTitle;
  }
});
