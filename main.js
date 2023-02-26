import Experience from './Experience/Experience.js'

const experience = new Experience(document.querySelector(".experience-canvas"))

const title = document.querySelector(".main_title_two");
const description = document.querySelector(".main_description h2");
const headerLink = document.querySelector(".header a.on")

title.onclick = function(){
    const colorCode = "#" + Math.round( Math.random() * 0xFFFFFF).toString(16);
    title.style.color = colorCode;
    description.style.color = colorCode;
    headerLink.style.color = colorCode;
}

description.onclick = function(){
    const colorCode = "#" + Math.round( Math.random() * 0xFFFFFF).toString(16);
    title.style.color = colorCode;
    description.style.color = colorCode;
    headerLink.style.color = colorCode;
}