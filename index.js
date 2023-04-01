const inputEl = document.querySelector("input");
const buttonEl = document.querySelector("button");
const timerEl = document.querySelector("span");

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  let isRunning;
  return (secs) => {
    const startTime = new Date().getTime();
    let secsSpent = 0;

    function setTime() {
      secsSpent = Math.floor((new Date().getTime() - startTime) / 1000);
      const currentTime = new Date(Number(secs - secsSpent) * 1000);
      timerEl.textContent = currentTime.toUTCString().toString().split(" ")[4];

      if (secs - secsSpent > 0) {
        requestAnimationFrame(setTime);
      } else {
        console.log(new Date().getTime() - startTime);
      }
    }
    if (!isRunning) {
      requestAnimationFrame(setTime);
      isRunning = true;
    }
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener("input", (evt) => {
  // Очистите input так, чтобы в значении
  // оставались только числа
  evt.target.value = parseInt(evt.target.value) || "";
});

buttonEl.addEventListener("click", () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = "";
});
