import { readFile } from 'node:fs/promises';

const css = await readFile(new URL('../css/editorial.css', import.meta.url), 'utf8');
const fontFaces = css.match(/@font-face\s*\{[^}]*\}/g) ?? [];

if (fontFaces.length === 0) {
  throw new Error('Se esperaba al menos una declaración @font-face.');
}

if (fontFaces.some((fontFace) => !/font-display:\s*optional\s*;/.test(fontFace))) {
  throw new Error('Las fuentes deben usar font-display: optional para evitar un intercambio tardío que provoque CLS.');
}

console.log(`OK: ${fontFaces.length} fuentes usan una carga sin intercambio tardío.`);
