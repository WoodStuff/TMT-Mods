var shardTree = [['sp'],
			  ['sf', 'si']]

addLayer('s', {
	name: 'Shards', // This is optional, only used in a few places, If absent it just uses the layer id.
	symbol: 'S', // This appears on the layer's node. Default is the id with the first letter capitalized
	position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
	startData() { return {
		unlocked: true,
		points: new Decimal(0),
	} },
	color: '#7D7D7D',
	requires() { // Can be a function that takes requirement increases into account // its now
		cost = new Decimal(1);
		return cost;
	},
	tabFormat: [
		'main-display',
		['display-text', 'Resetting a higher layer on the shard tree will reset the power you got from absorbing them!<br><br>'],
		['display-text', '<h1>Shard Tree</h1>'],
		'blank',
		['tree', shardTree],
		'milestones',
		['display-text', '<h1>Powers</h1>'],
		'blank',
		'upgrades',
	],
	resource: 'power', // Name of prestige currency
	baseResource: 'YP', // Name of resource prestige is based on
	baseAmount() { return player.points }, // Get the current amount of baseResource
	type: 'normal', // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
	exponent() { return 0.5 },
	row: 0, // Row the layer is in on the tree (0 is the first row)
	layerShown() { return true },
	prestigeNotify() { return false },
	autoUpgrade: true,
	gainMult() { // Calculate the multiplier for main currency from bonuses
		return new Decimal(1);
	},
	gainExp() { // Calculate the exponent on main currency from bonuses
		return new Decimal(1);
	},
	hotkeys: [
		{ key: 'ctrl+s', description: 'Ctrl+S: Save the game', unlocked: true, onPress() {
			save(true);
		} },
	],
	milestones: {
		0: {
			requirementDescription: '10,000,000 power',
			effectDescription: 'Unlock a new power shard upgrade',
			done() {
				return player.s.points.gte('e7');
			},
		},
	},
	upgrades: {
		11: {
			fullDisplay() { return `<h1>Teleport</h1><br><span style="font-size:11px;">YP gain is increased based on your YP, unspent power shards and power.<br><b>Currently:</b> ${format(player.points.add(15).log('1e10').max(0.4))} + ${format(player.sp.points.add(5).log('1e5').max(0.3))} + ${format(player.s.points.add(5).log('1e5').max(0.3))}<br>YP gain ${format(upgradeEffect('s', 11))}x<br><br><b>Req:</b> 50,000 power</span>` }, 
			cost: new Decimal(50000),
			onPurchase() {
				player.s.points = player.s.points.add(50000);
				doPopup('none', 'Teleport', 'Power Acquired!', 3, '#7D7D7D');
			},
			effect() { return player.points.add(15).log('1e10').max(0.4).add(player.sp.points.add(5).log('1e5').max(0.3)).add(player.s.points.add(5).log('1e5').max(0.3)) },
			style: {
				'width': '200px',
				'height': '200px',
			},
		},
	},
});