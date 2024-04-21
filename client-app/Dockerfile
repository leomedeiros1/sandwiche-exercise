FROM node:19-bullseye

WORKDIR /code

RUN npm install -g @angular/cli   

# ## If a clean install is required
# COPY package.json package-lock.json ./
# RUN npm ci

COPY package.json ./
RUN npm i

COPY . .

# EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200"]

# FROM builder as dev-envs

# RUN <<EOF
# apt-get update
# apt-get install -y --no-install-recommends git
# EOF