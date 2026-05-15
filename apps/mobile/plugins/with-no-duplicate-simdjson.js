const { withDangerousMod } = require("@expo/config-plugins");
const fs = require("fs/promises");
const path = require("path");

const SIMdJSON_POD_LINE =
  /[ \t]*pod 'simdjson', path: File\.join\(File\.dirname\(`node --print "require\.resolve\('@nozbe\/simdjson\/package\.json'\)"`\)\), :modular_headers => true[ \t]*\n*/g;

module.exports = function withNoDuplicateSimdjson(config) {
  return withDangerousMod(config, [
    "ios",
    async (config) => {
      const podfilePath = path.join(config.modRequest.platformProjectRoot, "Podfile");
      const contents = await fs.readFile(podfilePath, "utf8");
      const updatedContents = contents.replace(SIMdJSON_POD_LINE, "");

      await fs.writeFile(podfilePath, updatedContents);
      return config;
    },
  ]);
};
