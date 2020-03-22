import {schema} from './schema'
import {PluginKey, Plugin} from "prosemirror-state";
import {Schema} from "../../interface";
// import command from './command'
export default class linkModule {
    name = 'link'
    private schema: Schema
    private plugins: Plugin[]
    constructor() {
        console.log(this.name);
        this.schema = schema;
        this.menu = {};
        this.plugins = [new Plugin({
            key: new PluginKey(this.name)
        })]
    }
}
