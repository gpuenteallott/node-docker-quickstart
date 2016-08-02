FROM node:6.2.0

EXPOSE 80 443

RUN apt-get update -y && \
	apt-get install -y \
	vim

ADD . /www
ADD docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

WORKDIR /www
RUN npm install

ENTRYPOINT ["/entrypoint.sh"]
