---
filename: props.html
css: /* write your CSS here*/

---
BareMDE :bear: props
=============

### render

Function, which gets markdown text as a parameter and returns rendered HTML. This function have to return *full HTML,* with head, body, etc. **Required.**

### onUpdate

Function, which called on each update of edited text. Optional.
   
### save

Save function. Receives markdown text as a parameter. Optional.

### content

Initial text content of the editor. Optional.
   
### contentId

Current content id, for example, file name. Change of content Id initiates redraw. May be omitted.

### modified

Value for modified flag. Upper level component may track changes and set this flag accordingly. When `modified=true`, save button is highlighted. 
Default = false.

### indicateChanges

Reserved for planned feature.

### previewClass

Optional. Class name for preview panel. Default: markdownPreviewArea

### fullscreen

If true, starts in fullscreen. Default = false.

### onEnterFullscreen

Function to execute on enter full screen. Default: `()=>document.body.style.overflow="hidden"`

### onExitFullscreen

Function to execute on exit full screen. Default: `()=>document.body.style.overflow="initial"`

### trueFullscreen

If `true`, requests fullscreen mode when entering fullscreen, else just fills entire window. Default=`false`

### showPreview

If true, starts with visible preview panel. Default = true.

### spellCheck

If false, starts with spellcheck disabled. Default = true.

### fullscreenZIndex

Z-index, when in fullscreen. Default = 1001.

### externalPreview

External preview function. If defined, will overwrite function of `full width preview` button. Optional. 

### externalPreviewTitle

Hint text for external preview button.

### imageRewriter

Function, which will be applied to all images in preview panel. This function will receive `src` attribute and must return string (rewritten src). Useful, when you have to rewrite paths for preview.

### menuItems

Optional array of items for drop-down menu. If not present, menu is not shown.

```javascript
items=[
   { "label" : "Label for menu item" , 
	 "handler" : ()=>console.log("click") },
   ...
]

```

### menuTitle

Title for menu button. Default = "Additional functions"

### maxHeight

CSS value for maximum editor height. Default = "400px"