(function loadQuillPlaceholderModule() {
    var Placeholder = function(quill, options) {
        this.quill = quill;
        this.mixinOptions(options);
        this.createPlaceholderContainer();
        this.placeholderText = this.options.text || this.getPlaceholderText();

        // TODO - calculate container offsets

        var handler   = this.placeholderHandler.bind(this);

        quill.on("selection-change", handler);
        quill.placeholder = this.text;
    };

    Placeholder.prototype.isEmpty = function isEmpty() {
        return this.quill.getLength() === 1;
    };

    Placeholder.prototype.showPlaceholder = function showPlaceholder() {
        var contentProperty = this.options.htmlSafe ? "innerHTML" : "textContent";
        this.placeholderContainer[contentProperty] = this.placeholderText;
        this.offsetPlaceholderContainer();
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

    Placeholder.prototype.createPlaceholderContainer = function createPlaceholderContainer() {
        this.placeholderContainer = this.quill.addContainer("ql-placeholder");
        // this.placeholderContainer.className += " ql-editor"; //mimic styles of editor
    };


    Placeholder.prototype.offsetPlaceholderContainer = function offsetPlaceholderContainer() {
        var quillContainerBox = this.quill.container.getBoundingClientRect();
        var quillEditorBox    = this.quill.editor.root.getBoundingClientRect();
        var topOffset         = quillEditorBox.top - quillContainerBox.top;
        var leftOffset        = quillEditorBox.left - quillContainerBox.left;
        
        this.placeholderContainer.style.top = topOffset + "px";
        this.placeholderContainer.style.left = leftOffset + "px";
    };

    Placeholder.prototype.mixinOptions = function mixinOptions(options) {
        var defaults = {
            text: null,
            containerClass: "ql-placeholder",
            dataAttr: "quill-placeholder",
            htmlSafe: false,
        };

        this.options = defaults;

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