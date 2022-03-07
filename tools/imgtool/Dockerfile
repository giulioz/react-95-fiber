FROM alpine:3.15.0

RUN  apk update && apk add dosfstools mtools

COPY create.sh /
RUN chmod +x /create.sh

CMD /create.sh
