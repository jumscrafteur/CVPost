<script lang="ts">
	import { onMount } from 'svelte';

	export let hexColor: string;

	const color = [
		parseInt(hexColor.substring(1, 3), 16),
		parseInt(hexColor.substring(3, 5), 16),
		parseInt(hexColor.substring(5, 7), 16)
	];

	const loadingStates = [false, false];
	let greyImageData: Uint8ClampedArray;
	let maskImageData: Uint8ClampedArray;

	let ctx: CanvasRenderingContext2D;

	const size = 1000;
	let canvas: HTMLCanvasElement;
	let bufferCanvas: HTMLCanvasElement;

	const HSLToRGB = (h: number, s: number, l: number): number[] => {
		let c = (1 - Math.abs(2 * l - 1)) * s;
		let x = c * (1 - Math.abs(((h / 60) % 2) - 1));
		let m = l - c / 2;

		let rp = 0;
		let gp = 0;
		let bp = 0;

		if (0 <= h && h < 60) {
			rp = c;
			gp = x;
			bp = 0;
		} else if (60 <= h && h < 120) {
			rp = x;
			gp = c;
			bp = 0;
		} else if (120 <= h && h < 180) {
			rp = 0;
			gp = c;
			bp = x;
		} else if (180 <= h && h < 240) {
			rp = 0;
			gp = x;
			bp = c;
		} else if (240 <= h && h < 300) {
			rp = x;
			gp = 0;
			bp = c;
		} else {
			rp = c;
			gp = 0;
			bp = x;
		}

		return [(rp + m) * 255, (gp + m) * 255, (bp + m) * 255];
	};

	const RGBToHSL = (r: number, g: number, b: number): number[] => {
		let rp = r / 255;
		let gp = g / 255;
		let bp = b / 255;

		let cMax = Math.max(rp, gp, bp);
		let cMin = Math.min(rp, gp, bp);

		let delta = cMax - cMin;

		let h = 0;

		if (delta == 0) {
			h = 0;
		} else if (cMax == rp) {
			h = 60 * ((gp - bp / delta) % 6);
		} else if (cMax == gp) {
			h = 60 * (bp - rp / delta + 2);
		} else if (cMax == bp) {
			h = 60 * (rp - gp / delta + 4);
		}

		let l = (cMax + cMin) / 2;

		let s = 0;
		if (delta != 0) {
			s = delta / (1 - Math.abs(2 * l - 1));
		}

		return [h, s, l];
	};

	const renderFinalImage = (ctx: CanvasRenderingContext2D, r: number, g: number, b: number) => {
		if (!loadingStates[0] || !loadingStates[1]) return;

		const finalImageData = new Uint8ClampedArray(size * size * 4);
		for (let i = 0; i < size * size; i++) {
			let grey = RGBToHSL(
				greyImageData[4 * i + 0],
				greyImageData[4 * i + 1],
				greyImageData[4 * i + 2]
			);

			let color = RGBToHSL(r, g, b);

			let blendedColor = HSLToRGB(color[0], color[1], grey[2]);

			let blendLevel = maskImageData[4 * i + 0] / 255;

			finalImageData.set(
				[
					blendedColor[0] * blendLevel + (1 - blendLevel) * greyImageData[4 * i + 0],
					blendedColor[1] * blendLevel + (1 - blendLevel) * greyImageData[4 * i + 1],
					blendedColor[2] * blendLevel + (1 - blendLevel) * greyImageData[4 * i + 2],
					255
				],
				4 * i
			);
		}

		// console.log(finalImageData);
		const a = new ImageData(finalImageData, size);
		ctx.putImageData(a, 0, 0);
	};

	onMount(async () => {
		const bufferCtx = bufferCanvas.getContext('2d');
		ctx = canvas.getContext('2d')!;

		if (!bufferCtx || !ctx) return;

		const greyImage = new Image();
		greyImage.src = 'grey.png';
		greyImageData = new Uint8ClampedArray();
		greyImage.onload = () => {
			loadingStates[0] = true;
			bufferCtx.fillStyle = bufferCtx.createPattern(greyImage, 'repeat')!;
			bufferCtx.fillRect(0, 0, size, size);

			greyImageData = bufferCtx.getImageData(0, 0, size, size).data;

			renderFinalImage(ctx, color[0], color[1], color[2]);
		};

		const maskImage = new Image();
		maskImage.src = 'mask.png';
		maskImageData = new Uint8ClampedArray();
		maskImage.onload = () => {
			loadingStates[1] = true;
			bufferCtx.fillStyle = bufferCtx.createPattern(maskImage, 'repeat')!;
			bufferCtx.fillRect(0, 0, size, size);

			maskImageData = bufferCtx.getImageData(0, 0, size, size).data;
			renderFinalImage(ctx, color[0], color[1], color[2]);
		};
	});

	$: renderFinalImage(ctx, color[0], color[1], color[2]);
</script>

<div>
	<!-- <img src="/photo-CV.png" alt="" /> -->
	<canvas bind:this={bufferCanvas} class="bufferCanvas" width={size} height={size} />
	<canvas bind:this={canvas} width={size} height={size} />
</div>

<style>
	div canvas {
		width: 100%;
		transform: translate(10px, -10px);
		box-shadow: -10px 10px white, -20px 20px var(--soft-grey);
	}

	div {
		margin: 2rem;
	}

	.bufferCanvas {
		display: None;
	}
</style>
