(function loadQuillPlaceholderModule() {
    var Placeholder = function(quill, options) {
        this.quill    = quill;
        this.options  = options;
        this.text     = options.text  || "";
        this.style    = this.extend(this.getStyleDefaults(), options.style);

        var handler   = this.placeholderHandler.bind(this);

        quill.on("selection-change", handler);
        quill.onModuleLoad("placeholder", function(placeholder) {
            placeholder.initialize();
        });
        if (!quill.placeholder) quill.placeholder = this.text;
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

    Placeholder.prototype.getStyleDefaults = function() {
        var defaults = {
                color: '#959595',
            },
            formats = this.quill.options.formats;

        Object.keys(defaults).forEach(function(defaultFormat) {
            var isValidFormat = formats.some(function(whitelistedFormat) {
                return defaultFormat === whitelistedFormat;
            });
            if (!isValidFormat) {
                printFormatWarning(defaultFormat);
                delete defaults[defaultFormat];
            }
        });

        return defaults;

        function printFormatWarning(formatName) {
            var msg = "%c[quill-placeholder] Warning!\n\nDefault format '" +
                        formatName +
                        "' is not whitelisted by your quill instance.\nPass '" +
                        formatName +
                        "' into the 'formats' array of your quill config to apply default styles.";
            var style = "color: darkred; font-weight: 700;"
            console.log(msg, style);
        }
    };

    Placeholder.prototype.extend = function(o1, o2) {
        for (var prop in o2)
            if (o2.hasOwnProperty(prop))
                o1[prop] = o2[prop];
        return o1;
    };


    Placeholder.prototype.initialize = Placeholder.prototype.placeholderHandler;

    Quill.registerModule('placeholder', Placeholder);
})();