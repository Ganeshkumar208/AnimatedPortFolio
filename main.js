import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { gsap } from 'https://cdn.skypack.dev/gsap';

const camera = new THREE.PerspectiveCamera(
  3,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.z = 13;

const scene = new THREE.Scene();
let bee;
let mixer;
const loader = new GLTFLoader();
loader.load('/lowpoly_bird_robin.glb',
  function (gltf) {
    bee = gltf.scene;
    scene.add(bee);

    mixer = new THREE.AnimationMixer(bee);
    mixer.clipAction(gltf.animations[0]).play();
    modelMove();
  },
  function (xhr) { },
  function (error) { }
);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container3D').appendChild(renderer.domElement);

// light
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);

const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(100, 100, 100);
scene.add(topLight);


const reRender3D = () => {
  requestAnimationFrame(reRender3D);
  renderer.render(scene, camera);
  if (mixer) mixer.update(0.009);
};
reRender3D();

let arrPositionModel = [
  {
    id: 'banner',
    position: { x: 0, y: -0.3, z: 0 },
    rotation: { x: 0, y: 1.5, z: 0 }
  },
  {
    id: "intro",
    position: { x: -2, y: -1, z: -5 },
    rotation: { x: 0.5, y: 7.5, z: 0 },
  },
  {
    id: "description",
    position: { x: -1, y: -1, z: -5 },
    rotation: { x: 0, y: 5.5, z: 0 },
  },
  {
    id: "contact",
    position: { x: 5, y: -1.5, z: 0 },
    rotation: { x: 0.3, y: -1.2, z: 0 },
  },
];
const modelMove = () => {
  const sections = document.querySelectorAll('.section');
  let currentSection;
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= window.innerHeight / 3) {
      currentSection = section.id;
    }
  });
  let position_active = arrPositionModel.findIndex(
    (val) => val.id == currentSection
  );
  if (position_active >= 0) {
    let new_coordinates = arrPositionModel[position_active];
    gsap.to(bee.position, {
      x: new_coordinates.position.x,
      y: new_coordinates.position.y,
      z: new_coordinates.position.z,
      duration: 3,
      ease: "power1.out"
    });
    gsap.to(bee.rotation, {
      x: new_coordinates.rotation.x,
      y: new_coordinates.rotation.y,
      z: new_coordinates.rotation.z,
      duration: 3,
      ease: "power1.out"
    })
  }
}
window.addEventListener('scroll', () => {
  if (bee) {
    modelMove();
  }
})
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
})















// import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
// import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
// import { gsap } from 'https://cdn.skypack.dev/gsap';

// const camera = new THREE.PerspectiveCamera(
//   30,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   100
// );
// camera.position.z = 13;

// const scene = new THREE.Scene();
// let bee, spaceman;
// let beeMixer, spacemanMixer;

// // Load Bee Model
// const beeLoader = new GLTFLoader();
// beeLoader.load('/demon_bee_full_texture.glb',
//   function (gltf) {
//     bee = gltf.scene;
//     scene.add(bee);

//     beeMixer = new THREE.AnimationMixer(bee);
//     beeMixer.clipAction(gltf.animations[0]).play();
//     modelMove();
//   },
//   undefined,
//   function (error) { console.error('Error loading bee model', error); }
// );

// // Load Spaceman Model
// // const spacemanLoader = new GLTFLoader();
// // spacemanLoader.load('/animated_astronaut_character.glb',
// //   function (gltf) {
// //     spaceman = gltf.scene;
// //     spaceman.position.set(-3, -0.5, -2);  // Set initial position for spaceman
// //     scene.add(spaceman);

// //     spacemanMixer = new THREE.AnimationMixer(spaceman);
// //     if (gltf.animations.length) {
// //       spacemanMixer.clipAction(gltf.animations[0]).play();
// //     }
// //   },
// //   undefined,
// //   function (error) { console.error('Error loading spaceman model', error); }
// // );

// const renderer = new THREE.WebGLRenderer({ alpha: true });
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.getElementById('container3D').appendChild(renderer.domElement);

// // Light setup
// const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
// scene.add(ambientLight);

// const topLight = new THREE.DirectionalLight(0xffffff, 1);
// topLight.position.set(100, 100, 100);
// scene.add(topLight);

// // Rendering function
// const reRender3D = () => {
//   requestAnimationFrame(reRender3D);
//   renderer.render(scene, camera);
//   if (beeMixer) beeMixer.update(0.009);
//   if (spacemanMixer) spacemanMixer.update(0.009);
// };
// reRender3D();

// // Positions for bee model and spaceman in the description section only
// let arrPositionModel = [
//   {
//     id: 'banner',
//     beePosition: { x: 0, y: -1.3, z: 0 },
//     beeRotation: { x: 0, y: 1.5, z: 0 },
//   },
//   {
//     id: "intro",
//     beePosition: { x: -2, y: -1, z: -5 },
//     beeRotation: { x: 0.5, y: 7.5, z: 0 },
//   },
//   {
//     id: "description",
//     beePosition: { x: -1, y: -1, z: -5 },
//     beeRotation: { x: 0, y: 5.5, z: 0 },
//     // spacemanPosition: { x: -3, y: -0.5, z: -2 },
//   },
//   {
//     id: "contact",
//     beePosition: { x: 5, y: -1.5, z: 0 },
//     beeRotation: { x: 0.3, y: -1.2, z: 0 },
//   },
// ];

// const modelMove = () => {
//   const sections = document.querySelectorAll('.section');
//   let currentSection;
//   sections.forEach((section) => {
//     const rect = section.getBoundingClientRect();
//     if (rect.top <= window.innerHeight / 3) {
//       currentSection = section.id;
//     }
//   });
//   let position_active = arrPositionModel.findIndex(
//     (val) => val.id == currentSection
//   );
//   if (position_active >= 0) {
//     let new_coordinates = arrPositionModel[position_active];
//     // Animate Bee
//     gsap.to(bee.position, {
//       x: new_coordinates.beePosition.x,
//       y: new_coordinates.beePosition.y,
//       z: new_coordinates.beePosition.z,
//       duration: 3,
//       ease: "power1.out"
//     });
//     gsap.to(bee.rotation, {
//       x: new_coordinates.beeRotation.x,
//       y: new_coordinates.beeRotation.y,
//       z: new_coordinates.beeRotation.z,
//       duration: 3,
//       ease: "power1.out"
//     });

//     // Animate Spaceman only in "description" section
//     // if (currentSection === 'description') {
//     //   gsap.to(spaceman.position, {
//     //     x: new_coordinates.spacemanPosition.x,
//     //     y: new_coordinates.spacemanPosition.y,
//     //     z: new_coordinates.spacemanPosition.z,
//     //     duration: 3,
//     //     ease: "power1.out"
//     //   });
//     // }
//   }
// }

// window.addEventListener('scroll', () => {
//   if (bee && spaceman) {
//     modelMove();
//   }
// });

// window.addEventListener('resize', () => {
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
// });

