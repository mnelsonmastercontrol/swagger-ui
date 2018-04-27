(function(global, undefined){
        getBaseUrl = function () {
            var pathsInUrl = location.pathname.split('/');
            var currentShare = pathsInUrl[0] || pathsInUrl[1];
            return location.protocol + "//" + location.host + "/" + currentShare;
        };
  
        getQueryVariable = function(variable) {
            var query = window.location.search.substring(1);
            var vars = query.split('&');
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split('=');
                if (decodeURIComponent(pair[0]) == variable) {
                    return decodeURIComponent(pair[1]);
                }
            }
            console.log('Query variable %s not found', variable);
        }

        global.getRequestedVersionPath = function() {
        var queryParamVersion = getQueryVariable('version');
        if (queryParamVersion != undefined) {
            return queryParamVersion + ".json";
        } else {
            return getBaseUrl() + "/restapi/v2/api-docs";
        }
        }
})(window)