#!/bin/sh

# Call me from within `.git/hooks/pre-commit`

cd $(git rev-parse --show-toplevel)

line="$(grep -n 'File Overview' README.md)"

if [ $? -ne 0 ]
then
  echo 'Expected "File Overview" somewhere in README but did not find it...'
  exit 1
fi

# Stash unstaged changes
git stash -q --keep-index

# Editing README.md
buffer=$(mktemp)

head -n $(echo $line | sed -n 's/:.*//p') README.md > ${buffer}

echo >>${buffer}
echo "[//]: # (Don't edit manually past this point. It will be overwritten in the pre-commit git hook.)" >>${buffer}
echo >>${buffer}

echo '```bash' >>${buffer}
echo '$ wc -l src/components/*/** src/utils/**/* src/utils/*'  >>${buffer}
wc -l src/components/*/** src/utils/**/* src/utils/* >>${buffer} 2>&1 
echo '```' >>${buffer}

# Stage updated README.md
git add -u

# Re-apply original unstaged changes
git stash pop -q

# Replace README
mv $buffer README.md
git add README.md

# Follwed tips from https://stackoverflow.com/a/26911078/3624264
