import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";

export default class Logos {
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.logos = this.resources.items.logos;
        this.actualLogos = this.logos.scene;
        this.logosChildren = {};

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.035
        };

        this.setModel();
        this.onMouseMove();
    }

    setModel(){

        //logos
        this.actualLogos.children.forEach((child) => {
            child.material = new THREE.MeshPhysicalMaterial();
            child.material.clearcoat = 1;
            child.material.transmission = 1;
            child.material.roughness = 0;
            child.material.thickness = 3;
            child.material.ior = 1.3;

            child.scale.set(0, 0, 0);

            this.logosChildren[child.name.toLowerCase()] = child;
        });
        
        this.actualLogos.rotation.x = Math.PI * 0.25;
        this.actualLogos.rotation.y = Math.PI * 0.1;

        this.scene.add(this.actualLogos);
        this.actualLogos.scale.set(10, 10, 10);
        
    }

    onMouseMove(){
        window.addEventListener("mousemove", (e) => {
             this.rotation = ((e.clientX - window.innerWidth / 2)*-2) / window.innerWidth;
             this.lerp.target = this.rotation * 0.9;
        })
    }

    resize(){
    }

    update(){ 
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );

        this.actualLogos.rotation.z = this.lerp.current;
    }
}