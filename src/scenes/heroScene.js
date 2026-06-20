import * as THREE from 'three';
import { gsap } from 'gsap';

export function initHeroScene(container) {
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

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const rimLight = new THREE.DirectionalLight(0x00ffff, 0.3);
    rimLight.position.set(-5, -5, 5);
    scene.add(rimLight);

    // Create luxury watch (simplified geometry)
    const watchGroup = new THREE.Group();
    
    // Watch case
    const caseGeometry = new THREE.CylinderGeometry(1, 1, 0.3, 64);
    const caseMaterial = new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        metalness: 0.9,
        roughness: 0.2,
    });
    const watchCase = new THREE.Mesh(caseGeometry, caseMaterial);
    watchGroup.add(watchCase);

    // Watch dial
    const dialGeometry = new THREE.CircleGeometry(0.95, 64);
    const dialMaterial = new THREE.MeshStandardMaterial({
        color: 0x1a1a1a,
        metalness: 0.3,
        roughness: 0.4,
    });
    const dial = new THREE.Mesh(dialGeometry, dialMaterial);
    dial.position.z = 0.16;
    watchGroup.add(dial);

    // Watch crown
    const crownGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.2, 32);
    const crownMaterial = new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        metalness: 0.95,
        roughness: 0.15,
    });
    const crown = new THREE.Mesh(crownGeometry, crownMaterial);
    crown.position.set(1.05, 0, 0);
    watchGroup.add(crown);

    // Watch hands
    const hourHandGeometry = new THREE.BoxGeometry(0.05, 0.3, 0.05);
    const handMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.8,
        roughness: 0.2,
    });
    const hourHand = new THREE.Mesh(hourHandGeometry, handMaterial);
    hourHand.position.z = 0.2;
    watchGroup.add(hourHand);

    const minuteHandGeometry = new THREE.BoxGeometry(0.04, 0.4, 0.04);
    const minuteHand = new THREE.Mesh(minuteHandGeometry, handMaterial);
    minuteHand.position.z = 0.21;
    watchGroup.add(minuteHand);

    scene.add(watchGroup);

    // Particle system for luxury effect
    const particleCount = 50;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 8;
        positions[i + 1] = (Math.random() - 0.5) * 8;
        positions[i + 2] = (Math.random() - 0.5) * 8;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
        color: 0xd4af37,
        size: 0.05,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.6,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Animation variables
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    // Mouse movement interaction
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = (event.clientY / window.innerHeight) * 2 - 1;
        
        targetRotationY = mouseX * Math.PI * 0.3;
        targetRotationX = mouseY * Math.PI * 0.2;
    });

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        // Smooth rotation based on mouse
        watchGroup.rotation.y += (targetRotationY - watchGroup.rotation.y) * 0.05;
        watchGroup.rotation.x += (targetRotationX - watchGroup.rotation.x) * 0.05;

        // Subtle auto-rotation
        watchGroup.rotation.z += 0.0005;

        // Animate watch hands
        const now = new Date();
        hourHand.rotation.z = -(now.getHours() % 12 + now.getMinutes() / 60) * (Math.PI / 6);
        minuteHand.rotation.z = -(now.getMinutes() + now.getSeconds() / 60) * (Math.PI / 30);

        // Animate particles
        particles.rotation.x += 0.0002;
        particles.rotation.y += 0.0003;

        // Subtle glow animation
        const glowIntensity = Math.sin(Date.now() * 0.001) * 0.3 + 0.5;
        ambientLight.intensity = 0.5 + glowIntensity * 0.3;

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
