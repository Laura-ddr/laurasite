import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting";
import { gsap } from 'gsap';
window.addEventListener("load", () => {
Splitting();
///////////////////////////////// timeline Loader /////////////////////////////////
  let tl2 = gsap.timeline({
    onComplete: pushContent
  });
///////////////////////////////// Timer /////////////////////////////////
    var Cont = { val: 1993 },
    NewVal = 2021;
    TweenLite.to(Cont, 5, {
      val: NewVal,
      roundProps: "val",
      delay: 2,
      onUpdate: function () {
        document.getElementById("counter").innerHTML = Cont.val;
      }
    });
///////////////////////////////// Apparition du timer par le bas /////////////////////////////////
  tl2.to("#counter", { y: "0%", duration: 1, stagger: 0.2, delay: 0.5, ease: Power2.easeOut});
///////////////////////////////// disparition du timer par le haut /////////////////////////////////
  tl2.to("#counter", { y: "-100%", duration: 1, stagger: 0.2, delay: 5 ,ease: Power2.easeIn});
///////////////////////////////// lancement de la timeline pour l'animation de la home à la fin de la timeline loader/////////////////////////////////
  function pushContent() {
    TweenMax.to(".loader", { y:"-100%",borderRadius: "-=100%", ease: Power3.easeOut,duration: 2});
    tl.play();
  }
///////////////////////////////// timeline home gsap + spliting.js /////////////////////////////////
let DOM = {
    content: {
        home: {
            section: document.querySelector('.content__item--home'),
            get chars() {
                return this.section.querySelectorAll('.content__paragraph .word > .char, .whitespace');
            },
        },
    },
};
const tlSettings = {
  staggerValue: 0.050,
  charsDuration: 1.8
};
const tl = gsap.timeline({ paused: true });

  tl.to([".frame__home-title"], {
    y: "0%",
    duration: 1.2,
    ease: Power2.easeOut
  },1);

  tl.to(".frame-title-center", {
    y: "0%",
    duration: 1.2,
    ease: Power2.easeOut,
    stagger: 0.1
  },1)

  tl.to(".anim", {
      y: "0%",
      duration: 1.2,
      ease: Power2.easeOut
    },1)

  .staggerFrom( DOM.content.home.chars, tlSettings.charsDuration, {
        ease: 'Power3.easeOut',
        y: '35vh',
        rotation:8,
    },tlSettings.staggerValue,0)

});
