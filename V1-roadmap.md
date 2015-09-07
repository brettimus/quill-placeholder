# V1 

## Outline
### Use a dummy element
This is a little tricky.

At present, the placeholder module populates the editor container with text, making it unnecessarily difficult to do form validations.

Instead, w

### Read from a data-attr
We don't want to muddle our content with our javascript. 
Hence, I think the default behavior should be to read the placeholder text from a `data-attr` on the quill container. 

## The Configuration

* All styles should be applied via CSS, so the user should be able to customize the container class's name.
* The user should be able to pass html if they so desire.


`text {string}`
`containerClass {string} ["ql-placeholder"]`
`dataAttr {string} ["quill-placeholder"]`
`htmlSafe {bool} [false]`

