function getLatestJson() {
    let request = new XMLHttpRequest();

    request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
            createZip(this.responseText);
        }
    };

    request.open("GET", getUrlToJsonDocumentation(), true);
    xhttp.send();
}

function createZip(text) {
    var zip = new JSZip();
    zip.file("swagger-json.js", text);
}