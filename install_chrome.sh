#!/bin/bash

echo "Starting Chrome installation script..."
echo "Working directory: $(pwd)"
echo "Current user: $(whoami)"
echo "System information:"
uname -a

# Create a temporary directory to work in
mkdir -p /tmp/chrome
cd /tmp/chrome

# Download the Chrome zip package
wget https://storage.googleapis.com/chrome-for-testing-public/128.0.6613.86/linux64/chrome-linux64.zip -O chrome-linux64.zip

# Extract the Chrome zip package
unzip chrome-linux64.zip

# Verify the Chrome installation
if [ -f /tmp/chrome/chrome-linux64/chrome ]; then
  echo "Chrome binary found, setting up executable permissions."
  chmod +x /tmp/chrome/chrome-linux64/chrome
else
  echo "Chrome binary not found. Exiting."
  exit 1
fi

# Ensure chromedriver in the root directory has the correct permissions
if [ -f ./chromedriver ]; then
  echo "Chromedriver found in the root directory, setting up executable permissions."
  chmod +x ./chromedriver
else
  echo "Chromedriver not found in the root directory. Exiting."
  exit 1
fi

echo "Chrome installation script completed."
