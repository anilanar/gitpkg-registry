(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("prop-types"), require("react"), require("react-redux"), require("redux"));
	else if(typeof define === 'function' && define.amd)
		define(["prop-types", "react", "react-redux", "redux"], factory);
	else if(typeof exports === 'object')
		exports["redux-dynamic-modules"] = factory(require("prop-types"), require("react"), require("react-redux"), require("redux"));
	else
		root["redux-dynamic-modules"] = factory(root["prop-types"], root["react"], root["react-redux"], root["redux"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_prop_types__, __WEBPACK_EXTERNAL_MODULE_react__, __WEBPACK_EXTERNAL_MODULE_react_redux__, __WEBPACK_EXTERNAL_MODULE_redux__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../node_modules/redux-dynamic-middlewares/lib/index.js":
/*!*************************************************************************************************************!*\
  !*** /Users/anilanar/development/redux-dynamic-modules/node_modules/redux-dynamic-middlewares/lib/index.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.createDynamicMiddlewares = exports.resetMiddlewares = exports.removeMiddleware = exports.addMiddleware = undefined;

var _redux = __webpack_require__(/*! redux */ "redux");

var createDynamicMiddlewares = function createDynamicMiddlewares() {
  var allDynamicMiddlewares = [];

  var enhancer = function enhancer(store) {
    return function (next) {
      return function (action) {
        var chain = allDynamicMiddlewares.map(function (middleware) {
          return middleware(store);
        });

        return _redux.compose.apply(undefined, chain)(next)(action);
      };
    };
  };

  var addMiddleware = function addMiddleware() {
    for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
      middlewares[_key] = arguments[_key];
    }

    allDynamicMiddlewares = [].concat(allDynamicMiddlewares, middlewares);
  };

  var removeMiddleware = function removeMiddleware(middleware) {
    var index = allDynamicMiddlewares.findIndex(function (d) {
      return d === middleware;
    });

    if (index === -1) {
      // eslint-disable-next-line no-console
      console.error('Middleware does not exist!', middleware);

      return;
    }

    allDynamicMiddlewares = allDynamicMiddlewares.filter(function (_, mdwIndex) {
      return mdwIndex !== index;
    });
  };

  var resetMiddlewares = function resetMiddlewares() {
    allDynamicMiddlewares = [];
  };

  return {
    enhancer: enhancer,
    addMiddleware: addMiddleware,
    removeMiddleware: removeMiddleware,
    resetMiddlewares: resetMiddlewares
  };
};

var dynamicMiddlewaresInstance = createDynamicMiddlewares();

exports.default = dynamicMiddlewaresInstance.enhancer;
var addMiddleware = dynamicMiddlewaresInstance.addMiddleware,
    removeMiddleware = dynamicMiddlewaresInstance.removeMiddleware,
    resetMiddlewares = dynamicMiddlewaresInstance.resetMiddlewares;
exports.addMiddleware = addMiddleware;
exports.removeMiddleware = removeMiddleware;
exports.resetMiddlewares = resetMiddlewares;
exports.createDynamicMiddlewares = createDynamicMiddlewares;

/***/ }),

/***/ "./lib/DynamicModuleLoader.js":
/*!************************************!*\
  !*** ./lib/DynamicModuleLoader.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var PropTypes = __webpack_require__(/*! prop-types */ "prop-types");
var React = __webpack_require__(/*! react */ "react");
//@ts-ignore
var react_redux_1 = __webpack_require__(/*! react-redux */ "react-redux");
/**
 * The DynamicModuleLoader adds a way to register a module on mount
 * When this component is initialized, the reducer and saga from the module passed as props will be registered with the system
 * On unmount, they will be unregistered
 */
