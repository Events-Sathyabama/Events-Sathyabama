echo "Starting Build"
python3 --version
python3.10 --version
python --version
pip --version
pip install -r requirements.txt
python3.10 manage.py migrate
python3.10 manage.py collectstatic --noinput
echo "Build End"