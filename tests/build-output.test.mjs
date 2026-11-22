import assert from 'node:assert/strict';
import { existsSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import test from 'node:test';

const projectRoot = new URL('../', import.meta.url);
const dist = new URL('../dist/', import.meta.url);

test('el build publica el sitio y excluye archivos internos', () => {
  rmSync(dist, { recursive: true, force: true });

  const result = spawnSync(process.execPath, ['scripts/build-static.mjs'], {
    cwd: projectRoot,
    encoding: 'utf8',
  });

  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.equal(existsSync(new URL('index.html', dist)), true);
  assert.equal(existsSync(new URL('CNAME', dist)), true);
  assert.equal(existsSync(new URL('directorio/index.html', dist)), true);

  for (const internalPath of [
    '.git',
    '.github',
    'scripts',
    'tests',
    'LICENSE.txt',
    'package.json',
    'package-lock.json',
  ]) {
    assert.equal(
      existsSync(new URL(internalPath, dist)),
      false,
      `${internalPath} no debe formar parte del artefacto público`,
    );
  }
});
