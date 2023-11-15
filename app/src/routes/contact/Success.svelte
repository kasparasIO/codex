<script>
    export let success = false;
</script>
{#if success}
    <div class="w-full bg-sky-700 flex flex-col gap-4 rounded-lg
    p-4 justify-center items-center text-center">
        <h2>Thank you for sending a message, I really appreciate it 🙏</h2>
        <p>I will try to respond to it, when I see it, stay tuned!</p>
    </div>
{/if}

<style lang="postcss">
    div {
        box-shadow: 7px 13px black;
        @apply border border-secondary
    }
</style>