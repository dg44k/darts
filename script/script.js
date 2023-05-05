const dartBoard = document.querySelector(".dart-board");
const limitLine = document.querySelector(".limit-line");
const ball = document.querySelector(".ball");
const board = document.querySelector(".board");

function generationPositionBall() {
  let randomPlaceGenerationX = Math.ceil(
    Math.random() * (window.innerWidth - ball.clientWidth)
  );

  ball.style.left = randomPlaceGenerationX + "px";
}

generationPositionBall();

ball.onmousedown = function (event) {
  let shiftX = event.clientX - ball.getBoundingClientRect().left;
  let shiftY = event.clientY - ball.getBoundingClientRect().top;

  function moveAt(pageX, pageY) {
    ball.style.left = pageX - shiftX + "px";
    ball.style.top = pageY - shiftY + "px";

    if (ball.style.top.slice(0, -2) <= limitLine.getBoundingClientRect().top) {
      ball.style.top = limitLine.getBoundingClientRect().top + "px";
      ball.onmouseup();
    }
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  document.addEventListener("mousemove", onMouseMove);

  ball.onmouseup = function () {
    document.removeEventListener("mousemove", onMouseMove);
    animate();
    ball.onmouseup = null;
  };
};

ball.ondragstart = function () {
  return false;
};

function animate() {
  const duration = 3;
  const endY =
    -window.innerHeight +
    ball.clientHeight +
    window.innerHeight -
    ball.getBoundingClientRect().top;

  ball.style.animation = `
    moveBall ${duration}s linear forwards
  `;

  const keyframes = `
    @keyframes moveBall {
      from {
        transform: translateY(${0}px);
      }
      to {
        transform: translateY(${endY}px);
      }
    }
  `;

  document.querySelector("style").innerHTML = keyframes;
  setTimeout(() => {
    checkConditions();
  }, 3100);
}

function checkConditions() {
  const startDartBoardX = dartBoard.getBoundingClientRect().left;
  const endDartBoardX = dartBoard.getBoundingClientRect().right;
  const startDartBoardY = dartBoard.getBoundingClientRect().top;
  const endDartBoardY = dartBoard.getBoundingClientRect().bottom;

  if (
    (ball.getBoundingClientRect().left || ball.getBoundingClientRect().right) >=
      startDartBoardX &&
    (ball.getBoundingClientRect().left || ball.getBoundingClientRect().right) <=
      endDartBoardX &&
    (ball.getBoundingClientRect().top || ball.getBoundingClientRect().bottom) >=
      startDartBoardY &&
    (ball.getBoundingClientRect().top || ball.getBoundingClientRect().bottom) <=
      endDartBoardY
  ) {
    alert("Вы попали!");
  } else {
    alert("Не попали!")
  }
  document.querySelector("style").innerHTML = '';
  generationPositionBall();
  
}
