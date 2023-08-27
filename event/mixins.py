from .models import Event
from django.db.models import Q


class SearchQueryMixins:
    def get_queryset(self, *args, **kwargs):
        search = self.request.GET.get('q')
        search = search.strip() if search is not None else search
        search = None if search == '' else search

        q = Q(start_date__isnull=False)
        q = q | Q(end_date__isnull=False)
        q = q & Q(status__gte=2, hod_verified=1, dean_verified=1, vc_verified=1)
        if search is None:
            return Event.objects.filter(q)
        search = search.split(" ")
        search_q = Q()
        for s in search:
            if s == '': continue
            search_q = search_q | (Q(title__icontains=s) | 
                Q(short_description__icontains=s) | 
                Q(long_description__icontains=s) | 
                Q(club__icontains=s) | 
                Q(branch__name__icontains=s)
                )
        inputs = Event.objects.filter(q & search_q).distinct()
        return inputs