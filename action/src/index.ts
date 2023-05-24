import * as artifact from "@actions/artifact";
import * as core from "@actions/core";
import * as crypto from "crypto";
import * as fs from "fs";

async function run() {
  // Write and upload the artifact file.
  const filename = "foo";
  const filedata = "somedata";

  fs.writeFileSync(filename, filedata);

  const artifactClient = artifact.create();
  const uploadResponse = await artifactClient.uploadArtifact(
    filename, // artifact name
    [filename], // file name
    "."
  );

  if (uploadResponse.failedItems.length > 0) {
    core.setFailed(
      `An error was encountered when uploading ${uploadResponse.artifactName}. There were ${uploadResponse.failedItems.length} items that failed to upload.`
    );
  } else {
    core.info(
      `Artifact ${uploadResponse.artifactName} has been successfully uploaded!`
    );
  }

  // generate the layout

  const path = core.getInput("slsa-layout-file");
  const hash = crypto.createHash("sha256").update(filedata).digest("hex");

  const slsaLayout = {
    version: 1,
    attestations: [
      {
        name: filename + ".intoto",
        subjects: [
          {
            name: filename,
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
