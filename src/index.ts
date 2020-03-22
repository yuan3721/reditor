import {EditorView} from "prosemirror-view";
import {EditorState, Plugin} from "prosemirror-state";
import {DOMSerializer, DOMParser, Schema, SchemaSpec} from "prosemirror-model";
import {baseKeymap} from "prosemirror-commands"
const {exampleSetup} = require("prosemirror-example-setup")
const {schema} = require("prosemirror-schema-basic")
import {
    wrapItem, blockTypeItem, Dropdown, DropdownSubmenu, joinUpItem, liftItem,
    selectParentNodeItem, undoItem, redoItem, icons, MenuItem
} from 'prosemirror-menu'
import 'prosemirror-example-setup/style/style.css'
import 'prosemirror-menu/style/menu.css'
import 'prosemirror-view/style/prosemirror.css'
import basicModule from '../src/plugins/basic'
import linkModule from '../src/plugins/link'
import {dropCursor} from 'prosemirror-dropcursor'
import {gapCursor}from 'prosemirror-gapcursor'
import {IModule, IConfig} from "./interface";
import {keymap} from "prosemirror-keymap"
const defaultModules = [
    new basicModule(),
    new linkModule()
]

const defaultPlugin = [
    dropCursor(),
    gapCursor(),
    keymap(baseKeymap),
]


const collectSchema = (modules: IModule[]) => {
    let nodes = {};
    let marks = {};
    modules.forEach((module: IModule): void => {
        const eachSchema = module.schema;
        nodes = Object.assign(nodes,eachSchema.nodes)
        marks = Object.assign(marks,eachSchema.marks)
    })
    return {nodes, marks}
}

const collectPlugins = (modules: IModule[]) => {
    let plugins = []
    modules.forEach((module:IModule) => {
        plugins = plugins.concat(module.plugins)
    })
    return plugins
}

export default class Reditor {
    constructor(dom: HTMLElement, config: IConfig) {
        let modules: IModule[];
        modules = config.modules || defaultModules;
        const demoSchema = new Schema(collectSchema(modules));
        const state = EditorState.create({
            doc: DOMParser.fromSchema(demoSchema).parse(dom),
            plugins: [
                ...defaultPlugin,
                ...collectPlugins(modules),
            ],
            // plugins: exampleSetup({schema: demoSchema})
        })
        const view = window.view = new EditorView(document.querySelector('#reditor-view'), {
            state
        })
    }
}


