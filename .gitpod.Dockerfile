FROM gitpod/workspace-base

RUN sudo apt-get node && npm
RUN npm install -g nodemon
