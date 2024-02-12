#!/bin/bash
version="$(npm version patch)"
git commit -asm "Update to ${version}" >/dev/null
git tag "${version}" >/dev/null
git push origin main ${version}
