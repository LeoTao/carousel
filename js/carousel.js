/*
 * auth taolei
 * date 2016-04-12
 */
var Carousel = function( options ) {
    var defaultOptions = {
        carousel_box: null, //大图轮播
        sub_carousel_box: null, //小图轮播
        bar: null,
        sub_bar: null,
        active_class: 'active',
        autoplay: 1000,
        nextButton: null,
        prevButton: null,
        buttonHover: 0  //button是否渐变 0不出现或一直出现 1鼠标移到上面才出现
    };
    this.options = $.extend({},defaultOptions,options||{});
    this.cbWitdh = 0;
    this.slidesTimer = undefined;
    this.current_index = 0; 
    this.current_index_ul = 1;
    this.init();
};

Carousel.prototype={
    init: function () {
        var _ = this;
        _.carouselBoxInit();
        _.play();
    },
    //初始化大banner
    carouselBoxInit: function () {
        var _ = this;

        var slideUl = $(_.options.carousel_box).find('ul');
        var lastLi = slideUl.find('li').last().clone();
        var firstLi = slideUl.find('li').first().clone();

        firstLi.appendTo(slideUl);
        lastLi.prependTo(slideUl);

        var slideLiNum = slideUl.find('li').length;
        _.cbWitdh = slideUl.find('li').width();
        var slideUlWidth = slideLiNum * _.cbWitdh;
        slideUl.css({
            'width': slideUlWidth + 'px',
            'left': -_.cbWitdh + 'px'
        });

        _.mouseover($(_.options.carousel_box));
        _.mouseover($(_.options.prevButton));
        _.mouseover($(_.options.nextButton));

        $(_.options.prevButton).on('click', function () {
            var _that = this;
            $(_that).attr('disabled',true);
            _.reversePlay();
        });
        $(_.options.nextButton).on('click', function () {
            var _that = this;
            $(_that).attr('disabled',true);
            _.autoPlay();
        });

    },
    mouseover: function (obj) {
        var _ = this;
        obj.mouseenter(function () {
            clearInterval(_.slidesTimer);
            
            if (_.options.buttonHover == 1) {
                _.buttonEnter();
            }
            
        });
        obj.mouseleave(function () {
            _.play();

            if (_.options.buttonHover == 1) {
                _.buttonLeave();
            }
        });
    },
    buttonEnter: function () {
        var _ = this;
        $(_.options.nextButton).css({
            'opacity' : '0.5',
            'filter' : 'alpha(opacity=50)',
            'transition' : 'opacity 0.5s',
            '-moz-transition' : 'opacity 0.5s',
            '-webkit-transition' : 'opacity 0.5s',
            '-o-transition' : 'opacity 0.5s'
        });

        $(_.options.prevButton).css({
            'opacity' : '0.5',
            'filter' : 'alpha(opacity=50)',
            'transition' : 'opacity 0.5s',
            '-moz-transition' : 'opacity 0.5s',
            '-webkit-transition' : 'opacity 0.5s',
            '-o-transition' : 'opacity 0.5s'
        });
    },
    buttonLeave: function () {
        var _ = this;
        $(_.options.nextButton).css({
            'opacity' : '0',
            'filter' : 'alpha(opacity=0)',
            'transition' : 'opacity 0.5s',
            '-moz-transition' : 'opacity 0.5s',
            '-webkit-transition' : 'opacity 0.5s',
            '-o-transition' : 'opacity 0.5s'
        });

        $(_.options.prevButton).css({
            'opacity' : '0',
            'filter' : 'alpha(opacity=0)',
            'transition' : 'opacity 0.5s',
            '-moz-transition' : 'opacity 0.5s',
            '-webkit-transition' : 'opacity 0.5s',
            '-o-transition' : 'opacity 0.5s'
        });
    },

    //向左移动
    reversePlay: function () {
        var _ = this;
        var slideUl = $(_.options.carousel_box).find('ul');
        var slideLiNum = slideUl.find('li').length;

        _.current_index--;
        _.current_index_ul--;

        if(_.current_index < 0) {
            _.current_index = slideLiNum - 3;
        }

        if (_.current_index_ul < 0) {
            _.current_index_ul = slideLiNum - 3;
        }

        slideUl.animate({'left': -_.cbWitdh*_.current_index_ul+'px'}, 500,function () {
            if (_.current_index_ul == 0) {
                slideUl.css({'left': -_.cbWitdh * (slideLiNum - 2)+'px'});
                _.current_index_ul = slideLiNum - 2;
            }
            $(_.options.prevButton).removeAttr('disabled');
        });
    },
    //自动 向右移动
    autoPlay: function() {
        var _ = this;
        var slideUl = $(_.options.carousel_box).find('ul');
        var slideLiNum = slideUl.find('li').length;

        _.current_index++;
        _.current_index_ul++;

        if(_.current_index > slideLiNum - 1) {
            _.current_index = 0;
        }

        if (_.current_index_ul > slideLiNum - 1) {
            _.current_index_ul = 2;
        }

        slideUl.animate({'left': -_.cbWitdh*_.current_index_ul+'px'}, 500,function () {
            if (_.current_index_ul == slideLiNum - 1) {
                slideUl.css({'left': -_.cbWitdh+'px'});
                _.current_index_ul = 1;

            }
            $(_.options.nextButton).removeAttr('disabled');
        });
    },
    play: function(num) {
        var _ = this;
        if (typeof _.slidesTimer !== 'undefined') return false;
        clearInterval(_.slidesTimer);

        _.slidesTimer = setInterval(function () {
            _.autoPlay();
        }, _.options.autoplay);
    }
}

//module.exports=Carousel;