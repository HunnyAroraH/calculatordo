from flask import Flask, render_template, request, jsonify
from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import concurrent.futures
from flask_cors import CORS
import time

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow requests from any origin

@app.route("/")
def index():
    return render_template('index.html')

def fetch_shop_now_link(service_link):
    print(f"Starting fetch for: {service_link}")
    options = webdriver.ChromeOptions()
    options.add_argument('--headless')
    driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()), options=options)

    try:
        driver.get(service_link)
        print(f"Page loaded for service link: {service_link}")

        shop_now_button = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable(
                (By.XPATH, '/html/body/div[2]/div/div/section/div/div/div/div/div/div[5]/section/div/div/div/div[2]/a'))
        )
        link = shop_now_button.get_attribute('href')
        print(f"Found 'Shop Now' link: {link} for service link: {service_link}")
        return link
    except Exception as e:
        print(f"Error finding 'Shop Now' link on {service_link}: {e}")
        return 'No "Shop Now" link found.'
    finally:
        driver.quit()
        print(f"Finished fetch for: {service_link}")

@app.route('/scrape-links', methods=['POST', 'OPTIONS'])
def scrape_links():
    if request.method == 'OPTIONS':
        response = jsonify({'status': 'preflight check'})
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type")
        return response, 200

    try:
        data = request.get_json()
        ibo_number = data.get('iboNumber')

        options = webdriver.ChromeOptions()
        options.add_argument('--headless')
        driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()), options=options)

        base_url = f"https://{ibo_number}.acnibo.com/us-en/services"
        print(f"Navigating to {base_url}")
        driver.get(base_url)

        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, '.serviceContainer a'))
        )

        service_links = [element.get_attribute('href') for element in
                         driver.find_elements(By.CSS_SELECTOR, '.serviceContainer a')]
        print(f"Found {len(service_links)} service links.")
        driver.quit()

        with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
            shop_now_links = list(executor.map(fetch_shop_now_link, service_links))

        print("Generated Shop Now Links:", shop_now_links)

        response = jsonify({'links': shop_now_links})
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response

    except Exception as e:
        print(f"An error occurred: {e}")
        response = jsonify({'error': 'An error occurred'})
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response, 500

if __name__ == '__main__':
    app.run(debug=True)
