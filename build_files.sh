echo "Starting Build"
python3 --version
python --version
pip3 --version
pip3 install -r requirements.txt
python3 manage.py migrate
python3 manage.py collectstatic --noinput
echo "Build End"