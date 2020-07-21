// const hikeExp =document.querySelector('.hike-exp');

// const slide = document.querySelector('.fashion');
// window.addEventListener('scroll',scrollReveal);

// function scrollReveal(){
//     const hikePos = hikeExp.getBoundingClientRect().top;
//     const windowHeight = window.innerHeight / 2.0;
//     if(hikePos < windowHeight){
//         console.log(windowHeight,hikePos)
//         hikeExp.style.color='green';

//     }
// }



// let options = {
//     threshold: 0.5
//   }
// let observer =new IntersectionObserver(slideAnim,options);
// function slideAnim(entries){
//     entries.forEach(entry =>{
//         if(entry.isIntersecting){
//             slide.style.background='linear-gradient(lightgreen,lightblue)';
//         }
//         else{
//             slide.style.background='white';
//      ide);


let controller;
let slideScene;
let pageScene;

function animeSlides() {
    //Init controller
    contoller = new ScrollMagic.Controller();
    //Select somethings

    const sliders = document.querySelectorAll('.slide');
    const nav = document.querySelector('.nav-header');
    //loop over each  slide
    sliders.forEach((slide,index,slides) => {
        const revealImg = slide.querySelector('.reveal-img')
        const img = slide.querySelector('img')
        const revealText = slide.querySelector('.reveal-text');

        //GSAP
        // gsap.to(revealImg,1.5,{x: "100%"});
        const slideTl = gsap.timeline({
            defaults: {
                duration: 1,
                ease: "power2.inOut"
            }
        })
        slideTl.fromTo(revealImg,{x:'0%'},{x:'100%'})
        slideTl.fromTo(img,{scale :2},{scale:1},'-=1')
        slideTl.fromTo(revealText,{x:'0%'},{x:'100%'},'-=0.75')
        slideTl.fromTo(nav,{y:'-100%'},{y:'0%'},'-=0.5');
        //Create Scene

        slideScene = new ScrollMagic.Scene({
            triggerElement:slide,triggerHook:0.75,reverse:false
        }).setTween(slideTl).addTo(contoller);

        //New Animation

        const pageTl =gsap.timeline();
        let nextSlide = slides.length5-1 === index ?'end' : slides[index+1];
        pageTl.fromTo(nextSlide,{y:'0%'},{y:'50%'})
        pageTl.fromTo(slide,{opacity:1,scale:1},{opacity:0,scale:0})
        pageTl.fromTo(nextSlide,{y:'50%'},{y:'0%'},'-=0.5%')
        pageScene =new ScrollMagic.Scene({
            triggerElement:slide,duration:'100%',triggerHook:0
        }).setPin(slide,{pushFollowers:false}).setTween(pageTl).addTo(contoller)

        //Create new Scene
    })

}
const mouse = document.querySelector('.cursor');
const mouseTxt =mouse.querySelector('span');
const burger = document.querySelector('.burger');
function cursor(e){
  
    mouse.style.top = e.pageY+'px';
    mouse.style.left = e.pageX+'px';

}
function activeCursor(e){
    const item =e.target;
    if(item.id === 'logo' || item.classList.contains('burger')){
        mouse.classList.add('nav-active')
    }else{
        mouse.classList.remove('nav-active');
        }
    if(item.classList.contains('explore')){
      mouse.classList.add('explore-active');  
      gsap.to('.title-swipe',1,{x:"0%"})
      mouseTxt.innerText='Tap';
    }else{
        mouse.classList.remove('explore-active');  
        gsap.to('.title-swipe',1,{x:"100%"});
        mouseTxt.innerText=''
    }

}
function navToggle(e){
    if(!e.target.classList.contains('active')){
    e.target.classList.add('active');
    gsap.to('.line1',0.5,{rotate:'45',y:5,background:'white'});
    gsap.to('.line2',0.5,{rotate:'-45',y:-5,background:'white'});
    gsap.to('#logo',1,{color:'white'});
    gsap.to('.nav-bar',1,{clipPath:'circle(2500px at 100% -10%'})
    document.body.classList.add('hide');
    }else{
    e.target.classList.remove('active')
    gsap.to('.line1',0.5,{rotate:'0',y:5,background:'black'});
    gsap.to('.line2',0.5,{rotate:'0',y:0,background:'black'});
    gsap.to('#logo',1,{color:'black'});
    gsap.to('.nav-bar',1,{clipPath:'circle(50px at 100% -10%'})
    document.body.classList.remove('hide');
    }
}
burger.addEventListener('click',navToggle)
window.addEventListener('mousemove',cursor);
window.addEventListener('mouseover',activeCursor);

animeSlides();

