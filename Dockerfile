FROM node:18.18.2-bullseye

# Dockerfile for development
RUN apt-get update
RUN apt-get -y install git
