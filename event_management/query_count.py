from django.conf import settings
settings.DEBUG = True
from django.db import connection, reset_queries


def q_c(reset=True):
    print(len(connection.queries))
    if reset:
        reset_queries()

def q_p():
    for q in connection.queries:
        print(q['sql'], end="\n\n")

SQL = "SELECT event_event.title, user_user.* FROM event_event JOIN event_eventparticipant ON event_event.id = event_eventparticipant.event_id JOIN user_user ON event_eventparticipant.user_id = user_user.id WHERE event_event.id = 11;"