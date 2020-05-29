FROM alpine:3.9

COPY ./app /app
WORKDIR /app

RUN apk -U add py-pip busybox-extras \
    && pip install -r requirements.txt

ENV DELAY_SEC 30
CMD ["python", "-u", "cleanup.py"]
