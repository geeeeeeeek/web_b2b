# 基于Python开发的B2B企业英文网站


> 基于React+django开发的b2b企业网站（大部分代码使用AI编写），适用场景包括外贸独立站、企业官网、产品展示网站等场景。自2025年9月9日起本项目不再维护。


## 在线演示

演示地址：[https://010.fktool.com](https://010.fktool.com)


## 开发环境

- 后端： Python 3.8 + Django 3.2
- 前端： Javascript + Vue
- 数据库：MySQL 5.7
- 开发平台：Pycharm + vscode
- 运行环境：Windows 10/11

## 关键技术

- 前端技术栈 ES6、React、nextjs、react-router、axios、antd、tailwindcss
- 后端技术栈 Python、Django、djangorestframework、pip



## 运行步骤

### 软件准备

1. Python 3.8 [下载地址](https://www.python.org/ftp/python/3.8.10/python-3.8.10-amd64.exe)
2. MySQL 5.7 [下载地址](https://dev.mysql.com/get/Downloads/MySQLInstaller/mysql-installer-community-5.7.44.0.msi)
3. Node [下载地址](https://nodejs.org/dist/v18.20.2/node-v18.20.2-x64.msi)

### 后端运行步骤

(1) 安装依赖，cd进入server目录下，执行
```
pip install -r requirements.txt
```

(2) 创建数据库，创建SQL如下：
```
CREATE DATABASE IF NOT EXISTS python_db[your dbname] DEFAULT CHARSET utf8 COLLATE utf8_general_ci
```
(3) 恢复数据库数据。在mysql下依次执行如下命令：

```
mysql> use xxx(数据库名);
mysql> source D:/xxx/xxx/xxx.sql;
```

(4) 配置数据库。在server目录下的server下的settings.py中配置您的数据库账号密码

```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'python_db',   # 您的数据库
        'USER': 'root',        # 您的用户名
        'PASSWORD': 'xxxxx', # 您的密码
        'HOST': '127.0.0.1',
        'PORT': '3306',
        'OPTIONS': {
            "init_command": "SET foreign_key_checks = 0;",
        }
    }
}
```

(5) 启动django服务。在server目录下执行：
```
python manage.py runserver
```

### 前端运行步骤

(1) 安装依赖，cd到web目录，执行:
```
npm install 
```
(2) 修改.env配置

修改.env文件中的域名，改成你自己的域名。

(3) 构建项目
```
npm run build
```
(4) 运行
```
npm run start
```

### nginx配置

```
server {
    listen       80;
    server_name  xxxxx.com www.xxxxx.com;


    location /upload/ {
        access_log off;
        log_not_found off;
        alias /var/xxxxx/server/upload/;
        add_header Cache-Control "public, max-age=90";
    }
     
    # ico文件
    location /favicon.ico {
        access_log off;
        log_not_found off;
        alias /var/xxxxx/server/upload/img/favicon.ico;
        add_header Cache-Control "public, max-age=90";
    }

    # django代理
    location /myapp/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
	proxy_set_header X-Real-IP $remote_addr; # 获取客户端真实 IP
	proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; # 获取代理链中的真实 IP
	proxy_set_header X-Forwarded-Proto $scheme; # 获取协议（http 或 https）
	client_max_body_size 100M; # 上传限制

    }

    location /_next/image {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        add_header Cache-Control "public, max-age=31536000";
    }

    location /_next/static {
        proxy_pass http://127.0.0.1:3000;
        access_log off;
        expires 1y;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # 开发环境hmr
    location /_next/webpack-hmr {
	    proxy_pass http://127.0.0.1:3000;
	    proxy_http_version 1.1;
	    proxy_set_header Upgrade $http_upgrade;
	    proxy_set_header Connection "upgrade";
	    proxy_set_header Host $host;
	    proxy_cache_bypass $http_upgrade;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

```





## 付费咨询

微信（Lengqin1024）


## 常见问题

**1. 数据库版本有什么要求？**

答：mysql 5.7及以上版本即可

**2. 项目的代码结构？**

答：server目录是后端代码，web目录是前端代码。

**3. 需要学习哪些技术知识？**

答：需要学习[python编程知识](https://www.runoob.com/python3/python3-tutorial.html)、[django框架知识](https://docs.djangoproject.com/zh-hans/3.2/)、[vue编程知识](https://cn.vuejs.org/guide/introduction.html)

**4. 后台管理的默认账号密码是？**

答：管理员账号密码是：admin123 / admin123
