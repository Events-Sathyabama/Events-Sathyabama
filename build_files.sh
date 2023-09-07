echo "Starting Build"
dnf install git -y
dnf install gcc -y
dnf install libpq-devel -y
python3.9 -m pip install -r requirements.txt
python3.9 manage.py collectstatic --noinput --clear
python3.9 manage.py migrate
echo "Build End"