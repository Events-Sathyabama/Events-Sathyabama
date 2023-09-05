class FakeQuerySet:
    def __init__(self, model, data=[]):
        self.model = model
        self.data = data  # List of model instances or dictionaries

    def find(self, obj):
        return obj in self.data

    def _clone(self):
        # Clone the queryset (not necessary for basic functionality)
        return self

    def exists(self):
        if len(self.data) > 0:
            return True
        return False

    def first(self):
        if self.exists():
            if isinstance(self.data, list):
                return self.data[0]
            if isinstance(self.data, dict):
                for x in self.data:
                    return self.data[x]

    def union(self, obj):
        if isinstance(obj, list):
            return FakeQuerySet(self.model, self.data + obj)
        if isinstance(obj, FakeQuerySet):
            return FakeQuerySet(self.model, self.data + obj.data)
        return self

    def filter(self, **kwargs):
        # Mimic the filter operation by filtering data in Python
        if not kwargs:
            return self
        filtered_data = []
        for item in self.data:
            match = True
            for key, value in kwargs.items():
                if eval(f'item.{key}') != value:
                    match = False
                    break
            # match = all(item[key] == value for key, value in kwargs.items())
            if match:
                filtered_data.append(item)
        return FakeQuerySet(self.model, filtered_data)

    def exclude(self, **kwargs):
        # Mimic the exclude operation by excluding data in Python
        if not kwargs:
            return self
        filtered_data = []
        for item in self.data:
            match = any(item[key] == value for key, value in kwargs.items())
            if not match:
                filtered_data.append(item)
        return FakeQuerySet(self.model, filtered_data)

    def values(self, *fields):
        # Mimic the values operation by returning specified fields as dictionaries
        if not fields:
            return self.data
        return [dict((field, item[field]) for field in fields) for item in self.data]

    def values_list(self, *fields, flat=False):
        # Mimic the values_list operation by returning specified fields as lists
        if not fields:
            return self.data
        if len(fields) == 1 and flat:
            return [item[fields[0]] for item in self.data]
        return [[item[field] for field in fields] for item in self.data]

    def get(self, **kwargs):
        # Mimic the get operation by raising an exception if not exactly one result
        filtered = self.filter(**kwargs)
        count = len(filtered)
        if count == 1:
            return filtered.data[0]
        if count == 0:
            raise self.model.DoesNotExist(
                "FakeQuerySet has no results matching the given query.")
        raise self.model.MultipleObjectsReturned(
            "FakeQuerySet has more than one result matching the given query.")

    def __iter__(self):
        # Make the FakeQuerySet iterable by yielding each item from the data list
        for item in self.data:
            yield item

    def __len__(self):
        return len(self.data)

    def all(self):
        # Return all data in the queryset
        return self

    def count(self):
        # Return the count of data in the queryset
        return len(self.data)
