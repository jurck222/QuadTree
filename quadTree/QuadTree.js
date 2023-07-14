import { AABB } from "./AABB.js";
import { balls } from "./balls.js";
export class QuadTree{
    constructor(meje=new AABB()){
        this.meje=meje;
        this.kvadranti=[];
        this.circles=[];
        this.deljen=false;
    }
    insert(krogec) {
        if(!this.meje.contains(krogec)){
            return false;
        }
        if(this.circles.length<max_objects && !this.deljen){
            this.circles.push(krogec);
            return true;
        }
        if(!this.deljen){
            this.subdivide();
        }
        return (
            this.kvadranti[0].insert(krogec) || this.kvadranti[1].insert(krogec) ||this.kvadranti[2].insert(krogec) ||this.kvadranti[3].insert(krogec)
          );
    }
    subdivide() {
        this.kvadranti.push(
            new QuadTree(new AABB(
                this.meje.x,this.meje.y,this.meje.w/2,this.meje.h/2)));
            this.kvadranti.push(
            new QuadTree(new AABB(this.meje.x+this.meje.w/2,this.meje.y,this.meje.w/2,this.meje.h/2)));
            this.kvadranti.push(
            new QuadTree(new AABB(this.meje.x,this.meje.y+this.meje.h/2,this.meje.w/2,this.meje.h/2)));
            this.kvadranti.push(
            new QuadTree(new AABB(this.meje.x+this.meje.w/2,this.meje.y+this.meje.h/2,this.meje.w/2,this.meje.h/2)));
        this.deljen = true;
    } 
    queryRange(boundry, krozci) {
        if(!boundry.intersects(this.meje)){
            return krozci;
        }
        for(let i = 0; i < this.circles.length; i++){  
            if(boundry.contains(this.circles[i])){
                krozci.push(this.circles[i]);
            }
        }
        if (this.deljen) {
            this.kvadranti[0].queryRange(boundry,krozci);
            this.kvadranti[1].queryRange(boundry,krozci);
            this.kvadranti[2].queryRange(boundry,krozci);
            this.kvadranti[3].queryRange(boundry,krozci);
          }
        return krozci;
    }
}
const max_objects = 3;




