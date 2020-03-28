import {EditorView} from "prosemirror-view";
import {EditorState, Plugin} from "prosemirror-state";
import {DOMSerializer, DOMParser, Schema, SchemaSpec} from "prosemirror-model";
import {baseKeymap} from "prosemirror-commands"
const {exampleSetup} = require("prosemirror-example-setup")
const {schema} = require("prosemirror-schema-basic")
// import {
//     wrapItem, blockTypeItem, Dropdown, DropdownSubmenu, joinUpItem, liftItem,
//     selectParentNodeItem, undoItem, redoItem, icons, MenuItem
// } from 'prosemirror-menu'
import 'prosemirror-example-setup/style/style.css'
import 'prosemirror-menu/style/menu.css'
import 'prosemirror-view/style/prosemirror.css'
import basicModule from '../src/plugins/basic'
import linkModule from '../src/plugins/link'
import {dropCursor} from 'prosemirror-dropcursor'
import {gapCursor}from 'prosemirror-gapcursor'
import {IModule, IConfig} from "./interface";
import {keymap} from "prosemirror-keymap"
import { menuBar, undo ,redo } from "prosemirror-menu"
import {buildMenuItems} from "./plugins/menu"
import './style.less'
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

const flatMenuPlugins = (modules: IModule[]) => {
    let menu = [];
    modules.forEach((module:IModule) => {
        menu = menu.concat(module.menuItem)
    })
}

export default class Reditor {
    EDIT_WRAPPER_CONTAINER = 'reditor-edit-container'
    dom
    view
    config
    updateString
    constructor(dom: HTMLElement, config: IConfig) {
        let modules: IModule[];
        this.config = config || {}
        modules = config.modules || defaultModules;
        const demoSchema = new Schema(collectSchema(modules));
        const editorWrapper = document.createElement('div')
        dom.append(editorWrapper);
        editorWrapper.classList.add(this.EDIT_WRAPPER_CONTAINER)
        this.dom = editorWrapper
        const defaultNode = document.createElement('div')
        const defaultValue = '<p></p>'
        defaultNode.innerHTML = defaultValue
        const node = config.contentNode || defaultNode
        const state = EditorState.create({
            doc: DOMParser.fromSchema(demoSchema).parse(node),
            plugins: [
                ...defaultPlugin,
                ...collectPlugins(modules),
                menuBar({
                    // float: true,
                    content: buildMenuItems(demoSchema).fullMenu
                })
            ],
            // plugins: exampleSetup({schema: demoSchema})
        })
        this.view = window.view = new EditorView(this.dom, {
            state
        })
    }

    getCurrentInnerHTML() {
        const { doc, schema, plugins } = this.view.state;
        const $container = document.createElement("div");
        const fragment = DOMSerializer.fromSchema(schema).serializeFragment(doc.content);
        $container.appendChild(fragment);
        return $container.innerHTML;
    }

}


