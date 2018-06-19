(function () {
    var oHtml = document.getElementsByTagName('html')[0];

    console.log(oHtml);

    var docWidth = document.body.clientWidth;

    window.onresize = function () {
        docWidth = document.body.clientWidth;

        oHtml.style.fontSize = docWidth/20+'px';
    }

    console.log(docWidth);

    oHtml.style.fontSize = docWidth/20+'px';
    console.log(oHtml.style.fontSize);
})()
