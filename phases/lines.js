
function Spiral() {
	this.beatHoldFrames = 30;
	// what amplitude level can trigger a beat?
	this.beatThreshold = 0.11; 
	// When we have a beat, beatCutoff will be reset to 1.1*beatThreshold, and then decay
	// Level must be greater than beatThreshold and beatCutoff before the next beat can trigger.
	this.beatCutoff = 0;
	this.beatDecayRate = 0.98; // how fast does beat cutoff decay?
	this.framesSinceLastBeat = 0; // once this equals beatHoldFrames, beatCutoff starts to decay.
	this.beat = -1;

	this.detectBeat = (level) => {
	  if (level  > this.beatCutoff && level > this.beatThreshold){
	    this.onBeat();
	    this.beatCutoff = level *1.2;
	    this.framesSinceLastBeat = 0;
	  } else{
	    if (this.framesSinceLastBeat <= this.beatHoldFrames){
	      this.framesSinceLastBeat ++;
	    }
	    else{
	      this.beatCutoff *= this.beatDecayRate;
	      this.beatCutoff = Math.max(this.beatCutoff, this.beatThreshold);
	    }
	  }
	}
	this.onBeat = () => {
		console.log('beat')
		this.beat = this.beat < 1 ? 1 : -1;
	}

	this.spiral = generateSpiral(4, 1000, window.innerWidth / 2)
	this.draw = ({ fft, time }) => {
		const level = mic.getLevel();
	  const wav = fft.waveform();
	  const spec = fft.analyze().map(x => map(x, 0, 255, -1, 1));

	  console.log(this.detectBeat(level))
	  beginShape()
	  stroke(color(255, cos(time) * 255, 255))
		noFill()
	  strokeWeight(abs(sin(time + HALF_PI)) * 10)
		generateSpiral(abs(sin(time + HALF_PI)) * 20, 4000, window.innerWidth / 2 + 100)
			.map(p => rotate2D(this.beat * time * 1, p))
			.map((p, i) => ({ 
				x: p.x + p.x * spec[i % spec.length] * .1, 
				y: p.y + p.y * spec[i % spec.length] * .1 
			}))
			.forEach(p => vertex(p.x, p.y))
		endShape()

		beginShape()
	  stroke(color(255, cos(time) * 255, 255))
		noFill()
	  strokeWeight(abs(sin(time)) * 10)
		generateSpiral(abs(sin(time)) * 20, 4000, window.innerWidth / 2 + 100)
			.map(p => rotate2D(this.beat * time * 1 + PI, p))
			.map((p, i) => ({ 
				x: p.x + p.x * wav[i % wav.length] * .1, 
				y: p.y + p.y * wav[i % wav.length] * .1 
			}))
			.forEach(p => vertex(p.x, p.y))
		endShape()
	}
}

function CircleGrow() {
	this.points = [];
	this.draw = ({ fft, time }) => {
	  const wav = fft.waveform();
	  const spec = fft.analyze().map(x => map(x, 0, 255, -1, 1));

	  const avg = spec.slice(0, 10).reduce((a, b) => a + b, 0) / 10;
	  
	  if (avg > -.05) {
	  	this.points.push({ x: 0, y: 0, s: 0 });
	  }

	  stroke(255)
		noFill()

		const size = i => Math.pow((i / this.points.length), 2) * 1000

		this.points = this.points
			.map(({ x, y, s }, i) => ({ x, y, s: s + 1 + i }))
			.filter(p => p.s < window.innerWidth + 100)

	  this.points
			.forEach((p, i) => ellipse(p.x, p.y, p.s, p.s))

	}
}

function ZoomSin() {
	this.draw = ({ fft, time }) => {
	  const wav = fft.waveform();
	  const spec = fft.analyze().map(x => map(x, 0, 255, -1, 1));

	  const avg = spec.slice(0, 1000).reduce((a, b) => a + b, 0) / 1000;

		const detail = 500;

		// beginShape()
		// stroke(color(255, cos(time) * 255, 255))
		// noFill();
		// Array.from(new Array(detail))
		// 	.map((_, i) => ({ x: (i / detail * width) - width / 2, y: 0 }))
		// 	.map(({ x, y }, i) => ({ x, y: y + 10 * wav[i % wav.length] * 10 }))
		// 	.forEach(p => vertex(p.x, p.y))
		// endShape()

		beginShape()
		stroke(color(255, sin(time) * 255, 255))
		noFill();
		Array.from(new Array(detail))
			.map((_, i) => ({ x: (i / detail * width) - width / 2, y: 0 }))
			.map(({ x, y }, i) => ({ x, y: y + 10 * spec[i % spec.length] * 10 }))
			.forEach(p => vertex(p.x, p.y))
		endShape()

	}
}