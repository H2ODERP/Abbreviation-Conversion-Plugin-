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
            '143': 'i love you', 
            'abt': 'about', 
            'abt2': 'about to', 
            'acc': 'actually', 
            'add': 'address', 
            'afaik': 'as far as i know', 
            'afk': 'away from keyboard', 
            'aka': 'also known as', 
            'asap': 'as soon as possible',
            'asf': 'as f***',
            'asl': 'as hell',
            'atm': 'at the moment',
            'atp': 'at this point',
            'b': 'bisexual / babe',
            'b4': 'before',
            'based': 'used when agreeing with something; or recognising someone is being themselves',
            'bc': 'because',
            'bday': 'birthday',
            'bet': 'yes',
            'okay' : 'affirming something',
            'bf': 'boyfriend/best friend',
            'bf4l or bffl': 'best friends for life',
            'bfd': 'big freaking deal',
            'bff': 'best friends forever',
            'blates': 'obviously',
            'bogo': 'buy one get one',
            'boyf': 'boyfriend',
            'brb': 'be right back',
            'brt': 'be right there',
            'bts': 'behind the scenes',
            'btw': 'by the way',
            'bussin': 'really good',
            'byob': 'bring your own beer',
            'cap': 'lie',
            'cba': 'can’t be bothered',
            'cmb': 'call me back',
            'cmon': 'come on',
            'ctn': 'can’t talk now',
            'cu': 'see you',
            'cua': 'see you around',
            'cul': 'see you later',
            'cya': 'see ya',
            'da f/dafuq?': 'what the f***?',
            'dae': 'does anyone else?',
            'diss': 'disrespect',
            'dkdc': 'don’t know don’t care',
            'dl': 'download',
            'dm': 'direct message',
            'dnt': 'don’t',
            'down bad': 'desperate for attention ',
            'dw': "don't worry",
            'ema': 'email address',
            'eta': 'estimated time of arrival',
            'ez': 'easy',
            'fam': 'short for ‘family’, similar to ‘bro’',
            'faq': 'frequently asked questions',
            'fb': 'facebook',
            'finna': 'i’m going to',
            'fire': 'a word to describe something positive (e.g. that game is fire)',
            'fomo': 'fear of missing out',
            'fr': 'for real',
            'ftfy': 'fixed that for you',
            'ftw': 'for the win',
            'fubar': 'f***** up beyond all recognition',
            'fuq/fuqn': 'f***/f***ing',
            'fwb': 'friends with benefits',
            'fwd': 'forward',
            'fwif': 'for what it’s worth',
            'fwiw': 'for what it’s worth',
            'fyi': 'for your information',
            'g2cu': 'good to see you',
            'g2g': 'got to go',
            'g2r': 'got to run',
            'gamer': 'video game player',
            'gf': 'girlfriend',
            'gg': 'good game',
            'gj': 'good job',
            'gl': 'good luck',
            'glhf': 'good luck have fun',
            'gn': 'good night',
            'goat': 'greatest of all time',
            'gotta': 'got to',
            'gr8': 'great',
            'gratz': 'congratulations',
            'gtfoh': 'get the f*** outta here',
            'gtg': 'got to go',
            'gud': 'good',
            'gyat': 'god damn',
            'gyatt': 'god damn',
            'h8': 'hate',
            'hbd': 'happy birthday',
            'hbday': 'happy birthday',
            'hella': 'really',
            'hits different': 'affects me differently',
            'hmu': 'hit me up',
            'hv': 'have',
            'hw': 'homework',
            'ib': 'i’m back',
            'ic': 'i see',
            'icymi': 'in case you missed it',
            'idc': 'i don’t care',
            'idek': "i don't even know",
            'idgaf': 'i don’t give a f***',
            'idk': 'i don’t know',
            'idrc': "i don't really care",
            'ig': 'i guess or instagram',
            'iirc': 'if i remember correctly',
            'ik(r)': 'i know (right?)',
            'ikr': 'i know right',
            'ilu': 'i love you',
            'ily': 'i love you',
            'im': 'instant message',
            'imho': 'in my humble opinion',
            'imo': 'in my opinion',
            'insta': 'instagram',
            'irl': 'in real life',
            'iso': 'in search of',
            'it’s giving…': 'used to describe something (e.g. ‘it’s giving childhood’ could describe',
            'iykwim': 'if you know what i mean',
            'iykyk': 'if you know, you know',
            'jic': 'just in case',
            'jk': 'just kidding',
            'jw': 'just wondering',
            'k': 'okay',
            'kewl': 'cool',
            'kk': 'okay',
            'kms': 'killing myself',
            'kthnx': 'ok, thanks',
            'l': 'loss',
            'l8': 'late',
            'l8r': 'later',
            'let her cook': 'let her do it',
            'let him cook': 'let him do it',
            'lit': 'good',
            'lmao': 'laughing my a** off',
            'lmfao': 'laughing my f***ing a** off',
            'lmk': 'let me know',
            'lol': 'laugh out loud',
            'loll': 'laugh out loud a lot',
            'lolll': 'laugh out loud a lot',
            'luv ya': 'love you',
            'mf': 'mother f***er',
            'mid': 'mediocre',
            'myob': 'mind your own business',
            'nah': 'no',
            'nbd': 'no big deal',
            'ngl': 'not gonna lie',
            'npc': 'non-playable character',
            'nvm': 'nevermind',
            'nw ': 'no worries',
            'ong': 'on god',
            'pfp': 'profile picture',
            'pov': 'point of view',
            'rizz': 'charisma',
            'rly': 'really',
            'rn': 'right now',
            'rofl': 'rolling on the floor laughing',
            'simp': 'one who is desperate for attention of someone',
            'slay': 'do something well',
            'smh': 'shaking my head',
            'snafu': 'situation normal, all f***** up',
            'stfu': 'shut the f*** up',
            'sus': 'suspicious',
            'take the l': 'take the loss',
            'tba': 'to be announced',
            'tbd': 'to be decided',
            'tbf': 'to be frank',
            'tbh': 'to be honest',
            'tgif': 'thank goodness it’s friday',
            'tl;dr': 'too long, didn’t read',
            'tlc': 'tender loving care',
            'tmi': 'too much information',
            'ttyl': 'talk to you later',
            'tw': 'trigger warning',
            'w/e': 'whatever',
            'wtf': 'what the f***',
            'wyd': 'what are you doing',
            'wysiwyg': 'what you see is what you get',
            'yt': 'youtube/youtuber',
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