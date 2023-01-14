import { NextConfig } from "next";
import { Compilation, Compiler, sources } from "webpack";

class BuilderWebpackPlugin {
  apply(compiler: Compiler) {
    const pluginName = this.constructor.name;

    compiler.hooks.compilation.tap(pluginName, (compilation: Compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: pluginName,
          stage: Compilation.PROCESS_ASSETS_STAGE_DEV_TOOLING,
        },
        (assets) => {
          const assetNames = Object.keys(assets);
          assetNames.forEach((assetPath) => {
            const asset = assets[assetPath];
            if (!asset) return;

            const source = asset.source();
            assets[assetPath] = new sources.RawSource(
              source?.toString()?.replace(/\/_next\//g, "/")
            );
          });
        }
      );
    });
  }
}

export const withBuilder = (nextConfig: NextConfig): NextConfig => {
  return {
    ...nextConfig,
    distDir: "build/temp",
    webpack: (config, { dev }) => {
      if (!dev) {
        config.plugins.push(new BuilderWebpackPlugin());
      }

      return config;
    },
  };
};
