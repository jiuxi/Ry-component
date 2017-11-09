(function (window, $, Vue, undefined) {
    /** 
     * 下拉框组件
     * 参数：datalist（下拉列表数据源） 、 beforestr（头部的前缀）、showkey（显示数据源中那个字段）、size(字体大小， 小为small)
    */
    Vue.component('select-box', {
        template: '<div class="selectBox" :class="\'selectBox-\'+size" >' +
        '<div class="selectHd" @click.stop="toggleMenu($event)">' +
        '{{beforestr}}' +
        '<em>{{title}}</em>' +
        '<span class="iconBox">' +
        '<span class="iconfont  icon-moreunfold"></span>' +
        '</span>' +
        '</div>' +
        '<div class="selectMain">' +
        '<ul>' +
        '<li v-for="(item,index) in datalist" @click="handle($event,item,index)" :class="{\'active\':index === selIndex,}" >' +
        '<div>{{item[showkey ? showkey : \'name\' ]}}</div>' +
        '</li>' +
        '</ul>' +
        '</div>' +
        '</div>',
        props: ['datalist', 'beforestr', 'showkey', 'size'],
        methods: {
            handle: function ($event, item, index) {
                this.title = item[this.showkey ? this.showkey : 'name'];
                this.selIndex = index;
                this.$emit('event', item);
            },
            toggleMenu: function ($event) {
                $($event.currentTarget).next().toggle();
            },
        },
        data: function () {
            return {
                datalist: this.datalist,
                title: this.datalist[0][this.showkey ? this.showkey : 'name'],
                selIndex: 0,
            }
        },
        watch: {
            datalist: function () {
                this.selIndex = 0;
            },
        },
    });

    /** 
     * 下拉框组件
     * 参数：datalist（下拉列表数据源） 、 type（tab列表类型）、showkey（显示数据源中哪个字段）、iconarr(显示字体库的样式)
    */
    Vue.component('tab-box', {
        template: '<div class="tabBox" :class="type ? type : \'tabDefault\'" v-if="datalist.length" >' +
        '<transition name="fade"><div class="tabBackground" v-if="type == \'tabBorder\'" ></div></transition>' +
        '<ul class="clearfix">' +
        '<li v-for="(item,index) in datalist" :class="{\'active\':index == selIndex}"  @click="handle($event,item,index)" >' +
        '<em class="iconfont  " v-if="type==\'tabIcon\'" :class="iconarr ?  iconarr[index] : \'\' "></em>' +
        '<span >{{ item[showkey ? showkey : \'name\'] }}</span>' +
        '</li >' +
        '</ul>' +
        '</div >',
        props: ['datalist', 'type', 'showkey', 'iconarr'],
        methods: {
            handle: function ($event, item, index) {
                this.selIndex = index;
                this.$emit('event', item);
                if (this.type == 'tabBorder') {
                    var $el = $($event.currentTarget);
                    var width = $el.parents('.tabBox').find('li:eq(0)').width() + 1;
                    this.backgroundLeft = index * width;
                    $el.parents('.tabBox').find('.tabBackground').animate({ left: this.backgroundLeft });
                }
            }
        },
        data: function () {
            return {
                datalist: this.datalist,
                selIndex: 0,
                backgroundLeft: 0,
            }
        },
        watch: {
            datalist: function () {
                this.selIndex = 0;
                this.backgroundLeft = 0;
                $(this.$el).find('.tabBackground').css('left', 0);
            },
        },
    });

})(window, jQuery, Vue)


//点击页面其他位置 收起左右的下拉框
$(document).on('click', function () {
    $('.selectMain').hide();
});