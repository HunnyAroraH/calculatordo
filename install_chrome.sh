#!/bin/bash

echo "Starting Chrome installation script..."
echo "Working directory: $(pwd)"
echo "Current user: $(whoami)"
echo "System information:"
uname -a

# Create a temporary directory to work in
mkdir -p /tmp/chrome
cd /tmp/chrome

# Download the Chrome .tar.gz package
wget https://dl.google.com/linux/direct/google-chrome-stable_current_x86_64.rpm -O google-chrome-stable_current_x86_64.rpm

# Extract the .rpm package
rpm2cpio google-chrome-stable_current_x86_64.rpm | cpio -idmv

# Verify the installation
if [ -f /tmp/chrome/opt/google/chrome/chrome ]; then
  echo "Chrome binary found, setting up executable permissions."
  chmod +x /tmp/chrome/opt/google/chrome/chrome
else
  echo "Chrome binary not found. Exiting."
  exit 1
fi

# List the contents of the Chrome directory to verify the binary is there
ls -la /tmp/chrome/opt/google/chrome/

# Make Chrome executable
chmod +x /tmp/chrome/opt/google/chrome/chrome

# Set environment variable for the Chrome binary
export CHROME_BINARY_PATH="/tmp/chrome/opt/google/chrome/chrome"

echo "Chrome installation script completed."
