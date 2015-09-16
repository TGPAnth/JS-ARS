RULE_BASE_CONSTANT = [[0,2,2],[0,1,2],[0,0,1],[1,2,2],[1,1,1],[1,0,1],[2,2,1],[2,1,0],[2,0,0]] // NEVER DO THIS THING!

function MainFL(canvas_name,type_name,val_name,xmax,ymax,gridx,gridy,arr_draw, ct, md){

	this.canvas = document.getElementById(canvas_name);
	this.ctx = this.canvas.getContext("2d");
	this.type_name = type_name;
	this.val_name = val_name;
	this.wd = this.canvas.width;
	this.hg= this.canvas.height;
	this.xmax = xmax;
	this.ymax = ymax;
	this.maxgridx = gridx;
	this.maxgridy = gridy;
	this.dcoordx = Math.floor(this.wd/this.xmax);
	this.dcoordy = Math.floor(this.hg/this.ymax);
	this.dgridx = this.dcoordx*this.xmax/this.maxgridx;
	this.dgridy = this.dcoordy*this.ymax/this.maxgridy;
	this.arr = arr_draw;
	this.fdata = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]
	this.now = [0,0,0]
	this.nw = 0;
	this.ct = ct;
	this.md = md;


	this.get_nw=function(){
		this.nw = document.getElementById(this.val_name+'n').value;
		return this.nw
	}
		//1 - Triangle, 2 - Trap, 3 - Z, 4 - S
	this.get_type=function(a){
	 return document.getElementById(this.type_name+a.toString()).selectedIndex+1;
	};
	this.get_val=function(a){
		return document.getElementById(this.val_name+a.toString()).value;
	};
	this.show=function(a){
		document.getElementById(this.val_name+a.toString()).disabled = 0;//type = "text" ; 
		document.getElementById(this.val_name+a.toString()).readonly = 0;//type = "hidden";  			
	};
	this.hide=function(a){
		//document.getElementById(this.val_name+a.toString()).value = 0;
		document.getElementById(this.val_name+a.toString()).disabled = 1;//type = "hidden";    
		document.getElementById(this.val_name+a.toString()).readonly = 1;//type = "hidden";  		
	};
	this.check_inputs=function(){
		for(var i = 1;i<=3;i+=1){
		 var gt = this.get_type(i).toString();
		 var stri = i.toString();
		 if (gt == "1"){
			 this.show(stri+"1"); this.show(stri+"2"); this.show(stri+"3"); this.hide(stri+"4");         
		 }else if(gt == "2"){
			 this.show(stri+"1"); this.show(stri+"2"); this.show(stri+"3"); this.show(stri+"4");
		 }else if(gt == "3"){
			 this.show(stri+"1"); this.show(stri+"2"); this.hide(stri+"3"); this.hide(stri+"4");
		 }else if(gt == "4"){
			 this.hide(stri+"1"); this.hide(stri+"2"); this.show(stri+"3"); this.show(stri+"4");
		 }
		}
	};
	this.check_inputs=function(){
		for(var i = 1;i<=3;i+=1){
		 var gt = this.get_type(i).toString();
		 var stri = i.toString();
		 if (gt == "1"){
			 this.show(stri+"1"); this.show(stri+"2"); this.show(stri+"3"); this.hide(stri+"4");         
		 }else if(gt == "2"){
			 this.show(stri+"1"); this.show(stri+"2"); this.show(stri+"3"); this.show(stri+"4");
		 }else if(gt == "3"){
			 this.show(stri+"1"); this.show(stri+"2"); this.hide(stri+"3"); this.hide(stri+"4");
		 }else if(gt == "4"){
			 this.hide(stri+"1"); this.hide(stri+"2"); this.show(stri+"3"); this.show(stri+"4");
		 }
		}
	};

	this.fill_canvas=function(){
		this.ctx.lineWidth=1;
		this.ctx.beginPath();
		this.ctx.fillRect(0,0,this.wd,this.hg)
		this.ctx.strokeStyle = "#000";
		this.ctx.stroke();
	}

	this.draw_base=function(){
		this.check_inputs();
		for(var i = 1;i<=3;i+=1){
			this.ctx.lineWidth=1;
			this.ctx.beginPath();
			var gt = this.get_type(i).toString();
			var stri = i.toString();
			if (gt == "1"){ // Triangle
				this.fdata[i-1][0] = 1;
				this.ctx.moveTo(0, this.hg);
				this.ctx.lineTo(this.get_val(stri+"1")*this.dcoordx,this.hg); 
				this.ctx.lineTo(this.get_val(stri+"2")*this.dcoordx,0);
				this.ctx.lineTo(this.get_val(stri+"3")*this.dcoordx,this.hg);
				for(var k=1;k<=3;k++){
					this.fdata[i-1][k] = this.get_val(stri+k.toString());
				}
			}else if(gt == "2"){ //Trap
				this.fdata[i-1][0] = 2;
				this.ctx.moveTo(0, this.hg);
				this.ctx.lineTo(this.get_val(stri+"1")*this.dcoordx,this.hg); 
				this.ctx.lineTo(this.get_val(stri+"2")*this.dcoordx,0);
				this.ctx.lineTo(this.get_val(stri+"3")*this.dcoordx,0);
				this.ctx.lineTo(this.get_val(stri+"4")*this.dcoordx,this.hg);
				for(var k=1;k<=4;k++){
					this.fdata[i-1][k] = this.get_val(stri+k.toString());
				}
			}else if(gt == "3"){ // Z
				this.fdata[i-1][0] = 3;
				this.ctx.moveTo(0, 0);
				this.ctx.lineTo(this.get_val(stri+"1")*this.dcoordx,0);
				this.ctx.lineTo(this.get_val(stri+"2")*this.dcoordx,this.hg);
				this.ctx.lineTo(this.wd,this.hg);
				for(var k=1;k<=2;k++){
					this.fdata[i-1][k] = this.get_val(stri+k.toString());
				}
			}else if(gt == "4"){ // S
				this.fdata[i-1][0] = 4;
				this.ctx.moveTo(0, this.hg);
				this.ctx.lineTo(this.get_val(stri+"3")*this.dcoordx,this.hg); 
				this.ctx.lineTo(this.get_val(stri+"4")*this.dcoordx,0);
				this.ctx.lineTo(this.wd,0);
				for(var k=3;k<=4;k++){
					this.fdata[i-1][k-2] = this.get_val(stri+k.toString());
				}
			}
			this.ctx.lineWidth=1;
			this.ctx.strokeStyle = "#000";
			this.ctx.stroke();
		}
		var n_val = this.get_val("n");
		this.ctx.beginPath();
		this.ctx.strokeStyle = "#9d0019";
		this.ctx.lineWidth=1.5;
		this.ctx.moveTo(n_val*this.dcoordx, 0);
		this.ctx.lineTo(n_val*this.dcoordx, this.hg);
		this.ctx.stroke()
	};

	this.draw=function(){
		for(var i = 0;i<this.arr.length;i+=1){
			this.ctx.lineWidth=1;
			this.ctx.beginPath();
			var gt = this.arr[i][0];
			if (gt == 1){ // Triangle
				this.ctx.moveTo(0, this.hg);
				this.ctx.lineTo(this.arr[i][1]*this.dcoordx,this.hg); 
				this.ctx.lineTo(this.arr[i][2]*this.dcoordx,0);
				this.ctx.lineTo(this.arr[i][3]*this.dcoordx,this.hg);
			}else if(gt == 2){ //Trap
				this.ctx.moveTo(0, this.hg);
				this.ctx.lineTo(this.arr[i][1]*this.dcoordx,this.hg); 
				this.ctx.lineTo(this.arr[i][2]*this.dcoordx,0);
				this.ctx.lineTo(this.arr[i][3]*this.dcoordx,0);
				this.ctx.lineTo(this.arr[i][4]*this.dcoordx,this.hg);
			}else if(gt == 3){ // Z
				this.ctx.moveTo(0, 0);
				this.ctx.lineTo(this.arr[i][1]*this.dcoordx,0);
				this.ctx.lineTo(this.arr[i][2]*this.dcoordx,this.hg);
				this.ctx.lineTo(this.wd,this.hg);
			}else if(gt == 4){ // S
				this.ctx.moveTo(0, this.hg);
				this.ctx.lineTo(this.arr[i][1]*this.dcoordx,this.hg); 
				this.ctx.lineTo(this.arr[i][2]*this.dcoordx,0);
				this.ctx.lineTo(this.wd,0);
			}
			this.ctx.strokeStyle = "#000";
			this.ctx.stroke();
		}
		if (this.ct){
			this.ctx.beginPath();
			this.ctx.strokeStyle = "#00FF00";
			this.ctx.lineWidth=1;
			this.ctx.moveTo(this.ct*this.dcoordx, 0);
			this.ctx.lineTo(this.ct*this.dcoordx, this.hg);
			this.ctx.stroke()
		}
		if (this.md){
			this.ctx.beginPath();
			this.ctx.strokeStyle = "#00AAAA";
			this.ctx.lineWidth=1;
			this.ctx.moveTo(this.md*this.dcoordx, 0);
			this.ctx.lineTo(this.md*this.dcoordx, this.hg);
			this.ctx.stroke()
		}
	};

	this.draw_bold=function(array){
		this.ctx.lineWidth=3;
		this.ctx.beginPath();
		this.ctx.moveTo(0, this.hg);
		for (var i = 0; i<array.length; i++){
			this.ctx.lineTo(array[i][0]*this.dcoordx,this.hg-array[i][1]*this.dcoordy); 
		} 
		this.ctx.strokeStyle = "#000";
		this.ctx.stroke();
	}


	this.draw_coordline=function(){
		// background
		this.ctx.lineWidth=1;
		this.ctx.rect(0,0,this.wd,this.hg);
		var shr = Math.floor(this.wd*12/300);
		this.ctx.font = "italic "+shr+"pt Helvetica";
		this.ctx.fillStyle="white";
		this.ctx.fill();
		this.ctx.beginPath();
		// grid
		for (var x = 0.5; x <= this.wd; x += this.dgridx) {
			this.ctx.moveTo(x, 0);
			this.ctx.lineTo(x, this.hg);
			this.ctx.fillStyle = "#00F";
			if (x>0.5) this.ctx.fillText(Math.floor(100*(x-0.5)/this.dcoordx)/100, x-shr,this.hg-Math.floor(shr/4));
			this.ctx.fillStyle = "white";
		} 
		for (var y = this.hg; y >=0; y -= this.dgridy) {
			this.ctx.moveTo(0, y);
			this.ctx.lineTo(this.wd, y);
			this.ctx.fillStyle = "#00F";
			if (y>0.5) this.ctx.fillText(Math.floor(100*(y)/this.dcoordy)/100, Math.floor(shr/4),this.hg-y-Math.floor(shr/4));
			this.ctx.fillStyle = "white";
		}
		this.ctx.strokeStyle = "#aaa";
		this.ctx.stroke();
		// coordinate lines
		this.ctx.lineWidth=3;
		this.ctx.beginPath();
		this.ctx.moveTo(0, 0);
		this.ctx.lineTo(0, this.hg);
		this.ctx.moveTo(0, this.hg);
		this.ctx.lineTo(this.wd, this.hg);
		this.ctx.strokeStyle = "#a00";
		this.ctx.stroke();
		return 0;
	};

	this.do_it=function(arr_bold){
		this.fill_canvas();
		this.draw_coordline();
		if (this.arr){
			this.draw();
		}else{
			for (var i = 1; i<=3; i++) document.getElementById(this.type_name+i.toString()).addEventListener('click',function(){this.check_inputs},false)
			this.draw_base();
			this.get_now();
		}
		if (arr_bold){
			this.draw_bold(arr_bold);
		}
	};

	this.flr = function(a,n){
		return Math.floor(a*n)/n;
	}

	this.get_type_now=function(arr,now){
		type = arr[0];
		if (type==1){
			if(now==arr[2]){
				return this.ymax;
			}
			if(now > arr[1] && now<=arr[2]){
				return this.ymax*this.flr((now-arr[1])/(arr[2]-arr[1]),100);
			}else if(now >= arr[2] && now<arr[3]){
				return this.ymax*this.flr((arr[3]-now)/(arr[3]-arr[2]),100);
			}else{
				return 0
			}
		}else if(type==2){
			if(now>arr[1] && now<arr[2]){
				return this.ymax*this.flr((now-arr[1])/(arr[2]-arr[1]),100);
			}else if(now>arr[3] && now<arr[4]){
				return this.ymax*this.flr((arr[4]-now)/(arr[4]-arr[3]),100);
			}else if(now>=arr[2]&&now<=arr[3]){
				return this.ymax;
			}else{
				return 0;
			}
		}else if(type==3){
			if(now>arr[1] && now<arr[2]){
				return this.ymax*this.flr((arr[2]-now)/(arr[2]-arr[1]),100);
			}else if(now>=arr[2]){
				return 0;
			}else{
				return this.ymax;
			}
		}else if(type==4){
			if(now>arr[1] && now<arr[2]){
				return this.ymax*this.flr((now-arr[1])/(arr[2]-arr[1]),100);
			}else if(now>=arr[2]){
				return this.ymax;
			}else{
				return 0;
			}
		}
		alert('Error');
		alert(type);
		return -1
	}

	this.get_now=function(fdt,nnw){
		if (nnw == undefined){
			this.get_nw()
			nnw = this.nw
		}
		if (fdt == undefined){
			fdt = this.fdata
		}
		for (var i=0;i<=2;i++){
			this.now[i]=this.get_type_now(fdt[i],nnw)
		}
		return this.now
	}
};

