// --- Navbar Toggle ---
const menu = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");

if (menu && navbar) {
  menu.onclick = () => {
    menu.classList.toggle("bx-x");
    navbar.classList.toggle("active");
  };
}

// --- Page Load Animation ---
function page_loadAnim() {
  const tl = gsap.timeline();
  tl.from(".logo img", { duration: 0.4, opacity: 0, y: 80 });
  tl.from(".logo span", { duration: 0.57, opacity: 0, y: 80 }, "navAnim");
}

// --- Hero Background Animation ---
function heroAnimation() {
  gsap.to("#heroBg", {
    scale: 1.2,
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "bottom top",
      scrub: 2,
    },
  });
}
heroAnimation();

// --- Offer Section Animation ---
// function offerAnim() {
//   gsap.from(".fheading", {
//     opacity: 0,
//     duration: 0.4,
//     y: 100,
//     scrollTrigger: {
//       trigger: ".fheading",
//       scrub: 2,
//     },
//   });

//   gsap.from(".student-cards-container", {
//     opacity: 0,
//     y: 100,
//     scrollTrigger: {
//       trigger: ".fheading",
//       scrub: 2,
//       start: "top 20%",
//       end: "top 0%",
//     },
//   });

//   gsap.from(".fsub-heading", {
//     opacity: 0,
//     duration: 0.4,
//     y: 100,
//     scrollTrigger: {
//       trigger: ".fsub-heading",
//       scrub: 2,
//     },
//   });
// }
// offerAnim();

// --- Speaker & Partner Section ---
function speakerPartnerSection() {
  gsap.from("#speakerSection h1", {
    y: 50,
    opacity: 0,
    scrollTrigger: {
      trigger: "#speakerSection",
      start: "top 80%",
      end: "top 50%",
      scrub: 2,
    },
  });

  gsap.from(".speakerCard", {
    y: 50,
    opacity: 0,
    stagger: 0.2,
    scrollTrigger: {
      trigger: "#speakerSection",
      start: "top 65%",
      end: "bottom 10%",
      scrub: 3,
    },
  });

  gsap.from(".partners h1", {
    y: 50,
    opacity: 0,
    scrollTrigger: {
      trigger: ".partners",
      start: "top 95%",
      end: "top 65%",
      scrub: 2,
    },
  });

  gsap.from("#moving-div", {
    y: 50,
    opacity: 0,
    scrollTrigger: {
      trigger: ".partners",
      start: "top 80%",
      end: "top 0%",
      scrub: 3,
    },
  });
}
speakerPartnerSection();

// investor swiper
const swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets : true
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 4,
    }
  }
});

// --- Video Animation ---
function VideoAnimation() {
  const videoPlayIcon = document.querySelector(".playIcon");
  const video = document.querySelector("#videoSection video");

  if (video && videoPlayIcon) {
    gsap.set(video, {
      transform: "scaleX(0.7) scaleY(0)",
      opacity: 0,
      borderRadius: "30px",
    });

    videoPlayIcon.addEventListener("click", () => {
      if (video.paused) {
        video.play();
        gsap.to(video, {
          transform: "scaleX(1) scaleY(1)",
          opacity: 1,
          borderRadius: 0,
          duration: 0.5,
          ease: "power2.out",
        });
        videoPlayIcon.style.display = "none";
      }
    });

    video.addEventListener("click", () => {
      if (!video.paused) {
        video.pause();
        gsap.to(video, {
          transform: "scaleX(0.7) scaleY(0)",
          opacity: 0,
          borderRadius: "30px",
          duration: 0.5,
          ease: "power2.out",
        });
        videoPlayIcon.style.display = "flex";
      }
    });
  }
}
VideoAnimation();

// --- Intersection Animation Setup ---
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
});

function setupScrollAnimations() {
  document.querySelectorAll(".section-animation").forEach((section) => {
    observer.observe(section);
  });
}

// --- Intro Animation, Starfield, and Main Content Reveal ---
window.onload = () => {
  startIntroAnimation();
};

function startIntroAnimation() {
  const introAnimation = document.getElementById("introAnimation");
  const surpriseBox = document.getElementById("surpriseBox");
  const cosmicCanvas = document.getElementById("cosmicCanvas");

  setTimeout(() => {
    surpriseBox?.classList.add("burst");
    setTimeout(() => {
      surpriseBox.style.display = "none";
      cosmicCanvas?.classList.add("active");
      initCosmicAnimation();
    }, 900);
  }, 1000);
}

function finishIntroAnimation() {
  const introAnimation = document.getElementById("introAnimation");
  const mainContent = document.getElementById("mainContent");

  cancelAnimationFrame(animationFrameId);
  introAnimation.style.opacity = "0";
  mainContent.style.opacity = "1";
  mainContent.style.visibility = "visible";

  setTimeout(() => {
    introAnimation.remove();
    setupScrollAnimations();
    page_loadAnim();
  }, 1500);
}

// --- Cosmic Animation with Three.js ---
let scene, camera, renderer, stars, starGeo, animationFrameId;

