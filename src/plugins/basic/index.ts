import {schema} from './schema'
import {IModule, Plugin,Schema, PluginKey} from "../../interface";

export default class basicModule {
    name = 'basic'
    private schema: Schema;
    private plugins: Plugin[];

    constructor() {
        this.schema = schema
        this.menu = {}
        this.plugins = [new Plugin({
            key: new PluginKey(this.name)
        })]
    }
}
