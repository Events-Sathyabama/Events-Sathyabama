python manage.py migrate
python manage.py collectstatic --noinput --clear
echo "MYSQL_DATABASE: ${MYSQL_DATABASE,,}"
echo "POSTGRES_DATABASE: ${POSTGRES_DATABASE,,}"
if [ -z "$MYSQL_DATABASE" ] || [ "${MYSQL_DATABASE,,}" != "true" ] && [ -z "$POSTGRES_DATABASE" ] || [ "${POSTGRES_DATABASE,,}" != "true" ]; then
    # Run the createsuperuser command with the desired parameters
    python manage.py createsuperuser --college_id=0 --email=aryanamish385@gmail.com --role=4 --noinput
    python manage.py createsuperuser --college_id=1 --email=bsuryakumar03@gmail.com --role=4 --noinput
else
    echo "MYSQL_DATABASE and POSTGRES_DATABASE are set or at least one of them is set to true, so the superuser creation is skipped."
fi
