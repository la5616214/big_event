$(function() {
    // 点击登录盒子，自己隐藏 注册盒子显示
    $('#link_reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    });

    $('#link_login').on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide();
    });

    const { form, layer } = layui;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码不符合规定'],
        repwd: function(value) {
            let pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return '密码不一致';
            }

        }
    });

    // 注册
    $('#form_reg').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                $('#link_login').click();
            }
        });
    });

    //登录
    $('#form_login').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                localStorage.setItem('token', res.token);
                location.href = '/index.html';
            }
        });
    });
});