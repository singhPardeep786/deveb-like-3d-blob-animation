import * as THREE from 'three'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Setup scene
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#canvas'),
  antialias: true,
  alpha: true,
})

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Create icosahedron
const geometry = new THREE.IcosahedronGeometry(2, 50, 50)
const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    uTime: {
      value: 0,
    },
    uColor: {
      value: 0,
    },
  },
})

const mesh = new THREE.Mesh(geometry, material)
mesh.position.y = -2.7
scene.add(mesh)

camera.position.z = 3.5

var tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.landing_page',
    start: 'top top',
    end : 'bottom center',
    scrub: 2,
    // markers: true,
  }
});

tl.to(mesh.position,{
  y: 0,
  z: -1,
  ease: 'power2.inOut',
}, "a").to(material.uniforms.uColor, {
  value: 1,
  ease: 'power2.inOut',
}, "a")
.to('.landing_page h1', {
  opacity: 0,
},"a")
.to('.landing_page p', {
  opacity: 1,
})

// Animation loop
const clock = new THREE.Clock()

function animate() {
  const elapsedTime = clock.getElapsedTime()
  material.uniforms.uTime.value = elapsedTime;
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

// Handle resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

animate()
