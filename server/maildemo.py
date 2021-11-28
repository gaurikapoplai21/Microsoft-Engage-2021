import os
import smtplib
from email.message import EmailMessage
from dotenv import load_dotenv

load_dotenv()

EMAIL_ADDRESS = os.getenv('EMAIL_USER')
EMAIL_PASSWORD = os.getenv('EMAIL_PASS')

def sendmail(contacts,subject,body):

        contacts = contacts

        msg = EmailMessage()
        msg['Subject'] = subject
        msg['From'] = EMAIL_ADDRESS
        msg['To'] = contacts

        #msg.set_content(body)

        msg.add_alternative("""\
        <!DOCTYPE html>
        <html>
            <body>
               <p>%s</p>
               <a href='http://localhost:3000'>Team-Up</a>
            </body>
        </html>
        """ %body, subtype='html')


        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
            smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            smtp.send_message(msg)
