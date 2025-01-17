(function (window) {
    window.imageLazyLoadSetting.processImages = processImages;
    var isSpa = window.imageLazyLoadSetting.isSPA;
    var images = Array.prototype.slice.call(document.querySelectorAll('img[data-original]'));

    function elementInViewport(el) {
        var rect = el.getBoundingClientRect();
        return (
            rect.bottom >= 0
            && rect.left >= 0
            && rect.top <= (window.innerHeight || document.documentElement.clientHeight)
        );
    }
    function loadImage(el, fn) {
        var img = new Image()
            , src = el.getAttribute('data-original');
        img.onload = function () {
            el.src = src;
            fn ? fn() : null;
        };
        img.src = src;
        img.removeAttribute("style");
    }

    function processImages() {
        if(isSpa) {
            images = Array.prototype.slice.call(document.querySelectorAll('img[data-original]'));
        }
        for (var i = 0; i < images.length; i++) {
            if (elementInViewport(images[i])) {
                (function(index){
                    var loadingImage = images[index];
                    loadImage(loadingImage, function () {
                        images = images.filter(function(t) {
                            if(!(loadingImage!==t)){
                                t.removeAttribute("style");
                            }
                            return loadingImage !== t;
                        });
                    });
                })(i);
            }
        };
    }

    function throttle(method, context) {
        clearTimeout(method.tId);
        method.tId = setTimeout(function () {
            method.call(context);
        }, 500);
    }

    processImages();

    window.addEventListener('scroll', function () {
        throttle(processImages, window);
    });
})(this);