function Ruler(lvl,vel,table_id,res_fuzz,xmax,ymax){
	this.level = lvl;
	this.veloc = vel;
	this.agregir = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]; // |veloc    --level DOIT!!!
	this.table_id = table_id;
	this.rules_res_min = [[],[],[],[],[],[],[],[],[]];
	this.rules_res_prod = [[],[],[],[],[],[],[],[],[]];
	this.res_fuzz = res_fuzz;
	this.rule_base = RULE_BASE_CONSTANT
	this.xmax = xmax;
	this.ymax = ymax;
	
	this.Zade=function(A,B){
		return Math.min(A,B);
	};

	this.agregate=function(){
		for(var i = 0; i<=2;i++){
			for (var j=0; j<=2; j++) {
				this.agregir[i][j] = this.Zade(this.level[j],this.veloc[i]);
			};
		};
	};

	this.update_table = function(){
		this.agregate();
		if ((table_id == 'test') || (table_id == 'plot')){
			return -1
		}
		var table = document.getElementById(this.table_id).children[0];
		for (var i=0; i<table.children.length; i++) {
			for (var j=0; j<table.children[0].children.length; j++) {
				if (i==0){
					if (j>0){
						table.children[i].children[j].innerHTML = this.level[j-1]
					}
				}else if (j==0){
					if(i>0){
						table.children[i].children[j].innerHTML = this.veloc[i-1]
					}
				}else{
					table.children[i].children[j].innerHTML = this.agregir[i-1][j-1];
				}
			}
		}
	}

	this.get_new_form=function(lvl,indx,prod){
		tmp = this.res_fuzz[indx];
		type = tmp[0];
		if (lvl == 0){
			return [[0.0,0.0],[this.xmax*1.0,0.0]];
		}
		if (prod !== undefined){ //1 - Triangle, 2 - Trap, 3 - Z, 4 - S
			if (type==1){
				return [[0,0],[tmp[1],0],[tmp[2],lvl],[tmp[3],0],[this.xmax,0]];
			}else if(type==2){
				return [[0,0],[tmp[1],0],[tmp[2],lvl],[tmp[3],lvl],[tmp[4],0],[this.xmax,0]];
			}else if(type==3){
				return [[0.0,lvl],[tmp[1],lvl],[tmp[2],0],[this.xmax,0.0]];
			}else if(type==4){
				return [[0.0,0.0],[tmp[1],0],[tmp[2],lvl],[this.xmax,lvl]];
			}
			return undefined
		}
		add = [];
		if (type==1){
			a = lvl*(tmp[2]-tmp[1])/this.ymax + tmp[1];
			b = tmp[3] - lvl*(tmp[3]-tmp[2])/this.ymax;
			return [[0,0],[tmp[1],0],[Math.min(a,b),lvl],[Math.max(a,b),lvl],[tmp[3],0],[this.xmax,0]];
		}else if(type==2){
			a = lvl*(tmp[2]-tmp[1])/this.ymax + tmp[1];
			b = tmp[4] - lvl*(tmp[4]-tmp[3])/this.ymax;
			return [[0,0],[tmp[1],0],[Math.min(a,b),lvl],[Math.max(a,b),lvl],[tmp[4],0],[this.xmax,0]];
		}else if(type==3){
			return [[0.0,lvl],[tmp[2] - lvl*(tmp[2]-tmp[1])/this.ymax,lvl],[tmp[2],0],[this.xmax,0.0]];
		}else if(type==4){
			return [[0.0,0.0],[tmp[1],0],[lvl*(tmp[2]-tmp[1])/this.ymax + tmp[1],lvl],[this.xmax,lvl]];
		}
	}

	this.generage_rules_res_min=function(){
		for(var i=0;i<=8;i++){
			this.rules_res_min[i] = this.get_new_form(this.agregir[this.rule_base[i][1]][this.rule_base[i][0]],this.rule_base[i][2]);
		}
		return this.rules_res_min;
	}

	this.generage_rules_res_prod=function(){
		for(var i=0;i<=8;i++){
			this.rules_res_prod[i] = this.get_new_form(this.agregir[this.rule_base[i][1]][this.rule_base[i][0]],this.rule_base[i][2],1);
		}
		return this.rules_res_prod;
	}

	this.Point2f=function(start, type, end) {
		if(type == '-') {
			return [start[0] - end[0]+0.000001, start[1] - end[1]+0.000001]
		}
		else if(type == '*') {
			return [start[0] * end[0], start[1] * end[1]]
		}
		else if(type == '+') {
			return [start[0] + end[0], start[1] + end[1]]
		}
		else if(type == '/') {
			return [start[0] / end[0], start[1] / end[1]]
		}
	}

	this.tri_s = function(a,b,c){
		return Math.abs(((b[0]-a[0])*(c[1]-a[1])-(c[0]-a[0])*(b[1]-a[1]))/2)
	}

	this.intersection=function(start1, end1, start2, end2) {
		var dir1 = this.Point2f(end1, '-', start1);
		var dir2 = this.Point2f(end2, '-', start2);
		
		//считаем уравнения прямых проходящих через отрезки
		var a1 = -dir1[1];
		var b1 = +dir1[0];
		var d1 = -(a1*start1[0] + b1*start1[1]);
		
		var a2 = -dir2[1];
		var b2 = +dir2[0];
		var d2 = -(a2*start2[0] + b2*start2[1]);
		var t = 0;
		//подставляем концы отрезков, для выяснения в каких полуплоскотях они
		var seg1_line2_start = a2*start1[0] + b2*start1[1] + d2;
		var seg1_line2_end = a2*end1[0] + b2*end1[1] + d2;
		
		var seg2_line1_start = a1*start2[0] + b1*start2[1] + d1;
		var seg2_line1_end = a1*end2[0] + b1*end2[1] + d1;

		//если концы одного отрезка имеют один знак, значит он в одной полуплоскости и пересечения нет.
		if (seg1_line2_start * seg1_line2_end >= 0 || seg2_line1_start * seg2_line1_end >= 0)
			return false;
		
		var u = seg1_line2_start / (seg1_line2_start - seg1_line2_end);
		var pin_out = this.Point2f([u,u], '*', dir1);
	  
		return this.Point2f(start1, '+', pin_out);
	}

	this.find_cross=function(arrs){
		cross = []
		for(var i=0; i<=arrs.a.length-2;i++){
			for(var j=0; j<=arrs.b.length-2;j++){
				if (!(arrs.a[i]==arrs.b[j] || arrs.b[j+1]==arrs.a[i+1] || arrs.a[i]==arrs.b[j+1] || arrs.a[i+1]==arrs.b[j])){
					intersect = this.intersection(arrs.a[i],arrs.a[i+1],arrs.b[j],arrs.b[j+1])
					if (intersect){
						cross.push(intersect);
					}
				}
			}
		}
		if (cross.length==0){
			if(arrs.a.length==2){
				return arrs.b
			}
			if(arrs.b.length==2){
				return arrs.a
			}
			if (arrs.a[0][1]>arrs.b[0][1]){
				return arrs.a;
			}
			return arrs.b;
		}	
		for(var j=0;j<=cross.length-1;j++){
			for(var i=0;i<=arrs.a.length-1;i++){
				if (arrs.a[i][0]>cross[j][0]){
					arrs.a.splice(i,0,cross[j])
					i++
					break
				}
			}
		}
		for(var j=0;j<=cross.length-1;j++){
			for(var i=0;i<=arrs.b.length-1;i++){
				if (arrs.b[i][0]>cross[j][0]){
					arrs.b.splice(i,0,cross[j])
					i++
					break
				}
			}
		}
		var new_arr = [];
		var tp = 1;
		var indx = 0;
		var change=true;
		var next = []
		while(true){
			if (change){
				tp = 1;
				if (indx==0){
					var indxa = indx;
					var indxb = indx;
				}else{
					var indxa = -1;
					var indxb = -1;
					for(var k=0;k<=arrs.a.length-2;k++){
						if (arrs.a[k]==next){
							indxa = k+1
						}
					}
					for(var y=0;y<=arrs.b.length-2;y++){
						if (arrs.b[y]==next){
							indxb = y+1
						}
					}
					if (indxa==-1 && indxb==-1){
						break;
					}
				}
				indx = indxb
				if (arrs.a[indxa][1]>arrs.b[indxb][1]){
					tp = 0;
					indx = indxa
				} //tp = not tp??
				change = false;
			}
			if (tp){
				next = arrs.b[indx]
			}else{
				next = arrs.a[indx]
			}
			indx++;
			for(var k=0;k<=cross.length-1;k++){
				if (next==cross[k]){
					cross.splice(k,1)
					change=true;
				}
			}
			new_arr.push(next);
			if ((indx>=arrs.b.length&& tp) || (!tp && indx>=arrs.a.length)){
				break
			}
		}
		return new_arr;
	}

	this.find_max_arr = function(arr){
		tmp = arr
		for (var i = arr.length - 1; i >= 1; i--) {
			var arrs={a:tmp[i-1],b:tmp[i]}
			tmp[i-1] = this.find_cross(arrs);
		};
		return tmp[0];
	}
	
	this.def_ct=function(arr){
		sum1 = 0
		sum2 = 0
		for(var i=0; i<arr.length; i++){
			sum1 = sum1 + arr[i][0]*arr[i][1]
			sum2 = sum2 + arr[i][1]
		}
		if (sum2 == 0){
			return -1
		}
		return sum1/sum2
	}
	
	this.def_med=function(arr){
		var sum = 0
		var cnt = arr.length-1
		for(var i=0; i<cnt; i++){
			var a = arr[i]
			var b = arr[i+1]
			sum = sum+Math.abs(((a[1]+b[1])/2)*(b[0]-a[0]))
		}
		sum = sum/2
		var sum_new = 0
		var finded = false
		var res = 0
		for(var i=0; i<cnt; i++){
			if (finded){
				break
			}
			a = arr[i]
			b = arr[i+1]
			var sum_new_1 = Math.abs(((a[1]+b[1])/2)*(b[0]-a[0]))
			if ((sum_new_1+sum_new) < sum){
				sum_new = sum_new + sum_new_1
			}else{
				finded = true
				delta = Math.abs((sum_new)-sum)
				var ax = a[1]
				var bx = b[1]
				if (ax == bx){
					res = delta/ax + a[0]
				} else {	
					var h = Math.abs(b[0]-a[0])
					res = -1*ax + Math.sqrt(ax*ax+2*delta*(bx-ax)/h)
					res = res + a[0]
				}
			} 
		}
		return res 
	};
	
	this.lm=function(arr){
		var cnt = arr.length
		for(var i=0; i<cnt; i++){
			if ((arr[i][1]*1000)>1){ return arr[i][0]}
		}
	};
	
	this.rm=function(arr){
		var cnt = arr.length
		for(var i=cnt-1; i>=0; i--){
			if ((arr[i][1]*1000)>1){ return arr[i][0]}
		}
	}

};

