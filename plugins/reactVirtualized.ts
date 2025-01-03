import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { PluginOption } from 'vite';

export function reactVirtualized(): PluginOption {
    const WRONG_CODE = `import { bpfrpt_proptype_WindowScroller } from "../WindowScroller.js";`;

    return {
      name: 'my:react-virtualized',
      async configResolved() {
        const reactVirtualizedPath = path.dirname(
          fileURLToPath(await import.meta.resolve('react-virtualized'))
        );

        const brokenFilePath = path.join(
          reactVirtualizedPath,
          '..', // back to dist
          'es',
          'WindowScroller',
          'utils',
          'onScroll.js'
        );
        const brokenCode = await readFile(brokenFilePath, 'utf-8');

        const fixedCode = brokenCode.replace(WRONG_CODE, '');
        await writeFile(brokenFilePath, fixedCode);
      },
    };
  }
