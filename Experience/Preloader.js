import {EventEmitter} from "events";
import Experience from "./Experience.js";
import GSAP from "gsap";
import convert from "./Utils/convertDivsToSpans.js"

export default class Preloader extends EventEmitter {
    constructor(){
        super();
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;
        this.world = this.experience.world;
        this.device = this.sizes.device;

        this.sizes.on("switchdevice", (device) => {
            this.device = device;
        });

        this.world.on("worldready", () => {
            this.setAsset();
            this.playIntro();
        });
    }

    setAsset(){
        convert(document.querySelector(".intro-text"));
        convert(document.querySelector(".main_title_one"));
        convert(document.querySelector(".main_title_two"));
        convert(document.querySelector(".main_title_three"));

        this.logos = this.experience.world.logos.actualLogos; 
        this.logosChildren = this.experience.world.logos.logosChildren;
    }

    firstIntro(){
        return new Promise ((resolve) => {
            this.timeline = new GSAP.timeline();
            this.timeline.set(".animatedis", { y: 0, yPercent: 100 });
            this.timeline.to(".preloader", {
                opacity: 0,
                delay: 1,
                onComplete: () => {
                    document
                        .querySelector(".preloader")
                        .classList.add("hidden");
                },
            });

            this.timeline.to(".intro-text .animatedis", {
                yPercent: 0,
                stagger: 0.07,
                ease: "back.out(1)",
                duration: 1,
                onComplete: resolve,
            })

        })
    }

    secondIntro(){
        return new Promise ((resolve) => {
            this.secondTimeline = new GSAP.timeline();

            this.secondTimeline.to(".intro-text .animatedis", {
                delay: 0.5,
                yPercent: 100,
                stagger: 0.07,
                ease: "back.out(1)",
                duration: 1,
                onComplete: resolve,
            })

            if(this.device === "desktop"){
                this.secondTimeline.to(this.logosChildren.cyc.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "Power1.easeInOut(1.2)",
                    duration: 1,
                    onComplete: resolve,
                })
            }else{
                this.logos.scale.set(7, 7, 7);
                this.secondTimeline.to(this.logosChildren.cyc.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "Power1.easeInOut(1.2)",
                    duration: 1,
                    onComplete: resolve,
                })
            }
        })
    }

    thirdIntro(){
        return new Promise ((resolve) => {
            this.thirdTimeline = new GSAP.timeline();

            this.thirdTimeline.to(".main_title_one .animatedis", {
                delay: 0.4,
                yPercent: 0,
                stagger: 0.07,
                ease: "easeInOut",
                duration: 0.6,
            }, "same"
            ).to(".main_title_two .animatedis", {
                delay: 0.6,
                yPercent: 0,
                stagger: 0.07,
                ease: "easeInOut",
                duration: 0.6,
            }, "same"
            ).to(".main_title_three .animatedis", {
                delay: 0.8,
                yPercent: 0,
                stagger: 0.07,
                ease: "easeInOut",
                duration: 0.6,
            }, "same"
            ).to(".main_description", {
                opacity: 1,
                duration: 3,
            }, "same"
            ).to(".main_contact", {
                opacity: 1,
                duration: 3,
            }, "same"
            ).to(".header", {
                opacity: 1,
                duration: 1.4,
            }, "same"
            )

        })
    }

    async playIntro(){
        await this.firstIntro();
        this.playSecondIntro();
    }

    async playSecondIntro(){
        this.scaleFlag = true;
        await this.secondIntro();
        this.playThirdIntro();
    }

    async playThirdIntro(){
        await this.thirdIntro();
        this.scaleFlag = false;
    }

    scale(){
        if(this.device === "desktop"){
            this.logos.scale.set(10, 10, 10);
        }else if(this.device === "mobile"){
            this.logos.scale.set(7, 7, 7);
        }
    }

    update(){
        if(this.scaleFlag){
            this.scale();
        }
    }

}