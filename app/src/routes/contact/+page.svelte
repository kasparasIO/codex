<script lang="ts">
import { enhance, applyAction } from '$app/forms';
import { tick } from 'svelte';
import Success from './Success.svelte';

export let form;
let formSuccess = false; 
type FormErrors = {
    [key: string]: string
};
$: formError = form?.validationError?.reduce<FormErrors>((acc, error) => {
    acc[(error.path[0])] = error.message;
    return acc
}, {}) || {};

$: if (form?.success) {
    formSuccess = true; 
    setTimeout(() => {
        formSuccess = false;
    }, 5000);
}
</script>

<svelte:head>
    <title>Codex - Contact Me</title>
    <meta name="description" content="Have questions or feedback about Codex? Get in touch with me directly. I'm always open to suggestions and inquiries about my personal projects." />
    <meta name="keywords" content="contact, Codex, personal project, SvelteKit, app development, feedback" />
    <meta property="og:title" content="Codex - Contact Me" />
    <meta property="og:description" content="Interested in Codex or have any feedback? Reach out to me directly. I'm keen to hear your thoughts and suggestions about my personal app collection." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://codex.kasparas.io/contact" />
    
    <meta property="twitter:url" content="https://codex.kasparas.io/contact" />
    <meta property="twitter:title" content="Codex - Contact Me" />
    <meta property="twitter:description" content="Interested in Codex or have any feedback? Reach out to me directly. I'm keen to hear your thoughts and suggestions about my personal app collection." />
</svelte:head>



<div class="page-container min-h-screen items-center">
    <div class="w-full">
        <h1 class="text-5xl text-center">Reach Out</h1>
    </div>
    <form method="POST" class="w-[80%] flex flex-col gap-4"
    use:enhance={({ formElement }) => {
			return async ({ result, update }) => {
				if (result.type === 'success') {
                    formElement.reset();
				}
				if (result.type === 'error') {
                    await applyAction(result);
				}
                await tick()
				update();
			}}}>
    <div>
        <label for="name">Name:</label>
        <input type="text" placeholder="John Smith"
         name="name" class={formError.name? "error": ""}>
        {#if formError.name}
        <span class="text-red-500">{formError.name}</span>        
        {/if}
    </div>
    
    <div>
        <label for="email">Email:</label>
        <input placeholder="MyEmail@host.tld" 
        type="email" name="email" class={formError.email? "error": ""}>
        {#if formError.email}
        <span class="text-red-500">{formError.email}</span>        
        {/if}
     </div>
     <div>
        <label for="message">Message:</label>
        <textarea placeholder="Leave any message that you'd like." 
              name="message" 
              class="min-h-[200px] {formError.message ? 'error' : ''}"></textarea>
        {#if formError.message}
        <span class="text-red-500">{formError.message}</span>        
        {/if}
     </div>
     
     <button>Send 🚀</button>
    </form>
<div class="w-[80%]">
<Success success={formSuccess}/>
</div>
</div>

<style lang="postcss">
input {
    background: none;
    @apply border border-primary transition rounded-md p-2;
}
input:focus{
    outline: none; 
    @apply border-primary_light;
}
form > div {
    display: flex;
    flex-direction: column;
}
label {
    @apply text-xl pl-2;
}
.error {
    @apply border border-red-500;
}
textarea {
    background: none;
    @apply border border-primary transition rounded-md p-4;
}
button {
    @apply p-3 px-10 border border-primary min-w-[25%] rounded-md mx-auto text-lg transition;
    @apply hover:border-primary_light hover:bg-primary_light;
}
</style>