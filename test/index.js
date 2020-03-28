import Reditor from "../src/index.ts"

const editor = document.querySelector("#reditor-edit")  //as HTMLElement;
const content = document.querySelector("#content");
const view = document.querySelector("#reditor-view");
const reditor = new Reditor(editor, {
    placeholder: '',
    contentNode: content
})

const observer = new MutationObserver(() => {
    view.innerHTML = reditor.getCurrentInnerHTML()
})

observer.observe(editor, {
    attributes: true,
    childList: true,
    subtree: true
})
