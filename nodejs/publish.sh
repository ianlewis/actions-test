#!/bin/bash
version="$(npm version patch)"
git commit -asm "Update to ${version}" >/dev/null
git tag "${version}" >/dev/null
echo "git push origin main ${version}"
