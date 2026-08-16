const intro = document.getElementById("intro");
const welcome = document.getElementById("welcome");
const begin = document.getElementById("begin");
const welcomeContent = document.querySelector(".welcome-content");
const envelopeScene = document.getElementById("envelopeScene");
const flap = document.querySelector(".flap");
const letter = document.querySelector(".letter");
const seal = document.querySelector(".seal");
const content = document.querySelector(".paper-content");
const message = `I hope today brings you lots of smiles and reminds you how special you are. Keep believing in yourself, keep working hard, and never stop chasing your dreams. Every step you take brings you closer to something amazing. 

May this year be filled with happiness, success unforgettable memories and many personal bests. Wishing you an incredible birthday and a wonderful year ahead.`;
const typing = document.getElementById("typing");
const bgMusic = document.getElementById("bgMusic");
const lastSurprise = document.getElementById("lastSurprise");
const videoScene = document.getElementById("videoScene");
const birthdayVideo = document.getElementById("birthdayVideo");
const ending = document.getElementById("ending");
const scene = document.getElementById("scene");


let envelopeOpened = false;

// Intro Animation
setTimeout(() => {

    intro.style.opacity = "0";

    setTimeout(() => {
        intro.style.display = "none";
        welcome.style.opacity = "1";
        welcome.style.pointerEvents = "auto";
    }, 1000);

}, 3000);

// Begin Button
begin.addEventListener("click", () => {

    bgMusic.volume = 0.2;

    bgMusic.play();

    welcomeContent.style.opacity = "0";
    welcomeContent.style.transform = "translateY(-25px)";

    setTimeout(() => {
        welcomeContent.style.display = "none";
        envelopeScene.style.opacity = "1";
        envelopeScene.style.transform = "translateY(100px) scale(1)";
        envelopeScene.style.pointerEvents = "auto";

        // Scene 2 will start here 👇


    }, 800);

});

/* ==========================
   CREATE STARS
========================== */

const stars = document.getElementById("stars");

for(let i=0;i<60;i++){

    const star=document.createElement("div");

    star.className="star-dot";

    star.style.left=Math.random()*100+"%";

    star.style.top=Math.random()*100+"%";

    star.style.animationDelay=Math.random()*3+"s";

    star.style.opacity=Math.random();

    stars.appendChild(star);

}

/* ==========================
   CREATE PARTICLES
========================== */

const particles=document.getElementById("particles");

for(let i=0;i<12;i++){

    const p=document.createElement("div");

    p.className="particle";

    p.style.left=Math.random()*100+"%";

    p.style.animationDuration=
    (10+Math.random()*15)+"s";

    p.style.animationDelay=
    Math.random()*15+"s";

    particles.appendChild(p);

}

/* ==========================
      SHOOTING STARS
========================== */

const shootingLayer = document.getElementById("shootingStars");

function createShootingStar() {

    const star = document.createElement("div");

    star.className = "shooting-star";

    // Start somewhere in the top-left area
    star.style.left = Math.random() * 20 + "%";
    star.style.top = Math.random() * 20 + "%";

    shootingLayer.appendChild(star);

    star.addEventListener("animationend", () => {
        star.remove();
    });

}

// Create one every 5 seconds
setInterval(createShootingStar, 5000);


seal.addEventListener("click", () => {

    seal.style.pointerEvents = "none";
    seal.classList.add("seal-active");

    // Let the seal glow read for a moment before the flap moves
    setTimeout(() => {

        flap.style.transform =
            "translateX(-50%) rotateX(180deg)";

    }, 400);

    // Wait for the glow + the flap's own rotation to finish
    setTimeout(() => {

        flap.style.zIndex = "1";     // send flap behind

        letter.style.zIndex = "2";   // behind folds, above the now-open flap

        letter.style.transform =
            "translateX(-50%) translateY(-100px)";

        
        content.style.opacity="1";
        content.style.transform="translateY(0)";

        envelopeOpened = true;

    }, 400 + 900);

});

let typed = false;

letter.addEventListener("click", () => {

    if (!envelopeOpened) return;

    letter.classList.toggle("expanded");

    if(!typed){

        typed = true;

        typeWriter(message, typing, 35);
    }

});

function typeWriter(text, element, speed){

    let i = 0;

    element.innerHTML = "";

    const timer = setInterval(() => {

        element.innerHTML += text.charAt(i);

        i++;

        if(i >= text.length){

            clearInterval(timer);

            // Show last surprise after typing finishes
            setTimeout(() => {

                lastSurprise.classList.add("show");

            }, 700);

        }

    }, speed);

}


// ==========================
// LAST SURPRISE → VIDEO
// ==========================

lastSurprise.addEventListener("click", () => {

    lastSurprise.style.pointerEvents = "none";

     // Hide "one last surprise" text
    lastSurprise.classList.remove("show");

    // Fade envelope scene
    envelopeScene.style.opacity = "0";

    // Fade music out
    fadeMusic();

    // Wait for envelope to disappear
    setTimeout(() => {

        envelopeScene.style.pointerEvents = "none";

        videoScene.style.opacity = "1";
        videoScene.style.pointerEvents = "auto";

        birthdayVideo.play();

    }, 1500);

});


// ==========================
// FADE MUSIC OUT
// ==========================

function fadeMusic(){

    let volume = bgMusic.volume;

    const fade = setInterval(() => {

        volume -= 0.01;

        if(volume <= 0){

            volume = 0;

            clearInterval(fade);

            bgMusic.pause();

        }

        bgMusic.volume = volume;

    }, 100);

}


// ==========================
// VIDEO FINISHED
// ==========================

birthdayVideo.addEventListener("ended", () => {

    videoScene.style.opacity = "0";
    videoScene.style.pointerEvents = "none";

    setTimeout(() => {

        bgMusic.currentTime = 0;
        bgMusic.volume = 0;
        bgMusic.play();

        musicBack();

        ending.style.opacity = "1";
        ending.style.transform = "translateY(0)";

    }, 1000);

});

// ==========================
// FADE MUSIC BACK IN
// ==========================

function musicBack(){

    let volume = 0;

    const fade = setInterval(() => {

        volume += 0.01;

        if(volume >= 0.2){

            volume = 0.2;

            clearInterval(fade);

        }

        bgMusic.volume = volume;

    }, 100);

}


// Fit Scene



function fitScene(){
    const scale = Math.min(window.innerWidth / 420, 1);

    scene.style.transform = `scale(${scale})`;
}

fitScene();
window.addEventListener("resize", fitScene);