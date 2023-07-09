FROM node:14.2.0

LABEL version="1.0"

LABEL description="This is the base docker image for the Kuai frontend react app."
LABEL maintainer = ["linaizhong@gmail.com"]

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]