# import os
# import platform
# import subprocess
# import stat
# import requests
# from flask import Flask, render_template, request, jsonify
# from selenium import webdriver
# from selenium.webdriver.chrome.service import Service as ChromeService
# from selenium.webdriver.common.by import By
# from selenium.webdriver.support.ui import WebDriverWait
# from selenium.webdriver.support import expected_conditions as EC
# import concurrent.futures
# from flask_cors import CORS
# import logging

# app = Flask(__name__)
# CORS(app, resources={r"/*": {"origins": "*"}})

# # Setup logging
# logging.basicConfig(level=logging.INFO)
# logger = logging.getLogger(__name__)

# # Determine the platform and set paths accordingly
# if platform.system() == "Windows":
#     chromedriver_path = "./chromedriver.exe"  # Windows path
#     chrome_binary_path = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"  # Default Chrome installation path on Windows
# else:
#     chromedriver_path = "/usr/local/bin/chromedriver"  # Linux path
#     chrome_binary_path = "/usr/bin/google-chrome"  # Path after installing Chrome on Linux

#     # Ensure chromedriver has executable permissions on Linux
#     if os.path.exists(chromedriver_path):
#         os.chmod(chromedriver_path, 0o755)
#     else:
#         logger.error(f"ChromeDriver not found at {chromedriver_path}")
#         raise Exception(f"ChromeDriver not found at {chromedriver_path}")

# # Set the PATH environment variable to include the directory with chromedriver
# os.environ["PATH"] += os.pathsep + os.getcwd()

# @app.route("/")
# def index():
#     return render_template('index.html')

# @app.route("/chrome-version")
# def chrome_version():
#     try:
#         # Execute the command to get Chrome version
#         result = subprocess.run([chrome_binary_path, "--version"], capture_output=True, text=True)
#         logger.info(f"Chrome version: {result.stdout.strip()}")
#         return jsonify({"chrome_version": result.stdout.strip()})
#     except Exception as e:
#         logger.error(f"Error fetching Chrome version: {e}")
#         return jsonify({"error": str(e)}), 500

# def fetch_shop_now_link(service_link):
#     logger.info(f"Starting fetch for: {service_link}")
#     options = webdriver.ChromeOptions()
#     options.add_argument('--headless') 
#     options.add_argument('--no-sandbox')
#     options.add_argument('--disable-dev-shm-usage')
#     options.add_argument('--disable-gpu')
#     options.add_argument('--remote-debugging-port=9222')
#     options.add_argument('--window-size=1920x1080')
#     options.binary_location = chrome_binary_path  # Set the Chrome binary path

#     service = ChromeService(executable_path=chromedriver_path)
#     driver = webdriver.Chrome(service=service, options=options)

#     try:
#         driver.get(service_link)
#         logger.info(f"Page loaded for service link: {service_link}")

#         shop_now_button = WebDriverWait(driver, 10).until(
#             EC.element_to_be_clickable(
#                 (By.XPATH, '/html/body/div[2]/div/div/section/div/div/div/div/div/div[5]/section/div/div/div/div[2]/a'))
#         )
#         link = shop_now_button.get_attribute('href')
#         logger.info(f"Found 'Shop Now' link: {link} for service link: {service_link}")
#         return link
#     except Exception as e:
#         logger.error(f"Error finding 'Shop Now' link on {service_link}: {e}")
#         return 'No "Shop Now" link found.'
#     finally:
#         driver.quit()
#         logger.info(f"Finished fetch for: {service_link}")

# @app.route('/scrape-links', methods=['POST', 'OPTIONS'])
# def scrape_links():
#     if request.method == 'OPTIONS':
#         response = jsonify({'status': 'preflight check'})
#         response.headers.add("Access-Control-Allow-Origin", "*")
#         response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
#         response.headers.add("Access-Control-Allow-Headers", "Content-Type")
#         return response, 200

#     try:
#         data = request.get_json()
#         ibo_number = data.get('iboNumber')
#         logger.info(f"Received IBO number: {ibo_number}")

#         options = webdriver.ChromeOptions()
#         options.add_argument('--headless')
#         options.add_argument('--no-sandbox')
#         options.add_argument('--disable-dev-shm-usage')
#         options.add_argument('--disable-gpu')
#         options.add_argument("--start-maximized")
#         options.add_argument('--remote-debugging-port=9230')
#         options.add_argument('--window-size=1920x1080')
#         options.binary_location = chrome_binary_path  # Set the Chrome binary path

#         service = ChromeService(executable_path=chromedriver_path)
#         driver = webdriver.Chrome(service=service, options=options)

#         base_url = f"https://{ibo_number}.acnibo.com/us-en/services"
#         logger.info(f"Navigating to {base_url}")
#         driver.get(base_url)

#         WebDriverWait(driver, 10).until(
#             EC.presence_of_element_located((By.CSS_SELECTOR, '.serviceContainer a'))
#         )

#         service_links = [element.get_attribute('href') for element in
#                          driver.find_elements(By.CSS_SELECTOR, '.serviceContainer a')]
#         logger.info(f"Found {len(service_links)} service links.")
#         driver.stop_client()
#         driver.close()
#         driver.quit()
#         service.stop()

#         with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
#             shop_now_links = list(executor.map(fetch_shop_now_link, service_links))

#         logger.info(f"Generated Shop Now Links: {shop_now_links}")

