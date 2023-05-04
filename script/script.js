const dartBoard = document.querySelector(".dart-board");
const limitLine = document.querySelector(".limit-line");
const ball = document.querySelector(".ball");
const board = document.querySelector(".board");

(function generationPositionBall() {
  let randomPlaceGenerationX = Math.ceil(
    Math.random() * (window.innerWidth - ball.clientWidth));
    
  ball.style.left = randomPlaceGenerationX + "px";

})();

ball.onmousedown = function (event) {
  let shiftX = event.clientX - ball.getBoundingClientRect().left;
  let shiftY = event.clientY - ball.getBoundingClientRect().top;


  function moveAt(pageX, pageY) {
    ball.style.left = pageX - shiftX + "px";
    ball.style.top = pageY - shiftY + "px";

    if (ball.style.top <= limitLine.getBoundingClientRect().top) console.log("1");

  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  document.addEventListener("mousemove", onMouseMove);

  ball.onmouseup = function () {
    document.removeEventListener("mousemove", onMouseMove);
    ball.onmouseup = null;
  };
};

ball.ondragstart = function () {
  return false;
};