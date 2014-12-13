FROM phusion/baseimage:0.9.15

RUN apt-get update \
    && apt-get upgrade -y \
    && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN /etc/my_init.d/00_regen_ssh_host_keys.sh

RUN apt-get update \
    && apt-get install -y nginx python-pip \
    && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

ADD backend/packages.txt /tmp/packages.txt
RUN apt-get update \
    && cat /tmp/packages.txt | xargs apt-get -y --force-yes install \
    && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

ADD backend/requirements.txt /tmp/requirements.txt
RUN pip install -r /tmp/requirements.txt \
    && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

ADD docker /

ADD backend /srv/app
RUN cd /srv/app \
    && python manage.py collectstatic --noinput

CMD ["/sbin/my_init"]
EXPOSE 22 80
