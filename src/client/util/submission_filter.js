export default {
	image: item => item.hasOwnProperty('content') && item.content['$'].medium === 'image',
	note: item => item.hasOwnProperty('text')
}
