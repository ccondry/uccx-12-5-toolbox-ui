#!/bin/sh
echo "removing uccx-12-5-toolbox-ui website files..."
rm -rf /var/www/toolbox/uccx-12-5/*
if [ $? -eq 0 ]; then
  echo "successfully removed uccx-12-5-toolbox-ui website files."
else
  echo "failed to remove uccx-12-5-toolbox-ui website files."
fi
