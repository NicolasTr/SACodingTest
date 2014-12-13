FROM phusion/baseimage:0.9.15

RUN apt-get update \
    && apt-get upgrade -y \
    && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN /etc/my_init.d/00_regen_ssh_host_keys.sh

RUN apt-get update \
    && apt-get install -y nginx python-pip ruby-dev git \
    && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

ADD backend/packages.txt /tmp/packages.txt
RUN apt-get update \
    && cat /tmp/packages.txt | xargs apt-get -y --force-yes install \
    && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
RUN gem install compass

RUN echo "deb http://ppa.launchpad.net/chris-lea/node.js/ubuntu trusty main" >> /etc/apt/sources.list \
    && gpg --keyserver keyserver.ubuntu.com --recv B9316A7BC7917B12 \
    && apt-get update \
    && apt-get install -y rlwrap nodejs --force-yes \
    && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

ADD backend/requirements.txt /tmp/requirements.txt
RUN pip install -r /tmp/requirements.txt \
    && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

ADD frontend/package.json /srv/frontend/package.json
RUN cd /srv/frontend/ \
    && npm install --unsafe-perm \
    && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

ADD frontend/bower.json /srv/frontend/bower.json
RUN cd /srv/frontend/ \
    && node_modules/.bin/bower install --allow-root \
    && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

ADD docker /
ADD frontend/app /srv/frontend/app
ADD frontend/Gruntfile.js /srv/frontend/Gruntfile.js
ADD frontend/.jshintrc /srv/frontend/.jshintrc

RUN cd /srv/frontend/ \
    && NODE_ENV=production node_modules/.bin/grunt build

ADD backend /srv/app
RUN cd /srv/app \
    && python manage.py collectstatic --noinput

CMD ["/sbin/my_init"]
EXPOSE 22 80
