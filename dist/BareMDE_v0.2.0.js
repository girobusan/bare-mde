(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("preact"));
	else if(typeof define === 'function' && define.amd)
		define(["preact"], factory);
	else if(typeof exports === 'object')
		exports["BareMDE"] = factory(require("preact"));
	else
		root["BareMDE"] = factory(root["preact"]);
})(self, (__WEBPACK_EXTERNAL_MODULE_preact__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/codejar/codejar.js":
/*!*****************************************!*\
  !*** ./node_modules/codejar/codejar.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CodeJar: () => (/* binding */ CodeJar)
/* harmony export */ });
const globalWindow = window;
function CodeJar(editor, highlight, opt = {}) {
    const options = Object.assign({ tab: '\t', indentOn: /[({\[]$/, moveToNewLine: /^[)}\]]/, spellcheck: false, catchTab: true, preserveIdent: true, addClosing: true, history: true, window: globalWindow }, opt);
    const window = options.window;
    const document = window.document;
    let listeners = [];
    let history = [];
    let at = -1;
    let focus = false;
    let callback;
    let prev; // code content prior keydown event
    editor.setAttribute('contenteditable', 'plaintext-only');
    editor.setAttribute('spellcheck', options.spellcheck ? 'true' : 'false');
    editor.style.outline = 'none';
    editor.style.overflowWrap = 'break-word';
    editor.style.overflowY = 'auto';
    editor.style.whiteSpace = 'pre-wrap';
    let isLegacy = false; // true if plaintext-only is not supported
    highlight(editor);
    if (editor.contentEditable !== 'plaintext-only')
        isLegacy = true;
    if (isLegacy)
        editor.setAttribute('contenteditable', 'true');
    const debounceHighlight = debounce(() => {
        const pos = save();
        highlight(editor, pos);
        restore(pos);
    }, 30);
    let recording = false;
    const shouldRecord = (event) => {
        return !isUndo(event) && !isRedo(event)
            && event.key !== 'Meta'
            && event.key !== 'Control'
            && event.key !== 'Alt'
            && !event.key.startsWith('Arrow');
    };
    const debounceRecordHistory = debounce((event) => {
        if (shouldRecord(event)) {
            recordHistory();
            recording = false;
        }
    }, 300);
    const on = (type, fn) => {
        listeners.push([type, fn]);
        editor.addEventListener(type, fn);
    };
    on('keydown', event => {
        if (event.defaultPrevented)
            return;
        prev = toString();
        if (options.preserveIdent)
            handleNewLine(event);
        else
            legacyNewLineFix(event);
        if (options.catchTab)
            handleTabCharacters(event);
        if (options.addClosing)
            handleSelfClosingCharacters(event);
        if (options.history) {
            handleUndoRedo(event);
            if (shouldRecord(event) && !recording) {
                recordHistory();
                recording = true;
            }
        }
        if (isLegacy && !isCopy(event))
            restore(save());
    });
    on('keyup', event => {
        if (event.defaultPrevented)
            return;
        if (event.isComposing)
            return;
        if (prev !== toString())
            debounceHighlight();
        debounceRecordHistory(event);
        if (callback)
            callback(toString());
    });
    on('focus', _event => {
        focus = true;
    });
    on('blur', _event => {
        focus = false;
    });
    on('paste', event => {
        recordHistory();
        handlePaste(event);
        recordHistory();
        if (callback)
            callback(toString());
    });
    function save() {
        const s = getSelection();
        const pos = { start: 0, end: 0, dir: undefined };
        let { anchorNode, anchorOffset, focusNode, focusOffset } = s;
        if (!anchorNode || !focusNode)
            throw 'error1';
        // If the anchor and focus are the editor element, return either a full
        // highlight or a start/end cursor position depending on the selection
        if (anchorNode === editor && focusNode === editor) {
            pos.start = (anchorOffset > 0 && editor.textContent) ? editor.textContent.length : 0;
            pos.end = (focusOffset > 0 && editor.textContent) ? editor.textContent.length : 0;
            pos.dir = (focusOffset >= anchorOffset) ? '->' : '<-';
            return pos;
        }
        // Selection anchor and focus are expected to be text nodes,
        // so normalize them.
        if (anchorNode.nodeType === Node.ELEMENT_NODE) {
            const node = document.createTextNode('');
            anchorNode.insertBefore(node, anchorNode.childNodes[anchorOffset]);
            anchorNode = node;
            anchorOffset = 0;
        }
        if (focusNode.nodeType === Node.ELEMENT_NODE) {
            const node = document.createTextNode('');
            focusNode.insertBefore(node, focusNode.childNodes[focusOffset]);
            focusNode = node;
            focusOffset = 0;
        }
        visit(editor, el => {
            if (el === anchorNode && el === focusNode) {
                pos.start += anchorOffset;
                pos.end += focusOffset;
                pos.dir = anchorOffset <= focusOffset ? '->' : '<-';
                return 'stop';
            }
            if (el === anchorNode) {
                pos.start += anchorOffset;
                if (!pos.dir) {
                    pos.dir = '->';
                }
                else {
                    return 'stop';
                }
            }
            else if (el === focusNode) {
                pos.end += focusOffset;
                if (!pos.dir) {
                    pos.dir = '<-';
                }
                else {
                    return 'stop';
                }
            }
            if (el.nodeType === Node.TEXT_NODE) {
                if (pos.dir != '->')
                    pos.start += el.nodeValue.length;
                if (pos.dir != '<-')
                    pos.end += el.nodeValue.length;
            }
        });
        // collapse empty text nodes
        editor.normalize();
        return pos;
    }
    function restore(pos) {
        const s = getSelection();
        let startNode, startOffset = 0;
        let endNode, endOffset = 0;
        if (!pos.dir)
            pos.dir = '->';
        if (pos.start < 0)
            pos.start = 0;
        if (pos.end < 0)
            pos.end = 0;
        // Flip start and end if the direction reversed
        if (pos.dir == '<-') {
            const { start, end } = pos;
            pos.start = end;
            pos.end = start;
        }
        let current = 0;
        visit(editor, el => {
            if (el.nodeType !== Node.TEXT_NODE)
                return;
            const len = (el.nodeValue || '').length;
            if (current + len > pos.start) {
                if (!startNode) {
                    startNode = el;
                    startOffset = pos.start - current;
                }
                if (current + len > pos.end) {
                    endNode = el;
                    endOffset = pos.end - current;
                    return 'stop';
                }
            }
            current += len;
        });
        if (!startNode)
            startNode = editor, startOffset = editor.childNodes.length;
        if (!endNode)
            endNode = editor, endOffset = editor.childNodes.length;
        // Flip back the selection
        if (pos.dir == '<-') {
            [startNode, startOffset, endNode, endOffset] = [endNode, endOffset, startNode, startOffset];
        }
        s.setBaseAndExtent(startNode, startOffset, endNode, endOffset);
    }
    function beforeCursor() {
        const s = getSelection();
        const r0 = s.getRangeAt(0);
        const r = document.createRange();
        r.selectNodeContents(editor);
        r.setEnd(r0.startContainer, r0.startOffset);
        return r.toString();
    }
    function afterCursor() {
        const s = getSelection();
        const r0 = s.getRangeAt(0);
        const r = document.createRange();
        r.selectNodeContents(editor);
        r.setStart(r0.endContainer, r0.endOffset);
        return r.toString();
    }
    function handleNewLine(event) {
        if (event.key === 'Enter') {
            const before = beforeCursor();
            const after = afterCursor();
            let [padding] = findPadding(before);
            let newLinePadding = padding;
            // If last symbol is "{" ident new line
            if (options.indentOn.test(before)) {
                newLinePadding += options.tab;
            }
            // Preserve padding
            if (newLinePadding.length > 0) {
                preventDefault(event);
                event.stopPropagation();
                insert('\n' + newLinePadding);
            }
            else {
                legacyNewLineFix(event);
            }
            // Place adjacent "}" on next line
            if (newLinePadding !== padding && options.moveToNewLine.test(after)) {
                const pos = save();
                insert('\n' + padding);
                restore(pos);
            }
        }
    }
    function legacyNewLineFix(event) {
        // Firefox does not support plaintext-only mode
        // and puts <div><br></div> on Enter. Let's help.
        if (isLegacy && event.key === 'Enter') {
            preventDefault(event);
            event.stopPropagation();
            if (afterCursor() == '') {
                insert('\n ');
                const pos = save();
                pos.start = --pos.end;
                restore(pos);
            }
            else {
                insert('\n');
            }
        }
    }
    function handleSelfClosingCharacters(event) {
        const open = `([{'"`;
        const close = `)]}'"`;
        const codeAfter = afterCursor();
        const codeBefore = beforeCursor();
        const escapeCharacter = codeBefore.substr(codeBefore.length - 1) === '\\';
        const charAfter = codeAfter.substr(0, 1);
        if (close.includes(event.key) && !escapeCharacter && charAfter === event.key) {
            // We already have closing char next to cursor.
            // Move one char to right.
            const pos = save();
            preventDefault(event);
            pos.start = ++pos.end;
            restore(pos);
        }
        else if (open.includes(event.key)
            && !escapeCharacter
            && (`"'`.includes(event.key) || ['', ' ', '\n'].includes(charAfter))) {
            preventDefault(event);
            const pos = save();
            const wrapText = pos.start == pos.end ? '' : getSelection().toString();
            const text = event.key + wrapText + close[open.indexOf(event.key)];
            insert(text);
            pos.start++;
            pos.end++;
            restore(pos);
        }
    }
    function handleTabCharacters(event) {
        if (event.key === 'Tab') {
            preventDefault(event);
            if (event.shiftKey) {
                const before = beforeCursor();
                let [padding, start,] = findPadding(before);
                if (padding.length > 0) {
                    const pos = save();
                    // Remove full length tab or just remaining padding
                    const len = Math.min(options.tab.length, padding.length);
                    restore({ start, end: start + len });
                    document.execCommand('delete');
                    pos.start -= len;
                    pos.end -= len;
                    restore(pos);
                }
            }
            else {
                insert(options.tab);
            }
        }
    }
    function handleUndoRedo(event) {
        if (isUndo(event)) {
            preventDefault(event);
            at--;
            const record = history[at];
            if (record) {
                editor.innerHTML = record.html;
                restore(record.pos);
            }
            if (at < 0)
                at = 0;
        }
        if (isRedo(event)) {
            preventDefault(event);
            at++;
            const record = history[at];
            if (record) {
                editor.innerHTML = record.html;
                restore(record.pos);
            }
            if (at >= history.length)
                at--;
        }
    }
    function recordHistory() {
        if (!focus)
            return;
        const html = editor.innerHTML;
        const pos = save();
        const lastRecord = history[at];
        if (lastRecord) {
            if (lastRecord.html === html
                && lastRecord.pos.start === pos.start
                && lastRecord.pos.end === pos.end)
                return;
        }
        at++;
        history[at] = { html, pos };
        history.splice(at + 1);
        const maxHistory = 300;
        if (at > maxHistory) {
            at = maxHistory;
            history.splice(0, 1);
        }
    }
    function handlePaste(event) {
        preventDefault(event);
        const text = (event.originalEvent || event)
            .clipboardData
            .getData('text/plain')
            .replace(/\r/g, '');
        const pos = save();
        insert(text);
        highlight(editor);
        restore({
            start: Math.min(pos.start, pos.end) + text.length,
            end: Math.min(pos.start, pos.end) + text.length,
            dir: '<-',
        });
    }
    function visit(editor, visitor) {
        const queue = [];
        if (editor.firstChild)
            queue.push(editor.firstChild);
        let el = queue.pop();
        while (el) {
            if (visitor(el) === 'stop')
                break;
            if (el.nextSibling)
                queue.push(el.nextSibling);
            if (el.firstChild)
                queue.push(el.firstChild);
            el = queue.pop();
        }
    }
    function isCtrl(event) {
        return event.metaKey || event.ctrlKey;
    }
    function isUndo(event) {
        return isCtrl(event) && !event.shiftKey && getKeyCode(event) === 'Z';
    }
    function isRedo(event) {
        return isCtrl(event) && event.shiftKey && getKeyCode(event) === 'Z';
    }
    function isCopy(event) {
        return isCtrl(event) && getKeyCode(event) === 'C';
    }
    function getKeyCode(event) {
        let key = event.key || event.keyCode || event.which;
        if (!key)
            return undefined;
        return (typeof key === 'string' ? key : String.fromCharCode(key)).toUpperCase();
    }
    function insert(text) {
        text = text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
        document.execCommand('insertHTML', false, text);
    }
    function debounce(cb, wait) {
        let timeout = 0;
        return (...args) => {
            clearTimeout(timeout);
            timeout = window.setTimeout(() => cb(...args), wait);
        };
    }
    function findPadding(text) {
        // Find beginning of previous line.
        let i = text.length - 1;
        while (i >= 0 && text[i] !== '\n')
            i--;
        i++;
        // Find padding of the line.
        let j = i;
        while (j < text.length && /[ \t]/.test(text[j]))
            j++;
        return [text.substring(i, j) || '', i, j];
    }
    function toString() {
        return editor.textContent || '';
    }
    function preventDefault(event) {
        event.preventDefault();
    }
    function getSelection() {
        var _a;
        if (((_a = editor.parentNode) === null || _a === void 0 ? void 0 : _a.nodeType) == Node.DOCUMENT_FRAGMENT_NODE) {
            return editor.parentNode.getSelection();
        }
        return window.getSelection();
    }
    return {
        updateOptions(newOptions) {
            Object.assign(options, newOptions);
        },
        updateCode(code) {
            editor.textContent = code;
            highlight(editor);
        },
        onUpdate(cb) {
            callback = cb;
        },
        toString,
        save,
        restore,
        recordHistory,
        destroy() {
            for (let [type, fn] of listeners) {
                editor.removeEventListener(type, fn);
            }
        },
    };
}


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/components/BareMDE/mded.scss":
/*!***********************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/components/BareMDE/mded.scss ***!
  \***********************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./icons/menu_FILL0_wght400_GRAD0_opsz24.svg */ "./src/components/BareMDE/icons/menu_FILL0_wght400_GRAD0_opsz24.svg"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.BareMDE {
  display: flex;
  justify-items: stretch;
  box-sizing: border-box;
  flex-direction: column;
  box-sizing: border-box;
  border: none;
  border-radius: 0px;
  margin: 0;
  max-height: 100%;
  max-width: 100%;
  padding: 0;
}
.BareMDE.fullscreen {
  position: fixed;
  max-width: 100%;
  max-height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 0;
  border: none;
  z-index: 1000;
}
.BareMDE * {
  box-sizing: border-box;
}
.BareMDE .toolbar {
  all: unset;
  position: relative;
  margin: 0;
  height: 44px;
  box-sizing: border-box;
  border-radius: 0;
  background-color: #444;
  color: white;
  padding: 6px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
  flex-grow: 0;
}
.BareMDE .toolbar .EditorMenu {
  position: absolute;
  left: 6px;
  width: 32px;
  height: 32px;
  text-align: left;
  margin: 0;
}
.BareMDE .toolbar .EditorMenu button {
  display: block;
  border: none;
  width: 32px;
  height: 32px;
  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_0___});
}
.BareMDE .toolbar .EditorMenu .menuItems {
  min-width: 250px;
  position: absolute;
  background-color: #bdbdbd;
  padding: 0;
  margin: 0;
  line-height: 100%;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.8);
}
.BareMDE .toolbar .EditorMenu .menuItems .Item {
  font-family: sans-serif;
  padding: 6px 12px;
  margin: 0;
  line-height: 100%;
  user-select: none;
  cursor: pointer;
  border-bottom: 1px solid #aaa;
  color: #333;
}
.BareMDE .toolbar .EditorMenu .menuItems .Item:first-child {
  padding-top: 8px;
}
.BareMDE .toolbar .EditorMenu .menuItems .Item:last-child {
  border-bottom: none;
  padding-bottom: 8px;
}
.BareMDE .toolbar .EditorMenu .menuItems .Item:hover {
  background-color: gray;
  color: white;
}
.BareMDE .toolbar.modified .TButton.alerted {
  background-color: orangered;
  border: none;
}
.BareMDE .toolbar.modified .TButton.alerted:hover {
  border-color: orangered;
}
.BareMDE .toolbar .divider {
  width: 2px;
  flex-grow: 0;
  margin: 0;
  padding: 0;
  margin-right: 8px;
  margin-left: 2px;
  background-image: linear-gradient(0deg, gray, gray 2px, transparent 2px, transparent 5px);
  background-size: 2px 5px;
  background-repeat: repeat;
}
.BareMDE .toolbar button {
  all: unset;
  box-sizing: border-box;
  transition: background-color 0.5s;
  appearance: none;
  border: 1px solid transparent;
  border-radius: 6px;
  width: 32px;
  height: 32px;
  display: inline-block;
  cursor: pointer;
  margin-right: 6px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 24px 24px;
}
.BareMDE .toolbar button svg {
  display: block;
  pointer-events: none;
}
.BareMDE .toolbar button.formatting {
  background-color: black;
  border-color: black;
}
.BareMDE .toolbar button.formatting svg {
  opacity: 0.9;
}
.BareMDE .toolbar button:hover {
  border-color: rgba(255, 255, 255, 0.6);
}
.BareMDE .toolbar button.on {
  border-color: rgba(255, 255, 255, 0.3);
}
.BareMDE .toolbar button:last-child {
  margin-right: 0;
}
.BareMDE .workArea {
  all: unset;
  box-sizing: border-box;
  width: 100%;
  flex-grow: 1;
  flex-shrink: 1;
  display: flex;
  align-content: stretch;
  flex-direction: row;
  background-color: #cccccc;
  min-height: 200px;
  margin: 0;
  padding: 0;
}
.BareMDE .workArea .codeJar, .BareMDE .workArea .preview {
  display: block;
  flex-grow: 1;
  flex-shrink: 1;
  box-sizing: border-box;
  max-width: 100%;
  margin: 0;
  scrollbar-width: thin;
  scrollbar-color: #444 #dddddd;
}
.BareMDE .workArea .codeJar::-webkit-scrollbar, .BareMDE .workArea .preview::-webkit-scrollbar {
  width: 4px;
}
.BareMDE .workArea .codeJar::-webkit-scrollbar-track, .BareMDE .workArea .preview::-webkit-scrollbar-track {
  background: #dddddd;
}
.BareMDE .workArea .codeJar::-webkit-scrollbar-thumb, .BareMDE .workArea .preview::-webkit-scrollbar-thumb {
  background-color: #444;
  border-radius: 4px;
  -webkit-border-radius: 4px;
  overflow: hidden;
}
.BareMDE .workArea .codeJar {
  border-bottom-left-radius: 0;
  font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", ui-monospace, monospace;
  font-size: 18px;
  line-height: 150%;
  color: #333;
  flex-grow: 1;
  padding: 8px;
  background-color: #e4e3e2;
  overflow: auto;
  flex-basis: 0;
}
.BareMDE .workArea .preview {
  border-radius: 0;
  flex-grow: 1;
  padding: 0;
  margin: 0;
  width: 50%;
  border-left: 1px solid #ddd;
  overflow: auto;
  flex-basis: 0;
}
.BareMDE .workArea .preview iframe {
  all: unset;
  width: 100%;
  display: block;
  border: none;
  margin: 0;
  box-sizing: border-box;
}
.BareMDE.noPreview .preview {
  display: none;
  position: relative;
}
.BareMDE.fullPreview .codeJar {
  display: none;
}
.BareMDE.fullPreview .workArea .preview {
  display: block !important;
  width: 100%;
  max-width: 100%;
}
.BareMDE.fullPreview .workArea .preview iframe {
  width: 100%;
}

.codeJar .token.hr {
  letter-spacing: 0.5em;
}
.codeJar .token.important {
  font-weight: bold;
  color: darkred;
}
.codeJar .token.title {
  line-height: 1em;
  font-size: 1.2em;
}
.codeJar .token.strike .content {
  text-decoration: line-through;
}
.codeJar .token.code-language {
  opacity: 0.5;
}
.codeJar .token.code-block {
  color: #1990b8;
}`, "",{"version":3,"sources":["webpack://./src/components/BareMDE/mded.scss"],"names":[],"mappings":"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","sourcesContent":[".BareMDE{\n  // all: initial;\n  display: flex;\n  justify-items: stretch;\n  box-sizing: border-box;\n  flex-direction: column;\n  box-sizing: border-box;\n  border: none; //1px solid #666;\n  border-radius: 0px;\n  margin:0;\n  max-height: 100%;\n  max-width: 100%;\n  // overflow: hidden;\n  // max-height: 100%;\n  // position: absolute;\n  padding: 0;\n  // background-color: #ccc;\n  &.fullscreen{\n    position: fixed;\n    max-width: 100%;\n    max-height: 100%;\n    top: 0;\n    left: 0;\n    right:0;\n    bottom:0;\n    border-radius: 0;\n    border: none;\n    z-index: 1000;\n  }\n  *{\n    box-sizing: border-box;\n  }\n  .toolbar{\n    all: unset;\n    position: relative;\n    margin: 0;\n    height: 44px;\n    box-sizing: border-box;\n    // margin: -1px -1px 0 -1px;\n    border-radius: 0;\n    background-color: #444  ;\n    color: white;\n    padding: 6px;\n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n    text-align: center;\n    flex-grow: 0;\n    .EditorMenu{\n      position: absolute;\n      left: 6px;\n      width: 32px;\n      height: 32px;\n      text-align: left;\n      margin: 0;\n      button{\n        display:block;\n        border: none;\n        width: 32px;\n        height: 32px;\n        background-image: url(\"./icons/menu_FILL0_wght400_GRAD0_opsz24.svg\");\n      }\n      .menuItems{\n        min-width: 250px;\n        position: absolute;\n        background-color: #bdbdbd;\n        padding: 0;\n        margin:0;\n        line-height: 100%;\n        border-radius: 4px;\n        overflow: hidden;\n        box-shadow: 0px 0px 24px rgba( 0 , 0 , 0 , 0.8 );\n        .Item{\n          font-family: sans-serif;\n          padding: 6px 12px;\n          margin:0;\n          line-height: 100%;\n          user-select: none;\n          cursor: pointer;\n          border-bottom: 1px solid #aaa;\n          color: #333;\n          &:first-child{\n            padding-top: 8px; \n          }\n          &:last-child{\n            border-bottom: none;\n            padding-bottom: 8px;\n          }\n          &:hover{\n            background-color: gray;\n            color: white;\n          }\n        }\n      }\n\n\n    }\n    &.modified .TButton.alerted{\n      background-color: orangered;\n      border: none;\n      &:hover{\n        border-color: orangered;\n      }\n    }\n\n    .divider{\n      width: 2px;\n      flex-grow: 0;\n      margin: 0;\n      padding:0;\n      margin-right: 8px;\n      margin-left: 2px;\n      background-image: linear-gradient( 0deg , gray, gray 2px, transparent 2px, transparent 5px );\n      background-size: 2px 5px;\n      background-repeat: repeat;\n    }\n\n    button{\n      all:unset;\n      box-sizing: border-box;\n      // display: block;\n      transition: background-color .5s;\n      appearance: none;\n      border: 1px solid transparent;\n      border-radius: 6px;\n      width: 32px;\n      height: 32px;\n      display: inline-block;\n      cursor: pointer;\n      margin-right: 6px;\n      background-repeat: no-repeat;\n      background-position: center center;\n      background-size: 24px 24px;\n      svg{\n        display: block;\n        pointer-events: none;\n      }\n      &.formatting{\n        background-color: black;\n        border-color: black;\n        svg{\n          opacity: 0.9;\n        }\n      }\n      &:hover{\n        border-color: rgba(255,255,255,0.6);\n      }\n      &.on{\n        border-color: rgba(255,255,255,0.3);\n      }\n      &:last-child{\n        margin-right: 0;\n      }\n    }\n  }\n  .workArea{\n    all: unset;\n    box-sizing: border-box;\n    width:100%;\n    flex-grow: 1;\n    flex-shrink: 1;\n    display: flex;\n    // justify-content: stretch;\n    align-content: stretch;\n    flex-direction: row;\n    background-color: #cccccc; //in memory of beloved Netscape Navigator\n    min-height: 200px;\n    margin: 0;\n    padding:0;\n    // max-height: 100%;\n    .codeJar , .preview{\n      // all: unset;\n      display:block;\n      flex-grow: 1;\n      flex-shrink:1;\n      box-sizing: border-box;\n      max-width: 100%;\n      margin: 0;\n      scrollbar-width: thin;\n      scrollbar-color: #444 #dddddd;\n      &::-webkit-scrollbar{\n        width: 4px;\n      }\n      &::-webkit-scrollbar-track{\n        background: #dddddd;\n      }\n      &::-webkit-scrollbar-thumb {\n        background-color: #444;\n        border-radius: 4px;\n        -webkit-border-radius: 4px;\n        overflow: hidden;\n      }\n    }\n\n    .codeJar{\n      border-bottom-left-radius: 0;\n      font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', ui-monospace , monospace;\n\n      // ::spelling-error{\n      //   background-color: yellow;\n      // }\n      font-size: 18px;\n      line-height: 150%;\n      color: #333;\n      flex-grow: 1;\n      padding: 8px;\n      background-color: #e4e3e2;\n      overflow: auto;\n      flex-basis:0;\n\n    }\n    .preview{\n      border-radius: 0;\n      flex-grow: 1;\n      padding: 0;\n      margin:0;\n      width: 50%;\n      border-left: 1px solid #ddd;\n      overflow: auto;\n      flex-basis: 0;\n\n      iframe{\n        all:unset;\n        width:100%;\n        display: block;\n        border: none;\n        margin:0;\n        box-sizing: border-box;\n      }\n    }\n  }\n  &.noPreview{\n    .preview{\n      display: none;\n      position: relative;\n    }\n  }\n  &.fullPreview{\n    .codeJar{\n      display: none;\n    }\n    .workArea .preview{\n      display: block !important;\n      width: 100%;\n      max-width: 100%;\n      iframe{\n        width: 100%;\n      }\n    }\n  }\n}\n\n//some additions\n\n.codeJar{\n  .token{\n    &.hr{\n      letter-spacing: .5em; \n    }\n    &.important{\n      font-weight: bold;\n      color: darkred;\n    }\n    &.title{\n      line-height: 1em;\n      font-size: 1.2em;\n    }\n    &.strike{\n      .content{\n        text-decoration: line-through;\n      }\n    }\n    &.code-language{\n      opacity: 0.5;\n    }\n    &.code-block{\n      color: #1990b8;\n    }\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/components/BareMDE/prism/prism_fixed.scss":
/*!************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/components/BareMDE/prism/prism_fixed.scss ***!
  \************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* PrismJS 1.29.0
https://prismjs.com/download.html#themes=prism-coy&languages=markup+css+clike+javascript */
/**
 * prism.js Coy theme for JavaScript, CoffeeScript, CSS and HTML
 * Based on https://github.com/tshedor/workshop-wp-theme (Example: http://workshop.kansan.com/category/sessions/basics or http://workshop.timshedor.com/category/sessions/basics);
 * @author Tim  Shedor
 */
/* code[class*="language-"], */
/* pre[class*="language-"] { */
/* 	color: black; */
/* 	background: none; */
/* 	font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace; */
/* 	font-size: 1em; */
/* 	text-align: left; */
/* 	white-space: pre; */
/* 	word-spacing: normal; */
/* 	word-break: normal; */
/* 	word-wrap: normal; */
/* 	line-height: 1.5; */
/* 	-moz-tab-size: 4; */
/* 	-o-tab-size: 4; */
/* 	tab-size: 4; */
/* 	-webkit-hyphens: none; */
/* 	-moz-hyphens: none; */
/* 	-ms-hyphens: none; */
/* 	hyphens: none; */
/* } */
/*/1* Code blocks *1/ */
/*/1* */
/*pre[class*="language-"] { */
/*	position: relative; */
/*	margin: .5em 0; */
/*	overflow: visible; */
/*	padding: 1px; */
/*} */
/*pre[class*="language-"] > code { */
/*	position: relative; */
/*	z-index: 1; */
/*	border-left: 10px solid #358ccb; */
/*	box-shadow: -1px 0px 0px 0px #358ccb, 0px 0px 0px 1px #dfdfdf; */
/*	background-color: #fdfdfd; */
/*	background-image: linear-gradient(transparent 50%, rgba(69, 142, 209, 0.04) 50%); */
/*	background-size: 3em 3em; */
/*	background-origin: content-box; */
/*	background-attachment: local; */
/*} */
/*code[class*="language-"] { */
/*	max-height: inherit; */
/*	height: inherit; */
/*	padding: 0 1em; */
/*	display: block; */
/*	overflow: auto; */
/*} */
/*// Margin bottom to accommodate shadow */
/*:not(pre) > code[class*="language-"], */
/*pre[class*="language-"] { */
/*	background-color: #fdfdfd; */
/*	-webkit-box-sizing: border-box; */
/*	-moz-box-sizing: border-box; */
/*	box-sizing: border-box; */
/*	margin-bottom: 1em; */
/*} */
/*// Inline code */
/*:not(pre) > code[class*="language-"] { */
/*	position: relative; */
/*	padding: .2em; */
/*	border-radius: 0.3em; */
/*	color: #c92c2c; */
/*	border: 1px solid rgba(0, 0, 0, 0.1); */
/*	display: inline; */
/*	white-space: normal; */
/*} */
/*pre[class*="language-"]:before, */
/*pre[class*="language-"]:after { */
/*	content: ''; */
/*	display: block; */
/*	position: absolute; */
/*	bottom: 0.75em; */
/*	left: 0.18em; */
/*	width: 40%; */
/*	height: 20%; */
/*	max-height: 13em; */
/*	box-shadow: 0px 13px 8px #979797; */
/*	-webkit-transform: rotate(-2deg); */
/*	-moz-transform: rotate(-2deg); */
/*	-ms-transform: rotate(-2deg); */
/*	-o-transform: rotate(-2deg); */
/*	transform: rotate(-2deg); */
/*} */
/*pre[class*="language-"]:after { */
/*	right: 0.75em; */
/*	left: auto; */
/*	-webkit-transform: rotate(2deg); */
/*	-moz-transform: rotate(2deg); */
/*	-ms-transform: rotate(2deg); */
/*	-o-transform: rotate(2deg); */
/*	transform: rotate(2deg); */
/*} */
.token.comment,
.token.block-comment,
.token.prolog,
.token.doctype,
.token.cdata {
  color: #7D8B99;
}

.token.punctuation {
  color: #5F6364;
}

.token.property,
.token.tag,
.token.boolean,
.token.number,
.token.function-name,
.token.constant,
.token.symbol,
.token.deleted {
  color: #c92c2c;
}

.token.selector,
.token.attr-name,
.token.string,
.token.char,
.token.function,
.token.builtin,
.token.inserted {
  color: #2f9c0a;
}

.token.operator,
.token.entity,
.token.url,
.token.variable {
  color: #a67f59;
  background: rgba(255, 255, 255, 0.5);
}

.token.url .content {
  color: darkblue;
  text-decoration: underline;
}

.token.atrule,
.token.attr-value,
.token.keyword,
.token.class-name {
  color: #1990b8;
}

.token.regex,
.token.important {
  color: darkred;
}

.language-css .token.string,
.style .token.string {
  color: #a67f59;
  background: rgba(255, 255, 255, 0.5);
}

.token.important {
  font-weight: normal;
}

.token.bold {
  font-weight: bold;
}

.token.italic {
  font-style: italic;
}

.token.entity {
  cursor: help;
}

.token.namespace {
  opacity: 0.7;
}

@media screen and (max-width: 767px) {
  pre[class*=language-]:before,
  pre[class*=language-]:after {
    bottom: 14px;
    box-shadow: none;
  }
}
/* Plugin styles: Line Numbers */
pre[class*=language-].line-numbers.line-numbers {
  padding-left: 0;
}

pre[class*=language-].line-numbers.line-numbers code {
  padding-left: 3.8em;
}

pre[class*=language-].line-numbers.line-numbers .line-numbers-rows {
  left: 0;
}

/* Plugin styles: Line Highlight */
pre[class*=language-][data-line] {
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 0;
}

pre[data-line] code {
  position: relative;
  padding-left: 4em;
}

pre .line-highlight {
  margin-top: 0;
}`, "",{"version":3,"sources":["webpack://./src/components/BareMDE/prism/prism_fixed.scss"],"names":[],"mappings":"AAAA;0FAAA;AAEA;;;;EAAA;AAMA,8BAAA;AACA,8BAAA;AACA,mBAAA;AACA,uBAAA;AACA,6EAAA;AACA,qBAAA;AACA,uBAAA;AACA,uBAAA;AACA,2BAAA;AACA,yBAAA;AACA,wBAAA;AACA,uBAAA;AAEA,uBAAA;AACA,qBAAA;AACA,kBAAA;AAEA,4BAAA;AACA,yBAAA;AACA,wBAAA;AACA,oBAAA;AACA,MAAA;AAEA,uBAAA;AACA,OAAA;AACA,6BAAA;AACA,wBAAA;AACA,oBAAA;AACA,uBAAA;AACA,kBAAA;AACA,KAAA;AAEA,oCAAA;AACA,wBAAA;AACA,gBAAA;AACA,qCAAA;AACA,mEAAA;AACA,+BAAA;AACA,sFAAA;AACA,8BAAA;AACA,oCAAA;AACA,kCAAA;AACA,KAAA;AAEA,8BAAA;AACA,yBAAA;AACA,qBAAA;AACA,oBAAA;AACA,oBAAA;AACA,oBAAA;AACA,KAAA;AAEA,0CAAA;AACA,yCAAA;AACA,6BAAA;AACA,+BAAA;AACA,oCAAA;AACA,iCAAA;AACA,4BAAA;AACA,wBAAA;AACA,KAAA;AAEA,kBAAA;AACA,0CAAA;AACA,wBAAA;AACA,mBAAA;AACA,0BAAA;AACA,oBAAA;AACA,0CAAA;AACA,qBAAA;AACA,yBAAA;AACA,KAAA;AAEA,mCAAA;AACA,mCAAA;AACA,iBAAA;AACA,oBAAA;AACA,wBAAA;AACA,oBAAA;AACA,kBAAA;AACA,gBAAA;AACA,iBAAA;AACA,sBAAA;AACA,sCAAA;AACA,sCAAA;AACA,mCAAA;AACA,kCAAA;AACA,iCAAA;AACA,8BAAA;AACA,KAAA;AAEA,mCAAA;AACA,mBAAA;AACA,gBAAA;AACA,qCAAA;AACA,kCAAA;AACA,iCAAA;AACA,gCAAA;AACA,6BAAA;AACA,KAAA;AAGA;;;;;EAKC,cAAA;AAXD;;AAcA;EACC,cAAA;AAXD;;AAcA;;;;;;;;EAQC,cAAA;AAXD;;AAcA;;;;;;;EAOC,cAAA;AAXD;;AAcA;;;;EAIA,cAAA;EACC,oCAAA;AAXD;;AAaA;EACE,eAAA;EACA,0BAAA;AAVF;;AAaA;;;;EAIC,cAAA;AAVD;;AAeA;;EAEA,cAAA;AAZA;;AAeA;;EAEC,cAAA;EACA,oCAAA;AAZD;;AAeA;EACC,mBAAA;AAZD;;AAeA;EACC,iBAAA;AAZD;;AAcA;EACC,kBAAA;AAXD;;AAcA;EACC,YAAA;AAXD;;AAcA;EACC,YAAA;AAXD;;AAcA;EACC;;IAEC,YAAA;IACA,gBAAA;EAXA;AACF;AAeA,gCAAA;AACA;EACC,eAAA;AAbD;;AAgBA;EACC,mBAAA;AAbD;;AAgBA;EACC,OAAA;AAbD;;AAgBA,kCAAA;AACA;EACC,cAAA;EACA,iBAAA;EACA,eAAA;AAbD;;AAeA;EACC,kBAAA;EACA,iBAAA;AAZD;;AAcA;EACC,aAAA;AAXD","sourcesContent":["/* PrismJS 1.29.0\nhttps://prismjs.com/download.html#themes=prism-coy&languages=markup+css+clike+javascript */\n/**\n * prism.js Coy theme for JavaScript, CoffeeScript, CSS and HTML\n * Based on https://github.com/tshedor/workshop-wp-theme (Example: http://workshop.kansan.com/category/sessions/basics or http://workshop.timshedor.com/category/sessions/basics);\n * @author Tim  Shedor\n */\n\n/* code[class*=\"language-\"], */\n/* pre[class*=\"language-\"] { */\n/* \tcolor: black; */\n/* \tbackground: none; */\n/* \tfont-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace; */\n/* \tfont-size: 1em; */\n/* \ttext-align: left; */\n/* \twhite-space: pre; */\n/* \tword-spacing: normal; */\n/* \tword-break: normal; */\n/* \tword-wrap: normal; */\n/* \tline-height: 1.5; */\n\n/* \t-moz-tab-size: 4; */\n/* \t-o-tab-size: 4; */\n/* \ttab-size: 4; */\n\n/* \t-webkit-hyphens: none; */\n/* \t-moz-hyphens: none; */\n/* \t-ms-hyphens: none; */\n/* \thyphens: none; */\n/* } */\n\n/*/1* Code blocks *1/ */\n/*/1* */\n/*pre[class*=\"language-\"] { */\n/*\tposition: relative; */\n/*\tmargin: .5em 0; */\n/*\toverflow: visible; */\n/*\tpadding: 1px; */\n/*} */\n\n/*pre[class*=\"language-\"] > code { */\n/*\tposition: relative; */\n/*\tz-index: 1; */\n/*\tborder-left: 10px solid #358ccb; */\n/*\tbox-shadow: -1px 0px 0px 0px #358ccb, 0px 0px 0px 1px #dfdfdf; */\n/*\tbackground-color: #fdfdfd; */\n/*\tbackground-image: linear-gradient(transparent 50%, rgba(69, 142, 209, 0.04) 50%); */\n/*\tbackground-size: 3em 3em; */\n/*\tbackground-origin: content-box; */\n/*\tbackground-attachment: local; */\n/*} */\n\n/*code[class*=\"language-\"] { */\n/*\tmax-height: inherit; */\n/*\theight: inherit; */\n/*\tpadding: 0 1em; */\n/*\tdisplay: block; */\n/*\toverflow: auto; */\n/*} */\n\n/*// Margin bottom to accommodate shadow */ \n/*:not(pre) > code[class*=\"language-\"], */\n/*pre[class*=\"language-\"] { */\n/*\tbackground-color: #fdfdfd; */\n/*\t-webkit-box-sizing: border-box; */\n/*\t-moz-box-sizing: border-box; */\n/*\tbox-sizing: border-box; */\n/*\tmargin-bottom: 1em; */\n/*} */\n\n/*// Inline code */ \n/*:not(pre) > code[class*=\"language-\"] { */\n/*\tposition: relative; */\n/*\tpadding: .2em; */\n/*\tborder-radius: 0.3em; */\n/*\tcolor: #c92c2c; */\n/*\tborder: 1px solid rgba(0, 0, 0, 0.1); */\n/*\tdisplay: inline; */\n/*\twhite-space: normal; */\n/*} */\n\n/*pre[class*=\"language-\"]:before, */\n/*pre[class*=\"language-\"]:after { */\n/*\tcontent: ''; */\n/*\tdisplay: block; */\n/*\tposition: absolute; */\n/*\tbottom: 0.75em; */\n/*\tleft: 0.18em; */\n/*\twidth: 40%; */\n/*\theight: 20%; */\n/*\tmax-height: 13em; */\n/*\tbox-shadow: 0px 13px 8px #979797; */\n/*\t-webkit-transform: rotate(-2deg); */\n/*\t-moz-transform: rotate(-2deg); */\n/*\t-ms-transform: rotate(-2deg); */\n/*\t-o-transform: rotate(-2deg); */\n/*\ttransform: rotate(-2deg); */\n/*} */\n\n/*pre[class*=\"language-\"]:after { */\n/*\tright: 0.75em; */\n/*\tleft: auto; */\n/*\t-webkit-transform: rotate(2deg); */\n/*\t-moz-transform: rotate(2deg); */\n/*\t-ms-transform: rotate(2deg); */\n/*\t-o-transform: rotate(2deg); */\n/*\ttransform: rotate(2deg); */\n/*} */\n\n\n.token.comment,\n.token.block-comment,\n.token.prolog,\n.token.doctype,\n.token.cdata {\n\tcolor: #7D8B99;\n}\n\n.token.punctuation {\n\tcolor: #5F6364;\n}\n\n.token.property,\n.token.tag,\n.token.boolean,\n.token.number,\n.token.function-name,\n.token.constant,\n.token.symbol,\n.token.deleted {\n\tcolor: #c92c2c;\n}\n\n.token.selector,\n.token.attr-name,\n.token.string,\n.token.char,\n.token.function,\n.token.builtin,\n.token.inserted {\n\tcolor: #2f9c0a;\n}\n\n.token.operator,\n.token.entity,\n.token.url,\n.token.variable {\ncolor: #a67f59;\n\tbackground: rgba(255, 255, 255, 0.5);\n}\n.token.url .content{\n  color: darkblue;\n  text-decoration: underline;\n}\n\n.token.atrule,\n.token.attr-value,\n.token.keyword,\n.token.class-name {\n\tcolor: #1990b8;\n}\n\n\n\n.token.regex,\n.token.important {\ncolor: darkred;\n}\n\n.language-css .token.string,\n.style .token.string {\n\tcolor: #a67f59;\n\tbackground: rgba(255, 255, 255, 0.5);\n}\n\n.token.important {\n\tfont-weight: normal;\n}\n\n.token.bold {\n\tfont-weight: bold;\n}\n.token.italic {\n\tfont-style: italic;\n}\n\n.token.entity {\n\tcursor: help;\n}\n\n.token.namespace {\n\topacity: .7;\n}\n\n@media screen and (max-width: 767px) {\n\tpre[class*=\"language-\"]:before,\n\tpre[class*=\"language-\"]:after {\n\t\tbottom: 14px;\n\t\tbox-shadow: none;\n\t}\n\n}\n\n/* Plugin styles: Line Numbers */\npre[class*=\"language-\"].line-numbers.line-numbers {\n\tpadding-left: 0;\n}\n\npre[class*=\"language-\"].line-numbers.line-numbers code {\n\tpadding-left: 3.8em;\n}\n\npre[class*=\"language-\"].line-numbers.line-numbers .line-numbers-rows {\n\tleft: 0;\n}\n\n/* Plugin styles: Line Highlight */\npre[class*=\"language-\"][data-line] {\n\tpadding-top: 0;\n\tpadding-bottom: 0;\n\tpadding-left: 0;\n}\npre[data-line] code {\n\tposition: relative;\n\tpadding-left: 4em;\n}\npre .line-highlight {\n\tmargin-top: 0;\n}\n\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/htm/dist/htm.module.js":
/*!*********************************************!*\
  !*** ./node_modules/htm/dist/htm.module.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var n=function(t,s,r,e){var u;s[0]=0;for(var h=1;h<s.length;h++){var p=s[h++],a=s[h]?(s[0]|=p?1:2,r[s[h++]]):s[++h];3===p?e[0]=a:4===p?e[1]=Object.assign(e[1]||{},a):5===p?(e[1]=e[1]||{})[s[++h]]=a:6===p?e[1][s[++h]]+=a+"":p?(u=t.apply(a,n(t,a,r,["",null])),e.push(u),a[0]?s[0]|=2:(s[h-2]=0,s[h]=u)):e.push(a)}return e},t=new Map;/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(s){var r=t.get(this);return r||(r=new Map,t.set(this,r)),(r=n(this,r.get(s)||(r.set(s,r=function(n){for(var t,s,r=1,e="",u="",h=[0],p=function(n){1===r&&(n||(e=e.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?h.push(0,n,e):3===r&&(n||e)?(h.push(3,n,e),r=2):2===r&&"..."===e&&n?h.push(4,n,0):2===r&&e&&!n?h.push(5,0,!0,e):r>=5&&((e||!n&&5===r)&&(h.push(r,0,e,s),r=6),n&&(h.push(r,n,0,s),r=6)),e=""},a=0;a<n.length;a++){a&&(1===r&&p(),p(a));for(var l=0;l<n[a].length;l++)t=n[a][l],1===r?"<"===t?(p(),h=[h],r=3):e+=t:4===r?"--"===e&&">"===t?(r=1,e=""):e=t+e[0]:u?t===u?u="":e+=t:'"'===t||"'"===t?u=t:">"===t?(p(),r=1):r&&("="===t?(r=5,s=e,e=""):"/"===t&&(r<5||">"===n[a][l+1])?(p(),3===r&&(h=h[0]),r=h,(h=h[0]).push(2,0,r),r=0):" "===t||"\t"===t||"\n"===t||"\r"===t?(p(),r=2):e+=t),3===r&&"!--"===e&&(r=4,h=h[0])}return p(),h}(s)),r),arguments,[])).length>1?r:r[0]}


/***/ }),

/***/ "./node_modules/htm/preact/index.module.js":
/*!*************************************************!*\
  !*** ./node_modules/htm/preact/index.module.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Component: () => (/* reexport safe */ preact__WEBPACK_IMPORTED_MODULE_0__.Component),
/* harmony export */   h: () => (/* reexport safe */ preact__WEBPACK_IMPORTED_MODULE_0__.h),
/* harmony export */   html: () => (/* binding */ m),
/* harmony export */   render: () => (/* reexport safe */ preact__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "preact");
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(preact__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var htm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! htm */ "./node_modules/htm/dist/htm.module.js");
var m=htm__WEBPACK_IMPORTED_MODULE_1__["default"].bind(preact__WEBPACK_IMPORTED_MODULE_0__.h);


/***/ }),

/***/ "./src/components/BareMDE/mded.scss":
/*!******************************************!*\
  !*** ./src/components/BareMDE/mded.scss ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_mded_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/dist/cjs.js!./mded.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/components/BareMDE/mded.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_mded_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_mded_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_mded_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_mded_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/components/BareMDE/prism/prism_fixed.scss":
/*!*******************************************************!*\
  !*** ./src/components/BareMDE/prism/prism_fixed.scss ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_prism_fixed_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/sass-loader/dist/cjs.js!./prism_fixed.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/components/BareMDE/prism/prism_fixed.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_prism_fixed_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_prism_fixed_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_prism_fixed_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_prism_fixed_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./src/components/BareMDE/If.js":
/*!**************************************!*\
  !*** ./src/components/BareMDE/If.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   If: () => (/* binding */ If)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "preact");
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(preact__WEBPACK_IMPORTED_MODULE_0__);


class If extends preact__WEBPACK_IMPORTED_MODULE_0__.Component{
  constructor(props){
    super(props)
  }

  render(){
    // console.log("IF" , this.props.condition)
    if(this.props.condition){
      return this.props.children
    }else{
    return ""
    }
  }
}



/***/ }),

/***/ "./src/components/BareMDE/Menu.js":
/*!****************************************!*\
  !*** ./src/components/BareMDE/Menu.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Menu)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "preact");
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(preact__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var htm_preact__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! htm/preact */ "./node_modules/htm/preact/index.module.js");
/* harmony import */ var _If__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./If */ "./src/components/BareMDE/If.js");





class Menu extends preact__WEBPACK_IMPORTED_MODULE_0__.Component{
  constructor(props){
    super(props);
    this.state = {
      open: false
    }
    this.handleItem = this.handleItem.bind(this);
    this.doClose=this.doClose.bind(this);

  }

  handleItem(i){
    this.props.items[i].handler();
    // this.setState({"open" : false});
  }

  doClose(e){
    console.log("do close") 
    this.setState({ "open" : false })
  }

  componentDidUpdate(previousProps, previousState){
    if(this.state.open===true && previousState.open===false){
       window.addEventListener("click", this.doClose)
    }
    if(this.state.open===false && previousState.open===true){
       window.removeEventListener("click", this.doClose)
    }
    return true;
    
  }

  render(){
    if(!this.props.items || this.props.items.length==0){ return "" }
    const my = this;
    return (0,htm_preact__WEBPACK_IMPORTED_MODULE_1__.html)`
    <div class="EditorMenu">
    <button
    title=${this.props.title || "Menu"}
    onClick=${(e)=>{  e.stopPropagation() ; e.preventDefault(); this.setState({ open: !this.state.open }) }}></button>
    <${_If__WEBPACK_IMPORTED_MODULE_2__.If} condition=${this.state.open}>
    <div class="menuItems" style="z-index:${this.props.zIndex}">
    ${ this.props.items.map( 
    (e,i)=>(0,htm_preact__WEBPACK_IMPORTED_MODULE_1__.html)`<div class="Item" onMouseDown=${ ()=>my.handleItem(i) }>${e.label}</div>` 
    ) }
    </div>
    </${_If__WEBPACK_IMPORTED_MODULE_2__.If}>
    </div>

    `
    }
  }


Menu.defaultProps = {
  zIndex: 1100,
}



/***/ }),

/***/ "./src/components/BareMDE/TButton.js":
/*!*******************************************!*\
  !*** ./src/components/BareMDE/TButton.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TButton)
/* harmony export */ });
/* harmony import */ var htm_preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! htm/preact */ "./node_modules/htm/preact/index.module.js");


function TButton({ 
   svg,
   svgOff,
   isOn,
   title,
   onClick,
   customClass
}){
    svgOff = svgOff || svg; 
   return (0,htm_preact__WEBPACK_IMPORTED_MODULE_0__.html)`<button class="TButton 
   ${ isOn ? 'on' : 'off' }
   ${customClass || ''}
   "
   style=${{
        width: "32px",
        height: "32px",
        display: "inline-block",
        boxSizing: "border-box",
        padding:"3px",
        userSelect: "none",
        borderWidth:"1px",
     }}
   dangerouslySetInnerHTML=${{__html:isOn? svg : svgOff}}
   title=${ title||'' }
   onClick=${ typeof onClick === 'function' ? onClick : ()=>console.log('button clicked') }
   ></button>`
}


/***/ }),

/***/ "./src/components/BareMDE/prism/prism.js":
/*!***********************************************!*\
  !*** ./src/components/BareMDE/prism/prism.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* PrismJS 1.29.0
https://prismjs.com/download.html#themes=prism-coy&languages=markup+markdown */
/// <reference lib="WebWorker"/>

var _self = (typeof window !== 'undefined')
	? window   // if in browser
	: (
		(typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope)
			? self // if in worker
			: {}   // if in node js
	);

/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */
var Prism = (function (_self) {

	// Private helper vars
	var lang = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i;
	var uniqueId = 0;

	// The grammar object for plaintext
	var plainTextGrammar = {};


	var _ = {
		/**
		 * By default, Prism will attempt to highlight all code elements (by calling {@link Prism.highlightAll}) on the
		 * current page after the page finished loading. This might be a problem if e.g. you wanted to asynchronously load
		 * additional languages or plugins yourself.
		 *
		 * By setting this value to `true`, Prism will not automatically highlight all code elements on the page.
		 *
		 * You obviously have to change this value before the automatic highlighting started. To do this, you can add an
		 * empty Prism object into the global scope before loading the Prism script like this:
		 *
		 * ```js
		 * window.Prism = window.Prism || {};
		 * Prism.manual = true;
		 * // add a new <script> to load Prism's script
		 * ```
		 *
		 * @default false
		 * @type {boolean}
		 * @memberof Prism
		 * @public
		 */
		// manual: _self.Prism && _self.Prism.manual,
		 manual: true,//_self.Prism && _self.Prism.manual,
		/**
		 * By default, if Prism is in a web worker, it assumes that it is in a worker it created itself, so it uses
		 * `addEventListener` to communicate with its parent instance. However, if you're using Prism manually in your
		 * own worker, you don't want it to do this.
		 *
		 * By setting this value to `true`, Prism will not add its own listeners to the worker.
		 *
		 * You obviously have to change this value before Prism executes. To do this, you can add an
		 * empty Prism object into the global scope before loading the Prism script like this:
		 *
		 * ```js
		 * window.Prism = window.Prism || {};
		 * Prism.disableWorkerMessageHandler = true;
		 * // Load Prism's script
		 * ```
		 *
		 * @default false
		 * @type {boolean}
		 * @memberof Prism
		 * @public
		 */
		disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,

		/**
		 * A namespace for utility methods.
		 *
		 * All function in this namespace that are not explicitly marked as _public_ are for __internal use only__ and may
		 * change or disappear at any time.
		 *
		 * @namespace
		 * @memberof Prism
		 */
		util: {
			encode: function encode(tokens) {
				if (tokens instanceof Token) {
					return new Token(tokens.type, encode(tokens.content), tokens.alias);
				} else if (Array.isArray(tokens)) {
					return tokens.map(encode);
				} else {
					return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
				}
			},

			/**
			 * Returns the name of the type of the given value.
			 *
			 * @param {any} o
			 * @returns {string}
			 * @example
			 * type(null)      === 'Null'
			 * type(undefined) === 'Undefined'
			 * type(123)       === 'Number'
			 * type('foo')     === 'String'
			 * type(true)      === 'Boolean'
			 * type([1, 2])    === 'Array'
			 * type({})        === 'Object'
			 * type(String)    === 'Function'
			 * type(/abc+/)    === 'RegExp'
			 */
			type: function (o) {
				return Object.prototype.toString.call(o).slice(8, -1);
			},

			/**
			 * Returns a unique number for the given object. Later calls will still return the same number.
			 *
			 * @param {Object} obj
			 * @returns {number}
			 */
			objId: function (obj) {
				if (!obj['__id']) {
					Object.defineProperty(obj, '__id', { value: ++uniqueId });
				}
				return obj['__id'];
			},

			/**
			 * Creates a deep clone of the given object.
			 *
			 * The main intended use of this function is to clone language definitions.
			 *
			 * @param {T} o
			 * @param {Record<number, any>} [visited]
			 * @returns {T}
			 * @template T
			 */
			clone: function deepClone(o, visited) {
				visited = visited || {};

				var clone; var id;
				switch (_.util.type(o)) {
					case 'Object':
						id = _.util.objId(o);
						if (visited[id]) {
							return visited[id];
						}
						clone = /** @type {Record<string, any>} */ ({});
						visited[id] = clone;

						for (var key in o) {
							if (o.hasOwnProperty(key)) {
								clone[key] = deepClone(o[key], visited);
							}
						}

						return /** @type {any} */ (clone);

					case 'Array':
						id = _.util.objId(o);
						if (visited[id]) {
							return visited[id];
						}
						clone = [];
						visited[id] = clone;

						(/** @type {Array} */(/** @type {any} */(o))).forEach(function (v, i) {
							clone[i] = deepClone(v, visited);
						});

						return /** @type {any} */ (clone);

					default:
						return o;
				}
			},

			/**
			 * Returns the Prism language of the given element set by a `language-xxxx` or `lang-xxxx` class.
			 *
			 * If no language is set for the element or the element is `null` or `undefined`, `none` will be returned.
			 *
			 * @param {Element} element
			 * @returns {string}
			 */
			getLanguage: function (element) {
				while (element) {
					var m = lang.exec(element.className);
					if (m) {
						return m[1].toLowerCase();
					}
					element = element.parentElement;
				}
				return 'none';
			},

			/**
			 * Sets the Prism `language-xxxx` class of the given element.
			 *
			 * @param {Element} element
			 * @param {string} language
			 * @returns {void}
			 */
			setLanguage: function (element, language) {
				// remove all `language-xxxx` classes
				// (this might leave behind a leading space)
				element.className = element.className.replace(RegExp(lang, 'gi'), '');

				// add the new `language-xxxx` class
				// (using `classList` will automatically clean up spaces for us)
				element.classList.add('language-' + language);
			},

			/**
			 * Returns the script element that is currently executing.
			 *
			 * This does __not__ work for line script element.
			 *
			 * @returns {HTMLScriptElement | null}
			 */
			currentScript: function () {
				if (typeof document === 'undefined') {
					return null;
				}
				if ('currentScript' in document && 1 < 2 /* hack to trip TS' flow analysis */) {
					return /** @type {any} */ (document.currentScript);
				}

				// IE11 workaround
				// we'll get the src of the current script by parsing IE11's error stack trace
				// this will not work for inline scripts

				try {
					throw new Error();
				} catch (err) {
					// Get file src url from stack. Specifically works with the format of stack traces in IE.
					// A stack will look like this:
					//
					// Error
					//    at _.util.currentScript (http://localhost/components/prism-core.js:119:5)
					//    at Global code (http://localhost/components/prism-core.js:606:1)

					var src = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(err.stack) || [])[1];
					if (src) {
						var scripts = document.getElementsByTagName('script');
						for (var i in scripts) {
							if (scripts[i].src == src) {
								return scripts[i];
							}
						}
					}
					return null;
				}
			},

			/**
			 * Returns whether a given class is active for `element`.
			 *
			 * The class can be activated if `element` or one of its ancestors has the given class and it can be deactivated
			 * if `element` or one of its ancestors has the negated version of the given class. The _negated version_ of the
			 * given class is just the given class with a `no-` prefix.
			 *
			 * Whether the class is active is determined by the closest ancestor of `element` (where `element` itself is
			 * closest ancestor) that has the given class or the negated version of it. If neither `element` nor any of its
			 * ancestors have the given class or the negated version of it, then the default activation will be returned.
			 *
			 * In the paradoxical situation where the closest ancestor contains __both__ the given class and the negated
			 * version of it, the class is considered active.
			 *
			 * @param {Element} element
			 * @param {string} className
			 * @param {boolean} [defaultActivation=false]
			 * @returns {boolean}
			 */
			isActive: function (element, className, defaultActivation) {
				var no = 'no-' + className;

				while (element) {
					var classList = element.classList;
					if (classList.contains(className)) {
						return true;
					}
					if (classList.contains(no)) {
						return false;
					}
					element = element.parentElement;
				}
				return !!defaultActivation;
			}
		},

		/**
		 * This namespace contains all currently loaded languages and the some helper functions to create and modify languages.
		 *
		 * @namespace
		 * @memberof Prism
		 * @public
		 */
		languages: {
			/**
			 * The grammar for plain, unformatted text.
			 */
			plain: plainTextGrammar,
			plaintext: plainTextGrammar,
			text: plainTextGrammar,
			txt: plainTextGrammar,

			/**
			 * Creates a deep copy of the language with the given id and appends the given tokens.
			 *
			 * If a token in `redef` also appears in the copied language, then the existing token in the copied language
			 * will be overwritten at its original position.
			 *
			 * ## Best practices
			 *
			 * Since the position of overwriting tokens (token in `redef` that overwrite tokens in the copied language)
			 * doesn't matter, they can technically be in any order. However, this can be confusing to others that trying to
			 * understand the language definition because, normally, the order of tokens matters in Prism grammars.
			 *
			 * Therefore, it is encouraged to order overwriting tokens according to the positions of the overwritten tokens.
			 * Furthermore, all non-overwriting tokens should be placed after the overwriting ones.
			 *
			 * @param {string} id The id of the language to extend. This has to be a key in `Prism.languages`.
			 * @param {Grammar} redef The new tokens to append.
			 * @returns {Grammar} The new language created.
			 * @public
			 * @example
			 * Prism.languages['css-with-colors'] = Prism.languages.extend('css', {
			 *     // Prism.languages.css already has a 'comment' token, so this token will overwrite CSS' 'comment' token
			 *     // at its original position
			 *     'comment': { ... },
			 *     // CSS doesn't have a 'color' token, so this token will be appended
			 *     'color': /\b(?:red|green|blue)\b/
			 * });
			 */
			extend: function (id, redef) {
				var lang = _.util.clone(_.languages[id]);

				for (var key in redef) {
					lang[key] = redef[key];
				}

				return lang;
			},

			/**
			 * Inserts tokens _before_ another token in a language definition or any other grammar.
			 *
			 * ## Usage
			 *
			 * This helper method makes it easy to modify existing languages. For example, the CSS language definition
			 * not only defines CSS highlighting for CSS documents, but also needs to define highlighting for CSS embedded
			 * in HTML through `<style>` elements. To do this, it needs to modify `Prism.languages.markup` and add the
			 * appropriate tokens. However, `Prism.languages.markup` is a regular JavaScript object literal, so if you do
			 * this:
			 *
			 * ```js
			 * Prism.languages.markup.style = {
			 *     // token
			 * };
			 * ```
			 *
			 * then the `style` token will be added (and processed) at the end. `insertBefore` allows you to insert tokens
			 * before existing tokens. For the CSS example above, you would use it like this:
			 *
			 * ```js
			 * Prism.languages.insertBefore('markup', 'cdata', {
			 *     'style': {
			 *         // token
			 *     }
			 * });
			 * ```
			 *
			 * ## Special cases
			 *
			 * If the grammars of `inside` and `insert` have tokens with the same name, the tokens in `inside`'s grammar
			 * will be ignored.
			 *
			 * This behavior can be used to insert tokens after `before`:
			 *
			 * ```js
			 * Prism.languages.insertBefore('markup', 'comment', {
			 *     'comment': Prism.languages.markup.comment,
			 *     // tokens after 'comment'
			 * });
			 * ```
			 *
			 * ## Limitations
			 *
			 * The main problem `insertBefore` has to solve is iteration order. Since ES2015, the iteration order for object
			 * properties is guaranteed to be the insertion order (except for integer keys) but some browsers behave
			 * differently when keys are deleted and re-inserted. So `insertBefore` can't be implemented by temporarily
			 * deleting properties which is necessary to insert at arbitrary positions.
			 *
			 * To solve this problem, `insertBefore` doesn't actually insert the given tokens into the target object.
			 * Instead, it will create a new object and replace all references to the target object with the new one. This
			 * can be done without temporarily deleting properties, so the iteration order is well-defined.
			 *
			 * However, only references that can be reached from `Prism.languages` or `insert` will be replaced. I.e. if
			 * you hold the target object in a variable, then the value of the variable will not change.
			 *
			 * ```js
			 * var oldMarkup = Prism.languages.markup;
			 * var newMarkup = Prism.languages.insertBefore('markup', 'comment', { ... });
			 *
			 * assert(oldMarkup !== Prism.languages.markup);
			 * assert(newMarkup === Prism.languages.markup);
			 * ```
			 *
			 * @param {string} inside The property of `root` (e.g. a language id in `Prism.languages`) that contains the
			 * object to be modified.
			 * @param {string} before The key to insert before.
			 * @param {Grammar} insert An object containing the key-value pairs to be inserted.
			 * @param {Object<string, any>} [root] The object containing `inside`, i.e. the object that contains the
			 * object to be modified.
			 *
			 * Defaults to `Prism.languages`.
			 * @returns {Grammar} The new grammar object.
			 * @public
			 */
			insertBefore: function (inside, before, insert, root) {
				root = root || /** @type {any} */ (_.languages);
				var grammar = root[inside];
				/** @type {Grammar} */
				var ret = {};

				for (var token in grammar) {
					if (grammar.hasOwnProperty(token)) {

						if (token == before) {
							for (var newToken in insert) {
								if (insert.hasOwnProperty(newToken)) {
									ret[newToken] = insert[newToken];
								}
							}
						}

						// Do not insert token which also occur in insert. See #1525
						if (!insert.hasOwnProperty(token)) {
							ret[token] = grammar[token];
						}
					}
				}

				var old = root[inside];
				root[inside] = ret;

				// Update references in other language definitions
				_.languages.DFS(_.languages, function (key, value) {
					if (value === old && key != inside) {
						this[key] = ret;
					}
				});

				return ret;
			},

			// Traverse a language definition with Depth First Search
			DFS: function DFS(o, callback, type, visited) {
				visited = visited || {};

				var objId = _.util.objId;

				for (var i in o) {
					if (o.hasOwnProperty(i)) {
						callback.call(o, i, o[i], type || i);

						var property = o[i];
						var propertyType = _.util.type(property);

						if (propertyType === 'Object' && !visited[objId(property)]) {
							visited[objId(property)] = true;
							DFS(property, callback, null, visited);
						} else if (propertyType === 'Array' && !visited[objId(property)]) {
							visited[objId(property)] = true;
							DFS(property, callback, i, visited);
						}
					}
				}
			}
		},

		plugins: {},

		/**
		 * This is the most high-level function in Prism’s API.
		 * It fetches all the elements that have a `.language-xxxx` class and then calls {@link Prism.highlightElement} on
		 * each one of them.
		 *
		 * This is equivalent to `Prism.highlightAllUnder(document, async, callback)`.
		 *
		 * @param {boolean} [async=false] Same as in {@link Prism.highlightAllUnder}.
		 * @param {HighlightCallback} [callback] Same as in {@link Prism.highlightAllUnder}.
		 * @memberof Prism
		 * @public
		 */
		highlightAll: function (async, callback) {
			_.highlightAllUnder(document, async, callback);
		},

		/**
		 * Fetches all the descendants of `container` that have a `.language-xxxx` class and then calls
		 * {@link Prism.highlightElement} on each one of them.
		 *
		 * The following hooks will be run:
		 * 1. `before-highlightall`
		 * 2. `before-all-elements-highlight`
		 * 3. All hooks of {@link Prism.highlightElement} for each element.
		 *
		 * @param {ParentNode} container The root element, whose descendants that have a `.language-xxxx` class will be highlighted.
		 * @param {boolean} [async=false] Whether each element is to be highlighted asynchronously using Web Workers.
		 * @param {HighlightCallback} [callback] An optional callback to be invoked on each element after its highlighting is done.
		 * @memberof Prism
		 * @public
		 */
		highlightAllUnder: function (container, async, callback) {
			var env = {
				callback: callback,
				container: container,
				selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
			};

			_.hooks.run('before-highlightall', env);

			env.elements = Array.prototype.slice.apply(env.container.querySelectorAll(env.selector));

			_.hooks.run('before-all-elements-highlight', env);

			for (var i = 0, element; (element = env.elements[i++]);) {
				_.highlightElement(element, async === true, env.callback);
			}
		},

		/**
		 * Highlights the code inside a single element.
		 *
		 * The following hooks will be run:
		 * 1. `before-sanity-check`
		 * 2. `before-highlight`
		 * 3. All hooks of {@link Prism.highlight}. These hooks will be run by an asynchronous worker if `async` is `true`.
		 * 4. `before-insert`
		 * 5. `after-highlight`
		 * 6. `complete`
		 *
		 * Some the above hooks will be skipped if the element doesn't contain any text or there is no grammar loaded for
		 * the element's language.
		 *
		 * @param {Element} element The element containing the code.
		 * It must have a class of `language-xxxx` to be processed, where `xxxx` is a valid language identifier.
		 * @param {boolean} [async=false] Whether the element is to be highlighted asynchronously using Web Workers
		 * to improve performance and avoid blocking the UI when highlighting very large chunks of code. This option is
		 * [disabled by default](https://prismjs.com/faq.html#why-is-asynchronous-highlighting-disabled-by-default).
		 *
		 * Note: All language definitions required to highlight the code must be included in the main `prism.js` file for
		 * asynchronous highlighting to work. You can build your own bundle on the
		 * [Download page](https://prismjs.com/download.html).
		 * @param {HighlightCallback} [callback] An optional callback to be invoked after the highlighting is done.
		 * Mostly useful when `async` is `true`, since in that case, the highlighting is done asynchronously.
		 * @memberof Prism
		 * @public
		 */
		highlightElement: function (element, async, callback) {
			// Find language
			var language = _.util.getLanguage(element);
			var grammar = _.languages[language];

			// Set language on the element, if not present
			_.util.setLanguage(element, language);

			// Set language on the parent, for styling
			var parent = element.parentElement;
			if (parent && parent.nodeName.toLowerCase() === 'pre') {
				_.util.setLanguage(parent, language);
			}

			var code = element.textContent;

			var env = {
				element: element,
				language: language,
				grammar: grammar,
				code: code
			};

			function insertHighlightedCode(highlightedCode) {
				env.highlightedCode = highlightedCode;

				_.hooks.run('before-insert', env);

				env.element.innerHTML = env.highlightedCode;

				_.hooks.run('after-highlight', env);
				_.hooks.run('complete', env);
				callback && callback.call(env.element);
			}

			_.hooks.run('before-sanity-check', env);

			// plugins may change/add the parent/element
			parent = env.element.parentElement;
			if (parent && parent.nodeName.toLowerCase() === 'pre' && !parent.hasAttribute('tabindex')) {
				parent.setAttribute('tabindex', '0');
			}

			if (!env.code) {
				_.hooks.run('complete', env);
				callback && callback.call(env.element);
				return;
			}

			_.hooks.run('before-highlight', env);

			if (!env.grammar) {
				insertHighlightedCode(_.util.encode(env.code));
				return;
			}

			if (async && _self.Worker) {
				var worker = new Worker(_.filename);

				worker.onmessage = function (evt) {
					insertHighlightedCode(evt.data);
				};

				worker.postMessage(JSON.stringify({
					language: env.language,
					code: env.code,
					immediateClose: true
				}));
			} else {
				insertHighlightedCode(_.highlight(env.code, env.grammar, env.language));
			}
		},

		/**
		 * Low-level function, only use if you know what you’re doing. It accepts a string of text as input
		 * and the language definitions to use, and returns a string with the HTML produced.
		 *
		 * The following hooks will be run:
		 * 1. `before-tokenize`
		 * 2. `after-tokenize`
		 * 3. `wrap`: On each {@link Token}.
		 *
		 * @param {string} text A string with the code to be highlighted.
		 * @param {Grammar} grammar An object containing the tokens to use.
		 *
		 * Usually a language definition like `Prism.languages.markup`.
		 * @param {string} language The name of the language definition passed to `grammar`.
		 * @returns {string} The highlighted HTML.
		 * @memberof Prism
		 * @public
		 * @example
		 * Prism.highlight('var foo = true;', Prism.languages.javascript, 'javascript');
		 */
		highlight: function (text, grammar, language) {
			var env = {
				code: text,
				grammar: grammar,
				language: language
			};
			_.hooks.run('before-tokenize', env);
			if (!env.grammar) {
				throw new Error('The language "' + env.language + '" has no grammar.');
			}
			env.tokens = _.tokenize(env.code, env.grammar);
			_.hooks.run('after-tokenize', env);
			return Token.stringify(_.util.encode(env.tokens), env.language);
		},

		/**
		 * This is the heart of Prism, and the most low-level function you can use. It accepts a string of text as input
		 * and the language definitions to use, and returns an array with the tokenized code.
		 *
		 * When the language definition includes nested tokens, the function is called recursively on each of these tokens.
		 *
		 * This method could be useful in other contexts as well, as a very crude parser.
		 *
		 * @param {string} text A string with the code to be highlighted.
		 * @param {Grammar} grammar An object containing the tokens to use.
		 *
		 * Usually a language definition like `Prism.languages.markup`.
		 * @returns {TokenStream} An array of strings and tokens, a token stream.
		 * @memberof Prism
		 * @public
		 * @example
		 * let code = `var foo = 0;`;
		 * let tokens = Prism.tokenize(code, Prism.languages.javascript);
		 * tokens.forEach(token => {
		 *     if (token instanceof Prism.Token && token.type === 'number') {
		 *         console.log(`Found numeric literal: ${token.content}`);
		 *     }
		 * });
		 */
		tokenize: function (text, grammar) {
			var rest = grammar.rest;
			if (rest) {
				for (var token in rest) {
					grammar[token] = rest[token];
				}

				delete grammar.rest;
			}

			var tokenList = new LinkedList();
			addAfter(tokenList, tokenList.head, text);

			matchGrammar(text, tokenList, grammar, tokenList.head, 0);

			return toArray(tokenList);
		},

		/**
		 * @namespace
		 * @memberof Prism
		 * @public
		 */
		hooks: {
			all: {},

			/**
			 * Adds the given callback to the list of callbacks for the given hook.
			 *
			 * The callback will be invoked when the hook it is registered for is run.
			 * Hooks are usually directly run by a highlight function but you can also run hooks yourself.
			 *
			 * One callback function can be registered to multiple hooks and the same hook multiple times.
			 *
			 * @param {string} name The name of the hook.
			 * @param {HookCallback} callback The callback function which is given environment variables.
			 * @public
			 */
			add: function (name, callback) {
				var hooks = _.hooks.all;

				hooks[name] = hooks[name] || [];

				hooks[name].push(callback);
			},

			/**
			 * Runs a hook invoking all registered callbacks with the given environment variables.
			 *
			 * Callbacks will be invoked synchronously and in the order in which they were registered.
			 *
			 * @param {string} name The name of the hook.
			 * @param {Object<string, any>} env The environment variables of the hook passed to all callbacks registered.
			 * @public
			 */
			run: function (name, env) {
				var callbacks = _.hooks.all[name];

				if (!callbacks || !callbacks.length) {
					return;
				}

				for (var i = 0, callback; (callback = callbacks[i++]);) {
					callback(env);
				}
			}
		},

		Token: Token
	};
	_self.Prism = _;


	// Typescript note:
	// The following can be used to import the Token type in JSDoc:
	//
	//   @typedef {InstanceType<import("./prism-core")["Token"]>} Token

	/**
	 * Creates a new token.
	 *
	 * @param {string} type See {@link Token#type type}
	 * @param {string | TokenStream} content See {@link Token#content content}
	 * @param {string|string[]} [alias] The alias(es) of the token.
	 * @param {string} [matchedStr=""] A copy of the full string this token was created from.
	 * @class
	 * @global
	 * @public
	 */
	function Token(type, content, alias, matchedStr) {
		/**
		 * The type of the token.
		 *
		 * This is usually the key of a pattern in a {@link Grammar}.
		 *
		 * @type {string}
		 * @see GrammarToken
		 * @public
		 */
		this.type = type;
		/**
		 * The strings or tokens contained by this token.
		 *
		 * This will be a token stream if the pattern matched also defined an `inside` grammar.
		 *
		 * @type {string | TokenStream}
		 * @public
		 */
		this.content = content;
		/**
		 * The alias(es) of the token.
		 *
		 * @type {string|string[]}
		 * @see GrammarToken
		 * @public
		 */
		this.alias = alias;
		// Copy of the full string this token was created from
		this.length = (matchedStr || '').length | 0;
	}

	/**
	 * A token stream is an array of strings and {@link Token Token} objects.
	 *
	 * Token streams have to fulfill a few properties that are assumed by most functions (mostly internal ones) that process
	 * them.
	 *
	 * 1. No adjacent strings.
	 * 2. No empty strings.
	 *
	 *    The only exception here is the token stream that only contains the empty string and nothing else.
	 *
	 * @typedef {Array<string | Token>} TokenStream
	 * @global
	 * @public
	 */

	/**
	 * Converts the given token or token stream to an HTML representation.
	 *
	 * The following hooks will be run:
	 * 1. `wrap`: On each {@link Token}.
	 *
	 * @param {string | Token | TokenStream} o The token or token stream to be converted.
	 * @param {string} language The name of current language.
	 * @returns {string} The HTML representation of the token or token stream.
	 * @memberof Token
	 * @static
	 */
	Token.stringify = function stringify(o, language) {
		if (typeof o == 'string') {
			return o;
		}
		if (Array.isArray(o)) {
			var s = '';
			o.forEach(function (e) {
				s += stringify(e, language);
			});
			return s;
		}

		var env = {
			type: o.type,
			content: stringify(o.content, language),
			tag: 'span',
			classes: ['token', o.type],
			attributes: {},
			language: language
		};

		var aliases = o.alias;
		if (aliases) {
			if (Array.isArray(aliases)) {
				Array.prototype.push.apply(env.classes, aliases);
			} else {
				env.classes.push(aliases);
			}
		}

		_.hooks.run('wrap', env);

		var attributes = '';
		for (var name in env.attributes) {
			attributes += ' ' + name + '="' + (env.attributes[name] || '').replace(/"/g, '&quot;') + '"';
		}

		return '<' + env.tag + ' class="' + env.classes.join(' ') + '"' + attributes + '>' + env.content + '</' + env.tag + '>';
	};

	/**
	 * @param {RegExp} pattern
	 * @param {number} pos
	 * @param {string} text
	 * @param {boolean} lookbehind
	 * @returns {RegExpExecArray | null}
	 */
	function matchPattern(pattern, pos, text, lookbehind) {
		pattern.lastIndex = pos;
		var match = pattern.exec(text);
		if (match && lookbehind && match[1]) {
			// change the match to remove the text matched by the Prism lookbehind group
			var lookbehindLength = match[1].length;
			match.index += lookbehindLength;
			match[0] = match[0].slice(lookbehindLength);
		}
		return match;
	}

	/**
	 * @param {string} text
	 * @param {LinkedList<string | Token>} tokenList
	 * @param {any} grammar
	 * @param {LinkedListNode<string | Token>} startNode
	 * @param {number} startPos
	 * @param {RematchOptions} [rematch]
	 * @returns {void}
	 * @private
	 *
	 * @typedef RematchOptions
	 * @property {string} cause
	 * @property {number} reach
	 */
	function matchGrammar(text, tokenList, grammar, startNode, startPos, rematch) {
		for (var token in grammar) {
			if (!grammar.hasOwnProperty(token) || !grammar[token]) {
				continue;
			}

			var patterns = grammar[token];
			patterns = Array.isArray(patterns) ? patterns : [patterns];

			for (var j = 0; j < patterns.length; ++j) {
				if (rematch && rematch.cause == token + ',' + j) {
					return;
				}

				var patternObj = patterns[j];
				var inside = patternObj.inside;
				var lookbehind = !!patternObj.lookbehind;
				var greedy = !!patternObj.greedy;
				var alias = patternObj.alias;

				if (greedy && !patternObj.pattern.global) {
					// Without the global flag, lastIndex won't work
					var flags = patternObj.pattern.toString().match(/[imsuy]*$/)[0];
					patternObj.pattern = RegExp(patternObj.pattern.source, flags + 'g');
				}

				/** @type {RegExp} */
				var pattern = patternObj.pattern || patternObj;

				for ( // iterate the token list and keep track of the current token/string position
					var currentNode = startNode.next, pos = startPos;
					currentNode !== tokenList.tail;
					pos += currentNode.value.length, currentNode = currentNode.next
				) {

					if (rematch && pos >= rematch.reach) {
						break;
					}

					var str = currentNode.value;

					if (tokenList.length > text.length) {
						// Something went terribly wrong, ABORT, ABORT!
						return;
					}

					if (str instanceof Token) {
						continue;
					}

					var removeCount = 1; // this is the to parameter of removeBetween
					var match;

					if (greedy) {
						match = matchPattern(pattern, pos, text, lookbehind);
						if (!match || match.index >= text.length) {
							break;
						}

						var from = match.index;
						var to = match.index + match[0].length;
						var p = pos;

						// find the node that contains the match
						p += currentNode.value.length;
						while (from >= p) {
							currentNode = currentNode.next;
							p += currentNode.value.length;
						}
						// adjust pos (and p)
						p -= currentNode.value.length;
						pos = p;

						// the current node is a Token, then the match starts inside another Token, which is invalid
						if (currentNode.value instanceof Token) {
							continue;
						}

						// find the last node which is affected by this match
						for (
							var k = currentNode;
							k !== tokenList.tail && (p < to || typeof k.value === 'string');
							k = k.next
						) {
							removeCount++;
							p += k.value.length;
						}
						removeCount--;

						// replace with the new match
						str = text.slice(pos, p);
						match.index -= pos;
					} else {
						match = matchPattern(pattern, 0, str, lookbehind);
						if (!match) {
							continue;
						}
					}

					// eslint-disable-next-line no-redeclare
					var from = match.index;
					var matchStr = match[0];
					var before = str.slice(0, from);
					var after = str.slice(from + matchStr.length);

					var reach = pos + str.length;
					if (rematch && reach > rematch.reach) {
						rematch.reach = reach;
					}

					var removeFrom = currentNode.prev;

					if (before) {
						removeFrom = addAfter(tokenList, removeFrom, before);
						pos += before.length;
					}

					removeRange(tokenList, removeFrom, removeCount);

					var wrapped = new Token(token, inside ? _.tokenize(matchStr, inside) : matchStr, alias, matchStr);
					currentNode = addAfter(tokenList, removeFrom, wrapped);

					if (after) {
						addAfter(tokenList, currentNode, after);
					}

					if (removeCount > 1) {
						// at least one Token object was removed, so we have to do some rematching
						// this can only happen if the current pattern is greedy

						/** @type {RematchOptions} */
						var nestedRematch = {
							cause: token + ',' + j,
							reach: reach
						};
						matchGrammar(text, tokenList, grammar, currentNode.prev, pos, nestedRematch);

						// the reach might have been extended because of the rematching
						if (rematch && nestedRematch.reach > rematch.reach) {
							rematch.reach = nestedRematch.reach;
						}
					}
				}
			}
		}
	}

	/**
	 * @typedef LinkedListNode
	 * @property {T} value
	 * @property {LinkedListNode<T> | null} prev The previous node.
	 * @property {LinkedListNode<T> | null} next The next node.
	 * @template T
	 * @private
	 */

	/**
	 * @template T
	 * @private
	 */
	function LinkedList() {
		/** @type {LinkedListNode<T>} */
		var head = { value: null, prev: null, next: null };
		/** @type {LinkedListNode<T>} */
		var tail = { value: null, prev: head, next: null };
		head.next = tail;

		/** @type {LinkedListNode<T>} */
		this.head = head;
		/** @type {LinkedListNode<T>} */
		this.tail = tail;
		this.length = 0;
	}

	/**
	 * Adds a new node with the given value to the list.
	 *
	 * @param {LinkedList<T>} list
	 * @param {LinkedListNode<T>} node
	 * @param {T} value
	 * @returns {LinkedListNode<T>} The added node.
	 * @template T
	 */
	function addAfter(list, node, value) {
		// assumes that node != list.tail && values.length >= 0
		var next = node.next;

		var newNode = { value: value, prev: node, next: next };
		node.next = newNode;
		next.prev = newNode;
		list.length++;

		return newNode;
	}
	/**
	 * Removes `count` nodes after the given node. The given node will not be removed.
	 *
	 * @param {LinkedList<T>} list
	 * @param {LinkedListNode<T>} node
	 * @param {number} count
	 * @template T
	 */
	function removeRange(list, node, count) {
		var next = node.next;
		for (var i = 0; i < count && next !== list.tail; i++) {
			next = next.next;
		}
		node.next = next;
		next.prev = node;
		list.length -= i;
	}
	/**
	 * @param {LinkedList<T>} list
	 * @returns {T[]}
	 * @template T
	 */
	function toArray(list) {
		var array = [];
		var node = list.head.next;
		while (node !== list.tail) {
			array.push(node.value);
			node = node.next;
		}
		return array;
	}


	if (!_self.document) {
		if (!_self.addEventListener) {
			// in Node.js
			return _;
		}

		if (!_.disableWorkerMessageHandler) {
			// In worker
			_self.addEventListener('message', function (evt) {
				var message = JSON.parse(evt.data);
				var lang = message.language;
				var code = message.code;
				var immediateClose = message.immediateClose;

				_self.postMessage(_.highlight(code, _.languages[lang], lang));
				if (immediateClose) {
					_self.close();
				}
			}, false);
		}

		return _;
	}

	// Get current script and highlight
	var script = _.util.currentScript();

	if (script) {
		_.filename = script.src;

		if (script.hasAttribute('data-manual')) {
			_.manual = true;
		}
	}

	function highlightAutomaticallyCallback() {
		if (!_.manual) {
			_.highlightAll();
		}
	}

	if (!_.manual) {
		// If the document state is "loading", then we'll use DOMContentLoaded.
		// If the document state is "interactive" and the prism.js script is deferred, then we'll also use the
		// DOMContentLoaded event because there might be some plugins or languages which have also been deferred and they
		// might take longer one animation frame to execute which can create a race condition where only some plugins have
		// been loaded when Prism.highlightAll() is executed, depending on how fast resources are loaded.
		// See https://github.com/PrismJS/prism/issues/2102
		var readyState = document.readyState;
		if (readyState === 'loading' || readyState === 'interactive' && script && script.defer) {
			document.addEventListener('DOMContentLoaded', highlightAutomaticallyCallback);
		} else {
			if (window.requestAnimationFrame) {
				window.requestAnimationFrame(highlightAutomaticallyCallback);
			} else {
				window.setTimeout(highlightAutomaticallyCallback, 16);
			}
		}
	}

	return _;

}(_self));

if ( true && module.exports) {
	module.exports = Prism;
}

// hack for components to work correctly in node.js
if (typeof __webpack_require__.g !== 'undefined') {
	__webpack_require__.g.Prism = Prism;
}

// some additional documentation/types

/**
 * The expansion of a simple `RegExp` literal to support additional properties.
 *
 * @typedef GrammarToken
 * @property {RegExp} pattern The regular expression of the token.
 * @property {boolean} [lookbehind=false] If `true`, then the first capturing group of `pattern` will (effectively)
 * behave as a lookbehind group meaning that the captured text will not be part of the matched text of the new token.
 * @property {boolean} [greedy=false] Whether the token is greedy.
 * @property {string|string[]} [alias] An optional alias or list of aliases.
 * @property {Grammar} [inside] The nested grammar of this token.
 *
 * The `inside` grammar will be used to tokenize the text value of each token of this kind.
 *
 * This can be used to make nested and even recursive language definitions.
 *
 * Note: This can cause infinite recursion. Be careful when you embed different languages or even the same language into
 * each another.
 * @global
 * @public
 */

/**
 * @typedef Grammar
 * @type {Object<string, RegExp | GrammarToken | Array<RegExp | GrammarToken>>}
 * @property {Grammar} [rest] An optional grammar object that will be appended to this grammar.
 * @global
 * @public
 */

/**
 * A function which will invoked after an element was successfully highlighted.
 *
 * @callback HighlightCallback
 * @param {Element} element The element successfully highlighted.
 * @returns {void}
 * @global
 * @public
 */

/**
 * @callback HookCallback
 * @param {Object<string, any>} env The environment variables of the hook.
 * @returns {void}
 * @global
 * @public
 */
;
Prism.languages.markup = {
	'comment': {
		pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
		greedy: true
	},
	'prolog': {
		pattern: /<\?[\s\S]+?\?>/,
		greedy: true
	},
	'doctype': {
		// https://www.w3.org/TR/xml/#NT-doctypedecl
		pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
		greedy: true,
		inside: {
			'internal-subset': {
				pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
				lookbehind: true,
				greedy: true,
				inside: null // see below
			},
			'string': {
				pattern: /"[^"]*"|'[^']*'/,
				greedy: true
			},
			'punctuation': /^<!|>$|[[\]]/,
			'doctype-tag': /^DOCTYPE/i,
			'name': /[^\s<>'"]+/
		}
	},
	'cdata': {
		pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
		greedy: true
	},
	'tag': {
		pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
		greedy: true,
		inside: {
			'tag': {
				pattern: /^<\/?[^\s>\/]+/,
				inside: {
					'punctuation': /^<\/?/,
					'namespace': /^[^\s>\/:]+:/
				}
			},
			'special-attr': [],
			'attr-value': {
				pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
				inside: {
					'punctuation': [
						{
							pattern: /^=/,
							alias: 'attr-equals'
						},
						{
							pattern: /^(\s*)["']|["']$/,
							lookbehind: true
						}
					]
				}
			},
			'punctuation': /\/?>/,
			'attr-name': {
				pattern: /[^\s>\/]+/,
				inside: {
					'namespace': /^[^\s>\/:]+:/
				}
			}

		}
	},
	'entity': [
		{
			pattern: /&[\da-z]{1,8};/i,
			alias: 'named-entity'
		},
		/&#x?[\da-f]{1,8};/i
	]
};

Prism.languages.markup['tag'].inside['attr-value'].inside['entity'] =
	Prism.languages.markup['entity'];
Prism.languages.markup['doctype'].inside['internal-subset'].inside = Prism.languages.markup;

// Plugin to make entity title show the real entity, idea by Roman Komarov
Prism.hooks.add('wrap', function (env) {

	if (env.type === 'entity') {
		env.attributes['title'] = env.content.replace(/&amp;/, '&');
	}
});

Object.defineProperty(Prism.languages.markup.tag, 'addInlined', {
	/**
	 * Adds an inlined language to markup.
	 *
	 * An example of an inlined language is CSS with `<style>` tags.
	 *
	 * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
	 * case insensitive.
	 * @param {string} lang The language key.
	 * @example
	 * addInlined('style', 'css');
	 */
	value: function addInlined(tagName, lang) {
		var includedCdataInside = {};
		includedCdataInside['language-' + lang] = {
			pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
			lookbehind: true,
			inside: Prism.languages[lang]
		};
		includedCdataInside['cdata'] = /^<!\[CDATA\[|\]\]>$/i;

		var inside = {
			'included-cdata': {
				pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
				inside: includedCdataInside
			}
		};
		inside['language-' + lang] = {
			pattern: /[\s\S]+/,
			inside: Prism.languages[lang]
		};

		var def = {};
		def[tagName] = {
			pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function () { return tagName; }), 'i'),
			lookbehind: true,
			greedy: true,
			inside: inside
		};

		Prism.languages.insertBefore('markup', 'cdata', def);
	}
});
Object.defineProperty(Prism.languages.markup.tag, 'addAttribute', {
	/**
	 * Adds an pattern to highlight languages embedded in HTML attributes.
	 *
	 * An example of an inlined language is CSS with `style` attributes.
	 *
	 * @param {string} attrName The name of the tag that contains the inlined language. This name will be treated as
	 * case insensitive.
	 * @param {string} lang The language key.
	 * @example
	 * addAttribute('style', 'css');
	 */
	value: function (attrName, lang) {
		Prism.languages.markup.tag.inside['special-attr'].push({
			pattern: RegExp(
				/(^|["'\s])/.source + '(?:' + attrName + ')' + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,
				'i'
			),
			lookbehind: true,
			inside: {
				'attr-name': /^[^\s=]+/,
				'attr-value': {
					pattern: /=[\s\S]+/,
					inside: {
						'value': {
							pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
							lookbehind: true,
							alias: [lang, 'language-' + lang],
							inside: Prism.languages[lang]
						},
						'punctuation': [
							{
								pattern: /^=/,
								alias: 'attr-equals'
							},
							/"|'/
						]
					}
				}
			}
		});
	}
});

Prism.languages.html = Prism.languages.markup;
Prism.languages.mathml = Prism.languages.markup;
Prism.languages.svg = Prism.languages.markup;

Prism.languages.xml = Prism.languages.extend('markup', {});
Prism.languages.ssml = Prism.languages.xml;
Prism.languages.atom = Prism.languages.xml;
Prism.languages.rss = Prism.languages.xml;

(function (Prism) {

	// Allow only one line break
	var inner = /(?:\\.|[^\\\n\r]|(?:\n|\r\n?)(?![\r\n]))/.source;

	/**
	 * This function is intended for the creation of the bold or italic pattern.
	 *
	 * This also adds a lookbehind group to the given pattern to ensure that the pattern is not backslash-escaped.
	 *
	 * _Note:_ Keep in mind that this adds a capturing group.
	 *
	 * @param {string} pattern
	 * @returns {RegExp}
	 */
	function createInline(pattern) {
		pattern = pattern.replace(/<inner>/g, function () { return inner; });
		return RegExp(/((?:^|[^\\])(?:\\{2})*)/.source + '(?:' + pattern + ')');
	}


	var tableCell = /(?:\\.|``(?:[^`\r\n]|`(?!`))+``|`[^`\r\n]+`|[^\\|\r\n`])+/.source;
	var tableRow = /\|?__(?:\|__)+\|?(?:(?:\n|\r\n?)|(?![\s\S]))/.source.replace(/__/g, function () { return tableCell; });
	var tableLine = /\|?[ \t]*:?-{3,}:?[ \t]*(?:\|[ \t]*:?-{3,}:?[ \t]*)+\|?(?:\n|\r\n?)/.source;


	Prism.languages.markdown = Prism.languages.extend('markup', {});
	Prism.languages.insertBefore('markdown', 'prolog', {
		'front-matter-block': {
			pattern: /(^(?:\s*[\r\n])?)---(?!.)[\s\S]*?[\r\n]---(?!.)/,
			lookbehind: true,
			greedy: true,
			inside: {
				'punctuation': /^---|---$/,
				'front-matter': {
					pattern: /\S+(?:\s+\S+)*/,
					alias: ['yaml', 'language-yaml'],
					inside: Prism.languages.yaml
				}
			}
		},
		'blockquote': {
			// > ...
			pattern: /^>(?:[\t ]*>)*/m,
			alias: 'punctuation'
		},
		'table': {
			pattern: RegExp('^' + tableRow + tableLine + '(?:' + tableRow + ')*', 'm'),
			inside: {
				'table-data-rows': {
					pattern: RegExp('^(' + tableRow + tableLine + ')(?:' + tableRow + ')*$'),
					lookbehind: true,
					inside: {
						'table-data': {
							pattern: RegExp(tableCell),
							inside: Prism.languages.markdown
						},
						'punctuation': /\|/
					}
				},
				'table-line': {
					pattern: RegExp('^(' + tableRow + ')' + tableLine + '$'),
					lookbehind: true,
					inside: {
						'punctuation': /\||:?-{3,}:?/
					}
				},
				'table-header-row': {
					pattern: RegExp('^' + tableRow + '$'),
					inside: {
						'table-header': {
							pattern: RegExp(tableCell),
							alias: 'important',
							inside: Prism.languages.markdown
						},
						'punctuation': /\|/
					}
				}
			}
		},
		'code': [
			{
				// Prefixed by 4 spaces or 1 tab and preceded by an empty line
				pattern: /((?:^|\n)[ \t]*\n|(?:^|\r\n?)[ \t]*\r\n?)(?: {4}|\t).+(?:(?:\n|\r\n?)(?: {4}|\t).+)*/,
				lookbehind: true,
				alias: 'keyword'
			},
			{
				// ```optional language
				// code block
				// ```
				pattern: /^```[\s\S]*?^```$/m,
				greedy: true,
				inside: {
					'code-block': {
						pattern: /^(```.*(?:\n|\r\n?))[\s\S]+?(?=(?:\n|\r\n?)^```$)/m,
						lookbehind: true
					},
					'code-language': {
						pattern: /^(```).+/,
						lookbehind: true
					},
					'punctuation': /```/
				}
			}
		],
		'title': [
			{
				// title 1
				// =======

				// title 2
				// -------
				pattern: /\S.*(?:\n|\r\n?)(?:==+|--+)(?=[ \t]*$)/m,
				alias: 'important',
				inside: {
					punctuation: /==+$|--+$/
				}
			},
			{
				// # title 1
				// ###### title 6
				pattern: /(^\s*)#.+/m,
				lookbehind: true,
				alias: 'important',
				inside: {
					punctuation: /^#+|#+$/
				}
			}
		],
		'hr': {
			// ***
			// ---
			// * * *
			// -----------
			pattern: /(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m,
			lookbehind: true,
			alias: 'punctuation'
		},
		'list': {
			// * item
			// + item
			// - item
			// 1. item
			pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
			lookbehind: true,
			alias: 'punctuation'
		},
		'url-reference': {
			// [id]: http://example.com "Optional title"
			// [id]: http://example.com 'Optional title'
			// [id]: http://example.com (Optional title)
			// [id]: <http://example.com> "Optional title"
			pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
			inside: {
				'variable': {
					pattern: /^(!?\[)[^\]]+/,
					lookbehind: true
				},
				'string': /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
				'punctuation': /^[\[\]!:]|[<>]/
			},
			alias: 'url'
		},
		'bold': {
			// **strong**
			// __strong__

			// allow one nested instance of italic text using the same delimiter
			pattern: createInline(/\b__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__\b|\*\*(?:(?!\*)<inner>|\*(?:(?!\*)<inner>)+\*)+\*\*/.source),
			lookbehind: true,
			greedy: true,
			inside: {
				'content': {
					pattern: /(^..)[\s\S]+(?=..$)/,
					lookbehind: true,
					inside: {} // see below
				},
				'punctuation': /\*\*|__/
			}
		},
		'italic': {
			// *em*
			// _em_

			// allow one nested instance of bold text using the same delimiter
			pattern: createInline(/\b_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_\b|\*(?:(?!\*)<inner>|\*\*(?:(?!\*)<inner>)+\*\*)+\*/.source),
			lookbehind: true,
			greedy: true,
			inside: {
				'content': {
					pattern: /(^.)[\s\S]+(?=.$)/,
					lookbehind: true,
					inside: {} // see below
				},
				'punctuation': /[*_]/
			}
		},
		'strike': {
			// ~~strike through~~
			// ~strike~
			// eslint-disable-next-line regexp/strict
			pattern: createInline(/(~~?)(?:(?!~)<inner>)+\2/.source),
			lookbehind: true,
			greedy: true,
			inside: {
				'content': {
					pattern: /(^~~?)[\s\S]+(?=\1$)/,
					lookbehind: true,
					inside: {} // see below
				},
				'punctuation': /~~?/
			}
		},
		'code-snippet': {
			// `code`
			// ``code``
			pattern: /(^|[^\\`])(?:``[^`\r\n]+(?:`[^`\r\n]+)*``(?!`)|`[^`\r\n]+`(?!`))/,
			lookbehind: true,
			greedy: true,
			alias: ['code', 'keyword']
		},
		'url': {
			// [example](http://example.com "Optional title")
			// [example][id]
			// [example] [id]
			pattern: createInline(/!?\[(?:(?!\])<inner>)+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)|[ \t]?\[(?:(?!\])<inner>)+\])/.source),
			lookbehind: true,
			greedy: true,
			inside: {
				'operator': /^!/,
				'content': {
					pattern: /(^\[)[^\]]+(?=\])/,
					lookbehind: true,
					inside: {} // see below
				},
				'variable': {
					pattern: /(^\][ \t]?\[)[^\]]+(?=\]$)/,
					lookbehind: true
				},
				'url': {
					pattern: /(^\]\()[^\s)]+/,
					lookbehind: true
				},
				'string': {
					pattern: /(^[ \t]+)"(?:\\.|[^"\\])*"(?=\)$)/,
					lookbehind: true
				}
			}
		}
	});

	['url', 'bold', 'italic', 'strike'].forEach(function (token) {
		['url', 'bold', 'italic', 'strike', 'code-snippet'].forEach(function (inside) {
			if (token !== inside) {
				Prism.languages.markdown[token].inside.content.inside[inside] = Prism.languages.markdown[inside];
			}
		});
	});

	Prism.hooks.add('after-tokenize', function (env) {
		if (env.language !== 'markdown' && env.language !== 'md') {
			return;
		}

		function walkTokens(tokens) {
			if (!tokens || typeof tokens === 'string') {
				return;
			}

			for (var i = 0, l = tokens.length; i < l; i++) {
				var token = tokens[i];

				if (token.type !== 'code') {
					walkTokens(token.content);
					continue;
				}

				/*
				 * Add the correct `language-xxxx` class to this code block. Keep in mind that the `code-language` token
				 * is optional. But the grammar is defined so that there is only one case we have to handle:
				 *
				 * token.content = [
				 *     <span class="punctuation">```</span>,
				 *     <span class="code-language">xxxx</span>,
				 *     '\n', // exactly one new lines (\r or \n or \r\n)
				 *     <span class="code-block">...</span>,
				 *     '\n', // exactly one new lines again
				 *     <span class="punctuation">```</span>
				 * ];
				 */

				var codeLang = token.content[1];
				var codeBlock = token.content[3];

				if (codeLang && codeBlock &&
					codeLang.type === 'code-language' && codeBlock.type === 'code-block' &&
					typeof codeLang.content === 'string') {

					// this might be a language that Prism does not support

					// do some replacements to support C++, C#, and F#
					var lang = codeLang.content.replace(/\b#/g, 'sharp').replace(/\b\+\+/g, 'pp');
					// only use the first word
					lang = (/[a-z][\w-]*/i.exec(lang) || [''])[0].toLowerCase();
					var alias = 'language-' + lang;

					// add alias
					if (!codeBlock.alias) {
						codeBlock.alias = [alias];
					} else if (typeof codeBlock.alias === 'string') {
						codeBlock.alias = [codeBlock.alias, alias];
					} else {
						codeBlock.alias.push(alias);
					}
				}
			}
		}

		walkTokens(env.tokens);
	});

	Prism.hooks.add('wrap', function (env) {
		if (env.type !== 'code-block') {
			return;
		}

		var codeLang = '';
		for (var i = 0, l = env.classes.length; i < l; i++) {
			var cls = env.classes[i];
			var match = /language-(.+)/.exec(cls);
			if (match) {
				codeLang = match[1];
				break;
			}
		}

		var grammar = Prism.languages[codeLang];

		if (!grammar) {
			if (codeLang && codeLang !== 'none' && Prism.plugins.autoloader) {
				var id = 'md-' + new Date().valueOf() + '-' + Math.floor(Math.random() * 1e16);
				env.attributes['id'] = id;

				Prism.plugins.autoloader.loadLanguages(codeLang, function () {
					var ele = document.getElementById(id);
					if (ele) {
						ele.innerHTML = Prism.highlight(ele.textContent, Prism.languages[codeLang], codeLang);
					}
				});
			}
		} else {
			env.content = Prism.highlight(textContent(env.content), grammar, codeLang);
		}
	});

	var tagPattern = RegExp(Prism.languages.markup.tag.pattern.source, 'gi');

	/**
	 * A list of known entity names.
	 *
	 * This will always be incomplete to save space. The current list is the one used by lowdash's unescape function.
	 *
	 * @see {@link https://github.com/lodash/lodash/blob/2da024c3b4f9947a48517639de7560457cd4ec6c/unescape.js#L2}
	 */
	var KNOWN_ENTITY_NAMES = {
		'amp': '&',
		'lt': '<',
		'gt': '>',
		'quot': '"',
	};

	// IE 11 doesn't support `String.fromCodePoint`
	var fromCodePoint = String.fromCodePoint || String.fromCharCode;

	/**
	 * Returns the text content of a given HTML source code string.
	 *
	 * @param {string} html
	 * @returns {string}
	 */
	function textContent(html) {
		// remove all tags
		var text = html.replace(tagPattern, '');

		// decode known entities
		text = text.replace(/&(\w{1,8}|#x?[\da-f]{1,8});/gi, function (m, code) {
			code = code.toLowerCase();

			if (code[0] === '#') {
				var value;
				if (code[1] === 'x') {
					value = parseInt(code.slice(2), 16);
				} else {
					value = Number(code.slice(1));
				}

				return fromCodePoint(value);
			} else {
				var known = KNOWN_ENTITY_NAMES[code];
				if (known) {
					return known;
				}

				// unable to decode
				return m;
			}
		});

		return text;
	}

	Prism.languages.md = Prism.languages.markdown;

}(Prism));



/***/ }),

/***/ "./src/components/BareMDE/icons/menu_FILL0_wght400_GRAD0_opsz24.svg":
/*!**************************************************************************!*\
  !*** ./src/components/BareMDE/icons/menu_FILL0_wght400_GRAD0_opsz24.svg ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgLTk2MCA5NjAgOTYwIiB3aWR0aD0iMjQiPjxwYXRoIGQ9Ik0xMjAtMjQwdi04MGg3MjB2ODBIMTIwWm0wLTIwMHYtODBoNzIwdjgwSDEyMFptMC0yMDB2LTgwaDcyMHY4MEgxMjBaIiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPgo=";

/***/ }),

/***/ "./src/components/BareMDE/icons/arrows_locked.svg?raw":
/*!************************************************************!*\
  !*** ./src/components/BareMDE/icons/arrows_locked.svg?raw ***!
  \************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M8.5 8.5L7 7L12 2L17 7L15.5 8.5L13 6V18.5L15.5 16L17 17.5L12 22.5L7 17.5L8.5 16L11 18.5V6L8.5 8.5Z\" fill=\"white\"/>\n</svg>\n";

/***/ }),

/***/ "./src/components/BareMDE/icons/formatting/format_bold_FILL0_wght400_GRAD0_opsz24.svg?raw":
/*!************************************************************************************************!*\
  !*** ./src/components/BareMDE/icons/formatting/format_bold_FILL0_wght400_GRAD0_opsz24.svg?raw ***!
  \************************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 -960 960 960\" ><path fill=\"white\" d=\"M272-200v-560h221q65 0 120 40t55 111q0 51-23 78.5T602-491q25 11 55.5 41t30.5 90q0 89-65 124.5T501-200H272Zm121-112h104q48 0 58.5-24.5T566-372q0-11-10.5-35.5T494-432H393v120Zm0-228h93q33 0 48-17t15-38q0-24-17-39t-44-15h-95v109Z\"/></svg>\n";

/***/ }),

/***/ "./src/components/BareMDE/icons/formatting/format_italic_FILL0_wght400_GRAD0_opsz24.svg?raw":
/*!**************************************************************************************************!*\
  !*** ./src/components/BareMDE/icons/formatting/format_italic_FILL0_wght400_GRAD0_opsz24.svg?raw ***!
  \**************************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 -960 960 960\" ><path fill=\"white\" d=\"M200-200v-100h160l120-360H320v-100h400v100H580L460-300h140v100H200Z\"/></svg>\n";

/***/ }),

/***/ "./src/components/BareMDE/icons/formatting/format_strikethrough_FILL0_wght400_GRAD0_opsz24.svg?raw":
/*!*********************************************************************************************************!*\
  !*** ./src/components/BareMDE/icons/formatting/format_strikethrough_FILL0_wght400_GRAD0_opsz24.svg?raw ***!
  \*********************************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 -960 960 960\" ><path fill=\"white\" d=\"M80-400v-80h800v80H80Zm340-160v-120H200v-120h560v120H540v120H420Zm0 400v-160h120v160H420Z\"/></svg>\n";

/***/ }),

/***/ "./src/components/BareMDE/icons/formatting/link_FILL0_wght400_GRAD0_opsz24.svg?raw":
/*!*****************************************************************************************!*\
  !*** ./src/components/BareMDE/icons/formatting/link_FILL0_wght400_GRAD0_opsz24.svg?raw ***!
  \*****************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 -960 960 960\" ><path fill=\"white\" d=\"M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z\"/></svg>\n";

/***/ }),

/***/ "./src/components/BareMDE/icons/fullscreen_FILL0_wght400_GRAD0_opsz24.svg?raw":
/*!************************************************************************************!*\
  !*** ./src/components/BareMDE/icons/fullscreen_FILL0_wght400_GRAD0_opsz24.svg?raw ***!
  \************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"24\" width=\"24\"><path fill=\"#ffffff\" d=\"M5 19v-5h2v3h3v2Zm0-9V5h5v2H7v3Zm9 9v-2h3v-3h2v5Zm3-9V7h-3V5h5v5Z\"/></svg>\n";

/***/ }),

/***/ "./src/components/BareMDE/icons/fullscreen_exit_FILL0_wght400_GRAD0_opsz24.svg?raw":
/*!*****************************************************************************************!*\
  !*** ./src/components/BareMDE/icons/fullscreen_exit_FILL0_wght400_GRAD0_opsz24.svg?raw ***!
  \*****************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"24\" width=\"24\"><path fill=\"#ffffff\" d=\"M8 19v-3H5v-2h5v5Zm6 0v-5h5v2h-3v3Zm-9-9V8h3V5h2v5Zm9 0V5h2v3h3v2Z\"/></svg>\n";

/***/ }),

/***/ "./src/components/BareMDE/icons/preview_FILL0_wght400_GRAD0_opsz24.svg?raw":
/*!*********************************************************************************!*\
  !*** ./src/components/BareMDE/icons/preview_FILL0_wght400_GRAD0_opsz24.svg?raw ***!
  \*********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"24\" width=\"24\"><path fill=\"#ffffff\" d=\"M5 21q-.825 0-1.413-.587Q3 19.825 3 19V5q0-.825.587-1.413Q4.175 3 5 3h14q.825 0 1.413.587Q21 4.175 21 5v14q0 .825-.587 1.413Q19.825 21 19 21Zm0-2h14V7H5v12Zm7-2q-2.05 0-3.662-1.113Q6.725 14.775 6 13q.725-1.775 2.338-2.887Q9.95 9 12 9t3.663 1.113Q17.275 11.225 18 13q-.725 1.775-2.337 2.887Q14.05 17 12 17Zm0-1.5q1.4 0 2.55-.663 1.15-.662 1.8-1.837-.65-1.175-1.8-1.838Q13.4 10.5 12 10.5t-2.55.662Q8.3 11.825 7.65 13q.65 1.175 1.8 1.837 1.15.663 2.55.663Zm0-1q-.625 0-1.062-.438Q10.5 13.625 10.5 13t.438-1.062Q11.375 11.5 12 11.5t1.062.438q.438.437.438 1.062t-.438 1.062q-.437.438-1.062.438Z\"/></svg>\n";

/***/ }),

/***/ "./src/components/BareMDE/icons/preview_big_on_min.svg?raw":
/*!*****************************************************************!*\
  !*** ./src/components/BareMDE/icons/preview_big_on_min.svg?raw ***!
  \*****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<svg version=\"1.1\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"m12 16c1.25 0 2.3127-0.43733 3.188-1.312 0.87467-0.87533 1.312-1.938 1.312-3.188s-0.43733-2.3127-1.312-3.188c-0.87533-0.87467-1.938-1.312-3.188-1.312s-2.3127 0.43733-3.188 1.312c-0.87467 0.87533-1.312 1.938-1.312 3.188s0.43733 2.3127 1.312 3.188c0.87533 0.87467 1.938 1.312 3.188 1.312zm0 3c-2.4333 0-4.65-0.67933-6.65-2.038-2-1.358-3.45-3.1787-4.35-5.462 0.9-2.2833 2.35-4.1043 4.35-5.463 2-1.358 4.2167-2.037 6.65-2.037 2.4333 0 4.65 0.679 6.65 2.037 2 1.3587 3.45 3.1797 4.35 5.463-0.9 2.2833-2.35 4.104-4.35 5.462-2 1.3587-4.2167 2.038-6.65 2.038zm0-2c1.8833 0 3.6127-0.496 5.188-1.488 1.5747-0.99133 2.7787-2.3287 3.612-4.012-0.83333-1.6833-2.0373-3.021-3.612-4.013-1.5753-0.99133-3.3047-1.487-5.188-1.487s-3.6127 0.49567-5.188 1.487c-1.5747 0.992-2.7787 2.3297-3.612 4.013 0.83333 1.6833 2.0373 3.0207 3.612 4.012 1.5753 0.992 3.3047 1.488 5.188 1.488z\" fill=\"#fff\"/>\n</svg>\n";

/***/ }),

/***/ "./src/components/BareMDE/icons/save_white.svg?raw":
/*!*********************************************************!*\
  !*** ./src/components/BareMDE/icons/save_white.svg?raw ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"24\" width=\"24\"><path fill=\"white\" d=\"M5 21q-.825 0-1.413-.587Q3 19.825 3 19V5q0-.825.587-1.413Q4.175 3 5 3h12l4 4v5.4l-2 2V7.825L16.175 5H5v14h9.4l-2 2Zm7-3q1.25 0 2.125-.875T15 15q0-1.25-.875-2.125T12 12q-1.25 0-2.125.875T9 15q0 1.25.875 2.125T12 18Zm-6-8h9V6H6Zm9 13v-1.775l5-4.975 1.75 1.775L16.775 23Zm7.4-5.65-1.775-1.75.85-.85q.15-.15.362-.15.213 0 .363.15l1.05 1.05q.15.15.15.35 0 .2-.15.35ZM5 19V5v9.4Z\"/></svg>\n";

/***/ }),

/***/ "./src/components/BareMDE/icons/spellcheck_FILL1_wght400_GRAD0_opsz24.svg?raw":
/*!************************************************************************************!*\
  !*** ./src/components/BareMDE/icons/spellcheck_FILL1_wght400_GRAD0_opsz24.svg?raw ***!
  \************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"24\" width=\"24\"><path fill=\"#ffffff\" d=\"m14.1 22-4.25-4.25 1.4-1.4 2.85 2.85 5.65-5.65 1.4 1.4ZM3 16 7.85 3h2.35l4.85 13h-2.3l-1.15-3.3H6.35L5.2 16Zm4.05-5.2h3.9l-1.9-5.4h-.1Z\"/></svg>\n";

/***/ }),

/***/ "./src/components/BareMDE/icons/spellcheck_active_minified.svg?raw":
/*!*************************************************************************!*\
  !*** ./src/components/BareMDE/icons/spellcheck_active_minified.svg?raw ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<svg version=\"1.1\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" xmlns=\"http://www.w3.org/2000/svg\"> <path d=\"m14.1 22-4.25-4.25 1.4-1.4 2.85 2.85 5.65-5.65 1.4 1.4z\" fill=\"orangered\"/>\n<path d=\"m7.05 10.8h3.9l-1.9-5.4h-0.1zm-4.05 5.2 4.85-13h2.35l4.85 13h-2.3l-1.15-3.3h-5.25l-1.15 3.3z\" fill=\"#fff\"/>\n</svg>\n";

/***/ }),

/***/ "./src/components/BareMDE/icons/swap_vert_FILL0_wght400_GRAD0_opsz24.svg?raw":
/*!***********************************************************************************!*\
  !*** ./src/components/BareMDE/icons/swap_vert_FILL0_wght400_GRAD0_opsz24.svg?raw ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"24\" width=\"24\"><path fill=\"#ffffff\" d=\"M8 13V5.825L5.425 8.4 4 7l5-5 5 5-1.425 1.4L10 5.825V13Zm7 9-5-5 1.425-1.4L14 18.175V11h2v7.175l2.575-2.575L20 17Z\"/></svg>\n";

/***/ }),

/***/ "./src/components/BareMDE/icons/visibility_FILL0_wght400_GRAD0_opsz24.svg?raw":
/*!************************************************************************************!*\
  !*** ./src/components/BareMDE/icons/visibility_FILL0_wght400_GRAD0_opsz24.svg?raw ***!
  \************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"24\" width=\"24\"><path fill=\"#ffffff\" d=\"M12 16q1.875 0 3.188-1.312Q16.5 13.375 16.5 11.5q0-1.875-1.312-3.188Q13.875 7 12 7q-1.875 0-3.188 1.312Q7.5 9.625 7.5 11.5q0 1.875 1.312 3.188Q10.125 16 12 16Zm0-1.8q-1.125 0-1.912-.788Q9.3 12.625 9.3 11.5t.788-1.913Q10.875 8.8 12 8.8t1.913.787q.787.788.787 1.913t-.787 1.912q-.788.788-1.913.788Zm0 4.8q-3.65 0-6.65-2.038-3-2.037-4.35-5.462 1.35-3.425 4.35-5.463Q8.35 4 12 4q3.65 0 6.65 2.037 3 2.038 4.35 5.463-1.35 3.425-4.35 5.462Q15.65 19 12 19Zm0-7.5Zm0 5.5q2.825 0 5.188-1.488Q19.55 14.025 20.8 11.5q-1.25-2.525-3.612-4.013Q14.825 6 12 6 9.175 6 6.812 7.487 4.45 8.975 3.2 11.5q1.25 2.525 3.612 4.012Q9.175 17 12 17Z\"/></svg>\n";

/***/ }),

/***/ "preact":
/*!*************************!*\
  !*** external "preact" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_preact__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"BareMDE": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*****************************************!*\
  !*** ./src/components/BareMDE/index.js ***!
  \*****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BareMDE)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "preact");
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(preact__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var htm_preact__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! htm/preact */ "./node_modules/htm/preact/index.module.js");
/* harmony import */ var codejar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! codejar */ "./node_modules/codejar/codejar.js");
/* harmony import */ var _Menu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Menu */ "./src/components/BareMDE/Menu.js");
/* harmony import */ var _TButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./TButton */ "./src/components/BareMDE/TButton.js");
/* harmony import */ var _icons_preview_FILL0_wght400_GRAD0_opsz24_svg_raw__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./icons/preview_FILL0_wght400_GRAD0_opsz24.svg?raw */ "./src/components/BareMDE/icons/preview_FILL0_wght400_GRAD0_opsz24.svg?raw");
/* harmony import */ var _icons_preview_big_on_min_svg_raw__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./icons/preview_big_on_min.svg?raw */ "./src/components/BareMDE/icons/preview_big_on_min.svg?raw");
/* harmony import */ var _icons_visibility_FILL0_wght400_GRAD0_opsz24_svg_raw__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./icons/visibility_FILL0_wght400_GRAD0_opsz24.svg?raw */ "./src/components/BareMDE/icons/visibility_FILL0_wght400_GRAD0_opsz24.svg?raw");
/* harmony import */ var _icons_fullscreen_FILL0_wght400_GRAD0_opsz24_svg_raw__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./icons/fullscreen_FILL0_wght400_GRAD0_opsz24.svg?raw */ "./src/components/BareMDE/icons/fullscreen_FILL0_wght400_GRAD0_opsz24.svg?raw");
/* harmony import */ var _icons_fullscreen_exit_FILL0_wght400_GRAD0_opsz24_svg_raw__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./icons/fullscreen_exit_FILL0_wght400_GRAD0_opsz24.svg?raw */ "./src/components/BareMDE/icons/fullscreen_exit_FILL0_wght400_GRAD0_opsz24.svg?raw");
/* harmony import */ var _icons_spellcheck_active_minified_svg_raw__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./icons/spellcheck_active_minified.svg?raw */ "./src/components/BareMDE/icons/spellcheck_active_minified.svg?raw");
/* harmony import */ var _icons_spellcheck_FILL1_wght400_GRAD0_opsz24_svg_raw__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./icons/spellcheck_FILL1_wght400_GRAD0_opsz24.svg?raw */ "./src/components/BareMDE/icons/spellcheck_FILL1_wght400_GRAD0_opsz24.svg?raw");
/* harmony import */ var _icons_arrows_locked_svg_raw__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./icons/arrows_locked.svg?raw */ "./src/components/BareMDE/icons/arrows_locked.svg?raw");
/* harmony import */ var _icons_swap_vert_FILL0_wght400_GRAD0_opsz24_svg_raw__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./icons/swap_vert_FILL0_wght400_GRAD0_opsz24.svg?raw */ "./src/components/BareMDE/icons/swap_vert_FILL0_wght400_GRAD0_opsz24.svg?raw");
/* harmony import */ var _icons_save_white_svg_raw__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./icons/save_white.svg?raw */ "./src/components/BareMDE/icons/save_white.svg?raw");
/* harmony import */ var _icons_formatting_format_bold_FILL0_wght400_GRAD0_opsz24_svg_raw__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./icons/formatting/format_bold_FILL0_wght400_GRAD0_opsz24.svg?raw */ "./src/components/BareMDE/icons/formatting/format_bold_FILL0_wght400_GRAD0_opsz24.svg?raw");
/* harmony import */ var _icons_formatting_format_italic_FILL0_wght400_GRAD0_opsz24_svg_raw__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./icons/formatting/format_italic_FILL0_wght400_GRAD0_opsz24.svg?raw */ "./src/components/BareMDE/icons/formatting/format_italic_FILL0_wght400_GRAD0_opsz24.svg?raw");
/* harmony import */ var _icons_formatting_link_FILL0_wght400_GRAD0_opsz24_svg_raw__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./icons/formatting/link_FILL0_wght400_GRAD0_opsz24.svg?raw */ "./src/components/BareMDE/icons/formatting/link_FILL0_wght400_GRAD0_opsz24.svg?raw");
/* harmony import */ var _icons_formatting_format_strikethrough_FILL0_wght400_GRAD0_opsz24_svg_raw__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./icons/formatting/format_strikethrough_FILL0_wght400_GRAD0_opsz24.svg?raw */ "./src/components/BareMDE/icons/formatting/format_strikethrough_FILL0_wght400_GRAD0_opsz24.svg?raw");




__webpack_require__(/*! ./prism/prism_fixed.scss */ "./src/components/BareMDE/prism/prism_fixed.scss");
__webpack_require__(/*! ./mded.scss */ "./src/components/BareMDE/mded.scss")
const Prism =  __webpack_require__(/*! ./prism/prism.js */ "./src/components/BareMDE/prism/prism.js")

;

//
//   ICONS
//
 
//full preview


//fullscreen


//spellcheck


//sync scroll


//save

//formatting





class BareMDE extends preact__WEBPACK_IMPORTED_MODULE_0__.Component{
  constructor(props){
     super(props);
     this.previewThrottled = false;
     this.scrollThrottled = false;
     this.saveThrottled = false;
     this.componentContainer = (0,preact__WEBPACK_IMPORTED_MODULE_0__.createRef)();
     this.codeJarContainer = (0,preact__WEBPACK_IMPORTED_MODULE_0__.createRef)();
     this.previewContainer = (0,preact__WEBPACK_IMPORTED_MODULE_0__.createRef)();
     this.previewFrame = (0,preact__WEBPACK_IMPORTED_MODULE_0__.createRef)();
     this.state ={ 
       fullscreen: props.fullscreen,
       showPreview: props.showPreview,
       fullPreview: false,
       content: props.content,
       spellCheck: props.spellCheck,
       syncScroll: true,
       modified: props.modified
     }
     this.surroundSelection = this.surroundSelection.bind(this);
     this.handleKey= this.handleKey.bind(this);
     this.togglePreview = this.togglePreview.bind(this);
     this.toggleFullPreview = this.toggleFullPreview.bind(this);
     this.toggleFullscreen = this.toggleFullscreen.bind(this);
     this.toggleSpellcheck = this.toggleSpellcheck.bind(this);
     this.toggleSyncScroll = this.toggleSyncScroll.bind(this);
     this.doPreview = this.doPreview.bind(this);
     this.saveFile = this.saveFile.bind(this);
     this.syncPreviewScroll = this.syncPreviewScroll.bind(this);
     this.editorCommands = {
       "bold": ()=>this.surroundSelection("**","**"),
       "italic": ()=>this.surroundSelection("_","_"),
       "strike": ()=>this.surroundSelection("~~","~~"),
       "link": ()=>{ let url=prompt("Enter URL:" , "https://") ;
       this.surroundSelection("[", "](" + ( url || "" ) + ")")
       }
     }
  }
  shouldComponentUpdate(p , s){
     
     //if content is reset, we have to reset.
     this.pos = this.jar.save();
     if(this.props.contentId!==p.contentId){
         console.log("Update content...")
         
         this.jar.updateCode(p.content);
         // this.modified = p.modified;
         this.doPreview();
     }

    if( s.syncScroll && !this.state.syncScroll ){
       this.syncPreviewScroll(true);
    }
     return true;
  }

  compomemtDidUpdate(oldS , oldP){
     // console.log("Component updated")
    // console.log("Bare MDE updated" , this.jar.save())
    // if component updated,
    // but text is not,
    // it means, we have to return cursor
    // to last known position
    if(oldP.content ==this.props.content){ 
      this.pos && this.jar.restore(this.pos) ; 
      this.pos = null ; // #FIXME
    } else{
      // console.log("Update JAR") 
      this.jar.updateCode(this.props.content); //???

    }
     // console.log("Component Did Update")
      this.doPreview(true);
    
  }
  componentWillUnmount(){

    window.removeEventListener("resize", this.doPreview)
  }
  componentDidMount(){
    this.jar = (0,codejar__WEBPACK_IMPORTED_MODULE_2__.CodeJar)(this.codeJarContainer.current , 
    (e)=>Prism.highlightElement(e,false,null),
    {
      preserveIdent: true,
      spellcheck: this.state.spellCheck
    }

    );
    this.jar.updateCode(this.props.content);
    this.doPreview();
    const updJar =  ()=>{
      this.pos = this.jar.save();
      typeof this.props.onUpdate==='function' && this.props.onUpdate(this.jar.toString());
      this.doPreview();
    } ;
    this.jar.onUpdate( updJar );
    //Chrome bug(?) fix (?):
    this.codeJarContainer.current.focus();
    window.addEventListener("resize", this.doPreview)
    this.codeJarContainer.current.addEventListener("keydown" , this.handleKey);
  }

  fireCommand(command){
   this.editorCommands[command]();
  }

  handleKey(evt){ 
     if(!evt.ctrlKey){ return }
      // console.log(evt.code);
      if(evt.code==='KeyB'){this.fireCommand("bold")}
      if(evt.code==='KeyI'){this.fireCommand("italic")}
      if(evt.code==='KeyL'){this.fireCommand("link")}
      if(evt.code==='KeyD'){this.fireCommand("strike")}
  }


  insertAt(txt , pos , what){
    //FIX: if string starts with newline, insert after newline.
    return txt.substring(0,pos) + what + txt.substring(pos);
  }

  surroundSelection( before , after ){
    const s = window.getSelection();
    if(s.isCollapsed){ console.error("collapsed selection" ) ; return }
    const r = s.getRangeAt(0);
    if(!r){ return }
    //check if selection is inside our editor
    if(
      this.codeJarContainer.current.contains(r.commonAncestorContainer) ||
      this.codeJarContainer.current===r.commonAncestorContainer 
    ){
      // console.log(s , r);
      const p = this.jar.save();
      if(p.dir==='->'){
        p.end+=( after.length + before.length);
      }else{
        
        p.start+=( after.length + before.length);
      }
      const start = r.startContainer;
      const startOf = r.startOffset;
      const end = r.endContainer;
      const endOf = r.endOffset;
      // this must go first!
      end.textContent = this.insertAt(
         end.textContent, 
         endOf, 
         after)

      start.textContent = this.insertAt(
         start.textContent, 
         startOf, 
         before)
      //update editor
      this.jar.updateCode(this.jar.toString());
      this.jar.restore(p);
      this.doPreview(true)
      return;
    }else{
      console.error("wrong selection");
    }

  }


  async syncPreviewScroll(force){
    if(!this.state.syncScroll && !force ){ return }
    if(!this.state.showPreview){ return }
    if(this.scrollThrottled){ return }

    this.scrollThrottled = true;
    const doScroll = ()=>{
      //preview height
      const previewFullH = this.previewContainer.current.scrollHeight;
      //editor height
      const editorFullH = this.codeJarContainer.current.scrollHeight;
      const editorScrolled = this.codeJarContainer.current.scrollTop;

      const elementHeight = this.previewContainer.current.getBoundingClientRect().height;
      //if one of them can not scroll, do nothing
      if(previewFullH<=elementHeight || editorFullH<=elementHeight ){ return }

      const editorRatio = editorScrolled/( editorFullH - elementHeight );


      const scrollPreviewTo =  ( previewFullH-elementHeight ) * editorRatio;
      this.previewContainer.current.scrollTo(
        {top: scrollPreviewTo , 
          left:0 , 
          behavior: "smooth"}
      );
    }
    doScroll()

    window.setTimeout( ()=>{ this.scrollThrottled=false ; doScroll() } , 50 );

  }
  

  toggleSpellcheck(){

    this.jar.updateOptions({spellcheck: !this.state.spellCheck});
    this.codeJarContainer.current.spellcheck = !this.state.spellCheck;
    this.setState({spellCheck: !this.state.spellCheck})
  }

  toggleFullscreen(){
     // console.log("Toggle fullscreen");
     
     const v = !this.state.fullscreen;
     if(v){
     typeof this.props.onEnterFullscreen === 'function' && this.props.onEnterFullscreen();
     this.componentContainer.current.style.zIndex = this.props.fullscreenZIndex 
     if(this.props.trueFullscreen && document.fullscreenEnabled){ this.componentContainer.current.requestFullscreen() }
     }
     else{ 
       typeof this.props.onExitFullscreen === 'function' && this.props.onExitFullscreen();
       this.componentContainer.current.style.zIndex = "unset"
       if(this.props.trueFullscreen && document.fullscreenEnabled){ document.exitFullscreen()}
       }
     try {
        this.setState({fullscreen: v});
     }catch(e){
       console.error("Error found!" , e);
     }
     // this.doPreview();
  }
  togglePreview(){
     
     const v = !this.state.showPreview;
     const ns = {showPreview: v}

     if(this.state.fullPreview){
       this.setState({fullPreview: false});
       return;
     }
     this.setState(ns);
  }
  toggleFullPreview(){
    
    if( typeof this.props.externalPreview == 'function' ){ 
        return this.props.externalPreview();
    } 
     const v = !this.state.fullPreview;
     this.setState({fullPreview: v}); 
  }
  toggleSyncScroll(){
     
     const v = !this.state.syncScroll;
     const ns = {syncScroll: v}
     this.setState(ns);
  }
  saveFile(){
    if(this.saveThrottled){ return }
    if( typeof this.props.save==='function' ){
      this.props.save(this.jar.toString()) 
      this.saveThrottled = true;
      window.setTimeout(()=>{ this.saveThrottled=false } , 200);
    };

  }
  async doPreview(force){
    //if preview is hidden and we do not forced to update it, return
    if(!this.state.showPreview&&!force){  return }
    if(!this.previewFrame.current){ console.log("no iframe") ;console.log() }

    const redraw = ()=>{
       if(!this.previewFrame.current.contentWindow){ return } 
      const frameDoc = this.previewFrame.current.contentWindow.document;
      const content =  this.props.render(this.jar.toString());
      // frameDoc.documentElement.outerHTML = content;
      frameDoc.open();
      frameDoc.write(content)
      frameDoc.close();

      if(typeof this.props.imageRewriter==='function'){
        const imgs = frameDoc.querySelectorAll("*[src]");
        imgs.forEach(i=>{
          if(i.getAttribute("src").match(/^http(s)?:/)){
            return;
          }
          i.src = this.props.imageRewriter(i.getAttribute( "src" ));
        })
      }
      const dHeight = Math.max( //need more tests in Chrome
        // frameDoc.body.scrollHeight,
        frameDoc.body.offsetHeight,
        frameDoc.documentElement.scrollHeight,
        frameDoc.documentElement.offsetHeight,
      )
       // console.log(

       //   frameDoc.body.scrollHeight,
       //   frameDoc.body.offsetHeight,
       //   frameDoc.documentElement.scrollHeight,
       //   frameDoc.documentElement.offsetHeight,
       // )
      this.previewFrame.current.style.height = dHeight+"px";
      this.syncPreviewScroll();
    }

    if(!this.previewThrottled){
      redraw();
      this.previewThrottled = true;
      window.setTimeout(()=>{ this.previewThrottled=false; redraw()} , 300);

    }
  }

  render(){
     // fix cursor position on render
     if(this.pos)
     {
       this.jar.restore(this.pos)
     }

    // buttons:
    // toggle preview , toggle fullscreen , <preview only?> , save

    return (0,htm_preact__WEBPACK_IMPORTED_MODULE_1__.html)`<div class="BareMDE 
       ${ this.state.fullscreen ? 'fullscreen' : 'windowed' }
       ${ this.state.showPreview ? 'preview' : 'noPreview' }
       ${ this.state.fullPreview ? 'fullPreview' : '' }
       "
       ref=${this.componentContainer}
       style="max-height:${ this.state.fullscreen ? '100%' : this.props.maxHeight};z-index:${ this.state.fullscreen ? this.props.fullscreenZIndex : "initial" }"
    >
      <div class="toolbar top 
       ${ this.state.fullscreen ? 'fullscreen' : 'windowed' }
       ${ this.state.showPreview ? 'preview' : 'noPreview' }
       ${ this.props.modified ? 'modified' : '' }
      ">
         <${_Menu__WEBPACK_IMPORTED_MODULE_3__["default"]} 
         title=${this.props.menuTitle || "Additional functions"}
         zIndex=${this.state.fullscreen ? this.props.fullscreenZIndex+100 : "initial"}
         items=${this.props.menuItems}/>

         <${_TButton__WEBPACK_IMPORTED_MODULE_4__["default"]}
         isOn=${true}
         customClass="formatting"
         svg=${_icons_formatting_format_bold_FILL0_wght400_GRAD0_opsz24_svg_raw__WEBPACK_IMPORTED_MODULE_15__}
         onClick=${()=>this.fireCommand("bold")}
         />

         <${_TButton__WEBPACK_IMPORTED_MODULE_4__["default"]}
         customClass="formatting"
         isOn=${true}
         svg=${_icons_formatting_format_italic_FILL0_wght400_GRAD0_opsz24_svg_raw__WEBPACK_IMPORTED_MODULE_16__}
         onClick=${()=>this.fireCommand("italic")}
         />

         <${_TButton__WEBPACK_IMPORTED_MODULE_4__["default"]}
         customClass="formatting"
         isOn=${true}
         svg=${_icons_formatting_format_strikethrough_FILL0_wght400_GRAD0_opsz24_svg_raw__WEBPACK_IMPORTED_MODULE_18__}
         onClick=${()=>this.fireCommand("strike")}
         />

         <${_TButton__WEBPACK_IMPORTED_MODULE_4__["default"]}
         customClass="formatting"
         isOn=${true}
         svg=${_icons_formatting_link_FILL0_wght400_GRAD0_opsz24_svg_raw__WEBPACK_IMPORTED_MODULE_17__}
         onClick=${()=>this.fireCommand("link")}
         />

         <div class="divider" />


         <${_TButton__WEBPACK_IMPORTED_MODULE_4__["default"]} 
         isOn=${this.state.showPreview}
         svg=${_icons_preview_FILL0_wght400_GRAD0_opsz24_svg_raw__WEBPACK_IMPORTED_MODULE_5__}
         title="Toggle Preview" 
         onClick=${this.togglePreview} 
         />


         <${_TButton__WEBPACK_IMPORTED_MODULE_4__["default"]}
         isOn=${this.state.fullPreview}
         svg=${_icons_preview_big_on_min_svg_raw__WEBPACK_IMPORTED_MODULE_6__}
         svgOff=${_icons_visibility_FILL0_wght400_GRAD0_opsz24_svg_raw__WEBPACK_IMPORTED_MODULE_7__}
         title=${this.props.externalPreviewTitle || "Full width preview"} 
         onClick=${this.toggleFullPreview}
         />

        <${_TButton__WEBPACK_IMPORTED_MODULE_4__["default"]}
        isOn=${ this.state.fullscreen }
        svg=${_icons_fullscreen_exit_FILL0_wght400_GRAD0_opsz24_svg_raw__WEBPACK_IMPORTED_MODULE_9__}
        svgOff=${_icons_fullscreen_FILL0_wght400_GRAD0_opsz24_svg_raw__WEBPACK_IMPORTED_MODULE_8__}
        title=${this.state.fullscreen ? "Exit fullscreen" : "Go fullscreen"}
        onClick=${this.toggleFullscreen}
        />

        <${_TButton__WEBPACK_IMPORTED_MODULE_4__["default"]}
        isOn=${ this.state.spellCheck }
        svg=${_icons_spellcheck_active_minified_svg_raw__WEBPACK_IMPORTED_MODULE_10__}
        svgOff=${_icons_spellcheck_FILL1_wght400_GRAD0_opsz24_svg_raw__WEBPACK_IMPORTED_MODULE_11__}
        title=${this.state.spellCheck ? "Turn spellchek off" : "Turn spellcheck on"}
        onClick=${this.toggleSpellcheck}
        />

        <${_TButton__WEBPACK_IMPORTED_MODULE_4__["default"]}
        isOn=${ this.state.syncScroll }
        svg=${_icons_arrows_locked_svg_raw__WEBPACK_IMPORTED_MODULE_12__}
        svgOff=${_icons_swap_vert_FILL0_wght400_GRAD0_opsz24_svg_raw__WEBPACK_IMPORTED_MODULE_13__}
        title=${this.state.syncScroll ? "Turn scroll sync off" : "Turn scroll sync on"}
        onClick=${this.toggleSyncScroll}
        />

        <${_TButton__WEBPACK_IMPORTED_MODULE_4__["default"]}
        svg=${_icons_save_white_svg_raw__WEBPACK_IMPORTED_MODULE_14__}
        title=${ "Save html file" }
        onClick=${this.saveFile}
        customClass=${ this.props.modified ? "alerted" : "" }
        />

        </div>

         <div class="workArea">
         <div  
              class="codeJar language-md" 
              ref=${this.codeJarContainer} 
              onscroll=${()=>this.syncPreviewScroll()}>
              </div>
              <div 
              class="preview ${this.props.previewClass}" 
              ref=${this.previewContainer}><iframe style="min-height:100%" ref=${this.previewFrame}></iframe>
              </div>
      </div>
    </div>`
  }
}


BareMDE.defaultProps = {
   render: (m)=>`<html><head></head><body><div style='color:navyblue'>${m}</div></body></html>`,
   onUpdate: ()=>console.log("Editor updated" ),
   save: (c)=>console.log("Dummy save function" , c.substring(0,200)+"..."),
   content: "write here", //text to display on mount
   contentId: null, //id of content to track the changes
   modified: false,
   indicateChanges: true,
   previewClass: "markdownPreviewArea",
   fullscreen: false,
   onEnterFullscreen: ()=>document.body.style.overflow="hidden",
   onExitFullscreen: ()=>document.body.style.overflow="initial",
   trueFullscreen: false,
   showPreview: true,
   spellCheck: true,
   fullscreenZIndex: 1001,
   externalPreview: null,
   externalPreviewTitle: null,
   imageRewriter: null,
   maxHeight: '400px',
   disable: []

}

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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dkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDLGdDQUFnQztBQUNoQyxnQ0FBZ0M7QUFDaEMsa0NBQWtDO0FBQ2xDLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqZEE7QUFDZ0g7QUFDakI7QUFDTztBQUN0Ryw0Q0FBNEMsc0xBQThEO0FBQzFHLDhCQUE4QixtRkFBMkIsQ0FBQyw0RkFBcUM7QUFDL0YseUNBQXlDLHNGQUErQjtBQUN4RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixtQ0FBbUM7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxPQUFPLG1HQUFtRyxVQUFVLFdBQVcsV0FBVyxXQUFXLFdBQVcsVUFBVSxXQUFXLFVBQVUsV0FBVyxVQUFVLFVBQVUsS0FBSyxLQUFLLFVBQVUsVUFBVSxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsV0FBVyxVQUFVLFVBQVUsS0FBSyxLQUFLLFdBQVcsS0FBSyxLQUFLLFVBQVUsV0FBVyxVQUFVLFVBQVUsV0FBVyxXQUFXLFdBQVcsVUFBVSxVQUFVLFVBQVUsV0FBVyxXQUFXLFdBQVcsVUFBVSxLQUFLLEtBQUssV0FBVyxVQUFVLFVBQVUsVUFBVSxXQUFXLFVBQVUsS0FBSyxLQUFLLFVBQVUsVUFBVSxVQUFVLFVBQVUsV0FBVyxLQUFLLEtBQUssV0FBVyxXQUFXLFdBQVcsVUFBVSxVQUFVLFdBQVcsV0FBVyxXQUFXLFdBQVcsS0FBSyxLQUFLLFdBQVcsV0FBVyxVQUFVLFdBQVcsV0FBVyxVQUFVLFdBQVcsVUFBVSxLQUFLLEtBQUssV0FBVyxLQUFLLEtBQUssV0FBVyxXQUFXLEtBQUssS0FBSyxXQUFXLFVBQVUsS0FBSyxLQUFLLFdBQVcsVUFBVSxLQUFLLEtBQUssV0FBVyxLQUFLLEtBQUssVUFBVSxVQUFVLFVBQVUsVUFBVSxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsS0FBSyxLQUFLLFVBQVUsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFVBQVUsVUFBVSxXQUFXLFVBQVUsV0FBVyxXQUFXLFdBQVcsV0FBVyxLQUFLLEtBQUssVUFBVSxXQUFXLEtBQUssS0FBSyxXQUFXLFdBQVcsS0FBSyxLQUFLLFVBQVUsS0FBSyxLQUFLLFdBQVcsS0FBSyxLQUFLLFdBQVcsS0FBSyxLQUFLLFVBQVUsS0FBSyxLQUFLLFVBQVUsV0FBVyxVQUFVLFVBQVUsVUFBVSxVQUFVLFdBQVcsV0FBVyxXQUFXLFdBQVcsVUFBVSxVQUFVLEtBQUssS0FBSyxVQUFVLFVBQVUsVUFBVSxXQUFXLFVBQVUsVUFBVSxXQUFXLFdBQVcsS0FBSyxLQUFLLFVBQVUsS0FBSyxLQUFLLFdBQVcsS0FBSyxLQUFLLFdBQVcsV0FBVyxXQUFXLFdBQVcsS0FBSyxLQUFLLFdBQVcsV0FBVyxVQUFVLFdBQVcsVUFBVSxVQUFVLFVBQVUsV0FBVyxVQUFVLFVBQVUsTUFBTSxNQUFNLFdBQVcsVUFBVSxVQUFVLFVBQVUsVUFBVSxXQUFXLFVBQVUsVUFBVSxNQUFNLE1BQU0sVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLFdBQVcsTUFBTSxNQUFNLFVBQVUsV0FBVyxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sV0FBVyxVQUFVLFVBQVUsTUFBTSxNQUFNLFVBQVUsT0FBTyxNQUFNLFdBQVcsTUFBTSxNQUFNLFdBQVcsVUFBVSxNQUFNLE1BQU0sV0FBVyxXQUFXLE1BQU0sTUFBTSxXQUFXLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxVQUFVLG1DQUFtQyxvQkFBb0Isa0JBQWtCLDJCQUEyQiwyQkFBMkIsMkJBQTJCLDJCQUEyQixrQkFBa0IsaUJBQWlCLHVCQUF1QixhQUFhLHFCQUFxQixvQkFBb0Isd0JBQXdCLHdCQUF3QiwwQkFBMEIsZUFBZSw4QkFBOEIsaUJBQWlCLHNCQUFzQixzQkFBc0IsdUJBQXVCLGFBQWEsY0FBYyxjQUFjLGVBQWUsdUJBQXVCLG1CQUFtQixvQkFBb0IsS0FBSyxNQUFNLDZCQUE2QixLQUFLLGFBQWEsaUJBQWlCLHlCQUF5QixnQkFBZ0IsbUJBQW1CLDZCQUE2QixrQ0FBa0MsdUJBQXVCLCtCQUErQixtQkFBbUIsbUJBQW1CLG9CQUFvQiwwQkFBMEIsOEJBQThCLHlCQUF5QixtQkFBbUIsa0JBQWtCLDJCQUEyQixrQkFBa0Isb0JBQW9CLHFCQUFxQix5QkFBeUIsa0JBQWtCLGVBQWUsd0JBQXdCLHVCQUF1QixzQkFBc0IsdUJBQXVCLGlGQUFpRixTQUFTLG1CQUFtQiwyQkFBMkIsNkJBQTZCLG9DQUFvQyxxQkFBcUIsbUJBQW1CLDRCQUE0Qiw2QkFBNkIsMkJBQTJCLDJEQUEyRCxnQkFBZ0Isb0NBQW9DLDhCQUE4QixxQkFBcUIsOEJBQThCLDhCQUE4Qiw0QkFBNEIsMENBQTBDLHdCQUF3QiwwQkFBMEIsZ0NBQWdDLGFBQWEseUJBQXlCLGtDQUFrQyxrQ0FBa0MsYUFBYSxvQkFBb0IscUNBQXFDLDJCQUEyQixhQUFhLFdBQVcsU0FBUyxXQUFXLGtDQUFrQyxvQ0FBb0MscUJBQXFCLGdCQUFnQixrQ0FBa0MsU0FBUyxPQUFPLGlCQUFpQixtQkFBbUIscUJBQXFCLGtCQUFrQixrQkFBa0IsMEJBQTBCLHlCQUF5QixxR0FBcUcsaUNBQWlDLGtDQUFrQyxPQUFPLGVBQWUsa0JBQWtCLCtCQUErQiwwQkFBMEIseUNBQXlDLHlCQUF5QixzQ0FBc0MsMkJBQTJCLG9CQUFvQixxQkFBcUIsOEJBQThCLHdCQUF3QiwwQkFBMEIscUNBQXFDLDJDQUEyQyxtQ0FBbUMsWUFBWSx5QkFBeUIsK0JBQStCLFNBQVMscUJBQXFCLGtDQUFrQyw4QkFBOEIsY0FBYyx5QkFBeUIsV0FBVyxTQUFTLGdCQUFnQiw4Q0FBOEMsU0FBUyxhQUFhLDhDQUE4QyxTQUFTLHFCQUFxQiwwQkFBMEIsU0FBUyxPQUFPLEtBQUssY0FBYyxpQkFBaUIsNkJBQTZCLGlCQUFpQixtQkFBbUIscUJBQXFCLG9CQUFvQixrQ0FBa0MsNkJBQTZCLDBCQUEwQixpQ0FBaUMsaUVBQWlFLGdCQUFnQixnQkFBZ0IsMEJBQTBCLDBCQUEwQixzQkFBc0Isc0JBQXNCLHFCQUFxQixzQkFBc0IsK0JBQStCLHdCQUF3QixrQkFBa0IsOEJBQThCLHNDQUFzQyw2QkFBNkIscUJBQXFCLFNBQVMsbUNBQW1DLDhCQUE4QixTQUFTLG9DQUFvQyxpQ0FBaUMsNkJBQTZCLHFDQUFxQywyQkFBMkIsU0FBUyxPQUFPLGlCQUFpQixxQ0FBcUMsOEZBQThGLDhCQUE4QixzQ0FBc0MsWUFBWSx3QkFBd0IsMEJBQTBCLG9CQUFvQixxQkFBcUIscUJBQXFCLGtDQUFrQyx1QkFBdUIscUJBQXFCLFNBQVMsZUFBZSx5QkFBeUIscUJBQXFCLG1CQUFtQixpQkFBaUIsbUJBQW1CLG9DQUFvQyx1QkFBdUIsc0JBQXNCLGlCQUFpQixvQkFBb0IscUJBQXFCLHlCQUF5Qix1QkFBdUIsbUJBQW1CLGlDQUFpQyxTQUFTLE9BQU8sS0FBSyxnQkFBZ0IsZUFBZSxzQkFBc0IsMkJBQTJCLE9BQU8sS0FBSyxrQkFBa0IsZUFBZSxzQkFBc0IsT0FBTyx5QkFBeUIsa0NBQWtDLG9CQUFvQix3QkFBd0IsZUFBZSxzQkFBc0IsU0FBUyxPQUFPLEtBQUssR0FBRyxpQ0FBaUMsV0FBVyxXQUFXLDhCQUE4QixPQUFPLGtCQUFrQiwwQkFBMEIsdUJBQXVCLE9BQU8sY0FBYyx5QkFBeUIseUJBQXlCLE9BQU8sZUFBZSxpQkFBaUIsd0NBQXdDLFNBQVMsT0FBTyxzQkFBc0IscUJBQXFCLE9BQU8sbUJBQW1CLHVCQUF1QixPQUFPLEtBQUssR0FBRyxxQkFBcUI7QUFDOXJRO0FBQ0EsaUVBQWUsdUJBQXVCLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaFF2QztBQUNtSDtBQUNqQjtBQUNsRyw4QkFBOEIsbUZBQTJCLENBQUMsNEZBQXFDO0FBQy9GO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QixrQkFBa0I7QUFDbEIsc0JBQXNCO0FBQ3RCLDRFQUE0RTtBQUM1RSxvQkFBb0I7QUFDcEIsc0JBQXNCO0FBQ3RCLHNCQUFzQjtBQUN0QiwwQkFBMEI7QUFDMUIsd0JBQXdCO0FBQ3hCLHVCQUF1QjtBQUN2QixzQkFBc0I7QUFDdEIsc0JBQXNCO0FBQ3RCLG9CQUFvQjtBQUNwQixpQkFBaUI7QUFDakIsMkJBQTJCO0FBQzNCLHdCQUF3QjtBQUN4Qix1QkFBdUI7QUFDdkIsbUJBQW1CO0FBQ25CLEtBQUs7QUFDTDtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCLHVCQUF1QjtBQUN2QixtQkFBbUI7QUFDbkIsc0JBQXNCO0FBQ3RCLGlCQUFpQjtBQUNqQixJQUFJO0FBQ0osbUNBQW1DO0FBQ25DLHVCQUF1QjtBQUN2QixlQUFlO0FBQ2Ysb0NBQW9DO0FBQ3BDLGtFQUFrRTtBQUNsRSw4QkFBOEI7QUFDOUIscUZBQXFGO0FBQ3JGLDZCQUE2QjtBQUM3QixtQ0FBbUM7QUFDbkMsaUNBQWlDO0FBQ2pDLElBQUk7QUFDSiw2QkFBNkI7QUFDN0Isd0JBQXdCO0FBQ3hCLG9CQUFvQjtBQUNwQixtQkFBbUI7QUFDbkIsbUJBQW1CO0FBQ25CLG1CQUFtQjtBQUNuQixJQUFJO0FBQ0o7QUFDQTtBQUNBLDRCQUE0QjtBQUM1Qiw4QkFBOEI7QUFDOUIsbUNBQW1DO0FBQ25DLGdDQUFnQztBQUNoQywyQkFBMkI7QUFDM0IsdUJBQXVCO0FBQ3ZCLElBQUk7QUFDSjtBQUNBLHlDQUF5QztBQUN6Qyx1QkFBdUI7QUFDdkIsa0JBQWtCO0FBQ2xCLHlCQUF5QjtBQUN6QixtQkFBbUI7QUFDbkIseUNBQXlDO0FBQ3pDLG9CQUFvQjtBQUNwQix3QkFBd0I7QUFDeEIsSUFBSTtBQUNKO0FBQ0Esa0NBQWtDO0FBQ2xDLGdCQUFnQjtBQUNoQixtQkFBbUI7QUFDbkIsdUJBQXVCO0FBQ3ZCLG1CQUFtQjtBQUNuQixpQkFBaUI7QUFDakIsZUFBZTtBQUNmLGdCQUFnQjtBQUNoQixxQkFBcUI7QUFDckIscUNBQXFDO0FBQ3JDLHFDQUFxQztBQUNyQyxrQ0FBa0M7QUFDbEMsaUNBQWlDO0FBQ2pDLGdDQUFnQztBQUNoQyw2QkFBNkI7QUFDN0IsSUFBSTtBQUNKLGtDQUFrQztBQUNsQyxrQkFBa0I7QUFDbEIsZUFBZTtBQUNmLG9DQUFvQztBQUNwQyxpQ0FBaUM7QUFDakMsZ0NBQWdDO0FBQ2hDLCtCQUErQjtBQUMvQiw0QkFBNEI7QUFDNUIsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDLE9BQU8sZ0hBQWdILE1BQU0sUUFBUSxLQUFLLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsVUFBVSxXQUFXLFVBQVUsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFVBQVUsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxVQUFVLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFVBQVUsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFVBQVUsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsVUFBVSxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFVBQVUsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFVBQVUsU0FBUyxVQUFVLE1BQU0sS0FBSyxVQUFVLE1BQU0sWUFBWSxVQUFVLE1BQU0sV0FBVyxVQUFVLE1BQU0sUUFBUSxVQUFVLFdBQVcsTUFBTSxLQUFLLFVBQVUsV0FBVyxNQUFNLFFBQVEsVUFBVSxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sVUFBVSxXQUFXLE1BQU0sS0FBSyxXQUFXLE1BQU0sS0FBSyxXQUFXLE1BQU0sS0FBSyxXQUFXLE1BQU0sS0FBSyxVQUFVLE1BQU0sS0FBSyxVQUFVLE1BQU0sS0FBSyxNQUFNLFVBQVUsV0FBVyxLQUFLLEtBQUssV0FBVyxLQUFLLFVBQVUsTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLFVBQVUsTUFBTSxZQUFZLEtBQUssVUFBVSxXQUFXLFVBQVUsTUFBTSxLQUFLLFdBQVcsV0FBVyxNQUFNLEtBQUssVUFBVSxrWUFBa1ksbUdBQW1HLHVCQUF1QiwyQkFBMkIsaUZBQWlGLHlCQUF5QiwyQkFBMkIsMkJBQTJCLCtCQUErQiw2QkFBNkIsNEJBQTRCLDJCQUEyQiw2QkFBNkIseUJBQXlCLHNCQUFzQixrQ0FBa0MsNkJBQTZCLDRCQUE0Qix3QkFBd0IsU0FBUyx3RUFBd0UsNEJBQTRCLHdCQUF3QiwyQkFBMkIsc0JBQXNCLFFBQVEsMkNBQTJDLDRCQUE0QixvQkFBb0IseUNBQXlDLHVFQUF1RSxtQ0FBbUMsMEZBQTBGLGtDQUFrQyx3Q0FBd0Msc0NBQXNDLFFBQVEscUNBQXFDLDZCQUE2Qix5QkFBeUIsd0JBQXdCLHdCQUF3Qix3QkFBd0IsUUFBUSxnSUFBZ0ksbUNBQW1DLHdDQUF3QyxxQ0FBcUMsZ0NBQWdDLDRCQUE0QixRQUFRLHVFQUF1RSw0QkFBNEIsdUJBQXVCLDhCQUE4Qix3QkFBd0IsOENBQThDLHlCQUF5Qiw2QkFBNkIsUUFBUSxrRkFBa0YscUJBQXFCLHdCQUF3Qiw0QkFBNEIsd0JBQXdCLHNCQUFzQixvQkFBb0IscUJBQXFCLDBCQUEwQiwwQ0FBMEMsMENBQTBDLHVDQUF1QyxzQ0FBc0MscUNBQXFDLGtDQUFrQyxRQUFRLDBDQUEwQyx1QkFBdUIsb0JBQW9CLHlDQUF5QyxzQ0FBc0MscUNBQXFDLG9DQUFvQyxpQ0FBaUMsUUFBUSwrRkFBK0YsbUJBQW1CLEdBQUcsd0JBQXdCLG1CQUFtQixHQUFHLDZJQUE2SSxtQkFBbUIsR0FBRywySEFBMkgsbUJBQW1CLEdBQUcsb0VBQW9FLGlCQUFpQix5Q0FBeUMsR0FBRyxzQkFBc0Isb0JBQW9CLCtCQUErQixHQUFHLDRFQUE0RSxtQkFBbUIsR0FBRyx5Q0FBeUMsaUJBQWlCLEdBQUcsd0RBQXdELG1CQUFtQix5Q0FBeUMsR0FBRyxzQkFBc0Isd0JBQXdCLEdBQUcsaUJBQWlCLHNCQUFzQixHQUFHLGlCQUFpQix1QkFBdUIsR0FBRyxtQkFBbUIsaUJBQWlCLEdBQUcsc0JBQXNCLGdCQUFnQixHQUFHLDBDQUEwQywwRUFBMEUsbUJBQW1CLHVCQUF1QixLQUFLLEtBQUssNEZBQTRGLG9CQUFvQixHQUFHLDhEQUE4RCx3QkFBd0IsR0FBRyw0RUFBNEUsWUFBWSxHQUFHLCtFQUErRSxtQkFBbUIsc0JBQXNCLG9CQUFvQixHQUFHLHVCQUF1Qix1QkFBdUIsc0JBQXNCLEdBQUcsdUJBQXVCLGtCQUFrQixHQUFHLHVCQUF1QjtBQUN2cE47QUFDQSxpRUFBZSx1QkFBdUIsRUFBQzs7Ozs7Ozs7Ozs7O0FDL04xQjs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFEO0FBQ3JEO0FBQ0E7QUFDQSxnREFBZ0Q7QUFDaEQ7QUFDQTtBQUNBLHFGQUFxRjtBQUNyRjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsaUJBQWlCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixxQkFBcUI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Ysc0ZBQXNGLHFCQUFxQjtBQUMzRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsaURBQWlELHFCQUFxQjtBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Ysc0RBQXNELHFCQUFxQjtBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3BGYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3pCYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVELGNBQWM7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDZkEsd0JBQXdCLE1BQU0sT0FBTyxZQUFZLFdBQVcsS0FBSyxtREFBbUQsOENBQThDLHdCQUF3Qiw0SEFBNEgsU0FBUyxXQUFXLDZCQUFlLG9DQUFTLEdBQUcsa0JBQWtCLCtFQUErRSw4Q0FBOEMsaVBBQWlQLEtBQUssV0FBVyxLQUFLLHFCQUFxQixZQUFZLGNBQWMseVZBQXlWLGFBQWE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBL2hDLE1BQU0sMkNBQUMsTUFBTSxxQ0FBQyxFQUFvQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQ2xKLE1BQXFHO0FBQ3JHLE1BQTJGO0FBQzNGLE1BQWtHO0FBQ2xHLE1BQXFIO0FBQ3JILE1BQThHO0FBQzlHLE1BQThHO0FBQzlHLE1BQXVKO0FBQ3ZKO0FBQ0E7O0FBRUE7O0FBRUEsNEJBQTRCLHFHQUFtQjtBQUMvQyx3QkFBd0Isa0hBQWE7O0FBRXJDLHVCQUF1Qix1R0FBYTtBQUNwQztBQUNBLGlCQUFpQiwrRkFBTTtBQUN2Qiw2QkFBNkIsc0dBQWtCOztBQUUvQyxhQUFhLDBHQUFHLENBQUMsMkhBQU87Ozs7QUFJaUc7QUFDekgsT0FBTyxpRUFBZSwySEFBTyxJQUFJLDJIQUFPLFVBQVUsMkhBQU8sbUJBQW1CLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pCN0UsTUFBd0c7QUFDeEcsTUFBOEY7QUFDOUYsTUFBcUc7QUFDckcsTUFBd0g7QUFDeEgsTUFBaUg7QUFDakgsTUFBaUg7QUFDakgsTUFBb0s7QUFDcEs7QUFDQTs7QUFFQTs7QUFFQSw0QkFBNEIscUdBQW1CO0FBQy9DLHdCQUF3QixrSEFBYTs7QUFFckMsdUJBQXVCLHVHQUFhO0FBQ3BDO0FBQ0EsaUJBQWlCLCtGQUFNO0FBQ3ZCLDZCQUE2QixzR0FBa0I7O0FBRS9DLGFBQWEsMEdBQUcsQ0FBQyxrSUFBTzs7OztBQUk4RztBQUN0SSxPQUFPLGlFQUFlLGtJQUFPLElBQUksa0lBQU8sVUFBVSxrSUFBTyxtQkFBbUIsRUFBQzs7Ozs7Ozs7Ozs7O0FDMUJoRTs7QUFFYjtBQUNBO0FBQ0E7QUFDQSxrQkFBa0Isd0JBQXdCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLGlCQUFpQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLDRCQUE0QjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDZCQUE2QjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNuRmE7O0FBRWI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ2pDYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ1RhOztBQUViO0FBQ0E7QUFDQSxjQUFjLEtBQXdDLEdBQUcsc0JBQWlCLEdBQUcsQ0FBSTtBQUNqRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ1RhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtEO0FBQ2xEO0FBQ0E7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0EsaUZBQWlGO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EseURBQXlEO0FBQ3pEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQzVEYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNibUM7O0FBRTVCLGlCQUFpQiw2Q0FBUztBQUNqQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2ZrQztBQUNGO0FBQ047OztBQUdYLG1CQUFtQiw2Q0FBUztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0Esc0JBQXNCLGVBQWU7QUFDckM7O0FBRUE7QUFDQTtBQUNBLG9CQUFvQixnQkFBZ0I7QUFDcEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx5REFBeUQ7QUFDekQ7QUFDQSxXQUFXLGdEQUFJO0FBQ2Y7QUFDQTtBQUNBLFlBQVk7QUFDWixjQUFjLFFBQVEsc0JBQXNCLG9CQUFvQixnQkFBZ0Isd0JBQXdCLElBQUk7QUFDNUcsT0FBTyxtQ0FBRSxFQUFFLFlBQVksZ0JBQWdCO0FBQ3ZDLDRDQUE0QyxrQkFBa0I7QUFDOUQsT0FBTztBQUNQLFdBQVcsZ0RBQUksa0NBQWtDLHNCQUFzQixHQUFHLFFBQVE7QUFDbEY7QUFDQTtBQUNBLFFBQVEsbUNBQUUsQ0FBQztBQUNYOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3RGdDOztBQUVqQjtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLFVBQVUsZ0RBQUk7QUFDZCxNQUFNO0FBQ04sS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCLFlBQVk7QUFDWixjQUFjO0FBQ2Q7QUFDQTs7Ozs7Ozs7Ozs7QUM1QkE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0EsZ0ZBQWdGLHlCQUF5QjtBQUN6RztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ04sdUNBQXVDLHNCQUFzQjtBQUM3RDtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0EsY0FBYyxLQUFLO0FBQ25CLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQSxjQUFjLFFBQVE7QUFDdEIsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxtQkFBbUI7QUFDN0Q7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsR0FBRztBQUNqQixjQUFjLHFCQUFxQjtBQUNuQyxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixxQkFBcUIsTUFBTTtBQUNwRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHdCQUF3QixLQUFLOztBQUU3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0IsT0FBTyxjQUFjLEtBQUs7QUFDNUM7QUFDQSxPQUFPOztBQUVQLHdCQUF3QixLQUFLOztBQUU3QjtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFNBQVM7QUFDdkIsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQSxjQUFjLFNBQVM7QUFDdkIsY0FBYyxRQUFRO0FBQ3RCLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsS0FBSztBQUM1Qjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsU0FBUztBQUN2QixjQUFjLFFBQVE7QUFDdEIsY0FBYyxTQUFTO0FBQ3ZCLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxRQUFRO0FBQ3RCLGNBQWMsU0FBUztBQUN2QixnQkFBZ0IsU0FBUztBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLEtBQUs7QUFDNUI7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwRUFBMEUsS0FBSztBQUMvRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxRQUFRO0FBQ3RCO0FBQ0EsY0FBYyxRQUFRO0FBQ3RCLGNBQWMsU0FBUztBQUN2QixjQUFjLHFCQUFxQjtBQUNuQztBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsU0FBUztBQUN6QjtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsS0FBSztBQUNuQztBQUNBLGVBQWUsU0FBUztBQUN4Qjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUgsYUFBYTs7QUFFYjtBQUNBO0FBQ0Esb0ZBQW9GLDhCQUE4QjtBQUNsSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsU0FBUywwQkFBMEIsOEJBQThCO0FBQzlFLGFBQWEsbUJBQW1CLHVCQUF1Qiw4QkFBOEI7QUFDckY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLE1BQU0sOEJBQThCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLDhCQUE4QjtBQUNwRDtBQUNBLGFBQWEsWUFBWTtBQUN6QixhQUFhLFNBQVM7QUFDdEIsYUFBYSxtQkFBbUI7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLDRCQUE0Qiw4QkFBOEI7QUFDMUQ7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLHNCQUFzQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLG1CQUFtQjtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLFlBQVk7QUFDckM7QUFDQSxhQUFhLFFBQVE7QUFDckIsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckIsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0EsZUFBZSxhQUFhO0FBQzVCO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQSxtREFBbUQsY0FBYztBQUNqRTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7O0FBRVY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsUUFBUTtBQUN0QixjQUFjLGNBQWM7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFFBQVE7QUFDdEIsY0FBYyxxQkFBcUI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLDhCQUE4Qiw0QkFBNEI7QUFDMUQ7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQiwrQ0FBK0M7O0FBRS9EO0FBQ0E7QUFDQTtBQUNBLFlBQVksUUFBUSxVQUFVO0FBQzlCLFlBQVksc0JBQXNCLGFBQWE7QUFDL0MsWUFBWSxpQkFBaUI7QUFDN0IsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsY0FBYztBQUM5RDtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsK0NBQStDLG1CQUFtQjtBQUNsRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLHVCQUF1QjtBQUNyQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsWUFBWTtBQUNwQztBQUNBLFlBQVksOEJBQThCO0FBQzFDLFlBQVksUUFBUTtBQUNwQixjQUFjLFFBQVE7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLHVGQUF1RjtBQUN2Rjs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsWUFBWSxRQUFRO0FBQ3BCLFlBQVksUUFBUTtBQUNwQixZQUFZLFFBQVE7QUFDcEIsWUFBWSxTQUFTO0FBQ3JCLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxZQUFZLFFBQVE7QUFDcEIsWUFBWSw0QkFBNEI7QUFDeEMsWUFBWSxLQUFLO0FBQ2pCLFlBQVksZ0NBQWdDO0FBQzVDLFlBQVksUUFBUTtBQUNwQixZQUFZLGdCQUFnQjtBQUM1QixjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxtQkFBbUIscUJBQXFCO0FBQ3hDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZUFBZSxRQUFRO0FBQ3ZCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSwwQkFBMEI7QUFDMUI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixnQkFBZ0I7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsR0FBRztBQUNsQixlQUFlLDBCQUEwQjtBQUN6QyxlQUFlLDBCQUEwQjtBQUN6QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsbUJBQW1CO0FBQ2hDLGVBQWU7QUFDZixhQUFhLG1CQUFtQjtBQUNoQyxlQUFlO0FBQ2Y7O0FBRUEsYUFBYSxtQkFBbUI7QUFDaEM7QUFDQSxhQUFhLG1CQUFtQjtBQUNoQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBWSxlQUFlO0FBQzNCLFlBQVksbUJBQW1CO0FBQy9CLFlBQVksR0FBRztBQUNmLGNBQWMsbUJBQW1CO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxlQUFlO0FBQzNCLFlBQVksbUJBQW1CO0FBQy9CLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixpQ0FBaUM7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLGVBQWU7QUFDM0IsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLENBQUM7O0FBRUQsSUFBSSxLQUE2QjtBQUNqQztBQUNBOztBQUVBO0FBQ0EsV0FBVyxxQkFBTTtBQUNqQixDQUFDLHFCQUFNO0FBQ1A7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFFBQVE7QUFDdEIsY0FBYyxTQUFTO0FBQ3ZCO0FBQ0EsY0FBYyxTQUFTO0FBQ3ZCLGNBQWMsaUJBQWlCO0FBQy9CLGNBQWMsU0FBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLGNBQWMsU0FBUztBQUN2QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFNBQVM7QUFDcEIsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxxQkFBcUI7QUFDaEMsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLHNCQUFzQixLQUFLO0FBQzNCO0FBQ0EsR0FBRztBQUNILGVBQWUsS0FBSztBQUNwQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esc0RBQXNEO0FBQ3REO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFFBQVE7QUFDcEI7QUFDQSxZQUFZLFFBQVE7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsK0lBQStJLGlCQUFpQjtBQUNoSztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksUUFBUTtBQUNwQjtBQUNBLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQSx5REFBeUQ7QUFDekQ7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFFBQVE7QUFDcEIsY0FBYztBQUNkO0FBQ0E7QUFDQSxzREFBc0QsZUFBZTtBQUNyRSxtQ0FBbUMsRUFBRTtBQUNyQzs7O0FBR0E7QUFDQSxtR0FBbUcsbUJBQW1CO0FBQ3RILCtCQUErQixHQUFHLHVCQUF1QixHQUFHOzs7QUFHNUQsK0RBQStEO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsR0FBRztBQUNoQztBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSw0REFBNEQsRUFBRSwwQkFBMEIsRUFBRTtBQUMxRjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLEdBQUc7QUFDekM7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0NBQXNDLE9BQU87QUFDN0M7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQ0FBMEMsT0FBTztBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFFBQVE7QUFDcEIsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNEJBQTRCLElBQUksWUFBWSxJQUFJLEVBQUU7QUFDbEQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7O0FBRUEsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzUwREQ7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7Ozs7V0N6QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRDs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOzs7OztXQ3JCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBOEM7QUFDZDs7QUFFQTtBQUNoQyxtQkFBTyxDQUFDLGlGQUEwQjtBQUNsQyxtQkFBTyxDQUFDLHVEQUFhO0FBQ3JCLGVBQWUsbUJBQU8sQ0FBQyxpRUFBa0I7O0FBRXpDLENBQTBCO0FBQ007QUFDaEM7QUFDQTtBQUNBO0FBQ2dGO0FBQ2hGO0FBQzZEO0FBQ3NCO0FBQ25GO0FBQ2tGO0FBQ0U7QUFDcEY7QUFDa0U7QUFDYztBQUNoRjtBQUN1RDtBQUMwQjtBQUNqRjtBQUNpRDtBQUNqRDtBQUN3RjtBQUNJO0FBQ1g7QUFDa0I7O0FBRXBGLHNCQUFzQiw2Q0FBUztBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLGlEQUFTO0FBQ3hDLDZCQUE2QixpREFBUztBQUN0Qyw2QkFBNkIsaURBQVM7QUFDdEMseUJBQXlCLGlEQUFTO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCLE1BQU07QUFDTjtBQUNBLCtDQUErQzs7QUFFL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsZ0RBQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBLDRCQUE0QjtBQUM1Qiw0QkFBNEI7QUFDNUIsNEJBQTRCO0FBQzVCLDRCQUE0QjtBQUM1Qjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUF1Qix3Q0FBd0M7QUFDL0Q7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQSwyQ0FBMkM7QUFDM0MsaUNBQWlDO0FBQ2pDLDhCQUE4Qjs7QUFFOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNFQUFzRTs7QUFFdEU7OztBQUdBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw2QkFBNkIsNkJBQTZCLGFBQWE7O0FBRXZFO0FBQ0E7O0FBRUE7O0FBRUEsNEJBQTRCLG1DQUFtQztBQUMvRDtBQUNBLG1CQUFtQixtQ0FBbUM7QUFDdEQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrRUFBa0U7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvRUFBb0U7QUFDcEU7QUFDQTtBQUNBLHVCQUF1QixjQUFjO0FBQ3JDLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQSxzQkFBc0IsbUJBQW1CO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGVBQWU7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QiwyQkFBMkI7QUFDekQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMENBQTBDO0FBQzFDLG9DQUFvQywwQkFBMEI7O0FBRTlEO0FBQ0EscURBQXFEO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLDZCQUE2QixVQUFVOztBQUVyRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLFdBQVcsZ0RBQUk7QUFDZixVQUFVO0FBQ1YsVUFBVTtBQUNWLFVBQVU7QUFDVjtBQUNBLGFBQWE7QUFDYiw0QkFBNEIsdURBQXVELFdBQVcsaUVBQWlFO0FBQy9KO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsVUFBVTtBQUNWLFVBQVU7QUFDVjtBQUNBLFlBQVksNkNBQUk7QUFDaEIsaUJBQWlCO0FBQ2pCLGtCQUFrQjtBQUNsQixpQkFBaUIscUJBQXFCOztBQUV0QyxZQUFZLGdEQUFPO0FBQ25CLGdCQUFnQjtBQUNoQjtBQUNBLGVBQWUsOEZBQVE7QUFDdkIsbUJBQW1CO0FBQ25COztBQUVBLFlBQVksZ0RBQU87QUFDbkI7QUFDQSxnQkFBZ0I7QUFDaEIsZUFBZSxnR0FBVTtBQUN6QixtQkFBbUI7QUFDbkI7O0FBRUEsWUFBWSxnREFBTztBQUNuQjtBQUNBLGdCQUFnQjtBQUNoQixlQUFlLHVHQUFVO0FBQ3pCLG1CQUFtQjtBQUNuQjs7QUFFQSxZQUFZLGdEQUFPO0FBQ25CO0FBQ0EsZ0JBQWdCO0FBQ2hCLGVBQWUsdUZBQVE7QUFDdkIsbUJBQW1CO0FBQ25COztBQUVBOzs7QUFHQSxZQUFZLGdEQUFPO0FBQ25CLGdCQUFnQjtBQUNoQixlQUFlLDhFQUFlO0FBQzlCO0FBQ0EsbUJBQW1CO0FBQ25COzs7QUFHQSxZQUFZLGdEQUFPO0FBQ25CLGdCQUFnQjtBQUNoQixlQUFlLDhEQUFZO0FBQzNCLGtCQUFrQixpRkFBZTtBQUNqQyxpQkFBaUI7QUFDakIsbUJBQW1CO0FBQ25COztBQUVBLFdBQVcsZ0RBQU87QUFDbEIsZ0JBQWdCO0FBQ2hCLGNBQWMsc0ZBQVc7QUFDekIsaUJBQWlCLGlGQUFjO0FBQy9CLGdCQUFnQjtBQUNoQixrQkFBa0I7QUFDbEI7O0FBRUEsV0FBVyxnREFBTztBQUNsQixnQkFBZ0I7QUFDaEIsY0FBYyx1RUFBUztBQUN2QixpQkFBaUIsa0ZBQVk7QUFDN0IsZ0JBQWdCO0FBQ2hCLGtCQUFrQjtBQUNsQjs7QUFFQSxXQUFXLGdEQUFPO0FBQ2xCLGdCQUFnQjtBQUNoQixjQUFjLDBEQUFXO0FBQ3pCLGlCQUFpQixpRkFBYztBQUMvQixnQkFBZ0I7QUFDaEIsa0JBQWtCO0FBQ2xCOztBQUVBLFdBQVcsZ0RBQU87QUFDbEIsY0FBYyx1REFBUTtBQUN0QixpQkFBaUI7QUFDakIsa0JBQWtCO0FBQ2xCLHVCQUF1QjtBQUN2Qjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEIseUJBQXlCLDZCQUE2QjtBQUN0RDtBQUNBO0FBQ0EsK0JBQStCLHdCQUF3QjtBQUN2RCxvQkFBb0Isc0JBQXNCLHVDQUF1QyxrQkFBa0I7QUFDbkc7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQSx3RUFBd0UsRUFBRTtBQUMxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhcmUtbWRlL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9iYXJlLW1kZS8uL25vZGVfbW9kdWxlcy9jb2RlamFyL2NvZGVqYXIuanMiLCJ3ZWJwYWNrOi8vYmFyZS1tZGUvLi9zcmMvY29tcG9uZW50cy9CYXJlTURFL21kZWQuc2NzcyIsIndlYnBhY2s6Ly9iYXJlLW1kZS8uL3NyYy9jb21wb25lbnRzL0JhcmVNREUvcHJpc20vcHJpc21fZml4ZWQuc2NzcyIsIndlYnBhY2s6Ly9iYXJlLW1kZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmFyZS1tZGUvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzIiwid2VicGFjazovL2JhcmUtbWRlLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vYmFyZS1tZGUvLi9ub2RlX21vZHVsZXMvaHRtL2Rpc3QvaHRtLm1vZHVsZS5qcyIsIndlYnBhY2s6Ly9iYXJlLW1kZS8uL25vZGVfbW9kdWxlcy9odG0vcHJlYWN0L2luZGV4Lm1vZHVsZS5qcyIsIndlYnBhY2s6Ly9iYXJlLW1kZS8uL3NyYy9jb21wb25lbnRzL0JhcmVNREUvbWRlZC5zY3NzPzEzMGQiLCJ3ZWJwYWNrOi8vYmFyZS1tZGUvLi9zcmMvY29tcG9uZW50cy9CYXJlTURFL3ByaXNtL3ByaXNtX2ZpeGVkLnNjc3M/YTIzZiIsIndlYnBhY2s6Ly9iYXJlLW1kZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXJlLW1kZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmFyZS1tZGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmFyZS1tZGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmFyZS1tZGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXJlLW1kZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhcmUtbWRlLy4vc3JjL2NvbXBvbmVudHMvQmFyZU1ERS9JZi5qcyIsIndlYnBhY2s6Ly9iYXJlLW1kZS8uL3NyYy9jb21wb25lbnRzL0JhcmVNREUvTWVudS5qcyIsIndlYnBhY2s6Ly9iYXJlLW1kZS8uL3NyYy9jb21wb25lbnRzL0JhcmVNREUvVEJ1dHRvbi5qcyIsIndlYnBhY2s6Ly9iYXJlLW1kZS8uL3NyYy9jb21wb25lbnRzL0JhcmVNREUvcHJpc20vcHJpc20uanMiLCJ3ZWJwYWNrOi8vYmFyZS1tZGUvZXh0ZXJuYWwgdW1kIFwicHJlYWN0XCIiLCJ3ZWJwYWNrOi8vYmFyZS1tZGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmFyZS1tZGUvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmFyZS1tZGUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhcmUtbWRlL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vYmFyZS1tZGUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXJlLW1kZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhcmUtbWRlL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2JhcmUtbWRlL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9iYXJlLW1kZS8uL3NyYy9jb21wb25lbnRzL0JhcmVNREUvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwicHJlYWN0XCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcInByZWFjdFwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJCYXJlTURFXCJdID0gZmFjdG9yeShyZXF1aXJlKFwicHJlYWN0XCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJCYXJlTURFXCJdID0gZmFjdG9yeShyb290W1wicHJlYWN0XCJdKTtcbn0pKHNlbGYsIChfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX3ByZWFjdF9fKSA9PiB7XG5yZXR1cm4gIiwiY29uc3QgZ2xvYmFsV2luZG93ID0gd2luZG93O1xuZXhwb3J0IGZ1bmN0aW9uIENvZGVKYXIoZWRpdG9yLCBoaWdobGlnaHQsIG9wdCA9IHt9KSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oeyB0YWI6ICdcXHQnLCBpbmRlbnRPbjogL1soe1xcW10kLywgbW92ZVRvTmV3TGluZTogL15bKX1cXF1dLywgc3BlbGxjaGVjazogZmFsc2UsIGNhdGNoVGFiOiB0cnVlLCBwcmVzZXJ2ZUlkZW50OiB0cnVlLCBhZGRDbG9zaW5nOiB0cnVlLCBoaXN0b3J5OiB0cnVlLCB3aW5kb3c6IGdsb2JhbFdpbmRvdyB9LCBvcHQpO1xuICAgIGNvbnN0IHdpbmRvdyA9IG9wdGlvbnMud2luZG93O1xuICAgIGNvbnN0IGRvY3VtZW50ID0gd2luZG93LmRvY3VtZW50O1xuICAgIGxldCBsaXN0ZW5lcnMgPSBbXTtcbiAgICBsZXQgaGlzdG9yeSA9IFtdO1xuICAgIGxldCBhdCA9IC0xO1xuICAgIGxldCBmb2N1cyA9IGZhbHNlO1xuICAgIGxldCBjYWxsYmFjaztcbiAgICBsZXQgcHJldjsgLy8gY29kZSBjb250ZW50IHByaW9yIGtleWRvd24gZXZlbnRcbiAgICBlZGl0b3Iuc2V0QXR0cmlidXRlKCdjb250ZW50ZWRpdGFibGUnLCAncGxhaW50ZXh0LW9ubHknKTtcbiAgICBlZGl0b3Iuc2V0QXR0cmlidXRlKCdzcGVsbGNoZWNrJywgb3B0aW9ucy5zcGVsbGNoZWNrID8gJ3RydWUnIDogJ2ZhbHNlJyk7XG4gICAgZWRpdG9yLnN0eWxlLm91dGxpbmUgPSAnbm9uZSc7XG4gICAgZWRpdG9yLnN0eWxlLm92ZXJmbG93V3JhcCA9ICdicmVhay13b3JkJztcbiAgICBlZGl0b3Iuc3R5bGUub3ZlcmZsb3dZID0gJ2F1dG8nO1xuICAgIGVkaXRvci5zdHlsZS53aGl0ZVNwYWNlID0gJ3ByZS13cmFwJztcbiAgICBsZXQgaXNMZWdhY3kgPSBmYWxzZTsgLy8gdHJ1ZSBpZiBwbGFpbnRleHQtb25seSBpcyBub3Qgc3VwcG9ydGVkXG4gICAgaGlnaGxpZ2h0KGVkaXRvcik7XG4gICAgaWYgKGVkaXRvci5jb250ZW50RWRpdGFibGUgIT09ICdwbGFpbnRleHQtb25seScpXG4gICAgICAgIGlzTGVnYWN5ID0gdHJ1ZTtcbiAgICBpZiAoaXNMZWdhY3kpXG4gICAgICAgIGVkaXRvci5zZXRBdHRyaWJ1dGUoJ2NvbnRlbnRlZGl0YWJsZScsICd0cnVlJyk7XG4gICAgY29uc3QgZGVib3VuY2VIaWdobGlnaHQgPSBkZWJvdW5jZSgoKSA9PiB7XG4gICAgICAgIGNvbnN0IHBvcyA9IHNhdmUoKTtcbiAgICAgICAgaGlnaGxpZ2h0KGVkaXRvciwgcG9zKTtcbiAgICAgICAgcmVzdG9yZShwb3MpO1xuICAgIH0sIDMwKTtcbiAgICBsZXQgcmVjb3JkaW5nID0gZmFsc2U7XG4gICAgY29uc3Qgc2hvdWxkUmVjb3JkID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHJldHVybiAhaXNVbmRvKGV2ZW50KSAmJiAhaXNSZWRvKGV2ZW50KVxuICAgICAgICAgICAgJiYgZXZlbnQua2V5ICE9PSAnTWV0YSdcbiAgICAgICAgICAgICYmIGV2ZW50LmtleSAhPT0gJ0NvbnRyb2wnXG4gICAgICAgICAgICAmJiBldmVudC5rZXkgIT09ICdBbHQnXG4gICAgICAgICAgICAmJiAhZXZlbnQua2V5LnN0YXJ0c1dpdGgoJ0Fycm93Jyk7XG4gICAgfTtcbiAgICBjb25zdCBkZWJvdW5jZVJlY29yZEhpc3RvcnkgPSBkZWJvdW5jZSgoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHNob3VsZFJlY29yZChldmVudCkpIHtcbiAgICAgICAgICAgIHJlY29yZEhpc3RvcnkoKTtcbiAgICAgICAgICAgIHJlY29yZGluZyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfSwgMzAwKTtcbiAgICBjb25zdCBvbiA9ICh0eXBlLCBmbikgPT4ge1xuICAgICAgICBsaXN0ZW5lcnMucHVzaChbdHlwZSwgZm5dKTtcbiAgICAgICAgZWRpdG9yLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgZm4pO1xuICAgIH07XG4gICAgb24oJ2tleWRvd24nLCBldmVudCA9PiB7XG4gICAgICAgIGlmIChldmVudC5kZWZhdWx0UHJldmVudGVkKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBwcmV2ID0gdG9TdHJpbmcoKTtcbiAgICAgICAgaWYgKG9wdGlvbnMucHJlc2VydmVJZGVudClcbiAgICAgICAgICAgIGhhbmRsZU5ld0xpbmUoZXZlbnQpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBsZWdhY3lOZXdMaW5lRml4KGV2ZW50KTtcbiAgICAgICAgaWYgKG9wdGlvbnMuY2F0Y2hUYWIpXG4gICAgICAgICAgICBoYW5kbGVUYWJDaGFyYWN0ZXJzKGV2ZW50KTtcbiAgICAgICAgaWYgKG9wdGlvbnMuYWRkQ2xvc2luZylcbiAgICAgICAgICAgIGhhbmRsZVNlbGZDbG9zaW5nQ2hhcmFjdGVycyhldmVudCk7XG4gICAgICAgIGlmIChvcHRpb25zLmhpc3RvcnkpIHtcbiAgICAgICAgICAgIGhhbmRsZVVuZG9SZWRvKGV2ZW50KTtcbiAgICAgICAgICAgIGlmIChzaG91bGRSZWNvcmQoZXZlbnQpICYmICFyZWNvcmRpbmcpIHtcbiAgICAgICAgICAgICAgICByZWNvcmRIaXN0b3J5KCk7XG4gICAgICAgICAgICAgICAgcmVjb3JkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNMZWdhY3kgJiYgIWlzQ29weShldmVudCkpXG4gICAgICAgICAgICByZXN0b3JlKHNhdmUoKSk7XG4gICAgfSk7XG4gICAgb24oJ2tleXVwJywgZXZlbnQgPT4ge1xuICAgICAgICBpZiAoZXZlbnQuZGVmYXVsdFByZXZlbnRlZClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgaWYgKGV2ZW50LmlzQ29tcG9zaW5nKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpZiAocHJldiAhPT0gdG9TdHJpbmcoKSlcbiAgICAgICAgICAgIGRlYm91bmNlSGlnaGxpZ2h0KCk7XG4gICAgICAgIGRlYm91bmNlUmVjb3JkSGlzdG9yeShldmVudCk7XG4gICAgICAgIGlmIChjYWxsYmFjaylcbiAgICAgICAgICAgIGNhbGxiYWNrKHRvU3RyaW5nKCkpO1xuICAgIH0pO1xuICAgIG9uKCdmb2N1cycsIF9ldmVudCA9PiB7XG4gICAgICAgIGZvY3VzID0gdHJ1ZTtcbiAgICB9KTtcbiAgICBvbignYmx1cicsIF9ldmVudCA9PiB7XG4gICAgICAgIGZvY3VzID0gZmFsc2U7XG4gICAgfSk7XG4gICAgb24oJ3Bhc3RlJywgZXZlbnQgPT4ge1xuICAgICAgICByZWNvcmRIaXN0b3J5KCk7XG4gICAgICAgIGhhbmRsZVBhc3RlKGV2ZW50KTtcbiAgICAgICAgcmVjb3JkSGlzdG9yeSgpO1xuICAgICAgICBpZiAoY2FsbGJhY2spXG4gICAgICAgICAgICBjYWxsYmFjayh0b1N0cmluZygpKTtcbiAgICB9KTtcbiAgICBmdW5jdGlvbiBzYXZlKCkge1xuICAgICAgICBjb25zdCBzID0gZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgIGNvbnN0IHBvcyA9IHsgc3RhcnQ6IDAsIGVuZDogMCwgZGlyOiB1bmRlZmluZWQgfTtcbiAgICAgICAgbGV0IHsgYW5jaG9yTm9kZSwgYW5jaG9yT2Zmc2V0LCBmb2N1c05vZGUsIGZvY3VzT2Zmc2V0IH0gPSBzO1xuICAgICAgICBpZiAoIWFuY2hvck5vZGUgfHwgIWZvY3VzTm9kZSlcbiAgICAgICAgICAgIHRocm93ICdlcnJvcjEnO1xuICAgICAgICAvLyBJZiB0aGUgYW5jaG9yIGFuZCBmb2N1cyBhcmUgdGhlIGVkaXRvciBlbGVtZW50LCByZXR1cm4gZWl0aGVyIGEgZnVsbFxuICAgICAgICAvLyBoaWdobGlnaHQgb3IgYSBzdGFydC9lbmQgY3Vyc29yIHBvc2l0aW9uIGRlcGVuZGluZyBvbiB0aGUgc2VsZWN0aW9uXG4gICAgICAgIGlmIChhbmNob3JOb2RlID09PSBlZGl0b3IgJiYgZm9jdXNOb2RlID09PSBlZGl0b3IpIHtcbiAgICAgICAgICAgIHBvcy5zdGFydCA9IChhbmNob3JPZmZzZXQgPiAwICYmIGVkaXRvci50ZXh0Q29udGVudCkgPyBlZGl0b3IudGV4dENvbnRlbnQubGVuZ3RoIDogMDtcbiAgICAgICAgICAgIHBvcy5lbmQgPSAoZm9jdXNPZmZzZXQgPiAwICYmIGVkaXRvci50ZXh0Q29udGVudCkgPyBlZGl0b3IudGV4dENvbnRlbnQubGVuZ3RoIDogMDtcbiAgICAgICAgICAgIHBvcy5kaXIgPSAoZm9jdXNPZmZzZXQgPj0gYW5jaG9yT2Zmc2V0KSA/ICctPicgOiAnPC0nO1xuICAgICAgICAgICAgcmV0dXJuIHBvcztcbiAgICAgICAgfVxuICAgICAgICAvLyBTZWxlY3Rpb24gYW5jaG9yIGFuZCBmb2N1cyBhcmUgZXhwZWN0ZWQgdG8gYmUgdGV4dCBub2RlcyxcbiAgICAgICAgLy8gc28gbm9ybWFsaXplIHRoZW0uXG4gICAgICAgIGlmIChhbmNob3JOb2RlLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSkge1xuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKTtcbiAgICAgICAgICAgIGFuY2hvck5vZGUuaW5zZXJ0QmVmb3JlKG5vZGUsIGFuY2hvck5vZGUuY2hpbGROb2Rlc1thbmNob3JPZmZzZXRdKTtcbiAgICAgICAgICAgIGFuY2hvck5vZGUgPSBub2RlO1xuICAgICAgICAgICAgYW5jaG9yT2Zmc2V0ID0gMDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZm9jdXNOb2RlLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSkge1xuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKTtcbiAgICAgICAgICAgIGZvY3VzTm9kZS5pbnNlcnRCZWZvcmUobm9kZSwgZm9jdXNOb2RlLmNoaWxkTm9kZXNbZm9jdXNPZmZzZXRdKTtcbiAgICAgICAgICAgIGZvY3VzTm9kZSA9IG5vZGU7XG4gICAgICAgICAgICBmb2N1c09mZnNldCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgdmlzaXQoZWRpdG9yLCBlbCA9PiB7XG4gICAgICAgICAgICBpZiAoZWwgPT09IGFuY2hvck5vZGUgJiYgZWwgPT09IGZvY3VzTm9kZSkge1xuICAgICAgICAgICAgICAgIHBvcy5zdGFydCArPSBhbmNob3JPZmZzZXQ7XG4gICAgICAgICAgICAgICAgcG9zLmVuZCArPSBmb2N1c09mZnNldDtcbiAgICAgICAgICAgICAgICBwb3MuZGlyID0gYW5jaG9yT2Zmc2V0IDw9IGZvY3VzT2Zmc2V0ID8gJy0+JyA6ICc8LSc7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdzdG9wJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChlbCA9PT0gYW5jaG9yTm9kZSkge1xuICAgICAgICAgICAgICAgIHBvcy5zdGFydCArPSBhbmNob3JPZmZzZXQ7XG4gICAgICAgICAgICAgICAgaWYgKCFwb3MuZGlyKSB7XG4gICAgICAgICAgICAgICAgICAgIHBvcy5kaXIgPSAnLT4nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdzdG9wJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChlbCA9PT0gZm9jdXNOb2RlKSB7XG4gICAgICAgICAgICAgICAgcG9zLmVuZCArPSBmb2N1c09mZnNldDtcbiAgICAgICAgICAgICAgICBpZiAoIXBvcy5kaXIpIHtcbiAgICAgICAgICAgICAgICAgICAgcG9zLmRpciA9ICc8LSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3N0b3AnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChlbC5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUpIHtcbiAgICAgICAgICAgICAgICBpZiAocG9zLmRpciAhPSAnLT4nKVxuICAgICAgICAgICAgICAgICAgICBwb3Muc3RhcnQgKz0gZWwubm9kZVZhbHVlLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBpZiAocG9zLmRpciAhPSAnPC0nKVxuICAgICAgICAgICAgICAgICAgICBwb3MuZW5kICs9IGVsLm5vZGVWYWx1ZS5sZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBjb2xsYXBzZSBlbXB0eSB0ZXh0IG5vZGVzXG4gICAgICAgIGVkaXRvci5ub3JtYWxpemUoKTtcbiAgICAgICAgcmV0dXJuIHBvcztcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVzdG9yZShwb3MpIHtcbiAgICAgICAgY29uc3QgcyA9IGdldFNlbGVjdGlvbigpO1xuICAgICAgICBsZXQgc3RhcnROb2RlLCBzdGFydE9mZnNldCA9IDA7XG4gICAgICAgIGxldCBlbmROb2RlLCBlbmRPZmZzZXQgPSAwO1xuICAgICAgICBpZiAoIXBvcy5kaXIpXG4gICAgICAgICAgICBwb3MuZGlyID0gJy0+JztcbiAgICAgICAgaWYgKHBvcy5zdGFydCA8IDApXG4gICAgICAgICAgICBwb3Muc3RhcnQgPSAwO1xuICAgICAgICBpZiAocG9zLmVuZCA8IDApXG4gICAgICAgICAgICBwb3MuZW5kID0gMDtcbiAgICAgICAgLy8gRmxpcCBzdGFydCBhbmQgZW5kIGlmIHRoZSBkaXJlY3Rpb24gcmV2ZXJzZWRcbiAgICAgICAgaWYgKHBvcy5kaXIgPT0gJzwtJykge1xuICAgICAgICAgICAgY29uc3QgeyBzdGFydCwgZW5kIH0gPSBwb3M7XG4gICAgICAgICAgICBwb3Muc3RhcnQgPSBlbmQ7XG4gICAgICAgICAgICBwb3MuZW5kID0gc3RhcnQ7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGN1cnJlbnQgPSAwO1xuICAgICAgICB2aXNpdChlZGl0b3IsIGVsID0+IHtcbiAgICAgICAgICAgIGlmIChlbC5ub2RlVHlwZSAhPT0gTm9kZS5URVhUX05PREUpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgY29uc3QgbGVuID0gKGVsLm5vZGVWYWx1ZSB8fCAnJykubGVuZ3RoO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnQgKyBsZW4gPiBwb3Muc3RhcnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXN0YXJ0Tm9kZSkge1xuICAgICAgICAgICAgICAgICAgICBzdGFydE5vZGUgPSBlbDtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRPZmZzZXQgPSBwb3Muc3RhcnQgLSBjdXJyZW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudCArIGxlbiA+IHBvcy5lbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgZW5kTm9kZSA9IGVsO1xuICAgICAgICAgICAgICAgICAgICBlbmRPZmZzZXQgPSBwb3MuZW5kIC0gY3VycmVudDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdzdG9wJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdXJyZW50ICs9IGxlbjtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghc3RhcnROb2RlKVxuICAgICAgICAgICAgc3RhcnROb2RlID0gZWRpdG9yLCBzdGFydE9mZnNldCA9IGVkaXRvci5jaGlsZE5vZGVzLmxlbmd0aDtcbiAgICAgICAgaWYgKCFlbmROb2RlKVxuICAgICAgICAgICAgZW5kTm9kZSA9IGVkaXRvciwgZW5kT2Zmc2V0ID0gZWRpdG9yLmNoaWxkTm9kZXMubGVuZ3RoO1xuICAgICAgICAvLyBGbGlwIGJhY2sgdGhlIHNlbGVjdGlvblxuICAgICAgICBpZiAocG9zLmRpciA9PSAnPC0nKSB7XG4gICAgICAgICAgICBbc3RhcnROb2RlLCBzdGFydE9mZnNldCwgZW5kTm9kZSwgZW5kT2Zmc2V0XSA9IFtlbmROb2RlLCBlbmRPZmZzZXQsIHN0YXJ0Tm9kZSwgc3RhcnRPZmZzZXRdO1xuICAgICAgICB9XG4gICAgICAgIHMuc2V0QmFzZUFuZEV4dGVudChzdGFydE5vZGUsIHN0YXJ0T2Zmc2V0LCBlbmROb2RlLCBlbmRPZmZzZXQpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBiZWZvcmVDdXJzb3IoKSB7XG4gICAgICAgIGNvbnN0IHMgPSBnZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgY29uc3QgcjAgPSBzLmdldFJhbmdlQXQoMCk7XG4gICAgICAgIGNvbnN0IHIgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xuICAgICAgICByLnNlbGVjdE5vZGVDb250ZW50cyhlZGl0b3IpO1xuICAgICAgICByLnNldEVuZChyMC5zdGFydENvbnRhaW5lciwgcjAuc3RhcnRPZmZzZXQpO1xuICAgICAgICByZXR1cm4gci50b1N0cmluZygpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBhZnRlckN1cnNvcigpIHtcbiAgICAgICAgY29uc3QgcyA9IGdldFNlbGVjdGlvbigpO1xuICAgICAgICBjb25zdCByMCA9IHMuZ2V0UmFuZ2VBdCgwKTtcbiAgICAgICAgY29uc3QgciA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XG4gICAgICAgIHIuc2VsZWN0Tm9kZUNvbnRlbnRzKGVkaXRvcik7XG4gICAgICAgIHIuc2V0U3RhcnQocjAuZW5kQ29udGFpbmVyLCByMC5lbmRPZmZzZXQpO1xuICAgICAgICByZXR1cm4gci50b1N0cmluZygpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBoYW5kbGVOZXdMaW5lKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5rZXkgPT09ICdFbnRlcicpIHtcbiAgICAgICAgICAgIGNvbnN0IGJlZm9yZSA9IGJlZm9yZUN1cnNvcigpO1xuICAgICAgICAgICAgY29uc3QgYWZ0ZXIgPSBhZnRlckN1cnNvcigpO1xuICAgICAgICAgICAgbGV0IFtwYWRkaW5nXSA9IGZpbmRQYWRkaW5nKGJlZm9yZSk7XG4gICAgICAgICAgICBsZXQgbmV3TGluZVBhZGRpbmcgPSBwYWRkaW5nO1xuICAgICAgICAgICAgLy8gSWYgbGFzdCBzeW1ib2wgaXMgXCJ7XCIgaWRlbnQgbmV3IGxpbmVcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmluZGVudE9uLnRlc3QoYmVmb3JlKSkge1xuICAgICAgICAgICAgICAgIG5ld0xpbmVQYWRkaW5nICs9IG9wdGlvbnMudGFiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gUHJlc2VydmUgcGFkZGluZ1xuICAgICAgICAgICAgaWYgKG5ld0xpbmVQYWRkaW5nLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBwcmV2ZW50RGVmYXVsdChldmVudCk7XG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgaW5zZXJ0KCdcXG4nICsgbmV3TGluZVBhZGRpbmcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbGVnYWN5TmV3TGluZUZpeChldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBQbGFjZSBhZGphY2VudCBcIn1cIiBvbiBuZXh0IGxpbmVcbiAgICAgICAgICAgIGlmIChuZXdMaW5lUGFkZGluZyAhPT0gcGFkZGluZyAmJiBvcHRpb25zLm1vdmVUb05ld0xpbmUudGVzdChhZnRlcikpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwb3MgPSBzYXZlKCk7XG4gICAgICAgICAgICAgICAgaW5zZXJ0KCdcXG4nICsgcGFkZGluZyk7XG4gICAgICAgICAgICAgICAgcmVzdG9yZShwb3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGxlZ2FjeU5ld0xpbmVGaXgoZXZlbnQpIHtcbiAgICAgICAgLy8gRmlyZWZveCBkb2VzIG5vdCBzdXBwb3J0IHBsYWludGV4dC1vbmx5IG1vZGVcbiAgICAgICAgLy8gYW5kIHB1dHMgPGRpdj48YnI+PC9kaXY+IG9uIEVudGVyLiBMZXQncyBoZWxwLlxuICAgICAgICBpZiAoaXNMZWdhY3kgJiYgZXZlbnQua2V5ID09PSAnRW50ZXInKSB7XG4gICAgICAgICAgICBwcmV2ZW50RGVmYXVsdChldmVudCk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGlmIChhZnRlckN1cnNvcigpID09ICcnKSB7XG4gICAgICAgICAgICAgICAgaW5zZXJ0KCdcXG4gJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgcG9zID0gc2F2ZSgpO1xuICAgICAgICAgICAgICAgIHBvcy5zdGFydCA9IC0tcG9zLmVuZDtcbiAgICAgICAgICAgICAgICByZXN0b3JlKHBvcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpbnNlcnQoJ1xcbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGhhbmRsZVNlbGZDbG9zaW5nQ2hhcmFjdGVycyhldmVudCkge1xuICAgICAgICBjb25zdCBvcGVuID0gYChbeydcImA7XG4gICAgICAgIGNvbnN0IGNsb3NlID0gYCldfSdcImA7XG4gICAgICAgIGNvbnN0IGNvZGVBZnRlciA9IGFmdGVyQ3Vyc29yKCk7XG4gICAgICAgIGNvbnN0IGNvZGVCZWZvcmUgPSBiZWZvcmVDdXJzb3IoKTtcbiAgICAgICAgY29uc3QgZXNjYXBlQ2hhcmFjdGVyID0gY29kZUJlZm9yZS5zdWJzdHIoY29kZUJlZm9yZS5sZW5ndGggLSAxKSA9PT0gJ1xcXFwnO1xuICAgICAgICBjb25zdCBjaGFyQWZ0ZXIgPSBjb2RlQWZ0ZXIuc3Vic3RyKDAsIDEpO1xuICAgICAgICBpZiAoY2xvc2UuaW5jbHVkZXMoZXZlbnQua2V5KSAmJiAhZXNjYXBlQ2hhcmFjdGVyICYmIGNoYXJBZnRlciA9PT0gZXZlbnQua2V5KSB7XG4gICAgICAgICAgICAvLyBXZSBhbHJlYWR5IGhhdmUgY2xvc2luZyBjaGFyIG5leHQgdG8gY3Vyc29yLlxuICAgICAgICAgICAgLy8gTW92ZSBvbmUgY2hhciB0byByaWdodC5cbiAgICAgICAgICAgIGNvbnN0IHBvcyA9IHNhdmUoKTtcbiAgICAgICAgICAgIHByZXZlbnREZWZhdWx0KGV2ZW50KTtcbiAgICAgICAgICAgIHBvcy5zdGFydCA9ICsrcG9zLmVuZDtcbiAgICAgICAgICAgIHJlc3RvcmUocG9zKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChvcGVuLmluY2x1ZGVzKGV2ZW50LmtleSlcbiAgICAgICAgICAgICYmICFlc2NhcGVDaGFyYWN0ZXJcbiAgICAgICAgICAgICYmIChgXCInYC5pbmNsdWRlcyhldmVudC5rZXkpIHx8IFsnJywgJyAnLCAnXFxuJ10uaW5jbHVkZXMoY2hhckFmdGVyKSkpIHtcbiAgICAgICAgICAgIHByZXZlbnREZWZhdWx0KGV2ZW50KTtcbiAgICAgICAgICAgIGNvbnN0IHBvcyA9IHNhdmUoKTtcbiAgICAgICAgICAgIGNvbnN0IHdyYXBUZXh0ID0gcG9zLnN0YXJ0ID09IHBvcy5lbmQgPyAnJyA6IGdldFNlbGVjdGlvbigpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBjb25zdCB0ZXh0ID0gZXZlbnQua2V5ICsgd3JhcFRleHQgKyBjbG9zZVtvcGVuLmluZGV4T2YoZXZlbnQua2V5KV07XG4gICAgICAgICAgICBpbnNlcnQodGV4dCk7XG4gICAgICAgICAgICBwb3Muc3RhcnQrKztcbiAgICAgICAgICAgIHBvcy5lbmQrKztcbiAgICAgICAgICAgIHJlc3RvcmUocG9zKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBoYW5kbGVUYWJDaGFyYWN0ZXJzKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5rZXkgPT09ICdUYWInKSB7XG4gICAgICAgICAgICBwcmV2ZW50RGVmYXVsdChldmVudCk7XG4gICAgICAgICAgICBpZiAoZXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBiZWZvcmUgPSBiZWZvcmVDdXJzb3IoKTtcbiAgICAgICAgICAgICAgICBsZXQgW3BhZGRpbmcsIHN0YXJ0LF0gPSBmaW5kUGFkZGluZyhiZWZvcmUpO1xuICAgICAgICAgICAgICAgIGlmIChwYWRkaW5nLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcG9zID0gc2F2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAvLyBSZW1vdmUgZnVsbCBsZW5ndGggdGFiIG9yIGp1c3QgcmVtYWluaW5nIHBhZGRpbmdcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGVuID0gTWF0aC5taW4ob3B0aW9ucy50YWIubGVuZ3RoLCBwYWRkaW5nLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgIHJlc3RvcmUoeyBzdGFydCwgZW5kOiBzdGFydCArIGxlbiB9KTtcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2RlbGV0ZScpO1xuICAgICAgICAgICAgICAgICAgICBwb3Muc3RhcnQgLT0gbGVuO1xuICAgICAgICAgICAgICAgICAgICBwb3MuZW5kIC09IGxlbjtcbiAgICAgICAgICAgICAgICAgICAgcmVzdG9yZShwb3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGluc2VydChvcHRpb25zLnRhYik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gaGFuZGxlVW5kb1JlZG8oZXZlbnQpIHtcbiAgICAgICAgaWYgKGlzVW5kbyhldmVudCkpIHtcbiAgICAgICAgICAgIHByZXZlbnREZWZhdWx0KGV2ZW50KTtcbiAgICAgICAgICAgIGF0LS07XG4gICAgICAgICAgICBjb25zdCByZWNvcmQgPSBoaXN0b3J5W2F0XTtcbiAgICAgICAgICAgIGlmIChyZWNvcmQpIHtcbiAgICAgICAgICAgICAgICBlZGl0b3IuaW5uZXJIVE1MID0gcmVjb3JkLmh0bWw7XG4gICAgICAgICAgICAgICAgcmVzdG9yZShyZWNvcmQucG9zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhdCA8IDApXG4gICAgICAgICAgICAgICAgYXQgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1JlZG8oZXZlbnQpKSB7XG4gICAgICAgICAgICBwcmV2ZW50RGVmYXVsdChldmVudCk7XG4gICAgICAgICAgICBhdCsrO1xuICAgICAgICAgICAgY29uc3QgcmVjb3JkID0gaGlzdG9yeVthdF07XG4gICAgICAgICAgICBpZiAocmVjb3JkKSB7XG4gICAgICAgICAgICAgICAgZWRpdG9yLmlubmVySFRNTCA9IHJlY29yZC5odG1sO1xuICAgICAgICAgICAgICAgIHJlc3RvcmUocmVjb3JkLnBvcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYXQgPj0gaGlzdG9yeS5sZW5ndGgpXG4gICAgICAgICAgICAgICAgYXQtLTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiByZWNvcmRIaXN0b3J5KCkge1xuICAgICAgICBpZiAoIWZvY3VzKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCBodG1sID0gZWRpdG9yLmlubmVySFRNTDtcbiAgICAgICAgY29uc3QgcG9zID0gc2F2ZSgpO1xuICAgICAgICBjb25zdCBsYXN0UmVjb3JkID0gaGlzdG9yeVthdF07XG4gICAgICAgIGlmIChsYXN0UmVjb3JkKSB7XG4gICAgICAgICAgICBpZiAobGFzdFJlY29yZC5odG1sID09PSBodG1sXG4gICAgICAgICAgICAgICAgJiYgbGFzdFJlY29yZC5wb3Muc3RhcnQgPT09IHBvcy5zdGFydFxuICAgICAgICAgICAgICAgICYmIGxhc3RSZWNvcmQucG9zLmVuZCA9PT0gcG9zLmVuZClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgYXQrKztcbiAgICAgICAgaGlzdG9yeVthdF0gPSB7IGh0bWwsIHBvcyB9O1xuICAgICAgICBoaXN0b3J5LnNwbGljZShhdCArIDEpO1xuICAgICAgICBjb25zdCBtYXhIaXN0b3J5ID0gMzAwO1xuICAgICAgICBpZiAoYXQgPiBtYXhIaXN0b3J5KSB7XG4gICAgICAgICAgICBhdCA9IG1heEhpc3Rvcnk7XG4gICAgICAgICAgICBoaXN0b3J5LnNwbGljZSgwLCAxKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBoYW5kbGVQYXN0ZShldmVudCkge1xuICAgICAgICBwcmV2ZW50RGVmYXVsdChldmVudCk7XG4gICAgICAgIGNvbnN0IHRleHQgPSAoZXZlbnQub3JpZ2luYWxFdmVudCB8fCBldmVudClcbiAgICAgICAgICAgIC5jbGlwYm9hcmREYXRhXG4gICAgICAgICAgICAuZ2V0RGF0YSgndGV4dC9wbGFpbicpXG4gICAgICAgICAgICAucmVwbGFjZSgvXFxyL2csICcnKTtcbiAgICAgICAgY29uc3QgcG9zID0gc2F2ZSgpO1xuICAgICAgICBpbnNlcnQodGV4dCk7XG4gICAgICAgIGhpZ2hsaWdodChlZGl0b3IpO1xuICAgICAgICByZXN0b3JlKHtcbiAgICAgICAgICAgIHN0YXJ0OiBNYXRoLm1pbihwb3Muc3RhcnQsIHBvcy5lbmQpICsgdGV4dC5sZW5ndGgsXG4gICAgICAgICAgICBlbmQ6IE1hdGgubWluKHBvcy5zdGFydCwgcG9zLmVuZCkgKyB0ZXh0Lmxlbmd0aCxcbiAgICAgICAgICAgIGRpcjogJzwtJyxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHZpc2l0KGVkaXRvciwgdmlzaXRvcikge1xuICAgICAgICBjb25zdCBxdWV1ZSA9IFtdO1xuICAgICAgICBpZiAoZWRpdG9yLmZpcnN0Q2hpbGQpXG4gICAgICAgICAgICBxdWV1ZS5wdXNoKGVkaXRvci5maXJzdENoaWxkKTtcbiAgICAgICAgbGV0IGVsID0gcXVldWUucG9wKCk7XG4gICAgICAgIHdoaWxlIChlbCkge1xuICAgICAgICAgICAgaWYgKHZpc2l0b3IoZWwpID09PSAnc3RvcCcpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBpZiAoZWwubmV4dFNpYmxpbmcpXG4gICAgICAgICAgICAgICAgcXVldWUucHVzaChlbC5uZXh0U2libGluZyk7XG4gICAgICAgICAgICBpZiAoZWwuZmlyc3RDaGlsZClcbiAgICAgICAgICAgICAgICBxdWV1ZS5wdXNoKGVsLmZpcnN0Q2hpbGQpO1xuICAgICAgICAgICAgZWwgPSBxdWV1ZS5wb3AoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBpc0N0cmwoZXZlbnQpIHtcbiAgICAgICAgcmV0dXJuIGV2ZW50Lm1ldGFLZXkgfHwgZXZlbnQuY3RybEtleTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNVbmRvKGV2ZW50KSB7XG4gICAgICAgIHJldHVybiBpc0N0cmwoZXZlbnQpICYmICFldmVudC5zaGlmdEtleSAmJiBnZXRLZXlDb2RlKGV2ZW50KSA9PT0gJ1onO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpc1JlZG8oZXZlbnQpIHtcbiAgICAgICAgcmV0dXJuIGlzQ3RybChldmVudCkgJiYgZXZlbnQuc2hpZnRLZXkgJiYgZ2V0S2V5Q29kZShldmVudCkgPT09ICdaJztcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNDb3B5KGV2ZW50KSB7XG4gICAgICAgIHJldHVybiBpc0N0cmwoZXZlbnQpICYmIGdldEtleUNvZGUoZXZlbnQpID09PSAnQyc7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldEtleUNvZGUoZXZlbnQpIHtcbiAgICAgICAgbGV0IGtleSA9IGV2ZW50LmtleSB8fCBldmVudC5rZXlDb2RlIHx8IGV2ZW50LndoaWNoO1xuICAgICAgICBpZiAoIWtleSlcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybiAodHlwZW9mIGtleSA9PT0gJ3N0cmluZycgPyBrZXkgOiBTdHJpbmcuZnJvbUNoYXJDb2RlKGtleSkpLnRvVXBwZXJDYXNlKCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGluc2VydCh0ZXh0KSB7XG4gICAgICAgIHRleHQgPSB0ZXh0XG4gICAgICAgICAgICAucmVwbGFjZSgvJi9nLCAnJmFtcDsnKVxuICAgICAgICAgICAgLnJlcGxhY2UoLzwvZywgJyZsdDsnKVxuICAgICAgICAgICAgLnJlcGxhY2UoLz4vZywgJyZndDsnKVxuICAgICAgICAgICAgLnJlcGxhY2UoL1wiL2csICcmcXVvdDsnKVxuICAgICAgICAgICAgLnJlcGxhY2UoLycvZywgJyYjMDM5OycpO1xuICAgICAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnaW5zZXJ0SFRNTCcsIGZhbHNlLCB0ZXh0KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZGVib3VuY2UoY2IsIHdhaXQpIHtcbiAgICAgICAgbGV0IHRpbWVvdXQgPSAwO1xuICAgICAgICByZXR1cm4gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgICAgIHRpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiBjYiguLi5hcmdzKSwgd2FpdCk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGZ1bmN0aW9uIGZpbmRQYWRkaW5nKHRleHQpIHtcbiAgICAgICAgLy8gRmluZCBiZWdpbm5pbmcgb2YgcHJldmlvdXMgbGluZS5cbiAgICAgICAgbGV0IGkgPSB0ZXh0Lmxlbmd0aCAtIDE7XG4gICAgICAgIHdoaWxlIChpID49IDAgJiYgdGV4dFtpXSAhPT0gJ1xcbicpXG4gICAgICAgICAgICBpLS07XG4gICAgICAgIGkrKztcbiAgICAgICAgLy8gRmluZCBwYWRkaW5nIG9mIHRoZSBsaW5lLlxuICAgICAgICBsZXQgaiA9IGk7XG4gICAgICAgIHdoaWxlIChqIDwgdGV4dC5sZW5ndGggJiYgL1sgXFx0XS8udGVzdCh0ZXh0W2pdKSlcbiAgICAgICAgICAgIGorKztcbiAgICAgICAgcmV0dXJuIFt0ZXh0LnN1YnN0cmluZyhpLCBqKSB8fCAnJywgaSwgal07XG4gICAgfVxuICAgIGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gZWRpdG9yLnRleHRDb250ZW50IHx8ICcnO1xuICAgIH1cbiAgICBmdW5jdGlvbiBwcmV2ZW50RGVmYXVsdChldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBnZXRTZWxlY3Rpb24oKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKCgoX2EgPSBlZGl0b3IucGFyZW50Tm9kZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm5vZGVUeXBlKSA9PSBOb2RlLkRPQ1VNRU5UX0ZSQUdNRU5UX05PREUpIHtcbiAgICAgICAgICAgIHJldHVybiBlZGl0b3IucGFyZW50Tm9kZS5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICB1cGRhdGVPcHRpb25zKG5ld09wdGlvbnMpIHtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24ob3B0aW9ucywgbmV3T3B0aW9ucyk7XG4gICAgICAgIH0sXG4gICAgICAgIHVwZGF0ZUNvZGUoY29kZSkge1xuICAgICAgICAgICAgZWRpdG9yLnRleHRDb250ZW50ID0gY29kZTtcbiAgICAgICAgICAgIGhpZ2hsaWdodChlZGl0b3IpO1xuICAgICAgICB9LFxuICAgICAgICBvblVwZGF0ZShjYikge1xuICAgICAgICAgICAgY2FsbGJhY2sgPSBjYjtcbiAgICAgICAgfSxcbiAgICAgICAgdG9TdHJpbmcsXG4gICAgICAgIHNhdmUsXG4gICAgICAgIHJlc3RvcmUsXG4gICAgICAgIHJlY29yZEhpc3RvcnksXG4gICAgICAgIGRlc3Ryb3koKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBbdHlwZSwgZm5dIG9mIGxpc3RlbmVycykge1xuICAgICAgICAgICAgICAgIGVkaXRvci5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGZuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9O1xufVxuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fID0gbmV3IFVSTChcIi4vaWNvbnMvbWVudV9GSUxMMF93Z2h0NDAwX0dSQUQwX29wc3oyNC5zdmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYC5CYXJlTURFIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1pdGVtczogc3RyZXRjaDtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgYm9yZGVyOiBub25lO1xuICBib3JkZXItcmFkaXVzOiAwcHg7XG4gIG1hcmdpbjogMDtcbiAgbWF4LWhlaWdodDogMTAwJTtcbiAgbWF4LXdpZHRoOiAxMDAlO1xuICBwYWRkaW5nOiAwO1xufVxuLkJhcmVNREUuZnVsbHNjcmVlbiB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgbWF4LXdpZHRoOiAxMDAlO1xuICBtYXgtaGVpZ2h0OiAxMDAlO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIHJpZ2h0OiAwO1xuICBib3R0b206IDA7XG4gIGJvcmRlci1yYWRpdXM6IDA7XG4gIGJvcmRlcjogbm9uZTtcbiAgei1pbmRleDogMTAwMDtcbn1cbi5CYXJlTURFICoge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xufVxuLkJhcmVNREUgLnRvb2xiYXIge1xuICBhbGw6IHVuc2V0O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIG1hcmdpbjogMDtcbiAgaGVpZ2h0OiA0NHB4O1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBib3JkZXItcmFkaXVzOiAwO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDQ0O1xuICBjb2xvcjogd2hpdGU7XG4gIHBhZGRpbmc6IDZweDtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZmxleC1ncm93OiAwO1xufVxuLkJhcmVNREUgLnRvb2xiYXIgLkVkaXRvck1lbnUge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDZweDtcbiAgd2lkdGg6IDMycHg7XG4gIGhlaWdodDogMzJweDtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgbWFyZ2luOiAwO1xufVxuLkJhcmVNREUgLnRvb2xiYXIgLkVkaXRvck1lbnUgYnV0dG9uIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGJvcmRlcjogbm9uZTtcbiAgd2lkdGg6IDMycHg7XG4gIGhlaWdodDogMzJweDtcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fX30pO1xufVxuLkJhcmVNREUgLnRvb2xiYXIgLkVkaXRvck1lbnUgLm1lbnVJdGVtcyB7XG4gIG1pbi13aWR0aDogMjUwcHg7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2JkYmRiZDtcbiAgcGFkZGluZzogMDtcbiAgbWFyZ2luOiAwO1xuICBsaW5lLWhlaWdodDogMTAwJTtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBib3gtc2hhZG93OiAwcHggMHB4IDI0cHggcmdiYSgwLCAwLCAwLCAwLjgpO1xufVxuLkJhcmVNREUgLnRvb2xiYXIgLkVkaXRvck1lbnUgLm1lbnVJdGVtcyAuSXRlbSB7XG4gIGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmO1xuICBwYWRkaW5nOiA2cHggMTJweDtcbiAgbWFyZ2luOiAwO1xuICBsaW5lLWhlaWdodDogMTAwJTtcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNhYWE7XG4gIGNvbG9yOiAjMzMzO1xufVxuLkJhcmVNREUgLnRvb2xiYXIgLkVkaXRvck1lbnUgLm1lbnVJdGVtcyAuSXRlbTpmaXJzdC1jaGlsZCB7XG4gIHBhZGRpbmctdG9wOiA4cHg7XG59XG4uQmFyZU1ERSAudG9vbGJhciAuRWRpdG9yTWVudSAubWVudUl0ZW1zIC5JdGVtOmxhc3QtY2hpbGQge1xuICBib3JkZXItYm90dG9tOiBub25lO1xuICBwYWRkaW5nLWJvdHRvbTogOHB4O1xufVxuLkJhcmVNREUgLnRvb2xiYXIgLkVkaXRvck1lbnUgLm1lbnVJdGVtcyAuSXRlbTpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6IGdyYXk7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cbi5CYXJlTURFIC50b29sYmFyLm1vZGlmaWVkIC5UQnV0dG9uLmFsZXJ0ZWQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBvcmFuZ2VyZWQ7XG4gIGJvcmRlcjogbm9uZTtcbn1cbi5CYXJlTURFIC50b29sYmFyLm1vZGlmaWVkIC5UQnV0dG9uLmFsZXJ0ZWQ6aG92ZXIge1xuICBib3JkZXItY29sb3I6IG9yYW5nZXJlZDtcbn1cbi5CYXJlTURFIC50b29sYmFyIC5kaXZpZGVyIHtcbiAgd2lkdGg6IDJweDtcbiAgZmxleC1ncm93OiAwO1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbi1yaWdodDogOHB4O1xuICBtYXJnaW4tbGVmdDogMnB4O1xuICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQoMGRlZywgZ3JheSwgZ3JheSAycHgsIHRyYW5zcGFyZW50IDJweCwgdHJhbnNwYXJlbnQgNXB4KTtcbiAgYmFja2dyb3VuZC1zaXplOiAycHggNXB4O1xuICBiYWNrZ3JvdW5kLXJlcGVhdDogcmVwZWF0O1xufVxuLkJhcmVNREUgLnRvb2xiYXIgYnV0dG9uIHtcbiAgYWxsOiB1bnNldDtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAwLjVzO1xuICBhcHBlYXJhbmNlOiBub25lO1xuICBib3JkZXI6IDFweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xuICB3aWR0aDogMzJweDtcbiAgaGVpZ2h0OiAzMnB4O1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgbWFyZ2luLXJpZ2h0OiA2cHg7XG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlciBjZW50ZXI7XG4gIGJhY2tncm91bmQtc2l6ZTogMjRweCAyNHB4O1xufVxuLkJhcmVNREUgLnRvb2xiYXIgYnV0dG9uIHN2ZyB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbn1cbi5CYXJlTURFIC50b29sYmFyIGJ1dHRvbi5mb3JtYXR0aW5nIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XG4gIGJvcmRlci1jb2xvcjogYmxhY2s7XG59XG4uQmFyZU1ERSAudG9vbGJhciBidXR0b24uZm9ybWF0dGluZyBzdmcge1xuICBvcGFjaXR5OiAwLjk7XG59XG4uQmFyZU1ERSAudG9vbGJhciBidXR0b246aG92ZXIge1xuICBib3JkZXItY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC42KTtcbn1cbi5CYXJlTURFIC50b29sYmFyIGJ1dHRvbi5vbiB7XG4gIGJvcmRlci1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjMpO1xufVxuLkJhcmVNREUgLnRvb2xiYXIgYnV0dG9uOmxhc3QtY2hpbGQge1xuICBtYXJnaW4tcmlnaHQ6IDA7XG59XG4uQmFyZU1ERSAud29ya0FyZWEge1xuICBhbGw6IHVuc2V0O1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICB3aWR0aDogMTAwJTtcbiAgZmxleC1ncm93OiAxO1xuICBmbGV4LXNocmluazogMTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24tY29udGVudDogc3RyZXRjaDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgYmFja2dyb3VuZC1jb2xvcjogI2NjY2NjYztcbiAgbWluLWhlaWdodDogMjAwcHg7XG4gIG1hcmdpbjogMDtcbiAgcGFkZGluZzogMDtcbn1cbi5CYXJlTURFIC53b3JrQXJlYSAuY29kZUphciwgLkJhcmVNREUgLndvcmtBcmVhIC5wcmV2aWV3IHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGZsZXgtZ3JvdzogMTtcbiAgZmxleC1zaHJpbms6IDE7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIG1heC13aWR0aDogMTAwJTtcbiAgbWFyZ2luOiAwO1xuICBzY3JvbGxiYXItd2lkdGg6IHRoaW47XG4gIHNjcm9sbGJhci1jb2xvcjogIzQ0NCAjZGRkZGRkO1xufVxuLkJhcmVNREUgLndvcmtBcmVhIC5jb2RlSmFyOjotd2Via2l0LXNjcm9sbGJhciwgLkJhcmVNREUgLndvcmtBcmVhIC5wcmV2aWV3Ojotd2Via2l0LXNjcm9sbGJhciB7XG4gIHdpZHRoOiA0cHg7XG59XG4uQmFyZU1ERSAud29ya0FyZWEgLmNvZGVKYXI6Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrLCAuQmFyZU1ERSAud29ya0FyZWEgLnByZXZpZXc6Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrIHtcbiAgYmFja2dyb3VuZDogI2RkZGRkZDtcbn1cbi5CYXJlTURFIC53b3JrQXJlYSAuY29kZUphcjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIsIC5CYXJlTURFIC53b3JrQXJlYSAucHJldmlldzo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDQ0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIC13ZWJraXQtYm9yZGVyLXJhZGl1czogNHB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuLkJhcmVNREUgLndvcmtBcmVhIC5jb2RlSmFyIHtcbiAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMDtcbiAgZm9udC1mYW1pbHk6IENvbnNvbGFzLCBNb25hY28sIFwiQW5kYWxlIE1vbm9cIiwgXCJVYnVudHUgTW9ub1wiLCB1aS1tb25vc3BhY2UsIG1vbm9zcGFjZTtcbiAgZm9udC1zaXplOiAxOHB4O1xuICBsaW5lLWhlaWdodDogMTUwJTtcbiAgY29sb3I6ICMzMzM7XG4gIGZsZXgtZ3JvdzogMTtcbiAgcGFkZGluZzogOHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTRlM2UyO1xuICBvdmVyZmxvdzogYXV0bztcbiAgZmxleC1iYXNpczogMDtcbn1cbi5CYXJlTURFIC53b3JrQXJlYSAucHJldmlldyB7XG4gIGJvcmRlci1yYWRpdXM6IDA7XG4gIGZsZXgtZ3JvdzogMTtcbiAgcGFkZGluZzogMDtcbiAgbWFyZ2luOiAwO1xuICB3aWR0aDogNTAlO1xuICBib3JkZXItbGVmdDogMXB4IHNvbGlkICNkZGQ7XG4gIG92ZXJmbG93OiBhdXRvO1xuICBmbGV4LWJhc2lzOiAwO1xufVxuLkJhcmVNREUgLndvcmtBcmVhIC5wcmV2aWV3IGlmcmFtZSB7XG4gIGFsbDogdW5zZXQ7XG4gIHdpZHRoOiAxMDAlO1xuICBkaXNwbGF5OiBibG9jaztcbiAgYm9yZGVyOiBub25lO1xuICBtYXJnaW46IDA7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG59XG4uQmFyZU1ERS5ub1ByZXZpZXcgLnByZXZpZXcge1xuICBkaXNwbGF5OiBub25lO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG4uQmFyZU1ERS5mdWxsUHJldmlldyAuY29kZUphciB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG4uQmFyZU1ERS5mdWxsUHJldmlldyAud29ya0FyZWEgLnByZXZpZXcge1xuICBkaXNwbGF5OiBibG9jayAhaW1wb3J0YW50O1xuICB3aWR0aDogMTAwJTtcbiAgbWF4LXdpZHRoOiAxMDAlO1xufVxuLkJhcmVNREUuZnVsbFByZXZpZXcgLndvcmtBcmVhIC5wcmV2aWV3IGlmcmFtZSB7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4uY29kZUphciAudG9rZW4uaHIge1xuICBsZXR0ZXItc3BhY2luZzogMC41ZW07XG59XG4uY29kZUphciAudG9rZW4uaW1wb3J0YW50IHtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIGNvbG9yOiBkYXJrcmVkO1xufVxuLmNvZGVKYXIgLnRva2VuLnRpdGxlIHtcbiAgbGluZS1oZWlnaHQ6IDFlbTtcbiAgZm9udC1zaXplOiAxLjJlbTtcbn1cbi5jb2RlSmFyIC50b2tlbi5zdHJpa2UgLmNvbnRlbnQge1xuICB0ZXh0LWRlY29yYXRpb246IGxpbmUtdGhyb3VnaDtcbn1cbi5jb2RlSmFyIC50b2tlbi5jb2RlLWxhbmd1YWdlIHtcbiAgb3BhY2l0eTogMC41O1xufVxuLmNvZGVKYXIgLnRva2VuLmNvZGUtYmxvY2sge1xuICBjb2xvcjogIzE5OTBiODtcbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9jb21wb25lbnRzL0JhcmVNREUvbWRlZC5zY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBRUUsYUFBQTtFQUNBLHNCQUFBO0VBQ0Esc0JBQUE7RUFDQSxzQkFBQTtFQUNBLHNCQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUlBLFVBQUE7QUFIRjtBQUtFO0VBQ0UsZUFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLE1BQUE7RUFD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QUNBLFdBQUE7RUFDQSxlQUFBO0FBdEJOO0FBdUJNO0VBQ0UsV0FBQTtBQXJCUjs7QUErQkk7RUFDRSxxQkFBQTtBQTVCTjtBQThCSTtFQUNFLGlCQUFBO0VBQ0EsY0FBQTtBQTVCTjtBQThCSTtFQUNFLGdCQUFBO0VBQ0EsZ0JBQUE7QUE1Qk47QUErQk07RUFDRSw2QkFBQTtBQTdCUjtBQWdDSTtFQUNFLFlBQUE7QUE5Qk47QUFnQ0k7RUFDRSxjQUFBO0FBOUJOXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi5CYXJlTURFe1xcbiAgLy8gYWxsOiBpbml0aWFsO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktaXRlbXM6IHN0cmV0Y2g7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBib3JkZXI6IG5vbmU7IC8vMXB4IHNvbGlkICM2NjY7XFxuICBib3JkZXItcmFkaXVzOiAwcHg7XFxuICBtYXJnaW46MDtcXG4gIG1heC1oZWlnaHQ6IDEwMCU7XFxuICBtYXgtd2lkdGg6IDEwMCU7XFxuICAvLyBvdmVyZmxvdzogaGlkZGVuO1xcbiAgLy8gbWF4LWhlaWdodDogMTAwJTtcXG4gIC8vIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHBhZGRpbmc6IDA7XFxuICAvLyBiYWNrZ3JvdW5kLWNvbG9yOiAjY2NjO1xcbiAgJi5mdWxsc2NyZWVue1xcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgIG1heC13aWR0aDogMTAwJTtcXG4gICAgbWF4LWhlaWdodDogMTAwJTtcXG4gICAgdG9wOiAwO1xcbiAgICBsZWZ0OiAwO1xcbiAgICByaWdodDowO1xcbiAgICBib3R0b206MDtcXG4gICAgYm9yZGVyLXJhZGl1czogMDtcXG4gICAgYm9yZGVyOiBub25lO1xcbiAgICB6LWluZGV4OiAxMDAwO1xcbiAgfVxcbiAgKntcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIH1cXG4gIC50b29sYmFye1xcbiAgICBhbGw6IHVuc2V0O1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgaGVpZ2h0OiA0NHB4O1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICAvLyBtYXJnaW46IC0xcHggLTFweCAwIC0xcHg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDA7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM0NDQgIDtcXG4gICAgY29sb3I6IHdoaXRlO1xcbiAgICBwYWRkaW5nOiA2cHg7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGZsZXgtZ3JvdzogMDtcXG4gICAgLkVkaXRvck1lbnV7XFxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgIGxlZnQ6IDZweDtcXG4gICAgICB3aWR0aDogMzJweDtcXG4gICAgICBoZWlnaHQ6IDMycHg7XFxuICAgICAgdGV4dC1hbGlnbjogbGVmdDtcXG4gICAgICBtYXJnaW46IDA7XFxuICAgICAgYnV0dG9ue1xcbiAgICAgICAgZGlzcGxheTpibG9jaztcXG4gICAgICAgIGJvcmRlcjogbm9uZTtcXG4gICAgICAgIHdpZHRoOiAzMnB4O1xcbiAgICAgICAgaGVpZ2h0OiAzMnB4O1xcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFxcXCIuL2ljb25zL21lbnVfRklMTDBfd2dodDQwMF9HUkFEMF9vcHN6MjQuc3ZnXFxcIik7XFxuICAgICAgfVxcbiAgICAgIC5tZW51SXRlbXN7XFxuICAgICAgICBtaW4td2lkdGg6IDI1MHB4O1xcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2JkYmRiZDtcXG4gICAgICAgIHBhZGRpbmc6IDA7XFxuICAgICAgICBtYXJnaW46MDtcXG4gICAgICAgIGxpbmUtaGVpZ2h0OiAxMDAlO1xcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgICAgIGJveC1zaGFkb3c6IDBweCAwcHggMjRweCByZ2JhKCAwICwgMCAsIDAgLCAwLjggKTtcXG4gICAgICAgIC5JdGVte1xcbiAgICAgICAgICBmb250LWZhbWlseTogc2Fucy1zZXJpZjtcXG4gICAgICAgICAgcGFkZGluZzogNnB4IDEycHg7XFxuICAgICAgICAgIG1hcmdpbjowO1xcbiAgICAgICAgICBsaW5lLWhlaWdodDogMTAwJTtcXG4gICAgICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNhYWE7XFxuICAgICAgICAgIGNvbG9yOiAjMzMzO1xcbiAgICAgICAgICAmOmZpcnN0LWNoaWxke1xcbiAgICAgICAgICAgIHBhZGRpbmctdG9wOiA4cHg7IFxcbiAgICAgICAgICB9XFxuICAgICAgICAgICY6bGFzdC1jaGlsZHtcXG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiBub25lO1xcbiAgICAgICAgICAgIHBhZGRpbmctYm90dG9tOiA4cHg7XFxuICAgICAgICAgIH1cXG4gICAgICAgICAgJjpob3ZlcntcXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBncmF5O1xcbiAgICAgICAgICAgIGNvbG9yOiB3aGl0ZTtcXG4gICAgICAgICAgfVxcbiAgICAgICAgfVxcbiAgICAgIH1cXG5cXG5cXG4gICAgfVxcbiAgICAmLm1vZGlmaWVkIC5UQnV0dG9uLmFsZXJ0ZWR7XFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogb3JhbmdlcmVkO1xcbiAgICAgIGJvcmRlcjogbm9uZTtcXG4gICAgICAmOmhvdmVye1xcbiAgICAgICAgYm9yZGVyLWNvbG9yOiBvcmFuZ2VyZWQ7XFxuICAgICAgfVxcbiAgICB9XFxuXFxuICAgIC5kaXZpZGVye1xcbiAgICAgIHdpZHRoOiAycHg7XFxuICAgICAgZmxleC1ncm93OiAwO1xcbiAgICAgIG1hcmdpbjogMDtcXG4gICAgICBwYWRkaW5nOjA7XFxuICAgICAgbWFyZ2luLXJpZ2h0OiA4cHg7XFxuICAgICAgbWFyZ2luLWxlZnQ6IDJweDtcXG4gICAgICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQoIDBkZWcgLCBncmF5LCBncmF5IDJweCwgdHJhbnNwYXJlbnQgMnB4LCB0cmFuc3BhcmVudCA1cHggKTtcXG4gICAgICBiYWNrZ3JvdW5kLXNpemU6IDJweCA1cHg7XFxuICAgICAgYmFja2dyb3VuZC1yZXBlYXQ6IHJlcGVhdDtcXG4gICAgfVxcblxcbiAgICBidXR0b257XFxuICAgICAgYWxsOnVuc2V0O1xcbiAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgICAgLy8gZGlzcGxheTogYmxvY2s7XFxuICAgICAgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAuNXM7XFxuICAgICAgYXBwZWFyYW5jZTogbm9uZTtcXG4gICAgICBib3JkZXI6IDFweCBzb2xpZCB0cmFuc3BhcmVudDtcXG4gICAgICBib3JkZXItcmFkaXVzOiA2cHg7XFxuICAgICAgd2lkdGg6IDMycHg7XFxuICAgICAgaGVpZ2h0OiAzMnB4O1xcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgICAgbWFyZ2luLXJpZ2h0OiA2cHg7XFxuICAgICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgY2VudGVyO1xcbiAgICAgIGJhY2tncm91bmQtc2l6ZTogMjRweCAyNHB4O1xcbiAgICAgIHN2Z3tcXG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxuICAgICAgfVxcbiAgICAgICYuZm9ybWF0dGluZ3tcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgICAgICAgYm9yZGVyLWNvbG9yOiBibGFjaztcXG4gICAgICAgIHN2Z3tcXG4gICAgICAgICAgb3BhY2l0eTogMC45O1xcbiAgICAgICAgfVxcbiAgICAgIH1cXG4gICAgICAmOmhvdmVye1xcbiAgICAgICAgYm9yZGVyLWNvbG9yOiByZ2JhKDI1NSwyNTUsMjU1LDAuNik7XFxuICAgICAgfVxcbiAgICAgICYub257XFxuICAgICAgICBib3JkZXItY29sb3I6IHJnYmEoMjU1LDI1NSwyNTUsMC4zKTtcXG4gICAgICB9XFxuICAgICAgJjpsYXN0LWNoaWxke1xcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiAwO1xcbiAgICAgIH1cXG4gICAgfVxcbiAgfVxcbiAgLndvcmtBcmVhe1xcbiAgICBhbGw6IHVuc2V0O1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICB3aWR0aDoxMDAlO1xcbiAgICBmbGV4LWdyb3c6IDE7XFxuICAgIGZsZXgtc2hyaW5rOiAxO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAvLyBqdXN0aWZ5LWNvbnRlbnQ6IHN0cmV0Y2g7XFxuICAgIGFsaWduLWNvbnRlbnQ6IHN0cmV0Y2g7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNjY2NjY2M7IC8vaW4gbWVtb3J5IG9mIGJlbG92ZWQgTmV0c2NhcGUgTmF2aWdhdG9yXFxuICAgIG1pbi1oZWlnaHQ6IDIwMHB4O1xcbiAgICBtYXJnaW46IDA7XFxuICAgIHBhZGRpbmc6MDtcXG4gICAgLy8gbWF4LWhlaWdodDogMTAwJTtcXG4gICAgLmNvZGVKYXIgLCAucHJldmlld3tcXG4gICAgICAvLyBhbGw6IHVuc2V0O1xcbiAgICAgIGRpc3BsYXk6YmxvY2s7XFxuICAgICAgZmxleC1ncm93OiAxO1xcbiAgICAgIGZsZXgtc2hyaW5rOjE7XFxuICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgICBtYXgtd2lkdGg6IDEwMCU7XFxuICAgICAgbWFyZ2luOiAwO1xcbiAgICAgIHNjcm9sbGJhci13aWR0aDogdGhpbjtcXG4gICAgICBzY3JvbGxiYXItY29sb3I6ICM0NDQgI2RkZGRkZDtcXG4gICAgICAmOjotd2Via2l0LXNjcm9sbGJhcntcXG4gICAgICAgIHdpZHRoOiA0cHg7XFxuICAgICAgfVxcbiAgICAgICY6Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNre1xcbiAgICAgICAgYmFja2dyb3VuZDogI2RkZGRkZDtcXG4gICAgICB9XFxuICAgICAgJjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIge1xcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzQ0NDtcXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gICAgICAgIC13ZWJraXQtYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgICB9XFxuICAgIH1cXG5cXG4gICAgLmNvZGVKYXJ7XFxuICAgICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMDtcXG4gICAgICBmb250LWZhbWlseTogQ29uc29sYXMsIE1vbmFjbywgJ0FuZGFsZSBNb25vJywgJ1VidW50dSBNb25vJywgdWktbW9ub3NwYWNlICwgbW9ub3NwYWNlO1xcblxcbiAgICAgIC8vIDo6c3BlbGxpbmctZXJyb3J7XFxuICAgICAgLy8gICBiYWNrZ3JvdW5kLWNvbG9yOiB5ZWxsb3c7XFxuICAgICAgLy8gfVxcbiAgICAgIGZvbnQtc2l6ZTogMThweDtcXG4gICAgICBsaW5lLWhlaWdodDogMTUwJTtcXG4gICAgICBjb2xvcjogIzMzMztcXG4gICAgICBmbGV4LWdyb3c6IDE7XFxuICAgICAgcGFkZGluZzogOHB4O1xcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNlNGUzZTI7XFxuICAgICAgb3ZlcmZsb3c6IGF1dG87XFxuICAgICAgZmxleC1iYXNpczowO1xcblxcbiAgICB9XFxuICAgIC5wcmV2aWV3e1xcbiAgICAgIGJvcmRlci1yYWRpdXM6IDA7XFxuICAgICAgZmxleC1ncm93OiAxO1xcbiAgICAgIHBhZGRpbmc6IDA7XFxuICAgICAgbWFyZ2luOjA7XFxuICAgICAgd2lkdGg6IDUwJTtcXG4gICAgICBib3JkZXItbGVmdDogMXB4IHNvbGlkICNkZGQ7XFxuICAgICAgb3ZlcmZsb3c6IGF1dG87XFxuICAgICAgZmxleC1iYXNpczogMDtcXG5cXG4gICAgICBpZnJhbWV7XFxuICAgICAgICBhbGw6dW5zZXQ7XFxuICAgICAgICB3aWR0aDoxMDAlO1xcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgICBib3JkZXI6IG5vbmU7XFxuICAgICAgICBtYXJnaW46MDtcXG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgICAgfVxcbiAgICB9XFxuICB9XFxuICAmLm5vUHJldmlld3tcXG4gICAgLnByZXZpZXd7XFxuICAgICAgZGlzcGxheTogbm9uZTtcXG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIH1cXG4gIH1cXG4gICYuZnVsbFByZXZpZXd7XFxuICAgIC5jb2RlSmFye1xcbiAgICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgIH1cXG4gICAgLndvcmtBcmVhIC5wcmV2aWV3e1xcbiAgICAgIGRpc3BsYXk6IGJsb2NrICFpbXBvcnRhbnQ7XFxuICAgICAgd2lkdGg6IDEwMCU7XFxuICAgICAgbWF4LXdpZHRoOiAxMDAlO1xcbiAgICAgIGlmcmFtZXtcXG4gICAgICAgIHdpZHRoOiAxMDAlO1xcbiAgICAgIH1cXG4gICAgfVxcbiAgfVxcbn1cXG5cXG4vL3NvbWUgYWRkaXRpb25zXFxuXFxuLmNvZGVKYXJ7XFxuICAudG9rZW57XFxuICAgICYuaHJ7XFxuICAgICAgbGV0dGVyLXNwYWNpbmc6IC41ZW07IFxcbiAgICB9XFxuICAgICYuaW1wb3J0YW50e1xcbiAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgICAgIGNvbG9yOiBkYXJrcmVkO1xcbiAgICB9XFxuICAgICYudGl0bGV7XFxuICAgICAgbGluZS1oZWlnaHQ6IDFlbTtcXG4gICAgICBmb250LXNpemU6IDEuMmVtO1xcbiAgICB9XFxuICAgICYuc3RyaWtle1xcbiAgICAgIC5jb250ZW50e1xcbiAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBsaW5lLXRocm91Z2g7XFxuICAgICAgfVxcbiAgICB9XFxuICAgICYuY29kZS1sYW5ndWFnZXtcXG4gICAgICBvcGFjaXR5OiAwLjU7XFxuICAgIH1cXG4gICAgJi5jb2RlLWJsb2Nre1xcbiAgICAgIGNvbG9yOiAjMTk5MGI4O1xcbiAgICB9XFxuICB9XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgLyogUHJpc21KUyAxLjI5LjBcbmh0dHBzOi8vcHJpc21qcy5jb20vZG93bmxvYWQuaHRtbCN0aGVtZXM9cHJpc20tY295Jmxhbmd1YWdlcz1tYXJrdXArY3NzK2NsaWtlK2phdmFzY3JpcHQgKi9cbi8qKlxuICogcHJpc20uanMgQ295IHRoZW1lIGZvciBKYXZhU2NyaXB0LCBDb2ZmZWVTY3JpcHQsIENTUyBhbmQgSFRNTFxuICogQmFzZWQgb24gaHR0cHM6Ly9naXRodWIuY29tL3RzaGVkb3Ivd29ya3Nob3Atd3AtdGhlbWUgKEV4YW1wbGU6IGh0dHA6Ly93b3Jrc2hvcC5rYW5zYW4uY29tL2NhdGVnb3J5L3Nlc3Npb25zL2Jhc2ljcyBvciBodHRwOi8vd29ya3Nob3AudGltc2hlZG9yLmNvbS9jYXRlZ29yeS9zZXNzaW9ucy9iYXNpY3MpO1xuICogQGF1dGhvciBUaW0gIFNoZWRvclxuICovXG4vKiBjb2RlW2NsYXNzKj1cImxhbmd1YWdlLVwiXSwgKi9cbi8qIHByZVtjbGFzcyo9XCJsYW5ndWFnZS1cIl0geyAqL1xuLyogXHRjb2xvcjogYmxhY2s7ICovXG4vKiBcdGJhY2tncm91bmQ6IG5vbmU7ICovXG4vKiBcdGZvbnQtZmFtaWx5OiBDb25zb2xhcywgTW9uYWNvLCAnQW5kYWxlIE1vbm8nLCAnVWJ1bnR1IE1vbm8nLCBtb25vc3BhY2U7ICovXG4vKiBcdGZvbnQtc2l6ZTogMWVtOyAqL1xuLyogXHR0ZXh0LWFsaWduOiBsZWZ0OyAqL1xuLyogXHR3aGl0ZS1zcGFjZTogcHJlOyAqL1xuLyogXHR3b3JkLXNwYWNpbmc6IG5vcm1hbDsgKi9cbi8qIFx0d29yZC1icmVhazogbm9ybWFsOyAqL1xuLyogXHR3b3JkLXdyYXA6IG5vcm1hbDsgKi9cbi8qIFx0bGluZS1oZWlnaHQ6IDEuNTsgKi9cbi8qIFx0LW1vei10YWItc2l6ZTogNDsgKi9cbi8qIFx0LW8tdGFiLXNpemU6IDQ7ICovXG4vKiBcdHRhYi1zaXplOiA0OyAqL1xuLyogXHQtd2Via2l0LWh5cGhlbnM6IG5vbmU7ICovXG4vKiBcdC1tb3otaHlwaGVuczogbm9uZTsgKi9cbi8qIFx0LW1zLWh5cGhlbnM6IG5vbmU7ICovXG4vKiBcdGh5cGhlbnM6IG5vbmU7ICovXG4vKiB9ICovXG4vKi8xKiBDb2RlIGJsb2NrcyAqMS8gKi9cbi8qLzEqICovXG4vKnByZVtjbGFzcyo9XCJsYW5ndWFnZS1cIl0geyAqL1xuLypcdHBvc2l0aW9uOiByZWxhdGl2ZTsgKi9cbi8qXHRtYXJnaW46IC41ZW0gMDsgKi9cbi8qXHRvdmVyZmxvdzogdmlzaWJsZTsgKi9cbi8qXHRwYWRkaW5nOiAxcHg7ICovXG4vKn0gKi9cbi8qcHJlW2NsYXNzKj1cImxhbmd1YWdlLVwiXSA+IGNvZGUgeyAqL1xuLypcdHBvc2l0aW9uOiByZWxhdGl2ZTsgKi9cbi8qXHR6LWluZGV4OiAxOyAqL1xuLypcdGJvcmRlci1sZWZ0OiAxMHB4IHNvbGlkICMzNThjY2I7ICovXG4vKlx0Ym94LXNoYWRvdzogLTFweCAwcHggMHB4IDBweCAjMzU4Y2NiLCAwcHggMHB4IDBweCAxcHggI2RmZGZkZjsgKi9cbi8qXHRiYWNrZ3JvdW5kLWNvbG9yOiAjZmRmZGZkOyAqL1xuLypcdGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0cmFuc3BhcmVudCA1MCUsIHJnYmEoNjksIDE0MiwgMjA5LCAwLjA0KSA1MCUpOyAqL1xuLypcdGJhY2tncm91bmQtc2l6ZTogM2VtIDNlbTsgKi9cbi8qXHRiYWNrZ3JvdW5kLW9yaWdpbjogY29udGVudC1ib3g7ICovXG4vKlx0YmFja2dyb3VuZC1hdHRhY2htZW50OiBsb2NhbDsgKi9cbi8qfSAqL1xuLypjb2RlW2NsYXNzKj1cImxhbmd1YWdlLVwiXSB7ICovXG4vKlx0bWF4LWhlaWdodDogaW5oZXJpdDsgKi9cbi8qXHRoZWlnaHQ6IGluaGVyaXQ7ICovXG4vKlx0cGFkZGluZzogMCAxZW07ICovXG4vKlx0ZGlzcGxheTogYmxvY2s7ICovXG4vKlx0b3ZlcmZsb3c6IGF1dG87ICovXG4vKn0gKi9cbi8qLy8gTWFyZ2luIGJvdHRvbSB0byBhY2NvbW1vZGF0ZSBzaGFkb3cgKi9cbi8qOm5vdChwcmUpID4gY29kZVtjbGFzcyo9XCJsYW5ndWFnZS1cIl0sICovXG4vKnByZVtjbGFzcyo9XCJsYW5ndWFnZS1cIl0geyAqL1xuLypcdGJhY2tncm91bmQtY29sb3I6ICNmZGZkZmQ7ICovXG4vKlx0LXdlYmtpdC1ib3gtc2l6aW5nOiBib3JkZXItYm94OyAqL1xuLypcdC1tb3otYm94LXNpemluZzogYm9yZGVyLWJveDsgKi9cbi8qXHRib3gtc2l6aW5nOiBib3JkZXItYm94OyAqL1xuLypcdG1hcmdpbi1ib3R0b206IDFlbTsgKi9cbi8qfSAqL1xuLyovLyBJbmxpbmUgY29kZSAqL1xuLyo6bm90KHByZSkgPiBjb2RlW2NsYXNzKj1cImxhbmd1YWdlLVwiXSB7ICovXG4vKlx0cG9zaXRpb246IHJlbGF0aXZlOyAqL1xuLypcdHBhZGRpbmc6IC4yZW07ICovXG4vKlx0Ym9yZGVyLXJhZGl1czogMC4zZW07ICovXG4vKlx0Y29sb3I6ICNjOTJjMmM7ICovXG4vKlx0Ym9yZGVyOiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjEpOyAqL1xuLypcdGRpc3BsYXk6IGlubGluZTsgKi9cbi8qXHR3aGl0ZS1zcGFjZTogbm9ybWFsOyAqL1xuLyp9ICovXG4vKnByZVtjbGFzcyo9XCJsYW5ndWFnZS1cIl06YmVmb3JlLCAqL1xuLypwcmVbY2xhc3MqPVwibGFuZ3VhZ2UtXCJdOmFmdGVyIHsgKi9cbi8qXHRjb250ZW50OiAnJzsgKi9cbi8qXHRkaXNwbGF5OiBibG9jazsgKi9cbi8qXHRwb3NpdGlvbjogYWJzb2x1dGU7ICovXG4vKlx0Ym90dG9tOiAwLjc1ZW07ICovXG4vKlx0bGVmdDogMC4xOGVtOyAqL1xuLypcdHdpZHRoOiA0MCU7ICovXG4vKlx0aGVpZ2h0OiAyMCU7ICovXG4vKlx0bWF4LWhlaWdodDogMTNlbTsgKi9cbi8qXHRib3gtc2hhZG93OiAwcHggMTNweCA4cHggIzk3OTc5NzsgKi9cbi8qXHQtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKC0yZGVnKTsgKi9cbi8qXHQtbW96LXRyYW5zZm9ybTogcm90YXRlKC0yZGVnKTsgKi9cbi8qXHQtbXMtdHJhbnNmb3JtOiByb3RhdGUoLTJkZWcpOyAqL1xuLypcdC1vLXRyYW5zZm9ybTogcm90YXRlKC0yZGVnKTsgKi9cbi8qXHR0cmFuc2Zvcm06IHJvdGF0ZSgtMmRlZyk7ICovXG4vKn0gKi9cbi8qcHJlW2NsYXNzKj1cImxhbmd1YWdlLVwiXTphZnRlciB7ICovXG4vKlx0cmlnaHQ6IDAuNzVlbTsgKi9cbi8qXHRsZWZ0OiBhdXRvOyAqL1xuLypcdC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMmRlZyk7ICovXG4vKlx0LW1vei10cmFuc2Zvcm06IHJvdGF0ZSgyZGVnKTsgKi9cbi8qXHQtbXMtdHJhbnNmb3JtOiByb3RhdGUoMmRlZyk7ICovXG4vKlx0LW8tdHJhbnNmb3JtOiByb3RhdGUoMmRlZyk7ICovXG4vKlx0dHJhbnNmb3JtOiByb3RhdGUoMmRlZyk7ICovXG4vKn0gKi9cbi50b2tlbi5jb21tZW50LFxuLnRva2VuLmJsb2NrLWNvbW1lbnQsXG4udG9rZW4ucHJvbG9nLFxuLnRva2VuLmRvY3R5cGUsXG4udG9rZW4uY2RhdGEge1xuICBjb2xvcjogIzdEOEI5OTtcbn1cblxuLnRva2VuLnB1bmN0dWF0aW9uIHtcbiAgY29sb3I6ICM1RjYzNjQ7XG59XG5cbi50b2tlbi5wcm9wZXJ0eSxcbi50b2tlbi50YWcsXG4udG9rZW4uYm9vbGVhbixcbi50b2tlbi5udW1iZXIsXG4udG9rZW4uZnVuY3Rpb24tbmFtZSxcbi50b2tlbi5jb25zdGFudCxcbi50b2tlbi5zeW1ib2wsXG4udG9rZW4uZGVsZXRlZCB7XG4gIGNvbG9yOiAjYzkyYzJjO1xufVxuXG4udG9rZW4uc2VsZWN0b3IsXG4udG9rZW4uYXR0ci1uYW1lLFxuLnRva2VuLnN0cmluZyxcbi50b2tlbi5jaGFyLFxuLnRva2VuLmZ1bmN0aW9uLFxuLnRva2VuLmJ1aWx0aW4sXG4udG9rZW4uaW5zZXJ0ZWQge1xuICBjb2xvcjogIzJmOWMwYTtcbn1cblxuLnRva2VuLm9wZXJhdG9yLFxuLnRva2VuLmVudGl0eSxcbi50b2tlbi51cmwsXG4udG9rZW4udmFyaWFibGUge1xuICBjb2xvcjogI2E2N2Y1OTtcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjUpO1xufVxuXG4udG9rZW4udXJsIC5jb250ZW50IHtcbiAgY29sb3I6IGRhcmtibHVlO1xuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbn1cblxuLnRva2VuLmF0cnVsZSxcbi50b2tlbi5hdHRyLXZhbHVlLFxuLnRva2VuLmtleXdvcmQsXG4udG9rZW4uY2xhc3MtbmFtZSB7XG4gIGNvbG9yOiAjMTk5MGI4O1xufVxuXG4udG9rZW4ucmVnZXgsXG4udG9rZW4uaW1wb3J0YW50IHtcbiAgY29sb3I6IGRhcmtyZWQ7XG59XG5cbi5sYW5ndWFnZS1jc3MgLnRva2VuLnN0cmluZyxcbi5zdHlsZSAudG9rZW4uc3RyaW5nIHtcbiAgY29sb3I6ICNhNjdmNTk7XG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC41KTtcbn1cblxuLnRva2VuLmltcG9ydGFudCB7XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG59XG5cbi50b2tlbi5ib2xkIHtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbi50b2tlbi5pdGFsaWMge1xuICBmb250LXN0eWxlOiBpdGFsaWM7XG59XG5cbi50b2tlbi5lbnRpdHkge1xuICBjdXJzb3I6IGhlbHA7XG59XG5cbi50b2tlbi5uYW1lc3BhY2Uge1xuICBvcGFjaXR5OiAwLjc7XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2N3B4KSB7XG4gIHByZVtjbGFzcyo9bGFuZ3VhZ2UtXTpiZWZvcmUsXG4gIHByZVtjbGFzcyo9bGFuZ3VhZ2UtXTphZnRlciB7XG4gICAgYm90dG9tOiAxNHB4O1xuICAgIGJveC1zaGFkb3c6IG5vbmU7XG4gIH1cbn1cbi8qIFBsdWdpbiBzdHlsZXM6IExpbmUgTnVtYmVycyAqL1xucHJlW2NsYXNzKj1sYW5ndWFnZS1dLmxpbmUtbnVtYmVycy5saW5lLW51bWJlcnMge1xuICBwYWRkaW5nLWxlZnQ6IDA7XG59XG5cbnByZVtjbGFzcyo9bGFuZ3VhZ2UtXS5saW5lLW51bWJlcnMubGluZS1udW1iZXJzIGNvZGUge1xuICBwYWRkaW5nLWxlZnQ6IDMuOGVtO1xufVxuXG5wcmVbY2xhc3MqPWxhbmd1YWdlLV0ubGluZS1udW1iZXJzLmxpbmUtbnVtYmVycyAubGluZS1udW1iZXJzLXJvd3Mge1xuICBsZWZ0OiAwO1xufVxuXG4vKiBQbHVnaW4gc3R5bGVzOiBMaW5lIEhpZ2hsaWdodCAqL1xucHJlW2NsYXNzKj1sYW5ndWFnZS1dW2RhdGEtbGluZV0ge1xuICBwYWRkaW5nLXRvcDogMDtcbiAgcGFkZGluZy1ib3R0b206IDA7XG4gIHBhZGRpbmctbGVmdDogMDtcbn1cblxucHJlW2RhdGEtbGluZV0gY29kZSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgcGFkZGluZy1sZWZ0OiA0ZW07XG59XG5cbnByZSAubGluZS1oaWdobGlnaHQge1xuICBtYXJnaW4tdG9wOiAwO1xufWAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL2NvbXBvbmVudHMvQmFyZU1ERS9wcmlzbS9wcmlzbV9maXhlZC5zY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBOzBGQUFBO0FBRUE7Ozs7RUFBQTtBQU1BLDhCQUFBO0FBQ0EsOEJBQUE7QUFDQSxtQkFBQTtBQUNBLHVCQUFBO0FBQ0EsNkVBQUE7QUFDQSxxQkFBQTtBQUNBLHVCQUFBO0FBQ0EsdUJBQUE7QUFDQSwyQkFBQTtBQUNBLHlCQUFBO0FBQ0Esd0JBQUE7QUFDQSx1QkFBQTtBQUVBLHVCQUFBO0FBQ0EscUJBQUE7QUFDQSxrQkFBQTtBQUVBLDRCQUFBO0FBQ0EseUJBQUE7QUFDQSx3QkFBQTtBQUNBLG9CQUFBO0FBQ0EsTUFBQTtBQUVBLHVCQUFBO0FBQ0EsT0FBQTtBQUNBLDZCQUFBO0FBQ0Esd0JBQUE7QUFDQSxvQkFBQTtBQUNBLHVCQUFBO0FBQ0Esa0JBQUE7QUFDQSxLQUFBO0FBRUEsb0NBQUE7QUFDQSx3QkFBQTtBQUNBLGdCQUFBO0FBQ0EscUNBQUE7QUFDQSxtRUFBQTtBQUNBLCtCQUFBO0FBQ0Esc0ZBQUE7QUFDQSw4QkFBQTtBQUNBLG9DQUFBO0FBQ0Esa0NBQUE7QUFDQSxLQUFBO0FBRUEsOEJBQUE7QUFDQSx5QkFBQTtBQUNBLHFCQUFBO0FBQ0Esb0JBQUE7QUFDQSxvQkFBQTtBQUNBLG9CQUFBO0FBQ0EsS0FBQTtBQUVBLDBDQUFBO0FBQ0EseUNBQUE7QUFDQSw2QkFBQTtBQUNBLCtCQUFBO0FBQ0Esb0NBQUE7QUFDQSxpQ0FBQTtBQUNBLDRCQUFBO0FBQ0Esd0JBQUE7QUFDQSxLQUFBO0FBRUEsa0JBQUE7QUFDQSwwQ0FBQTtBQUNBLHdCQUFBO0FBQ0EsbUJBQUE7QUFDQSwwQkFBQTtBQUNBLG9CQUFBO0FBQ0EsMENBQUE7QUFDQSxxQkFBQTtBQUNBLHlCQUFBO0FBQ0EsS0FBQTtBQUVBLG1DQUFBO0FBQ0EsbUNBQUE7QUFDQSxpQkFBQTtBQUNBLG9CQUFBO0FBQ0Esd0JBQUE7QUFDQSxvQkFBQTtBQUNBLGtCQUFBO0FBQ0EsZ0JBQUE7QUFDQSxpQkFBQTtBQUNBLHNCQUFBO0FBQ0Esc0NBQUE7QUFDQSxzQ0FBQTtBQUNBLG1DQUFBO0FBQ0Esa0NBQUE7QUFDQSxpQ0FBQTtBQUNBLDhCQUFBO0FBQ0EsS0FBQTtBQUVBLG1DQUFBO0FBQ0EsbUJBQUE7QUFDQSxnQkFBQTtBQUNBLHFDQUFBO0FBQ0Esa0NBQUE7QUFDQSxpQ0FBQTtBQUNBLGdDQUFBO0FBQ0EsNkJBQUE7QUFDQSxLQUFBO0FBR0E7Ozs7O0VBS0MsY0FBQTtBQVhEOztBQWNBO0VBQ0MsY0FBQTtBQVhEOztBQWNBOzs7Ozs7OztFQVFDLGNBQUE7QUFYRDs7QUFjQTs7Ozs7OztFQU9DLGNBQUE7QUFYRDs7QUFjQTs7OztFQUlBLGNBQUE7RUFDQyxvQ0FBQTtBQVhEOztBQWFBO0VBQ0UsZUFBQTtFQUNBLDBCQUFBO0FBVkY7O0FBYUE7Ozs7RUFJQyxjQUFBO0FBVkQ7O0FBZUE7O0VBRUEsY0FBQTtBQVpBOztBQWVBOztFQUVDLGNBQUE7RUFDQSxvQ0FBQTtBQVpEOztBQWVBO0VBQ0MsbUJBQUE7QUFaRDs7QUFlQTtFQUNDLGlCQUFBO0FBWkQ7O0FBY0E7RUFDQyxrQkFBQTtBQVhEOztBQWNBO0VBQ0MsWUFBQTtBQVhEOztBQWNBO0VBQ0MsWUFBQTtBQVhEOztBQWNBO0VBQ0M7O0lBRUMsWUFBQTtJQUNBLGdCQUFBO0VBWEE7QUFDRjtBQWVBLGdDQUFBO0FBQ0E7RUFDQyxlQUFBO0FBYkQ7O0FBZ0JBO0VBQ0MsbUJBQUE7QUFiRDs7QUFnQkE7RUFDQyxPQUFBO0FBYkQ7O0FBZ0JBLGtDQUFBO0FBQ0E7RUFDQyxjQUFBO0VBQ0EsaUJBQUE7RUFDQSxlQUFBO0FBYkQ7O0FBZUE7RUFDQyxrQkFBQTtFQUNBLGlCQUFBO0FBWkQ7O0FBY0E7RUFDQyxhQUFBO0FBWERcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyogUHJpc21KUyAxLjI5LjBcXG5odHRwczovL3ByaXNtanMuY29tL2Rvd25sb2FkLmh0bWwjdGhlbWVzPXByaXNtLWNveSZsYW5ndWFnZXM9bWFya3VwK2NzcytjbGlrZStqYXZhc2NyaXB0ICovXFxuLyoqXFxuICogcHJpc20uanMgQ295IHRoZW1lIGZvciBKYXZhU2NyaXB0LCBDb2ZmZWVTY3JpcHQsIENTUyBhbmQgSFRNTFxcbiAqIEJhc2VkIG9uIGh0dHBzOi8vZ2l0aHViLmNvbS90c2hlZG9yL3dvcmtzaG9wLXdwLXRoZW1lIChFeGFtcGxlOiBodHRwOi8vd29ya3Nob3Aua2Fuc2FuLmNvbS9jYXRlZ29yeS9zZXNzaW9ucy9iYXNpY3Mgb3IgaHR0cDovL3dvcmtzaG9wLnRpbXNoZWRvci5jb20vY2F0ZWdvcnkvc2Vzc2lvbnMvYmFzaWNzKTtcXG4gKiBAYXV0aG9yIFRpbSAgU2hlZG9yXFxuICovXFxuXFxuLyogY29kZVtjbGFzcyo9XFxcImxhbmd1YWdlLVxcXCJdLCAqL1xcbi8qIHByZVtjbGFzcyo9XFxcImxhbmd1YWdlLVxcXCJdIHsgKi9cXG4vKiBcXHRjb2xvcjogYmxhY2s7ICovXFxuLyogXFx0YmFja2dyb3VuZDogbm9uZTsgKi9cXG4vKiBcXHRmb250LWZhbWlseTogQ29uc29sYXMsIE1vbmFjbywgJ0FuZGFsZSBNb25vJywgJ1VidW50dSBNb25vJywgbW9ub3NwYWNlOyAqL1xcbi8qIFxcdGZvbnQtc2l6ZTogMWVtOyAqL1xcbi8qIFxcdHRleHQtYWxpZ246IGxlZnQ7ICovXFxuLyogXFx0d2hpdGUtc3BhY2U6IHByZTsgKi9cXG4vKiBcXHR3b3JkLXNwYWNpbmc6IG5vcm1hbDsgKi9cXG4vKiBcXHR3b3JkLWJyZWFrOiBub3JtYWw7ICovXFxuLyogXFx0d29yZC13cmFwOiBub3JtYWw7ICovXFxuLyogXFx0bGluZS1oZWlnaHQ6IDEuNTsgKi9cXG5cXG4vKiBcXHQtbW96LXRhYi1zaXplOiA0OyAqL1xcbi8qIFxcdC1vLXRhYi1zaXplOiA0OyAqL1xcbi8qIFxcdHRhYi1zaXplOiA0OyAqL1xcblxcbi8qIFxcdC13ZWJraXQtaHlwaGVuczogbm9uZTsgKi9cXG4vKiBcXHQtbW96LWh5cGhlbnM6IG5vbmU7ICovXFxuLyogXFx0LW1zLWh5cGhlbnM6IG5vbmU7ICovXFxuLyogXFx0aHlwaGVuczogbm9uZTsgKi9cXG4vKiB9ICovXFxuXFxuLyovMSogQ29kZSBibG9ja3MgKjEvICovXFxuLyovMSogKi9cXG4vKnByZVtjbGFzcyo9XFxcImxhbmd1YWdlLVxcXCJdIHsgKi9cXG4vKlxcdHBvc2l0aW9uOiByZWxhdGl2ZTsgKi9cXG4vKlxcdG1hcmdpbjogLjVlbSAwOyAqL1xcbi8qXFx0b3ZlcmZsb3c6IHZpc2libGU7ICovXFxuLypcXHRwYWRkaW5nOiAxcHg7ICovXFxuLyp9ICovXFxuXFxuLypwcmVbY2xhc3MqPVxcXCJsYW5ndWFnZS1cXFwiXSA+IGNvZGUgeyAqL1xcbi8qXFx0cG9zaXRpb246IHJlbGF0aXZlOyAqL1xcbi8qXFx0ei1pbmRleDogMTsgKi9cXG4vKlxcdGJvcmRlci1sZWZ0OiAxMHB4IHNvbGlkICMzNThjY2I7ICovXFxuLypcXHRib3gtc2hhZG93OiAtMXB4IDBweCAwcHggMHB4ICMzNThjY2IsIDBweCAwcHggMHB4IDFweCAjZGZkZmRmOyAqL1xcbi8qXFx0YmFja2dyb3VuZC1jb2xvcjogI2ZkZmRmZDsgKi9cXG4vKlxcdGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0cmFuc3BhcmVudCA1MCUsIHJnYmEoNjksIDE0MiwgMjA5LCAwLjA0KSA1MCUpOyAqL1xcbi8qXFx0YmFja2dyb3VuZC1zaXplOiAzZW0gM2VtOyAqL1xcbi8qXFx0YmFja2dyb3VuZC1vcmlnaW46IGNvbnRlbnQtYm94OyAqL1xcbi8qXFx0YmFja2dyb3VuZC1hdHRhY2htZW50OiBsb2NhbDsgKi9cXG4vKn0gKi9cXG5cXG4vKmNvZGVbY2xhc3MqPVxcXCJsYW5ndWFnZS1cXFwiXSB7ICovXFxuLypcXHRtYXgtaGVpZ2h0OiBpbmhlcml0OyAqL1xcbi8qXFx0aGVpZ2h0OiBpbmhlcml0OyAqL1xcbi8qXFx0cGFkZGluZzogMCAxZW07ICovXFxuLypcXHRkaXNwbGF5OiBibG9jazsgKi9cXG4vKlxcdG92ZXJmbG93OiBhdXRvOyAqL1xcbi8qfSAqL1xcblxcbi8qLy8gTWFyZ2luIGJvdHRvbSB0byBhY2NvbW1vZGF0ZSBzaGFkb3cgKi8gXFxuLyo6bm90KHByZSkgPiBjb2RlW2NsYXNzKj1cXFwibGFuZ3VhZ2UtXFxcIl0sICovXFxuLypwcmVbY2xhc3MqPVxcXCJsYW5ndWFnZS1cXFwiXSB7ICovXFxuLypcXHRiYWNrZ3JvdW5kLWNvbG9yOiAjZmRmZGZkOyAqL1xcbi8qXFx0LXdlYmtpdC1ib3gtc2l6aW5nOiBib3JkZXItYm94OyAqL1xcbi8qXFx0LW1vei1ib3gtc2l6aW5nOiBib3JkZXItYm94OyAqL1xcbi8qXFx0Ym94LXNpemluZzogYm9yZGVyLWJveDsgKi9cXG4vKlxcdG1hcmdpbi1ib3R0b206IDFlbTsgKi9cXG4vKn0gKi9cXG5cXG4vKi8vIElubGluZSBjb2RlICovIFxcbi8qOm5vdChwcmUpID4gY29kZVtjbGFzcyo9XFxcImxhbmd1YWdlLVxcXCJdIHsgKi9cXG4vKlxcdHBvc2l0aW9uOiByZWxhdGl2ZTsgKi9cXG4vKlxcdHBhZGRpbmc6IC4yZW07ICovXFxuLypcXHRib3JkZXItcmFkaXVzOiAwLjNlbTsgKi9cXG4vKlxcdGNvbG9yOiAjYzkyYzJjOyAqL1xcbi8qXFx0Ym9yZGVyOiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjEpOyAqL1xcbi8qXFx0ZGlzcGxheTogaW5saW5lOyAqL1xcbi8qXFx0d2hpdGUtc3BhY2U6IG5vcm1hbDsgKi9cXG4vKn0gKi9cXG5cXG4vKnByZVtjbGFzcyo9XFxcImxhbmd1YWdlLVxcXCJdOmJlZm9yZSwgKi9cXG4vKnByZVtjbGFzcyo9XFxcImxhbmd1YWdlLVxcXCJdOmFmdGVyIHsgKi9cXG4vKlxcdGNvbnRlbnQ6ICcnOyAqL1xcbi8qXFx0ZGlzcGxheTogYmxvY2s7ICovXFxuLypcXHRwb3NpdGlvbjogYWJzb2x1dGU7ICovXFxuLypcXHRib3R0b206IDAuNzVlbTsgKi9cXG4vKlxcdGxlZnQ6IDAuMThlbTsgKi9cXG4vKlxcdHdpZHRoOiA0MCU7ICovXFxuLypcXHRoZWlnaHQ6IDIwJTsgKi9cXG4vKlxcdG1heC1oZWlnaHQ6IDEzZW07ICovXFxuLypcXHRib3gtc2hhZG93OiAwcHggMTNweCA4cHggIzk3OTc5NzsgKi9cXG4vKlxcdC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoLTJkZWcpOyAqL1xcbi8qXFx0LW1vei10cmFuc2Zvcm06IHJvdGF0ZSgtMmRlZyk7ICovXFxuLypcXHQtbXMtdHJhbnNmb3JtOiByb3RhdGUoLTJkZWcpOyAqL1xcbi8qXFx0LW8tdHJhbnNmb3JtOiByb3RhdGUoLTJkZWcpOyAqL1xcbi8qXFx0dHJhbnNmb3JtOiByb3RhdGUoLTJkZWcpOyAqL1xcbi8qfSAqL1xcblxcbi8qcHJlW2NsYXNzKj1cXFwibGFuZ3VhZ2UtXFxcIl06YWZ0ZXIgeyAqL1xcbi8qXFx0cmlnaHQ6IDAuNzVlbTsgKi9cXG4vKlxcdGxlZnQ6IGF1dG87ICovXFxuLypcXHQtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDJkZWcpOyAqL1xcbi8qXFx0LW1vei10cmFuc2Zvcm06IHJvdGF0ZSgyZGVnKTsgKi9cXG4vKlxcdC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgyZGVnKTsgKi9cXG4vKlxcdC1vLXRyYW5zZm9ybTogcm90YXRlKDJkZWcpOyAqL1xcbi8qXFx0dHJhbnNmb3JtOiByb3RhdGUoMmRlZyk7ICovXFxuLyp9ICovXFxuXFxuXFxuLnRva2VuLmNvbW1lbnQsXFxuLnRva2VuLmJsb2NrLWNvbW1lbnQsXFxuLnRva2VuLnByb2xvZyxcXG4udG9rZW4uZG9jdHlwZSxcXG4udG9rZW4uY2RhdGEge1xcblxcdGNvbG9yOiAjN0Q4Qjk5O1xcbn1cXG5cXG4udG9rZW4ucHVuY3R1YXRpb24ge1xcblxcdGNvbG9yOiAjNUY2MzY0O1xcbn1cXG5cXG4udG9rZW4ucHJvcGVydHksXFxuLnRva2VuLnRhZyxcXG4udG9rZW4uYm9vbGVhbixcXG4udG9rZW4ubnVtYmVyLFxcbi50b2tlbi5mdW5jdGlvbi1uYW1lLFxcbi50b2tlbi5jb25zdGFudCxcXG4udG9rZW4uc3ltYm9sLFxcbi50b2tlbi5kZWxldGVkIHtcXG5cXHRjb2xvcjogI2M5MmMyYztcXG59XFxuXFxuLnRva2VuLnNlbGVjdG9yLFxcbi50b2tlbi5hdHRyLW5hbWUsXFxuLnRva2VuLnN0cmluZyxcXG4udG9rZW4uY2hhcixcXG4udG9rZW4uZnVuY3Rpb24sXFxuLnRva2VuLmJ1aWx0aW4sXFxuLnRva2VuLmluc2VydGVkIHtcXG5cXHRjb2xvcjogIzJmOWMwYTtcXG59XFxuXFxuLnRva2VuLm9wZXJhdG9yLFxcbi50b2tlbi5lbnRpdHksXFxuLnRva2VuLnVybCxcXG4udG9rZW4udmFyaWFibGUge1xcbmNvbG9yOiAjYTY3ZjU5O1xcblxcdGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC41KTtcXG59XFxuLnRva2VuLnVybCAuY29udGVudHtcXG4gIGNvbG9yOiBkYXJrYmx1ZTtcXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xcbn1cXG5cXG4udG9rZW4uYXRydWxlLFxcbi50b2tlbi5hdHRyLXZhbHVlLFxcbi50b2tlbi5rZXl3b3JkLFxcbi50b2tlbi5jbGFzcy1uYW1lIHtcXG5cXHRjb2xvcjogIzE5OTBiODtcXG59XFxuXFxuXFxuXFxuLnRva2VuLnJlZ2V4LFxcbi50b2tlbi5pbXBvcnRhbnQge1xcbmNvbG9yOiBkYXJrcmVkO1xcbn1cXG5cXG4ubGFuZ3VhZ2UtY3NzIC50b2tlbi5zdHJpbmcsXFxuLnN0eWxlIC50b2tlbi5zdHJpbmcge1xcblxcdGNvbG9yOiAjYTY3ZjU5O1xcblxcdGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC41KTtcXG59XFxuXFxuLnRva2VuLmltcG9ydGFudCB7XFxuXFx0Zm9udC13ZWlnaHQ6IG5vcm1hbDtcXG59XFxuXFxuLnRva2VuLmJvbGQge1xcblxcdGZvbnQtd2VpZ2h0OiBib2xkO1xcbn1cXG4udG9rZW4uaXRhbGljIHtcXG5cXHRmb250LXN0eWxlOiBpdGFsaWM7XFxufVxcblxcbi50b2tlbi5lbnRpdHkge1xcblxcdGN1cnNvcjogaGVscDtcXG59XFxuXFxuLnRva2VuLm5hbWVzcGFjZSB7XFxuXFx0b3BhY2l0eTogLjc7XFxufVxcblxcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2N3B4KSB7XFxuXFx0cHJlW2NsYXNzKj1cXFwibGFuZ3VhZ2UtXFxcIl06YmVmb3JlLFxcblxcdHByZVtjbGFzcyo9XFxcImxhbmd1YWdlLVxcXCJdOmFmdGVyIHtcXG5cXHRcXHRib3R0b206IDE0cHg7XFxuXFx0XFx0Ym94LXNoYWRvdzogbm9uZTtcXG5cXHR9XFxuXFxufVxcblxcbi8qIFBsdWdpbiBzdHlsZXM6IExpbmUgTnVtYmVycyAqL1xcbnByZVtjbGFzcyo9XFxcImxhbmd1YWdlLVxcXCJdLmxpbmUtbnVtYmVycy5saW5lLW51bWJlcnMge1xcblxcdHBhZGRpbmctbGVmdDogMDtcXG59XFxuXFxucHJlW2NsYXNzKj1cXFwibGFuZ3VhZ2UtXFxcIl0ubGluZS1udW1iZXJzLmxpbmUtbnVtYmVycyBjb2RlIHtcXG5cXHRwYWRkaW5nLWxlZnQ6IDMuOGVtO1xcbn1cXG5cXG5wcmVbY2xhc3MqPVxcXCJsYW5ndWFnZS1cXFwiXS5saW5lLW51bWJlcnMubGluZS1udW1iZXJzIC5saW5lLW51bWJlcnMtcm93cyB7XFxuXFx0bGVmdDogMDtcXG59XFxuXFxuLyogUGx1Z2luIHN0eWxlczogTGluZSBIaWdobGlnaHQgKi9cXG5wcmVbY2xhc3MqPVxcXCJsYW5ndWFnZS1cXFwiXVtkYXRhLWxpbmVdIHtcXG5cXHRwYWRkaW5nLXRvcDogMDtcXG5cXHRwYWRkaW5nLWJvdHRvbTogMDtcXG5cXHRwYWRkaW5nLWxlZnQ6IDA7XFxufVxcbnByZVtkYXRhLWxpbmVdIGNvZGUge1xcblxcdHBvc2l0aW9uOiByZWxhdGl2ZTtcXG5cXHRwYWRkaW5nLWxlZnQ6IDRlbTtcXG59XFxucHJlIC5saW5lLWhpZ2hsaWdodCB7XFxuXFx0bWFyZ2luLXRvcDogMDtcXG59XFxuXFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG4gIHVybCA9IFN0cmluZyh1cmwuX19lc01vZHVsZSA/IHVybC5kZWZhdWx0IDogdXJsKTtcblxuICAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cbiAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgdXJsID0gdXJsLnNsaWNlKDEsIC0xKTtcbiAgfVxuICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgdXJsICs9IG9wdGlvbnMuaGFzaDtcbiAgfVxuXG4gIC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgLy8gU2VlIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcbiAgaWYgKC9bXCInKCkgXFx0XFxuXXwoJTIwKS8udGVzdCh1cmwpIHx8IG9wdGlvbnMubmVlZFF1b3Rlcykge1xuICAgIHJldHVybiBcIlxcXCJcIi5jb25jYXQodXJsLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKS5yZXBsYWNlKC9cXG4vZywgXCJcXFxcblwiKSwgXCJcXFwiXCIpO1xuICB9XG4gIHJldHVybiB1cmw7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwidmFyIG49ZnVuY3Rpb24odCxzLHIsZSl7dmFyIHU7c1swXT0wO2Zvcih2YXIgaD0xO2g8cy5sZW5ndGg7aCsrKXt2YXIgcD1zW2grK10sYT1zW2hdPyhzWzBdfD1wPzE6MixyW3NbaCsrXV0pOnNbKytoXTszPT09cD9lWzBdPWE6ND09PXA/ZVsxXT1PYmplY3QuYXNzaWduKGVbMV18fHt9LGEpOjU9PT1wPyhlWzFdPWVbMV18fHt9KVtzWysraF1dPWE6Nj09PXA/ZVsxXVtzWysraF1dKz1hK1wiXCI6cD8odT10LmFwcGx5KGEsbih0LGEscixbXCJcIixudWxsXSkpLGUucHVzaCh1KSxhWzBdP3NbMF18PTI6KHNbaC0yXT0wLHNbaF09dSkpOmUucHVzaChhKX1yZXR1cm4gZX0sdD1uZXcgTWFwO2V4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHMpe3ZhciByPXQuZ2V0KHRoaXMpO3JldHVybiByfHwocj1uZXcgTWFwLHQuc2V0KHRoaXMscikpLChyPW4odGhpcyxyLmdldChzKXx8KHIuc2V0KHMscj1mdW5jdGlvbihuKXtmb3IodmFyIHQscyxyPTEsZT1cIlwiLHU9XCJcIixoPVswXSxwPWZ1bmN0aW9uKG4pezE9PT1yJiYobnx8KGU9ZS5yZXBsYWNlKC9eXFxzKlxcblxccyp8XFxzKlxcblxccyokL2csXCJcIikpKT9oLnB1c2goMCxuLGUpOjM9PT1yJiYobnx8ZSk/KGgucHVzaCgzLG4sZSkscj0yKToyPT09ciYmXCIuLi5cIj09PWUmJm4/aC5wdXNoKDQsbiwwKToyPT09ciYmZSYmIW4/aC5wdXNoKDUsMCwhMCxlKTpyPj01JiYoKGV8fCFuJiY1PT09cikmJihoLnB1c2gociwwLGUscykscj02KSxuJiYoaC5wdXNoKHIsbiwwLHMpLHI9NikpLGU9XCJcIn0sYT0wO2E8bi5sZW5ndGg7YSsrKXthJiYoMT09PXImJnAoKSxwKGEpKTtmb3IodmFyIGw9MDtsPG5bYV0ubGVuZ3RoO2wrKyl0PW5bYV1bbF0sMT09PXI/XCI8XCI9PT10PyhwKCksaD1baF0scj0zKTplKz10OjQ9PT1yP1wiLS1cIj09PWUmJlwiPlwiPT09dD8ocj0xLGU9XCJcIik6ZT10K2VbMF06dT90PT09dT91PVwiXCI6ZSs9dDonXCInPT09dHx8XCInXCI9PT10P3U9dDpcIj5cIj09PXQ/KHAoKSxyPTEpOnImJihcIj1cIj09PXQ/KHI9NSxzPWUsZT1cIlwiKTpcIi9cIj09PXQmJihyPDV8fFwiPlwiPT09blthXVtsKzFdKT8ocCgpLDM9PT1yJiYoaD1oWzBdKSxyPWgsKGg9aFswXSkucHVzaCgyLDAscikscj0wKTpcIiBcIj09PXR8fFwiXFx0XCI9PT10fHxcIlxcblwiPT09dHx8XCJcXHJcIj09PXQ/KHAoKSxyPTIpOmUrPXQpLDM9PT1yJiZcIiEtLVwiPT09ZSYmKHI9NCxoPWhbMF0pfXJldHVybiBwKCksaH0ocykpLHIpLGFyZ3VtZW50cyxbXSkpLmxlbmd0aD4xP3I6clswXX1cbiIsImltcG9ydHtoIGFzIHIsQ29tcG9uZW50IGFzIG8scmVuZGVyIGFzIHR9ZnJvbVwicHJlYWN0XCI7ZXhwb3J0e2gscmVuZGVyLENvbXBvbmVudH1mcm9tXCJwcmVhY3RcIjtpbXBvcnQgZSBmcm9tXCJodG1cIjt2YXIgbT1lLmJpbmQocik7ZXhwb3J0e20gYXMgaHRtbH07XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL21kZWQuc2Nzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL21kZWQuc2Nzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vcHJpc21fZml4ZWQuc2Nzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3ByaXNtX2ZpeGVkLnNjc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsImltcG9ydCB7ICBDb21wb25lbnR9IGZyb20gJ3ByZWFjdCc7XG5cbmV4cG9ydCBjbGFzcyBJZiBleHRlbmRzIENvbXBvbmVudHtcbiAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgIHN1cGVyKHByb3BzKVxuICB9XG5cbiAgcmVuZGVyKCl7XG4gICAgLy8gY29uc29sZS5sb2coXCJJRlwiICwgdGhpcy5wcm9wcy5jb25kaXRpb24pXG4gICAgaWYodGhpcy5wcm9wcy5jb25kaXRpb24pe1xuICAgICAgcmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW5cbiAgICB9ZWxzZXtcbiAgICByZXR1cm4gXCJcIlxuICAgIH1cbiAgfVxufVxuXG4iLCJpbXBvcnQgeyBDb21wb25lbnR9IGZyb20gXCJwcmVhY3RcIjtcbmltcG9ydCB7aHRtbH0gZnJvbSBcImh0bS9wcmVhY3RcIjtcbmltcG9ydCB7IElmIH0gZnJvbSBcIi4vSWZcIjtcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZW51IGV4dGVuZHMgQ29tcG9uZW50e1xuICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBvcGVuOiBmYWxzZVxuICAgIH1cbiAgICB0aGlzLmhhbmRsZUl0ZW0gPSB0aGlzLmhhbmRsZUl0ZW0uYmluZCh0aGlzKTtcbiAgICB0aGlzLmRvQ2xvc2U9dGhpcy5kb0Nsb3NlLmJpbmQodGhpcyk7XG5cbiAgfVxuXG4gIGhhbmRsZUl0ZW0oaSl7XG4gICAgdGhpcy5wcm9wcy5pdGVtc1tpXS5oYW5kbGVyKCk7XG4gICAgLy8gdGhpcy5zZXRTdGF0ZSh7XCJvcGVuXCIgOiBmYWxzZX0pO1xuICB9XG5cbiAgZG9DbG9zZShlKXtcbiAgICBjb25zb2xlLmxvZyhcImRvIGNsb3NlXCIpIFxuICAgIHRoaXMuc2V0U3RhdGUoeyBcIm9wZW5cIiA6IGZhbHNlIH0pXG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUocHJldmlvdXNQcm9wcywgcHJldmlvdXNTdGF0ZSl7XG4gICAgaWYodGhpcy5zdGF0ZS5vcGVuPT09dHJ1ZSAmJiBwcmV2aW91c1N0YXRlLm9wZW49PT1mYWxzZSl7XG4gICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmRvQ2xvc2UpXG4gICAgfVxuICAgIGlmKHRoaXMuc3RhdGUub3Blbj09PWZhbHNlICYmIHByZXZpb3VzU3RhdGUub3Blbj09PXRydWUpe1xuICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5kb0Nsb3NlKVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgICBcbiAgfVxuXG4gIHJlbmRlcigpe1xuICAgIGlmKCF0aGlzLnByb3BzLml0ZW1zIHx8IHRoaXMucHJvcHMuaXRlbXMubGVuZ3RoPT0wKXsgcmV0dXJuIFwiXCIgfVxuICAgIGNvbnN0IG15ID0gdGhpcztcbiAgICByZXR1cm4gaHRtbGBcbiAgICA8ZGl2IGNsYXNzPVwiRWRpdG9yTWVudVwiPlxuICAgIDxidXR0b25cbiAgICB0aXRsZT0ke3RoaXMucHJvcHMudGl0bGUgfHwgXCJNZW51XCJ9XG4gICAgb25DbGljaz0keyhlKT0+eyAgZS5zdG9wUHJvcGFnYXRpb24oKSA7IGUucHJldmVudERlZmF1bHQoKTsgdGhpcy5zZXRTdGF0ZSh7IG9wZW46ICF0aGlzLnN0YXRlLm9wZW4gfSkgfX0+PC9idXR0b24+XG4gICAgPCR7SWZ9IGNvbmRpdGlvbj0ke3RoaXMuc3RhdGUub3Blbn0+XG4gICAgPGRpdiBjbGFzcz1cIm1lbnVJdGVtc1wiIHN0eWxlPVwiei1pbmRleDoke3RoaXMucHJvcHMuekluZGV4fVwiPlxuICAgICR7IHRoaXMucHJvcHMuaXRlbXMubWFwKCBcbiAgICAoZSxpKT0+aHRtbGA8ZGl2IGNsYXNzPVwiSXRlbVwiIG9uTW91c2VEb3duPSR7ICgpPT5teS5oYW5kbGVJdGVtKGkpIH0+JHtlLmxhYmVsfTwvZGl2PmAgXG4gICAgKSB9XG4gICAgPC9kaXY+XG4gICAgPC8ke0lmfT5cbiAgICA8L2Rpdj5cblxuICAgIGBcbiAgICB9XG4gIH1cblxuXG5NZW51LmRlZmF1bHRQcm9wcyA9IHtcbiAgekluZGV4OiAxMTAwLFxufVxuXG4iLCJpbXBvcnQge2h0bWx9IGZyb20gXCJodG0vcHJlYWN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFRCdXR0b24oeyBcbiAgIHN2ZyxcbiAgIHN2Z09mZixcbiAgIGlzT24sXG4gICB0aXRsZSxcbiAgIG9uQ2xpY2ssXG4gICBjdXN0b21DbGFzc1xufSl7XG4gICAgc3ZnT2ZmID0gc3ZnT2ZmIHx8IHN2ZzsgXG4gICByZXR1cm4gaHRtbGA8YnV0dG9uIGNsYXNzPVwiVEJ1dHRvbiBcbiAgICR7IGlzT24gPyAnb24nIDogJ29mZicgfVxuICAgJHtjdXN0b21DbGFzcyB8fCAnJ31cbiAgIFwiXG4gICBzdHlsZT0ke3tcbiAgICAgICAgd2lkdGg6IFwiMzJweFwiLFxuICAgICAgICBoZWlnaHQ6IFwiMzJweFwiLFxuICAgICAgICBkaXNwbGF5OiBcImlubGluZS1ibG9ja1wiLFxuICAgICAgICBib3hTaXppbmc6IFwiYm9yZGVyLWJveFwiLFxuICAgICAgICBwYWRkaW5nOlwiM3B4XCIsXG4gICAgICAgIHVzZXJTZWxlY3Q6IFwibm9uZVwiLFxuICAgICAgICBib3JkZXJXaWR0aDpcIjFweFwiLFxuICAgICB9fVxuICAgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9JHt7X19odG1sOmlzT24/IHN2ZyA6IHN2Z09mZn19XG4gICB0aXRsZT0keyB0aXRsZXx8JycgfVxuICAgb25DbGljaz0keyB0eXBlb2Ygb25DbGljayA9PT0gJ2Z1bmN0aW9uJyA/IG9uQ2xpY2sgOiAoKT0+Y29uc29sZS5sb2coJ2J1dHRvbiBjbGlja2VkJykgfVxuICAgPjwvYnV0dG9uPmBcbn1cbiIsIi8qIFByaXNtSlMgMS4yOS4wXG5odHRwczovL3ByaXNtanMuY29tL2Rvd25sb2FkLmh0bWwjdGhlbWVzPXByaXNtLWNveSZsYW5ndWFnZXM9bWFya3VwK21hcmtkb3duICovXG4vLy8gPHJlZmVyZW5jZSBsaWI9XCJXZWJXb3JrZXJcIi8+XG5cbnZhciBfc2VsZiA9ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJylcblx0PyB3aW5kb3cgICAvLyBpZiBpbiBicm93c2VyXG5cdDogKFxuXHRcdCh0eXBlb2YgV29ya2VyR2xvYmFsU2NvcGUgIT09ICd1bmRlZmluZWQnICYmIHNlbGYgaW5zdGFuY2VvZiBXb3JrZXJHbG9iYWxTY29wZSlcblx0XHRcdD8gc2VsZiAvLyBpZiBpbiB3b3JrZXJcblx0XHRcdDoge30gICAvLyBpZiBpbiBub2RlIGpzXG5cdCk7XG5cbi8qKlxuICogUHJpc206IExpZ2h0d2VpZ2h0LCByb2J1c3QsIGVsZWdhbnQgc3ludGF4IGhpZ2hsaWdodGluZ1xuICpcbiAqIEBsaWNlbnNlIE1JVCA8aHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQ+XG4gKiBAYXV0aG9yIExlYSBWZXJvdSA8aHR0cHM6Ly9sZWEudmVyb3UubWU+XG4gKiBAbmFtZXNwYWNlXG4gKiBAcHVibGljXG4gKi9cbnZhciBQcmlzbSA9IChmdW5jdGlvbiAoX3NlbGYpIHtcblxuXHQvLyBQcml2YXRlIGhlbHBlciB2YXJzXG5cdHZhciBsYW5nID0gLyg/Ol58XFxzKWxhbmcoPzp1YWdlKT8tKFtcXHctXSspKD89XFxzfCQpL2k7XG5cdHZhciB1bmlxdWVJZCA9IDA7XG5cblx0Ly8gVGhlIGdyYW1tYXIgb2JqZWN0IGZvciBwbGFpbnRleHRcblx0dmFyIHBsYWluVGV4dEdyYW1tYXIgPSB7fTtcblxuXG5cdHZhciBfID0ge1xuXHRcdC8qKlxuXHRcdCAqIEJ5IGRlZmF1bHQsIFByaXNtIHdpbGwgYXR0ZW1wdCB0byBoaWdobGlnaHQgYWxsIGNvZGUgZWxlbWVudHMgKGJ5IGNhbGxpbmcge0BsaW5rIFByaXNtLmhpZ2hsaWdodEFsbH0pIG9uIHRoZVxuXHRcdCAqIGN1cnJlbnQgcGFnZSBhZnRlciB0aGUgcGFnZSBmaW5pc2hlZCBsb2FkaW5nLiBUaGlzIG1pZ2h0IGJlIGEgcHJvYmxlbSBpZiBlLmcuIHlvdSB3YW50ZWQgdG8gYXN5bmNocm9ub3VzbHkgbG9hZFxuXHRcdCAqIGFkZGl0aW9uYWwgbGFuZ3VhZ2VzIG9yIHBsdWdpbnMgeW91cnNlbGYuXG5cdFx0ICpcblx0XHQgKiBCeSBzZXR0aW5nIHRoaXMgdmFsdWUgdG8gYHRydWVgLCBQcmlzbSB3aWxsIG5vdCBhdXRvbWF0aWNhbGx5IGhpZ2hsaWdodCBhbGwgY29kZSBlbGVtZW50cyBvbiB0aGUgcGFnZS5cblx0XHQgKlxuXHRcdCAqIFlvdSBvYnZpb3VzbHkgaGF2ZSB0byBjaGFuZ2UgdGhpcyB2YWx1ZSBiZWZvcmUgdGhlIGF1dG9tYXRpYyBoaWdobGlnaHRpbmcgc3RhcnRlZC4gVG8gZG8gdGhpcywgeW91IGNhbiBhZGQgYW5cblx0XHQgKiBlbXB0eSBQcmlzbSBvYmplY3QgaW50byB0aGUgZ2xvYmFsIHNjb3BlIGJlZm9yZSBsb2FkaW5nIHRoZSBQcmlzbSBzY3JpcHQgbGlrZSB0aGlzOlxuXHRcdCAqXG5cdFx0ICogYGBganNcblx0XHQgKiB3aW5kb3cuUHJpc20gPSB3aW5kb3cuUHJpc20gfHwge307XG5cdFx0ICogUHJpc20ubWFudWFsID0gdHJ1ZTtcblx0XHQgKiAvLyBhZGQgYSBuZXcgPHNjcmlwdD4gdG8gbG9hZCBQcmlzbSdzIHNjcmlwdFxuXHRcdCAqIGBgYFxuXHRcdCAqXG5cdFx0ICogQGRlZmF1bHQgZmFsc2Vcblx0XHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0XHQgKiBAbWVtYmVyb2YgUHJpc21cblx0XHQgKiBAcHVibGljXG5cdFx0ICovXG5cdFx0Ly8gbWFudWFsOiBfc2VsZi5QcmlzbSAmJiBfc2VsZi5QcmlzbS5tYW51YWwsXG5cdFx0IG1hbnVhbDogdHJ1ZSwvL19zZWxmLlByaXNtICYmIF9zZWxmLlByaXNtLm1hbnVhbCxcblx0XHQvKipcblx0XHQgKiBCeSBkZWZhdWx0LCBpZiBQcmlzbSBpcyBpbiBhIHdlYiB3b3JrZXIsIGl0IGFzc3VtZXMgdGhhdCBpdCBpcyBpbiBhIHdvcmtlciBpdCBjcmVhdGVkIGl0c2VsZiwgc28gaXQgdXNlc1xuXHRcdCAqIGBhZGRFdmVudExpc3RlbmVyYCB0byBjb21tdW5pY2F0ZSB3aXRoIGl0cyBwYXJlbnQgaW5zdGFuY2UuIEhvd2V2ZXIsIGlmIHlvdSdyZSB1c2luZyBQcmlzbSBtYW51YWxseSBpbiB5b3VyXG5cdFx0ICogb3duIHdvcmtlciwgeW91IGRvbid0IHdhbnQgaXQgdG8gZG8gdGhpcy5cblx0XHQgKlxuXHRcdCAqIEJ5IHNldHRpbmcgdGhpcyB2YWx1ZSB0byBgdHJ1ZWAsIFByaXNtIHdpbGwgbm90IGFkZCBpdHMgb3duIGxpc3RlbmVycyB0byB0aGUgd29ya2VyLlxuXHRcdCAqXG5cdFx0ICogWW91IG9idmlvdXNseSBoYXZlIHRvIGNoYW5nZSB0aGlzIHZhbHVlIGJlZm9yZSBQcmlzbSBleGVjdXRlcy4gVG8gZG8gdGhpcywgeW91IGNhbiBhZGQgYW5cblx0XHQgKiBlbXB0eSBQcmlzbSBvYmplY3QgaW50byB0aGUgZ2xvYmFsIHNjb3BlIGJlZm9yZSBsb2FkaW5nIHRoZSBQcmlzbSBzY3JpcHQgbGlrZSB0aGlzOlxuXHRcdCAqXG5cdFx0ICogYGBganNcblx0XHQgKiB3aW5kb3cuUHJpc20gPSB3aW5kb3cuUHJpc20gfHwge307XG5cdFx0ICogUHJpc20uZGlzYWJsZVdvcmtlck1lc3NhZ2VIYW5kbGVyID0gdHJ1ZTtcblx0XHQgKiAvLyBMb2FkIFByaXNtJ3Mgc2NyaXB0XG5cdFx0ICogYGBgXG5cdFx0ICpcblx0XHQgKiBAZGVmYXVsdCBmYWxzZVxuXHRcdCAqIEB0eXBlIHtib29sZWFufVxuXHRcdCAqIEBtZW1iZXJvZiBQcmlzbVxuXHRcdCAqIEBwdWJsaWNcblx0XHQgKi9cblx0XHRkaXNhYmxlV29ya2VyTWVzc2FnZUhhbmRsZXI6IF9zZWxmLlByaXNtICYmIF9zZWxmLlByaXNtLmRpc2FibGVXb3JrZXJNZXNzYWdlSGFuZGxlcixcblxuXHRcdC8qKlxuXHRcdCAqIEEgbmFtZXNwYWNlIGZvciB1dGlsaXR5IG1ldGhvZHMuXG5cdFx0ICpcblx0XHQgKiBBbGwgZnVuY3Rpb24gaW4gdGhpcyBuYW1lc3BhY2UgdGhhdCBhcmUgbm90IGV4cGxpY2l0bHkgbWFya2VkIGFzIF9wdWJsaWNfIGFyZSBmb3IgX19pbnRlcm5hbCB1c2Ugb25seV9fIGFuZCBtYXlcblx0XHQgKiBjaGFuZ2Ugb3IgZGlzYXBwZWFyIGF0IGFueSB0aW1lLlxuXHRcdCAqXG5cdFx0ICogQG5hbWVzcGFjZVxuXHRcdCAqIEBtZW1iZXJvZiBQcmlzbVxuXHRcdCAqL1xuXHRcdHV0aWw6IHtcblx0XHRcdGVuY29kZTogZnVuY3Rpb24gZW5jb2RlKHRva2Vucykge1xuXHRcdFx0XHRpZiAodG9rZW5zIGluc3RhbmNlb2YgVG9rZW4pIHtcblx0XHRcdFx0XHRyZXR1cm4gbmV3IFRva2VuKHRva2Vucy50eXBlLCBlbmNvZGUodG9rZW5zLmNvbnRlbnQpLCB0b2tlbnMuYWxpYXMpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodG9rZW5zKSkge1xuXHRcdFx0XHRcdHJldHVybiB0b2tlbnMubWFwKGVuY29kZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRva2Vucy5yZXBsYWNlKC8mL2csICcmYW1wOycpLnJlcGxhY2UoLzwvZywgJyZsdDsnKS5yZXBsYWNlKC9cXHUwMGEwL2csICcgJyk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogUmV0dXJucyB0aGUgbmFtZSBvZiB0aGUgdHlwZSBvZiB0aGUgZ2l2ZW4gdmFsdWUuXG5cdFx0XHQgKlxuXHRcdFx0ICogQHBhcmFtIHthbnl9IG9cblx0XHRcdCAqIEByZXR1cm5zIHtzdHJpbmd9XG5cdFx0XHQgKiBAZXhhbXBsZVxuXHRcdFx0ICogdHlwZShudWxsKSAgICAgID09PSAnTnVsbCdcblx0XHRcdCAqIHR5cGUodW5kZWZpbmVkKSA9PT0gJ1VuZGVmaW5lZCdcblx0XHRcdCAqIHR5cGUoMTIzKSAgICAgICA9PT0gJ051bWJlcidcblx0XHRcdCAqIHR5cGUoJ2ZvbycpICAgICA9PT0gJ1N0cmluZydcblx0XHRcdCAqIHR5cGUodHJ1ZSkgICAgICA9PT0gJ0Jvb2xlYW4nXG5cdFx0XHQgKiB0eXBlKFsxLCAyXSkgICAgPT09ICdBcnJheSdcblx0XHRcdCAqIHR5cGUoe30pICAgICAgICA9PT0gJ09iamVjdCdcblx0XHRcdCAqIHR5cGUoU3RyaW5nKSAgICA9PT0gJ0Z1bmN0aW9uJ1xuXHRcdFx0ICogdHlwZSgvYWJjKy8pICAgID09PSAnUmVnRXhwJ1xuXHRcdFx0ICovXG5cdFx0XHR0eXBlOiBmdW5jdGlvbiAobykge1xuXHRcdFx0XHRyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTtcblx0XHRcdH0sXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogUmV0dXJucyBhIHVuaXF1ZSBudW1iZXIgZm9yIHRoZSBnaXZlbiBvYmplY3QuIExhdGVyIGNhbGxzIHdpbGwgc3RpbGwgcmV0dXJuIHRoZSBzYW1lIG51bWJlci5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0ge09iamVjdH0gb2JqXG5cdFx0XHQgKiBAcmV0dXJucyB7bnVtYmVyfVxuXHRcdFx0ICovXG5cdFx0XHRvYmpJZDogZnVuY3Rpb24gKG9iaikge1xuXHRcdFx0XHRpZiAoIW9ialsnX19pZCddKSB7XG5cdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgJ19faWQnLCB7IHZhbHVlOiArK3VuaXF1ZUlkIH0pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBvYmpbJ19faWQnXTtcblx0XHRcdH0sXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogQ3JlYXRlcyBhIGRlZXAgY2xvbmUgb2YgdGhlIGdpdmVuIG9iamVjdC5cblx0XHRcdCAqXG5cdFx0XHQgKiBUaGUgbWFpbiBpbnRlbmRlZCB1c2Ugb2YgdGhpcyBmdW5jdGlvbiBpcyB0byBjbG9uZSBsYW5ndWFnZSBkZWZpbml0aW9ucy5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0ge1R9IG9cblx0XHRcdCAqIEBwYXJhbSB7UmVjb3JkPG51bWJlciwgYW55Pn0gW3Zpc2l0ZWRdXG5cdFx0XHQgKiBAcmV0dXJucyB7VH1cblx0XHRcdCAqIEB0ZW1wbGF0ZSBUXG5cdFx0XHQgKi9cblx0XHRcdGNsb25lOiBmdW5jdGlvbiBkZWVwQ2xvbmUobywgdmlzaXRlZCkge1xuXHRcdFx0XHR2aXNpdGVkID0gdmlzaXRlZCB8fCB7fTtcblxuXHRcdFx0XHR2YXIgY2xvbmU7IHZhciBpZDtcblx0XHRcdFx0c3dpdGNoIChfLnV0aWwudHlwZShvKSkge1xuXHRcdFx0XHRcdGNhc2UgJ09iamVjdCc6XG5cdFx0XHRcdFx0XHRpZCA9IF8udXRpbC5vYmpJZChvKTtcblx0XHRcdFx0XHRcdGlmICh2aXNpdGVkW2lkXSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdmlzaXRlZFtpZF07XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRjbG9uZSA9IC8qKiBAdHlwZSB7UmVjb3JkPHN0cmluZywgYW55Pn0gKi8gKHt9KTtcblx0XHRcdFx0XHRcdHZpc2l0ZWRbaWRdID0gY2xvbmU7XG5cblx0XHRcdFx0XHRcdGZvciAodmFyIGtleSBpbiBvKSB7XG5cdFx0XHRcdFx0XHRcdGlmIChvLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0XHRcdFx0XHRjbG9uZVtrZXldID0gZGVlcENsb25lKG9ba2V5XSwgdmlzaXRlZCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0cmV0dXJuIC8qKiBAdHlwZSB7YW55fSAqLyAoY2xvbmUpO1xuXG5cdFx0XHRcdFx0Y2FzZSAnQXJyYXknOlxuXHRcdFx0XHRcdFx0aWQgPSBfLnV0aWwub2JqSWQobyk7XG5cdFx0XHRcdFx0XHRpZiAodmlzaXRlZFtpZF0pIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHZpc2l0ZWRbaWRdO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Y2xvbmUgPSBbXTtcblx0XHRcdFx0XHRcdHZpc2l0ZWRbaWRdID0gY2xvbmU7XG5cblx0XHRcdFx0XHRcdCgvKiogQHR5cGUge0FycmF5fSAqLygvKiogQHR5cGUge2FueX0gKi8obykpKS5mb3JFYWNoKGZ1bmN0aW9uICh2LCBpKSB7XG5cdFx0XHRcdFx0XHRcdGNsb25lW2ldID0gZGVlcENsb25lKHYsIHZpc2l0ZWQpO1xuXHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdHJldHVybiAvKiogQHR5cGUge2FueX0gKi8gKGNsb25lKTtcblxuXHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHRyZXR1cm4gbztcblx0XHRcdFx0fVxuXHRcdFx0fSxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBSZXR1cm5zIHRoZSBQcmlzbSBsYW5ndWFnZSBvZiB0aGUgZ2l2ZW4gZWxlbWVudCBzZXQgYnkgYSBgbGFuZ3VhZ2UteHh4eGAgb3IgYGxhbmcteHh4eGAgY2xhc3MuXG5cdFx0XHQgKlxuXHRcdFx0ICogSWYgbm8gbGFuZ3VhZ2UgaXMgc2V0IGZvciB0aGUgZWxlbWVudCBvciB0aGUgZWxlbWVudCBpcyBgbnVsbGAgb3IgYHVuZGVmaW5lZGAsIGBub25lYCB3aWxsIGJlIHJldHVybmVkLlxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxuXHRcdFx0ICogQHJldHVybnMge3N0cmluZ31cblx0XHRcdCAqL1xuXHRcdFx0Z2V0TGFuZ3VhZ2U6IGZ1bmN0aW9uIChlbGVtZW50KSB7XG5cdFx0XHRcdHdoaWxlIChlbGVtZW50KSB7XG5cdFx0XHRcdFx0dmFyIG0gPSBsYW5nLmV4ZWMoZWxlbWVudC5jbGFzc05hbWUpO1xuXHRcdFx0XHRcdGlmIChtKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gbVsxXS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbGVtZW50ID0gZWxlbWVudC5wYXJlbnRFbGVtZW50O1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiAnbm9uZSc7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIFNldHMgdGhlIFByaXNtIGBsYW5ndWFnZS14eHh4YCBjbGFzcyBvZiB0aGUgZ2l2ZW4gZWxlbWVudC5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcblx0XHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBsYW5ndWFnZVxuXHRcdFx0ICogQHJldHVybnMge3ZvaWR9XG5cdFx0XHQgKi9cblx0XHRcdHNldExhbmd1YWdlOiBmdW5jdGlvbiAoZWxlbWVudCwgbGFuZ3VhZ2UpIHtcblx0XHRcdFx0Ly8gcmVtb3ZlIGFsbCBgbGFuZ3VhZ2UteHh4eGAgY2xhc3Nlc1xuXHRcdFx0XHQvLyAodGhpcyBtaWdodCBsZWF2ZSBiZWhpbmQgYSBsZWFkaW5nIHNwYWNlKVxuXHRcdFx0XHRlbGVtZW50LmNsYXNzTmFtZSA9IGVsZW1lbnQuY2xhc3NOYW1lLnJlcGxhY2UoUmVnRXhwKGxhbmcsICdnaScpLCAnJyk7XG5cblx0XHRcdFx0Ly8gYWRkIHRoZSBuZXcgYGxhbmd1YWdlLXh4eHhgIGNsYXNzXG5cdFx0XHRcdC8vICh1c2luZyBgY2xhc3NMaXN0YCB3aWxsIGF1dG9tYXRpY2FsbHkgY2xlYW4gdXAgc3BhY2VzIGZvciB1cylcblx0XHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdsYW5ndWFnZS0nICsgbGFuZ3VhZ2UpO1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBSZXR1cm5zIHRoZSBzY3JpcHQgZWxlbWVudCB0aGF0IGlzIGN1cnJlbnRseSBleGVjdXRpbmcuXG5cdFx0XHQgKlxuXHRcdFx0ICogVGhpcyBkb2VzIF9fbm90X18gd29yayBmb3IgbGluZSBzY3JpcHQgZWxlbWVudC5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcmV0dXJucyB7SFRNTFNjcmlwdEVsZW1lbnQgfCBudWxsfVxuXHRcdFx0ICovXG5cdFx0XHRjdXJyZW50U2NyaXB0OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGlmICh0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCdjdXJyZW50U2NyaXB0JyBpbiBkb2N1bWVudCAmJiAxIDwgMiAvKiBoYWNrIHRvIHRyaXAgVFMnIGZsb3cgYW5hbHlzaXMgKi8pIHtcblx0XHRcdFx0XHRyZXR1cm4gLyoqIEB0eXBlIHthbnl9ICovIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIElFMTEgd29ya2Fyb3VuZFxuXHRcdFx0XHQvLyB3ZSdsbCBnZXQgdGhlIHNyYyBvZiB0aGUgY3VycmVudCBzY3JpcHQgYnkgcGFyc2luZyBJRTExJ3MgZXJyb3Igc3RhY2sgdHJhY2Vcblx0XHRcdFx0Ly8gdGhpcyB3aWxsIG5vdCB3b3JrIGZvciBpbmxpbmUgc2NyaXB0c1xuXG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCk7XG5cdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHRcdC8vIEdldCBmaWxlIHNyYyB1cmwgZnJvbSBzdGFjay4gU3BlY2lmaWNhbGx5IHdvcmtzIHdpdGggdGhlIGZvcm1hdCBvZiBzdGFjayB0cmFjZXMgaW4gSUUuXG5cdFx0XHRcdFx0Ly8gQSBzdGFjayB3aWxsIGxvb2sgbGlrZSB0aGlzOlxuXHRcdFx0XHRcdC8vXG5cdFx0XHRcdFx0Ly8gRXJyb3Jcblx0XHRcdFx0XHQvLyAgICBhdCBfLnV0aWwuY3VycmVudFNjcmlwdCAoaHR0cDovL2xvY2FsaG9zdC9jb21wb25lbnRzL3ByaXNtLWNvcmUuanM6MTE5OjUpXG5cdFx0XHRcdFx0Ly8gICAgYXQgR2xvYmFsIGNvZGUgKGh0dHA6Ly9sb2NhbGhvc3QvY29tcG9uZW50cy9wcmlzbS1jb3JlLmpzOjYwNjoxKVxuXG5cdFx0XHRcdFx0dmFyIHNyYyA9ICgvYXQgW14oXFxyXFxuXSpcXCgoLiopOlteOl0rOlteOl0rXFwpJC9pLmV4ZWMoZXJyLnN0YWNrKSB8fCBbXSlbMV07XG5cdFx0XHRcdFx0aWYgKHNyYykge1xuXHRcdFx0XHRcdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0Jyk7XG5cdFx0XHRcdFx0XHRmb3IgKHZhciBpIGluIHNjcmlwdHMpIHtcblx0XHRcdFx0XHRcdFx0aWYgKHNjcmlwdHNbaV0uc3JjID09IHNyYykge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBzY3JpcHRzW2ldO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIFJldHVybnMgd2hldGhlciBhIGdpdmVuIGNsYXNzIGlzIGFjdGl2ZSBmb3IgYGVsZW1lbnRgLlxuXHRcdFx0ICpcblx0XHRcdCAqIFRoZSBjbGFzcyBjYW4gYmUgYWN0aXZhdGVkIGlmIGBlbGVtZW50YCBvciBvbmUgb2YgaXRzIGFuY2VzdG9ycyBoYXMgdGhlIGdpdmVuIGNsYXNzIGFuZCBpdCBjYW4gYmUgZGVhY3RpdmF0ZWRcblx0XHRcdCAqIGlmIGBlbGVtZW50YCBvciBvbmUgb2YgaXRzIGFuY2VzdG9ycyBoYXMgdGhlIG5lZ2F0ZWQgdmVyc2lvbiBvZiB0aGUgZ2l2ZW4gY2xhc3MuIFRoZSBfbmVnYXRlZCB2ZXJzaW9uXyBvZiB0aGVcblx0XHRcdCAqIGdpdmVuIGNsYXNzIGlzIGp1c3QgdGhlIGdpdmVuIGNsYXNzIHdpdGggYSBgbm8tYCBwcmVmaXguXG5cdFx0XHQgKlxuXHRcdFx0ICogV2hldGhlciB0aGUgY2xhc3MgaXMgYWN0aXZlIGlzIGRldGVybWluZWQgYnkgdGhlIGNsb3Nlc3QgYW5jZXN0b3Igb2YgYGVsZW1lbnRgICh3aGVyZSBgZWxlbWVudGAgaXRzZWxmIGlzXG5cdFx0XHQgKiBjbG9zZXN0IGFuY2VzdG9yKSB0aGF0IGhhcyB0aGUgZ2l2ZW4gY2xhc3Mgb3IgdGhlIG5lZ2F0ZWQgdmVyc2lvbiBvZiBpdC4gSWYgbmVpdGhlciBgZWxlbWVudGAgbm9yIGFueSBvZiBpdHNcblx0XHRcdCAqIGFuY2VzdG9ycyBoYXZlIHRoZSBnaXZlbiBjbGFzcyBvciB0aGUgbmVnYXRlZCB2ZXJzaW9uIG9mIGl0LCB0aGVuIHRoZSBkZWZhdWx0IGFjdGl2YXRpb24gd2lsbCBiZSByZXR1cm5lZC5cblx0XHRcdCAqXG5cdFx0XHQgKiBJbiB0aGUgcGFyYWRveGljYWwgc2l0dWF0aW9uIHdoZXJlIHRoZSBjbG9zZXN0IGFuY2VzdG9yIGNvbnRhaW5zIF9fYm90aF9fIHRoZSBnaXZlbiBjbGFzcyBhbmQgdGhlIG5lZ2F0ZWRcblx0XHRcdCAqIHZlcnNpb24gb2YgaXQsIHRoZSBjbGFzcyBpcyBjb25zaWRlcmVkIGFjdGl2ZS5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcblx0XHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcblx0XHRcdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW2RlZmF1bHRBY3RpdmF0aW9uPWZhbHNlXVxuXHRcdFx0ICogQHJldHVybnMge2Jvb2xlYW59XG5cdFx0XHQgKi9cblx0XHRcdGlzQWN0aXZlOiBmdW5jdGlvbiAoZWxlbWVudCwgY2xhc3NOYW1lLCBkZWZhdWx0QWN0aXZhdGlvbikge1xuXHRcdFx0XHR2YXIgbm8gPSAnbm8tJyArIGNsYXNzTmFtZTtcblxuXHRcdFx0XHR3aGlsZSAoZWxlbWVudCkge1xuXHRcdFx0XHRcdHZhciBjbGFzc0xpc3QgPSBlbGVtZW50LmNsYXNzTGlzdDtcblx0XHRcdFx0XHRpZiAoY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSkpIHtcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoY2xhc3NMaXN0LmNvbnRhaW5zKG5vKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbGVtZW50ID0gZWxlbWVudC5wYXJlbnRFbGVtZW50O1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiAhIWRlZmF1bHRBY3RpdmF0aW9uO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBUaGlzIG5hbWVzcGFjZSBjb250YWlucyBhbGwgY3VycmVudGx5IGxvYWRlZCBsYW5ndWFnZXMgYW5kIHRoZSBzb21lIGhlbHBlciBmdW5jdGlvbnMgdG8gY3JlYXRlIGFuZCBtb2RpZnkgbGFuZ3VhZ2VzLlxuXHRcdCAqXG5cdFx0ICogQG5hbWVzcGFjZVxuXHRcdCAqIEBtZW1iZXJvZiBQcmlzbVxuXHRcdCAqIEBwdWJsaWNcblx0XHQgKi9cblx0XHRsYW5ndWFnZXM6IHtcblx0XHRcdC8qKlxuXHRcdFx0ICogVGhlIGdyYW1tYXIgZm9yIHBsYWluLCB1bmZvcm1hdHRlZCB0ZXh0LlxuXHRcdFx0ICovXG5cdFx0XHRwbGFpbjogcGxhaW5UZXh0R3JhbW1hcixcblx0XHRcdHBsYWludGV4dDogcGxhaW5UZXh0R3JhbW1hcixcblx0XHRcdHRleHQ6IHBsYWluVGV4dEdyYW1tYXIsXG5cdFx0XHR0eHQ6IHBsYWluVGV4dEdyYW1tYXIsXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogQ3JlYXRlcyBhIGRlZXAgY29weSBvZiB0aGUgbGFuZ3VhZ2Ugd2l0aCB0aGUgZ2l2ZW4gaWQgYW5kIGFwcGVuZHMgdGhlIGdpdmVuIHRva2Vucy5cblx0XHRcdCAqXG5cdFx0XHQgKiBJZiBhIHRva2VuIGluIGByZWRlZmAgYWxzbyBhcHBlYXJzIGluIHRoZSBjb3BpZWQgbGFuZ3VhZ2UsIHRoZW4gdGhlIGV4aXN0aW5nIHRva2VuIGluIHRoZSBjb3BpZWQgbGFuZ3VhZ2Vcblx0XHRcdCAqIHdpbGwgYmUgb3ZlcndyaXR0ZW4gYXQgaXRzIG9yaWdpbmFsIHBvc2l0aW9uLlxuXHRcdFx0ICpcblx0XHRcdCAqICMjIEJlc3QgcHJhY3RpY2VzXG5cdFx0XHQgKlxuXHRcdFx0ICogU2luY2UgdGhlIHBvc2l0aW9uIG9mIG92ZXJ3cml0aW5nIHRva2VucyAodG9rZW4gaW4gYHJlZGVmYCB0aGF0IG92ZXJ3cml0ZSB0b2tlbnMgaW4gdGhlIGNvcGllZCBsYW5ndWFnZSlcblx0XHRcdCAqIGRvZXNuJ3QgbWF0dGVyLCB0aGV5IGNhbiB0ZWNobmljYWxseSBiZSBpbiBhbnkgb3JkZXIuIEhvd2V2ZXIsIHRoaXMgY2FuIGJlIGNvbmZ1c2luZyB0byBvdGhlcnMgdGhhdCB0cnlpbmcgdG9cblx0XHRcdCAqIHVuZGVyc3RhbmQgdGhlIGxhbmd1YWdlIGRlZmluaXRpb24gYmVjYXVzZSwgbm9ybWFsbHksIHRoZSBvcmRlciBvZiB0b2tlbnMgbWF0dGVycyBpbiBQcmlzbSBncmFtbWFycy5cblx0XHRcdCAqXG5cdFx0XHQgKiBUaGVyZWZvcmUsIGl0IGlzIGVuY291cmFnZWQgdG8gb3JkZXIgb3ZlcndyaXRpbmcgdG9rZW5zIGFjY29yZGluZyB0byB0aGUgcG9zaXRpb25zIG9mIHRoZSBvdmVyd3JpdHRlbiB0b2tlbnMuXG5cdFx0XHQgKiBGdXJ0aGVybW9yZSwgYWxsIG5vbi1vdmVyd3JpdGluZyB0b2tlbnMgc2hvdWxkIGJlIHBsYWNlZCBhZnRlciB0aGUgb3ZlcndyaXRpbmcgb25lcy5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0ge3N0cmluZ30gaWQgVGhlIGlkIG9mIHRoZSBsYW5ndWFnZSB0byBleHRlbmQuIFRoaXMgaGFzIHRvIGJlIGEga2V5IGluIGBQcmlzbS5sYW5ndWFnZXNgLlxuXHRcdFx0ICogQHBhcmFtIHtHcmFtbWFyfSByZWRlZiBUaGUgbmV3IHRva2VucyB0byBhcHBlbmQuXG5cdFx0XHQgKiBAcmV0dXJucyB7R3JhbW1hcn0gVGhlIG5ldyBsYW5ndWFnZSBjcmVhdGVkLlxuXHRcdFx0ICogQHB1YmxpY1xuXHRcdFx0ICogQGV4YW1wbGVcblx0XHRcdCAqIFByaXNtLmxhbmd1YWdlc1snY3NzLXdpdGgtY29sb3JzJ10gPSBQcmlzbS5sYW5ndWFnZXMuZXh0ZW5kKCdjc3MnLCB7XG5cdFx0XHQgKiAgICAgLy8gUHJpc20ubGFuZ3VhZ2VzLmNzcyBhbHJlYWR5IGhhcyBhICdjb21tZW50JyB0b2tlbiwgc28gdGhpcyB0b2tlbiB3aWxsIG92ZXJ3cml0ZSBDU1MnICdjb21tZW50JyB0b2tlblxuXHRcdFx0ICogICAgIC8vIGF0IGl0cyBvcmlnaW5hbCBwb3NpdGlvblxuXHRcdFx0ICogICAgICdjb21tZW50JzogeyAuLi4gfSxcblx0XHRcdCAqICAgICAvLyBDU1MgZG9lc24ndCBoYXZlIGEgJ2NvbG9yJyB0b2tlbiwgc28gdGhpcyB0b2tlbiB3aWxsIGJlIGFwcGVuZGVkXG5cdFx0XHQgKiAgICAgJ2NvbG9yJzogL1xcYig/OnJlZHxncmVlbnxibHVlKVxcYi9cblx0XHRcdCAqIH0pO1xuXHRcdFx0ICovXG5cdFx0XHRleHRlbmQ6IGZ1bmN0aW9uIChpZCwgcmVkZWYpIHtcblx0XHRcdFx0dmFyIGxhbmcgPSBfLnV0aWwuY2xvbmUoXy5sYW5ndWFnZXNbaWRdKTtcblxuXHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gcmVkZWYpIHtcblx0XHRcdFx0XHRsYW5nW2tleV0gPSByZWRlZltrZXldO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIGxhbmc7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIEluc2VydHMgdG9rZW5zIF9iZWZvcmVfIGFub3RoZXIgdG9rZW4gaW4gYSBsYW5ndWFnZSBkZWZpbml0aW9uIG9yIGFueSBvdGhlciBncmFtbWFyLlxuXHRcdFx0ICpcblx0XHRcdCAqICMjIFVzYWdlXG5cdFx0XHQgKlxuXHRcdFx0ICogVGhpcyBoZWxwZXIgbWV0aG9kIG1ha2VzIGl0IGVhc3kgdG8gbW9kaWZ5IGV4aXN0aW5nIGxhbmd1YWdlcy4gRm9yIGV4YW1wbGUsIHRoZSBDU1MgbGFuZ3VhZ2UgZGVmaW5pdGlvblxuXHRcdFx0ICogbm90IG9ubHkgZGVmaW5lcyBDU1MgaGlnaGxpZ2h0aW5nIGZvciBDU1MgZG9jdW1lbnRzLCBidXQgYWxzbyBuZWVkcyB0byBkZWZpbmUgaGlnaGxpZ2h0aW5nIGZvciBDU1MgZW1iZWRkZWRcblx0XHRcdCAqIGluIEhUTUwgdGhyb3VnaCBgPHN0eWxlPmAgZWxlbWVudHMuIFRvIGRvIHRoaXMsIGl0IG5lZWRzIHRvIG1vZGlmeSBgUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cGAgYW5kIGFkZCB0aGVcblx0XHRcdCAqIGFwcHJvcHJpYXRlIHRva2Vucy4gSG93ZXZlciwgYFByaXNtLmxhbmd1YWdlcy5tYXJrdXBgIGlzIGEgcmVndWxhciBKYXZhU2NyaXB0IG9iamVjdCBsaXRlcmFsLCBzbyBpZiB5b3UgZG9cblx0XHRcdCAqIHRoaXM6XG5cdFx0XHQgKlxuXHRcdFx0ICogYGBganNcblx0XHRcdCAqIFByaXNtLmxhbmd1YWdlcy5tYXJrdXAuc3R5bGUgPSB7XG5cdFx0XHQgKiAgICAgLy8gdG9rZW5cblx0XHRcdCAqIH07XG5cdFx0XHQgKiBgYGBcblx0XHRcdCAqXG5cdFx0XHQgKiB0aGVuIHRoZSBgc3R5bGVgIHRva2VuIHdpbGwgYmUgYWRkZWQgKGFuZCBwcm9jZXNzZWQpIGF0IHRoZSBlbmQuIGBpbnNlcnRCZWZvcmVgIGFsbG93cyB5b3UgdG8gaW5zZXJ0IHRva2Vuc1xuXHRcdFx0ICogYmVmb3JlIGV4aXN0aW5nIHRva2Vucy4gRm9yIHRoZSBDU1MgZXhhbXBsZSBhYm92ZSwgeW91IHdvdWxkIHVzZSBpdCBsaWtlIHRoaXM6XG5cdFx0XHQgKlxuXHRcdFx0ICogYGBganNcblx0XHRcdCAqIFByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ21hcmt1cCcsICdjZGF0YScsIHtcblx0XHRcdCAqICAgICAnc3R5bGUnOiB7XG5cdFx0XHQgKiAgICAgICAgIC8vIHRva2VuXG5cdFx0XHQgKiAgICAgfVxuXHRcdFx0ICogfSk7XG5cdFx0XHQgKiBgYGBcblx0XHRcdCAqXG5cdFx0XHQgKiAjIyBTcGVjaWFsIGNhc2VzXG5cdFx0XHQgKlxuXHRcdFx0ICogSWYgdGhlIGdyYW1tYXJzIG9mIGBpbnNpZGVgIGFuZCBgaW5zZXJ0YCBoYXZlIHRva2VucyB3aXRoIHRoZSBzYW1lIG5hbWUsIHRoZSB0b2tlbnMgaW4gYGluc2lkZWAncyBncmFtbWFyXG5cdFx0XHQgKiB3aWxsIGJlIGlnbm9yZWQuXG5cdFx0XHQgKlxuXHRcdFx0ICogVGhpcyBiZWhhdmlvciBjYW4gYmUgdXNlZCB0byBpbnNlcnQgdG9rZW5zIGFmdGVyIGBiZWZvcmVgOlxuXHRcdFx0ICpcblx0XHRcdCAqIGBgYGpzXG5cdFx0XHQgKiBQcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdtYXJrdXAnLCAnY29tbWVudCcsIHtcblx0XHRcdCAqICAgICAnY29tbWVudCc6IFByaXNtLmxhbmd1YWdlcy5tYXJrdXAuY29tbWVudCxcblx0XHRcdCAqICAgICAvLyB0b2tlbnMgYWZ0ZXIgJ2NvbW1lbnQnXG5cdFx0XHQgKiB9KTtcblx0XHRcdCAqIGBgYFxuXHRcdFx0ICpcblx0XHRcdCAqICMjIExpbWl0YXRpb25zXG5cdFx0XHQgKlxuXHRcdFx0ICogVGhlIG1haW4gcHJvYmxlbSBgaW5zZXJ0QmVmb3JlYCBoYXMgdG8gc29sdmUgaXMgaXRlcmF0aW9uIG9yZGVyLiBTaW5jZSBFUzIwMTUsIHRoZSBpdGVyYXRpb24gb3JkZXIgZm9yIG9iamVjdFxuXHRcdFx0ICogcHJvcGVydGllcyBpcyBndWFyYW50ZWVkIHRvIGJlIHRoZSBpbnNlcnRpb24gb3JkZXIgKGV4Y2VwdCBmb3IgaW50ZWdlciBrZXlzKSBidXQgc29tZSBicm93c2VycyBiZWhhdmVcblx0XHRcdCAqIGRpZmZlcmVudGx5IHdoZW4ga2V5cyBhcmUgZGVsZXRlZCBhbmQgcmUtaW5zZXJ0ZWQuIFNvIGBpbnNlcnRCZWZvcmVgIGNhbid0IGJlIGltcGxlbWVudGVkIGJ5IHRlbXBvcmFyaWx5XG5cdFx0XHQgKiBkZWxldGluZyBwcm9wZXJ0aWVzIHdoaWNoIGlzIG5lY2Vzc2FyeSB0byBpbnNlcnQgYXQgYXJiaXRyYXJ5IHBvc2l0aW9ucy5cblx0XHRcdCAqXG5cdFx0XHQgKiBUbyBzb2x2ZSB0aGlzIHByb2JsZW0sIGBpbnNlcnRCZWZvcmVgIGRvZXNuJ3QgYWN0dWFsbHkgaW5zZXJ0IHRoZSBnaXZlbiB0b2tlbnMgaW50byB0aGUgdGFyZ2V0IG9iamVjdC5cblx0XHRcdCAqIEluc3RlYWQsIGl0IHdpbGwgY3JlYXRlIGEgbmV3IG9iamVjdCBhbmQgcmVwbGFjZSBhbGwgcmVmZXJlbmNlcyB0byB0aGUgdGFyZ2V0IG9iamVjdCB3aXRoIHRoZSBuZXcgb25lLiBUaGlzXG5cdFx0XHQgKiBjYW4gYmUgZG9uZSB3aXRob3V0IHRlbXBvcmFyaWx5IGRlbGV0aW5nIHByb3BlcnRpZXMsIHNvIHRoZSBpdGVyYXRpb24gb3JkZXIgaXMgd2VsbC1kZWZpbmVkLlxuXHRcdFx0ICpcblx0XHRcdCAqIEhvd2V2ZXIsIG9ubHkgcmVmZXJlbmNlcyB0aGF0IGNhbiBiZSByZWFjaGVkIGZyb20gYFByaXNtLmxhbmd1YWdlc2Agb3IgYGluc2VydGAgd2lsbCBiZSByZXBsYWNlZC4gSS5lLiBpZlxuXHRcdFx0ICogeW91IGhvbGQgdGhlIHRhcmdldCBvYmplY3QgaW4gYSB2YXJpYWJsZSwgdGhlbiB0aGUgdmFsdWUgb2YgdGhlIHZhcmlhYmxlIHdpbGwgbm90IGNoYW5nZS5cblx0XHRcdCAqXG5cdFx0XHQgKiBgYGBqc1xuXHRcdFx0ICogdmFyIG9sZE1hcmt1cCA9IFByaXNtLmxhbmd1YWdlcy5tYXJrdXA7XG5cdFx0XHQgKiB2YXIgbmV3TWFya3VwID0gUHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnbWFya3VwJywgJ2NvbW1lbnQnLCB7IC4uLiB9KTtcblx0XHRcdCAqXG5cdFx0XHQgKiBhc3NlcnQob2xkTWFya3VwICE9PSBQcmlzbS5sYW5ndWFnZXMubWFya3VwKTtcblx0XHRcdCAqIGFzc2VydChuZXdNYXJrdXAgPT09IFByaXNtLmxhbmd1YWdlcy5tYXJrdXApO1xuXHRcdFx0ICogYGBgXG5cdFx0XHQgKlxuXHRcdFx0ICogQHBhcmFtIHtzdHJpbmd9IGluc2lkZSBUaGUgcHJvcGVydHkgb2YgYHJvb3RgIChlLmcuIGEgbGFuZ3VhZ2UgaWQgaW4gYFByaXNtLmxhbmd1YWdlc2ApIHRoYXQgY29udGFpbnMgdGhlXG5cdFx0XHQgKiBvYmplY3QgdG8gYmUgbW9kaWZpZWQuXG5cdFx0XHQgKiBAcGFyYW0ge3N0cmluZ30gYmVmb3JlIFRoZSBrZXkgdG8gaW5zZXJ0IGJlZm9yZS5cblx0XHRcdCAqIEBwYXJhbSB7R3JhbW1hcn0gaW5zZXJ0IEFuIG9iamVjdCBjb250YWluaW5nIHRoZSBrZXktdmFsdWUgcGFpcnMgdG8gYmUgaW5zZXJ0ZWQuXG5cdFx0XHQgKiBAcGFyYW0ge09iamVjdDxzdHJpbmcsIGFueT59IFtyb290XSBUaGUgb2JqZWN0IGNvbnRhaW5pbmcgYGluc2lkZWAsIGkuZS4gdGhlIG9iamVjdCB0aGF0IGNvbnRhaW5zIHRoZVxuXHRcdFx0ICogb2JqZWN0IHRvIGJlIG1vZGlmaWVkLlxuXHRcdFx0ICpcblx0XHRcdCAqIERlZmF1bHRzIHRvIGBQcmlzbS5sYW5ndWFnZXNgLlxuXHRcdFx0ICogQHJldHVybnMge0dyYW1tYXJ9IFRoZSBuZXcgZ3JhbW1hciBvYmplY3QuXG5cdFx0XHQgKiBAcHVibGljXG5cdFx0XHQgKi9cblx0XHRcdGluc2VydEJlZm9yZTogZnVuY3Rpb24gKGluc2lkZSwgYmVmb3JlLCBpbnNlcnQsIHJvb3QpIHtcblx0XHRcdFx0cm9vdCA9IHJvb3QgfHwgLyoqIEB0eXBlIHthbnl9ICovIChfLmxhbmd1YWdlcyk7XG5cdFx0XHRcdHZhciBncmFtbWFyID0gcm9vdFtpbnNpZGVdO1xuXHRcdFx0XHQvKiogQHR5cGUge0dyYW1tYXJ9ICovXG5cdFx0XHRcdHZhciByZXQgPSB7fTtcblxuXHRcdFx0XHRmb3IgKHZhciB0b2tlbiBpbiBncmFtbWFyKSB7XG5cdFx0XHRcdFx0aWYgKGdyYW1tYXIuaGFzT3duUHJvcGVydHkodG9rZW4pKSB7XG5cblx0XHRcdFx0XHRcdGlmICh0b2tlbiA9PSBiZWZvcmUpIHtcblx0XHRcdFx0XHRcdFx0Zm9yICh2YXIgbmV3VG9rZW4gaW4gaW5zZXJ0KSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGluc2VydC5oYXNPd25Qcm9wZXJ0eShuZXdUb2tlbikpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHJldFtuZXdUb2tlbl0gPSBpbnNlcnRbbmV3VG9rZW5dO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBEbyBub3QgaW5zZXJ0IHRva2VuIHdoaWNoIGFsc28gb2NjdXIgaW4gaW5zZXJ0LiBTZWUgIzE1MjVcblx0XHRcdFx0XHRcdGlmICghaW5zZXJ0Lmhhc093blByb3BlcnR5KHRva2VuKSkge1xuXHRcdFx0XHRcdFx0XHRyZXRbdG9rZW5dID0gZ3JhbW1hclt0b2tlbl07XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIG9sZCA9IHJvb3RbaW5zaWRlXTtcblx0XHRcdFx0cm9vdFtpbnNpZGVdID0gcmV0O1xuXG5cdFx0XHRcdC8vIFVwZGF0ZSByZWZlcmVuY2VzIGluIG90aGVyIGxhbmd1YWdlIGRlZmluaXRpb25zXG5cdFx0XHRcdF8ubGFuZ3VhZ2VzLkRGUyhfLmxhbmd1YWdlcywgZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcblx0XHRcdFx0XHRpZiAodmFsdWUgPT09IG9sZCAmJiBrZXkgIT0gaW5zaWRlKSB7XG5cdFx0XHRcdFx0XHR0aGlzW2tleV0gPSByZXQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRyZXR1cm4gcmV0O1xuXHRcdFx0fSxcblxuXHRcdFx0Ly8gVHJhdmVyc2UgYSBsYW5ndWFnZSBkZWZpbml0aW9uIHdpdGggRGVwdGggRmlyc3QgU2VhcmNoXG5cdFx0XHRERlM6IGZ1bmN0aW9uIERGUyhvLCBjYWxsYmFjaywgdHlwZSwgdmlzaXRlZCkge1xuXHRcdFx0XHR2aXNpdGVkID0gdmlzaXRlZCB8fCB7fTtcblxuXHRcdFx0XHR2YXIgb2JqSWQgPSBfLnV0aWwub2JqSWQ7XG5cblx0XHRcdFx0Zm9yICh2YXIgaSBpbiBvKSB7XG5cdFx0XHRcdFx0aWYgKG8uaGFzT3duUHJvcGVydHkoaSkpIHtcblx0XHRcdFx0XHRcdGNhbGxiYWNrLmNhbGwobywgaSwgb1tpXSwgdHlwZSB8fCBpKTtcblxuXHRcdFx0XHRcdFx0dmFyIHByb3BlcnR5ID0gb1tpXTtcblx0XHRcdFx0XHRcdHZhciBwcm9wZXJ0eVR5cGUgPSBfLnV0aWwudHlwZShwcm9wZXJ0eSk7XG5cblx0XHRcdFx0XHRcdGlmIChwcm9wZXJ0eVR5cGUgPT09ICdPYmplY3QnICYmICF2aXNpdGVkW29iaklkKHByb3BlcnR5KV0pIHtcblx0XHRcdFx0XHRcdFx0dmlzaXRlZFtvYmpJZChwcm9wZXJ0eSldID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0REZTKHByb3BlcnR5LCBjYWxsYmFjaywgbnVsbCwgdmlzaXRlZCk7XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKHByb3BlcnR5VHlwZSA9PT0gJ0FycmF5JyAmJiAhdmlzaXRlZFtvYmpJZChwcm9wZXJ0eSldKSB7XG5cdFx0XHRcdFx0XHRcdHZpc2l0ZWRbb2JqSWQocHJvcGVydHkpXSA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdERGUyhwcm9wZXJ0eSwgY2FsbGJhY2ssIGksIHZpc2l0ZWQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRwbHVnaW5zOiB7fSxcblxuXHRcdC8qKlxuXHRcdCAqIFRoaXMgaXMgdGhlIG1vc3QgaGlnaC1sZXZlbCBmdW5jdGlvbiBpbiBQcmlzbeKAmXMgQVBJLlxuXHRcdCAqIEl0IGZldGNoZXMgYWxsIHRoZSBlbGVtZW50cyB0aGF0IGhhdmUgYSBgLmxhbmd1YWdlLXh4eHhgIGNsYXNzIGFuZCB0aGVuIGNhbGxzIHtAbGluayBQcmlzbS5oaWdobGlnaHRFbGVtZW50fSBvblxuXHRcdCAqIGVhY2ggb25lIG9mIHRoZW0uXG5cdFx0ICpcblx0XHQgKiBUaGlzIGlzIGVxdWl2YWxlbnQgdG8gYFByaXNtLmhpZ2hsaWdodEFsbFVuZGVyKGRvY3VtZW50LCBhc3luYywgY2FsbGJhY2spYC5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW2FzeW5jPWZhbHNlXSBTYW1lIGFzIGluIHtAbGluayBQcmlzbS5oaWdobGlnaHRBbGxVbmRlcn0uXG5cdFx0ICogQHBhcmFtIHtIaWdobGlnaHRDYWxsYmFja30gW2NhbGxiYWNrXSBTYW1lIGFzIGluIHtAbGluayBQcmlzbS5oaWdobGlnaHRBbGxVbmRlcn0uXG5cdFx0ICogQG1lbWJlcm9mIFByaXNtXG5cdFx0ICogQHB1YmxpY1xuXHRcdCAqL1xuXHRcdGhpZ2hsaWdodEFsbDogZnVuY3Rpb24gKGFzeW5jLCBjYWxsYmFjaykge1xuXHRcdFx0Xy5oaWdobGlnaHRBbGxVbmRlcihkb2N1bWVudCwgYXN5bmMsIGNhbGxiYWNrKTtcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogRmV0Y2hlcyBhbGwgdGhlIGRlc2NlbmRhbnRzIG9mIGBjb250YWluZXJgIHRoYXQgaGF2ZSBhIGAubGFuZ3VhZ2UteHh4eGAgY2xhc3MgYW5kIHRoZW4gY2FsbHNcblx0XHQgKiB7QGxpbmsgUHJpc20uaGlnaGxpZ2h0RWxlbWVudH0gb24gZWFjaCBvbmUgb2YgdGhlbS5cblx0XHQgKlxuXHRcdCAqIFRoZSBmb2xsb3dpbmcgaG9va3Mgd2lsbCBiZSBydW46XG5cdFx0ICogMS4gYGJlZm9yZS1oaWdobGlnaHRhbGxgXG5cdFx0ICogMi4gYGJlZm9yZS1hbGwtZWxlbWVudHMtaGlnaGxpZ2h0YFxuXHRcdCAqIDMuIEFsbCBob29rcyBvZiB7QGxpbmsgUHJpc20uaGlnaGxpZ2h0RWxlbWVudH0gZm9yIGVhY2ggZWxlbWVudC5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7UGFyZW50Tm9kZX0gY29udGFpbmVyIFRoZSByb290IGVsZW1lbnQsIHdob3NlIGRlc2NlbmRhbnRzIHRoYXQgaGF2ZSBhIGAubGFuZ3VhZ2UteHh4eGAgY2xhc3Mgd2lsbCBiZSBoaWdobGlnaHRlZC5cblx0XHQgKiBAcGFyYW0ge2Jvb2xlYW59IFthc3luYz1mYWxzZV0gV2hldGhlciBlYWNoIGVsZW1lbnQgaXMgdG8gYmUgaGlnaGxpZ2h0ZWQgYXN5bmNocm9ub3VzbHkgdXNpbmcgV2ViIFdvcmtlcnMuXG5cdFx0ICogQHBhcmFtIHtIaWdobGlnaHRDYWxsYmFja30gW2NhbGxiYWNrXSBBbiBvcHRpb25hbCBjYWxsYmFjayB0byBiZSBpbnZva2VkIG9uIGVhY2ggZWxlbWVudCBhZnRlciBpdHMgaGlnaGxpZ2h0aW5nIGlzIGRvbmUuXG5cdFx0ICogQG1lbWJlcm9mIFByaXNtXG5cdFx0ICogQHB1YmxpY1xuXHRcdCAqL1xuXHRcdGhpZ2hsaWdodEFsbFVuZGVyOiBmdW5jdGlvbiAoY29udGFpbmVyLCBhc3luYywgY2FsbGJhY2spIHtcblx0XHRcdHZhciBlbnYgPSB7XG5cdFx0XHRcdGNhbGxiYWNrOiBjYWxsYmFjayxcblx0XHRcdFx0Y29udGFpbmVyOiBjb250YWluZXIsXG5cdFx0XHRcdHNlbGVjdG9yOiAnY29kZVtjbGFzcyo9XCJsYW5ndWFnZS1cIl0sIFtjbGFzcyo9XCJsYW5ndWFnZS1cIl0gY29kZSwgY29kZVtjbGFzcyo9XCJsYW5nLVwiXSwgW2NsYXNzKj1cImxhbmctXCJdIGNvZGUnXG5cdFx0XHR9O1xuXG5cdFx0XHRfLmhvb2tzLnJ1bignYmVmb3JlLWhpZ2hsaWdodGFsbCcsIGVudik7XG5cblx0XHRcdGVudi5lbGVtZW50cyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5hcHBseShlbnYuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoZW52LnNlbGVjdG9yKSk7XG5cblx0XHRcdF8uaG9va3MucnVuKCdiZWZvcmUtYWxsLWVsZW1lbnRzLWhpZ2hsaWdodCcsIGVudik7XG5cblx0XHRcdGZvciAodmFyIGkgPSAwLCBlbGVtZW50OyAoZWxlbWVudCA9IGVudi5lbGVtZW50c1tpKytdKTspIHtcblx0XHRcdFx0Xy5oaWdobGlnaHRFbGVtZW50KGVsZW1lbnQsIGFzeW5jID09PSB0cnVlLCBlbnYuY2FsbGJhY2spO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBIaWdobGlnaHRzIHRoZSBjb2RlIGluc2lkZSBhIHNpbmdsZSBlbGVtZW50LlxuXHRcdCAqXG5cdFx0ICogVGhlIGZvbGxvd2luZyBob29rcyB3aWxsIGJlIHJ1bjpcblx0XHQgKiAxLiBgYmVmb3JlLXNhbml0eS1jaGVja2Bcblx0XHQgKiAyLiBgYmVmb3JlLWhpZ2hsaWdodGBcblx0XHQgKiAzLiBBbGwgaG9va3Mgb2Yge0BsaW5rIFByaXNtLmhpZ2hsaWdodH0uIFRoZXNlIGhvb2tzIHdpbGwgYmUgcnVuIGJ5IGFuIGFzeW5jaHJvbm91cyB3b3JrZXIgaWYgYGFzeW5jYCBpcyBgdHJ1ZWAuXG5cdFx0ICogNC4gYGJlZm9yZS1pbnNlcnRgXG5cdFx0ICogNS4gYGFmdGVyLWhpZ2hsaWdodGBcblx0XHQgKiA2LiBgY29tcGxldGVgXG5cdFx0ICpcblx0XHQgKiBTb21lIHRoZSBhYm92ZSBob29rcyB3aWxsIGJlIHNraXBwZWQgaWYgdGhlIGVsZW1lbnQgZG9lc24ndCBjb250YWluIGFueSB0ZXh0IG9yIHRoZXJlIGlzIG5vIGdyYW1tYXIgbG9hZGVkIGZvclxuXHRcdCAqIHRoZSBlbGVtZW50J3MgbGFuZ3VhZ2UuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgY29udGFpbmluZyB0aGUgY29kZS5cblx0XHQgKiBJdCBtdXN0IGhhdmUgYSBjbGFzcyBvZiBgbGFuZ3VhZ2UteHh4eGAgdG8gYmUgcHJvY2Vzc2VkLCB3aGVyZSBgeHh4eGAgaXMgYSB2YWxpZCBsYW5ndWFnZSBpZGVudGlmaWVyLlxuXHRcdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW2FzeW5jPWZhbHNlXSBXaGV0aGVyIHRoZSBlbGVtZW50IGlzIHRvIGJlIGhpZ2hsaWdodGVkIGFzeW5jaHJvbm91c2x5IHVzaW5nIFdlYiBXb3JrZXJzXG5cdFx0ICogdG8gaW1wcm92ZSBwZXJmb3JtYW5jZSBhbmQgYXZvaWQgYmxvY2tpbmcgdGhlIFVJIHdoZW4gaGlnaGxpZ2h0aW5nIHZlcnkgbGFyZ2UgY2h1bmtzIG9mIGNvZGUuIFRoaXMgb3B0aW9uIGlzXG5cdFx0ICogW2Rpc2FibGVkIGJ5IGRlZmF1bHRdKGh0dHBzOi8vcHJpc21qcy5jb20vZmFxLmh0bWwjd2h5LWlzLWFzeW5jaHJvbm91cy1oaWdobGlnaHRpbmctZGlzYWJsZWQtYnktZGVmYXVsdCkuXG5cdFx0ICpcblx0XHQgKiBOb3RlOiBBbGwgbGFuZ3VhZ2UgZGVmaW5pdGlvbnMgcmVxdWlyZWQgdG8gaGlnaGxpZ2h0IHRoZSBjb2RlIG11c3QgYmUgaW5jbHVkZWQgaW4gdGhlIG1haW4gYHByaXNtLmpzYCBmaWxlIGZvclxuXHRcdCAqIGFzeW5jaHJvbm91cyBoaWdobGlnaHRpbmcgdG8gd29yay4gWW91IGNhbiBidWlsZCB5b3VyIG93biBidW5kbGUgb24gdGhlXG5cdFx0ICogW0Rvd25sb2FkIHBhZ2VdKGh0dHBzOi8vcHJpc21qcy5jb20vZG93bmxvYWQuaHRtbCkuXG5cdFx0ICogQHBhcmFtIHtIaWdobGlnaHRDYWxsYmFja30gW2NhbGxiYWNrXSBBbiBvcHRpb25hbCBjYWxsYmFjayB0byBiZSBpbnZva2VkIGFmdGVyIHRoZSBoaWdobGlnaHRpbmcgaXMgZG9uZS5cblx0XHQgKiBNb3N0bHkgdXNlZnVsIHdoZW4gYGFzeW5jYCBpcyBgdHJ1ZWAsIHNpbmNlIGluIHRoYXQgY2FzZSwgdGhlIGhpZ2hsaWdodGluZyBpcyBkb25lIGFzeW5jaHJvbm91c2x5LlxuXHRcdCAqIEBtZW1iZXJvZiBQcmlzbVxuXHRcdCAqIEBwdWJsaWNcblx0XHQgKi9cblx0XHRoaWdobGlnaHRFbGVtZW50OiBmdW5jdGlvbiAoZWxlbWVudCwgYXN5bmMsIGNhbGxiYWNrKSB7XG5cdFx0XHQvLyBGaW5kIGxhbmd1YWdlXG5cdFx0XHR2YXIgbGFuZ3VhZ2UgPSBfLnV0aWwuZ2V0TGFuZ3VhZ2UoZWxlbWVudCk7XG5cdFx0XHR2YXIgZ3JhbW1hciA9IF8ubGFuZ3VhZ2VzW2xhbmd1YWdlXTtcblxuXHRcdFx0Ly8gU2V0IGxhbmd1YWdlIG9uIHRoZSBlbGVtZW50LCBpZiBub3QgcHJlc2VudFxuXHRcdFx0Xy51dGlsLnNldExhbmd1YWdlKGVsZW1lbnQsIGxhbmd1YWdlKTtcblxuXHRcdFx0Ly8gU2V0IGxhbmd1YWdlIG9uIHRoZSBwYXJlbnQsIGZvciBzdHlsaW5nXG5cdFx0XHR2YXIgcGFyZW50ID0gZWxlbWVudC5wYXJlbnRFbGVtZW50O1xuXHRcdFx0aWYgKHBhcmVudCAmJiBwYXJlbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3ByZScpIHtcblx0XHRcdFx0Xy51dGlsLnNldExhbmd1YWdlKHBhcmVudCwgbGFuZ3VhZ2UpO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgY29kZSA9IGVsZW1lbnQudGV4dENvbnRlbnQ7XG5cblx0XHRcdHZhciBlbnYgPSB7XG5cdFx0XHRcdGVsZW1lbnQ6IGVsZW1lbnQsXG5cdFx0XHRcdGxhbmd1YWdlOiBsYW5ndWFnZSxcblx0XHRcdFx0Z3JhbW1hcjogZ3JhbW1hcixcblx0XHRcdFx0Y29kZTogY29kZVxuXHRcdFx0fTtcblxuXHRcdFx0ZnVuY3Rpb24gaW5zZXJ0SGlnaGxpZ2h0ZWRDb2RlKGhpZ2hsaWdodGVkQ29kZSkge1xuXHRcdFx0XHRlbnYuaGlnaGxpZ2h0ZWRDb2RlID0gaGlnaGxpZ2h0ZWRDb2RlO1xuXG5cdFx0XHRcdF8uaG9va3MucnVuKCdiZWZvcmUtaW5zZXJ0JywgZW52KTtcblxuXHRcdFx0XHRlbnYuZWxlbWVudC5pbm5lckhUTUwgPSBlbnYuaGlnaGxpZ2h0ZWRDb2RlO1xuXG5cdFx0XHRcdF8uaG9va3MucnVuKCdhZnRlci1oaWdobGlnaHQnLCBlbnYpO1xuXHRcdFx0XHRfLmhvb2tzLnJ1bignY29tcGxldGUnLCBlbnYpO1xuXHRcdFx0XHRjYWxsYmFjayAmJiBjYWxsYmFjay5jYWxsKGVudi5lbGVtZW50KTtcblx0XHRcdH1cblxuXHRcdFx0Xy5ob29rcy5ydW4oJ2JlZm9yZS1zYW5pdHktY2hlY2snLCBlbnYpO1xuXG5cdFx0XHQvLyBwbHVnaW5zIG1heSBjaGFuZ2UvYWRkIHRoZSBwYXJlbnQvZWxlbWVudFxuXHRcdFx0cGFyZW50ID0gZW52LmVsZW1lbnQucGFyZW50RWxlbWVudDtcblx0XHRcdGlmIChwYXJlbnQgJiYgcGFyZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdwcmUnICYmICFwYXJlbnQuaGFzQXR0cmlidXRlKCd0YWJpbmRleCcpKSB7XG5cdFx0XHRcdHBhcmVudC5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJzAnKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCFlbnYuY29kZSkge1xuXHRcdFx0XHRfLmhvb2tzLnJ1bignY29tcGxldGUnLCBlbnYpO1xuXHRcdFx0XHRjYWxsYmFjayAmJiBjYWxsYmFjay5jYWxsKGVudi5lbGVtZW50KTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRfLmhvb2tzLnJ1bignYmVmb3JlLWhpZ2hsaWdodCcsIGVudik7XG5cblx0XHRcdGlmICghZW52LmdyYW1tYXIpIHtcblx0XHRcdFx0aW5zZXJ0SGlnaGxpZ2h0ZWRDb2RlKF8udXRpbC5lbmNvZGUoZW52LmNvZGUpKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoYXN5bmMgJiYgX3NlbGYuV29ya2VyKSB7XG5cdFx0XHRcdHZhciB3b3JrZXIgPSBuZXcgV29ya2VyKF8uZmlsZW5hbWUpO1xuXG5cdFx0XHRcdHdvcmtlci5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoZXZ0KSB7XG5cdFx0XHRcdFx0aW5zZXJ0SGlnaGxpZ2h0ZWRDb2RlKGV2dC5kYXRhKTtcblx0XHRcdFx0fTtcblxuXHRcdFx0XHR3b3JrZXIucG9zdE1lc3NhZ2UoSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRcdGxhbmd1YWdlOiBlbnYubGFuZ3VhZ2UsXG5cdFx0XHRcdFx0Y29kZTogZW52LmNvZGUsXG5cdFx0XHRcdFx0aW1tZWRpYXRlQ2xvc2U6IHRydWVcblx0XHRcdFx0fSkpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aW5zZXJ0SGlnaGxpZ2h0ZWRDb2RlKF8uaGlnaGxpZ2h0KGVudi5jb2RlLCBlbnYuZ3JhbW1hciwgZW52Lmxhbmd1YWdlKSk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIExvdy1sZXZlbCBmdW5jdGlvbiwgb25seSB1c2UgaWYgeW91IGtub3cgd2hhdCB5b3XigJlyZSBkb2luZy4gSXQgYWNjZXB0cyBhIHN0cmluZyBvZiB0ZXh0IGFzIGlucHV0XG5cdFx0ICogYW5kIHRoZSBsYW5ndWFnZSBkZWZpbml0aW9ucyB0byB1c2UsIGFuZCByZXR1cm5zIGEgc3RyaW5nIHdpdGggdGhlIEhUTUwgcHJvZHVjZWQuXG5cdFx0ICpcblx0XHQgKiBUaGUgZm9sbG93aW5nIGhvb2tzIHdpbGwgYmUgcnVuOlxuXHRcdCAqIDEuIGBiZWZvcmUtdG9rZW5pemVgXG5cdFx0ICogMi4gYGFmdGVyLXRva2VuaXplYFxuXHRcdCAqIDMuIGB3cmFwYDogT24gZWFjaCB7QGxpbmsgVG9rZW59LlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHtzdHJpbmd9IHRleHQgQSBzdHJpbmcgd2l0aCB0aGUgY29kZSB0byBiZSBoaWdobGlnaHRlZC5cblx0XHQgKiBAcGFyYW0ge0dyYW1tYXJ9IGdyYW1tYXIgQW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIHRva2VucyB0byB1c2UuXG5cdFx0ICpcblx0XHQgKiBVc3VhbGx5IGEgbGFuZ3VhZ2UgZGVmaW5pdGlvbiBsaWtlIGBQcmlzbS5sYW5ndWFnZXMubWFya3VwYC5cblx0XHQgKiBAcGFyYW0ge3N0cmluZ30gbGFuZ3VhZ2UgVGhlIG5hbWUgb2YgdGhlIGxhbmd1YWdlIGRlZmluaXRpb24gcGFzc2VkIHRvIGBncmFtbWFyYC5cblx0XHQgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgaGlnaGxpZ2h0ZWQgSFRNTC5cblx0XHQgKiBAbWVtYmVyb2YgUHJpc21cblx0XHQgKiBAcHVibGljXG5cdFx0ICogQGV4YW1wbGVcblx0XHQgKiBQcmlzbS5oaWdobGlnaHQoJ3ZhciBmb28gPSB0cnVlOycsIFByaXNtLmxhbmd1YWdlcy5qYXZhc2NyaXB0LCAnamF2YXNjcmlwdCcpO1xuXHRcdCAqL1xuXHRcdGhpZ2hsaWdodDogZnVuY3Rpb24gKHRleHQsIGdyYW1tYXIsIGxhbmd1YWdlKSB7XG5cdFx0XHR2YXIgZW52ID0ge1xuXHRcdFx0XHRjb2RlOiB0ZXh0LFxuXHRcdFx0XHRncmFtbWFyOiBncmFtbWFyLFxuXHRcdFx0XHRsYW5ndWFnZTogbGFuZ3VhZ2Vcblx0XHRcdH07XG5cdFx0XHRfLmhvb2tzLnJ1bignYmVmb3JlLXRva2VuaXplJywgZW52KTtcblx0XHRcdGlmICghZW52LmdyYW1tYXIpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdUaGUgbGFuZ3VhZ2UgXCInICsgZW52Lmxhbmd1YWdlICsgJ1wiIGhhcyBubyBncmFtbWFyLicpO1xuXHRcdFx0fVxuXHRcdFx0ZW52LnRva2VucyA9IF8udG9rZW5pemUoZW52LmNvZGUsIGVudi5ncmFtbWFyKTtcblx0XHRcdF8uaG9va3MucnVuKCdhZnRlci10b2tlbml6ZScsIGVudik7XG5cdFx0XHRyZXR1cm4gVG9rZW4uc3RyaW5naWZ5KF8udXRpbC5lbmNvZGUoZW52LnRva2VucyksIGVudi5sYW5ndWFnZSk7XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIFRoaXMgaXMgdGhlIGhlYXJ0IG9mIFByaXNtLCBhbmQgdGhlIG1vc3QgbG93LWxldmVsIGZ1bmN0aW9uIHlvdSBjYW4gdXNlLiBJdCBhY2NlcHRzIGEgc3RyaW5nIG9mIHRleHQgYXMgaW5wdXRcblx0XHQgKiBhbmQgdGhlIGxhbmd1YWdlIGRlZmluaXRpb25zIHRvIHVzZSwgYW5kIHJldHVybnMgYW4gYXJyYXkgd2l0aCB0aGUgdG9rZW5pemVkIGNvZGUuXG5cdFx0ICpcblx0XHQgKiBXaGVuIHRoZSBsYW5ndWFnZSBkZWZpbml0aW9uIGluY2x1ZGVzIG5lc3RlZCB0b2tlbnMsIHRoZSBmdW5jdGlvbiBpcyBjYWxsZWQgcmVjdXJzaXZlbHkgb24gZWFjaCBvZiB0aGVzZSB0b2tlbnMuXG5cdFx0ICpcblx0XHQgKiBUaGlzIG1ldGhvZCBjb3VsZCBiZSB1c2VmdWwgaW4gb3RoZXIgY29udGV4dHMgYXMgd2VsbCwgYXMgYSB2ZXJ5IGNydWRlIHBhcnNlci5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IEEgc3RyaW5nIHdpdGggdGhlIGNvZGUgdG8gYmUgaGlnaGxpZ2h0ZWQuXG5cdFx0ICogQHBhcmFtIHtHcmFtbWFyfSBncmFtbWFyIEFuIG9iamVjdCBjb250YWluaW5nIHRoZSB0b2tlbnMgdG8gdXNlLlxuXHRcdCAqXG5cdFx0ICogVXN1YWxseSBhIGxhbmd1YWdlIGRlZmluaXRpb24gbGlrZSBgUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cGAuXG5cdFx0ICogQHJldHVybnMge1Rva2VuU3RyZWFtfSBBbiBhcnJheSBvZiBzdHJpbmdzIGFuZCB0b2tlbnMsIGEgdG9rZW4gc3RyZWFtLlxuXHRcdCAqIEBtZW1iZXJvZiBQcmlzbVxuXHRcdCAqIEBwdWJsaWNcblx0XHQgKiBAZXhhbXBsZVxuXHRcdCAqIGxldCBjb2RlID0gYHZhciBmb28gPSAwO2A7XG5cdFx0ICogbGV0IHRva2VucyA9IFByaXNtLnRva2VuaXplKGNvZGUsIFByaXNtLmxhbmd1YWdlcy5qYXZhc2NyaXB0KTtcblx0XHQgKiB0b2tlbnMuZm9yRWFjaCh0b2tlbiA9PiB7XG5cdFx0ICogICAgIGlmICh0b2tlbiBpbnN0YW5jZW9mIFByaXNtLlRva2VuICYmIHRva2VuLnR5cGUgPT09ICdudW1iZXInKSB7XG5cdFx0ICogICAgICAgICBjb25zb2xlLmxvZyhgRm91bmQgbnVtZXJpYyBsaXRlcmFsOiAke3Rva2VuLmNvbnRlbnR9YCk7XG5cdFx0ICogICAgIH1cblx0XHQgKiB9KTtcblx0XHQgKi9cblx0XHR0b2tlbml6ZTogZnVuY3Rpb24gKHRleHQsIGdyYW1tYXIpIHtcblx0XHRcdHZhciByZXN0ID0gZ3JhbW1hci5yZXN0O1xuXHRcdFx0aWYgKHJlc3QpIHtcblx0XHRcdFx0Zm9yICh2YXIgdG9rZW4gaW4gcmVzdCkge1xuXHRcdFx0XHRcdGdyYW1tYXJbdG9rZW5dID0gcmVzdFt0b2tlbl07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRkZWxldGUgZ3JhbW1hci5yZXN0O1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgdG9rZW5MaXN0ID0gbmV3IExpbmtlZExpc3QoKTtcblx0XHRcdGFkZEFmdGVyKHRva2VuTGlzdCwgdG9rZW5MaXN0LmhlYWQsIHRleHQpO1xuXG5cdFx0XHRtYXRjaEdyYW1tYXIodGV4dCwgdG9rZW5MaXN0LCBncmFtbWFyLCB0b2tlbkxpc3QuaGVhZCwgMCk7XG5cblx0XHRcdHJldHVybiB0b0FycmF5KHRva2VuTGlzdCk7XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIEBuYW1lc3BhY2Vcblx0XHQgKiBAbWVtYmVyb2YgUHJpc21cblx0XHQgKiBAcHVibGljXG5cdFx0ICovXG5cdFx0aG9va3M6IHtcblx0XHRcdGFsbDoge30sXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogQWRkcyB0aGUgZ2l2ZW4gY2FsbGJhY2sgdG8gdGhlIGxpc3Qgb2YgY2FsbGJhY2tzIGZvciB0aGUgZ2l2ZW4gaG9vay5cblx0XHRcdCAqXG5cdFx0XHQgKiBUaGUgY2FsbGJhY2sgd2lsbCBiZSBpbnZva2VkIHdoZW4gdGhlIGhvb2sgaXQgaXMgcmVnaXN0ZXJlZCBmb3IgaXMgcnVuLlxuXHRcdFx0ICogSG9va3MgYXJlIHVzdWFsbHkgZGlyZWN0bHkgcnVuIGJ5IGEgaGlnaGxpZ2h0IGZ1bmN0aW9uIGJ1dCB5b3UgY2FuIGFsc28gcnVuIGhvb2tzIHlvdXJzZWxmLlxuXHRcdFx0ICpcblx0XHRcdCAqIE9uZSBjYWxsYmFjayBmdW5jdGlvbiBjYW4gYmUgcmVnaXN0ZXJlZCB0byBtdWx0aXBsZSBob29rcyBhbmQgdGhlIHNhbWUgaG9vayBtdWx0aXBsZSB0aW1lcy5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgaG9vay5cblx0XHRcdCAqIEBwYXJhbSB7SG9va0NhbGxiYWNrfSBjYWxsYmFjayBUaGUgY2FsbGJhY2sgZnVuY3Rpb24gd2hpY2ggaXMgZ2l2ZW4gZW52aXJvbm1lbnQgdmFyaWFibGVzLlxuXHRcdFx0ICogQHB1YmxpY1xuXHRcdFx0ICovXG5cdFx0XHRhZGQ6IGZ1bmN0aW9uIChuYW1lLCBjYWxsYmFjaykge1xuXHRcdFx0XHR2YXIgaG9va3MgPSBfLmhvb2tzLmFsbDtcblxuXHRcdFx0XHRob29rc1tuYW1lXSA9IGhvb2tzW25hbWVdIHx8IFtdO1xuXG5cdFx0XHRcdGhvb2tzW25hbWVdLnB1c2goY2FsbGJhY2spO1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBSdW5zIGEgaG9vayBpbnZva2luZyBhbGwgcmVnaXN0ZXJlZCBjYWxsYmFja3Mgd2l0aCB0aGUgZ2l2ZW4gZW52aXJvbm1lbnQgdmFyaWFibGVzLlxuXHRcdFx0ICpcblx0XHRcdCAqIENhbGxiYWNrcyB3aWxsIGJlIGludm9rZWQgc3luY2hyb25vdXNseSBhbmQgaW4gdGhlIG9yZGVyIGluIHdoaWNoIHRoZXkgd2VyZSByZWdpc3RlcmVkLlxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBob29rLlxuXHRcdFx0ICogQHBhcmFtIHtPYmplY3Q8c3RyaW5nLCBhbnk+fSBlbnYgVGhlIGVudmlyb25tZW50IHZhcmlhYmxlcyBvZiB0aGUgaG9vayBwYXNzZWQgdG8gYWxsIGNhbGxiYWNrcyByZWdpc3RlcmVkLlxuXHRcdFx0ICogQHB1YmxpY1xuXHRcdFx0ICovXG5cdFx0XHRydW46IGZ1bmN0aW9uIChuYW1lLCBlbnYpIHtcblx0XHRcdFx0dmFyIGNhbGxiYWNrcyA9IF8uaG9va3MuYWxsW25hbWVdO1xuXG5cdFx0XHRcdGlmICghY2FsbGJhY2tzIHx8ICFjYWxsYmFja3MubGVuZ3RoKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Zm9yICh2YXIgaSA9IDAsIGNhbGxiYWNrOyAoY2FsbGJhY2sgPSBjYWxsYmFja3NbaSsrXSk7KSB7XG5cdFx0XHRcdFx0Y2FsbGJhY2soZW52KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRUb2tlbjogVG9rZW5cblx0fTtcblx0X3NlbGYuUHJpc20gPSBfO1xuXG5cblx0Ly8gVHlwZXNjcmlwdCBub3RlOlxuXHQvLyBUaGUgZm9sbG93aW5nIGNhbiBiZSB1c2VkIHRvIGltcG9ydCB0aGUgVG9rZW4gdHlwZSBpbiBKU0RvYzpcblx0Ly9cblx0Ly8gICBAdHlwZWRlZiB7SW5zdGFuY2VUeXBlPGltcG9ydChcIi4vcHJpc20tY29yZVwiKVtcIlRva2VuXCJdPn0gVG9rZW5cblxuXHQvKipcblx0ICogQ3JlYXRlcyBhIG5ldyB0b2tlbi5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgU2VlIHtAbGluayBUb2tlbiN0eXBlIHR5cGV9XG5cdCAqIEBwYXJhbSB7c3RyaW5nIHwgVG9rZW5TdHJlYW19IGNvbnRlbnQgU2VlIHtAbGluayBUb2tlbiNjb250ZW50IGNvbnRlbnR9XG5cdCAqIEBwYXJhbSB7c3RyaW5nfHN0cmluZ1tdfSBbYWxpYXNdIFRoZSBhbGlhcyhlcykgb2YgdGhlIHRva2VuLlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gW21hdGNoZWRTdHI9XCJcIl0gQSBjb3B5IG9mIHRoZSBmdWxsIHN0cmluZyB0aGlzIHRva2VuIHdhcyBjcmVhdGVkIGZyb20uXG5cdCAqIEBjbGFzc1xuXHQgKiBAZ2xvYmFsXG5cdCAqIEBwdWJsaWNcblx0ICovXG5cdGZ1bmN0aW9uIFRva2VuKHR5cGUsIGNvbnRlbnQsIGFsaWFzLCBtYXRjaGVkU3RyKSB7XG5cdFx0LyoqXG5cdFx0ICogVGhlIHR5cGUgb2YgdGhlIHRva2VuLlxuXHRcdCAqXG5cdFx0ICogVGhpcyBpcyB1c3VhbGx5IHRoZSBrZXkgb2YgYSBwYXR0ZXJuIGluIGEge0BsaW5rIEdyYW1tYXJ9LlxuXHRcdCAqXG5cdFx0ICogQHR5cGUge3N0cmluZ31cblx0XHQgKiBAc2VlIEdyYW1tYXJUb2tlblxuXHRcdCAqIEBwdWJsaWNcblx0XHQgKi9cblx0XHR0aGlzLnR5cGUgPSB0eXBlO1xuXHRcdC8qKlxuXHRcdCAqIFRoZSBzdHJpbmdzIG9yIHRva2VucyBjb250YWluZWQgYnkgdGhpcyB0b2tlbi5cblx0XHQgKlxuXHRcdCAqIFRoaXMgd2lsbCBiZSBhIHRva2VuIHN0cmVhbSBpZiB0aGUgcGF0dGVybiBtYXRjaGVkIGFsc28gZGVmaW5lZCBhbiBgaW5zaWRlYCBncmFtbWFyLlxuXHRcdCAqXG5cdFx0ICogQHR5cGUge3N0cmluZyB8IFRva2VuU3RyZWFtfVxuXHRcdCAqIEBwdWJsaWNcblx0XHQgKi9cblx0XHR0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xuXHRcdC8qKlxuXHRcdCAqIFRoZSBhbGlhcyhlcykgb2YgdGhlIHRva2VuLlxuXHRcdCAqXG5cdFx0ICogQHR5cGUge3N0cmluZ3xzdHJpbmdbXX1cblx0XHQgKiBAc2VlIEdyYW1tYXJUb2tlblxuXHRcdCAqIEBwdWJsaWNcblx0XHQgKi9cblx0XHR0aGlzLmFsaWFzID0gYWxpYXM7XG5cdFx0Ly8gQ29weSBvZiB0aGUgZnVsbCBzdHJpbmcgdGhpcyB0b2tlbiB3YXMgY3JlYXRlZCBmcm9tXG5cdFx0dGhpcy5sZW5ndGggPSAobWF0Y2hlZFN0ciB8fCAnJykubGVuZ3RoIHwgMDtcblx0fVxuXG5cdC8qKlxuXHQgKiBBIHRva2VuIHN0cmVhbSBpcyBhbiBhcnJheSBvZiBzdHJpbmdzIGFuZCB7QGxpbmsgVG9rZW4gVG9rZW59IG9iamVjdHMuXG5cdCAqXG5cdCAqIFRva2VuIHN0cmVhbXMgaGF2ZSB0byBmdWxmaWxsIGEgZmV3IHByb3BlcnRpZXMgdGhhdCBhcmUgYXNzdW1lZCBieSBtb3N0IGZ1bmN0aW9ucyAobW9zdGx5IGludGVybmFsIG9uZXMpIHRoYXQgcHJvY2Vzc1xuXHQgKiB0aGVtLlxuXHQgKlxuXHQgKiAxLiBObyBhZGphY2VudCBzdHJpbmdzLlxuXHQgKiAyLiBObyBlbXB0eSBzdHJpbmdzLlxuXHQgKlxuXHQgKiAgICBUaGUgb25seSBleGNlcHRpb24gaGVyZSBpcyB0aGUgdG9rZW4gc3RyZWFtIHRoYXQgb25seSBjb250YWlucyB0aGUgZW1wdHkgc3RyaW5nIGFuZCBub3RoaW5nIGVsc2UuXG5cdCAqXG5cdCAqIEB0eXBlZGVmIHtBcnJheTxzdHJpbmcgfCBUb2tlbj59IFRva2VuU3RyZWFtXG5cdCAqIEBnbG9iYWxcblx0ICogQHB1YmxpY1xuXHQgKi9cblxuXHQvKipcblx0ICogQ29udmVydHMgdGhlIGdpdmVuIHRva2VuIG9yIHRva2VuIHN0cmVhbSB0byBhbiBIVE1MIHJlcHJlc2VudGF0aW9uLlxuXHQgKlxuXHQgKiBUaGUgZm9sbG93aW5nIGhvb2tzIHdpbGwgYmUgcnVuOlxuXHQgKiAxLiBgd3JhcGA6IE9uIGVhY2gge0BsaW5rIFRva2VufS5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmcgfCBUb2tlbiB8IFRva2VuU3RyZWFtfSBvIFRoZSB0b2tlbiBvciB0b2tlbiBzdHJlYW0gdG8gYmUgY29udmVydGVkLlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbGFuZ3VhZ2UgVGhlIG5hbWUgb2YgY3VycmVudCBsYW5ndWFnZS5cblx0ICogQHJldHVybnMge3N0cmluZ30gVGhlIEhUTUwgcmVwcmVzZW50YXRpb24gb2YgdGhlIHRva2VuIG9yIHRva2VuIHN0cmVhbS5cblx0ICogQG1lbWJlcm9mIFRva2VuXG5cdCAqIEBzdGF0aWNcblx0ICovXG5cdFRva2VuLnN0cmluZ2lmeSA9IGZ1bmN0aW9uIHN0cmluZ2lmeShvLCBsYW5ndWFnZSkge1xuXHRcdGlmICh0eXBlb2YgbyA9PSAnc3RyaW5nJykge1xuXHRcdFx0cmV0dXJuIG87XG5cdFx0fVxuXHRcdGlmIChBcnJheS5pc0FycmF5KG8pKSB7XG5cdFx0XHR2YXIgcyA9ICcnO1xuXHRcdFx0by5mb3JFYWNoKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdHMgKz0gc3RyaW5naWZ5KGUsIGxhbmd1YWdlKTtcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIHM7XG5cdFx0fVxuXG5cdFx0dmFyIGVudiA9IHtcblx0XHRcdHR5cGU6IG8udHlwZSxcblx0XHRcdGNvbnRlbnQ6IHN0cmluZ2lmeShvLmNvbnRlbnQsIGxhbmd1YWdlKSxcblx0XHRcdHRhZzogJ3NwYW4nLFxuXHRcdFx0Y2xhc3NlczogWyd0b2tlbicsIG8udHlwZV0sXG5cdFx0XHRhdHRyaWJ1dGVzOiB7fSxcblx0XHRcdGxhbmd1YWdlOiBsYW5ndWFnZVxuXHRcdH07XG5cblx0XHR2YXIgYWxpYXNlcyA9IG8uYWxpYXM7XG5cdFx0aWYgKGFsaWFzZXMpIHtcblx0XHRcdGlmIChBcnJheS5pc0FycmF5KGFsaWFzZXMpKSB7XG5cdFx0XHRcdEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KGVudi5jbGFzc2VzLCBhbGlhc2VzKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGVudi5jbGFzc2VzLnB1c2goYWxpYXNlcyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Xy5ob29rcy5ydW4oJ3dyYXAnLCBlbnYpO1xuXG5cdFx0dmFyIGF0dHJpYnV0ZXMgPSAnJztcblx0XHRmb3IgKHZhciBuYW1lIGluIGVudi5hdHRyaWJ1dGVzKSB7XG5cdFx0XHRhdHRyaWJ1dGVzICs9ICcgJyArIG5hbWUgKyAnPVwiJyArIChlbnYuYXR0cmlidXRlc1tuYW1lXSB8fCAnJykucmVwbGFjZSgvXCIvZywgJyZxdW90OycpICsgJ1wiJztcblx0XHR9XG5cblx0XHRyZXR1cm4gJzwnICsgZW52LnRhZyArICcgY2xhc3M9XCInICsgZW52LmNsYXNzZXMuam9pbignICcpICsgJ1wiJyArIGF0dHJpYnV0ZXMgKyAnPicgKyBlbnYuY29udGVudCArICc8LycgKyBlbnYudGFnICsgJz4nO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge1JlZ0V4cH0gcGF0dGVyblxuXHQgKiBAcGFyYW0ge251bWJlcn0gcG9zXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gbG9va2JlaGluZFxuXHQgKiBAcmV0dXJucyB7UmVnRXhwRXhlY0FycmF5IHwgbnVsbH1cblx0ICovXG5cdGZ1bmN0aW9uIG1hdGNoUGF0dGVybihwYXR0ZXJuLCBwb3MsIHRleHQsIGxvb2tiZWhpbmQpIHtcblx0XHRwYXR0ZXJuLmxhc3RJbmRleCA9IHBvcztcblx0XHR2YXIgbWF0Y2ggPSBwYXR0ZXJuLmV4ZWModGV4dCk7XG5cdFx0aWYgKG1hdGNoICYmIGxvb2tiZWhpbmQgJiYgbWF0Y2hbMV0pIHtcblx0XHRcdC8vIGNoYW5nZSB0aGUgbWF0Y2ggdG8gcmVtb3ZlIHRoZSB0ZXh0IG1hdGNoZWQgYnkgdGhlIFByaXNtIGxvb2tiZWhpbmQgZ3JvdXBcblx0XHRcdHZhciBsb29rYmVoaW5kTGVuZ3RoID0gbWF0Y2hbMV0ubGVuZ3RoO1xuXHRcdFx0bWF0Y2guaW5kZXggKz0gbG9va2JlaGluZExlbmd0aDtcblx0XHRcdG1hdGNoWzBdID0gbWF0Y2hbMF0uc2xpY2UobG9va2JlaGluZExlbmd0aCk7XG5cdFx0fVxuXHRcdHJldHVybiBtYXRjaDtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuXHQgKiBAcGFyYW0ge0xpbmtlZExpc3Q8c3RyaW5nIHwgVG9rZW4+fSB0b2tlbkxpc3Rcblx0ICogQHBhcmFtIHthbnl9IGdyYW1tYXJcblx0ICogQHBhcmFtIHtMaW5rZWRMaXN0Tm9kZTxzdHJpbmcgfCBUb2tlbj59IHN0YXJ0Tm9kZVxuXHQgKiBAcGFyYW0ge251bWJlcn0gc3RhcnRQb3Ncblx0ICogQHBhcmFtIHtSZW1hdGNoT3B0aW9uc30gW3JlbWF0Y2hdXG5cdCAqIEByZXR1cm5zIHt2b2lkfVxuXHQgKiBAcHJpdmF0ZVxuXHQgKlxuXHQgKiBAdHlwZWRlZiBSZW1hdGNoT3B0aW9uc1xuXHQgKiBAcHJvcGVydHkge3N0cmluZ30gY2F1c2Vcblx0ICogQHByb3BlcnR5IHtudW1iZXJ9IHJlYWNoXG5cdCAqL1xuXHRmdW5jdGlvbiBtYXRjaEdyYW1tYXIodGV4dCwgdG9rZW5MaXN0LCBncmFtbWFyLCBzdGFydE5vZGUsIHN0YXJ0UG9zLCByZW1hdGNoKSB7XG5cdFx0Zm9yICh2YXIgdG9rZW4gaW4gZ3JhbW1hcikge1xuXHRcdFx0aWYgKCFncmFtbWFyLmhhc093blByb3BlcnR5KHRva2VuKSB8fCAhZ3JhbW1hclt0b2tlbl0pIHtcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cblx0XHRcdHZhciBwYXR0ZXJucyA9IGdyYW1tYXJbdG9rZW5dO1xuXHRcdFx0cGF0dGVybnMgPSBBcnJheS5pc0FycmF5KHBhdHRlcm5zKSA/IHBhdHRlcm5zIDogW3BhdHRlcm5zXTtcblxuXHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBwYXR0ZXJucy5sZW5ndGg7ICsraikge1xuXHRcdFx0XHRpZiAocmVtYXRjaCAmJiByZW1hdGNoLmNhdXNlID09IHRva2VuICsgJywnICsgaikge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciBwYXR0ZXJuT2JqID0gcGF0dGVybnNbal07XG5cdFx0XHRcdHZhciBpbnNpZGUgPSBwYXR0ZXJuT2JqLmluc2lkZTtcblx0XHRcdFx0dmFyIGxvb2tiZWhpbmQgPSAhIXBhdHRlcm5PYmoubG9va2JlaGluZDtcblx0XHRcdFx0dmFyIGdyZWVkeSA9ICEhcGF0dGVybk9iai5ncmVlZHk7XG5cdFx0XHRcdHZhciBhbGlhcyA9IHBhdHRlcm5PYmouYWxpYXM7XG5cblx0XHRcdFx0aWYgKGdyZWVkeSAmJiAhcGF0dGVybk9iai5wYXR0ZXJuLmdsb2JhbCkge1xuXHRcdFx0XHRcdC8vIFdpdGhvdXQgdGhlIGdsb2JhbCBmbGFnLCBsYXN0SW5kZXggd29uJ3Qgd29ya1xuXHRcdFx0XHRcdHZhciBmbGFncyA9IHBhdHRlcm5PYmoucGF0dGVybi50b1N0cmluZygpLm1hdGNoKC9baW1zdXldKiQvKVswXTtcblx0XHRcdFx0XHRwYXR0ZXJuT2JqLnBhdHRlcm4gPSBSZWdFeHAocGF0dGVybk9iai5wYXR0ZXJuLnNvdXJjZSwgZmxhZ3MgKyAnZycpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyoqIEB0eXBlIHtSZWdFeHB9ICovXG5cdFx0XHRcdHZhciBwYXR0ZXJuID0gcGF0dGVybk9iai5wYXR0ZXJuIHx8IHBhdHRlcm5PYmo7XG5cblx0XHRcdFx0Zm9yICggLy8gaXRlcmF0ZSB0aGUgdG9rZW4gbGlzdCBhbmQga2VlcCB0cmFjayBvZiB0aGUgY3VycmVudCB0b2tlbi9zdHJpbmcgcG9zaXRpb25cblx0XHRcdFx0XHR2YXIgY3VycmVudE5vZGUgPSBzdGFydE5vZGUubmV4dCwgcG9zID0gc3RhcnRQb3M7XG5cdFx0XHRcdFx0Y3VycmVudE5vZGUgIT09IHRva2VuTGlzdC50YWlsO1xuXHRcdFx0XHRcdHBvcyArPSBjdXJyZW50Tm9kZS52YWx1ZS5sZW5ndGgsIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUubmV4dFxuXHRcdFx0XHQpIHtcblxuXHRcdFx0XHRcdGlmIChyZW1hdGNoICYmIHBvcyA+PSByZW1hdGNoLnJlYWNoKSB7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR2YXIgc3RyID0gY3VycmVudE5vZGUudmFsdWU7XG5cblx0XHRcdFx0XHRpZiAodG9rZW5MaXN0Lmxlbmd0aCA+IHRleHQubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHQvLyBTb21ldGhpbmcgd2VudCB0ZXJyaWJseSB3cm9uZywgQUJPUlQsIEFCT1JUIVxuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChzdHIgaW5zdGFuY2VvZiBUb2tlbikge1xuXHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dmFyIHJlbW92ZUNvdW50ID0gMTsgLy8gdGhpcyBpcyB0aGUgdG8gcGFyYW1ldGVyIG9mIHJlbW92ZUJldHdlZW5cblx0XHRcdFx0XHR2YXIgbWF0Y2g7XG5cblx0XHRcdFx0XHRpZiAoZ3JlZWR5KSB7XG5cdFx0XHRcdFx0XHRtYXRjaCA9IG1hdGNoUGF0dGVybihwYXR0ZXJuLCBwb3MsIHRleHQsIGxvb2tiZWhpbmQpO1xuXHRcdFx0XHRcdFx0aWYgKCFtYXRjaCB8fCBtYXRjaC5pbmRleCA+PSB0ZXh0Lmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0dmFyIGZyb20gPSBtYXRjaC5pbmRleDtcblx0XHRcdFx0XHRcdHZhciB0byA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoO1xuXHRcdFx0XHRcdFx0dmFyIHAgPSBwb3M7XG5cblx0XHRcdFx0XHRcdC8vIGZpbmQgdGhlIG5vZGUgdGhhdCBjb250YWlucyB0aGUgbWF0Y2hcblx0XHRcdFx0XHRcdHAgKz0gY3VycmVudE5vZGUudmFsdWUubGVuZ3RoO1xuXHRcdFx0XHRcdFx0d2hpbGUgKGZyb20gPj0gcCkge1xuXHRcdFx0XHRcdFx0XHRjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLm5leHQ7XG5cdFx0XHRcdFx0XHRcdHAgKz0gY3VycmVudE5vZGUudmFsdWUubGVuZ3RoO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Ly8gYWRqdXN0IHBvcyAoYW5kIHApXG5cdFx0XHRcdFx0XHRwIC09IGN1cnJlbnROb2RlLnZhbHVlLmxlbmd0aDtcblx0XHRcdFx0XHRcdHBvcyA9IHA7XG5cblx0XHRcdFx0XHRcdC8vIHRoZSBjdXJyZW50IG5vZGUgaXMgYSBUb2tlbiwgdGhlbiB0aGUgbWF0Y2ggc3RhcnRzIGluc2lkZSBhbm90aGVyIFRva2VuLCB3aGljaCBpcyBpbnZhbGlkXG5cdFx0XHRcdFx0XHRpZiAoY3VycmVudE5vZGUudmFsdWUgaW5zdGFuY2VvZiBUb2tlbikge1xuXHRcdFx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Ly8gZmluZCB0aGUgbGFzdCBub2RlIHdoaWNoIGlzIGFmZmVjdGVkIGJ5IHRoaXMgbWF0Y2hcblx0XHRcdFx0XHRcdGZvciAoXG5cdFx0XHRcdFx0XHRcdHZhciBrID0gY3VycmVudE5vZGU7XG5cdFx0XHRcdFx0XHRcdGsgIT09IHRva2VuTGlzdC50YWlsICYmIChwIDwgdG8gfHwgdHlwZW9mIGsudmFsdWUgPT09ICdzdHJpbmcnKTtcblx0XHRcdFx0XHRcdFx0ayA9IGsubmV4dFxuXHRcdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRcdHJlbW92ZUNvdW50Kys7XG5cdFx0XHRcdFx0XHRcdHAgKz0gay52YWx1ZS5sZW5ndGg7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRyZW1vdmVDb3VudC0tO1xuXG5cdFx0XHRcdFx0XHQvLyByZXBsYWNlIHdpdGggdGhlIG5ldyBtYXRjaFxuXHRcdFx0XHRcdFx0c3RyID0gdGV4dC5zbGljZShwb3MsIHApO1xuXHRcdFx0XHRcdFx0bWF0Y2guaW5kZXggLT0gcG9zO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRtYXRjaCA9IG1hdGNoUGF0dGVybihwYXR0ZXJuLCAwLCBzdHIsIGxvb2tiZWhpbmQpO1xuXHRcdFx0XHRcdFx0aWYgKCFtYXRjaCkge1xuXHRcdFx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVkZWNsYXJlXG5cdFx0XHRcdFx0dmFyIGZyb20gPSBtYXRjaC5pbmRleDtcblx0XHRcdFx0XHR2YXIgbWF0Y2hTdHIgPSBtYXRjaFswXTtcblx0XHRcdFx0XHR2YXIgYmVmb3JlID0gc3RyLnNsaWNlKDAsIGZyb20pO1xuXHRcdFx0XHRcdHZhciBhZnRlciA9IHN0ci5zbGljZShmcm9tICsgbWF0Y2hTdHIubGVuZ3RoKTtcblxuXHRcdFx0XHRcdHZhciByZWFjaCA9IHBvcyArIHN0ci5sZW5ndGg7XG5cdFx0XHRcdFx0aWYgKHJlbWF0Y2ggJiYgcmVhY2ggPiByZW1hdGNoLnJlYWNoKSB7XG5cdFx0XHRcdFx0XHRyZW1hdGNoLnJlYWNoID0gcmVhY2g7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dmFyIHJlbW92ZUZyb20gPSBjdXJyZW50Tm9kZS5wcmV2O1xuXG5cdFx0XHRcdFx0aWYgKGJlZm9yZSkge1xuXHRcdFx0XHRcdFx0cmVtb3ZlRnJvbSA9IGFkZEFmdGVyKHRva2VuTGlzdCwgcmVtb3ZlRnJvbSwgYmVmb3JlKTtcblx0XHRcdFx0XHRcdHBvcyArPSBiZWZvcmUubGVuZ3RoO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJlbW92ZVJhbmdlKHRva2VuTGlzdCwgcmVtb3ZlRnJvbSwgcmVtb3ZlQ291bnQpO1xuXG5cdFx0XHRcdFx0dmFyIHdyYXBwZWQgPSBuZXcgVG9rZW4odG9rZW4sIGluc2lkZSA/IF8udG9rZW5pemUobWF0Y2hTdHIsIGluc2lkZSkgOiBtYXRjaFN0ciwgYWxpYXMsIG1hdGNoU3RyKTtcblx0XHRcdFx0XHRjdXJyZW50Tm9kZSA9IGFkZEFmdGVyKHRva2VuTGlzdCwgcmVtb3ZlRnJvbSwgd3JhcHBlZCk7XG5cblx0XHRcdFx0XHRpZiAoYWZ0ZXIpIHtcblx0XHRcdFx0XHRcdGFkZEFmdGVyKHRva2VuTGlzdCwgY3VycmVudE5vZGUsIGFmdGVyKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAocmVtb3ZlQ291bnQgPiAxKSB7XG5cdFx0XHRcdFx0XHQvLyBhdCBsZWFzdCBvbmUgVG9rZW4gb2JqZWN0IHdhcyByZW1vdmVkLCBzbyB3ZSBoYXZlIHRvIGRvIHNvbWUgcmVtYXRjaGluZ1xuXHRcdFx0XHRcdFx0Ly8gdGhpcyBjYW4gb25seSBoYXBwZW4gaWYgdGhlIGN1cnJlbnQgcGF0dGVybiBpcyBncmVlZHlcblxuXHRcdFx0XHRcdFx0LyoqIEB0eXBlIHtSZW1hdGNoT3B0aW9uc30gKi9cblx0XHRcdFx0XHRcdHZhciBuZXN0ZWRSZW1hdGNoID0ge1xuXHRcdFx0XHRcdFx0XHRjYXVzZTogdG9rZW4gKyAnLCcgKyBqLFxuXHRcdFx0XHRcdFx0XHRyZWFjaDogcmVhY2hcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRtYXRjaEdyYW1tYXIodGV4dCwgdG9rZW5MaXN0LCBncmFtbWFyLCBjdXJyZW50Tm9kZS5wcmV2LCBwb3MsIG5lc3RlZFJlbWF0Y2gpO1xuXG5cdFx0XHRcdFx0XHQvLyB0aGUgcmVhY2ggbWlnaHQgaGF2ZSBiZWVuIGV4dGVuZGVkIGJlY2F1c2Ugb2YgdGhlIHJlbWF0Y2hpbmdcblx0XHRcdFx0XHRcdGlmIChyZW1hdGNoICYmIG5lc3RlZFJlbWF0Y2gucmVhY2ggPiByZW1hdGNoLnJlYWNoKSB7XG5cdFx0XHRcdFx0XHRcdHJlbWF0Y2gucmVhY2ggPSBuZXN0ZWRSZW1hdGNoLnJlYWNoO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBAdHlwZWRlZiBMaW5rZWRMaXN0Tm9kZVxuXHQgKiBAcHJvcGVydHkge1R9IHZhbHVlXG5cdCAqIEBwcm9wZXJ0eSB7TGlua2VkTGlzdE5vZGU8VD4gfCBudWxsfSBwcmV2IFRoZSBwcmV2aW91cyBub2RlLlxuXHQgKiBAcHJvcGVydHkge0xpbmtlZExpc3ROb2RlPFQ+IHwgbnVsbH0gbmV4dCBUaGUgbmV4dCBub2RlLlxuXHQgKiBAdGVtcGxhdGUgVFxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblxuXHQvKipcblx0ICogQHRlbXBsYXRlIFRcblx0ICogQHByaXZhdGVcblx0ICovXG5cdGZ1bmN0aW9uIExpbmtlZExpc3QoKSB7XG5cdFx0LyoqIEB0eXBlIHtMaW5rZWRMaXN0Tm9kZTxUPn0gKi9cblx0XHR2YXIgaGVhZCA9IHsgdmFsdWU6IG51bGwsIHByZXY6IG51bGwsIG5leHQ6IG51bGwgfTtcblx0XHQvKiogQHR5cGUge0xpbmtlZExpc3ROb2RlPFQ+fSAqL1xuXHRcdHZhciB0YWlsID0geyB2YWx1ZTogbnVsbCwgcHJldjogaGVhZCwgbmV4dDogbnVsbCB9O1xuXHRcdGhlYWQubmV4dCA9IHRhaWw7XG5cblx0XHQvKiogQHR5cGUge0xpbmtlZExpc3ROb2RlPFQ+fSAqL1xuXHRcdHRoaXMuaGVhZCA9IGhlYWQ7XG5cdFx0LyoqIEB0eXBlIHtMaW5rZWRMaXN0Tm9kZTxUPn0gKi9cblx0XHR0aGlzLnRhaWwgPSB0YWlsO1xuXHRcdHRoaXMubGVuZ3RoID0gMDtcblx0fVxuXG5cdC8qKlxuXHQgKiBBZGRzIGEgbmV3IG5vZGUgd2l0aCB0aGUgZ2l2ZW4gdmFsdWUgdG8gdGhlIGxpc3QuXG5cdCAqXG5cdCAqIEBwYXJhbSB7TGlua2VkTGlzdDxUPn0gbGlzdFxuXHQgKiBAcGFyYW0ge0xpbmtlZExpc3ROb2RlPFQ+fSBub2RlXG5cdCAqIEBwYXJhbSB7VH0gdmFsdWVcblx0ICogQHJldHVybnMge0xpbmtlZExpc3ROb2RlPFQ+fSBUaGUgYWRkZWQgbm9kZS5cblx0ICogQHRlbXBsYXRlIFRcblx0ICovXG5cdGZ1bmN0aW9uIGFkZEFmdGVyKGxpc3QsIG5vZGUsIHZhbHVlKSB7XG5cdFx0Ly8gYXNzdW1lcyB0aGF0IG5vZGUgIT0gbGlzdC50YWlsICYmIHZhbHVlcy5sZW5ndGggPj0gMFxuXHRcdHZhciBuZXh0ID0gbm9kZS5uZXh0O1xuXG5cdFx0dmFyIG5ld05vZGUgPSB7IHZhbHVlOiB2YWx1ZSwgcHJldjogbm9kZSwgbmV4dDogbmV4dCB9O1xuXHRcdG5vZGUubmV4dCA9IG5ld05vZGU7XG5cdFx0bmV4dC5wcmV2ID0gbmV3Tm9kZTtcblx0XHRsaXN0Lmxlbmd0aCsrO1xuXG5cdFx0cmV0dXJuIG5ld05vZGU7XG5cdH1cblx0LyoqXG5cdCAqIFJlbW92ZXMgYGNvdW50YCBub2RlcyBhZnRlciB0aGUgZ2l2ZW4gbm9kZS4gVGhlIGdpdmVuIG5vZGUgd2lsbCBub3QgYmUgcmVtb3ZlZC5cblx0ICpcblx0ICogQHBhcmFtIHtMaW5rZWRMaXN0PFQ+fSBsaXN0XG5cdCAqIEBwYXJhbSB7TGlua2VkTGlzdE5vZGU8VD59IG5vZGVcblx0ICogQHBhcmFtIHtudW1iZXJ9IGNvdW50XG5cdCAqIEB0ZW1wbGF0ZSBUXG5cdCAqL1xuXHRmdW5jdGlvbiByZW1vdmVSYW5nZShsaXN0LCBub2RlLCBjb3VudCkge1xuXHRcdHZhciBuZXh0ID0gbm9kZS5uZXh0O1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgY291bnQgJiYgbmV4dCAhPT0gbGlzdC50YWlsOyBpKyspIHtcblx0XHRcdG5leHQgPSBuZXh0Lm5leHQ7XG5cdFx0fVxuXHRcdG5vZGUubmV4dCA9IG5leHQ7XG5cdFx0bmV4dC5wcmV2ID0gbm9kZTtcblx0XHRsaXN0Lmxlbmd0aCAtPSBpO1xuXHR9XG5cdC8qKlxuXHQgKiBAcGFyYW0ge0xpbmtlZExpc3Q8VD59IGxpc3Rcblx0ICogQHJldHVybnMge1RbXX1cblx0ICogQHRlbXBsYXRlIFRcblx0ICovXG5cdGZ1bmN0aW9uIHRvQXJyYXkobGlzdCkge1xuXHRcdHZhciBhcnJheSA9IFtdO1xuXHRcdHZhciBub2RlID0gbGlzdC5oZWFkLm5leHQ7XG5cdFx0d2hpbGUgKG5vZGUgIT09IGxpc3QudGFpbCkge1xuXHRcdFx0YXJyYXkucHVzaChub2RlLnZhbHVlKTtcblx0XHRcdG5vZGUgPSBub2RlLm5leHQ7XG5cdFx0fVxuXHRcdHJldHVybiBhcnJheTtcblx0fVxuXG5cblx0aWYgKCFfc2VsZi5kb2N1bWVudCkge1xuXHRcdGlmICghX3NlbGYuYWRkRXZlbnRMaXN0ZW5lcikge1xuXHRcdFx0Ly8gaW4gTm9kZS5qc1xuXHRcdFx0cmV0dXJuIF87XG5cdFx0fVxuXG5cdFx0aWYgKCFfLmRpc2FibGVXb3JrZXJNZXNzYWdlSGFuZGxlcikge1xuXHRcdFx0Ly8gSW4gd29ya2VyXG5cdFx0XHRfc2VsZi5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZnVuY3Rpb24gKGV2dCkge1xuXHRcdFx0XHR2YXIgbWVzc2FnZSA9IEpTT04ucGFyc2UoZXZ0LmRhdGEpO1xuXHRcdFx0XHR2YXIgbGFuZyA9IG1lc3NhZ2UubGFuZ3VhZ2U7XG5cdFx0XHRcdHZhciBjb2RlID0gbWVzc2FnZS5jb2RlO1xuXHRcdFx0XHR2YXIgaW1tZWRpYXRlQ2xvc2UgPSBtZXNzYWdlLmltbWVkaWF0ZUNsb3NlO1xuXG5cdFx0XHRcdF9zZWxmLnBvc3RNZXNzYWdlKF8uaGlnaGxpZ2h0KGNvZGUsIF8ubGFuZ3VhZ2VzW2xhbmddLCBsYW5nKSk7XG5cdFx0XHRcdGlmIChpbW1lZGlhdGVDbG9zZSkge1xuXHRcdFx0XHRcdF9zZWxmLmNsb3NlKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0sIGZhbHNlKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gXztcblx0fVxuXG5cdC8vIEdldCBjdXJyZW50IHNjcmlwdCBhbmQgaGlnaGxpZ2h0XG5cdHZhciBzY3JpcHQgPSBfLnV0aWwuY3VycmVudFNjcmlwdCgpO1xuXG5cdGlmIChzY3JpcHQpIHtcblx0XHRfLmZpbGVuYW1lID0gc2NyaXB0LnNyYztcblxuXHRcdGlmIChzY3JpcHQuaGFzQXR0cmlidXRlKCdkYXRhLW1hbnVhbCcpKSB7XG5cdFx0XHRfLm1hbnVhbCA9IHRydWU7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gaGlnaGxpZ2h0QXV0b21hdGljYWxseUNhbGxiYWNrKCkge1xuXHRcdGlmICghXy5tYW51YWwpIHtcblx0XHRcdF8uaGlnaGxpZ2h0QWxsKCk7XG5cdFx0fVxuXHR9XG5cblx0aWYgKCFfLm1hbnVhbCkge1xuXHRcdC8vIElmIHRoZSBkb2N1bWVudCBzdGF0ZSBpcyBcImxvYWRpbmdcIiwgdGhlbiB3ZSdsbCB1c2UgRE9NQ29udGVudExvYWRlZC5cblx0XHQvLyBJZiB0aGUgZG9jdW1lbnQgc3RhdGUgaXMgXCJpbnRlcmFjdGl2ZVwiIGFuZCB0aGUgcHJpc20uanMgc2NyaXB0IGlzIGRlZmVycmVkLCB0aGVuIHdlJ2xsIGFsc28gdXNlIHRoZVxuXHRcdC8vIERPTUNvbnRlbnRMb2FkZWQgZXZlbnQgYmVjYXVzZSB0aGVyZSBtaWdodCBiZSBzb21lIHBsdWdpbnMgb3IgbGFuZ3VhZ2VzIHdoaWNoIGhhdmUgYWxzbyBiZWVuIGRlZmVycmVkIGFuZCB0aGV5XG5cdFx0Ly8gbWlnaHQgdGFrZSBsb25nZXIgb25lIGFuaW1hdGlvbiBmcmFtZSB0byBleGVjdXRlIHdoaWNoIGNhbiBjcmVhdGUgYSByYWNlIGNvbmRpdGlvbiB3aGVyZSBvbmx5IHNvbWUgcGx1Z2lucyBoYXZlXG5cdFx0Ly8gYmVlbiBsb2FkZWQgd2hlbiBQcmlzbS5oaWdobGlnaHRBbGwoKSBpcyBleGVjdXRlZCwgZGVwZW5kaW5nIG9uIGhvdyBmYXN0IHJlc291cmNlcyBhcmUgbG9hZGVkLlxuXHRcdC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vUHJpc21KUy9wcmlzbS9pc3N1ZXMvMjEwMlxuXHRcdHZhciByZWFkeVN0YXRlID0gZG9jdW1lbnQucmVhZHlTdGF0ZTtcblx0XHRpZiAocmVhZHlTdGF0ZSA9PT0gJ2xvYWRpbmcnIHx8IHJlYWR5U3RhdGUgPT09ICdpbnRlcmFjdGl2ZScgJiYgc2NyaXB0ICYmIHNjcmlwdC5kZWZlcikge1xuXHRcdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGhpZ2hsaWdodEF1dG9tYXRpY2FsbHlDYWxsYmFjayk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmICh3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKSB7XG5cdFx0XHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoaGlnaGxpZ2h0QXV0b21hdGljYWxseUNhbGxiYWNrKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHdpbmRvdy5zZXRUaW1lb3V0KGhpZ2hsaWdodEF1dG9tYXRpY2FsbHlDYWxsYmFjaywgMTYpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBfO1xuXG59KF9zZWxmKSk7XG5cbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRtb2R1bGUuZXhwb3J0cyA9IFByaXNtO1xufVxuXG4vLyBoYWNrIGZvciBjb21wb25lbnRzIHRvIHdvcmsgY29ycmVjdGx5IGluIG5vZGUuanNcbmlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xuXHRnbG9iYWwuUHJpc20gPSBQcmlzbTtcbn1cblxuLy8gc29tZSBhZGRpdGlvbmFsIGRvY3VtZW50YXRpb24vdHlwZXNcblxuLyoqXG4gKiBUaGUgZXhwYW5zaW9uIG9mIGEgc2ltcGxlIGBSZWdFeHBgIGxpdGVyYWwgdG8gc3VwcG9ydCBhZGRpdGlvbmFsIHByb3BlcnRpZXMuXG4gKlxuICogQHR5cGVkZWYgR3JhbW1hclRva2VuXG4gKiBAcHJvcGVydHkge1JlZ0V4cH0gcGF0dGVybiBUaGUgcmVndWxhciBleHByZXNzaW9uIG9mIHRoZSB0b2tlbi5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW2xvb2tiZWhpbmQ9ZmFsc2VdIElmIGB0cnVlYCwgdGhlbiB0aGUgZmlyc3QgY2FwdHVyaW5nIGdyb3VwIG9mIGBwYXR0ZXJuYCB3aWxsIChlZmZlY3RpdmVseSlcbiAqIGJlaGF2ZSBhcyBhIGxvb2tiZWhpbmQgZ3JvdXAgbWVhbmluZyB0aGF0IHRoZSBjYXB0dXJlZCB0ZXh0IHdpbGwgbm90IGJlIHBhcnQgb2YgdGhlIG1hdGNoZWQgdGV4dCBvZiB0aGUgbmV3IHRva2VuLlxuICogQHByb3BlcnR5IHtib29sZWFufSBbZ3JlZWR5PWZhbHNlXSBXaGV0aGVyIHRoZSB0b2tlbiBpcyBncmVlZHkuXG4gKiBAcHJvcGVydHkge3N0cmluZ3xzdHJpbmdbXX0gW2FsaWFzXSBBbiBvcHRpb25hbCBhbGlhcyBvciBsaXN0IG9mIGFsaWFzZXMuXG4gKiBAcHJvcGVydHkge0dyYW1tYXJ9IFtpbnNpZGVdIFRoZSBuZXN0ZWQgZ3JhbW1hciBvZiB0aGlzIHRva2VuLlxuICpcbiAqIFRoZSBgaW5zaWRlYCBncmFtbWFyIHdpbGwgYmUgdXNlZCB0byB0b2tlbml6ZSB0aGUgdGV4dCB2YWx1ZSBvZiBlYWNoIHRva2VuIG9mIHRoaXMga2luZC5cbiAqXG4gKiBUaGlzIGNhbiBiZSB1c2VkIHRvIG1ha2UgbmVzdGVkIGFuZCBldmVuIHJlY3Vyc2l2ZSBsYW5ndWFnZSBkZWZpbml0aW9ucy5cbiAqXG4gKiBOb3RlOiBUaGlzIGNhbiBjYXVzZSBpbmZpbml0ZSByZWN1cnNpb24uIEJlIGNhcmVmdWwgd2hlbiB5b3UgZW1iZWQgZGlmZmVyZW50IGxhbmd1YWdlcyBvciBldmVuIHRoZSBzYW1lIGxhbmd1YWdlIGludG9cbiAqIGVhY2ggYW5vdGhlci5cbiAqIEBnbG9iYWxcbiAqIEBwdWJsaWNcbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIEdyYW1tYXJcbiAqIEB0eXBlIHtPYmplY3Q8c3RyaW5nLCBSZWdFeHAgfCBHcmFtbWFyVG9rZW4gfCBBcnJheTxSZWdFeHAgfCBHcmFtbWFyVG9rZW4+Pn1cbiAqIEBwcm9wZXJ0eSB7R3JhbW1hcn0gW3Jlc3RdIEFuIG9wdGlvbmFsIGdyYW1tYXIgb2JqZWN0IHRoYXQgd2lsbCBiZSBhcHBlbmRlZCB0byB0aGlzIGdyYW1tYXIuXG4gKiBAZ2xvYmFsXG4gKiBAcHVibGljXG4gKi9cblxuLyoqXG4gKiBBIGZ1bmN0aW9uIHdoaWNoIHdpbGwgaW52b2tlZCBhZnRlciBhbiBlbGVtZW50IHdhcyBzdWNjZXNzZnVsbHkgaGlnaGxpZ2h0ZWQuXG4gKlxuICogQGNhbGxiYWNrIEhpZ2hsaWdodENhbGxiYWNrXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgc3VjY2Vzc2Z1bGx5IGhpZ2hsaWdodGVkLlxuICogQHJldHVybnMge3ZvaWR9XG4gKiBAZ2xvYmFsXG4gKiBAcHVibGljXG4gKi9cblxuLyoqXG4gKiBAY2FsbGJhY2sgSG9va0NhbGxiYWNrXG4gKiBAcGFyYW0ge09iamVjdDxzdHJpbmcsIGFueT59IGVudiBUaGUgZW52aXJvbm1lbnQgdmFyaWFibGVzIG9mIHRoZSBob29rLlxuICogQHJldHVybnMge3ZvaWR9XG4gKiBAZ2xvYmFsXG4gKiBAcHVibGljXG4gKi9cbjtcblByaXNtLmxhbmd1YWdlcy5tYXJrdXAgPSB7XG5cdCdjb21tZW50Jzoge1xuXHRcdHBhdHRlcm46IC88IS0tKD86KD8hPCEtLSlbXFxzXFxTXSkqPy0tPi8sXG5cdFx0Z3JlZWR5OiB0cnVlXG5cdH0sXG5cdCdwcm9sb2cnOiB7XG5cdFx0cGF0dGVybjogLzxcXD9bXFxzXFxTXSs/XFw/Pi8sXG5cdFx0Z3JlZWR5OiB0cnVlXG5cdH0sXG5cdCdkb2N0eXBlJzoge1xuXHRcdC8vIGh0dHBzOi8vd3d3LnczLm9yZy9UUi94bWwvI05ULWRvY3R5cGVkZWNsXG5cdFx0cGF0dGVybjogLzwhRE9DVFlQRSg/OltePlwiJ1tcXF1dfFwiW15cIl0qXCJ8J1teJ10qJykrKD86XFxbKD86W148XCInXFxdXXxcIlteXCJdKlwifCdbXiddKid8PCg/ISEtLSl8PCEtLSg/OlteLV18LSg/IS0+KSkqLS0+KSpcXF1cXHMqKT8+L2ksXG5cdFx0Z3JlZWR5OiB0cnVlLFxuXHRcdGluc2lkZToge1xuXHRcdFx0J2ludGVybmFsLXN1YnNldCc6IHtcblx0XHRcdFx0cGF0dGVybjogLyheW15cXFtdKlxcWylbXFxzXFxTXSsoPz1cXF0+JCkvLFxuXHRcdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0XHRncmVlZHk6IHRydWUsXG5cdFx0XHRcdGluc2lkZTogbnVsbCAvLyBzZWUgYmVsb3dcblx0XHRcdH0sXG5cdFx0XHQnc3RyaW5nJzoge1xuXHRcdFx0XHRwYXR0ZXJuOiAvXCJbXlwiXSpcInwnW14nXSonLyxcblx0XHRcdFx0Z3JlZWR5OiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0J3B1bmN0dWF0aW9uJzogL148IXw+JHxbW1xcXV0vLFxuXHRcdFx0J2RvY3R5cGUtdGFnJzogL15ET0NUWVBFL2ksXG5cdFx0XHQnbmFtZSc6IC9bXlxcczw+J1wiXSsvXG5cdFx0fVxuXHR9LFxuXHQnY2RhdGEnOiB7XG5cdFx0cGF0dGVybjogLzwhXFxbQ0RBVEFcXFtbXFxzXFxTXSo/XFxdXFxdPi9pLFxuXHRcdGdyZWVkeTogdHJ1ZVxuXHR9LFxuXHQndGFnJzoge1xuXHRcdHBhdHRlcm46IC88XFwvPyg/IVxcZClbXlxccz5cXC89JDwlXSsoPzpcXHMoPzpcXHMqW15cXHM+XFwvPV0rKD86XFxzKj1cXHMqKD86XCJbXlwiXSpcInwnW14nXSonfFteXFxzJ1wiPj1dKyg/PVtcXHM+XSkpfCg/PVtcXHMvPl0pKSkrKT9cXHMqXFwvPz4vLFxuXHRcdGdyZWVkeTogdHJ1ZSxcblx0XHRpbnNpZGU6IHtcblx0XHRcdCd0YWcnOiB7XG5cdFx0XHRcdHBhdHRlcm46IC9ePFxcLz9bXlxccz5cXC9dKy8sXG5cdFx0XHRcdGluc2lkZToge1xuXHRcdFx0XHRcdCdwdW5jdHVhdGlvbic6IC9ePFxcLz8vLFxuXHRcdFx0XHRcdCduYW1lc3BhY2UnOiAvXlteXFxzPlxcLzpdKzovXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHQnc3BlY2lhbC1hdHRyJzogW10sXG5cdFx0XHQnYXR0ci12YWx1ZSc6IHtcblx0XHRcdFx0cGF0dGVybjogLz1cXHMqKD86XCJbXlwiXSpcInwnW14nXSonfFteXFxzJ1wiPj1dKykvLFxuXHRcdFx0XHRpbnNpZGU6IHtcblx0XHRcdFx0XHQncHVuY3R1YXRpb24nOiBbXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHBhdHRlcm46IC9ePS8sXG5cdFx0XHRcdFx0XHRcdGFsaWFzOiAnYXR0ci1lcXVhbHMnXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRwYXR0ZXJuOiAvXihcXHMqKVtcIiddfFtcIiddJC8sXG5cdFx0XHRcdFx0XHRcdGxvb2tiZWhpbmQ6IHRydWVcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRdXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHQncHVuY3R1YXRpb24nOiAvXFwvPz4vLFxuXHRcdFx0J2F0dHItbmFtZSc6IHtcblx0XHRcdFx0cGF0dGVybjogL1teXFxzPlxcL10rLyxcblx0XHRcdFx0aW5zaWRlOiB7XG5cdFx0XHRcdFx0J25hbWVzcGFjZSc6IC9eW15cXHM+XFwvOl0rOi9cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0fVxuXHR9LFxuXHQnZW50aXR5JzogW1xuXHRcdHtcblx0XHRcdHBhdHRlcm46IC8mW1xcZGEtel17MSw4fTsvaSxcblx0XHRcdGFsaWFzOiAnbmFtZWQtZW50aXR5J1xuXHRcdH0sXG5cdFx0LyYjeD9bXFxkYS1mXXsxLDh9Oy9pXG5cdF1cbn07XG5cblByaXNtLmxhbmd1YWdlcy5tYXJrdXBbJ3RhZyddLmluc2lkZVsnYXR0ci12YWx1ZSddLmluc2lkZVsnZW50aXR5J10gPVxuXHRQcmlzbS5sYW5ndWFnZXMubWFya3VwWydlbnRpdHknXTtcblByaXNtLmxhbmd1YWdlcy5tYXJrdXBbJ2RvY3R5cGUnXS5pbnNpZGVbJ2ludGVybmFsLXN1YnNldCddLmluc2lkZSA9IFByaXNtLmxhbmd1YWdlcy5tYXJrdXA7XG5cbi8vIFBsdWdpbiB0byBtYWtlIGVudGl0eSB0aXRsZSBzaG93IHRoZSByZWFsIGVudGl0eSwgaWRlYSBieSBSb21hbiBLb21hcm92XG5QcmlzbS5ob29rcy5hZGQoJ3dyYXAnLCBmdW5jdGlvbiAoZW52KSB7XG5cblx0aWYgKGVudi50eXBlID09PSAnZW50aXR5Jykge1xuXHRcdGVudi5hdHRyaWJ1dGVzWyd0aXRsZSddID0gZW52LmNvbnRlbnQucmVwbGFjZSgvJmFtcDsvLCAnJicpO1xuXHR9XG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFByaXNtLmxhbmd1YWdlcy5tYXJrdXAudGFnLCAnYWRkSW5saW5lZCcsIHtcblx0LyoqXG5cdCAqIEFkZHMgYW4gaW5saW5lZCBsYW5ndWFnZSB0byBtYXJrdXAuXG5cdCAqXG5cdCAqIEFuIGV4YW1wbGUgb2YgYW4gaW5saW5lZCBsYW5ndWFnZSBpcyBDU1Mgd2l0aCBgPHN0eWxlPmAgdGFncy5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IHRhZ05hbWUgVGhlIG5hbWUgb2YgdGhlIHRhZyB0aGF0IGNvbnRhaW5zIHRoZSBpbmxpbmVkIGxhbmd1YWdlLiBUaGlzIG5hbWUgd2lsbCBiZSB0cmVhdGVkIGFzXG5cdCAqIGNhc2UgaW5zZW5zaXRpdmUuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsYW5nIFRoZSBsYW5ndWFnZSBrZXkuXG5cdCAqIEBleGFtcGxlXG5cdCAqIGFkZElubGluZWQoJ3N0eWxlJywgJ2NzcycpO1xuXHQgKi9cblx0dmFsdWU6IGZ1bmN0aW9uIGFkZElubGluZWQodGFnTmFtZSwgbGFuZykge1xuXHRcdHZhciBpbmNsdWRlZENkYXRhSW5zaWRlID0ge307XG5cdFx0aW5jbHVkZWRDZGF0YUluc2lkZVsnbGFuZ3VhZ2UtJyArIGxhbmddID0ge1xuXHRcdFx0cGF0dGVybjogLyhePCFcXFtDREFUQVxcWylbXFxzXFxTXSs/KD89XFxdXFxdPiQpL2ksXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0aW5zaWRlOiBQcmlzbS5sYW5ndWFnZXNbbGFuZ11cblx0XHR9O1xuXHRcdGluY2x1ZGVkQ2RhdGFJbnNpZGVbJ2NkYXRhJ10gPSAvXjwhXFxbQ0RBVEFcXFt8XFxdXFxdPiQvaTtcblxuXHRcdHZhciBpbnNpZGUgPSB7XG5cdFx0XHQnaW5jbHVkZWQtY2RhdGEnOiB7XG5cdFx0XHRcdHBhdHRlcm46IC88IVxcW0NEQVRBXFxbW1xcc1xcU10qP1xcXVxcXT4vaSxcblx0XHRcdFx0aW5zaWRlOiBpbmNsdWRlZENkYXRhSW5zaWRlXG5cdFx0XHR9XG5cdFx0fTtcblx0XHRpbnNpZGVbJ2xhbmd1YWdlLScgKyBsYW5nXSA9IHtcblx0XHRcdHBhdHRlcm46IC9bXFxzXFxTXSsvLFxuXHRcdFx0aW5zaWRlOiBQcmlzbS5sYW5ndWFnZXNbbGFuZ11cblx0XHR9O1xuXG5cdFx0dmFyIGRlZiA9IHt9O1xuXHRcdGRlZlt0YWdOYW1lXSA9IHtcblx0XHRcdHBhdHRlcm46IFJlZ0V4cCgvKDxfX1tePl0qPikoPzo8IVxcW0NEQVRBXFxbKD86W15cXF1dfFxcXSg/IVxcXT4pKSpcXF1cXF0+fCg/ITwhXFxbQ0RBVEFcXFspW1xcc1xcU10pKj8oPz08XFwvX18+KS8uc291cmNlLnJlcGxhY2UoL19fL2csIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRhZ05hbWU7IH0pLCAnaScpLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdGdyZWVkeTogdHJ1ZSxcblx0XHRcdGluc2lkZTogaW5zaWRlXG5cdFx0fTtcblxuXHRcdFByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ21hcmt1cCcsICdjZGF0YScsIGRlZik7XG5cdH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KFByaXNtLmxhbmd1YWdlcy5tYXJrdXAudGFnLCAnYWRkQXR0cmlidXRlJywge1xuXHQvKipcblx0ICogQWRkcyBhbiBwYXR0ZXJuIHRvIGhpZ2hsaWdodCBsYW5ndWFnZXMgZW1iZWRkZWQgaW4gSFRNTCBhdHRyaWJ1dGVzLlxuXHQgKlxuXHQgKiBBbiBleGFtcGxlIG9mIGFuIGlubGluZWQgbGFuZ3VhZ2UgaXMgQ1NTIHdpdGggYHN0eWxlYCBhdHRyaWJ1dGVzLlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gYXR0ck5hbWUgVGhlIG5hbWUgb2YgdGhlIHRhZyB0aGF0IGNvbnRhaW5zIHRoZSBpbmxpbmVkIGxhbmd1YWdlLiBUaGlzIG5hbWUgd2lsbCBiZSB0cmVhdGVkIGFzXG5cdCAqIGNhc2UgaW5zZW5zaXRpdmUuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsYW5nIFRoZSBsYW5ndWFnZSBrZXkuXG5cdCAqIEBleGFtcGxlXG5cdCAqIGFkZEF0dHJpYnV0ZSgnc3R5bGUnLCAnY3NzJyk7XG5cdCAqL1xuXHR2YWx1ZTogZnVuY3Rpb24gKGF0dHJOYW1lLCBsYW5nKSB7XG5cdFx0UHJpc20ubGFuZ3VhZ2VzLm1hcmt1cC50YWcuaW5zaWRlWydzcGVjaWFsLWF0dHInXS5wdXNoKHtcblx0XHRcdHBhdHRlcm46IFJlZ0V4cChcblx0XHRcdFx0LyhefFtcIidcXHNdKS8uc291cmNlICsgJyg/OicgKyBhdHRyTmFtZSArICcpJyArIC9cXHMqPVxccyooPzpcIlteXCJdKlwifCdbXiddKid8W15cXHMnXCI+PV0rKD89W1xccz5dKSkvLnNvdXJjZSxcblx0XHRcdFx0J2knXG5cdFx0XHQpLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdGluc2lkZToge1xuXHRcdFx0XHQnYXR0ci1uYW1lJzogL15bXlxccz1dKy8sXG5cdFx0XHRcdCdhdHRyLXZhbHVlJzoge1xuXHRcdFx0XHRcdHBhdHRlcm46IC89W1xcc1xcU10rLyxcblx0XHRcdFx0XHRpbnNpZGU6IHtcblx0XHRcdFx0XHRcdCd2YWx1ZSc6IHtcblx0XHRcdFx0XHRcdFx0cGF0dGVybjogLyhePVxccyooW1wiJ118KD8hW1wiJ10pKSlcXFNbXFxzXFxTXSooPz1cXDIkKS8sXG5cdFx0XHRcdFx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRcdFx0XHRcdGFsaWFzOiBbbGFuZywgJ2xhbmd1YWdlLScgKyBsYW5nXSxcblx0XHRcdFx0XHRcdFx0aW5zaWRlOiBQcmlzbS5sYW5ndWFnZXNbbGFuZ11cblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHQncHVuY3R1YXRpb24nOiBbXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRwYXR0ZXJuOiAvXj0vLFxuXHRcdFx0XHRcdFx0XHRcdGFsaWFzOiAnYXR0ci1lcXVhbHMnXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdC9cInwnL1xuXHRcdFx0XHRcdFx0XVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG59KTtcblxuUHJpc20ubGFuZ3VhZ2VzLmh0bWwgPSBQcmlzbS5sYW5ndWFnZXMubWFya3VwO1xuUHJpc20ubGFuZ3VhZ2VzLm1hdGhtbCA9IFByaXNtLmxhbmd1YWdlcy5tYXJrdXA7XG5QcmlzbS5sYW5ndWFnZXMuc3ZnID0gUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cDtcblxuUHJpc20ubGFuZ3VhZ2VzLnhtbCA9IFByaXNtLmxhbmd1YWdlcy5leHRlbmQoJ21hcmt1cCcsIHt9KTtcblByaXNtLmxhbmd1YWdlcy5zc21sID0gUHJpc20ubGFuZ3VhZ2VzLnhtbDtcblByaXNtLmxhbmd1YWdlcy5hdG9tID0gUHJpc20ubGFuZ3VhZ2VzLnhtbDtcblByaXNtLmxhbmd1YWdlcy5yc3MgPSBQcmlzbS5sYW5ndWFnZXMueG1sO1xuXG4oZnVuY3Rpb24gKFByaXNtKSB7XG5cblx0Ly8gQWxsb3cgb25seSBvbmUgbGluZSBicmVha1xuXHR2YXIgaW5uZXIgPSAvKD86XFxcXC58W15cXFxcXFxuXFxyXXwoPzpcXG58XFxyXFxuPykoPyFbXFxyXFxuXSkpLy5zb3VyY2U7XG5cblx0LyoqXG5cdCAqIFRoaXMgZnVuY3Rpb24gaXMgaW50ZW5kZWQgZm9yIHRoZSBjcmVhdGlvbiBvZiB0aGUgYm9sZCBvciBpdGFsaWMgcGF0dGVybi5cblx0ICpcblx0ICogVGhpcyBhbHNvIGFkZHMgYSBsb29rYmVoaW5kIGdyb3VwIHRvIHRoZSBnaXZlbiBwYXR0ZXJuIHRvIGVuc3VyZSB0aGF0IHRoZSBwYXR0ZXJuIGlzIG5vdCBiYWNrc2xhc2gtZXNjYXBlZC5cblx0ICpcblx0ICogX05vdGU6XyBLZWVwIGluIG1pbmQgdGhhdCB0aGlzIGFkZHMgYSBjYXB0dXJpbmcgZ3JvdXAuXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBwYXR0ZXJuXG5cdCAqIEByZXR1cm5zIHtSZWdFeHB9XG5cdCAqL1xuXHRmdW5jdGlvbiBjcmVhdGVJbmxpbmUocGF0dGVybikge1xuXHRcdHBhdHRlcm4gPSBwYXR0ZXJuLnJlcGxhY2UoLzxpbm5lcj4vZywgZnVuY3Rpb24gKCkgeyByZXR1cm4gaW5uZXI7IH0pO1xuXHRcdHJldHVybiBSZWdFeHAoLygoPzpefFteXFxcXF0pKD86XFxcXHsyfSkqKS8uc291cmNlICsgJyg/OicgKyBwYXR0ZXJuICsgJyknKTtcblx0fVxuXG5cblx0dmFyIHRhYmxlQ2VsbCA9IC8oPzpcXFxcLnxgYCg/OlteYFxcclxcbl18YCg/IWApKStgYHxgW15gXFxyXFxuXStgfFteXFxcXHxcXHJcXG5gXSkrLy5zb3VyY2U7XG5cdHZhciB0YWJsZVJvdyA9IC9cXHw/X18oPzpcXHxfXykrXFx8Pyg/Oig/OlxcbnxcXHJcXG4/KXwoPyFbXFxzXFxTXSkpLy5zb3VyY2UucmVwbGFjZSgvX18vZywgZnVuY3Rpb24gKCkgeyByZXR1cm4gdGFibGVDZWxsOyB9KTtcblx0dmFyIHRhYmxlTGluZSA9IC9cXHw/WyBcXHRdKjo/LXszLH06P1sgXFx0XSooPzpcXHxbIFxcdF0qOj8tezMsfTo/WyBcXHRdKikrXFx8Pyg/OlxcbnxcXHJcXG4/KS8uc291cmNlO1xuXG5cblx0UHJpc20ubGFuZ3VhZ2VzLm1hcmtkb3duID0gUHJpc20ubGFuZ3VhZ2VzLmV4dGVuZCgnbWFya3VwJywge30pO1xuXHRQcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdtYXJrZG93bicsICdwcm9sb2cnLCB7XG5cdFx0J2Zyb250LW1hdHRlci1ibG9jayc6IHtcblx0XHRcdHBhdHRlcm46IC8oXig/OlxccypbXFxyXFxuXSk/KS0tLSg/IS4pW1xcc1xcU10qP1tcXHJcXG5dLS0tKD8hLikvLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdGdyZWVkeTogdHJ1ZSxcblx0XHRcdGluc2lkZToge1xuXHRcdFx0XHQncHVuY3R1YXRpb24nOiAvXi0tLXwtLS0kLyxcblx0XHRcdFx0J2Zyb250LW1hdHRlcic6IHtcblx0XHRcdFx0XHRwYXR0ZXJuOiAvXFxTKyg/OlxccytcXFMrKSovLFxuXHRcdFx0XHRcdGFsaWFzOiBbJ3lhbWwnLCAnbGFuZ3VhZ2UteWFtbCddLFxuXHRcdFx0XHRcdGluc2lkZTogUHJpc20ubGFuZ3VhZ2VzLnlhbWxcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0J2Jsb2NrcXVvdGUnOiB7XG5cdFx0XHQvLyA+IC4uLlxuXHRcdFx0cGF0dGVybjogL14+KD86W1xcdCBdKj4pKi9tLFxuXHRcdFx0YWxpYXM6ICdwdW5jdHVhdGlvbidcblx0XHR9LFxuXHRcdCd0YWJsZSc6IHtcblx0XHRcdHBhdHRlcm46IFJlZ0V4cCgnXicgKyB0YWJsZVJvdyArIHRhYmxlTGluZSArICcoPzonICsgdGFibGVSb3cgKyAnKSonLCAnbScpLFxuXHRcdFx0aW5zaWRlOiB7XG5cdFx0XHRcdCd0YWJsZS1kYXRhLXJvd3MnOiB7XG5cdFx0XHRcdFx0cGF0dGVybjogUmVnRXhwKCdeKCcgKyB0YWJsZVJvdyArIHRhYmxlTGluZSArICcpKD86JyArIHRhYmxlUm93ICsgJykqJCcpLFxuXHRcdFx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRcdFx0aW5zaWRlOiB7XG5cdFx0XHRcdFx0XHQndGFibGUtZGF0YSc6IHtcblx0XHRcdFx0XHRcdFx0cGF0dGVybjogUmVnRXhwKHRhYmxlQ2VsbCksXG5cdFx0XHRcdFx0XHRcdGluc2lkZTogUHJpc20ubGFuZ3VhZ2VzLm1hcmtkb3duXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0J3B1bmN0dWF0aW9uJzogL1xcfC9cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdCd0YWJsZS1saW5lJzoge1xuXHRcdFx0XHRcdHBhdHRlcm46IFJlZ0V4cCgnXignICsgdGFibGVSb3cgKyAnKScgKyB0YWJsZUxpbmUgKyAnJCcpLFxuXHRcdFx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRcdFx0aW5zaWRlOiB7XG5cdFx0XHRcdFx0XHQncHVuY3R1YXRpb24nOiAvXFx8fDo/LXszLH06Py9cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdCd0YWJsZS1oZWFkZXItcm93Jzoge1xuXHRcdFx0XHRcdHBhdHRlcm46IFJlZ0V4cCgnXicgKyB0YWJsZVJvdyArICckJyksXG5cdFx0XHRcdFx0aW5zaWRlOiB7XG5cdFx0XHRcdFx0XHQndGFibGUtaGVhZGVyJzoge1xuXHRcdFx0XHRcdFx0XHRwYXR0ZXJuOiBSZWdFeHAodGFibGVDZWxsKSxcblx0XHRcdFx0XHRcdFx0YWxpYXM6ICdpbXBvcnRhbnQnLFxuXHRcdFx0XHRcdFx0XHRpbnNpZGU6IFByaXNtLmxhbmd1YWdlcy5tYXJrZG93blxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdCdwdW5jdHVhdGlvbic6IC9cXHwvXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblx0XHQnY29kZSc6IFtcblx0XHRcdHtcblx0XHRcdFx0Ly8gUHJlZml4ZWQgYnkgNCBzcGFjZXMgb3IgMSB0YWIgYW5kIHByZWNlZGVkIGJ5IGFuIGVtcHR5IGxpbmVcblx0XHRcdFx0cGF0dGVybjogLygoPzpefFxcbilbIFxcdF0qXFxufCg/Ol58XFxyXFxuPylbIFxcdF0qXFxyXFxuPykoPzogezR9fFxcdCkuKyg/Oig/OlxcbnxcXHJcXG4/KSg/OiB7NH18XFx0KS4rKSovLFxuXHRcdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0XHRhbGlhczogJ2tleXdvcmQnXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHQvLyBgYGBvcHRpb25hbCBsYW5ndWFnZVxuXHRcdFx0XHQvLyBjb2RlIGJsb2NrXG5cdFx0XHRcdC8vIGBgYFxuXHRcdFx0XHRwYXR0ZXJuOiAvXmBgYFtcXHNcXFNdKj9eYGBgJC9tLFxuXHRcdFx0XHRncmVlZHk6IHRydWUsXG5cdFx0XHRcdGluc2lkZToge1xuXHRcdFx0XHRcdCdjb2RlLWJsb2NrJzoge1xuXHRcdFx0XHRcdFx0cGF0dGVybjogL14oYGBgLiooPzpcXG58XFxyXFxuPykpW1xcc1xcU10rPyg/PSg/OlxcbnxcXHJcXG4/KV5gYGAkKS9tLFxuXHRcdFx0XHRcdFx0bG9va2JlaGluZDogdHJ1ZVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0J2NvZGUtbGFuZ3VhZ2UnOiB7XG5cdFx0XHRcdFx0XHRwYXR0ZXJuOiAvXihgYGApLisvLFxuXHRcdFx0XHRcdFx0bG9va2JlaGluZDogdHJ1ZVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0J3B1bmN0dWF0aW9uJzogL2BgYC9cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdF0sXG5cdFx0J3RpdGxlJzogW1xuXHRcdFx0e1xuXHRcdFx0XHQvLyB0aXRsZSAxXG5cdFx0XHRcdC8vID09PT09PT1cblxuXHRcdFx0XHQvLyB0aXRsZSAyXG5cdFx0XHRcdC8vIC0tLS0tLS1cblx0XHRcdFx0cGF0dGVybjogL1xcUy4qKD86XFxufFxcclxcbj8pKD86PT0rfC0tKykoPz1bIFxcdF0qJCkvbSxcblx0XHRcdFx0YWxpYXM6ICdpbXBvcnRhbnQnLFxuXHRcdFx0XHRpbnNpZGU6IHtcblx0XHRcdFx0XHRwdW5jdHVhdGlvbjogLz09KyR8LS0rJC9cblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0Ly8gIyB0aXRsZSAxXG5cdFx0XHRcdC8vICMjIyMjIyB0aXRsZSA2XG5cdFx0XHRcdHBhdHRlcm46IC8oXlxccyopIy4rL20sXG5cdFx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRcdGFsaWFzOiAnaW1wb3J0YW50Jyxcblx0XHRcdFx0aW5zaWRlOiB7XG5cdFx0XHRcdFx0cHVuY3R1YXRpb246IC9eIyt8IyskL1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XSxcblx0XHQnaHInOiB7XG5cdFx0XHQvLyAqKipcblx0XHRcdC8vIC0tLVxuXHRcdFx0Ly8gKiAqICpcblx0XHRcdC8vIC0tLS0tLS0tLS0tXG5cdFx0XHRwYXR0ZXJuOiAvKF5cXHMqKShbKi1dKSg/OltcXHQgXSpcXDIpezIsfSg/PVxccyokKS9tLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdGFsaWFzOiAncHVuY3R1YXRpb24nXG5cdFx0fSxcblx0XHQnbGlzdCc6IHtcblx0XHRcdC8vICogaXRlbVxuXHRcdFx0Ly8gKyBpdGVtXG5cdFx0XHQvLyAtIGl0ZW1cblx0XHRcdC8vIDEuIGl0ZW1cblx0XHRcdHBhdHRlcm46IC8oXlxccyopKD86WyorLV18XFxkK1xcLikoPz1bXFx0IF0uKS9tLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdGFsaWFzOiAncHVuY3R1YXRpb24nXG5cdFx0fSxcblx0XHQndXJsLXJlZmVyZW5jZSc6IHtcblx0XHRcdC8vIFtpZF06IGh0dHA6Ly9leGFtcGxlLmNvbSBcIk9wdGlvbmFsIHRpdGxlXCJcblx0XHRcdC8vIFtpZF06IGh0dHA6Ly9leGFtcGxlLmNvbSAnT3B0aW9uYWwgdGl0bGUnXG5cdFx0XHQvLyBbaWRdOiBodHRwOi8vZXhhbXBsZS5jb20gKE9wdGlvbmFsIHRpdGxlKVxuXHRcdFx0Ly8gW2lkXTogPGh0dHA6Ly9leGFtcGxlLmNvbT4gXCJPcHRpb25hbCB0aXRsZVwiXG5cdFx0XHRwYXR0ZXJuOiAvIT9cXFtbXlxcXV0rXFxdOltcXHQgXSsoPzpcXFMrfDwoPzpcXFxcLnxbXj5cXFxcXSkrPikoPzpbXFx0IF0rKD86XCIoPzpcXFxcLnxbXlwiXFxcXF0pKlwifCcoPzpcXFxcLnxbXidcXFxcXSkqJ3xcXCgoPzpcXFxcLnxbXilcXFxcXSkqXFwpKSk/Lyxcblx0XHRcdGluc2lkZToge1xuXHRcdFx0XHQndmFyaWFibGUnOiB7XG5cdFx0XHRcdFx0cGF0dGVybjogL14oIT9cXFspW15cXF1dKy8sXG5cdFx0XHRcdFx0bG9va2JlaGluZDogdHJ1ZVxuXHRcdFx0XHR9LFxuXHRcdFx0XHQnc3RyaW5nJzogLyg/OlwiKD86XFxcXC58W15cIlxcXFxdKSpcInwnKD86XFxcXC58W14nXFxcXF0pKid8XFwoKD86XFxcXC58W14pXFxcXF0pKlxcKSkkLyxcblx0XHRcdFx0J3B1bmN0dWF0aW9uJzogL15bXFxbXFxdITpdfFs8Pl0vXG5cdFx0XHR9LFxuXHRcdFx0YWxpYXM6ICd1cmwnXG5cdFx0fSxcblx0XHQnYm9sZCc6IHtcblx0XHRcdC8vICoqc3Ryb25nKipcblx0XHRcdC8vIF9fc3Ryb25nX19cblxuXHRcdFx0Ly8gYWxsb3cgb25lIG5lc3RlZCBpbnN0YW5jZSBvZiBpdGFsaWMgdGV4dCB1c2luZyB0aGUgc2FtZSBkZWxpbWl0ZXJcblx0XHRcdHBhdHRlcm46IGNyZWF0ZUlubGluZSgvXFxiX18oPzooPyFfKTxpbm5lcj58Xyg/Oig/IV8pPGlubmVyPikrXykrX19cXGJ8XFwqXFwqKD86KD8hXFwqKTxpbm5lcj58XFwqKD86KD8hXFwqKTxpbm5lcj4pK1xcKikrXFwqXFwqLy5zb3VyY2UpLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdGdyZWVkeTogdHJ1ZSxcblx0XHRcdGluc2lkZToge1xuXHRcdFx0XHQnY29udGVudCc6IHtcblx0XHRcdFx0XHRwYXR0ZXJuOiAvKF4uLilbXFxzXFxTXSsoPz0uLiQpLyxcblx0XHRcdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0XHRcdGluc2lkZToge30gLy8gc2VlIGJlbG93XG5cdFx0XHRcdH0sXG5cdFx0XHRcdCdwdW5jdHVhdGlvbic6IC9cXCpcXCp8X18vXG5cdFx0XHR9XG5cdFx0fSxcblx0XHQnaXRhbGljJzoge1xuXHRcdFx0Ly8gKmVtKlxuXHRcdFx0Ly8gX2VtX1xuXG5cdFx0XHQvLyBhbGxvdyBvbmUgbmVzdGVkIGluc3RhbmNlIG9mIGJvbGQgdGV4dCB1c2luZyB0aGUgc2FtZSBkZWxpbWl0ZXJcblx0XHRcdHBhdHRlcm46IGNyZWF0ZUlubGluZSgvXFxiXyg/Oig/IV8pPGlubmVyPnxfXyg/Oig/IV8pPGlubmVyPikrX18pK19cXGJ8XFwqKD86KD8hXFwqKTxpbm5lcj58XFwqXFwqKD86KD8hXFwqKTxpbm5lcj4pK1xcKlxcKikrXFwqLy5zb3VyY2UpLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdGdyZWVkeTogdHJ1ZSxcblx0XHRcdGluc2lkZToge1xuXHRcdFx0XHQnY29udGVudCc6IHtcblx0XHRcdFx0XHRwYXR0ZXJuOiAvKF4uKVtcXHNcXFNdKyg/PS4kKS8sXG5cdFx0XHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdFx0XHRpbnNpZGU6IHt9IC8vIHNlZSBiZWxvd1xuXHRcdFx0XHR9LFxuXHRcdFx0XHQncHVuY3R1YXRpb24nOiAvWypfXS9cblx0XHRcdH1cblx0XHR9LFxuXHRcdCdzdHJpa2UnOiB7XG5cdFx0XHQvLyB+fnN0cmlrZSB0aHJvdWdofn5cblx0XHRcdC8vIH5zdHJpa2V+XG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVnZXhwL3N0cmljdFxuXHRcdFx0cGF0dGVybjogY3JlYXRlSW5saW5lKC8ofn4/KSg/Oig/IX4pPGlubmVyPikrXFwyLy5zb3VyY2UpLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdGdyZWVkeTogdHJ1ZSxcblx0XHRcdGluc2lkZToge1xuXHRcdFx0XHQnY29udGVudCc6IHtcblx0XHRcdFx0XHRwYXR0ZXJuOiAvKF5+fj8pW1xcc1xcU10rKD89XFwxJCkvLFxuXHRcdFx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRcdFx0aW5zaWRlOiB7fSAvLyBzZWUgYmVsb3dcblx0XHRcdFx0fSxcblx0XHRcdFx0J3B1bmN0dWF0aW9uJzogL35+Py9cblx0XHRcdH1cblx0XHR9LFxuXHRcdCdjb2RlLXNuaXBwZXQnOiB7XG5cdFx0XHQvLyBgY29kZWBcblx0XHRcdC8vIGBgY29kZWBgXG5cdFx0XHRwYXR0ZXJuOiAvKF58W15cXFxcYF0pKD86YGBbXmBcXHJcXG5dKyg/OmBbXmBcXHJcXG5dKykqYGAoPyFgKXxgW15gXFxyXFxuXStgKD8hYCkpLyxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRncmVlZHk6IHRydWUsXG5cdFx0XHRhbGlhczogWydjb2RlJywgJ2tleXdvcmQnXVxuXHRcdH0sXG5cdFx0J3VybCc6IHtcblx0XHRcdC8vIFtleGFtcGxlXShodHRwOi8vZXhhbXBsZS5jb20gXCJPcHRpb25hbCB0aXRsZVwiKVxuXHRcdFx0Ly8gW2V4YW1wbGVdW2lkXVxuXHRcdFx0Ly8gW2V4YW1wbGVdIFtpZF1cblx0XHRcdHBhdHRlcm46IGNyZWF0ZUlubGluZSgvIT9cXFsoPzooPyFcXF0pPGlubmVyPikrXFxdKD86XFwoW15cXHMpXSsoPzpbXFx0IF0rXCIoPzpcXFxcLnxbXlwiXFxcXF0pKlwiKT9cXCl8WyBcXHRdP1xcWyg/Oig/IVxcXSk8aW5uZXI+KStcXF0pLy5zb3VyY2UpLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdGdyZWVkeTogdHJ1ZSxcblx0XHRcdGluc2lkZToge1xuXHRcdFx0XHQnb3BlcmF0b3InOiAvXiEvLFxuXHRcdFx0XHQnY29udGVudCc6IHtcblx0XHRcdFx0XHRwYXR0ZXJuOiAvKF5cXFspW15cXF1dKyg/PVxcXSkvLFxuXHRcdFx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRcdFx0aW5zaWRlOiB7fSAvLyBzZWUgYmVsb3dcblx0XHRcdFx0fSxcblx0XHRcdFx0J3ZhcmlhYmxlJzoge1xuXHRcdFx0XHRcdHBhdHRlcm46IC8oXlxcXVsgXFx0XT9cXFspW15cXF1dKyg/PVxcXSQpLyxcblx0XHRcdFx0XHRsb29rYmVoaW5kOiB0cnVlXG5cdFx0XHRcdH0sXG5cdFx0XHRcdCd1cmwnOiB7XG5cdFx0XHRcdFx0cGF0dGVybjogLyheXFxdXFwoKVteXFxzKV0rLyxcblx0XHRcdFx0XHRsb29rYmVoaW5kOiB0cnVlXG5cdFx0XHRcdH0sXG5cdFx0XHRcdCdzdHJpbmcnOiB7XG5cdFx0XHRcdFx0cGF0dGVybjogLyheWyBcXHRdKylcIig/OlxcXFwufFteXCJcXFxcXSkqXCIoPz1cXCkkKS8sXG5cdFx0XHRcdFx0bG9va2JlaGluZDogdHJ1ZVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcblxuXHRbJ3VybCcsICdib2xkJywgJ2l0YWxpYycsICdzdHJpa2UnXS5mb3JFYWNoKGZ1bmN0aW9uICh0b2tlbikge1xuXHRcdFsndXJsJywgJ2JvbGQnLCAnaXRhbGljJywgJ3N0cmlrZScsICdjb2RlLXNuaXBwZXQnXS5mb3JFYWNoKGZ1bmN0aW9uIChpbnNpZGUpIHtcblx0XHRcdGlmICh0b2tlbiAhPT0gaW5zaWRlKSB7XG5cdFx0XHRcdFByaXNtLmxhbmd1YWdlcy5tYXJrZG93blt0b2tlbl0uaW5zaWRlLmNvbnRlbnQuaW5zaWRlW2luc2lkZV0gPSBQcmlzbS5sYW5ndWFnZXMubWFya2Rvd25baW5zaWRlXTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSk7XG5cblx0UHJpc20uaG9va3MuYWRkKCdhZnRlci10b2tlbml6ZScsIGZ1bmN0aW9uIChlbnYpIHtcblx0XHRpZiAoZW52Lmxhbmd1YWdlICE9PSAnbWFya2Rvd24nICYmIGVudi5sYW5ndWFnZSAhPT0gJ21kJykge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHdhbGtUb2tlbnModG9rZW5zKSB7XG5cdFx0XHRpZiAoIXRva2VucyB8fCB0eXBlb2YgdG9rZW5zID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGZvciAodmFyIGkgPSAwLCBsID0gdG9rZW5zLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuXHRcdFx0XHR2YXIgdG9rZW4gPSB0b2tlbnNbaV07XG5cblx0XHRcdFx0aWYgKHRva2VuLnR5cGUgIT09ICdjb2RlJykge1xuXHRcdFx0XHRcdHdhbGtUb2tlbnModG9rZW4uY29udGVudCk7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKlxuXHRcdFx0XHQgKiBBZGQgdGhlIGNvcnJlY3QgYGxhbmd1YWdlLXh4eHhgIGNsYXNzIHRvIHRoaXMgY29kZSBibG9jay4gS2VlcCBpbiBtaW5kIHRoYXQgdGhlIGBjb2RlLWxhbmd1YWdlYCB0b2tlblxuXHRcdFx0XHQgKiBpcyBvcHRpb25hbC4gQnV0IHRoZSBncmFtbWFyIGlzIGRlZmluZWQgc28gdGhhdCB0aGVyZSBpcyBvbmx5IG9uZSBjYXNlIHdlIGhhdmUgdG8gaGFuZGxlOlxuXHRcdFx0XHQgKlxuXHRcdFx0XHQgKiB0b2tlbi5jb250ZW50ID0gW1xuXHRcdFx0XHQgKiAgICAgPHNwYW4gY2xhc3M9XCJwdW5jdHVhdGlvblwiPmBgYDwvc3Bhbj4sXG5cdFx0XHRcdCAqICAgICA8c3BhbiBjbGFzcz1cImNvZGUtbGFuZ3VhZ2VcIj54eHh4PC9zcGFuPixcblx0XHRcdFx0ICogICAgICdcXG4nLCAvLyBleGFjdGx5IG9uZSBuZXcgbGluZXMgKFxcciBvciBcXG4gb3IgXFxyXFxuKVxuXHRcdFx0XHQgKiAgICAgPHNwYW4gY2xhc3M9XCJjb2RlLWJsb2NrXCI+Li4uPC9zcGFuPixcblx0XHRcdFx0ICogICAgICdcXG4nLCAvLyBleGFjdGx5IG9uZSBuZXcgbGluZXMgYWdhaW5cblx0XHRcdFx0ICogICAgIDxzcGFuIGNsYXNzPVwicHVuY3R1YXRpb25cIj5gYGA8L3NwYW4+XG5cdFx0XHRcdCAqIF07XG5cdFx0XHRcdCAqL1xuXG5cdFx0XHRcdHZhciBjb2RlTGFuZyA9IHRva2VuLmNvbnRlbnRbMV07XG5cdFx0XHRcdHZhciBjb2RlQmxvY2sgPSB0b2tlbi5jb250ZW50WzNdO1xuXG5cdFx0XHRcdGlmIChjb2RlTGFuZyAmJiBjb2RlQmxvY2sgJiZcblx0XHRcdFx0XHRjb2RlTGFuZy50eXBlID09PSAnY29kZS1sYW5ndWFnZScgJiYgY29kZUJsb2NrLnR5cGUgPT09ICdjb2RlLWJsb2NrJyAmJlxuXHRcdFx0XHRcdHR5cGVvZiBjb2RlTGFuZy5jb250ZW50ID09PSAnc3RyaW5nJykge1xuXG5cdFx0XHRcdFx0Ly8gdGhpcyBtaWdodCBiZSBhIGxhbmd1YWdlIHRoYXQgUHJpc20gZG9lcyBub3Qgc3VwcG9ydFxuXG5cdFx0XHRcdFx0Ly8gZG8gc29tZSByZXBsYWNlbWVudHMgdG8gc3VwcG9ydCBDKyssIEMjLCBhbmQgRiNcblx0XHRcdFx0XHR2YXIgbGFuZyA9IGNvZGVMYW5nLmNvbnRlbnQucmVwbGFjZSgvXFxiIy9nLCAnc2hhcnAnKS5yZXBsYWNlKC9cXGJcXCtcXCsvZywgJ3BwJyk7XG5cdFx0XHRcdFx0Ly8gb25seSB1c2UgdGhlIGZpcnN0IHdvcmRcblx0XHRcdFx0XHRsYW5nID0gKC9bYS16XVtcXHctXSovaS5leGVjKGxhbmcpIHx8IFsnJ10pWzBdLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdFx0dmFyIGFsaWFzID0gJ2xhbmd1YWdlLScgKyBsYW5nO1xuXG5cdFx0XHRcdFx0Ly8gYWRkIGFsaWFzXG5cdFx0XHRcdFx0aWYgKCFjb2RlQmxvY2suYWxpYXMpIHtcblx0XHRcdFx0XHRcdGNvZGVCbG9jay5hbGlhcyA9IFthbGlhc107XG5cdFx0XHRcdFx0fSBlbHNlIGlmICh0eXBlb2YgY29kZUJsb2NrLmFsaWFzID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHRcdFx0Y29kZUJsb2NrLmFsaWFzID0gW2NvZGVCbG9jay5hbGlhcywgYWxpYXNdO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRjb2RlQmxvY2suYWxpYXMucHVzaChhbGlhcyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0d2Fsa1Rva2VucyhlbnYudG9rZW5zKTtcblx0fSk7XG5cblx0UHJpc20uaG9va3MuYWRkKCd3cmFwJywgZnVuY3Rpb24gKGVudikge1xuXHRcdGlmIChlbnYudHlwZSAhPT0gJ2NvZGUtYmxvY2snKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0dmFyIGNvZGVMYW5nID0gJyc7XG5cdFx0Zm9yICh2YXIgaSA9IDAsIGwgPSBlbnYuY2xhc3Nlcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcblx0XHRcdHZhciBjbHMgPSBlbnYuY2xhc3Nlc1tpXTtcblx0XHRcdHZhciBtYXRjaCA9IC9sYW5ndWFnZS0oLispLy5leGVjKGNscyk7XG5cdFx0XHRpZiAobWF0Y2gpIHtcblx0XHRcdFx0Y29kZUxhbmcgPSBtYXRjaFsxXTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dmFyIGdyYW1tYXIgPSBQcmlzbS5sYW5ndWFnZXNbY29kZUxhbmddO1xuXG5cdFx0aWYgKCFncmFtbWFyKSB7XG5cdFx0XHRpZiAoY29kZUxhbmcgJiYgY29kZUxhbmcgIT09ICdub25lJyAmJiBQcmlzbS5wbHVnaW5zLmF1dG9sb2FkZXIpIHtcblx0XHRcdFx0dmFyIGlkID0gJ21kLScgKyBuZXcgRGF0ZSgpLnZhbHVlT2YoKSArICctJyArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDFlMTYpO1xuXHRcdFx0XHRlbnYuYXR0cmlidXRlc1snaWQnXSA9IGlkO1xuXG5cdFx0XHRcdFByaXNtLnBsdWdpbnMuYXV0b2xvYWRlci5sb2FkTGFuZ3VhZ2VzKGNvZGVMYW5nLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0dmFyIGVsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcblx0XHRcdFx0XHRpZiAoZWxlKSB7XG5cdFx0XHRcdFx0XHRlbGUuaW5uZXJIVE1MID0gUHJpc20uaGlnaGxpZ2h0KGVsZS50ZXh0Q29udGVudCwgUHJpc20ubGFuZ3VhZ2VzW2NvZGVMYW5nXSwgY29kZUxhbmcpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGVudi5jb250ZW50ID0gUHJpc20uaGlnaGxpZ2h0KHRleHRDb250ZW50KGVudi5jb250ZW50KSwgZ3JhbW1hciwgY29kZUxhbmcpO1xuXHRcdH1cblx0fSk7XG5cblx0dmFyIHRhZ1BhdHRlcm4gPSBSZWdFeHAoUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cC50YWcucGF0dGVybi5zb3VyY2UsICdnaScpO1xuXG5cdC8qKlxuXHQgKiBBIGxpc3Qgb2Yga25vd24gZW50aXR5IG5hbWVzLlxuXHQgKlxuXHQgKiBUaGlzIHdpbGwgYWx3YXlzIGJlIGluY29tcGxldGUgdG8gc2F2ZSBzcGFjZS4gVGhlIGN1cnJlbnQgbGlzdCBpcyB0aGUgb25lIHVzZWQgYnkgbG93ZGFzaCdzIHVuZXNjYXBlIGZ1bmN0aW9uLlxuXHQgKlxuXHQgKiBAc2VlIHtAbGluayBodHRwczovL2dpdGh1Yi5jb20vbG9kYXNoL2xvZGFzaC9ibG9iLzJkYTAyNGMzYjRmOTk0N2E0ODUxNzYzOWRlNzU2MDQ1N2NkNGVjNmMvdW5lc2NhcGUuanMjTDJ9XG5cdCAqL1xuXHR2YXIgS05PV05fRU5USVRZX05BTUVTID0ge1xuXHRcdCdhbXAnOiAnJicsXG5cdFx0J2x0JzogJzwnLFxuXHRcdCdndCc6ICc+Jyxcblx0XHQncXVvdCc6ICdcIicsXG5cdH07XG5cblx0Ly8gSUUgMTEgZG9lc24ndCBzdXBwb3J0IGBTdHJpbmcuZnJvbUNvZGVQb2ludGBcblx0dmFyIGZyb21Db2RlUG9pbnQgPSBTdHJpbmcuZnJvbUNvZGVQb2ludCB8fCBTdHJpbmcuZnJvbUNoYXJDb2RlO1xuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSB0ZXh0IGNvbnRlbnQgb2YgYSBnaXZlbiBIVE1MIHNvdXJjZSBjb2RlIHN0cmluZy5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IGh0bWxcblx0ICogQHJldHVybnMge3N0cmluZ31cblx0ICovXG5cdGZ1bmN0aW9uIHRleHRDb250ZW50KGh0bWwpIHtcblx0XHQvLyByZW1vdmUgYWxsIHRhZ3Ncblx0XHR2YXIgdGV4dCA9IGh0bWwucmVwbGFjZSh0YWdQYXR0ZXJuLCAnJyk7XG5cblx0XHQvLyBkZWNvZGUga25vd24gZW50aXRpZXNcblx0XHR0ZXh0ID0gdGV4dC5yZXBsYWNlKC8mKFxcd3sxLDh9fCN4P1tcXGRhLWZdezEsOH0pOy9naSwgZnVuY3Rpb24gKG0sIGNvZGUpIHtcblx0XHRcdGNvZGUgPSBjb2RlLnRvTG93ZXJDYXNlKCk7XG5cblx0XHRcdGlmIChjb2RlWzBdID09PSAnIycpIHtcblx0XHRcdFx0dmFyIHZhbHVlO1xuXHRcdFx0XHRpZiAoY29kZVsxXSA9PT0gJ3gnKSB7XG5cdFx0XHRcdFx0dmFsdWUgPSBwYXJzZUludChjb2RlLnNsaWNlKDIpLCAxNik7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dmFsdWUgPSBOdW1iZXIoY29kZS5zbGljZSgxKSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gZnJvbUNvZGVQb2ludCh2YWx1ZSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR2YXIga25vd24gPSBLTk9XTl9FTlRJVFlfTkFNRVNbY29kZV07XG5cdFx0XHRcdGlmIChrbm93bikge1xuXHRcdFx0XHRcdHJldHVybiBrbm93bjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIHVuYWJsZSB0byBkZWNvZGVcblx0XHRcdFx0cmV0dXJuIG07XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gdGV4dDtcblx0fVxuXG5cdFByaXNtLmxhbmd1YWdlcy5tZCA9IFByaXNtLmxhbmd1YWdlcy5tYXJrZG93bjtcblxufShQcmlzbSkpO1xuXG4iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfcHJlYWN0X187IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uYiA9IGRvY3VtZW50LmJhc2VVUkkgfHwgc2VsZi5sb2NhdGlvbi5ocmVmO1xuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwiQmFyZU1ERVwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG4vLyBubyBvbiBjaHVua3MgbG9hZGVkXG5cbi8vIG5vIGpzb25wIGZ1bmN0aW9uIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgeyBDb21wb25lbnQsIGNyZWF0ZVJlZiB9IGZyb20gXCJwcmVhY3RcIjtcbmltcG9ydCB7aHRtbH0gZnJvbSBcImh0bS9wcmVhY3RcIjtcblxuaW1wb3J0IHtDb2RlSmFyfSBmcm9tIFwiY29kZWphclwiO1xucmVxdWlyZShcIi4vcHJpc20vcHJpc21fZml4ZWQuc2Nzc1wiKTtcbnJlcXVpcmUoXCIuL21kZWQuc2Nzc1wiKVxuY29uc3QgUHJpc20gPSAgcmVxdWlyZShcIi4vcHJpc20vcHJpc20uanNcIilcblxuaW1wb3J0IE1lbnUgZnJvbSBcIi4vTWVudVwiO1xuaW1wb3J0IFRCdXR0b24gZnJvbSBcIi4vVEJ1dHRvblwiO1xuLy9cbi8vICAgSUNPTlNcbi8vXG5pbXBvcnQgSWNvblNob3dQcmV2aWV3IGZyb20gXCIuL2ljb25zL3ByZXZpZXdfRklMTDBfd2dodDQwMF9HUkFEMF9vcHN6MjQuc3ZnP3Jhd1wiIFxuLy9mdWxsIHByZXZpZXdcbmltcG9ydCBJY29uRlByZXZpZXcgZnJvbSBcIi4vaWNvbnMvcHJldmlld19iaWdfb25fbWluLnN2Zz9yYXdcIlxuaW1wb3J0IEljb25GUHJldmlld09mZiBmcm9tIFwiLi9pY29ucy92aXNpYmlsaXR5X0ZJTEwwX3dnaHQ0MDBfR1JBRDBfb3BzejI0LnN2Zz9yYXdcIlxuLy9mdWxsc2NyZWVuXG5pbXBvcnQgSWNvbkZTY3JlZW5PZmYgZnJvbSBcIi4vaWNvbnMvZnVsbHNjcmVlbl9GSUxMMF93Z2h0NDAwX0dSQUQwX29wc3oyNC5zdmc/cmF3XCJcbmltcG9ydCBJY29uRlNjcmVlbiBmcm9tIFwiLi9pY29ucy9mdWxsc2NyZWVuX2V4aXRfRklMTDBfd2dodDQwMF9HUkFEMF9vcHN6MjQuc3ZnP3Jhd1wiXG4vL3NwZWxsY2hlY2tcbmltcG9ydCBJY29uU3BlbGwgZnJvbSBcIi4vaWNvbnMvc3BlbGxjaGVja19hY3RpdmVfbWluaWZpZWQuc3ZnP3Jhd1wiXG5pbXBvcnQgSWNvblNwZWxsT2ZmIGZyb20gXCIuL2ljb25zL3NwZWxsY2hlY2tfRklMTDFfd2dodDQwMF9HUkFEMF9vcHN6MjQuc3ZnP3Jhd1wiXG4vL3N5bmMgc2Nyb2xsXG5pbXBvcnQgSWNvblNTY3JvbGwgZnJvbSBcIi4vaWNvbnMvYXJyb3dzX2xvY2tlZC5zdmc/cmF3XCJcbmltcG9ydCBJY29uU1Njcm9sbE9mZiBmcm9tIFwiLi9pY29ucy9zd2FwX3ZlcnRfRklMTDBfd2dodDQwMF9HUkFEMF9vcHN6MjQuc3ZnP3Jhd1wiXG4vL3NhdmVcbmltcG9ydCBJY29uU2F2ZSBmcm9tIFwiLi9pY29ucy9zYXZlX3doaXRlLnN2Zz9yYXdcIlxuLy9mb3JtYXR0aW5nXG5pbXBvcnQgSWNvbkJvbGQgZnJvbSBcIi4vaWNvbnMvZm9ybWF0dGluZy9mb3JtYXRfYm9sZF9GSUxMMF93Z2h0NDAwX0dSQUQwX29wc3oyNC5zdmc/cmF3XCJcbmltcG9ydCBJY29uSXRhbGljIGZyb20gXCIuL2ljb25zL2Zvcm1hdHRpbmcvZm9ybWF0X2l0YWxpY19GSUxMMF93Z2h0NDAwX0dSQUQwX29wc3oyNC5zdmc/cmF3XCJcbmltcG9ydCBJY29uTGluayBmcm9tIFwiLi9pY29ucy9mb3JtYXR0aW5nL2xpbmtfRklMTDBfd2dodDQwMF9HUkFEMF9vcHN6MjQuc3ZnP3Jhd1wiXG5pbXBvcnQgSWNvblN0cmlrZSBmcm9tIFwiLi9pY29ucy9mb3JtYXR0aW5nL2Zvcm1hdF9zdHJpa2V0aHJvdWdoX0ZJTEwwX3dnaHQ0MDBfR1JBRDBfb3BzejI0LnN2Zz9yYXdcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYXJlTURFIGV4dGVuZHMgQ29tcG9uZW50e1xuICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgIHN1cGVyKHByb3BzKTtcbiAgICAgdGhpcy5wcmV2aWV3VGhyb3R0bGVkID0gZmFsc2U7XG4gICAgIHRoaXMuc2Nyb2xsVGhyb3R0bGVkID0gZmFsc2U7XG4gICAgIHRoaXMuc2F2ZVRocm90dGxlZCA9IGZhbHNlO1xuICAgICB0aGlzLmNvbXBvbmVudENvbnRhaW5lciA9IGNyZWF0ZVJlZigpO1xuICAgICB0aGlzLmNvZGVKYXJDb250YWluZXIgPSBjcmVhdGVSZWYoKTtcbiAgICAgdGhpcy5wcmV2aWV3Q29udGFpbmVyID0gY3JlYXRlUmVmKCk7XG4gICAgIHRoaXMucHJldmlld0ZyYW1lID0gY3JlYXRlUmVmKCk7XG4gICAgIHRoaXMuc3RhdGUgPXsgXG4gICAgICAgZnVsbHNjcmVlbjogcHJvcHMuZnVsbHNjcmVlbixcbiAgICAgICBzaG93UHJldmlldzogcHJvcHMuc2hvd1ByZXZpZXcsXG4gICAgICAgZnVsbFByZXZpZXc6IGZhbHNlLFxuICAgICAgIGNvbnRlbnQ6IHByb3BzLmNvbnRlbnQsXG4gICAgICAgc3BlbGxDaGVjazogcHJvcHMuc3BlbGxDaGVjayxcbiAgICAgICBzeW5jU2Nyb2xsOiB0cnVlLFxuICAgICAgIG1vZGlmaWVkOiBwcm9wcy5tb2RpZmllZFxuICAgICB9XG4gICAgIHRoaXMuc3Vycm91bmRTZWxlY3Rpb24gPSB0aGlzLnN1cnJvdW5kU2VsZWN0aW9uLmJpbmQodGhpcyk7XG4gICAgIHRoaXMuaGFuZGxlS2V5PSB0aGlzLmhhbmRsZUtleS5iaW5kKHRoaXMpO1xuICAgICB0aGlzLnRvZ2dsZVByZXZpZXcgPSB0aGlzLnRvZ2dsZVByZXZpZXcuYmluZCh0aGlzKTtcbiAgICAgdGhpcy50b2dnbGVGdWxsUHJldmlldyA9IHRoaXMudG9nZ2xlRnVsbFByZXZpZXcuYmluZCh0aGlzKTtcbiAgICAgdGhpcy50b2dnbGVGdWxsc2NyZWVuID0gdGhpcy50b2dnbGVGdWxsc2NyZWVuLmJpbmQodGhpcyk7XG4gICAgIHRoaXMudG9nZ2xlU3BlbGxjaGVjayA9IHRoaXMudG9nZ2xlU3BlbGxjaGVjay5iaW5kKHRoaXMpO1xuICAgICB0aGlzLnRvZ2dsZVN5bmNTY3JvbGwgPSB0aGlzLnRvZ2dsZVN5bmNTY3JvbGwuYmluZCh0aGlzKTtcbiAgICAgdGhpcy5kb1ByZXZpZXcgPSB0aGlzLmRvUHJldmlldy5iaW5kKHRoaXMpO1xuICAgICB0aGlzLnNhdmVGaWxlID0gdGhpcy5zYXZlRmlsZS5iaW5kKHRoaXMpO1xuICAgICB0aGlzLnN5bmNQcmV2aWV3U2Nyb2xsID0gdGhpcy5zeW5jUHJldmlld1Njcm9sbC5iaW5kKHRoaXMpO1xuICAgICB0aGlzLmVkaXRvckNvbW1hbmRzID0ge1xuICAgICAgIFwiYm9sZFwiOiAoKT0+dGhpcy5zdXJyb3VuZFNlbGVjdGlvbihcIioqXCIsXCIqKlwiKSxcbiAgICAgICBcIml0YWxpY1wiOiAoKT0+dGhpcy5zdXJyb3VuZFNlbGVjdGlvbihcIl9cIixcIl9cIiksXG4gICAgICAgXCJzdHJpa2VcIjogKCk9PnRoaXMuc3Vycm91bmRTZWxlY3Rpb24oXCJ+flwiLFwifn5cIiksXG4gICAgICAgXCJsaW5rXCI6ICgpPT57IGxldCB1cmw9cHJvbXB0KFwiRW50ZXIgVVJMOlwiICwgXCJodHRwczovL1wiKSA7XG4gICAgICAgdGhpcy5zdXJyb3VuZFNlbGVjdGlvbihcIltcIiwgXCJdKFwiICsgKCB1cmwgfHwgXCJcIiApICsgXCIpXCIpXG4gICAgICAgfVxuICAgICB9XG4gIH1cbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKHAgLCBzKXtcbiAgICAgXG4gICAgIC8vaWYgY29udGVudCBpcyByZXNldCwgd2UgaGF2ZSB0byByZXNldC5cbiAgICAgdGhpcy5wb3MgPSB0aGlzLmphci5zYXZlKCk7XG4gICAgIGlmKHRoaXMucHJvcHMuY29udGVudElkIT09cC5jb250ZW50SWQpe1xuICAgICAgICAgY29uc29sZS5sb2coXCJVcGRhdGUgY29udGVudC4uLlwiKVxuICAgICAgICAgXG4gICAgICAgICB0aGlzLmphci51cGRhdGVDb2RlKHAuY29udGVudCk7XG4gICAgICAgICAvLyB0aGlzLm1vZGlmaWVkID0gcC5tb2RpZmllZDtcbiAgICAgICAgIHRoaXMuZG9QcmV2aWV3KCk7XG4gICAgIH1cblxuICAgIGlmKCBzLnN5bmNTY3JvbGwgJiYgIXRoaXMuc3RhdGUuc3luY1Njcm9sbCApe1xuICAgICAgIHRoaXMuc3luY1ByZXZpZXdTY3JvbGwodHJ1ZSk7XG4gICAgfVxuICAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGNvbXBvbWVtdERpZFVwZGF0ZShvbGRTICwgb2xkUCl7XG4gICAgIC8vIGNvbnNvbGUubG9nKFwiQ29tcG9uZW50IHVwZGF0ZWRcIilcbiAgICAvLyBjb25zb2xlLmxvZyhcIkJhcmUgTURFIHVwZGF0ZWRcIiAsIHRoaXMuamFyLnNhdmUoKSlcbiAgICAvLyBpZiBjb21wb25lbnQgdXBkYXRlZCxcbiAgICAvLyBidXQgdGV4dCBpcyBub3QsXG4gICAgLy8gaXQgbWVhbnMsIHdlIGhhdmUgdG8gcmV0dXJuIGN1cnNvclxuICAgIC8vIHRvIGxhc3Qga25vd24gcG9zaXRpb25cbiAgICBpZihvbGRQLmNvbnRlbnQgPT10aGlzLnByb3BzLmNvbnRlbnQpeyBcbiAgICAgIHRoaXMucG9zICYmIHRoaXMuamFyLnJlc3RvcmUodGhpcy5wb3MpIDsgXG4gICAgICB0aGlzLnBvcyA9IG51bGwgOyAvLyAjRklYTUVcbiAgICB9IGVsc2V7XG4gICAgICAvLyBjb25zb2xlLmxvZyhcIlVwZGF0ZSBKQVJcIikgXG4gICAgICB0aGlzLmphci51cGRhdGVDb2RlKHRoaXMucHJvcHMuY29udGVudCk7IC8vPz8/XG5cbiAgICB9XG4gICAgIC8vIGNvbnNvbGUubG9nKFwiQ29tcG9uZW50IERpZCBVcGRhdGVcIilcbiAgICAgIHRoaXMuZG9QcmV2aWV3KHRydWUpO1xuICAgIFxuICB9XG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCl7XG5cbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB0aGlzLmRvUHJldmlldylcbiAgfVxuICBjb21wb25lbnREaWRNb3VudCgpe1xuICAgIHRoaXMuamFyID0gQ29kZUphcih0aGlzLmNvZGVKYXJDb250YWluZXIuY3VycmVudCAsIFxuICAgIChlKT0+UHJpc20uaGlnaGxpZ2h0RWxlbWVudChlLGZhbHNlLG51bGwpLFxuICAgIHtcbiAgICAgIHByZXNlcnZlSWRlbnQ6IHRydWUsXG4gICAgICBzcGVsbGNoZWNrOiB0aGlzLnN0YXRlLnNwZWxsQ2hlY2tcbiAgICB9XG5cbiAgICApO1xuICAgIHRoaXMuamFyLnVwZGF0ZUNvZGUodGhpcy5wcm9wcy5jb250ZW50KTtcbiAgICB0aGlzLmRvUHJldmlldygpO1xuICAgIGNvbnN0IHVwZEphciA9ICAoKT0+e1xuICAgICAgdGhpcy5wb3MgPSB0aGlzLmphci5zYXZlKCk7XG4gICAgICB0eXBlb2YgdGhpcy5wcm9wcy5vblVwZGF0ZT09PSdmdW5jdGlvbicgJiYgdGhpcy5wcm9wcy5vblVwZGF0ZSh0aGlzLmphci50b1N0cmluZygpKTtcbiAgICAgIHRoaXMuZG9QcmV2aWV3KCk7XG4gICAgfSA7XG4gICAgdGhpcy5qYXIub25VcGRhdGUoIHVwZEphciApO1xuICAgIC8vQ2hyb21lIGJ1Zyg/KSBmaXggKD8pOlxuICAgIHRoaXMuY29kZUphckNvbnRhaW5lci5jdXJyZW50LmZvY3VzKCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgdGhpcy5kb1ByZXZpZXcpXG4gICAgdGhpcy5jb2RlSmFyQ29udGFpbmVyLmN1cnJlbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiAsIHRoaXMuaGFuZGxlS2V5KTtcbiAgfVxuXG4gIGZpcmVDb21tYW5kKGNvbW1hbmQpe1xuICAgdGhpcy5lZGl0b3JDb21tYW5kc1tjb21tYW5kXSgpO1xuICB9XG5cbiAgaGFuZGxlS2V5KGV2dCl7IFxuICAgICBpZighZXZ0LmN0cmxLZXkpeyByZXR1cm4gfVxuICAgICAgLy8gY29uc29sZS5sb2coZXZ0LmNvZGUpO1xuICAgICAgaWYoZXZ0LmNvZGU9PT0nS2V5Qicpe3RoaXMuZmlyZUNvbW1hbmQoXCJib2xkXCIpfVxuICAgICAgaWYoZXZ0LmNvZGU9PT0nS2V5SScpe3RoaXMuZmlyZUNvbW1hbmQoXCJpdGFsaWNcIil9XG4gICAgICBpZihldnQuY29kZT09PSdLZXlMJyl7dGhpcy5maXJlQ29tbWFuZChcImxpbmtcIil9XG4gICAgICBpZihldnQuY29kZT09PSdLZXlEJyl7dGhpcy5maXJlQ29tbWFuZChcInN0cmlrZVwiKX1cbiAgfVxuXG5cbiAgaW5zZXJ0QXQodHh0ICwgcG9zICwgd2hhdCl7XG4gICAgLy9GSVg6IGlmIHN0cmluZyBzdGFydHMgd2l0aCBuZXdsaW5lLCBpbnNlcnQgYWZ0ZXIgbmV3bGluZS5cbiAgICByZXR1cm4gdHh0LnN1YnN0cmluZygwLHBvcykgKyB3aGF0ICsgdHh0LnN1YnN0cmluZyhwb3MpO1xuICB9XG5cbiAgc3Vycm91bmRTZWxlY3Rpb24oIGJlZm9yZSAsIGFmdGVyICl7XG4gICAgY29uc3QgcyA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgICBpZihzLmlzQ29sbGFwc2VkKXsgY29uc29sZS5lcnJvcihcImNvbGxhcHNlZCBzZWxlY3Rpb25cIiApIDsgcmV0dXJuIH1cbiAgICBjb25zdCByID0gcy5nZXRSYW5nZUF0KDApO1xuICAgIGlmKCFyKXsgcmV0dXJuIH1cbiAgICAvL2NoZWNrIGlmIHNlbGVjdGlvbiBpcyBpbnNpZGUgb3VyIGVkaXRvclxuICAgIGlmKFxuICAgICAgdGhpcy5jb2RlSmFyQ29udGFpbmVyLmN1cnJlbnQuY29udGFpbnMoci5jb21tb25BbmNlc3RvckNvbnRhaW5lcikgfHxcbiAgICAgIHRoaXMuY29kZUphckNvbnRhaW5lci5jdXJyZW50PT09ci5jb21tb25BbmNlc3RvckNvbnRhaW5lciBcbiAgICApe1xuICAgICAgLy8gY29uc29sZS5sb2cocyAsIHIpO1xuICAgICAgY29uc3QgcCA9IHRoaXMuamFyLnNhdmUoKTtcbiAgICAgIGlmKHAuZGlyPT09Jy0+Jyl7XG4gICAgICAgIHAuZW5kKz0oIGFmdGVyLmxlbmd0aCArIGJlZm9yZS5sZW5ndGgpO1xuICAgICAgfWVsc2V7XG4gICAgICAgIFxuICAgICAgICBwLnN0YXJ0Kz0oIGFmdGVyLmxlbmd0aCArIGJlZm9yZS5sZW5ndGgpO1xuICAgICAgfVxuICAgICAgY29uc3Qgc3RhcnQgPSByLnN0YXJ0Q29udGFpbmVyO1xuICAgICAgY29uc3Qgc3RhcnRPZiA9IHIuc3RhcnRPZmZzZXQ7XG4gICAgICBjb25zdCBlbmQgPSByLmVuZENvbnRhaW5lcjtcbiAgICAgIGNvbnN0IGVuZE9mID0gci5lbmRPZmZzZXQ7XG4gICAgICAvLyB0aGlzIG11c3QgZ28gZmlyc3QhXG4gICAgICBlbmQudGV4dENvbnRlbnQgPSB0aGlzLmluc2VydEF0KFxuICAgICAgICAgZW5kLnRleHRDb250ZW50LCBcbiAgICAgICAgIGVuZE9mLCBcbiAgICAgICAgIGFmdGVyKVxuXG4gICAgICBzdGFydC50ZXh0Q29udGVudCA9IHRoaXMuaW5zZXJ0QXQoXG4gICAgICAgICBzdGFydC50ZXh0Q29udGVudCwgXG4gICAgICAgICBzdGFydE9mLCBcbiAgICAgICAgIGJlZm9yZSlcbiAgICAgIC8vdXBkYXRlIGVkaXRvclxuICAgICAgdGhpcy5qYXIudXBkYXRlQ29kZSh0aGlzLmphci50b1N0cmluZygpKTtcbiAgICAgIHRoaXMuamFyLnJlc3RvcmUocCk7XG4gICAgICB0aGlzLmRvUHJldmlldyh0cnVlKVxuICAgICAgcmV0dXJuO1xuICAgIH1lbHNle1xuICAgICAgY29uc29sZS5lcnJvcihcIndyb25nIHNlbGVjdGlvblwiKTtcbiAgICB9XG5cbiAgfVxuXG5cbiAgYXN5bmMgc3luY1ByZXZpZXdTY3JvbGwoZm9yY2Upe1xuICAgIGlmKCF0aGlzLnN0YXRlLnN5bmNTY3JvbGwgJiYgIWZvcmNlICl7IHJldHVybiB9XG4gICAgaWYoIXRoaXMuc3RhdGUuc2hvd1ByZXZpZXcpeyByZXR1cm4gfVxuICAgIGlmKHRoaXMuc2Nyb2xsVGhyb3R0bGVkKXsgcmV0dXJuIH1cblxuICAgIHRoaXMuc2Nyb2xsVGhyb3R0bGVkID0gdHJ1ZTtcbiAgICBjb25zdCBkb1Njcm9sbCA9ICgpPT57XG4gICAgICAvL3ByZXZpZXcgaGVpZ2h0XG4gICAgICBjb25zdCBwcmV2aWV3RnVsbEggPSB0aGlzLnByZXZpZXdDb250YWluZXIuY3VycmVudC5zY3JvbGxIZWlnaHQ7XG4gICAgICAvL2VkaXRvciBoZWlnaHRcbiAgICAgIGNvbnN0IGVkaXRvckZ1bGxIID0gdGhpcy5jb2RlSmFyQ29udGFpbmVyLmN1cnJlbnQuc2Nyb2xsSGVpZ2h0O1xuICAgICAgY29uc3QgZWRpdG9yU2Nyb2xsZWQgPSB0aGlzLmNvZGVKYXJDb250YWluZXIuY3VycmVudC5zY3JvbGxUb3A7XG5cbiAgICAgIGNvbnN0IGVsZW1lbnRIZWlnaHQgPSB0aGlzLnByZXZpZXdDb250YWluZXIuY3VycmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG4gICAgICAvL2lmIG9uZSBvZiB0aGVtIGNhbiBub3Qgc2Nyb2xsLCBkbyBub3RoaW5nXG4gICAgICBpZihwcmV2aWV3RnVsbEg8PWVsZW1lbnRIZWlnaHQgfHwgZWRpdG9yRnVsbEg8PWVsZW1lbnRIZWlnaHQgKXsgcmV0dXJuIH1cblxuICAgICAgY29uc3QgZWRpdG9yUmF0aW8gPSBlZGl0b3JTY3JvbGxlZC8oIGVkaXRvckZ1bGxIIC0gZWxlbWVudEhlaWdodCApO1xuXG5cbiAgICAgIGNvbnN0IHNjcm9sbFByZXZpZXdUbyA9ICAoIHByZXZpZXdGdWxsSC1lbGVtZW50SGVpZ2h0ICkgKiBlZGl0b3JSYXRpbztcbiAgICAgIHRoaXMucHJldmlld0NvbnRhaW5lci5jdXJyZW50LnNjcm9sbFRvKFxuICAgICAgICB7dG9wOiBzY3JvbGxQcmV2aWV3VG8gLCBcbiAgICAgICAgICBsZWZ0OjAgLCBcbiAgICAgICAgICBiZWhhdmlvcjogXCJzbW9vdGhcIn1cbiAgICAgICk7XG4gICAgfVxuICAgIGRvU2Nyb2xsKClcblxuICAgIHdpbmRvdy5zZXRUaW1lb3V0KCAoKT0+eyB0aGlzLnNjcm9sbFRocm90dGxlZD1mYWxzZSA7IGRvU2Nyb2xsKCkgfSAsIDUwICk7XG5cbiAgfVxuICBcblxuICB0b2dnbGVTcGVsbGNoZWNrKCl7XG5cbiAgICB0aGlzLmphci51cGRhdGVPcHRpb25zKHtzcGVsbGNoZWNrOiAhdGhpcy5zdGF0ZS5zcGVsbENoZWNrfSk7XG4gICAgdGhpcy5jb2RlSmFyQ29udGFpbmVyLmN1cnJlbnQuc3BlbGxjaGVjayA9ICF0aGlzLnN0YXRlLnNwZWxsQ2hlY2s7XG4gICAgdGhpcy5zZXRTdGF0ZSh7c3BlbGxDaGVjazogIXRoaXMuc3RhdGUuc3BlbGxDaGVja30pXG4gIH1cblxuICB0b2dnbGVGdWxsc2NyZWVuKCl7XG4gICAgIC8vIGNvbnNvbGUubG9nKFwiVG9nZ2xlIGZ1bGxzY3JlZW5cIik7XG4gICAgIFxuICAgICBjb25zdCB2ID0gIXRoaXMuc3RhdGUuZnVsbHNjcmVlbjtcbiAgICAgaWYodil7XG4gICAgIHR5cGVvZiB0aGlzLnByb3BzLm9uRW50ZXJGdWxsc2NyZWVuID09PSAnZnVuY3Rpb24nICYmIHRoaXMucHJvcHMub25FbnRlckZ1bGxzY3JlZW4oKTtcbiAgICAgdGhpcy5jb21wb25lbnRDb250YWluZXIuY3VycmVudC5zdHlsZS56SW5kZXggPSB0aGlzLnByb3BzLmZ1bGxzY3JlZW5aSW5kZXggXG4gICAgIGlmKHRoaXMucHJvcHMudHJ1ZUZ1bGxzY3JlZW4gJiYgZG9jdW1lbnQuZnVsbHNjcmVlbkVuYWJsZWQpeyB0aGlzLmNvbXBvbmVudENvbnRhaW5lci5jdXJyZW50LnJlcXVlc3RGdWxsc2NyZWVuKCkgfVxuICAgICB9XG4gICAgIGVsc2V7IFxuICAgICAgIHR5cGVvZiB0aGlzLnByb3BzLm9uRXhpdEZ1bGxzY3JlZW4gPT09ICdmdW5jdGlvbicgJiYgdGhpcy5wcm9wcy5vbkV4aXRGdWxsc2NyZWVuKCk7XG4gICAgICAgdGhpcy5jb21wb25lbnRDb250YWluZXIuY3VycmVudC5zdHlsZS56SW5kZXggPSBcInVuc2V0XCJcbiAgICAgICBpZih0aGlzLnByb3BzLnRydWVGdWxsc2NyZWVuICYmIGRvY3VtZW50LmZ1bGxzY3JlZW5FbmFibGVkKXsgZG9jdW1lbnQuZXhpdEZ1bGxzY3JlZW4oKX1cbiAgICAgICB9XG4gICAgIHRyeSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2Z1bGxzY3JlZW46IHZ9KTtcbiAgICAgfWNhdGNoKGUpe1xuICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBmb3VuZCFcIiAsIGUpO1xuICAgICB9XG4gICAgIC8vIHRoaXMuZG9QcmV2aWV3KCk7XG4gIH1cbiAgdG9nZ2xlUHJldmlldygpe1xuICAgICBcbiAgICAgY29uc3QgdiA9ICF0aGlzLnN0YXRlLnNob3dQcmV2aWV3O1xuICAgICBjb25zdCBucyA9IHtzaG93UHJldmlldzogdn1cblxuICAgICBpZih0aGlzLnN0YXRlLmZ1bGxQcmV2aWV3KXtcbiAgICAgICB0aGlzLnNldFN0YXRlKHtmdWxsUHJldmlldzogZmFsc2V9KTtcbiAgICAgICByZXR1cm47XG4gICAgIH1cbiAgICAgdGhpcy5zZXRTdGF0ZShucyk7XG4gIH1cbiAgdG9nZ2xlRnVsbFByZXZpZXcoKXtcbiAgICBcbiAgICBpZiggdHlwZW9mIHRoaXMucHJvcHMuZXh0ZXJuYWxQcmV2aWV3ID09ICdmdW5jdGlvbicgKXsgXG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmV4dGVybmFsUHJldmlldygpO1xuICAgIH0gXG4gICAgIGNvbnN0IHYgPSAhdGhpcy5zdGF0ZS5mdWxsUHJldmlldztcbiAgICAgdGhpcy5zZXRTdGF0ZSh7ZnVsbFByZXZpZXc6IHZ9KTsgXG4gIH1cbiAgdG9nZ2xlU3luY1Njcm9sbCgpe1xuICAgICBcbiAgICAgY29uc3QgdiA9ICF0aGlzLnN0YXRlLnN5bmNTY3JvbGw7XG4gICAgIGNvbnN0IG5zID0ge3N5bmNTY3JvbGw6IHZ9XG4gICAgIHRoaXMuc2V0U3RhdGUobnMpO1xuICB9XG4gIHNhdmVGaWxlKCl7XG4gICAgaWYodGhpcy5zYXZlVGhyb3R0bGVkKXsgcmV0dXJuIH1cbiAgICBpZiggdHlwZW9mIHRoaXMucHJvcHMuc2F2ZT09PSdmdW5jdGlvbicgKXtcbiAgICAgIHRoaXMucHJvcHMuc2F2ZSh0aGlzLmphci50b1N0cmluZygpKSBcbiAgICAgIHRoaXMuc2F2ZVRocm90dGxlZCA9IHRydWU7XG4gICAgICB3aW5kb3cuc2V0VGltZW91dCgoKT0+eyB0aGlzLnNhdmVUaHJvdHRsZWQ9ZmFsc2UgfSAsIDIwMCk7XG4gICAgfTtcblxuICB9XG4gIGFzeW5jIGRvUHJldmlldyhmb3JjZSl7XG4gICAgLy9pZiBwcmV2aWV3IGlzIGhpZGRlbiBhbmQgd2UgZG8gbm90IGZvcmNlZCB0byB1cGRhdGUgaXQsIHJldHVyblxuICAgIGlmKCF0aGlzLnN0YXRlLnNob3dQcmV2aWV3JiYhZm9yY2UpeyAgcmV0dXJuIH1cbiAgICBpZighdGhpcy5wcmV2aWV3RnJhbWUuY3VycmVudCl7IGNvbnNvbGUubG9nKFwibm8gaWZyYW1lXCIpIDtjb25zb2xlLmxvZygpIH1cblxuICAgIGNvbnN0IHJlZHJhdyA9ICgpPT57XG4gICAgICAgaWYoIXRoaXMucHJldmlld0ZyYW1lLmN1cnJlbnQuY29udGVudFdpbmRvdyl7IHJldHVybiB9IFxuICAgICAgY29uc3QgZnJhbWVEb2MgPSB0aGlzLnByZXZpZXdGcmFtZS5jdXJyZW50LmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XG4gICAgICBjb25zdCBjb250ZW50ID0gIHRoaXMucHJvcHMucmVuZGVyKHRoaXMuamFyLnRvU3RyaW5nKCkpO1xuICAgICAgLy8gZnJhbWVEb2MuZG9jdW1lbnRFbGVtZW50Lm91dGVySFRNTCA9IGNvbnRlbnQ7XG4gICAgICBmcmFtZURvYy5vcGVuKCk7XG4gICAgICBmcmFtZURvYy53cml0ZShjb250ZW50KVxuICAgICAgZnJhbWVEb2MuY2xvc2UoKTtcblxuICAgICAgaWYodHlwZW9mIHRoaXMucHJvcHMuaW1hZ2VSZXdyaXRlcj09PSdmdW5jdGlvbicpe1xuICAgICAgICBjb25zdCBpbWdzID0gZnJhbWVEb2MucXVlcnlTZWxlY3RvckFsbChcIipbc3JjXVwiKTtcbiAgICAgICAgaW1ncy5mb3JFYWNoKGk9PntcbiAgICAgICAgICBpZihpLmdldEF0dHJpYnV0ZShcInNyY1wiKS5tYXRjaCgvXmh0dHAocyk/Oi8pKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaS5zcmMgPSB0aGlzLnByb3BzLmltYWdlUmV3cml0ZXIoaS5nZXRBdHRyaWJ1dGUoIFwic3JjXCIgKSk7XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICBjb25zdCBkSGVpZ2h0ID0gTWF0aC5tYXgoIC8vbmVlZCBtb3JlIHRlc3RzIGluIENocm9tZVxuICAgICAgICAvLyBmcmFtZURvYy5ib2R5LnNjcm9sbEhlaWdodCxcbiAgICAgICAgZnJhbWVEb2MuYm9keS5vZmZzZXRIZWlnaHQsXG4gICAgICAgIGZyYW1lRG9jLmRvY3VtZW50RWxlbWVudC5zY3JvbGxIZWlnaHQsXG4gICAgICAgIGZyYW1lRG9jLmRvY3VtZW50RWxlbWVudC5vZmZzZXRIZWlnaHQsXG4gICAgICApXG4gICAgICAgLy8gY29uc29sZS5sb2coXG5cbiAgICAgICAvLyAgIGZyYW1lRG9jLmJvZHkuc2Nyb2xsSGVpZ2h0LFxuICAgICAgIC8vICAgZnJhbWVEb2MuYm9keS5vZmZzZXRIZWlnaHQsXG4gICAgICAgLy8gICBmcmFtZURvYy5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsSGVpZ2h0LFxuICAgICAgIC8vICAgZnJhbWVEb2MuZG9jdW1lbnRFbGVtZW50Lm9mZnNldEhlaWdodCxcbiAgICAgICAvLyApXG4gICAgICB0aGlzLnByZXZpZXdGcmFtZS5jdXJyZW50LnN0eWxlLmhlaWdodCA9IGRIZWlnaHQrXCJweFwiO1xuICAgICAgdGhpcy5zeW5jUHJldmlld1Njcm9sbCgpO1xuICAgIH1cblxuICAgIGlmKCF0aGlzLnByZXZpZXdUaHJvdHRsZWQpe1xuICAgICAgcmVkcmF3KCk7XG4gICAgICB0aGlzLnByZXZpZXdUaHJvdHRsZWQgPSB0cnVlO1xuICAgICAgd2luZG93LnNldFRpbWVvdXQoKCk9PnsgdGhpcy5wcmV2aWV3VGhyb3R0bGVkPWZhbHNlOyByZWRyYXcoKX0gLCAzMDApO1xuXG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCl7XG4gICAgIC8vIGZpeCBjdXJzb3IgcG9zaXRpb24gb24gcmVuZGVyXG4gICAgIGlmKHRoaXMucG9zKVxuICAgICB7XG4gICAgICAgdGhpcy5qYXIucmVzdG9yZSh0aGlzLnBvcylcbiAgICAgfVxuXG4gICAgLy8gYnV0dG9uczpcbiAgICAvLyB0b2dnbGUgcHJldmlldyAsIHRvZ2dsZSBmdWxsc2NyZWVuICwgPHByZXZpZXcgb25seT8+ICwgc2F2ZVxuXG4gICAgcmV0dXJuIGh0bWxgPGRpdiBjbGFzcz1cIkJhcmVNREUgXG4gICAgICAgJHsgdGhpcy5zdGF0ZS5mdWxsc2NyZWVuID8gJ2Z1bGxzY3JlZW4nIDogJ3dpbmRvd2VkJyB9XG4gICAgICAgJHsgdGhpcy5zdGF0ZS5zaG93UHJldmlldyA/ICdwcmV2aWV3JyA6ICdub1ByZXZpZXcnIH1cbiAgICAgICAkeyB0aGlzLnN0YXRlLmZ1bGxQcmV2aWV3ID8gJ2Z1bGxQcmV2aWV3JyA6ICcnIH1cbiAgICAgICBcIlxuICAgICAgIHJlZj0ke3RoaXMuY29tcG9uZW50Q29udGFpbmVyfVxuICAgICAgIHN0eWxlPVwibWF4LWhlaWdodDokeyB0aGlzLnN0YXRlLmZ1bGxzY3JlZW4gPyAnMTAwJScgOiB0aGlzLnByb3BzLm1heEhlaWdodH07ei1pbmRleDokeyB0aGlzLnN0YXRlLmZ1bGxzY3JlZW4gPyB0aGlzLnByb3BzLmZ1bGxzY3JlZW5aSW5kZXggOiBcImluaXRpYWxcIiB9XCJcbiAgICA+XG4gICAgICA8ZGl2IGNsYXNzPVwidG9vbGJhciB0b3AgXG4gICAgICAgJHsgdGhpcy5zdGF0ZS5mdWxsc2NyZWVuID8gJ2Z1bGxzY3JlZW4nIDogJ3dpbmRvd2VkJyB9XG4gICAgICAgJHsgdGhpcy5zdGF0ZS5zaG93UHJldmlldyA/ICdwcmV2aWV3JyA6ICdub1ByZXZpZXcnIH1cbiAgICAgICAkeyB0aGlzLnByb3BzLm1vZGlmaWVkID8gJ21vZGlmaWVkJyA6ICcnIH1cbiAgICAgIFwiPlxuICAgICAgICAgPCR7TWVudX0gXG4gICAgICAgICB0aXRsZT0ke3RoaXMucHJvcHMubWVudVRpdGxlIHx8IFwiQWRkaXRpb25hbCBmdW5jdGlvbnNcIn1cbiAgICAgICAgIHpJbmRleD0ke3RoaXMuc3RhdGUuZnVsbHNjcmVlbiA/IHRoaXMucHJvcHMuZnVsbHNjcmVlblpJbmRleCsxMDAgOiBcImluaXRpYWxcIn1cbiAgICAgICAgIGl0ZW1zPSR7dGhpcy5wcm9wcy5tZW51SXRlbXN9Lz5cblxuICAgICAgICAgPCR7VEJ1dHRvbn1cbiAgICAgICAgIGlzT249JHt0cnVlfVxuICAgICAgICAgY3VzdG9tQ2xhc3M9XCJmb3JtYXR0aW5nXCJcbiAgICAgICAgIHN2Zz0ke0ljb25Cb2xkfVxuICAgICAgICAgb25DbGljaz0keygpPT50aGlzLmZpcmVDb21tYW5kKFwiYm9sZFwiKX1cbiAgICAgICAgIC8+XG5cbiAgICAgICAgIDwke1RCdXR0b259XG4gICAgICAgICBjdXN0b21DbGFzcz1cImZvcm1hdHRpbmdcIlxuICAgICAgICAgaXNPbj0ke3RydWV9XG4gICAgICAgICBzdmc9JHtJY29uSXRhbGljfVxuICAgICAgICAgb25DbGljaz0keygpPT50aGlzLmZpcmVDb21tYW5kKFwiaXRhbGljXCIpfVxuICAgICAgICAgLz5cblxuICAgICAgICAgPCR7VEJ1dHRvbn1cbiAgICAgICAgIGN1c3RvbUNsYXNzPVwiZm9ybWF0dGluZ1wiXG4gICAgICAgICBpc09uPSR7dHJ1ZX1cbiAgICAgICAgIHN2Zz0ke0ljb25TdHJpa2V9XG4gICAgICAgICBvbkNsaWNrPSR7KCk9PnRoaXMuZmlyZUNvbW1hbmQoXCJzdHJpa2VcIil9XG4gICAgICAgICAvPlxuXG4gICAgICAgICA8JHtUQnV0dG9ufVxuICAgICAgICAgY3VzdG9tQ2xhc3M9XCJmb3JtYXR0aW5nXCJcbiAgICAgICAgIGlzT249JHt0cnVlfVxuICAgICAgICAgc3ZnPSR7SWNvbkxpbmt9XG4gICAgICAgICBvbkNsaWNrPSR7KCk9PnRoaXMuZmlyZUNvbW1hbmQoXCJsaW5rXCIpfVxuICAgICAgICAgLz5cblxuICAgICAgICAgPGRpdiBjbGFzcz1cImRpdmlkZXJcIiAvPlxuXG5cbiAgICAgICAgIDwke1RCdXR0b259IFxuICAgICAgICAgaXNPbj0ke3RoaXMuc3RhdGUuc2hvd1ByZXZpZXd9XG4gICAgICAgICBzdmc9JHtJY29uU2hvd1ByZXZpZXd9XG4gICAgICAgICB0aXRsZT1cIlRvZ2dsZSBQcmV2aWV3XCIgXG4gICAgICAgICBvbkNsaWNrPSR7dGhpcy50b2dnbGVQcmV2aWV3fSBcbiAgICAgICAgIC8+XG5cblxuICAgICAgICAgPCR7VEJ1dHRvbn1cbiAgICAgICAgIGlzT249JHt0aGlzLnN0YXRlLmZ1bGxQcmV2aWV3fVxuICAgICAgICAgc3ZnPSR7SWNvbkZQcmV2aWV3fVxuICAgICAgICAgc3ZnT2ZmPSR7SWNvbkZQcmV2aWV3T2ZmfVxuICAgICAgICAgdGl0bGU9JHt0aGlzLnByb3BzLmV4dGVybmFsUHJldmlld1RpdGxlIHx8IFwiRnVsbCB3aWR0aCBwcmV2aWV3XCJ9IFxuICAgICAgICAgb25DbGljaz0ke3RoaXMudG9nZ2xlRnVsbFByZXZpZXd9XG4gICAgICAgICAvPlxuXG4gICAgICAgIDwke1RCdXR0b259XG4gICAgICAgIGlzT249JHsgdGhpcy5zdGF0ZS5mdWxsc2NyZWVuIH1cbiAgICAgICAgc3ZnPSR7SWNvbkZTY3JlZW59XG4gICAgICAgIHN2Z09mZj0ke0ljb25GU2NyZWVuT2ZmfVxuICAgICAgICB0aXRsZT0ke3RoaXMuc3RhdGUuZnVsbHNjcmVlbiA/IFwiRXhpdCBmdWxsc2NyZWVuXCIgOiBcIkdvIGZ1bGxzY3JlZW5cIn1cbiAgICAgICAgb25DbGljaz0ke3RoaXMudG9nZ2xlRnVsbHNjcmVlbn1cbiAgICAgICAgLz5cblxuICAgICAgICA8JHtUQnV0dG9ufVxuICAgICAgICBpc09uPSR7IHRoaXMuc3RhdGUuc3BlbGxDaGVjayB9XG4gICAgICAgIHN2Zz0ke0ljb25TcGVsbH1cbiAgICAgICAgc3ZnT2ZmPSR7SWNvblNwZWxsT2ZmfVxuICAgICAgICB0aXRsZT0ke3RoaXMuc3RhdGUuc3BlbGxDaGVjayA/IFwiVHVybiBzcGVsbGNoZWsgb2ZmXCIgOiBcIlR1cm4gc3BlbGxjaGVjayBvblwifVxuICAgICAgICBvbkNsaWNrPSR7dGhpcy50b2dnbGVTcGVsbGNoZWNrfVxuICAgICAgICAvPlxuXG4gICAgICAgIDwke1RCdXR0b259XG4gICAgICAgIGlzT249JHsgdGhpcy5zdGF0ZS5zeW5jU2Nyb2xsIH1cbiAgICAgICAgc3ZnPSR7SWNvblNTY3JvbGx9XG4gICAgICAgIHN2Z09mZj0ke0ljb25TU2Nyb2xsT2ZmfVxuICAgICAgICB0aXRsZT0ke3RoaXMuc3RhdGUuc3luY1Njcm9sbCA/IFwiVHVybiBzY3JvbGwgc3luYyBvZmZcIiA6IFwiVHVybiBzY3JvbGwgc3luYyBvblwifVxuICAgICAgICBvbkNsaWNrPSR7dGhpcy50b2dnbGVTeW5jU2Nyb2xsfVxuICAgICAgICAvPlxuXG4gICAgICAgIDwke1RCdXR0b259XG4gICAgICAgIHN2Zz0ke0ljb25TYXZlfVxuICAgICAgICB0aXRsZT0keyBcIlNhdmUgaHRtbCBmaWxlXCIgfVxuICAgICAgICBvbkNsaWNrPSR7dGhpcy5zYXZlRmlsZX1cbiAgICAgICAgY3VzdG9tQ2xhc3M9JHsgdGhpcy5wcm9wcy5tb2RpZmllZCA/IFwiYWxlcnRlZFwiIDogXCJcIiB9XG4gICAgICAgIC8+XG5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgIDxkaXYgY2xhc3M9XCJ3b3JrQXJlYVwiPlxuICAgICAgICAgPGRpdiAgXG4gICAgICAgICAgICAgIGNsYXNzPVwiY29kZUphciBsYW5ndWFnZS1tZFwiIFxuICAgICAgICAgICAgICByZWY9JHt0aGlzLmNvZGVKYXJDb250YWluZXJ9IFxuICAgICAgICAgICAgICBvbnNjcm9sbD0keygpPT50aGlzLnN5bmNQcmV2aWV3U2Nyb2xsKCl9PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBcbiAgICAgICAgICAgICAgY2xhc3M9XCJwcmV2aWV3ICR7dGhpcy5wcm9wcy5wcmV2aWV3Q2xhc3N9XCIgXG4gICAgICAgICAgICAgIHJlZj0ke3RoaXMucHJldmlld0NvbnRhaW5lcn0+PGlmcmFtZSBzdHlsZT1cIm1pbi1oZWlnaHQ6MTAwJVwiIHJlZj0ke3RoaXMucHJldmlld0ZyYW1lfT48L2lmcmFtZT5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5gXG4gIH1cbn1cblxuXG5CYXJlTURFLmRlZmF1bHRQcm9wcyA9IHtcbiAgIHJlbmRlcjogKG0pPT5gPGh0bWw+PGhlYWQ+PC9oZWFkPjxib2R5PjxkaXYgc3R5bGU9J2NvbG9yOm5hdnlibHVlJz4ke219PC9kaXY+PC9ib2R5PjwvaHRtbD5gLFxuICAgb25VcGRhdGU6ICgpPT5jb25zb2xlLmxvZyhcIkVkaXRvciB1cGRhdGVkXCIgKSxcbiAgIHNhdmU6IChjKT0+Y29uc29sZS5sb2coXCJEdW1teSBzYXZlIGZ1bmN0aW9uXCIgLCBjLnN1YnN0cmluZygwLDIwMCkrXCIuLi5cIiksXG4gICBjb250ZW50OiBcIndyaXRlIGhlcmVcIiwgLy90ZXh0IHRvIGRpc3BsYXkgb24gbW91bnRcbiAgIGNvbnRlbnRJZDogbnVsbCwgLy9pZCBvZiBjb250ZW50IHRvIHRyYWNrIHRoZSBjaGFuZ2VzXG4gICBtb2RpZmllZDogZmFsc2UsXG4gICBpbmRpY2F0ZUNoYW5nZXM6IHRydWUsXG4gICBwcmV2aWV3Q2xhc3M6IFwibWFya2Rvd25QcmV2aWV3QXJlYVwiLFxuICAgZnVsbHNjcmVlbjogZmFsc2UsXG4gICBvbkVudGVyRnVsbHNjcmVlbjogKCk9PmRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3c9XCJoaWRkZW5cIixcbiAgIG9uRXhpdEZ1bGxzY3JlZW46ICgpPT5kb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93PVwiaW5pdGlhbFwiLFxuICAgdHJ1ZUZ1bGxzY3JlZW46IGZhbHNlLFxuICAgc2hvd1ByZXZpZXc6IHRydWUsXG4gICBzcGVsbENoZWNrOiB0cnVlLFxuICAgZnVsbHNjcmVlblpJbmRleDogMTAwMSxcbiAgIGV4dGVybmFsUHJldmlldzogbnVsbCxcbiAgIGV4dGVybmFsUHJldmlld1RpdGxlOiBudWxsLFxuICAgaW1hZ2VSZXdyaXRlcjogbnVsbCxcbiAgIG1heEhlaWdodDogJzQwMHB4JyxcbiAgIGRpc2FibGU6IFtdXG5cbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==