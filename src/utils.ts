import fs from "node:fs";
import path from "node:path";
import { Logger } from "@aoitelegram/util";
import { type AoiClient, type DataFunction } from "aoitelegram";

interface PluginOptions {
  logger?: boolean;
  strictMode?: boolean;
  excludedFunctions?: string[];
  includedFunctions?: string[];
}

function parse(path: string): string {
  const args = path.split("/");
  const lastNameIndex = args.length - 1;
  const secondToLastNameIndex = args.length - 2;

  const lastName = args[lastNameIndex];
  const secondToLastName =
    args[secondToLastNameIndex] === ".aoiplugins"
      ? undefined
      : args[secondToLastNameIndex];

  return `${secondToLastName ? secondToLastName + "/" : ""}${lastName}`;
}

/**
 * Recursively reads and collects custom functions from a directory, and optionally registers them with an AoiClient.
 * @param dirPath - The directory path to search for custom functions.
 **/
function loadPluginsFunction(
  dirPath: string,
  aoitelegram: AoiClient,
  options: PluginOptions = {},
): void {
  const items = fs.readdirSync(dirPath, { recursive: true });
  for (const item of items) {
    if (typeof item !== "string" || !item.endsWith(".js")) continue;
    const itemPath = path.join(process.cwd(), item);
    try {
      const dataRequire = require(itemPath);
      let dataFunction: DataFunction | DataFunction[] =
        dataRequire.default || dataRequire;

      if (Array.isArray(options.includedFunctions)) {
        dataFunction = Array.isArray(dataFunction)
          ? dataFunction
          : [dataFunction];
        dataFunction = dataFunction.filter((func) =>
          options!.includedFunctions!.some(
            (name) => name.toLowerCase() === func?.name.toLowerCase(),
          ),
        );
      }

      if (
        !options?.includedFunctions &&
        Array.isArray(options.excludedFunctions)
      ) {
        dataFunction = Array.isArray(dataFunction)
          ? dataFunction
          : [dataFunction];
        dataFunction = dataFunction.filter(
          (func) =>
            !options!.excludedFunctions!.some(
              (name) => name.toLowerCase() === func?.name.toLowerCase(),
            ),
        );
      }

      if (options.strictMode) {
        aoitelegram.createCustomFunction(dataFunction);
      } else aoitelegram.ensureCustomFunction(dataFunction);

      if (options.logger === undefined || options.logger) {
        Logger.info(`Successfully loaded function from "${parse(dirPath)}"`);
      }
    } catch (err) {
      Logger.info(`Faild loaded function from: ${err}`);
    }
  }
}

export { loadPluginsFunction, PluginOptions };
