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
	["brb","be right back"],
	["lol", "laugh out loud"],
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
				childElement.innerHTML = childElement.innerHTML.replace(replacementPair[0],replacementPair[1]);
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

