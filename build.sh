python manage.py migrate
python manage.py collectstatic --noinput --clear
python create_admin_user.py