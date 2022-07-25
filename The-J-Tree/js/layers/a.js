const BONUS = 'resources/blue.png';
const LAYER = 'resources/red.png';

addLayer('a', {
	startData() { return {
		unlocked: true,
		points: new Decimal(0),
	}},
	color: 'yellow',
	resource: 'achievements', 
	row: 'side',
	position: 0,
	tooltip() { // Optional, tooltip displays when the layer is locked
		return 'Achievements';
	},
	update() {
		player.a.points = new Decimal(player.a.achievements.length);
	},
	tabFormat: [
		'main-display',
		'achievements',
		['display-text', '<span style="color:#4C96FF;">BLUE</span> - Bonuses'],
		['display-text', '<span style="color:#FF4C4C;">RED</span> - Layer'],
	],
	achievementPopups: true,
	achievements: {
		11: {
			name: 'Faster Generation',
			done() { return player.j.buyables[11].gte(1) },
			tooltip: 'Have 1 Point Booster', // Showed when the achievement is completed
			image: BONUS,
		},
		12: {
			name: 'A New Feature',
			done() { return new Decimal(player.j.upgrades.length).gte(1) },
			tooltip: 'Get 1 upgrade', // Showed when the achievement is completed
			image: LAYER,
		},
		13: {
			name: 'The limit',
			done() { return player.j.buyables[11].gte(10) },
			tooltip: 'Reach the Point Booster limit (10)', // Showed when the achievement is completed
			image: BONUS,
		},
	},
});