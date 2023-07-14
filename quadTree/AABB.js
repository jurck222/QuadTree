import { balls } from "./balls.js";
export class AABB{
    constructor(x = 0, y = 0, w = ctx.canvas.width, h = ctx.canvas.height) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    contains(krozec){
        if(krozec.x+krozec.radius/2>=this.x-this.w && krozec.x+krozec.radius/2<=this.x+this.w &&krozec.y+krozec.radius/2>=this.y-this.h && krozec.y+krozec.radius/2<=this.y+this.h ){
            return true;
        }
        else{
            return false;
        }
    }
    intersects(a){
        if(this.x < a.x + a.w && this.x + this.w > a.x && this.y < a.y + a.h && this.y + this.h > a.y){
            return true;
        }
        else{
            return false;
        }
    }
}
const canvas = document.querySelector("canvas");
const width  = window.innerWidth - 100;
const height = window.innerHeight - 100;
canvas.width = width;
canvas.height = height;
const ctx = canvas.getContext('2d');