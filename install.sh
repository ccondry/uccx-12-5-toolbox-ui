#!/bin/sh
echo "running yarn"
yarn
if [ $? -eq 0 ]; then
  echo "running yarn build..."
  yarn build
  while [ $? != 0 ]
  do
    echo "failed to build uccx-12-5-toolbox-ui website files. trying again..."
    yarn build
  done
  echo "yarn build successful. copying dist files to www folder..."
  mkdir -p /var/www/html/uccx-12-5-toolbox-ui
  cp -rf dist/* /var/www/html/uccx-12-5-toolbox-ui/
  if [ $? -eq 0 ]; then
    echo "successfully installed uccx-12-5-toolbox-ui website files"
  else
    echo "failed to install uccx-12-5-toolbox-ui website files"
  fi
else
  echo "yarn failed"
fi
