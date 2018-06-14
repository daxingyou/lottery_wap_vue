#### check代码到本地修改(Git)
```bash
  # 克隆仓库到本地
    git clone http://git.leyoule1.com/front-end/lottery_ali_gd.git
  # 进入到克隆的目录
    cd lottery_ali_gd
  # 修改代码
    // some changes of yours..
  # 本地运行测试
    npm run dev
  # 运行没有问题打包
    npm run build
```

#### 打包后dist目录结构（Git）
```bash
├── static                
│   ├── css         // 样式文件夹
│   │    ├── ali_v=201708062332.css     // 阿里站的样式文件
│   │    ├── app.5e6de738e1e95fac90b49d8f50f400a5.css  // 公用样式
│   │    └── gd_v=201708062332.css      // 光大站的样式文件
│   ├── images     // 图片文件夹
│   ├── img        // 图片文件夹
│   ├── js         // js文件夹
│   │    ├── app.5ea800f56c92beb23798.js    // 业务逻辑
│   │    ├── manifest.c7cc1177215e33de1e54.js   // h5离线缓存文件
│   │    └── vendor.b80cf9b75496c3ad19d4.js     // 框架及插件
│   ├── ali_global.config.js    // 阿理赔率等配置文件
│   └── gd_global.config.js     // 光大赔率等配置文件
└── index.html    // 测试html
```

#### 上传到git仓库(Git)
```bash
  # 先拉取最新代码(注意冲突)
    git pull
  # 添加到本地仓库
    git add -A      // -A表示所有文件, 也可以提交单个/多个文件
  # 提交到历史仓库
    git commit -m"注释内容"     //注释最好写清楚一些
  # 推到远程仓库
    git push -u orgin master   // master分支，可以是其它分支  
```

#### 拉取测试环境代码(SVN)
```bash
  # 测试代码地址
    http://125.252.74.39/test/cp_test/static
  # 拉取
    svn checkout
```

#### 阿理光大测试环境目录结构(SVN)
```bash
  # 文件位置
    /static           //只关注这个目录
  # 文件结构(同git环境，只是没有版本号)
    ├── static                
    │   ├── css         
    │   │    ├── ali.css     
    │   │    ├── app.css 
    │   │    └── gd.css      
    │   ├── images     
    │   ├── img        
    │   ├── js         
    │   │    ├── app.js
    │   │    ├── manifest.js
    │   │    └── vendor.js
    │   ├── ali_global.config.js 
    │   └── gd_global.config.js 
    └── index.php    //!!!不要动这个文件，版本号是php中控制的，这个文件在外面
```

#### 同步过程(两种方式,把git环境的文件弄到svn上去)
```bash
  1.内容覆盖，把git环境的文件内容对应复制并覆盖掉svn环境理文件
    a.css替换,比如复制app.5e6de738e1e95fac90b49d8f50f400a5.css内容，粘贴到app.css
    b.替换js,比如复制app.5ea800f56c92beb23798.js内容，粘贴到app.js
    c.替换或添加图片目录
    d.替换赔率文件
  2.文件覆盖,把git环境的文重命名并覆盖掉svn环境理文件
    a.css,如重命名app.5e6de738e1e95fac90b49d8f50f400a5.css为ali.css，拖到svn相应目录覆盖
    b.替换js,重命名app.5ea800f56c92beb23798.js为app.js，拖到svn相应目录覆盖
    c.替换或添加图片目录
    d.替换赔率文件
  注意：
    只关注4个相关的文件 app.css,app.js,manifest.js,vendor.js
    index.html不要提交，要不要动线上的index.php文件
    ali.css / gd.css若有修改需要替换
    赔率文件(ali/gd_global.config.js)若有修改，需要替换
```

#### 上传测试环境(SVN)
```bash
  # 先拉取最新代码
    svn update
  # 有新文件记得要添加
    svn add
  # 提价代码
    svn commit   // 记得写注释，最好清楚一点
  # 没有报错就说明提交成功了。
```

#### 线上测试(SVN)
```bash
  测试地址：
     static.l5jiamei.com        (阿理)
     static.l5dafa.com          (光大)
  测试账号：
     1. aadmin aadmin
     2. admin qqq111
     3. hugo111  qqq111
```

#### 检查
```bash
  1.清理浏览器缓存
  2.检查功能是否添加上
  3.无误，发出测试链接
```

#### 正式站发布
```bash
  正式站svn地址:
    http://125.252.74.39/web/caipiao/static
  正式站线上地址：
    static.alcp66.com （阿理）
    static.gdcp99.com （光大）
  流程：
    和测试环境一致
```
