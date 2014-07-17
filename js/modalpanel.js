
var in_drag = false;

function getAutoSizeModalPanel(cont){
	cont =  jQuery('#'+cont.id+' > TABLE, DIV, FORM').get(0);    
	if (cont){
		if (cont.tagName == "DIV" || cont.tagName == "div" ||
					cont.tagName == "form" || cont.tagName == "form")	getAutoSizeModalPanel(cont);
		else {
			var innerWidth = window.innerWidth || document.body.offsetWidth; 
			return cont.offsetWidth < innerWidth ? cont.offsetWidth : innerWidth; 
		}
	}else return undefined;
}

function autoSizeModalPanel(el, cont){
   var childern = cont.childNodes;
   if (childern){
      for (var i =0; i < childern.length; i++){
        cont = childern[i];
		   	if (cont){
			    if (cont.tagName == "DIV" || cont.tagName == "div" ||
							cont.tagName == "FORM" || cont.tagName == "form")	autoSizeModalPanel(el, cont);
		  	    else if (cont.tagName == "TABLE" || cont.tagName == "table"){
							var innerWidth = window.innerWidth || document.body.offsetWidth; 
		              	var w =  cont.offsetWidth < innerWidth ? cont.offsetWidth : innerWidth; 
		              	if (el.getAttribute('autosize')){
		              		if (el.offsetWidth < w) {
		              			el.style.width = w+"px"; 
		              			return;
		              		}	
		              	}	
		              	else {   
		                	if(w == el.offsetWidth) w = (0.8*w).toFixed(0);
		                	el.style.width = w+"px"; 
		                	el.setAttribute('autosize', '1');
		              		return;
		                }	
						 }
		    }else return;

       }
   }    
   else return;
}

function maximisizeModalPanel(id){
	var el = document.getElementById(id); 
	if (el != undefined){
		var innerWidth = window.innerWidth || document.body.offsetWidth; 
		var innerHeight = window.innerHeight || document.body.offsetHeight; 
		if (el.getAttribute('rWidth') == undefined) 
			el.setAttribute('rWidth', el.clientWidth);
		if (el.getAttribute('rHeight') == undefined)
			el.setAttribute('rHeight', el.clientHeight);
//		var width1 = (innerWidth-50)+"px;";
//		var height1 = (innerHeight-50)+"px;";
		var width1 = innerWidth-50;
		var height1 = innerHeight-50;
		var left1 = (innerWidth - width1)/2;
		var top1 = (innerHeight - height1)/2;
		jQuery(el).css({width: width1, height:height1, left: left1, top: top1}); 
		
		return true;	
	}else {
		alert("maximisizeModalPanel.Error: не найдена панель с id:"+id+"!");	
		return false;	
	}	
}

function restoresizeModalPanel(id){
	var el = document.getElementById(id); 
	if (el != undefined){
		var innerWidth = window.innerWidth || document.body.offsetWidth; 
		var innerHeight = window.innerHeight || document.body.offsetHeight; 
		var rWidth = el.getAttribute('rWidth');
		var rHeight = el.getAttribute('rHeight');
		if (rWidth!=undefined && rHeight!=undefined) {
//			el.style.width = rWidth+"px;";
//			el.style.height = rHeight+"px";
			var left1 = (innerWidth - rWidth)/2;
			var top1 = (innerHeight - rHeight)/2;
			jQuery(el).css({width: rWidth, height: rHeight, left: left1, top: top1}); 
		}
		return true;	
	}else {
		alert("restoresizeModalPanel.Error: не найдена панель с id:"+id+"!");
		return false;	
	}
}



