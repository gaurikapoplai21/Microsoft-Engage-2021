import os
import smtplib
from email.message import EmailMessage


#EMAIL_ADDRESS = os.environ.get('EMAIL_USER')
#EMAIL_PASSWORD = os.environ.get('EMAIL_PASS')

EMAIL_ADDRESS = "teamup.for.ms.engage@gmail.com"
EMAIL_PASSWORD = "Enigma123#"


def sendmail(contacts,subject,body):


        contacts = contacts

        msg = EmailMessage()
        msg['Subject'] = subject
        msg['From'] = EMAIL_ADDRESS
        msg['To'] = contacts

        msg.set_content(body)

        #msg.add_alternative("""\
        #<!DOCTYPE html>
        #<html>
            #<body>
                #<h1 style="color:SlateGray;">This is an HTML Email!</h1>
            #</body>
        #</html>
       # """, subtype='html')


        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
            smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            smtp.send_message(msg)
