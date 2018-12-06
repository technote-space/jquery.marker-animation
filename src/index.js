require('jquery-inview');
import $ from 'jquery';

$.fn.markerAnimation = function (...args) {
    return this.each(function () {
        const target = $(this);
        const namespace = 'markerAnimation';
        const overridePrefix = 'ma_';
        const markerAnimationObj = {
            op: {
                'color': '#fe9',
                'position_bottom': '0',
                'padding_bottom': '.1em',
                'thickness': '.6em',
                'delay': '.1s',
                'duration': '2s',
                'function': 'ease',
                'font_weight': 'bold',
                'repeat': false,
                'cssFilter': function (css) {
                    return css;
                }
            },
            resetKeys: [
                'background',
                'padding-bottom',
                'font-weight',
                'transition'
            ],
            setOption: function (op) {
                $.extend(this.op, op);
            },
            destroy: function () {
                const $this = this;
                if (target[0].resetValues) {
                    $this.resetKeys.forEach(function (key) {
                        target.css(key, target[0].resetValues[key]);
                    });
                    target[0].resetValues = null;
                }
                target.attr('data-marker_animation', false);
            },
            create: function (op) {
                const $this = this;
                this.setOption(op);
                let css = {
                    'display': 'inline',
                    'background-position': 'left 0 bottom ' + $this.op.position_bottom,
                    'background-size': '200% ' + $this.op.thickness,
                    'background-repeat': 'repeat-x',
                    'background-image': 'linear-gradient(to right, rgba(255,255,255,0) 50%, ' + $this.op.color + ' 50%)',
                    'padding-bottom': $this.op.padding_bottom
                };
                if ($this.op.font_weight) {
                    css['font-weight'] = $this.op.font_weight;
                }
                target[0].resetValues = {};
                $this.resetKeys.forEach(function (key) {
                    target[0].resetValues[key] = target.css(key);
                });
                css = $this.op.cssFilter(css);
                target.data('inview', false).on('inview.' + namespace, function (event, isInView) {
                    if (isInView) {
                        $this.onInView();
                    } else {
                        $this.offInView();
                    }
                }).css(css).attr('data-marker_animation', true);
            },
            refresh: function () {
                this.destroy();
                this.stop();
                this.create();
            },
            removeEvent: function () {
                target.off('.' + namespace);
            },
            stop: function () {
                target.off('inview.' + namespace);
            },
            onInView: function () {
                target.stop(true, true).css({
                    'transition': 'background-position ' + this.op.duration + ' ' + this.op.function + ' ' + this.op.delay,
                    'background-position': 'left -100% bottom ' + this.op.position_bottom
                });
                if (!this.op.repeat) {
                    this.stop();
                }
            },
            offInView: function () {
                if (this.op.repeat) {
                    target.trigger('refresh.' + namespace);
                }
            }
        };
        if (typeof args[0] === 'string' && args[0] === 'destroy') {
            target.trigger('destroy.' + namespace);
        } else if (typeof args[0] === 'string' && args[0] === 'refresh') {
            target.trigger('refresh.' + namespace);
        } else {
            if (target.attr('data-marker_animation')) {
                markerAnimationObj.destroy();
                markerAnimationObj.removeEvent();
            }

            const options = $.extend({}, args[0]);
            Object.keys(markerAnimationObj.op).forEach(function (key) {
                const data = target.data(overridePrefix + key);
                if (undefined !== data) {
                    options[key] = data;
                }
            });
            markerAnimationObj.create(options);

            target.on('destroy.' + namespace, function () {
                markerAnimationObj.destroy();
                markerAnimationObj.removeEvent();
            }).on('refresh.' + namespace, function () {
                markerAnimationObj.refresh();
            });

            if (options.test) {
                target[0].markerAnimationObj = markerAnimationObj;
            }
        }
    });
};