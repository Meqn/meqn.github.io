/*!
 * jQuery-scrollFix
 * @ desc: 滚动固定在某个位置的jQuery插件
 * @ version: 2.0.2
 * @ link: https://github.com/mengqing723/jQuery-scrollFix
 * @ by: mengqing723@gmail.com
 * @ update: Wed Nov 02 2016 16:49:55 GMT+0800 (中国标准时间)
 */

;(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object' && exports) {
        module.exports = factory;
    } else {
        factory(jQuery);
    }
}(function ($) {
    $.fn.scrollFix = function(options) {
        return this.each(function() {
            var defaults = {
                top: 0,                         
                bottom: 0,                      
                zindex: 999,                    
                startObj: null,                 
                position: 'top',                
                endObj: null,                   
                endPos: 0,                      
                fixClass: 'fixed',              
                fixFn: function() {},           
                fixEndFn: function() {},        
                endFn: function() {}            
            }
            var opts = $.extend({}, defaults, options);
            var $this = $(this),    
                $startObj = opts.startObj === null ? $this : $(opts.startObj),  
                isEnd = opts.endObj === null ? false : true;    

            var objStyle = $this.attr('style') ? $this.attr('style') : '',    
                objWidth = $this.width();   
            var startHeight = (opts.position === 'top') ? 0 : $startObj.outerHeight();    
            var startFix = $startObj.offset().top + startHeight - opts.bottom;    
            var endFix = isEnd ? parseInt($(opts.endObj).offset().top - opts.top - opts.endPos - $this.outerHeight()) : 0;  
            var endFixTop = endFix + opts.top;  

            var methods = {
                fixed: function(top) {
                    $this.css({position: 'fixed', top: top + 'px', zIndex: opts.zindex, width: objWidth})
                        .addClass(opts.fixClass);
                    opts.fixFn();
                },
                absolute: function(top) {
                    $this.css({position: 'absolute', top: top + 'px', zIndex: opts.zindex, width: objWidth});
                    opts.fixEndFn();
                },
                default: function() {
                    $this.attr('style', objStyle)
                        .removeClass(opts.fixClass);
                    opts.endFn();
                }
            }

            $(window).scroll(function(event) {
                var scrollTop = $(this).scrollTop();
                if(scrollTop > startFix) {
                    if(isEnd) {
                        if(scrollTop > endFix) {
                            methods.absolute(endFixTop);
                        } else {
                            methods.fixed(opts.top);
                        }
                    } else {
                        methods.fixed(opts.top);
                    }
                } else {
                    methods.default();
                }
            }).trigger('scroll');
        });
    }
}));