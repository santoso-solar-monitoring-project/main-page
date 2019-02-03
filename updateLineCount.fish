#!/usr/bin/env fish

# Call me from within `.git/hooks/pre-commit`

cd (git rev-parse --show-toplevel)

set -l line (grep -n 'File Overview' README.md);

if [ $status != 0 ]
  echo 'Expected "File Overview" somewhere in README but did not find it...'
  exit 1
end

set -l beginning (head -n (string match -r '^\d+(?=:)' $line) README.md)

string unescape $beginning > README.md

echo >>README.md
echo '[//]: # (Don\'t edit manually past this point. It will be overwritten in the pre-commit git hook.)' >>README.md
echo >>README.md

echo '```bash' >>README.md
echo '$ wc -l src/components/*/** src/utils/***'  >>README.md
wc -l src/components/*/** src/utils/*** >>README.md 2>&1 
echo '```' >>README.md
