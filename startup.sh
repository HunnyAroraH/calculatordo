#!/bin/bash

# Install Chrome dependencies
apt-get update && apt-get install -y \
    wget \
    unzip \
    curl \
    gnupg \
    apt-transport-https \
    ca-certificates \
    libnss3 \
    libxss1 \
    libappindicator1 \
    fonts-liberation \
    libasound2 \
    xdg-utils \
    libgbm-dev

# Download and install Chrome
wget https://storage.googleapis.com/chrome-for-testing-public/128.0.6613.119/linux64/chrome-linux64.zip -O /tmp/chrome-linux64.zip
unzip /tmp/chrome-linux64.zip -d /tmp/
mv /tmp/chrome-linux64/chrome /usr/local/bin/chrome
chmod +x /usr/local/bin/chrome

# Ensure ChromeDriver is executable
chmod +x /home/site/wwwroot/chromedriver

# Start the Flask application
gunicorn -b 0.0.0.0:8000 app:app