var DynamicModuleLoader = /** @class */ (function (_super) {
    __extends(DynamicModuleLoader, _super);
    function DynamicModuleLoader(props, context) {
        return _super.call(this, props, context) || this;
    }
    /**
     * Render a Redux provider
     */
    DynamicModuleLoader.prototype.render = function () {
        var _this = this;
        if (react_redux_1.ReactReduxContext) {
            return (React.createElement(react_redux_1.ReactReduxContext.Consumer, null, function (context) {
                return (React.createElement(DynamicModuleLoaderImpl, { createStore: _this.props.createStore, store: context ? context.store : undefined, modules: _this.props.modules }, _this.props.children));
            }));
        }
        else {
            return (React.createElement(DynamicModuleLoaderImpl
            // @ts-ignore
            , { 
                // @ts-ignore
                createStore: this.props.createStore, store: this.context.store, modules: this.props.modules }, this.props.children));
        }
    };
    // @ts-ignore
    DynamicModuleLoader.contextTypes = {
        store: PropTypes.object
    };
    return DynamicModuleLoader;
}(React.Component));
exports.DynamicModuleLoader = DynamicModuleLoader;
var DynamicModuleLoaderImpl = /** @class */ (function (_super) {
    __extends(DynamicModuleLoaderImpl, _super);
    function DynamicModuleLoaderImpl(props) {
        var _this = _super.call(this, props) || this;
        _this._providerInitializationNeeded = false;
        _this._renderWithReactReduxContext = function () {
            var store = _this.props.store;
            // store.getState is important here as we don't want to use storeState from the provided context
            return (React.createElement(react_redux_1.ReactReduxContext.Provider, { value: { store: store, storeState: store.getState() } }, _this._renderChildren()));
        };
        _this._renderChildren = function () {
            if (_this.props.children && typeof _this.props.children === "function") {
                return _this.props.children();
            }
            return _this.props.children;
        };
        var createStore = props.createStore, modules = props.modules, store = props.store;
        _this._store = store;
        if (!_this._store) {
            if (createStore) {
                _this._store = createStore();
                _this._providerInitializationNeeded = true;
            }
            else {
                throw new Error("Store could not be resolved from React context");
            }
        }
        _this._addedModules = _this._store.addModules(modules);
        return _this;
    }
    DynamicModuleLoaderImpl.prototype.render = function () {
        if (this._providerInitializationNeeded) {
            return (React.createElement(react_redux_1.Provider, { store: this._store }, this._renderChildren()));
        }
        return this._renderWithReactReduxContext();
    };
    /**
     * Unregister sagas and reducers
     */
    DynamicModuleLoaderImpl.prototype.componentWillUnmount = function () {
        if (this._addedModules) {
            this._addedModules.remove();
            this._addedModules = undefined;
        }
    };
    return DynamicModuleLoaderImpl;
}(React.Component));


/***/ }),

/***/ "./lib/Managers/MiddlewareManager.js":
/*!*******************************************!*\
  !*** ./lib/Managers/MiddlewareManager.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

//inspired from https://github.com/pofigizm/redux-dynamic-middlewares
exports.__esModule = true;
var redux_dynamic_middlewares_1 = __webpack_require__(/*! redux-dynamic-middlewares */ "../../node_modules/redux-dynamic-middlewares/lib/index.js");
exports.getMiddlewareManager = function () {
    var dynamicMiddlewaresInstance = redux_dynamic_middlewares_1.createDynamicMiddlewares();
    var add = function (middlewares) {
        dynamicMiddlewaresInstance.addMiddleware.apply(dynamicMiddlewaresInstance, middlewares);
        return middlewares;
    };
    var remove = function (middlewares) {
        middlewares.forEach(dynamicMiddlewaresInstance.removeMiddleware);
        return middlewares;
    };
    return {
        getItems: function () { return []; },
        enhancer: dynamicMiddlewaresInstance.enhancer,
        add: add,
        remove: remove,
        dispose: function () {
            dynamicMiddlewaresInstance.resetMiddlewares();
        }
    };
};


/***/ }),

/***/ "./lib/Managers/ModuleManager.js":
/*!***************************************!*\
  !*** ./lib/Managers/ModuleManager.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var ReducerManager_1 = __webpack_require__(/*! ./ReducerManager */ "./lib/Managers/ReducerManager.js");
