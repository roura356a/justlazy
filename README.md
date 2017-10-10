# perezoso.js (v1.0.7)

Perezoso is a lightweight javascript plugin to lazy load responsive images forked from [fhopeman/justlazy](https://github.com/fhopeman/justlazy).

Most of the existing javascript plugins using extensive dependencies or supporting just the img-tag without responsive parts. This plugin is supposed to be an alternative.

## Features

- 100% performance with plain javascript (no jQuery).
- Simplicity and lightness (just lazy loading of images, no special cases).
- Heavily tested on various devices, browsers and OS versions.

## Installation

### File include
You can download the latest [release](https://github.com/roura356a/perezoso/releases) and include the `perezoso.js` file as follows in your page:
```
<script src="javascript/perezoso.js" type="text/javascript"></script>
```

### NPM
```
$ npm install perezoso
```

## Documentation
### 1. Define attributes

Anything passed to the placeholder as `data-*` will became an attribute with the same name in the newly generated `img`.

Example:
```
<span data-src="path-to-image/image.jpg"
      data-alt="some alt text"
      data-srcset="path-to-image/image-600.jpg 600w, path-to-image/image-1000.jpg 1000w"
      data-title="some title"
      data-class="img-class"
      class="lazyload-placeholder">
</span>
```

Will became `<img src="path-to-image/image.jpg" class="img-class" alt="some alt text" srcset="path-to-image/image-600.jpg 600w, path-to-image/image-1000.jpg 1000w" title="some title">`.

### 2. Register event
There are three possiblities to trigger the lazy loading of the image(s).

The most comfortable one registers an event listener for all placeholders with a specific css class (e.g. `lazyload-placeholder`). The images will be loaded automatically if they become visible. The parameters are the `css-class` as string and optional `options`.
```
Perezoso.registerLazyLoadByClass(css-class[, options]);
```

If you need more flexibility, the next function accepts as first parameter the html object of the placeholder. So you can decide how to extract the placeholder objects out of the html. The parameters are the `placeholder` as object and `options` if you need them.
```
Perezoso.registerLazyLoad(placeholder[, options]);
```

#### Parameters
##### css-class
The `css-class` is a string which has to be provided without the class selector dot as prefix.

Example:
```
Perezoso.registerLazyLoadByClass('load-if-visible');
```

##### placeholder
The `placeholder` has to be provided as plain javascript object.

Example:
```
Perezoso.registerLazyLoad(document.getElementById('placeholder-1'));
```

##### threshold
The `threshold` option is optional. The image is loaded the defined pixels before it appears on the screen.

Example:
```
Perezoso.registerLazyLoadByClass('load-if-visible', {
    threshold: 200
});
```

##### onCreateCallback
The `onCreateCallback` option is optional. When the new image is created, the function defined here is called.

Example:
```
Perezoso.registerLazyLoadByClass('load-if-visible', {
    onCreateCallback: function() {
        console.log('image loaded!');
    }
});
```
