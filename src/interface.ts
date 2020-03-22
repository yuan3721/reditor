import {Node, Mark, Schema} from 'prosemirror-model'
import {Plugin, PluginKey, Transaction} from "prosemirror-state";

export { Plugin, PluginKey, Transaction, Node, Mark, Schema}
export interface IModule {
    name: string,
    schema: Schema,
    plugins: Plugin[]
}


export interface IConfig {
    modules: IModule[],
    plugins: Plugin[]
}
