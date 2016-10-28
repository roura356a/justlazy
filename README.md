# perezoso.js

Perezoso is a lightweight javascript plugin to lazy load responsive images. Most of the existing javascript plugins using extensive dependencies or supporting just the img-tag without responsive parts. This plugin is supposed to be an alternative. Forked from [fhopeman/justlazy](https://github.com/fhopeman/justlazy).

## Features

- 100% performance with plain javascript (no jQuery).
- 100% valid HTML (no empty src tag).
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
$ npm install roura356a/perezoso
```

## Documentation
### 1. Define placeholder

The placeholder has to be defined in your html. The `data-src` and `data-alt` attributes are mandatory, the rest of them are optional. You can define as many placeholders as you need.

#### Attributes description
- `data-src`: (mandatory) Source of the image.
- `data-alt`: (mandatory) Alt text of the image, `data-alt=""` is allowed, but not recommended!
- `data-class`: Class of the newly generated image.
- `data-title`: Title of the image.
- `data-error-handler`: Error handler of the image.
- `data-srcset`: Responsive image source-set attribute.
Example:
```
<span data-src="default/image" data-alt="some alt text"
      data-srcset="small/image 600w, big/image 1000w"
      data-title="some title" data-error-handler="some handler"
      class="lazyload-placeholder">
</span>
```

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

The most flexible way is to use the last function, which has to be called manually to load the image. The advantage is, that you can use custom events (e.g. a sliding event of a gallery) to trigger the lazy loading. The parameters are `placeholder` as object and `options`.
```
Perezoso.lazyLoad(placeholder[, options]);
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

##### options
The `options` are provided as object with following properties. All of them are optional and you can provide as many as you need.

###### Properties description
- `onloadCallback`: The function will be invoked if the placeholder is properly replaced.
- `onerrorCallback`: The function will be invoked if the placeholder could not be replaced. This occurs if mandatory attributes (e.g. `data-src`) aren't available.
- `threshold`: The image is loaded the defined pixels before it appears on the screen. E.g. 200px before it becomes visible.

Example:
```
Perezoso.registerLazyLoadByClass('load-if-visible', {
    onloadCallback: function() {
        // do something
    },
    onerrorCallback: function() {
        // do something
    },
    threshold: 200
});
```
