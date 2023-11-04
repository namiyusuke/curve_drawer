// window.addEventListener("DOMContentLoaded", function () {
//   const docWidth = document.body.clientWidth;
//   let currentOffset = 0;
//   let targetOffset = 0;
//   let isAnimating = false;
//   window.addEventListener("resize", () => {
//     docWidth = document.body.clientWidth;
//   });
// });
let elements = document.querySelectorAll(".text");
elements.forEach((element) => {
  let innerText = element.innerText;
  element.innerHTML = "";
  let textContainer = document.createElement("div");
  textContainer.classList.add("block");
  for (let letter of innerText) {
    let span = document.createElement("span");
    span.innerText = letter.trim() === "" ? "\xa0" : letter;
    span.classList.add("letter");
    textContainer.appendChild(span);
  }
  element.appendChild(textContainer);
  // element.appendChild(textContainer.cloneNode(true));
});
const tl = gsap.timeline();
const tl2 = gsap.timeline();
let path = document.querySelector(".path");
let path2 = document.querySelector(".path2");
let flag = false;

function showCards() {
  flag = false;
  revealCards();
  revealCards2();
  const showBtn = document.querySelector(".toggle-btn");
  const closeBtn = document.getElementById("closeBtn");

  showBtn.addEventListener("click", function (e) {
    console.log(flag);
    if (!flag) {
      tl.restart(); // Restart the timeline
      document.querySelector("body").classList.add("active");
    } else {
      tl2.restart(); // Restart the timeline
      document.querySelector("body").classList.remove("active");
    }
    flag = !flag;
  });

  // closeBtn.addEventListener("click", function (e) {
  //   tl.reversed(!tl.reversed());
  // });
}

function revealCards() {
  const initial = "M 0 100 V 100 Q 50 100 100 100 V 100 z";
  const start = "M 0 100 V 50 Q 50 0 100 50 V 100 z";
  const end = "M 0 100 V 0 Q 50 0 100 0 V 100 z";

  tl.pause();

  tl.to(".wines", 0.1, {
    opacity: 1,
    ease: "power2.inOut",
  });

  tl.to(path, 0.8, { attr: { d: start }, ease: "Power3.easeIn" })
    .to(path, 0.4, {
      attr: { d: end },
      ease: "Power3.easeOut",
    })
    .to(
      ".is-text .letter",
      {
        ease: "Power3.easeOut",
        y: 0,
      },
      "-=1.8"
    );
}
function revealCards2() {
  const start = "M 0 100 V 50 Q 50 0 100 50 V 100 z";
  const end = "M 0 100 V 0 Q 50 0 100 0 V 100 z";
  tl2.pause();
  tl2.to(".wines", 0.1, {
    opacity: 1,
    ease: "power2.inOut",
    // onComplete: () => {
    //   path.setAttribute("d", "M 0 100 V 100 Q 50 100 100 100 V 100 z");
    // },
  });

  tl2
    .to(path2, 0.8, { attr: { d: start }, ease: "Power3.easeIn" })
    .to(path2, 0.4, {
      attr: { d: end },
      ease: "Power3.easeOut",
      // onComplete: () => {
      //   path.setAttribute("d", "M 0 100 V 100 Q 50 100 100 100 V 100 z");
      // },
    })
    .to(".wines", 0.5, {
      opacity: 0,
      ease: "power2.inOut",
      onComplete: () => {
        path.setAttribute("d", "M 0 100 V 100 Q 50 100 100 100 V 100 z");
        path2.setAttribute("d", "M 0 100 V 100 Q 50 100 100 100 V 100 z");
      },
    })
    .to(
      ".is-text .letter",
      {
        ease: "Power3.easeOut",
        y: "100%",
      },
      "-=2.5"
    );
}

showCards();
