export default class Controller {
  #view;
  #camera;
  #worker;
  #blinkCounter = 0;
  constructor({ view, camera, worker }) {
    this.#view = view;
    this.#camera = camera;
    this.#worker = this.#configureWorker(worker);

    this.#view.configureOnBtnClick(this.onBtnStart.bind(this));
  }

  #configureWorker(worker) {
    let ready = false;
    worker.onmessage = ({ data }) => {
      if (data === "READY") {
        this.#view.enableButton();
        console.log("Worker is ready");
        ready = true;
        return;
      }
      const blinked = data.blinked;
      this.#blinkCounter += blinked;
      this.#view.toggleVideoElement()
      console.log("blinked", blinked);
    };

    return {
      send(msg) {
        if (!ready) return;
        worker.postMessage(msg);
      },
    };
  }

  static async initialize(deps) {
    const controller = new Controller(deps);
    controller.log(
      "not yet detecting eye blink! To start, click in the button"
    );
    return controller.init();
  }

  async init() {
    console.log("init!");
  }

  loop() {
    const video = this.#camera.video;
    const img = this.#view.getVideoFrame(video);
    this.#worker.send(img);
    this.log(`detecting eye blink...`);

    setTimeout(() => this.loop(), 100);
  }

  log(text) {
    const times = `         - blinked times: ${this.#blinkCounter}`
    this.#view.log(`logger: ${text}`.concat(this.#blinkCounter ? times: ''));
  }

  onBtnStart() {
    this.log("initializing detection...");
    this.#blinkCounter = 0;
    this.loop();
  }
}
