particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 50,         // Reduced from 80 → less CPU/GPU load
      "density": {
        "enable": true,
        "value_area": 900
      }
    },
    "color": { "value": "#ffffff" },
    "shape": {
      "type": "circle",    // Simpler shape than "edge" polygon
      "stroke": { "width": 0, "color": "#000000" }
    },
    "opacity": {
      "value": 0.4,
      "random": false,
      "anim": { "enable": false }
    },
    "size": {
      "value": 2.5,
      "random": true,
      "anim": { "enable": false }
    },
    "line_linked": {
      "enable": true,
      "distance": 140,
      "color": "#ffffff",
      "opacity": 0.3,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 2,           // Reduced from 3.2 → smoother, lower CPU
      "direction": "none",
      "out_mode": "out"
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": { "enable": true, "mode": "repulse" },
      "onclick": { "enable": true, "mode": "push" },
      "resize": true
    },
    "modes": {
      "repulse": { "distance": 150, "duration": 0.4 },
      "push": { "particles_nb": 3 }
    }
  },
  "retina_detect": false  // Disabled — was doubling particle count on Retina screens
});