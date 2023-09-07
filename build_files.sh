echo "Starting Build"
yum install git -y
yum install gcc -y
yum install libpq-devel -y
python3.9 -m pip install -r requirements.txt
python3.9 manage.py collectstatic --noinput --clear
python3.9 manage.py migrate
echo "Build End"