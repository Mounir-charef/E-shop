FROM python:3.8
LABEL authors="Mounir"
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
COPY requirements.txt /code/
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
COPY . /code/
EXPOSE 80
RUN ["python", "manage.py", "makemigrations"]
RUN ["python", "manage.py", "migrate"]
CMD ["python", "manage.py", "runserver" ,"0.0.0.0:80"]