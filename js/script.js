(function() {
	
	function stickyHeader(elem, paddingArray){

		var getCurrentPosition = getCurrentElemPosition();
		var bodyTop = document.body.style.paddingTop.replace('px', '');

		// styles for fixed element
		var newStyles = {
			position: 'fixed',
			top: '0px',
			left: getCurrentPosition.left + 'px',
			width: (getCurrentPosition.right - getCurrentPosition.left) + 'px',
			height: (getCurrentPosition.bottom - getCurrentPosition.top)
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

			if( windowScroll().top >= currentElemPosition.top){
				setNewStyles();

				for (var i = 0; i < paddingArray.length - 1; i++ ){
					if ( newStyles.height == (paddingArray[i+1] - paddingArray[i]) && (document.body.style.paddingTop == paddingArray[i] + 'px')){
			 			document.body.style.paddingTop = paddingArray[i+1] + 'px';
			 			console.log(paddingArray[i+1]);
					}
				}
			} else {
			 	setStartStyles();
		 		document.body.style.paddingTop = "0px";
			}
			 
		    onscroll && onscroll(event);
		};

		// resize window & change styles

		window.addEventListener("resize", ResizePosition);

		function ResizePosition(){
            getCurrentPosition = getCurrentElemPosition();
            startStyles = getStartStyles();
            newStyles = {
				position: 'fixed',
				top: '0px',
				left: getCurrentPosition.left + 'px',
				width: (getCurrentPosition.right - getCurrentPosition.left) + 'px'
			};
        };


		// get current window scroll coordination

		function windowScroll(){
			return{
				top: window.pageYOffset || document.documentElement.scrollTop,
				left: window.pageXOffset || document.documentElement.scrollLeft
			};
		}

		function getCurrentElemPosition(){
			var currentPosition = elem.getBoundingClientRect();
			
			return {
				top: currentPosition.top,
				left: currentPosition.left,
				right: currentPosition.right,
				bottom: currentPosition.bottom
			};
		};

		function getStartStyles(){
			var stylesArray = ['position', 'top', 'left', 'z-index', 'width'];
			var currentStyles = {};
			
			stylesArray.forEach(function(i){
				currentStyles[i] = elem.style[i];
			});

			return currentStyles;
		};
	}

	var headers = document.querySelectorAll('.header');
	var topScroll = 0;
	var pArray = [0];

	Array.prototype.forEach.call(headers, function(header) {
		var headerHeight = header.offsetHeight;
		topScroll = topScroll + headerHeight;
		pArray.push(topScroll);
		return pArray;
	});

	Array.prototype.forEach.call(headers, function(header) {
		
		stickyHeader(header, pArray);

	});



})();



