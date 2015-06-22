import {RSSClient} from './client/RSSClient';

if(process.env.NODE_ENV == "dev")
	require('longjohn');

export {RSSClient}
