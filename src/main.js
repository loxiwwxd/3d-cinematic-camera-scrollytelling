import './style.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

if (!document.querySelector('#scroll-track')) {
  const track = document.createElement('div');
  track.id = 'scroll-track';
  document.body.appendChild(track);
}

// Sağ tık menüsünü engelle
window.addEventListener('contextmenu', (e) => e.preventDefault());

// 1. Sahne, Kamera ve Renderer
const canvas = document.querySelector('#webgl');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x060709);
scene.fog = new THREE.FogExp2(0x060709, 0.025);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 100);
camera.position.set(0, 0.35, 3.8);

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  powerPreference: 'high-performance'
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;

// 2. OrbitControls (Serbest İnceleme)
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = false;

controls.mouseButtons = {
  LEFT: THREE.MOUSE.ROTATE,
  MIDDLE: THREE.MOUSE.DOLLY,
  RIGHT: THREE.MOUSE.PAN
};

// 3. Aydınlatma
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);

const mainSun = new THREE.DirectionalLight(0xfff5ea, 2.8);
mainSun.position.set(5, 7, 5);
scene.add(mainSun);

const backLight = new THREE.DirectionalLight(0x7095ff, 1.8);
backLight.position.set(-5, 4, -5);
scene.add(backLight);

// Zemin Yüksekliği
const GROUND_Y = -0.38;

// 4. Doğa Sahnesi (flower.glb ve Çimenlik)
const natureGroup = new THREE.Group();
natureGroup.visible = true;
scene.add(natureGroup);

const flowerWrapper = new THREE.Group();
flowerWrapper.position.set(0, GROUND_Y, 5.2);
natureGroup.add(flowerWrapper);

const loader = new GLTFLoader();

// Çiçek Modelini Yükle
loader.load(
  '/models/flower.glb',
  (gltf) => {
    const flowerModel = gltf.scene;

    flowerModel.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material.depthWrite = true;
        child.material.side = THREE.DoubleSide;
      }
    });

    const box = new THREE.Box3().setFromObject(flowerModel);
    const center = box.getCenter(new THREE.Vector3());

    flowerModel.position.x = -center.x;
    flowerModel.position.y = -box.min.y;
    flowerModel.position.z = -center.z;

    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
      flowerWrapper.scale.setScalar(1.35 / maxDim);
    }

    flowerWrapper.add(flowerModel);
  },
  undefined,
  (err) => console.warn('flower.glb yüklenemedi:', err)
);

// 5. 3D "made by loxiw" Yazısı (Tek Yöne Dönen ve Yavaşça Süzülen)
const creditGroup = new THREE.Group();
creditGroup.position.set(0, 0.85, 6.4); // Çiçeğin arkasında ve üstünde
creditGroup.scale.set(0.001, 0.001, 0.001); // Başlangıçta minik
creditGroup.rotation.x = 0.08; // 3D derinliği netleştiren hafif açı
natureGroup.add(creditGroup);

const textCanvas = document.createElement('canvas');
textCanvas.width = 1024;
textCanvas.height = 256;
const ctx = textCanvas.getContext('2d');

ctx.clearRect(0, 0, 1024, 256);
ctx.shadowColor = 'rgba(255, 255, 255, 0.85)';
ctx.shadowBlur = 18;
ctx.fillStyle = '#ffffff';
ctx.font = '600 58px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.letterSpacing = '8px';
ctx.fillText('made by loxiw', 512, 128);

const textTexture = new THREE.CanvasTexture(textCanvas);
textTexture.minFilter = THREE.LinearFilter;
textTexture.magFilter = THREE.LinearFilter;

// Tek gövde, optik ters sekme yapmayan gerçek çift taraflı materyal
const textGeo = new THREE.PlaneGeometry(1.6, 0.4);
const textMat = new THREE.MeshBasicMaterial({
  map: textTexture,
  transparent: true,
  side: THREE.DoubleSide,
  depthWrite: false
});

const textMesh = new THREE.Mesh(textGeo, textMat);
creditGroup.add(textMesh);

