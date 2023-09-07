echo "Starting Build"

echo "Settings Up Python Environment"
python3.9 -m pip install -r requirements.txt --no-cache-dir
python3.9 manage.py collectstatic --noinput --clear
python3.9 manage.py migrate
echo "All Good to go"
echo "Build End"