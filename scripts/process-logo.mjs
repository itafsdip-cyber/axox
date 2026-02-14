/**
 * One-off script: remove white background from logo and trim to content.
 * Run: node scripts/process-logo.mjs
 */
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');
const inputPath = join(publicDir, 'logo-source.png');
const outputPath = join(publicDir, 'logo.png');

const WHITE_THRESHOLD = 250; // treat RGB >= this as white

async function main() {
  const image = sharp(inputPath);
  const { data, info } = await image.raw().ensureAlpha().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const pixels = new Uint8Array(data);

  for (let i = 0; i < width * height; i++) {
    const r = pixels[i * channels + 0];
    const g = pixels[i * channels + 1];
    const b = pixels[i * channels + 2];
    if (r >= WHITE_THRESHOLD && g >= WHITE_THRESHOLD && b >= WHITE_THRESHOLD) {
      pixels[i * channels + 3] = 0;
    }
  }

  await sharp(pixels, { raw: { width, height, channels } })
    .png()
    .trim({ threshold: 2 })
    .toFile(outputPath);

  console.log('Logo written to public/logo.png (white removed, trimmed)');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
