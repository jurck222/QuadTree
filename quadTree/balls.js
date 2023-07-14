import { AABB } from "./AABB.js";
import { QuadTree } from "./QuadTree.js";
export class balls{
    constructor(x,y,dx,dy,size,radius){
        this.x = x;
        this.y=y;
        this.dx=dx;
        this.dy=dy;
        this.size=size;
        this.radius=radius;
        this.trk = false;
    }

    draw(){
        ctx.beginPath();
        if(this.trk){
            ctx.fillStyle="#FF0000";
            ctx.strokeStyle="#FF0000";
        }
        else{
            ctx.fillStyle = "#000000";
            ctx.strokeStyle="#000000";
        }
        ctx.arc(this.x,this.y,this.size,0,this.radius)  
        ctx.fill();  
        ctx.stroke();
    }

    update() {
		if(this.x+this.radius>width||this.x-this.radius<0) {
			this.dx=-this.dx;
		}
		if(this.y+this.radius>height || this.y-this.radius<0) {
			this.dy=-this.dy;
		}
		this.x+=this.dx;
		this.y+=this.dy;
		this.draw();
        
	}
    intersects(krozec){
        let d=Math.sqrt((this.x-krozec.x)+(this.y-krozec.y)) ;
        if (d<=this.radius*2)
            return true;
        else 
            return false;
    }
}
const canvas = document.querySelector("canvas");
const width  = window.innerWidth - 100;
const height = window.innerHeight - 100;
canvas.width = width;
canvas.height = height;
const ctx = canvas.getContext('2d');
const mreza = document.getElementById("mreza");
const input = document.getElementById("zogice");
input.value = 1000;
let st = input.value;
let balss = [];
let ball=new balls();
let qt = new QuadTree(new AABB());
for(let i =0; i<st;i++){
    let dx = ( Math.random() - 0.5 ) * 2;
  	let dy = ( Math.random() - 0.5 ) * 2;
    let radius = 2*Math.PI;
    ball=new balls(Math.random() * canvas.clientWidth, Math.random() * canvas.clientHeight,dx,dy,10,radius);
    ball.draw();
    balss.push(ball);
    qt.insert(ball);
}

input.addEventListener("change",function(){
    balss=[];
    st=input.value;
    for(let i =0; i<st;i++){
        let dx = ( Math.random() - 0.5 ) * 2;
        let dy = ( Math.random() - 0.5 ) * 2;
        let radius = 2*Math.PI;
        ball=new balls(Math.random() * canvas.clientWidth, Math.random() * canvas.clientHeight,dx,dy,10,radius);
        ball.draw();
        balss.push(ball);
        qt.insert(ball); 
    }
})

function getCursorPosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    let radius = 2*Math.PI;
    let dx = ( Math.random() - 0.5 ) * 2;
  	let dy = ( Math.random() - 0.5 ) * 2;
    ball=new balls(x,y,dx,dy,10,radius);
    qt.insert(ball);
    ball.draw();
    balss.push(ball)
    input.value=balss.length;
}

canvas.addEventListener('mousedown', function(e) {
    getCursorPosition(canvas, e)
});

function animate() {
	requestAnimationFrame( animate );
	ctx.clearRect( 0, 0, width,height );
    qt=new QuadTree(new AABB());
	for( let i = 0; i < balss.length; i++ ) {
		balss[i].update();
        balss[i].trk=false;
        qt.insert(balss[i]);
	}
    if(mreza.value=="on"){
    drawQt(qt);
    }
    for(let i = 0; i <balss.length; i++ ){
        let range = new AABB(balss[i].x,balss[i].y,balss[i].radius*2,balss[i].radius*2);
        let krozci2=qt.queryRange(range,[]);
        for(let j = 0; j<krozci2.length;j++){
            if(balss[i]!==krozci2[j] && balss[i].intersects(krozci2[j])){
                balss[i].trk = true;
                krozci2[j].trk = true;
            }
        }
    }
}
animate();

function drawQt(qt){
    for (let i = 0; i < qt.kvadranti.length; i++) {
        drawQt(qt.kvadranti[i]);
    }
    ctx.beginPath();
    ctx.strokeStyle = "#000000";
    ctx.strokeRect(qt.meje.x, qt.meje.y, qt.meje.w, qt.meje.h);
    ctx.stroke();
}


mreza.addEventListener("change",function(){
    if(mreza.value=="off"){
        mreza.value="on";
    }
    else{
    mreza.value="off";
    }
})