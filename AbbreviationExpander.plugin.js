//META{"name":"test plugin"}*//

/**
 * @name AbbreviationExpander
 * @author RyanEthanTao
 * @description Automatically expands abbreviations into their expanded form
 * @version 1.0
 */

const myCallback = mutations => {
	for(let mutation of mutations){
	// We only care about our button being removed
	// Convert to array to allow array functions
	const addedNodes = Array.from(mutation.addedNodes);
	for(let addedNode of addedNodes){
		console.log(typeof addedNode);
	processingStuff2(addedNode);
}
}
};
const myObserver = new MutationObserver(myCallback);
const observerOptions = {
	childList: true,
	subtree: true 
};
const replacements = [
    ['143', 'i love you'],
    ['abt', 'about'],
    ['abt2', 'about to'],
    ['acc', 'actually'],
    ['add', 'address'],
    ['afaik', 'as far as i know'],
    ['afk', 'away from keyboard'],
    ['aka', 'also known as'],
    ['asap', 'as soon as possible'],
    ['asf', 'as f***'],
    ['asl', 'as hell'],
    ['atm', 'at the moment'],
    ['atp', 'at this point'],
    ['b', 'bisexual / babe'],
    ['b4', 'before'],
    ['based', 'used when agreeing with something; or recognising someone is being themselves'],
    ['bc', 'because'],
    ['bday', 'birthday'],
    ['bet', 'yes'],
    ['okay', 'affirming something'],
    ['bf', 'boyfriend/best friend'],
    ['bf4l or bffl', 'best friends for life'],
    ['bfd', 'big freaking deal'],
    ['bff', 'best friends forever'],
    ['blates', 'obviously'],
    ['bogo', 'buy one get one'],
    ['boyf', 'boyfriend'],
    ['brb', 'be right back'],
    ['brt', 'be right there'],
    ['bts', 'behind the scenes'],
    ['btw', 'by the way'],
    ['bussin', 'really good'],
    ['byob', 'bring your own beer'],
    ['cap', 'lie'],
    ['cba', 'can\’t be bothered'],
    ['cmb', 'call me back'],
    ['cmon', 'come on'],
    ['ctn', 'can\’t talk now'],
    ['cu', 'see you'],
    ['cua', 'see you around'],
    ['cul', 'see you later'],
    ['cya', 'see ya'],
    ['da f/dafuq?', 'what the f***?'],
    ['dae', 'does anyone else?'],
    ['diss', 'disrespect'],
    ['dkdc', 'don\’t know don\’t care'],
    ['dl', 'download'],
    ['dm', 'direct message'],
    ['dnt', 'don\’t'],
    ['down bad', 'desperate for attention'],
    ['dw', "don't worry"],
    ['ema', 'email address'],
    ['eta', 'estimated time of arrival'],
    ['ez', 'easy'],
    ['fam', 'bro'],
    ['faq', 'frequently asked questions'],
    ['fb', 'facebook'],
    ['finna', 'i\’m going to'],
    ['fire', 'a word to describe something positive (e.g. that game is fire)'],
    ['fomo', 'fear of missing out'],
    ['fr', 'for real'],
    ['ftfy', 'fixed that for you'],
    ['ftw', 'for the win'],
    ['fubar', 'f***** up beyond all recognition'],
    ['fuq/fuqn', 'f***/f***ing'],
    ['fwb', 'friends with benefits'],
    ['fwd', 'forward'],
    ['fwif', 'for what it\’s worth'],
    ['fwiw', 'for what it\’s worth'],
    ['fyi', 'for your information'],
    ['g2cu', 'good to see you'],
    ['g2g', 'got to go'],
    ['g2r', 'got to run'],
    ['gamer', 'video game player'],
    ['gf', 'girlfriend'],
    ['gg', 'good game'],
    ['gj', 'good job'],
    ['gl', 'good luck'],
    ['glhf', 'good luck have fun'],
    ['gn', 'good night'],
    ['goat', 'greatest of all time'],
    ['gotta', 'got to'],
    ['gr8', 'great'],
    ['gratz', 'congratulations'],
    ['gtfoh', 'get the f*** outta here'],
    ['gtg', 'got to go'],
    ['gud', 'good'],
    ['gyat', 'god damn'],
    ['gyatt', 'god damn'],
    ['h8', 'hate'],
    ['hbd', 'happy birthday'],
    ['hbday', 'happy birthday'],
    ['hella', 'really'],
    ['hits different', 'affects me differently'],
    ['hmu', 'hit me up'],
    ['hv', 'have'],
    ['hw', 'homework'],
    ['ib', 'i\’m back'],
    ['ic', 'i see'],
    ['icymi', 'in case you missed it'],
    ['idc', 'i don\’t care'],
    ['idek', "i don't even know"],
    ['idgaf', 'i don\’t give a f***'],
    ['idk', 'i don\’t know'],
    ['idrc', "i don't really care"],
    ['ig', 'i guess or instagram'],
    ['iirc', 'if i remember correctly'],
    ['ik(r)', 'i know (right?)'],
    ['ikr', 'i know right'],
    ['ilu', 'i love you'],
    ['ily', 'i love you'],
    ['im', 'instant message'],
    ['imho', 'in my humble opinion'],
    ['imo', 'in my opinion'],
    ['insta', 'instagram'],
    ['irl', 'in real life'],
    ['iso', 'in search of'],
    ['iykwim', 'if you know what i mean'],
    ['iykyk', 'if you know, you know'],
    ['jic', 'just in case'],
    ['jk', 'just kidding'],
    ['jw', 'just wondering'],
    ['k', 'okay'],
    ['kewl', 'cool'],
    ['kk', 'okay'],
    ['kms', 'killing myself'],
    ['kthnx', 'ok, thanks'],
    ['l', 'loss'],
    ['l8', 'late'],
    ['l8r', 'later'],
    ['let her cook', 'let her do it'],
    ['let him cook', 'let him do it'],
    ['lit', 'good'],
    ['lmao', 'laughing my a** off'],
    ['lmfao', 'laughing my f***ing a** off'],
    ['lmk', 'let me know'],
    ['lol', 'laugh out loud'],
    ['loll', 'laugh out loud a lot'],
    ['lolll', 'laugh out loud a lot'],
    ['luv ya', 'love you'],
    ['mf', 'mother f***er'],
    ['mid', 'mediocre'],
    ['myob', 'mind your own business'],
    ['nah', 'no'],
    ['nbd', 'no big deal'],
    ['ngl', 'not gonna lie'],
    ['npc', 'non-playable character'],
    ['nvm', 'nevermind'],
    ['nw ', 'no worries'],
    ['ong', 'on god'],
    ['pfp', 'profile picture'],
    ['pov', 'point of view'],
    ['rizz', 'charisma'],
    ['rly', 'really'],
    ['rn', 'right now'],
    ['rofl', 'rolling on the floor laughing'],
    ['simp', 'one who is desperate for attention of someone'],
    ['slay', 'do something well'],
    ['smh', 'shaking my head'],
    ['snafu', 'situation normal, all f***** up'],
    ['stfu', 'shut the f*** up'],
    ['sus', 'suspicious'],
    ['take the l', 'take the loss'],
    ['tba', 'to be announced'],
    ['tbd', 'to be decided'],
    ['tbf', 'to be frank'],
    ['tbh', 'to be honest'],
    ['tgif', 'thank goodness it/’s friday'],
    ['tl;dr', 'too long, didn/’t read'],
    ['tlc', 'tender loving care'],
    ['tmi', 'too much information'],
    ['ttyl', 'talk to you later'],
    ['tw', 'trigger warning'],
    ['w/e', 'whatever'],
    ['wtf', 'what the f***'],
    ['wyd', 'what are you doing'],
    ['wysiwyg', 'what you see is what you get'],
    ['yt', 'youtube/youtuber']
]
// function processingStuff() {
// 	for (let randomVar of document.body.getElementsByTagName("span")){
// 		if(randomVar.childElementCount==0)
// 			randomVar.innerHTML = randomVar.innerHTML.replace("brb","be right back");
// 	}
// }
function processingStuff2(addedNode) {
	for (let childElement of addedNode.children){
		if(childElement.childElementCount==0){
			//childElement.innerHTML = childElement.innerHTML.replace("brb","be right back");
			for(let replacementPair of replacements){
				let x = childElement.innerHTML.split(' ');
				if(x[0]==replacementPair[0]){
					x[0]=replacementPair[1];
				}
				if(x[x.length-1]==replacementPair[0]){
					x[x.length-1] = replacementPair[1];
				}
				childElement.innerHTML = x.join(' ');
				childElement.innerHTML = childElement.innerHTML.replace(" "+replacementPair[0]+" "," "+replacementPair[1]+" ");
				

			}
		}
		else{
			processingStuff2(childElement);
		}
	}
}
module.exports = class testing {

    start() {
		BdApi.alert("Hello World!", "This is my first plugin!");
		processingStuff2(document.body);
		myObserver.observe(document.body, observerOptions);
      // Called when the plugin is activated (including after reloads)
    } 

    stop() {
		myObserver.disconnect();
      // Called when the plugin is deactivated
    } 
}

