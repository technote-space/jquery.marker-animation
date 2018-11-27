require('jquery-inview');

(function ($) {

    "use strict";

    $.fn.markerAnimation = function (...args) {
        return this.each(function () {
            const target = $(this);
            const namespace = 'markerAnimation';
            const markerAnimationObj = {
                op: {
                    "color": '#fe9',
                    "pos": '0',
                    "thickness": '.6em',
                    "delay": '.1s',
                    "duration": '2s',
                    "function": 'ease',
                    "font_weight": 'bold',
                    "repeat": false
                },
                setOption: function (op) {
                    this.op = $.extend(this.op, op);
                },
                destroy: function () {
                    target.css({
                        "background": '',
                        'padding-right': ''
                    });
                },
                create: function (op) {
                    const $this = this;
                    this.setOption(op);
                    const css = {
                        'display': 'inline',
                        'background-position': 'left 0 bottom ' + $this.op.pos,
                        'background-size': '200% ' + $this.op.thickness,
                        'background-repeat': 'repeat-x',
                        'background-image': 'linear-gradient(to right, rgba(255,255,255,0) 50%, ' + $this.op.color + ' 50%)',
                        'transition': 'background-position ' + $this.op.duration + ' ' + $this.op.function + ' ' + $this.op.delay
                    };
                    if ($this.op.font_weight) {
                        css['font-weight'] = $this.op.font_weight;
                    }
                    target.on('inview.' + namespace, function (event, isInView) {
                        if (isInView) {
                            target.stop(true, true).css({
                                'background-position': 'left -100% bottom ' + $this.op.pos
                            });
                            if (!$this.op.repeat) {
                                $this.stop();
                            }
                        } else {
                            if ($this.op.repeat) {
                                target.trigger("refresh." + namespace);
                            }
                        }
                    }).css(css).data('inview', false);
                },
                refresh: function () {
                    this.destroy();
                    this.stop();
                    this.create();
                },
                removeEvent: function () {
                    target.off("." + namespace);
                },
                stop: function () {
                    target.off('inview.' + namespace);
                }
            };
            if (typeof args[0] === "string" && args[0] === "destroy") {
                target.trigger("destroy." + namespace);
            } else if (typeof args[0] === "string" && args[0] === "refresh") {
                target.trigger("refresh." + namespace);
            } else {
                markerAnimationObj.create(args[0]);

                target.on("destroy." + namespace, function () {
                    markerAnimationObj.removeEvent();
                    markerAnimationObj.destroy();
                }).on("refresh." + namespace, function () {
                    markerAnimationObj.refresh();
                });
            }
        });
    };
}(jQuery));