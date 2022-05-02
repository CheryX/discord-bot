import Canvas from 'canvas';
import { getSkin } from './userProfile.js';

// Ratio between the diagonals = 1/Math.sqrt(3);
const ratio = 0.5773502691896258;

/**
 * 
 * @param {int} size 
 * @param {string} username 
 * @returns canvas
 */
async function createSkin(size, username) {

	// Create a new canvas
	let canvas = new Canvas.createCanvas(16*size, 32*(Math.sqrt(3)/3)*size);
	let ctx = canvas.getContext('2d');
	// Disable smoothing
	ctx.patternQuality = 'fast';
	
	// Import skin minecraft servers
	const skinImage = await getSkin(username)
	
	let skin = new Canvas.Image();
	skin.src = skinImage;

	// Draw the core
	let core = new Canvas.createCanvas(16*size*0.95, 0.95*32*(Math.sqrt(3)/3)*size);
	let coreCtx = core.getContext('2d');

	// Disable smoothing for the core
	coreCtx.patternQuality = 'fast';
	let scaleSize = 0.95 * size
	
	coreCtx.setTransform(1, -ratio, 1, ratio, 0, 0);
	coreCtx.drawImage(skin, 8, 0, 8, 8, -scaleSize * 4 - 1, scaleSize * 4, 8*scaleSize, 8*scaleSize + 1.5);
	
	coreCtx.fillStyle = '#00000011';
	coreCtx.fillRect(-scaleSize * 4 - 1, scaleSize * 4, 8*scaleSize, 8*scaleSize + 1.5);
	
	coreCtx.setTransform(-1, ratio, 0, 2 * ratio, 8*scaleSize * 2, 0);
	coreCtx.drawImage(skin, 8, 8, 8, 8, 0, scaleSize * 4, 8*scaleSize, 8*scaleSize);
	
	coreCtx.fillStyle = '#00000022';
	coreCtx.fillRect(0, scaleSize * 4, 8*scaleSize, 8*scaleSize);

	coreCtx.setTransform(1, ratio, 0, 2 * ratio, 0, 0);
	coreCtx.drawImage(skin, 0, 8, 8, 8, 0, scaleSize * 4, 8*scaleSize, 8*scaleSize);

	coreCtx.fillStyle = '#00000033';
	coreCtx.fillRect(0, scaleSize * 4, 8*scaleSize, 8*scaleSize);

	ctx.drawImage(core, canvas.width*0.025, canvas.height*0.025);

	// Draw the rest
	ctx.setTransform(1, -ratio, 1, ratio, 0, 0);
	ctx.drawImage(skin, 32+8, 0, 8, 8, -size * 4 - 1, size * 4, 8*size, 8*size + 1.5);

	ctx.fillStyle = '#00000011';
	ctx.fillRect(-size * 4 - 1, size * 4, 8*size, 8*size + 1.5);

	ctx.setTransform(-1, ratio, 0, 2 * ratio, 8*size * 2, 0);
	ctx.drawImage(skin, 32+8, 8, 8, 8, 0, size * 4, 8*size, 8*size);

	ctx.fillStyle = '#00000022';
	ctx.fillRect(0, size * 4, 8*size, 8*size);

	ctx.setTransform(1, ratio, 0, 2 * ratio, 0, 0);
	ctx.drawImage(skin, 32, 8, 8, 8, 0, size * 4, 8*size, 8*size);

	ctx.fillStyle = '#00000033';
	ctx.fillRect(0, size * 4, 8*size, 8*size);

	return canvas;

}

export default createSkin;


