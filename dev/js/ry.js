var R = {
    /**
     *
     取数组的最大最小值
     *
     @method getMaximin
     *
     @param {array,string} arr 取值数组,maxmin 判断取最大还是最小值， min 最小值，max 最大值；
     *
     @return {string} 返回数组的最大或者最小值；
     */
    getMaximin: function (arr, maximin) {
        if (maximin === "max") {
            return Math.max.apply(Math, arr);
        }
        else if (maximin === "min") {
            return Math.min.apply(Math, arr);
        }
    },
    /**
     *
     取数组指定值得下标
     *
     @method isHasElementOne
     *
     @param {array,anv} arr 取值数组,value 需要查找下标的值；
     *
     @return {num} 如果值存在返回该值的下标，如果不存在返回-1；
     */
    isHasElementOne: function (arr, value) {
        for (var i = 0, vlen = arr.length; i < vlen; i++) {
            if (arr[i] === value) {
                return i;
            }
        }
        return -1;
    }
};