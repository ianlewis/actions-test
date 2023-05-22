import * as core from "@actions/core";
import * as crypto from "crypto";
import * as fs from "fs";

function run() {
  const path = core.getInput("slsa-layout-file");
  const hash = crypto.createHash("sha256").update("somedata").digest("hex");

  const slsaLayout = {
    version: 1,
    attestations: [
      {
        name: "foo.intoto",
        subjects: [
          {
            name: "foo",
            digest: {
              sha256: hash,
            },
          },
        ],
      },
    ],
  };

  fs.writeFileSync(path, JSON.stringify(slsaLayout));
}

run();
