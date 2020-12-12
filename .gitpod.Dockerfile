FROM gitpod/workspace-full

# add more RUN statements to run more
# commands on init
RUN sudo apt-get update
RUN npm i -g eslint prettier