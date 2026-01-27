FROM nginx:1.27.0
# we need to interact with the container and modify some files
RUN apt-get update
RUN apt-get -y install vim

#  we need to replace the default index.html file with our own version
COPY index.html /usr/share/nginx/html/index.html
RUN chown nginx:nginx /usr/share/nginx/html/index.html
