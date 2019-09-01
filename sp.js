document.addEventListener('DOMContentLoaded', onReady);
document.addEventListener('keydown', kDown);
document.addEventListener('keyup', kUp);
setInterval(controlClick,100);
var gWindow;
var player={vx:0,vy:0,cx:0,cy:0,angle:0};
player.bl=new Array(0);
var kState=[0,0,0,0,0,0];
var line={ax:50,ay:50,bx:150,by:120};
var lineList=[];
lineList.push(line);
line={ax:50,ay:170,bx:150,by:240};
lineList.push(line);
line={ax:150,ay:200,bx:50,by:130};
lineList.push(line);
line={ax:50,ay:200,bx:150,by:130};
lineList.push(line);
//for (let i=0;i<10;i++){
//lineList.push({ax:Math.random()*300,ay:Math.random()*300,bx:Math.random()*300,by:Math.random()*300});
//}

function onReady(){
	//document.getElementById("startButton").onmouseup = startButtonClick;
	//document.onkeyup= controlClick;
	var gWd=document.getElementById("gWindow");
	gWindow=gWd.getContext('2d');
	gWindow.fillStyle = 'rgb(50, 50, 50)';
	gWindow.fillRect(0, 0, gWindow.canvas.width-1, gWindow.canvas.height-1);	
}

function kDown(kBoard){
	var key=kBoard.keyCode;
	//console.log(key);
	switch (key){
		case 87:kState[0]=1; break; 
		case 83:kState[1]=1; break;
		case 65:kState[2]=1; break; 
		case 68:kState[3]=1; break;
		case 69:kState[4]=1; break;
	}	
}
function kUp(kBoard){
	var key=kBoard.keyCode;
	//console.log(key);
	switch (key){
		case 87:kState[0]=0; break; 
		case 83:kState[1]=0; break;
		case 65:kState[2]=0; break; 
		case 68:kState[3]=0; break;
		case 69:kState[4]=0; break;
	}	
}

function getMod(a,b){
	return Math.sqrt(a*a+b*b);
}

class Vector{
	constructor(x,y){
	this.x=x;
	this.y=y;
	this.mod=getMod(x,y);
	}
	render(wnd){
	}
}
class Line{
	constructor(a,b){
	this.a=new Vector(a.x,a.y);
	this.b=new Vector(b.x,b.y);
	this.mod=getMod(a.x-b.x,a.y-b.y);
	}
	render(wnd){
	}
}

function solveLine(ar,pla){
if (ar[0]<ar[1]){}else{let ab=ar[0];ar[0]=ar[1];ar[1]=ab; ab=ar[2];ar[2]=ar[3];ar[3]=ab;}
var a1=ar[0]-ar[1];
var b1=ar[2]-ar[3];
var a2=ar[4]-ar[5];
var b2=ar[6]-ar[7];

//var k1,k2;
//if (Math.abs(a1)>0.01){k1=b1/a1;}else{k1=999999;}
//if (Math.abs(a2)>0.01){k2=b2/a2;}else{k2=999999;}
var k1=b1/a1;
var k2=b2/a2;
console.log(k1+' '+k2);
var bb1=ar[2]-ar[0]*k1;
var bb2=ar[6]-ar[4]*k2;
var px=(bb2-bb1)/(k1-k2);
var py=k1*px+bb1;
//var na=Math.atan(1/k1)-1.57;
var na=Math.asin(b1/getMod(a1,b1));
//var pa=Math.asin(b2/getMod(a2,b2));
var pa=3.14+pla;//player.angle;
var normx=Math.sin(na);
var normy=Math.cos(na);
var anx=Math.sin(na-(pa-na));
var any=Math.cos(na-(pa-na));
gWindow.beginPath();
gWindow.moveTo(ar[0],ar[2]);
gWindow.lineTo(ar[0]+normx*10,ar[2]+normy*10);
gWindow.moveTo(ar[0],ar[2]);
gWindow.lineTo(ar[0]+anx*10,ar[2]+any*10);
gWindow.closePath();
gWindow.stroke();

if  (((px>=Math.min(ar[0],ar[1]))&&(px<=Math.max(ar[0],ar[1])))&&
	((py>=Math.min(ar[2],ar[3]))&&(py<=Math.max(ar[2],ar[3])))&&
	((px>=Math.min(ar[4],ar[5]))&&(px<=Math.max(ar[4],ar[5])))&&
	((py>=Math.min(ar[6],ar[7]))&&(py<=Math.max(ar[6],ar[7])))){	
	gWindow.beginPath();
	gWindow.rect(px,py,2,2);
	gWindow.closePath();
	gWindow.stroke();
	
	return [px,py,true,anx,any,na-(pa-na)];
}

return [px,py,false,anx,any,na-(pa-na)];
}

