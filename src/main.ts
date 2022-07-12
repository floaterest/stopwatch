import App from './App.svelte';
import './global.sass';

const app = new App({
	target: document.querySelector('body'),
	props: { key: 'stopwatch' }
});

export default app;
