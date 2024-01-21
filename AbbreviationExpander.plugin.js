/**
 * @name AbbreviationExpander
 * @author RyanEthanTao
 * @version 1.0.0
 * @description Expands abbreviations
 */

module.exports = (_ => {
    const changeLog = {};

    return !window.BDFDB_Global || (!window.BDFDB_Global.loaded && !window.BDFDB_Global.started) ? class {
        constructor(meta) { for (let key in meta) this[key] = meta[key]; }
        getName() { return this.name; }
        getAuthor() { return this.author; }
        getVersion() { return this.version; }
        getDescription() { return `The Library Plugin needed for ${this.name} is missing. Open the Plugin Settings to download it. \n\n${this.description}`; }

        downloadLibrary() {
            require("request").get("https://mwittrien.github.io/BetterDiscordAddons/Library/0BDFDB.plugin.js", (e, r, b) => {
                if (!e && b && r.statusCode == 200) require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0BDFDB.plugin.js"), b, _ => BdApi.showToast("Finished downloading BDFDB Library", { type: "success" }));
                else BdApi.alert("Error", "Could not download BDFDB Library Plugin. Try again later or download it manually from GitHub: https://mwittrien.github.io/downloader/?library");
            });
        }

        load() {
            if (!window.BDFDB_Global || !Array.isArray(window.BDFDB_Global.pluginQueue)) window.BDFDB_Global = Object.assign({}, window.BDFDB_Global, { pluginQueue: [] });
            if (!window.BDFDB_Global.downloadModal) {
                window.BDFDB_Global.downloadModal = true;
                BdApi.showConfirmationModal("Library Missing", `The Library Plugin needed for ${this.name} is missing. Please click "Download Now" to install it.`, {
                    confirmText: "Download Now",
                    cancelText: "Cancel",
                    onCancel: _ => { delete window.BDFDB_Global.downloadModal; },
                    onConfirm: _ => {
                        delete window.BDFDB_Global.downloadModal;
                        this.downloadLibrary();
                    }
                });
            }
            if (!window.BDFDB_Global.pluginQueue.includes(this.name)) window.BDFDB_Global.pluginQueue.push(this.name);
        }
        start() { this.load(); }
        stop() { }
        getSettingsPanel() {
            let template = document.createElement("template");
            template.innerHTML = `<div style="color: var(--header-primary); font-size: 16px; font-weight: 300; white-space: pre; line-height: 22px;">The Library Plugin needed for ${this.name} is missing.\nPlease click <a style="font-weight: 500;">Download Now</a> to install it.</div>`;
            template.content.firstElementChild.querySelector("a").addEventListener("click", this.downloadLibrary);
            return template.content.firstElementChild;
        }
    } : (([Plugin, BDFDB]) => {
        const abbreviations = {
            'brb': 'be right back',
            'omg': 'oh my god',
            'lol': 'laugh out loud',
            // Add more abbreviations and their expanded forms as needed
        };

        return class AbbreviationExpander extends Plugin {
            onLoad() {
                this.modulePatches = {
                    before: [
                        "Message",
                        "MessageContent",
                    ],
                };
            }

            onStart() {
                this.forceUpdateAll();
            }

            onStop() {
                this.forceUpdateAll();
            }

            processMessageContent(e) {
                if (!e.instance.props.message) return;

                const expandedMessage = this.expandAbbreviations(e.instance.props.message.content);
                if (expandedMessage !== e.instance.props.message.content) {
                    e.instance.props.message.content = expandedMessage;
                }
            }

            expandAbbreviations(message) {
                for (const abbreviation in abbreviations) {
                    if (abbreviations.hasOwnProperty(abbreviation)) {
                        const regex = new RegExp(`\\b${abbreviation}\\b`, 'gi');
                        message = message.replace(regex, abbreviations[abbreviation]);
                    }
                }
                return message;
            }

            forceUpdateAll() {
                BDFDB.PatchUtils.forceAllUpdates(this);
                BDFDB.MessageUtils.rerenderAll();
            }
        };
    })(window.BDFDB_Global.PluginUtils.buildPlugin(changeLog));
})();