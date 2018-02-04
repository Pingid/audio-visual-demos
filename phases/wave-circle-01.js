function WaveCircle() {
	this.draw = ({ fft }) => {
		const spec = fft.analyze().map(x => x * .2);
  	const wav = fft.waveform().map(x => x * 100);

		noFill()
	  stroke(color(100, 100, 255))
	  strokeWeight(2)
  	const circleDetail = 300

		for (let j = 0; j < 10; j++) {
	    beginShape()
	    generateCircle(spec[j] * spec[j], circleDetail)
	    .map(({ x, y }, i) => ({ 
	      x: x + x * (wav[i] * .01), 
	      y: y + x * ((wav[i] * .01) * y / x)
	    }))
	    // .map(p => { ellipse(p.x, p.y, 10, 10); return p })
	    .reduce((a, b, i) => {
	      stroke(color(255, cos(settings.time) * 255, 255))
	      strokeWeight(10)
	      vertex(b.x, b.y);
	      if (i === (circleDetail - 1)) { vertex(a[0].x, a[0].y) }
	      return [].concat(a, [b]);
	    }, [])
	    endShape()
	  }
	  beginShape()
	    generateCircle(300, circleDetail)
	    .map(({ x, y }, i) => ({ 
	      x: x + x * (wav[i] * .01), 
	      y: y + x * ((wav[i] * .01) * y / x)
	    }))
	    // .map(p => { ellipse(p.x, p.y, 10, 10); return p })
	    .reduce((a, b, i) => {
	      vertex(b.x, b.y);
	      if (i === (circleDetail - 1)) { vertex(a[0].x, a[0].y) }
	      return [].concat(a, [b]);
	    }, [])
	  endShape()
	}
}