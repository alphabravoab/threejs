const THREE = require('three')
let camera;

export const setCamera = (width, height) => {
    camera = new THREE.PerspectiveCamera(60, width / height, 1 ,1000)
    camera.position.z = 1;
    camera.rotation.x = 1.16;
    camera.rotation.y = -0.12;
    camera.rotation.z = 0.27;
    window.addEventListener("resize", onWindowResize, false);
    return camera
}

function onWindowResize() {
    width = window.innerWidth;
    height = window.innerHeight
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }