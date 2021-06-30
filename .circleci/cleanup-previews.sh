#!/bin/bash
ALL_BRANCHES=`git branch -r | sed 's/ *origin\///' | egrep -v "(^\*|master|dev)"`
# echo $ALL_BRANCHES
PREVIEWS=`aws s3 ls s3://cg-bac30f8a-d25a-4aa8-9830-d321bd1a8185/sites/`
# echo $PREVIEWS

for PREVIEW in $PREVIEWS
do
  if [[ $PREVIEW != "PRE" ]]; then
    if [[ $ALL_BRANCHES != *${PREVIEW%?}* ]]; then
      echo "Deleting: $PREVIEW"
      aws s3 rm --recursive "s3://cg-bac30f8a-d25a-4aa8-9830-d321bd1a8185/sites/$PREVIEW"
    fi
  fi
done
exit 0