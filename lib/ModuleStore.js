"use strict";
exports.__esModule = true;
var redux_1 = require("redux");
var _1 = require(".");
var ModuleManager_1 = require("./Managers/ModuleManager");
var RefCountedManager_1 = require("./Managers/RefCountedManager");
var Flatten_1 = require("./Utils/Flatten");
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
