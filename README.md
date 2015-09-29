# quill-placeholder
a module for use with the quilljs editor that inserts placeholder text into the editor

(This is pretty simple stuff.)

## Usage

* Include placeholder.js into your project after you load Quill. 
* When you initialize your editor, include `placeholder` in your modules configuration, like so:

```javascript

var options = {
    modules: {
        placeholder: { text: "Your Placeholder Here", style: { color: '#959595' } }
    }
};
var editor  = new Quill("#my-editor", options);
```

If you choose to give the module a name other than placeholder, be sure to initialize it like so:

```javascript

editor.onModuleLoad('myCustomPlaceholderName', function(placeholder) {
    placeholder.initialize();
});

```
**Tada!**

## Configuration

`placeholder` accepts an options hash with a `text` key and a `style` key. The `style` value should in turn be an options hash of styles that your editor instance can use to decorate the placeholder text.

By default, the text is given a grayish color (hex `#A9A9A9`).

The `text` and `style` values are passed to a call to `Quill.prototype.formatText`, which you can read about in the Quill API docs, [here](http://quilljs.com/docs/api/#quillprototypeformattext). 

By default, the module gives your placeholder text a `color` of `#959595`. 
If you specify your own whitelist of format names on your quill instance, 
**the module will be sure to remove any default stylings that you haven't whitelisted**.

## GOTCHAS

The current implementation just prepopulates the editor with some styled text.

This can make your form validation a pain in the rumpus.

One tool I've used for workarounds (and I'm not saying I'm proud of it), is to call the internal `isEmpty` method from the placeholder module. This method returns `true` if the editor's length is 1, or if it contains _only_ the placeholder text

You can call `isEmpty` like so:

```javascript

var didMyStupidUserActuallyTypeAnything = editor.modules.placeholder.isEmpty();
```

## Contribution

Please make this better! :hearts: