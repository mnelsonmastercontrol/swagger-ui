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

	function sanitizeUnneededUI() {
        var classSanitizers = {
            "try-out": remove,
            "base-url": remove,
            "content-type": contentTypeSanitizer
        };
        forEachMemberInObject(classSanitizers, sanitizeByClassName);
	}

	function forEachMemberInObject(obj, action){
	    for (var member in obj){
	        action(member, obj[member]);
        }
    }

    function sanitizeByClassName(className, sanitizer) {
        var elements = document.getElementsByClassName(className);
        for(var i=0; i<elements.length; i++){
            sanitizer(elements[i]);
        }
    }

    function contentTypeSanitizer(element){
        dropdownToParagraph(element);
        remove(element);
    }

    function dropdownToParagraph(dropdown){
        var currentValue = dropdown.value;
	    var newNode = document.createElement("p");
	    newNode.innerText = currentValue;
	    dropdown.parentNode.appendChild(newNode);
    }

    function remove(element){
        element.parentNode.removeChild(element);
	}

	observeDOM(document, sanitizeUnneededUI);
})();
