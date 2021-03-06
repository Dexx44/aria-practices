#!/bin/bash

if [ -z "$GH_TOKEN" ]; then
  echo "To deploy to your gh-pages branch, the GH_TOKEN needs to be defined by following https://docs.travis-ci.com/user/environment-variables/#Defining-Variables-in-Repository-Settings"
  exit 1
fi

echo 'Pushing built changes'
git config --global user.email "cooper@w3.org"
git config --global user.name "michael-n-cooper"
git config remote.origin.url "https://${GH_TOKEN}@github.com/${TRAVIS_REPO_SLUG}.git"
git commit -am "Generated by TRAVIS-CI ${TRAVIS_COMMIT}" -m "${TRAVIS_COMMIT_MESSAGE}"
git push --set-upstream origin gh-pages > /dev/null 2>&1
