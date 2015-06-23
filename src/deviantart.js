import {RSSClient as Client} from './client/RSSClient'

if(process.env.NODE_ENV == "dev")
	require('longjohn')

export {Client}
