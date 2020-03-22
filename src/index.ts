import {EditorView} from "prosemirror-view";
import {EditorState, Plugin} from "prosemirror-state";
import {DOMSerializer, DOMParser, Schema, SchemaSpec} from "prosemirror-model";
const {exampleSetup} = require("prosemirror-example-setup")
const {schema} = require("prosemirror-schema-basic")
import 'prosemirror-example-setup/style/style.css'
import 'prosemirror-menu/style/menu.css'
export default class Reditor {
    constructor(dom: HTMLElement,config: Object) {
        const demoSchema = new Schema({
            nodes: schema.spec.nodes,
            marks: schema.spec.marks
        })
        const state = EditorState.create({
            doc: DOMParser.fromSchema(demoSchema).parse(dom),
            plugins: exampleSetup({schema: demoSchema})
        })

        const view = new EditorView(dom, {
            state
        })
    }
}