/*
function showModalPanelCallBack(id, shadow)
входной параметры:	
id - ссылка на модальное окно
shadow - если false или неопределен то показывать тень
*/
function showModalPanelCallBack(id, shadow){
	var el = id; 
	var innerWidth = window.innerWidth || document.body.offsetWidth; 
	var innerHeight = window.innerHeight || document.body.offsetHeight; 


	var id1 =  normalizeID(id.id);
/*	
	if (jQuery.browser['msie']){	
		var cont = el.lastChild;
		if(cont) autoSizeModalPanel(el, cont);
		
		if(jQuery.browser.version < 7)
			jQuery("#"+id1+'_shadow').html('<iframe></iframe>');
			  
	}
*/	
  
  if (el.clientWidth > innerWidth) el.style.width = "90%";
  if (el.clientHeight > innerHeight) el.style.height = "90%";
	jQuery(el).css({display: 'block'}); 
	var left = (innerWidth - el.clientWidth)/2;
	var top = (innerHeight - el.clientHeight)/2;
	jQuery(el).css({visibility: 'visible', left: left, top: top, display: 'none'});
//	jQuery(el).css({visibility: 'visible', left: left, top: top});	
	if (shadow == undefined || !shadow) 
		jQuery("#"+id1+'_shadow').css('visibility', 'visible');  
}	

/*
function showModalPanel(id)	- отображает модальное окно
входной параметры:	
id - id модальное окно
shadow - если false или неопределен то показывать тень
*/
function showModalPanel(id, shadow){
  try{
	var $id = jQuery(id);
	if ($id && $id.size() == 1) id = $id.get(0);
	else {
		alert("showModalPanel.Error не найдена или более одной модальной панели с id : "+id+" в DOM дереве!");
		return false;
	}
	initModalPanel(id);
	showModalPanelCallBack(id, shadow);
    jQuery(id).fadeIn("slow");
  }catch(e){alert("Ошибка. showModalPanel: "+e.message);} 
}	

function normalizeID(id){
	return id.replace(':', '\\:');
}

/*
function hideModalPanelCallBack(id, shadow)	- скрывет модальное окно
входной параметры:	
id - ссылка на модальное окно
shadow - если false или неопределен то скрывать тень
*/
function hideModalPanelCallBack(id, shadow){
	jQuery(id).css({visibility: 'hidden', opacity: 1}); 
	jQuery(id).css('top', '-9999px');
	var id1 =  normalizeID(id.id);
	if (shadow == undefined || !shadow) 
		jQuery("#"+id1+'_shadow').css('visibility', 'hidden'); 
/*	
	if (jQuery.browser['msie'] && jQuery.browser.version < 7){	
		jQuery("#"+id1+'_shadow').html('');  
	}
*/		
}	

/*
function hideModalPanel(id)	- скрывет модальное окно
входной параметры:	
id - id модального окна
shadow - если false или неопределен то скрывать тень
*/
function hideModalPanel(id, shadow){
  try{	
	  var $id = jQuery(id);
	  if ($id && $id.size() == 1) id = $id.get(0);
	  else {
		alert("hideModalPanel.Error не найдена или более одной модальной панели с id : "+id+" в DOM дереве!");
		return false;
	  }
	  jQuery(id).fadeOut("slow", function(){hideModalPanelCallBack(id, shadow)});
  }catch(e){alert("Ошибка. hideModalPanel: "+e.message);}	  
}	


/*
function initModalPanel(id)	- иницилизация перемещения  
входной параметры:	
id - ссылка на модальное окно
*/
function initModalPanel(id){
  var el = id;
  jQuery(el.firstChild).mousedown(function(e){
  	document.body.style.cursor="move";
  	in_drag = [this.parentNode, this.parentNode.offsetWidth/2, this.offsetHeight/2];
  })
   jQuery(document).mouseup(function(){document.body.style.cursor="auto"; in_drag = false;})
   .mousemove(function(e){
		if (!in_drag) return false;
		in_drag[0].style.left = (document.body.scrollLeft + e.pageX-in_drag[1] ) + "px";
		in_drag[0].style.top  = ( document.body.scrollTop  + e.pageY-in_drag[2]) + "px";
  });		
}	
