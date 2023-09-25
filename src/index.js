console.log("by christ-offert");

const fonds = document.getElementById("fonds");

let clickable = false;
const clickableBtn = document.getElementById("clickable-btn");
const actionFond = document.getElementById("action-fond");
const captionFond = document.getElementById("caption-fond");
captionFond.className = `-z-10 w-40 h-40 fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 bg-blue-500 mix-blend-color rounded-full hidden`;

let passkeys = ["icon-mustache", "icon-fire", "icon-rocket", "icon-emotsmile"];
const access = document.getElementById("access");

const colors = ["blue", "red", "yellow", "green", "indigo", "orange", "pink"];

const icons = [
  "sli icon-mustache",
  "sli icon-heart",
  "sli icon-emotsmile",
  "sli icon-fire",
  "sli icon-ghost",
  "sli icon-rocket",
  "sli icon-camera",
  "sli icon-bulb",
  "sli icon-music-tone-alt",
  "sli icon-grid",
  "sli icon-bell",
  "sli icon-clock",
  "sli icon-magic-wand",
];

function noCaption() {
  captionFond.classList.add("hidden");
}

function createIcon(param) {
  const i = document.createElement("i");
  i.className = `item-icons w-10 min-w-[40px] h-10 min-h-[40px] flex justify-center items-center opacity-100 bg-white ${param}`;
  i.style =
    "-webkit-background-clip: text;-webkit-text-fill-color: transparent; color: transparent";
  return i;
}

function clickPing(params, color) {
  params.classList.add("animate-ping", color);
  setTimeout(() => {
    params.classList.remove("animate-ping", color);
  }, 700);
}

function granted() {
  access.classList.replace("bg-red-500", "bg-green-500");
  access.innerText = "granted";
}

function checkPassKey() {
  let keys = [];
  let keyDown = 0;
  fonds.addEventListener("click", (e) => {
    let tar = e.target;
    if (tar.className.indexOf(passkeys[keyDown]) != -1) {
      console.log(tar);
      clickPing(tar, "color");
      console.log(tar.className.indexOf(passkeys[keyDown]));
      keys.push(passkeys[keyDown]);
      console.log(keys);
      keyDown++;

      if (keys.toString() === passkeys.toString()) {
        granted();
        clickableBtn.classList.add("hidden");
        hoverIcon(false);
      }
    } else {
      keys = [];
      keyDown = 0;
    }
  });
}

function displayIcons(param) {
  for (let index = 0; index < param; index++) {
    const ico = Math.floor(Math.random() * icons.length);
    const i = createIcon(icons[ico]);
    fonds.appendChild(i);
  }
}

function sizeGrid(param) {
  let n = 0;
  let avail = 40;
  const size = param;
  while (avail < size) {
    n++;
    avail = avail + 40;
    // console.log("avail", avail);
  }
  // console.log(n);
  return n;
  // console.log(width);
}

function hoverIcon(param = false) {
  let change = 0;
  window.addEventListener("mousemove", (e) => {
    captionFond.classList.contains("hidden")
      ? captionFond.classList.remove("hidden")
      : null;
    captionFond.style.top = e.clientY + "px";
    captionFond.style.left = e.clientX + "px";

    param ? noCaption() : null;
  });

  captionFond.addEventListener("click", () => {
    let color = Math.floor(Math.random() * colors.length);
    if (colors.length >= 2) {
      while (color == change) {
        color = Math.floor(Math.random() * colors.length);
      }
    }
    change = color;
    captionFond.className = `-z-10 w-40 h-40 fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 bg-${colors[color]}-500 mix-blend-color rounded-full`;
    // captionFond.classList.add("my-animate-ping");
    // setTimeout(() => {
    //   captionFond.classList.remove("my-animate-ping");
    // }, 300);

    param ? noCaption() : null;
  });
}

let nW = sizeGrid(screen.availWidth);
let nH = sizeGrid(screen.availHeight);
let totalIcon = nW * nH;

function colorsThis(param, color = "blue") {
  param.classList.remove("bg-white", "opacity-100");
  param.classList.add(`bg-${color}-500`);
}
function unColorsThis(param, color = "blue") {
  param.classList.add("bg-white", "opacity-80");
  param.classList.remove(`bg-${color}-500`);
}

function lightUp(param, limit) {
  const item = document.querySelectorAll(".item-icons");

  colorsThis(item[param], "blue");

  setTimeout(() => {
    unColorsThis(item[param], "blue");

    try {
      lightUp(param + 1);
    } catch (error) {
      item.forEach((element) => {
        colorsThis(element, "blue");
      });
      setTimeout(() => {
        item.forEach((element) => {
          unColorsThis(element, "blue");
        });

        actionFond.classList.replace("hidden", "flex");
        changeClickable();
      }, 2000);
    }
  }, 40);
}

function changeClickable() {
  clickableBtn.onclick = () => {
    clickable = !clickable;
    hoverIcon(clickable);
  };
}

window.onload = () => {
  displayIcons(totalIcon);
  hoverIcon(clickable);
  lightUp(0, totalIcon);
  checkPassKey();
};