function getModuleManager(middlewareManager, extensions) {
    var _dispatch = null;
    var _reducerManager;
    var _modules = [];
    var _moduleIds = new Set();
    var _dispatchActions = function (actions) {
        if (!actions) {
            return;
        }
        if (!_dispatch) {
            throw new Error("setDispatch should be called on ModuleManager before adding any modules.");
        }
        actions.forEach(_dispatch);
    };
    var _addMiddlewares = function (middlewares) {
        if (!middlewares) {
            return;
        }
        middlewareManager.add(middlewares);
    };
    var _removeMiddlewares = function (middlewares) {
        if (!middlewares) {
            return;
        }
        middlewareManager.remove(middlewares);
    };
    var _addReducers = function (reducerMap) {
        if (!reducerMap) {
            return;
        }
        if (!_reducerManager) {
            _reducerManager = ReducerManager_1.getRefCountedReducerManager(ReducerManager_1.getReducerManager(reducerMap));
        }
        else {
            for (var key in reducerMap) {
                _reducerManager.add(key, reducerMap[key]);
            }
        }
    };
    var _removeReducers = function (reducerMap) {
        if (!reducerMap || !_reducerManager) {
            return;
        }
        for (var key in reducerMap) {
            _reducerManager.remove(key);
        }
    };
    // Create reduce function which redirects to _reducers.reduce
    var _reduce = function (s, a) {
        if (_reducerManager) {
            return _reducerManager.reduce(s, a);
        }
        return s || null;
    };
    var moduleManager = {
        getReducer: _reduce,
        setDispatch: function (dispatch) {
            _dispatch = dispatch;
        },
        getItems: function () { return []; },
        add: function (modulesToAdd) {
            if (!modulesToAdd || modulesToAdd.length === 0) {
                return;
            }
            modulesToAdd = modulesToAdd.filter(function (module) { return module; });
            var justAddedModules = [];
            modulesToAdd.forEach(function (module) {
                if (!_moduleIds.has(module.id)) {
                    _moduleIds.add(module.id);
                    _modules.push(module);
                    _addReducers(module.reducerMap);
                    var middlewares = module.middlewares;
                    if (middlewares) {
                        _addMiddlewares(middlewares);
                    }
                    justAddedModules.push(module);
                }
            });
            // add the sagas and dispatch actions at the end so all the reducers are registered
            justAddedModules.forEach(function (module) {
                // Let the extensions know we added a module
                extensions.forEach(function (p) {
                    if (p.onModuleAdded) {
                        p.onModuleAdded(module);
                    }
                });
                // Dispatch the initial actions
                var moduleAddedAction = {
                    type: "@@Internal/ModuleManager/ModuleAdded",
                    payload: module.id
                };
                _dispatchActions(module.initialActions
                    ? [moduleAddedAction].concat(module.initialActions) : [moduleAddedAction]);
            });
        },
        remove: function (modulesToRemove) {
            if (!modulesToRemove) {
                return;
            }
            modulesToRemove = modulesToRemove.filter(function (module) { return module; });
            modulesToRemove.forEach(function (module) {
                if (_moduleIds.has(module.id)) {
                    _dispatchActions(module.finalActions);
                    _removeReducers(module.reducerMap);
                    _removeMiddlewares(module.middlewares);
                    // Let the extensions know we removed a module
                    extensions.forEach(function (p) {
                        if (p.onModuleRemoved) {
                            p.onModuleRemoved(module);
                        }
                    });
                    _moduleIds["delete"](module.id);
                    _modules = _modules.filter(function (m) { return m.id !== module.id; });
                    _dispatchActions([
                        {
                            type: "@@Internal/ModuleManager/ModuleRemoved",
                            payload: module.id
                        },
                    ]);
                }
            });
        },
        dispose: function () {
            moduleManager.remove(_modules);
        }
    };
    return moduleManager;
}
exports.getModuleManager = getModuleManager;


/***/ }),

/***/ "./lib/Managers/ReducerManager.js":
/*!****************************************!*\
  !*** ./lib/Managers/ReducerManager.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var redux_1 = __webpack_require__(/*! redux */ "redux");
