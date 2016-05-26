(function() {
	
	function stickyHeader(elem){
		
		var getCurrentElemPosition = function(){
			var currentPosition = elem.getBoundingClientRect();
			
			return {
				top: currentPosition.top,
				left: currentPosition.left,
				right: currentPosition.right
			};
		};

		// styles for fixed element
		var newStyles = {
			position: 'fixed',
			top: '0px',
			left: getCurrentElemPosition().left + 'px',
			'z-index': 2,
			width: (getCurrentElemPosition().right - getCurrentElemPosition().left) + 'px'
		};

		var getStartStyles = function(){
			var stylesArray = ['position', 'top', 'left', 'z-index'];
			var currentStyles = {};
			
			stylesArray.forEach(function(i){
				currentStyles[i] = elem.style[i];
			});

			return currentStyles;
		};

		var setNewStyles = function(){
			for (var key in newStyles) {
		 	  elem.style[key] = newStyles[key];
		 	}
		};

		var startStyles = getStartStyles();
		
		var setStartStyles = function(){
			
			for (var key in startStyles) {
		 	  elem.style[key] = startStyles[key];
		 	}
		};

		// scrolling page & compare top positions of window and element
		var onscroll = window.onscroll;
		var currentElemPosition = getCurrentElemPosition();

		window.onscroll = function(event){

			if( windowScroll().top > currentElemPosition.top){
				setNewStyles();
			} else {
			 	setStartStyles();
			}
			 
		    onscroll && onscroll(event);
		};

		// get current window scroll coordination
		function windowScroll(){
			return{
				top: window.pageYOffset || document.documentElement.scrollTop,
				left: window.pageXOffset || document.documentElement.scrollLeft
			};
		}
	}

	var headers = document.querySelectorAll('.header');

	Array.prototype.forEach.call(headers, function(header) {
		stickyHeader(header);
	});

})();



