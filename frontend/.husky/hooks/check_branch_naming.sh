# frontend/.husky/hooks/check_branch_naming.sh

#!/usr/bin/env bash

local_branch_name="$(git rev-parse --abbrev-ref HEAD)"
valid_branch_regex='^(feature|fix|refacto)(\(back\)|\(front\)|\(devops\)|\(git\)|\(k8s\)|\(docker\)|\(deploy\)|\(aws\))/[a-zA-Z0-9\-]+$'
message="Yo 👋 !\nLe nom de la branche que essayes de push ne respecte pas le format qu'on a instauré ❌\nLe schéma attendu est le suivant : $valid_branch_regex.\n(exemple: feature(front)/create-button).\nTu peux modifier facilement le nom de ta branche avec : git branch -m <nouveau-nom>, puis push à nouveau !"

if [[ ! $local_branch_name =~ $valid_branch_regex ]]; then
  echo "$message"
  exit 1
fi

exit 0
