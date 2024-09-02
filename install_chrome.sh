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

# Download and extract the `chromedriver` using the provided link
wget https://storage.googleapis.com/chrome-for-testing-public/128.0.6613.86/linux64/chromedriver-linux64.zip -O chromedriver-linux64.zip
unzip chromedriver-linux64.zip -d /tmp/chrome/

# Make `chromedriver` executable
chmod +x /tmp/chrome/chromedriver-linux64/chromedriver

# Add Chrome and Chromedriver to the PATH
export PATH=$PATH:/tmp/chrome/chrome-linux64:/tmp/chrome/chromedriver-linux64

echo "Chrome and Chromedriver installation script completed."
