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
     * ============================================================================================================= chart方法 
     */


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
     * ============================================================================================================= 正则常用方法 
     */

    /*去掉换行*/
    trimLine: function trimLine(str) {
        return str.replace(/[\r\n]/g, '');
    },
    /*去掉首尾空格*/
    trimHeadTail: function trimHeadTail(str) {
        return str.replace(/(^\s*)|(\s*$)/g, '');
    },
    /*去掉所有空格*/
    trimAll: function trimAll(str) {
        return str.replace(/\s+/g, '');
    },
    /*验证手机号 只支持现有的17个号段*/
    isMobile: function pisMobile(str) {
        return (/^1(30|31|32|33|34|35|36|37|38|39|45|47|50|51|52|53|55|56|57|58|59|70|76|77|78|80|81|82|83|84|85|86|87|88|89)\d{8}$/.test(this.trimHeadTail(str)));
    },
    /*验证电话 区号(3到4位)-电话号码(7到8位)-分机号(3到4位)*/
    isTel: function pisTel(str) {
        return (/^((0\d{2,3})-)?(\d{7,8})(-(\d{3,4}))?$/.test(this.trimHeadTail(str)));
    },
    /*验证是否为数字，正整数、负整数、正小数、负小数都将返回true*/
    isNumber: function isNumber(str) {
        if (this.isPositiveNumber()) return true;
        if (this.isNegativeNumber()) return true;
        return false;
    },
    /*验证是否为正数，正整数、正小数都将返回true*/
    isPositiveNumber: function isPositiveNumber(str) {
        if (this.isPositiveInt()) return true;
        return /^[0-9]+\.[0-9]+$/.test(this.trimHeadTail(str));
    },
    /*验证是否为负数，负整数、负小数都将返回true*/
    isNegativeNumber: function isNegativeNumber(str) {
        if (this.isNegativeInt()) return true;
        return /^-[0-9]+\.[0-9]+$/.test(this.trimHeadTail(str));
    },
    /*验证整数，正整数、负整数都返回true*/
    isInt: function pisInt(str) {
        if (this.isPositiveInt()) return true;
        if (this.isNegativeInt()) return true;
        return false;
    },
    /*验证是否是正整数*/
    isPositiveInt: function isPositiveInt(str) {
        return /^[0-9]+$/.test(this.trimHeadTail(str));
    },
    /*验证是否是负整数*/
    isNegativeInt: function isNegativeInt(str) {
        return /^-[1-9][0-9]*$/.test(this.trimHeadTail(str));
    },
    /*验证身份证合法性 纯数字15位  纯18位数字 17位数字+ X|x*/
    isCard: function isCard(str) {
        return /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test(this.trimHeadTail(str));
    },
    /*验证email*/
    isEmail: function pisEmail(str) {
        return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.trimHeadTail(str));
    },
    /*验证是否为汉字*/
    isChinese: function pisChinese(str) {
        return /^[\u4e00-\u9fa5]{0,}$/.test(this.trimHeadTail(str));
    },
};