function Out(arr,rule){
	this.arr = arr;
	this.rd = rule;
	
	this.first=function(){
		prefix = [arr[0].val_name,arr[1].val_name]
		data = [arr[0].now,arr[1].now]
		document.getElementById('first_'+prefix[0]+'_s').innerHTML = data[0][0].toFixed(2);
		document.getElementById('first_'+prefix[0]+'_m').innerHTML = data[0][1].toFixed(2);
		document.getElementById('first_'+prefix[0]+'_g').innerHTML = data[0][2].toFixed(2);
		document.getElementById('first_'+prefix[1]+'_s').innerHTML = data[1][0].toFixed(2);
		document.getElementById('first_'+prefix[1]+'_m').innerHTML = data[1][1].toFixed(2);
		document.getElementById('first_'+prefix[1]+'_g').innerHTML = data[1][2].toFixed(2);
	};
	
	this.next=function(){
		var dt = this.rd.agregir
		for(var i = 0; i<=2; i++){
			for(var j = 0; j<=2; j	++){
				document.getElementById('next_'+i+'_'+j).innerHTML = dt[j][i].toFixed(2);
			}
		}
	};
	
	this.done=function(){
		this.first();
		this.next();
	};
	
	
	this.print_it=function(name,value,fix){
		document.getElementById(name).innerHTML = value.toFixed(fix);
	}
}

