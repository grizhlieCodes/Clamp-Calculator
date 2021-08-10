<script>
	import InputRow from '$lib/InputRow.svelte';

	let minVWObject = {
		unit: 'px',
		selector: 'min-viewport-width',
		name: 'Min Viewport Width'
	};
	let maxVWObject = {
		unit: 'px',
		selector: 'max-viewport-width',
		name: 'Max Viewport Width'
	};
	let minSizeObject = {
		unit: 'rem',
		selector: 'min-size',
		name: 'Min Size'
	};
	let maxSizeObject = {
		unit: 'rem',
		selector: 'max-size',
		name: 'Max Size'
	};
	let oneRemObject = {
		unit: 'px',
		selector: 'one-rem',
		name: '1 - rem'
	};

	let minViewportWidth = 375,
		maxViewportWidth = 900,
		minSize = 2,
		maxSize = 4,
		oneRem = 10;

	$: minWidth = minViewportWidth / oneRem;
	$: maxWidth = maxViewportWidth / oneRem;
	$: slope = (maxSize - minSize) / (maxWidth - minWidth);
	$: yAxisIntersection = -minWidth * slope + minSize;
	$: vwUnits = slope * 100;

	const copyToClipboard = (e) => {
		let target = e.target;
		let textContent = target.textContent;
		navigator.clipboard.writeText(textContent);
        copiedToClipboard = true;
	};

	let copiedToClipboard = false;
</script>

<style lang="scss">
	@import '../styles/mixins';

	.clamp-calculator-container {
		$padding: calc(1.2857rem + 1.9048vw);
		padding: clamp(2rem, $padding, 3rem);
		width: 100%;
		@include flex(column nowrap, start, center);
		gap: 3rem;

		.calculator {
			width: 100%;
		}
	}

	.inputs {
		@include flex(column nowrap, start, start);
		gap: 2.5rem;
	}

	.clamp-calc-result {
		width: auto;
		text-align: center;

		.result {
			padding: 2rem 3rem;
			font-size: 2rem;
			font-weight: 700;
			color: rgb(0, 255, 200);
			background: rgb(12, 12, 12);
			line-height: 3rem;
			border-radius: 2rem;
			cursor: pointer;
			margin-bottom: 2rem;

			&:hover,
			&:focus {
				background: rgb(0, 255, 229);
				color: black;
				outline: none;
			}
		}
	}

    .result:hover ~ .popup, .result:focus ~ .popup {
        opacity: 1;
        transform: translate(0,0) scale(1,1);
    }

	.popup {
        pointer-events: none;
		@include flex(column nowrap, center, center);
		opacity: 0;
        transform: translate(0, 10rem) scale(0.5, 0.5);
        position: relative;
        transition: opacity 250ms, transform 250ms;

		.triangle {
			width: 0;
			height: 0;
			border-left: 1rem solid transparent;
			border-right: 1rem solid transparent;
			border-bottom: 1rem solid rgb(14, 14, 14);
		}
		.container {
			background: rgb(14, 14, 14);
			color: rgb(0, 255, 200);
			padding: 2rem 3rem;
			font-size: 1.5rem;
		}
	}
</style>

<div class="clamp-calculator-container">
	<div class="calculator">
		<div class="inputs">
			<InputRow {...minVWObject} bind:value={minViewportWidth} />
			<InputRow {...maxVWObject} bind:value={maxViewportWidth} />
			<InputRow {...minSizeObject} bind:value={minSize} />
			<InputRow {...maxSizeObject} bind:value={maxSize} />
			<InputRow {...oneRemObject} bind:value={oneRem} />
		</div>
	</div>

	<div class="clamp-calc-result">
		<p on:click={copyToClipboard} class="result" tabindex="0" on:keydown={copyToClipboard}>
			clamp({minSize}rem, {yAxisIntersection.toFixed(4)}rem + {vwUnits.toFixed(4)}vw, {maxSize}rem);
		</p>
		<div class="popup">
			<div class="triangle" />
			<div class="container">
				{#if copiedToClipboard}
					<p>👍 Copied successfully 😁</p>
				{:else}
					<p>👆 Copy to clipboard</p>
				{/if}
			</div>
		</div>
	</div>

</div>
