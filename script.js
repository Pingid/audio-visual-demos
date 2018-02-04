// GLOBAL VARIABLES
let mic, fft;

const phases = {
  waveCircle: new WaveCircle(),
  dotsLine: new DotsLine(),
  wobbleSphere: new WobbleSphere(),
  tanWave01: new TanWave01({ detail: 200, height: window.innerHeight }),
  spiral: new Spiral(),
  zoomSin: new ZoomSin(),
  circleGrow: new CircleGrow()
}

const settings = {
  phase: 'circleGrow',
  time: 0,
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // SOUND
  mic = new p5.AudioIn()
  mic.start();
  fft = new p5.FFT(.7, 1024);
  fft.setInput(mic)

  // UI
  const gui = new dat.GUI();
  gui.add(settings, 'phase', Object.keys(phases))
}

function draw() {
  clear(window.innerWidth, window.innerHeight)
  background(0)
  push();
  translate(window.innerWidth / 2, window.innerHeight / 2)
  settings.time += (1 / 60);

  // SOUND
  const spec = fft.analyze().map(x => x * .2);
  const wav = fft.waveform().map(x => x * 100);
  const level = mic.getLevel()

  // phases.waveCircle.draw(fft);
  phases[settings.phase].draw({ fft, mic, time: settings.time });

  pop()
}
