from django import template
from django.utils import timezone

register = template.Library()

@register.filter(name='seconds_to_word')
def seconds_to_word(value):
    if not isinstance(value, int):
        return value

    seconds = value
    hours, remainder = divmod(seconds, 3600)
    minutes, seconds = divmod(remainder, 60)

    time_parts = []
    if hours > 0:
        time_parts.append(f"{hours} {'hour' if hours == 1 else 'hours'}")
    if minutes > 0:
        time_parts.append(f"{minutes} {'minute' if minutes == 1 else 'minutes'}")
    if seconds > 0:
        time_parts.append(f"{seconds} {'second' if seconds == 1 else 'seconds'}")

    return ', '.join(time_parts)
