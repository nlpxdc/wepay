var app = new Vue({
    el: '#app',
    data: {
        enabled: false,
        ticket: 'LIKLckvwlJT9cWIhEQTwfJuU557garB7J1tppEvMocVrjutQBCV2MkDABHTlxexCO6hz55pnoKHA3PgCie2nFg',
        appId: 'wx0c14a6dfeab19166',
    },
    computed: {
        currentTime() {
            return Date.now();
        },
        nonceStr() {
            return Math.random().toString(16).substr(2);
        },
        originParams() {
            const originParams =
                'jsapi_ticket=' + this.ticket
                + '&noncestr=' + this.nonceStr
                + '&timestamp=' + this.currentTime
                + '&url=' + location.href;

            return originParams;
        },
        signature() {
            const shaObj = new jsSHA("SHA-1", "TEXT");
            shaObj.update(this.originParams);
            const signature = shaObj.getHash("HEX");
            return signature;
        },
    },
    mounted() {
        console.log('view mounted');

        wx.config({
            debug: false,
            appId: this.appId,
            timestamp: this.currentTime,
            nonceStr: this.nonceStr,
            signature: this.signature,
            jsApiList: [
                'chooseImage',
                'scanQRCode',
                'showAllNonBaseMenuItem',
                'startRecord',
                'openLocation'
            ]
        });

        wx.error(function (res) {
            console.error('wx error');
            console.error(res);
        });

        wx.ready(function () {
            console.log('wx ready');
        });
    },
    methods: {
        handleOpenCamera() {
            console.log('click open camera');

            wx.chooseImage({
                count: 1, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                // sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                sourceType: ['camera'],
                success: function (res) {
                    var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                    console.log(localIds);
                }
            });
        },
        handleScanQR() {
            console.log('click scan qr');
            wx.scanQRCode({
                needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                success: function (res) {
                    var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                    console.log(result);
                }
            });
        },
        handleGetGPS() {
            console.log('get gps click');
            wx.getLocation({
                type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                    var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                    var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                    var speed = res.speed; // 速度，以米/每秒计
                    var accuracy = res.accuracy; // 位置精度
                    console.log(res);
                }
            });
        },
        handleOpenMap() {
            console.log('open map click');
            wx.openLocation({
                latitude: 30.874221, // 纬度，浮点数，范围为90 ~ -90
                longitude: 121.691474, // 经度，浮点数，范围为180 ~ -180。
                name: '', // 位置名
                address: '', // 地址详情说明
                // scale: 14, // 地图缩放级别,整形值,范围从1~28。默认为最大
                scale: 14,
                infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
            });
        },
        handleShowAllFunc() {
            console.log('show all funcs click');
            // wx.showAllNonBaseMenuItem();
            // wx.startRecord();

            wx.showMenuItems({
                menuList: [] // 要显示的菜单项，所有menu项见附录3
            });
        }
    }
})