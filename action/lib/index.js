"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const artifact = __importStar(require("@actions/artifact"));
const core = __importStar(require("@actions/core"));
const crypto = __importStar(require("crypto"));
const fs = __importStar(require("fs"));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        // Write and upload the artifact file.
        const filename = "foo";
        const filedata = "somedata";
        fs.writeFileSync(filename, filedata);
        const artifactClient = artifact.create();
        const uploadResponse = yield artifactClient.uploadArtifact(filename, // artifact name
        [filename], // file name
        ".");
        if (uploadResponse.failedItems.length > 0) {
            core.setFailed(`An error was encountered when uploading ${uploadResponse.artifactName}. There were ${uploadResponse.failedItems.length} items that failed to upload.`);
        }
        else {
            core.info(`Artifact ${uploadResponse.artifactName} has been successfully uploaded!`);
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
    });
}
run();
