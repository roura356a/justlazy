/**
 * perezoso 1.0.7
 * Repo: https://github.com/roura356a/perezoso
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.Perezoso = factory();
    }
}(this, function () {
    'use strict';

    var _createImage = function (imgPlaceholder, imgAttributes, onCreateCallback) {
        var img = document.createElement('img');

        for (var attr in imgAttributes) {
            img.setAttribute(imgAttributes[attr].name, imgAttributes[attr].value);
        }

        img.onload = onCreateCallback;

        _replacePlaceholderWithImage(imgPlaceholder, img);
    };

    var _replacePlaceholderWithImage = function (imgPlaceholder, img) {
        var parentNode = imgPlaceholder.parentNode;
        if (!!parentNode) {
            parentNode.replaceChild(img, imgPlaceholder);
        }
    };

    var _resolveImageAttributes = function (imgPlaceholder) {
        var attributes = imgPlaceholder.attributes,
            imgAttributes = {};

        for (var attr in attributes) {
            if (/^data-/.test(attributes[attr].name)) {
                imgAttributes[attributes[attr].name] = {
                    name: attributes[attr].name.substr(5),
                    value: attributes[attr].value
                };
            }
        }

        return imgAttributes;
    };

    var _validateOptions = function (options) {
        return options || {};
    };

    var lazyLoad = function (imgPlaceholder, options) {
        var imgAttributes = _resolveImageAttributes(imgPlaceholder);
        options = _validateOptions(options);

        _createImage(imgPlaceholder, imgAttributes, options.onCreateCallback);
    };

    var _isVisible = function (placeholder, optionalThreshold) {
        var windowInnerHeight = window.innerHeight || document.documentElement.clientHeight;
        var threshold = optionalThreshold || 0;

        return placeholder.getBoundingClientRect().top - windowInnerHeight <= threshold;
    };

    var _loadImgIfVisible = function (imgPlaceholder, options) {
        var scrollEventCallback = function (e) {
            if (_isVisible(imgPlaceholder, options.threshold)) {
                lazyLoad(imgPlaceholder, options);

                if (window.removeEventListener) {
                    window.removeEventListener(e.type, scrollEventCallback, false);
                } else {
                    window.detachEvent('on' + e.type, scrollEventCallback);
                }
            }
        };

        return scrollEventCallback;
    };

    var registerLazyLoad = function (imgPlaceholder, options) {
        var validatedOptions = _validateOptions(options);
        if (_isVisible(imgPlaceholder, validatedOptions.threshold)) {
            lazyLoad(imgPlaceholder, options);
        } else {
            var loadImgIfVisible = _loadImgIfVisible(imgPlaceholder, validatedOptions);
            if (window.addEventListener) {
                window.addEventListener('scroll', loadImgIfVisible, false);
            } else {
                window.attachEvent('onscroll', loadImgIfVisible);
            }
        }
    };

    var registerLazyLoadByClass = function (imgPlaceholderClass, options) {
        var placeholders = document.querySelectorAll('.' + imgPlaceholderClass);
        for (var i = 0; i < placeholders.length; ++i) {
            Perezoso.registerLazyLoad(placeholders[i], options);
        }
    };

    return {
        lazyLoad: lazyLoad,
        registerLazyLoad: registerLazyLoad,
        registerLazyLoadByClass: registerLazyLoadByClass
    };
}));
