
const TAIL_LENGTH = 20;

const cursor = document.getElementById('cursor');

let mouseX = 0;
let mouseY = 0;

let cursorCircles;
let cursorHistory = Array(TAIL_LENGTH).fill({x: 0, y: 0});

function onMouseMove(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
}

function initCursor() {
  for (let i = 0; i < TAIL_LENGTH; i++) {
    let div = document.createElement('div');
    div.classList.add('cursor-circle') ;
    cursor.append(div);
  }
  cursorCircles = Array.from(document.querySelectorAll('.cursor-circle'));
}

function updateCursor() {  
  cursorHistory.shift();
  cursorHistory.push({ x: mouseX, y: mouseY });
    
  for (let i = 0; i < TAIL_LENGTH; i++) {
    let current = cursorHistory[i];
    let next = cursorHistory[i + 1] || cursorHistory[TAIL_LENGTH - 1];
    
    let xDiff = next.x - current.x;
    let yDiff = next.y - current.y;
    
    current.x += xDiff * 0.35;
    current.y += yDiff * 0.35;
    cursorCircles[i].style.transform = `translate(${current.x}px, ${current.y}px) scale(${i/TAIL_LENGTH})`;  
  }
  requestAnimationFrame(updateCursor)
}

document.addEventListener('mousemove', onMouseMove, false);

initCursor();
updateCursor();


const slider = document.querySelector('.slider-inner');
let sliderGrabbed = false;


slider.addEventListener('mousedown', (e) => {
    sliderGrabbed = true;
    // slider.style.cursor = 'grabbing';
})

slider.addEventListener('mouseup', (e) => {
    sliderGrabbed = false;
    // slider.style.cursor = 'grab';
})

slider.addEventListener('mouseleave', (e) => {
    sliderGrabbed = false;
})

slider.addEventListener('mousemove', (e) => {
    if(sliderGrabbed){
        slider.parentElement.scrollLeft -= e.movementX;
    }
})


const mobHeader = document.getElementsByClassName("mob-header")[0]
const dummyDiv = document.querySelector(".dummi--div")
const headerOptions = {};
const headerObserver = new IntersectionObserver( (entries, headerObserver) => {
  entries.forEach( entry => {
    // console.log(entry.isIntersecting);
    if( !entry.isIntersecting ){
      mobHeader.classList.add("mob-header-active")
    }else{
      mobHeader.classList.remove("mob-header-active")
    }
    
  })
}, headerOptions)

headerObserver.observe(dummyDiv)


const menuOpen = document.getElementById("menu")
const menuClose = document.getElementById("menu-close")
const nav = document.getElementById("mob-nav")
const navContent = document.querySelectorAll(".nav-content>div>div")
menuOpen.addEventListener("click", ()=>{
  nav.classList.add("active")
  setTimeout( () => {
    navContent.forEach((e,i) => {
      setTimeout( () => e.classList.add("active") ,i*200)
    });
  }, 200)
  console.log("menu clicked");
})
menuClose.addEventListener("click", () => {
  // navContent.forEach((e,i) => {
  //   setTimeout( () => e.classList.remove("active") ,i*200)
  // });
  for (let i = navContent.length-1; i >= 0; i--) {
    const element = navContent[i];
    setTimeout( () => element.classList.remove("active") ,(navContent.length-i-1)*200)
  }
  setTimeout( () => {
    nav.classList.remove("active")
  }, navContent.length*300)
  console.log("exit clicked");
})
