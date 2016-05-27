(function(){

	function stickyHeader(elem){

		var newStyles = {
			position: 'fixed',
			top: '0px',
			width: (getCurrentElemPosition(elem).right - getCurrentElemPosition(elem).left) + 'px'
		};

		var setNewStyles = function(){
			for (var key in newStyles) {
		 	  	elem.childNodes[1].style[key] = newStyles[key];
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
			if(currentItem.top <= 0){
				toggleFullScreen();
				setNewStyles();
			} else {
				setStartStyles();
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

		function toggleFullScreen() {
		  var doc = window.document;
		  var docEl = doc.documentElement;

		  var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen;
		  var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen;

		  if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement) { 
		    requestFullScreen.call(docEl);
		  }
		  else {
		    cancelFullScreen.call(doc);  
		  }
		}
	}

	var headers = document.querySelectorAll('.header-container');
	Array.prototype.forEach.call(headers, function(header) {
		stickyHeader(header);
	});

})();