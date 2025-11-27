<script>
	const menus = [
		{
			name: "index",
			url: "/",
		},
		{
			name: "about",
			url: "/about",
		},
		{
			name: "home",
			url: "/home",
		},
	];
</script>

<ul
	role="list"
	class="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
>

	{#each menus as menu}
		<li><a href="{menu.url}">{menu.name}</a></li>
	{/each}
	
</ul>
