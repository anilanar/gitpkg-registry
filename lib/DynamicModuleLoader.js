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
var PropTypes = require("prop-types");
var React = require("react");
//@ts-ignore
var react_redux_1 = require("react-redux");
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
        return this._renderChildren();
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