var RefCounter_1 = __webpack_require__(/*! ../Utils/RefCounter */ "./lib/Utils/RefCounter.js");
/**
 * Adds reference counting to reducer manager and adds/remove keys only when ref count is zero
 */
function getRefCountedReducerManager(manager) {
    var reducerKeyRefCounter = RefCounter_1.getStringRefCounter();
    for (var key in manager.getReducerMap()) {
        reducerKeyRefCounter.add(key);
    }
    return {
        reduce: manager.reduce,
        getReducerMap: manager.getReducerMap,
        add: function (key, reducer) {
            if (reducerKeyRefCounter.getCount(key) === 0) {
                manager.add(key, reducer);
            }
            reducerKeyRefCounter.add(key);
        },
        remove: function (key) {
            reducerKeyRefCounter.remove(key);
            if (reducerKeyRefCounter.getCount(key) === 0) {
                manager.remove(key);
            }
        }
    };
}
exports.getRefCountedReducerManager = getRefCountedReducerManager;
/**
 * Create a combined reducer as in the fashion of Redux's combineReducers() function,
 * but allows for the dynamic registration of additional reducers
 * @param initialReducers The initial set of reducers
 * @returns An object with three functions: the reducer, an addReducer function, and a removeReducer function
 */
function getReducerManager(initialReducers) {
    var combinedReducer = redux_1.combineReducers(initialReducers);
    var reducers = __assign({}, initialReducers);
    var keysToRemove = [];
    var reduce = function (state, action) {
        if (keysToRemove.length > 0) {
            state = __assign({}, state);
            for (var _i = 0, keysToRemove_1 = keysToRemove; _i < keysToRemove_1.length; _i++) {
                var key = keysToRemove_1[_i];
                delete state[key];
            }
            keysToRemove = [];
        }
        if (state === undefined) {
            state = {};
        }
        return combinedReducer(state, action);
    };
    return {
        getReducerMap: function () { return reducers; },
        reduce: reduce,
        add: function (key, reducer) {
            if (!key || reducers[key]) {
                return;
            }
            reducers[key] = reducer;
            combinedReducer = getCombinedReducer(reducers);
        },
        remove: function (key) {
            if (!key || !reducers[key]) {
                return;
            }
            delete reducers[key];
            keysToRemove.push(key);
            combinedReducer = getCombinedReducer(reducers);
        }
    };
}
exports.getReducerManager = getReducerManager;
function getCombinedReducer(reducerMap) {
    if (!reducerMap || Object.keys(reducerMap).length === 0) {
        return function (state, action) { return state || null; };
    }
    return redux_1.combineReducers(reducerMap);
}


/***/ }),

/***/ "./lib/Managers/RefCountedManager.js":
/*!*******************************************!*\
  !*** ./lib/Managers/RefCountedManager.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var RefCounter_1 = __webpack_require__(/*! ../Utils/RefCounter */ "./lib/Utils/RefCounter.js");
/**
 * Enhances the given items with ref counting for add remove purposes
 */
function getRefCountedManager(manager, equals) {
    var refCounter = RefCounter_1.getObjectRefCounter(equals);
    var items = manager.getItems();
    // Set initial ref counting
    items.forEach(function (item) { return refCounter.add(item); });
    var ret = __assign({}, manager);
    // Wrap add method
    ret.add = function (items) {
        if (!items) {
            return;
        }
        var nonNullItems = items.filter(function (i) { return i; });
        var notAddedItems = nonNullItems.filter(function (i) { return refCounter.getCount(i) === 0; });
        manager.add(notAddedItems);
        nonNullItems.forEach(refCounter.add);
    };
    // Wrap remove
    ret.remove = function (items) {
        if (!items) {
            return;
        }
        items.forEach(function (item) {
            if (item) {
                refCounter.remove(item);
                if (refCounter.getCount(item) === 0) {
                    manager.remove([item]);
                }
            }
        });
    };
    ret.dispose = function () {
        manager.dispose();
    };
    return ret;
}
exports.getRefCountedManager = getRefCountedManager;


/***/ }),

