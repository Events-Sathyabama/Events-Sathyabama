echo "Starting Build"
python manage.py migrate
python manage.py collectstatic --noinput
echo "Build End"