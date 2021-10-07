FROM gitpod/workspace-base

RUN sudo apt-get install -y node && npm
RUN npm install -g nodemon
