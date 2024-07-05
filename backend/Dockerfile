FROM python:3.11.6

RUN mkdir -p /app

WORKDIR /backend

COPY requirements.txt /backend/
RUN pip install --no-cache-dir -r requirements.txt

COPY . /backend/

EXPOSE 5000

CMD ["flask", "run", "--host=0.0.0.0"]