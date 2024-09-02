#!/bin/bash

echo "Starting Chrome installation script..."
echo "Working directory: $(pwd)"
echo "Current user: $(whoami)"
echo "System information:"
uname -a

# Create a temporary directory to work in
mkdir -p /tmp/chrome
cd /tmp/chrome

# Download the Chrome zip package using the provided link
wget https://storage.googleapis.com/chrome-for-testing-public/128.0.6613.86/linux64/chrome-linux64.zip -O chrome-linux64.zip

# Extract the zip package
unzip chrome-linux64.zip

# Verify the installation
if [ -f /tmp/chrome/chrome-linux64/chrome ]; then
  echo "Chrome binary found, setting up executable permissions."
  chmod +x /tmp/chrome/chrome-linux64/chrome
else
  echo "Chrome binary not found. Exiting."
  exit 1
fi

# List the contents of the Chrome directory to verify the binary is there
ls -la /tmp/chrome/chrome-linux64/

# Make Chrome executable
chmod +x /tmp/chrome/chrome-linux64/chrome

# Set environment variable for the Chrome binary
export CHROME_BINARY_PATH="/tmp/chrome/chrome-linux64/chrome"

echo "Chrome installation script completed."
