# 📷 3D Cinematic Camera Viewfinder Scrollytelling Experience

A cutting-edge, web-based 3D scrollytelling experience built with **Three.js**, **GSAP ScrollTrigger**, and **Vite**. The project takes the viewer on a seamless cinematic journey starting from an external perspective around a vintage Canon analog camera, diving straight through the optical viewfinder, passing through the interior lens tunnel, and bursting out into an atmospheric meadow where it macro-focuses onto a delicate orchid flower and an animated 3D credit emblem.

---

## ✨ Features

- **🎬 GSAP ScrollTrigger Cinematic Camera Trajectory**
  - **Phase 1: Rear Approach:** Smooth cinematic zoom approaching the camera body and aligning directly with the optical viewfinder window.
  - **Phase 2: Viewfinder Entry:** Seamless dive right through the viewfinder glass into the internal optical housing.
  - **Phase 3: Lens Barrel Descend:** Controlled trajectory drop down to the optical axis (`Y: 0.24`) through the lens elements, accompanied by dynamic exposure dimming.
  - **Phase 4: Lens Burst to Nature:** Dramatic emergence through the front lens into an expansive natural meadow with sudden bloom and tone mapping adaptation.
  - **Phase 5: Flower Macro & Credit Reveal:** Smooth decelerated macro focus onto the blooming orchid alongside a dynamic back-eased 3D emblem reveal.

- **🕹️ OrbitControls & GSAP Hybrid Rail System**
  - Freedom to inspect the scene at any moment using left-click rotation and right-click panning.
  - When the user starts scrolling or moving the mouse wheel, the camera smoothly and dynamically lerps (`GSAP tween & Vector3.lerpVectors`) back to its exact cinematic trajectory path without snapping or camera pops.

- **🌱 Procedural Grass Meadow with Wind Dynamics**
  - Over 3,000 instanced grass blades rendered in a single draw call via `THREE.InstancedMesh`.
  - Exclusion zones preventing grass generation inside the camera body and along the lens tunnel corridor.
  - Continuous organic wind swaying physics computed in the animation loop.

- **📸 Detailed GLTF Model Integration**
  - Realistic vintage **Canon Analog Camera** GLTF model with custom glass material transmission and transparency handling.
  - High-fidelity **Orchid Flower** GLTF model featuring double-sided botanical materials and natural breeze physics.

- **💎 3D Floating Double-Sided "made by loxiw" Emblem**
  - Dynamically rendered on an in-memory high-resolution Canvas with soft drop-shadow typography.
  - Frame-rate independent continuous unidirectional rotation and harmonic bobbing animation.
  - True double-sided rendering with custom depth testing.

---

## 🛠️ Tech Stack

- **[Three.js](https://threejs.org/)** (v0.187+) - WebGL 3D rendering engine, materials, instanced meshes, and lighting.
- **[GSAP & ScrollTrigger](https://greensock.com/scrolltrigger/)** - Scrollytelling timeline, scrub interpolation, and exposure transitions.
- **[Vite](https://vitejs.dev/)** (v8+) - Ultra-fast development server and modern bundling.
- **JavaScript (ES6+)** - Modular architecture and mathematical vector operations.

---

## 🕹️ Controls & Interaction

| Interaction | Action |
| --- | --- |
| **Scroll / Mouse Wheel** | Travel along the cinematic scrollytelling path |
| **Left Click + Drag** | Orbit and inspect the camera / environment freely |
| **Right Click + Drag** | Pan the camera perspective |
| **Resume Scrolling** | Smoothly snaps (lerp) back to the cinematic director rail |

---

## 🚀 Getting Started

Follow these steps to run the project locally on your machine:

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18 or higher recommended) installed.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/loxiwwxd/3d-cinematic-camera-scrollytelling.git
   cd 3d-cinematic-camera-scrollytelling
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview production build:
   ```bash
   npm run preview
   ```

---

## 📁 Project Structure

```
├── public/
│   ├── models/
│   │   ├── camera.glb       # Vintage Canon camera 3D model
│   │   └── flower.glb       # Orchid flower 3D model
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── main.js              # Three.js scene, lighting, loaders, GSAP timeline & loop
│   └── style.css            # Canvas styling & scroll track height layout
├── index.html               # Canvas container & entry point
├── package.json             # Dependencies and scripts
└── vite.config.js           # Vite configuration
```

---

## 👤 Author

Crafted with passion by **loxiw**.

