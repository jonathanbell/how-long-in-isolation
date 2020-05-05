if (typeof isBenevilationOver === 'undefined') {
  const isBenevilationOver = false;
}

/**
 * Timer stuff...
 */

function getTimeElapsed(startTime, endTime) {
  if (!endTime) {
    endTime = new Date();
  }

  // The number of miliseconds since startTime
  const miliseconds = Date.parse(endTime) - Date.parse(startTime);
  const seconds = Math.floor((miliseconds / 1000) % 60);
  const minutes = Math.floor((miliseconds / 1000 / 60) % 60);
  const hours = Math.floor((miliseconds / (1000 * 60 * 60)) % 24);
  const days = Math.floor(miliseconds / (1000 * 60 * 60 * 24));
  return {
    miliseconds,
    days,
    hours,
    minutes,
    seconds
  };
}

function initTimer(id, startTime, endTime = null) {
  const timer = document.getElementById(id);
  const daysSpan = timer.querySelector('.days');
  const hoursSpan = timer.querySelector('.hours');
  const minutesSpan = timer.querySelector('.minutes');
  const secondsSpan = timer.querySelector('.seconds');

  function updateClock() {
    const timeElapsed = getTimeElapsed(startTime, endTime);

    daysSpan.innerHTML = timeElapsed.days;
    hoursSpan.innerHTML = ('0' + timeElapsed.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + timeElapsed.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + timeElapsed.seconds).slice(-2);
  }

  updateClock();

  if (!isBenevilationOver) {
    const timeinterval = setInterval(updateClock, 1000);
  }
}

/**
 * Confetti stuff...
 */

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const maxConfettis = 150;
let particles = [];
let particleIterations = 1;
const maxParticleIterations = 1777;

const possibleColors = [
  'DodgerBlue',
  'OliveDrab',
  'Gold',
  'Pink',
  'SlateBlue',
  'LightBlue',
  'Gold',
  'Violet',
  'PaleGreen',
  'SteelBlue',
  'SandyBrown',
  'Chocolate',
  'Crimson',
];

function randomFromTo(from, to) {
  return Math.floor(Math.random() * (to - from + 1) + from);
}

function confettiParticle() {
  this.x = Math.random() * windowWidth; // x
  this.y = Math.random() * windowHeight - windowHeight; // y
  this.r = randomFromTo(11, 33); // radius
  this.d = Math.random() * maxConfettis;
  this.color = possibleColors[Math.floor(Math.random() * possibleColors.length)];
  this.tilt = Math.floor(Math.random() * 33);
  this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
  this.tiltAngle = 0;

  this.draw = function() {
    context.beginPath();
    context.lineWidth = this.r / 1.333;
    context.strokeStyle = this.color;
    context.moveTo(this.x + this.tilt + this.r / 3, this.y);
    context.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 5);

    return context.stroke();
  };
}

function Draw() {
  const results = [];

  // Magical recursive functional love
  requestAnimationFrame(Draw);

  context.clearRect(0, 0, windowWidth, window.innerHeight);

  for (let i = 0; i < maxConfettis; i++) {
    results.push(particles[i].draw());
  }

  let particle = {};
  let remainingFlakes = 0;
  for (let i = 0; i < maxConfettis; i++) {
    particle = particles[i];

    particle.tiltAngle += particle.tiltAngleIncremental;
    particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
    particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;

    if (particle.y <= windowHeight) remainingFlakes++;

    // If a confetti has fluttered out of view,
    // bring it back to above the viewport and let if re-fall.
    if (
      isBenevilationOver
      && particleIterations < maxParticleIterations
      && (
        particle.x > windowWidth + 30
        || particle.x < -30
        || particle.y > windowHeight
      )
    ) {
      particle.x = Math.random() * windowWidth;
      particle.y = -30;
      particle.tilt = Math.floor(Math.random() * 10) - 20;
      particleIterations = particleIterations + 1;
    }

  }

  return results;
}

// Push new confetti objects to `particles[]`
for (var i = 0; i < maxConfettis; i++) {
  particles.push(new confettiParticle());
}

canvas.width = windowWidth;
canvas.height = windowHeight;

if (!isBenevilationOver) {
  let hasDrawn = false;
  document.querySelectorAll('h1')[0].style.cursor = 'pointer';
  document.getElementById('heading').addEventListener('click', function(e) {
    if (hasDrawn) {
      particles = [];
      for (var i = 0; i < maxConfettis; i++) {
        particles.push(new confettiParticle());
      }
    } else {
      hasDrawn = true;
      Draw();
    }
  });
} else {
  setTimeout(() => Draw(), 1234);
  document.body.addEventListener('click', function(e) {
    particleIterations = maxParticleIterations + 1;
  });
}
