import importlib
from django.core.mail import send_mass_mail, send_mail
from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string

class Mail:

    def __init__(self, template_name):
        if template_name[0] != '.':
            template_name = '.' + template_name
        self.template = importlib.import_module(template_name, package=__package__)
    
    def get_rendered_html(self, context={}):
        html_content = render_to_string(self.template.html, context)
        return html_content


    def prepare_attr(self, module_text, incoming_text):
        if incoming_text:
            if isinstance(incoming_text, list):
                return module_text.format(*incoming_text)
            elif isinstance(incoming_text, dict):
                return module_text.format(**incoming_text)
            return module_text.format(incoming_text)
        return module_text

    def send_email(self, message={}, bcc=[], cc=[]):
        # send email to user with attachment

        if isinstance(message, list):
        # Bulk email
            message_list = []
            for msg in message:
                subject = self.prepare_attr(self.template.subject, msg.get('subject'))
                text_message = self.prepare_attr(self.template.message, msg.get('message'))
                from_email = self.template.from_email
                recipients = msg['recipients']
                html_content = self.get_rendered_html(msg.get('context', {}))

                if not isinstance(recipients, list):
                    recipients = [recipients]
                
                email_message = EmailMultiAlternatives(subject, text_message, from_email, recipient)
                email_message.attach_alternative(html_content, 'text/html')
                message_list.append(email_message)

            EmailMultiAlternatives.send_mass_mail(message_list, fail_silently=False)
        else:
            # Normal email
            subject = self.prepare_attr(self.template.subject, message.get('subject'))
            text_message = self.prepare_attr(self.template.message, message.get('message'))
            from_email = self.template.from_email
            recipients = message['recipients']

            html_content = self.get_rendered_html(message.get('context', {}))
            print(message.get('context', {}))
            if not isinstance(recipients, list):
                recipients = [recipients]

            send_mail(subject, text_message, from_email, recipients, html_message=html_content)




    
        
    
