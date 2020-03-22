export const schema = {
    marks: {
        link: {
            inline: true,
            inclusive: false,
            attrs: {
                id: {default: ""},
                href: {default: ""},
                title: {default: ""},
                pageId: {default: ""},
                autoUpdate: {default: ""},
                isNew: {default: false},
            },
            parseDOM: [
                {
                    tag: "a[href]",
                    getAttrs(dom) {
                        return {
                            href: dom.getAttribute("href"),
                            title: dom.innerText,
                            pageId: dom.getAttribute("data-pageid"),
                            autoUpdate: dom.getAttribute("data-auto_update") === "1",
                            isNew: false,
                        };
                    },
                },
            ],
            toDom(node) {
                const {href, pageId, autoUpdate} = node.attrs;
                const attrs = {
                    class: "ct-link",
                    href,
                    "data-pageid": pageId,
                    "data-auto_update": autoUpdate ? "1" : "0",
                };

                return ["a", attrs, 0];
            },
        }
    }
}
