const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");

const replacementBlock = `if (typeof Object.assign !== 'function') {
  Object.assign = function assign (target) {
    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object')
    }

    var output = Object(target)

    for (var index = 1; index < arguments.length; index++) {
      var source = arguments[index]
      if (source == null) {
        continue
      }

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          output[key] = source[key]
        }
      }
    }

    return output
  }
}`;

const targetFiles = [
  {
    relativePath: "node_modules/spdy/lib/spdy/agent.js",
    oldBlock: `Object.assign = process.versions.modules >= 46
  ? Object.assign // eslint-disable-next-line
  : util._extend`,
  },
  {
    relativePath: "node_modules/spdy/lib/spdy/server.js",
    oldBlock: `Object.assign = process.versions.modules >= 46
  ? Object.assign // eslint-disable-next-line
  : util._extend`,
  },
  {
    relativePath: "node_modules/spdy-transport/lib/spdy-transport/utils.js",
    oldBlock: `Object.assign = (process.versions.modules >= 46 || !isNode)
  ? Object.assign // eslint-disable-next-line
  : util._extend`,
  },
];

let patchedCount = 0;

for (const target of targetFiles) {
  const absolutePath = path.join(rootDir, target.relativePath);

  if (!fs.existsSync(absolutePath)) {
    continue;
  }

  const fileContent = fs.readFileSync(absolutePath, "utf8");

  if (fileContent.includes(replacementBlock)) {
    continue;
  }

  if (!fileContent.includes(target.oldBlock)) {
    continue;
  }

  const nextContent = fileContent.replace(target.oldBlock, replacementBlock);
  fs.writeFileSync(absolutePath, nextContent, "utf8");
  patchedCount += 1;
}

if (patchedCount > 0) {
  console.log(`[fix-spdy-deprecation] patched ${patchedCount} file(s)`);
} else {
  console.log("[fix-spdy-deprecation] no changes needed");
}
