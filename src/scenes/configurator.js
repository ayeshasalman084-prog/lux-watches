import * as THREE from 'three';

export function initConfigurator(container) {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0.1);
    container.appendChild(renderer.domElement);
    
    camera.position.z = 3;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Create configurable watch
    const watchGroup = new THREE.Group();
    
    // Watch case (will change material)
    const caseGeometry = new THREE.CylinderGeometry(1, 1, 0.3, 64);
    const caseMaterial = new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        metalness: 0.9,
        roughness: 0.2,
    });
    const watchCase = new THREE.Mesh(caseGeometry, caseMaterial);
    watchGroup.add(watchCase);

    // Watch dial (will change color)
    const dialGeometry = new THREE.CircleGeometry(0.95, 64);
    const dialMaterial = new THREE.MeshStandardMaterial({
        color: 0x1a1a1a,
        metalness: 0.3,
        roughness: 0.4,
    });
    const dial = new THREE.Mesh(dialGeometry, dialMaterial);
    dial.position.z = 0.16;
    watchGroup.add(dial);

    // Watch strap (will change)
    const strapGeometry = new THREE.BoxGeometry(2, 0.3, 0.1);
    const strapMaterial = new THREE.MeshStandardMaterial({
        color: 0x2d2d2d,
        metalness: 0.1,
        roughness: 0.7,
    });
    const strap = new THREE.Mesh(strapGeometry, strapMaterial);
    strap.position.y = -0.8;
    watchGroup.add(strap);

    scene.add(watchGroup);

    // Configuration options
    const materials = {
        steel: { color: 0xc0c0c0, metalness: 0.9, roughness: 0.2 },
        titanium: { color: 0x8b8680, metalness: 0.8, roughness: 0.3 },
        'rose-gold': { color: 0xb76e79, metalness: 0.85, roughness: 0.25 },
        platinum: { color: 0xe5e5e5, metalness: 0.95, roughness: 0.15 },
    };

    const dialColors = {
        black: 0x1a1a1a,
        white: 0xffffff,
        blue: 0x0066cc,
        green: 0x2d5016,
        burgundy: 0x8b0000,
    };

    const straps = {
        leather: { color: 0x2d2d2d, metalness: 0.1, roughness: 0.7 },
        metal: { color: 0xc0c0c0, metalness: 0.8, roughness: 0.3 },
        rubber: { color: 0x1a1a1a, metalness: 0.0, roughness: 0.9 },
        fabric: { color: 0x3a3a3a, metalness: 0.0, roughness: 0.8 },
    };

    // Control button handlers
    document.querySelectorAll('[data-material]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('[data-material]').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            const material = materials[e.target.dataset.material];
            caseMaterial.color.setHex(material.color);
            caseMaterial.metalness = material.metalness;
            caseMaterial.roughness = material.roughness;
        });
    });

    document.querySelectorAll('[data-color]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const color = dialColors[e.target.dataset.color];
            dialMaterial.color.setHex(color);
        });
    });

    document.querySelectorAll('[data-strap]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('[data-strap]').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            const strap_config = straps[e.target.dataset.strap];
            strapMaterial.color.setHex(strap_config.color);
            strapMaterial.metalness = strap_config.metalness;
            strapMaterial.roughness = strap_config.roughness;
        });
    });

    // Animation loop
    let rotation = 0;
    function animate() {
        requestAnimationFrame(animate);
        watchGroup.rotation.y = rotation;
        rotation += 0.002;
        renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });

    return { scene, camera, renderer, watchGroup };
}
