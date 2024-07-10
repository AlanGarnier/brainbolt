FROM python:3.11.6

RUN mkdir -p /app

WORKDIR /backend

COPY requirements.txt /backend/
RUN pip install --no-cache-dir -r requirements.txt

# ENV FLASK_APP=app.py
# ENV FLASK_ENV=production

COPY . /backend/

EXPOSE 5000

# CMD ["flask", "run", "--host=0.0.0.0"]
CMD ["gunicorn", "-w", "2", "-b", "0.0.0.0:5000", "app:app"]