import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initHeroScene } from './scenes/heroScene.js';
import { initConfigurator } from './scenes/configurator.js';
import { setupScrollAnimations } from './animations/scrollAnimations.js';
import { setupInteractions } from './interactions/interactions.js';

gsap.registerPlugin(ScrollTrigger);

// Initialize hero 3D scene
const heroCanvas = document.getElementById('canvas-container');
if (heroCanvas) {
    initHeroScene(heroCanvas);
}

// Initialize configurator
const configuratorCanvas = document.getElementById('configurator-canvas');
if (configuratorCanvas) {
    initConfigurator(configuratorCanvas);
}

// Setup scroll animations and interactions
setupScrollAnimations();
setupInteractions();

console.log('LUX WATCHES - Luxury Experience Initialized');
