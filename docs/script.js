//ここから画像ファイル読み込み用
var img = new Image();

window.onload = function(){
	//ファイルを選択したときの処理を追加しておく
	document.getElementById("selectfile").addEventListener("change", 
		function(evt){
			var file = evt.target.files;
			var reader = new FileReader();
			reader.readAsDataURL(file[0]);
			reader.onload = function(){
				img.src = reader.result;
			}
		},
	false);
	
};
//ここまで画像ファイル読み込み用

//ここから画像生成サンプル
function redbox(){
	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext('2d');
	canvas.width = 100;
	canvas.height = 100;
	ctx.fillStyle = "rgb(255,0,0)";
	ctx.fillRect(0,0,100,100);
	var dataurl = canvas.toDataURL();
	document.getElementById("redbox").innerHTML = "<img src='" + dataurl + "'>";
}

function simple(){
	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext('2d');
	canvas.width = 500;
	canvas.height = 500;
	//描画用の関数を作っておく
	//色指定(ついdxlib風に書いてしまう用)
	function GetColor(R,G,B){
		return "rgb("+R+","+G+","+B+")";
	}
	//長方形
	function DrawBox(x1, y1, x2, y2, color = GetColor(0,0,0), thickness = 0){
		if(thickness<=0){
			ctx.fillStyle = color;
			ctx.fillRect(x1,y1,x2-x1,y2-y1);
		}
		else{
			ctx.lineWidth = thickness;
			ctx.strokeStyle = color;
			ctx.strokeRect(x1,y1,x2-x1,y2-y1);
		}
	}
	//直線
	function DrawLine(x1, y1, x2, y2, color = GetColor(0,0,0), thickness = 1){
		ctx.lineWidth = thickness;
		ctx.strokeStyle=color;
		ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.stroke();
	}
	//円
	function DrawCircle(x, y, r, color = GetColor(0,0,0), thickness = -1){
		if(thickness<=0){
			ctx.fillStyle = color;
			ctx.beginPath();
			ctx.arc(x, y, r, 0, Math.PI*2, true);
			ctx.fill();
		}
		else{
			ctx.strokeStyle=color;
			ctx.lineWidth = thickness;
			ctx.beginPath();
			ctx.arc(x, y, r, 0, Math.PI*2, false);
			ctx.stroke();
		}
	}
	//文字列
	function DrawString(x, y, s, color = GetColor(0,0,0), size=16, font="メイリオ"){
		ctx.font = ""+size+"px"+" '"+font+"'";
		ctx.fillStyle = color;
		ctx.fillText(s,x,y+size);
	}
	//ここまで描画用関数
	DrawBox(50,100,70,20,GetColor(255,0,0),3);
	DrawBox(0,0,70,20);
	DrawLine(50,100,70,20,GetColor(255,0,0),3);
	DrawLine(100,0,70,20);
	DrawCircle(250,250,50);
	DrawCircle(400,400,20,GetColor(255,0,255),20);
	DrawString(300,200,"うんこ");
	var dataurl = canvas.toDataURL();
	document.getElementById("simple").innerHTML = "<img src='" + dataurl + "'>";
	
}
//ここまで画像生成サンプル

//ここから画像読み込みサンプル
function fread(){
	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext('2d');
	canvas.width = img.width;
	canvas.height = img.height;
	ctx.drawImage(img,0,0);
	var dataurl = canvas.toDataURL();
	document.getElementById("fread").innerHTML = "<img src='" + dataurl + "'>";
}

function resize(){
	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext('2d');
	canvas.width = 640;
	canvas.height = 480;
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.fillRect(0,0,640,480);
	
	//アスペクト比を無視してぴったり合わせる場合
	//ctx.drawImage(img,0,0,640,480);
	
	var iw = img.width;
	var ih = img.height;
	var cw = canvas.width;
	var ch = canvas.height;
	
	if(iw*ch/ih>cw){
		ctx.drawImage(img,0,ch/2-ih*cw/iw/2,cw,ih*cw/iw);
	}
	else{
		ctx.drawImage(img,cw/2-iw*ch/ih/2,0,iw*ch/ih,ch);
	}
	
	var dataurl = canvas.toDataURL();
	document.getElementById("resize").innerHTML = "<img src='" + dataurl + "'>";
}

function binarize(){
	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext('2d');
	canvas.width = img.width;
	canvas.height = img.height;
	ctx.drawImage(img,0,0);
	var Data = ctx.getImageData(0, 0, canvas.width, canvas.height);
	var data = Data.data;
	for(var y = 0; y < canvas.height; y++){
		for(var x = 0; x < canvas.width; x++){
			var idx = (x + y * canvas.width) * 4;
			var gray = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
			var bin = (gray<128?0:255);
			data[idx] = bin;
			data[idx + 1] = bin;
			data[idx + 2] = bin;
		}
	}
	ctx.putImageData(Data, 0, 0);
	var dataurl = canvas.toDataURL();
	document.getElementById("binarize").innerHTML = "<img src='" + dataurl + "'>";
}

//ここまで画像読み込みサンプル