#         response = jsonify({'links': shop_now_links})
#         response.headers.add("Access-Control-Allow-Origin", "*")
#         return response

#     except Exception as e:
#         logger.error(f"An error occurred: {e}")
#         response = jsonify({'error': 'An error occurred'})
#         response.headers.add("Access-Control-Allow-Origin", "*")
#         return response, 500

# if __name__ == '__main__':
#     app.run(debug=True)

import os
import platform
import json
from flask_cors import CORS
from flask import Flask, render_template, request, jsonify
from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import psutil
import logging
import time

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Determine the platform and set paths accordingly
if platform.system() == "Windows":
    chromedriver_path = "./chromedriver.exe"
    chrome_binary_path = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
else:
    chromedriver_path = "/usr/local/bin/chromedriver"
    chrome_binary_path = "/usr/bin/google-chrome"

# Set the PATH environment variable to include the directory with chromedriver
os.environ["PATH"] += os.pathsep + os.getcwd()

@app.route("/")
def index():
    return render_template('index.html')

def kill_processes():
    for process in psutil.process_iter(['pid', 'name']):
        if process.info['name'] in ['chromedriver', 'chrome', 'chrome.exe']:
            os.kill(process.info['pid'], 9)

def fetch_service_links(ibo_number, max_retries=3):
    retry_count = 0
    service_links = []
    while retry_count < max_retries:
        try:
            options = webdriver.ChromeOptions()
            options.add_argument('--headless')
            options.add_argument('--no-sandbox')
            options.add_argument('--disable-dev-shm-usage')
            options.add_argument('--disable-gpu')
            options.binary_location = chrome_binary_path

            service = ChromeService(executable_path=chromedriver_path)
            driver = webdriver.Chrome(service=service, options=options)

            base_url = f"https://{ibo_number}.acnibo.com/us-en/services"
            logger.info(f"Navigating to {base_url}")
            driver.get(base_url)

            WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, '.serviceContainer a'))
            )

            service_links = [element.get_attribute('href') for element in driver.find_elements(By.CSS_SELECTOR, '.serviceContainer a')]
            logger.info(f"Found {len(service_links)} service links.")

            # Save service links to a JSON file
            json_filename = f"service_links_{ibo_number}.json"
            with open(json_filename, 'w') as f:
                json.dump(service_links, f)
            logger.info(f"Service links saved to {json_filename}")

            driver.quit()
            service.stop()

            return service_links

        except Exception as e:
            logger.error(f"Error during fetching service links: {e}")
            retry_count += 1
            time.sleep(2)  # wait before retrying

        finally:
            kill_processes()  # Ensure all processes are killed even if an error occurs

    logger.error(f"Failed to fetch service links after {max_retries} attempts")
    return []

@app.route('/scrape-service-links', methods=['POST'])
def scrape_service_links():
    try:
        data = request.get_json()
        ibo_number = data.get('iboNumber')
        logger.info(f"Received IBO number: {ibo_number}")

        service_links = fetch_service_links(ibo_number)

        if not service_links:
            return jsonify({'error': 'Failed to fetch service links after multiple attempts'}), 500

        return jsonify({'service_links': service_links})

    except Exception as e:
        logger.error(f"An error occurred: {e}")
        kill_processes()  # Ensure processes are killed even in case of error
        return jsonify({'error': 'An error occurred'}), 500

@app.route('/scrape-shop-links', methods=['POST'])
def scrape_shop_links():
    try:
        data = request.get_json()
        ibo_number = data.get('iboNumber')

        # Load service links from the JSON file
        json_filename = f"service_links_{ibo_number}.json"
        with open(json_filename, 'r') as f:
            service_links = json.load(f)
        
        shop_links = []

        for service_link in service_links:
            retry_count = 0
            while retry_count < 3:
                try:
                    options = webdriver.ChromeOptions()
                    options.add_argument('--headless')
                    options.add_argument('--no-sandbox')
                    options.add_argument('--disable-dev-shm-usage')
                    options.add_argument('--disable-gpu')
                    options.binary_location = chrome_binary_path

                    service = ChromeService(executable_path=chromedriver_path)
                    driver = webdriver.Chrome(service=service, options=options)

                    logger.info(f"Fetching Shop Now link for: {service_link}")
                    driver.get(service_link)

                    shop_now_button = WebDriverWait(driver, 10).until(
                        EC.element_to_be_clickable(
                            (By.XPATH, '/html/body/div[2]/div/div/section/div/div/div/div/div/div[5]/section/div/div/div/div[2]/a')
                        )
                    )
                    shop_link = shop_now_button.get_attribute('href')
                    logger.info(f"Found 'Shop Now' link: {shop_link}")
                    shop_links.append(shop_link)
                    break  # exit the retry loop on success

                except Exception as e:
                    logger.error(f"Error during fetching shop link: {e}")
                    retry_count += 1
                    time.sleep(2)  # wait before retrying

                finally:
                    driver.quit()
                    kill_processes()  # Ensure all processes are killed even if an error occurs

        return jsonify({'shop_links': shop_links})

    except Exception as e:
        logger.error(f"An error occurred: {e}")
        kill_processes()  # Ensure processes are killed even in case of error
        return jsonify({'error': 'An error occurred'}), 500

if __name__ == '__main__':
    app.run(debug=True)