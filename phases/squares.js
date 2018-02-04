function Squares() {
	this.draw = ({ fft }) => {
		const spec = fft.analyze().map(x => x * .2);
  	const wav = fft.waveform().map(x => x * 100);

  	for (let i =0; i < 10; i++) {
  		
  	}
	}
}