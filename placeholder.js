(function loadQuillPlaceholderModule() {
    // Custom module to add placeholder text to Quill editor
    var Placeholder = function(quill, options) {
        this.quill    = quill;
        this.options  = options;
        this.text     = options.text  || "";
        this.style    = options.style || { 'color': '#a9a9a9' };

        var handler   = this.placeholderHandler.bind(this);

        quill.on("selection-change", handler);
        quill.placeholder = this.text;
    };

    Placeholder.prototype.isEmpty = function isEmpty() {
        // NB: We consider a text-editor containing only the placeholder text to be empty 
        var length      = this.quill.getLength(),
            currentText = this.quill.getText(),
            result      = (length === 1) || (currentText === this.text+"\n");
        return result;
    };

    Placeholder.prototype.addPlaceholder = function addPlaceholder() {
        var placeholder = this.text;
        
        this.quill.setText(placeholder + "\n");
        this.quill.formatText(0, placeholder.length, this.style);
    };

    Placeholder.prototype.removePlaceholder = function removePlaceholder() {
        this.quill.setText("\n");
    };

    Placeholder.prototype.placeholderHandler = function placeholderHandler(range) {
        if (!range) {
            // "focus-out"
            if (this.isEmpty()) this.addPlaceholder();
        }
        else {
            // "focus-in"
            if (this.isEmpty()) this.removePlaceholder();
        }
    };

    Quill.registerModule('placeholder', Placeholder);
})();