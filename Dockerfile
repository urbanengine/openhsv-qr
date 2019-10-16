FROM node:current as build
LABEL maintainer="Kyle Galloway <kyle.galloway@cfdrc.com>"

# Create source directory
ENV SRC_DIR /src
RUN mkdir ${SRC_DIR}
WORKDIR ${SRC_DIR}
VOLUME ${SRC_DIR}

CMD ["/bin/bash"]