recheck = function(){
	var fm1 = new MainFL('fuzzif_level','fls','fl',9,1,6,6);
	var fm2 = new MainFL('fuzzif_veloc','fvs','fv',0.5,1,6,6);
	fm1.check_inputs();
	fm2.check_inputs();
}
//document.getElementById('b1').addEventListener('onclick',FL.do_it,false);
var fl = new Array(23);
var main_arr = [[3,0.20,0.25],[2,0.20,0.25,0.35,0.40],[4,0.35,0.40]]

start = function(){
	fl[0] = new MainFL('fuzzif_level','fls','fl',9,1,6,6);
	fl[1] = new MainFL('fuzzif_veloc','fvs','fv',0.5,1,6,6);
	for (var i = 0; i<2; i++){
		fl[i].do_it();
	}
	
	var rule = new Ruler(fl[0].get_now(),fl[1].get_now(),'tbl1',main_arr,0.5,1);
	
	rule.update_table();
	var rules_min = rule.generage_rules_res_min();
	var rules_prod = rule.generage_rules_res_prod();
	//1 - Triangle, 2 - Trap, 3 - Z, 4 - S
	arr = [[[]]]
	fl[2] = new MainFL('fuzzif_inp'+(2-1).toString(),'','',0.5,1,6,6,main_arr);
	fl[2].do_it(arr[2-2]);
	var all_arr = [] 
	for (var i = 3; i<= 11; i++){
		fl[i] = new MainFL('fuzzif_inp'+(i-1).toString(),'','',0.5,1,6,6,main_arr);
		fl[i].do_it(rules_min[i-3]);
		all_arr.push(rules_min[i-3])
	}
	var max_arr = rule.find_max_arr(all_arr);
	var ct_out = rule.def_ct(max_arr);
	var med_out = rule.def_med(max_arr);
	fl[12] = new MainFL('fuzzif_inp'+(12-1).toString(),'','',0.5,1,6,6,main_arr,ct_out,med_out);
	fl[12].do_it(max_arr);
	var all_arr2 = [] 
	for (var i = 13; i<= 21; i++){
		fl[i] = new MainFL('fuzzif_inp'+(i-1).toString(),'','',0.5,1,6,6,main_arr);
		fl[i].do_it(rules_prod[i-13]);
		all_arr2.push(rules_prod[i-13])
	}
	var max_arr2 = rule.find_max_arr(all_arr2); 
	var ct_out2 = rule.def_ct(max_arr2);
	var med_out2 = rule.def_med(max_arr2);
	fl[22] = new MainFL('fuzzif_inp'+(22-1).toString(),'','',0.5,1,6,6,main_arr,ct_out2,med_out2);
	fl[22].do_it(max_arr2);
	
	var out = new Out(fl,rule)
	out.done();
	out.print_it('prit_ct',rule.def_ct(max_arr2),5)
	out.print_it('prit_med',rule.def_med(max_arr2),5)
	out.print_it('prit_ct_1',ct_out,5)
	out.print_it('prit_med_1',med_out,5)
	out.print_it('prit_lm',rule.lm(max_arr),2)
	out.print_it('prit_rm',rule.rm(max_arr),2)
}

recheck_rb = function(){
  rls = ['ZP','PM','PB']
	var table = document.getElementById('tbl2').children[0];
  for(var i = 0; i<=8;i++){
  	var name1 = "rb_"+RULE_BASE_CONSTANT[i][0].toString()+"_"+RULE_BASE_CONSTANT[i][1].toString()
  	var new_index = document.getElementById(name1).selectedIndex
  	RULE_BASE_CONSTANT[i][2] = 2-new_index
  	table.children[RULE_BASE_CONSTANT[i][0]+1].children[RULE_BASE_CONSTANT[i][1]+1].innerHTML = rls[new_index]
  }
  start();
}