// 6. Çimenlik Alan (InstancedMesh)
const grassBladeGeo = new THREE.ConeGeometry(0.016, 0.22, 3);
grassBladeGeo.translate(0, 0.11, 0);
const grassMat = new THREE.MeshStandardMaterial({
  color: 0x3d8528,
  roughness: 0.55
});

const grassCount = 3000;
const grassInstanced = new THREE.InstancedMesh(grassBladeGeo, grassMat, grassCount);
const dummy = new THREE.Object3D();

let placed = 0;
while (placed < grassCount) {
  const x = (Math.random() - 0.5) * 6.5;
  const z = -2.5 + Math.random() * 9.7;

  const isInsideCameraBody = Math.abs(x) < 0.65 && Math.abs(z) < 0.8;
  const isLensTunnel = Math.abs(x) < 0.25 && z > 0.5 && z < 1.8;

  if (isInsideCameraBody || isLensTunnel) continue;

  dummy.position.set(x, GROUND_Y, z);
  dummy.scale.setScalar(0.6 + Math.random() * 0.45);
  dummy.rotation.y = Math.random() * Math.PI;
  dummy.rotation.x = (Math.random() - 0.5) * 0.25;
  dummy.updateMatrix();
  grassInstanced.setMatrixAt(placed, dummy.matrix);
  placed++;
}

grassInstanced.instanceMatrix.needsUpdate = true;
natureGroup.add(grassInstanced);

// 7. Fotoğraf Makinesi Modelini Yükle
let cameraModel = null;

loader.load(
  '/models/camera.glb',
  (gltf) => {
    cameraModel = gltf.scene;

    cameraModel.traverse((child) => {
      if (child.isMesh) {
        const fixMat = (mat) => {
          if (mat.name && mat.name.toLowerCase().includes('glass')) {
            mat.transparent = true;
            mat.opacity = 0.35;
          } else {
            mat.transparent = false;
            mat.depthWrite = true;
            mat.depthTest = true;
            mat.side = THREE.FrontSide;
          }
        };
        if (Array.isArray(child.material)) child.material.forEach(fixMat);
        else if (child.material) fixMat(child.material);
      }
    });

    const box = new THREE.Box3().setFromObject(cameraModel);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    cameraModel.position.x -= center.x;
    cameraModel.position.y -= center.y;
    cameraModel.position.z -= center.z;

    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
      cameraModel.scale.setScalar(1.4 / maxDim);
    }

    cameraModel.visible = true;
    scene.add(cameraModel);
    initCinematicTrajectory();
  },
  undefined,
  (err) => console.error('camera.glb yüklenemedi:', err)
);

// 8. Sinematik Sanal Ray ve Kontroller
const pathCam = {
  x: 0,
  y: 0.35,
  z: 3.8,
  targetX: 0,
  targetY: 0.2,
  targetZ: 0
};

let isInspecting = false;
let returnTween = null;
const transition = { value: 1 };
const startPos = new THREE.Vector3();
const startTarget = new THREE.Vector3();

controls.addEventListener('start', () => {
  isInspecting = true;
  if (returnTween) returnTween.kill();
  transition.value = 0;
});

function returnToRail() {
  if (!isInspecting) return;
  isInspecting = false;

  startPos.copy(camera.position);
  startTarget.copy(controls.target);
  transition.value = 0;

  if (returnTween) returnTween.kill();
  returnTween = gsap.to(transition, {
    value: 1,
    duration: 1.0,
    ease: 'power2.out'
  });
}

window.addEventListener('wheel', returnToRail, { passive: true });
window.addEventListener('scroll', returnToRail, { passive: true });

