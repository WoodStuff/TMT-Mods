addLayer('a', {
	startData() { return {
		unlocked: true,
		points: new Decimal(0),
	}},
	color: 'yellow',
	resource: 'achievements', 
	row: 'side',
	tooltip() { // Optional, tooltip displays when the layer is locked
		return 'Achievements';
	},
	update(diff) {
		player.a.points = new Decimal(getAchs());
	},
	achievementPopups: true,
	achievements: {
		11: {
			name: 'Power!',
			done() { return player.sp.absorbed.gte(1) }, // This one is a freebie
			goalTooltip: 'Absorb a power shard', // Shows when achievement is not completed
			doneTooltip: 'Absorb a power shard', // Showed when the achievement is completed
		},
		12: {
			name: 'Lots of Power',
			done() { return player.s.points.gte(1000) }, // This one is a freebie
			goalTooltip: 'Have ???? power', // Shows when achievement is not completed
			doneTooltip: 'Have 1000 power', // Showed when the achievement is completed
		},
		13: {
			name: 'Optimized',
			done() { return hasUpgrade('sp', 23) }, // This one is a freebie
			goalTooltip: 'Get ? power shard upgrades', // Shows when achievement is not completed
			doneTooltip: 'Get 6 power shard upgrades', // Showed when the achievement is completed
		},
		14: {
			name: 'Elemental Powers',
			done() { return player.sf.total.gte(1) || player.si.total.gte(1) }, // This one is a freebie
			goalTooltip: 'Unlock ???? or ??? shards', // Shows when achievement is not completed
			doneTooltip: 'Unlock fire or ice shards', // Showed when the achievement is completed
		},
	},
});