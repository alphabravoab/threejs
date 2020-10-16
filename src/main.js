// const { WebGL1Renderer } = require('three');
const THREE = require('three')
let scene, camera, cloudParticles = [];
const cam = require('./camera')
const smoke = require('./images/smoke.png')
let width = window.innerWidth;
let height = window.innerHeight;
const init = () => {
    scene = new THREE.Scene()
    camera = cam.setCamera();
    let ambient = new THREE.AmbientLight(0x555555);
    scene.add(ambient);

    let directionLight = new THREE.DirectionalLight(0xff8c19);
    directionLight.position.set(0,0,1);
    scene.add(directionLight);

    let orangeLight = new THREE.PointLight(0xcc6600,50,450,1.7);
    orangeLight.position.set(200,300,100);
    scene.add(orangeLight);
    let redLight = new THREE.PointLight(0xd8547e,50,450,1.7);
    redLight.position.set(100,300,100);
    scene.add(redLight);
    let blueLight = new THREE.PointLight(0x3677ac,50,450,1.7);
    blueLight.position.set(300,300,200);
    scene.add(blueLight);

    renderer = new THREE.WebGLRenderer();
    scene.fog = new THREE.FogExp2(0x03544e, 0.001)
    renderer.setSize(width, height);
    renderer.setClearColor(scene.fog.color);
    
    const div3d = document.getElementById("threejs")
    div3d.appendChild(renderer.domElement)
    // document.body.appendChild();

    let loader = new THREE.TextureLoader();

    loader.load(smoke, function(texture){ 
        cloudGeo = new THREE.PlaneBufferGeometry(500,500)
        cloudMaterial = new THREE.MeshLambertMaterial({
            map: texture,
            transparent: true
        })

        for(let p=0; p<50;p++) {
            let cloud = new THREE.Mesh(cloudGeo, cloudMaterial)
            cloud.position.set(
                Math.random()*800-400,
                500,
                Math.random()*500-500
            );
            cloud.rotation.x = 1.16
            cloud.rotation.y = -0.12;
            cloud.rotation.z = Math.random()*2*Math.PI;
            cloud.material.opacity = 0.55;
            cloudParticles.push(cloud)
            scene.add(cloud)
        }
    });
    render();
}


const render = () => {
    cloudParticles.forEach(p => {
        p.rotation.z -=0.001;
     });
    renderer.render(scene, camera)
    requestAnimationFrame(render)
}

init();