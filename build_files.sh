echo "Starting Build"
python --version
pip --version
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --noinput
echo "Build End"