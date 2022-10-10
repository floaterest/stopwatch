import App from './App.svelte';
import './app.sass';

const app = new App({
	target: document.body,
	props: { key: 'stopwatch' }
});

export default app;
