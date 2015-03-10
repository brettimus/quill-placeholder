# quill-placeholder
a module for use with the quilljs editor that inserts placeholder text into the editor

(This is pretty simple stuff.)

## Usage

Include placeholder.js into your project after you load Quill. Then, when you initialize your editor, include `placeholder` in your modules configuration, like so:

```javascript

var options = {
    modules: {
        placeholder: { text: "Your Placeholder Here", style: { color: '#A9A9A9' } }
    }
};
var editor  = new Quill("#my-editor", options);
```

Then, initialize the placeholder text once the module is loaded. For this, you can use the 'onModuleLoad' event that Quill exposes.

```javascript

editor.onModuleLoad('placeholder', function(placeholder) {
    placeholder.initialize();
});

```
**Tada!**

## Configuration

`placeholder` accepts an options hash with a `text` key and a `style` key. The `style` value should in turn be an options hash of styles that your editor instance can use to decorate the placeholder text.

By default, the text is given a grayish color (hex `#A9A9A9`).

The `text` and `style` values are passed to a call to `Quill.prototype.formatText`, which you can read about in the Quill API docs, [here](http://quilljs.com/docs/api/#quillprototypeformattext).

## Contribution

Please make this better! :hearts: