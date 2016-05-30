(function(){

	function stickyHeader(elem){

		var container = document.getElementById("body-container");
		var differentOfWidth;
		var differentOfHeight;

		var newStyles = {
			position: 'fixed',
			top: '0px',
			width: (getCurrentElemPosition(elem).right - getCurrentElemPosition(elem).left) + 'px'
		};

		var newStylesScale = {
			position: 'absolute',
			top: '0px',
			width: '100%'
		};

		var setNewStyles = function(object){
			for (var key in object) {
		 	  	elem.childNodes[1].style[key] = object[key];
		 	}	
		};

		var setStartStyles = function(){
		 	elem.childNodes[1].style.position = 'relative';
		 	elem.childNodes[1].style.top = 'auto';
		 	elem.childNodes[1].style.width = '100%';
		};

		window.addEventListener("scroll", ScrollingPage);

		window.addEventListener("resize", ResizePosition);
		
		function ScrollingPage(event){
			var currentItem = getCurrentElemPosition(elem);
			if (differentOfHeight < 0){
            	newStyles.top = differentOfHeight + 'px';
            }
	
			if( differentOfWidth > 0 ){
				if( currentItem.bottom <= container.offsetTop ){
					setNewStyles(newStylesScale);
					elem.style.position = "static";
				} else {
					setStartStyles();
				}
			} else {
				if( currentItem.top <= container.offsetTop ){
					setNewStyles(newStyles);
				} else {
					setStartStyles();
				}
			}
			// if( currentItem.top <= container.offsetTop ){
			// 	if( differentOfWidth < 0 ){
			// 		setNewStyles(newStylesScale);
			// 		elem.style.position = "static";
			// 	} else{
			// 		setNewStyles(newStyles);
			// 	}
			// } else {
			// 	setStartStyles();
			// }

		}

		function ResizePosition(event){
            newStyles.width = (getCurrentElemPosition(elem).right - getCurrentElemPosition(elem).left) + 'px';
            differentOfWidth = document.documentElement.clientWidth - window.innerWidth;
            differentOfHeight = window.innerHeight - document.documentElement.clientHeight;
        }

		function getCurrentElemPosition(block){
			var currentPosition = block.getBoundingClientRect();
			
			return {
				top: currentPosition.top,
				left: currentPosition.left,
				right: currentPosition.right,
				bottom: currentPosition.bottom
			};
		}
	}

	var headers = document.querySelectorAll('.header-container');
	Array.prototype.forEach.call(headers, function(header) {
		stickyHeader(header);
	});


})();