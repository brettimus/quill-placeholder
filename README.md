# quill-placeholder
A placeholder text module for use with the [quilljs](https://quilljs.org) text editor.

## Usage
For `quill-placeholder` to work out of the box, 
you'll need to include the base stylesheet 
(`quill-placeholder.css`) and the module file
(`quill-placeholder.js`).

**Include these module files _after_ you include the respective base Quill files.**

To keep your content within your HTML, add a `data-quill-placeholder` attr to your editor container.

```html
    <div id="my-editor" data-quill-placeholder="Hello today, world! This is my placeholder text."></div>
```

Then, when you initialize your editor, include `placeholder` in your module configuration, like so:

```javascript

var options = {
    modules: {
        placeholder: { /* Your options here */ }
    }
};
var editor  = new Quill("#my-editor", options);
```

Finally, initialize the placeholder text once the module is loaded. For this, you can use the 'onModuleLoad' event that Quill exposes.

```javascript

editor.onModuleLoad('placeholder', function(placeholder) {
    placeholder.initialize();
});

```
**:tada: Tada! :tada:**

## How it Works
The placeholder text is read from the container's `data-quill-placeholder` attribute. 
The text is then injected into a container element (`ql-placeholder`), 
which is absolutely positioned to match the offsets of the `ql-editor` element. 
Because the `ql-placeholder` element has a `z-index` of -1, 
it does not block the main `ql-editor` container.

You can apply your own CSS to the placeholder text by targeting the `.ql-placeholder` element.

If you want to configure the name of the `data-*` attr 
or you want to configure the class name of the placeholder container element, 
continue reading!

## Configuration

The `placeholder` module accepts an options hash with the following properties and defaults:

* `dataAttr` (default: `"quill-placeholder"`) - The name of the `data-*` attr from which to pull placeholder text.
* `containerClass` (default: `"ql-container"`) - The class name for the element that contains and displays the placeholder text.
* `htmlSafe` (default: `false`) - If true, allows HTML in the placeholder text.
* `text` (default: `null`) - Hard-coded placeholder text. If truthy, takes precedent over the value obtained from the `data-*` attr.


You can apply your own CSS to the placeholder text by targeting the `.ql-placeholder` element. 
By default, the text is given the lightest-allowable grayish color by accessibility standards (hex `#959595`).


## To Contribute

* Fork
* Modify
* Pull Request
* :heart:

## Questions? Comments?

Open an issue or but `@rudeboot` on Twitter.