function startFallingHearts() {
  const container = document.getElementById('heartsContainer');
  if(!container) return;

  setInterval(() => {
    const heart = document.createElement('div');
    heart.className = 'falling-heart';
    heart.innerHTML = ['❤️', '💖', '🧸', '🤍'][Math.floor(Math.random() * 4)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
    heart.style.fontSize = (Math.random() * 1 + 1) + 'rem';
    container.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
  }, 400);
}const screens = document.querySelectorAll('.screen');
let current = 1;

function nextScreen() {
  screens[current - 1].classList.remove('active');
  current++;
  setTimeout(() => screens[current - 1].classList.add('active'), 900);
}

// Piano soft start on load
window.addEventListener('load', () => {
  const piano = document.getElementById('piano');
  piano.volume = 0.35;
  piano.play().catch(() => console.log("Piano needs interaction"));

  // Preload heartbeat for better mobile play
  const heartbeat = document.getElementById('heartbeat');
  heartbeat.load();
});

// Screen 1 → start (tap or auto after 4.5s)
document.querySelector('.full-tap-trigger').addEventListener('click', startHug);
setTimeout(startHug, 4500);

function startHug() {
  document.getElementById('piano').play();
  nextScreen(); // to screen2 (hug screen)
}

// Screen 2 → Hug screen – 2 sec wait ke baad heartbeat loud start
setTimeout(() => {
  const hugReveal = document.getElementById('hugReveal');
  hugReveal.style.transition = 'opacity 3s ease-in-out';
  hugReveal.classList.add('reveal');

  if (navigator.vibrate) {
    navigator.vibrate([250, 200, 300, 200, 350, 200, 400]);
  }

  const heartbeat = document.getElementById('heartbeat');
  heartbeat.volume = 0.9;
  heartbeat.loop = true;
  heartbeat.currentTime = 0;
  heartbeat.play().catch(err => console.log("Heartbeat blocked:", err));

  setTimeout(() => {
    heartbeat.pause();
    heartbeat.loop = false;
    heartbeat.currentTime = 0;
    nextScreen(); // teddy screen
  }, 15000);

}, 2000); // 2 sec wait – phir ek dum heartbeat bajegi

// Teddy interactions
const teddyWrap = document.getElementById('teddyWrap');
let pressTimer;

teddyWrap.addEventListener('touchstart', e => {
  e.preventDefault();
  pressTimer = setTimeout(() => {
    alert("HUG MODE ON 💞\nTeddy: Main hamesha tumhare paas hoon... jab bhi chaho hug kar lena 🫂🤍");
    teddyWrap.classList.add('active');
    document.getElementById('heartbeat').currentTime = 0;
    document.getElementById('heartbeat').play();
  }, 800);
});

teddyWrap.addEventListener('touchend', () => {
  clearTimeout(pressTimer);
  teddyWrap.classList.add('active');
  document.getElementById('heartExplosion').classList.add('show');
  setTimeout(() => {
    teddyWrap.classList.remove('active');
    document.getElementById('heartExplosion').classList.remove('show');
    setTimeout(nextScreen, 3000);
  }, 1800);
});

// Voice Surprise Button – 2 sec wait ke baad heartbeat bajegi
document.getElementById('voiceSurprise').addEventListener('click', () => {
  // Text reveal turant
  document.getElementById('voiceMsg').classList.add('reveal');

  // 2 seconds wait ke baad heartbeat start
  setTimeout(() => {
    const heartbeat = document.getElementById('heartbeat');
    heartbeat.volume = 0.9;           // loud feel
    heartbeat.currentTime = 0;
    heartbeat.play().catch(err => {
      console.log("Heartbeat play failed:", err);
    });

    // Vibration – hug feel ke liye
    if (navigator.vibrate) {
      navigator.vibrate([300, 200, 400, 200, 500]);
    }

    // 7 seconds baad sound stop
    setTimeout(() => {
      heartbeat.pause();
      heartbeat.currentTime = 0;
    }, 9000);
  }, 500); // 2 seconds hold/wait – phir ek dum bajegi
});

// Game logic
const gameTeddy = document.getElementById('movingTeddy');
let catches = 0;
let gameTimer;

function jump() {
  const x = Math.random() * 80 + 10;
  const y = Math.random() * 80 + 10;
  gameTeddy.style.left = x + '%';
  gameTeddy.style.top = y + '%';
}

document.getElementById('gameZone').addEventListener('click', e => {
  if (e.target.id === 'movingTeddy') {
    catches++;
    jump();
  }
});

gameTimer = setInterval(jump, 900);

setTimeout(() => {
  clearInterval(gameTimer);
  document.getElementById('gameMsg').textContent = catches >= 4 
    ? "Wow! Forever hug unlocked 🫂💞" 
    : "Teddy thoda sharma gaya... phir bhi great try! 🧸";
  setTimeout(nextScreen, 3000);
}, 5000);

// Button backup
document.getElementById('toMemories').addEventListener('click', nextScreen);

// Memories modal
const hearts = document.querySelectorAll('.heart-card');
const modal = document.createElement('div');
modal.id = 'memoryModal';
modal.innerHTML = `
  <div class="modal-content">
    <span class="close-modal">&times;</span>
    <img id="modalImage" src="" alt="Memory Image">
    <p id="modalShayari"></p>
  </div>
`;
document.body.appendChild(modal);

const closeModal = modal.querySelector('.close-modal');
closeModal.onclick = () => {
  modal.style.display = 'none';
  document.getElementById('modalImage').src = ""; // Clear image on close
};
window.onclick = e => { if (e.target === modal) modal.style.display = 'none'; };

const images = [
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTg5bDZxNGVld2p1eGUxZTZhd3ZkdnVuOHhia285bWdqeGxsZG9lNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/sc54SIQ5QekyhMvat9/giphy.webp",
  "https://media2.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3b3F6bHl2bjFhaHp1anFtNHQ0OThzNjJ6MHprMGptcmdvMnp0dW9oaiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/GnBrnJv0uIchMKxx2r/giphy.webp",
  "https://media3.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3a3Q0d3p1cDFsNDc4aDZmbWh5MzdyaHNiaGszcGlhbnAweGszMjJqdSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/B7fFLCRGrfVuWQim7R/giphy.webp"
];

const shayaris = [
  "Bhej rahi hoon ek pyara sa Teddy,<br>Jo hamesha rakhega tumhe Ready,<br>Jab bhi meri yaad aaye toh ise gale laga lena,<br>Mera har 'I Love You' iske zariye sun lena. 🧸🤍",
  
  "Tum mere sabse bade aur cute Teddy Bear ho,<br>Jiske paas hone se main sabse zyada safe feel karti hoon,<br>Bas hamesha mere saath aise hi rehna,<br>Happy Teddy Day My World! 💕🧸",
  
  "Log toh sirf aaj Teddy de rahe hain,<br>Par mere liye toh mera har din tumhare saath Teddy Day hai,<br>Kyuki tumhari baahon mein jo sukoon hai, wo kahi nahi.<br>Happy Teddy Day Jaan! 💞"
];

hearts.forEach((card, index) => {
  card.addEventListener('click', () => {
    card.classList.add('unlocked');
    document.getElementById('modalImage').src = images[index];
    document.getElementById('modalShayari').innerHTML = shayaris[index];
    modal.style.display = 'flex';
  });
});