function controlClick(){
		var i;
		for (i=0;i<player.bl.length;i++){
			player.bl[i].cx+=30*Math.sin(player.bl[i].angle);
			player.bl[i].cy+=30*Math.cos(player.bl[i].angle);
			player.bl[i].time--;
		}
		player.bl=player.bl.filter(function a(it,i,arr){return it.time>0;});
		
		//
		//
		
		//var lppx=Math.max(player.cx+player.vx+lpx,player.cx+player.vx);
		//var lppy=Math.max(player.cy+player.vy+lpy,player.cy+player.vy);
		//var rsx=solveLine([line.ax,line.bx,line.ay,line.by,player.cx+player.vx,player.cx+player.vx+lpx,player.cy,player.cy+lpy]);
		//var rsy=solveLine([line.ax,line.bx,line.ay,line.by,player.cx,player.cx+lpx,player.cy+player.vy,player.cy+player.vy+lpy]);
		//if (!rsx[2]){
		player.cx+=player.vx;
		//} else {player.cx=rsx[0]-lpx; player.vx=Math.sin(Math.atan(rsx[3])+1.57)*player.vx; player.vy=Math.cos(Math.atan(rsx[3])+1.57)*player.vy;}
		//if (!rsy[2]){
		player.cy+=player.vy;
		//} else{player.cy=rsy[1]-lpy;player.vx=Math.sin(Math.atan(rsy[3])+1.57)*player.vx; player.vy=Math.cos(Math.atan(rsy[3])+1.57)*player.vy;}
		player.vx=player.vx*0.85;
		player.vy=player.vy*0.85;
		
		if (kState[0]==1){
			player.vx+=1*Math.sin(player.angle); 
			player.vy+=1*Math.cos(player.angle);
		}
		if (kState[1]==1){		
			player.vx-=1*Math.sin(player.angle);
			player.vy-=1*Math.cos(player.angle);			
		}		
		if (kState[2]==1){
			player.angle+=0.05+0.02*getMod(player.vx,player.vy);
		}
		if (kState[3]==1){
			player.angle-=0.05+0.02*getMod(player.vx,player.vy);
		}
		if (kState[4]==1){
			//player.angle-=0.02*getMod(player.vx,player.vy);
			player.bl.push({cx:player.cx,cy:player.cy,angle:player.angle,time:100});
			player.vx-=1*Math.sin(player.angle);
			player.vy-=1*Math.cos(player.angle);
		}
	render();
	var i,k;
	//var cols=[]
	for (let k=0;k<3;k++){
	for (let j=0;j<lineList.length;j++){
	let line=lineList[j];
	for (i=0;i<player.bl.length;i++){
	var pl=player.bl[i];
	var lpx=Math.sin(pl.angle);
	var lpy=Math.cos(pl.angle);
	var rs=solveLine([line.ax,line.bx,line.ay,line.by,pl.cx,pl.cx+lpx*30,pl.cy,pl.cy+lpy*30],pl.angle);
	if (rs[2]==true){
		//cols.push(rs[2]);
		//pl.vx=getMod(pl.vx,pl.vy)*rs[3]; 
		//pl.vy=getMod(pl.vx,pl.vy)*rs[4];
		pl.angle=rs[5];
		pl.cx=rs[0]+rs[3];
		pl.cy=rs[1]+rs[4];
		}
	}
	}
	}
	for (let i=0;i<lineList.length;i++){
	let line=lineList[i];
	var lpx=Math.sin(player.angle);
	var lpy=Math.cos(player.angle);
	var rs=solveLine([line.ax,line.bx,line.ay,line.by,player.cx,player.cx+lpx*10,player.cy,player.cy+lpy*10],player.angle);
	//var an=player.angle+2*Math.asin(rs[3]);
	if (rs[2]==true){
		player.vx=getMod(player.vx,player.vy)*rs[3]; 
		player.vy=getMod(player.vx,player.vy)*rs[4];
		player.angle=rs[5];
		player.cx=rs[0]+rs[3];
		player.cy=rs[1]+rs[4];
		}
	}
}


function render(){
	//gWindow.
	gWindow.fillStyle = 'rgb(50, 50, 50)';
	gWindow.fillRect(0, 0, gWindow.canvas.width-1, gWindow.canvas.height-1);
	gWindow.beginPath();
	gWindow.moveTo(player.cx,player.cy);
	gWindow.lineTo(player.cx+10*Math.sin(player.angle),player.cy+10*Math.cos(player.angle));
	gWindow.closePath();
	gWindow.stroke();
	
	var i;
	for (i=0;i<player.bl.length;i++){
		gWindow.beginPath();
		gWindow.moveTo(player.bl[i].cx,player.bl[i].cy);
		gWindow.lineTo(player.bl[i].cx+Math.min(player.bl[i].time,10)*Math.sin(player.bl[i].angle),
			player.bl[i].cy+Math.min(player.bl[i].time,10)*Math.cos(player.bl[i].angle));
		gWindow.closePath();
		gWindow.stroke();
	}
	for (i=0;i<lineList.length;i++){
	var line=lineList[i];
	gWindow.beginPath();
	gWindow.moveTo(line.ax,line.ay);
	gWindow.lineTo(line.bx,line.by);
	gWindow.closePath();
	gWindow.stroke();
	}
	
}