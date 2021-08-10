<script>
	export let unit, value, selector, name;
    import {createEventDispatcher} from 'svelte'
    const dispatch = createEventDispatcher();

</script>

<style lang="scss">
	@import '../styles/mixins';

	.input-row {
		width: 100%;
		@include flex(row-reverse wrap, center, center);
		gap: 1rem 1rem;

		.input-container {
			width: auto;
			height: auto;
			display: grid;

			* {
				grid-column: 1/2;
				grid-row: 1/2;
			}

			.input-row__unit {
				position: relative;
				z-index: 5;
				align-self: center;
				justify-self: end;
				margin-right: 2rem;
			}
		}

		&__name {
			flex: 0 0 17rem;
			color: rgb(139, 200, 168);
			font-size: 1.5rem;
			letter-spacing: -0.05rem;
			text-align: center;
			transition: transform 250ms, color 250ms;
			@media screen and (min-width: 429px) {
				text-align: right;
			}
		}

		&__input {
			padding: 1.5rem 2rem;
			color: rgb(0, 231, 181);
			background: rgb(22, 22, 22);
			outline: none;
			border: none;
			font-weight: 600;
			position: relative;
			-webkit-appearance: none;
			transition: all 250ms;
            border-radius: 1rem;

			&:focus {
				background: rgb(10, 10, 10);
				color: rgb(0, 255, 200);
				transform: scale(1.15, 1.15);
			}
		}

		&__unit {
			color: rgb(139, 200, 168);
			font-size: 1.5rem;
			letter-spacing: -0.05rem;
		}
	}

	.input-row__input::after {
		&::-webkit-input-placeholder {
			position: relative;
			position: absolute;
			content: 'px';
			color: rgb(139, 200, 168);
			font-size: 1.5rem;
			letter-spacing: -0.05rem;
			right: 0;
			top: 50%;
			transform: translate(0, -50%);
		}
	}

	.input-container:focus-within ~ .input-row__name {
		transform: translate(-2rem, 0);
		color: rgb(106, 230, 166);
	}
</style>

<div class="input-row">
	<div class="input-container">
		<p class="input-row__unit">{unit}</p>
		<input type="number" class="input-row__input" id={selector} bind:value />
        
	</div>
	<label class="input-row__name" for={selector}>{name}</label>
</div>
