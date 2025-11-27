<script>
	import Header from '../header/header.svelte';

</script>

<div class="bg-white">
	<main class="mx-auto max-w-7xl px-4">
		<div
			class="flex items-baseline justify-between border-b border-gray-200 pt-2 pb-6"
		>
			<h1 class="text-4xl font-bold tracking-tight text-gray-900">
				threejs案例
			</h1>
		</div>
		<section aria-labelledby="products-heading" class="pt-6 pb-24">
			<h2 id="products-heading" class="sr-only">初始化</h2>
			<div class="grid gap-x-8 gap-y-10 grid-cols-4">
				<div class="block">
					<Header />
				</div>
				<div class="col-span-3">
                    <slot></slot>
				</div>
			</div>
		</section>
	</main>
</div>
