FROM node:current as build
LABEL maintainer="Kyle Galloway <kyle.galloway@cfdrc.com>"

# Create source directory
ENV SRC_DIR /src
RUN mkdir ${SRC_DIR}
WORKDIR ${SRC_DIR}
VOLUME ${SRC_DIR}

# Expose port 3000
EXPOSE 3000

CMD ["/bin/bash"]