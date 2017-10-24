var R = {
    /**
     * =============================================================================================================  数组常用方法
     *
     取数组的最大最小值
     *
     @method getArrMaxMin
     *
     @param {array,string} arr 取值数组,maxmin 判断取最大还是最小值， min 最小值，max 最大值；
     *
     @return {string} 返回数组的最大或者最小值；
     */
    getArrMaxMin: function (arr, maxmin) {
        if (maxmin === "max") {
            return Math.max.apply(Math, arr);
        }
        else if (maxmin === "min") {
            return Math.min.apply(Math, arr);
        }
    },
    /**
     *
     取数组指定值得下标
     *
     @method getArrIndex
     *
     @param {array,anv} arr 取值数组,value 需要查找下标的值；
     *
     @return {num} 如果值存在返回该值的下标，如果不存在返回-1；
     */
    getArrIndex: function (arr, value) {
        for (var i = 0, vlen = arr.length; i < vlen; i++) {
            if (arr[i] === value) {
                return i;
            }
        }
        return -1;
    },
    /**
     *
     删除数组指定元素
     *
     @method ArrRemove
     *
     @param {array,anv} arr 取值数组,value 需要删除的值；
     *
     @return {array} 返回删除后的数组；
     */
    ArrRemove: function (arr, value) {
        var result = [];
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] !== value) {
                result.push(arr[i]);
            }
        }
        return result;
    },
    /**
     *
     数组去重
     *
     @method ArrUnique
     *
     @param {array} array 需要去重的数组；
     *
     @return {array} 返回处理后的数组；
     */
    ArrUnique: function (array) {
        var arr = [];
        for (var i = 0, l = array.length; i < l; i++) {
            for (var j = i + 1; j < l; j++)
                if (array[i] === array[j]) j = ++i;
            arr.push(array[i]);
        }
        return arr;
    },
    /**
     *
     多维数组转换为一维数组
     *
     @method flattenArr
     *
     @param {array} arr 多维数组；
     *
     @return {array} 返回处理后的一维数组；
     */
    flattenArr: function (arr) {
        var newArr = [];
        arr.forEach(function (val) {
            if (val instanceof Array) {
                Array.prototype.push.apply(newArr, R.flattenArr(val));
            } else {
                newArr.push(val);
            }
        });
        return newArr;
    },

    /**
     * 
     把平行结构转成树形结构
     * 
     @method formatTree
     * 
     @param {array} arr 平行结构的数组
     * 
     @param {object} optObj 可配置项，可选参数，包括 自身的id 和 父集的id名称
     * 
     @return {array}  返回树形结构的数组
     */
    formatTree: function (arr, id, pid) {
        var arr = arr || [];
        var rootArr = [];
        if (!id) id = 'id';
        if (!pid) pid = 'pid';
        for (var i = 0; i < arr.length; i++) {
            var children = [];
            for (var j = 0; j < arr.length; j++) {
                if (arr[j][pid] === arr[i][id]) {
                    children.push(arr[j]);
                }
            }
            arr[i].children = children;
            if (arr[i][pid] == '-1' || arr[i][pid] === '') {
                rootArr.push(arr[i]);
            }
        }
        return rootArr;
    },

    /**
     * ============================================================================================================= chart方法 
     * Echarts自适应屏幕
     * @param chartName
     */
    adaptionWindows: function adaptionWindows(chartName) {
        window.addEventListener('resize', function () {
            chartName.resize();
        });
    },


    /**
     * ============================================================================================================= 时间常用方法 
     日期格式化
     *
     @method flattenArr
     *
     @param {date} date 时间对象；
     *
     @param {string} fmt 想要格式化后的形式；
     *
     @return {string} 返回格式化后的日期字符串格式；
     */
    formatDate: function (date, fmt) {
        if (!fmt) {
            fmt = 'yyyy.MM.dd'
        }
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        var o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds(),

        }
        //补全0
        function padLeftZero(str) {
            return ('00' + str).substring(str.length);
        }

        for (var k in o) {
            if (new RegExp(`(${k})`).test(fmt)) {
                var str = o[k] + '';
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
            }

        }
        return fmt;
    },

    /** 
    获取一周的所有天数
    *
    @method getAllWeekT
    *
    @param {string} str 字符串日期格式；
    *
    @return {array} 返回 获取一周的所有天 的数组；
    */
    weekAllDay: function getAllWeekT(str) {
        var timeObj = new Date(str);
        var timeGetDay = timeObj.getDay() == 0 ? 7 : timeObj.getDay();
        var startT = timeObj.getTime() - 86400000 * (timeGetDay - 1); //周一的时间
        var resArr = [];
        for (var i = 0; i < 7; i++) {
            var dateStr = this.formatDate(new Date(startT + i * 86400000), 'yyyy-MM-dd');
            resArr.push(dateStr);
        }
        return resArr;
    },
    /*获取某月第一天*/
    monthFirstDay: function (dateObj) {
        if (!dateObj) dateObj = new Date();
        return this.formatDate(dateObj, 'yyyy-MM-01');
    },
    /*获取某月最后一天*/
    monthLastDay: function (dateObj) {
        if (!dateObj) dateObj = new Date();
        return this.formatDate(new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, 0), 'yyyy-MM-dd');
    },
    /*获取某月总天数*/
    monthTotalDays: function (dateObj) {
        if (!dateObj) dateObj = new Date();
        return new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, 0).getDate();
    },

    /**
     * ============================================================================================================= 正则常用方法 
     */

    /*去掉换行*/
    trimLine: function (str) {
        return str.replace(/[\r\n]/g, '');
    },
    /*去掉首尾空格*/
    trimHeadTail: function (str) {
        return str.replace(/(^\s*)|(\s*$)/g, '');
    },
    /*去掉所有空格*/
    trimAll: function (str) {
        return str.replace(/\s+/g, '');
    },
    /*验证手机号 只支持现有的17个号段*/
    isMobile: function (str) {
        return (/^1(30|31|32|33|34|35|36|37|38|39|45|47|50|51|52|53|55|56|57|58|59|70|76|77|78|80|81|82|83|84|85|86|87|88|89)\d{8}$/.test(this.trimHeadTail(str)));
    },
    /*验证电话 区号(3到4位)-电话号码(7到8位)-分机号(3到4位)*/
    isTel: function (str) {
        return (/^((0\d{2,3})-)?(\d{7,8})(-(\d{3,4}))?$/.test(this.trimHeadTail(str)));
    },
    /*验证是否为数字，正整数、负整数、正小数、负小数都将返回true*/
    isNumber: function isNumber(str) {
        if (this.isPositiveNumber()) return true;
        if (this.isNegativeNumber()) return true;
        return false;
    },
    /*验证是否为正数，正整数、正小数都将返回true*/
    isPositiveNumber: function (str) {
        if (this.isPositiveInt()) return true;
        return /^[0-9]+\.[0-9]+$/.test(this.trimHeadTail(str));
    },
    /*验证是否为负数，负整数、负小数都将返回true*/
    isNegativeNumber: function (str) {
        if (this.isNegativeInt()) return true;
        return /^-[0-9]+\.[0-9]+$/.test(this.trimHeadTail(str));
    },
    /*验证整数，正整数、负整数都返回true*/
    isInt: function (str) {
        if (this.isPositiveInt()) return true;
        if (this.isNegativeInt()) return true;
        return false;
    },
    /*验证是否是正整数*/
    isPositiveInt: function (str) {
        return /^[0-9]+$/.test(this.trimHeadTail(str));
    },
    /*验证是否是负整数*/
    isNegativeInt: function (str) {
        return /^-[1-9][0-9]*$/.test(this.trimHeadTail(str));
    },
    /*验证身份证合法性 纯数字15位  纯18位数字 17位数字+ X|x*/
    isCard: function (str) {
        return /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test(this.trimHeadTail(str));
    },
    /*验证email*/
    isEmail: function (str) {
        return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.trimHeadTail(str));
    },
    /*验证是否为汉字*/
    isChinese: function (str) {
        return /^[\u4e00-\u9fa5]{0,}$/.test(this.trimHeadTail(str));
    },


    /**
    * ============================================================================================================= 移动端常用方法 
    *
    检测是否是移动端设备，包括手机、pad等
    *
    @method isMobile
    *
    @return {boolean}  返回true代表是移动设备
    */
    isMobile: function () {
        var check = false;
        (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    },

    /**
    * ============================================================================================================= 路由常用方法 
    *
    获取url参数
    *
    @method queryStr
    *
    @return {array}  返回数组对象
    */
    queryStr: function () {
        var arr = [];
        var name, value, i;
        var str = location.search;
        var num = str.indexOf("?")
        str = str.substr(num + 1);
        if (str != "") {
            var arrtmp = str.split("&");
            for (i = 0; i < arrtmp.length; i++) {
                num = arrtmp[i].indexOf("=");
                if (num > 0) {
                    name = arrtmp[i].substring(0, num);
                    value = arrtmp[i].substr(num + 1);
                    arr[name] = value;
                }
            }
        }
        return arr;
    },
};