/***/ "./lib/ModuleStore.js":
/*!****************************!*\
  !*** ./lib/ModuleStore.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var redux_1 = __webpack_require__(/*! redux */ "redux");
var _1 = __webpack_require__(/*! . */ "./lib/index.js");
var ModuleManager_1 = __webpack_require__(/*! ./Managers/ModuleManager */ "./lib/Managers/ModuleManager.js");
var RefCountedManager_1 = __webpack_require__(/*! ./Managers/RefCountedManager */ "./lib/Managers/RefCountedManager.js");
var Flatten_1 = __webpack_require__(/*! ./Utils/Flatten */ "./lib/Utils/Flatten.js");
function createStore(initialState, enhancers, extensions, compose) {
    var initialModules = [];
    for (var _i = 4; _i < arguments.length; _i++) {
        initialModules[_i - 4] = arguments[_i];
    }
    if (!extensions) {
        extensions = [];
    }
    var extensionMiddleware = extensions.reduce(function (mw, p) {
        if (p.middleware) {
            mw.push.apply(mw, p.middleware);
        }
        return mw;
    }, []);
    var middlewareManager = RefCountedManager_1.getRefCountedManager(_1.getMiddlewareManager(), function (a, b) { return a === b; });
    var enhancer = compose.apply(void 0, enhancers.concat([redux_1.applyMiddleware.apply(void 0, extensionMiddleware.concat([middlewareManager.enhancer]))]));
    var modules = RefCountedManager_1.getRefCountedManager(ModuleManager_1.getModuleManager(middlewareManager, extensions), function (a, b) { return a.id === b.id; });
    // Create store
    var store = redux_1.createStore(modules.getReducer, initialState, enhancer);
    modules.setDispatch(store.dispatch);
    var addModules = function (modulesToBeAdded) {
        var flattenedModules = Flatten_1.flatten(modulesToBeAdded);
        modules.add(flattenedModules);
        return {
            remove: function () {
                modules.remove(flattenedModules);
            }
        };
    };
    var addModule = function (moduleToBeAdded) {
        return addModules([moduleToBeAdded]);
    };
    extensions.forEach(function (p) {
        if (p.onModuleManagerCreated) {
            p.onModuleManagerCreated({
                addModule: addModule,
                addModules: addModules
            });
        }
    });
    store.addModule = addModule;
    store.addModules = addModules;
    store.dispose = function () {
        // get all added modules and remove them
        modules.dispose();
        middlewareManager.dispose();
        extensions.forEach(function (p) {
            if (p.dispose) {
                p.dispose();
            }
        });
    };
    store.addModules(initialModules);
    return store;
}
exports.createStore = createStore;


/***/ }),

/***/ "./lib/Utils/ComparableMap.js":
/*!************************************!*\
  !*** ./lib/Utils/ComparableMap.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
/**
 * We will use it where we can not use the default Map as the Map class do not allow custom compare function
 * @param equals Optional, a comparer to use
 */
function getMap(equals) {
    var keys = [];
    var values = {};
    return {
        /**
         * Current set of keys
         */
        keys: keys,
        /**
         * Gets value for given key
         */
        get: function (key) {
            if (!key) {
                return undefined;
            }
            var index = keys.findIndex(function (k) { return k && equals(k, key); });
            if (index === -1) {
                return undefined;
            }
            return values[index];
        },
        /**
         * Adds the given key and value
         */
        add: function (key, value) {
            if (!key) {
                return;
            }
            var index = keys.findIndex(function (k) { return k && equals(k, key); });
            if (index === -1) {
                keys.push(key);
                values[keys.length - 1] = value;
            }
        },
        /**
         * Removes the given key and returns the value object if key was found
         */
        remove: function (key) {
            if (!key) {
                return undefined;
            }
            var index = keys.findIndex(function (k) { return k && equals(k, key); });
            if (index === -1) {
                return undefined;
            }
            delete keys[index];
            var value = values[index];
            delete values[index];
            return value;
        }
    };
}
exports.getMap = getMap;


/***/ }),

