(function() {
	var MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
        eventListenerSupported = window.addEventListener;

    function observeDOM(obj, callback){
        if( MutationObserver ){
            // define a new observer
            var obs = new MutationObserver(function(mutations, observer){
                if( mutations[0].addedNodes.length || mutations[0].removedNodes.length )
                    callback();
            });
            // have the observer observe foo for changes in children
            obs.observe( obj, { childList:true, subtree:true });
        }
        else if( eventListenerSupported ){
            obj.addEventListener('DOMNodeInserted', callback, false);
            obj.addEventListener('DOMNodeRemoved', callback, false);
        }
    };


	function sanitizeUneededUi() {
	  sanitizeContentTypes();
	  sanitizeTryOut();
	  
	}

	function sanitizeContentTypes() {
	  var contentTypes = document.getElementsByClassName("content-type");
	  for(var i=0; i<contentTypes.length; i++){
	    var contentType = contentTypes[i];
	    var currentValue = contentType.value;
	    var newNode = document.createElement("p");
	    newNode.innerText = currentValue;
	    contentType.parentNode.appendChild(newNode);
	    contentType.parentNode.removeChild(contentType);
	  }
	}

	function sanitizeTryOut() {
	  var tryOutButtons = document.getElementsByClassName("try-out");
	  for(var i=0; i<tryOutButtons.length; i++){
	    tryOutButtons[i].parentNode.removeChild(tryOutButtons[i]);
	  }
	}


	observeDOM(document, sanitizeUneededUi);
})();