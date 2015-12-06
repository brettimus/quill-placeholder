# quill-placeholder
A module for use with the quilljs editor that inserts placeholder text into the editor

## Usage
We assume `Quill` is defined in the global scope. To load the module, do the following:

* Include placeholder.js via `<script>` tag after Quill. The module is loaded by an [IIFE](https://en.wikipedia.org/wiki/Immediately-invoked_function_expression) so as not to pollute the global scope.
* When you instantiate your editor, include `placeholder` in the modules configuration, like so:

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
:tada: **Tada!** :tada: That's it.

## Configuration

`placeholder` accepts an options objects with a `text` key and a `style` key. The `style` value should in turn be an object whose keys define the styles that your editor instance can use to decorate the placeholder text.

The `text` and `style` values are passed to a call to `Quill.prototype.formatText`, which you can read about in the Quill API docs [here](http://quilljs.com/docs/api/#quillprototypeformattext). 

By default, the module gives your placeholder text a `color` of `#959595`. 
If you specify your own whitelist of format names on your quill instance, 
**the module will be sure to remove any default stylings that you have not whitelisted**.

## “Gotchas”

The current implementation simply prepopulates the editor with styled text, which can make form validation a pain in the rumpus.

One tool I've used for workarounds (and I'm not saying I'm proud of it), is to call the internal `isEmpty` method from the placeholder module. 

`isEmpty` returns `true` if the editor has no text _or_ if it contains only the original placeholder text.

Call `isEmpty` like so:

```javascript
// editor is your quill instance
editor.modules.placeholder.isEmpty();
```

## Contribution

Pull requests are welcome. Please help make this better! :hearts:

## V1
There is an experimental version of `quill-placeholder` that does not directly populate the editor with text. If you have interest in using it, please create an issue. I will do my best to help you integrate it into your project.