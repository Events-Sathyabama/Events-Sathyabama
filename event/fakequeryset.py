from django.http import Http404

class Exists:
    def __init__(self, data):
        self.rv = data
    
    def exists(self):
        return self.rv
class FakeQuerySet:


    def __str__(self):
        return str(self.data)

    def __init__(self, data=None):
        self.data = data or {}
    
    def __iter__(self):
        self.iter_data = iter(self.data.values())
        return self

    def __next__(self):
        return next(self.iter_data)

    def add(self, obj):
        self.data[obj.pk] = obj


    def filter(self, pk):
        if pk in self.data:
            return Exists(True)
        else:
            return Exists(False)

    def count(self):
        return len(self.data)

    def get(self, pk):
        if pk in self.data:
            return self.data[pk]
        raise Http404("Can't find what you were looking for")
    
    def first(self):
        return list(self.data)[0]

    def all(self):
        return self

    def union(self, other):
        return FakeQuerySet(self.data | other.data)