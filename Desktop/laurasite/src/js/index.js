import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting";
import { gsap } from 'gsap';

// Call the splittingjs to transform the data-splitting texts to spans of chars
Splitting();

// DOM elements
let DOM = {
    content: {
        home: {
            section: document.querySelector('.content__item--home'),
            get chars() {
                return this.section.querySelectorAll('.content__paragraph .word > .char, .whitespace');
            },
            isVisible: true
        },
        about: {
            section: document.querySelector('.content__item--about'),
            get chars() {
                return this.section.querySelectorAll('.content__paragraph .word > .char, .whitespace')
            },
            get picture() {
                return this.section.querySelector('.content__figure');
            },
            isVisible: false
        }
    },
    links: {
        about: {
            anchor: document.querySelector('a.frame__about'),
            get stateElement() {
                return this.anchor.children;
            }
        },
        home: document.querySelector('a.frame__home')
    }
};

// The gsap timeline (and some default settings) where the magic happens
const timelineSettings = {
  staggerValue: 0.025,
  charsDuration: 0.7
};
const timeline = gsap.timeline({paused: true})
    .addLabel('start')
    // Stagger the animation of the home section chars
    .staggerTo( DOM.content.home.chars, timelineSettings.charsDuration, {
        ease: 'Power3.easeIn',
        y: '-103%',
        rotation:8
    }, timelineSettings.staggerValue, 'start')
    // Here we do the switch
    // We need to toggle the current class for the content sections
    .addLabel('switchtime')
    .add( () => {
        DOM.content.home.section.classList.toggle('content__item--current');
        DOM.content.about.section.classList.toggle('content__item--current');
    })
    // Change the body's background color

    // Start values for the about section elements that will animate in
    .set(DOM.content.about.chars, {
        y: '100%'
    }, 'switchtime')
    .set(DOM.content.about.picture, {
        y: '80%',
        rotation: 0,

    }, 'switchtime')
    // Stagger the animation of the about section chars

    .staggerTo( DOM.content.about.chars, timelineSettings.charsDuration, {
        ease: 'Power3.easeOut',
        y: '0%'

    }, timelineSettings.staggerValue, 'switchtime')
    // Finally, animate the picture in
    .to( DOM.content.about.picture, 0.8, {
        ease: 'Power3.easeOut',
        y: '0%',
        opacity: 1,
        rotation: 0
    }, 'switchtime+=0.6');

// Clicking the about and homepage links will toggle the content area, by playing and reversing the timeline
// Need to switch current state for the about/close links
const switchContent = () => {
    DOM.links.about.stateElement[0].classList[DOM.content.about.isVisible ? 'add' : 'remove']('frame__about-item--current');
    DOM.links.about.stateElement[1].classList[DOM.content.about.isVisible ? 'remove' : 'add']('frame__about-item--current');
    timeline[DOM.content.about.isVisible ? 'reverse' : 'play']();
    DOM.content.about.isVisible = !DOM.content.about.isVisible;
    DOM.content.home.isVisible = !DOM.content.about.isVisible;
};

DOM.links.about.anchor.addEventListener('click', () => switchContent());
DOM.links.home.addEventListener('click', () => {
    if ( DOM.content.home.isVisible ) return;
    switchContent();
});




var myCanvas = document.getElementById('blue');
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Composites = Matter.Composites,
    Common = Matter.Common,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    World = Matter.World,
    Bodies = Matter.Bodies;

// create engine
var engine = Engine.create(),
    world = engine.world;



// create renderer
var render = Render.create({
  canvas: myCanvas,
  engine: engine,
  options: {
    width: window.innerWidth,
    height: window.innerHeight,
    background: 'transparent',
    showAngleIndicator: false,
    wireframes: false
  }
});


engine.world.gravity.y = 0;

  Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    // add bodies
    var offset = 30,
        options = {
            isStatic: true,
            render: {
              fillStyle: 'blue'
            }
        };

    world.bodies = [];

  World.add(world, [
    Bodies.rectangle(0, 600, 1800, 10, { isStatic: true, }),
    Bodies.rectangle(0, 0, 1800, 10, { isStatic: true }),
    Bodies.rectangle(600-1000, 0, 10, 1200, { isStatic: true }),
    Bodies.rectangle(750, 0, 10, 1200, { isStatic: true })
    ]);



    var ball1 = Bodies.circle(320, 255, 95, {
      restitution: 0.5,
      render: {
        fillStyle: 'transparent',
       strokeStyle: '#000',
       lineWidth: 0.5

        // sprite: {
        //   texture: 'http://workbypost.com/mike/2trump.png'
        // }
      }
    })

    var ball2 = Bodies.circle(320, 255, 175, {
      restitution: 0.5,
      render: {
        fillStyle: 'transparent',
       strokeStyle: '#000',
       lineWidth: 0.5
        // sprite: {
        //   texture: 'http://workbypost.com/mike/2trump.png'
        // }
      }
    })

    var ball3 = Bodies.circle(200, 255, 125, {
      restitution: 0.5,
      render: {
        fillStyle: 'transparent',
       strokeStyle: '#000',
       lineWidth: 0.5
        // sprite: {
        //   texture: 'http://workbypost.com/mike/2trump.png'
        // }
      }
    });

    World.add(world, [ball1, ball2, ball3]);

    // World.add(world, stack);

    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    World.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: 420, y: 600 }
    });
