FROM steebchen/nginx-spa:stable
COPY ./build /app
EXPOSE 80
CMD ["nginx"]