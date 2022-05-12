FROM node:16-alpine as builder
WORKDIR /home/app
COPY . .
RUN npm ci && npm cache clean --force
RUN npm run build

FROM nginx:1.21-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /home/app/build /usr/share/nginx/html

# NEW CODE
# 1. Copy the initialization script to the Nginx init scripts directory.
COPY 85-set-environment-vars.sh /docker-entrypoint.d
# 2. Make it executable.
RUN chmod +x /docker-entrypoint.d/85-set-environment-vars.sh

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]