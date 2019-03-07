import * as React from "react";
import { IModuleStore, IModuleTuple } from "./Contracts";
export interface IDynamicModuleLoaderProps {
    /** Modules that need to be dynamically registerd */
    modules: IModuleTuple;
    /** Optional callback which returns a store instance. This would be called if no store could be loaded from the context. */
    createStore?: () => IModuleStore<any>;
}
export interface IDynamicModuleLoaderContext {
    store: IModuleStore<any>;
}
/**
 * The DynamicModuleLoader adds a way to register a module on mount
 * When this component is initialized, the reducer and saga from the module passed as props will be registered with the system
 * On unmount, they will be unregistered
 */
export declare class DynamicModuleLoader extends React.Component<IDynamicModuleLoaderProps> {
    private static contextTypes;
    constructor(props: IDynamicModuleLoaderProps, context: IDynamicModuleLoaderContext);
    /**
     * Render a Redux provider
     */
    render(): React.ReactNode;
}
