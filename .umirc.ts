import { defineConfig } from "umi";

export default defineConfig({
  mfsu:false,
  plugins: [
        './src/features/routes.ts',
         './src/features/theme.ts',
          './src/features/compile.ts',
    ],
  npmClient: 'npm',
});
