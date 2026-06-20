import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function setupScrollAnimations() {
    // Fade in sections on scroll
    gsap.utils.toArray('.craft-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                end: 'top 50%',
                scrub: true,
                markers: false,
            },
            opacity: 0,
            y: 50,
            duration: 1,
            delay: index * 0.1,
        });
    });

    // Animate hero text on load
    gsap.from('.hero-title', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.2,
    });

    gsap.from('.hero-subtitle', {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.4,
    });

    gsap.from('.hero-description', {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.6,
    });

    gsap.from('.cta-button', {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.8,
    });

    // Parallax effect for hero canvas
    gsap.from('.canvas-container', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            markers: false,
        },
        y: -100,
        opacity: 0.5,
        duration: 1,
    });
}
