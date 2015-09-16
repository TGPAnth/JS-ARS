var FL = function(){};
FL.canvas = 0;
FL.ctx = 0;
FL.wd = 0;
FL.hg= 0;
FL.xmax = 0;
FL.ymax = 0;
FL.maxgridx = 0;
FL.maxgridy = 0;
FL.dcoordx = 0;
FL.dcoordy = 0;
//1 - Triangle, 2 - Trap, 3 - Z, 4 - S
FL.get_type=function(a){
 return document.getElementById("fls"+a.toString()).selectedIndex+1;
};
FL.get_val=function(a){
	return document.getElementById("fl"+a.toString()).value;
};
FL.show=function(a){
	document.getElementById("fl"+a.toString()).type = "text" ;      
};
FL.hide=function(a){
	document.getElementById("fl"+a.toString()).type = "hidden";       
};
FL.check_inputs=function(){
	for(var i = 1;i<=3;i+=1){
	 var gt = FL.get_type(i).toString();
	 var stri = i.toString();
	 if (gt == "1"){
		 FL.show(stri+"1"); FL.show(stri+"2"); FL.show(stri+"3"); FL.hide(stri+"4");         
	 }else if(gt == "2"){
		 FL.show(stri+"1"); FL.show(stri+"2"); FL.show(stri+"3"); FL.show(stri+"4");
	 }else if(gt == "3"){
		 FL.show(stri+"1"); FL.show(stri+"2"); FL.hide(stri+"3"); FL.hide(stri+"4");
	 }else if(gt == "4"){
		 FL.hide(stri+"1"); FL.hide(stri+"2"); FL.show(stri+"3"); FL.show(stri+"4");
	 }
	}
};

FL.draw=function(){
	FL.check_inputs();
	for(var i = 1;i<=3;i+=1){
	FL.ctx.lineWidth=1;
	FL.ctx.beginPath();
	 var gt = FL.get_type(i).toString();
	 var stri = i.toString();
	 if (gt == "1"){ // Triangle
		 FL.ctx.moveTo(0, FL.hg);
		 FL.ctx.lineTo(FL.get_val(stri+"1")*FL.dcoordx,FL.hg); 
		 FL.ctx.lineTo(FL.get_val(stri+"2")*FL.dcoordx,0);
		 FL.ctx.lineTo(FL.get_val(stri+"3")*FL.dcoordx,FL.hg);
	 }else if(gt == "2"){ //Trap
		FL.ctx.moveTo(0, FL.hg);
		 FL.ctx.lineTo(FL.get_val(stri+"1")*FL.dcoordx,FL.hg); 
		 FL.ctx.lineTo(FL.get_val(stri+"2")*FL.dcoordx,0);
		 FL.ctx.lineTo(FL.get_val(stri+"3")*FL.dcoordx,0);
		 FL.ctx.lineTo(FL.get_val(stri+"4")*FL.dcoordx,FL.hg);
	 }else if(gt == "3"){ // Z
		 FL.ctx.moveTo(0, 0);
		 FL.ctx.lineTo(FL.get_val(stri+"1")*FL.dcoordx,0);
		 FL.ctx.lineTo(FL.get_val(stri+"2")*FL.dcoordx,FL.hg);
		 FL.ctx.lineTo(FL.wd,FL.hg);
	 }else if(gt == "4"){ // S
		 FL.ctx.moveTo(0, FL.hg);
		 FL.ctx.lineTo(FL.get_val(stri+"3")*FL.dcoordx,FL.hg); 
		 FL.ctx.lineTo(FL.get_val(stri+"4")*FL.dcoordx,0);
		 FL.ctx.lineTo(FL.wd,0);
	 }
	FL.ctx.strokeStyle = "#000";
	FL.ctx.stroke();
	}
};

FL.draw_coordline=function(){
	// background
	FL.ctx.lineWidth=1;
	FL.ctx.rect(0,0,FL.wd,FL.hg);
	FL.ctx.fillStyle="white";
	FL.ctx.fill();
	FL.ctx.beginPath();
	// grid
	for (var x = 0.5; x <= FL.wd; x += FL.dcoordx) {
		FL.ctx.moveTo(x, 0);
		FL.ctx.lineTo(x, FL.hg);
	} 
	for (var y = 0.5; y <= FL.hg; y += FL.dcoordy) {
		FL.ctx.moveTo(0, y);
		FL.ctx.lineTo(FL.wd, y);
	}
	FL.ctx.strokeStyle = "#aaa";
	FL.ctx.stroke();
	// coordinate lines
	FL.ctx.lineWidth=1;
	FL.ctx.beginPath();
	FL.ctx.moveTo(0, 0);
	FL.ctx.lineTo(0, FL.hg);
	FL.ctx.moveTo(0, FL.hg);
	FL.ctx.lineTo(FL.wd, FL.hg);
	FL.ctx.strokeStyle = "#a00";
	FL.ctx.stroke();
	return 0;
};

FL.do_it=function(){
	FL.canvas = document.getElementById("fuzzif_level");
    //alert(FL.canvas);
	FL.ctx = FL.canvas.getContext("2d");
	FL.wd = FL.canvas.width;
	FL.hg= FL.canvas.height;
	FL.xmax = 10;
	FL.ymax = 1;
	FL.maxgridx = 10;
	FL.maxgridy = 10;
	FL.dcoordx = Math.floor(FL.wd/FL.maxgridx);
	FL.dcoordy = Math.floor(FL.hg/FL.maxgridy);
	FL.draw_coordline();
	FL.check_inputs();
	FL.draw();
};
document.getElementById('b1').addEventListener('onclick',FL.do_it,false);
//FL.do_it();
