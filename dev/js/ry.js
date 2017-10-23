var R = {
    /**
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
    }
};