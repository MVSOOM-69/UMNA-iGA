
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js";

// UMNA-IGA — IMMERSIVE 3D ARCHITECTURE

(() => {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  // Keep website content above the 3D background.
  hero.querySelectorAll(":scope > *").forEach((element) => {
    if (element.tagName !== "CANVAS") {
      element.style.position = "relative";
      element.style.zIndex = "2";
    }
  });

  const canvas = document.createElement("canvas");
  canvas.id = "umna-3d-scene";

  Object.assign(canvas.style, {
    position: "absolute",
    inset: "0",
    width: "100%",
    height: "100%",
    zIndex: "0",
    pointerEvents: "none"
  });

  hero.prepend(canvas);

  // Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "low-power"
  });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;

  // Scene and camera
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    38,
    1,
    0.1,
    100
  );

  camera.position.set(0, 0.1, 9);

  // Lighting
  scene.add(new THREE.AmbientLight(0xd9e7d7, 1.5));

  const goldLight = new THREE.PointLight(
    0xd8b36a,
    35,
    15
  );

  goldLight.position.set(0, 2.5, 4);
  scene.add(goldLight);

  const sideLight = new THREE.DirectionalLight(
    0x9fc5a9,
    2
  );

  sideLight.position.set(-4, 4, 5);
  scene.add(sideLight);

  // Materials
  const emerald = new THREE.MeshStandardMaterial({
    color: 0x123f35,
    metalness: 0.55,
    roughness: 0.3
  });

  const darkEmerald = new THREE.MeshStandardMaterial({
    color: 0x092c26,
    metalness: 0.4,
    roughness: 0.38
  });

  const gold = new THREE.MeshStandardMaterial({
    color: 0xb3945b,
    metalness: 0.8,
    roughness: 0.23
  });

  const goldLightMaterial = new THREE.MeshStandardMaterial({
    color: 0xd9bd80,
    metalness: 0.7,
    roughness: 0.25
  });

  // Islamic pointed arch geometry
  function createArch(width, height, depth, material) {
    const shape = new THREE.Shape();

    shape.moveTo(-width / 2, -height / 2);
    shape.lineTo(-width / 2, height * 0.12);

    shape.quadraticCurveTo(
      -width / 2,
      height * 0.43,
      0,
      height / 2
    );

    shape.quadraticCurveTo(
      width / 2,
      height * 0.43,
      width / 2,
      height * 0.12
    );

    shape.lineTo(width / 2, -height / 2);
    shape.closePath();

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.035,
      bevelThickness: 0.035
    });

    geometry.computeVertexNormals();

    return new THREE.Mesh(geometry, material);
  }

  const architecture = new THREE.Group();
  scene.add(architecture);

  // Outer architectural frame
  const outerArch = createArch(
    5.1,
    6.1,
    0.32,
    darkEmerald
  );

  outerArch.position.set(0, 0, -1.1);
  architecture.add(outerArch);

  // Gold architectural frame
  const goldArch = createArch(
    4.55,
    5.55,
    0.12,
    gold
  );

  goldArch.position.set(0, 0, -0.72);
  architecture.add(goldArch);

  // Main emerald arch
  const mainArch = createArch(
    4.35,
    5.35,
    0.3,
    emerald
  );

  mainArch.position.set(0, 0, -0.48);
  architecture.add(mainArch);

  // Inner illuminated arch
  const innerArch = createArch(
    3.15,
    4.35,
    0.08,
    goldLightMaterial
  );

  innerArch.position.set(0, 0, -0.05);
  architecture.add(innerArch);

  // Dark interior
  const interior = createArch(
    3.02,
    4.22,
    0.04,
    darkEmerald
  );

  interior.position.set(0, 0, 0.08);
  architecture.add(interior);

  // Columns
  function addColumn(x, z) {
    const column = new THREE.Group();

    const shaft = new THREE.Mesh(
      new THREE.CylinderGeometry(0.105, 0.15, 2.9, 16),
      emerald
    );

    shaft.position.y = -0.85;
    column.add(shaft);

    const capital = new THREE.Mesh(
      new THREE.CylinderGeometry(0.23, 0.17, 0.2, 16),
      gold
    );

    capital.position.y = 0.65;
    column.add(capital);

    const base = new THREE.Mesh(
      new THREE.CylinderGeometry(0.2, 0.23, 0.18, 16),
      gold
    );

    base.position.y = -2.3;
    column.add(base);

    column.position.set(x, -0.1, z);
    architecture.add(column);
  }

  addColumn(-2.25, 0.15);
  addColumn(2.25, 0.15);

  // Architectural platform
  const platform = new THREE.Mesh(
    new THREE.BoxGeometry(5.4, 0.16, 2.3),
    darkEmerald
  );

  platform.position.set(0, -2.8, 0);
  architecture.add(platform);

  const platformEdge = new THREE.Mesh(
    new THREE.BoxGeometry(5.45, 0.055, 2.35),
    gold
  );

  platformEdge.position.set(0, -2.7, 0);
  architecture.add(platformEdge);

  // Decorative geometric stars
  const ornaments = new THREE.Group();
  architecture.add(ornaments);

  for (let i = 0; i < 8; i++) {
    const angle = (Math.PI * 2 * i) / 8;

    const ornament = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.075, 0),
      goldLightMaterial
    );

    ornament.position.set(
      Math.cos(angle) * 2.05,
      Math.sin(angle) * 2.05 + 0.15,
      0.28
    );

    ornaments.add(ornament);
  }

  // Floating golden particles
  const particleCount = 90;
  const particlePositions = new Float32Array(
    particleCount * 3
  );

  for (let i = 0; i < particleCount; i++) {
    particlePositions[i * 3] = (Math.random() - 0.5) * 9;
    particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 7;
    particlePositions[i * 3 + 2] = Math.random() * 3 - 1;
  }

  const particleGeometry = new THREE.BufferGeometry();

  particleGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(particlePositions, 3)
  );

  const particleMaterial = new THREE.PointsMaterial({
    color: 0xd9bd80,
    size: 0.035,
    transparent: true,
    opacity: 0.65
  });

  const particles = new THREE.Points(
    particleGeometry,
    particleMaterial
  );

  scene.add(particles);

  // Responsive dimensions
  function resize() {
    const width = hero.clientWidth;
    const height = hero.clientHeight;

    if (!width || !height) return;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height, false);

    const mobile = width < 600;

    camera.position.z = mobile ? 10.5 : 9;

    architecture.scale.setScalar(mobile ? 0.72 : 0.9);
    architecture.position.y = mobile ? -0.15 : 0;
  }

  resize();
  window.addEventListener("resize", resize);

  // Subtle mouse and touch movement
  let targetX = 0;
  let targetY = 0;

  function pointerMove(event) {
    const rect = hero.getBoundingClientRect();

    targetX = (
      (event.clientX - rect.left) / rect.width - 0.5
    ) * 0.16;

    targetY = (
      (event.clientY - rect.top) / rect.height - 0.5
    ) * 0.1;
  }

  hero.addEventListener("pointermove", pointerMove);

  // Animation
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  let animationId;
  let time = 0;

  function animate() {
    animationId = requestAnimationFrame(animate);

    if (!reducedMotion) {
      time += 0.008;

      architecture.rotation.y += (
        targetX - architecture.rotation.y
      ) * 0.025;

      architecture.rotation.x += (
        targetY - architecture.rotation.x
      ) * 0.025;

      ornaments.rotation.z = Math.sin(time) * 0.025;

      particles.rotation.y += 0.0005;

      goldLight.intensity = 35 + Math.sin(time * 1.5) * 4;
    }

    renderer.render(scene, camera);
  }

  animate();

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(animationId);
    } else {
      cancelAnimationFrame(animationId);
      animate();
    }
  });
})();
 
