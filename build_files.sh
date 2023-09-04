echo "Starting Build"
python3 --version
python --version
pip3 --version
apt-get install python-mysqldb 
apt-get install libmysqlclient-dev
pip3 install -r requirements.txt
python3 manage.py migrate
python3 manage.py collectstatic --noinput
echo "Build End"