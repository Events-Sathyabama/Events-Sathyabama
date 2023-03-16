from .models import Event
from django.db.models import Q


class SearchQueryMixins:
    def get_queryset(self, *args, **kwargs):
        search = self.request.GET.get('q')
        search = search.strip() if search is not None else search
        query = Event.objects.all()
        q = Q(start_date__isnull=False)
        q = q | Q(end_date__isnull=False)
        q = q & Q(status=2, hod_verified=1, dean_verified=1, vc_verified=1)
        if search is None:
            return query.filter(q)
        query = query.filter(q)
        search = search.split(" ")
        q = Q()
        for s in search:
            q = q | (Q(title__icontains=s) | 
                Q(short_description__icontains=s) | 
                Q(long_description__icontains=s) | 
                Q(club__icontains=s) | 
                Q(branch__name__icontains=s)
                )
        return query.filter(q)