const THREE = require('three')

export const directionalLight = (color, pos) => {
    const light = new THREE.PointLight(...color);
    light.position.set(...pos);
    return light;
}