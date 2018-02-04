function DotsLine() {
	this.shape = generateGrid(10, window.innerWidth, window.innerHeight).reduce((a, b) => [].concat(a, b));
  this.line = Array.from(new Array(1000))
          .map((_, i) => ({ x: (window.innerWidth / 1000) * i - (window.innerWidth / 2), y: 0}));

	this.draw = ({ fft }) => {
		const spec = fft.analyze().map(x => x * .2);
	  const wav = fft.waveform().map(x => x * 100);

	  beginShape()
	  this.line
	    .map((p, i) => ({ x: p.x, y: p.y + wav[i % wav.length] }))
	    .forEach(p => vertex(p.x, p.y))
	  noFill();
	  stroke(255, 204, 0)
	  endShape()


	  this.shape.map((p, i) => ellipse(p.x, p.y, spec[i % spec.length], spec[i % spec.length]))
	}
}