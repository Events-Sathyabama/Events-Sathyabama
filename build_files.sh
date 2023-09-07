echo "Starting Build"
echo "Image Information"
cat /etc/os-release
lsb_release -a
uname -r
hostnamectl
echo "End of image information"

echo "Installing Linux Packages"
yum install git -y
yum install gcc -y
yum install postgresql-libs -y
echo "Done installing Linux Packages"

echo "Settings Up Python Environment"
python3.9 -m pip install -r requirements.txt
python3.9 manage.py collectstatic --noinput --clear
python3.9 manage.py migrate
echo "All Good to go"
echo "Build End"