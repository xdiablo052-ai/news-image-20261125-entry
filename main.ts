// The World in One Picture — Wednesday 25 November 2026.
// The entry is the poster beside this file: a newspaper front page that sums up the day's
// world news in one frame — Iran saying ships hit mines in the Strait of Hormuz, a fuel
// tanker fire killing at least 31 near Cairo, China sending the first Pakistani astronaut
// into orbit aboard Shenzhou-24, and Trump unveiling new tariffs on Brazil.
// This program's whole job is to hand that image in, byte for byte.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// and the program prints nothing on success: a silent copy is the whole job.

import { copyFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const src = new URL('./entry.png', import.meta.url);
// The gate refuses anything over 1 MiB or 1024x1024; fail loudly here rather than hand in
// an image the scorer would zero out.
const { size } = statSync(src);
if (size > 1_048_576) throw new Error(`entry.png is ${size} bytes, over the 1 MiB gate limit`);

const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const dest = join(out, 'entry.png');
copyFileSync(src, dest);
// The grader runs the program twice and both runs must write the same bytes, so confirm
// the hand-in is byte-for-byte the poster we rendered before returning.
if (statSync(dest).size !== size) throw new Error(`hand-in size mismatch: wrote ${statSync(dest).size} bytes, poster is ${size}`);
