const { registerBlockType } = wp.blocks;

registerBlockType('big/sampleblock', {
	title: 'My first block',
	category: 'common',
	icon: 'smiley',
	description: 'Learning in progress',
	keywords: ['example', 'test'],
	edit: () => {
		return <div>:)</div>
	},
	save: () => {
		return <div>:)</div>
	}
});
