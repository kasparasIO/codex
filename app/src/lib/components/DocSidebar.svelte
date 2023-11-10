<div class="h-full w-full border-r border-slate-700 sidebar gap-2 px-1 py-4 text-lg bg-background">
<ul class="flex flex-col gap-2">
    <li>
        <a href="/host-check/docs">Docs Home</a>
    </li>
    <li>
     <a href="/host-check/docs/intro">Introduction</a>
    </li>
    <li><a href="/host-check/docs/quick-reference">Quick references</a></li>
</ul>
</div>

<style lang="postcss">
@media (max-width: 560px) {
    .sidebar {
        display: none;
    }
}
li {
    @apply border-b border-slate-700
}
li a {
    @apply text-accent transition hover:text-accent_light;
}
</style>