function initCosmicAnimation() {
  const canvas = document.getElementById("cosmicCanvas");

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.z = 1;
  camera.rotation.x = Math.PI / 2;

  renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 1);

  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });

  const positions = [],
    colors = [],
    numStars = 6000;
  for (let i = 0; i < numStars; i++) {
    positions.push(
      Math.random() * 600 - 300,
      Math.random() * 600 - 300,
      Math.random() * 600 - 300
    );
    colors.push(
      Math.random() * 0.5 + 0.5,
      Math.random() * 0.5 + 0.5,
      Math.random() * 0.5 + 0.5
    );
  }

  starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );
  starGeo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

  const starMaterial = new THREE.PointsMaterial({
    size: 0.8,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
  });

  stars = new THREE.Points(starGeo, starMaterial);
  scene.add(stars);

  let speed = 0.5;
  const maxSpeed = 3;
  const acceleration = 0.02;
  const startTime = Date.now();

  function animateCosmicTravel() {
    const elapsedTime = Date.now() - startTime;

    if (speed < maxSpeed) speed += acceleration;

    stars.rotation.y += 0.0005;
    stars.position.z += speed;
    if (stars.position.z > 200) stars.position.z -= 400;

    renderer.render(scene, camera);
    animationFrameId = requestAnimationFrame(animateCosmicTravel);

    if (elapsedTime > 2000) finishIntroAnimation();
  }

  animateCosmicTravel();
}

// --- Nexus Core Effect ---
const nexusCore = document.getElementById("nexusCore");
const nexusRipple = document.getElementById("nexusRipple");

if (nexusCore && nexusRipple) {
  nexusCore.addEventListener("click", () => {
    nexusRipple.classList.remove("opacity-100", "scale-100");
    nexusRipple.classList.add("opacity-0", "scale-0");
    void nexusRipple.offsetWidth;
    nexusRipple.classList.remove("opacity-0", "scale-0");
    nexusRipple.classList.add("opacity-100", "scale-100");
  });

  document.addEventListener("mousemove", (e) => {
    const mainContent = document.getElementById("mainContent");
    if (mainContent?.style.visibility === "visible") {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const moveX = (e.clientX - centerX) * 0.02;
      const moveY = (e.clientY - centerY) * 0.02;
      nexusCore.style.transform = `translate(${moveX}px, ${moveY}px) scale(1)`;
    }
  });

  document.addEventListener("mouseleave", () => {
    const mainContent = document.getElementById("mainContent");
    if (mainContent?.style.visibility === "visible") {
      nexusCore.style.transform = `translate(0px, 0px) scale(1)`;
    }
  });
}

// --- Countdown Timer ---
const countdownDate = new Date("August 11, 2025 00:00:00").getTime();

const countdownFunction = setInterval(() => {
  const now = Date.now();
  const distance = countdownDate - now;

  if (distance < 0) {
    clearInterval(countdownFunction);
    const countdownElement = document.getElementById("countdown");
    if (countdownElement) {
      countdownElement.innerHTML = "<p>We're Live!</p>";
    }
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  const daysEl = document.getElementById("days");
  if (daysEl) daysEl.innerText = days.toString().padStart(2, "0");
  const hoursEl = document.getElementById("hours");
  if (hoursEl) hoursEl.innerText = hours.toString().padStart(2, "0");
  const minutesEl = document.getElementById("minutes");
  if (minutesEl) minutesEl.innerText = minutes.toString().padStart(2, "0");
  const secondsEl = document.getElementById("seconds");
  if (secondsEl) secondsEl.innerText = seconds.toString().padStart(2, "0");
}, 1000);

// --- Toggle Accordion Icons ---
document.querySelectorAll("details").forEach((detail) => {
  const summary = detail.querySelector("summary");
  summary.addEventListener("click", (e) => {
    e.preventDefault();
    if (detail.hasAttribute("open")) {
      detail.classList.remove("animating");
      detail.removeAttribute("open");
    } else {
      document.querySelectorAll("details[open]").forEach((el) => {
        el.removeAttribute("open");
      });
      detail.setAttribute("open", true);
      detail.classList.add("animating");
      setTimeout(() => detail.classList.remove("animating"), 500);
    }
  });

  detail.addEventListener("toggle", () => {
    const icon = detail.querySelector("i.icon");
    if (icon) {
      icon.style.transform = detail.open ? "rotate(180deg)" : "rotate(0deg)";
    }
  });
});

// --- Speaker Tab Toggling ---
function toggleDay(dayId) {
  const allButtons = document.querySelectorAll(".tab-button");
  const allContents = document.querySelectorAll(".day-content");

  allButtons.forEach((btn) => btn.classList.remove("active"));
  allContents.forEach((content) => content.classList.remove("active"));

  document.querySelector(`.tab-button[data-day="${dayId}"]`).classList.add("active");
  document.getElementById(dayId).classList.add("active");
}

document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tab-button");
  tabButtons.forEach(button => {
    button.addEventListener("click", () => {
      const dayId = button.getAttribute("data-day");
      toggleDay(dayId);
    });
  });
});

const newSwiper = new Swiper('.new-swiper', {
    loop: true,
    grabCursor: true,
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: {
      nextEl: '.new-swiper-button-next',
      prevEl: '.new-swiper-button-prev',
    },
    pagination: {
      el: '.new-swiper-pagination',
      clickable: true,
    },
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    speed: 800,
  });