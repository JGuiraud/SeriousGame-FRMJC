$(document).ready(function () {
    console.log("ready");



    /* ----- carnet ----- */
    var $mybook = $('#mybook');
    var $bttn_next = $('#next_page_button');
    var $bttn_prev = $('#prev_page_button');
    var $loading = $('#loading');
    var $mybook_images = $mybook.find('img');
    var cnt_images = $mybook_images.length;
    var loaded = 0;

    $bttn_next.hide();

    $mybook_images.each(function () {
        var $img = $(this);
        var source = $img.attr('src');
        $('<img/>').load(function () {
            ++loaded;
            if (loaded == cnt_images) {
                $loading.hide();
                $bttn_next.show();
                $bttn_prev.hide();
                $mybook.show().booklet({
                    name: null,
                    width: 800,
                    height: 500,
                    speed: 600,
                    direction: 'LTR',
                    startingPage: 0,
                    easing: 'easeInOutQuad',
                    easeIn: 'easeInQuad',
                    easeOut: 'easeOutQuad',

                    closed: true,
                    closedFrontTitle: null,
                    closedFrontChapter: null,
                    closedBackTitle: null,

                    closedBackChapter: null,
                    covers: false,

                    pagePadding: 10,
                    pageNumbers: true,

                    hovers: false,
                    overlays: false,
                    tabs: false,
                    tabWidth: 60,
                    tabHeight: 20,
                    arrows: false,
                    cursor: 'pointer',

                    hash: false,
                    keyboard: true,
                    next: $bttn_next,
                    prev: $bttn_prev,

                    menu: null,
                    pageSelector: false,
                    chapterSelector: false,

                    shadows: true,
                    shadowTopFwdWidth: 166,
                    shadowTopBackWidth: 166,
                    shadowBtmWidth: 50,

                    before: function () { },
                    after: function () { }
                });
                Cufon.refresh();
            }
        }).attr('src', source);
    });


    /* ----- button carnet ---- */


    $(".container-carnet").click(function () {

        $(".carnet").addClass("carnetleft")
        $(".carnet").removeClass("carnetmiddle")
        $(this).delegate('.carnet', 'click', function () {
            if ($(".carnet").attr('class') == "carnet carnetleft") {
                // $("#next_page_button").fadeIn('fast')

                $(".carnet").removeClass("carnetleft")
                $(".carnet").addClass("carnetmiddle")
            } else if ($(".carnet").attr('class') == "carnet carnetmiddle") {

                $(".carnet").removeClass("carnetmiddle")

                $(".carnet").addClass("carnetleft")
            }
        })
    })
    // $("#mybook").click(function () {
    //     console.log("click")
    //     if ($(".carnet").attr('class') == "carnet carnetleft") {
    //         $(".carnet").removeClass("carnetleft")
    //         $(".carnet").addClass("carnetmiddle")
    //     } else if ($(".carnet").attr('class') == "carnet carnetmiddle") {
    //         $(".carnet").removeClass("carnetmiddle")

    //         $(".carnet").addClass("carnetleft")
    //     }
    //     console.log($(".carnet").attr('class'))
    // })

})