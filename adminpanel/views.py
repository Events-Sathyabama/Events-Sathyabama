from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated

from event.mixins import PermissionAllowOnlyVCMixin
from event.models import Event
from django.utils import timezone
from django.urls import reverse
from rest_framework.response import Response
from rest_framework.decorators import api_view
import pandas as pd
import numpy as np
from django.core.validators import validate_email
from rest_framework.views import APIView
from django.db import transaction

from event.permissions import required_roles, IsVC
from user.models import Branch
from django.contrib.auth import get_user_model
from django.db.models import Q

User = get_user_model()


# Create your views here.
@api_view(['GET'])
@required_roles([4])
def event_last_twelve_month(request):
    twelve_months_ago = timezone.now() - timezone.timedelta(days=365)
    events = Event.objects.filter(start_date__gte=twelve_months_ago)
    curr_month = timezone.now().month - 1
    event_count = {timezone.datetime.strptime(
        str(((curr_month + i) % 12) + 1), '%m').strftime('%b'): 0 for i in range(1, 13)}
    total_count = 0
    pending_count = 0
    rejected_count = 0
    time_interval = twelve_months_ago.strftime(
        "%b'%y") + ' - ' + timezone.now().strftime("%b'%y")
    for event in events:
        month = event.start_date.strftime("%b")
        event_count[month] += 1

        if event.status == 1:
            pending_count += 1
        if event.rejected is True:
            rejected_count += 1
        total_count += 1

    admin_link = request.build_absolute_uri(reverse('admin:index'))

    return Response(data={
        'chart_data': event_count,
        'total_event': total_count,
        'pending_count': pending_count,
        'rejected_count': rejected_count,
        'time_interval': time_interval,
        'django_admin_panel_url': admin_link,
    }, status=200)


@api_view(['GET'])
@required_roles([4])
def sync_user(request):
    return Response(data={'detail': 'Feature Not Implemented'}, status=501)


