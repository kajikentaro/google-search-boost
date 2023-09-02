FROM node:20.5.1-bullseye

# Dockerfile for development
RUN apt-get update
RUN apt-get -y install git
