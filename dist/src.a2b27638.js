// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }
  return bundleURL;
}
function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }
  return '/';
}
function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/styles.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

require("./styles.css");
var app = document.getElementById("app");
var calculator_box = document.createElement("div");
calculator_box.setAttribute("class", "calculator_box");
app.append(calculator_box);
var display_answer = document.createElement("div");
display_answer.setAttribute("class", "display_answer");
calculator_box.append(display_answer);
var answer = document.createElement("div");
answer.setAttribute("id", "answer");
answer.setAttribute("data-value", "0");
answer.innerHTML = "0";
display_answer.append(answer);
var row = document.createElement("div");
row.setAttribute("id", "row");
row.setAttribute("class", "calculator_row");
calculator_box.append(row);
var button11 = document.createElement("div");
button11.setAttribute("id", "button11");
button11.setAttribute("class", "input_button op-col");
button11.setAttribute("data-value", "AC");
button11.innerText = "AC";
row.append(button11);
var button12 = document.createElement("div");
button12.setAttribute("id", "button12");
button12.setAttribute("class", "input_button op-col");
button12.setAttribute("data-value", "X");
button12.innerText = "X";
row.append(button12);
var button13 = document.createElement("div");
button13.setAttribute("id", "button13");
button13.setAttribute("class", "input_button op-col");
button13.setAttribute("data-value", "%");
button13.innerText = "%";
row.append(button13);
var button14 = document.createElement("div");
button14.setAttribute("id", "button14");
button14.setAttribute("class", "input_button op-col");
button14.setAttribute("data-value", "/");
button14.innerText = "/";
row.append(button14);
var button21 = document.createElement("div");
button21.setAttribute("id", "button21");
button21.setAttribute("class", "input_button");
button21.setAttribute("data-value", "9");
button21.innerText = "9";
row.append(button21);
var button22 = document.createElement("div");
button22.setAttribute("id", "button22");
button22.setAttribute("class", "input_button");
button22.setAttribute("data-value", "8");
button22.innerText = "8";
row.append(button22);
var button23 = document.createElement("div");
button23.setAttribute("id", "button23");
button23.setAttribute("class", "input_button");
button23.setAttribute("data-value", "7");
button23.innerText = "7";
row.append(button23);
var button24 = document.createElement("div");
button24.setAttribute("id", "button24");
button24.setAttribute("class", "input_button op-col");
button24.setAttribute("data-value", "*");
button24.innerText = "*";
row.append(button24);
var button31 = document.createElement("div");
button31.setAttribute("id", "button31");
button31.setAttribute("class", "input_button");
button31.setAttribute("data-value", "6");
button31.innerText = "6";
row.append(button31);
var button32 = document.createElement("div");
button32.setAttribute("id", "button32");
button32.setAttribute("class", "input_button");
button32.setAttribute("data-value", "5");
button32.innerText = "5";
row.append(button32);
var button33 = document.createElement("div");
button33.setAttribute("id", "button33");
button33.setAttribute("class", "input_button");
button33.setAttribute("data-value", "4");
button33.innerText = "4";
row.append(button33);
var button34 = document.createElement("div");
button34.setAttribute("id", "button34");
button34.setAttribute("class", "input_button op-col");
button34.setAttribute("data-value", "-");
button34.innerText = "-";
row.append(button34);
var button41 = document.createElement("div");
button41.setAttribute("id", "button41");
button41.setAttribute("class", "input_button");
button41.setAttribute("data-value", "3");
button41.innerText = "3";
row.append(button41);
var button42 = document.createElement("div");
button42.setAttribute("id", "button42");
button42.setAttribute("class", "input_button");
button42.setAttribute("data-value", "2");
button42.innerText = "2";
row.append(button42);
var button43 = document.createElement("div");
button43.setAttribute("id", "button43");
button43.setAttribute("class", "input_button");
button43.setAttribute("data-value", "1");
button43.innerText = "1";
row.append(button43);
var button44 = document.createElement("div");
button44.setAttribute("id", "button44");
button44.setAttribute("class", "input_button op-col");
button44.setAttribute("data-value", "+");
button44.innerText = "+";
row.append(button44);
var button51 = document.createElement("div");
button51.setAttribute("id", "button51");
button51.setAttribute("class", "input_button double-col");
button51.setAttribute("data-value", "0");
button51.innerText = "0";
row.append(button51);
var button53 = document.createElement("div");
button53.setAttribute("id", "button53");
button53.setAttribute("class", "input_button");
button53.setAttribute("data-value", ".");
button53.innerText = ".";
row.append(button53);
var button54 = document.createElement("div");
button54.setAttribute("id", "button54");
button54.setAttribute("class", "input_button op-col");
button54.setAttribute("data-value", "=");
button54.innerText = "=";
row.append(button54);
var operand1 = 0;
var operand2 = null;
var operator = null;
function calculate() {
  operand2 = parseFloat(answer.getAttribute("data-value"));
  // let ans = eval(operand1+operator+operand2);
  // let ans = eval(answer.innerText);
  var ans = null;
  switch (operator) {
    case "+":
      ans = operand1 + operand2;
      break;
    case "-":
      ans = operand1 - operand2;
      break;
    case "*":
      ans = operand1 * operand2;
      break;
    case "%":
      if (operand2 === 0) {
        alert("Division By Zero Error");
      } else {
        ans = operand1 % operand2;
      }
      break;
    case "/":
      if (operand2 === 0) {
        alert("Division By Zero Error");
      } else {
        ans = operand1 / operand2;
      }
      break;
    default:
      break;
  }
  if (ans) {
    operator = null;
    answer.innerText = ans;
    answer.setAttribute("data-value", ans);
  }
}
document.addEventListener("click", function (event) {
  var ele = event.target.getAttribute("data-value");
  if (ele === "AC") {
    answer.innerText = "0";
    answer.setAttribute("data-value", "0");
  } else if (ele === "X") {
    var s = answer.innerText;
    if (s !== "0") {
      var n = s.length - 1;
      if (n === 0) {
        answer.innerText = "0";
        answer.setAttribute("data-value", "0");
      } else {
        answer.innerText = s.slice(0, -1);
        if (s[n] >= "0" && s[n] <= "9") {
          var val = answer.getAttribute("data-value");
          if (val !== "0") answer.setAttribute("data-value", val.slice(0, -1));
        }
      }
    }
  } else if (ele === "+") {
    if (operator == null) {
      operator = "+";
      operand1 = parseFloat(answer.getAttribute("data-value"));
      answer.innerText += ele;
      answer.setAttribute("data-value", "0");
    } else {
      calculate();
    }
  } else if (ele === "-") {
    if (operator == null) {
      operator = "-";
      operand1 = parseFloat(answer.getAttribute("data-value"));
      answer.innerText += ele;
      answer.setAttribute("data-value", "0");
    } else {
      calculate();
    }
  } else if (ele === "*") {
    if (operator == null) {
      operator = "*";
      operand1 = parseFloat(answer.getAttribute("data-value"));
      answer.innerText += ele;
      answer.setAttribute("data-value", "0");
    } else {
      calculate();
    }
  } else if (ele === "%") {
    if (operator == null) {
      operator = "%";
      operand1 = parseFloat(answer.getAttribute("data-value"));
      answer.innerText += ele;
      answer.setAttribute("data-value", "0");
    } else {
      calculate();
    }
  } else if (ele === "/") {
    if (operator == null) {
      operator = "/";
      operand1 = parseFloat(answer.getAttribute("data-value"));
      answer.innerText += ele;
      answer.setAttribute("data-value", "0");
    } else {
      calculate();
    }
  } else if (ele === "=") {
    calculate();
  } else if (ele != null) {
    // let s = answer.innerHTML;
    var _s = answer.getAttribute("data-value");
    if (_s === "0") {
      answer.innerText = ele;
      answer.setAttribute("data-value", ele);
    } else {
      answer.innerText += ele;
      var _val = answer.getAttribute("data-value");
      answer.setAttribute("data-value", _val + ele);
    }
  }
});
},{"./styles.css":"src/styles.css"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "42495" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map