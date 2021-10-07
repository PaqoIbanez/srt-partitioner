FROM gitpod/workspace-base

RUN sudo apt-get install -y npm
RUN npm install -g nodemon