/***/ "./lib/Utils/Flatten.js":
/*!******************************!*\
  !*** ./lib/Utils/Flatten.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
function flatten(arr) {
    if (arr) {
        var res = arr.slice();
        var i = 0;
        while (i < res.length) {
            if (Array.isArray(res[i])) {
                res.splice.apply(res, [i, 1].concat(res[i]));
            }
            else {
                i++;
            }
        }
        return res;
    }
    return arr;
}
exports.flatten = flatten;


/***/ }),

/***/ "./lib/Utils/RefCounter.js":
/*!*********************************!*\
  !*** ./lib/Utils/RefCounter.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
/** Ref counts given object */
function getObjectRefCounter(equals) {
    if (!equals) {
        equals = function (a, b) { return a === b; };
    }
    var objects = [];
    var counts = [];
    return {
        /**
         * Gets ref count of given T
         */
        getCount: function (obj) {
            if (obj === undefined || obj === null) {
                return 0;
            }
            var index = objects.findIndex(function (o) { return o && equals(o, obj); });
            if (index === -1) {
                return 0;
            }
            return counts[index];
        },
        /**
         * Add given T or increments ref count
         */
        add: function (obj) {
            if (obj === undefined || obj === null) {
                return;
            }
            var index = objects.findIndex(function (o) { return o && equals(o, obj); });
            var count = 1;
            if (index === -1) {
                index = objects.length;
                objects.push(obj);
            }
            else {
                count = counts[index] + 1;
            }
            counts[index] = count;
        },
        /**
         * Decreases ref count for given T, if refcount reaches to zero removes the T and returns true
         */
        remove: function (obj) {
            var index = objects.findIndex(function (o) { return o && equals(o, obj); });
            if (index === -1) {
                return false;
            }
            if (counts[index] === 1) {
                delete objects[index];
                delete counts[index];
                return true;
            }
            counts[index] = counts[index] - 1;
            return false;
        }
    };
}
exports.getObjectRefCounter = getObjectRefCounter;
/**
 * Ref counts strings
 */
function getStringRefCounter() {
    var values = {};
    return {
        /**
         * Returns current ref count for the key
         */
        getCount: function (key) {
            if (key === undefined || key === null) {
                return 0;
            }
            return values[key] || 0;
        },
        /**
         * Adds given key for ref counting or increments ref count
         */
        add: function (key) {
            if (key === undefined || key === null) {
                return;
            }
            if (!values[key]) {
                values[key] = 1;
            }
            else {
                values[key]++;
            }
        },
        /**
         * Decreases ref count for the given key, if the ref count reaches 0 removes the key and returns true
         */
        remove: function (key) {
            if (key === undefined || key === null) {
                return false;
            }
            if (!values[key]) {
                return false;
            }
            if (values[key] === 1) {
                delete values[key];
                return true;
            }
            values[key]--;
            return false;
        }
    };
}
exports.getStringRefCounter = getStringRefCounter;


/***/ }),

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
exports.__esModule = true;
__export(__webpack_require__(/*! ./DynamicModuleLoader */ "./lib/DynamicModuleLoader.js"));
__export(__webpack_require__(/*! ./ModuleStore */ "./lib/ModuleStore.js"));
__export(__webpack_require__(/*! ./Utils/ComparableMap */ "./lib/Utils/ComparableMap.js"));
__export(__webpack_require__(/*! ./Utils/RefCounter */ "./lib/Utils/RefCounter.js"));
__export(__webpack_require__(/*! ./Managers/MiddlewareManager */ "./lib/Managers/MiddlewareManager.js"));
__export(__webpack_require__(/*! ./Managers/RefCountedManager */ "./lib/Managers/RefCountedManager.js"));
//Dummy change to keep lerna happy


/***/ }),

/***/ "prop-types":
/*!*****************************!*\
  !*** external "prop-types" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_prop_types__;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_react__;

/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_react_redux__;

/***/ }),

/***/ "redux":
/*!************************!*\
  !*** external "redux" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_redux__;

/***/ })

/******/ });
});
//# sourceMappingURL=redux-dynamic-modules.js.map