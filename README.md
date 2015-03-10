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

**Tada!**

## Configuration

`placeholder` accepts an options hash with a `text` key and a `style` key. The `style` value should in turn be an options hash of styles that your editor instance allows.

The `text` and `style` values are passed to a call to `Quill.prototype.formatText`, which you can read about in the Quill API docs, [here](http://quilljs.com/docs/api/#quillprototypeformattext).

## Contribution

Please make this better! :hearts: