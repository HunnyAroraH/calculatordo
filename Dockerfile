FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set the working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
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
    libgbm-dev \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# Download and install Chrome
RUN wget https://storage.googleapis.com/chrome-for-testing-public/128.0.6613.119/linux64/chrome-linux64.zip -O /tmp/chrome-linux64.zip && \
    unzip /tmp/chrome-linux64.zip -d /tmp/ && \
    mv /tmp/chrome-linux64/chrome /usr/local/bin/chrome && \
    ln -s /usr/local/bin/chrome /usr/bin/google-chrome && \
    chmod +x /usr/local/bin/chrome

# Ensure the ChromeDriver from the root directory is in the PATH
COPY ./chromedriver /usr/local/bin/chromedriver
RUN chmod +x /usr/local/bin/chromedriver

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code
COPY . /app

# Expose the port the app runs on
EXPOSE 8080

# Command to run the app
CMD ["gunicorn", "-b", "0.0.0.0:8080", "--log-level=debug", "--access-logfile", "-", "app:app"]
