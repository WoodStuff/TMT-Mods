addLayer('h', {
	startData() { return {
		unlocked: true,
		points: new Decimal(0),
	}},
	color: 'red',
	resource: 'stuff', 
	row: 'side',
	tooltip() { // Optional, tooltip displays when the layer is locked
		return 'Help';
	},
	update(diff) {
		player.a.points = new Decimal(getAchs());
	},
	tabFormat: {
		'Main': {
			content() { return [ ['raw-html', layers.h.help.main] ]; },
		},
		'Shards': {
			content() { return [ ['raw-html', layers.h.help.shards] ]; },
		},
	},
	help: {
		main: `<h1>Info</h1>
		<p>This is a mod based on a thing.</p>
		<p>Currently WIP.</p>`,

		shards: `<h1>Shards</h1>
		<p>Shards are the first layer, and do not get reset.</p>
		<br><br>
		
		<h2>Shard Layer 1</h2>
		<p>To start out, just unlock power shards, get some, absorb some, and just get upgrades. This part of the game is straightforward.</p>
		<p>Once you get all 6 upgrades, aim to get either fire shards or ice shards. They're a bit expensive, so you need to save up some YP and have a lot of power shards absorbed.</p>
		<br>

		<h2>Shard Layer 2</h2>
		<p>This part of the game is WIP.</p>`
	}
});