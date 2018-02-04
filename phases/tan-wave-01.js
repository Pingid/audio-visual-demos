function TanWave01({ detail, height }) {

	this.line = Array.from(new Array(detail))
		.map((_, i) => ({ x: 0, y: (i * height / detail ) - height / 2 }));

	this.draw = ({ fft, time }) => {
		const spec = fft.analyze().map(x => x * .2);
	  const wav = fft.waveform();

	  beginShape()
	  noFill();
	  stroke(255, 204, 0)
	  this.line
	  	.map(p => ({ x: tan((p.y) * .1 + time * .1) * 100, y: p.y }))
	    .forEach((p, i) => ellipse(p.x, p.y, wav[i % wav.length] * 20, wav[i % wav.length] * 20))
	  endShape()

	  // beginShape()
	  // noFill();
	  // stroke(255, 255, 255)
	  // this.line
	  // 	.map(p => ({ x: sin((p.y) * .01 + time) * 100, y: p.y }))
	  // 	.map((p, i) => ({ x: p.x + wav[i % wav.length] * 70, y: p.y }))
	  //   // .map((p, i) => ({ x: p.x, y: p.y + wav[i % wav.length] }))
	  //   .forEach(p => vertex(p.x, p.y))
	  // endShape()

	  // beginShape()
	  // noFill();
	  // stroke(255, 100, 0)
	  // this.line
	  // 	.map(p => ({ x: sin((p.y) * .01 + time) * 100, y: p.y }))
	  // 	.map((p, i) => ({ x: p.x + (spec[i % spec.length] * .1), y: p.y }))
	  //   // .map((p, i) => ({ x: p.x, y: p.y + wav[i % wav.length] }))
	  //   .forEach(p => vertex(p.x, p.y))
	  // endShape()

	}
}