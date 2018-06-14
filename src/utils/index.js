import config from '@/config'
import store2 from 'store2'
import api from '@/api'
// 替换公共的图片路径
const getPublicImg = (path) => {
	return `${config.publicImg}${path}`
 }

// 根据number 设置颜色
const getRoundNumberClass = (number) => {
	switch (Number(number)) {
		case 1:
		case 2:
		case 7:
		case 8:
		case 12:
		case 13:
		case 18:
		case 19:
		case 23:
		case 24:
		case 29:
		case 30:
		case 34:
		case 35:
		case 40:
		case 45:
		case 46:
			return 'red'
		case 3:
		case 4:
		case 9:
		case 10:
		case 14:
		case 15:
		case 20:
		case 25:
		case 26:
		case 31:
		case 36:
		case 37:
		case 41:
		case 42:
		case 47:
		case 48:
			return 'blue'
		default:
			return 'green'
	}
}

// 获取缓存
const getGamesCache = (key) => {
	return store2.get(`game_${key}`)
}
// set彩种的缓存
const setGamesCache =  (key, value) => {
	store2.set(`game_${key}`, value)
}

// 解析赔率
const parseOddsList =  (array) => {
	if (_.isArray(array) && array.length > 0) {
		return _.map(array, item => {
			return _.assign({}, item, {
				list: _.map(item.list, current => _.assign(current, {isCheck: false}))
			})
		})
	}
	return []
}

//阻止ios默认下滑的事件
const banOverFlow = (evt) => {

	// var startMoveYmap = [];
	//
	// var status = '11',
    // e = e || window.event, // 使用 || 运算取得event对象
    // ele = evt,
    // currentY = e.touches[0].clientY,
    // //startY = startMoveYmap[ele.id],
    // scrollTop = ele.scrollTop,
    // offsetHeight = ele.offsetHeight,
    // scrollHeight = ele.scrollHeight;
	// if (scrollTop === 0) {
	//     // 如果内容小于容器则同时禁止上下滚动
	//     status = offsetHeight >= scrollHeight ? '00' : '01';
	// } else if (scrollTop + offsetHeight >= scrollHeight) {
	//     // 已经滚到底部了只能向上滚动
	//     status = '10';
	// }
	// if (status != '11') {
	//     // 判断当前的滚动方向
	//     var direction = currentY - 94 > 0 ? '10' : '01';
	//     // 操作方向和当前允许状态求与运算，运算结果为0，就说明不允许该方向滚动，则禁止默认事件，阻止滚动
	//     if (!(parseInt(status, 2) & parseInt(direction, 2))) {
	//         e.preventDefault();
	//         e.stopPropagation();
	//         return;
	//     }
	// }


}

export {getPublicImg, getPk10, getRoundNumberClass, getGamesCache, setGamesCache, parseOddsList, banOverFlow}
