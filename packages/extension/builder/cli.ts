import { execSync } from "child_process";
import { chromium } from "playwright";
import fs from "fs";
import sharp from "sharp";
import archiver from "archiver";

export default async () => {
  execSync("next build", { stdio: "ignore" });
  execSync("next export -o build/dist", { stdio: "ignore" });

  fs.readdirSync("build/dist/_next").forEach((file) => {
    fs.renameSync(`build/dist/_next/${file}`, `build/dist/${file}`);
  });

  fs.readdirSync("build/dist").forEach((file) => {
    if (
      fs.statSync(`build/dist/${file}`).isDirectory() &&
      fs.readdirSync(`build/dist/${file}`).length === 0
    ) {
      fs.rmdirSync(`build/dist/${file}`);
    }
  });

  let root = process.cwd();
  while (!fs.existsSync(`${root}/.git`)) {
    root = root.substring(0, root.lastIndexOf("/"));
  }

  const packageJson = JSON.parse(
    fs.readFileSync(`${root}/package.json`, "utf8")
  );
  const iconSizes = [16, 32, 48, 64, 128, 256, 512];

  fs.writeFileSync(
    "build/dist/manifest.json",
    JSON.stringify({
      manifest_version: 3,
      name: (packageJson.name as string)
        .split("_")
        .map((s) => s[0]?.toUpperCase() + s.slice(1))
        .join(" "),
      version: packageJson.version,
      description: packageJson.description,
      icons: iconSizes.reduce((acc, size) => {
        acc[size] = `icon-${size}.png`;
        return acc;
      }, {} as Record<number, string>),
      chrome_url_overrides: {
        newtab: "index.html",
      },
    })
  );

  await Promise.all(
    iconSizes.map((size) =>
      sharp(`./icon.png`).resize(size).toFile(`build/dist/icon-${size}.png`)
    )
  );

  const temp = fs.mkdtempSync("playwright-extension");
  const browser = await chromium.launchPersistentContext(temp, {
    headless: false,
    args: [
      `--disable-extensions-except=${process.cwd()}/build/dist`,
      `--load-extension=${process.cwd()}/build/dist`,
    ],
  });
  const page = await browser.newPage();
  await page.goto("chrome://newtab");
  await page.waitForTimeout(3000);

  await page.setViewportSize({ width: 1280, height: 800 });
  await page.screenshot({ path: "build/screenshot.png" });

  await page.setViewportSize({ width: 1400, height: 560 });
  await page.screenshot({ path: "build/marquee_promo_tiles.png" });

  await browser.close();
  fs.rmSync(temp, { recursive: true, force: true });

  await sharp("build/screenshot.png")
    .extract({
      left: 1280 / 2 - 440 / 2,
      top: 800 / 2 - 280 / 2,
      width: 440,
      height: 280,
    })
    .toFile("build/promo_tile.png");

  const output = fs.createWriteStream(`build/${packageJson.name}.zip`);
  const archive = archiver("zip", { zlib: { level: 9 } });
  archive.pipe(output);
  archive.directory("build/dist", false);
  await archive.finalize();
};
