require('jquery-inview');

(function ($) {

    "use strict";

    $.fn.markerAnimation = function (...args) {
        return this.each(function () {
            const target = $(this), namespace = 'markerAnimation';
            const markerAnimationObj = {
                op: {
                    "color": '#fe9',
                    "pos": '.7em',
                    "size": '.6em',
                    "width": '.5em',
                    "delay": 100,
                    "speed": 10,
                    "easing": 'swing',
                    "once": true,
                    "callback": null
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
                    target.on('inview.' + namespace, function (event, isInView) {
                        if (isInView) {
                            target.stop(true, true).css({
                                'display': 'inline-block',
                                'background-position': '0 ' + $this.op.pos,
                                'background-size': '200% ' + $this.op.size,
                                'background-repeat': 'repeat-x',
                                'background-image': 'linear-gradient(to right, rgba(255,255,255,0) 50%, ' + $this.op.color + ' 50%)',
                                'padding-right': $this.op.width
                            });
                            const duration = Math.ceil(target.width() * 50 / Math.max(1, $this.op.speed));
                            target.delay(Math.max(0, $this.op.delay)).animate({
                                'background-position-x': '-100%'
                            }, duration, $this.op.easing, $this.op.callback);
                            if ($this.op.once) {
                                $this.stop();
                            }
                        } else {
                            if (!$this.op.once) {
                                target.trigger("refresh." + namespace);
                            }
                        }
                    }).data('inview', false);
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