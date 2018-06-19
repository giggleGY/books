/**
 * Created by 12 on 2017/7/6.
 */
export default {
  install(Vue, options) {
    Vue.prototype.common = {
      defaultImage(e) {
        e.target.src = 'http://www.zwdu.com/files/article/image/20/20962/20962s.jpg'
        // e.target.src = './logo.png'
      },
      api: 'http://xs.0359you.com/index/index'
    }
  }
}

/*
* nginx配置
* http://127.0.0.1/book -> https://remove-server.com/book/
*location /book/ {
     rewrite /book/(.*) /book/$1 break;
     proxy_pass https://remote-server.com;
     proxy_redirect     off;
		}
 *  */