class UploadExcel(APIView):
    required_fields = ['college_id', 'first_name', 'email', 'branch', 'batch']
    permission_classes = [IsAuthenticated & IsVC]

    def read_file(self, file):
        try:
            self.df = pd.read_csv(file)
            return True
        except:
            return False
            # return Response(data={'detail': 'The CSV file is empty.'}, status=422)

    def sanitize_column_name(self, df):
        df.rename(columns=lambda x: x.replace(
            '_', ' ').replace('-', ' ').lower(), inplace=True)
        column_mapping = {
            'reg no': 'college_id',
            'reg number': 'college_id',
            'register number': 'college_id',
            'register no': 'college_id',
            'college id': 'college_id',
            'first name': 'first_name',
            'last name': 'last_name',
            'email': 'email',
            'email id': 'email',
            'mail id': 'email',
            'mail': 'email',
            'branch': 'branch',
            'batch': 'batch'
        }
        df.rename(columns=column_mapping, inplace=True)

    def handle_name(self, df):
        if 'name' in df.columns:
            df['name'] = df['name'].apply(
                lambda x: x.lower().title() if isinstance(x, str) else x)

            df[['first_name', 'last_name']] = df['name'].loc[df['name'].str.split(
            ).str.len() == 2].str.split(expand=True)

            df['first_name'].fillna(df['name'], inplace=True)

    def handle_batch(self, df):
        if 'batch' in df.columns:
            df[['starting_year', 'ending_year']] = df['batch'].str.split(
                pat='-', n=1, expand=True)

            # Handle cases where the data is not in the expected format
            df['starting_year'] = pd.to_numeric(
                df['starting_year'], errors='coerce').astype('Int64')
            df['ending_year'] = pd.to_numeric(
                df['ending_year'], errors='coerce').astype('Int64')
            mask = (df['starting_year'].isna() | df['ending_year'].isna(
            ) | df['starting_year'].eq(pd.NaT) | df['ending_year'].eq(pd.NaT))

            df.loc[mask, 'starting_year'] = np.nan
            df.loc[mask, 'ending_year'] = np.nan

    def fix_columns(self, data):
        self.handle_name(data)
        self.handle_batch(data)
        missing_columns = []

        for col in self.required_fields:
            if col not in data.columns:
                missing_columns.append(col)
        return missing_columns

    def sanitize_data(self, df):
        df['college_id'] = df['college_id'].fillna(0).astype(int).astype(str)
        df['email'] = df['email'].apply(lambda x: x.replace(" ", "").strip() if isinstance(x, str) else x)
        df.replace({np.nan: None, 'nan': None}, inplace=True)

    def validate_data(self):
        df = self.df

        reason = []

        def is_valid_row(row):

            for field in self.required_fields:
                if pd.isna(row[field]):
                    reason.append(
                        f'{" ".join(field.title().split("_"))} is Required')
                    return False
            # valid college id
            try:
                college_id = int(row['college_id'])
                if college_id <= 0:
                    reason.append('College id is incorrect')
                    return False
            except (TypeError, ValueError):
                reason.append('College id is incorrect')
                return False

            # validate batch

            if pd.isna(row['starting_year']) or pd.isna(row['ending_year']):
                reason.append('Batch is in Wrong format')
                return False

            if row['starting_year'] > row['ending_year']:
                reason.append(
                    'batch end year cannot be less than batch start date')
                return False

            # validate email id
            try:
                validate_email(row['email'].strip())
            except:
                reason.append('Incorrect E-mail')
                return False
            return True

        mask = df.apply(is_valid_row, axis=1)
        valid_data = df[mask]
        invalid_data = df[~mask]

        duplicate_values_college_id = valid_data[valid_data['college_id'].duplicated(
            keep=False)]
        duplicate_values_email = valid_data[valid_data['email'].duplicated(
            keep=False)]
        invalid_data = pd.concat(
            [invalid_data, duplicate_values_college_id, duplicate_values_email])

        reason.extend(["Duplicate College Id's"] *
                      len(duplicate_values_college_id))
        reason.extend(["Duplicate Email Id's"] * len(duplicate_values_email))

        valid_data = valid_data.drop_duplicates(subset=['college_id'], keep=False)
        valid_data = valid_data.drop_duplicates(subset=['email'], keep=False)

        # Find duplicate college_id values in invalid_data and add them to reason

        return valid_data, invalid_data.assign(reason=reason)

    def get_or_create_branch(self, data):
        unique_branch = data.drop_duplicates(
            subset=['branch', 'starting_year', 'ending_year'])[['branch', 'starting_year', 'ending_year']]
        branch_objects = {}

        # Create a list to store Branch objects for bulk insertion
        branch_objects_to_create = []
        q = Q()
        # Iterate through the dataframe rows
        for index, row in unique_branch.iterrows():
            branch_name = row['branch']
            batch_start_date = row['starting_year']
            batch_end_date = row['ending_year']

            q = q | Q(name=branch_name,
                      batch_start_date=batch_start_date,
                      batch_end_date=batch_end_date)

        branch_data = Branch.objects.filter(q)
        for branch in branch_data:
            branch_objects[(branch.name,
                            branch.batch_start_date,
                            branch.batch_end_date)] = branch

        for index, row in unique_branch.iterrows():
            branch_name = row['branch']
            batch_start_date = row['starting_year']
            batch_end_date = row['ending_year']
            key = (branch_name, batch_start_date, batch_end_date)
            if key not in branch_objects:
                branch = Branch(
                    name=branch_name,
                    batch_start_date=batch_start_date,
                    batch_end_date=batch_end_date
                )

                branch_objects_to_create.append(branch)
                branch_objects[key] = branch

        # Use a transaction for bulk insertion
        with transaction.atomic():
            Branch.objects.bulk_create(branch_objects_to_create)
        return branch_objects

    def update_database(self, df):
        branch = self.get_or_create_branch(df)
        user_create_list = []
        college_ids = list(df['college_id'])
        already_exists_users = {
            user.college_id for user in User.objects.filter(college_id__in=college_ids)}

        for index, row in df.iterrows():
            # Create or update the User object based on college_id
            branch_key = (row['branch'],
                          row['starting_year'],
                          row['ending_year'])
            if row['college_id'] not in already_exists_users:
                user = User(
                    college_id=row['college_id'],
                    first_name=row['first_name'],
                    last_name=row['last_name'],
                    email=row['email'],
                    branch=branch[branch_key],
                    role=0
                )
                user_create_list.append(user)
        data = {}
        try:
            with transaction.atomic():
                User.objects.bulk_create(user_create_list)
        except Exception as e:
            data.update({'detail': "Something went Wrong, while inserting the Data!!", 'status': 500})
        data.update({
            'updated_count': len(user_create_list),
            'duplicate_values': df[df['college_id'].isin(list(already_exists_users))].to_csv()})
        return data

    def post(self, request):
        if self.read_file(request.FILES.get('file')) is False:
            return Response(data={'detail': 'Cannot read File'}, status=422)

        df = self.df
        self.sanitize_column_name(df)
        missing_columns = self.fix_columns(df)

        if len(missing_columns) > 0:
            missing_column_string = ", ".join(
                [" ".join(i.split('_')) for i in missing_columns])
            return Response(data={'detail': f"Missing required columns {missing_column_string}"}, status=422)
        self.sanitize_data(df)
        valid_data, invalid_data = self.validate_data()

        response_with_data = {'valid_data': valid_data.to_csv(),
                              'invalid_data': invalid_data.to_csv()}

        if len(valid_data) == 0:
            data = {'detail': 'Nothing to Update'}
            data.update(response_with_data)
            return Response(data=data, status=200)

        updated_data = self.update_database(valid_data)
        data = {'detail': 'Database Updated Successfully'}
        if updated_data.get('updated_count', 0) == 0:
            data['detail'] = 'Nothing to Update'
        data.update(updated_data)
        data.update(response_with_data)
        return Response(data=data, status=data.get('status', 200))


upload_excel = UploadExcel.as_view()
