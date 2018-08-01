// 网站分类
import api from '@/api'
import _ from 'lodash'
export default class Lottery {
  constructor(options = {}) {
    //  console.log(options)
    this.type = options.type || ''
  }
  // 根据当前类型返回当前的参数
  _getCurrent() {
    switch (this.type) {
      case 'al':
        return {
          type: 'ali',
          url: process.env.NODE_ENV === 'production' ? ApiUrl : '//api.l5jiamei.com',
          iosUrl: '//aliios.7557b.com/download/apk',
          title: '阿理彩票',
          androidUrl: '//aliapi.7557b.com/download/apk'
        }
      case 'ct':
        return {
          type: 'lv',
          url: process.env.NODE_ENV === 'production' ? ApiUrl : '//api.l5jinfu.com',
          iosUrl: '//api.caitou999.com/download/apk',
          title: '彩投彩票',
          androidUrl: '//api.caitou999.com/download/apk'
        }
      case 'klc':
        return {
          type: 'klc',
          // url: process.env.NODE_ENV === 'production' ? ApiUrl : '//www.lebole5.com',
          url: process.env.NODE_ENV === 'production' ? ApiUrl : '//klc.lebole5.com',
          // iosUrl: '//api.caitou999.com/download/apk',
          title: '万游彩票',
          // androidUrl: '//api.caitou999.com/download/apk'
        }
      case 'gd':
        return {
          type: 'gd',
          url: process.env.NODE_ENV === 'production' ? ApiUrl : '//api.l5dafa.com',
          iosUrl: '//api.gdcp188.com/download/apk',
          title: '光大彩票',
          androidUrl: '//api.gdcp188.com/download/apk'

        }
      case 'yiren':
        return {
          type: 'yiren',
          url: process.env.NODE_ENV === 'production' ? ApiUrl : '//yiren.lebole5.com',
          iosUrl: 'https://api.yr97.com/download/apk',
          title: '亿人彩票',
          androidUrl: 'https://api.yr97.com/download/apk'
        }
      case 'ly':
        return {
          type: 'ly',
          url: process.env.NODE_ENV === 'production' ? ApiUrl : '//api.leyingcdn.com',
          iosUrl: '//apis.le079.com/download/apk',
          title: '乐盈彩票',
          androidUrl: '//apis.le079.com/download/apk'
        }
      case 'sd':
        return {
          type: 'fh',
          url: process.env.NODE_ENV === 'production' ? ApiUrl : '//api.l5668cp.com',
          iosUrl: '//app.97bei.com/download/apk',
          title: '668彩票',
          androidUrl: '//app.97bei.com/mobile/sd.apk'
        }
      case 'uc':
        return {
          type: 'uc',
          url: process.env.NODE_ENV === 'production' ? ApiUrl : '//wap.l5uc.com',
          iosUrl: '//www.uc22.com/download/apk',
          title: 'uc彩票',
          androidUrl: '//www.uc22.com/download/apk'
        }
      case 'agcai':
        return {
          type: 'agcai',
          url: process.env.NODE_ENV === 'production' ? ApiUrl : '//agcai.lebole5.com',
          iosUrl: 'https://www.ag33333.cc/download/apk',
          title: 'AG彩票',
          androidUrl: 'https://www.ag33333.cc/download/apk'
        }
      case 'tt':
        return {
          type: 'tt',
          url: process.env.NODE_ENV === 'production' ? ApiUrl : '//tt.lebole5.com',
          iosUrl: '//app.titicp.com/download/apk',
          title: '天天彩票',
          androidUrl: '//app.titicp.com/download/apk'
        }
      case 'yile':
        return {
          type: 'yile',
          url: process.env.NODE_ENV === 'production' ? ApiUrl : '//yile.lebole5.com',
          iosUrl: 'https://app.163774.com/download/apk',
          title: 'e乐彩票',
          androidUrl: 'https://app.163774.com/download/apk'
        }
      case 'fulicai':
        return {
          type: 'fulicai',
          url: process.env.NODE_ENV === 'production' ? ApiUrl : '//fulicai.lebole5.com',
          iosUrl: 'https://app.fuli520.app/download/apk ',
          title: '福利彩票',
          androidUrl: 'https://app.fuli520.app/download/apk '
        }
        case '618cp':
          return {
            type: '618cp',
            url: process.env.NODE_ENV === 'production' ? ApiUrl : '//618cp.lebole5.com',
            iosUrl: 'https://app.618cpcp.com/download/apk ',
            title: '618彩票',
            androidUrl: 'https://app.618cpcp.com/download/apk '
          }
      case 'ylh':
        return {
          type: 'ylh',
          url: process.env.NODE_ENV === 'production' ? ApiUrl : '//ylh.lebole5.com',
          iosUrl: 'https://app.ylh066.com/download/apk',
          title: '永利会彩票',
          androidUrl: 'https://app.ylh066.com/download/apk'
        }
      case 'yy':
        return {
          type: 'yy',
          url: process.env.NODE_ENV === 'production' ? ApiUrl : '//yy.lebole5.com',
          iosUrl: 'https://app.yycpcom1.com/download/apk',
          title: 'YY彩票',
          androidUrl: 'https://app.yycpcom1.com/download/apk'
        }
      case 'yiteng':
        return {
          type: 'yiteng',
          url: process.env.NODE_ENV === 'production' ? ApiUrl : '//yiteng.lebole5.com',
          iosUrl: 'https://it441.com/download/apk',
          title: '亿腾彩票',
          androidUrl: 'https://it441.com/download/apk'
        }
      case 'letian':
        return {
          type: 'letian',
          url: process.env.NODE_ENV === 'production' ? ApiUrl : '//letian.lebole5.com',
          iosUrl: 'https://app.lt238.com/download/apk',
          title: '乐天彩票',
          androidUrl: 'https://app.lt238.com/download/apk'
        }
      default:
        return {}
    }
  }
  getTitle() {
    return this._getCurrent().title
  }
  // api 的域名
  getApiUrl() {
    return this._getCurrent().url
  }
  // 获取 ios url
  getIosUrl() {
    return this._getCurrent().iosUrl
  }
  // 获取 android url
  getAndroidUrl() {
    return this._getCurrent().androidUrl
  }
  // is_gd_ali
  getIsGdAli() {
    return this._getCurrent().type
  }


  async getOddsList(params) {
    try {
      const data = await api.getOddsList(params)
      return data.data
    } catch (error) {
      Promise.reject(error)
    }
  }
  parseOddsList(array) {
    if (_.isArray(array) && array.length > 0) {
      return _.map(array, item => {
        return _.assign({}, item, {
          list: _.map(item.list, current => _.assign(current, { isCheck: false }))
        })
      })
    }
    return []
  }
  getOid() {
    var d = sessionStorage.getItem("im_token");
    if (d) {
      var c = d.length - 2;
      return d.substr(1, c)
    } else {
      return false
    }
  }
}
