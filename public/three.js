import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const barrier = 10;  //Sets value of boundry
let cameraZoom = 80;

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

let starsPlain;

const initStarsBackGround = () => {
    const geometryplain = new THREE.PlaneGeometry(500, 500);
    const textureplain = new THREE.TextureLoader().load('./assets/images/8k_stars.jpg')
    const materialplain = new THREE.MeshBasicMaterial( { map: textureplain, side: THREE.DoubleSide } );
    starsPlain = new THREE.Mesh( geometryplain, materialplain );
    starsPlain.position.z = -100
    scene.add( starsPlain );
}

let sphereJupiter;

const initPlanetJupiter = () => {
    const geometry = new THREE.SphereGeometry(50, 100, 100);
    const texture = new THREE.TextureLoader().load('./assets/images/8k_jupiter.jpg')
    const material = new THREE.MeshBasicMaterial( { map: texture } );
    sphereJupiter = new THREE.Mesh( geometry, material );
    
    scene.add( sphereJupiter );
}




const geometryRing = new THREE.RingGeometry(70, 60, 32);
const textureRing = new THREE.TextureLoader().load('./assets/images/8k_saturn_ring_alpha.png')
const materialRing = new THREE.MeshBasicMaterial( { map: textureRing } );
const ring = new THREE.Mesh( geometryRing, materialRing );
ring.position.z = -100
scene.add( ring );



const moveAround = () => {
    // console.log("sphereZ:" + sphere.position.z)
    // console.log("sphereX:" + sphere.position.x)
    // console.log("sphereY:" + sphere.position.y)
    
    if (sphereJupiter.position.x >= barrier) {
        speedX = speedX * -1
    }

    if (sphereJupiter.position.x <= -barrier) {
        speedX = speedX * -1
    }
    
    if (sphereJupiter.position.y >= barrier) {
        speedY = speedY * -1
    }

    if (sphereJupiter.position.y <= -barrier) {
        speedY = speedY * -1
    }

    if (sphereJupiter.position.z >= barrier) {
        speedZ = speedZ * -1
    }

    if (sphereJupiter.position.z <= -barrier) {
        speedZ = speedZ * -1
    }
}

let speedX = 0.02;
let speedY = 0.05;
let speedZ = 0.02;

initPlanetJupiter();
initStarsBackGround();


function animate() {
    camera.position.z = cameraZoom;
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
    sphereJupiter.rotation.y += 0.001;
    moveAround();
}

window.onload = animate();






// Button Controls

document.getElementById("left-button").addEventListener("click", function() {
    sphereJupiter.rotation.x += 0.05;
})

document.getElementById("right-button").addEventListener("click", function() {
    sphereJupiter.rotation.x -= 0.05;
})

document.getElementById("in-button").addEventListener("click", function() {
    if (cameraZoom <= 55) return
    cameraZoom -= 5;
    starsPlain.position.z -= 5;
})

document.getElementById("out-button").addEventListener("click", function() {
    if (cameraZoom >= 200) return
    cameraZoom += 5;
    starsPlain.position.z += 5;
})
