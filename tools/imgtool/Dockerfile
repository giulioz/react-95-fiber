FROM alpine:3.15.0

RUN apk update && apk add dosfstools mtools qemu qemu-system-i386

COPY create.sh /
RUN chmod +x /create.sh
COPY reg.sh /
RUN chmod +x /reg.sh

CMD /create.sh
