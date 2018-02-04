function generateSpiral(rotations, detail, radius) {
  const theta = i => rotations * (i / detail) * 2 * Math.PI;
  const step = i => i / detail * radius;
  return Array.from(new Array(detail))
    .map((_, i) => rotate2D(theta(i), { x: 0, y: step(i), z: i * .1 }))
}

function generateCircle(r, points) {
  const { x, y } = { x: 0, y: r };
  const theta = i => (i / points) * 2 * Math.PI;
  return Array.from(new Array(points))
    .map((_, i) => ({ 
      x: x * Math.cos(theta(i)) - y * Math.sin(theta(i)),
      y: y * Math.cos(theta(i)) + x * Math.sin(theta(i)),
      z: 0
    }))
}

function generateSphere(R, D) {
  return Array.from(new Array(D))
    .map((_, m) => 
      Array.from(new Array(D)).map((_, n) => ({
          x: Math.sin(Math.PI * m/D) * Math.cos(2 * Math.PI * n/D) * R, 
          y: Math.sin(Math.PI * m/D) * Math.sin(2 * Math.PI * n/D) * R, 
          z: Math.cos(Math.PI * m/D) * R
      }))
    )
}

function generateSuperellipse(radius, theta, detail) {
  const n = ((Math.sin(theta) + 1) / 2) * 10 + .1
  const a = radius;
  const b = a;
  const angle = i => (i / detail) * 2 * Math.PI;
  return Array.from(new Array(detail))
    .map((_, i) => ({
      x: Math.pow(Math.abs(Math.cos(angle(i))), 2 / n) * a * sgn(Math.cos(angle(i))),
      y: Math.pow(Math.abs(Math.sin(angle(i))), 2 / n) * b * sgn(Math.sin(angle(i))),
      z: Math.pow(Math.abs(Math.cos(angle(i))), 2 / n) * a * sgn(Math.cos(angle(i)))
    }))
}

function generateGrid(detail, width, height) {
  return Array.from(new Array(detail))
    .map((_, i) => 
      Array.from(new Array(detail)).map((_2, i2) => 
        ({ 
          x: (width / detail * (i2 + .5)) - width / 2,
          y: (height / detail * (i + .5)) - height / 2
        })
      )
    )
}