function initCinematicTrajectory() {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#scroll-track',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.8,
      onUpdate: () => {
        returnToRail();
      }
    }
  });

  // 1. AŞAMA: Vizör hizasına arkadan yaklaşma
  tl.to(pathCam, {
    x: 2.3,
    y: 0.55,
    z: 0.8,
    duration: 3,
    ease: 'power1.inOut'
  }, 0)
    .to(pathCam, {
      x: 0,
      y: 0.58,
      z: -1.75,
      duration: 3,
      ease: 'power1.inOut'
    }, 3)
    .to(pathCam, {
      targetX: 0,
      targetY: 0.58,
      targetZ: 0,
      duration: 6,
      ease: 'power1.inOut'
    }, 0);

  // 2. AŞAMA: Vizör penceresinden içeri tam giriş
  tl.to(pathCam, {
    x: 0,
    y: 0.58,
    z: -0.05,
    duration: 3,
    ease: 'power1.in'
  }, 6)
    .to(pathCam, {
      targetX: 0,
      targetY: 0.58,
      targetZ: 1.5,
      duration: 3,
      ease: 'power1.in'
    }, 6);

  // 3. AŞAMA: Gövde içinden lens dairesinin tam merkezine (Y: 0.24) iniş
  tl.to(pathCam, {
    targetX: 0,
    targetY: 0.24,
    targetZ: 2.0,
    duration: 2.2,
    ease: 'power2.inOut'
  }, 9)
    .to(pathCam, {
      x: 0,
      y: 0.24,
      z: 0.45,
      duration: 2.4,
      ease: 'power2.inOut'
    }, 9)
    .to(renderer, {
      toneMappingExposure: 0.25,
      duration: 1.5,
      ease: 'power1.in'
    }, 9.2);

  // 4. AŞAMA: Lensten doğaya fırlama
  tl.to(pathCam, {
    targetX: 0,
    targetY: 0.45,
    targetZ: 5.2,
    duration: 2.5,
    ease: 'power2.out'
  }, 11.4)
    .to(pathCam, {
      x: 0,
      y: 0.24,
      z: 2.3,
      duration: 2.5,
      ease: 'power2.inOut'
    }, 11.4)
    .to(renderer, {
      toneMappingExposure: 1.35,
      duration: 1.8,
      ease: 'power2.out'
    }, 11.6);

  // 5. AŞAMA: Çiçeğe makro odak ve 3D yazının ortaya çıkışı
  tl.to(pathCam, {
    x: 0,
    y: 0.48,
    z: 4.3,
    duration: 3.5,
    ease: 'power1.out'
  }, 14)
    .to(pathCam, {
      targetX: 0,
      targetY: 0.48,
      targetZ: 5.2,
      duration: 3.5,
      ease: 'power1.out'
    }, 14)
    .to(creditGroup.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 2.0,
      ease: 'back.out(1.4)'
    }, 14.8)
    .to(renderer, {
      toneMappingExposure: 1.2,
      duration: 2,
      ease: 'power1.out'
    }, 14.5);
}

// 9. Resize Desteği
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// 10. Render Döngüsü ve Animasyonlar
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const currentPathPos = new THREE.Vector3(pathCam.x, pathCam.y, pathCam.z);
  const currentPathTarget = new THREE.Vector3(pathCam.targetX, pathCam.targetY, pathCam.targetZ);

  if (isInspecting) {
    controls.update();
  } else if (transition.value < 1) {
    camera.position.lerpVectors(startPos, currentPathPos, transition.value);
    controls.target.lerpVectors(startTarget, currentPathTarget, transition.value);
    controls.update();
  } else {
    camera.position.copy(currentPathPos);
    controls.target.copy(currentPathTarget);
    camera.lookAt(controls.target);
    controls.update();
  }

  const elapsedTime = clock.getElapsedTime();

  // Çiçeğin rüzgarla salınımı
  if (flowerWrapper) {
    flowerWrapper.rotation.z = Math.sin(elapsedTime * 1.5) * 0.04;
    flowerWrapper.rotation.x = Math.cos(elapsedTime * 1.2) * 0.025;
  }

  // 3D "made by loxiw" YAZISI:
  // Monitör Hz farkından etkilenmeyen, sadece tek bir yöne yavaşça dönen ve yukarı-aşağı süzülen döngü
  if (creditGroup) {
    creditGroup.rotation.y = elapsedTime * 0.95; // Sadece ileriye doğru, sabit ve çok yavaş dönüş
    creditGroup.position.y = 0.85 + Math.sin(elapsedTime * 1.5) * 0.035; // Sakin yukarı-aşağı salınım
  }

  // Çimenlerin rüzgar dalgası
  if (grassInstanced) {
    grassInstanced.rotation.y = Math.sin(elapsedTime * 0.5) * 0.02;
  }

  renderer.render(scene, camera);
}

animate();