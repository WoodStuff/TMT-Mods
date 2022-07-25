let modInfo = {
	name: 'DRPS Tree',
	id: 'drpstree',
	author: 'nirmoll',
	pointsName: 'YP',
	modFiles: ['tree.js', 'stuff.js',
	'layers/misc/a.js', 'layers/misc/h.js',
	'layers/s.js',
	'layers/shards/p.js', 'layers/shards/f.js', 'layers/shards/i.js'],

	discordName: '',
	discordLink: '',
	initialStartPoints: new Decimal(0), // Used for hard resets and new players
	offlineLimit: 0,  // In hours
};

// Set your version in num and name
let VERSION = {
	num: '0.0',
	name: 'Literally nothing',
};

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0</h3> - 22/7/2021<br>
		- Started development.`;

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`;

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ['blowUpEverything'];

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints);
}

// Determines if it should show points/sec
function canGenPoints() {
	return true;
}

// Calculate points/sec!
function getPointGen() {
	if (!canGenPoints()) return new Decimal(0);

	let gain = new Decimal(1);
	
	if (hasUpgrade('s', 11)) gain = gain.times(upgradeEffect('s', 11))          // teleportation power

	if (getBuyableAmount('si', 11)) gain = gain.times(buyableEffect('si', 11))  // icicle multiply yp effect

	if (hasUpgrade('sf', 11)) gain = gain.times(upgradeEffect('sf', 11))        // yp per power

	if (hasUpgrade('sp', 11)) gain = gain.times(upgradeEffect('sp', 11))        // yp per power
	if (hasUpgrade('sp', 21)) gain = gain.times(upgradeEffect('sp', 21))        // yp per yp
	if (hasUpgrade('sp', 22)) gain = gain.times(upgradeEffect('sp', 22))        // yp per upgrades
	if (hasUpgrade('sp', 23)) gain = gain.times(upgradeEffect('sp', 23))        // yp per achievements

	return gain;
}

// You can add non-layer related variables that should to into 'player' and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	`Reach <b>e9</b> YP to win!`
]

// Determines when the game 'ends'
function isEndgame() {
	return player.points.gte(new Decimal('e9'));
}

// Do stuff every game tick
function doGameTick() {
	if (player.s.points.lt(50000)) player.s.upgrades.splice(0, 1);
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

};

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600); // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}