#!/bin/bash
version="$(npm version patch)"
git tag "${version}"
git push origin "${version}"
