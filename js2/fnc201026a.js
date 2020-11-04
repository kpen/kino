/////////////////////////>>-Document_ready /////////////////////////////
$( document ).ready(function() {/*->document_ready*/
// touchEvents(); // touchevent.js
 
    window.onresize = function() {
      $(document.body).width(window.innerWidth).height(window.innerHeight);
    }
 //-------------------------------------------------------------------
    $(function() {
      window.onresize();
    });
 //-------------------------------------------------------------------	
	wT = $( document ).width();	
	hT = $( document ).height();
	wTH=Math.round((wT/100)*90);
	hTH=Math.round((hT/100)*80);
	draw1 = SVG('div012').size(wTH, hTH);
	draw0 = SVG('div011').size(wTH, hTH);
	dr1 = new draggit('div013',wTH,hTH,draw0,draw1);
dr1.ESX_0 = 100;
dr1.ESY_0 = 160;
	dr1.DRW_1();
	
	dr1.DRW_0();
  
touchAndTimeEvents2(dr1);
setPanMenu(dr1)
var o24 = aDDsVG2(dr1,1,
'<path\
       d="M 8 0 L 8 8 L 0 8 L 0 16 L 8 16 L 8 24 L 16 24 \
		L 16 16 L 24 16 L 24 8 L 16 8 L 16 0 L 8 0 z "\
       style="fill:#000000;fill-opacity:0.29287523"\
       id="rect15541" />\
',wTH/2+wTH/4-30, hTH/2-hTH/4, 30, 30)
	o24.Time_move = function(x,y){
o24.svGroup.move(o24.cX,o24.cY)
dr1.kf_0 += dr1.kf_0*((-1)*0.02); dr1.DRW_0();
	}
  o24.G_up = function (x,y) {
    if (o24.draG){
    //      $('#indic').css({'background-color':'#FFFFF6'});
    o24.draG=false;
      	console.log("EEEEEE"+this.boss.mousePath);
o24.setBasePos(wTH/2+wTH/4-30, hTH/2-hTH/4);
    }
  }
var THT = '\
    <path\
       id="re41"\
       style="fill:#000000;fill-opacity:0.292875"\
       d="M 8,8 V 0 H 0 V 24 h 8 v -8 h 8 v 8 h 8 V 0 h -8 v 8 z" />\
';
var o25 = aDDsVG2(dr1,1,THT,(wTH/2 + wTH/4-30), (hTH/2-hTH/4+30),30,30)
	o25.Time_move = function(x,y){
    	o25.svGroup.move(o25.cX,o25.cY)
dr1.kf_0 += dr1.kf_0*(0.02); dr1.DRW_0();
	}
  o25.G_up = function (x,y) {
    if (o25.draG){
    //      $('#indic').css({'background-color':'#FFFFF6'});
    o25.draG=false;
o25.setBasePos((wTH/2 + wTH/4-30), (hTH/2-hTH/4+30));
    }
  }
var THT = '\
    <path\
       style="fill:#000;stroke:#000;stroke-width:0.25px;\
		stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;fill-opacity:0.2"\
       d="M 30,0 0,15 30,30 Z"\
       id="pth2102"\>\
';
var o232 = aDDsVG2(dr1,1,THT,((wTH/2) - 60), ((hTH/2) +60),30,30)
	o232.Time_move = function(x,y){
    	o232.svGroup.move(o232.cX,o232.cY)
	}
	o232.B_up0 = function(){
prevv();
		console.log("UP000");
	}
var THT = '\
    <path\
       style="fill:#000;stroke:#000;stroke-width:0.25px;\
		stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;fill-opacity:0.2"\
       d="M 0,0 30,15 0,30 Z"\
       id="pth2102"\>\
';
var o234 = aDDsVG2(dr1,1,THT,(wTH/2+60),(hTH/2+60),30,30)
	o234.Time_move = function(x,y){
    	o234.svGroup.move(o234.cX,o234.cY)
	}
	o234.B_up0 = function(){
nextt();
		console.log("UP000");
	}
	draw = draw0;
uploadSvg(arr[0]);
scanDir2();
}) ;//document-ready
//----------------------------------------------------------------------------
// - - - - - - - - - pan as background - - - - - - - - - -
function setPanMenu(drX){
  drX.Mt[0][0].Time_move = function(x,y){
   drX.ESX_0 += (drX.Mt[0][0].cX - drX.Mt[0][0].nX)//*dr.kf_DR;
   drX.ESY_0 += (drX.Mt[0][0].cY - drX.Mt[0][0].nY)//*dr.kf_DR;
   drX.DRW_0();    
  }
  drX.Mt[0][0].B_up2 = function(){
  drX.Mt[0][0].setBasePos(0,0);
  }
  
  drX.Mt[0][0].B_up0 = function(){
  }
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 function aDDsVG2(drX,LN,THT,x,y,w,h){ //----------------LN - layer number 0=bottom
    console.log("JUMP")
    let square = drX.newSquare(LN,x,y,w,h);
    square.setPict(THT)
	square.svGroup.move(x,y)
	//kva1g.move(x,y);
  return square;
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - -
