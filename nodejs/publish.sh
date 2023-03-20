#!/bin/bash
version="$(npm version patch)"
git commit -asm "Update to ${version}"
git tag "${version}"
echo "git push origin ${version}"
