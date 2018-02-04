function sgn(val) {
  if (val > 0) return 1;
  if (val < 0) return -1;
  return 0;   
}

const rotate2D = (theta, vec3) =>({
  x: vec3.x * Math.cos(theta) - vec3.y * Math.sin(theta),
  y: vec3.y * Math.cos(theta) + vec3.x * Math.sin(theta),
  z: vec3.z  
});

const rotate3D = (rotations, vec3) => {
  return rotations.reduce(({ x, y, z }, theta, index) => {
    const { s0, c0 } = { s0: Math.sin(theta), c0: Math.cos(theta) }
    switch (index) {
      case 0: return { x: x, y: y * c0 - z * s0, z: z * c0 + y * s0 };
      case 1: return { x: x * c0 - z * s0, y: y, z: z * c0 + x * s0 };
      case 2: return { x: x * c0 - y * s0, y: y * c0 + x * s0, z: z };
      default: return p
    }
  }, vec3)
}