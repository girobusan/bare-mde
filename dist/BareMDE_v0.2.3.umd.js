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

class If extends preact__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor(props) {
    super(props);
  }
  render() {
    // console.log("IF" , this.props.condition)
    if (this.props.condition) {
      return this.props.children;
    } else {
      return "";
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
/* harmony import */ var _icons_menu_FILL0_wght400_GRAD0_opsz24_svg_raw__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./icons/menu_FILL0_wght400_GRAD0_opsz24.svg?raw */ "./src/components/BareMDE/icons/menu_FILL0_wght400_GRAD0_opsz24.svg?raw");




class Menu extends preact__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.handleItem = this.handleItem.bind(this);
    this.doClose = this.doClose.bind(this);
  }
  handleItem(i) {
    this.props.items[i].handler();
    // this.setState({"open" : false});
  }
  doClose() {
    this.setState({
      "open": false
    });
  }
  componentDidUpdate(previousProps, previousState) {
    if (this.state.open === true && previousState.open === false) {
      window.addEventListener("click", this.doClose);
    }
    if (this.state.open === false && previousState.open === true) {
      window.removeEventListener("click", this.doClose);
    }
    return true;
  }
  render() {
    if (!this.props.items || this.props.items.length == 0) {
      return "";
    }
    const my = this;
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      "class": "EditorMenu"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("button", {
      dangerouslySetInnerHTML: {
        __html: _icons_menu_FILL0_wght400_GRAD0_opsz24_svg_raw__WEBPACK_IMPORTED_MODULE_3__
      },
      title: this.props.title || "Menu",
      onClick: e => {
        e.stopPropagation();
        e.preventDefault();
        this.setState({
          open: !this.state.open
        });
      }
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_If__WEBPACK_IMPORTED_MODULE_2__.If, {
      condition: this.state.open
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      "class": "menuItems",
      style: "z-index:" + this.props.zIndex
    }, this.props.items.map((e, i) => (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      "class": "Item",
      onMouseDown: () => my.handleItem(i),
      dangerouslySetInnerHTML: {
        __html: e.label
      }
    })))));
  }
}
Menu.defaultProps = {
  zIndex: 1100
};

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
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "preact");
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(preact__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var htm_preact__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! htm/preact */ "./node_modules/htm/preact/index.module.js");


function TButton({
  svg,
  svgOff,
  isOn,
  title,
  onClick,
  customClass
}) {
  svgOff = svgOff || svg;
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("button", {
    "class": "TButton \n   " + (isOn ? 'on' : 'off') + "\n   " + (customClass || '') + "\n   ",
    style: {
      width: "32px",
      height: "32px",
      display: "inline-block",
      boxSizing: "border-box",
      padding: "3px",
      userSelect: "none",
      borderWidth: "1px"
    },
    dangerouslySetInnerHTML: {
      __html: isOn ? svg : svgOff
    },
    title: title || '',
    onClick: typeof onClick === 'function' ? onClick : () => console.log('button clicked')
  });
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

var _self = typeof window !== 'undefined' ? window // if in browser
: typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope ? self // if in worker
: {} // if in node js
;

/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */
var Prism = function (_self) {
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
    manual: true,
    //_self.Prism && _self.Prism.manual,
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
          Object.defineProperty(obj, '__id', {
            value: ++uniqueId
          });
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
        var clone;
        var id;
        switch (_.util.type(o)) {
          case 'Object':
            id = _.util.objId(o);
            if (visited[id]) {
              return visited[id];
            }
            clone = /** @type {Record<string, any>} */{};
            visited[id] = clone;
            for (var key in o) {
              if (o.hasOwnProperty(key)) {
                clone[key] = deepClone(o[key], visited);
              }
            }
            return /** @type {any} */clone;
          case 'Array':
            id = _.util.objId(o);
            if (visited[id]) {
              return visited[id];
            }
            clone = [];
            visited[id] = clone;
            ( /** @type {Array} */ /** @type {any} */o).forEach(function (v, i) {
              clone[i] = deepClone(v, visited);
            });
            return /** @type {any} */clone;
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
          return /** @type {any} */document.currentScript;
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
        root = root || ( /** @type {any} */_.languages);
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
      for (var i = 0, element; element = env.elements[i++];) {
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
        for (var i = 0, callback; callback = callbacks[i++];) {
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
        for (
        // iterate the token list and keep track of the current token/string position
        var currentNode = startNode.next, pos = startPos; currentNode !== tokenList.tail; pos += currentNode.value.length, currentNode = currentNode.next) {
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
            for (var k = currentNode; k !== tokenList.tail && (p < to || typeof k.value === 'string'); k = k.next) {
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
    var head = {
      value: null,
      prev: null,
      next: null
    };
    /** @type {LinkedListNode<T>} */
    var tail = {
      value: null,
      prev: head,
      next: null
    };
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
    var newNode = {
      value: value,
      prev: node,
      next: next
    };
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
}(_self);
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
          'punctuation': [{
            pattern: /^=/,
            alias: 'attr-equals'
          }, {
            pattern: /^(\s*)["']|["']$/,
            lookbehind: true
          }]
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
  'entity': [{
    pattern: /&[\da-z]{1,8};/i,
    alias: 'named-entity'
  }, /&#x?[\da-f]{1,8};/i]
};
Prism.languages.markup['tag'].inside['attr-value'].inside['entity'] = Prism.languages.markup['entity'];
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
      pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function () {
        return tagName;
      }), 'i'),
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
      pattern: RegExp(/(^|["'\s])/.source + '(?:' + attrName + ')' + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source, 'i'),
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
            'punctuation': [{
              pattern: /^=/,
              alias: 'attr-equals'
            }, /"|'/]
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
    pattern = pattern.replace(/<inner>/g, function () {
      return inner;
    });
    return RegExp(/((?:^|[^\\])(?:\\{2})*)/.source + '(?:' + pattern + ')');
  }
  var tableCell = /(?:\\.|``(?:[^`\r\n]|`(?!`))+``|`[^`\r\n]+`|[^\\|\r\n`])+/.source;
  var tableRow = /\|?__(?:\|__)+\|?(?:(?:\n|\r\n?)|(?![\s\S]))/.source.replace(/__/g, function () {
    return tableCell;
  });
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
    'code': [{
      // Prefixed by 4 spaces or 1 tab and preceded by an empty line
      pattern: /((?:^|\n)[ \t]*\n|(?:^|\r\n?)[ \t]*\r\n?)(?: {4}|\t).+(?:(?:\n|\r\n?)(?: {4}|\t).+)*/,
      lookbehind: true,
      alias: 'keyword'
    }, {
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
    }],
    'title': [{
      // title 1
      // =======

      // title 2
      // -------
      pattern: /\S.*(?:\n|\r\n?)(?:==+|--+)(?=[ \t]*$)/m,
      alias: 'important',
      inside: {
        punctuation: /==+$|--+$/
      }
    }, {
      // # title 1
      // ###### title 6
      pattern: /(^\s*)#.+/m,
      lookbehind: true,
      alias: 'important',
      inside: {
        punctuation: /^#+|#+$/
      }
    }],
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
        if (codeLang && codeBlock && codeLang.type === 'code-language' && codeBlock.type === 'code-block' && typeof codeLang.content === 'string') {
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
    'quot': '"'
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
})(Prism);

/***/ }),

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
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.BareMDE {
  font-family: sans-serif;
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
  box-sizing: border-box;
  border-radius: 0;
  background-color: #444;
  color: white;
  padding: 6px 48px 0px 48px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  flex-grow: 0;
}
.BareMDE .toolbar .divider {
  width: 2px;
  flex-grow: 0;
  margin: 0;
  padding: 0;
  margin-right: 8px;
  margin-left: 2px;
  margin-bottom: 6px;
  background-image: linear-gradient(0deg, gray, gray 2px, transparent 2px, transparent 5px);
  background-size: 2px 5px;
  background-repeat: repeat;
}
.BareMDE .toolbar .bmde_branding {
  position: absolute;
  right: 12px;
  font-size: 14px;
  margin: 0;
  padding: 0;
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
  padding-top: 3px;
}
.BareMDE .toolbar .EditorMenu button svg {
  display: block;
  pointer-events: none;
  user-select: none;
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
.BareMDE .toolbar .TButton.alerted {
  background-color: orangered;
  border: none;
}
.BareMDE .toolbar .TButton.alerted:hover {
  border-color: orangered;
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
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 24px 24px;
  margin: 0 6px 6px 0;
}
.BareMDE .toolbar button svg {
  display: block;
  pointer-events: none;
  margin: 0;
  padding: 0;
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
  padding: 18px 24px;
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
  display: none;
  position: relative;
}
.BareMDE .workArea .preview iframe {
  all: unset;
  width: 100%;
  display: block;
  border: none;
  margin: 0;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.BareMDE.showPreview .preview {
  display: block;
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
}`, "",{"version":3,"sources":["webpack://./src/components/BareMDE/mded.scss"],"names":[],"mappings":"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","sourcesContent":[".BareMDE{\n  font-family: sans-serif;\n  // all: initial;\n  display: flex;\n  justify-items: stretch;\n  box-sizing: border-box;\n  flex-direction: column;\n  box-sizing: border-box;\n  border: none; //1px solid #666;\n  border-radius: 0px;\n  margin:0;\n  max-height: 100%;\n  max-width: 100%;\n  // overflow: hidden;\n  // max-height: 100%;\n  // position: absolute;\n  padding: 0;\n  // background-color: #ccc;\n  &.fullscreen{\n    position: fixed;\n    max-width: 100%;\n    max-height: 100%;\n    top: 0;\n    left: 0;\n    right:0;\n    bottom:0;\n    border-radius: 0;\n    border: none;\n    z-index: 1000;\n  }\n  *{\n    box-sizing: border-box;\n  }\n  .toolbar{\n    all: unset;\n    position: relative;\n    margin: 0;\n    // height: 44px;\n    box-sizing: border-box;\n    // margin: -1px -1px 0 -1px;\n    border-radius: 0;\n    background-color: #444  ;\n    color: white;\n    padding: 6px 48px 0px 48px;\n\n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n    flex-wrap: wrap;\n    flex-grow: 0;\n\n    .divider{\n      width: 2px;\n      flex-grow: 0;\n      margin: 0;\n      padding:0;\n      margin-right: 8px;\n      margin-left: 2px;\n      margin-bottom: 6px;\n      background-image: linear-gradient( \n      0deg ,\n      gray, gray 2px, \n      transparent 2px, \n      transparent 5px );\n      background-size: 2px 5px;\n      background-repeat: repeat;\n    }\n    .bmde_branding{\n      position: absolute;\n      right: 12px;\n      font-size: 14px;\n      margin:0;\n      padding:0;\n    }\n    .EditorMenu{\n      position: absolute;\n      left: 6px;\n      width: 32px;\n      height: 32px;\n      text-align: left;\n      margin: 0;\n      button{\n        display:block;\n        border: none;\n        width: 32px;\n        height: 32px;\n        padding-top: 3px;\n        svg{\n          display: block;\n          pointer-events: none;\n          user-select: none;\n        }\n      }\n      .menuItems{\n        min-width: 250px;\n        position: absolute;\n        background-color: #bdbdbd;\n        padding: 0;\n        margin:0;\n        line-height: 100%;\n        border-radius: 4px;\n        overflow: hidden;\n        box-shadow: 0px 0px 24px rgba( 0 , 0 , 0 , 0.8 );\n        .Item{\n          font-family: sans-serif;\n          padding: 6px 12px;\n          margin:0;\n          line-height: 100%;\n          user-select: none;\n          cursor: pointer;\n          border-bottom: 1px solid #aaa;\n          color: #333;\n          &:first-child{\n            padding-top: 8px; \n          }\n          &:last-child{\n            border-bottom: none;\n            padding-bottom: 8px;\n          }\n          &:hover{\n            background-color: gray;\n            color: white;\n          }\n        }\n      }\n\n\n    }\n    .TButton.alerted{\n      background-color: orangered;\n      border: none;\n      &:hover{\n        border-color: orangered;\n      }\n    }\n\n\n    button{\n      all:unset;\n      box-sizing: border-box;\n      // display: block;\n      transition: background-color .5s;\n      appearance: none;\n      border: 1px solid transparent;\n      border-radius: 6px;\n      width: 32px;\n      height: 32px;\n      display: inline-block;\n      cursor: pointer;\n      // margin-right: 6px;\n      background-repeat: no-repeat;\n      background-position: center center;\n      background-size: 24px 24px;\n      margin: 0 6px 6px 0;\n      svg{\n        display: block;\n        pointer-events: none;\n        margin: 0;\n        padding: 0;\n      }\n      &.formatting{\n        background-color: black;\n        border-color: black;\n        svg{\n          opacity: 0.9;\n        }\n      }\n      &:hover{\n        border-color: rgba(255,255,255,0.6);\n      }\n      &.on{\n        border-color: rgba(255,255,255,0.3);\n      }\n      &:last-child{\n        margin-right: 0;\n      }\n    }\n  }\n  .workArea{\n    all: unset;\n    box-sizing: border-box;\n    width:100%;\n    flex-grow: 1;\n    flex-shrink: 1;\n    display: flex;\n    // justify-content: stretch;\n    align-content: stretch;\n    flex-direction: row;\n    background-color: #cccccc; //in memory of beloved NN\n    min-height: 200px;\n    margin: 0;\n    padding:0;\n    // max-height: 100%;\n    .codeJar , .preview {\n      // all: unset;\n      display:block;\n      flex-grow: 1;\n      flex-shrink:1;\n      box-sizing: border-box;\n      max-width: 100%;\n      margin: 0;\n      scrollbar-width: thin;\n      scrollbar-color: #444 #dddddd;\n      &::-webkit-scrollbar{\n        width: 4px;\n      }\n      &::-webkit-scrollbar-track{\n        background: #dddddd;\n      }\n      &::-webkit-scrollbar-thumb {\n        background-color: #444;\n        border-radius: 4px;\n        -webkit-border-radius: 4px;\n        overflow: hidden;\n      }\n    }\n\n    .codeJar{\n      border-bottom-left-radius: 0;\n      font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', ui-monospace , monospace;\n\n      // ::spelling-error{\n      //   background-color: yellow;\n      // }\n      font-size: 18px;\n      line-height: 150%;\n      color: #333;\n      flex-grow: 1;\n      padding: 18px 24px;\n      background-color: #e4e3e2;\n      overflow: auto;\n      flex-basis:0;\n\n    }\n    .preview{\n      border-radius: 0;\n      flex-grow: 1;\n      padding: 0;\n      margin:0;\n      width: 50%;\n      border-left: 1px solid #ddd;\n      overflow: auto;\n      flex-basis: 0;\n      display: none;\n      position: relative;\n\n\n      iframe{\n        all:unset;\n        width:100%;\n        display: block;\n        border: none;\n        margin:0;\n        box-sizing: border-box;\n        position: absolute;\n        top: 0 ;\n        bottom: 0 ;\n        left: 0 ;\n        right: 0 ;\n      }\n    }\n  }\n  &.showPreview{\n    .preview{\n      display: block;\n    }\n  }\n  &.fullPreview{\n    .codeJar{\n      display: none;\n    }\n    .workArea .preview{\n      display: block !important;\n      width: 100%;\n      max-width: 100%;\n      iframe{\n        width: 100%;\n      }\n    }\n  }\n}\n\n//some additions\n\n.codeJar{\n  .token{\n    &.hr{\n      letter-spacing: .5em; \n    }\n    &.important{\n      font-weight: bold;\n      color: darkred;\n    }\n    &.title{\n      line-height: 1em;\n      font-size: 1.2em;\n    }\n    &.strike{\n      .content{\n        text-decoration: line-through;\n      }\n    }\n    &.code-language{\n      opacity: 0.5;\n    }\n    &.code-block{\n      color: #1990b8;\n    }\n  }\n}\n"],"sourceRoot":""}]);
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

/***/ "./src/components/BareMDE/icons/menu_FILL0_wght400_GRAD0_opsz24.svg?raw":
/*!******************************************************************************!*\
  !*** ./src/components/BareMDE/icons/menu_FILL0_wght400_GRAD0_opsz24.svg?raw ***!
  \******************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"24\" viewBox=\"0 -960 960 960\" width=\"24\"><path d=\"M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z\" fill=\"white\"/></svg>\n";

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
__webpack_require__(/*! ./mded.scss */ "./src/components/BareMDE/mded.scss");
const Prism = __webpack_require__(/*! ./prism/prism.js */ "./src/components/BareMDE/prism/prism.js");


const iframeScrollbars = `<style>
body , html{
scrollbar-width: thin;
scrollbar-color: #444 #dddddd;
}

html::-webkit-scrollbar{
width: 6px;
}
html::-webkit-scrollbar-track{
background: #dddddd;
}
html::-webkit-scrollbar-thumb {
background-color: #444;
border-radius: 3px;
-webkit-border-radius: 3px;
overflow: hidden;
}

</style>`;
//
//   ICONS
//

//full preview


//fullscreen


//spellcheck


//sync scroll


//save

//formatting




const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
const modSymbol = isMac ? "⌘" : "Ctrl";
class BareMDE extends preact__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor(props) {
    super(props);
    this.previewThrottled = false;
    this.previewInProcess = false;
    this.scrollThrottled = false;
    this.saveThrottled = false;
    this.componentContainer = (0,preact__WEBPACK_IMPORTED_MODULE_0__.createRef)();
    this.codeJarContainer = (0,preact__WEBPACK_IMPORTED_MODULE_0__.createRef)();
    this.previewContainer = (0,preact__WEBPACK_IMPORTED_MODULE_0__.createRef)();
    this.previewFrame = (0,preact__WEBPACK_IMPORTED_MODULE_0__.createRef)();
    this.state = {
      fullscreen: props.fullscreen,
      showPreview: props.showPreview,
      fullPreview: false,
      content: props.content,
      spellCheck: props.spellCheck,
      syncScroll: true,
      modified: props.modified
    };
    this.currentContent = this.props.content;
    this.contentId = this.props.contentId;
    this.surroundSelection = this.surroundSelection.bind(this);
    this.handleKey = this.handleKey.bind(this);
    this.togglePreview = this.togglePreview.bind(this);
    this.toggleFullPreview = this.toggleFullPreview.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
    this.toggleSpellcheck = this.toggleSpellcheck.bind(this);
    this.toggleSyncScroll = this.toggleSyncScroll.bind(this);
    this.doPreview = this.doPreview.bind(this);
    this.refreshPreview = this.refreshPreview.bind(this);

    //
    this.saveFile = this.saveFile.bind(this);
    this.onCodeUpdate = this.onCodeUpdate.bind(this);
    this.editorCommands = {
      "bold": () => {
        this.surroundSelection("**", "**");
      },
      "italic": () => {
        this.surroundSelection("_", "_");
      },
      "strike": () => {
        this.surroundSelection("~~", "~~");
      },
      "link": () => {
        let url = prompt("Enter URL:", "https://");
        this.surroundSelection("[", "](" + (url || "") + ")");
      }
    };
    if (props.controls) {
      props.controls.doPreview = this.doPreview;
      props.controls.syncScroll = () => this.state.syncScroll && this.syncPreviewScroll();
      props.controls.refreshPreview = this.refreshPreview;
    }
    if (props.imageRewriter) {
      console.info("Image rewriter function is removed, please, do the rewritting in upper level component");
    }
  }
  shouldComponentUpdate() {
    this.pos = this.jar.save();
  }
  componentDidUpdate(oldS, oldP) {
    // console.log("BMDE updated" , oldP.content , this.props.content)
    // console.log("Bare MDE updated" , this.jar.save())
    // if component updated,
    // but text is not,
    // it means, we have to return cursor
    // to last known position
    if (this.currentContent !== this.props.content || this.props.contentId !== this.contentId) {
      this.jar.updateCode(this.props.content); //???
      this.currentContent = this.props.content;
      this.contentId = this.props.contentId;
    } else {
      // this.pos = this.jar.save() ; // #FIXME
      this.pos && this.jar.restore(this.pos); //:??? OR in render()
    }
    this.doPreview();
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.doPreview);
  }
  onCodeUpdate() {
    this.pos = this.jar.save();
    typeof this.props.onUpdate === 'function' && this.props.onUpdate(this.jar.toString());
    this.doPreview();
  }
  componentDidMount() {
    this.jar = (0,codejar__WEBPACK_IMPORTED_MODULE_2__.CodeJar)(this.codeJarContainer.current, e => Prism.highlightElement(e, false, null), {
      preserveIdent: true,
      spellcheck: this.state.spellCheck
    });
    this.jar.updateCode(this.props.content);
    this.doPreview();
    this.jar.onUpdate(this.onCodeUpdate);
    //Chrome bug(?) fix (?):
    this.codeJarContainer.current.focus();
    window.addEventListener("resize", this.doPreview);
    this.codeJarContainer.current.addEventListener("keydown", this.handleKey);
    // console.log(this.jar);
  }
  fireCommand(command) {
    this.editorCommands[command]();
  }
  handleKey(evt) {
    const testWhat = isMac ? evt.metaKey : evt.ctrlKey;
    if (!testWhat) {
      return;
    }
    if (['KeyB', 'KeyI', 'KeyL', 'KeyD'].indexOf(evt.code) != -1) {
      evt.preventDefault();
      evt.stopPropagation();
    }
    // console.log(evt.code);
    if (evt.code === 'KeyB') {
      this.fireCommand("bold");
    }
    if (evt.code === 'KeyI') {
      this.fireCommand("italic");
    }
    if (evt.code === 'KeyL') {
      this.fireCommand("link");
    }
    if (evt.code === 'KeyD') {
      this.fireCommand("strike");
    }
  }
  insertAt(txt, pos, what) {
    // const prefix = txt.startsWith("\n") ? "\n" : "";
    return txt.substring(0, pos) + what + txt.substring(pos);
  }
  surroundSelection(before, after) {
    const s = window.getSelection();
    if (s.isCollapsed) {
      console.error("collapsed selection");
      return;
    }
    const r = s.getRangeAt(0);
    if (!r) {
      return;
    }
    //check if selection is inside our editor
    if (this.codeJarContainer.current.contains(r.commonAncestorContainer) || this.codeJarContainer.current === r.commonAncestorContainer) {
      // console.log(s , r);
      const p = this.jar.save();
      if (p.dir === '->') {
        p.end += after.length + before.length;
      } else {
        p.start += after.length + before.length;
      }
      const start = r.startContainer;
      const startOf = r.startOffset;
      const end = r.endContainer;
      const endOf = r.endOffset;
      // this must go first!
      end.textContent = this.insertAt(end.textContent, endOf, after);
      start.textContent = this.insertAt(start.textContent, startOf, before);
      //update editor
      this.codeJarContainer.current.focus();
      this.jar.updateCode(this.jar.toString());
      this.jar.restore(p);
      this.doPreview(true);
      this.onCodeUpdate();
      return;
    } else {
      console.error("wrong selection");
    }
  }
  async syncPreviewScroll(force) {
    if (!this.state.syncScroll && !force) {
      return;
    }
    if (!this.state.showPreview) {
      return;
    }
    if (this.scrollThrottled) {
      return;
    }
    this.scrollThrottled = true;
    const doScroll = () => {
      //preview height
      const previewFullH = this.previewFrame.current.contentWindow.document.documentElement.scrollHeight;
      // console.log("SH" , previewFullH )
      //editor height
      const editorFullH = this.codeJarContainer.current.scrollHeight;
      const editorScrolled = this.codeJarContainer.current.scrollTop;
      const elementHeight = this.previewContainer.current.getBoundingClientRect().height;
      //if one of them can not scroll, do nothing
      if (previewFullH <= elementHeight || editorFullH <= elementHeight) {
        return;
      }
      const editorRatio = editorScrolled / (editorFullH - elementHeight);
      const scrollPreviewTo = Math.round((previewFullH - elementHeight) * editorRatio);
      // console.log("scrolling to" , scrollPreviewTo )
      this.previewFrame.current.contentWindow.document.documentElement.scrollTo({
        top: scrollPreviewTo,
        left: 0,
        behavior: "smooth"
      });
    };
    doScroll();
    window.setTimeout(() => {
      this.scrollThrottled = false;
      doScroll();
    }, 50);
  }
  toggleSpellcheck() {
    this.jar.updateOptions({
      spellcheck: !this.state.spellCheck
    });
    this.codeJarContainer.current.spellcheck = !this.state.spellCheck;
    this.setState({
      spellCheck: !this.state.spellCheck
    });
  }
  toggleFullscreen() {
    // console.log("Toggle fullscreen");
    const syncFF = () => {
      // console.log("we change fs mode!!1")
      if (!document.fullscreenElement && this.state.fullscreen) {
        this.setState({
          fullscreen: false
        });
      }
    };
    const v = !this.state.fullscreen;
    if (v) {
      typeof this.props.onEnterFullscreen === 'function' && this.props.onEnterFullscreen();
      this.componentContainer.current.style.zIndex = this.props.fullscreenZIndex;
      if (this.props.trueFullscreen && document.fullscreenEnabled) {
        this.componentContainer.current.requestFullscreen();
        this.componentContainer.current.addEventListener("fullscreenchange", syncFF);
      }
    } else {
      typeof this.props.onExitFullscreen === 'function' && this.props.onExitFullscreen();
      this.componentContainer.current.style.zIndex = "unset";
      if (this.props.trueFullscreen && document.fullscreenEnabled) {
        document.exitFullscreen();
      }
      this.componentContainer.current.removeEventListener("fullscreenchange", syncFF);
    }
    try {
      this.setState({
        fullscreen: v
      });
    } catch (e) {
      console.error("Error found!", e);
    }
    // this.doPreview();
  }
  togglePreview() {
    const v = !this.state.showPreview;
    const ns = {
      showPreview: v
    };
    if (this.state.fullPreview) {
      this.setState({
        fullPreview: false
      });
      return;
    }
    this.setState(ns);
  }
  toggleFullPreview() {
    if (typeof this.props.externalPreview == 'function') {
      return this.props.externalPreview();
    }
    const v = !this.state.fullPreview;
    this.setState({
      fullPreview: v
    });
  }
  toggleSyncScroll() {
    const v = !this.state.syncScroll;
    const ns = {
      syncScroll: v
    };
    this.setState(ns);
  }
  saveFile() {
    if (this.saveThrottled) {
      return;
    }
    if (typeof this.props.save === 'function') {
      this.props.save(this.jar.toString());
      this.saveThrottled = true;
      window.setTimeout(() => {
        this.saveThrottled = false;
      }, 200);
    }
    ;
  }

  // packPreviewFrame(){
  //       const frameDoc = this.previewFrame.current.contentWindow.document;
  //         const dHeight = Math.max( //need more tests in Chrome
  //           frameDoc.body.scrollHeight, //#BUGGY
  //           frameDoc.documentElement.scrollHeight,
  //           frameDoc.documentElement.offsetHeight,
  //         )
  //         // this.previewFrame.current.style.height = dHeight+"px";
  // }

  refreshPreview() {
    this.previewFrame.current.contentWindow.document.body.innerHTML = "";
    this.doPreview(true);
  }
  async doPreview(force) {
    //if preview is hidden and we do not forced to update it, return
    if (!this.state.showPreview && !force) {
      return;
    }
    if (this.state.previewInProcess) {
      return;
    } //force has no sense
    if (!this.previewFrame.current) {
      console.log("no iframe");
    }
    const redraw = () => {
      this.previewInProcess = true;
      if (!this.previewFrame.current.contentWindow) {
        return;
      }
      let content;
      let contentWindow = this.previewFrame.current.contentWindow;
      if (contentWindow.document.body && contentWindow.document.body.innerHTML && typeof this.props.renderBody === 'function') {
        content = this.props.renderBody(this.jar.toString());
        return Promise.resolve(content).then(r => {
          contentWindow.document.body.innerHTML = r;
          // this.packPreviewFrame();
          this.syncPreviewScroll();
          this.previewInProcess = false;
        });
      }
      content = this.props.render(this.jar.toString());
      return Promise.resolve(content).then(r => {
        const frameDoc = this.previewFrame.current.contentWindow.document;
        frameDoc.open();
        frameDoc.write(r);
        frameDoc.close();
        frameDoc.addEventListener("click", e => {
          e.stopPropagation();
          e.preventDefault();
        }, true);
        frameDoc.head.innerHTML += iframeScrollbars;

        // if(typeof this.props.imageRewriter==='function'){
        //   const imgs = frameDoc.querySelectorAll("*[src]");
        //   imgs.forEach(i=>{
        //     if(i.getAttribute("src").match(/^http(s)?:/)){
        //       return;
        //     }
        //     i.src = this.props.imageRewriter(i.getAttribute( "src" ));
        //   })
        // }
        // console.log(frameDoc, frameDoc.body)
        frameDoc.addEventListener("DOMContentLoaded", () => {
          if (!frameDoc.body) {
            return;
          } //too late to calc, drop it
          // this.packPreviewFrame();
          this.syncPreviewScroll();
          this.previewInProcess = false;
          // this.previewInProcess = false;
        });
      }); //.finally( ()=>this.previewInProcess=false )
    };
    if (!this.previewThrottled) {
      this.previewThrottled = true;
      await redraw();
      window.setTimeout(() => {
        this.previewThrottled = false;
        !this.previewInProcess && redraw();
      }, 300);
    }
  }
  render() {
    // fix cursor position on render
    // if pos was saved on update
    if (this.pos && document.activeElement === this.codeJarContainer.current) {
      this.jar.restore(this.pos);
      this.pos = null;
    }

    // buttons:
    // toggle preview , toggle fullscreen , <preview only?> , save

    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      "class": "BareMDE \n       " + (this.state.fullscreen && 'fullscreen') + "\n       " + (this.state.showPreview && 'showPreview') + "\n       " + (this.state.fullPreview && 'fullPreview') + "\n       ",
      ref: this.componentContainer,
      style: "max-height:" + (this.state.fullscreen ? '100%' : this.props.maxHeight) + ";z-index:" + (this.state.fullscreen ? this.props.fullscreenZIndex : "initial")
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      "class": "toolbar top \n       " + (this.state.fullscreen ? 'fullscreen' : 'windowed') + "\n      "
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_Menu__WEBPACK_IMPORTED_MODULE_3__["default"], {
      title: this.props.menuTitle || "Additional functions",
      zIndex: this.state.fullscreen ? this.props.fullscreenZIndex + 100 : "initial",
      items: this.props.menuItems
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      "class": "bmde_branding",
      dangerouslySetInnerHTML: {
        __html: this.props.branding
      }
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_TButton__WEBPACK_IMPORTED_MODULE_4__["default"], {
      isOn: true,
      customClass: "formatting",
      svg: _icons_formatting_format_bold_FILL0_wght400_GRAD0_opsz24_svg_raw__WEBPACK_IMPORTED_MODULE_15__,
      title: "Bold " + modSymbol + "+B",
      onClick: () => this.fireCommand("bold")
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_TButton__WEBPACK_IMPORTED_MODULE_4__["default"], {
      customClass: "formatting",
      isOn: true,
      svg: _icons_formatting_format_italic_FILL0_wght400_GRAD0_opsz24_svg_raw__WEBPACK_IMPORTED_MODULE_16__,
      title: "Italic " + modSymbol + "+I",
      onClick: () => this.fireCommand("italic")
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_TButton__WEBPACK_IMPORTED_MODULE_4__["default"], {
      customClass: "formatting",
      isOn: true,
      svg: _icons_formatting_format_strikethrough_FILL0_wght400_GRAD0_opsz24_svg_raw__WEBPACK_IMPORTED_MODULE_18__,
      title: "Strikethrough " + modSymbol + "+D",
      onClick: () => this.fireCommand("strike")
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_TButton__WEBPACK_IMPORTED_MODULE_4__["default"], {
      customClass: "formatting",
      isOn: true,
      svg: _icons_formatting_link_FILL0_wght400_GRAD0_opsz24_svg_raw__WEBPACK_IMPORTED_MODULE_17__,
      title: "Link " + modSymbol + "+L",
      onClick: () => this.fireCommand("link")
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      "class": "divider"
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_TButton__WEBPACK_IMPORTED_MODULE_4__["default"], {
      isOn: this.state.showPreview,
      svg: _icons_preview_FILL0_wght400_GRAD0_opsz24_svg_raw__WEBPACK_IMPORTED_MODULE_5__,
      title: "Toggle Preview",
      onClick: this.togglePreview
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_TButton__WEBPACK_IMPORTED_MODULE_4__["default"], {
      isOn: this.state.fullPreview,
      svg: _icons_preview_big_on_min_svg_raw__WEBPACK_IMPORTED_MODULE_6__,
      svgOff: _icons_visibility_FILL0_wght400_GRAD0_opsz24_svg_raw__WEBPACK_IMPORTED_MODULE_7__,
      title: this.props.externalPreviewTitle || "Full width preview",
      onClick: this.toggleFullPreview
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_TButton__WEBPACK_IMPORTED_MODULE_4__["default"], {
      isOn: this.state.fullscreen,
      svg: _icons_fullscreen_exit_FILL0_wght400_GRAD0_opsz24_svg_raw__WEBPACK_IMPORTED_MODULE_9__,
      svgOff: _icons_fullscreen_FILL0_wght400_GRAD0_opsz24_svg_raw__WEBPACK_IMPORTED_MODULE_8__,
      title: this.state.fullscreen ? "Exit fullscreen" : "Go fullscreen",
      onClick: this.toggleFullscreen
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_TButton__WEBPACK_IMPORTED_MODULE_4__["default"], {
      isOn: this.state.spellCheck,
      svg: _icons_spellcheck_active_minified_svg_raw__WEBPACK_IMPORTED_MODULE_10__,
      svgOff: _icons_spellcheck_FILL1_wght400_GRAD0_opsz24_svg_raw__WEBPACK_IMPORTED_MODULE_11__,
      title: this.state.spellCheck ? "Turn spellchek off" : "Turn spellcheck on",
      onClick: this.toggleSpellcheck
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_TButton__WEBPACK_IMPORTED_MODULE_4__["default"], {
      isOn: this.state.syncScroll,
      svg: _icons_arrows_locked_svg_raw__WEBPACK_IMPORTED_MODULE_12__,
      svgOff: _icons_swap_vert_FILL0_wght400_GRAD0_opsz24_svg_raw__WEBPACK_IMPORTED_MODULE_13__,
      title: this.state.syncScroll ? "Turn scroll sync off" : "Turn scroll sync on",
      onClick: this.toggleSyncScroll
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_TButton__WEBPACK_IMPORTED_MODULE_4__["default"], {
      svg: _icons_save_white_svg_raw__WEBPACK_IMPORTED_MODULE_14__,
      title: "Save html file",
      onClick: this.saveFile,
      customClass: this.props.modified ? "alerted" : ""
    })), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      "class": "workArea"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      "class": "codeJar language-md",
      ref: this.codeJarContainer,
      onscroll: () => this.syncPreviewScroll()
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      "class": "preview " + this.props.previewClass,
      ref: this.previewContainer
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("iframe", {
      style: "min-height:100%",
      ref: this.previewFrame
    }))));
  }
}
BareMDE.defaultProps = {
  render: m => `<html><head></head><body><div style='color:navyblue'>${m}</div></body></html>`,
  renderBody: null,
  onUpdate: () => console.log("Editor updated"),
  save: c => console.log("Dummy save function", c.substring(0, 200) + "..."),
  content: "write here",
  //text to display on mount
  contentId: null,
  //id of content to track the changes
  modified: false,
  indicateChanges: true,
  previewClass: "markdownPreviewArea",
  fullscreen: false,
  onEnterFullscreen: () => document.body.style.overflow = "hidden",
  onExitFullscreen: () => document.body.style.overflow = "initial",
  trueFullscreen: false,
  showPreview: true,
  spellCheck: true,
  fullscreenZIndex: 1001,
  externalPreview: null,
  externalPreviewTitle: null,
  imageRewriter: null,
  maxHeight: '400px',
  branding: "0.2.3",
  controls: null
  //disable: [] //What the hell is that?
};
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QixjQUFjLG1EQUFtRDtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixhQUFhO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekIsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIseUJBQXlCO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQyxnQ0FBZ0M7QUFDaEMsZ0NBQWdDO0FBQ2hDLGtDQUFrQztBQUNsQyxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pkQTtBQUNnSDtBQUNqQjtBQUMvRiw4QkFBOEIsbUZBQTJCLENBQUMsNEZBQXFDO0FBQy9GO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLE9BQU8sbUdBQW1HLFdBQVcsVUFBVSxXQUFXLFdBQVcsV0FBVyxXQUFXLFVBQVUsV0FBVyxVQUFVLFdBQVcsVUFBVSxVQUFVLEtBQUssS0FBSyxVQUFVLFVBQVUsV0FBVyxVQUFVLFVBQVUsVUFBVSxVQUFVLFdBQVcsVUFBVSxVQUFVLEtBQUssS0FBSyxXQUFXLEtBQUssS0FBSyxVQUFVLFdBQVcsVUFBVSxXQUFXLFdBQVcsV0FBVyxVQUFVLFdBQVcsVUFBVSxXQUFXLFdBQVcsVUFBVSxVQUFVLEtBQUssS0FBSyxVQUFVLFVBQVUsVUFBVSxVQUFVLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLEtBQUssS0FBSyxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsS0FBSyxLQUFLLFdBQVcsVUFBVSxVQUFVLFVBQVUsV0FBVyxVQUFVLEtBQUssS0FBSyxVQUFVLFVBQVUsVUFBVSxVQUFVLFdBQVcsS0FBSyxLQUFLLFVBQVUsV0FBVyxXQUFXLEtBQUssS0FBSyxXQUFXLFdBQVcsV0FBVyxVQUFVLFVBQVUsV0FBVyxXQUFXLFdBQVcsV0FBVyxLQUFLLEtBQUssV0FBVyxXQUFXLFVBQVUsV0FBVyxXQUFXLFVBQVUsV0FBVyxVQUFVLEtBQUssS0FBSyxXQUFXLEtBQUssS0FBSyxXQUFXLFdBQVcsS0FBSyxLQUFLLFdBQVcsVUFBVSxLQUFLLEtBQUssV0FBVyxVQUFVLEtBQUssS0FBSyxXQUFXLEtBQUssTUFBTSxVQUFVLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxVQUFVLFVBQVUsV0FBVyxVQUFVLFdBQVcsV0FBVyxXQUFXLFdBQVcsTUFBTSxNQUFNLFVBQVUsV0FBVyxVQUFVLFVBQVUsS0FBSyxNQUFNLFdBQVcsV0FBVyxLQUFLLE1BQU0sVUFBVSxLQUFLLE1BQU0sV0FBVyxLQUFLLE1BQU0sV0FBVyxLQUFLLE1BQU0sVUFBVSxLQUFLLE1BQU0sVUFB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QU8sRUFBRSxZQUFZO0VBQUU7RUFDdkI4UCxTQUFTLEVBQUUsSUFBSTtFQUFFO0VBQ2pCRixRQUFRLEVBQUUsS0FBSztFQUNmOEcsZUFBZSxFQUFFLElBQUk7RUFDckJGLFlBQVksRUFBRSxxQkFBcUI7RUFDbkNqSCxVQUFVLEVBQUUsS0FBSztFQUNqQndGLGlCQUFpQixFQUFFQSxDQUFBLEtBQUkzUyxRQUFRLENBQUNvVCxJQUFJLENBQUMzWCxLQUFLLENBQUM4WSxRQUFRLEdBQUMsUUFBUTtFQUM1RHZCLGdCQUFnQixFQUFFQSxDQUFBLEtBQUloVCxRQUFRLENBQUNvVCxJQUFJLENBQUMzWCxLQUFLLENBQUM4WSxRQUFRLEdBQUMsU0FBUztFQUM1RDFCLGNBQWMsRUFBRSxLQUFLO0VBQ3JCekYsV0FBVyxFQUFFLElBQUk7RUFDakJFLFVBQVUsRUFBRSxJQUFJO0VBQ2hCc0YsZ0JBQWdCLEVBQUUsSUFBSTtFQUN0Qk8sZUFBZSxFQUFFLElBQUk7RUFDckJlLG9CQUFvQixFQUFFLElBQUk7RUFDMUJuRixhQUFhLEVBQUUsSUFBSTtFQUNuQitFLFNBQVMsRUFBRSxPQUFPO0VBQ2xCRyxRQUFRLEVBQUVPLE9BQU87RUFDakIzRixRQUFRLEVBQUU7RUFDVjtBQUVILENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhcmUtbWRlL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9iYXJlLW1kZS8uL3NyYy9jb21wb25lbnRzL0JhcmVNREUvSWYuanMiLCJ3ZWJwYWNrOi8vYmFyZS1tZGUvLi9zcmMvY29tcG9uZW50cy9CYXJlTURFL01lbnUuanMiLCJ3ZWJwYWNrOi8vYmFyZS1tZGUvLi9zcmMvY29tcG9uZW50cy9CYXJlTURFL1RCdXR0b24uanMiLCJ3ZWJwYWNrOi8vYmFyZS1tZGUvLi9zcmMvY29tcG9uZW50cy9CYXJlTURFL3ByaXNtL3ByaXNtLmpzIiwid2VicGFjazovL2JhcmUtbWRlLy4vbm9kZV9tb2R1bGVzL2NvZGVqYXIvY29kZWphci5qcyIsIndlYnBhY2s6Ly9iYXJlLW1kZS8uL3NyYy9jb21wb25lbnRzL0JhcmVNREUvbWRlZC5zY3NzIiwid2VicGFjazovL2JhcmUtbWRlLy4vc3JjL2NvbXBvbmVudHMvQmFyZU1ERS9wcmlzbS9wcmlzbV9maXhlZC5zY3NzIiwid2VicGFjazovL2JhcmUtbWRlLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9iYXJlLW1kZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhcmUtbWRlLy4vbm9kZV9tb2R1bGVzL2h0bS9kaXN0L2h0bS5tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vYmFyZS1tZGUvLi9ub2RlX21vZHVsZXMvaHRtL3ByZWFjdC9pbmRleC5tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vYmFyZS1tZGUvLi9zcmMvY29tcG9uZW50cy9CYXJlTURFL21kZWQuc2Nzcz8xMzBkIiwid2VicGFjazovL2JhcmUtbWRlLy4vc3JjL2NvbXBvbmVudHMvQmFyZU1ERS9wcmlzbS9wcmlzbV9maXhlZC5zY3NzP2EyM2YiLCJ3ZWJwYWNrOi8vYmFyZS1tZGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYmFyZS1tZGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhcmUtbWRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2JhcmUtbWRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JhcmUtbWRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmFyZS1tZGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9iYXJlLW1kZS9leHRlcm5hbCB1bWQgXCJwcmVhY3RcIiIsIndlYnBhY2s6Ly9iYXJlLW1kZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXJlLW1kZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXJlLW1kZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmFyZS1tZGUvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9iYXJlLW1kZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhcmUtbWRlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmFyZS1tZGUvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2JhcmUtbWRlLy4vc3JjL2NvbXBvbmVudHMvQmFyZU1ERS9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJwcmVhY3RcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wicHJlYWN0XCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIkJhcmVNREVcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJwcmVhY3RcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIkJhcmVNREVcIl0gPSBmYWN0b3J5KHJvb3RbXCJwcmVhY3RcIl0pO1xufSkoc2VsZiwgKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfcHJlYWN0X18pID0+IHtcbnJldHVybiAiLCJpbXBvcnQgeyAgQ29tcG9uZW50fSBmcm9tICdwcmVhY3QnO1xuXG5leHBvcnQgY2xhc3MgSWYgZXh0ZW5kcyBDb21wb25lbnR7XG4gIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICBzdXBlcihwcm9wcylcbiAgfVxuXG4gIHJlbmRlcigpe1xuICAgIC8vIGNvbnNvbGUubG9nKFwiSUZcIiAsIHRoaXMucHJvcHMuY29uZGl0aW9uKVxuICAgIGlmKHRoaXMucHJvcHMuY29uZGl0aW9uKXtcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuXG4gICAgfWVsc2V7XG4gICAgcmV0dXJuIFwiXCJcbiAgICB9XG4gIH1cbn1cblxuIiwiaW1wb3J0IHsgaCAsIENvbXBvbmVudH0gZnJvbSBcInByZWFjdFwiO1xuaW1wb3J0IHtodG1sfSBmcm9tIFwiaHRtL3ByZWFjdFwiO1xuaW1wb3J0IHsgSWYgfSBmcm9tIFwiLi9JZlwiO1xuaW1wb3J0IHN2Z00gZnJvbSBcIi4vaWNvbnMvbWVudV9GSUxMMF93Z2h0NDAwX0dSQUQwX29wc3oyNC5zdmc/cmF3XCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWVudSBleHRlbmRzIENvbXBvbmVudHtcbiAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgb3BlbjogZmFsc2VcbiAgICB9XG4gICAgdGhpcy5oYW5kbGVJdGVtID0gdGhpcy5oYW5kbGVJdGVtLmJpbmQodGhpcyk7XG4gICAgdGhpcy5kb0Nsb3NlPXRoaXMuZG9DbG9zZS5iaW5kKHRoaXMpO1xuXG4gIH1cblxuICBoYW5kbGVJdGVtKGkpe1xuICAgIHRoaXMucHJvcHMuaXRlbXNbaV0uaGFuZGxlcigpO1xuICAgIC8vIHRoaXMuc2V0U3RhdGUoe1wib3BlblwiIDogZmFsc2V9KTtcbiAgfVxuXG4gIGRvQ2xvc2UoKXtcbiAgICB0aGlzLnNldFN0YXRlKHsgXCJvcGVuXCIgOiBmYWxzZSB9KVxuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZpb3VzUHJvcHMsIHByZXZpb3VzU3RhdGUpe1xuICAgIGlmKHRoaXMuc3RhdGUub3Blbj09PXRydWUgJiYgcHJldmlvdXNTdGF0ZS5vcGVuPT09ZmFsc2Upe1xuICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5kb0Nsb3NlKVxuICAgIH1cbiAgICBpZih0aGlzLnN0YXRlLm9wZW49PT1mYWxzZSAmJiBwcmV2aW91c1N0YXRlLm9wZW49PT10cnVlKXtcbiAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuZG9DbG9zZSlcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gICAgXG4gIH1cblxuICByZW5kZXIoKXtcbiAgICBpZighdGhpcy5wcm9wcy5pdGVtcyB8fCB0aGlzLnByb3BzLml0ZW1zLmxlbmd0aD09MCl7IHJldHVybiBcIlwiIH1cbiAgICBjb25zdCBteSA9IHRoaXM7XG4gICAgcmV0dXJuIGh0bWxgXG4gICAgPGRpdiBjbGFzcz1cIkVkaXRvck1lbnVcIj5cbiAgICA8YnV0dG9uXG4gICAgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9JHt7X19odG1sOiBzdmdNfX1cbiAgICB0aXRsZT0ke3RoaXMucHJvcHMudGl0bGUgfHwgXCJNZW51XCJ9XG4gICAgb25DbGljaz0keyhlKT0+eyAgZS5zdG9wUHJvcGFnYXRpb24oKSA7IGUucHJldmVudERlZmF1bHQoKTsgdGhpcy5zZXRTdGF0ZSh7IG9wZW46ICF0aGlzLnN0YXRlLm9wZW4gfSkgfX0vPlxuICAgIDwke0lmfSBjb25kaXRpb249JHt0aGlzLnN0YXRlLm9wZW59PlxuICAgIDxkaXYgY2xhc3M9XCJtZW51SXRlbXNcIiBzdHlsZT1cInotaW5kZXg6JHt0aGlzLnByb3BzLnpJbmRleH1cIj5cbiAgICAkeyB0aGlzLnByb3BzLml0ZW1zLm1hcCggXG4gICAgKGUsaSk9Pmh0bWxgPGRpdiBjbGFzcz1cIkl0ZW1cIiBcbiAgICBvbk1vdXNlRG93bj0keyAoKT0+bXkuaGFuZGxlSXRlbShpKSB9XG4gICAgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9JHt7X19odG1sOiBlLmxhYmVsfX1cbiAgICAvPmAgXG4gICAgKSB9XG4gICAgPC9kaXY+XG4gICAgPC8ke0lmfT5cbiAgICA8L2Rpdj5cblxuICAgIGBcbiAgICB9XG4gIH1cblxuXG5NZW51LmRlZmF1bHRQcm9wcyA9IHtcbiAgekluZGV4OiAxMTAwLFxufVxuXG4iLCJpbXBvcnQgeyBoIH0gZnJvbSBcInByZWFjdFwiO1xuaW1wb3J0IHtodG1sfSBmcm9tIFwiaHRtL3ByZWFjdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBUQnV0dG9uKHsgXG4gICBzdmcsXG4gICBzdmdPZmYsXG4gICBpc09uLFxuICAgdGl0bGUsXG4gICBvbkNsaWNrLFxuICAgY3VzdG9tQ2xhc3Ncbn0pe1xuICAgIHN2Z09mZiA9IHN2Z09mZiB8fCBzdmc7IFxuICAgcmV0dXJuIGh0bWxgPGJ1dHRvbiBjbGFzcz1cIlRCdXR0b24gXG4gICAkeyBpc09uID8gJ29uJyA6ICdvZmYnIH1cbiAgICR7Y3VzdG9tQ2xhc3MgfHwgJyd9XG4gICBcIlxuICAgc3R5bGU9JHt7XG4gICAgICAgIHdpZHRoOiBcIjMycHhcIixcbiAgICAgICAgaGVpZ2h0OiBcIjMycHhcIixcbiAgICAgICAgZGlzcGxheTogXCJpbmxpbmUtYmxvY2tcIixcbiAgICAgICAgYm94U2l6aW5nOiBcImJvcmRlci1ib3hcIixcbiAgICAgICAgcGFkZGluZzpcIjNweFwiLFxuICAgICAgICB1c2VyU2VsZWN0OiBcIm5vbmVcIixcbiAgICAgICAgYm9yZGVyV2lkdGg6XCIxcHhcIixcbiAgICAgfX1cbiAgIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPSR7e19faHRtbDppc09uPyBzdmcgOiBzdmdPZmZ9fVxuICAgdGl0bGU9JHsgdGl0bGV8fCcnIH1cbiAgIG9uQ2xpY2s9JHsgdHlwZW9mIG9uQ2xpY2sgPT09ICdmdW5jdGlvbicgPyBvbkNsaWNrIDogKCk9PmNvbnNvbGUubG9nKCdidXR0b24gY2xpY2tlZCcpIH1cbiAgIC8+YFxufVxuIiwiLyogUHJpc21KUyAxLjI5LjBcbmh0dHBzOi8vcHJpc21qcy5jb20vZG93bmxvYWQuaHRtbCN0aGVtZXM9cHJpc20tY295Jmxhbmd1YWdlcz1tYXJrdXArbWFya2Rvd24gKi9cbi8vLyA8cmVmZXJlbmNlIGxpYj1cIldlYldvcmtlclwiLz5cblxudmFyIF9zZWxmID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKVxuXHQ/IHdpbmRvdyAgIC8vIGlmIGluIGJyb3dzZXJcblx0OiAoXG5cdFx0KHR5cGVvZiBXb3JrZXJHbG9iYWxTY29wZSAhPT0gJ3VuZGVmaW5lZCcgJiYgc2VsZiBpbnN0YW5jZW9mIFdvcmtlckdsb2JhbFNjb3BlKVxuXHRcdFx0PyBzZWxmIC8vIGlmIGluIHdvcmtlclxuXHRcdFx0OiB7fSAgIC8vIGlmIGluIG5vZGUganNcblx0KTtcblxuLyoqXG4gKiBQcmlzbTogTGlnaHR3ZWlnaHQsIHJvYnVzdCwgZWxlZ2FudCBzeW50YXggaGlnaGxpZ2h0aW5nXG4gKlxuICogQGxpY2Vuc2UgTUlUIDxodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVD5cbiAqIEBhdXRob3IgTGVhIFZlcm91IDxodHRwczovL2xlYS52ZXJvdS5tZT5cbiAqIEBuYW1lc3BhY2VcbiAqIEBwdWJsaWNcbiAqL1xudmFyIFByaXNtID0gKGZ1bmN0aW9uIChfc2VsZikge1xuXG5cdC8vIFByaXZhdGUgaGVscGVyIHZhcnNcblx0dmFyIGxhbmcgPSAvKD86XnxcXHMpbGFuZyg/OnVhZ2UpPy0oW1xcdy1dKykoPz1cXHN8JCkvaTtcblx0dmFyIHVuaXF1ZUlkID0gMDtcblxuXHQvLyBUaGUgZ3JhbW1hciBvYmplY3QgZm9yIHBsYWludGV4dFxuXHR2YXIgcGxhaW5UZXh0R3JhbW1hciA9IHt9O1xuXG5cblx0dmFyIF8gPSB7XG5cdFx0LyoqXG5cdFx0ICogQnkgZGVmYXVsdCwgUHJpc20gd2lsbCBhdHRlbXB0IHRvIGhpZ2hsaWdodCBhbGwgY29kZSBlbGVtZW50cyAoYnkgY2FsbGluZyB7QGxpbmsgUHJpc20uaGlnaGxpZ2h0QWxsfSkgb24gdGhlXG5cdFx0ICogY3VycmVudCBwYWdlIGFmdGVyIHRoZSBwYWdlIGZpbmlzaGVkIGxvYWRpbmcuIFRoaXMgbWlnaHQgYmUgYSBwcm9ibGVtIGlmIGUuZy4geW91IHdhbnRlZCB0byBhc3luY2hyb25vdXNseSBsb2FkXG5cdFx0ICogYWRkaXRpb25hbCBsYW5ndWFnZXMgb3IgcGx1Z2lucyB5b3Vyc2VsZi5cblx0XHQgKlxuXHRcdCAqIEJ5IHNldHRpbmcgdGhpcyB2YWx1ZSB0byBgdHJ1ZWAsIFByaXNtIHdpbGwgbm90IGF1dG9tYXRpY2FsbHkgaGlnaGxpZ2h0IGFsbCBjb2RlIGVsZW1lbnRzIG9uIHRoZSBwYWdlLlxuXHRcdCAqXG5cdFx0ICogWW91IG9idmlvdXNseSBoYXZlIHRvIGNoYW5nZSB0aGlzIHZhbHVlIGJlZm9yZSB0aGUgYXV0b21hdGljIGhpZ2hsaWdodGluZyBzdGFydGVkLiBUbyBkbyB0aGlzLCB5b3UgY2FuIGFkZCBhblxuXHRcdCAqIGVtcHR5IFByaXNtIG9iamVjdCBpbnRvIHRoZSBnbG9iYWwgc2NvcGUgYmVmb3JlIGxvYWRpbmcgdGhlIFByaXNtIHNjcmlwdCBsaWtlIHRoaXM6XG5cdFx0ICpcblx0XHQgKiBgYGBqc1xuXHRcdCAqIHdpbmRvdy5QcmlzbSA9IHdpbmRvdy5QcmlzbSB8fCB7fTtcblx0XHQgKiBQcmlzbS5tYW51YWwgPSB0cnVlO1xuXHRcdCAqIC8vIGFkZCBhIG5ldyA8c2NyaXB0PiB0byBsb2FkIFByaXNtJ3Mgc2NyaXB0XG5cdFx0ICogYGBgXG5cdFx0ICpcblx0XHQgKiBAZGVmYXVsdCBmYWxzZVxuXHRcdCAqIEB0eXBlIHtib29sZWFufVxuXHRcdCAqIEBtZW1iZXJvZiBQcmlzbVxuXHRcdCAqIEBwdWJsaWNcblx0XHQgKi9cblx0XHQvLyBtYW51YWw6IF9zZWxmLlByaXNtICYmIF9zZWxmLlByaXNtLm1hbnVhbCxcblx0XHQgbWFudWFsOiB0cnVlLC8vX3NlbGYuUHJpc20gJiYgX3NlbGYuUHJpc20ubWFudWFsLFxuXHRcdC8qKlxuXHRcdCAqIEJ5IGRlZmF1bHQsIGlmIFByaXNtIGlzIGluIGEgd2ViIHdvcmtlciwgaXQgYXNzdW1lcyB0aGF0IGl0IGlzIGluIGEgd29ya2VyIGl0IGNyZWF0ZWQgaXRzZWxmLCBzbyBpdCB1c2VzXG5cdFx0ICogYGFkZEV2ZW50TGlzdGVuZXJgIHRvIGNvbW11bmljYXRlIHdpdGggaXRzIHBhcmVudCBpbnN0YW5jZS4gSG93ZXZlciwgaWYgeW91J3JlIHVzaW5nIFByaXNtIG1hbnVhbGx5IGluIHlvdXJcblx0XHQgKiBvd24gd29ya2VyLCB5b3UgZG9uJ3Qgd2FudCBpdCB0byBkbyB0aGlzLlxuXHRcdCAqXG5cdFx0ICogQnkgc2V0dGluZyB0aGlzIHZhbHVlIHRvIGB0cnVlYCwgUHJpc20gd2lsbCBub3QgYWRkIGl0cyBvd24gbGlzdGVuZXJzIHRvIHRoZSB3b3JrZXIuXG5cdFx0ICpcblx0XHQgKiBZb3Ugb2J2aW91c2x5IGhhdmUgdG8gY2hhbmdlIHRoaXMgdmFsdWUgYmVmb3JlIFByaXNtIGV4ZWN1dGVzLiBUbyBkbyB0aGlzLCB5b3UgY2FuIGFkZCBhblxuXHRcdCAqIGVtcHR5IFByaXNtIG9iamVjdCBpbnRvIHRoZSBnbG9iYWwgc2NvcGUgYmVmb3JlIGxvYWRpbmcgdGhlIFByaXNtIHNjcmlwdCBsaWtlIHRoaXM6XG5cdFx0ICpcblx0XHQgKiBgYGBqc1xuXHRcdCAqIHdpbmRvdy5QcmlzbSA9IHdpbmRvdy5QcmlzbSB8fCB7fTtcblx0XHQgKiBQcmlzbS5kaXNhYmxlV29ya2VyTWVzc2FnZUhhbmRsZXIgPSB0cnVlO1xuXHRcdCAqIC8vIExvYWQgUHJpc20ncyBzY3JpcHRcblx0XHQgKiBgYGBcblx0XHQgKlxuXHRcdCAqIEBkZWZhdWx0IGZhbHNlXG5cdFx0ICogQHR5cGUge2Jvb2xlYW59XG5cdFx0ICogQG1lbWJlcm9mIFByaXNtXG5cdFx0ICogQHB1YmxpY1xuXHRcdCAqL1xuXHRcdGRpc2FibGVXb3JrZXJNZXNzYWdlSGFuZGxlcjogX3NlbGYuUHJpc20gJiYgX3NlbGYuUHJpc20uZGlzYWJsZVdvcmtlck1lc3NhZ2VIYW5kbGVyLFxuXG5cdFx0LyoqXG5cdFx0ICogQSBuYW1lc3BhY2UgZm9yIHV0aWxpdHkgbWV0aG9kcy5cblx0XHQgKlxuXHRcdCAqIEFsbCBmdW5jdGlvbiBpbiB0aGlzIG5hbWVzcGFjZSB0aGF0IGFyZSBub3QgZXhwbGljaXRseSBtYXJrZWQgYXMgX3B1YmxpY18gYXJlIGZvciBfX2ludGVybmFsIHVzZSBvbmx5X18gYW5kIG1heVxuXHRcdCAqIGNoYW5nZSBvciBkaXNhcHBlYXIgYXQgYW55IHRpbWUuXG5cdFx0ICpcblx0XHQgKiBAbmFtZXNwYWNlXG5cdFx0ICogQG1lbWJlcm9mIFByaXNtXG5cdFx0ICovXG5cdFx0dXRpbDoge1xuXHRcdFx0ZW5jb2RlOiBmdW5jdGlvbiBlbmNvZGUodG9rZW5zKSB7XG5cdFx0XHRcdGlmICh0b2tlbnMgaW5zdGFuY2VvZiBUb2tlbikge1xuXHRcdFx0XHRcdHJldHVybiBuZXcgVG9rZW4odG9rZW5zLnR5cGUsIGVuY29kZSh0b2tlbnMuY29udGVudCksIHRva2Vucy5hbGlhcyk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh0b2tlbnMpKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRva2Vucy5tYXAoZW5jb2RlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZXR1cm4gdG9rZW5zLnJlcGxhY2UoLyYvZywgJyZhbXA7JykucmVwbGFjZSgvPC9nLCAnJmx0OycpLnJlcGxhY2UoL1xcdTAwYTAvZywgJyAnKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBSZXR1cm5zIHRoZSBuYW1lIG9mIHRoZSB0eXBlIG9mIHRoZSBnaXZlbiB2YWx1ZS5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0ge2FueX0gb1xuXHRcdFx0ICogQHJldHVybnMge3N0cmluZ31cblx0XHRcdCAqIEBleGFtcGxlXG5cdFx0XHQgKiB0eXBlKG51bGwpICAgICAgPT09ICdOdWxsJ1xuXHRcdFx0ICogdHlwZSh1bmRlZmluZWQpID09PSAnVW5kZWZpbmVkJ1xuXHRcdFx0ICogdHlwZSgxMjMpICAgICAgID09PSAnTnVtYmVyJ1xuXHRcdFx0ICogdHlwZSgnZm9vJykgICAgID09PSAnU3RyaW5nJ1xuXHRcdFx0ICogdHlwZSh0cnVlKSAgICAgID09PSAnQm9vbGVhbidcblx0XHRcdCAqIHR5cGUoWzEsIDJdKSAgICA9PT0gJ0FycmF5J1xuXHRcdFx0ICogdHlwZSh7fSkgICAgICAgID09PSAnT2JqZWN0J1xuXHRcdFx0ICogdHlwZShTdHJpbmcpICAgID09PSAnRnVuY3Rpb24nXG5cdFx0XHQgKiB0eXBlKC9hYmMrLykgICAgPT09ICdSZWdFeHAnXG5cdFx0XHQgKi9cblx0XHRcdHR5cGU6IGZ1bmN0aW9uIChvKSB7XG5cdFx0XHRcdHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpO1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBSZXR1cm5zIGEgdW5pcXVlIG51bWJlciBmb3IgdGhlIGdpdmVuIG9iamVjdC4gTGF0ZXIgY2FsbHMgd2lsbCBzdGlsbCByZXR1cm4gdGhlIHNhbWUgbnVtYmVyLlxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcblx0XHRcdCAqIEByZXR1cm5zIHtudW1iZXJ9XG5cdFx0XHQgKi9cblx0XHRcdG9iaklkOiBmdW5jdGlvbiAob2JqKSB7XG5cdFx0XHRcdGlmICghb2JqWydfX2lkJ10pIHtcblx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCAnX19pZCcsIHsgdmFsdWU6ICsrdW5pcXVlSWQgfSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIG9ialsnX19pZCddO1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBDcmVhdGVzIGEgZGVlcCBjbG9uZSBvZiB0aGUgZ2l2ZW4gb2JqZWN0LlxuXHRcdFx0ICpcblx0XHRcdCAqIFRoZSBtYWluIGludGVuZGVkIHVzZSBvZiB0aGlzIGZ1bmN0aW9uIGlzIHRvIGNsb25lIGxhbmd1YWdlIGRlZmluaXRpb25zLlxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSB7VH0gb1xuXHRcdFx0ICogQHBhcmFtIHtSZWNvcmQ8bnVtYmVyLCBhbnk+fSBbdmlzaXRlZF1cblx0XHRcdCAqIEByZXR1cm5zIHtUfVxuXHRcdFx0ICogQHRlbXBsYXRlIFRcblx0XHRcdCAqL1xuXHRcdFx0Y2xvbmU6IGZ1bmN0aW9uIGRlZXBDbG9uZShvLCB2aXNpdGVkKSB7XG5cdFx0XHRcdHZpc2l0ZWQgPSB2aXNpdGVkIHx8IHt9O1xuXG5cdFx0XHRcdHZhciBjbG9uZTsgdmFyIGlkO1xuXHRcdFx0XHRzd2l0Y2ggKF8udXRpbC50eXBlKG8pKSB7XG5cdFx0XHRcdFx0Y2FzZSAnT2JqZWN0Jzpcblx0XHRcdFx0XHRcdGlkID0gXy51dGlsLm9iaklkKG8pO1xuXHRcdFx0XHRcdFx0aWYgKHZpc2l0ZWRbaWRdKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiB2aXNpdGVkW2lkXTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGNsb25lID0gLyoqIEB0eXBlIHtSZWNvcmQ8c3RyaW5nLCBhbnk+fSAqLyAoe30pO1xuXHRcdFx0XHRcdFx0dmlzaXRlZFtpZF0gPSBjbG9uZTtcblxuXHRcdFx0XHRcdFx0Zm9yICh2YXIga2V5IGluIG8pIHtcblx0XHRcdFx0XHRcdFx0aWYgKG8uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRcdFx0XHRcdGNsb25lW2tleV0gPSBkZWVwQ2xvbmUob1trZXldLCB2aXNpdGVkKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRyZXR1cm4gLyoqIEB0eXBlIHthbnl9ICovIChjbG9uZSk7XG5cblx0XHRcdFx0XHRjYXNlICdBcnJheSc6XG5cdFx0XHRcdFx0XHRpZCA9IF8udXRpbC5vYmpJZChvKTtcblx0XHRcdFx0XHRcdGlmICh2aXNpdGVkW2lkXSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdmlzaXRlZFtpZF07XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRjbG9uZSA9IFtdO1xuXHRcdFx0XHRcdFx0dmlzaXRlZFtpZF0gPSBjbG9uZTtcblxuXHRcdFx0XHRcdFx0KC8qKiBAdHlwZSB7QXJyYXl9ICovKC8qKiBAdHlwZSB7YW55fSAqLyhvKSkpLmZvckVhY2goZnVuY3Rpb24gKHYsIGkpIHtcblx0XHRcdFx0XHRcdFx0Y2xvbmVbaV0gPSBkZWVwQ2xvbmUodiwgdmlzaXRlZCk7XG5cdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdFx0cmV0dXJuIC8qKiBAdHlwZSB7YW55fSAqLyAoY2xvbmUpO1xuXG5cdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdHJldHVybiBvO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIFJldHVybnMgdGhlIFByaXNtIGxhbmd1YWdlIG9mIHRoZSBnaXZlbiBlbGVtZW50IHNldCBieSBhIGBsYW5ndWFnZS14eHh4YCBvciBgbGFuZy14eHh4YCBjbGFzcy5cblx0XHRcdCAqXG5cdFx0XHQgKiBJZiBubyBsYW5ndWFnZSBpcyBzZXQgZm9yIHRoZSBlbGVtZW50IG9yIHRoZSBlbGVtZW50IGlzIGBudWxsYCBvciBgdW5kZWZpbmVkYCwgYG5vbmVgIHdpbGwgYmUgcmV0dXJuZWQuXG5cdFx0XHQgKlxuXHRcdFx0ICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XG5cdFx0XHQgKiBAcmV0dXJucyB7c3RyaW5nfVxuXHRcdFx0ICovXG5cdFx0XHRnZXRMYW5ndWFnZTogZnVuY3Rpb24gKGVsZW1lbnQpIHtcblx0XHRcdFx0d2hpbGUgKGVsZW1lbnQpIHtcblx0XHRcdFx0XHR2YXIgbSA9IGxhbmcuZXhlYyhlbGVtZW50LmNsYXNzTmFtZSk7XG5cdFx0XHRcdFx0aWYgKG0pIHtcblx0XHRcdFx0XHRcdHJldHVybiBtWzFdLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsZW1lbnQgPSBlbGVtZW50LnBhcmVudEVsZW1lbnQ7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuICdub25lJztcblx0XHRcdH0sXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogU2V0cyB0aGUgUHJpc20gYGxhbmd1YWdlLXh4eHhgIGNsYXNzIG9mIHRoZSBnaXZlbiBlbGVtZW50LlxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxuXHRcdFx0ICogQHBhcmFtIHtzdHJpbmd9IGxhbmd1YWdlXG5cdFx0XHQgKiBAcmV0dXJucyB7dm9pZH1cblx0XHRcdCAqL1xuXHRcdFx0c2V0TGFuZ3VhZ2U6IGZ1bmN0aW9uIChlbGVtZW50LCBsYW5ndWFnZSkge1xuXHRcdFx0XHQvLyByZW1vdmUgYWxsIGBsYW5ndWFnZS14eHh4YCBjbGFzc2VzXG5cdFx0XHRcdC8vICh0aGlzIG1pZ2h0IGxlYXZlIGJlaGluZCBhIGxlYWRpbmcgc3BhY2UpXG5cdFx0XHRcdGVsZW1lbnQuY2xhc3NOYW1lID0gZWxlbWVudC5jbGFzc05hbWUucmVwbGFjZShSZWdFeHAobGFuZywgJ2dpJyksICcnKTtcblxuXHRcdFx0XHQvLyBhZGQgdGhlIG5ldyBgbGFuZ3VhZ2UteHh4eGAgY2xhc3Ncblx0XHRcdFx0Ly8gKHVzaW5nIGBjbGFzc0xpc3RgIHdpbGwgYXV0b21hdGljYWxseSBjbGVhbiB1cCBzcGFjZXMgZm9yIHVzKVxuXHRcdFx0XHRlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2xhbmd1YWdlLScgKyBsYW5ndWFnZSk7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIFJldHVybnMgdGhlIHNjcmlwdCBlbGVtZW50IHRoYXQgaXMgY3VycmVudGx5IGV4ZWN1dGluZy5cblx0XHRcdCAqXG5cdFx0XHQgKiBUaGlzIGRvZXMgX19ub3RfXyB3b3JrIGZvciBsaW5lIHNjcmlwdCBlbGVtZW50LlxuXHRcdFx0ICpcblx0XHRcdCAqIEByZXR1cm5zIHtIVE1MU2NyaXB0RWxlbWVudCB8IG51bGx9XG5cdFx0XHQgKi9cblx0XHRcdGN1cnJlbnRTY3JpcHQ6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0aWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoJ2N1cnJlbnRTY3JpcHQnIGluIGRvY3VtZW50ICYmIDEgPCAyIC8qIGhhY2sgdG8gdHJpcCBUUycgZmxvdyBhbmFseXNpcyAqLykge1xuXHRcdFx0XHRcdHJldHVybiAvKiogQHR5cGUge2FueX0gKi8gKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gSUUxMSB3b3JrYXJvdW5kXG5cdFx0XHRcdC8vIHdlJ2xsIGdldCB0aGUgc3JjIG9mIHRoZSBjdXJyZW50IHNjcmlwdCBieSBwYXJzaW5nIElFMTEncyBlcnJvciBzdGFjayB0cmFjZVxuXHRcdFx0XHQvLyB0aGlzIHdpbGwgbm90IHdvcmsgZm9yIGlubGluZSBzY3JpcHRzXG5cblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoKTtcblx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRcdFx0Ly8gR2V0IGZpbGUgc3JjIHVybCBmcm9tIHN0YWNrLiBTcGVjaWZpY2FsbHkgd29ya3Mgd2l0aCB0aGUgZm9ybWF0IG9mIHN0YWNrIHRyYWNlcyBpbiBJRS5cblx0XHRcdFx0XHQvLyBBIHN0YWNrIHdpbGwgbG9vayBsaWtlIHRoaXM6XG5cdFx0XHRcdFx0Ly9cblx0XHRcdFx0XHQvLyBFcnJvclxuXHRcdFx0XHRcdC8vICAgIGF0IF8udXRpbC5jdXJyZW50U2NyaXB0IChodHRwOi8vbG9jYWxob3N0L2NvbXBvbmVudHMvcHJpc20tY29yZS5qczoxMTk6NSlcblx0XHRcdFx0XHQvLyAgICBhdCBHbG9iYWwgY29kZSAoaHR0cDovL2xvY2FsaG9zdC9jb21wb25lbnRzL3ByaXNtLWNvcmUuanM6NjA2OjEpXG5cblx0XHRcdFx0XHR2YXIgc3JjID0gKC9hdCBbXihcXHJcXG5dKlxcKCguKik6W146XSs6W146XStcXCkkL2kuZXhlYyhlcnIuc3RhY2spIHx8IFtdKVsxXTtcblx0XHRcdFx0XHRpZiAoc3JjKSB7XG5cdFx0XHRcdFx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKTtcblx0XHRcdFx0XHRcdGZvciAodmFyIGkgaW4gc2NyaXB0cykge1xuXHRcdFx0XHRcdFx0XHRpZiAoc2NyaXB0c1tpXS5zcmMgPT0gc3JjKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHNjcmlwdHNbaV07XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogUmV0dXJucyB3aGV0aGVyIGEgZ2l2ZW4gY2xhc3MgaXMgYWN0aXZlIGZvciBgZWxlbWVudGAuXG5cdFx0XHQgKlxuXHRcdFx0ICogVGhlIGNsYXNzIGNhbiBiZSBhY3RpdmF0ZWQgaWYgYGVsZW1lbnRgIG9yIG9uZSBvZiBpdHMgYW5jZXN0b3JzIGhhcyB0aGUgZ2l2ZW4gY2xhc3MgYW5kIGl0IGNhbiBiZSBkZWFjdGl2YXRlZFxuXHRcdFx0ICogaWYgYGVsZW1lbnRgIG9yIG9uZSBvZiBpdHMgYW5jZXN0b3JzIGhhcyB0aGUgbmVnYXRlZCB2ZXJzaW9uIG9mIHRoZSBnaXZlbiBjbGFzcy4gVGhlIF9uZWdhdGVkIHZlcnNpb25fIG9mIHRoZVxuXHRcdFx0ICogZ2l2ZW4gY2xhc3MgaXMganVzdCB0aGUgZ2l2ZW4gY2xhc3Mgd2l0aCBhIGBuby1gIHByZWZpeC5cblx0XHRcdCAqXG5cdFx0XHQgKiBXaGV0aGVyIHRoZSBjbGFzcyBpcyBhY3RpdmUgaXMgZGV0ZXJtaW5lZCBieSB0aGUgY2xvc2VzdCBhbmNlc3RvciBvZiBgZWxlbWVudGAgKHdoZXJlIGBlbGVtZW50YCBpdHNlbGYgaXNcblx0XHRcdCAqIGNsb3Nlc3QgYW5jZXN0b3IpIHRoYXQgaGFzIHRoZSBnaXZlbiBjbGFzcyBvciB0aGUgbmVnYXRlZCB2ZXJzaW9uIG9mIGl0LiBJZiBuZWl0aGVyIGBlbGVtZW50YCBub3IgYW55IG9mIGl0c1xuXHRcdFx0ICogYW5jZXN0b3JzIGhhdmUgdGhlIGdpdmVuIGNsYXNzIG9yIHRoZSBuZWdhdGVkIHZlcnNpb24gb2YgaXQsIHRoZW4gdGhlIGRlZmF1bHQgYWN0aXZhdGlvbiB3aWxsIGJlIHJldHVybmVkLlxuXHRcdFx0ICpcblx0XHRcdCAqIEluIHRoZSBwYXJhZG94aWNhbCBzaXR1YXRpb24gd2hlcmUgdGhlIGNsb3Nlc3QgYW5jZXN0b3IgY29udGFpbnMgX19ib3RoX18gdGhlIGdpdmVuIGNsYXNzIGFuZCB0aGUgbmVnYXRlZFxuXHRcdFx0ICogdmVyc2lvbiBvZiBpdCwgdGhlIGNsYXNzIGlzIGNvbnNpZGVyZWQgYWN0aXZlLlxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxuXHRcdFx0ICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxuXHRcdFx0ICogQHBhcmFtIHtib29sZWFufSBbZGVmYXVsdEFjdGl2YXRpb249ZmFsc2VdXG5cdFx0XHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cblx0XHRcdCAqL1xuXHRcdFx0aXNBY3RpdmU6IGZ1bmN0aW9uIChlbGVtZW50LCBjbGFzc05hbWUsIGRlZmF1bHRBY3RpdmF0aW9uKSB7XG5cdFx0XHRcdHZhciBubyA9ICduby0nICsgY2xhc3NOYW1lO1xuXG5cdFx0XHRcdHdoaWxlIChlbGVtZW50KSB7XG5cdFx0XHRcdFx0dmFyIGNsYXNzTGlzdCA9IGVsZW1lbnQuY2xhc3NMaXN0O1xuXHRcdFx0XHRcdGlmIChjbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChjbGFzc0xpc3QuY29udGFpbnMobm8pKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsZW1lbnQgPSBlbGVtZW50LnBhcmVudEVsZW1lbnQ7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuICEhZGVmYXVsdEFjdGl2YXRpb247XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIFRoaXMgbmFtZXNwYWNlIGNvbnRhaW5zIGFsbCBjdXJyZW50bHkgbG9hZGVkIGxhbmd1YWdlcyBhbmQgdGhlIHNvbWUgaGVscGVyIGZ1bmN0aW9ucyB0byBjcmVhdGUgYW5kIG1vZGlmeSBsYW5ndWFnZXMuXG5cdFx0ICpcblx0XHQgKiBAbmFtZXNwYWNlXG5cdFx0ICogQG1lbWJlcm9mIFByaXNtXG5cdFx0ICogQHB1YmxpY1xuXHRcdCAqL1xuXHRcdGxhbmd1YWdlczoge1xuXHRcdFx0LyoqXG5cdFx0XHQgKiBUaGUgZ3JhbW1hciBmb3IgcGxhaW4sIHVuZm9ybWF0dGVkIHRleHQuXG5cdFx0XHQgKi9cblx0XHRcdHBsYWluOiBwbGFpblRleHRHcmFtbWFyLFxuXHRcdFx0cGxhaW50ZXh0OiBwbGFpblRleHRHcmFtbWFyLFxuXHRcdFx0dGV4dDogcGxhaW5UZXh0R3JhbW1hcixcblx0XHRcdHR4dDogcGxhaW5UZXh0R3JhbW1hcixcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBDcmVhdGVzIGEgZGVlcCBjb3B5IG9mIHRoZSBsYW5ndWFnZSB3aXRoIHRoZSBnaXZlbiBpZCBhbmQgYXBwZW5kcyB0aGUgZ2l2ZW4gdG9rZW5zLlxuXHRcdFx0ICpcblx0XHRcdCAqIElmIGEgdG9rZW4gaW4gYHJlZGVmYCBhbHNvIGFwcGVhcnMgaW4gdGhlIGNvcGllZCBsYW5ndWFnZSwgdGhlbiB0aGUgZXhpc3RpbmcgdG9rZW4gaW4gdGhlIGNvcGllZCBsYW5ndWFnZVxuXHRcdFx0ICogd2lsbCBiZSBvdmVyd3JpdHRlbiBhdCBpdHMgb3JpZ2luYWwgcG9zaXRpb24uXG5cdFx0XHQgKlxuXHRcdFx0ICogIyMgQmVzdCBwcmFjdGljZXNcblx0XHRcdCAqXG5cdFx0XHQgKiBTaW5jZSB0aGUgcG9zaXRpb24gb2Ygb3ZlcndyaXRpbmcgdG9rZW5zICh0b2tlbiBpbiBgcmVkZWZgIHRoYXQgb3ZlcndyaXRlIHRva2VucyBpbiB0aGUgY29waWVkIGxhbmd1YWdlKVxuXHRcdFx0ICogZG9lc24ndCBtYXR0ZXIsIHRoZXkgY2FuIHRlY2huaWNhbGx5IGJlIGluIGFueSBvcmRlci4gSG93ZXZlciwgdGhpcyBjYW4gYmUgY29uZnVzaW5nIHRvIG90aGVycyB0aGF0IHRyeWluZyB0b1xuXHRcdFx0ICogdW5kZXJzdGFuZCB0aGUgbGFuZ3VhZ2UgZGVmaW5pdGlvbiBiZWNhdXNlLCBub3JtYWxseSwgdGhlIG9yZGVyIG9mIHRva2VucyBtYXR0ZXJzIGluIFByaXNtIGdyYW1tYXJzLlxuXHRcdFx0ICpcblx0XHRcdCAqIFRoZXJlZm9yZSwgaXQgaXMgZW5jb3VyYWdlZCB0byBvcmRlciBvdmVyd3JpdGluZyB0b2tlbnMgYWNjb3JkaW5nIHRvIHRoZSBwb3NpdGlvbnMgb2YgdGhlIG92ZXJ3cml0dGVuIHRva2Vucy5cblx0XHRcdCAqIEZ1cnRoZXJtb3JlLCBhbGwgbm9uLW92ZXJ3cml0aW5nIHRva2VucyBzaG91bGQgYmUgcGxhY2VkIGFmdGVyIHRoZSBvdmVyd3JpdGluZyBvbmVzLlxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBpZCBUaGUgaWQgb2YgdGhlIGxhbmd1YWdlIHRvIGV4dGVuZC4gVGhpcyBoYXMgdG8gYmUgYSBrZXkgaW4gYFByaXNtLmxhbmd1YWdlc2AuXG5cdFx0XHQgKiBAcGFyYW0ge0dyYW1tYXJ9IHJlZGVmIFRoZSBuZXcgdG9rZW5zIHRvIGFwcGVuZC5cblx0XHRcdCAqIEByZXR1cm5zIHtHcmFtbWFyfSBUaGUgbmV3IGxhbmd1YWdlIGNyZWF0ZWQuXG5cdFx0XHQgKiBAcHVibGljXG5cdFx0XHQgKiBAZXhhbXBsZVxuXHRcdFx0ICogUHJpc20ubGFuZ3VhZ2VzWydjc3Mtd2l0aC1jb2xvcnMnXSA9IFByaXNtLmxhbmd1YWdlcy5leHRlbmQoJ2NzcycsIHtcblx0XHRcdCAqICAgICAvLyBQcmlzbS5sYW5ndWFnZXMuY3NzIGFscmVhZHkgaGFzIGEgJ2NvbW1lbnQnIHRva2VuLCBzbyB0aGlzIHRva2VuIHdpbGwgb3ZlcndyaXRlIENTUycgJ2NvbW1lbnQnIHRva2VuXG5cdFx0XHQgKiAgICAgLy8gYXQgaXRzIG9yaWdpbmFsIHBvc2l0aW9uXG5cdFx0XHQgKiAgICAgJ2NvbW1lbnQnOiB7IC4uLiB9LFxuXHRcdFx0ICogICAgIC8vIENTUyBkb2Vzbid0IGhhdmUgYSAnY29sb3InIHRva2VuLCBzbyB0aGlzIHRva2VuIHdpbGwgYmUgYXBwZW5kZWRcblx0XHRcdCAqICAgICAnY29sb3InOiAvXFxiKD86cmVkfGdyZWVufGJsdWUpXFxiL1xuXHRcdFx0ICogfSk7XG5cdFx0XHQgKi9cblx0XHRcdGV4dGVuZDogZnVuY3Rpb24gKGlkLCByZWRlZikge1xuXHRcdFx0XHR2YXIgbGFuZyA9IF8udXRpbC5jbG9uZShfLmxhbmd1YWdlc1tpZF0pO1xuXG5cdFx0XHRcdGZvciAodmFyIGtleSBpbiByZWRlZikge1xuXHRcdFx0XHRcdGxhbmdba2V5XSA9IHJlZGVmW2tleV07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gbGFuZztcblx0XHRcdH0sXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogSW5zZXJ0cyB0b2tlbnMgX2JlZm9yZV8gYW5vdGhlciB0b2tlbiBpbiBhIGxhbmd1YWdlIGRlZmluaXRpb24gb3IgYW55IG90aGVyIGdyYW1tYXIuXG5cdFx0XHQgKlxuXHRcdFx0ICogIyMgVXNhZ2Vcblx0XHRcdCAqXG5cdFx0XHQgKiBUaGlzIGhlbHBlciBtZXRob2QgbWFrZXMgaXQgZWFzeSB0byBtb2RpZnkgZXhpc3RpbmcgbGFuZ3VhZ2VzLiBGb3IgZXhhbXBsZSwgdGhlIENTUyBsYW5ndWFnZSBkZWZpbml0aW9uXG5cdFx0XHQgKiBub3Qgb25seSBkZWZpbmVzIENTUyBoaWdobGlnaHRpbmcgZm9yIENTUyBkb2N1bWVudHMsIGJ1dCBhbHNvIG5lZWRzIHRvIGRlZmluZSBoaWdobGlnaHRpbmcgZm9yIENTUyBlbWJlZGRlZFxuXHRcdFx0ICogaW4gSFRNTCB0aHJvdWdoIGA8c3R5bGU+YCBlbGVtZW50cy4gVG8gZG8gdGhpcywgaXQgbmVlZHMgdG8gbW9kaWZ5IGBQcmlzbS5sYW5ndWFnZXMubWFya3VwYCBhbmQgYWRkIHRoZVxuXHRcdFx0ICogYXBwcm9wcmlhdGUgdG9rZW5zLiBIb3dldmVyLCBgUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cGAgaXMgYSByZWd1bGFyIEphdmFTY3JpcHQgb2JqZWN0IGxpdGVyYWwsIHNvIGlmIHlvdSBkb1xuXHRcdFx0ICogdGhpczpcblx0XHRcdCAqXG5cdFx0XHQgKiBgYGBqc1xuXHRcdFx0ICogUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cC5zdHlsZSA9IHtcblx0XHRcdCAqICAgICAvLyB0b2tlblxuXHRcdFx0ICogfTtcblx0XHRcdCAqIGBgYFxuXHRcdFx0ICpcblx0XHRcdCAqIHRoZW4gdGhlIGBzdHlsZWAgdG9rZW4gd2lsbCBiZSBhZGRlZCAoYW5kIHByb2Nlc3NlZCkgYXQgdGhlIGVuZC4gYGluc2VydEJlZm9yZWAgYWxsb3dzIHlvdSB0byBpbnNlcnQgdG9rZW5zXG5cdFx0XHQgKiBiZWZvcmUgZXhpc3RpbmcgdG9rZW5zLiBGb3IgdGhlIENTUyBleGFtcGxlIGFib3ZlLCB5b3Ugd291bGQgdXNlIGl0IGxpa2UgdGhpczpcblx0XHRcdCAqXG5cdFx0XHQgKiBgYGBqc1xuXHRcdFx0ICogUHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnbWFya3VwJywgJ2NkYXRhJywge1xuXHRcdFx0ICogICAgICdzdHlsZSc6IHtcblx0XHRcdCAqICAgICAgICAgLy8gdG9rZW5cblx0XHRcdCAqICAgICB9XG5cdFx0XHQgKiB9KTtcblx0XHRcdCAqIGBgYFxuXHRcdFx0ICpcblx0XHRcdCAqICMjIFNwZWNpYWwgY2FzZXNcblx0XHRcdCAqXG5cdFx0XHQgKiBJZiB0aGUgZ3JhbW1hcnMgb2YgYGluc2lkZWAgYW5kIGBpbnNlcnRgIGhhdmUgdG9rZW5zIHdpdGggdGhlIHNhbWUgbmFtZSwgdGhlIHRva2VucyBpbiBgaW5zaWRlYCdzIGdyYW1tYXJcblx0XHRcdCAqIHdpbGwgYmUgaWdub3JlZC5cblx0XHRcdCAqXG5cdFx0XHQgKiBUaGlzIGJlaGF2aW9yIGNhbiBiZSB1c2VkIHRvIGluc2VydCB0b2tlbnMgYWZ0ZXIgYGJlZm9yZWA6XG5cdFx0XHQgKlxuXHRcdFx0ICogYGBganNcblx0XHRcdCAqIFByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ21hcmt1cCcsICdjb21tZW50Jywge1xuXHRcdFx0ICogICAgICdjb21tZW50JzogUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cC5jb21tZW50LFxuXHRcdFx0ICogICAgIC8vIHRva2VucyBhZnRlciAnY29tbWVudCdcblx0XHRcdCAqIH0pO1xuXHRcdFx0ICogYGBgXG5cdFx0XHQgKlxuXHRcdFx0ICogIyMgTGltaXRhdGlvbnNcblx0XHRcdCAqXG5cdFx0XHQgKiBUaGUgbWFpbiBwcm9ibGVtIGBpbnNlcnRCZWZvcmVgIGhhcyB0byBzb2x2ZSBpcyBpdGVyYXRpb24gb3JkZXIuIFNpbmNlIEVTMjAxNSwgdGhlIGl0ZXJhdGlvbiBvcmRlciBmb3Igb2JqZWN0XG5cdFx0XHQgKiBwcm9wZXJ0aWVzIGlzIGd1YXJhbnRlZWQgdG8gYmUgdGhlIGluc2VydGlvbiBvcmRlciAoZXhjZXB0IGZvciBpbnRlZ2VyIGtleXMpIGJ1dCBzb21lIGJyb3dzZXJzIGJlaGF2ZVxuXHRcdFx0ICogZGlmZmVyZW50bHkgd2hlbiBrZXlzIGFyZSBkZWxldGVkIGFuZCByZS1pbnNlcnRlZC4gU28gYGluc2VydEJlZm9yZWAgY2FuJ3QgYmUgaW1wbGVtZW50ZWQgYnkgdGVtcG9yYXJpbHlcblx0XHRcdCAqIGRlbGV0aW5nIHByb3BlcnRpZXMgd2hpY2ggaXMgbmVjZXNzYXJ5IHRvIGluc2VydCBhdCBhcmJpdHJhcnkgcG9zaXRpb25zLlxuXHRcdFx0ICpcblx0XHRcdCAqIFRvIHNvbHZlIHRoaXMgcHJvYmxlbSwgYGluc2VydEJlZm9yZWAgZG9lc24ndCBhY3R1YWxseSBpbnNlcnQgdGhlIGdpdmVuIHRva2VucyBpbnRvIHRoZSB0YXJnZXQgb2JqZWN0LlxuXHRcdFx0ICogSW5zdGVhZCwgaXQgd2lsbCBjcmVhdGUgYSBuZXcgb2JqZWN0IGFuZCByZXBsYWNlIGFsbCByZWZlcmVuY2VzIHRvIHRoZSB0YXJnZXQgb2JqZWN0IHdpdGggdGhlIG5ldyBvbmUuIFRoaXNcblx0XHRcdCAqIGNhbiBiZSBkb25lIHdpdGhvdXQgdGVtcG9yYXJpbHkgZGVsZXRpbmcgcHJvcGVydGllcywgc28gdGhlIGl0ZXJhdGlvbiBvcmRlciBpcyB3ZWxsLWRlZmluZWQuXG5cdFx0XHQgKlxuXHRcdFx0ICogSG93ZXZlciwgb25seSByZWZlcmVuY2VzIHRoYXQgY2FuIGJlIHJlYWNoZWQgZnJvbSBgUHJpc20ubGFuZ3VhZ2VzYCBvciBgaW5zZXJ0YCB3aWxsIGJlIHJlcGxhY2VkLiBJLmUuIGlmXG5cdFx0XHQgKiB5b3UgaG9sZCB0aGUgdGFyZ2V0IG9iamVjdCBpbiBhIHZhcmlhYmxlLCB0aGVuIHRoZSB2YWx1ZSBvZiB0aGUgdmFyaWFibGUgd2lsbCBub3QgY2hhbmdlLlxuXHRcdFx0ICpcblx0XHRcdCAqIGBgYGpzXG5cdFx0XHQgKiB2YXIgb2xkTWFya3VwID0gUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cDtcblx0XHRcdCAqIHZhciBuZXdNYXJrdXAgPSBQcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdtYXJrdXAnLCAnY29tbWVudCcsIHsgLi4uIH0pO1xuXHRcdFx0ICpcblx0XHRcdCAqIGFzc2VydChvbGRNYXJrdXAgIT09IFByaXNtLmxhbmd1YWdlcy5tYXJrdXApO1xuXHRcdFx0ICogYXNzZXJ0KG5ld01hcmt1cCA9PT0gUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cCk7XG5cdFx0XHQgKiBgYGBcblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0ge3N0cmluZ30gaW5zaWRlIFRoZSBwcm9wZXJ0eSBvZiBgcm9vdGAgKGUuZy4gYSBsYW5ndWFnZSBpZCBpbiBgUHJpc20ubGFuZ3VhZ2VzYCkgdGhhdCBjb250YWlucyB0aGVcblx0XHRcdCAqIG9iamVjdCB0byBiZSBtb2RpZmllZC5cblx0XHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBiZWZvcmUgVGhlIGtleSB0byBpbnNlcnQgYmVmb3JlLlxuXHRcdFx0ICogQHBhcmFtIHtHcmFtbWFyfSBpbnNlcnQgQW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGtleS12YWx1ZSBwYWlycyB0byBiZSBpbnNlcnRlZC5cblx0XHRcdCAqIEBwYXJhbSB7T2JqZWN0PHN0cmluZywgYW55Pn0gW3Jvb3RdIFRoZSBvYmplY3QgY29udGFpbmluZyBgaW5zaWRlYCwgaS5lLiB0aGUgb2JqZWN0IHRoYXQgY29udGFpbnMgdGhlXG5cdFx0XHQgKiBvYmplY3QgdG8gYmUgbW9kaWZpZWQuXG5cdFx0XHQgKlxuXHRcdFx0ICogRGVmYXVsdHMgdG8gYFByaXNtLmxhbmd1YWdlc2AuXG5cdFx0XHQgKiBAcmV0dXJucyB7R3JhbW1hcn0gVGhlIG5ldyBncmFtbWFyIG9iamVjdC5cblx0XHRcdCAqIEBwdWJsaWNcblx0XHRcdCAqL1xuXHRcdFx0aW5zZXJ0QmVmb3JlOiBmdW5jdGlvbiAoaW5zaWRlLCBiZWZvcmUsIGluc2VydCwgcm9vdCkge1xuXHRcdFx0XHRyb290ID0gcm9vdCB8fCAvKiogQHR5cGUge2FueX0gKi8gKF8ubGFuZ3VhZ2VzKTtcblx0XHRcdFx0dmFyIGdyYW1tYXIgPSByb290W2luc2lkZV07XG5cdFx0XHRcdC8qKiBAdHlwZSB7R3JhbW1hcn0gKi9cblx0XHRcdFx0dmFyIHJldCA9IHt9O1xuXG5cdFx0XHRcdGZvciAodmFyIHRva2VuIGluIGdyYW1tYXIpIHtcblx0XHRcdFx0XHRpZiAoZ3JhbW1hci5oYXNPd25Qcm9wZXJ0eSh0b2tlbikpIHtcblxuXHRcdFx0XHRcdFx0aWYgKHRva2VuID09IGJlZm9yZSkge1xuXHRcdFx0XHRcdFx0XHRmb3IgKHZhciBuZXdUb2tlbiBpbiBpbnNlcnQpIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoaW5zZXJ0Lmhhc093blByb3BlcnR5KG5ld1Rva2VuKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0cmV0W25ld1Rva2VuXSA9IGluc2VydFtuZXdUb2tlbl07XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8vIERvIG5vdCBpbnNlcnQgdG9rZW4gd2hpY2ggYWxzbyBvY2N1ciBpbiBpbnNlcnQuIFNlZSAjMTUyNVxuXHRcdFx0XHRcdFx0aWYgKCFpbnNlcnQuaGFzT3duUHJvcGVydHkodG9rZW4pKSB7XG5cdFx0XHRcdFx0XHRcdHJldFt0b2tlbl0gPSBncmFtbWFyW3Rva2VuXTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgb2xkID0gcm9vdFtpbnNpZGVdO1xuXHRcdFx0XHRyb290W2luc2lkZV0gPSByZXQ7XG5cblx0XHRcdFx0Ly8gVXBkYXRlIHJlZmVyZW5jZXMgaW4gb3RoZXIgbGFuZ3VhZ2UgZGVmaW5pdGlvbnNcblx0XHRcdFx0Xy5sYW5ndWFnZXMuREZTKF8ubGFuZ3VhZ2VzLCBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuXHRcdFx0XHRcdGlmICh2YWx1ZSA9PT0gb2xkICYmIGtleSAhPSBpbnNpZGUpIHtcblx0XHRcdFx0XHRcdHRoaXNba2V5XSA9IHJldDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdHJldHVybiByZXQ7XG5cdFx0XHR9LFxuXG5cdFx0XHQvLyBUcmF2ZXJzZSBhIGxhbmd1YWdlIGRlZmluaXRpb24gd2l0aCBEZXB0aCBGaXJzdCBTZWFyY2hcblx0XHRcdERGUzogZnVuY3Rpb24gREZTKG8sIGNhbGxiYWNrLCB0eXBlLCB2aXNpdGVkKSB7XG5cdFx0XHRcdHZpc2l0ZWQgPSB2aXNpdGVkIHx8IHt9O1xuXG5cdFx0XHRcdHZhciBvYmpJZCA9IF8udXRpbC5vYmpJZDtcblxuXHRcdFx0XHRmb3IgKHZhciBpIGluIG8pIHtcblx0XHRcdFx0XHRpZiAoby5oYXNPd25Qcm9wZXJ0eShpKSkge1xuXHRcdFx0XHRcdFx0Y2FsbGJhY2suY2FsbChvLCBpLCBvW2ldLCB0eXBlIHx8IGkpO1xuXG5cdFx0XHRcdFx0XHR2YXIgcHJvcGVydHkgPSBvW2ldO1xuXHRcdFx0XHRcdFx0dmFyIHByb3BlcnR5VHlwZSA9IF8udXRpbC50eXBlKHByb3BlcnR5KTtcblxuXHRcdFx0XHRcdFx0aWYgKHByb3BlcnR5VHlwZSA9PT0gJ09iamVjdCcgJiYgIXZpc2l0ZWRbb2JqSWQocHJvcGVydHkpXSkge1xuXHRcdFx0XHRcdFx0XHR2aXNpdGVkW29iaklkKHByb3BlcnR5KV0gPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRERlMocHJvcGVydHksIGNhbGxiYWNrLCBudWxsLCB2aXNpdGVkKTtcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAocHJvcGVydHlUeXBlID09PSAnQXJyYXknICYmICF2aXNpdGVkW29iaklkKHByb3BlcnR5KV0pIHtcblx0XHRcdFx0XHRcdFx0dmlzaXRlZFtvYmpJZChwcm9wZXJ0eSldID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0REZTKHByb3BlcnR5LCBjYWxsYmFjaywgaSwgdmlzaXRlZCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdHBsdWdpbnM6IHt9LFxuXG5cdFx0LyoqXG5cdFx0ICogVGhpcyBpcyB0aGUgbW9zdCBoaWdoLWxldmVsIGZ1bmN0aW9uIGluIFByaXNt4oCZcyBBUEkuXG5cdFx0ICogSXQgZmV0Y2hlcyBhbGwgdGhlIGVsZW1lbnRzIHRoYXQgaGF2ZSBhIGAubGFuZ3VhZ2UteHh4eGAgY2xhc3MgYW5kIHRoZW4gY2FsbHMge0BsaW5rIFByaXNtLmhpZ2hsaWdodEVsZW1lbnR9IG9uXG5cdFx0ICogZWFjaCBvbmUgb2YgdGhlbS5cblx0XHQgKlxuXHRcdCAqIFRoaXMgaXMgZXF1aXZhbGVudCB0byBgUHJpc20uaGlnaGxpZ2h0QWxsVW5kZXIoZG9jdW1lbnQsIGFzeW5jLCBjYWxsYmFjaylgLlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHtib29sZWFufSBbYXN5bmM9ZmFsc2VdIFNhbWUgYXMgaW4ge0BsaW5rIFByaXNtLmhpZ2hsaWdodEFsbFVuZGVyfS5cblx0XHQgKiBAcGFyYW0ge0hpZ2hsaWdodENhbGxiYWNrfSBbY2FsbGJhY2tdIFNhbWUgYXMgaW4ge0BsaW5rIFByaXNtLmhpZ2hsaWdodEFsbFVuZGVyfS5cblx0XHQgKiBAbWVtYmVyb2YgUHJpc21cblx0XHQgKiBAcHVibGljXG5cdFx0ICovXG5cdFx0aGlnaGxpZ2h0QWxsOiBmdW5jdGlvbiAoYXN5bmMsIGNhbGxiYWNrKSB7XG5cdFx0XHRfLmhpZ2hsaWdodEFsbFVuZGVyKGRvY3VtZW50LCBhc3luYywgY2FsbGJhY2spO1xuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBGZXRjaGVzIGFsbCB0aGUgZGVzY2VuZGFudHMgb2YgYGNvbnRhaW5lcmAgdGhhdCBoYXZlIGEgYC5sYW5ndWFnZS14eHh4YCBjbGFzcyBhbmQgdGhlbiBjYWxsc1xuXHRcdCAqIHtAbGluayBQcmlzbS5oaWdobGlnaHRFbGVtZW50fSBvbiBlYWNoIG9uZSBvZiB0aGVtLlxuXHRcdCAqXG5cdFx0ICogVGhlIGZvbGxvd2luZyBob29rcyB3aWxsIGJlIHJ1bjpcblx0XHQgKiAxLiBgYmVmb3JlLWhpZ2hsaWdodGFsbGBcblx0XHQgKiAyLiBgYmVmb3JlLWFsbC1lbGVtZW50cy1oaWdobGlnaHRgXG5cdFx0ICogMy4gQWxsIGhvb2tzIG9mIHtAbGluayBQcmlzbS5oaWdobGlnaHRFbGVtZW50fSBmb3IgZWFjaCBlbGVtZW50LlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHtQYXJlbnROb2RlfSBjb250YWluZXIgVGhlIHJvb3QgZWxlbWVudCwgd2hvc2UgZGVzY2VuZGFudHMgdGhhdCBoYXZlIGEgYC5sYW5ndWFnZS14eHh4YCBjbGFzcyB3aWxsIGJlIGhpZ2hsaWdodGVkLlxuXHRcdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW2FzeW5jPWZhbHNlXSBXaGV0aGVyIGVhY2ggZWxlbWVudCBpcyB0byBiZSBoaWdobGlnaHRlZCBhc3luY2hyb25vdXNseSB1c2luZyBXZWIgV29ya2Vycy5cblx0XHQgKiBAcGFyYW0ge0hpZ2hsaWdodENhbGxiYWNrfSBbY2FsbGJhY2tdIEFuIG9wdGlvbmFsIGNhbGxiYWNrIHRvIGJlIGludm9rZWQgb24gZWFjaCBlbGVtZW50IGFmdGVyIGl0cyBoaWdobGlnaHRpbmcgaXMgZG9uZS5cblx0XHQgKiBAbWVtYmVyb2YgUHJpc21cblx0XHQgKiBAcHVibGljXG5cdFx0ICovXG5cdFx0aGlnaGxpZ2h0QWxsVW5kZXI6IGZ1bmN0aW9uIChjb250YWluZXIsIGFzeW5jLCBjYWxsYmFjaykge1xuXHRcdFx0dmFyIGVudiA9IHtcblx0XHRcdFx0Y2FsbGJhY2s6IGNhbGxiYWNrLFxuXHRcdFx0XHRjb250YWluZXI6IGNvbnRhaW5lcixcblx0XHRcdFx0c2VsZWN0b3I6ICdjb2RlW2NsYXNzKj1cImxhbmd1YWdlLVwiXSwgW2NsYXNzKj1cImxhbmd1YWdlLVwiXSBjb2RlLCBjb2RlW2NsYXNzKj1cImxhbmctXCJdLCBbY2xhc3MqPVwibGFuZy1cIl0gY29kZSdcblx0XHRcdH07XG5cblx0XHRcdF8uaG9va3MucnVuKCdiZWZvcmUtaGlnaGxpZ2h0YWxsJywgZW52KTtcblxuXHRcdFx0ZW52LmVsZW1lbnRzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmFwcGx5KGVudi5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbChlbnYuc2VsZWN0b3IpKTtcblxuXHRcdFx0Xy5ob29rcy5ydW4oJ2JlZm9yZS1hbGwtZWxlbWVudHMtaGlnaGxpZ2h0JywgZW52KTtcblxuXHRcdFx0Zm9yICh2YXIgaSA9IDAsIGVsZW1lbnQ7IChlbGVtZW50ID0gZW52LmVsZW1lbnRzW2krK10pOykge1xuXHRcdFx0XHRfLmhpZ2hsaWdodEVsZW1lbnQoZWxlbWVudCwgYXN5bmMgPT09IHRydWUsIGVudi5jYWxsYmFjayk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIEhpZ2hsaWdodHMgdGhlIGNvZGUgaW5zaWRlIGEgc2luZ2xlIGVsZW1lbnQuXG5cdFx0ICpcblx0XHQgKiBUaGUgZm9sbG93aW5nIGhvb2tzIHdpbGwgYmUgcnVuOlxuXHRcdCAqIDEuIGBiZWZvcmUtc2FuaXR5LWNoZWNrYFxuXHRcdCAqIDIuIGBiZWZvcmUtaGlnaGxpZ2h0YFxuXHRcdCAqIDMuIEFsbCBob29rcyBvZiB7QGxpbmsgUHJpc20uaGlnaGxpZ2h0fS4gVGhlc2UgaG9va3Mgd2lsbCBiZSBydW4gYnkgYW4gYXN5bmNocm9ub3VzIHdvcmtlciBpZiBgYXN5bmNgIGlzIGB0cnVlYC5cblx0XHQgKiA0LiBgYmVmb3JlLWluc2VydGBcblx0XHQgKiA1LiBgYWZ0ZXItaGlnaGxpZ2h0YFxuXHRcdCAqIDYuIGBjb21wbGV0ZWBcblx0XHQgKlxuXHRcdCAqIFNvbWUgdGhlIGFib3ZlIGhvb2tzIHdpbGwgYmUgc2tpcHBlZCBpZiB0aGUgZWxlbWVudCBkb2Vzbid0IGNvbnRhaW4gYW55IHRleHQgb3IgdGhlcmUgaXMgbm8gZ3JhbW1hciBsb2FkZWQgZm9yXG5cdFx0ICogdGhlIGVsZW1lbnQncyBsYW5ndWFnZS5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCBjb250YWluaW5nIHRoZSBjb2RlLlxuXHRcdCAqIEl0IG11c3QgaGF2ZSBhIGNsYXNzIG9mIGBsYW5ndWFnZS14eHh4YCB0byBiZSBwcm9jZXNzZWQsIHdoZXJlIGB4eHh4YCBpcyBhIHZhbGlkIGxhbmd1YWdlIGlkZW50aWZpZXIuXG5cdFx0ICogQHBhcmFtIHtib29sZWFufSBbYXN5bmM9ZmFsc2VdIFdoZXRoZXIgdGhlIGVsZW1lbnQgaXMgdG8gYmUgaGlnaGxpZ2h0ZWQgYXN5bmNocm9ub3VzbHkgdXNpbmcgV2ViIFdvcmtlcnNcblx0XHQgKiB0byBpbXByb3ZlIHBlcmZvcm1hbmNlIGFuZCBhdm9pZCBibG9ja2luZyB0aGUgVUkgd2hlbiBoaWdobGlnaHRpbmcgdmVyeSBsYXJnZSBjaHVua3Mgb2YgY29kZS4gVGhpcyBvcHRpb24gaXNcblx0XHQgKiBbZGlzYWJsZWQgYnkgZGVmYXVsdF0oaHR0cHM6Ly9wcmlzbWpzLmNvbS9mYXEuaHRtbCN3aHktaXMtYXN5bmNocm9ub3VzLWhpZ2hsaWdodGluZy1kaXNhYmxlZC1ieS1kZWZhdWx0KS5cblx0XHQgKlxuXHRcdCAqIE5vdGU6IEFsbCBsYW5ndWFnZSBkZWZpbml0aW9ucyByZXF1aXJlZCB0byBoaWdobGlnaHQgdGhlIGNvZGUgbXVzdCBiZSBpbmNsdWRlZCBpbiB0aGUgbWFpbiBgcHJpc20uanNgIGZpbGUgZm9yXG5cdFx0ICogYXN5bmNocm9ub3VzIGhpZ2hsaWdodGluZyB0byB3b3JrLiBZb3UgY2FuIGJ1aWxkIHlvdXIgb3duIGJ1bmRsZSBvbiB0aGVcblx0XHQgKiBbRG93bmxvYWQgcGFnZV0oaHR0cHM6Ly9wcmlzbWpzLmNvbS9kb3dubG9hZC5odG1sKS5cblx0XHQgKiBAcGFyYW0ge0hpZ2hsaWdodENhbGxiYWNrfSBbY2FsbGJhY2tdIEFuIG9wdGlvbmFsIGNhbGxiYWNrIHRvIGJlIGludm9rZWQgYWZ0ZXIgdGhlIGhpZ2hsaWdodGluZyBpcyBkb25lLlxuXHRcdCAqIE1vc3RseSB1c2VmdWwgd2hlbiBgYXN5bmNgIGlzIGB0cnVlYCwgc2luY2UgaW4gdGhhdCBjYXNlLCB0aGUgaGlnaGxpZ2h0aW5nIGlzIGRvbmUgYXN5bmNocm9ub3VzbHkuXG5cdFx0ICogQG1lbWJlcm9mIFByaXNtXG5cdFx0ICogQHB1YmxpY1xuXHRcdCAqL1xuXHRcdGhpZ2hsaWdodEVsZW1lbnQ6IGZ1bmN0aW9uIChlbGVtZW50LCBhc3luYywgY2FsbGJhY2spIHtcblx0XHRcdC8vIEZpbmQgbGFuZ3VhZ2Vcblx0XHRcdHZhciBsYW5ndWFnZSA9IF8udXRpbC5nZXRMYW5ndWFnZShlbGVtZW50KTtcblx0XHRcdHZhciBncmFtbWFyID0gXy5sYW5ndWFnZXNbbGFuZ3VhZ2VdO1xuXG5cdFx0XHQvLyBTZXQgbGFuZ3VhZ2Ugb24gdGhlIGVsZW1lbnQsIGlmIG5vdCBwcmVzZW50XG5cdFx0XHRfLnV0aWwuc2V0TGFuZ3VhZ2UoZWxlbWVudCwgbGFuZ3VhZ2UpO1xuXG5cdFx0XHQvLyBTZXQgbGFuZ3VhZ2Ugb24gdGhlIHBhcmVudCwgZm9yIHN0eWxpbmdcblx0XHRcdHZhciBwYXJlbnQgPSBlbGVtZW50LnBhcmVudEVsZW1lbnQ7XG5cdFx0XHRpZiAocGFyZW50ICYmIHBhcmVudC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSAncHJlJykge1xuXHRcdFx0XHRfLnV0aWwuc2V0TGFuZ3VhZ2UocGFyZW50LCBsYW5ndWFnZSk7XG5cdFx0XHR9XG5cblx0XHRcdHZhciBjb2RlID0gZWxlbWVudC50ZXh0Q29udGVudDtcblxuXHRcdFx0dmFyIGVudiA9IHtcblx0XHRcdFx0ZWxlbWVudDogZWxlbWVudCxcblx0XHRcdFx0bGFuZ3VhZ2U6IGxhbmd1YWdlLFxuXHRcdFx0XHRncmFtbWFyOiBncmFtbWFyLFxuXHRcdFx0XHRjb2RlOiBjb2RlXG5cdFx0XHR9O1xuXG5cdFx0XHRmdW5jdGlvbiBpbnNlcnRIaWdobGlnaHRlZENvZGUoaGlnaGxpZ2h0ZWRDb2RlKSB7XG5cdFx0XHRcdGVudi5oaWdobGlnaHRlZENvZGUgPSBoaWdobGlnaHRlZENvZGU7XG5cblx0XHRcdFx0Xy5ob29rcy5ydW4oJ2JlZm9yZS1pbnNlcnQnLCBlbnYpO1xuXG5cdFx0XHRcdGVudi5lbGVtZW50LmlubmVySFRNTCA9IGVudi5oaWdobGlnaHRlZENvZGU7XG5cblx0XHRcdFx0Xy5ob29rcy5ydW4oJ2FmdGVyLWhpZ2hsaWdodCcsIGVudik7XG5cdFx0XHRcdF8uaG9va3MucnVuKCdjb21wbGV0ZScsIGVudik7XG5cdFx0XHRcdGNhbGxiYWNrICYmIGNhbGxiYWNrLmNhbGwoZW52LmVsZW1lbnQpO1xuXHRcdFx0fVxuXG5cdFx0XHRfLmhvb2tzLnJ1bignYmVmb3JlLXNhbml0eS1jaGVjaycsIGVudik7XG5cblx0XHRcdC8vIHBsdWdpbnMgbWF5IGNoYW5nZS9hZGQgdGhlIHBhcmVudC9lbGVtZW50XG5cdFx0XHRwYXJlbnQgPSBlbnYuZWxlbWVudC5wYXJlbnRFbGVtZW50O1xuXHRcdFx0aWYgKHBhcmVudCAmJiBwYXJlbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3ByZScgJiYgIXBhcmVudC5oYXNBdHRyaWJ1dGUoJ3RhYmluZGV4JykpIHtcblx0XHRcdFx0cGFyZW50LnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAnMCcpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIWVudi5jb2RlKSB7XG5cdFx0XHRcdF8uaG9va3MucnVuKCdjb21wbGV0ZScsIGVudik7XG5cdFx0XHRcdGNhbGxiYWNrICYmIGNhbGxiYWNrLmNhbGwoZW52LmVsZW1lbnQpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdF8uaG9va3MucnVuKCdiZWZvcmUtaGlnaGxpZ2h0JywgZW52KTtcblxuXHRcdFx0aWYgKCFlbnYuZ3JhbW1hcikge1xuXHRcdFx0XHRpbnNlcnRIaWdobGlnaHRlZENvZGUoXy51dGlsLmVuY29kZShlbnYuY29kZSkpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGlmIChhc3luYyAmJiBfc2VsZi5Xb3JrZXIpIHtcblx0XHRcdFx0dmFyIHdvcmtlciA9IG5ldyBXb3JrZXIoXy5maWxlbmFtZSk7XG5cblx0XHRcdFx0d29ya2VyLm9ubWVzc2FnZSA9IGZ1bmN0aW9uIChldnQpIHtcblx0XHRcdFx0XHRpbnNlcnRIaWdobGlnaHRlZENvZGUoZXZ0LmRhdGEpO1xuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdHdvcmtlci5wb3N0TWVzc2FnZShKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdFx0bGFuZ3VhZ2U6IGVudi5sYW5ndWFnZSxcblx0XHRcdFx0XHRjb2RlOiBlbnYuY29kZSxcblx0XHRcdFx0XHRpbW1lZGlhdGVDbG9zZTogdHJ1ZVxuXHRcdFx0XHR9KSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpbnNlcnRIaWdobGlnaHRlZENvZGUoXy5oaWdobGlnaHQoZW52LmNvZGUsIGVudi5ncmFtbWFyLCBlbnYubGFuZ3VhZ2UpKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogTG93LWxldmVsIGZ1bmN0aW9uLCBvbmx5IHVzZSBpZiB5b3Uga25vdyB3aGF0IHlvdeKAmXJlIGRvaW5nLiBJdCBhY2NlcHRzIGEgc3RyaW5nIG9mIHRleHQgYXMgaW5wdXRcblx0XHQgKiBhbmQgdGhlIGxhbmd1YWdlIGRlZmluaXRpb25zIHRvIHVzZSwgYW5kIHJldHVybnMgYSBzdHJpbmcgd2l0aCB0aGUgSFRNTCBwcm9kdWNlZC5cblx0XHQgKlxuXHRcdCAqIFRoZSBmb2xsb3dpbmcgaG9va3Mgd2lsbCBiZSBydW46XG5cdFx0ICogMS4gYGJlZm9yZS10b2tlbml6ZWBcblx0XHQgKiAyLiBgYWZ0ZXItdG9rZW5pemVgXG5cdFx0ICogMy4gYHdyYXBgOiBPbiBlYWNoIHtAbGluayBUb2tlbn0uXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCBBIHN0cmluZyB3aXRoIHRoZSBjb2RlIHRvIGJlIGhpZ2hsaWdodGVkLlxuXHRcdCAqIEBwYXJhbSB7R3JhbW1hcn0gZ3JhbW1hciBBbiBvYmplY3QgY29udGFpbmluZyB0aGUgdG9rZW5zIHRvIHVzZS5cblx0XHQgKlxuXHRcdCAqIFVzdWFsbHkgYSBsYW5ndWFnZSBkZWZpbml0aW9uIGxpa2UgYFByaXNtLmxhbmd1YWdlcy5tYXJrdXBgLlxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBsYW5ndWFnZSBUaGUgbmFtZSBvZiB0aGUgbGFuZ3VhZ2UgZGVmaW5pdGlvbiBwYXNzZWQgdG8gYGdyYW1tYXJgLlxuXHRcdCAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBoaWdobGlnaHRlZCBIVE1MLlxuXHRcdCAqIEBtZW1iZXJvZiBQcmlzbVxuXHRcdCAqIEBwdWJsaWNcblx0XHQgKiBAZXhhbXBsZVxuXHRcdCAqIFByaXNtLmhpZ2hsaWdodCgndmFyIGZvbyA9IHRydWU7JywgUHJpc20ubGFuZ3VhZ2VzLmphdmFzY3JpcHQsICdqYXZhc2NyaXB0Jyk7XG5cdFx0ICovXG5cdFx0aGlnaGxpZ2h0OiBmdW5jdGlvbiAodGV4dCwgZ3JhbW1hciwgbGFuZ3VhZ2UpIHtcblx0XHRcdHZhciBlbnYgPSB7XG5cdFx0XHRcdGNvZGU6IHRleHQsXG5cdFx0XHRcdGdyYW1tYXI6IGdyYW1tYXIsXG5cdFx0XHRcdGxhbmd1YWdlOiBsYW5ndWFnZVxuXHRcdFx0fTtcblx0XHRcdF8uaG9va3MucnVuKCdiZWZvcmUtdG9rZW5pemUnLCBlbnYpO1xuXHRcdFx0aWYgKCFlbnYuZ3JhbW1hcikge1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ1RoZSBsYW5ndWFnZSBcIicgKyBlbnYubGFuZ3VhZ2UgKyAnXCIgaGFzIG5vIGdyYW1tYXIuJyk7XG5cdFx0XHR9XG5cdFx0XHRlbnYudG9rZW5zID0gXy50b2tlbml6ZShlbnYuY29kZSwgZW52LmdyYW1tYXIpO1xuXHRcdFx0Xy5ob29rcy5ydW4oJ2FmdGVyLXRva2VuaXplJywgZW52KTtcblx0XHRcdHJldHVybiBUb2tlbi5zdHJpbmdpZnkoXy51dGlsLmVuY29kZShlbnYudG9rZW5zKSwgZW52Lmxhbmd1YWdlKTtcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogVGhpcyBpcyB0aGUgaGVhcnQgb2YgUHJpc20sIGFuZCB0aGUgbW9zdCBsb3ctbGV2ZWwgZnVuY3Rpb24geW91IGNhbiB1c2UuIEl0IGFjY2VwdHMgYSBzdHJpbmcgb2YgdGV4dCBhcyBpbnB1dFxuXHRcdCAqIGFuZCB0aGUgbGFuZ3VhZ2UgZGVmaW5pdGlvbnMgdG8gdXNlLCBhbmQgcmV0dXJucyBhbiBhcnJheSB3aXRoIHRoZSB0b2tlbml6ZWQgY29kZS5cblx0XHQgKlxuXHRcdCAqIFdoZW4gdGhlIGxhbmd1YWdlIGRlZmluaXRpb24gaW5jbHVkZXMgbmVzdGVkIHRva2VucywgdGhlIGZ1bmN0aW9uIGlzIGNhbGxlZCByZWN1cnNpdmVseSBvbiBlYWNoIG9mIHRoZXNlIHRva2Vucy5cblx0XHQgKlxuXHRcdCAqIFRoaXMgbWV0aG9kIGNvdWxkIGJlIHVzZWZ1bCBpbiBvdGhlciBjb250ZXh0cyBhcyB3ZWxsLCBhcyBhIHZlcnkgY3J1ZGUgcGFyc2VyLlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHtzdHJpbmd9IHRleHQgQSBzdHJpbmcgd2l0aCB0aGUgY29kZSB0byBiZSBoaWdobGlnaHRlZC5cblx0XHQgKiBAcGFyYW0ge0dyYW1tYXJ9IGdyYW1tYXIgQW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIHRva2VucyB0byB1c2UuXG5cdFx0ICpcblx0XHQgKiBVc3VhbGx5IGEgbGFuZ3VhZ2UgZGVmaW5pdGlvbiBsaWtlIGBQcmlzbS5sYW5ndWFnZXMubWFya3VwYC5cblx0XHQgKiBAcmV0dXJucyB7VG9rZW5TdHJlYW19IEFuIGFycmF5IG9mIHN0cmluZ3MgYW5kIHRva2VucywgYSB0b2tlbiBzdHJlYW0uXG5cdFx0ICogQG1lbWJlcm9mIFByaXNtXG5cdFx0ICogQHB1YmxpY1xuXHRcdCAqIEBleGFtcGxlXG5cdFx0ICogbGV0IGNvZGUgPSBgdmFyIGZvbyA9IDA7YDtcblx0XHQgKiBsZXQgdG9rZW5zID0gUHJpc20udG9rZW5pemUoY29kZSwgUHJpc20ubGFuZ3VhZ2VzLmphdmFzY3JpcHQpO1xuXHRcdCAqIHRva2Vucy5mb3JFYWNoKHRva2VuID0+IHtcblx0XHQgKiAgICAgaWYgKHRva2VuIGluc3RhbmNlb2YgUHJpc20uVG9rZW4gJiYgdG9rZW4udHlwZSA9PT0gJ251bWJlcicpIHtcblx0XHQgKiAgICAgICAgIGNvbnNvbGUubG9nKGBGb3VuZCBudW1lcmljIGxpdGVyYWw6ICR7dG9rZW4uY29udGVudH1gKTtcblx0XHQgKiAgICAgfVxuXHRcdCAqIH0pO1xuXHRcdCAqL1xuXHRcdHRva2VuaXplOiBmdW5jdGlvbiAodGV4dCwgZ3JhbW1hcikge1xuXHRcdFx0dmFyIHJlc3QgPSBncmFtbWFyLnJlc3Q7XG5cdFx0XHRpZiAocmVzdCkge1xuXHRcdFx0XHRmb3IgKHZhciB0b2tlbiBpbiByZXN0KSB7XG5cdFx0XHRcdFx0Z3JhbW1hclt0b2tlbl0gPSByZXN0W3Rva2VuXTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGRlbGV0ZSBncmFtbWFyLnJlc3Q7XG5cdFx0XHR9XG5cblx0XHRcdHZhciB0b2tlbkxpc3QgPSBuZXcgTGlua2VkTGlzdCgpO1xuXHRcdFx0YWRkQWZ0ZXIodG9rZW5MaXN0LCB0b2tlbkxpc3QuaGVhZCwgdGV4dCk7XG5cblx0XHRcdG1hdGNoR3JhbW1hcih0ZXh0LCB0b2tlbkxpc3QsIGdyYW1tYXIsIHRva2VuTGlzdC5oZWFkLCAwKTtcblxuXHRcdFx0cmV0dXJuIHRvQXJyYXkodG9rZW5MaXN0KTtcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogQG5hbWVzcGFjZVxuXHRcdCAqIEBtZW1iZXJvZiBQcmlzbVxuXHRcdCAqIEBwdWJsaWNcblx0XHQgKi9cblx0XHRob29rczoge1xuXHRcdFx0YWxsOiB7fSxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBBZGRzIHRoZSBnaXZlbiBjYWxsYmFjayB0byB0aGUgbGlzdCBvZiBjYWxsYmFja3MgZm9yIHRoZSBnaXZlbiBob29rLlxuXHRcdFx0ICpcblx0XHRcdCAqIFRoZSBjYWxsYmFjayB3aWxsIGJlIGludm9rZWQgd2hlbiB0aGUgaG9vayBpdCBpcyByZWdpc3RlcmVkIGZvciBpcyBydW4uXG5cdFx0XHQgKiBIb29rcyBhcmUgdXN1YWxseSBkaXJlY3RseSBydW4gYnkgYSBoaWdobGlnaHQgZnVuY3Rpb24gYnV0IHlvdSBjYW4gYWxzbyBydW4gaG9va3MgeW91cnNlbGYuXG5cdFx0XHQgKlxuXHRcdFx0ICogT25lIGNhbGxiYWNrIGZ1bmN0aW9uIGNhbiBiZSByZWdpc3RlcmVkIHRvIG11bHRpcGxlIGhvb2tzIGFuZCB0aGUgc2FtZSBob29rIG11bHRpcGxlIHRpbWVzLlxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBob29rLlxuXHRcdFx0ICogQHBhcmFtIHtIb29rQ2FsbGJhY2t9IGNhbGxiYWNrIFRoZSBjYWxsYmFjayBmdW5jdGlvbiB3aGljaCBpcyBnaXZlbiBlbnZpcm9ubWVudCB2YXJpYWJsZXMuXG5cdFx0XHQgKiBAcHVibGljXG5cdFx0XHQgKi9cblx0XHRcdGFkZDogZnVuY3Rpb24gKG5hbWUsIGNhbGxiYWNrKSB7XG5cdFx0XHRcdHZhciBob29rcyA9IF8uaG9va3MuYWxsO1xuXG5cdFx0XHRcdGhvb2tzW25hbWVdID0gaG9va3NbbmFtZV0gfHwgW107XG5cblx0XHRcdFx0aG9va3NbbmFtZV0ucHVzaChjYWxsYmFjayk7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIFJ1bnMgYSBob29rIGludm9raW5nIGFsbCByZWdpc3RlcmVkIGNhbGxiYWNrcyB3aXRoIHRoZSBnaXZlbiBlbnZpcm9ubWVudCB2YXJpYWJsZXMuXG5cdFx0XHQgKlxuXHRcdFx0ICogQ2FsbGJhY2tzIHdpbGwgYmUgaW52b2tlZCBzeW5jaHJvbm91c2x5IGFuZCBpbiB0aGUgb3JkZXIgaW4gd2hpY2ggdGhleSB3ZXJlIHJlZ2lzdGVyZWQuXG5cdFx0XHQgKlxuXHRcdFx0ICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIGhvb2suXG5cdFx0XHQgKiBAcGFyYW0ge09iamVjdDxzdHJpbmcsIGFueT59IGVudiBUaGUgZW52aXJvbm1lbnQgdmFyaWFibGVzIG9mIHRoZSBob29rIHBhc3NlZCB0byBhbGwgY2FsbGJhY2tzIHJlZ2lzdGVyZWQuXG5cdFx0XHQgKiBAcHVibGljXG5cdFx0XHQgKi9cblx0XHRcdHJ1bjogZnVuY3Rpb24gKG5hbWUsIGVudikge1xuXHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gXy5ob29rcy5hbGxbbmFtZV07XG5cblx0XHRcdFx0aWYgKCFjYWxsYmFja3MgfHwgIWNhbGxiYWNrcy5sZW5ndGgpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRmb3IgKHZhciBpID0gMCwgY2FsbGJhY2s7IChjYWxsYmFjayA9IGNhbGxiYWNrc1tpKytdKTspIHtcblx0XHRcdFx0XHRjYWxsYmFjayhlbnYpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdFRva2VuOiBUb2tlblxuXHR9O1xuXHRfc2VsZi5QcmlzbSA9IF87XG5cblxuXHQvLyBUeXBlc2NyaXB0IG5vdGU6XG5cdC8vIFRoZSBmb2xsb3dpbmcgY2FuIGJlIHVzZWQgdG8gaW1wb3J0IHRoZSBUb2tlbiB0eXBlIGluIEpTRG9jOlxuXHQvL1xuXHQvLyAgIEB0eXBlZGVmIHtJbnN0YW5jZVR5cGU8aW1wb3J0KFwiLi9wcmlzbS1jb3JlXCIpW1wiVG9rZW5cIl0+fSBUb2tlblxuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGEgbmV3IHRva2VuLlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBTZWUge0BsaW5rIFRva2VuI3R5cGUgdHlwZX1cblx0ICogQHBhcmFtIHtzdHJpbmcgfCBUb2tlblN0cmVhbX0gY29udGVudCBTZWUge0BsaW5rIFRva2VuI2NvbnRlbnQgY29udGVudH1cblx0ICogQHBhcmFtIHtzdHJpbmd8c3RyaW5nW119IFthbGlhc10gVGhlIGFsaWFzKGVzKSBvZiB0aGUgdG9rZW4uXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBbbWF0Y2hlZFN0cj1cIlwiXSBBIGNvcHkgb2YgdGhlIGZ1bGwgc3RyaW5nIHRoaXMgdG9rZW4gd2FzIGNyZWF0ZWQgZnJvbS5cblx0ICogQGNsYXNzXG5cdCAqIEBnbG9iYWxcblx0ICogQHB1YmxpY1xuXHQgKi9cblx0ZnVuY3Rpb24gVG9rZW4odHlwZSwgY29udGVudCwgYWxpYXMsIG1hdGNoZWRTdHIpIHtcblx0XHQvKipcblx0XHQgKiBUaGUgdHlwZSBvZiB0aGUgdG9rZW4uXG5cdFx0ICpcblx0XHQgKiBUaGlzIGlzIHVzdWFsbHkgdGhlIGtleSBvZiBhIHBhdHRlcm4gaW4gYSB7QGxpbmsgR3JhbW1hcn0uXG5cdFx0ICpcblx0XHQgKiBAdHlwZSB7c3RyaW5nfVxuXHRcdCAqIEBzZWUgR3JhbW1hclRva2VuXG5cdFx0ICogQHB1YmxpY1xuXHRcdCAqL1xuXHRcdHRoaXMudHlwZSA9IHR5cGU7XG5cdFx0LyoqXG5cdFx0ICogVGhlIHN0cmluZ3Mgb3IgdG9rZW5zIGNvbnRhaW5lZCBieSB0aGlzIHRva2VuLlxuXHRcdCAqXG5cdFx0ICogVGhpcyB3aWxsIGJlIGEgdG9rZW4gc3RyZWFtIGlmIHRoZSBwYXR0ZXJuIG1hdGNoZWQgYWxzbyBkZWZpbmVkIGFuIGBpbnNpZGVgIGdyYW1tYXIuXG5cdFx0ICpcblx0XHQgKiBAdHlwZSB7c3RyaW5nIHwgVG9rZW5TdHJlYW19XG5cdFx0ICogQHB1YmxpY1xuXHRcdCAqL1xuXHRcdHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XG5cdFx0LyoqXG5cdFx0ICogVGhlIGFsaWFzKGVzKSBvZiB0aGUgdG9rZW4uXG5cdFx0ICpcblx0XHQgKiBAdHlwZSB7c3RyaW5nfHN0cmluZ1tdfVxuXHRcdCAqIEBzZWUgR3JhbW1hclRva2VuXG5cdFx0ICogQHB1YmxpY1xuXHRcdCAqL1xuXHRcdHRoaXMuYWxpYXMgPSBhbGlhcztcblx0XHQvLyBDb3B5IG9mIHRoZSBmdWxsIHN0cmluZyB0aGlzIHRva2VuIHdhcyBjcmVhdGVkIGZyb21cblx0XHR0aGlzLmxlbmd0aCA9IChtYXRjaGVkU3RyIHx8ICcnKS5sZW5ndGggfCAwO1xuXHR9XG5cblx0LyoqXG5cdCAqIEEgdG9rZW4gc3RyZWFtIGlzIGFuIGFycmF5IG9mIHN0cmluZ3MgYW5kIHtAbGluayBUb2tlbiBUb2tlbn0gb2JqZWN0cy5cblx0ICpcblx0ICogVG9rZW4gc3RyZWFtcyBoYXZlIHRvIGZ1bGZpbGwgYSBmZXcgcHJvcGVydGllcyB0aGF0IGFyZSBhc3N1bWVkIGJ5IG1vc3QgZnVuY3Rpb25zIChtb3N0bHkgaW50ZXJuYWwgb25lcykgdGhhdCBwcm9jZXNzXG5cdCAqIHRoZW0uXG5cdCAqXG5cdCAqIDEuIE5vIGFkamFjZW50IHN0cmluZ3MuXG5cdCAqIDIuIE5vIGVtcHR5IHN0cmluZ3MuXG5cdCAqXG5cdCAqICAgIFRoZSBvbmx5IGV4Y2VwdGlvbiBoZXJlIGlzIHRoZSB0b2tlbiBzdHJlYW0gdGhhdCBvbmx5IGNvbnRhaW5zIHRoZSBlbXB0eSBzdHJpbmcgYW5kIG5vdGhpbmcgZWxzZS5cblx0ICpcblx0ICogQHR5cGVkZWYge0FycmF5PHN0cmluZyB8IFRva2VuPn0gVG9rZW5TdHJlYW1cblx0ICogQGdsb2JhbFxuXHQgKiBAcHVibGljXG5cdCAqL1xuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyB0aGUgZ2l2ZW4gdG9rZW4gb3IgdG9rZW4gc3RyZWFtIHRvIGFuIEhUTUwgcmVwcmVzZW50YXRpb24uXG5cdCAqXG5cdCAqIFRoZSBmb2xsb3dpbmcgaG9va3Mgd2lsbCBiZSBydW46XG5cdCAqIDEuIGB3cmFwYDogT24gZWFjaCB7QGxpbmsgVG9rZW59LlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZyB8IFRva2VuIHwgVG9rZW5TdHJlYW19IG8gVGhlIHRva2VuIG9yIHRva2VuIHN0cmVhbSB0byBiZSBjb252ZXJ0ZWQuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsYW5ndWFnZSBUaGUgbmFtZSBvZiBjdXJyZW50IGxhbmd1YWdlLlxuXHQgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgSFRNTCByZXByZXNlbnRhdGlvbiBvZiB0aGUgdG9rZW4gb3IgdG9rZW4gc3RyZWFtLlxuXHQgKiBAbWVtYmVyb2YgVG9rZW5cblx0ICogQHN0YXRpY1xuXHQgKi9cblx0VG9rZW4uc3RyaW5naWZ5ID0gZnVuY3Rpb24gc3RyaW5naWZ5KG8sIGxhbmd1YWdlKSB7XG5cdFx0aWYgKHR5cGVvZiBvID09ICdzdHJpbmcnKSB7XG5cdFx0XHRyZXR1cm4gbztcblx0XHR9XG5cdFx0aWYgKEFycmF5LmlzQXJyYXkobykpIHtcblx0XHRcdHZhciBzID0gJyc7XG5cdFx0XHRvLmZvckVhY2goZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0cyArPSBzdHJpbmdpZnkoZSwgbGFuZ3VhZ2UpO1xuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gcztcblx0XHR9XG5cblx0XHR2YXIgZW52ID0ge1xuXHRcdFx0dHlwZTogby50eXBlLFxuXHRcdFx0Y29udGVudDogc3RyaW5naWZ5KG8uY29udGVudCwgbGFuZ3VhZ2UpLFxuXHRcdFx0dGFnOiAnc3BhbicsXG5cdFx0XHRjbGFzc2VzOiBbJ3Rva2VuJywgby50eXBlXSxcblx0XHRcdGF0dHJpYnV0ZXM6IHt9LFxuXHRcdFx0bGFuZ3VhZ2U6IGxhbmd1YWdlXG5cdFx0fTtcblxuXHRcdHZhciBhbGlhc2VzID0gby5hbGlhcztcblx0XHRpZiAoYWxpYXNlcykge1xuXHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoYWxpYXNlcykpIHtcblx0XHRcdFx0QXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkoZW52LmNsYXNzZXMsIGFsaWFzZXMpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZW52LmNsYXNzZXMucHVzaChhbGlhc2VzKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRfLmhvb2tzLnJ1bignd3JhcCcsIGVudik7XG5cblx0XHR2YXIgYXR0cmlidXRlcyA9ICcnO1xuXHRcdGZvciAodmFyIG5hbWUgaW4gZW52LmF0dHJpYnV0ZXMpIHtcblx0XHRcdGF0dHJpYnV0ZXMgKz0gJyAnICsgbmFtZSArICc9XCInICsgKGVudi5hdHRyaWJ1dGVzW25hbWVdIHx8ICcnKS5yZXBsYWNlKC9cIi9nLCAnJnF1b3Q7JykgKyAnXCInO1xuXHRcdH1cblxuXHRcdHJldHVybiAnPCcgKyBlbnYudGFnICsgJyBjbGFzcz1cIicgKyBlbnYuY2xhc3Nlcy5qb2luKCcgJykgKyAnXCInICsgYXR0cmlidXRlcyArICc+JyArIGVudi5jb250ZW50ICsgJzwvJyArIGVudi50YWcgKyAnPic7XG5cdH07XG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7UmVnRXhwfSBwYXR0ZXJuXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBwb3Ncblx0ICogQHBhcmFtIHtzdHJpbmd9IHRleHRcblx0ICogQHBhcmFtIHtib29sZWFufSBsb29rYmVoaW5kXG5cdCAqIEByZXR1cm5zIHtSZWdFeHBFeGVjQXJyYXkgfCBudWxsfVxuXHQgKi9cblx0ZnVuY3Rpb24gbWF0Y2hQYXR0ZXJuKHBhdHRlcm4sIHBvcywgdGV4dCwgbG9va2JlaGluZCkge1xuXHRcdHBhdHRlcm4ubGFzdEluZGV4ID0gcG9zO1xuXHRcdHZhciBtYXRjaCA9IHBhdHRlcm4uZXhlYyh0ZXh0KTtcblx0XHRpZiAobWF0Y2ggJiYgbG9va2JlaGluZCAmJiBtYXRjaFsxXSkge1xuXHRcdFx0Ly8gY2hhbmdlIHRoZSBtYXRjaCB0byByZW1vdmUgdGhlIHRleHQgbWF0Y2hlZCBieSB0aGUgUHJpc20gbG9va2JlaGluZCBncm91cFxuXHRcdFx0dmFyIGxvb2tiZWhpbmRMZW5ndGggPSBtYXRjaFsxXS5sZW5ndGg7XG5cdFx0XHRtYXRjaC5pbmRleCArPSBsb29rYmVoaW5kTGVuZ3RoO1xuXHRcdFx0bWF0Y2hbMF0gPSBtYXRjaFswXS5zbGljZShsb29rYmVoaW5kTGVuZ3RoKTtcblx0XHR9XG5cdFx0cmV0dXJuIG1hdGNoO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG5cdCAqIEBwYXJhbSB7TGlua2VkTGlzdDxzdHJpbmcgfCBUb2tlbj59IHRva2VuTGlzdFxuXHQgKiBAcGFyYW0ge2FueX0gZ3JhbW1hclxuXHQgKiBAcGFyYW0ge0xpbmtlZExpc3ROb2RlPHN0cmluZyB8IFRva2VuPn0gc3RhcnROb2RlXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydFBvc1xuXHQgKiBAcGFyYW0ge1JlbWF0Y2hPcHRpb25zfSBbcmVtYXRjaF1cblx0ICogQHJldHVybnMge3ZvaWR9XG5cdCAqIEBwcml2YXRlXG5cdCAqXG5cdCAqIEB0eXBlZGVmIFJlbWF0Y2hPcHRpb25zXG5cdCAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBjYXVzZVxuXHQgKiBAcHJvcGVydHkge251bWJlcn0gcmVhY2hcblx0ICovXG5cdGZ1bmN0aW9uIG1hdGNoR3JhbW1hcih0ZXh0LCB0b2tlbkxpc3QsIGdyYW1tYXIsIHN0YXJ0Tm9kZSwgc3RhcnRQb3MsIHJlbWF0Y2gpIHtcblx0XHRmb3IgKHZhciB0b2tlbiBpbiBncmFtbWFyKSB7XG5cdFx0XHRpZiAoIWdyYW1tYXIuaGFzT3duUHJvcGVydHkodG9rZW4pIHx8ICFncmFtbWFyW3Rva2VuXSkge1xuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIHBhdHRlcm5zID0gZ3JhbW1hclt0b2tlbl07XG5cdFx0XHRwYXR0ZXJucyA9IEFycmF5LmlzQXJyYXkocGF0dGVybnMpID8gcGF0dGVybnMgOiBbcGF0dGVybnNdO1xuXG5cdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IHBhdHRlcm5zLmxlbmd0aDsgKytqKSB7XG5cdFx0XHRcdGlmIChyZW1hdGNoICYmIHJlbWF0Y2guY2F1c2UgPT0gdG9rZW4gKyAnLCcgKyBqKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIHBhdHRlcm5PYmogPSBwYXR0ZXJuc1tqXTtcblx0XHRcdFx0dmFyIGluc2lkZSA9IHBhdHRlcm5PYmouaW5zaWRlO1xuXHRcdFx0XHR2YXIgbG9va2JlaGluZCA9ICEhcGF0dGVybk9iai5sb29rYmVoaW5kO1xuXHRcdFx0XHR2YXIgZ3JlZWR5ID0gISFwYXR0ZXJuT2JqLmdyZWVkeTtcblx0XHRcdFx0dmFyIGFsaWFzID0gcGF0dGVybk9iai5hbGlhcztcblxuXHRcdFx0XHRpZiAoZ3JlZWR5ICYmICFwYXR0ZXJuT2JqLnBhdHRlcm4uZ2xvYmFsKSB7XG5cdFx0XHRcdFx0Ly8gV2l0aG91dCB0aGUgZ2xvYmFsIGZsYWcsIGxhc3RJbmRleCB3b24ndCB3b3JrXG5cdFx0XHRcdFx0dmFyIGZsYWdzID0gcGF0dGVybk9iai5wYXR0ZXJuLnRvU3RyaW5nKCkubWF0Y2goL1tpbXN1eV0qJC8pWzBdO1xuXHRcdFx0XHRcdHBhdHRlcm5PYmoucGF0dGVybiA9IFJlZ0V4cChwYXR0ZXJuT2JqLnBhdHRlcm4uc291cmNlLCBmbGFncyArICdnJyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKiogQHR5cGUge1JlZ0V4cH0gKi9cblx0XHRcdFx0dmFyIHBhdHRlcm4gPSBwYXR0ZXJuT2JqLnBhdHRlcm4gfHwgcGF0dGVybk9iajtcblxuXHRcdFx0XHRmb3IgKCAvLyBpdGVyYXRlIHRoZSB0b2tlbiBsaXN0IGFuZCBrZWVwIHRyYWNrIG9mIHRoZSBjdXJyZW50IHRva2VuL3N0cmluZyBwb3NpdGlvblxuXHRcdFx0XHRcdHZhciBjdXJyZW50Tm9kZSA9IHN0YXJ0Tm9kZS5uZXh0LCBwb3MgPSBzdGFydFBvcztcblx0XHRcdFx0XHRjdXJyZW50Tm9kZSAhPT0gdG9rZW5MaXN0LnRhaWw7XG5cdFx0XHRcdFx0cG9zICs9IGN1cnJlbnROb2RlLnZhbHVlLmxlbmd0aCwgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5uZXh0XG5cdFx0XHRcdCkge1xuXG5cdFx0XHRcdFx0aWYgKHJlbWF0Y2ggJiYgcG9zID49IHJlbWF0Y2gucmVhY2gpIHtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHZhciBzdHIgPSBjdXJyZW50Tm9kZS52YWx1ZTtcblxuXHRcdFx0XHRcdGlmICh0b2tlbkxpc3QubGVuZ3RoID4gdGV4dC5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdC8vIFNvbWV0aGluZyB3ZW50IHRlcnJpYmx5IHdyb25nLCBBQk9SVCwgQUJPUlQhXG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKHN0ciBpbnN0YW5jZW9mIFRva2VuKSB7XG5cdFx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR2YXIgcmVtb3ZlQ291bnQgPSAxOyAvLyB0aGlzIGlzIHRoZSB0byBwYXJhbWV0ZXIgb2YgcmVtb3ZlQmV0d2VlblxuXHRcdFx0XHRcdHZhciBtYXRjaDtcblxuXHRcdFx0XHRcdGlmIChncmVlZHkpIHtcblx0XHRcdFx0XHRcdG1hdGNoID0gbWF0Y2hQYXR0ZXJuKHBhdHRlcm4sIHBvcywgdGV4dCwgbG9va2JlaGluZCk7XG5cdFx0XHRcdFx0XHRpZiAoIW1hdGNoIHx8IG1hdGNoLmluZGV4ID49IHRleHQubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHR2YXIgZnJvbSA9IG1hdGNoLmluZGV4O1xuXHRcdFx0XHRcdFx0dmFyIHRvID0gbWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGg7XG5cdFx0XHRcdFx0XHR2YXIgcCA9IHBvcztcblxuXHRcdFx0XHRcdFx0Ly8gZmluZCB0aGUgbm9kZSB0aGF0IGNvbnRhaW5zIHRoZSBtYXRjaFxuXHRcdFx0XHRcdFx0cCArPSBjdXJyZW50Tm9kZS52YWx1ZS5sZW5ndGg7XG5cdFx0XHRcdFx0XHR3aGlsZSAoZnJvbSA+PSBwKSB7XG5cdFx0XHRcdFx0XHRcdGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUubmV4dDtcblx0XHRcdFx0XHRcdFx0cCArPSBjdXJyZW50Tm9kZS52YWx1ZS5sZW5ndGg7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHQvLyBhZGp1c3QgcG9zIChhbmQgcClcblx0XHRcdFx0XHRcdHAgLT0gY3VycmVudE5vZGUudmFsdWUubGVuZ3RoO1xuXHRcdFx0XHRcdFx0cG9zID0gcDtcblxuXHRcdFx0XHRcdFx0Ly8gdGhlIGN1cnJlbnQgbm9kZSBpcyBhIFRva2VuLCB0aGVuIHRoZSBtYXRjaCBzdGFydHMgaW5zaWRlIGFub3RoZXIgVG9rZW4sIHdoaWNoIGlzIGludmFsaWRcblx0XHRcdFx0XHRcdGlmIChjdXJyZW50Tm9kZS52YWx1ZSBpbnN0YW5jZW9mIFRva2VuKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBmaW5kIHRoZSBsYXN0IG5vZGUgd2hpY2ggaXMgYWZmZWN0ZWQgYnkgdGhpcyBtYXRjaFxuXHRcdFx0XHRcdFx0Zm9yIChcblx0XHRcdFx0XHRcdFx0dmFyIGsgPSBjdXJyZW50Tm9kZTtcblx0XHRcdFx0XHRcdFx0ayAhPT0gdG9rZW5MaXN0LnRhaWwgJiYgKHAgPCB0byB8fCB0eXBlb2Ygay52YWx1ZSA9PT0gJ3N0cmluZycpO1xuXHRcdFx0XHRcdFx0XHRrID0gay5uZXh0XG5cdFx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdFx0cmVtb3ZlQ291bnQrKztcblx0XHRcdFx0XHRcdFx0cCArPSBrLnZhbHVlLmxlbmd0aDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHJlbW92ZUNvdW50LS07XG5cblx0XHRcdFx0XHRcdC8vIHJlcGxhY2Ugd2l0aCB0aGUgbmV3IG1hdGNoXG5cdFx0XHRcdFx0XHRzdHIgPSB0ZXh0LnNsaWNlKHBvcywgcCk7XG5cdFx0XHRcdFx0XHRtYXRjaC5pbmRleCAtPSBwb3M7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdG1hdGNoID0gbWF0Y2hQYXR0ZXJuKHBhdHRlcm4sIDAsIHN0ciwgbG9va2JlaGluZCk7XG5cdFx0XHRcdFx0XHRpZiAoIW1hdGNoKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZWRlY2xhcmVcblx0XHRcdFx0XHR2YXIgZnJvbSA9IG1hdGNoLmluZGV4O1xuXHRcdFx0XHRcdHZhciBtYXRjaFN0ciA9IG1hdGNoWzBdO1xuXHRcdFx0XHRcdHZhciBiZWZvcmUgPSBzdHIuc2xpY2UoMCwgZnJvbSk7XG5cdFx0XHRcdFx0dmFyIGFmdGVyID0gc3RyLnNsaWNlKGZyb20gKyBtYXRjaFN0ci5sZW5ndGgpO1xuXG5cdFx0XHRcdFx0dmFyIHJlYWNoID0gcG9zICsgc3RyLmxlbmd0aDtcblx0XHRcdFx0XHRpZiAocmVtYXRjaCAmJiByZWFjaCA+IHJlbWF0Y2gucmVhY2gpIHtcblx0XHRcdFx0XHRcdHJlbWF0Y2gucmVhY2ggPSByZWFjaDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR2YXIgcmVtb3ZlRnJvbSA9IGN1cnJlbnROb2RlLnByZXY7XG5cblx0XHRcdFx0XHRpZiAoYmVmb3JlKSB7XG5cdFx0XHRcdFx0XHRyZW1vdmVGcm9tID0gYWRkQWZ0ZXIodG9rZW5MaXN0LCByZW1vdmVGcm9tLCBiZWZvcmUpO1xuXHRcdFx0XHRcdFx0cG9zICs9IGJlZm9yZS5sZW5ndGg7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmVtb3ZlUmFuZ2UodG9rZW5MaXN0LCByZW1vdmVGcm9tLCByZW1vdmVDb3VudCk7XG5cblx0XHRcdFx0XHR2YXIgd3JhcHBlZCA9IG5ldyBUb2tlbih0b2tlbiwgaW5zaWRlID8gXy50b2tlbml6ZShtYXRjaFN0ciwgaW5zaWRlKSA6IG1hdGNoU3RyLCBhbGlhcywgbWF0Y2hTdHIpO1xuXHRcdFx0XHRcdGN1cnJlbnROb2RlID0gYWRkQWZ0ZXIodG9rZW5MaXN0LCByZW1vdmVGcm9tLCB3cmFwcGVkKTtcblxuXHRcdFx0XHRcdGlmIChhZnRlcikge1xuXHRcdFx0XHRcdFx0YWRkQWZ0ZXIodG9rZW5MaXN0LCBjdXJyZW50Tm9kZSwgYWZ0ZXIpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChyZW1vdmVDb3VudCA+IDEpIHtcblx0XHRcdFx0XHRcdC8vIGF0IGxlYXN0IG9uZSBUb2tlbiBvYmplY3Qgd2FzIHJlbW92ZWQsIHNvIHdlIGhhdmUgdG8gZG8gc29tZSByZW1hdGNoaW5nXG5cdFx0XHRcdFx0XHQvLyB0aGlzIGNhbiBvbmx5IGhhcHBlbiBpZiB0aGUgY3VycmVudCBwYXR0ZXJuIGlzIGdyZWVkeVxuXG5cdFx0XHRcdFx0XHQvKiogQHR5cGUge1JlbWF0Y2hPcHRpb25zfSAqL1xuXHRcdFx0XHRcdFx0dmFyIG5lc3RlZFJlbWF0Y2ggPSB7XG5cdFx0XHRcdFx0XHRcdGNhdXNlOiB0b2tlbiArICcsJyArIGosXG5cdFx0XHRcdFx0XHRcdHJlYWNoOiByZWFjaFxuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdG1hdGNoR3JhbW1hcih0ZXh0LCB0b2tlbkxpc3QsIGdyYW1tYXIsIGN1cnJlbnROb2RlLnByZXYsIHBvcywgbmVzdGVkUmVtYXRjaCk7XG5cblx0XHRcdFx0XHRcdC8vIHRoZSByZWFjaCBtaWdodCBoYXZlIGJlZW4gZXh0ZW5kZWQgYmVjYXVzZSBvZiB0aGUgcmVtYXRjaGluZ1xuXHRcdFx0XHRcdFx0aWYgKHJlbWF0Y2ggJiYgbmVzdGVkUmVtYXRjaC5yZWFjaCA+IHJlbWF0Y2gucmVhY2gpIHtcblx0XHRcdFx0XHRcdFx0cmVtYXRjaC5yZWFjaCA9IG5lc3RlZFJlbWF0Y2gucmVhY2g7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEB0eXBlZGVmIExpbmtlZExpc3ROb2RlXG5cdCAqIEBwcm9wZXJ0eSB7VH0gdmFsdWVcblx0ICogQHByb3BlcnR5IHtMaW5rZWRMaXN0Tm9kZTxUPiB8IG51bGx9IHByZXYgVGhlIHByZXZpb3VzIG5vZGUuXG5cdCAqIEBwcm9wZXJ0eSB7TGlua2VkTGlzdE5vZGU8VD4gfCBudWxsfSBuZXh0IFRoZSBuZXh0IG5vZGUuXG5cdCAqIEB0ZW1wbGF0ZSBUXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXG5cdC8qKlxuXHQgKiBAdGVtcGxhdGUgVFxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0ZnVuY3Rpb24gTGlua2VkTGlzdCgpIHtcblx0XHQvKiogQHR5cGUge0xpbmtlZExpc3ROb2RlPFQ+fSAqL1xuXHRcdHZhciBoZWFkID0geyB2YWx1ZTogbnVsbCwgcHJldjogbnVsbCwgbmV4dDogbnVsbCB9O1xuXHRcdC8qKiBAdHlwZSB7TGlua2VkTGlzdE5vZGU8VD59ICovXG5cdFx0dmFyIHRhaWwgPSB7IHZhbHVlOiBudWxsLCBwcmV2OiBoZWFkLCBuZXh0OiBudWxsIH07XG5cdFx0aGVhZC5uZXh0ID0gdGFpbDtcblxuXHRcdC8qKiBAdHlwZSB7TGlua2VkTGlzdE5vZGU8VD59ICovXG5cdFx0dGhpcy5oZWFkID0gaGVhZDtcblx0XHQvKiogQHR5cGUge0xpbmtlZExpc3ROb2RlPFQ+fSAqL1xuXHRcdHRoaXMudGFpbCA9IHRhaWw7XG5cdFx0dGhpcy5sZW5ndGggPSAwO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFkZHMgYSBuZXcgbm9kZSB3aXRoIHRoZSBnaXZlbiB2YWx1ZSB0byB0aGUgbGlzdC5cblx0ICpcblx0ICogQHBhcmFtIHtMaW5rZWRMaXN0PFQ+fSBsaXN0XG5cdCAqIEBwYXJhbSB7TGlua2VkTGlzdE5vZGU8VD59IG5vZGVcblx0ICogQHBhcmFtIHtUfSB2YWx1ZVxuXHQgKiBAcmV0dXJucyB7TGlua2VkTGlzdE5vZGU8VD59IFRoZSBhZGRlZCBub2RlLlxuXHQgKiBAdGVtcGxhdGUgVFxuXHQgKi9cblx0ZnVuY3Rpb24gYWRkQWZ0ZXIobGlzdCwgbm9kZSwgdmFsdWUpIHtcblx0XHQvLyBhc3N1bWVzIHRoYXQgbm9kZSAhPSBsaXN0LnRhaWwgJiYgdmFsdWVzLmxlbmd0aCA+PSAwXG5cdFx0dmFyIG5leHQgPSBub2RlLm5leHQ7XG5cblx0XHR2YXIgbmV3Tm9kZSA9IHsgdmFsdWU6IHZhbHVlLCBwcmV2OiBub2RlLCBuZXh0OiBuZXh0IH07XG5cdFx0bm9kZS5uZXh0ID0gbmV3Tm9kZTtcblx0XHRuZXh0LnByZXYgPSBuZXdOb2RlO1xuXHRcdGxpc3QubGVuZ3RoKys7XG5cblx0XHRyZXR1cm4gbmV3Tm9kZTtcblx0fVxuXHQvKipcblx0ICogUmVtb3ZlcyBgY291bnRgIG5vZGVzIGFmdGVyIHRoZSBnaXZlbiBub2RlLiBUaGUgZ2l2ZW4gbm9kZSB3aWxsIG5vdCBiZSByZW1vdmVkLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0xpbmtlZExpc3Q8VD59IGxpc3Rcblx0ICogQHBhcmFtIHtMaW5rZWRMaXN0Tm9kZTxUPn0gbm9kZVxuXHQgKiBAcGFyYW0ge251bWJlcn0gY291bnRcblx0ICogQHRlbXBsYXRlIFRcblx0ICovXG5cdGZ1bmN0aW9uIHJlbW92ZVJhbmdlKGxpc3QsIG5vZGUsIGNvdW50KSB7XG5cdFx0dmFyIG5leHQgPSBub2RlLm5leHQ7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudCAmJiBuZXh0ICE9PSBsaXN0LnRhaWw7IGkrKykge1xuXHRcdFx0bmV4dCA9IG5leHQubmV4dDtcblx0XHR9XG5cdFx0bm9kZS5uZXh0ID0gbmV4dDtcblx0XHRuZXh0LnByZXYgPSBub2RlO1xuXHRcdGxpc3QubGVuZ3RoIC09IGk7XG5cdH1cblx0LyoqXG5cdCAqIEBwYXJhbSB7TGlua2VkTGlzdDxUPn0gbGlzdFxuXHQgKiBAcmV0dXJucyB7VFtdfVxuXHQgKiBAdGVtcGxhdGUgVFxuXHQgKi9cblx0ZnVuY3Rpb24gdG9BcnJheShsaXN0KSB7XG5cdFx0dmFyIGFycmF5ID0gW107XG5cdFx0dmFyIG5vZGUgPSBsaXN0LmhlYWQubmV4dDtcblx0XHR3aGlsZSAobm9kZSAhPT0gbGlzdC50YWlsKSB7XG5cdFx0XHRhcnJheS5wdXNoKG5vZGUudmFsdWUpO1xuXHRcdFx0bm9kZSA9IG5vZGUubmV4dDtcblx0XHR9XG5cdFx0cmV0dXJuIGFycmF5O1xuXHR9XG5cblxuXHRpZiAoIV9zZWxmLmRvY3VtZW50KSB7XG5cdFx0aWYgKCFfc2VsZi5hZGRFdmVudExpc3RlbmVyKSB7XG5cdFx0XHQvLyBpbiBOb2RlLmpzXG5cdFx0XHRyZXR1cm4gXztcblx0XHR9XG5cblx0XHRpZiAoIV8uZGlzYWJsZVdvcmtlck1lc3NhZ2VIYW5kbGVyKSB7XG5cdFx0XHQvLyBJbiB3b3JrZXJcblx0XHRcdF9zZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmdW5jdGlvbiAoZXZ0KSB7XG5cdFx0XHRcdHZhciBtZXNzYWdlID0gSlNPTi5wYXJzZShldnQuZGF0YSk7XG5cdFx0XHRcdHZhciBsYW5nID0gbWVzc2FnZS5sYW5ndWFnZTtcblx0XHRcdFx0dmFyIGNvZGUgPSBtZXNzYWdlLmNvZGU7XG5cdFx0XHRcdHZhciBpbW1lZGlhdGVDbG9zZSA9IG1lc3NhZ2UuaW1tZWRpYXRlQ2xvc2U7XG5cblx0XHRcdFx0X3NlbGYucG9zdE1lc3NhZ2UoXy5oaWdobGlnaHQoY29kZSwgXy5sYW5ndWFnZXNbbGFuZ10sIGxhbmcpKTtcblx0XHRcdFx0aWYgKGltbWVkaWF0ZUNsb3NlKSB7XG5cdFx0XHRcdFx0X3NlbGYuY2xvc2UoKTtcblx0XHRcdFx0fVxuXHRcdFx0fSwgZmFsc2UpO1xuXHRcdH1cblxuXHRcdHJldHVybiBfO1xuXHR9XG5cblx0Ly8gR2V0IGN1cnJlbnQgc2NyaXB0IGFuZCBoaWdobGlnaHRcblx0dmFyIHNjcmlwdCA9IF8udXRpbC5jdXJyZW50U2NyaXB0KCk7XG5cblx0aWYgKHNjcmlwdCkge1xuXHRcdF8uZmlsZW5hbWUgPSBzY3JpcHQuc3JjO1xuXG5cdFx0aWYgKHNjcmlwdC5oYXNBdHRyaWJ1dGUoJ2RhdGEtbWFudWFsJykpIHtcblx0XHRcdF8ubWFudWFsID0gdHJ1ZTtcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBoaWdobGlnaHRBdXRvbWF0aWNhbGx5Q2FsbGJhY2soKSB7XG5cdFx0aWYgKCFfLm1hbnVhbCkge1xuXHRcdFx0Xy5oaWdobGlnaHRBbGwoKTtcblx0XHR9XG5cdH1cblxuXHRpZiAoIV8ubWFudWFsKSB7XG5cdFx0Ly8gSWYgdGhlIGRvY3VtZW50IHN0YXRlIGlzIFwibG9hZGluZ1wiLCB0aGVuIHdlJ2xsIHVzZSBET01Db250ZW50TG9hZGVkLlxuXHRcdC8vIElmIHRoZSBkb2N1bWVudCBzdGF0ZSBpcyBcImludGVyYWN0aXZlXCIgYW5kIHRoZSBwcmlzbS5qcyBzY3JpcHQgaXMgZGVmZXJyZWQsIHRoZW4gd2UnbGwgYWxzbyB1c2UgdGhlXG5cdFx0Ly8gRE9NQ29udGVudExvYWRlZCBldmVudCBiZWNhdXNlIHRoZXJlIG1pZ2h0IGJlIHNvbWUgcGx1Z2lucyBvciBsYW5ndWFnZXMgd2hpY2ggaGF2ZSBhbHNvIGJlZW4gZGVmZXJyZWQgYW5kIHRoZXlcblx0XHQvLyBtaWdodCB0YWtlIGxvbmdlciBvbmUgYW5pbWF0aW9uIGZyYW1lIHRvIGV4ZWN1dGUgd2hpY2ggY2FuIGNyZWF0ZSBhIHJhY2UgY29uZGl0aW9uIHdoZXJlIG9ubHkgc29tZSBwbHVnaW5zIGhhdmVcblx0XHQvLyBiZWVuIGxvYWRlZCB3aGVuIFByaXNtLmhpZ2hsaWdodEFsbCgpIGlzIGV4ZWN1dGVkLCBkZXBlbmRpbmcgb24gaG93IGZhc3QgcmVzb3VyY2VzIGFyZSBsb2FkZWQuXG5cdFx0Ly8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9QcmlzbUpTL3ByaXNtL2lzc3Vlcy8yMTAyXG5cdFx0dmFyIHJlYWR5U3RhdGUgPSBkb2N1bWVudC5yZWFkeVN0YXRlO1xuXHRcdGlmIChyZWFkeVN0YXRlID09PSAnbG9hZGluZycgfHwgcmVhZHlTdGF0ZSA9PT0gJ2ludGVyYWN0aXZlJyAmJiBzY3JpcHQgJiYgc2NyaXB0LmRlZmVyKSB7XG5cdFx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgaGlnaGxpZ2h0QXV0b21hdGljYWxseUNhbGxiYWNrKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUpIHtcblx0XHRcdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShoaWdobGlnaHRBdXRvbWF0aWNhbGx5Q2FsbGJhY2spO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0d2luZG93LnNldFRpbWVvdXQoaGlnaGxpZ2h0QXV0b21hdGljYWxseUNhbGxiYWNrLCAxNik7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIF87XG5cbn0oX3NlbGYpKTtcblxuaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdG1vZHVsZS5leHBvcnRzID0gUHJpc207XG59XG5cbi8vIGhhY2sgZm9yIGNvbXBvbmVudHMgdG8gd29yayBjb3JyZWN0bHkgaW4gbm9kZS5qc1xuaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XG5cdGdsb2JhbC5QcmlzbSA9IFByaXNtO1xufVxuXG4vLyBzb21lIGFkZGl0aW9uYWwgZG9jdW1lbnRhdGlvbi90eXBlc1xuXG4vKipcbiAqIFRoZSBleHBhbnNpb24gb2YgYSBzaW1wbGUgYFJlZ0V4cGAgbGl0ZXJhbCB0byBzdXBwb3J0IGFkZGl0aW9uYWwgcHJvcGVydGllcy5cbiAqXG4gKiBAdHlwZWRlZiBHcmFtbWFyVG9rZW5cbiAqIEBwcm9wZXJ0eSB7UmVnRXhwfSBwYXR0ZXJuIFRoZSByZWd1bGFyIGV4cHJlc3Npb24gb2YgdGhlIHRva2VuLlxuICogQHByb3BlcnR5IHtib29sZWFufSBbbG9va2JlaGluZD1mYWxzZV0gSWYgYHRydWVgLCB0aGVuIHRoZSBmaXJzdCBjYXB0dXJpbmcgZ3JvdXAgb2YgYHBhdHRlcm5gIHdpbGwgKGVmZmVjdGl2ZWx5KVxuICogYmVoYXZlIGFzIGEgbG9va2JlaGluZCBncm91cCBtZWFuaW5nIHRoYXQgdGhlIGNhcHR1cmVkIHRleHQgd2lsbCBub3QgYmUgcGFydCBvZiB0aGUgbWF0Y2hlZCB0ZXh0IG9mIHRoZSBuZXcgdG9rZW4uXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IFtncmVlZHk9ZmFsc2VdIFdoZXRoZXIgdGhlIHRva2VuIGlzIGdyZWVkeS5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfHN0cmluZ1tdfSBbYWxpYXNdIEFuIG9wdGlvbmFsIGFsaWFzIG9yIGxpc3Qgb2YgYWxpYXNlcy5cbiAqIEBwcm9wZXJ0eSB7R3JhbW1hcn0gW2luc2lkZV0gVGhlIG5lc3RlZCBncmFtbWFyIG9mIHRoaXMgdG9rZW4uXG4gKlxuICogVGhlIGBpbnNpZGVgIGdyYW1tYXIgd2lsbCBiZSB1c2VkIHRvIHRva2VuaXplIHRoZSB0ZXh0IHZhbHVlIG9mIGVhY2ggdG9rZW4gb2YgdGhpcyBraW5kLlxuICpcbiAqIFRoaXMgY2FuIGJlIHVzZWQgdG8gbWFrZSBuZXN0ZWQgYW5kIGV2ZW4gcmVjdXJzaXZlIGxhbmd1YWdlIGRlZmluaXRpb25zLlxuICpcbiAqIE5vdGU6IFRoaXMgY2FuIGNhdXNlIGluZmluaXRlIHJlY3Vyc2lvbi4gQmUgY2FyZWZ1bCB3aGVuIHlvdSBlbWJlZCBkaWZmZXJlbnQgbGFuZ3VhZ2VzIG9yIGV2ZW4gdGhlIHNhbWUgbGFuZ3VhZ2UgaW50b1xuICogZWFjaCBhbm90aGVyLlxuICogQGdsb2JhbFxuICogQHB1YmxpY1xuICovXG5cbi8qKlxuICogQHR5cGVkZWYgR3JhbW1hclxuICogQHR5cGUge09iamVjdDxzdHJpbmcsIFJlZ0V4cCB8IEdyYW1tYXJUb2tlbiB8IEFycmF5PFJlZ0V4cCB8IEdyYW1tYXJUb2tlbj4+fVxuICogQHByb3BlcnR5IHtHcmFtbWFyfSBbcmVzdF0gQW4gb3B0aW9uYWwgZ3JhbW1hciBvYmplY3QgdGhhdCB3aWxsIGJlIGFwcGVuZGVkIHRvIHRoaXMgZ3JhbW1hci5cbiAqIEBnbG9iYWxcbiAqIEBwdWJsaWNcbiAqL1xuXG4vKipcbiAqIEEgZnVuY3Rpb24gd2hpY2ggd2lsbCBpbnZva2VkIGFmdGVyIGFuIGVsZW1lbnQgd2FzIHN1Y2Nlc3NmdWxseSBoaWdobGlnaHRlZC5cbiAqXG4gKiBAY2FsbGJhY2sgSGlnaGxpZ2h0Q2FsbGJhY2tcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCBzdWNjZXNzZnVsbHkgaGlnaGxpZ2h0ZWQuXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqIEBnbG9iYWxcbiAqIEBwdWJsaWNcbiAqL1xuXG4vKipcbiAqIEBjYWxsYmFjayBIb29rQ2FsbGJhY2tcbiAqIEBwYXJhbSB7T2JqZWN0PHN0cmluZywgYW55Pn0gZW52IFRoZSBlbnZpcm9ubWVudCB2YXJpYWJsZXMgb2YgdGhlIGhvb2suXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqIEBnbG9iYWxcbiAqIEBwdWJsaWNcbiAqL1xuO1xuUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cCA9IHtcblx0J2NvbW1lbnQnOiB7XG5cdFx0cGF0dGVybjogLzwhLS0oPzooPyE8IS0tKVtcXHNcXFNdKSo/LS0+Lyxcblx0XHRncmVlZHk6IHRydWVcblx0fSxcblx0J3Byb2xvZyc6IHtcblx0XHRwYXR0ZXJuOiAvPFxcP1tcXHNcXFNdKz9cXD8+Lyxcblx0XHRncmVlZHk6IHRydWVcblx0fSxcblx0J2RvY3R5cGUnOiB7XG5cdFx0Ly8gaHR0cHM6Ly93d3cudzMub3JnL1RSL3htbC8jTlQtZG9jdHlwZWRlY2xcblx0XHRwYXR0ZXJuOiAvPCFET0NUWVBFKD86W14+XCInW1xcXV18XCJbXlwiXSpcInwnW14nXSonKSsoPzpcXFsoPzpbXjxcIidcXF1dfFwiW15cIl0qXCJ8J1teJ10qJ3w8KD8hIS0tKXw8IS0tKD86W14tXXwtKD8hLT4pKSotLT4pKlxcXVxccyopPz4vaSxcblx0XHRncmVlZHk6IHRydWUsXG5cdFx0aW5zaWRlOiB7XG5cdFx0XHQnaW50ZXJuYWwtc3Vic2V0Jzoge1xuXHRcdFx0XHRwYXR0ZXJuOiAvKF5bXlxcW10qXFxbKVtcXHNcXFNdKyg/PVxcXT4kKS8sXG5cdFx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRcdGdyZWVkeTogdHJ1ZSxcblx0XHRcdFx0aW5zaWRlOiBudWxsIC8vIHNlZSBiZWxvd1xuXHRcdFx0fSxcblx0XHRcdCdzdHJpbmcnOiB7XG5cdFx0XHRcdHBhdHRlcm46IC9cIlteXCJdKlwifCdbXiddKicvLFxuXHRcdFx0XHRncmVlZHk6IHRydWVcblx0XHRcdH0sXG5cdFx0XHQncHVuY3R1YXRpb24nOiAvXjwhfD4kfFtbXFxdXS8sXG5cdFx0XHQnZG9jdHlwZS10YWcnOiAvXkRPQ1RZUEUvaSxcblx0XHRcdCduYW1lJzogL1teXFxzPD4nXCJdKy9cblx0XHR9XG5cdH0sXG5cdCdjZGF0YSc6IHtcblx0XHRwYXR0ZXJuOiAvPCFcXFtDREFUQVxcW1tcXHNcXFNdKj9cXF1cXF0+L2ksXG5cdFx0Z3JlZWR5OiB0cnVlXG5cdH0sXG5cdCd0YWcnOiB7XG5cdFx0cGF0dGVybjogLzxcXC8/KD8hXFxkKVteXFxzPlxcLz0kPCVdKyg/Olxccyg/OlxccypbXlxccz5cXC89XSsoPzpcXHMqPVxccyooPzpcIlteXCJdKlwifCdbXiddKid8W15cXHMnXCI+PV0rKD89W1xccz5dKSl8KD89W1xccy8+XSkpKSspP1xccypcXC8/Pi8sXG5cdFx0Z3JlZWR5OiB0cnVlLFxuXHRcdGluc2lkZToge1xuXHRcdFx0J3RhZyc6IHtcblx0XHRcdFx0cGF0dGVybjogL148XFwvP1teXFxzPlxcL10rLyxcblx0XHRcdFx0aW5zaWRlOiB7XG5cdFx0XHRcdFx0J3B1bmN0dWF0aW9uJzogL148XFwvPy8sXG5cdFx0XHRcdFx0J25hbWVzcGFjZSc6IC9eW15cXHM+XFwvOl0rOi9cblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdCdzcGVjaWFsLWF0dHInOiBbXSxcblx0XHRcdCdhdHRyLXZhbHVlJzoge1xuXHRcdFx0XHRwYXR0ZXJuOiAvPVxccyooPzpcIlteXCJdKlwifCdbXiddKid8W15cXHMnXCI+PV0rKS8sXG5cdFx0XHRcdGluc2lkZToge1xuXHRcdFx0XHRcdCdwdW5jdHVhdGlvbic6IFtcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0cGF0dGVybjogL149Lyxcblx0XHRcdFx0XHRcdFx0YWxpYXM6ICdhdHRyLWVxdWFscydcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHBhdHRlcm46IC9eKFxccyopW1wiJ118W1wiJ10kLyxcblx0XHRcdFx0XHRcdFx0bG9va2JlaGluZDogdHJ1ZVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdF1cblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdCdwdW5jdHVhdGlvbic6IC9cXC8/Pi8sXG5cdFx0XHQnYXR0ci1uYW1lJzoge1xuXHRcdFx0XHRwYXR0ZXJuOiAvW15cXHM+XFwvXSsvLFxuXHRcdFx0XHRpbnNpZGU6IHtcblx0XHRcdFx0XHQnbmFtZXNwYWNlJzogL15bXlxccz5cXC86XSs6L1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHR9XG5cdH0sXG5cdCdlbnRpdHknOiBbXG5cdFx0e1xuXHRcdFx0cGF0dGVybjogLyZbXFxkYS16XXsxLDh9Oy9pLFxuXHRcdFx0YWxpYXM6ICduYW1lZC1lbnRpdHknXG5cdFx0fSxcblx0XHQvJiN4P1tcXGRhLWZdezEsOH07L2lcblx0XVxufTtcblxuUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cFsndGFnJ10uaW5zaWRlWydhdHRyLXZhbHVlJ10uaW5zaWRlWydlbnRpdHknXSA9XG5cdFByaXNtLmxhbmd1YWdlcy5tYXJrdXBbJ2VudGl0eSddO1xuUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cFsnZG9jdHlwZSddLmluc2lkZVsnaW50ZXJuYWwtc3Vic2V0J10uaW5zaWRlID0gUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cDtcblxuLy8gUGx1Z2luIHRvIG1ha2UgZW50aXR5IHRpdGxlIHNob3cgdGhlIHJlYWwgZW50aXR5LCBpZGVhIGJ5IFJvbWFuIEtvbWFyb3ZcblByaXNtLmhvb2tzLmFkZCgnd3JhcCcsIGZ1bmN0aW9uIChlbnYpIHtcblxuXHRpZiAoZW52LnR5cGUgPT09ICdlbnRpdHknKSB7XG5cdFx0ZW52LmF0dHJpYnV0ZXNbJ3RpdGxlJ10gPSBlbnYuY29udGVudC5yZXBsYWNlKC8mYW1wOy8sICcmJyk7XG5cdH1cbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cC50YWcsICdhZGRJbmxpbmVkJywge1xuXHQvKipcblx0ICogQWRkcyBhbiBpbmxpbmVkIGxhbmd1YWdlIHRvIG1hcmt1cC5cblx0ICpcblx0ICogQW4gZXhhbXBsZSBvZiBhbiBpbmxpbmVkIGxhbmd1YWdlIGlzIENTUyB3aXRoIGA8c3R5bGU+YCB0YWdzLlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdGFnTmFtZSBUaGUgbmFtZSBvZiB0aGUgdGFnIHRoYXQgY29udGFpbnMgdGhlIGlubGluZWQgbGFuZ3VhZ2UuIFRoaXMgbmFtZSB3aWxsIGJlIHRyZWF0ZWQgYXNcblx0ICogY2FzZSBpbnNlbnNpdGl2ZS5cblx0ICogQHBhcmFtIHtzdHJpbmd9IGxhbmcgVGhlIGxhbmd1YWdlIGtleS5cblx0ICogQGV4YW1wbGVcblx0ICogYWRkSW5saW5lZCgnc3R5bGUnLCAnY3NzJyk7XG5cdCAqL1xuXHR2YWx1ZTogZnVuY3Rpb24gYWRkSW5saW5lZCh0YWdOYW1lLCBsYW5nKSB7XG5cdFx0dmFyIGluY2x1ZGVkQ2RhdGFJbnNpZGUgPSB7fTtcblx0XHRpbmNsdWRlZENkYXRhSW5zaWRlWydsYW5ndWFnZS0nICsgbGFuZ10gPSB7XG5cdFx0XHRwYXR0ZXJuOiAvKF48IVxcW0NEQVRBXFxbKVtcXHNcXFNdKz8oPz1cXF1cXF0+JCkvaSxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRpbnNpZGU6IFByaXNtLmxhbmd1YWdlc1tsYW5nXVxuXHRcdH07XG5cdFx0aW5jbHVkZWRDZGF0YUluc2lkZVsnY2RhdGEnXSA9IC9ePCFcXFtDREFUQVxcW3xcXF1cXF0+JC9pO1xuXG5cdFx0dmFyIGluc2lkZSA9IHtcblx0XHRcdCdpbmNsdWRlZC1jZGF0YSc6IHtcblx0XHRcdFx0cGF0dGVybjogLzwhXFxbQ0RBVEFcXFtbXFxzXFxTXSo/XFxdXFxdPi9pLFxuXHRcdFx0XHRpbnNpZGU6IGluY2x1ZGVkQ2RhdGFJbnNpZGVcblx0XHRcdH1cblx0XHR9O1xuXHRcdGluc2lkZVsnbGFuZ3VhZ2UtJyArIGxhbmddID0ge1xuXHRcdFx0cGF0dGVybjogL1tcXHNcXFNdKy8sXG5cdFx0XHRpbnNpZGU6IFByaXNtLmxhbmd1YWdlc1tsYW5nXVxuXHRcdH07XG5cblx0XHR2YXIgZGVmID0ge307XG5cdFx0ZGVmW3RhZ05hbWVdID0ge1xuXHRcdFx0cGF0dGVybjogUmVnRXhwKC8oPF9fW14+XSo+KSg/OjwhXFxbQ0RBVEFcXFsoPzpbXlxcXV18XFxdKD8hXFxdPikpKlxcXVxcXT58KD8hPCFcXFtDREFUQVxcWylbXFxzXFxTXSkqPyg/PTxcXC9fXz4pLy5zb3VyY2UucmVwbGFjZSgvX18vZywgZnVuY3Rpb24gKCkgeyByZXR1cm4gdGFnTmFtZTsgfSksICdpJyksXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0Z3JlZWR5OiB0cnVlLFxuXHRcdFx0aW5zaWRlOiBpbnNpZGVcblx0XHR9O1xuXG5cdFx0UHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnbWFya3VwJywgJ2NkYXRhJywgZGVmKTtcblx0fVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cC50YWcsICdhZGRBdHRyaWJ1dGUnLCB7XG5cdC8qKlxuXHQgKiBBZGRzIGFuIHBhdHRlcm4gdG8gaGlnaGxpZ2h0IGxhbmd1YWdlcyBlbWJlZGRlZCBpbiBIVE1MIGF0dHJpYnV0ZXMuXG5cdCAqXG5cdCAqIEFuIGV4YW1wbGUgb2YgYW4gaW5saW5lZCBsYW5ndWFnZSBpcyBDU1Mgd2l0aCBgc3R5bGVgIGF0dHJpYnV0ZXMuXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBhdHRyTmFtZSBUaGUgbmFtZSBvZiB0aGUgdGFnIHRoYXQgY29udGFpbnMgdGhlIGlubGluZWQgbGFuZ3VhZ2UuIFRoaXMgbmFtZSB3aWxsIGJlIHRyZWF0ZWQgYXNcblx0ICogY2FzZSBpbnNlbnNpdGl2ZS5cblx0ICogQHBhcmFtIHtzdHJpbmd9IGxhbmcgVGhlIGxhbmd1YWdlIGtleS5cblx0ICogQGV4YW1wbGVcblx0ICogYWRkQXR0cmlidXRlKCdzdHlsZScsICdjc3MnKTtcblx0ICovXG5cdHZhbHVlOiBmdW5jdGlvbiAoYXR0ck5hbWUsIGxhbmcpIHtcblx0XHRQcmlzbS5sYW5ndWFnZXMubWFya3VwLnRhZy5pbnNpZGVbJ3NwZWNpYWwtYXR0ciddLnB1c2goe1xuXHRcdFx0cGF0dGVybjogUmVnRXhwKFxuXHRcdFx0XHQvKF58W1wiJ1xcc10pLy5zb3VyY2UgKyAnKD86JyArIGF0dHJOYW1lICsgJyknICsgL1xccyo9XFxzKig/OlwiW15cIl0qXCJ8J1teJ10qJ3xbXlxccydcIj49XSsoPz1bXFxzPl0pKS8uc291cmNlLFxuXHRcdFx0XHQnaSdcblx0XHRcdCksXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0aW5zaWRlOiB7XG5cdFx0XHRcdCdhdHRyLW5hbWUnOiAvXlteXFxzPV0rLyxcblx0XHRcdFx0J2F0dHItdmFsdWUnOiB7XG5cdFx0XHRcdFx0cGF0dGVybjogLz1bXFxzXFxTXSsvLFxuXHRcdFx0XHRcdGluc2lkZToge1xuXHRcdFx0XHRcdFx0J3ZhbHVlJzoge1xuXHRcdFx0XHRcdFx0XHRwYXR0ZXJuOiAvKF49XFxzKihbXCInXXwoPyFbXCInXSkpKVxcU1tcXHNcXFNdKig/PVxcMiQpLyxcblx0XHRcdFx0XHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdFx0XHRcdFx0YWxpYXM6IFtsYW5nLCAnbGFuZ3VhZ2UtJyArIGxhbmddLFxuXHRcdFx0XHRcdFx0XHRpbnNpZGU6IFByaXNtLmxhbmd1YWdlc1tsYW5nXVxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdCdwdW5jdHVhdGlvbic6IFtcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdHBhdHRlcm46IC9ePS8sXG5cdFx0XHRcdFx0XHRcdFx0YWxpYXM6ICdhdHRyLWVxdWFscydcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0L1wifCcvXG5cdFx0XHRcdFx0XHRdXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cbn0pO1xuXG5QcmlzbS5sYW5ndWFnZXMuaHRtbCA9IFByaXNtLmxhbmd1YWdlcy5tYXJrdXA7XG5QcmlzbS5sYW5ndWFnZXMubWF0aG1sID0gUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cDtcblByaXNtLmxhbmd1YWdlcy5zdmcgPSBQcmlzbS5sYW5ndWFnZXMubWFya3VwO1xuXG5QcmlzbS5sYW5ndWFnZXMueG1sID0gUHJpc20ubGFuZ3VhZ2VzLmV4dGVuZCgnbWFya3VwJywge30pO1xuUHJpc20ubGFuZ3VhZ2VzLnNzbWwgPSBQcmlzbS5sYW5ndWFnZXMueG1sO1xuUHJpc20ubGFuZ3VhZ2VzLmF0b20gPSBQcmlzbS5sYW5ndWFnZXMueG1sO1xuUHJpc20ubGFuZ3VhZ2VzLnJzcyA9IFByaXNtLmxhbmd1YWdlcy54bWw7XG5cbihmdW5jdGlvbiAoUHJpc20pIHtcblxuXHQvLyBBbGxvdyBvbmx5IG9uZSBsaW5lIGJyZWFrXG5cdHZhciBpbm5lciA9IC8oPzpcXFxcLnxbXlxcXFxcXG5cXHJdfCg/OlxcbnxcXHJcXG4/KSg/IVtcXHJcXG5dKSkvLnNvdXJjZTtcblxuXHQvKipcblx0ICogVGhpcyBmdW5jdGlvbiBpcyBpbnRlbmRlZCBmb3IgdGhlIGNyZWF0aW9uIG9mIHRoZSBib2xkIG9yIGl0YWxpYyBwYXR0ZXJuLlxuXHQgKlxuXHQgKiBUaGlzIGFsc28gYWRkcyBhIGxvb2tiZWhpbmQgZ3JvdXAgdG8gdGhlIGdpdmVuIHBhdHRlcm4gdG8gZW5zdXJlIHRoYXQgdGhlIHBhdHRlcm4gaXMgbm90IGJhY2tzbGFzaC1lc2NhcGVkLlxuXHQgKlxuXHQgKiBfTm90ZTpfIEtlZXAgaW4gbWluZCB0aGF0IHRoaXMgYWRkcyBhIGNhcHR1cmluZyBncm91cC5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IHBhdHRlcm5cblx0ICogQHJldHVybnMge1JlZ0V4cH1cblx0ICovXG5cdGZ1bmN0aW9uIGNyZWF0ZUlubGluZShwYXR0ZXJuKSB7XG5cdFx0cGF0dGVybiA9IHBhdHRlcm4ucmVwbGFjZSgvPGlubmVyPi9nLCBmdW5jdGlvbiAoKSB7IHJldHVybiBpbm5lcjsgfSk7XG5cdFx0cmV0dXJuIFJlZ0V4cCgvKCg/Ol58W15cXFxcXSkoPzpcXFxcezJ9KSopLy5zb3VyY2UgKyAnKD86JyArIHBhdHRlcm4gKyAnKScpO1xuXHR9XG5cblxuXHR2YXIgdGFibGVDZWxsID0gLyg/OlxcXFwufGBgKD86W15gXFxyXFxuXXxgKD8hYCkpK2BgfGBbXmBcXHJcXG5dK2B8W15cXFxcfFxcclxcbmBdKSsvLnNvdXJjZTtcblx0dmFyIHRhYmxlUm93ID0gL1xcfD9fXyg/OlxcfF9fKStcXHw/KD86KD86XFxufFxcclxcbj8pfCg/IVtcXHNcXFNdKSkvLnNvdXJjZS5yZXBsYWNlKC9fXy9nLCBmdW5jdGlvbiAoKSB7IHJldHVybiB0YWJsZUNlbGw7IH0pO1xuXHR2YXIgdGFibGVMaW5lID0gL1xcfD9bIFxcdF0qOj8tezMsfTo/WyBcXHRdKig/OlxcfFsgXFx0XSo6Py17Myx9Oj9bIFxcdF0qKStcXHw/KD86XFxufFxcclxcbj8pLy5zb3VyY2U7XG5cblxuXHRQcmlzbS5sYW5ndWFnZXMubWFya2Rvd24gPSBQcmlzbS5sYW5ndWFnZXMuZXh0ZW5kKCdtYXJrdXAnLCB7fSk7XG5cdFByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ21hcmtkb3duJywgJ3Byb2xvZycsIHtcblx0XHQnZnJvbnQtbWF0dGVyLWJsb2NrJzoge1xuXHRcdFx0cGF0dGVybjogLyheKD86XFxzKltcXHJcXG5dKT8pLS0tKD8hLilbXFxzXFxTXSo/W1xcclxcbl0tLS0oPyEuKS8sXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0Z3JlZWR5OiB0cnVlLFxuXHRcdFx0aW5zaWRlOiB7XG5cdFx0XHRcdCdwdW5jdHVhdGlvbic6IC9eLS0tfC0tLSQvLFxuXHRcdFx0XHQnZnJvbnQtbWF0dGVyJzoge1xuXHRcdFx0XHRcdHBhdHRlcm46IC9cXFMrKD86XFxzK1xcUyspKi8sXG5cdFx0XHRcdFx0YWxpYXM6IFsneWFtbCcsICdsYW5ndWFnZS15YW1sJ10sXG5cdFx0XHRcdFx0aW5zaWRlOiBQcmlzbS5sYW5ndWFnZXMueWFtbFxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblx0XHQnYmxvY2txdW90ZSc6IHtcblx0XHRcdC8vID4gLi4uXG5cdFx0XHRwYXR0ZXJuOiAvXj4oPzpbXFx0IF0qPikqL20sXG5cdFx0XHRhbGlhczogJ3B1bmN0dWF0aW9uJ1xuXHRcdH0sXG5cdFx0J3RhYmxlJzoge1xuXHRcdFx0cGF0dGVybjogUmVnRXhwKCdeJyArIHRhYmxlUm93ICsgdGFibGVMaW5lICsgJyg/OicgKyB0YWJsZVJvdyArICcpKicsICdtJyksXG5cdFx0XHRpbnNpZGU6IHtcblx0XHRcdFx0J3RhYmxlLWRhdGEtcm93cyc6IHtcblx0XHRcdFx0XHRwYXR0ZXJuOiBSZWdFeHAoJ14oJyArIHRhYmxlUm93ICsgdGFibGVMaW5lICsgJykoPzonICsgdGFibGVSb3cgKyAnKSokJyksXG5cdFx0XHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdFx0XHRpbnNpZGU6IHtcblx0XHRcdFx0XHRcdCd0YWJsZS1kYXRhJzoge1xuXHRcdFx0XHRcdFx0XHRwYXR0ZXJuOiBSZWdFeHAodGFibGVDZWxsKSxcblx0XHRcdFx0XHRcdFx0aW5zaWRlOiBQcmlzbS5sYW5ndWFnZXMubWFya2Rvd25cblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHQncHVuY3R1YXRpb24nOiAvXFx8L1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0J3RhYmxlLWxpbmUnOiB7XG5cdFx0XHRcdFx0cGF0dGVybjogUmVnRXhwKCdeKCcgKyB0YWJsZVJvdyArICcpJyArIHRhYmxlTGluZSArICckJyksXG5cdFx0XHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdFx0XHRpbnNpZGU6IHtcblx0XHRcdFx0XHRcdCdwdW5jdHVhdGlvbic6IC9cXHx8Oj8tezMsfTo/L1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0J3RhYmxlLWhlYWRlci1yb3cnOiB7XG5cdFx0XHRcdFx0cGF0dGVybjogUmVnRXhwKCdeJyArIHRhYmxlUm93ICsgJyQnKSxcblx0XHRcdFx0XHRpbnNpZGU6IHtcblx0XHRcdFx0XHRcdCd0YWJsZS1oZWFkZXInOiB7XG5cdFx0XHRcdFx0XHRcdHBhdHRlcm46IFJlZ0V4cCh0YWJsZUNlbGwpLFxuXHRcdFx0XHRcdFx0XHRhbGlhczogJ2ltcG9ydGFudCcsXG5cdFx0XHRcdFx0XHRcdGluc2lkZTogUHJpc20ubGFuZ3VhZ2VzLm1hcmtkb3duXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0J3B1bmN0dWF0aW9uJzogL1xcfC9cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXHRcdCdjb2RlJzogW1xuXHRcdFx0e1xuXHRcdFx0XHQvLyBQcmVmaXhlZCBieSA0IHNwYWNlcyBvciAxIHRhYiBhbmQgcHJlY2VkZWQgYnkgYW4gZW1wdHkgbGluZVxuXHRcdFx0XHRwYXR0ZXJuOiAvKCg/Ol58XFxuKVsgXFx0XSpcXG58KD86XnxcXHJcXG4/KVsgXFx0XSpcXHJcXG4/KSg/OiB7NH18XFx0KS4rKD86KD86XFxufFxcclxcbj8pKD86IHs0fXxcXHQpLispKi8sXG5cdFx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRcdGFsaWFzOiAna2V5d29yZCdcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdC8vIGBgYG9wdGlvbmFsIGxhbmd1YWdlXG5cdFx0XHRcdC8vIGNvZGUgYmxvY2tcblx0XHRcdFx0Ly8gYGBgXG5cdFx0XHRcdHBhdHRlcm46IC9eYGBgW1xcc1xcU10qP15gYGAkL20sXG5cdFx0XHRcdGdyZWVkeTogdHJ1ZSxcblx0XHRcdFx0aW5zaWRlOiB7XG5cdFx0XHRcdFx0J2NvZGUtYmxvY2snOiB7XG5cdFx0XHRcdFx0XHRwYXR0ZXJuOiAvXihgYGAuKig/OlxcbnxcXHJcXG4/KSlbXFxzXFxTXSs/KD89KD86XFxufFxcclxcbj8pXmBgYCQpL20sXG5cdFx0XHRcdFx0XHRsb29rYmVoaW5kOiB0cnVlXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHQnY29kZS1sYW5ndWFnZSc6IHtcblx0XHRcdFx0XHRcdHBhdHRlcm46IC9eKGBgYCkuKy8sXG5cdFx0XHRcdFx0XHRsb29rYmVoaW5kOiB0cnVlXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHQncHVuY3R1YXRpb24nOiAvYGBgL1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XSxcblx0XHQndGl0bGUnOiBbXG5cdFx0XHR7XG5cdFx0XHRcdC8vIHRpdGxlIDFcblx0XHRcdFx0Ly8gPT09PT09PVxuXG5cdFx0XHRcdC8vIHRpdGxlIDJcblx0XHRcdFx0Ly8gLS0tLS0tLVxuXHRcdFx0XHRwYXR0ZXJuOiAvXFxTLiooPzpcXG58XFxyXFxuPykoPzo9PSt8LS0rKSg/PVsgXFx0XSokKS9tLFxuXHRcdFx0XHRhbGlhczogJ2ltcG9ydGFudCcsXG5cdFx0XHRcdGluc2lkZToge1xuXHRcdFx0XHRcdHB1bmN0dWF0aW9uOiAvPT0rJHwtLSskL1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHQvLyAjIHRpdGxlIDFcblx0XHRcdFx0Ly8gIyMjIyMjIHRpdGxlIDZcblx0XHRcdFx0cGF0dGVybjogLyheXFxzKikjLisvbSxcblx0XHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdFx0YWxpYXM6ICdpbXBvcnRhbnQnLFxuXHRcdFx0XHRpbnNpZGU6IHtcblx0XHRcdFx0XHRwdW5jdHVhdGlvbjogL14jK3wjKyQvXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRdLFxuXHRcdCdocic6IHtcblx0XHRcdC8vICoqKlxuXHRcdFx0Ly8gLS0tXG5cdFx0XHQvLyAqICogKlxuXHRcdFx0Ly8gLS0tLS0tLS0tLS1cblx0XHRcdHBhdHRlcm46IC8oXlxccyopKFsqLV0pKD86W1xcdCBdKlxcMil7Mix9KD89XFxzKiQpL20sXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0YWxpYXM6ICdwdW5jdHVhdGlvbidcblx0XHR9LFxuXHRcdCdsaXN0Jzoge1xuXHRcdFx0Ly8gKiBpdGVtXG5cdFx0XHQvLyArIGl0ZW1cblx0XHRcdC8vIC0gaXRlbVxuXHRcdFx0Ly8gMS4gaXRlbVxuXHRcdFx0cGF0dGVybjogLyheXFxzKikoPzpbKistXXxcXGQrXFwuKSg/PVtcXHQgXS4pL20sXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0YWxpYXM6ICdwdW5jdHVhdGlvbidcblx0XHR9LFxuXHRcdCd1cmwtcmVmZXJlbmNlJzoge1xuXHRcdFx0Ly8gW2lkXTogaHR0cDovL2V4YW1wbGUuY29tIFwiT3B0aW9uYWwgdGl0bGVcIlxuXHRcdFx0Ly8gW2lkXTogaHR0cDovL2V4YW1wbGUuY29tICdPcHRpb25hbCB0aXRsZSdcblx0XHRcdC8vIFtpZF06IGh0dHA6Ly9leGFtcGxlLmNvbSAoT3B0aW9uYWwgdGl0bGUpXG5cdFx0XHQvLyBbaWRdOiA8aHR0cDovL2V4YW1wbGUuY29tPiBcIk9wdGlvbmFsIHRpdGxlXCJcblx0XHRcdHBhdHRlcm46IC8hP1xcW1teXFxdXStcXF06W1xcdCBdKyg/OlxcUyt8PCg/OlxcXFwufFtePlxcXFxdKSs+KSg/OltcXHQgXSsoPzpcIig/OlxcXFwufFteXCJcXFxcXSkqXCJ8Jyg/OlxcXFwufFteJ1xcXFxdKSonfFxcKCg/OlxcXFwufFteKVxcXFxdKSpcXCkpKT8vLFxuXHRcdFx0aW5zaWRlOiB7XG5cdFx0XHRcdCd2YXJpYWJsZSc6IHtcblx0XHRcdFx0XHRwYXR0ZXJuOiAvXighP1xcWylbXlxcXV0rLyxcblx0XHRcdFx0XHRsb29rYmVoaW5kOiB0cnVlXG5cdFx0XHRcdH0sXG5cdFx0XHRcdCdzdHJpbmcnOiAvKD86XCIoPzpcXFxcLnxbXlwiXFxcXF0pKlwifCcoPzpcXFxcLnxbXidcXFxcXSkqJ3xcXCgoPzpcXFxcLnxbXilcXFxcXSkqXFwpKSQvLFxuXHRcdFx0XHQncHVuY3R1YXRpb24nOiAvXltcXFtcXF0hOl18Wzw+XS9cblx0XHRcdH0sXG5cdFx0XHRhbGlhczogJ3VybCdcblx0XHR9LFxuXHRcdCdib2xkJzoge1xuXHRcdFx0Ly8gKipzdHJvbmcqKlxuXHRcdFx0Ly8gX19zdHJvbmdfX1xuXG5cdFx0XHQvLyBhbGxvdyBvbmUgbmVzdGVkIGluc3RhbmNlIG9mIGl0YWxpYyB0ZXh0IHVzaW5nIHRoZSBzYW1lIGRlbGltaXRlclxuXHRcdFx0cGF0dGVybjogY3JlYXRlSW5saW5lKC9cXGJfXyg/Oig/IV8pPGlubmVyPnxfKD86KD8hXyk8aW5uZXI+KStfKStfX1xcYnxcXCpcXCooPzooPyFcXCopPGlubmVyPnxcXCooPzooPyFcXCopPGlubmVyPikrXFwqKStcXCpcXCovLnNvdXJjZSksXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0Z3JlZWR5OiB0cnVlLFxuXHRcdFx0aW5zaWRlOiB7XG5cdFx0XHRcdCdjb250ZW50Jzoge1xuXHRcdFx0XHRcdHBhdHRlcm46IC8oXi4uKVtcXHNcXFNdKyg/PS4uJCkvLFxuXHRcdFx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRcdFx0aW5zaWRlOiB7fSAvLyBzZWUgYmVsb3dcblx0XHRcdFx0fSxcblx0XHRcdFx0J3B1bmN0dWF0aW9uJzogL1xcKlxcKnxfXy9cblx0XHRcdH1cblx0XHR9LFxuXHRcdCdpdGFsaWMnOiB7XG5cdFx0XHQvLyAqZW0qXG5cdFx0XHQvLyBfZW1fXG5cblx0XHRcdC8vIGFsbG93IG9uZSBuZXN0ZWQgaW5zdGFuY2Ugb2YgYm9sZCB0ZXh0IHVzaW5nIHRoZSBzYW1lIGRlbGltaXRlclxuXHRcdFx0cGF0dGVybjogY3JlYXRlSW5saW5lKC9cXGJfKD86KD8hXyk8aW5uZXI+fF9fKD86KD8hXyk8aW5uZXI+KStfXykrX1xcYnxcXCooPzooPyFcXCopPGlubmVyPnxcXCpcXCooPzooPyFcXCopPGlubmVyPikrXFwqXFwqKStcXCovLnNvdXJjZSksXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0Z3JlZWR5OiB0cnVlLFxuXHRcdFx0aW5zaWRlOiB7XG5cdFx0XHRcdCdjb250ZW50Jzoge1xuXHRcdFx0XHRcdHBhdHRlcm46IC8oXi4pW1xcc1xcU10rKD89LiQpLyxcblx0XHRcdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0XHRcdGluc2lkZToge30gLy8gc2VlIGJlbG93XG5cdFx0XHRcdH0sXG5cdFx0XHRcdCdwdW5jdHVhdGlvbic6IC9bKl9dL1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0J3N0cmlrZSc6IHtcblx0XHRcdC8vIH5+c3RyaWtlIHRocm91Z2h+flxuXHRcdFx0Ly8gfnN0cmlrZX5cblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWdleHAvc3RyaWN0XG5cdFx0XHRwYXR0ZXJuOiBjcmVhdGVJbmxpbmUoLyh+fj8pKD86KD8hfik8aW5uZXI+KStcXDIvLnNvdXJjZSksXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0Z3JlZWR5OiB0cnVlLFxuXHRcdFx0aW5zaWRlOiB7XG5cdFx0XHRcdCdjb250ZW50Jzoge1xuXHRcdFx0XHRcdHBhdHRlcm46IC8oXn5+PylbXFxzXFxTXSsoPz1cXDEkKS8sXG5cdFx0XHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdFx0XHRpbnNpZGU6IHt9IC8vIHNlZSBiZWxvd1xuXHRcdFx0XHR9LFxuXHRcdFx0XHQncHVuY3R1YXRpb24nOiAvfn4/L1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0J2NvZGUtc25pcHBldCc6IHtcblx0XHRcdC8vIGBjb2RlYFxuXHRcdFx0Ly8gYGBjb2RlYGBcblx0XHRcdHBhdHRlcm46IC8oXnxbXlxcXFxgXSkoPzpgYFteYFxcclxcbl0rKD86YFteYFxcclxcbl0rKSpgYCg/IWApfGBbXmBcXHJcXG5dK2AoPyFgKSkvLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdGdyZWVkeTogdHJ1ZSxcblx0XHRcdGFsaWFzOiBbJ2NvZGUnLCAna2V5d29yZCddXG5cdFx0fSxcblx0XHQndXJsJzoge1xuXHRcdFx0Ly8gW2V4YW1wbGVdKGh0dHA6Ly9leGFtcGxlLmNvbSBcIk9wdGlvbmFsIHRpdGxlXCIpXG5cdFx0XHQvLyBbZXhhbXBsZV1baWRdXG5cdFx0XHQvLyBbZXhhbXBsZV0gW2lkXVxuXHRcdFx0cGF0dGVybjogY3JlYXRlSW5saW5lKC8hP1xcWyg/Oig/IVxcXSk8aW5uZXI+KStcXF0oPzpcXChbXlxccyldKyg/OltcXHQgXStcIig/OlxcXFwufFteXCJcXFxcXSkqXCIpP1xcKXxbIFxcdF0/XFxbKD86KD8hXFxdKTxpbm5lcj4pK1xcXSkvLnNvdXJjZSksXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0Z3JlZWR5OiB0cnVlLFxuXHRcdFx0aW5zaWRlOiB7XG5cdFx0XHRcdCdvcGVyYXRvcic6IC9eIS8sXG5cdFx0XHRcdCdjb250ZW50Jzoge1xuXHRcdFx0XHRcdHBhdHRlcm46IC8oXlxcWylbXlxcXV0rKD89XFxdKS8sXG5cdFx0XHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdFx0XHRpbnNpZGU6IHt9IC8vIHNlZSBiZWxvd1xuXHRcdFx0XHR9LFxuXHRcdFx0XHQndmFyaWFibGUnOiB7XG5cdFx0XHRcdFx0cGF0dGVybjogLyheXFxdWyBcXHRdP1xcWylbXlxcXV0rKD89XFxdJCkvLFxuXHRcdFx0XHRcdGxvb2tiZWhpbmQ6IHRydWVcblx0XHRcdFx0fSxcblx0XHRcdFx0J3VybCc6IHtcblx0XHRcdFx0XHRwYXR0ZXJuOiAvKF5cXF1cXCgpW15cXHMpXSsvLFxuXHRcdFx0XHRcdGxvb2tiZWhpbmQ6IHRydWVcblx0XHRcdFx0fSxcblx0XHRcdFx0J3N0cmluZyc6IHtcblx0XHRcdFx0XHRwYXR0ZXJuOiAvKF5bIFxcdF0rKVwiKD86XFxcXC58W15cIlxcXFxdKSpcIig/PVxcKSQpLyxcblx0XHRcdFx0XHRsb29rYmVoaW5kOiB0cnVlXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0pO1xuXG5cdFsndXJsJywgJ2JvbGQnLCAnaXRhbGljJywgJ3N0cmlrZSddLmZvckVhY2goZnVuY3Rpb24gKHRva2VuKSB7XG5cdFx0Wyd1cmwnLCAnYm9sZCcsICdpdGFsaWMnLCAnc3RyaWtlJywgJ2NvZGUtc25pcHBldCddLmZvckVhY2goZnVuY3Rpb24gKGluc2lkZSkge1xuXHRcdFx0aWYgKHRva2VuICE9PSBpbnNpZGUpIHtcblx0XHRcdFx0UHJpc20ubGFuZ3VhZ2VzLm1hcmtkb3duW3Rva2VuXS5pbnNpZGUuY29udGVudC5pbnNpZGVbaW5zaWRlXSA9IFByaXNtLmxhbmd1YWdlcy5tYXJrZG93bltpbnNpZGVdO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9KTtcblxuXHRQcmlzbS5ob29rcy5hZGQoJ2FmdGVyLXRva2VuaXplJywgZnVuY3Rpb24gKGVudikge1xuXHRcdGlmIChlbnYubGFuZ3VhZ2UgIT09ICdtYXJrZG93bicgJiYgZW52Lmxhbmd1YWdlICE9PSAnbWQnKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gd2Fsa1Rva2Vucyh0b2tlbnMpIHtcblx0XHRcdGlmICghdG9rZW5zIHx8IHR5cGVvZiB0b2tlbnMgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Zm9yICh2YXIgaSA9IDAsIGwgPSB0b2tlbnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG5cdFx0XHRcdHZhciB0b2tlbiA9IHRva2Vuc1tpXTtcblxuXHRcdFx0XHRpZiAodG9rZW4udHlwZSAhPT0gJ2NvZGUnKSB7XG5cdFx0XHRcdFx0d2Fsa1Rva2Vucyh0b2tlbi5jb250ZW50KTtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qXG5cdFx0XHRcdCAqIEFkZCB0aGUgY29ycmVjdCBgbGFuZ3VhZ2UteHh4eGAgY2xhc3MgdG8gdGhpcyBjb2RlIGJsb2NrLiBLZWVwIGluIG1pbmQgdGhhdCB0aGUgYGNvZGUtbGFuZ3VhZ2VgIHRva2VuXG5cdFx0XHRcdCAqIGlzIG9wdGlvbmFsLiBCdXQgdGhlIGdyYW1tYXIgaXMgZGVmaW5lZCBzbyB0aGF0IHRoZXJlIGlzIG9ubHkgb25lIGNhc2Ugd2UgaGF2ZSB0byBoYW5kbGU6XG5cdFx0XHRcdCAqXG5cdFx0XHRcdCAqIHRva2VuLmNvbnRlbnQgPSBbXG5cdFx0XHRcdCAqICAgICA8c3BhbiBjbGFzcz1cInB1bmN0dWF0aW9uXCI+YGBgPC9zcGFuPixcblx0XHRcdFx0ICogICAgIDxzcGFuIGNsYXNzPVwiY29kZS1sYW5ndWFnZVwiPnh4eHg8L3NwYW4+LFxuXHRcdFx0XHQgKiAgICAgJ1xcbicsIC8vIGV4YWN0bHkgb25lIG5ldyBsaW5lcyAoXFxyIG9yIFxcbiBvciBcXHJcXG4pXG5cdFx0XHRcdCAqICAgICA8c3BhbiBjbGFzcz1cImNvZGUtYmxvY2tcIj4uLi48L3NwYW4+LFxuXHRcdFx0XHQgKiAgICAgJ1xcbicsIC8vIGV4YWN0bHkgb25lIG5ldyBsaW5lcyBhZ2FpblxuXHRcdFx0XHQgKiAgICAgPHNwYW4gY2xhc3M9XCJwdW5jdHVhdGlvblwiPmBgYDwvc3Bhbj5cblx0XHRcdFx0ICogXTtcblx0XHRcdFx0ICovXG5cblx0XHRcdFx0dmFyIGNvZGVMYW5nID0gdG9rZW4uY29udGVudFsxXTtcblx0XHRcdFx0dmFyIGNvZGVCbG9jayA9IHRva2VuLmNvbnRlbnRbM107XG5cblx0XHRcdFx0aWYgKGNvZGVMYW5nICYmIGNvZGVCbG9jayAmJlxuXHRcdFx0XHRcdGNvZGVMYW5nLnR5cGUgPT09ICdjb2RlLWxhbmd1YWdlJyAmJiBjb2RlQmxvY2sudHlwZSA9PT0gJ2NvZGUtYmxvY2snICYmXG5cdFx0XHRcdFx0dHlwZW9mIGNvZGVMYW5nLmNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG5cblx0XHRcdFx0XHQvLyB0aGlzIG1pZ2h0IGJlIGEgbGFuZ3VhZ2UgdGhhdCBQcmlzbSBkb2VzIG5vdCBzdXBwb3J0XG5cblx0XHRcdFx0XHQvLyBkbyBzb21lIHJlcGxhY2VtZW50cyB0byBzdXBwb3J0IEMrKywgQyMsIGFuZCBGI1xuXHRcdFx0XHRcdHZhciBsYW5nID0gY29kZUxhbmcuY29udGVudC5yZXBsYWNlKC9cXGIjL2csICdzaGFycCcpLnJlcGxhY2UoL1xcYlxcK1xcKy9nLCAncHAnKTtcblx0XHRcdFx0XHQvLyBvbmx5IHVzZSB0aGUgZmlyc3Qgd29yZFxuXHRcdFx0XHRcdGxhbmcgPSAoL1thLXpdW1xcdy1dKi9pLmV4ZWMobGFuZykgfHwgWycnXSlbMF0udG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XHR2YXIgYWxpYXMgPSAnbGFuZ3VhZ2UtJyArIGxhbmc7XG5cblx0XHRcdFx0XHQvLyBhZGQgYWxpYXNcblx0XHRcdFx0XHRpZiAoIWNvZGVCbG9jay5hbGlhcykge1xuXHRcdFx0XHRcdFx0Y29kZUJsb2NrLmFsaWFzID0gW2FsaWFzXTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHR5cGVvZiBjb2RlQmxvY2suYWxpYXMgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdFx0XHRjb2RlQmxvY2suYWxpYXMgPSBbY29kZUJsb2NrLmFsaWFzLCBhbGlhc107XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGNvZGVCbG9jay5hbGlhcy5wdXNoKGFsaWFzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHR3YWxrVG9rZW5zKGVudi50b2tlbnMpO1xuXHR9KTtcblxuXHRQcmlzbS5ob29rcy5hZGQoJ3dyYXAnLCBmdW5jdGlvbiAoZW52KSB7XG5cdFx0aWYgKGVudi50eXBlICE9PSAnY29kZS1ibG9jaycpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHR2YXIgY29kZUxhbmcgPSAnJztcblx0XHRmb3IgKHZhciBpID0gMCwgbCA9IGVudi5jbGFzc2VzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuXHRcdFx0dmFyIGNscyA9IGVudi5jbGFzc2VzW2ldO1xuXHRcdFx0dmFyIG1hdGNoID0gL2xhbmd1YWdlLSguKykvLmV4ZWMoY2xzKTtcblx0XHRcdGlmIChtYXRjaCkge1xuXHRcdFx0XHRjb2RlTGFuZyA9IG1hdGNoWzFdO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cblx0XHR2YXIgZ3JhbW1hciA9IFByaXNtLmxhbmd1YWdlc1tjb2RlTGFuZ107XG5cblx0XHRpZiAoIWdyYW1tYXIpIHtcblx0XHRcdGlmIChjb2RlTGFuZyAmJiBjb2RlTGFuZyAhPT0gJ25vbmUnICYmIFByaXNtLnBsdWdpbnMuYXV0b2xvYWRlcikge1xuXHRcdFx0XHR2YXIgaWQgPSAnbWQtJyArIG5ldyBEYXRlKCkudmFsdWVPZigpICsgJy0nICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMWUxNik7XG5cdFx0XHRcdGVudi5hdHRyaWJ1dGVzWydpZCddID0gaWQ7XG5cblx0XHRcdFx0UHJpc20ucGx1Z2lucy5hdXRvbG9hZGVyLmxvYWRMYW5ndWFnZXMoY29kZUxhbmcsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHR2YXIgZWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuXHRcdFx0XHRcdGlmIChlbGUpIHtcblx0XHRcdFx0XHRcdGVsZS5pbm5lckhUTUwgPSBQcmlzbS5oaWdobGlnaHQoZWxlLnRleHRDb250ZW50LCBQcmlzbS5sYW5ndWFnZXNbY29kZUxhbmddLCBjb2RlTGFuZyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0ZW52LmNvbnRlbnQgPSBQcmlzbS5oaWdobGlnaHQodGV4dENvbnRlbnQoZW52LmNvbnRlbnQpLCBncmFtbWFyLCBjb2RlTGFuZyk7XG5cdFx0fVxuXHR9KTtcblxuXHR2YXIgdGFnUGF0dGVybiA9IFJlZ0V4cChQcmlzbS5sYW5ndWFnZXMubWFya3VwLnRhZy5wYXR0ZXJuLnNvdXJjZSwgJ2dpJyk7XG5cblx0LyoqXG5cdCAqIEEgbGlzdCBvZiBrbm93biBlbnRpdHkgbmFtZXMuXG5cdCAqXG5cdCAqIFRoaXMgd2lsbCBhbHdheXMgYmUgaW5jb21wbGV0ZSB0byBzYXZlIHNwYWNlLiBUaGUgY3VycmVudCBsaXN0IGlzIHRoZSBvbmUgdXNlZCBieSBsb3dkYXNoJ3MgdW5lc2NhcGUgZnVuY3Rpb24uXG5cdCAqXG5cdCAqIEBzZWUge0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9sb2Rhc2gvbG9kYXNoL2Jsb2IvMmRhMDI0YzNiNGY5OTQ3YTQ4NTE3NjM5ZGU3NTYwNDU3Y2Q0ZWM2Yy91bmVzY2FwZS5qcyNMMn1cblx0ICovXG5cdHZhciBLTk9XTl9FTlRJVFlfTkFNRVMgPSB7XG5cdFx0J2FtcCc6ICcmJyxcblx0XHQnbHQnOiAnPCcsXG5cdFx0J2d0JzogJz4nLFxuXHRcdCdxdW90JzogJ1wiJyxcblx0fTtcblxuXHQvLyBJRSAxMSBkb2Vzbid0IHN1cHBvcnQgYFN0cmluZy5mcm9tQ29kZVBvaW50YFxuXHR2YXIgZnJvbUNvZGVQb2ludCA9IFN0cmluZy5mcm9tQ29kZVBvaW50IHx8IFN0cmluZy5mcm9tQ2hhckNvZGU7XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIHRleHQgY29udGVudCBvZiBhIGdpdmVuIEhUTUwgc291cmNlIGNvZGUgc3RyaW5nLlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gaHRtbFxuXHQgKiBAcmV0dXJucyB7c3RyaW5nfVxuXHQgKi9cblx0ZnVuY3Rpb24gdGV4dENvbnRlbnQoaHRtbCkge1xuXHRcdC8vIHJlbW92ZSBhbGwgdGFnc1xuXHRcdHZhciB0ZXh0ID0gaHRtbC5yZXBsYWNlKHRhZ1BhdHRlcm4sICcnKTtcblxuXHRcdC8vIGRlY29kZSBrbm93biBlbnRpdGllc1xuXHRcdHRleHQgPSB0ZXh0LnJlcGxhY2UoLyYoXFx3ezEsOH18I3g/W1xcZGEtZl17MSw4fSk7L2dpLCBmdW5jdGlvbiAobSwgY29kZSkge1xuXHRcdFx0Y29kZSA9IGNvZGUudG9Mb3dlckNhc2UoKTtcblxuXHRcdFx0aWYgKGNvZGVbMF0gPT09ICcjJykge1xuXHRcdFx0XHR2YXIgdmFsdWU7XG5cdFx0XHRcdGlmIChjb2RlWzFdID09PSAneCcpIHtcblx0XHRcdFx0XHR2YWx1ZSA9IHBhcnNlSW50KGNvZGUuc2xpY2UoMiksIDE2KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR2YWx1ZSA9IE51bWJlcihjb2RlLnNsaWNlKDEpKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBmcm9tQ29kZVBvaW50KHZhbHVlKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHZhciBrbm93biA9IEtOT1dOX0VOVElUWV9OQU1FU1tjb2RlXTtcblx0XHRcdFx0aWYgKGtub3duKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGtub3duO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gdW5hYmxlIHRvIGRlY29kZVxuXHRcdFx0XHRyZXR1cm4gbTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHJldHVybiB0ZXh0O1xuXHR9XG5cblx0UHJpc20ubGFuZ3VhZ2VzLm1kID0gUHJpc20ubGFuZ3VhZ2VzLm1hcmtkb3duO1xuXG59KFByaXNtKSk7XG5cbiIsImNvbnN0IGdsb2JhbFdpbmRvdyA9IHdpbmRvdztcbmV4cG9ydCBmdW5jdGlvbiBDb2RlSmFyKGVkaXRvciwgaGlnaGxpZ2h0LCBvcHQgPSB7fSkge1xuICAgIGNvbnN0IG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHsgdGFiOiAnXFx0JywgaW5kZW50T246IC9bKHtcXFtdJC8sIG1vdmVUb05ld0xpbmU6IC9eWyl9XFxdXS8sIHNwZWxsY2hlY2s6IGZhbHNlLCBjYXRjaFRhYjogdHJ1ZSwgcHJlc2VydmVJZGVudDogdHJ1ZSwgYWRkQ2xvc2luZzogdHJ1ZSwgaGlzdG9yeTogdHJ1ZSwgd2luZG93OiBnbG9iYWxXaW5kb3cgfSwgb3B0KTtcbiAgICBjb25zdCB3aW5kb3cgPSBvcHRpb25zLndpbmRvdztcbiAgICBjb25zdCBkb2N1bWVudCA9IHdpbmRvdy5kb2N1bWVudDtcbiAgICBsZXQgbGlzdGVuZXJzID0gW107XG4gICAgbGV0IGhpc3RvcnkgPSBbXTtcbiAgICBsZXQgYXQgPSAtMTtcbiAgICBsZXQgZm9jdXMgPSBmYWxzZTtcbiAgICBsZXQgY2FsbGJhY2s7XG4gICAgbGV0IHByZXY7IC8vIGNvZGUgY29udGVudCBwcmlvciBrZXlkb3duIGV2ZW50XG4gICAgZWRpdG9yLnNldEF0dHJpYnV0ZSgnY29udGVudGVkaXRhYmxlJywgJ3BsYWludGV4dC1vbmx5Jyk7XG4gICAgZWRpdG9yLnNldEF0dHJpYnV0ZSgnc3BlbGxjaGVjaycsIG9wdGlvbnMuc3BlbGxjaGVjayA/ICd0cnVlJyA6ICdmYWxzZScpO1xuICAgIGVkaXRvci5zdHlsZS5vdXRsaW5lID0gJ25vbmUnO1xuICAgIGVkaXRvci5zdHlsZS5vdmVyZmxvd1dyYXAgPSAnYnJlYWstd29yZCc7XG4gICAgZWRpdG9yLnN0eWxlLm92ZXJmbG93WSA9ICdhdXRvJztcbiAgICBlZGl0b3Iuc3R5bGUud2hpdGVTcGFjZSA9ICdwcmUtd3JhcCc7XG4gICAgbGV0IGlzTGVnYWN5ID0gZmFsc2U7IC8vIHRydWUgaWYgcGxhaW50ZXh0LW9ubHkgaXMgbm90IHN1cHBvcnRlZFxuICAgIGhpZ2hsaWdodChlZGl0b3IpO1xuICAgIGlmIChlZGl0b3IuY29udGVudEVkaXRhYmxlICE9PSAncGxhaW50ZXh0LW9ubHknKVxuICAgICAgICBpc0xlZ2FjeSA9IHRydWU7XG4gICAgaWYgKGlzTGVnYWN5KVxuICAgICAgICBlZGl0b3Iuc2V0QXR0cmlidXRlKCdjb250ZW50ZWRpdGFibGUnLCAndHJ1ZScpO1xuICAgIGNvbnN0IGRlYm91bmNlSGlnaGxpZ2h0ID0gZGVib3VuY2UoKCkgPT4ge1xuICAgICAgICBjb25zdCBwb3MgPSBzYXZlKCk7XG4gICAgICAgIGhpZ2hsaWdodChlZGl0b3IsIHBvcyk7XG4gICAgICAgIHJlc3RvcmUocG9zKTtcbiAgICB9LCAzMCk7XG4gICAgbGV0IHJlY29yZGluZyA9IGZhbHNlO1xuICAgIGNvbnN0IHNob3VsZFJlY29yZCA9IChldmVudCkgPT4ge1xuICAgICAgICByZXR1cm4gIWlzVW5kbyhldmVudCkgJiYgIWlzUmVkbyhldmVudClcbiAgICAgICAgICAgICYmIGV2ZW50LmtleSAhPT0gJ01ldGEnXG4gICAgICAgICAgICAmJiBldmVudC5rZXkgIT09ICdDb250cm9sJ1xuICAgICAgICAgICAgJiYgZXZlbnQua2V5ICE9PSAnQWx0J1xuICAgICAgICAgICAgJiYgIWV2ZW50LmtleS5zdGFydHNXaXRoKCdBcnJvdycpO1xuICAgIH07XG4gICAgY29uc3QgZGVib3VuY2VSZWNvcmRIaXN0b3J5ID0gZGVib3VuY2UoKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChzaG91bGRSZWNvcmQoZXZlbnQpKSB7XG4gICAgICAgICAgICByZWNvcmRIaXN0b3J5KCk7XG4gICAgICAgICAgICByZWNvcmRpbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0sIDMwMCk7XG4gICAgY29uc3Qgb24gPSAodHlwZSwgZm4pID0+IHtcbiAgICAgICAgbGlzdGVuZXJzLnB1c2goW3R5cGUsIGZuXSk7XG4gICAgICAgIGVkaXRvci5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGZuKTtcbiAgICB9O1xuICAgIG9uKCdrZXlkb3duJywgZXZlbnQgPT4ge1xuICAgICAgICBpZiAoZXZlbnQuZGVmYXVsdFByZXZlbnRlZClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgcHJldiA9IHRvU3RyaW5nKCk7XG4gICAgICAgIGlmIChvcHRpb25zLnByZXNlcnZlSWRlbnQpXG4gICAgICAgICAgICBoYW5kbGVOZXdMaW5lKGV2ZW50KTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgbGVnYWN5TmV3TGluZUZpeChldmVudCk7XG4gICAgICAgIGlmIChvcHRpb25zLmNhdGNoVGFiKVxuICAgICAgICAgICAgaGFuZGxlVGFiQ2hhcmFjdGVycyhldmVudCk7XG4gICAgICAgIGlmIChvcHRpb25zLmFkZENsb3NpbmcpXG4gICAgICAgICAgICBoYW5kbGVTZWxmQ2xvc2luZ0NoYXJhY3RlcnMoZXZlbnQpO1xuICAgICAgICBpZiAob3B0aW9ucy5oaXN0b3J5KSB7XG4gICAgICAgICAgICBoYW5kbGVVbmRvUmVkbyhldmVudCk7XG4gICAgICAgICAgICBpZiAoc2hvdWxkUmVjb3JkKGV2ZW50KSAmJiAhcmVjb3JkaW5nKSB7XG4gICAgICAgICAgICAgICAgcmVjb3JkSGlzdG9yeSgpO1xuICAgICAgICAgICAgICAgIHJlY29yZGluZyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzTGVnYWN5ICYmICFpc0NvcHkoZXZlbnQpKVxuICAgICAgICAgICAgcmVzdG9yZShzYXZlKCkpO1xuICAgIH0pO1xuICAgIG9uKCdrZXl1cCcsIGV2ZW50ID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmIChldmVudC5pc0NvbXBvc2luZylcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgaWYgKHByZXYgIT09IHRvU3RyaW5nKCkpXG4gICAgICAgICAgICBkZWJvdW5jZUhpZ2hsaWdodCgpO1xuICAgICAgICBkZWJvdW5jZVJlY29yZEhpc3RvcnkoZXZlbnQpO1xuICAgICAgICBpZiAoY2FsbGJhY2spXG4gICAgICAgICAgICBjYWxsYmFjayh0b1N0cmluZygpKTtcbiAgICB9KTtcbiAgICBvbignZm9jdXMnLCBfZXZlbnQgPT4ge1xuICAgICAgICBmb2N1cyA9IHRydWU7XG4gICAgfSk7XG4gICAgb24oJ2JsdXInLCBfZXZlbnQgPT4ge1xuICAgICAgICBmb2N1cyA9IGZhbHNlO1xuICAgIH0pO1xuICAgIG9uKCdwYXN0ZScsIGV2ZW50ID0+IHtcbiAgICAgICAgcmVjb3JkSGlzdG9yeSgpO1xuICAgICAgICBoYW5kbGVQYXN0ZShldmVudCk7XG4gICAgICAgIHJlY29yZEhpc3RvcnkoKTtcbiAgICAgICAgaWYgKGNhbGxiYWNrKVxuICAgICAgICAgICAgY2FsbGJhY2sodG9TdHJpbmcoKSk7XG4gICAgfSk7XG4gICAgZnVuY3Rpb24gc2F2ZSgpIHtcbiAgICAgICAgY29uc3QgcyA9IGdldFNlbGVjdGlvbigpO1xuICAgICAgICBjb25zdCBwb3MgPSB7IHN0YXJ0OiAwLCBlbmQ6IDAsIGRpcjogdW5kZWZpbmVkIH07XG4gICAgICAgIGxldCB7IGFuY2hvck5vZGUsIGFuY2hvck9mZnNldCwgZm9jdXNOb2RlLCBmb2N1c09mZnNldCB9ID0gcztcbiAgICAgICAgaWYgKCFhbmNob3JOb2RlIHx8ICFmb2N1c05vZGUpXG4gICAgICAgICAgICB0aHJvdyAnZXJyb3IxJztcbiAgICAgICAgLy8gSWYgdGhlIGFuY2hvciBhbmQgZm9jdXMgYXJlIHRoZSBlZGl0b3IgZWxlbWVudCwgcmV0dXJuIGVpdGhlciBhIGZ1bGxcbiAgICAgICAgLy8gaGlnaGxpZ2h0IG9yIGEgc3RhcnQvZW5kIGN1cnNvciBwb3NpdGlvbiBkZXBlbmRpbmcgb24gdGhlIHNlbGVjdGlvblxuICAgICAgICBpZiAoYW5jaG9yTm9kZSA9PT0gZWRpdG9yICYmIGZvY3VzTm9kZSA9PT0gZWRpdG9yKSB7XG4gICAgICAgICAgICBwb3Muc3RhcnQgPSAoYW5jaG9yT2Zmc2V0ID4gMCAmJiBlZGl0b3IudGV4dENvbnRlbnQpID8gZWRpdG9yLnRleHRDb250ZW50Lmxlbmd0aCA6IDA7XG4gICAgICAgICAgICBwb3MuZW5kID0gKGZvY3VzT2Zmc2V0ID4gMCAmJiBlZGl0b3IudGV4dENvbnRlbnQpID8gZWRpdG9yLnRleHRDb250ZW50Lmxlbmd0aCA6IDA7XG4gICAgICAgICAgICBwb3MuZGlyID0gKGZvY3VzT2Zmc2V0ID49IGFuY2hvck9mZnNldCkgPyAnLT4nIDogJzwtJztcbiAgICAgICAgICAgIHJldHVybiBwb3M7XG4gICAgICAgIH1cbiAgICAgICAgLy8gU2VsZWN0aW9uIGFuY2hvciBhbmQgZm9jdXMgYXJlIGV4cGVjdGVkIHRvIGJlIHRleHQgbm9kZXMsXG4gICAgICAgIC8vIHNvIG5vcm1hbGl6ZSB0aGVtLlxuICAgICAgICBpZiAoYW5jaG9yTm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUpIHtcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyk7XG4gICAgICAgICAgICBhbmNob3JOb2RlLmluc2VydEJlZm9yZShub2RlLCBhbmNob3JOb2RlLmNoaWxkTm9kZXNbYW5jaG9yT2Zmc2V0XSk7XG4gICAgICAgICAgICBhbmNob3JOb2RlID0gbm9kZTtcbiAgICAgICAgICAgIGFuY2hvck9mZnNldCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZvY3VzTm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUpIHtcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyk7XG4gICAgICAgICAgICBmb2N1c05vZGUuaW5zZXJ0QmVmb3JlKG5vZGUsIGZvY3VzTm9kZS5jaGlsZE5vZGVzW2ZvY3VzT2Zmc2V0XSk7XG4gICAgICAgICAgICBmb2N1c05vZGUgPSBub2RlO1xuICAgICAgICAgICAgZm9jdXNPZmZzZXQgPSAwO1xuICAgICAgICB9XG4gICAgICAgIHZpc2l0KGVkaXRvciwgZWwgPT4ge1xuICAgICAgICAgICAgaWYgKGVsID09PSBhbmNob3JOb2RlICYmIGVsID09PSBmb2N1c05vZGUpIHtcbiAgICAgICAgICAgICAgICBwb3Muc3RhcnQgKz0gYW5jaG9yT2Zmc2V0O1xuICAgICAgICAgICAgICAgIHBvcy5lbmQgKz0gZm9jdXNPZmZzZXQ7XG4gICAgICAgICAgICAgICAgcG9zLmRpciA9IGFuY2hvck9mZnNldCA8PSBmb2N1c09mZnNldCA/ICctPicgOiAnPC0nO1xuICAgICAgICAgICAgICAgIHJldHVybiAnc3RvcCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZWwgPT09IGFuY2hvck5vZGUpIHtcbiAgICAgICAgICAgICAgICBwb3Muc3RhcnQgKz0gYW5jaG9yT2Zmc2V0O1xuICAgICAgICAgICAgICAgIGlmICghcG9zLmRpcikge1xuICAgICAgICAgICAgICAgICAgICBwb3MuZGlyID0gJy0+JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnc3RvcCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZWwgPT09IGZvY3VzTm9kZSkge1xuICAgICAgICAgICAgICAgIHBvcy5lbmQgKz0gZm9jdXNPZmZzZXQ7XG4gICAgICAgICAgICAgICAgaWYgKCFwb3MuZGlyKSB7XG4gICAgICAgICAgICAgICAgICAgIHBvcy5kaXIgPSAnPC0nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdzdG9wJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZWwubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBvcy5kaXIgIT0gJy0+JylcbiAgICAgICAgICAgICAgICAgICAgcG9zLnN0YXJ0ICs9IGVsLm5vZGVWYWx1ZS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgaWYgKHBvcy5kaXIgIT0gJzwtJylcbiAgICAgICAgICAgICAgICAgICAgcG9zLmVuZCArPSBlbC5ub2RlVmFsdWUubGVuZ3RoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgLy8gY29sbGFwc2UgZW1wdHkgdGV4dCBub2Rlc1xuICAgICAgICBlZGl0b3Iubm9ybWFsaXplKCk7XG4gICAgICAgIHJldHVybiBwb3M7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlc3RvcmUocG9zKSB7XG4gICAgICAgIGNvbnN0IHMgPSBnZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgbGV0IHN0YXJ0Tm9kZSwgc3RhcnRPZmZzZXQgPSAwO1xuICAgICAgICBsZXQgZW5kTm9kZSwgZW5kT2Zmc2V0ID0gMDtcbiAgICAgICAgaWYgKCFwb3MuZGlyKVxuICAgICAgICAgICAgcG9zLmRpciA9ICctPic7XG4gICAgICAgIGlmIChwb3Muc3RhcnQgPCAwKVxuICAgICAgICAgICAgcG9zLnN0YXJ0ID0gMDtcbiAgICAgICAgaWYgKHBvcy5lbmQgPCAwKVxuICAgICAgICAgICAgcG9zLmVuZCA9IDA7XG4gICAgICAgIC8vIEZsaXAgc3RhcnQgYW5kIGVuZCBpZiB0aGUgZGlyZWN0aW9uIHJldmVyc2VkXG4gICAgICAgIGlmIChwb3MuZGlyID09ICc8LScpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgc3RhcnQsIGVuZCB9ID0gcG9zO1xuICAgICAgICAgICAgcG9zLnN0YXJ0ID0gZW5kO1xuICAgICAgICAgICAgcG9zLmVuZCA9IHN0YXJ0O1xuICAgICAgICB9XG4gICAgICAgIGxldCBjdXJyZW50ID0gMDtcbiAgICAgICAgdmlzaXQoZWRpdG9yLCBlbCA9PiB7XG4gICAgICAgICAgICBpZiAoZWwubm9kZVR5cGUgIT09IE5vZGUuVEVYVF9OT0RFKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNvbnN0IGxlbiA9IChlbC5ub2RlVmFsdWUgfHwgJycpLmxlbmd0aDtcbiAgICAgICAgICAgIGlmIChjdXJyZW50ICsgbGVuID4gcG9zLnN0YXJ0KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFzdGFydE5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnROb2RlID0gZWw7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0T2Zmc2V0ID0gcG9zLnN0YXJ0IC0gY3VycmVudDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQgKyBsZW4gPiBwb3MuZW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIGVuZE5vZGUgPSBlbDtcbiAgICAgICAgICAgICAgICAgICAgZW5kT2Zmc2V0ID0gcG9zLmVuZCAtIGN1cnJlbnQ7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnc3RvcCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3VycmVudCArPSBsZW47XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIXN0YXJ0Tm9kZSlcbiAgICAgICAgICAgIHN0YXJ0Tm9kZSA9IGVkaXRvciwgc3RhcnRPZmZzZXQgPSBlZGl0b3IuY2hpbGROb2Rlcy5sZW5ndGg7XG4gICAgICAgIGlmICghZW5kTm9kZSlcbiAgICAgICAgICAgIGVuZE5vZGUgPSBlZGl0b3IsIGVuZE9mZnNldCA9IGVkaXRvci5jaGlsZE5vZGVzLmxlbmd0aDtcbiAgICAgICAgLy8gRmxpcCBiYWNrIHRoZSBzZWxlY3Rpb25cbiAgICAgICAgaWYgKHBvcy5kaXIgPT0gJzwtJykge1xuICAgICAgICAgICAgW3N0YXJ0Tm9kZSwgc3RhcnRPZmZzZXQsIGVuZE5vZGUsIGVuZE9mZnNldF0gPSBbZW5kTm9kZSwgZW5kT2Zmc2V0LCBzdGFydE5vZGUsIHN0YXJ0T2Zmc2V0XTtcbiAgICAgICAgfVxuICAgICAgICBzLnNldEJhc2VBbmRFeHRlbnQoc3RhcnROb2RlLCBzdGFydE9mZnNldCwgZW5kTm9kZSwgZW5kT2Zmc2V0KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYmVmb3JlQ3Vyc29yKCkge1xuICAgICAgICBjb25zdCBzID0gZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgIGNvbnN0IHIwID0gcy5nZXRSYW5nZUF0KDApO1xuICAgICAgICBjb25zdCByID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgICAgICAgci5zZWxlY3ROb2RlQ29udGVudHMoZWRpdG9yKTtcbiAgICAgICAgci5zZXRFbmQocjAuc3RhcnRDb250YWluZXIsIHIwLnN0YXJ0T2Zmc2V0KTtcbiAgICAgICAgcmV0dXJuIHIudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYWZ0ZXJDdXJzb3IoKSB7XG4gICAgICAgIGNvbnN0IHMgPSBnZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgY29uc3QgcjAgPSBzLmdldFJhbmdlQXQoMCk7XG4gICAgICAgIGNvbnN0IHIgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xuICAgICAgICByLnNlbGVjdE5vZGVDb250ZW50cyhlZGl0b3IpO1xuICAgICAgICByLnNldFN0YXJ0KHIwLmVuZENvbnRhaW5lciwgcjAuZW5kT2Zmc2V0KTtcbiAgICAgICAgcmV0dXJuIHIudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaGFuZGxlTmV3TGluZShldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAnRW50ZXInKSB7XG4gICAgICAgICAgICBjb25zdCBiZWZvcmUgPSBiZWZvcmVDdXJzb3IoKTtcbiAgICAgICAgICAgIGNvbnN0IGFmdGVyID0gYWZ0ZXJDdXJzb3IoKTtcbiAgICAgICAgICAgIGxldCBbcGFkZGluZ10gPSBmaW5kUGFkZGluZyhiZWZvcmUpO1xuICAgICAgICAgICAgbGV0IG5ld0xpbmVQYWRkaW5nID0gcGFkZGluZztcbiAgICAgICAgICAgIC8vIElmIGxhc3Qgc3ltYm9sIGlzIFwie1wiIGlkZW50IG5ldyBsaW5lXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5pbmRlbnRPbi50ZXN0KGJlZm9yZSkpIHtcbiAgICAgICAgICAgICAgICBuZXdMaW5lUGFkZGluZyArPSBvcHRpb25zLnRhYjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFByZXNlcnZlIHBhZGRpbmdcbiAgICAgICAgICAgIGlmIChuZXdMaW5lUGFkZGluZy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgcHJldmVudERlZmF1bHQoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIGluc2VydCgnXFxuJyArIG5ld0xpbmVQYWRkaW5nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxlZ2FjeU5ld0xpbmVGaXgoZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gUGxhY2UgYWRqYWNlbnQgXCJ9XCIgb24gbmV4dCBsaW5lXG4gICAgICAgICAgICBpZiAobmV3TGluZVBhZGRpbmcgIT09IHBhZGRpbmcgJiYgb3B0aW9ucy5tb3ZlVG9OZXdMaW5lLnRlc3QoYWZ0ZXIpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcG9zID0gc2F2ZSgpO1xuICAgICAgICAgICAgICAgIGluc2VydCgnXFxuJyArIHBhZGRpbmcpO1xuICAgICAgICAgICAgICAgIHJlc3RvcmUocG9zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBsZWdhY3lOZXdMaW5lRml4KGV2ZW50KSB7XG4gICAgICAgIC8vIEZpcmVmb3ggZG9lcyBub3Qgc3VwcG9ydCBwbGFpbnRleHQtb25seSBtb2RlXG4gICAgICAgIC8vIGFuZCBwdXRzIDxkaXY+PGJyPjwvZGl2PiBvbiBFbnRlci4gTGV0J3MgaGVscC5cbiAgICAgICAgaWYgKGlzTGVnYWN5ICYmIGV2ZW50LmtleSA9PT0gJ0VudGVyJykge1xuICAgICAgICAgICAgcHJldmVudERlZmF1bHQoZXZlbnQpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBpZiAoYWZ0ZXJDdXJzb3IoKSA9PSAnJykge1xuICAgICAgICAgICAgICAgIGluc2VydCgnXFxuICcpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHBvcyA9IHNhdmUoKTtcbiAgICAgICAgICAgICAgICBwb3Muc3RhcnQgPSAtLXBvcy5lbmQ7XG4gICAgICAgICAgICAgICAgcmVzdG9yZShwb3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaW5zZXJ0KCdcXG4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBoYW5kbGVTZWxmQ2xvc2luZ0NoYXJhY3RlcnMoZXZlbnQpIHtcbiAgICAgICAgY29uc3Qgb3BlbiA9IGAoW3snXCJgO1xuICAgICAgICBjb25zdCBjbG9zZSA9IGApXX0nXCJgO1xuICAgICAgICBjb25zdCBjb2RlQWZ0ZXIgPSBhZnRlckN1cnNvcigpO1xuICAgICAgICBjb25zdCBjb2RlQmVmb3JlID0gYmVmb3JlQ3Vyc29yKCk7XG4gICAgICAgIGNvbnN0IGVzY2FwZUNoYXJhY3RlciA9IGNvZGVCZWZvcmUuc3Vic3RyKGNvZGVCZWZvcmUubGVuZ3RoIC0gMSkgPT09ICdcXFxcJztcbiAgICAgICAgY29uc3QgY2hhckFmdGVyID0gY29kZUFmdGVyLnN1YnN0cigwLCAxKTtcbiAgICAgICAgaWYgKGNsb3NlLmluY2x1ZGVzKGV2ZW50LmtleSkgJiYgIWVzY2FwZUNoYXJhY3RlciAmJiBjaGFyQWZ0ZXIgPT09IGV2ZW50LmtleSkge1xuICAgICAgICAgICAgLy8gV2UgYWxyZWFkeSBoYXZlIGNsb3NpbmcgY2hhciBuZXh0IHRvIGN1cnNvci5cbiAgICAgICAgICAgIC8vIE1vdmUgb25lIGNoYXIgdG8gcmlnaHQuXG4gICAgICAgICAgICBjb25zdCBwb3MgPSBzYXZlKCk7XG4gICAgICAgICAgICBwcmV2ZW50RGVmYXVsdChldmVudCk7XG4gICAgICAgICAgICBwb3Muc3RhcnQgPSArK3Bvcy5lbmQ7XG4gICAgICAgICAgICByZXN0b3JlKHBvcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAob3Blbi5pbmNsdWRlcyhldmVudC5rZXkpXG4gICAgICAgICAgICAmJiAhZXNjYXBlQ2hhcmFjdGVyXG4gICAgICAgICAgICAmJiAoYFwiJ2AuaW5jbHVkZXMoZXZlbnQua2V5KSB8fCBbJycsICcgJywgJ1xcbiddLmluY2x1ZGVzKGNoYXJBZnRlcikpKSB7XG4gICAgICAgICAgICBwcmV2ZW50RGVmYXVsdChldmVudCk7XG4gICAgICAgICAgICBjb25zdCBwb3MgPSBzYXZlKCk7XG4gICAgICAgICAgICBjb25zdCB3cmFwVGV4dCA9IHBvcy5zdGFydCA9PSBwb3MuZW5kID8gJycgOiBnZXRTZWxlY3Rpb24oKS50b1N0cmluZygpO1xuICAgICAgICAgICAgY29uc3QgdGV4dCA9IGV2ZW50LmtleSArIHdyYXBUZXh0ICsgY2xvc2Vbb3Blbi5pbmRleE9mKGV2ZW50LmtleSldO1xuICAgICAgICAgICAgaW5zZXJ0KHRleHQpO1xuICAgICAgICAgICAgcG9zLnN0YXJ0Kys7XG4gICAgICAgICAgICBwb3MuZW5kKys7XG4gICAgICAgICAgICByZXN0b3JlKHBvcyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gaGFuZGxlVGFiQ2hhcmFjdGVycyhldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAnVGFiJykge1xuICAgICAgICAgICAgcHJldmVudERlZmF1bHQoZXZlbnQpO1xuICAgICAgICAgICAgaWYgKGV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYmVmb3JlID0gYmVmb3JlQ3Vyc29yKCk7XG4gICAgICAgICAgICAgICAgbGV0IFtwYWRkaW5nLCBzdGFydCxdID0gZmluZFBhZGRpbmcoYmVmb3JlKTtcbiAgICAgICAgICAgICAgICBpZiAocGFkZGluZy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBvcyA9IHNhdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIGZ1bGwgbGVuZ3RoIHRhYiBvciBqdXN0IHJlbWFpbmluZyBwYWRkaW5nXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxlbiA9IE1hdGgubWluKG9wdGlvbnMudGFiLmxlbmd0aCwgcGFkZGluZy5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICByZXN0b3JlKHsgc3RhcnQsIGVuZDogc3RhcnQgKyBsZW4gfSk7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdkZWxldGUnKTtcbiAgICAgICAgICAgICAgICAgICAgcG9zLnN0YXJ0IC09IGxlbjtcbiAgICAgICAgICAgICAgICAgICAgcG9zLmVuZCAtPSBsZW47XG4gICAgICAgICAgICAgICAgICAgIHJlc3RvcmUocG9zKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpbnNlcnQob3B0aW9ucy50YWIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGhhbmRsZVVuZG9SZWRvKGV2ZW50KSB7XG4gICAgICAgIGlmIChpc1VuZG8oZXZlbnQpKSB7XG4gICAgICAgICAgICBwcmV2ZW50RGVmYXVsdChldmVudCk7XG4gICAgICAgICAgICBhdC0tO1xuICAgICAgICAgICAgY29uc3QgcmVjb3JkID0gaGlzdG9yeVthdF07XG4gICAgICAgICAgICBpZiAocmVjb3JkKSB7XG4gICAgICAgICAgICAgICAgZWRpdG9yLmlubmVySFRNTCA9IHJlY29yZC5odG1sO1xuICAgICAgICAgICAgICAgIHJlc3RvcmUocmVjb3JkLnBvcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYXQgPCAwKVxuICAgICAgICAgICAgICAgIGF0ID0gMDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNSZWRvKGV2ZW50KSkge1xuICAgICAgICAgICAgcHJldmVudERlZmF1bHQoZXZlbnQpO1xuICAgICAgICAgICAgYXQrKztcbiAgICAgICAgICAgIGNvbnN0IHJlY29yZCA9IGhpc3RvcnlbYXRdO1xuICAgICAgICAgICAgaWYgKHJlY29yZCkge1xuICAgICAgICAgICAgICAgIGVkaXRvci5pbm5lckhUTUwgPSByZWNvcmQuaHRtbDtcbiAgICAgICAgICAgICAgICByZXN0b3JlKHJlY29yZC5wb3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGF0ID49IGhpc3RvcnkubGVuZ3RoKVxuICAgICAgICAgICAgICAgIGF0LS07XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gcmVjb3JkSGlzdG9yeSgpIHtcbiAgICAgICAgaWYgKCFmb2N1cylcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY29uc3QgaHRtbCA9IGVkaXRvci5pbm5lckhUTUw7XG4gICAgICAgIGNvbnN0IHBvcyA9IHNhdmUoKTtcbiAgICAgICAgY29uc3QgbGFzdFJlY29yZCA9IGhpc3RvcnlbYXRdO1xuICAgICAgICBpZiAobGFzdFJlY29yZCkge1xuICAgICAgICAgICAgaWYgKGxhc3RSZWNvcmQuaHRtbCA9PT0gaHRtbFxuICAgICAgICAgICAgICAgICYmIGxhc3RSZWNvcmQucG9zLnN0YXJ0ID09PSBwb3Muc3RhcnRcbiAgICAgICAgICAgICAgICAmJiBsYXN0UmVjb3JkLnBvcy5lbmQgPT09IHBvcy5lbmQpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGF0Kys7XG4gICAgICAgIGhpc3RvcnlbYXRdID0geyBodG1sLCBwb3MgfTtcbiAgICAgICAgaGlzdG9yeS5zcGxpY2UoYXQgKyAxKTtcbiAgICAgICAgY29uc3QgbWF4SGlzdG9yeSA9IDMwMDtcbiAgICAgICAgaWYgKGF0ID4gbWF4SGlzdG9yeSkge1xuICAgICAgICAgICAgYXQgPSBtYXhIaXN0b3J5O1xuICAgICAgICAgICAgaGlzdG9yeS5zcGxpY2UoMCwgMSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gaGFuZGxlUGFzdGUoZXZlbnQpIHtcbiAgICAgICAgcHJldmVudERlZmF1bHQoZXZlbnQpO1xuICAgICAgICBjb25zdCB0ZXh0ID0gKGV2ZW50Lm9yaWdpbmFsRXZlbnQgfHwgZXZlbnQpXG4gICAgICAgICAgICAuY2xpcGJvYXJkRGF0YVxuICAgICAgICAgICAgLmdldERhdGEoJ3RleHQvcGxhaW4nKVxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcci9nLCAnJyk7XG4gICAgICAgIGNvbnN0IHBvcyA9IHNhdmUoKTtcbiAgICAgICAgaW5zZXJ0KHRleHQpO1xuICAgICAgICBoaWdobGlnaHQoZWRpdG9yKTtcbiAgICAgICAgcmVzdG9yZSh7XG4gICAgICAgICAgICBzdGFydDogTWF0aC5taW4ocG9zLnN0YXJ0LCBwb3MuZW5kKSArIHRleHQubGVuZ3RoLFxuICAgICAgICAgICAgZW5kOiBNYXRoLm1pbihwb3Muc3RhcnQsIHBvcy5lbmQpICsgdGV4dC5sZW5ndGgsXG4gICAgICAgICAgICBkaXI6ICc8LScsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiB2aXNpdChlZGl0b3IsIHZpc2l0b3IpIHtcbiAgICAgICAgY29uc3QgcXVldWUgPSBbXTtcbiAgICAgICAgaWYgKGVkaXRvci5maXJzdENoaWxkKVxuICAgICAgICAgICAgcXVldWUucHVzaChlZGl0b3IuZmlyc3RDaGlsZCk7XG4gICAgICAgIGxldCBlbCA9IHF1ZXVlLnBvcCgpO1xuICAgICAgICB3aGlsZSAoZWwpIHtcbiAgICAgICAgICAgIGlmICh2aXNpdG9yKGVsKSA9PT0gJ3N0b3AnKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgaWYgKGVsLm5leHRTaWJsaW5nKVxuICAgICAgICAgICAgICAgIHF1ZXVlLnB1c2goZWwubmV4dFNpYmxpbmcpO1xuICAgICAgICAgICAgaWYgKGVsLmZpcnN0Q2hpbGQpXG4gICAgICAgICAgICAgICAgcXVldWUucHVzaChlbC5maXJzdENoaWxkKTtcbiAgICAgICAgICAgIGVsID0gcXVldWUucG9wKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gaXNDdHJsKGV2ZW50KSB7XG4gICAgICAgIHJldHVybiBldmVudC5tZXRhS2V5IHx8IGV2ZW50LmN0cmxLZXk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlzVW5kbyhldmVudCkge1xuICAgICAgICByZXR1cm4gaXNDdHJsKGV2ZW50KSAmJiAhZXZlbnQuc2hpZnRLZXkgJiYgZ2V0S2V5Q29kZShldmVudCkgPT09ICdaJztcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNSZWRvKGV2ZW50KSB7XG4gICAgICAgIHJldHVybiBpc0N0cmwoZXZlbnQpICYmIGV2ZW50LnNoaWZ0S2V5ICYmIGdldEtleUNvZGUoZXZlbnQpID09PSAnWic7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlzQ29weShldmVudCkge1xuICAgICAgICByZXR1cm4gaXNDdHJsKGV2ZW50KSAmJiBnZXRLZXlDb2RlKGV2ZW50KSA9PT0gJ0MnO1xuICAgIH1cbiAgICBmdW5jdGlvbiBnZXRLZXlDb2RlKGV2ZW50KSB7XG4gICAgICAgIGxldCBrZXkgPSBldmVudC5rZXkgfHwgZXZlbnQua2V5Q29kZSB8fCBldmVudC53aGljaDtcbiAgICAgICAgaWYgKCFrZXkpXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICByZXR1cm4gKHR5cGVvZiBrZXkgPT09ICdzdHJpbmcnID8ga2V5IDogU3RyaW5nLmZyb21DaGFyQ29kZShrZXkpKS50b1VwcGVyQ2FzZSgpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpbnNlcnQodGV4dCkge1xuICAgICAgICB0ZXh0ID0gdGV4dFxuICAgICAgICAgICAgLnJlcGxhY2UoLyYvZywgJyZhbXA7JylcbiAgICAgICAgICAgIC5yZXBsYWNlKC88L2csICcmbHQ7JylcbiAgICAgICAgICAgIC5yZXBsYWNlKC8+L2csICcmZ3Q7JylcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cIi9nLCAnJnF1b3Q7JylcbiAgICAgICAgICAgIC5yZXBsYWNlKC8nL2csICcmIzAzOTsnKTtcbiAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2luc2VydEhUTUwnLCBmYWxzZSwgdGV4dCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGRlYm91bmNlKGNiLCB3YWl0KSB7XG4gICAgICAgIGxldCB0aW1lb3V0ID0gMDtcbiAgICAgICAgcmV0dXJuICguLi5hcmdzKSA9PiB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgICAgICB0aW1lb3V0ID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4gY2IoLi4uYXJncyksIHdhaXQpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBmdW5jdGlvbiBmaW5kUGFkZGluZyh0ZXh0KSB7XG4gICAgICAgIC8vIEZpbmQgYmVnaW5uaW5nIG9mIHByZXZpb3VzIGxpbmUuXG4gICAgICAgIGxldCBpID0gdGV4dC5sZW5ndGggLSAxO1xuICAgICAgICB3aGlsZSAoaSA+PSAwICYmIHRleHRbaV0gIT09ICdcXG4nKVxuICAgICAgICAgICAgaS0tO1xuICAgICAgICBpKys7XG4gICAgICAgIC8vIEZpbmQgcGFkZGluZyBvZiB0aGUgbGluZS5cbiAgICAgICAgbGV0IGogPSBpO1xuICAgICAgICB3aGlsZSAoaiA8IHRleHQubGVuZ3RoICYmIC9bIFxcdF0vLnRlc3QodGV4dFtqXSkpXG4gICAgICAgICAgICBqKys7XG4gICAgICAgIHJldHVybiBbdGV4dC5zdWJzdHJpbmcoaSwgaikgfHwgJycsIGksIGpdO1xuICAgIH1cbiAgICBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIGVkaXRvci50ZXh0Q29udGVudCB8fCAnJztcbiAgICB9XG4gICAgZnVuY3Rpb24gcHJldmVudERlZmF1bHQoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0U2VsZWN0aW9uKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmICgoKF9hID0gZWRpdG9yLnBhcmVudE5vZGUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5ub2RlVHlwZSkgPT0gTm9kZS5ET0NVTUVOVF9GUkFHTUVOVF9OT0RFKSB7XG4gICAgICAgICAgICByZXR1cm4gZWRpdG9yLnBhcmVudE5vZGUuZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdXBkYXRlT3B0aW9ucyhuZXdPcHRpb25zKSB7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKG9wdGlvbnMsIG5ld09wdGlvbnMpO1xuICAgICAgICB9LFxuICAgICAgICB1cGRhdGVDb2RlKGNvZGUpIHtcbiAgICAgICAgICAgIGVkaXRvci50ZXh0Q29udGVudCA9IGNvZGU7XG4gICAgICAgICAgICBoaWdobGlnaHQoZWRpdG9yKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25VcGRhdGUoY2IpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrID0gY2I7XG4gICAgICAgIH0sXG4gICAgICAgIHRvU3RyaW5nLFxuICAgICAgICBzYXZlLFxuICAgICAgICByZXN0b3JlLFxuICAgICAgICByZWNvcmRIaXN0b3J5LFxuICAgICAgICBkZXN0cm95KCkge1xuICAgICAgICAgICAgZm9yIChsZXQgW3R5cGUsIGZuXSBvZiBsaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgICAgICBlZGl0b3IucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBmbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfTtcbn1cbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAuQmFyZU1ERSB7XG4gIGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmO1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWl0ZW1zOiBzdHJldGNoO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6IDBweDtcbiAgbWFyZ2luOiAwO1xuICBtYXgtaGVpZ2h0OiAxMDAlO1xuICBtYXgtd2lkdGg6IDEwMCU7XG4gIHBhZGRpbmc6IDA7XG59XG4uQmFyZU1ERS5mdWxsc2NyZWVuIHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICBtYXgtd2lkdGg6IDEwMCU7XG4gIG1heC1oZWlnaHQ6IDEwMCU7XG4gIHRvcDogMDtcbiAgbGVmdDogMDtcbiAgcmlnaHQ6IDA7XG4gIGJvdHRvbTogMDtcbiAgYm9yZGVyLXJhZGl1czogMDtcbiAgYm9yZGVyOiBub25lO1xuICB6LWluZGV4OiAxMDAwO1xufVxuLkJhcmVNREUgKiB7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG59XG4uQmFyZU1ERSAudG9vbGJhciB7XG4gIGFsbDogdW5zZXQ7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgbWFyZ2luOiAwO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBib3JkZXItcmFkaXVzOiAwO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDQ0O1xuICBjb2xvcjogd2hpdGU7XG4gIHBhZGRpbmc6IDZweCA0OHB4IDBweCA0OHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZmxleC13cmFwOiB3cmFwO1xuICBmbGV4LWdyb3c6IDA7XG59XG4uQmFyZU1ERSAudG9vbGJhciAuZGl2aWRlciB7XG4gIHdpZHRoOiAycHg7XG4gIGZsZXgtZ3JvdzogMDtcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nOiAwO1xuICBtYXJnaW4tcmlnaHQ6IDhweDtcbiAgbWFyZ2luLWxlZnQ6IDJweDtcbiAgbWFyZ2luLWJvdHRvbTogNnB4O1xuICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQoMGRlZywgZ3JheSwgZ3JheSAycHgsIHRyYW5zcGFyZW50IDJweCwgdHJhbnNwYXJlbnQgNXB4KTtcbiAgYmFja2dyb3VuZC1zaXplOiAycHggNXB4O1xuICBiYWNrZ3JvdW5kLXJlcGVhdDogcmVwZWF0O1xufVxuLkJhcmVNREUgLnRvb2xiYXIgLmJtZGVfYnJhbmRpbmcge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHJpZ2h0OiAxMnB4O1xuICBmb250LXNpemU6IDE0cHg7XG4gIG1hcmdpbjogMDtcbiAgcGFkZGluZzogMDtcbn1cbi5CYXJlTURFIC50b29sYmFyIC5FZGl0b3JNZW51IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiA2cHg7XG4gIHdpZHRoOiAzMnB4O1xuICBoZWlnaHQ6IDMycHg7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIG1hcmdpbjogMDtcbn1cbi5CYXJlTURFIC50b29sYmFyIC5FZGl0b3JNZW51IGJ1dHRvbiB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBib3JkZXI6IG5vbmU7XG4gIHdpZHRoOiAzMnB4O1xuICBoZWlnaHQ6IDMycHg7XG4gIHBhZGRpbmctdG9wOiAzcHg7XG59XG4uQmFyZU1ERSAudG9vbGJhciAuRWRpdG9yTWVudSBidXR0b24gc3ZnIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICB1c2VyLXNlbGVjdDogbm9uZTtcbn1cbi5CYXJlTURFIC50b29sYmFyIC5FZGl0b3JNZW51IC5tZW51SXRlbXMge1xuICBtaW4td2lkdGg6IDI1MHB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGJhY2tncm91bmQtY29sb3I6ICNiZGJkYmQ7XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbjogMDtcbiAgbGluZS1oZWlnaHQ6IDEwMCU7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgYm94LXNoYWRvdzogMHB4IDBweCAyNHB4IHJnYmEoMCwgMCwgMCwgMC44KTtcbn1cbi5CYXJlTURFIC50b29sYmFyIC5FZGl0b3JNZW51IC5tZW51SXRlbXMgLkl0ZW0ge1xuICBmb250LWZhbWlseTogc2Fucy1zZXJpZjtcbiAgcGFkZGluZzogNnB4IDEycHg7XG4gIG1hcmdpbjogMDtcbiAgbGluZS1oZWlnaHQ6IDEwMCU7XG4gIHVzZXItc2VsZWN0OiBub25lO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjYWFhO1xuICBjb2xvcjogIzMzMztcbn1cbi5CYXJlTURFIC50b29sYmFyIC5FZGl0b3JNZW51IC5tZW51SXRlbXMgLkl0ZW06Zmlyc3QtY2hpbGQge1xuICBwYWRkaW5nLXRvcDogOHB4O1xufVxuLkJhcmVNREUgLnRvb2xiYXIgLkVkaXRvck1lbnUgLm1lbnVJdGVtcyAuSXRlbTpsYXN0LWNoaWxkIHtcbiAgYm9yZGVyLWJvdHRvbTogbm9uZTtcbiAgcGFkZGluZy1ib3R0b206IDhweDtcbn1cbi5CYXJlTURFIC50b29sYmFyIC5FZGl0b3JNZW51IC5tZW51SXRlbXMgLkl0ZW06aG92ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmF5O1xuICBjb2xvcjogd2hpdGU7XG59XG4uQmFyZU1ERSAudG9vbGJhciAuVEJ1dHRvbi5hbGVydGVkIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogb3JhbmdlcmVkO1xuICBib3JkZXI6IG5vbmU7XG59XG4uQmFyZU1ERSAudG9vbGJhciAuVEJ1dHRvbi5hbGVydGVkOmhvdmVyIHtcbiAgYm9yZGVyLWNvbG9yOiBvcmFuZ2VyZWQ7XG59XG4uQmFyZU1ERSAudG9vbGJhciBidXR0b24ge1xuICBhbGw6IHVuc2V0O1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuNXM7XG4gIGFwcGVhcmFuY2U6IG5vbmU7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHRyYW5zcGFyZW50O1xuICBib3JkZXItcmFkaXVzOiA2cHg7XG4gIHdpZHRoOiAzMnB4O1xuICBoZWlnaHQ6IDMycHg7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgY2VudGVyO1xuICBiYWNrZ3JvdW5kLXNpemU6IDI0cHggMjRweDtcbiAgbWFyZ2luOiAwIDZweCA2cHggMDtcbn1cbi5CYXJlTURFIC50b29sYmFyIGJ1dHRvbiBzdmcge1xuICBkaXNwbGF5OiBibG9jaztcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gIG1hcmdpbjogMDtcbiAgcGFkZGluZzogMDtcbn1cbi5CYXJlTURFIC50b29sYmFyIGJ1dHRvbi5mb3JtYXR0aW5nIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XG4gIGJvcmRlci1jb2xvcjogYmxhY2s7XG59XG4uQmFyZU1ERSAudG9vbGJhciBidXR0b24uZm9ybWF0dGluZyBzdmcge1xuICBvcGFjaXR5OiAwLjk7XG59XG4uQmFyZU1ERSAudG9vbGJhciBidXR0b246aG92ZXIge1xuICBib3JkZXItY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC42KTtcbn1cbi5CYXJlTURFIC50b29sYmFyIGJ1dHRvbi5vbiB7XG4gIGJvcmRlci1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjMpO1xufVxuLkJhcmVNREUgLnRvb2xiYXIgYnV0dG9uOmxhc3QtY2hpbGQge1xuICBtYXJnaW4tcmlnaHQ6IDA7XG59XG4uQmFyZU1ERSAud29ya0FyZWEge1xuICBhbGw6IHVuc2V0O1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICB3aWR0aDogMTAwJTtcbiAgZmxleC1ncm93OiAxO1xuICBmbGV4LXNocmluazogMTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24tY29udGVudDogc3RyZXRjaDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgYmFja2dyb3VuZC1jb2xvcjogI2NjY2NjYztcbiAgbWluLWhlaWdodDogMjAwcHg7XG4gIG1hcmdpbjogMDtcbiAgcGFkZGluZzogMDtcbn1cbi5CYXJlTURFIC53b3JrQXJlYSAuY29kZUphciwgLkJhcmVNREUgLndvcmtBcmVhIC5wcmV2aWV3IHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGZsZXgtZ3JvdzogMTtcbiAgZmxleC1zaHJpbms6IDE7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIG1heC13aWR0aDogMTAwJTtcbiAgbWFyZ2luOiAwO1xuICBzY3JvbGxiYXItd2lkdGg6IHRoaW47XG4gIHNjcm9sbGJhci1jb2xvcjogIzQ0NCAjZGRkZGRkO1xufVxuLkJhcmVNREUgLndvcmtBcmVhIC5jb2RlSmFyOjotd2Via2l0LXNjcm9sbGJhciwgLkJhcmVNREUgLndvcmtBcmVhIC5wcmV2aWV3Ojotd2Via2l0LXNjcm9sbGJhciB7XG4gIHdpZHRoOiA0cHg7XG59XG4uQmFyZU1ERSAud29ya0FyZWEgLmNvZGVKYXI6Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrLCAuQmFyZU1ERSAud29ya0FyZWEgLnByZXZpZXc6Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrIHtcbiAgYmFja2dyb3VuZDogI2RkZGRkZDtcbn1cbi5CYXJlTURFIC53b3JrQXJlYSAuY29kZUphcjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIsIC5CYXJlTURFIC53b3JrQXJlYSAucHJldmlldzo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDQ0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIC13ZWJraXQtYm9yZGVyLXJhZGl1czogNHB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuLkJhcmVNREUgLndvcmtBcmVhIC5jb2RlSmFyIHtcbiAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMDtcbiAgZm9udC1mYW1pbHk6IENvbnNvbGFzLCBNb25hY28sIFwiQW5kYWxlIE1vbm9cIiwgXCJVYnVudHUgTW9ub1wiLCB1aS1tb25vc3BhY2UsIG1vbm9zcGFjZTtcbiAgZm9udC1zaXplOiAxOHB4O1xuICBsaW5lLWhlaWdodDogMTUwJTtcbiAgY29sb3I6ICMzMzM7XG4gIGZsZXgtZ3JvdzogMTtcbiAgcGFkZGluZzogMThweCAyNHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTRlM2UyO1xuICBvdmVyZmxvdzogYXV0bztcbiAgZmxleC1iYXNpczogMDtcbn1cbi5CYXJlTURFIC53b3JrQXJlYSAucHJldmlldyB7XG4gIGJvcmRlci1yYWRpdXM6IDA7XG4gIGZsZXgtZ3JvdzogMTtcbiAgcGFkZGluZzogMDtcbiAgbWFyZ2luOiAwO1xuICB3aWR0aDogNTAlO1xuICBib3JkZXItbGVmdDogMXB4IHNvbGlkICNkZGQ7XG4gIG92ZXJmbG93OiBhdXRvO1xuICBmbGV4LWJhc2lzOiAwO1xuICBkaXNwbGF5OiBub25lO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG4uQmFyZU1ERSAud29ya0FyZWEgLnByZXZpZXcgaWZyYW1lIHtcbiAgYWxsOiB1bnNldDtcbiAgd2lkdGg6IDEwMCU7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBib3JkZXI6IG5vbmU7XG4gIG1hcmdpbjogMDtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIGJvdHRvbTogMDtcbiAgbGVmdDogMDtcbiAgcmlnaHQ6IDA7XG59XG4uQmFyZU1ERS5zaG93UHJldmlldyAucHJldmlldyB7XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuLkJhcmVNREUuZnVsbFByZXZpZXcgLmNvZGVKYXIge1xuICBkaXNwbGF5OiBub25lO1xufVxuLkJhcmVNREUuZnVsbFByZXZpZXcgLndvcmtBcmVhIC5wcmV2aWV3IHtcbiAgZGlzcGxheTogYmxvY2sgIWltcG9ydGFudDtcbiAgd2lkdGg6IDEwMCU7XG4gIG1heC13aWR0aDogMTAwJTtcbn1cbi5CYXJlTURFLmZ1bGxQcmV2aWV3IC53b3JrQXJlYSAucHJldmlldyBpZnJhbWUge1xuICB3aWR0aDogMTAwJTtcbn1cblxuLmNvZGVKYXIgLnRva2VuLmhyIHtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuNWVtO1xufVxuLmNvZGVKYXIgLnRva2VuLmltcG9ydGFudCB7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBjb2xvcjogZGFya3JlZDtcbn1cbi5jb2RlSmFyIC50b2tlbi50aXRsZSB7XG4gIGxpbmUtaGVpZ2h0OiAxZW07XG4gIGZvbnQtc2l6ZTogMS4yZW07XG59XG4uY29kZUphciAudG9rZW4uc3RyaWtlIC5jb250ZW50IHtcbiAgdGV4dC1kZWNvcmF0aW9uOiBsaW5lLXRocm91Z2g7XG59XG4uY29kZUphciAudG9rZW4uY29kZS1sYW5ndWFnZSB7XG4gIG9wYWNpdHk6IDAuNTtcbn1cbi5jb2RlSmFyIC50b2tlbi5jb2RlLWJsb2NrIHtcbiAgY29sb3I6ICMxOTkwYjg7XG59YCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvY29tcG9uZW50cy9CYXJlTURFL21kZWQuc2Nzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLHVCQUFBO0VBRUEsYUFBQTtFQUNBLHNCQUFBO0VBQ0Esc0JBQUE7RUFDQSxzQkFBQTtFQUNBLHNCQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUlBLFVBQUE7QUFIRjtBQUtFO0VBQ0UsZUFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLE1BQUE7RUFDQSxPQUFBO0VBQ0EsUUFBQTtFQUNBLFNBQUE7RUFDQSxnQkFBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0FBSEo7QUFLRTtFQUNFLHNCQUFBO0FBSEo7QUFLRTtFQUNFLFVBQUE7RUFDQSxrQkFBQTtFQUNBLFNBQUE7RUFFQSxzQkFBQTtFQUVBLGdCQUFBO0VBQ0Esc0JBQUE7RUFDQSxZQUFBO0VBQ0EsMEJBQUE7RUFFQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLGVBQUE7RUFDQSxZQUFBO0FBTko7QUFRSTtFQUNFLFVBQUE7RUFDQSxZQUFBO0VBQ0EsU0FBQTtFQUNBLFVBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSx5RkFBQTtFQUtBLHdCQUFBO0VBQ0EseUJBQUE7QUFWTjtBQVlJO0VBQ0Usa0JBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtFQUNBLFNBQUE7RUFDQSxVQUFBO0FBVk47QUFZSTtFQUNFLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsZ0JBQUE7RUFDQSxTQUFBO0FBVk47QUFXTTtFQUNFLGNBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtBQVRSO0FBVVE7RUFDRSxjQUFBO0VBQ0Esb0JBQUE7RUFDQSxpQkFBQTtBQVJWO0FBV007RUFDRSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EseUJBQUE7RUFDQSxVQUFBO0VBQ0EsU0FBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLDJDQUFBO0FBVFI7QUFVUTtFQUNFLHVCQUFBO0VBQ0EsaUJBQUE7RUFDQSxTQUFBO0VBQ0EsaUJBQUE7RUFDQSxpQkFBQTtFQUNBLGVBQUE7RUFDQSw2QkFBQTtFQUNBLFdBQUE7QUFSVjtBQVNVO0VBQ0UsZ0JBQUE7QUFQWjtBQVNVO0VBQ0UsbUJBQUE7RUFDQSxtQkFBQTtBQVBaO0FBU1U7RUFDRSxzQkFBQTtFQUNBLFlBQUE7QUFQWjtBQWNJO0VBQ0UsMkJBQUE7RUFDQSxZQUFBO0FBWk47QUFhTTtFQUNFLHVCQUFBO0FBWFI7QUFnQkk7RUFDRSxVQUFBO0VBQ0Esc0JBQUE7RUFFQSxpQ0FBQTtFQUNBLGdCQUFBO0VBQ0EsNkJBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EscUJBQUE7RUFDQSxlQUFBO0VBRUEsNEJBQUE7RUFDQSxrQ0FBQTtFQUNBLDBCQUFBO0VBQ0EsbUJBQUE7QUFoQk47QUFpQk07RUFDRSxjQUFBO0VBQ0Esb0JBQUE7RUFDQSxTQUFBO0VBQ0EsVUFBQTtBQWZSO0FBaUJNO0VBQ0UsdUJBQUE7RUFDQSxtQkFBQTtBQWZSO0FBZ0JRO0VBQ0UsWUFBQTtBQWRWO0FBaUJNO0VBQ0Usc0NBQUE7QUFmUjtBQWlCTTtFQUNFLHNDQUFBO0FBZlI7QUFpQk07RUFDRSxlQUFBO0FBZlI7QUFtQkU7RUFDRSxVQUFBO0VBQ0Esc0JBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGNBQUE7RUFDQSxhQUFBO0VBRUEsc0JBQUE7RUFDQSxtQkFBQTtFQUNBLHlCQUFBO0VBQ0EsaUJBQUE7RUFDQSxTQUFBO0VBQ0EsVUFBQTtBQWxCSjtBQW9CSTtFQUVFLGNBQUE7RUFDQSxZQUFBO0VBQ0EsY0FBQTtFQUNBLHNCQUFBO0VBQ0EsZUFBQTtFQUNBLFNBQUE7RUFDQSxxQkFBQTtFQUNBLDZCQUFBO0FBbkJOO0FBb0JNO0VBQ0UsVUFBQTtBQWxCUjtBQW9CTTtFQUNFLG1CQUFBO0FBbEJSO0FBb0JNO0VBQ0Usc0JBQUE7RUFDQSxrQkFBQTtFQUNBLDBCQUFBO0VBQ0EsZ0JBQUE7QUFsQlI7QUFzQkk7RUFDRSw0QkFBQTtFQUNBLG9GQUFBO0VBS0EsZUFBQTtFQUNBLGlCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLHlCQUFBO0VBQ0EsY0FBQTtFQUNBLGFBQUE7QUF4Qk47QUEyQkk7RUFDRSxnQkFBQTtFQUNBLFlBQUE7RUFDQSxVQUFBO0VBQ0EsU0FBQTtFQUNBLFVBQUE7RUFDQSwyQkFBQTtFQUNBLGNBQUE7RUFDQSxhQUFBO0VBQ0EsYUFBQTtFQUNBLGtCQUFBO0FBekJOO0FBNEJNO0VBQ0UsVUFBQTtFQUNBLFdBQUE7RUFDQSxjQUFBO0VBQ0EsWUFBQTtFQUNBLFNBQUE7RUFDQSxzQkFBQTtFQUNBLGtCQUFBO0VBQ0EsTUFBQTtFQUNBLFNBQUE7RUFDQSxPQUFBO0VBQ0EsUUFBQTtBQTFCUjtBQStCSTtFQUNFLGNBQUE7QUE3Qk47QUFpQ0k7RUFDRSxhQUFBO0FBL0JOO0FBaUNJO0VBQ0UseUJBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtBQS9CTjtBQWdDTTtFQUNFLFdBQUE7QUE5QlI7O0FBd0NJO0VBQ0UscUJBQUE7QUFyQ047QUF1Q0k7RUFDRSxpQkFBQTtFQUNBLGNBQUE7QUFyQ047QUF1Q0k7RUFDRSxnQkFBQTtFQUNBLGdCQUFBO0FBckNOO0FBd0NNO0VBQ0UsNkJBQUE7QUF0Q1I7QUF5Q0k7RUFDRSxZQUFBO0FBdkNOO0FBeUNJO0VBQ0UsY0FBQTtBQXZDTlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIuQmFyZU1ERXtcXG4gIGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmO1xcbiAgLy8gYWxsOiBpbml0aWFsO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktaXRlbXM6IHN0cmV0Y2g7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBib3JkZXI6IG5vbmU7IC8vMXB4IHNvbGlkICM2NjY7XFxuICBib3JkZXItcmFkaXVzOiAwcHg7XFxuICBtYXJnaW46MDtcXG4gIG1heC1oZWlnaHQ6IDEwMCU7XFxuICBtYXgtd2lkdGg6IDEwMCU7XFxuICAvLyBvdmVyZmxvdzogaGlkZGVuO1xcbiAgLy8gbWF4LWhlaWdodDogMTAwJTtcXG4gIC8vIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHBhZGRpbmc6IDA7XFxuICAvLyBiYWNrZ3JvdW5kLWNvbG9yOiAjY2NjO1xcbiAgJi5mdWxsc2NyZWVue1xcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgIG1heC13aWR0aDogMTAwJTtcXG4gICAgbWF4LWhlaWdodDogMTAwJTtcXG4gICAgdG9wOiAwO1xcbiAgICBsZWZ0OiAwO1xcbiAgICByaWdodDowO1xcbiAgICBib3R0b206MDtcXG4gICAgYm9yZGVyLXJhZGl1czogMDtcXG4gICAgYm9yZGVyOiBub25lO1xcbiAgICB6LWluZGV4OiAxMDAwO1xcbiAgfVxcbiAgKntcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIH1cXG4gIC50b29sYmFye1xcbiAgICBhbGw6IHVuc2V0O1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgLy8gaGVpZ2h0OiA0NHB4O1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICAvLyBtYXJnaW46IC0xcHggLTFweCAwIC0xcHg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDA7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM0NDQgIDtcXG4gICAgY29sb3I6IHdoaXRlO1xcbiAgICBwYWRkaW5nOiA2cHggNDhweCAwcHggNDhweDtcXG5cXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGZsZXgtd3JhcDogd3JhcDtcXG4gICAgZmxleC1ncm93OiAwO1xcblxcbiAgICAuZGl2aWRlcntcXG4gICAgICB3aWR0aDogMnB4O1xcbiAgICAgIGZsZXgtZ3JvdzogMDtcXG4gICAgICBtYXJnaW46IDA7XFxuICAgICAgcGFkZGluZzowO1xcbiAgICAgIG1hcmdpbi1yaWdodDogOHB4O1xcbiAgICAgIG1hcmdpbi1sZWZ0OiAycHg7XFxuICAgICAgbWFyZ2luLWJvdHRvbTogNnB4O1xcbiAgICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCggXFxuICAgICAgMGRlZyAsXFxuICAgICAgZ3JheSwgZ3JheSAycHgsIFxcbiAgICAgIHRyYW5zcGFyZW50IDJweCwgXFxuICAgICAgdHJhbnNwYXJlbnQgNXB4ICk7XFxuICAgICAgYmFja2dyb3VuZC1zaXplOiAycHggNXB4O1xcbiAgICAgIGJhY2tncm91bmQtcmVwZWF0OiByZXBlYXQ7XFxuICAgIH1cXG4gICAgLmJtZGVfYnJhbmRpbmd7XFxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgIHJpZ2h0OiAxMnB4O1xcbiAgICAgIGZvbnQtc2l6ZTogMTRweDtcXG4gICAgICBtYXJnaW46MDtcXG4gICAgICBwYWRkaW5nOjA7XFxuICAgIH1cXG4gICAgLkVkaXRvck1lbnV7XFxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgIGxlZnQ6IDZweDtcXG4gICAgICB3aWR0aDogMzJweDtcXG4gICAgICBoZWlnaHQ6IDMycHg7XFxuICAgICAgdGV4dC1hbGlnbjogbGVmdDtcXG4gICAgICBtYXJnaW46IDA7XFxuICAgICAgYnV0dG9ue1xcbiAgICAgICAgZGlzcGxheTpibG9jaztcXG4gICAgICAgIGJvcmRlcjogbm9uZTtcXG4gICAgICAgIHdpZHRoOiAzMnB4O1xcbiAgICAgICAgaGVpZ2h0OiAzMnB4O1xcbiAgICAgICAgcGFkZGluZy10b3A6IDNweDtcXG4gICAgICAgIHN2Z3tcXG4gICAgICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbiAgICAgICAgICB1c2VyLXNlbGVjdDogbm9uZTtcXG4gICAgICAgIH1cXG4gICAgICB9XFxuICAgICAgLm1lbnVJdGVtc3tcXG4gICAgICAgIG1pbi13aWR0aDogMjUwcHg7XFxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYmRiZGJkO1xcbiAgICAgICAgcGFkZGluZzogMDtcXG4gICAgICAgIG1hcmdpbjowO1xcbiAgICAgICAgbGluZS1oZWlnaHQ6IDEwMCU7XFxuICAgICAgICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICAgICAgYm94LXNoYWRvdzogMHB4IDBweCAyNHB4IHJnYmEoIDAgLCAwICwgMCAsIDAuOCApO1xcbiAgICAgICAgLkl0ZW17XFxuICAgICAgICAgIGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmO1xcbiAgICAgICAgICBwYWRkaW5nOiA2cHggMTJweDtcXG4gICAgICAgICAgbWFyZ2luOjA7XFxuICAgICAgICAgIGxpbmUtaGVpZ2h0OiAxMDAlO1xcbiAgICAgICAgICB1c2VyLXNlbGVjdDogbm9uZTtcXG4gICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2FhYTtcXG4gICAgICAgICAgY29sb3I6ICMzMzM7XFxuICAgICAgICAgICY6Zmlyc3QtY2hpbGR7XFxuICAgICAgICAgICAgcGFkZGluZy10b3A6IDhweDsgXFxuICAgICAgICAgIH1cXG4gICAgICAgICAgJjpsYXN0LWNoaWxke1xcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b206IG5vbmU7XFxuICAgICAgICAgICAgcGFkZGluZy1ib3R0b206IDhweDtcXG4gICAgICAgICAgfVxcbiAgICAgICAgICAmOmhvdmVye1xcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IGdyYXk7XFxuICAgICAgICAgICAgY29sb3I6IHdoaXRlO1xcbiAgICAgICAgICB9XFxuICAgICAgICB9XFxuICAgICAgfVxcblxcblxcbiAgICB9XFxuICAgIC5UQnV0dG9uLmFsZXJ0ZWR7XFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogb3JhbmdlcmVkO1xcbiAgICAgIGJvcmRlcjogbm9uZTtcXG4gICAgICAmOmhvdmVye1xcbiAgICAgICAgYm9yZGVyLWNvbG9yOiBvcmFuZ2VyZWQ7XFxuICAgICAgfVxcbiAgICB9XFxuXFxuXFxuICAgIGJ1dHRvbntcXG4gICAgICBhbGw6dW5zZXQ7XFxuICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgICAvLyBkaXNwbGF5OiBibG9jaztcXG4gICAgICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIC41cztcXG4gICAgICBhcHBlYXJhbmNlOiBub25lO1xcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgICAgIGJvcmRlci1yYWRpdXM6IDZweDtcXG4gICAgICB3aWR0aDogMzJweDtcXG4gICAgICBoZWlnaHQ6IDMycHg7XFxuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgICAvLyBtYXJnaW4tcmlnaHQ6IDZweDtcXG4gICAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlciBjZW50ZXI7XFxuICAgICAgYmFja2dyb3VuZC1zaXplOiAyNHB4IDI0cHg7XFxuICAgICAgbWFyZ2luOiAwIDZweCA2cHggMDtcXG4gICAgICBzdmd7XFxuICAgICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbiAgICAgICAgbWFyZ2luOiAwO1xcbiAgICAgICAgcGFkZGluZzogMDtcXG4gICAgICB9XFxuICAgICAgJi5mb3JtYXR0aW5ne1xcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICAgICAgICBib3JkZXItY29sb3I6IGJsYWNrO1xcbiAgICAgICAgc3Zne1xcbiAgICAgICAgICBvcGFjaXR5OiAwLjk7XFxuICAgICAgICB9XFxuICAgICAgfVxcbiAgICAgICY6aG92ZXJ7XFxuICAgICAgICBib3JkZXItY29sb3I6IHJnYmEoMjU1LDI1NSwyNTUsMC42KTtcXG4gICAgICB9XFxuICAgICAgJi5vbntcXG4gICAgICAgIGJvcmRlci1jb2xvcjogcmdiYSgyNTUsMjU1LDI1NSwwLjMpO1xcbiAgICAgIH1cXG4gICAgICAmOmxhc3QtY2hpbGR7XFxuICAgICAgICBtYXJnaW4tcmlnaHQ6IDA7XFxuICAgICAgfVxcbiAgICB9XFxuICB9XFxuICAud29ya0FyZWF7XFxuICAgIGFsbDogdW5zZXQ7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgIHdpZHRoOjEwMCU7XFxuICAgIGZsZXgtZ3JvdzogMTtcXG4gICAgZmxleC1zaHJpbms6IDE7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIC8vIGp1c3RpZnktY29udGVudDogc3RyZXRjaDtcXG4gICAgYWxpZ24tY29udGVudDogc3RyZXRjaDtcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2NjY2NjYzsgLy9pbiBtZW1vcnkgb2YgYmVsb3ZlZCBOTlxcbiAgICBtaW4taGVpZ2h0OiAyMDBweDtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBwYWRkaW5nOjA7XFxuICAgIC8vIG1heC1oZWlnaHQ6IDEwMCU7XFxuICAgIC5jb2RlSmFyICwgLnByZXZpZXcge1xcbiAgICAgIC8vIGFsbDogdW5zZXQ7XFxuICAgICAgZGlzcGxheTpibG9jaztcXG4gICAgICBmbGV4LWdyb3c6IDE7XFxuICAgICAgZmxleC1zaHJpbms6MTtcXG4gICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICAgIG1heC13aWR0aDogMTAwJTtcXG4gICAgICBtYXJnaW46IDA7XFxuICAgICAgc2Nyb2xsYmFyLXdpZHRoOiB0aGluO1xcbiAgICAgIHNjcm9sbGJhci1jb2xvcjogIzQ0NCAjZGRkZGRkO1xcbiAgICAgICY6Oi13ZWJraXQtc2Nyb2xsYmFye1xcbiAgICAgICAgd2lkdGg6IDRweDtcXG4gICAgICB9XFxuICAgICAgJjo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2t7XFxuICAgICAgICBiYWNrZ3JvdW5kOiAjZGRkZGRkO1xcbiAgICAgIH1cXG4gICAgICAmOjotd2Via2l0LXNjcm9sbGJhci10aHVtYiB7XFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDQ0O1xcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgICAgICAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiA0cHg7XFxuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICAgIH1cXG4gICAgfVxcblxcbiAgICAuY29kZUphcntcXG4gICAgICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAwO1xcbiAgICAgIGZvbnQtZmFtaWx5OiBDb25zb2xhcywgTW9uYWNvLCAnQW5kYWxlIE1vbm8nLCAnVWJ1bnR1IE1vbm8nLCB1aS1tb25vc3BhY2UgLCBtb25vc3BhY2U7XFxuXFxuICAgICAgLy8gOjpzcGVsbGluZy1lcnJvcntcXG4gICAgICAvLyAgIGJhY2tncm91bmQtY29sb3I6IHllbGxvdztcXG4gICAgICAvLyB9XFxuICAgICAgZm9udC1zaXplOiAxOHB4O1xcbiAgICAgIGxpbmUtaGVpZ2h0OiAxNTAlO1xcbiAgICAgIGNvbG9yOiAjMzMzO1xcbiAgICAgIGZsZXgtZ3JvdzogMTtcXG4gICAgICBwYWRkaW5nOiAxOHB4IDI0cHg7XFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2U0ZTNlMjtcXG4gICAgICBvdmVyZmxvdzogYXV0bztcXG4gICAgICBmbGV4LWJhc2lzOjA7XFxuXFxuICAgIH1cXG4gICAgLnByZXZpZXd7XFxuICAgICAgYm9yZGVyLXJhZGl1czogMDtcXG4gICAgICBmbGV4LWdyb3c6IDE7XFxuICAgICAgcGFkZGluZzogMDtcXG4gICAgICBtYXJnaW46MDtcXG4gICAgICB3aWR0aDogNTAlO1xcbiAgICAgIGJvcmRlci1sZWZ0OiAxcHggc29saWQgI2RkZDtcXG4gICAgICBvdmVyZmxvdzogYXV0bztcXG4gICAgICBmbGV4LWJhc2lzOiAwO1xcbiAgICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xcblxcblxcbiAgICAgIGlmcmFtZXtcXG4gICAgICAgIGFsbDp1bnNldDtcXG4gICAgICAgIHdpZHRoOjEwMCU7XFxuICAgICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICAgIGJvcmRlcjogbm9uZTtcXG4gICAgICAgIG1hcmdpbjowO1xcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICAgIHRvcDogMCA7XFxuICAgICAgICBib3R0b206IDAgO1xcbiAgICAgICAgbGVmdDogMCA7XFxuICAgICAgICByaWdodDogMCA7XFxuICAgICAgfVxcbiAgICB9XFxuICB9XFxuICAmLnNob3dQcmV2aWV3e1xcbiAgICAucHJldmlld3tcXG4gICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgfVxcbiAgfVxcbiAgJi5mdWxsUHJldmlld3tcXG4gICAgLmNvZGVKYXJ7XFxuICAgICAgZGlzcGxheTogbm9uZTtcXG4gICAgfVxcbiAgICAud29ya0FyZWEgLnByZXZpZXd7XFxuICAgICAgZGlzcGxheTogYmxvY2sgIWltcG9ydGFudDtcXG4gICAgICB3aWR0aDogMTAwJTtcXG4gICAgICBtYXgtd2lkdGg6IDEwMCU7XFxuICAgICAgaWZyYW1le1xcbiAgICAgICAgd2lkdGg6IDEwMCU7XFxuICAgICAgfVxcbiAgICB9XFxuICB9XFxufVxcblxcbi8vc29tZSBhZGRpdGlvbnNcXG5cXG4uY29kZUphcntcXG4gIC50b2tlbntcXG4gICAgJi5ocntcXG4gICAgICBsZXR0ZXItc3BhY2luZzogLjVlbTsgXFxuICAgIH1cXG4gICAgJi5pbXBvcnRhbnR7XFxuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICAgICAgY29sb3I6IGRhcmtyZWQ7XFxuICAgIH1cXG4gICAgJi50aXRsZXtcXG4gICAgICBsaW5lLWhlaWdodDogMWVtO1xcbiAgICAgIGZvbnQtc2l6ZTogMS4yZW07XFxuICAgIH1cXG4gICAgJi5zdHJpa2V7XFxuICAgICAgLmNvbnRlbnR7XFxuICAgICAgICB0ZXh0LWRlY29yYXRpb246IGxpbmUtdGhyb3VnaDtcXG4gICAgICB9XFxuICAgIH1cXG4gICAgJi5jb2RlLWxhbmd1YWdle1xcbiAgICAgIG9wYWNpdHk6IDAuNTtcXG4gICAgfVxcbiAgICAmLmNvZGUtYmxvY2t7XFxuICAgICAgY29sb3I6ICMxOTkwYjg7XFxuICAgIH1cXG4gIH1cXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAvKiBQcmlzbUpTIDEuMjkuMFxuaHR0cHM6Ly9wcmlzbWpzLmNvbS9kb3dubG9hZC5odG1sI3RoZW1lcz1wcmlzbS1jb3kmbGFuZ3VhZ2VzPW1hcmt1cCtjc3MrY2xpa2UramF2YXNjcmlwdCAqL1xuLyoqXG4gKiBwcmlzbS5qcyBDb3kgdGhlbWUgZm9yIEphdmFTY3JpcHQsIENvZmZlZVNjcmlwdCwgQ1NTIGFuZCBIVE1MXG4gKiBCYXNlZCBvbiBodHRwczovL2dpdGh1Yi5jb20vdHNoZWRvci93b3Jrc2hvcC13cC10aGVtZSAoRXhhbXBsZTogaHR0cDovL3dvcmtzaG9wLmthbnNhbi5jb20vY2F0ZWdvcnkvc2Vzc2lvbnMvYmFzaWNzIG9yIGh0dHA6Ly93b3Jrc2hvcC50aW1zaGVkb3IuY29tL2NhdGVnb3J5L3Nlc3Npb25zL2Jhc2ljcyk7XG4gKiBAYXV0aG9yIFRpbSAgU2hlZG9yXG4gKi9cbi8qIGNvZGVbY2xhc3MqPVwibGFuZ3VhZ2UtXCJdLCAqL1xuLyogcHJlW2NsYXNzKj1cImxhbmd1YWdlLVwiXSB7ICovXG4vKiBcdGNvbG9yOiBibGFjazsgKi9cbi8qIFx0YmFja2dyb3VuZDogbm9uZTsgKi9cbi8qIFx0Zm9udC1mYW1pbHk6IENvbnNvbGFzLCBNb25hY28sICdBbmRhbGUgTW9ubycsICdVYnVudHUgTW9ubycsIG1vbm9zcGFjZTsgKi9cbi8qIFx0Zm9udC1zaXplOiAxZW07ICovXG4vKiBcdHRleHQtYWxpZ246IGxlZnQ7ICovXG4vKiBcdHdoaXRlLXNwYWNlOiBwcmU7ICovXG4vKiBcdHdvcmQtc3BhY2luZzogbm9ybWFsOyAqL1xuLyogXHR3b3JkLWJyZWFrOiBub3JtYWw7ICovXG4vKiBcdHdvcmQtd3JhcDogbm9ybWFsOyAqL1xuLyogXHRsaW5lLWhlaWdodDogMS41OyAqL1xuLyogXHQtbW96LXRhYi1zaXplOiA0OyAqL1xuLyogXHQtby10YWItc2l6ZTogNDsgKi9cbi8qIFx0dGFiLXNpemU6IDQ7ICovXG4vKiBcdC13ZWJraXQtaHlwaGVuczogbm9uZTsgKi9cbi8qIFx0LW1vei1oeXBoZW5zOiBub25lOyAqL1xuLyogXHQtbXMtaHlwaGVuczogbm9uZTsgKi9cbi8qIFx0aHlwaGVuczogbm9uZTsgKi9cbi8qIH0gKi9cbi8qLzEqIENvZGUgYmxvY2tzICoxLyAqL1xuLyovMSogKi9cbi8qcHJlW2NsYXNzKj1cImxhbmd1YWdlLVwiXSB7ICovXG4vKlx0cG9zaXRpb246IHJlbGF0aXZlOyAqL1xuLypcdG1hcmdpbjogLjVlbSAwOyAqL1xuLypcdG92ZXJmbG93OiB2aXNpYmxlOyAqL1xuLypcdHBhZGRpbmc6IDFweDsgKi9cbi8qfSAqL1xuLypwcmVbY2xhc3MqPVwibGFuZ3VhZ2UtXCJdID4gY29kZSB7ICovXG4vKlx0cG9zaXRpb246IHJlbGF0aXZlOyAqL1xuLypcdHotaW5kZXg6IDE7ICovXG4vKlx0Ym9yZGVyLWxlZnQ6IDEwcHggc29saWQgIzM1OGNjYjsgKi9cbi8qXHRib3gtc2hhZG93OiAtMXB4IDBweCAwcHggMHB4ICMzNThjY2IsIDBweCAwcHggMHB4IDFweCAjZGZkZmRmOyAqL1xuLypcdGJhY2tncm91bmQtY29sb3I6ICNmZGZkZmQ7ICovXG4vKlx0YmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRyYW5zcGFyZW50IDUwJSwgcmdiYSg2OSwgMTQyLCAyMDksIDAuMDQpIDUwJSk7ICovXG4vKlx0YmFja2dyb3VuZC1zaXplOiAzZW0gM2VtOyAqL1xuLypcdGJhY2tncm91bmQtb3JpZ2luOiBjb250ZW50LWJveDsgKi9cbi8qXHRiYWNrZ3JvdW5kLWF0dGFjaG1lbnQ6IGxvY2FsOyAqL1xuLyp9ICovXG4vKmNvZGVbY2xhc3MqPVwibGFuZ3VhZ2UtXCJdIHsgKi9cbi8qXHRtYXgtaGVpZ2h0OiBpbmhlcml0OyAqL1xuLypcdGhlaWdodDogaW5oZXJpdDsgKi9cbi8qXHRwYWRkaW5nOiAwIDFlbTsgKi9cbi8qXHRkaXNwbGF5OiBibG9jazsgKi9cbi8qXHRvdmVyZmxvdzogYXV0bzsgKi9cbi8qfSAqL1xuLyovLyBNYXJnaW4gYm90dG9tIHRvIGFjY29tbW9kYXRlIHNoYWRvdyAqL1xuLyo6bm90KHByZSkgPiBjb2RlW2NsYXNzKj1cImxhbmd1YWdlLVwiXSwgKi9cbi8qcHJlW2NsYXNzKj1cImxhbmd1YWdlLVwiXSB7ICovXG4vKlx0YmFja2dyb3VuZC1jb2xvcjogI2ZkZmRmZDsgKi9cbi8qXHQtd2Via2l0LWJveC1zaXppbmc6IGJvcmRlci1ib3g7ICovXG4vKlx0LW1vei1ib3gtc2l6aW5nOiBib3JkZXItYm94OyAqL1xuLypcdGJveC1zaXppbmc6IGJvcmRlci1ib3g7ICovXG4vKlx0bWFyZ2luLWJvdHRvbTogMWVtOyAqL1xuLyp9ICovXG4vKi8vIElubGluZSBjb2RlICovXG4vKjpub3QocHJlKSA+IGNvZGVbY2xhc3MqPVwibGFuZ3VhZ2UtXCJdIHsgKi9cbi8qXHRwb3NpdGlvbjogcmVsYXRpdmU7ICovXG4vKlx0cGFkZGluZzogLjJlbTsgKi9cbi8qXHRib3JkZXItcmFkaXVzOiAwLjNlbTsgKi9cbi8qXHRjb2xvcjogI2M5MmMyYzsgKi9cbi8qXHRib3JkZXI6IDFweCBzb2xpZCByZ2JhKDAsIDAsIDAsIDAuMSk7ICovXG4vKlx0ZGlzcGxheTogaW5saW5lOyAqL1xuLypcdHdoaXRlLXNwYWNlOiBub3JtYWw7ICovXG4vKn0gKi9cbi8qcHJlW2NsYXNzKj1cImxhbmd1YWdlLVwiXTpiZWZvcmUsICovXG4vKnByZVtjbGFzcyo9XCJsYW5ndWFnZS1cIl06YWZ0ZXIgeyAqL1xuLypcdGNvbnRlbnQ6ICcnOyAqL1xuLypcdGRpc3BsYXk6IGJsb2NrOyAqL1xuLypcdHBvc2l0aW9uOiBhYnNvbHV0ZTsgKi9cbi8qXHRib3R0b206IDAuNzVlbTsgKi9cbi8qXHRsZWZ0OiAwLjE4ZW07ICovXG4vKlx0d2lkdGg6IDQwJTsgKi9cbi8qXHRoZWlnaHQ6IDIwJTsgKi9cbi8qXHRtYXgtaGVpZ2h0OiAxM2VtOyAqL1xuLypcdGJveC1zaGFkb3c6IDBweCAxM3B4IDhweCAjOTc5Nzk3OyAqL1xuLypcdC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoLTJkZWcpOyAqL1xuLypcdC1tb3otdHJhbnNmb3JtOiByb3RhdGUoLTJkZWcpOyAqL1xuLypcdC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgtMmRlZyk7ICovXG4vKlx0LW8tdHJhbnNmb3JtOiByb3RhdGUoLTJkZWcpOyAqL1xuLypcdHRyYW5zZm9ybTogcm90YXRlKC0yZGVnKTsgKi9cbi8qfSAqL1xuLypwcmVbY2xhc3MqPVwibGFuZ3VhZ2UtXCJdOmFmdGVyIHsgKi9cbi8qXHRyaWdodDogMC43NWVtOyAqL1xuLypcdGxlZnQ6IGF1dG87ICovXG4vKlx0LXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgyZGVnKTsgKi9cbi8qXHQtbW96LXRyYW5zZm9ybTogcm90YXRlKDJkZWcpOyAqL1xuLypcdC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgyZGVnKTsgKi9cbi8qXHQtby10cmFuc2Zvcm06IHJvdGF0ZSgyZGVnKTsgKi9cbi8qXHR0cmFuc2Zvcm06IHJvdGF0ZSgyZGVnKTsgKi9cbi8qfSAqL1xuLnRva2VuLmNvbW1lbnQsXG4udG9rZW4uYmxvY2stY29tbWVudCxcbi50b2tlbi5wcm9sb2csXG4udG9rZW4uZG9jdHlwZSxcbi50b2tlbi5jZGF0YSB7XG4gIGNvbG9yOiAjN0Q4Qjk5O1xufVxuXG4udG9rZW4ucHVuY3R1YXRpb24ge1xuICBjb2xvcjogIzVGNjM2NDtcbn1cblxuLnRva2VuLnByb3BlcnR5LFxuLnRva2VuLnRhZyxcbi50b2tlbi5ib29sZWFuLFxuLnRva2VuLm51bWJlcixcbi50b2tlbi5mdW5jdGlvbi1uYW1lLFxuLnRva2VuLmNvbnN0YW50LFxuLnRva2VuLnN5bWJvbCxcbi50b2tlbi5kZWxldGVkIHtcbiAgY29sb3I6ICNjOTJjMmM7XG59XG5cbi50b2tlbi5zZWxlY3Rvcixcbi50b2tlbi5hdHRyLW5hbWUsXG4udG9rZW4uc3RyaW5nLFxuLnRva2VuLmNoYXIsXG4udG9rZW4uZnVuY3Rpb24sXG4udG9rZW4uYnVpbHRpbixcbi50b2tlbi5pbnNlcnRlZCB7XG4gIGNvbG9yOiAjMmY5YzBhO1xufVxuXG4udG9rZW4ub3BlcmF0b3IsXG4udG9rZW4uZW50aXR5LFxuLnRva2VuLnVybCxcbi50b2tlbi52YXJpYWJsZSB7XG4gIGNvbG9yOiAjYTY3ZjU5O1xuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNSk7XG59XG5cbi50b2tlbi51cmwgLmNvbnRlbnQge1xuICBjb2xvcjogZGFya2JsdWU7XG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xufVxuXG4udG9rZW4uYXRydWxlLFxuLnRva2VuLmF0dHItdmFsdWUsXG4udG9rZW4ua2V5d29yZCxcbi50b2tlbi5jbGFzcy1uYW1lIHtcbiAgY29sb3I6ICMxOTkwYjg7XG59XG5cbi50b2tlbi5yZWdleCxcbi50b2tlbi5pbXBvcnRhbnQge1xuICBjb2xvcjogZGFya3JlZDtcbn1cblxuLmxhbmd1YWdlLWNzcyAudG9rZW4uc3RyaW5nLFxuLnN0eWxlIC50b2tlbi5zdHJpbmcge1xuICBjb2xvcjogI2E2N2Y1OTtcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjUpO1xufVxuXG4udG9rZW4uaW1wb3J0YW50IHtcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbn1cblxuLnRva2VuLmJvbGQge1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuLnRva2VuLml0YWxpYyB7XG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcbn1cblxuLnRva2VuLmVudGl0eSB7XG4gIGN1cnNvcjogaGVscDtcbn1cblxuLnRva2VuLm5hbWVzcGFjZSB7XG4gIG9wYWNpdHk6IDAuNztcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzY3cHgpIHtcbiAgcHJlW2NsYXNzKj1sYW5ndWFnZS1dOmJlZm9yZSxcbiAgcHJlW2NsYXNzKj1sYW5ndWFnZS1dOmFmdGVyIHtcbiAgICBib3R0b206IDE0cHg7XG4gICAgYm94LXNoYWRvdzogbm9uZTtcbiAgfVxufVxuLyogUGx1Z2luIHN0eWxlczogTGluZSBOdW1iZXJzICovXG5wcmVbY2xhc3MqPWxhbmd1YWdlLV0ubGluZS1udW1iZXJzLmxpbmUtbnVtYmVycyB7XG4gIHBhZGRpbmctbGVmdDogMDtcbn1cblxucHJlW2NsYXNzKj1sYW5ndWFnZS1dLmxpbmUtbnVtYmVycy5saW5lLW51bWJlcnMgY29kZSB7XG4gIHBhZGRpbmctbGVmdDogMy44ZW07XG59XG5cbnByZVtjbGFzcyo9bGFuZ3VhZ2UtXS5saW5lLW51bWJlcnMubGluZS1udW1iZXJzIC5saW5lLW51bWJlcnMtcm93cyB7XG4gIGxlZnQ6IDA7XG59XG5cbi8qIFBsdWdpbiBzdHlsZXM6IExpbmUgSGlnaGxpZ2h0ICovXG5wcmVbY2xhc3MqPWxhbmd1YWdlLV1bZGF0YS1saW5lXSB7XG4gIHBhZGRpbmctdG9wOiAwO1xuICBwYWRkaW5nLWJvdHRvbTogMDtcbiAgcGFkZGluZy1sZWZ0OiAwO1xufVxuXG5wcmVbZGF0YS1saW5lXSBjb2RlIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBwYWRkaW5nLWxlZnQ6IDRlbTtcbn1cblxucHJlIC5saW5lLWhpZ2hsaWdodCB7XG4gIG1hcmdpbi10b3A6IDA7XG59YCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvY29tcG9uZW50cy9CYXJlTURFL3ByaXNtL3ByaXNtX2ZpeGVkLnNjc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7MEZBQUE7QUFFQTs7OztFQUFBO0FBTUEsOEJBQUE7QUFDQSw4QkFBQTtBQUNBLG1CQUFBO0FBQ0EsdUJBQUE7QUFDQSw2RUFBQTtBQUNBLHFCQUFBO0FBQ0EsdUJBQUE7QUFDQSx1QkFBQTtBQUNBLDJCQUFBO0FBQ0EseUJBQUE7QUFDQSx3QkFBQTtBQUNBLHVCQUFBO0FBRUEsdUJBQUE7QUFDQSxxQkFBQTtBQUNBLGtCQUFBO0FBRUEsNEJBQUE7QUFDQSx5QkFBQTtBQUNBLHdCQUFBO0FBQ0Esb0JBQUE7QUFDQSxNQUFBO0FBRUEsdUJBQUE7QUFDQSxPQUFBO0FBQ0EsNkJBQUE7QUFDQSx3QkFBQTtBQUNBLG9CQUFBO0FBQ0EsdUJBQUE7QUFDQSxrQkFBQTtBQUNBLEtBQUE7QUFFQSxvQ0FBQTtBQUNBLHdCQUFBO0FBQ0EsZ0JBQUE7QUFDQSxxQ0FBQTtBQUNBLG1FQUFBO0FBQ0EsK0JBQUE7QUFDQSxzRkFBQTtBQUNBLDhCQUFBO0FBQ0Esb0NBQUE7QUFDQSxrQ0FBQTtBQUNBLEtBQUE7QUFFQSw4QkFBQTtBQUNBLHlCQUFBO0FBQ0EscUJBQUE7QUFDQSxvQkFBQTtBQUNBLG9CQUFBO0FBQ0Esb0JBQUE7QUFDQSxLQUFBO0FBRUEsMENBQUE7QUFDQSx5Q0FBQTtBQUNBLDZCQUFBO0FBQ0EsK0JBQUE7QUFDQSxvQ0FBQTtBQUNBLGlDQUFBO0FBQ0EsNEJBQUE7QUFDQSx3QkFBQTtBQUNBLEtBQUE7QUFFQSxrQkFBQTtBQUNBLDBDQUFBO0FBQ0Esd0JBQUE7QUFDQSxtQkFBQTtBQUNBLDBCQUFBO0FBQ0Esb0JBQUE7QUFDQSwwQ0FBQTtBQUNBLHFCQUFBO0FBQ0EseUJBQUE7QUFDQSxLQUFBO0FBRUEsbUNBQUE7QUFDQSxtQ0FBQTtBQUNBLGlCQUFBO0FBQ0Esb0JBQUE7QUFDQSx3QkFBQTtBQUNBLG9CQUFBO0FBQ0Esa0JBQUE7QUFDQSxnQkFBQTtBQUNBLGlCQUFBO0FBQ0Esc0JBQUE7QUFDQSxzQ0FBQTtBQUNBLHNDQUFBO0FBQ0EsbUNBQUE7QUFDQSxrQ0FBQTtBQUNBLGlDQUFBO0FBQ0EsOEJBQUE7QUFDQSxLQUFBO0FBRUEsbUNBQUE7QUFDQSxtQkFBQTtBQUNBLGdCQUFBO0FBQ0EscUNBQUE7QUFDQSxrQ0FBQTtBQUNBLGlDQUFBO0FBQ0EsZ0NBQUE7QUFDQSw2QkFBQTtBQUNBLEtBQUE7QUFHQTs7Ozs7RUFLQyxjQUFBO0FBWEQ7O0FBY0E7RUFDQyxjQUFBO0FBWEQ7O0FBY0E7Ozs7Ozs7O0VBUUMsY0FBQTtBQVhEOztBQWNBOzs7Ozs7O0VBT0MsY0FBQTtBQVhEOztBQWNBOzs7O0VBSUEsY0FBQTtFQUNDLG9DQUFBO0FBWEQ7O0FBYUE7RUFDRSxlQUFBO0VBQ0EsMEJBQUE7QUFWRjs7QUFhQTs7OztFQUlDLGNBQUE7QUFWRDs7QUFlQTs7RUFFQSxjQUFBO0FBWkE7O0FBZUE7O0VBRUMsY0FBQTtFQUNBLG9DQUFBO0FBWkQ7O0FBZUE7RUFDQyxtQkFBQTtBQVpEOztBQWVBO0VBQ0MsaUJBQUE7QUFaRDs7QUFjQTtFQUNDLGtCQUFBO0FBWEQ7O0FBY0E7RUFDQyxZQUFBO0FBWEQ7O0FBY0E7RUFDQyxZQUFBO0FBWEQ7O0FBY0E7RUFDQzs7SUFFQyxZQUFBO0lBQ0EsZ0JBQUE7RUFYQTtBQUNGO0FBZUEsZ0NBQUE7QUFDQTtFQUNDLGVBQUE7QUFiRDs7QUFnQkE7RUFDQyxtQkFBQTtBQWJEOztBQWdCQTtFQUNDLE9BQUE7QUFiRDs7QUFnQkEsa0NBQUE7QUFDQTtFQUNDLGNBQUE7RUFDQSxpQkFBQTtFQUNBLGVBQUE7QUFiRDs7QUFlQTtFQUNDLGtCQUFBO0VBQ0EsaUJBQUE7QUFaRDs7QUFjQTtFQUNDLGFBQUE7QUFYRFwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKiBQcmlzbUpTIDEuMjkuMFxcbmh0dHBzOi8vcHJpc21qcy5jb20vZG93bmxvYWQuaHRtbCN0aGVtZXM9cHJpc20tY295Jmxhbmd1YWdlcz1tYXJrdXArY3NzK2NsaWtlK2phdmFzY3JpcHQgKi9cXG4vKipcXG4gKiBwcmlzbS5qcyBDb3kgdGhlbWUgZm9yIEphdmFTY3JpcHQsIENvZmZlZVNjcmlwdCwgQ1NTIGFuZCBIVE1MXFxuICogQmFzZWQgb24gaHR0cHM6Ly9naXRodWIuY29tL3RzaGVkb3Ivd29ya3Nob3Atd3AtdGhlbWUgKEV4YW1wbGU6IGh0dHA6Ly93b3Jrc2hvcC5rYW5zYW4uY29tL2NhdGVnb3J5L3Nlc3Npb25zL2Jhc2ljcyBvciBodHRwOi8vd29ya3Nob3AudGltc2hlZG9yLmNvbS9jYXRlZ29yeS9zZXNzaW9ucy9iYXNpY3MpO1xcbiAqIEBhdXRob3IgVGltICBTaGVkb3JcXG4gKi9cXG5cXG4vKiBjb2RlW2NsYXNzKj1cXFwibGFuZ3VhZ2UtXFxcIl0sICovXFxuLyogcHJlW2NsYXNzKj1cXFwibGFuZ3VhZ2UtXFxcIl0geyAqL1xcbi8qIFxcdGNvbG9yOiBibGFjazsgKi9cXG4vKiBcXHRiYWNrZ3JvdW5kOiBub25lOyAqL1xcbi8qIFxcdGZvbnQtZmFtaWx5OiBDb25zb2xhcywgTW9uYWNvLCAnQW5kYWxlIE1vbm8nLCAnVWJ1bnR1IE1vbm8nLCBtb25vc3BhY2U7ICovXFxuLyogXFx0Zm9udC1zaXplOiAxZW07ICovXFxuLyogXFx0dGV4dC1hbGlnbjogbGVmdDsgKi9cXG4vKiBcXHR3aGl0ZS1zcGFjZTogcHJlOyAqL1xcbi8qIFxcdHdvcmQtc3BhY2luZzogbm9ybWFsOyAqL1xcbi8qIFxcdHdvcmQtYnJlYWs6IG5vcm1hbDsgKi9cXG4vKiBcXHR3b3JkLXdyYXA6IG5vcm1hbDsgKi9cXG4vKiBcXHRsaW5lLWhlaWdodDogMS41OyAqL1xcblxcbi8qIFxcdC1tb3otdGFiLXNpemU6IDQ7ICovXFxuLyogXFx0LW8tdGFiLXNpemU6IDQ7ICovXFxuLyogXFx0dGFiLXNpemU6IDQ7ICovXFxuXFxuLyogXFx0LXdlYmtpdC1oeXBoZW5zOiBub25lOyAqL1xcbi8qIFxcdC1tb3otaHlwaGVuczogbm9uZTsgKi9cXG4vKiBcXHQtbXMtaHlwaGVuczogbm9uZTsgKi9cXG4vKiBcXHRoeXBoZW5zOiBub25lOyAqL1xcbi8qIH0gKi9cXG5cXG4vKi8xKiBDb2RlIGJsb2NrcyAqMS8gKi9cXG4vKi8xKiAqL1xcbi8qcHJlW2NsYXNzKj1cXFwibGFuZ3VhZ2UtXFxcIl0geyAqL1xcbi8qXFx0cG9zaXRpb246IHJlbGF0aXZlOyAqL1xcbi8qXFx0bWFyZ2luOiAuNWVtIDA7ICovXFxuLypcXHRvdmVyZmxvdzogdmlzaWJsZTsgKi9cXG4vKlxcdHBhZGRpbmc6IDFweDsgKi9cXG4vKn0gKi9cXG5cXG4vKnByZVtjbGFzcyo9XFxcImxhbmd1YWdlLVxcXCJdID4gY29kZSB7ICovXFxuLypcXHRwb3NpdGlvbjogcmVsYXRpdmU7ICovXFxuLypcXHR6LWluZGV4OiAxOyAqL1xcbi8qXFx0Ym9yZGVyLWxlZnQ6IDEwcHggc29saWQgIzM1OGNjYjsgKi9cXG4vKlxcdGJveC1zaGFkb3c6IC0xcHggMHB4IDBweCAwcHggIzM1OGNjYiwgMHB4IDBweCAwcHggMXB4ICNkZmRmZGY7ICovXFxuLypcXHRiYWNrZ3JvdW5kLWNvbG9yOiAjZmRmZGZkOyAqL1xcbi8qXFx0YmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRyYW5zcGFyZW50IDUwJSwgcmdiYSg2OSwgMTQyLCAyMDksIDAuMDQpIDUwJSk7ICovXFxuLypcXHRiYWNrZ3JvdW5kLXNpemU6IDNlbSAzZW07ICovXFxuLypcXHRiYWNrZ3JvdW5kLW9yaWdpbjogY29udGVudC1ib3g7ICovXFxuLypcXHRiYWNrZ3JvdW5kLWF0dGFjaG1lbnQ6IGxvY2FsOyAqL1xcbi8qfSAqL1xcblxcbi8qY29kZVtjbGFzcyo9XFxcImxhbmd1YWdlLVxcXCJdIHsgKi9cXG4vKlxcdG1heC1oZWlnaHQ6IGluaGVyaXQ7ICovXFxuLypcXHRoZWlnaHQ6IGluaGVyaXQ7ICovXFxuLypcXHRwYWRkaW5nOiAwIDFlbTsgKi9cXG4vKlxcdGRpc3BsYXk6IGJsb2NrOyAqL1xcbi8qXFx0b3ZlcmZsb3c6IGF1dG87ICovXFxuLyp9ICovXFxuXFxuLyovLyBNYXJnaW4gYm90dG9tIHRvIGFjY29tbW9kYXRlIHNoYWRvdyAqLyBcXG4vKjpub3QocHJlKSA+IGNvZGVbY2xhc3MqPVxcXCJsYW5ndWFnZS1cXFwiXSwgKi9cXG4vKnByZVtjbGFzcyo9XFxcImxhbmd1YWdlLVxcXCJdIHsgKi9cXG4vKlxcdGJhY2tncm91bmQtY29sb3I6ICNmZGZkZmQ7ICovXFxuLypcXHQtd2Via2l0LWJveC1zaXppbmc6IGJvcmRlci1ib3g7ICovXFxuLypcXHQtbW96LWJveC1zaXppbmc6IGJvcmRlci1ib3g7ICovXFxuLypcXHRib3gtc2l6aW5nOiBib3JkZXItYm94OyAqL1xcbi8qXFx0bWFyZ2luLWJvdHRvbTogMWVtOyAqL1xcbi8qfSAqL1xcblxcbi8qLy8gSW5saW5lIGNvZGUgKi8gXFxuLyo6bm90KHByZSkgPiBjb2RlW2NsYXNzKj1cXFwibGFuZ3VhZ2UtXFxcIl0geyAqL1xcbi8qXFx0cG9zaXRpb246IHJlbGF0aXZlOyAqL1xcbi8qXFx0cGFkZGluZzogLjJlbTsgKi9cXG4vKlxcdGJvcmRlci1yYWRpdXM6IDAuM2VtOyAqL1xcbi8qXFx0Y29sb3I6ICNjOTJjMmM7ICovXFxuLypcXHRib3JkZXI6IDFweCBzb2xpZCByZ2JhKDAsIDAsIDAsIDAuMSk7ICovXFxuLypcXHRkaXNwbGF5OiBpbmxpbmU7ICovXFxuLypcXHR3aGl0ZS1zcGFjZTogbm9ybWFsOyAqL1xcbi8qfSAqL1xcblxcbi8qcHJlW2NsYXNzKj1cXFwibGFuZ3VhZ2UtXFxcIl06YmVmb3JlLCAqL1xcbi8qcHJlW2NsYXNzKj1cXFwibGFuZ3VhZ2UtXFxcIl06YWZ0ZXIgeyAqL1xcbi8qXFx0Y29udGVudDogJyc7ICovXFxuLypcXHRkaXNwbGF5OiBibG9jazsgKi9cXG4vKlxcdHBvc2l0aW9uOiBhYnNvbHV0ZTsgKi9cXG4vKlxcdGJvdHRvbTogMC43NWVtOyAqL1xcbi8qXFx0bGVmdDogMC4xOGVtOyAqL1xcbi8qXFx0d2lkdGg6IDQwJTsgKi9cXG4vKlxcdGhlaWdodDogMjAlOyAqL1xcbi8qXFx0bWF4LWhlaWdodDogMTNlbTsgKi9cXG4vKlxcdGJveC1zaGFkb3c6IDBweCAxM3B4IDhweCAjOTc5Nzk3OyAqL1xcbi8qXFx0LXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgtMmRlZyk7ICovXFxuLypcXHQtbW96LXRyYW5zZm9ybTogcm90YXRlKC0yZGVnKTsgKi9cXG4vKlxcdC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgtMmRlZyk7ICovXFxuLypcXHQtby10cmFuc2Zvcm06IHJvdGF0ZSgtMmRlZyk7ICovXFxuLypcXHR0cmFuc2Zvcm06IHJvdGF0ZSgtMmRlZyk7ICovXFxuLyp9ICovXFxuXFxuLypwcmVbY2xhc3MqPVxcXCJsYW5ndWFnZS1cXFwiXTphZnRlciB7ICovXFxuLypcXHRyaWdodDogMC43NWVtOyAqL1xcbi8qXFx0bGVmdDogYXV0bzsgKi9cXG4vKlxcdC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMmRlZyk7ICovXFxuLypcXHQtbW96LXRyYW5zZm9ybTogcm90YXRlKDJkZWcpOyAqL1xcbi8qXFx0LW1zLXRyYW5zZm9ybTogcm90YXRlKDJkZWcpOyAqL1xcbi8qXFx0LW8tdHJhbnNmb3JtOiByb3RhdGUoMmRlZyk7ICovXFxuLypcXHR0cmFuc2Zvcm06IHJvdGF0ZSgyZGVnKTsgKi9cXG4vKn0gKi9cXG5cXG5cXG4udG9rZW4uY29tbWVudCxcXG4udG9rZW4uYmxvY2stY29tbWVudCxcXG4udG9rZW4ucHJvbG9nLFxcbi50b2tlbi5kb2N0eXBlLFxcbi50b2tlbi5jZGF0YSB7XFxuXFx0Y29sb3I6ICM3RDhCOTk7XFxufVxcblxcbi50b2tlbi5wdW5jdHVhdGlvbiB7XFxuXFx0Y29sb3I6ICM1RjYzNjQ7XFxufVxcblxcbi50b2tlbi5wcm9wZXJ0eSxcXG4udG9rZW4udGFnLFxcbi50b2tlbi5ib29sZWFuLFxcbi50b2tlbi5udW1iZXIsXFxuLnRva2VuLmZ1bmN0aW9uLW5hbWUsXFxuLnRva2VuLmNvbnN0YW50LFxcbi50b2tlbi5zeW1ib2wsXFxuLnRva2VuLmRlbGV0ZWQge1xcblxcdGNvbG9yOiAjYzkyYzJjO1xcbn1cXG5cXG4udG9rZW4uc2VsZWN0b3IsXFxuLnRva2VuLmF0dHItbmFtZSxcXG4udG9rZW4uc3RyaW5nLFxcbi50b2tlbi5jaGFyLFxcbi50b2tlbi5mdW5jdGlvbixcXG4udG9rZW4uYnVpbHRpbixcXG4udG9rZW4uaW5zZXJ0ZWQge1xcblxcdGNvbG9yOiAjMmY5YzBhO1xcbn1cXG5cXG4udG9rZW4ub3BlcmF0b3IsXFxuLnRva2VuLmVudGl0eSxcXG4udG9rZW4udXJsLFxcbi50b2tlbi52YXJpYWJsZSB7XFxuY29sb3I6ICNhNjdmNTk7XFxuXFx0YmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjUpO1xcbn1cXG4udG9rZW4udXJsIC5jb250ZW50e1xcbiAgY29sb3I6IGRhcmtibHVlO1xcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XFxufVxcblxcbi50b2tlbi5hdHJ1bGUsXFxuLnRva2VuLmF0dHItdmFsdWUsXFxuLnRva2VuLmtleXdvcmQsXFxuLnRva2VuLmNsYXNzLW5hbWUge1xcblxcdGNvbG9yOiAjMTk5MGI4O1xcbn1cXG5cXG5cXG5cXG4udG9rZW4ucmVnZXgsXFxuLnRva2VuLmltcG9ydGFudCB7XFxuY29sb3I6IGRhcmtyZWQ7XFxufVxcblxcbi5sYW5ndWFnZS1jc3MgLnRva2VuLnN0cmluZyxcXG4uc3R5bGUgLnRva2VuLnN0cmluZyB7XFxuXFx0Y29sb3I6ICNhNjdmNTk7XFxuXFx0YmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjUpO1xcbn1cXG5cXG4udG9rZW4uaW1wb3J0YW50IHtcXG5cXHRmb250LXdlaWdodDogbm9ybWFsO1xcbn1cXG5cXG4udG9rZW4uYm9sZCB7XFxuXFx0Zm9udC13ZWlnaHQ6IGJvbGQ7XFxufVxcbi50b2tlbi5pdGFsaWMge1xcblxcdGZvbnQtc3R5bGU6IGl0YWxpYztcXG59XFxuXFxuLnRva2VuLmVudGl0eSB7XFxuXFx0Y3Vyc29yOiBoZWxwO1xcbn1cXG5cXG4udG9rZW4ubmFtZXNwYWNlIHtcXG5cXHRvcGFjaXR5OiAuNztcXG59XFxuXFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzY3cHgpIHtcXG5cXHRwcmVbY2xhc3MqPVxcXCJsYW5ndWFnZS1cXFwiXTpiZWZvcmUsXFxuXFx0cHJlW2NsYXNzKj1cXFwibGFuZ3VhZ2UtXFxcIl06YWZ0ZXIge1xcblxcdFxcdGJvdHRvbTogMTRweDtcXG5cXHRcXHRib3gtc2hhZG93OiBub25lO1xcblxcdH1cXG5cXG59XFxuXFxuLyogUGx1Z2luIHN0eWxlczogTGluZSBOdW1iZXJzICovXFxucHJlW2NsYXNzKj1cXFwibGFuZ3VhZ2UtXFxcIl0ubGluZS1udW1iZXJzLmxpbmUtbnVtYmVycyB7XFxuXFx0cGFkZGluZy1sZWZ0OiAwO1xcbn1cXG5cXG5wcmVbY2xhc3MqPVxcXCJsYW5ndWFnZS1cXFwiXS5saW5lLW51bWJlcnMubGluZS1udW1iZXJzIGNvZGUge1xcblxcdHBhZGRpbmctbGVmdDogMy44ZW07XFxufVxcblxcbnByZVtjbGFzcyo9XFxcImxhbmd1YWdlLVxcXCJdLmxpbmUtbnVtYmVycy5saW5lLW51bWJlcnMgLmxpbmUtbnVtYmVycy1yb3dzIHtcXG5cXHRsZWZ0OiAwO1xcbn1cXG5cXG4vKiBQbHVnaW4gc3R5bGVzOiBMaW5lIEhpZ2hsaWdodCAqL1xcbnByZVtjbGFzcyo9XFxcImxhbmd1YWdlLVxcXCJdW2RhdGEtbGluZV0ge1xcblxcdHBhZGRpbmctdG9wOiAwO1xcblxcdHBhZGRpbmctYm90dG9tOiAwO1xcblxcdHBhZGRpbmctbGVmdDogMDtcXG59XFxucHJlW2RhdGEtbGluZV0gY29kZSB7XFxuXFx0cG9zaXRpb246IHJlbGF0aXZlO1xcblxcdHBhZGRpbmctbGVmdDogNGVtO1xcbn1cXG5wcmUgLmxpbmUtaGlnaGxpZ2h0IHtcXG5cXHRtYXJnaW4tdG9wOiAwO1xcbn1cXG5cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsInZhciBuPWZ1bmN0aW9uKHQscyxyLGUpe3ZhciB1O3NbMF09MDtmb3IodmFyIGg9MTtoPHMubGVuZ3RoO2grKyl7dmFyIHA9c1toKytdLGE9c1toXT8oc1swXXw9cD8xOjIscltzW2grK11dKTpzWysraF07Mz09PXA/ZVswXT1hOjQ9PT1wP2VbMV09T2JqZWN0LmFzc2lnbihlWzFdfHx7fSxhKTo1PT09cD8oZVsxXT1lWzFdfHx7fSlbc1srK2hdXT1hOjY9PT1wP2VbMV1bc1srK2hdXSs9YStcIlwiOnA/KHU9dC5hcHBseShhLG4odCxhLHIsW1wiXCIsbnVsbF0pKSxlLnB1c2godSksYVswXT9zWzBdfD0yOihzW2gtMl09MCxzW2hdPXUpKTplLnB1c2goYSl9cmV0dXJuIGV9LHQ9bmV3IE1hcDtleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzKXt2YXIgcj10LmdldCh0aGlzKTtyZXR1cm4gcnx8KHI9bmV3IE1hcCx0LnNldCh0aGlzLHIpKSwocj1uKHRoaXMsci5nZXQocyl8fChyLnNldChzLHI9ZnVuY3Rpb24obil7Zm9yKHZhciB0LHMscj0xLGU9XCJcIix1PVwiXCIsaD1bMF0scD1mdW5jdGlvbihuKXsxPT09ciYmKG58fChlPWUucmVwbGFjZSgvXlxccypcXG5cXHMqfFxccypcXG5cXHMqJC9nLFwiXCIpKSk/aC5wdXNoKDAsbixlKTozPT09ciYmKG58fGUpPyhoLnB1c2goMyxuLGUpLHI9Mik6Mj09PXImJlwiLi4uXCI9PT1lJiZuP2gucHVzaCg0LG4sMCk6Mj09PXImJmUmJiFuP2gucHVzaCg1LDAsITAsZSk6cj49NSYmKChlfHwhbiYmNT09PXIpJiYoaC5wdXNoKHIsMCxlLHMpLHI9NiksbiYmKGgucHVzaChyLG4sMCxzKSxyPTYpKSxlPVwiXCJ9LGE9MDthPG4ubGVuZ3RoO2ErKyl7YSYmKDE9PT1yJiZwKCkscChhKSk7Zm9yKHZhciBsPTA7bDxuW2FdLmxlbmd0aDtsKyspdD1uW2FdW2xdLDE9PT1yP1wiPFwiPT09dD8ocCgpLGg9W2hdLHI9Myk6ZSs9dDo0PT09cj9cIi0tXCI9PT1lJiZcIj5cIj09PXQ/KHI9MSxlPVwiXCIpOmU9dCtlWzBdOnU/dD09PXU/dT1cIlwiOmUrPXQ6J1wiJz09PXR8fFwiJ1wiPT09dD91PXQ6XCI+XCI9PT10PyhwKCkscj0xKTpyJiYoXCI9XCI9PT10PyhyPTUscz1lLGU9XCJcIik6XCIvXCI9PT10JiYocjw1fHxcIj5cIj09PW5bYV1bbCsxXSk/KHAoKSwzPT09ciYmKGg9aFswXSkscj1oLChoPWhbMF0pLnB1c2goMiwwLHIpLHI9MCk6XCIgXCI9PT10fHxcIlxcdFwiPT09dHx8XCJcXG5cIj09PXR8fFwiXFxyXCI9PT10PyhwKCkscj0yKTplKz10KSwzPT09ciYmXCIhLS1cIj09PWUmJihyPTQsaD1oWzBdKX1yZXR1cm4gcCgpLGh9KHMpKSxyKSxhcmd1bWVudHMsW10pKS5sZW5ndGg+MT9yOnJbMF19XG4iLCJpbXBvcnR7aCBhcyByLENvbXBvbmVudCBhcyBvLHJlbmRlciBhcyB0fWZyb21cInByZWFjdFwiO2V4cG9ydHtoLHJlbmRlcixDb21wb25lbnR9ZnJvbVwicHJlYWN0XCI7aW1wb3J0IGUgZnJvbVwiaHRtXCI7dmFyIG09ZS5iaW5kKHIpO2V4cG9ydHttIGFzIGh0bWx9O1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9tZGVkLnNjc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9tZGVkLnNjc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3ByaXNtX2ZpeGVkLnNjc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9wcmlzbV9maXhlZC5zY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfcHJlYWN0X187IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgeyBoICwgQ29tcG9uZW50LCBjcmVhdGVSZWYgfSBmcm9tIFwicHJlYWN0XCI7XG5pbXBvcnQge2h0bWx9IGZyb20gXCJodG0vcHJlYWN0XCI7XG5cbmltcG9ydCB7Q29kZUphcn0gZnJvbSBcImNvZGVqYXJcIjtcbnJlcXVpcmUoXCIuL3ByaXNtL3ByaXNtX2ZpeGVkLnNjc3NcIik7XG5yZXF1aXJlKFwiLi9tZGVkLnNjc3NcIilcbmNvbnN0IFByaXNtID0gIHJlcXVpcmUoXCIuL3ByaXNtL3ByaXNtLmpzXCIpXG5cbmltcG9ydCBNZW51IGZyb20gXCIuL01lbnVcIjtcbmltcG9ydCBUQnV0dG9uIGZyb20gXCIuL1RCdXR0b25cIjtcbmNvbnN0IGlmcmFtZVNjcm9sbGJhcnMgPSBgPHN0eWxlPlxuYm9keSAsIGh0bWx7XG5zY3JvbGxiYXItd2lkdGg6IHRoaW47XG5zY3JvbGxiYXItY29sb3I6ICM0NDQgI2RkZGRkZDtcbn1cblxuaHRtbDo6LXdlYmtpdC1zY3JvbGxiYXJ7XG53aWR0aDogNnB4O1xufVxuaHRtbDo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2t7XG5iYWNrZ3JvdW5kOiAjZGRkZGRkO1xufVxuaHRtbDo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIge1xuYmFja2dyb3VuZC1jb2xvcjogIzQ0NDtcbmJvcmRlci1yYWRpdXM6IDNweDtcbi13ZWJraXQtYm9yZGVyLXJhZGl1czogM3B4O1xub3ZlcmZsb3c6IGhpZGRlbjtcbn1cblxuPC9zdHlsZT5gXG4vL1xuLy8gICBJQ09OU1xuLy9cbmltcG9ydCBJY29uU2hvd1ByZXZpZXcgZnJvbSBcIi4vaWNvbnMvcHJldmlld19GSUxMMF93Z2h0NDAwX0dSQUQwX29wc3oyNC5zdmc/cmF3XCIgXG4vL2Z1bGwgcHJldmlld1xuaW1wb3J0IEljb25GUHJldmlldyBmcm9tIFwiLi9pY29ucy9wcmV2aWV3X2JpZ19vbl9taW4uc3ZnP3Jhd1wiXG5pbXBvcnQgSWNvbkZQcmV2aWV3T2ZmIGZyb20gXCIuL2ljb25zL3Zpc2liaWxpdHlfRklMTDBfd2dodDQwMF9HUkFEMF9vcHN6MjQuc3ZnP3Jhd1wiXG4vL2Z1bGxzY3JlZW5cbmltcG9ydCBJY29uRlNjcmVlbk9mZiBmcm9tIFwiLi9pY29ucy9mdWxsc2NyZWVuX0ZJTEwwX3dnaHQ0MDBfR1JBRDBfb3BzejI0LnN2Zz9yYXdcIlxuaW1wb3J0IEljb25GU2NyZWVuIGZyb20gXCIuL2ljb25zL2Z1bGxzY3JlZW5fZXhpdF9GSUxMMF93Z2h0NDAwX0dSQUQwX29wc3oyNC5zdmc/cmF3XCJcbi8vc3BlbGxjaGVja1xuaW1wb3J0IEljb25TcGVsbCBmcm9tIFwiLi9pY29ucy9zcGVsbGNoZWNrX2FjdGl2ZV9taW5pZmllZC5zdmc/cmF3XCJcbmltcG9ydCBJY29uU3BlbGxPZmYgZnJvbSBcIi4vaWNvbnMvc3BlbGxjaGVja19GSUxMMV93Z2h0NDAwX0dSQUQwX29wc3oyNC5zdmc/cmF3XCJcbi8vc3luYyBzY3JvbGxcbmltcG9ydCBJY29uU1Njcm9sbCBmcm9tIFwiLi9pY29ucy9hcnJvd3NfbG9ja2VkLnN2Zz9yYXdcIlxuaW1wb3J0IEljb25TU2Nyb2xsT2ZmIGZyb20gXCIuL2ljb25zL3N3YXBfdmVydF9GSUxMMF93Z2h0NDAwX0dSQUQwX29wc3oyNC5zdmc/cmF3XCJcbi8vc2F2ZVxuaW1wb3J0IEljb25TYXZlIGZyb20gXCIuL2ljb25zL3NhdmVfd2hpdGUuc3ZnP3Jhd1wiXG4vL2Zvcm1hdHRpbmdcbmltcG9ydCBJY29uQm9sZCBmcm9tIFwiLi9pY29ucy9mb3JtYXR0aW5nL2Zvcm1hdF9ib2xkX0ZJTEwwX3dnaHQ0MDBfR1JBRDBfb3BzejI0LnN2Zz9yYXdcIlxuaW1wb3J0IEljb25JdGFsaWMgZnJvbSBcIi4vaWNvbnMvZm9ybWF0dGluZy9mb3JtYXRfaXRhbGljX0ZJTEwwX3dnaHQ0MDBfR1JBRDBfb3BzejI0LnN2Zz9yYXdcIlxuaW1wb3J0IEljb25MaW5rIGZyb20gXCIuL2ljb25zL2Zvcm1hdHRpbmcvbGlua19GSUxMMF93Z2h0NDAwX0dSQUQwX29wc3oyNC5zdmc/cmF3XCJcbmltcG9ydCBJY29uU3RyaWtlIGZyb20gXCIuL2ljb25zL2Zvcm1hdHRpbmcvZm9ybWF0X3N0cmlrZXRocm91Z2hfRklMTDBfd2dodDQwMF9HUkFEMF9vcHN6MjQuc3ZnP3Jhd1wiXG5cblxuY29uc3QgaXNNYWMgPSBuYXZpZ2F0b3IucGxhdGZvcm0udG9VcHBlckNhc2UoKS5pbmRleE9mKCdNQUMnKSA+PSAwO1xuY29uc3QgbW9kU3ltYm9sID0gaXNNYWMgPyBcIuKMmFwiIDogXCJDdHJsXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFyZU1ERSBleHRlbmRzIENvbXBvbmVudHtcbiAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICBzdXBlcihwcm9wcyk7XG4gICAgIHRoaXMucHJldmlld1Rocm90dGxlZCA9IGZhbHNlO1xuICAgICB0aGlzLnByZXZpZXdJblByb2Nlc3MgPSBmYWxzZTtcbiAgICAgdGhpcy5zY3JvbGxUaHJvdHRsZWQgPSBmYWxzZTtcbiAgICAgdGhpcy5zYXZlVGhyb3R0bGVkID0gZmFsc2U7XG4gICAgIHRoaXMuY29tcG9uZW50Q29udGFpbmVyID0gY3JlYXRlUmVmKCk7XG4gICAgIHRoaXMuY29kZUphckNvbnRhaW5lciA9IGNyZWF0ZVJlZigpO1xuICAgICB0aGlzLnByZXZpZXdDb250YWluZXIgPSBjcmVhdGVSZWYoKTtcbiAgICAgdGhpcy5wcmV2aWV3RnJhbWUgPSBjcmVhdGVSZWYoKTtcbiAgICAgdGhpcy5zdGF0ZSA9eyBcbiAgICAgICBmdWxsc2NyZWVuOiBwcm9wcy5mdWxsc2NyZWVuLFxuICAgICAgIHNob3dQcmV2aWV3OiBwcm9wcy5zaG93UHJldmlldyxcbiAgICAgICBmdWxsUHJldmlldzogZmFsc2UsXG4gICAgICAgY29udGVudDogcHJvcHMuY29udGVudCxcbiAgICAgICBzcGVsbENoZWNrOiBwcm9wcy5zcGVsbENoZWNrLFxuICAgICAgIHN5bmNTY3JvbGw6IHRydWUsXG4gICAgICAgbW9kaWZpZWQ6IHByb3BzLm1vZGlmaWVkXG4gICAgIH1cbiAgICAgdGhpcy5jdXJyZW50Q29udGVudD10aGlzLnByb3BzLmNvbnRlbnQ7XG4gICAgIHRoaXMuY29udGVudElkID0gdGhpcy5wcm9wcy5jb250ZW50SWQ7XG4gICAgIHRoaXMuc3Vycm91bmRTZWxlY3Rpb24gPSB0aGlzLnN1cnJvdW5kU2VsZWN0aW9uLmJpbmQodGhpcyk7XG4gICAgIHRoaXMuaGFuZGxlS2V5PSB0aGlzLmhhbmRsZUtleS5iaW5kKHRoaXMpO1xuICAgICB0aGlzLnRvZ2dsZVByZXZpZXcgPSB0aGlzLnRvZ2dsZVByZXZpZXcuYmluZCh0aGlzKTtcbiAgICAgdGhpcy50b2dnbGVGdWxsUHJldmlldyA9IHRoaXMudG9nZ2xlRnVsbFByZXZpZXcuYmluZCh0aGlzKTtcbiAgICAgdGhpcy50b2dnbGVGdWxsc2NyZWVuID0gdGhpcy50b2dnbGVGdWxsc2NyZWVuLmJpbmQodGhpcyk7XG4gICAgIHRoaXMudG9nZ2xlU3BlbGxjaGVjayA9IHRoaXMudG9nZ2xlU3BlbGxjaGVjay5iaW5kKHRoaXMpO1xuICAgICB0aGlzLnRvZ2dsZVN5bmNTY3JvbGwgPSB0aGlzLnRvZ2dsZVN5bmNTY3JvbGwuYmluZCh0aGlzKTtcbiAgICAgdGhpcy5kb1ByZXZpZXcgPSB0aGlzLmRvUHJldmlldy5iaW5kKHRoaXMpO1xuICAgICB0aGlzLnJlZnJlc2hQcmV2aWV3ID0gdGhpcy5yZWZyZXNoUHJldmlldy5iaW5kKHRoaXMpO1xuICAgICBcbiAgICAgLy9cbiAgICAgdGhpcy5zYXZlRmlsZSA9IHRoaXMuc2F2ZUZpbGUuYmluZCh0aGlzKTtcbiAgICAgdGhpcy5vbkNvZGVVcGRhdGUgPSB0aGlzLm9uQ29kZVVwZGF0ZS5iaW5kKHRoaXMpO1xuICAgICB0aGlzLmVkaXRvckNvbW1hbmRzID0ge1xuICAgICAgIFwiYm9sZFwiOiAoKT0+eyB0aGlzLnN1cnJvdW5kU2VsZWN0aW9uKFwiKipcIixcIioqXCIpIH0sXG4gICAgICAgXCJpdGFsaWNcIjogKCk9PnsgdGhpcy5zdXJyb3VuZFNlbGVjdGlvbihcIl9cIixcIl9cIil9LFxuICAgICAgIFwic3RyaWtlXCI6ICgpPT57IHRoaXMuc3Vycm91bmRTZWxlY3Rpb24oXCJ+flwiLFwifn5cIil9LFxuICAgICAgIFwibGlua1wiOiAoKT0+eyBsZXQgdXJsPXByb21wdChcIkVudGVyIFVSTDpcIiAsIFwiaHR0cHM6Ly9cIikgO1xuICAgICAgIHRoaXMuc3Vycm91bmRTZWxlY3Rpb24oXCJbXCIsIFwiXShcIiArICggdXJsIHx8IFwiXCIgKSArIFwiKVwiKVxuICAgICAgIH1cbiAgICAgfVxuICAgICBpZihwcm9wcy5jb250cm9scyl7XG4gICAgICAgICBwcm9wcy5jb250cm9scy5kb1ByZXZpZXcgPSB0aGlzLmRvUHJldmlldztcbiAgICAgICAgIHByb3BzLmNvbnRyb2xzLnN5bmNTY3JvbGwgPSAoKT0+dGhpcy5zdGF0ZS5zeW5jU2Nyb2xsICYmIHRoaXMuc3luY1ByZXZpZXdTY3JvbGwoKTtcbiAgICAgICAgIHByb3BzLmNvbnRyb2xzLnJlZnJlc2hQcmV2aWV3ID0gdGhpcy5yZWZyZXNoUHJldmlldztcbiAgICAgfVxuICAgICBpZihwcm9wcy5pbWFnZVJld3JpdGVyKXtcbiAgICAgICAgY29uc29sZS5pbmZvKFwiSW1hZ2UgcmV3cml0ZXIgZnVuY3Rpb24gaXMgcmVtb3ZlZCwgcGxlYXNlLCBkbyB0aGUgcmV3cml0dGluZyBpbiB1cHBlciBsZXZlbCBjb21wb25lbnRcIilcbiAgICAgfVxuICB9XG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZSgpe1xuICAgIHRoaXMucG9zID0gdGhpcy5qYXIuc2F2ZSgpO1xuICB9XG5cblxuICBjb21wb25lbnREaWRVcGRhdGUob2xkUyAsIG9sZFApe1xuICAgICAvLyBjb25zb2xlLmxvZyhcIkJNREUgdXBkYXRlZFwiICwgb2xkUC5jb250ZW50ICwgdGhpcy5wcm9wcy5jb250ZW50KVxuICAgIC8vIGNvbnNvbGUubG9nKFwiQmFyZSBNREUgdXBkYXRlZFwiICwgdGhpcy5qYXIuc2F2ZSgpKVxuICAgIC8vIGlmIGNvbXBvbmVudCB1cGRhdGVkLFxuICAgIC8vIGJ1dCB0ZXh0IGlzIG5vdCxcbiAgICAvLyBpdCBtZWFucywgd2UgaGF2ZSB0byByZXR1cm4gY3Vyc29yXG4gICAgLy8gdG8gbGFzdCBrbm93biBwb3NpdGlvblxuICAgIGlmKCggdGhpcy5jdXJyZW50Q29udGVudCE9PXRoaXMucHJvcHMuY29udGVudCApIHx8XG4gICAgKHRoaXMucHJvcHMuY29udGVudElkIT09dGhpcy5jb250ZW50SWQpXG4gICAgKXsgXG4gICAgICB0aGlzLmphci51cGRhdGVDb2RlKHRoaXMucHJvcHMuY29udGVudCk7IC8vPz8/XG4gICAgICB0aGlzLmN1cnJlbnRDb250ZW50PXRoaXMucHJvcHMuY29udGVudDtcbiAgICAgIHRoaXMuY29udGVudElkID0gdGhpcy5wcm9wcy5jb250ZW50SWQ7XG4gICAgfSBlbHNle1xuXG4gICAgICAvLyB0aGlzLnBvcyA9IHRoaXMuamFyLnNhdmUoKSA7IC8vICNGSVhNRVxuICAgICAgdGhpcy5wb3MgJiYgdGhpcy5qYXIucmVzdG9yZSh0aGlzLnBvcyk7IC8vOj8/PyBPUiBpbiByZW5kZXIoKVxuXG4gICAgfVxuICAgICAgdGhpcy5kb1ByZXZpZXcoKTtcbiAgICBcbiAgfVxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpe1xuXG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgdGhpcy5kb1ByZXZpZXcpXG4gIH1cbiAgb25Db2RlVXBkYXRlKCl7XG4gICBcbiAgICAgIHRoaXMucG9zID0gdGhpcy5qYXIuc2F2ZSgpO1xuICAgICAgdHlwZW9mIHRoaXMucHJvcHMub25VcGRhdGU9PT0nZnVuY3Rpb24nICYmIHRoaXMucHJvcHMub25VcGRhdGUodGhpcy5qYXIudG9TdHJpbmcoKSk7XG4gICAgICB0aGlzLmRvUHJldmlldygpO1xuICB9XG4gIGNvbXBvbmVudERpZE1vdW50KCl7XG4gICAgdGhpcy5qYXIgPSBDb2RlSmFyKHRoaXMuY29kZUphckNvbnRhaW5lci5jdXJyZW50ICwgXG4gICAgKGUpPT5QcmlzbS5oaWdobGlnaHRFbGVtZW50KGUsZmFsc2UsbnVsbCksXG4gICAge1xuICAgICAgcHJlc2VydmVJZGVudDogdHJ1ZSxcbiAgICAgIHNwZWxsY2hlY2s6IHRoaXMuc3RhdGUuc3BlbGxDaGVja1xuICAgIH1cblxuICAgICk7XG4gICAgdGhpcy5qYXIudXBkYXRlQ29kZSh0aGlzLnByb3BzLmNvbnRlbnQpO1xuICAgIHRoaXMuZG9QcmV2aWV3KCk7XG4gICAgdGhpcy5qYXIub25VcGRhdGUoIHRoaXMub25Db2RlVXBkYXRlKTtcbiAgICAvL0Nocm9tZSBidWcoPykgZml4ICg/KTpcbiAgICB0aGlzLmNvZGVKYXJDb250YWluZXIuY3VycmVudC5mb2N1cygpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHRoaXMuZG9QcmV2aWV3KVxuICAgIHRoaXMuY29kZUphckNvbnRhaW5lci5jdXJyZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIgLCB0aGlzLmhhbmRsZUtleSk7XG4gICAgLy8gY29uc29sZS5sb2codGhpcy5qYXIpO1xuICB9XG5cbiAgZmlyZUNvbW1hbmQoY29tbWFuZCl7XG4gICB0aGlzLmVkaXRvckNvbW1hbmRzW2NvbW1hbmRdKCk7XG4gIH1cblxuICBoYW5kbGVLZXkoZXZ0KXsgXG4gICAgIGNvbnN0IHRlc3RXaGF0ID0gaXNNYWMgPyBldnQubWV0YUtleSA6IGV2dC5jdHJsS2V5IDtcbiAgICAgaWYoIXRlc3RXaGF0KXsgcmV0dXJuIH1cbiAgICAgaWYoIFsnS2V5QicgLCAnS2V5SScgLCAnS2V5TCcgLCAnS2V5RCddLmluZGV4T2YoZXZ0LmNvZGUgKSE9LTEpXG4gICAgIHtcbiAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgIH1cbiAgICAgIC8vIGNvbnNvbGUubG9nKGV2dC5jb2RlKTtcbiAgICAgIGlmKGV2dC5jb2RlPT09J0tleUInKXt0aGlzLmZpcmVDb21tYW5kKFwiYm9sZFwiKX1cbiAgICAgIGlmKGV2dC5jb2RlPT09J0tleUknKXt0aGlzLmZpcmVDb21tYW5kKFwiaXRhbGljXCIpfVxuICAgICAgaWYoZXZ0LmNvZGU9PT0nS2V5TCcpe3RoaXMuZmlyZUNvbW1hbmQoXCJsaW5rXCIpfVxuICAgICAgaWYoZXZ0LmNvZGU9PT0nS2V5RCcpe3RoaXMuZmlyZUNvbW1hbmQoXCJzdHJpa2VcIil9XG4gIH1cblxuXG4gIGluc2VydEF0KHR4dCAsIHBvcyAsIHdoYXQpe1xuICAgIC8vIGNvbnN0IHByZWZpeCA9IHR4dC5zdGFydHNXaXRoKFwiXFxuXCIpID8gXCJcXG5cIiA6IFwiXCI7XG4gICAgcmV0dXJuICB0eHQuc3Vic3RyaW5nKDAscG9zKSArIHdoYXQgKyB0eHQuc3Vic3RyaW5nKHBvcyk7XG4gIH1cblxuICBzdXJyb3VuZFNlbGVjdGlvbiggYmVmb3JlICwgYWZ0ZXIgKXtcbiAgICBjb25zdCBzID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICAgIGlmKHMuaXNDb2xsYXBzZWQpeyBjb25zb2xlLmVycm9yKFwiY29sbGFwc2VkIHNlbGVjdGlvblwiICkgOyByZXR1cm4gfVxuICAgIGNvbnN0IHIgPSBzLmdldFJhbmdlQXQoMCk7XG4gICAgaWYoIXIpeyByZXR1cm4gfVxuICAgIC8vY2hlY2sgaWYgc2VsZWN0aW9uIGlzIGluc2lkZSBvdXIgZWRpdG9yXG4gICAgaWYoXG4gICAgICB0aGlzLmNvZGVKYXJDb250YWluZXIuY3VycmVudC5jb250YWlucyhyLmNvbW1vbkFuY2VzdG9yQ29udGFpbmVyKSB8fFxuICAgICAgdGhpcy5jb2RlSmFyQ29udGFpbmVyLmN1cnJlbnQ9PT1yLmNvbW1vbkFuY2VzdG9yQ29udGFpbmVyIFxuICAgICl7XG4gICAgICAvLyBjb25zb2xlLmxvZyhzICwgcik7XG4gICAgICBjb25zdCBwID0gdGhpcy5qYXIuc2F2ZSgpO1xuICAgICAgaWYocC5kaXI9PT0nLT4nKXtcbiAgICAgICAgcC5lbmQrPSggYWZ0ZXIubGVuZ3RoICsgYmVmb3JlLmxlbmd0aCk7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgXG4gICAgICAgIHAuc3RhcnQrPSggYWZ0ZXIubGVuZ3RoICsgYmVmb3JlLmxlbmd0aCk7XG4gICAgICB9XG4gICAgICBjb25zdCBzdGFydCA9IHIuc3RhcnRDb250YWluZXI7XG4gICAgICBjb25zdCBzdGFydE9mID0gci5zdGFydE9mZnNldDtcbiAgICAgIGNvbnN0IGVuZCA9IHIuZW5kQ29udGFpbmVyO1xuICAgICAgY29uc3QgZW5kT2YgPSByLmVuZE9mZnNldDtcbiAgICAgIC8vIHRoaXMgbXVzdCBnbyBmaXJzdCFcbiAgICAgIGVuZC50ZXh0Q29udGVudCA9IHRoaXMuaW5zZXJ0QXQoXG4gICAgICAgICBlbmQudGV4dENvbnRlbnQsIFxuICAgICAgICAgZW5kT2YsIFxuICAgICAgICAgYWZ0ZXIpXG5cbiAgICAgIHN0YXJ0LnRleHRDb250ZW50ID0gdGhpcy5pbnNlcnRBdChcbiAgICAgICAgIHN0YXJ0LnRleHRDb250ZW50LCBcbiAgICAgICAgIHN0YXJ0T2YsIFxuICAgICAgICAgYmVmb3JlKVxuICAgICAgLy91cGRhdGUgZWRpdG9yXG4gICAgICB0aGlzLmNvZGVKYXJDb250YWluZXIuY3VycmVudC5mb2N1cygpXG4gICAgICB0aGlzLmphci51cGRhdGVDb2RlKHRoaXMuamFyLnRvU3RyaW5nKCkpO1xuICAgICAgdGhpcy5qYXIucmVzdG9yZShwKTtcbiAgICAgIHRoaXMuZG9QcmV2aWV3KHRydWUpXG4gICAgICB0aGlzLm9uQ29kZVVwZGF0ZSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1lbHNle1xuICAgICAgY29uc29sZS5lcnJvcihcIndyb25nIHNlbGVjdGlvblwiKTtcbiAgICB9XG5cbiAgfVxuXG5cbiAgYXN5bmMgc3luY1ByZXZpZXdTY3JvbGwoZm9yY2Upe1xuICAgIGlmKCF0aGlzLnN0YXRlLnN5bmNTY3JvbGwgJiYgIWZvcmNlICl7IHJldHVybiB9XG4gICAgaWYoIXRoaXMuc3RhdGUuc2hvd1ByZXZpZXcpeyByZXR1cm4gfVxuICAgIGlmKHRoaXMuc2Nyb2xsVGhyb3R0bGVkKXsgcmV0dXJuIH1cblxuICAgIHRoaXMuc2Nyb2xsVGhyb3R0bGVkID0gdHJ1ZTtcbiAgICBjb25zdCBkb1Njcm9sbCA9ICgpPT57XG4gICAgICAvL3ByZXZpZXcgaGVpZ2h0XG4gICAgICBjb25zdCBwcmV2aWV3RnVsbEggPSB0aGlzLnByZXZpZXdGcmFtZS5jdXJyZW50LmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbEhlaWdodDtcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwiU0hcIiAsIHByZXZpZXdGdWxsSCApXG4gICAgICAvL2VkaXRvciBoZWlnaHRcbiAgICAgIGNvbnN0IGVkaXRvckZ1bGxIID0gdGhpcy5jb2RlSmFyQ29udGFpbmVyLmN1cnJlbnQuc2Nyb2xsSGVpZ2h0O1xuICAgICAgY29uc3QgZWRpdG9yU2Nyb2xsZWQgPSB0aGlzLmNvZGVKYXJDb250YWluZXIuY3VycmVudC5zY3JvbGxUb3A7XG5cbiAgICAgIGNvbnN0IGVsZW1lbnRIZWlnaHQgPSB0aGlzLnByZXZpZXdDb250YWluZXIuY3VycmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG4gICAgICAvL2lmIG9uZSBvZiB0aGVtIGNhbiBub3Qgc2Nyb2xsLCBkbyBub3RoaW5nXG4gICAgICBpZihwcmV2aWV3RnVsbEg8PWVsZW1lbnRIZWlnaHQgfHwgZWRpdG9yRnVsbEg8PWVsZW1lbnRIZWlnaHQgKXsgcmV0dXJuIH1cblxuICAgICAgY29uc3QgZWRpdG9yUmF0aW8gPSBlZGl0b3JTY3JvbGxlZC8oIGVkaXRvckZ1bGxIIC0gZWxlbWVudEhlaWdodCApO1xuXG5cbiAgICAgIGNvbnN0IHNjcm9sbFByZXZpZXdUbyA9ICBNYXRoLnJvdW5kKCAoIHByZXZpZXdGdWxsSC1lbGVtZW50SGVpZ2h0ICkgKiBlZGl0b3JSYXRpbyApO1xuICAgICAgLy8gY29uc29sZS5sb2coXCJzY3JvbGxpbmcgdG9cIiAsIHNjcm9sbFByZXZpZXdUbyApXG4gICAgICB0aGlzLnByZXZpZXdGcmFtZS5jdXJyZW50LmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvKFxuICAgICAgICB7dG9wOiBzY3JvbGxQcmV2aWV3VG8gLCBcbiAgICAgICAgICBsZWZ0OjAgLCBcbiAgICAgICAgICBiZWhhdmlvcjogXCJzbW9vdGhcIn1cbiAgICAgICk7XG4gICAgfVxuICAgIGRvU2Nyb2xsKClcblxuICAgIHdpbmRvdy5zZXRUaW1lb3V0KCAoKT0+eyB0aGlzLnNjcm9sbFRocm90dGxlZD1mYWxzZSA7IGRvU2Nyb2xsKCkgfSAsIDUwICk7XG5cbiAgfVxuICBcblxuICB0b2dnbGVTcGVsbGNoZWNrKCl7XG5cbiAgICB0aGlzLmphci51cGRhdGVPcHRpb25zKHtzcGVsbGNoZWNrOiAhdGhpcy5zdGF0ZS5zcGVsbENoZWNrfSk7XG4gICAgdGhpcy5jb2RlSmFyQ29udGFpbmVyLmN1cnJlbnQuc3BlbGxjaGVjayA9ICF0aGlzLnN0YXRlLnNwZWxsQ2hlY2s7XG4gICAgdGhpcy5zZXRTdGF0ZSh7c3BlbGxDaGVjazogIXRoaXMuc3RhdGUuc3BlbGxDaGVja30pXG4gIH1cblxuICB0b2dnbGVGdWxsc2NyZWVuKCl7XG4gICAgLy8gY29uc29sZS5sb2coXCJUb2dnbGUgZnVsbHNjcmVlblwiKTtcbiAgICBjb25zdCBzeW5jRkYgPSAoKT0+e1xuICAgICAgLy8gY29uc29sZS5sb2coXCJ3ZSBjaGFuZ2UgZnMgbW9kZSEhMVwiKVxuICAgICAgaWYoICFkb2N1bWVudC5mdWxsc2NyZWVuRWxlbWVudCAmJiB0aGlzLnN0YXRlLmZ1bGxzY3JlZW4gKVxuICAgIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZnVsbHNjcmVlbjogZmFsc2V9KSBcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgdiA9ICF0aGlzLnN0YXRlLmZ1bGxzY3JlZW47XG4gICAgaWYodil7XG4gICAgICB0eXBlb2YgdGhpcy5wcm9wcy5vbkVudGVyRnVsbHNjcmVlbiA9PT0gJ2Z1bmN0aW9uJyAmJiB0aGlzLnByb3BzLm9uRW50ZXJGdWxsc2NyZWVuKCk7XG4gICAgICB0aGlzLmNvbXBvbmVudENvbnRhaW5lci5jdXJyZW50LnN0eWxlLnpJbmRleCA9IHRoaXMucHJvcHMuZnVsbHNjcmVlblpJbmRleCBcbiAgICAgIGlmKHRoaXMucHJvcHMudHJ1ZUZ1bGxzY3JlZW4gJiYgZG9jdW1lbnQuZnVsbHNjcmVlbkVuYWJsZWQpe1xuICAgICAgICB0aGlzLmNvbXBvbmVudENvbnRhaW5lci5jdXJyZW50LnJlcXVlc3RGdWxsc2NyZWVuKCkgXG4gICAgICAgIHRoaXMuY29tcG9uZW50Q29udGFpbmVyLmN1cnJlbnQuYWRkRXZlbnRMaXN0ZW5lcihcImZ1bGxzY3JlZW5jaGFuZ2VcIiAsIHN5bmNGRilcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZXsgXG4gICAgICB0eXBlb2YgdGhpcy5wcm9wcy5vbkV4aXRGdWxsc2NyZWVuID09PSAnZnVuY3Rpb24nICYmIHRoaXMucHJvcHMub25FeGl0RnVsbHNjcmVlbigpO1xuICAgICAgdGhpcy5jb21wb25lbnRDb250YWluZXIuY3VycmVudC5zdHlsZS56SW5kZXggPSBcInVuc2V0XCJcbiAgICAgIGlmKHRoaXMucHJvcHMudHJ1ZUZ1bGxzY3JlZW4gJiYgZG9jdW1lbnQuZnVsbHNjcmVlbkVuYWJsZWQpeyBkb2N1bWVudC5leGl0RnVsbHNjcmVlbigpfVxuICAgICAgdGhpcy5jb21wb25lbnRDb250YWluZXIuY3VycmVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiZnVsbHNjcmVlbmNoYW5nZVwiICwgc3luY0ZGKVxuICAgIH1cbiAgICB0cnkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7ZnVsbHNjcmVlbjogdn0pO1xuICAgIH1jYXRjaChlKXtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBmb3VuZCFcIiAsIGUpO1xuICAgIH1cbiAgICAvLyB0aGlzLmRvUHJldmlldygpO1xuICB9XG4gIHRvZ2dsZVByZXZpZXcoKXtcbiAgICAgXG4gICAgIGNvbnN0IHYgPSAhdGhpcy5zdGF0ZS5zaG93UHJldmlldztcbiAgICAgY29uc3QgbnMgPSB7c2hvd1ByZXZpZXc6IHZ9XG5cbiAgICAgaWYodGhpcy5zdGF0ZS5mdWxsUHJldmlldyl7XG4gICAgICAgdGhpcy5zZXRTdGF0ZSh7ZnVsbFByZXZpZXc6IGZhbHNlfSk7XG4gICAgICAgcmV0dXJuO1xuICAgICB9XG4gICAgIHRoaXMuc2V0U3RhdGUobnMpO1xuICB9XG4gIHRvZ2dsZUZ1bGxQcmV2aWV3KCl7XG4gICAgXG4gICAgaWYoIHR5cGVvZiB0aGlzLnByb3BzLmV4dGVybmFsUHJldmlldyA9PSAnZnVuY3Rpb24nICl7IFxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5leHRlcm5hbFByZXZpZXcoKTtcbiAgICB9IFxuICAgICBjb25zdCB2ID0gIXRoaXMuc3RhdGUuZnVsbFByZXZpZXc7XG4gICAgIHRoaXMuc2V0U3RhdGUoe2Z1bGxQcmV2aWV3OiB2fSk7IFxuICB9XG4gIHRvZ2dsZVN5bmNTY3JvbGwoKXtcbiAgICAgXG4gICAgIGNvbnN0IHYgPSAhdGhpcy5zdGF0ZS5zeW5jU2Nyb2xsO1xuICAgICBjb25zdCBucyA9IHtzeW5jU2Nyb2xsOiB2fVxuICAgICB0aGlzLnNldFN0YXRlKG5zKTtcbiAgfVxuICBzYXZlRmlsZSgpe1xuICAgIGlmKHRoaXMuc2F2ZVRocm90dGxlZCl7IHJldHVybiB9XG4gICAgaWYoIHR5cGVvZiB0aGlzLnByb3BzLnNhdmU9PT0nZnVuY3Rpb24nICl7XG4gICAgICB0aGlzLnByb3BzLnNhdmUodGhpcy5qYXIudG9TdHJpbmcoKSkgXG4gICAgICB0aGlzLnNhdmVUaHJvdHRsZWQgPSB0cnVlO1xuICAgICAgd2luZG93LnNldFRpbWVvdXQoKCk9PnsgdGhpcy5zYXZlVGhyb3R0bGVkPWZhbHNlIH0gLCAyMDApO1xuICAgIH07XG5cbiAgfVxuXG4gIC8vIHBhY2tQcmV2aWV3RnJhbWUoKXtcbiAgLy8gICAgICAgY29uc3QgZnJhbWVEb2MgPSB0aGlzLnByZXZpZXdGcmFtZS5jdXJyZW50LmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XG4gIC8vICAgICAgICAgY29uc3QgZEhlaWdodCA9IE1hdGgubWF4KCAvL25lZWQgbW9yZSB0ZXN0cyBpbiBDaHJvbWVcbiAgLy8gICAgICAgICAgIGZyYW1lRG9jLmJvZHkuc2Nyb2xsSGVpZ2h0LCAvLyNCVUdHWVxuICAvLyAgICAgICAgICAgZnJhbWVEb2MuZG9jdW1lbnRFbGVtZW50LnNjcm9sbEhlaWdodCxcbiAgLy8gICAgICAgICAgIGZyYW1lRG9jLmRvY3VtZW50RWxlbWVudC5vZmZzZXRIZWlnaHQsXG4gIC8vICAgICAgICAgKVxuICAvLyAgICAgICAgIC8vIHRoaXMucHJldmlld0ZyYW1lLmN1cnJlbnQuc3R5bGUuaGVpZ2h0ID0gZEhlaWdodCtcInB4XCI7XG4gIC8vIH1cblxuICByZWZyZXNoUHJldmlldygpe1xuICAgICB0aGlzLnByZXZpZXdGcmFtZS5jdXJyZW50LmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQuYm9keS5pbm5lckhUTUwgPSBcIlwiO1xuICAgICB0aGlzLmRvUHJldmlldyh0cnVlKTtcbiAgfVxuXG4gIGFzeW5jIGRvUHJldmlldyhmb3JjZSl7XG4gICAgLy9pZiBwcmV2aWV3IGlzIGhpZGRlbiBhbmQgd2UgZG8gbm90IGZvcmNlZCB0byB1cGRhdGUgaXQsIHJldHVyblxuICAgIGlmKCF0aGlzLnN0YXRlLnNob3dQcmV2aWV3JiYhZm9yY2UpeyAgcmV0dXJuIH1cbiAgICBpZih0aGlzLnN0YXRlLnByZXZpZXdJblByb2Nlc3MpeyAgcmV0dXJuIH0gLy9mb3JjZSBoYXMgbm8gc2Vuc2VcbiAgICBpZighdGhpcy5wcmV2aWV3RnJhbWUuY3VycmVudCl7IGNvbnNvbGUubG9nKFwibm8gaWZyYW1lXCIpIH1cblxuICAgIGNvbnN0IHJlZHJhdyA9ICgpPT57XG4gICAgICB0aGlzLnByZXZpZXdJblByb2Nlc3MgPSB0cnVlOyBcbiAgICAgICBpZighdGhpcy5wcmV2aWV3RnJhbWUuY3VycmVudC5jb250ZW50V2luZG93KXsgcmV0dXJuIH0gXG4gICAgICBsZXQgY29udGVudDsgXG4gICAgICBsZXQgY29udGVudFdpbmRvdyA9dGhpcy5wcmV2aWV3RnJhbWUuY3VycmVudC5jb250ZW50V2luZG93O1xuICAgICAgXG4gICAgICBpZihcbiAgICAgIGNvbnRlbnRXaW5kb3cuZG9jdW1lbnQuYm9keSAmJiBcbiAgICAgIGNvbnRlbnRXaW5kb3cuZG9jdW1lbnQuYm9keS5pbm5lckhUTUwgJiYgXG4gICAgICB0eXBlb2YgdGhpcy5wcm9wcy5yZW5kZXJCb2R5PT09J2Z1bmN0aW9uJyl7XG5cbiAgICAgICAgIGNvbnRlbnQgPSB0aGlzLnByb3BzLnJlbmRlckJvZHkoIHRoaXMuamFyLnRvU3RyaW5nKCkgKSA7XG4gICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGNvbnRlbnQpXG4gICAgICAgICAudGhlbihyPT4geyBcbiAgICAgICAgICAgIGNvbnRlbnRXaW5kb3cuZG9jdW1lbnQuYm9keS5pbm5lckhUTUw9IHIgO1xuICAgICAgICAgICAgLy8gdGhpcy5wYWNrUHJldmlld0ZyYW1lKCk7XG4gICAgICAgICAgICB0aGlzLnN5bmNQcmV2aWV3U2Nyb2xsKCk7XG4gICAgICAgICAgICB0aGlzLnByZXZpZXdJblByb2Nlc3M9ZmFsc2U7XG4gICAgICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgICBjb250ZW50ID0gIHRoaXMucHJvcHMucmVuZGVyKHRoaXMuamFyLnRvU3RyaW5nKCkpXG5cbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoY29udGVudClcbiAgICAgIC50aGVuKCByPT57XG4gICAgICAgIGNvbnN0IGZyYW1lRG9jID0gdGhpcy5wcmV2aWV3RnJhbWUuY3VycmVudC5jb250ZW50V2luZG93LmRvY3VtZW50O1xuICAgICAgICBmcmFtZURvYy5vcGVuKCk7XG4gICAgICAgIGZyYW1lRG9jLndyaXRlKHIpXG4gICAgICAgIGZyYW1lRG9jLmNsb3NlKCk7XG4gICAgICAgIGZyYW1lRG9jLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiICwgKGUpPT57ZS5zdG9wUHJvcGFnYXRpb24oKTtlLnByZXZlbnREZWZhdWx0KCl9ICwgdHJ1ZSk7XG5cbiAgICAgICAgICAgIGZyYW1lRG9jLmhlYWQuaW5uZXJIVE1MICs9IGlmcmFtZVNjcm9sbGJhcnM7IFxuXG4gICAgICAgIC8vIGlmKHR5cGVvZiB0aGlzLnByb3BzLmltYWdlUmV3cml0ZXI9PT0nZnVuY3Rpb24nKXtcbiAgICAgICAgLy8gICBjb25zdCBpbWdzID0gZnJhbWVEb2MucXVlcnlTZWxlY3RvckFsbChcIipbc3JjXVwiKTtcbiAgICAgICAgLy8gICBpbWdzLmZvckVhY2goaT0+e1xuICAgICAgICAvLyAgICAgaWYoaS5nZXRBdHRyaWJ1dGUoXCJzcmNcIikubWF0Y2goL15odHRwKHMpPzovKSl7XG4gICAgICAgIC8vICAgICAgIHJldHVybjtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gICAgIGkuc3JjID0gdGhpcy5wcm9wcy5pbWFnZVJld3JpdGVyKGkuZ2V0QXR0cmlidXRlKCBcInNyY1wiICkpO1xuICAgICAgICAvLyAgIH0pXG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gY29uc29sZS5sb2coZnJhbWVEb2MsIGZyYW1lRG9jLmJvZHkpXG4gICAgICAgIGZyYW1lRG9jLmFkZEV2ZW50TGlzdGVuZXIoIFwiRE9NQ29udGVudExvYWRlZFwiICwgKCk9PntcbiAgICAgICAgICBpZighZnJhbWVEb2MuYm9keSl7cmV0dXJufSAvL3RvbyBsYXRlIHRvIGNhbGMsIGRyb3AgaXRcbiAgICAgICAgICAvLyB0aGlzLnBhY2tQcmV2aWV3RnJhbWUoKTtcbiAgICAgICAgICB0aGlzLnN5bmNQcmV2aWV3U2Nyb2xsKCk7XG4gICAgICAgICAgdGhpcy5wcmV2aWV3SW5Qcm9jZXNzPWZhbHNlO1xuICAgICAgICAgIC8vIHRoaXMucHJldmlld0luUHJvY2VzcyA9IGZhbHNlO1xuICAgICAgICB9IClcbiAgICAgICAgfVxuICAgICAgKS8vLmZpbmFsbHkoICgpPT50aGlzLnByZXZpZXdJblByb2Nlc3M9ZmFsc2UgKVxuICAgIH1cblxuICAgIGlmKCF0aGlzLnByZXZpZXdUaHJvdHRsZWQpe1xuICAgICAgdGhpcy5wcmV2aWV3VGhyb3R0bGVkID0gdHJ1ZTtcbiAgICAgIGF3YWl0IHJlZHJhdygpO1xuICAgICAgd2luZG93LnNldFRpbWVvdXQoKCk9PnsgdGhpcy5wcmV2aWV3VGhyb3R0bGVkPWZhbHNlOyAhdGhpcy5wcmV2aWV3SW5Qcm9jZXNzICYmIHJlZHJhdygpfSAsIDMwMCk7XG5cbiAgICB9XG4gIH1cblxuICByZW5kZXIoKXtcbiAgICAgLy8gZml4IGN1cnNvciBwb3NpdGlvbiBvbiByZW5kZXJcbiAgICAgLy8gaWYgcG9zIHdhcyBzYXZlZCBvbiB1cGRhdGVcbiAgICAgaWYodGhpcy5wb3MgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudD09PXRoaXMuY29kZUphckNvbnRhaW5lci5jdXJyZW50KVxuICAgICB7XG4gICAgICAgdGhpcy5qYXIucmVzdG9yZSh0aGlzLnBvcyk7XG4gICAgICAgdGhpcy5wb3MgPSBudWxsO1xuICAgICB9XG5cbiAgICAvLyBidXR0b25zOlxuICAgIC8vIHRvZ2dsZSBwcmV2aWV3ICwgdG9nZ2xlIGZ1bGxzY3JlZW4gLCA8cHJldmlldyBvbmx5Pz4gLCBzYXZlXG5cbiAgICByZXR1cm4gaHRtbGA8ZGl2IGNsYXNzPVwiQmFyZU1ERSBcbiAgICAgICAkeyB0aGlzLnN0YXRlLmZ1bGxzY3JlZW4gJiYgJ2Z1bGxzY3JlZW4nIH1cbiAgICAgICAkeyB0aGlzLnN0YXRlLnNob3dQcmV2aWV3ICYmICdzaG93UHJldmlldycgfVxuICAgICAgICR7IHRoaXMuc3RhdGUuZnVsbFByZXZpZXcgJiYgJ2Z1bGxQcmV2aWV3JyB9XG4gICAgICAgXCJcbiAgICAgICByZWY9JHt0aGlzLmNvbXBvbmVudENvbnRhaW5lcn1cbiAgICAgICBzdHlsZT1cIm1heC1oZWlnaHQ6JHsgdGhpcy5zdGF0ZS5mdWxsc2NyZWVuID8gJzEwMCUnIDogdGhpcy5wcm9wcy5tYXhIZWlnaHR9O3otaW5kZXg6JHsgdGhpcy5zdGF0ZS5mdWxsc2NyZWVuID8gdGhpcy5wcm9wcy5mdWxsc2NyZWVuWkluZGV4IDogXCJpbml0aWFsXCIgfVwiXG4gICAgPlxuICAgICAgPGRpdiBjbGFzcz1cInRvb2xiYXIgdG9wIFxuICAgICAgICR7IHRoaXMuc3RhdGUuZnVsbHNjcmVlbiA/ICdmdWxsc2NyZWVuJyA6ICd3aW5kb3dlZCcgfVxuICAgICAgXCI+XG4gICAgICAgICA8JHtNZW51fSBcbiAgICAgICAgIHRpdGxlPSR7dGhpcy5wcm9wcy5tZW51VGl0bGUgfHwgXCJBZGRpdGlvbmFsIGZ1bmN0aW9uc1wifVxuICAgICAgICAgekluZGV4PSR7dGhpcy5zdGF0ZS5mdWxsc2NyZWVuID8gdGhpcy5wcm9wcy5mdWxsc2NyZWVuWkluZGV4KzEwMCA6IFwiaW5pdGlhbFwifVxuICAgICAgICAgaXRlbXM9JHt0aGlzLnByb3BzLm1lbnVJdGVtc31cbiAgICAgICAgIC8+XG4gICAgICAgICA8ZGl2IGNsYXNzPVwiYm1kZV9icmFuZGluZ1wiIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPSR7e19faHRtbDp0aGlzLnByb3BzLmJyYW5kaW5nfX0vPlxuICAgICAgICAgPCR7VEJ1dHRvbn1cbiAgICAgICAgIGlzT249JHt0cnVlfVxuICAgICAgICAgY3VzdG9tQ2xhc3M9XCJmb3JtYXR0aW5nXCJcbiAgICAgICAgIHN2Zz0ke0ljb25Cb2xkfVxuICAgICAgICAgdGl0bGU9JHsgXCJCb2xkIFwiICsgbW9kU3ltYm9sICsgIFwiK0JcIn1cbiAgICAgICAgIG9uQ2xpY2s9JHsoKT0+dGhpcy5maXJlQ29tbWFuZChcImJvbGRcIil9XG4gICAgICAgICAvPlxuICAgICAgICAgPCR7VEJ1dHRvbn1cbiAgICAgICAgIGN1c3RvbUNsYXNzPVwiZm9ybWF0dGluZ1wiXG4gICAgICAgICBpc09uPSR7dHJ1ZX1cbiAgICAgICAgIHN2Zz0ke0ljb25JdGFsaWN9XG4gICAgICAgICB0aXRsZT0keyBcIkl0YWxpYyBcIiArIG1vZFN5bWJvbCArIFwiK0lcIiAgIH1cbiAgICAgICAgIG9uQ2xpY2s9JHsoKT0+dGhpcy5maXJlQ29tbWFuZChcIml0YWxpY1wiKX1cbiAgICAgICAgIC8+XG4gICAgICAgICA8JHtUQnV0dG9ufVxuICAgICAgICAgY3VzdG9tQ2xhc3M9XCJmb3JtYXR0aW5nXCJcbiAgICAgICAgIGlzT249JHt0cnVlfVxuICAgICAgICAgc3ZnPSR7SWNvblN0cmlrZX1cbiAgICAgICAgIHRpdGxlPSR7IFwiU3RyaWtldGhyb3VnaCBcIiArIG1vZFN5bWJvbCArIFwiK0RcIiAgIH1cbiAgICAgICAgIG9uQ2xpY2s9JHsoKT0+dGhpcy5maXJlQ29tbWFuZChcInN0cmlrZVwiKX1cbiAgICAgICAgIC8+XG4gICAgICAgICA8JHtUQnV0dG9ufVxuICAgICAgICAgY3VzdG9tQ2xhc3M9XCJmb3JtYXR0aW5nXCJcbiAgICAgICAgIGlzT249JHt0cnVlfVxuICAgICAgICAgc3ZnPSR7SWNvbkxpbmt9XG4gICAgICAgICB0aXRsZT0keyBcIkxpbmsgXCIgKyBtb2RTeW1ib2wgKyBcIitMXCIgICB9XG4gICAgICAgICBvbkNsaWNrPSR7KCk9PnRoaXMuZmlyZUNvbW1hbmQoXCJsaW5rXCIpfVxuICAgICAgICAgLz5cbiAgICAgICAgIDxkaXYgY2xhc3M9XCJkaXZpZGVyXCIgLz5cbiAgICAgICAgIDwke1RCdXR0b259IFxuICAgICAgICAgaXNPbj0ke3RoaXMuc3RhdGUuc2hvd1ByZXZpZXd9XG4gICAgICAgICBzdmc9JHtJY29uU2hvd1ByZXZpZXd9XG4gICAgICAgICB0aXRsZT1cIlRvZ2dsZSBQcmV2aWV3XCIgXG4gICAgICAgICBvbkNsaWNrPSR7dGhpcy50b2dnbGVQcmV2aWV3fSBcbiAgICAgICAgIC8+XG4gICAgICAgICA8JHtUQnV0dG9ufVxuICAgICAgICAgaXNPbj0ke3RoaXMuc3RhdGUuZnVsbFByZXZpZXd9XG4gICAgICAgICBzdmc9JHtJY29uRlByZXZpZXd9XG4gICAgICAgICBzdmdPZmY9JHtJY29uRlByZXZpZXdPZmZ9XG4gICAgICAgICB0aXRsZT0ke3RoaXMucHJvcHMuZXh0ZXJuYWxQcmV2aWV3VGl0bGUgfHwgXCJGdWxsIHdpZHRoIHByZXZpZXdcIn0gXG4gICAgICAgICBvbkNsaWNrPSR7dGhpcy50b2dnbGVGdWxsUHJldmlld31cbiAgICAgICAgIC8+XG4gICAgICAgIDwke1RCdXR0b259XG4gICAgICAgIGlzT249JHsgdGhpcy5zdGF0ZS5mdWxsc2NyZWVuIH1cbiAgICAgICAgc3ZnPSR7SWNvbkZTY3JlZW59XG4gICAgICAgIHN2Z09mZj0ke0ljb25GU2NyZWVuT2ZmfVxuICAgICAgICB0aXRsZT0ke3RoaXMuc3RhdGUuZnVsbHNjcmVlbiA/IFwiRXhpdCBmdWxsc2NyZWVuXCIgOiBcIkdvIGZ1bGxzY3JlZW5cIn1cbiAgICAgICAgb25DbGljaz0ke3RoaXMudG9nZ2xlRnVsbHNjcmVlbn1cbiAgICAgICAgLz5cbiAgICAgICAgPCR7VEJ1dHRvbn1cbiAgICAgICAgaXNPbj0keyB0aGlzLnN0YXRlLnNwZWxsQ2hlY2sgfVxuICAgICAgICBzdmc9JHtJY29uU3BlbGx9XG4gICAgICAgIHN2Z09mZj0ke0ljb25TcGVsbE9mZn1cbiAgICAgICAgdGl0bGU9JHt0aGlzLnN0YXRlLnNwZWxsQ2hlY2sgPyBcIlR1cm4gc3BlbGxjaGVrIG9mZlwiIDogXCJUdXJuIHNwZWxsY2hlY2sgb25cIn1cbiAgICAgICAgb25DbGljaz0ke3RoaXMudG9nZ2xlU3BlbGxjaGVja31cbiAgICAgICAgLz5cbiAgICAgICAgPCR7VEJ1dHRvbn1cbiAgICAgICAgaXNPbj0keyB0aGlzLnN0YXRlLnN5bmNTY3JvbGwgfVxuICAgICAgICBzdmc9JHtJY29uU1Njcm9sbH1cbiAgICAgICAgc3ZnT2ZmPSR7SWNvblNTY3JvbGxPZmZ9XG4gICAgICAgIHRpdGxlPSR7dGhpcy5zdGF0ZS5zeW5jU2Nyb2xsID8gXCJUdXJuIHNjcm9sbCBzeW5jIG9mZlwiIDogXCJUdXJuIHNjcm9sbCBzeW5jIG9uXCJ9XG4gICAgICAgIG9uQ2xpY2s9JHt0aGlzLnRvZ2dsZVN5bmNTY3JvbGx9XG4gICAgICAgIC8+XG4gICAgICAgIDwke1RCdXR0b259XG4gICAgICAgIHN2Zz0ke0ljb25TYXZlfVxuICAgICAgICB0aXRsZT0keyBcIlNhdmUgaHRtbCBmaWxlXCIgfVxuICAgICAgICBvbkNsaWNrPSR7dGhpcy5zYXZlRmlsZX1cbiAgICAgICAgY3VzdG9tQ2xhc3M9JHsgdGhpcy5wcm9wcy5tb2RpZmllZCA/IFwiYWxlcnRlZFwiIDogXCJcIiB9XG4gICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICAgPGRpdiBjbGFzcz1cIndvcmtBcmVhXCI+XG4gICAgICAgICA8ZGl2ICBcbiAgICAgICAgICAgICAgY2xhc3M9XCJjb2RlSmFyIGxhbmd1YWdlLW1kXCIgXG4gICAgICAgICAgICAgIHJlZj0ke3RoaXMuY29kZUphckNvbnRhaW5lcn0gXG4gICAgICAgICAgICAgIG9uc2Nyb2xsPSR7KCk9PnRoaXMuc3luY1ByZXZpZXdTY3JvbGwoKX0+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IFxuICAgICAgICAgICAgICBjbGFzcz1cInByZXZpZXcgJHt0aGlzLnByb3BzLnByZXZpZXdDbGFzc31cIiBcbiAgICAgICAgICAgICAgcmVmPSR7dGhpcy5wcmV2aWV3Q29udGFpbmVyfT5cbiAgICAgICAgICAgICAgPGlmcmFtZSBzdHlsZT1cIm1pbi1oZWlnaHQ6MTAwJVwiIHJlZj0ke3RoaXMucHJldmlld0ZyYW1lfT48L2lmcmFtZT5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5gXG4gIH1cbn1cblxuXG5CYXJlTURFLmRlZmF1bHRQcm9wcyA9IHtcbiAgIHJlbmRlcjogKG0pPT5gPGh0bWw+PGhlYWQ+PC9oZWFkPjxib2R5PjxkaXYgc3R5bGU9J2NvbG9yOm5hdnlibHVlJz4ke219PC9kaXY+PC9ib2R5PjwvaHRtbD5gLFxuICAgcmVuZGVyQm9keTogbnVsbCxcbiAgIG9uVXBkYXRlOiAoKT0+Y29uc29sZS5sb2coXCJFZGl0b3IgdXBkYXRlZFwiICksXG4gICBzYXZlOiAoYyk9PmNvbnNvbGUubG9nKFwiRHVtbXkgc2F2ZSBmdW5jdGlvblwiICwgYy5zdWJzdHJpbmcoMCwyMDApK1wiLi4uXCIpLFxuICAgY29udGVudDogXCJ3cml0ZSBoZXJlXCIsIC8vdGV4dCB0byBkaXNwbGF5IG9uIG1vdW50XG4gICBjb250ZW50SWQ6IG51bGwsIC8vaWQgb2YgY29udGVudCB0byB0cmFjayB0aGUgY2hhbmdlc1xuICAgbW9kaWZpZWQ6IGZhbHNlLFxuICAgaW5kaWNhdGVDaGFuZ2VzOiB0cnVlLFxuICAgcHJldmlld0NsYXNzOiBcIm1hcmtkb3duUHJldmlld0FyZWFcIixcbiAgIGZ1bGxzY3JlZW46IGZhbHNlLFxuICAgb25FbnRlckZ1bGxzY3JlZW46ICgpPT5kb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93PVwiaGlkZGVuXCIsXG4gICBvbkV4aXRGdWxsc2NyZWVuOiAoKT0+ZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdz1cImluaXRpYWxcIixcbiAgIHRydWVGdWxsc2NyZWVuOiBmYWxzZSxcbiAgIHNob3dQcmV2aWV3OiB0cnVlLFxuICAgc3BlbGxDaGVjazogdHJ1ZSxcbiAgIGZ1bGxzY3JlZW5aSW5kZXg6IDEwMDEsXG4gICBleHRlcm5hbFByZXZpZXc6IG51bGwsXG4gICBleHRlcm5hbFByZXZpZXdUaXRsZTogbnVsbCxcbiAgIGltYWdlUmV3cml0ZXI6IG51bGwsXG4gICBtYXhIZWlnaHQ6ICc0MDBweCcsXG4gICBicmFuZGluZzogVkVSU0lPTixcbiAgIGNvbnRyb2xzOiBudWxsLFxuICAgLy9kaXNhYmxlOiBbXSAvL1doYXQgdGhlIGhlbGwgaXMgdGhhdD9cblxufVxuIl0sIm5hbWVzIjpbIkNvbXBvbmVudCIsIklmIiwiY29uc3RydWN0b3IiLCJwcm9wcyIsInJlbmRlciIsImNvbmRpdGlvbiIsImNoaWxkcmVuIiwiaCIsImh0bWwiLCJzdmdNIiwiTWVudSIsInN0YXRlIiwib3BlbiIsImhhbmRsZUl0ZW0iLCJiaW5kIiwiZG9DbG9zZSIsImkiLCJpdGVtcyIsImhhbmRsZXIiLCJzZXRTdGF0ZSIsImNvbXBvbmVudERpZFVwZGF0ZSIsInByZXZpb3VzUHJvcHMiLCJwcmV2aW91c1N0YXRlIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJsZW5ndGgiLCJteSIsImRhbmdlcm91c2x5U2V0SW5uZXJIVE1MIiwiX19odG1sIiwidGl0bGUiLCJvbkNsaWNrIiwiZSIsInN0b3BQcm9wYWdhdGlvbiIsInByZXZlbnREZWZhdWx0Iiwic3R5bGUiLCJ6SW5kZXgiLCJtYXAiLCJvbk1vdXNlRG93biIsImxhYmVsIiwiZGVmYXVsdFByb3BzIiwiVEJ1dHRvbiIsInN2ZyIsInN2Z09mZiIsImlzT24iLCJjdXN0b21DbGFzcyIsIndpZHRoIiwiaGVpZ2h0IiwiZGlzcGxheSIsImJveFNpemluZyIsInBhZGRpbmciLCJ1c2VyU2VsZWN0IiwiYm9yZGVyV2lkdGgiLCJjb25zb2xlIiwibG9nIiwiX3NlbGYiLCJXb3JrZXJHbG9iYWxTY29wZSIsInNlbGYiLCJQcmlzbSIsImxhbmciLCJ1bmlxdWVJZCIsInBsYWluVGV4dEdyYW1tYXIiLCJfIiwibWFudWFsIiwiZGlzYWJsZVdvcmtlck1lc3NhZ2VIYW5kbGVyIiwidXRpbCIsImVuY29kZSIsInRva2VucyIsIlRva2VuIiwidHlwZSIsImNvbnRlbnQiLCJhbGlhcyIsIkFycmF5IiwiaXNBcnJheSIsInJlcGxhY2UiLCJvIiwiT2JqZWN0IiwicHJvdG90eXBlIiwidG9TdHJpbmciLCJjYWxsIiwic2xpY2UiLCJvYmpJZCIsIm9iaiIsImRlZmluZVByb3BlcnR5IiwidmFsdWUiLCJjbG9uZSIsImRlZXBDbG9uZSIsInZpc2l0ZWQiLCJpZCIsImtleSIsImhhc093blByb3BlcnR5IiwiZm9yRWFjaCIsInYiLCJnZXRMYW5ndWFnZSIsImVsZW1lbnQiLCJtIiwiZXhlYyIsImNsYXNzTmFtZSIsInRvTG93ZXJDYXNlIiwicGFyZW50RWxlbWVudCIsInNldExhbmd1YWdlIiwibGFuZ3VhZ2UiLCJSZWdFeHAiLCJjbGFzc0xpc3QiLCJhZGQiLCJjdXJyZW50U2NyaXB0IiwiZG9jdW1lbnQiLCJFcnJvciIsImVyciIsInNyYyIsInN0YWNrIiwic2NyaXB0cyIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiaXNBY3RpdmUiLCJkZWZhdWx0QWN0aXZhdGlvbiIsIm5vIiwiY29udGFpbnMiLCJsYW5ndWFnZXMiLCJwbGFpbiIsInBsYWludGV4dCIsInRleHQiLCJ0eHQiLCJleHRlbmQiLCJyZWRlZiIsImluc2VydEJlZm9yZSIsImluc2lkZSIsImJlZm9yZSIsImluc2VydCIsInJvb3QiLCJncmFtbWFyIiwicmV0IiwidG9rZW4iLCJuZXdUb2tlbiIsIm9sZCIsIkRGUyIsImNhbGxiYWNrIiwicHJvcGVydHkiLCJwcm9wZXJ0eVR5cGUiLCJwbHVnaW5zIiwiaGlnaGxpZ2h0QWxsIiwiYXN5bmMiLCJoaWdobGlnaHRBbGxVbmRlciIsImNvbnRhaW5lciIsImVudiIsInNlbGVjdG9yIiwiaG9va3MiLCJydW4iLCJlbGVtZW50cyIsImFwcGx5IiwicXVlcnlTZWxlY3RvckFsbCIsImhpZ2hsaWdodEVsZW1lbnQiLCJwYXJlbnQiLCJub2RlTmFtZSIsImNvZGUiLCJ0ZXh0Q29udGVudCIsImluc2VydEhpZ2hsaWdodGVkQ29kZSIsImhpZ2hsaWdodGVkQ29kZSIsImlubmVySFRNTCIsImhhc0F0dHJpYnV0ZSIsInNldEF0dHJpYnV0ZSIsIldvcmtlciIsIndvcmtlciIsImZpbGVuYW1lIiwib25tZXNzYWdlIiwiZXZ0IiwiZGF0YSIsInBvc3RNZXNzYWdlIiwiSlNPTiIsInN0cmluZ2lmeSIsImltbWVkaWF0ZUNsb3NlIiwiaGlnaGxpZ2h0IiwidG9rZW5pemUiLCJyZXN0IiwidG9rZW5MaXN0IiwiTGlua2VkTGlzdCIsImFkZEFmdGVyIiwiaGVhZCIsIm1hdGNoR3JhbW1hciIsInRvQXJyYXkiLCJhbGwiLCJuYW1lIiwicHVzaCIsImNhbGxiYWNrcyIsIm1hdGNoZWRTdHIiLCJzIiwidGFnIiwiY2xhc3NlcyIsImF0dHJpYnV0ZXMiLCJhbGlhc2VzIiwiam9pbiIsIm1hdGNoUGF0dGVybiIsInBhdHRlcm4iLCJwb3MiLCJsb29rYmVoaW5kIiwibGFzdEluZGV4IiwibWF0Y2giLCJsb29rYmVoaW5kTGVuZ3RoIiwiaW5kZXgiLCJzdGFydE5vZGUiLCJzdGFydFBvcyIsInJlbWF0Y2giLCJwYXR0ZXJucyIsImoiLCJjYXVzZSIsInBhdHRlcm5PYmoiLCJncmVlZHkiLCJnbG9iYWwiLCJmbGFncyIsInNvdXJjZSIsImN1cnJlbnROb2RlIiwibmV4dCIsInRhaWwiLCJyZWFjaCIsInN0ciIsInJlbW92ZUNvdW50IiwiZnJvbSIsInRvIiwicCIsImsiLCJtYXRjaFN0ciIsImFmdGVyIiwicmVtb3ZlRnJvbSIsInByZXYiLCJyZW1vdmVSYW5nZSIsIndyYXBwZWQiLCJuZXN0ZWRSZW1hdGNoIiwibGlzdCIsIm5vZGUiLCJuZXdOb2RlIiwiY291bnQiLCJhcnJheSIsIm1lc3NhZ2UiLCJwYXJzZSIsImNsb3NlIiwic2NyaXB0IiwiaGlnaGxpZ2h0QXV0b21hdGljYWxseUNhbGxiYWNrIiwicmVhZHlTdGF0ZSIsImRlZmVyIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwic2V0VGltZW91dCIsIm1vZHVsZSIsImV4cG9ydHMiLCJtYXJrdXAiLCJhZGRJbmxpbmVkIiwidGFnTmFtZSIsImluY2x1ZGVkQ2RhdGFJbnNpZGUiLCJkZWYiLCJhdHRyTmFtZSIsIm1hdGhtbCIsInhtbCIsInNzbWwiLCJhdG9tIiwicnNzIiwiaW5uZXIiLCJjcmVhdGVJbmxpbmUiLCJ0YWJsZUNlbGwiLCJ0YWJsZVJvdyIsInRhYmxlTGluZSIsIm1hcmtkb3duIiwieWFtbCIsInB1bmN0dWF0aW9uIiwid2Fsa1Rva2VucyIsImwiLCJjb2RlTGFuZyIsImNvZGVCbG9jayIsImNscyIsImF1dG9sb2FkZXIiLCJEYXRlIiwidmFsdWVPZiIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImxvYWRMYW5ndWFnZXMiLCJlbGUiLCJnZXRFbGVtZW50QnlJZCIsInRhZ1BhdHRlcm4iLCJLTk9XTl9FTlRJVFlfTkFNRVMiLCJmcm9tQ29kZVBvaW50IiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwicGFyc2VJbnQiLCJOdW1iZXIiLCJrbm93biIsIm1kIiwiY3JlYXRlUmVmIiwiQ29kZUphciIsInJlcXVpcmUiLCJpZnJhbWVTY3JvbGxiYXJzIiwiSWNvblNob3dQcmV2aWV3IiwiSWNvbkZQcmV2aWV3IiwiSWNvbkZQcmV2aWV3T2ZmIiwiSWNvbkZTY3JlZW5PZmYiLCJJY29uRlNjcmVlbiIsIkljb25TcGVsbCIsIkljb25TcGVsbE9mZiIsIkljb25TU2Nyb2xsIiwiSWNvblNTY3JvbGxPZmYiLCJJY29uU2F2ZSIsIkljb25Cb2xkIiwiSWNvbkl0YWxpYyIsIkljb25MaW5rIiwiSWNvblN0cmlrZSIsImlzTWFjIiwibmF2aWdhdG9yIiwicGxhdGZvcm0iLCJ0b1VwcGVyQ2FzZSIsImluZGV4T2YiLCJtb2RTeW1ib2wiLCJCYXJlTURFIiwicHJldmlld1Rocm90dGxlZCIsInByZXZpZXdJblByb2Nlc3MiLCJzY3JvbGxUaHJvdHRsZWQiLCJzYXZlVGhyb3R0bGVkIiwiY29tcG9uZW50Q29udGFpbmVyIiwiY29kZUphckNvbnRhaW5lciIsInByZXZpZXdDb250YWluZXIiLCJwcmV2aWV3RnJhbWUiLCJmdWxsc2NyZWVuIiwic2hvd1ByZXZpZXciLCJmdWxsUHJldmlldyIsInNwZWxsQ2hlY2siLCJzeW5jU2Nyb2xsIiwibW9kaWZpZWQiLCJjdXJyZW50Q29udGVudCIsImNvbnRlbnRJZCIsInN1cnJvdW5kU2VsZWN0aW9uIiwiaGFuZGxlS2V5IiwidG9nZ2xlUHJldmlldyIsInRvZ2dsZUZ1bGxQcmV2aWV3IiwidG9nZ2xlRnVsbHNjcmVlbiIsInRvZ2dsZVNwZWxsY2hlY2siLCJ0b2dnbGVTeW5jU2Nyb2xsIiwiZG9QcmV2aWV3IiwicmVmcmVzaFByZXZpZXciLCJzYXZlRmlsZSIsIm9uQ29kZVVwZGF0ZSIsImVkaXRvckNvbW1hbmRzIiwiYm9sZCIsIml0YWxpYyIsInN0cmlrZSIsImxpbmsiLCJ1cmwiLCJwcm9tcHQiLCJjb250cm9scyIsInN5bmNQcmV2aWV3U2Nyb2xsIiwiaW1hZ2VSZXdyaXRlciIsImluZm8iLCJzaG91bGRDb21wb25lbnRVcGRhdGUiLCJqYXIiLCJzYXZlIiwib2xkUyIsIm9sZFAiLCJ1cGRhdGVDb2RlIiwicmVzdG9yZSIsImNvbXBvbmVudFdpbGxVbm1vdW50Iiwib25VcGRhdGUiLCJjb21wb25lbnREaWRNb3VudCIsImN1cnJlbnQiLCJwcmVzZXJ2ZUlkZW50Iiwic3BlbGxjaGVjayIsImZvY3VzIiwiZmlyZUNvbW1hbmQiLCJjb21tYW5kIiwidGVzdFdoYXQiLCJtZXRhS2V5IiwiY3RybEtleSIsImluc2VydEF0Iiwid2hhdCIsInN1YnN0cmluZyIsImdldFNlbGVjdGlvbiIsImlzQ29sbGFwc2VkIiwiZXJyb3IiLCJyIiwiZ2V0UmFuZ2VBdCIsImNvbW1vbkFuY2VzdG9yQ29udGFpbmVyIiwiZGlyIiwiZW5kIiwic3RhcnQiLCJzdGFydENvbnRhaW5lciIsInN0YXJ0T2YiLCJzdGFydE9mZnNldCIsImVuZENvbnRhaW5lciIsImVuZE9mIiwiZW5kT2Zmc2V0IiwiZm9yY2UiLCJkb1Njcm9sbCIsInByZXZpZXdGdWxsSCIsImNvbnRlbnRXaW5kb3ciLCJkb2N1bWVudEVsZW1lbnQiLCJzY3JvbGxIZWlnaHQiLCJlZGl0b3JGdWxsSCIsImVkaXRvclNjcm9sbGVkIiwic2Nyb2xsVG9wIiwiZWxlbWVudEhlaWdodCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImVkaXRvclJhdGlvIiwic2Nyb2xsUHJldmlld1RvIiwicm91bmQiLCJzY3JvbGxUbyIsInRvcCIsImxlZnQiLCJiZWhhdmlvciIsInVwZGF0ZU9wdGlvbnMiLCJzeW5jRkYiLCJmdWxsc2NyZWVuRWxlbWVudCIsIm9uRW50ZXJGdWxsc2NyZWVuIiwiZnVsbHNjcmVlblpJbmRleCIsInRydWVGdWxsc2NyZWVuIiwiZnVsbHNjcmVlbkVuYWJsZWQiLCJyZXF1ZXN0RnVsbHNjcmVlbiIsIm9uRXhpdEZ1bGxzY3JlZW4iLCJleGl0RnVsbHNjcmVlbiIsIm5zIiwiZXh0ZXJuYWxQcmV2aWV3IiwiYm9keSIsInJlZHJhdyIsInJlbmRlckJvZHkiLCJQcm9taXNlIiwicmVzb2x2ZSIsInRoZW4iLCJmcmFtZURvYyIsIndyaXRlIiwiYWN0aXZlRWxlbWVudCIsInJlZiIsIm1heEhlaWdodCIsIm1lbnVUaXRsZSIsIm1lbnVJdGVtcyIsImJyYW5kaW5nIiwiZXh0ZXJuYWxQcmV2aWV3VGl0bGUiLCJvbnNjcm9sbCIsInByZXZpZXdDbGFzcyIsImMiLCJpbmRpY2F0ZUNoYW5nZXMiLCJvdmVyZmxvdyIsIlZFUlNJT04iXSwic291cmNlUm9vdCI6IiJ9