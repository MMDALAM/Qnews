import sys
from re import search
import json
import requests
from bs4 import BeautifulSoup
import time
import os
import random
import hashlib
import time


def get_my_data(url):

        response = requests.get(url)
        # response.encoding = 'utf-8' 

        content_html = response.content

        soup = BeautifulSoup(content_html, 'html.parser')

        content_text = soup.get_text(separator=' ', strip=True)

        # Example: Extract all paragraphs from the page
        #paragraphs = soup.find_all('p')

        #for para in paragraphs:
        #    print(para.text)


        unix_time = time.time()


        input_string = url+"-" + str(unix_time)
        md5_hash = hashlib.md5()
        md5_hash.update(input_string.encode('utf-8'))
        f_hash = md5_hash.hexdigest()

        filename_html = f_hash + ".html"
        filename_text = f_hash + ".txt"

        print(filename_html)
        print(filename_text)


        with open(filename_html, 'w') as file:
            file.write(str(content_html))
            
        with open(filename_text, 'w') as file:
            file.write(content_text)



url = 'https://thequantuminsider.com/2024/10/08/japan-to-invest-in-quantum-encryption-development-by-2030-to-counter-cybersecurity-threats/'
get_my_data(url)

