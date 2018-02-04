function WobbleSphere() {
	this.sphere = generateSphere(window.innerWidth / 2, 50);

	this.draw = ({ fft, mic, time }) => {
	  const level = mic.getLevel();
	  const wav = fft.waveform().map(x => x * 100);

		beginShape(POINTS)

	  this.sphere
	  	.map(lat => lat.map(p => rotate3D([sin(time), cos(time), 0], p)))
	  	.forEach((lat, m) => lat.forEach((p, n) => {
		    const getNoise = n => n / 300 * .5 + time * .5 + level * .5;
		    const nos = noise(getNoise(p.x), getNoise(p.y), getNoise(p.z));
		    const w = 0
		    noFill()
		    stroke(255, 204, 0)
		    // stroke(color(200 * sin(time), 200 * sin(time + 2), 200 * sin(time + 4)))
		    ellipse(p.x * nos + p.x * w, p.y * nos + p.y * w, 1, 1)

		    // vertex(p.x * nos + p.x * w, p.y * nos + p.y * w, p.z * nos + p.z * w)
	  	}))
	  endShape()
	}
}