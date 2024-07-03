let modInfo = {
	name: 'The Idk Tree',
	id: 'theidktree----',
	author: 'nirmoll',
	pointsName: 'points',
	modFiles: ['layers/a.js', 'layers/b.js', 'tree.js'],

	discordName: '',
	discordLink: '',
	initialStartPoints: new Decimal(0),
	offlineLimit: 1,
}

let VERSION = {
	num: '0.0',
	name: 'Literally nothing',
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0</h3><br>
		- Added things.<br>
		- Added stuff.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

var doNotCallTheseFunctionsEveryTick = [];

const getStartPoints = () => new Decimal(modInfo.initialStartPoints);

function canGenPoints() {
	return true;
}

function getPointGen() {
	if (!canGenPoints()) return new Decimal(0);

	let gain = new Decimal(1);
	if (hasUpgrade('b', 11)) gain = gain.times(upgradeEffect('b', 11)) // basic points boosts points
	return gain;
}

function addedPlayerData() { return {
}}

var displayThings = [];
const isEndgame = () => player.points.gte(new Decimal('e280000000'));




var backgroundStyle = {};
const maxTickLength = () => 3600;
function fixOldSave(oldVersion) {}