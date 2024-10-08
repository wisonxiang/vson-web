创建镜像
docker buildx build --platform=linux/amd64 -t nextjs-app:v1.3 .

将镜像推送到Registry
docker login --username=wison911 registry.cn-shenzhen.aliyuncs.com
docker tag [ImageId] registry.cn-shenzhen.aliyuncs.com/vson-xiang/next-app:[镜像版本号]
docker push registry.cn-shenzhen.aliyuncs.com/vson-xiang/next-app:[镜像版本号]

运行镜像
sudo docker pull registry.cn-shenzhen.aliyuncs.com/vson-xiang/next-app:[镜像版本号]
sudo docker run -d -p 8080:3000 [镜像id]


遇到的坑
阿里云加速器不行了，不能下载dockerhub 官方的库，所以没必要设置这个加速器代理 和登录阿里云私库了
改成 本地全局vpn登录dockerhub 然后docker build
再退出vpn  将镜像push到 阿里云私库
然后再到服务器pull 阿里云私库的镜像
足最后运行，注意下端口保持跟nginx代理的一致 不要弄错了

静态资源
tar -cz -f  ./static.gzip ./.next/static
tar -xz -f static.gzip
mv .next _next