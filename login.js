layui.use(['jquery','layer'], function () {
        var $      = layui.jquery;
        var layer  = layui.layer;

        var InterValObj;
        var count = 90;
        var curCount;

        $('#btnSendCode').click(function(){
            var reg = /[0-9]{11}/;
            if($('#phone').val()=='' || $('#phone').val().match(reg)==null){
                layer.msg('请输入正确的手机号');
                return false
            }
            curCount = count;
            layer.msg('请稍后');
            $('#btnSendCode').attr('disabled','true'); //设置按钮为禁用状态
            $('#phone').attr('disabled','true');
            $('#phone').addClass('layui-disabled');
            $('#btnSendCode').addClass('layui-btn-disabled');
            $('#btnSendCode').text(curCount + "秒后重获");
            InterValObj = window.setInterval(SetRemainTime, 1000); // 启动计时器timer处理函数，1秒执行
            $.ajax({
                url: "https://h5.ha.chinamobile.com/hnmccClientWap/QWHPHY202002/sendmsg.do",
                data: {'mobile':$('#phone').val()},
                type: "POST",
                dataType: "json",
                success: function(data) {
                    console.log(data)
                    layer.msg('发送成功');
                },
                error: function(data) {
                    layer.msg('网络错误');
                }
            });
        })
        function SetRemainTime() {
            if(curCount == 0) {
                $('#btnSendCode').removeClass('layui-btn-disabled');
                $('#phone').removeClass('layui-disabled');
                $('#phone').removeAttr('disabled');
                $('#btnSendCode').text("重获验证码");
                window.clearInterval(InterValObj); // 停止计时器
                $('#btnSendCode').removeAttr('disabled'); //移除禁用状态改为可用
            } else {
                curCount--;
                $('#btnSendCode').text(curCount + "秒后重获");
            }
        }

        $('#slogin').click(function(){
            var reg1 = /[0-9]{11}/;
            if($('#phone').val()==='' || $('#phone').val().match(reg1)==null){
                layer.msg('请输入正确的手机号');
                return false
            }
            var reg2 = /[0-9]{6}/;
            if($('#sms').val()==='' || $('#sms').val().match(reg2)==null){
                layer.msg('请输入正确的验证码');
                return false
            }
            $.ajax({
                url: "http://121.5.235.217/slogin",
                data: {'phone':$('#phone').val(),'sms':$('#sms').val()},
                type: "POST",
                dataType: "json",
                success: function(data) {
                    console.log(data)
                    if (data.code==='5'){
                        window.location.href ='/'
                    }else {
                        layer.msg(data.msg);
                    }
                },
                error: function(data) {
                    layer.msg('网络异常！');
                }
            });
        })
    });