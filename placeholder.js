(function loadQuillPlaceholderModule() {
    var Placeholder = function(quill, options) {
        this.mixinOptions(options);

        this.quill     = quill;
        this.placeholderText = this.options.text  || this.getPlaceholderText();

        // Container elt
        this.placeholderContainer = quill.addContainer("ql-placeholder");
        this.placeholderContainer.className += " ql-editor"; //mimic styles of editor

        // TODO - calculate container offsets

        var handler   = this.placeholderHandler.bind(this);

        quill.on("selection-change", handler);
        quill.placeholder = this.text;
    };

    Placeholder.prototype.isEmpty = function isEmpty() {
        return this.quill.getLength() === 1;
    };

    Placeholder.prototype.showPlaceholder = function showPlaceholder() {
        if (this.options.htmlSafe) {
            this.placeholderContainer.innerHTML = this.placeholderText;
        }
        else {
            this.placeholderContainer.textContent = this.placeholderText;
        }
    };

    Placeholder.prototype.hidePlaceholder = function hidePlaceholder() {
        this.placeholderContainer.textContent = "";
    };

    Placeholder.prototype.placeholderHandler = function placeholderHandler(range) {
        if (!range) {
            // "focus-out"
            if (this.isEmpty()) this.showPlaceholder();
        }
        else {
            // "focus-in"
            if (this.isEmpty()) this.hidePlaceholder();
        }
    };

    Placeholder.prototype.offsetPlaceholderContainer = function offsetPlaceholderContainer() {};

    Placeholder.prototype.mixinOptions = function mixinOptions(options) {
        var defaults = {
            text: null,
            containerClass: "ql-placeholder",
            dataAttr: "quill-placeholder",
            htmlSafe: false,
        };
        this.options = defaults;
        // mixin options
        for (var prop in options) {
            if (options.hasOwnProperty(prop)) {
                this.options[prop] = options[prop];
            }
        }
    };

    Placeholder.prototype.getPlaceholderText = function getPlaceholderText() {
        var text = this.quill.container.getAttribute("data-"+this.options.dataAttr);
        return text;
    };

    Placeholder.prototype.initialize = Placeholder.prototype.placeholderHandler;

    Quill.registerModule('placeholder', Placeholder);
})();