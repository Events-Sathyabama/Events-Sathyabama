echo "Starting Build"
python3 --version
python --version
pip3 --version
sudo apt-get install python-mysqldb 
sudo apt-get install libmysqlclient-dev
pip3 install -r requirements.txt
python3 manage.py migrate
python3 manage.py collectstatic --noinput
echo "Build End"