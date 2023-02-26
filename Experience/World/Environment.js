import * as THREE from "three"
import Experience from "../Experience.js";

export default class Environment {
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        this.setStreetLight();
    }


    setStreetLight() {
        this.textureLoader = new THREE.TextureLoader();
        var textureEquirec = this.textureLoader.load('/textures/street.jpg');
        textureEquirec.mapping = THREE.EquirectangularRefractionMapping;
        textureEquirec.encoding = THREE.sRGBEncoding;

        this.scene.environment = textureEquirec;
        this.scene.environment.mapping = THREE.EquirectangularRefractionMapping;

        this.scene.background = textureEquirec;
        this.scene.backgroundIntensity = 0.01;
    }

    resize(){
    }

    update(){ 
    }
}