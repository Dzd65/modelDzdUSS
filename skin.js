// Garden Gnome Software - Skin
// Pano2VR 6.1.10/18007
// Filename: DZDYZ.ggsk
// Generated 2023-03-25T13:55:25

function pano2vrSkin(player,base) {
	player.addVariable('ht_ani', 2, false);
	var me=this;
	var skin=this;
	var flag=false;
	var hotspotTemplates={};
	var skinKeyPressed = 0;
	this.player=player;
	this.player.skinObj=this;
	this.divSkin=player.divSkin;
	this.ggUserdata=player.userdata;
	this.lastSize={ w: -1,h: -1 };
	var basePath="";
	// auto detect base path
	if (base=='?') {
		var scripts = document.getElementsByTagName('script');
		for(var i=0;i<scripts.length;i++) {
			var src=scripts[i].src;
			if (src.indexOf('skin.js')>=0) {
				var p=src.lastIndexOf('/');
				if (p>=0) {
					basePath=src.substr(0,p+1);
				}
			}
		}
	} else
	if (base) {
		basePath=base;
	}
	this.elementMouseDown=[];
	this.elementMouseOver=[];
	var cssPrefix='';
	var domTransition='transition';
	var domTransform='transform';
	var prefixes='Webkit,Moz,O,ms,Ms'.split(',');
	var i;
	var hs,el,els,elo,ela,elHorScrollFg,elHorScrollBg,elVertScrollFg,elVertScrollBg,elCornerBg;
	if (typeof document.body.style['transform'] == 'undefined') {
		for(var i=0;i<prefixes.length;i++) {
			if (typeof document.body.style[prefixes[i] + 'Transform'] !== 'undefined') {
				cssPrefix='-' + prefixes[i].toLowerCase() + '-';
				domTransition=prefixes[i] + 'Transition';
				domTransform=prefixes[i] + 'Transform';
			}
		}
	}
	
	player.setMargins(0,0,0,0);
	
	this.updateSize=function(startElement) {
		var stack=[];
		stack.push(startElement);
		while(stack.length>0) {
			var e=stack.pop();
			if (e.ggUpdatePosition) {
				e.ggUpdatePosition();
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
	}
	
	this.callNodeChange=function(startElement) {
		var stack=[];
		stack.push(startElement);
		while(stack.length>0) {
			var e=stack.pop();
			if (e.ggNodeChange) {
				e.ggNodeChange();
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
	}
	player.addListener('changenode', function() { me.ggUserdata=player.userdata; me.callNodeChange(me.divSkin); });
	
	var parameterToTransform=function(p) {
		var hs='translate(' + p.rx + 'px,' + p.ry + 'px) rotate(' + p.a + 'deg) scale(' + p.sx + ',' + p.sy + ')';
		return hs;
	}
	
	this.findElements=function(id,regex) {
		var r=[];
		var stack=[];
		var pat=new RegExp(id,'');
		stack.push(me.divSkin);
		while(stack.length>0) {
			var e=stack.pop();
			if (regex) {
				if (pat.test(e.ggId)) r.push(e);
			} else {
				if (e.ggId==id) r.push(e);
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
		return r;
	}
	
	this.addSkin=function() {
		var hs='';
		this.ggCurrentTime=new Date().getTime();
		el=me._crosshair=document.createElement('div');
		els=me._crosshair__img=document.createElement('img');
		els.className='ggskin ggskin_crosshair';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAKklEQVQImWP4//8/w////xkYGBgaYGwmBiyAkYGBoQHKbkBiwwFcAKt2AP1CDnqHspqBAAAAAElFTkSuQmCC';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="crosshair";
		el.ggDx=0.5;
		el.ggDy=0.5;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='height : 5px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 5px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._crosshair.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._crosshair.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me.divSkin.appendChild(me._crosshair);
		el=me._ht_node_timer=document.createElement('div');
		el.ggTimestamp=this.ggCurrentTime;
		el.ggLastIsActive=true;
		el.ggTimeout=500;
		el.ggId="ht_node_timer";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_timer ";
		el.ggType='timer';
		hs ='';
		hs+='height : 32px;';
		hs+='left : 62px;';
		hs+='position : absolute;';
		hs+='top : 23px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_node_timer.ggIsActive=function() {
			return (me._ht_node_timer.ggTimestamp==0 ? false : (Math.floor((me.ggCurrentTime - me._ht_node_timer.ggTimestamp) / me._ht_node_timer.ggTimeout) % 2 == 0));
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._ht_node_timer.ggActivate=function () {
			player.setVariableValue('ht_ani', true);
		}
		me._ht_node_timer.ggDeactivate=function () {
			player.setVariableValue('ht_ani', false);
		}
		me._ht_node_timer.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._ht_node_timer);
		el=me._rectangle_1=document.createElement('div');
		el.ggId="Rectangle 1";
		el.ggDy=-78;
		el.ggParameter={ rx:0,ry:0,a:0,sx:0.05,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='border : 2px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 578px;';
		hs+='position : absolute;';
		hs+='right : 10px;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 320px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='100% 50%';
		el.style[domTransform]=parameterToTransform(el.ggParameter);
		me._rectangle_1.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._rectangle_1.onmouseover=function (e) {
			me._rectangle_1.style[domTransition]='none';
			me._rectangle_1.ggParameter.sx=1;me._rectangle_1.ggParameter.sy=1;
			me._rectangle_1.style[domTransform]=parameterToTransform(me._rectangle_1.ggParameter);
		}
		me._rectangle_1.onmouseout=function (e) {
			me._rectangle_1.style[domTransition]='none';
			me._rectangle_1.ggParameter.sx=0.05;me._rectangle_1.ggParameter.sy=1;
			me._rectangle_1.style[domTransform]=parameterToTransform(me._rectangle_1.ggParameter);
		}
		me._rectangle_1.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		el=me._text_1=document.createElement('div');
		els=me._text_1__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="Text 1";
		el.ggDy=-260;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 21px;';
		hs+='position : absolute;';
		hs+='right : 10px;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 300px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='100% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='right: 0px;';
		hs+='top:  0px;';
		hs+='width: 304px;';
		hs+='height: 25px;';
		hs+='background: #b80003;';
		hs+='border: 2px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		hs+='overflow-y: auto;';
		els.setAttribute('style',hs);
		els.innerHTML="\u0425\u043e\u043b\u043b";
		el.appendChild(els);
		me._text_1.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._text_1.onclick=function (e) {
			player.openNext("{node15}","");
		}
		me._text_1.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._rectangle_1.appendChild(me._text_1);
		el=me._text_2=document.createElement('div');
		els=me._text_2__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="Text 2";
		el.ggDy=-200;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 20px;';
		hs+='position : absolute;';
		hs+='right : 10px;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 300px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='right: 0px;';
		hs+='top:  0px;';
		hs+='width: 304px;';
		hs+='height: 24px;';
		hs+='background: #b80003;';
		hs+='border: 2px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		hs+='overflow-y: auto;';
		els.setAttribute('style',hs);
		els.innerHTML="\u0414\u0438\u043a\u0442\u043e\u0440\u0441\u043a\u0430\u044f";
		el.appendChild(els);
		me._text_2.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._text_2.onclick=function (e) {
			player.openNext("{node16}","");
		}
		me._text_2.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._rectangle_1.appendChild(me._text_2);
		el=me._text_3=document.createElement('div');
		els=me._text_3__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="Text 3";
		el.ggDy=-170;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 20px;';
		hs+='position : absolute;';
		hs+='right : 10px;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 300px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='right: 0px;';
		hs+='top:  0px;';
		hs+='width: 304px;';
		hs+='height: 24px;';
		hs+='background: #b80003;';
		hs+='border: 2px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		hs+='overflow-y: auto;';
		els.setAttribute('style',hs);
		els.innerHTML="\u041a\u0430\u0431\u0438\u043d\u0435\u0442 IT";
		el.appendChild(els);
		me._text_3.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._text_3.onclick=function (e) {
			player.openNext("{node25}","");
		}
		me._text_3.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._rectangle_1.appendChild(me._text_3);
		el=me._text_4=document.createElement('div');
		els=me._text_4__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="Text 4";
		el.ggDy=-140;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 20px;';
		hs+='position : absolute;';
		hs+='right : 10px;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 300px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='right: 0px;';
		hs+='top:  0px;';
		hs+='width: 304px;';
		hs+='height: 24px;';
		hs+='background: #b80003;';
		hs+='border: 2px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		hs+='overflow-y: auto;';
		els.setAttribute('style',hs);
		els.innerHTML="\u041a\u0430\u0431\u0438\u043d\u0435\u0442 \u0425\u0430\u0439\u0442\u0435\u043a";
		el.appendChild(els);
		me._text_4.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._text_4.onclick=function (e) {
			player.openNext("{node40}","");
		}
		me._text_4.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._rectangle_1.appendChild(me._text_4);
		el=me._text_5=document.createElement('div');
		els=me._text_5__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="Text 5";
		el.ggDy=-110;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 20px;';
		hs+='position : absolute;';
		hs+='right : 11px;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 300px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='right: 0px;';
		hs+='top:  0px;';
		hs+='width: 304px;';
		hs+='height: 24px;';
		hs+='background: #b80003;';
		hs+='border: 2px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		hs+='overflow-y: auto;';
		els.setAttribute('style',hs);
		els.innerHTML="\u041a\u0430\u0431\u0438\u043d\u0435\u0442 \u041f\u0440\u043e\u043c\u0414\u0438\u0437\u0430\u0439\u043d";
		el.appendChild(els);
		me._text_5.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._text_5.onclick=function (e) {
			player.openNext("{node33}","");
		}
		me._text_5.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._rectangle_1.appendChild(me._text_5);
		el=me._text_10=document.createElement('div');
		els=me._text_10__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="Text 10";
		el.ggDy=-231;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 20px;';
		hs+='position : absolute;';
		hs+='right : 10px;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 300px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='right: 0px;';
		hs+='top:  0px;';
		hs+='width: 304px;';
		hs+='height: 24px;';
		hs+='background: #b80003;';
		hs+='border: 2px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		hs+='overflow-y: auto;';
		els.setAttribute('style',hs);
		els.innerHTML="\u0414\u0435\u0436\u0443\u0440\u043d\u0430\u044f";
		el.appendChild(els);
		me._text_10.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._text_10.onclick=function (e) {
			player.openNext("{node17}","");
		}
		me._text_10.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._rectangle_1.appendChild(me._text_10);
		el=me._text_12=document.createElement('div');
		els=me._text_12__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="Text 12";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 20px;';
		hs+='left : 84px;';
		hs+='position : absolute;';
		hs+='top : 213px;';
		hs+='visibility : inherit;';
		hs+='width : 148px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 152px;';
		hs+='height: 24px;';
		hs+='background: #b80003;';
		hs+='border: 2px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		hs+='overflow-y: auto;';
		els.setAttribute('style',hs);
		els.innerHTML="\u0421\u041a\u0420\u042b\u0422\u042c \u041d\u0410\u0412\u0418\u0413\u0410\u0426\u0418\u042e";
		el.appendChild(els);
		me._text_12.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._text_12.onclick=function (e) {
			me._rectangle_1.style[domTransition]='none';
			me._rectangle_1.style.visibility='hidden';
			me._rectangle_1.ggVisible=false;
		}
		me._text_12.ggUpdatePosition=function (useTransition) {
		}
		me._rectangle_1.appendChild(me._text_12);
		me.divSkin.appendChild(me._rectangle_1);
		el=me._text_11=document.createElement('div');
		els=me._text_11__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="Text 11";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 26px;';
		hs+='left : 1742px;';
		hs+='position : absolute;';
		hs+='top : 124px;';
		hs+='visibility : inherit;';
		hs+='width : 92px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 96px;';
		hs+='height: 30px;';
		hs+='background: #b80003;';
		hs+='border: 2px solid #000000;';
		hs+='color: rgba(0,0,0,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		hs+='overflow-y: auto;';
		els.setAttribute('style',hs);
		els.innerHTML="\u041d\u0410\u0412\u0418\u0413\u0410\u0426\u0418\u042f";
		el.appendChild(els);
		me._text_11.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._text_11.onclick=function (e) {
			me._rectangle_1.style[domTransition]='none';
			me._rectangle_1.style.visibility=(Number(me._rectangle_1.style.opacity)>0||!me._rectangle_1.style.opacity)?'inherit':'hidden';
			me._rectangle_1.ggVisible=true;
		}
		me._text_11.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._text_11);
		el=me._button_1=document.createElement('div');
		els=me._button_1__img=document.createElement('img');
		els.className='ggskin ggskin_button_1';
		hs=basePath + 'images/button_1.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Button 1";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 100px;';
		hs+='left : 1805px;';
		hs+='position : absolute;';
		hs+='top : 8px;';
		hs+='visibility : inherit;';
		hs+='width : 100px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._button_1.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._button_1.onclick=function (e) {
			player.openNext("{node15}","");
		}
		me._button_1.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._button_1);
		el=me._button_2=document.createElement('div');
		els=me._button_2__img=document.createElement('img');
		els.className='ggskin ggskin_button_2';
		hs=basePath + 'images/button_2.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Button 2";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 120px;';
		hs+='left : 1668px;';
		hs+='position : absolute;';
		hs+='top : -1px;';
		hs+='visibility : inherit;';
		hs+='width : 120px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._button_2.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._button_2.onclick=function (e) {
			player.openNext("{node14}","");
		}
		me._button_2.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._button_2);
		player.addListener('sizechanged', function() {
			me.updateSize(me.divSkin);
		});
	};
	this.hotspotProxyClick=function(id, url) {
	}
	this.hotspotProxyDoubleClick=function(id, url) {
	}
	me.hotspotProxyOver=function(id, url) {
	}
	me.hotspotProxyOut=function(id, url) {
	}
	me.callChildLogicBlocksHotspot_ht_node_changenode = function(){
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				if (hotspotTemplates['ht_node'][i]._ht_node_image && hotspotTemplates['ht_node'][i]._ht_node_image.logicBlock_scaling) {
					hotspotTemplates['ht_node'][i]._ht_node_image.logicBlock_scaling();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_varchanged_ht_ani = function(){
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				if (hotspotTemplates['ht_node'][i]._ht_node_image && hotspotTemplates['ht_node'][i]._ht_node_image.logicBlock_scaling) {
					hotspotTemplates['ht_node'][i]._ht_node_image.logicBlock_scaling();
				}
			}
		}
	}
	player.addListener('changenode', function() {
		me.ggUserdata=player.userdata;
	});
	me.skinTimerEvent=function() {
		me.ggCurrentTime=new Date().getTime();
		if (me._ht_node_timer.ggLastIsActive!=me._ht_node_timer.ggIsActive()) {
			me._ht_node_timer.ggLastIsActive=me._ht_node_timer.ggIsActive();
			if (me._ht_node_timer.ggLastIsActive) {
				player.setVariableValue('ht_ani', true);
			} else {
				player.setVariableValue('ht_ani', false);
			}
		}
	};
	player.addListener('timer', me.skinTimerEvent);
	function SkinHotspotClass_ht_node(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_node=document.createElement('div');
		el.ggId="ht_node";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 78px;';
		hs+='position : absolute;';
		hs+='top : 39px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_node.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_node.onclick=function (e) {
			player.openUrl(me.hotspot.url,me.hotspot.target);
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node.ggUpdatePosition=function (useTransition) {
		}
		el=me._ht_node_image=document.createElement('div');
		els=me._ht_node_image__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0nVVRGLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPHN2ZyB3aWR0aD0iMzEzM3B4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHN0eWxlPSJzaGFwZS1yZW5kZXJpbmc6Z2VvbWV0cmljUHJlY2lzaW9uOyB0ZXh0LXJlbmRlcmluZzpnZW9tZXRyaWNQcmVjaXNpb247IGltYWdlLXJlbm'+
			'RlcmluZzpvcHRpbWl6ZVF1YWxpdHk7IGZpbGwtcnVsZTpldmVub2RkOyBjbGlwLXJ1bGU6ZXZlbm9kZCIgaGVpZ2h0PSIyMjkycHgiPgogPGc+CiAgPHBhdGggc3R5bGU9Im9wYWNpdHk6MC40NSIgZmlsbD0iIzEzMDIwMCIgZD0iTSAxNTIxLjUsMTIwLjUgQyAxNzcyLjI0LDExMi41OTEgMTk5Ni45MSwxODQuMDkxIDIxOTUuNSwzMzVDIDIzODUuMzEsNDg0Ljk2MiAyNTA4LjgxLDY3OC4xMjggMjU2Niw5MTQuNUMgMjYxNy4yOCwxMTQ3LjYzIDI1OTIuNjIsMTM3Mi4yOSAyNDkyLDE1ODguNUMgMjM4My4wMywxODA5LjQ3IDIyMTcuMTksMTk3Mi42NCAxOTk0LjUsMjA3OEMgMTc5MC4yMywyMTY5'+
			'LjI5IDE1NzguMjMsMjE5My4yOSAxMzU4LjUsMjE1MEMgMTExOC44OSwyMDk3LjUxIDkyMS43MjQsMTk3Ny4wMSA3NjcsMTc4OC41QyA2MDQuMzY2LDE1ODEuNTYgNTI5LjcsMTM0NS45IDU0MywxMDgxLjVDIDU2NC4zNDIsODAxLjMzNyA2NzguMTc1LDU2Ny4xNzEgODg0LjUsMzc5QyAxMDY2LjQ5LDIyMC4wNjUgMTI3OC44MywxMzMuODk4IDE1MjEuNSwxMjAuNSBaIi8+CiA8L2c+CiA8Zz4KICA8cGF0aCBzdHlsZT0ib3BhY2l0eToxIiBmaWxsPSIjZmUwMDAwIiBkPSJNIDE1MzIuNSwxMjEuNSBDIDE4MTEuNTUsMTE2LjU0IDIwNTQuMjIsMjA2LjcwNiAyMjYwLjUsMzkyQyAyNDY0LjIxLDU4NC'+
			'4zIDI1NzQuMDQsODIxLjEzNCAyNTkwLDExMDIuNUMgMjU5Ny43NywxMzcxLjIyIDI1MTUuNzcsMTYwNy44OSAyMzQ0LDE4MTIuNUMgMjIwMCwxOTc3LjYzIDIwMjEuMTYsMjA4Ny4xMyAxODA3LjUsMjE0MUMgMTU3NS4xNSwyMTk1LjEgMTM1MC40OCwyMTcyLjc2IDExMzMuNSwyMDc0QyA5MDUuNTc3LDE5NjQuNDEgNzM4LjQxLDE3OTQuOTEgNjMyLDE1NjUuNUMgNTM1LjU5NSwxMzQ0LjY1IDUxNi45MjgsMTExNy4zMiA1NzYsODgzLjVDIDY0Ni40Nyw2MzAuODU3IDc5MC4zMDMsNDMyLjAyMyAxMDA3LjUsMjg3QyAxMTY3LjIzLDE4My45MjUgMTM0Mi4yMywxMjguNzU5IDE1MzIuNSwxMjEuNSBa'+
			'Ii8+CiA8L2c+CiA8Zz4KICA8cGF0aCBzdHlsZT0ib3BhY2l0eToxIiBmaWxsPSIjZmY1OTU4IiBkPSJNIDc1NC41LDE1NjcuNSBDIDgyMC41LDE1NjcuNSA4ODYuNSwxNTY3LjUgOTUyLjUsMTU2Ny41QyA5MTkuODQsMTU2OC44MyA4ODYuODQsMTU2OS41IDg1My41LDE1NjkuNUMgODIwLjE2LDE1NjkuNSA3ODcuMTYsMTU2OC44MyA3NTQuNSwxNTY3LjUgWiIvPgogPC9nPgogPGc+CiAgPHBhdGggc3R5bGU9Im9wYWNpdHk6MSIgZmlsbD0iI2ZmZTRlNCIgZD0iTSAxMzQzLjUsMTM2Ny41IEMgMTQyNS4zMywxMzY4LjUgMTUwNy4zMywxMzY4LjgzIDE1ODkuNSwxMzY4LjVDIDE1MDcsMTM2OS42Ny'+
			'AxNDI0LjMzLDEzNjkuODMgMTM0MS41LDEzNjlDIDEzNDIuMDQsMTM2OC4yOCAxMzQyLjcxLDEzNjcuNzggMTM0My41LDEzNjcuNSBaIi8+CiA8L2c+CiA8Zz4KICA8cGF0aCBzdHlsZT0ib3BhY2l0eToxIiBmaWxsPSIjZmZlNGU0IiBkPSJNIDEwMjguNSwxMzY3LjUgQyAxMTEwLjcxLDEzNjguODMgMTE5My4wNCwxMzY4LjgzIDEyNzUuNSwxMzY3LjVDIDEyNzUuMzksMTM2OC4xMiAxMjc1LjA2LDEzNjguNjIgMTI3NC41LDEzNjlDIDExOTEuODMsMTM2OS42NyAxMTA5LjE3LDEzNjkuNjcgMTAyNi41LDEzNjlDIDEwMjcuMDQsMTM2OC4yOCAxMDI3LjcxLDEzNjcuNzggMTAyOC41LDEzNjcuNSBa'+
			'Ii8+CiA8L2c+CiA8Zz4KICA8cGF0aCBzdHlsZT0ib3BhY2l0eToxIiBmaWxsPSIjZmZiOGI1IiBkPSJNIDE0MDIuNSwxMTU1LjUgQyAxNDA0LjAzLDExNTkuNzMgMTQwNC42OSwxMTY0LjIzIDE0MDQuNSwxMTY5QyAxNDA0LjUsMTE3Mi4zNSAxNDA0LjE2LDExNzUuNTIgMTQwMy41LDExNzguNUMgMTQwMy42NSwxMTcwLjggMTQwMy4zMSwxMTYzLjE0IDE0MDIuNSwxMTU1LjUgWiIvPgogPC9nPgogPGc+CiAgPHBhdGggc3R5bGU9Im9wYWNpdHk6MSIgZmlsbD0iI2ZmYzRjMyIgZD0iTSAxMTU2LjUsMTA3Mi41IEMgMTA4OC41LDEwNzIuNSAxMDIwLjUsMTA3Mi41IDk1Mi41LDEwNzIuNUMgOTUyLj'+
			'UsMTIzNy41IDk1Mi41LDE0MDIuNSA5NTIuNSwxNTY3LjVDIDg4Ni41LDE1NjcuNSA4MjAuNSwxNTY3LjUgNzU0LjUsMTU2Ny41QyA3NTQuNSwxNTY3LjE3IDc1NC41LDE1NjYuODMgNzU0LjUsMTU2Ni41QyA4MjAuMTY3LDE1NjYuNSA4ODUuODMzLDE1NjYuNSA5NTEuNSwxNTY2LjVDIDk1MS41LDE0MDEuNSA5NTEuNSwxMjM2LjUgOTUxLjUsMTA3MS41QyAxMDIwLDEwNzEuMTcgMTA4OC4zNCwxMDcxLjUgMTE1Ni41LDEwNzIuNSBaIi8+CiA8L2c+CiA8Zz4KICA8cGF0aCBzdHlsZT0ib3BhY2l0eToxIiBmaWxsPSIjZmRmY2ZjIiBkPSJNIDE1ODkuNSwxMzY4LjUgQyAxNTA3LjMzLDEzNjguODMg'+
			'MTQyNS4zMywxMzY4LjUgMTM0My41LDEzNjcuNUMgMTQ0MS40NSwxMjM2LjU0IDE1MzkuNDUsMTEwNS41NCAxNjM3LjUsOTc0LjVDIDE3MjAuMTYsOTczLjMzMyAxODAyLjgzLDk3My4xNjcgMTg4NS41LDk3NEMgMTc4Ni45MywxMTA1LjY2IDE2ODguMjcsMTIzNy4xNiAxNTg5LjUsMTM2OC41IFoiLz4KIDwvZz4KIDxnPgogIDxwYXRoIHN0eWxlPSJvcGFjaXR5OjEiIGZpbGw9IiNmZGZjZmMiIGQ9Ik0gMTQwMi41LDExNTUuNSBDIDE0MDMuMzEsMTE2My4xNCAxNDAzLjY1LDExNzAuOCAxNDAzLjUsMTE3OC41QyAxNDAzLjcyLDExODMuNzUgMTQwMi44OSwxMTg4Ljc1IDE0MDEsMTE5My41QyAxMz'+
			'k3LjE5LDEyMDEuNzkgMTM5Mi44NiwxMjA5Ljc5IDEzODgsMTIxNy41QyAxMzUwLjY0LDEyNjcuNjggMTMxMy4xNCwxMzE3LjY4IDEyNzUuNSwxMzY3LjVDIDExOTMuMDQsMTM2OC44MyAxMTEwLjcxLDEzNjguODMgMTAyOC41LDEzNjcuNUMgMTA4NC45OSwxMjkxLjg2IDExNDEuNDksMTIxNi4yIDExOTgsMTE0MC41QyAxMjA1Ljg5LDExMjguNjEgMTIwOC44OSwxMTE1LjYxIDEyMDcsMTEwMS41QyAxMjAyLjE5LDEwODYuMzUgMTE5Mi4wMiwxMDc3LjE5IDExNzYuNSwxMDc0QyAxMTY5Ljg0LDEwNzMuMjkgMTE2My4xOCwxMDcyLjc5IDExNTYuNSwxMDcyLjVDIDEwODguMzQsMTA3MS41IDEwMjAs'+
			'MTA3MS4xNyA5NTEuNSwxMDcxLjVDIDk1MS41LDEyMzYuNSA5NTEuNSwxNDAxLjUgOTUxLjUsMTU2Ni41QyA4ODUuODMzLDE1NjYuNSA4MjAuMTY3LDE1NjYuNSA3NTQuNSwxNTY2LjVDIDc1NC41LDE0MDEuODMgNzU0LjUsMTIzNy4xNyA3NTQuNSwxMDcyLjVDIDcyMS41LDEwNzIuNSA2ODguNSwxMDcyLjUgNjU1LjUsMTA3Mi41QyA2NTUuMzMzLDEwNTYuMTYgNjU1LjUsMTAzOS44MyA2NTYsMTAyMy41QyA2NTkuNTM5LDk5Ny45NjQgNjczLjcwNiw5ODEuNzk3IDY5OC41LDk3NUMgNzgxLjYzNyw5NzMuODQyIDg2NC44MDQsOTczLjM0MiA5NDgsOTczLjVDIDEwMjkuMTcsOTczLjY2NyAxMTEwLj'+
			'MzLDk3My44MzMgMTE5MS41LDk3NEMgMTIxNS42MSw5NzQuMzU3IDEyMzguOTUsOTc4LjY5IDEyNjEuNSw5ODdDIDEyODUuOTUsMTAwMC4xMSAxMzA2Ljc4LDEwMTcuNjEgMTMyNCwxMDM5LjVDIDEzNDcuNzcsMTA2OS45NCAxMzcwLjc3LDExMDAuOTQgMTM5MywxMTMyLjVDIDEzOTcuMywxMTM5Ljc2IDE0MDAuNDcsMTE0Ny40MiAxNDAyLjUsMTE1NS41IFoiLz4KIDwvZz4KIDxnPgogIDxwYXRoIHN0eWxlPSJvcGFjaXR5OjEiIGZpbGw9IiNmZjMwMzAiIGQ9Ik0gMTk1Ni41LDk3My41IEMgMjAzOSw5NzIuNTAxIDIxMjEuNjYsOTcyLjE2NyAyMjA0LjUsOTcyLjVDIDIyMDQuNzQsOTczLjc5MSAy'+
			'MjA0LjQsOTc0Ljc5MSAyMjAzLjUsOTc1LjVDIDIxMjEuNTEsOTczLjUwMyAyMDM5LjE3LDk3Mi44MzYgMTk1Ni41LDk3My41IFoiLz4KIDwvZz4KIDxnPgogIDxwYXRoIHN0eWxlPSJvcGFjaXR5OjEiIGZpbGw9IiNmZmE2YTUiIGQ9Ik0gMTk1OC41LDgyMC41IEMgMTk1Ny42Miw4MzguMTUgMTk1Ny4yOSw4NTUuODE3IDE5NTcuNSw4NzMuNUMgMTk1Ni4zNCw4NTguMDA1IDE5NTYuMTcsODQyLjMzOSAxOTU3LDgyNi41QyAxOTU3LjE5LDgyNC4yOTIgMTk1Ny42OSw4MjIuMjkyIDE5NTguNSw4MjAuNSBaIi8+CiA8L2c+CiA8Zz4KICA8cGF0aCBzdHlsZT0ib3BhY2l0eToxIiBmaWxsPSIjZmRmY2'+
			'ZjIiBkPSJNIDE5NTYuNSw5NzMuNSBDIDIwMzkuMTcsOTcyLjgzNiAyMTIxLjUxLDk3My41MDMgMjIwMy41LDk3NS41QyAyMTQ1LjI5LDEwNTEuNTYgMjA4Ny43OSwxMTI4LjIzIDIwMzEsMTIwNS41QyAyMDIxLjExLDEyMjEuODggMjAyMS4xMSwxMjM4LjIyIDIwMzEsMTI1NC41QyAyMDM5LjQxLDEyNjMuNzkgMjA0OS45MSwxMjY4Ljk1IDIwNjIuNSwxMjcwQyAyMTE0LjE3LDEyNzAuNjcgMjE2NS44MywxMjcwLjY3IDIyMTcuNSwxMjcwQyAyMjUyLjY1LDEyNjkuNSAyMjcyLjgyLDEyNTIgMjI3OCwxMjE3LjVDIDIyNzguNjcsMTExOS44MyAyMjc4LjY3LDEwMjIuMTcgMjI3OCw5MjQuNUMgMjI3'+
			'My4xMyw4OTQuNjI3IDIyNTUuNjMsODc4LjEyNyAyMjI1LjUsODc1QyAyMTM2LjE5LDg3My41MjEgMjA0Ni44Niw4NzMuMDIxIDE5NTcuNSw4NzMuNUMgMTk1Ny4yOSw4NTUuODE3IDE5NTcuNjIsODM4LjE1IDE5NTguNSw4MjAuNUMgMTk2My43Nyw3OTUuNDAxIDE5NzkuMSw3ODAuNTY4IDIwMDQuNSw3NzZDIDIwODYuNSw3NzUuMzMzIDIxNjguNSw3NzUuMzMzIDIyNTAuNSw3NzZDIDIyODcuNDUsNzc3LjQ5MiAyMzIzLjEyLDc4NC44MjUgMjM1Ny41LDc5OEMgMjQxNC41NSw4MjQuNTI3IDI0NTEuMDUsODY4LjM2IDI0NjcsOTI5LjVDIDI0NzEuOTQsOTQ5LjIwNCAyNDc0Ljk0LDk2OS4yMDQgMj'+
			'Q3Niw5ODkuNUMgMjQ3Ni42NywxMDQ1LjgzIDI0NzYuNjcsMTEwMi4xNyAyNDc2LDExNTguNUMgMjQ2My43MSwxMjkxLjEyIDIzOTAuODgsMTM2MC45NSAyMjU3LjUsMTM2OEMgMjI1MC44MywxMzY4LjMzIDIyNDQuMTcsMTM2OC42NyAyMjM3LjUsMTM2OUMgMjE3My44MywxMzY5LjY3IDIxMTAuMTcsMTM2OS42NyAyMDQ2LjUsMTM2OUMgMjAyMS40NywxMzY5LjE1IDE5OTcuMTMsMTM2NS4xNSAxOTczLjUsMTM1N0MgMTk1My40NiwxMzQ3LjcyIDE5MzUuOTYsMTMzNC44OSAxOTIxLDEzMTguNUMgMTg5My44NSwxMjg1LjY5IDE4NjcuODUsMTI1Mi4wMiAxODQzLDEyMTcuNUMgMTgzMy4wNCwxMjAz'+
			'Ljc4IDE4MjcuNTQsMTE4OC40NSAxODI2LjUsMTE3MS41QyAxODI2LjY5LDExNjQuMzMgMTgyNy44NiwxMTU3LjMzIDE4MzAsMTE1MC41QyAxODMzLjg5LDExNDEuMDYgMTgzOC41NSwxMTMyLjA2IDE4NDQsMTEyMy41QyAxODgxLjM2LDEwNzMuMzIgMTkxOC44NiwxMDIzLjMyIDE5NTYuNSw5NzMuNSBaIi8+CiA8L2c+Cjwvc3ZnPgo=';
		me._ht_node_image__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="ht_node_image";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : -16px;';
		hs+='position : absolute;';
		hs+='top : -16px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_node_image.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_node_image.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((player.getVariableValue('ht_ani') == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._ht_node_image.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._ht_node_image.ggCurrentLogicStateScaling = newLogicStateScaling;
				me._ht_node_image.style[domTransition]='' + cssPrefix + 'transform 500ms ease 0ms';
				if (me._ht_node_image.ggCurrentLogicStateScaling == 0) {
					me._ht_node_image.ggParameter.sx = 1.1;
					me._ht_node_image.ggParameter.sy = 1.1;
					me._ht_node_image.style[domTransform]=parameterToTransform(me._ht_node_image.ggParameter);
				}
				else {
					me._ht_node_image.ggParameter.sx = 1;
					me._ht_node_image.ggParameter.sy = 1;
					me._ht_node_image.style[domTransform]=parameterToTransform(me._ht_node_image.ggParameter);
				}
			}
		}
		me._ht_node_image.ggUpdatePosition=function (useTransition) {
		}
		me._ht_node.appendChild(me._ht_node_image);
		me.__div = me._ht_node;
	};
	me.addSkinHotspot=function(hotspot) {
		var hsinst = null;
		{
			hotspot.skinid = 'ht_node';
			hsinst = new SkinHotspotClass_ht_node(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_ht_node_changenode();;
			me.callChildLogicBlocksHotspot_ht_node_varchanged_ht_ani();;
		}
		return hsinst;
	}
	me.removeSkinHotspots=function() {
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				hotspotTemplates['ht_node'][i] = null;
			}
		}
		hotspotTemplates = [];
	}
	me.addSkin();
	var style = document.createElement('style');
	style.type = 'text/css';
	style.appendChild(document.createTextNode('.ggskin { font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 14px;}'));
	document.head.appendChild(style);
	player.addListener('changenode', function(args) { me.callChildLogicBlocksHotspot_ht_node_changenode(); });
	player.addListener('varchanged_ht_ani', function(args) { me.callChildLogicBlocksHotspot_ht_node_varchanged_ht_ani(); });
	player.addListener('hotspotsremoved', function(args) { me.removeSkinHotspots(); });
	me.skinTimerEvent();
};