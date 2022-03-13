
//load from sooooooooomewhere
document.getElementById("timeofday-placeholder").innerHTML = "Afternoon"

//load from someeeeeeeeeeeeewhere
document.getElementById("username-placeholder").innerHTML = "Simrat"

//load from the abyss
document.getElementById("date-placeholder").innerHTML = "3/12/2022"

//load from the
document.getElementById("streak-placeholder").innerHTML = "3"

//Timer shit
class Timer {
  constructor(root) {
    root.innerHTML = Timer.getHTML();

    this.el = {
      hours: root.querySelector(".timerpartHours"),
      minutes: root.querySelector(".timerpartMinutes"),
      seconds: root.querySelector(".timerpartSeconds"),
      control: root.querySelector(".timerbtnControl"),
      reset: document.querySelector(".timerbtnReset")
    };

    this.interval = null;
    this.remainingSeconds = 0;
    this.remainingMinutes = 0;

    this.el.control.addEventListener("click", () => {
      if (this.interval === null) {
        this.start();
      } else {
        this.stop();
      }
    });

    this.el.reset.addEventListener("click", () => {
      const inputMinutes = prompt("Enter number of minutes:");

      if (inputMinutes < 60) {
        this.stop();
        this.remainingSeconds = inputMinutes * 60;
        this.updateInterfaceTime();
      } else if (inputMinutes >= 60) {
        this.stop();
        this.remainingSeconds = inputMinutes * 60;
        this.updateInterfaceTime();
      }
    });
  }
  updateInterfaceTime() {
    const hours = Math.floor(this.remainingSeconds / 3600);
    const minutes = Math.floor((this.remainingSeconds - (3600*hours)) / 60);
    const seconds = this.remainingSeconds % 60;

    this.el.hours.textContent = hours.toString().padStart(2, "0");
    this.el.minutes.textContent = minutes.toString().padStart(2, "0");
    this.el.seconds.textContent = seconds.toString().padStart(2, "0");
  }

  updateInterfaceControls() {
    if (this.interval === null) {
      this.el.control.innerHTML = `<span class="material-icons">play_arrow</span>`;
      this.el.control.classList.add("timerbtnStart");
      this.el.control.classList.remove("timerbtnStop");
    } else {
      this.el.control.innerHTML = `<span class="material-icons">pause</span>`;
      this.el.control.classList.add("timerbtnStop");
      this.el.control.classList.remove("timerbtnStart");
    }
  }

  start() {
    if (this.remainingSeconds === 0) return;

    this.interval = setInterval(() => {
      this.remainingSeconds--;
      this.updateInterfaceTime();

      if (this.remainingSeconds === 0) {
        this.stop();
      }
    }, 1000);

    this.updateInterfaceControls();
  }

  stop() {
    clearInterval(this.interval);

    this.interval = null;

    this.updateInterfaceControls();
  }

  static getHTML() {
    return `
      <span class="timerpart timerpartHours">00</span>
      <span class="timerpart">:</span>
			<span class="timerpart timerpartMinutes">00</span>
			<span class="timerpart">:</span>
			<span class="timerpart timerpartSeconds">00</span>
			<button type="button" class="timerbtn timerbtnControl timerbtnStart">
				<span class="material-icons">play_arrow</span>
			</button>
		`;
  }
}

new Timer(
	document.querySelector(".timer")
);



console.log("Is this shit working?")
