<script>
	import Header from '$components/header.svelte';
	import '../app.postcss';
</script>
<div class="min-w-screen min-h-screen bg-background pt-12">
<Header/>
<slot/>
</div>	
