#!/bin/bash

# Debugging Start
echo "Starting Chrome installation script..."
echo "Working directory: $(pwd)"
echo "Current user: $(whoami)"
echo "System information:"
uname -a
echo "Environment variables:"
env

# Create a temporary directory to work in
mkdir -p /tmp/chrome
cd /tmp/chrome

# Download the Chrome .deb package
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb -O google-chrome-stable_current_amd64.deb

# Install dependencies
apt-get update
apt-get install -y wget unzip xvfb libxi6 libgconf-2-4

# Extract and install the Chrome .deb package
dpkg -i google-chrome-stable_current_amd64.deb || apt-get install -yf

# Verify installation
if [ -f /usr/bin/google-chrome ]; then
  echo "Chrome installation successful."
else
  echo "Chrome installation failed."
  exit 1
fi

# Make Chrome executable
chmod +x /usr/bin/google-chrome

# Clean up
rm -rf /tmp/chrome

# Final check
google-chrome --version
echo "Chrome installation script completed."
