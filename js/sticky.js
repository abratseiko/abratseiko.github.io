(function(){

	function stickyHeader(elem){

		var container = document.getElementById("body-container");
		var differentOfWidth;
		var differentOfHeight;

		// var header1 = document.getElementById('h1');
		// var header2 = document.getElementById('h2');
		// var header3 = document.getElementById('h3');

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

		window.addEventListener("resize", ResizePosition);
		
		window.addEventListener("scroll", ScrollingPage);
		
		function ScrollingPage(event){
			
			differentOfWidth = document.documentElement.clientWidth - window.innerWidth;
			differentOfHeight = window.innerHeight - document.documentElement.clientHeight;
			
			// document.getElementById('num').innerHTML = header1.style.position;
			// document.getElementById('num1').innerHTML = header2.style.position;
			// document.getElementById('num2').innerHTML = header3.style.position;

			var currentItem = getCurrentElemPosition(elem);

			if (differentOfHeight < 0 && differentOfWidth == 0){
            	newStyles.top = differentOfHeight + 'px';
            	// container.style.top = differentOfHeight + 'px';
            }
	
			if( differentOfWidth > 0 ){
				if( currentItem.bottom <= container.offsetTop ){
					setNewStyles(newStylesScale);
					elem.style.position = "static";
				} else {
					setStartStyles();
				}
			} else {
				// setStartStyles();
				
				if( currentItem.top <= container.offsetTop ){
					setNewStyles(newStyles);
				} else {
					setStartStyles();
				}
			}
		}

		function ResizePosition(event){
            newStyles.width = (getCurrentElemPosition(elem).right - getCurrentElemPosition(elem).left) + 'px';
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