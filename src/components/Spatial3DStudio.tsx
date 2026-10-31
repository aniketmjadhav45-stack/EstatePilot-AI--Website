/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import {
  Layers,
  Sun,
  Moon,
  Sunset,
  Eye,
  Maximize2,
  RotateCw,
  Compass,
  CheckCircle2,
  Sparkles,
  UserCheck,
  Building2,
  ChevronDown,
  ChevronUp,
  Sliders,
  Play,
  Pause,
  Info,
} from 'lucide-react';

export type TimeOfDay = 'midday' | 'golden' | 'twilight' | 'night';

interface HotspotData {
  id: string;
  title: string;
  category: string;
  buyerMatch?: string;
  description: string;
  position: [number, number, number];
  color: string;
}

export const Spatial3DStudio: React.FC<{ onOpenEarlyAccess?: () => void }> = ({
  onOpenEarlyAccess,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // Group references for exploded view
  const groundLevelGroupRef = useRef<THREE.Group | null>(null);
  const firstLevelGroupRef = useRef<THREE.Group | null>(null);
  const secondLevelGroupRef = useRef<THREE.Group | null>(null);
  const roofGroupRef = useRef<THREE.Group | null>(null);

  // Lighting references
  const sunLightRef = useRef<THREE.DirectionalLight | null>(null);
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);
  const interiorLightsRef = useRef<THREE.PointLight[]>([]);

  // State
  const [activeTab, setActiveTab] = useState<'explode' | 'lighting' | 'hotspots' | 'views'>('explode');
  const [isDockCollapsed, setIsDockCollapsed] = useState(false);
  const [explodeProgress, setExplodeProgress] = useState(0); // 0 (closed) to 1 (full explosion)
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('golden');
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>('hotspot-1');
  const [showHotspots, setShowHotspots] = useState(true);
  const [webglSupported, setWebglSupported] = useState(true);
  const [isSoftwareMode, setIsSoftwareMode] = useState(false);

  // Hotspots definitions in 3D world space
  const hotspots: HotspotData[] = useMemo(
    () => [
      {
        id: 'hotspot-1',
        title: 'Master Sky Residence & Balcony',
        category: 'AI Buyer Match',
        buyerMatch: 'Elena Rostova • 98% Compatibility',
        description:
          'Client preference flagged for dual sunset ocean views, private dressing suite, and smart sound isolation.',
        position: [1.8, 2.7, 0.4],
        color: '#6366f1',
      },
      {
        id: 'hotspot-2',
        title: 'Heated Infinity Lap Pool & Sunset Deck',
        category: 'Client Interest Hotspot',
        buyerMatch: 'Average virtual dwell time: 4.8 mins',
        description:
          'Zero-edge design with recessed linear mood lighting and integrated travertine sunbathing loungers.',
        position: [-2.4, 0.4, 1.6],
        color: '#06b6d4',
      },
      {
        id: 'hotspot-3',
        title: 'Double-Height Architectural Salon',
        category: 'AI Staging Engine',
        buyerMatch: 'Custom Italian Minimalist Layout',
        description:
          '13-foot glass curtain walls with integrated automated sheer drapery and floating monolithic hearth.',
        position: [-0.6, 1.2, -0.4],
        color: '#8b5cf6',
      },
      {
        id: 'hotspot-4',
        title: 'Smart Motor Court & Secure Access',
        category: 'Autonomous Showing',
        buyerMatch: 'Biometric QR Access Logged',
        description:
          'Permits verified broker entry for unattended luxury site tours with live interior telemetry monitoring.',
        position: [2.5, 0.3, -2.1],
        color: '#10b981',
      },
    ],
    []
  );

  // Screen positions for 2D floating markers
  const [hotspotScreenPositions, setHotspotScreenPositions] = useState<{
    [id: string]: { x: number; y: number; visible: boolean };
  }>({});

  // Helper: check for software WebGL
  const checkSoftwareGl = (gl: WebGLRenderingContext): boolean => {
    const dbg = gl.getExtension('WEBGL_debug_renderer_info');
    if (!dbg) return false;
    const renderer = gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) || '';
    return /llvmpipe|swiftshader|software/i.test(renderer);
  };

  // Build procedural architectural materials
  const createMaterials = () => {
    // Subtle concrete pattern via canvas
    const concreteCanvas = document.createElement('canvas');
    concreteCanvas.width = 256;
    concreteCanvas.height = 256;
    const ctx = concreteCanvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#f1f5f9';
      ctx.fillRect(0, 0, 256, 256);
      ctx.fillStyle = '#e2e8f0';
      for (let i = 0; i < 400; i++) {
        const x = Math.random() * 256;
        const y = Math.random() * 256;
        ctx.fillRect(x, y, 1.5, 1.5);
      }
    }
    const concreteTexture = new THREE.CanvasTexture(concreteCanvas);
    concreteTexture.wrapS = THREE.RepeatWrapping;
    concreteTexture.wrapT = THREE.RepeatWrapping;
    concreteTexture.repeat.set(4, 4);

    // Warm cedar wood texture via canvas
    const woodCanvas = document.createElement('canvas');
    woodCanvas.width = 128;
    woodCanvas.height = 128;
    const woodCtx = woodCanvas.getContext('2d');
    if (woodCtx) {
      woodCtx.fillStyle = '#9a3412';
      woodCtx.fillRect(0, 0, 128, 128);
      woodCtx.fillStyle = '#7c2d12';
      for (let y = 0; y < 128; y += 8) {
        woodCtx.fillRect(0, y, 128, 2);
      }
    }
    const woodTexture = new THREE.CanvasTexture(woodCanvas);
    woodTexture.wrapS = THREE.RepeatWrapping;
    woodTexture.wrapT = THREE.RepeatWrapping;
    woodTexture.repeat.set(2, 6);

    return {
      concrete: new THREE.MeshStandardMaterial({
        color: 0xf8fafc,
        roughness: 0.35,
        metalness: 0.05,
        map: concreteTexture,
      }),
      darkAccent: new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        roughness: 0.25,
        metalness: 0.4,
      }),
      woodLouvers: new THREE.MeshStandardMaterial({
        color: 0xc2410c,
        roughness: 0.5,
        metalness: 0.05,
        map: woodTexture,
      }),
      glass: new THREE.MeshPhysicalMaterial({
        color: 0xe0f2fe,
        transparent: true,
        opacity: 0.4,
        roughness: 0.05,
        metalness: 0.1,
        transmission: 0.85,
        ior: 1.52,
      }),
      poolWater: new THREE.MeshStandardMaterial({
        color: 0x0284c7,
        roughness: 0.1,
        metalness: 0.6,
        transparent: true,
        opacity: 0.82,
      }),
      travertine: new THREE.MeshStandardMaterial({
        color: 0xe2e8f0,
        roughness: 0.4,
        metalness: 0.02,
      }),
      lawn: new THREE.MeshStandardMaterial({
        color: 0x22c55e,
        roughness: 0.85,
        metalness: 0.0,
      }),
      interiorWarm: new THREE.MeshBasicMaterial({
        color: 0xffedd5,
      }),
      steelMullion: new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        roughness: 0.2,
        metalness: 0.8,
      }),
    };
  };

  // Construct procedural luxury villa model
  const buildArchitecturalModel = (materials: ReturnType<typeof createMaterials>) => {
    const root = new THREE.Group();

    // ----------------------------------------------------
    // LEVEL 0: Foundation, Terrain, Pool, and Terraces
    // ----------------------------------------------------
    const level0 = new THREE.Group();
    level0.name = 'level-0-foundation';

    // Main ground platform slab
    const groundGeo = new THREE.BoxGeometry(8, 0.4, 6.5);
    const groundMesh = new THREE.Mesh(groundGeo, materials.travertine);
    groundMesh.position.y = 0;
    groundMesh.receiveShadow = true;
    level0.add(groundMesh);

    // Manicured garden lawn strip
    const lawnGeo = new THREE.BoxGeometry(7.6, 0.05, 1.8);
    const lawnMesh = new THREE.Mesh(lawnGeo, materials.lawn);
    lawnMesh.position.set(0, 0.21, -2.1);
    lawnMesh.receiveShadow = true;
    level0.add(lawnMesh);

    // Luxury infinity pool
    const poolGeo = new THREE.BoxGeometry(3.6, 0.35, 1.8);
    const poolMesh = new THREE.Mesh(poolGeo, materials.poolWater);
    poolMesh.position.set(-2.0, 0.15, 1.8);
    level0.add(poolMesh);

    // Pool coping border (dark granite trim)
    const copingGeo = new THREE.BoxGeometry(3.8, 0.42, 2.0);
    const copingMesh = new THREE.Mesh(
      copingGeo,
      new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.3 })
    );
    copingMesh.position.set(-2.0, 0.08, 1.8);
    level0.add(copingMesh);

    // Motor court driveway
    const driveGeo = new THREE.BoxGeometry(2.4, 0.05, 3.2);
    const driveMesh = new THREE.Mesh(
      driveGeo,
      new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.6 })
    );
    driveMesh.position.set(2.6, 0.21, -1.4);
    level0.add(driveMesh);

    // Step stones to entrance
    for (let i = 0; i < 4; i++) {
      const step = new THREE.Mesh(
        new THREE.BoxGeometry(0.8, 0.08, 0.4),
        materials.concrete
      );
      step.position.set(0.2, 0.24, 0.8 + i * 0.5);
      level0.add(step);
    }

    root.add(level0);
    groundLevelGroupRef.current = level0;

    // ----------------------------------------------------
    // LEVEL 1: Ground Floor Grand Salon & Dining
    // ----------------------------------------------------
    const level1 = new THREE.Group();
    level1.name = 'level-1-salon';
    level1.position.y = 0.2;

    // Salon concrete floor plate
    const l1FloorGeo = new THREE.BoxGeometry(5.8, 0.15, 4.2);
    const l1Floor = new THREE.Mesh(l1FloorGeo, materials.concrete);
    l1Floor.position.set(-0.2, 0.1, 0);
    l1Floor.castShadow = true;
    l1Floor.receiveShadow = true;
    level1.add(l1Floor);

    // Solid concrete back spine wall
    const backWallGeo = new THREE.BoxGeometry(5.8, 1.5, 0.2);
    const backWall = new THREE.Mesh(backWallGeo, materials.darkAccent);
    backWall.position.set(-0.2, 0.9, -2.0);
    backWall.castShadow = true;
    level1.add(backWall);

    // Floor-to-ceiling glass curtain walls (Front & Pool facing)
    const glassFrontGeo = new THREE.BoxGeometry(3.6, 1.45, 0.05);
    const glassFront = new THREE.Mesh(glassFrontGeo, materials.glass);
    glassFront.position.set(-1.2, 0.9, 2.05);
    level1.add(glassFront);

    // Glass mullions
    for (let m = -2.8; m <= 0.4; m += 1.2) {
      const mullion = new THREE.Mesh(
        new THREE.BoxGeometry(0.04, 1.45, 0.08),
        materials.steelMullion
      );
      mullion.position.set(m, 0.9, 2.05);
      level1.add(mullion);
    }

    // Side glass wall towards pool
    const glassSideGeo = new THREE.BoxGeometry(0.05, 1.45, 4.0);
    const glassSide = new THREE.Mesh(glassSideGeo, materials.glass);
    glassSide.position.set(-3.05, 0.9, 0);
    level1.add(glassSide);

    // Interior minimalist furniture silhouettes
    // Sectional couch
    const sofaGeo = new THREE.BoxGeometry(1.6, 0.35, 0.8);
    const sofa = new THREE.Mesh(
      sofaGeo,
      new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.7 })
    );
    sofa.position.set(-1.4, 0.35, 0.4);
    sofa.castShadow = true;
    level1.add(sofa);

    // Coffee table
    const tableGeo = new THREE.BoxGeometry(1.0, 0.18, 0.5);
    const table = new THREE.Mesh(
      tableGeo,
      new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.2 })
    );
    table.position.set(-1.4, 0.25, -0.4);
    level1.add(table);

    // Kitchen island monolithic stone block
    const islandGeo = new THREE.BoxGeometry(1.4, 0.55, 0.6);
    const island = new THREE.Mesh(
      islandGeo,
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.15 })
    );
    island.position.set(1.4, 0.45, -0.6);
    island.castShadow = true;
    level1.add(island);

    // Slim architectural steel columns
    const colGeo = new THREE.CylinderGeometry(0.05, 0.05, 1.5, 16);
    const col1 = new THREE.Mesh(colGeo, materials.steelMullion);
    col1.position.set(0.8, 0.9, 2.0);
    level1.add(col1);

    const col2 = new THREE.Mesh(colGeo, materials.steelMullion);
    col2.position.set(-2.9, 0.9, 1.9);
    level1.add(col2);

    root.add(level1);
    firstLevelGroupRef.current = level1;

    // ----------------------------------------------------
    // LEVEL 2: Cantilevered Upper Penthouse Suite
    // ----------------------------------------------------
    const level2 = new THREE.Group();
    level2.name = 'level-2-penthouse';
    level2.position.y = 1.85;

    // Cantilevered floor slab extending over pool & garden
    const l2FloorGeo = new THREE.BoxGeometry(5.2, 0.18, 3.8);
    const l2Floor = new THREE.Mesh(l2FloorGeo, materials.concrete);
    l2Floor.position.set(0.6, 0.1, 0.2);
    l2Floor.castShadow = true;
    l2Floor.receiveShadow = true;
    level2.add(l2Floor);

    // Solid cantilevered wing box (Master suite)
    const suiteGeo = new THREE.BoxGeometry(3.6, 1.4, 2.8);
    const suite = new THREE.Mesh(suiteGeo, materials.concrete);
    suite.position.set(1.2, 0.85, 0);
    suite.castShadow = true;
    level2.add(suite);

    // Wood privacy louvers on bedroom facade
    for (let l = -1.2; l <= 1.2; l += 0.3) {
      const louver = new THREE.Mesh(
        new THREE.BoxGeometry(0.05, 1.3, 0.15),
        materials.woodLouvers
      );
      louver.position.set(3.05, 0.85, l);
      level2.add(louver);
    }

    // Glass balcony extension
    const balconyGlassGeo = new THREE.BoxGeometry(1.6, 0.5, 0.05);
    const balconyGlass = new THREE.Mesh(balconyGlassGeo, materials.glass);
    balconyGlass.position.set(-1.0, 0.45, 1.8);
    level2.add(balconyGlass);

    const balconyRailGeo = new THREE.BoxGeometry(1.6, 0.04, 0.06);
    const balconyRail = new THREE.Mesh(balconyRailGeo, materials.steelMullion);
    balconyRail.position.set(-1.0, 0.72, 1.8);
    level2.add(balconyRail);

    // Master bed platform
    const bedGeo = new THREE.BoxGeometry(1.3, 0.3, 1.5);
    const bed = new THREE.Mesh(
      bedGeo,
      new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.8 })
    );
    bed.position.set(1.4, 0.3, -0.2);
    level2.add(bed);

    root.add(level2);
    secondLevelGroupRef.current = level2;

    // ----------------------------------------------------
    // LEVEL 3: Floating Modernist Roof Terrace & Canopy
    // ----------------------------------------------------
    const level3 = new THREE.Group();
    level3.name = 'level-3-roof';
    level3.position.y = 3.4;

    // Thin floating cantilever roof slab
    const roofSlabGeo = new THREE.BoxGeometry(5.6, 0.14, 4.2);
    const roofSlab = new THREE.Mesh(roofSlabGeo, materials.darkAccent);
    roofSlab.position.set(0.6, 0.08, 0.1);
    roofSlab.castShadow = true;
    level3.add(roofSlab);

    // Architectural pergola slats on roof deck
    for (let p = -1.5; p <= 1.5; p += 0.45) {
      const slat = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 0.2, 1.8),
        materials.woodLouvers
      );
      slat.position.set(-1.0, 0.22, p * 0.5);
      level3.add(slat);
    }

    // Modern glass skylight cutout over stair core
    const skylightGeo = new THREE.BoxGeometry(1.2, 0.08, 1.2);
    const skylight = new THREE.Mesh(skylightGeo, materials.glass);
    skylight.position.set(0.2, 0.18, -0.6);
    level3.add(skylight);

    root.add(level3);
    roofGroupRef.current = level3;

    return root;
  };

  // Update lighting based on time of day preset
  const applyLightingPreset = (preset: TimeOfDay) => {
    if (!sunLightRef.current || !ambientLightRef.current || !sceneRef.current) return;

    const sun = sunLightRef.current;
    const ambient = ambientLightRef.current;
    const interiors = interiorLightsRef.current;

    switch (preset) {
      case 'golden':
        sun.color.setHex(0xffaa44);
        sun.intensity = 2.4;
        sun.position.set(12, 5, 8);
        ambient.color.setHex(0xffe4cc);
        ambient.intensity = 0.85;
        sceneRef.current.background = new THREE.Color(0xfbfcfe);
        interiors.forEach((light) => {
          light.intensity = 1.2;
          light.color.setHex(0xffc278);
        });
        break;

      case 'midday':
        sun.color.setHex(0xffffff);
        sun.intensity = 3.2;
        sun.position.set(4, 16, 6);
        ambient.color.setHex(0xf1f5f9);
        ambient.intensity = 1.1;
        sceneRef.current.background = new THREE.Color(0xf8fafc);
        interiors.forEach((light) => {
          light.intensity = 0.4;
        });
        break;

      case 'twilight':
        sun.color.setHex(0xf472b6);
        sun.intensity = 1.2;
        sun.position.set(-14, 3, -6);
        ambient.color.setHex(0x312e81);
        ambient.intensity = 0.6;
        sceneRef.current.background = new THREE.Color(0x0f172a);
        interiors.forEach((light) => {
          light.intensity = 3.4;
          light.color.setHex(0xfdba74);
        });
        break;

      case 'night':
        sun.color.setHex(0x38bdf8);
        sun.intensity = 0.35;
        sun.position.set(8, 12, -8);
        ambient.color.setHex(0x0f172a);
        ambient.intensity = 0.3;
        sceneRef.current.background = new THREE.Color(0x020617);
        interiors.forEach((light) => {
          light.intensity = 4.2;
          light.color.setHex(0xfeb272);
        });
        break;
    }
  };

  // Camera presets
  const applyCameraPreset = (viewName: 'aerial' | 'front' | 'sunset' | 'blueprint') => {
    if (!cameraRef.current || !controlsRef.current) return;
    const cam = cameraRef.current;
    const ctrl = controlsRef.current;

    ctrl.autoRotate = false;
    setAutoRotate(false);

    switch (viewName) {
      case 'aerial':
        cam.position.set(9, 8, 11);
        ctrl.target.set(0, 1.2, 0);
        break;
      case 'front':
        cam.position.set(0.2, 2.0, 9.5);
        ctrl.target.set(0, 1.4, 0);
        break;
      case 'sunset':
        cam.position.set(-8.5, 3.2, 5.5);
        ctrl.target.set(-0.5, 1.2, 0);
        break;
      case 'blueprint':
        cam.position.set(0.1, 14, 0.1);
        ctrl.target.set(0, 0.5, 0);
        break;
    }
    ctrl.update();
  };

  // Initialize Three.js scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0xfbfcfe);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(8.5, 6.2, 9.8);
    cameraRef.current = camera;

    // 3. Renderer with antialiasing and shadow map
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglSupported(false);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Check for software GL
    const isSoft = checkSoftwareGl(renderer.getContext());
    setIsSoftwareMode(isSoft);
    if (isSoft) {
      renderer.setPixelRatio(1);
      renderer.shadowMap.enabled = false;
    }

    // 4. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 5;
    controls.maxDistance = 22;
    controls.maxPolarAngle = Math.PI / 2 - 0.04; // Keep camera above horizon
    controls.target.set(0, 1.2, 0);
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 1.0;
    controlsRef.current = controls;

    // 5. Environment Map using RoomEnvironment (PBR reflections without external assets)
    const pmremGen = new THREE.PMREMGenerator(renderer);
    pmremGen.compileEquirectangularShader();
    const envTexture = pmremGen.fromScene(new RoomEnvironment()).texture;
    scene.environment = envTexture;

    // 6. Architectural Materials & Geometry
    const materials = createMaterials();
    const buildingModel = buildArchitecturalModel(materials);
    scene.add(buildingModel);

    // 7. Directional Sun Light & Ambient Fill
    const sunLight = new THREE.DirectionalLight(0xffffff, 2.5);
    sunLight.position.set(10, 12, 8);
    sunLight.castShadow = !isSoft;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 30;
    const shadowDist = 7;
    sunLight.shadow.camera.left = -shadowDist;
    sunLight.shadow.camera.right = shadowDist;
    sunLight.shadow.camera.top = shadowDist;
    sunLight.shadow.camera.bottom = -shadowDist;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);
    sunLightRef.current = sunLight;

    const ambientLight = new THREE.AmbientLight(0xf8fafc, 0.85);
    scene.add(ambientLight);
    ambientLightRef.current = ambientLight;

    // Interior warm accent point lights
    const interiorL1 = new THREE.PointLight(0xffcaa0, 1.8, 6);
    interiorL1.position.set(-0.5, 1.1, 0);
    scene.add(interiorL1);

    const interiorL2 = new THREE.PointLight(0xffd8b4, 1.6, 5);
    interiorL2.position.set(1.5, 2.4, 0);
    scene.add(interiorL2);

    interiorLightsRef.current = [interiorL1, interiorL2];

    // Apply default lighting
    applyLightingPreset(timeOfDay);

    // 8. Animation & Render Loop
    let isDisposed = false;
    const tempVec = new THREE.Vector3();

    const animate = () => {
      if (isDisposed) return;
      animFrameIdRef.current = requestAnimationFrame(animate);

      controls.update();

      // Project hotspots to 2D screen coordinates
      const positions: { [id: string]: { x: number; y: number; visible: boolean } } = {};
      const rect = container.getBoundingClientRect();

      hotspots.forEach((hs) => {
        // Adjust hotspot height dynamically according to layer explosion
        let yOffset = 0;
        if (hs.id === 'hotspot-1') {
          yOffset = explodeProgress * 1.6; // Level 2
        } else if (hs.id === 'hotspot-3') {
          yOffset = explodeProgress * 0.8; // Level 1
        }

        tempVec.set(hs.position[0], hs.position[1] + yOffset, hs.position[2]);
        tempVec.project(camera);

        const isBehind = tempVec.z > 1;
        const xPercent = (tempVec.x * 0.5 + 0.5) * 100;
        const yPercent = (-tempVec.y * 0.5 + 0.5) * 100;

        positions[hs.id] = {
          x: xPercent,
          y: yPercent,
          visible: !isBehind && xPercent >= 0 && xPercent <= 100 && yPercent >= 0 && yPercent <= 100,
        };
      });

      setHotspotScreenPositions(positions);

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        if (newW > 0 && newH > 0) {
          camera.aspect = newW / newH;
          camera.updateProjectionMatrix();
          renderer.setSize(newW, newH);
        }
      }
    });

    resizeObserver.observe(container);

    // 10. Clean Cleanup
    return () => {
      isDisposed = true;
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      resizeObserver.disconnect();
      controls.dispose();

      // Dispose geometries & materials
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });

      pmremGen.dispose();
      envTexture.dispose();
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update controls auto-rotation state
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate;
    }
  }, [autoRotate]);

  // Handle layer separation on explode progress change
  useEffect(() => {
    if (!firstLevelGroupRef.current || !secondLevelGroupRef.current || !roofGroupRef.current) return;

    // Ground level stays seated
    // First floor lifts gently: 0 to 0.8
    firstLevelGroupRef.current.position.y = 0.2 + explodeProgress * 0.8;

    // Second floor lifts further: 1.85 to 1.85 + 1.6
    secondLevelGroupRef.current.position.y = 1.85 + explodeProgress * 1.6;

    // Roof lifts highest: 3.4 to 3.4 + 2.5
    roofGroupRef.current.position.y = 3.4 + explodeProgress * 2.5;
  }, [explodeProgress]);

  // Handle lighting preset changes
  useEffect(() => {
    applyLightingPreset(timeOfDay);
  }, [timeOfDay]);

  // Focus camera on selected hotspot
  const handleSelectHotspot = (hotspot: HotspotData) => {
    setActiveHotspotId(hotspot.id);
    if (!controlsRef.current || !cameraRef.current) return;

    controlsRef.current.autoRotate = false;
    setAutoRotate(false);

    let yOffset = 0;
    if (hotspot.id === 'hotspot-1') yOffset = explodeProgress * 1.6;
    if (hotspot.id === 'hotspot-3') yOffset = explodeProgress * 0.8;

    controlsRef.current.target.set(
      hotspot.position[0],
      hotspot.position[1] + yOffset,
      hotspot.position[2]
    );
    controlsRef.current.update();
  };

  const activeHotspot = hotspots.find((h) => h.id === activeHotspotId) || hotspots[0];

  return (
    <section id="spatial-studio" className="py-20 lg:py-28 bg-white border-y border-slate-200/80 relative overflow-hidden">
      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive 3D Digital Twin Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Explore Properties in <span className="text-indigo-600">3D Spatial Reality.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            EstatePilot AI transforms static floor plans and photos into real-time interactive 3D digital twins.
            Agents can explode architectural levels, test natural solar daylight, and overlay live buyer intent hotspots
            during client walkthroughs.
          </p>
        </div>

        {/* 3D Canvas Showcase Container */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl border border-slate-200 bg-slate-900/5 shadow-2xl overflow-hidden">
          {/* Main 3D Viewport */}
          <div
            ref={mountRef}
            className={`w-full h-[520px] sm:h-[620px] lg:h-[700px] cursor-grab active:cursor-grabbing transition-colors duration-700 ${
              timeOfDay === 'twilight' || timeOfDay === 'night' ? 'bg-slate-950' : 'bg-slate-50'
            }`}
          >
            {/* Fallback warning if WebGL is unavailable */}
            {!webglSupported && (
              <div className="absolute inset-0 flex items-center justify-center p-6 text-center bg-slate-100">
                <div className="max-w-md p-6 bg-white rounded-xl shadow-lg border border-slate-200">
                  <Building2 className="w-10 h-10 text-indigo-600 mx-auto mb-3" />
                  <h4 className="text-lg font-bold text-slate-900">3D Viewport Accelerated</h4>
                  <p className="text-sm text-slate-600 mt-2">
                    Hardware-accelerated WebGL is disabled or not supported in this browser instance.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Top HUD Bar: Interaction Guide & Quick Badges */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
            {/* Property Badge */}
            <div className="pointer-events-auto bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-200/90 shadow-sm flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">Villa Azure • Digital Twin #EP-4920</span>
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">
                    4-Level Spatial Model
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 hidden sm:block">
                  Drag to rotate • Scroll to zoom • Pinch on mobile
                </p>
              </div>
            </div>

            {/* Quick action controls (Auto-rotate toggle & Fullscreen prompt) */}
            <div className="pointer-events-auto flex items-center gap-2">
              <button
                type="button"
                onClick={() => setAutoRotate(!autoRotate)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold backdrop-blur-md border transition-all ${
                  autoRotate
                    ? 'bg-indigo-600 text-white border-indigo-700 shadow-sm'
                    : 'bg-white/90 text-slate-700 border-slate-200 hover:bg-white'
                }`}
                title="Toggle continuous cinematic 360° rotation"
              >
                {autoRotate ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{autoRotate ? 'Auto Orbiting' : 'Rotate'}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowHotspots(!showHotspots)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold backdrop-blur-md border transition-all ${
                  showHotspots
                    ? 'bg-white/95 text-indigo-600 border-indigo-200 shadow-sm'
                    : 'bg-white/80 text-slate-500 border-slate-200 hover:bg-white'
                }`}
                title="Toggle AI buyer hotspots"
              >
                <Eye className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">AI Hotspots</span>
              </button>
            </div>
          </div>

          {/* 3D Floating Hotspot Pins overlaying the canvas */}
          {showHotspots &&
            hotspots.map((hs) => {
              const pos = hotspotScreenPositions[hs.id];
              if (!pos || !pos.visible) return null;
              const isSelected = activeHotspotId === hs.id;

              return (
                <div
                  key={hs.id}
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  className="absolute pointer-events-auto z-30 transition-transform duration-100 ease-out"
                >
                  <button
                    type="button"
                    onClick={() => handleSelectHotspot(hs)}
                    className="group relative flex items-center justify-center focus:outline-hidden"
                  >
                    {/* Ring ping pulse */}
                    <span
                      style={{ backgroundColor: hs.color }}
                      className={`absolute inline-flex h-7 w-7 rounded-full opacity-60 animate-ping ${
                        isSelected ? 'scale-125' : 'scale-100'
                      }`}
                    />
                    {/* Central hotspot icon button */}
                    <span
                      style={{ backgroundColor: hs.color }}
                      className={`relative inline-flex items-center justify-center w-6 h-6 rounded-full text-white shadow-lg border-2 border-white transition-all transform ${
                        isSelected ? 'scale-125 ring-2 ring-indigo-400' : 'hover:scale-110'
                      }`}
                    >
                      <Sparkles className="w-3 h-3" />
                    </span>

                    {/* Popover Card when selected or hovered */}
                    {isSelected && (
                      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-56 sm:w-64 p-3 rounded-xl bg-slate-900/95 backdrop-blur-md text-white shadow-2xl border border-slate-700 pointer-events-auto animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between text-[10px] uppercase font-bold text-indigo-400 tracking-wider">
                          <span>{hs.category}</span>
                          <span className="text-slate-400">EP-AI</span>
                        </div>
                        <h5 className="text-xs font-bold text-white mt-0.5 leading-snug">
                          {hs.title}
                        </h5>
                        {hs.buyerMatch && (
                          <div className="mt-1 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-800/60">
                            <UserCheck className="w-3 h-3 shrink-0" />
                            <span className="truncate">{hs.buyerMatch}</span>
                          </div>
                        )}
                        <p className="mt-1.5 text-[11px] text-slate-300 leading-relaxed">
                          {hs.description}
                        </p>
                      </div>
                    )}
                  </button>
                </div>
              );
            })}

          {/* Collapsible Bottom Control Dock (per threejs skill §5) */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-xl z-30">
            <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-2xl rounded-2xl overflow-hidden transition-all duration-300">
              {/* Dock Header & Tab Navigation */}
              <div className="px-3 py-2 bg-slate-50/90 border-b border-slate-200/80 flex items-center justify-between gap-1">
                {/* Tabs */}
                <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('explode');
                      setIsDockCollapsed(false);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      activeTab === 'explode' && !isDockCollapsed
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Exploded Floors</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('lighting');
                      setIsDockCollapsed(false);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      activeTab === 'lighting' && !isDockCollapsed
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                    }`}
                  >
                    <Sun className="w-3.5 h-3.5" />
                    <span>Sun & Shadows</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('hotspots');
                      setIsDockCollapsed(false);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      activeTab === 'hotspots' && !isDockCollapsed
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Buyer Hotspots</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('views');
                      setIsDockCollapsed(false);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      activeTab === 'views' && !isDockCollapsed
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                    }`}
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>Cameras</span>
                  </button>
                </div>

                {/* Collapse / Expand Toggle */}
                <button
                  type="button"
                  onClick={() => setIsDockCollapsed(!isDockCollapsed)}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors ml-1"
                  aria-label={isDockCollapsed ? 'Expand Dock' : 'Collapse Dock'}
                >
                  {isDockCollapsed ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Dock Tab Content (Collapsible) */}
              {!isDockCollapsed && (
                <div className="p-4">
                  {/* TAB 1: Exploded View Slider */}
                  {activeTab === 'explode' && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                          <Sliders className="w-3.5 h-3.5 text-indigo-600" />
                          Floor Separation: {Math.round(explodeProgress * 100)}%
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setExplodeProgress(0)}
                            className="text-[11px] font-medium text-slate-500 hover:text-indigo-600 px-2 py-0.5 rounded-md hover:bg-slate-100"
                          >
                            Reset
                          </button>
                          <button
                            type="button"
                            onClick={() => setExplodeProgress(1)}
                            className="text-[11px] font-medium text-indigo-600 hover:text-indigo-700 px-2 py-0.5 rounded-md hover:bg-indigo-50"
                          >
                            Explode All
                          </button>
                        </div>
                      </div>

                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={explodeProgress}
                        onChange={(e) => setExplodeProgress(parseFloat(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      />

                      {/* Interactive Floor Badges */}
                      <div className="grid grid-cols-4 gap-2 mt-3 pt-2 border-t border-slate-100 text-center">
                        <button
                          type="button"
                          onClick={() => setExplodeProgress(0)}
                          className={`p-1.5 rounded-lg border text-left sm:text-center transition-all ${
                            explodeProgress < 0.15
                              ? 'bg-indigo-50 border-indigo-300 text-indigo-900 ring-1 ring-indigo-400'
                              : 'bg-slate-50 border-slate-200/60 hover:bg-slate-100 text-slate-700'
                          }`}
                        >
                          <div className="text-[10px] font-bold text-slate-500 uppercase">L0 Ground</div>
                          <div className="text-xs font-semibold truncate">Pool & Grounds</div>
                        </button>
                        <button
                          type="button"
                          onClick={() => setExplodeProgress(0.35)}
                          className={`p-1.5 rounded-lg border text-left sm:text-center transition-all ${
                            explodeProgress >= 0.15 && explodeProgress < 0.5
                              ? 'bg-indigo-50 border-indigo-300 text-indigo-900 ring-1 ring-indigo-400'
                              : 'bg-slate-50 border-slate-200/60 hover:bg-slate-100 text-slate-700'
                          }`}
                        >
                          <div className="text-[10px] font-bold text-slate-500 uppercase">L1 Main</div>
                          <div className="text-xs font-semibold truncate">Salon & Dining</div>
                        </button>
                        <button
                          type="button"
                          onClick={() => setExplodeProgress(0.7)}
                          className={`p-1.5 rounded-lg border text-left sm:text-center transition-all ${
                            explodeProgress >= 0.5 && explodeProgress < 0.85
                              ? 'bg-indigo-50 border-indigo-300 text-indigo-900 ring-1 ring-indigo-400'
                              : 'bg-slate-50 border-slate-200/60 hover:bg-slate-100 text-slate-700'
                          }`}
                        >
                          <div className="text-[10px] font-bold text-slate-500 uppercase">L2 Upper</div>
                          <div className="text-xs font-semibold truncate">Master Suites</div>
                        </button>
                        <button
                          type="button"
                          onClick={() => setExplodeProgress(1)}
                          className={`p-1.5 rounded-lg border text-left sm:text-center transition-all ${
                            explodeProgress >= 0.85
                              ? 'bg-indigo-50 border-indigo-300 text-indigo-900 ring-1 ring-indigo-400'
                              : 'bg-slate-50 border-slate-200/60 hover:bg-slate-100 text-slate-700'
                          }`}
                        >
                          <div className="text-[10px] font-bold text-slate-500 uppercase">L3 Roof</div>
                          <div className="text-xs font-semibold truncate">Sky Pergola</div>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: Solar & Lighting Presets */}
                  {activeTab === 'lighting' && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-slate-800">
                          Solar Angle & Atmosphere Simulation
                        </span>
                        <span className="text-[11px] text-slate-500 capitalize">{timeOfDay} light</span>
                      </div>

                      <div className="grid grid-cols-4 gap-2">
                        <button
                          type="button"
                          onClick={() => setTimeOfDay('golden')}
                          className={`p-2 rounded-xl text-left border transition-all ${
                            timeOfDay === 'golden'
                              ? 'bg-amber-50 border-amber-300 text-amber-900 ring-2 ring-amber-400/50'
                              : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <Sunset className="w-4 h-4 text-amber-500 mb-1" />
                          <div className="text-xs font-bold">Golden Hour</div>
                          <div className="text-[10px] text-slate-500">5:45 PM Amber</div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setTimeOfDay('midday')}
                          className={`p-2 rounded-xl text-left border transition-all ${
                            timeOfDay === 'midday'
                              ? 'bg-blue-50 border-blue-300 text-blue-900 ring-2 ring-blue-400/50'
                              : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <Sun className="w-4 h-4 text-blue-500 mb-1" />
                          <div className="text-xs font-bold">Midday Sun</div>
                          <div className="text-[10px] text-slate-500">1:00 PM Clear</div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setTimeOfDay('twilight')}
                          className={`p-2 rounded-xl text-left border transition-all ${
                            timeOfDay === 'twilight'
                              ? 'bg-purple-50 border-purple-300 text-purple-900 ring-2 ring-purple-400/50'
                              : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <Sunset className="w-4 h-4 text-purple-500 mb-1" />
                          <div className="text-xs font-bold">Twilight Dusk</div>
                          <div className="text-[10px] text-slate-500">8:15 PM Glow</div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setTimeOfDay('night')}
                          className={`p-2 rounded-xl text-left border transition-all ${
                            timeOfDay === 'night'
                              ? 'bg-indigo-950 border-indigo-700 text-white ring-2 ring-indigo-500/50'
                              : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <Moon className="w-4 h-4 text-indigo-400 mb-1" />
                          <div className="text-xs font-bold">Night Mode</div>
                          <div className="text-[10px] text-slate-400">Interior Lamps</div>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: AI Buyer Hotspots List */}
                  {activeTab === 'hotspots' && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-slate-800">
                          Active Client Telemetry Pins
                        </span>
                        <span className="text-[11px] text-indigo-600 font-medium">Click to orbit</span>
                      </div>

                      <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                        {hotspots.map((h) => (
                          <button
                            key={h.id}
                            type="button"
                            onClick={() => handleSelectHotspot(h)}
                            className={`w-full text-left p-2 rounded-xl border flex items-center justify-between transition-all ${
                              activeHotspotId === h.id
                                ? 'bg-indigo-50/80 border-indigo-300 text-indigo-950'
                                : 'bg-white border-slate-200/80 hover:bg-slate-50 text-slate-700'
                            }`}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <span
                                style={{ backgroundColor: h.color }}
                                className="w-2.5 h-2.5 rounded-full shrink-0"
                              />
                              <div className="truncate">
                                <div className="text-xs font-bold truncate">{h.title}</div>
                                <div className="text-[10px] text-slate-500 truncate">{h.category}</div>
                              </div>
                            </div>
                            <span className="text-[11px] font-semibold text-indigo-600 shrink-0 ml-2">
                              Inspect
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 4: Camera Perspectives */}
                  {activeTab === 'views' && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-slate-800">
                          Preset Viewing Angles
                        </span>
                        <span className="text-[11px] text-slate-500">Smooth Damped Camera</span>
                      </div>

                      <div className="grid grid-cols-4 gap-2">
                        <button
                          type="button"
                          onClick={() => applyCameraPreset('aerial')}
                          className="p-2 rounded-xl text-center bg-white border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 text-slate-700 transition-colors"
                        >
                          <Maximize2 className="w-4 h-4 mx-auto text-indigo-600 mb-1" />
                          <div className="text-xs font-semibold">Aerial 45°</div>
                        </button>

                        <button
                          type="button"
                          onClick={() => applyCameraPreset('front')}
                          className="p-2 rounded-xl text-center bg-white border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 text-slate-700 transition-colors"
                        >
                          <Building2 className="w-4 h-4 mx-auto text-indigo-600 mb-1" />
                          <div className="text-xs font-semibold">Front Elevation</div>
                        </button>

                        <button
                          type="button"
                          onClick={() => applyCameraPreset('sunset')}
                          className="p-2 rounded-xl text-center bg-white border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 text-slate-700 transition-colors"
                        >
                          <Sunset className="w-4 h-4 mx-auto text-indigo-600 mb-1" />
                          <div className="text-xs font-semibold">Sunset Deck</div>
                        </button>

                        <button
                          type="button"
                          onClick={() => applyCameraPreset('blueprint')}
                          className="p-2 rounded-xl text-center bg-white border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 text-slate-700 transition-colors"
                        >
                          <Layers className="w-4 h-4 mx-auto text-indigo-600 mb-1" />
                          <div className="text-xs font-semibold">Blueprint Top</div>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 3 Value Pillars showing how users benefit from the 3D tool */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-indigo-200 transition-colors group">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold mb-4 group-hover:scale-105 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Multi-Story Architectural Exploded Views</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Show remote high-net-worth buyers precise room layout relationships, structural ceiling heights, and outdoor integration before physical visits.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-indigo-200 transition-colors group">
            <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center font-bold mb-4 group-hover:scale-105 transition-transform">
              <Sun className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Real Solar & Shadow Simulation</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Calculate exact natural daylighting at any hour of the day to demonstrate pool deck sunshine, morning terrace illumination, and twilight mood.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-indigo-200 transition-colors group">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold mb-4 group-hover:scale-105 transition-transform">
              <UserCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">AI Buyer Telemetry & Intent Hotspots</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Overlay real-time CRM buyer profiles and attention dwell times onto 3D spaces so agents know exactly which rooms to highlight during closing pitches.
            </p>
          </div>
        </div>

        {/* Call to Action Bar */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <div className="inline-flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Available in Professional, Agency & Enterprise Tiers</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-bold">
              Turn your property listings into interactive 3D twins today.
            </h4>
            <p className="text-sm text-slate-300 mt-1 max-w-xl">
              Compatible with Matterport scans, CAD blueprints, BIM files, and drone photogrammetry.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenEarlyAccess}
            className="w-full sm:w-auto shrink-0 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg hover:shadow-indigo-500/25 transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-400"
          >
            Request 3D Studio Access
          </button>
        </div>
      </div>
    </section>
  );
};
