BareMDE props
=============

render
------
Function, which gets markdown text as a parameter and returns rendered HTML. Required.

onUpdate
------

Function, which called on each update of edited text.
   
save
----

Save function. Receives markdown text as a parameter.

content
-------

Initial text content of the editor.
   
contentId
----------

Current content id, for example, file name. Change of content Id initiates redraw. May be omitted.

modified
----------

Initial value for modified flag. Default = false.

indicateChanges
---------------

Indicate changes in menu or not. Default = true.

previewClass
--------------

Optional. Class name for preview panel. Default: markdownPreviewArea

fullScreen
----------

If true, starts in fullscreen. Default = false.

showPreview
-------------

If true, starts with visible preview panel. Default = true.

spellCheck
----------

If false, starts with spellcheck disabled. Default = true.

fullscreenZIndex
----------------

Z-index, when in fullscreen. Default = 1001.

externalPreview
---------------

External preview function. Optional. 

externalPreviewTitle
--------------------

Hint text for external preview button.

imageRewriter
-------------

Function, which will be applied to all images in preview panel. Useful, when you have to rewrite paths for preview.

