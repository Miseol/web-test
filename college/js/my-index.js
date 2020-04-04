// 轮播图响应图片居中
$(function () {
  $(window).on("resize", function () {
    // 1.获取窗口宽度
    let clientW = $(window).width();
    // 2.设置临界值
    let isShowBigImg = clientW >= 800;
    // 3.获取所有的item
    let $allItems = $("#lk_carousel .item");
    // 4. 遍历
    $allItems.each(function (index, item) {
      // 4.1 取出图片的路径
      let src = isShowBigImg ? $(item).data("lg-img") : $(item).data("sm-img");
      let imgUrl = 'url(' + src + ')';
      // 4.2 设置背景
      $(item).css({
        backgroundImage: imgUrl
      });
      // 4.3 设置img标签
      if (!isShowBigImg) {
        let $img = '<img src=' + src + '>';
        $(item).empty().append($img);
        // $($img).css({
        // });
      } else {
        $(item).empty();
      }

    })

  })
  // 自动触发
  $(window).trigger("resize");

  // 工具提示
  $('[data-toggle="tooltip"]').tooltip();

  // 处理动态宽度
  $(window).on("resize", function () {
    let $ul = $('#lk_product .nav');
    let $allLis = $("[role='presentation']", $ul);

    let totalW = 0;
    $allLis.each(function (index, item) {
      totalW += $(item).width();
    });

    let parentW = $ul.parent().width();

    if (totalW > parentW) {
      $ul.css({
        width: totalW + "px"
      })
    } else {
      $ul.removeAttr("style");
    }
  });

  // 导航滚动跳转
  let allLis = $("#lk_nav li");

  $(allLis[2]).on("click", function () {
    $("html,body").animate({
      scrollTop: $("#lk_hot").offset().top
    }, 500);
  });

  $(window).trigger("resize");
})