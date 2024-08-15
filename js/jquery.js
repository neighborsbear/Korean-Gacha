$(function(){
    var gold = 0
    var won = 0
    var tc_set = false
    var g_set = false
    // 세팅
    $("#rtc_none").click(function(){
        tc_set = false
        $(".oot").text("천장 off")
    })
    $("#rtc_on").click(function(){
        tc_set = true
        $(".oot").text("천장 on")
    })
    $("#rp_none").click(function(){
        g_set = false
        $(".oop").text("증정 off")
    })
    $("#rp_on").click(function(){
        g_set = true
        $(".oop").text("증정 on")
    })
    $(".oot").click(function(){
        if(tc_set==false){
            tc_set = true
            $(".oot").text("천장 on")
        }else{
            tc_set = false
            $(".oot").text("천장 off")
        }
    })
    $(".oop").click(function(){
        if(g_set==false){
            g_set = true
            $(".oop").text("증정 on")
        }else{
            g_set = false
            $(".oop").text("증정 off")
        }
    })

    $("#default").change(function(){
        gold = $("#gold").val()
        won = $("#won").val()
        $("#default .value").text(won/gold)
    })

    $("#p_btn").click(function(){
        $("#r_simulation .p_box").append('<div><input class="pick" type="number"><span>%</span></div>')
    })
    $("#p_del").click(function(){
        if($("#r_simulation .p_box>div:last").index()>=1){
            $("#r_simulation .p_box>div:last").remove()
        }
    })

    $("#rg_btn").click(function(){
        $("#r_simulation .g_box").append('<div><input class="gacha" type="number"><span>%</span></div>')
    })
    $("#rg_del").click(function(){
        if($("#r_simulation .g_box>div:last").index()>=1){
            $("#r_simulation .g_box>div:last").remove()
        }
    })

    var r_gacha = 0
    var p_gacha = 0

    var r_count = 0
    var p_total = 0

    var r_unit = 0
    function g_all(){
        p_gacha = 0
        for(i=0;i<=$("#r_simulation .p_box>div:last").index();i++){
            p_gacha+= parseFloat($("#r_simulation .p_box>div:eq("+i+") .pick").val())
        }
        r_gacha = 0
        for(i=0;i<=$("#r_simulation .g_box>div:last").index();i++){
            r_gacha+= parseFloat($("#r_simulation .g_box>div:eq("+i+") .gacha").val())
        }

        if ($("#r_simulation .p_box>div:last .pick").val()==""){
            p_gacha = 0
        }
        if ($("#r_simulation .g_box>div:last .gacha").val()==""){
            r_gacha = 0
        }

        p_total = p_gacha + r_gacha
        $("#r_simulation .p_all .value").text(p_gacha)
        $("#r_simulation .all .value").text(r_gacha)
        $("#r_simulation .p_check .value").text(p_total)
        r_unit = $("#r_gacha .row .unit").val()
        r_count = 100/p_total/r_unit
        $("#r_simulation .count .value").text(r_count)
    }

    
    $("#r_simulation").change(function(){
        g_all()
    })
    $("button").click(function(){
        g_all()
    })

    var r_top = 0
    $("#r_top").change(function(){
        r_top = $("#r_top .t_box .top").val()
    })

    var r_topCount = 0
    var r_pCount = 0
    var r_nCount = 0
    var rp_check = 0
    var rn_check = 0
    $("#r_simulation").change(function(){
        r_topCount = 0
        r_pCount = 0
        r_nCount = 0
        rp_check = 0
        rn_check = 0
        
        if($("#r_top .top").val()!=""){
            r_pCount = 100/(((100/p_total/p_total)*p_gacha))
            r_nCount = 100/(((100/p_total/p_total)*r_gacha))

            for(i=1;i<(r_top*r_unit);i++){
                rp_check += i*(p_gacha/100)*((1-(p_gacha/100))**(i-1))
            }
            rp_check += (r_top*r_unit) * ((1-(p_gacha/100))**((r_top*r_unit)-1))
            // rn_check = 100/r_nCount/r_unit
            rn_check = 100/r_nCount/r_unit

            r_topCount = (rp_check - (rn_check-(rn_check/r_top)))/r_unit

        }
        
        $("#test1 .test .value").text(r_pCount)
        $("#test2 .test .value").text(r_nCount)
        $("#rt_count .t_count .value").text(r_topCount)
    })

    var r_giftCount = 0
    $("#r_simulation").change(function(){
        r_giftCount = 0
        if($("#r_top .gift .present").val()!=""&&$("#r_top .gift .p_count").val()!=""){
            r_giftCount = r_count/(1 + r_count/$("#r_top .gift .present").val()*$("#r_top .gift .p_count").val())
        }
        $("#rg_count .g_count .value").text(r_giftCount)
    })

    var r_gtCount = 0
    $("#r_simulation").change(function(){
        r_gtCount = 0
        if($("#r_top .gift .present").val()!=""&&$("#r_top .gift .p_count").val()!=""){
            r_gtCount = r_topCount/(1 + r_topCount/$("#r_top .gift .present").val()*$("#r_top .gift .p_count").val())
        }
        $("#rtg_count .rtg_count .value").text(r_gtCount)
    })
    
    var r_conversion = 0
    $("#r_conversion .conversion").click(function(){
        r_conversion = 0

        // 천장
        if(tc_set==true&&g_set==false){
            r_conversion = r_topCount*$("#r_check .check").val()
        }
        // 증정
        if(tc_set==false&&g_set==true){
            r_conversion = r_giftCount*$("#r_check .check").val()
        }
        // 전부 on
        if(tc_set==true&&g_set==true){
            r_conversion = r_gtCount*$("#r_check .check").val()
        }
        // 전부 off
        if(tc_set==false&&g_set==false){
            r_conversion = r_count*$("#r_check .check").val()
        }
        
        $("#r_conversion .gold .value").text(r_conversion)
        $("#r_conversion .won .value").text(r_conversion*(won/gold)+"원")
    })
})