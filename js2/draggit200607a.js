//draggit200604a.js
/*
requires jquery...
just do in index.html
<script src="js/draggit200604a.js"></script>
and create 3 divs (two for SVG-pictures, one - as an eventsListener)
and write ... after "DocumentReady"
 somewhere: 
  	draw1s = SVG('div022').size(wTH, hTH);
	draw0s = SVG('div021').size(wTH, hTH);
	dr2 = new draggit('div023',wTH,hTH,draw0s,draw1s);
	dr2.DRW_1();
	dr2.DRW_0();  
	touchAndTimeEvents2(dr2);
*/
var superDX = 0; 
var superDY = 0;
//>>-square() - - - - - - - - - - - - - - -
function square(boss,x1,y1,wi,he, svGroup){ //svGroup - a link to an SVG_group
	this.boss = boss;
  this.Bx=this.cX=x1; 
  this.By=this.cY=y1; 
  this.nX=x1;
  this.nY=y1;
  this.wi=wi; this.he=he; 
  this.pressed=0;
  this.draG=false;
  this.visible = false;//don't know yet what for
  this.active = true; 
  this.svGroup = svGroup
//this.pont = diVo;
//pont.move(this.nX, this.nY); //using SVGJS - move "the tool" to the actual XY-position
	this.setPict = function(svgstr){
		this.svGroup.clear()
    	this.svGroup.svg(svgstr)
    }
  
  this.setSize = function(wi,he){
    	this.wi=wi; this.he=he;   
  }
  this.setBasePos = function(x23,y23){
    	this.Bx=this.cX=this.nX=x23; 
    	this.By=this.cY=this.nY=y23;
            this.Time_move(x23,y23);
  }
  this.setCurrentPos= function(nx,ny){
        this.Time_move(nx,ny);
        this.cX=this.nX; 
    	this.cY=this.nY;
  }
  this.setOff = function(){
    	this.active = false;
    	$(this.id).hide();
  }
  this.setOn = function(){
    	this.active = true;
    	$(this.id).show();
  }
  
  this.B_down = function(x,y){;}
  this.B_up0 = function(){;}
  this.B_up2 = function(){;}
  this.N_move = function(x,y){;}
  this.Time_move = function(x,y){;}
  
  
//>>-G_down - - - - - - - - - - - - - - - - - - - -  
  this.G_down = function (x,y) {
    console.log(x+","+y+"\n"+this.Bx+","+this.By+"\n"+this.wi+","+this.he)
    if ((x > this.Bx) && (x < this.Bx+this.wi) &&
  (y > this.By) && (y < this.By+this.he) ){
            $('#indic').css({'background-color':'#090909'});
      this.draG=true;
      this.A_down(x,y);
      this.B_down(x,y);
      return false;
  }
    else {return true;}
}
//>>-G_move - - - - - - - - - - - - - - - - - - - - 
  this.G_move = function (dx,dy) {
    	if (this.draG){
    		this.nX = this.Bx+dx;
    		this.nY = this.By+dy;
          	this.N_move(this.nX,this.nY);
    	}
    }
//>>-G_up - - - - - - - - - - - - - - - - - - - - -
  this.G_up = function (x,y) {
    if (this.draG){
    //      $('#indic').css({'background-color':'#FFFFF6'});
    this.draG=false;
      	console.log("UPPPP-"+this.boss.mousePath);
    this.setBasePos(this.nX,this.nY);
    if (this.boss.mousePath > -4){this.B_up0();}
      					else {this.B_up2();}
    }
  }
//>>- - - - - - - - - - - - - - - - - - - - -
  this.A_down = function(x,y){
  this.Bx=this.cX;
  this.By=this.cY;
   }
//  -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -
}
//>>-draggit() --------------------------------------------------
function draggit(name,wTH,hTH,draw0,draw1){
  
 this.host_div = document.getElementById(name); //where to put our new divs
 this.name = name;
  this.pressed=0;
  this.Mx=0; this.My=0;
  //this.visible = false;//don't know yet what for
  this.active = true; /*<-*/
 this.mousePath = -1; //did user moved the mouse between btnDOWN and btnUP
 this.tOuched = -1; //the number of the 'selected' square in M[]array 
 this.tOuchLr = 0;
  
 this.dMx = 0;
 this.dMy = 0;
 this.DX = $(this.host_div).offset().left; 
 this.DY = $(this.host_div).offset().top;
 var s = this;
  
  	this.down1 = function(){;}
	this.move1 = function(x,y){;}
	this.move2 = function(x,y){;}
	this.up1 = function(x,y){;}
	this.up2 = function(x,y){;}
  	this.up3 = function(x,y){;}
	this.up4 = function(x,y){;}
  
    this.Mt = []
    this.Mt[0] = []
	this.Mt[1] = []
    this.Mt[0][0] = new square(this, -1, -1, 0, 0); //will be background
  
  this.svgLinks; //for showing and hiding golink rectangles
this.lnks=[];  //lnk objects to compare coordinates
this.countSvgLinks = 0; //the counter for lnk objects
  
  /*this.M[0] = new square(this, 250, 250,150,150);
  this.M[0].B_move = function(x,y){this.boss.move1(x,y);}
  this.M[0].setCurrentPos(250,250);
  
  this.M[1] = new square(this, 0, 0,1500,1500);
  this.M[1].B_move = function(x,y){this.boss.move2(x,y);}
  this.M[1].setCurrentPos(0,0);
  this.M[1].A_up = function(x,y){console.log("Bx="+this.Bx);}
    this.M[1].A_down = function(x,y){console.log("Bx="+this.Bx);}
  */
//>>-ESX_DRW_clc_1_0 - - - - - - - - - - 
  this.ESX_1 = wTH/2;
  this.ESY_1 = hTH/2;
  this.kf_1 = 0.5;
  this.draw_1 = draw1;
  this.wTH = wTH;
  this.hTH = hTH;
// - - - - - - - - - - - - - - - - - - - - - - - - - - 
  this.ESX_0 = wTH/2;
  this.ESY_0 = hTH/2;
  this.kf_0 = 0.5;
  this.draw_0 = draw0;
// - - - - - - - - - - - - - - - - - - - - - - - - - - 
  //s.draw = SVG(s.name).size(s.wTH, s.hTH);
// - - - - - - - - - - - - - - - - - - - - - - - - - -   
  this.DRW_1 = function(){
    s.draw_1.viewbox(s.ESX_1-s.kf_1*s.wTH/2,
    s.ESY_1-s.kf_1*s.hTH/2,s.wTH*s.kf_1, s.hTH*s.kf_1);}
// - - - - - - - - - - - - - - - - - - - - - - -
    this.DRW_0 = function(){
    s.draw_0.viewbox(s.ESX_0-s.kf_0*s.wTH/2, s.ESY_0-s.kf_0*s.hTH/2,
    s.wTH*s.kf_0, s.hTH*s.kf_0);}
// - - - - - - - - - - - - - - - - - - - - - - -
this.clcX0 = function (x){return /*Math.round*/(s.ESX_0+(x-s.wTH/2)*s.kf_0);}
this.clcY0 = function (y){return /*Math.round*/(s.ESY_0+(y-s.hTH/2)*s.kf_0);}
this.clcX1 = function (x){return /*Math.round*/(s.ESX_1+(x-s.wTH/2)*s.kf_1);}
this.clcY1 = function (y){return /*Math.round*/(s.ESY_1+(y-s.hTH/2)*s.kf_1);}
//----------------------------------------------------------------------
  this.newSquare = function(LrNm, x, y, w, h){
    
    var g23 = s.draw_0
    if (LrNm == 1) { g23 = s.draw_1;}
    var grp = g23.group();
    grp.circle(80).fill("#FF5500").opacity(0.8);  
console.log("nEEEw="+LrNm)
    //grp - a lonk to an SVG_group somewhere in s.draw_0 or s.draw_1
	t23 = new square(this, x, y, w, h, grp);
	this.Mt[LrNm].push(t23);
    return this.Mt[LrNm][this.Mt[LrNm].length - 1]
    }  
  
//Mt[0] - layer 0 (on the bottom) it is connected to the div
//Mt[1] - layer on the top (tools...)
 //-------------------------------------------------------------------  
kan23 = undefined
var aLr = 0
 //-------------------------------------------------------------------
this.G_DowN = function (x,y){
var s = this; 
 // kva = s.draw_DR.circle(50).fill("#000000").opacity(0.2).move(s.clcX(x),s.clcY(y)); //.opacity(0.8);
    console.log(x+">>"+y)
  s.mousePath = 0;
  s.Mx = x;
  s.My = y;
  for (var j23 = s.Mt[1].length-1; j23 >= 0; j23--){ //Mt[1] - top layer (tools) 
     if(!s.Mt[1][j23].G_down(s.clcX1(x),s.clcY1(y))){
          kan23 = s.draw_1.rect(s.Mt[1][j23].wi,s.Mt[1][j23].he).
          fill("none").stroke({width:1,color:"green"}).
          move(s.Mt[1][j23].Bx,s.Mt[1][j23].By);
       
       	s.tOuched = j23;
        s.tOuchLr = 1; //what layer the touched object on? 1-is the top (tools)
          return;
		}
  }//for.. search on layer1 (tool-layer)
  
  var j23 = s.Mt[0].length-1;
  for (; j23 > 0; j23--) { //Mt[0] - (objects) layer
		if(!s.Mt[0][j23].G_down(s.clcX0(x),s.clcY0(y))){
          kan23 = s.draw_0.rect(s.Mt[0][j23].wi,s.Mt[0][j23].he).
          fill("none").stroke({width:1,color:"green"}).
          move(s.Mt[0][j23].Bx,s.Mt[0][j23].By)
        	break;
		}
  }// for j23 >0
  if (j23 == 0){   //nobody is picked? let it be the background of layer0 (bottom)
    s.Mt[0][0].draG = true;
    s.Mt[0][0].A_down(x,y);
	}
  //console.log(x+">>"+j23+"<<"+y)     
  s.tOuched = j23;
  s.tOuchLr = 0;
}
//-------------------------------------------------------------------
this.G_move = function(x,y){
	var s = this;
	if(s.mousePath >= 0){s.mousePath++;}
	//two different layers - two different kf
	if (s.tOuchLr == 0){
		s.dMx = (x-s.Mx)*s.kf_0; 
		s.dMy = (y-s.My)*s.kf_0;
		}
	else if (s.tOuchLr == 1){
		s.dMx = (x-s.Mx)*s.kf_1; 
		s.dMy = (y-s.My)*s.kf_1;
		}
	if (s.tOuched >=0){
		s.Mt[s.tOuchLr][s.tOuched].G_move(s.dMx,s.dMy);
	}
}
//-------------------------------------------------------------------
this.G_up = function(){
  console.log("PUNY3");
cud = undefined;
	var s = this;
	s.mousePath = (-1)*s.mousePath;
	s.Mt[s.tOuchLr][s.tOuched].G_up();
	s.tOuched = -1;
	s.mousePath = -1;
  
  if (kan23!=undefined){kan23.remove();}
}
 //---------------------------------------------------------------
this.NeedMove = function(){
	if (cud !== undefined){
		var s = cud;
		console.log("i=");
		for (var Lr = 0; ((Lr < 2)&&(s.Mt !== undefined)); Lr++){  
			for (var i = 0; i < s.Mt[Lr].length; i++){
				if (s.Mt[Lr][i]!== undefined) {
					var ob = s.Mt[Lr][i];
					if ((ob.nX!=ob.cX) || (ob.nY!=ob.cY)) {
                        ob.setCurrentPos(ob.nX,ob.nY);
                        //console.log("i="+i);
					}
				}
			}
		}
	setTimeout(cud.NeedMove,50);
	}
}
//---------------DragDiv_Mouse_Events-------------------
this.touchMove = function(event){ //touch move
	this.G_move(event.changedTouches[0].pageX-this.DX,
		event.changedTouches[0].pageY-this.DY);
        event.preventDefault();
    }
//-----------------------------------------------------
this.touchEnd = function(event) { //touch up
var nyc = event
var propValue;
	this.G_up();
        event.preventDefault();
    }
//-----------------------------------------------------
this.mouseEnd = function(event) {// mouse up
		this.G_up(event.pageX-this.DX,event.pageY-this.DY);
        event.preventDefault();
    }
//-----------------------------------------------------
this.mouseMove = function(event){// mouse move
		//console.log("moooove"+this.Mt);
		this.G_move(event.pageX-this.DX,event.pageY-this.DY);
		event.preventDefault();
    }
//-----------------------------------------------------
this.dvTdown = function(event){
	cud = this;
	this.NeedMove();
	this.G_DowN(event.changedTouches[0].pageX-this.DX,
		event.changedTouches[0].pageY-this.DY);
	event.preventDefault();
}
//-----------------------------------------------------
this.dvMdown = function(event){
	cud = this;
	this.NeedMove();
	this.G_DowN(event.pageX-this.DX,event.pageY-this.DY);
	event.preventDefault();
}
//-----------------------------------------------------
}//function_draggit()
// -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
var cud;
//-----------Add_Mouse_Event_Listeners-------------------------
window.addEventListener('touchmove', function(event){
	if (cud !== undefined){ cud.touchMove(event); }
	}, {passive: false});
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
window.addEventListener('touchend', function(event){
	if (cud !== undefined){ cud.touchEnd(event); }
	}, {passive: false});
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
window.addEventListener('mouseup', function(event){
	if (cud !== undefined){ cud.mouseEnd(event); }
	}, true);
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
window.addEventListener('mousemove',function(event){
	if (cud !== undefined){	cud.mouseMove(event);}
	} , true);
//-----------------------------------------------------------
function touchAndTimeEvents2(drag){
	const dg = drag;
	dg.host_div.addEventListener('touchstart', function(event){dg.dvTdown(event)}
		, {passive: false});
 	dg.host_div.addEventListener('mousedown', function(event){dg.dvMdown(event)} 
		, true);
	//dg.NeedMove();
}
