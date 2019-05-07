require( 'jquery-inview' );
import $ from 'jquery';

$.fn.markerAnimation = function( ...args ) {
	return this.each( function() {
		const target = $( this );
		const namespace = 'markerAnimation';
		const overridePrefix = 'ma_';
		const markerAnimationObj = {
			op: {
				'color': '#fe9',
				'padding_bottom': '.6em',
				'thickness': '.6em',
				'delay': '.1s',
				'duration': '2s',
				'function': 'ease',
				'font_weight': 'bold',
				'repeat': false,
				'stripe': false,
				'stripe_thickness': 2,
				'cssFilter': function( css ) {
					return css;
				},
			},
			resetKeys: [
				'background',
				'padding-bottom',
				'font-weight',
				'transition',
			],
			setOption: function( op ) {
				$.extend( this.op, op );
			},
			destroy: function() {
				const $this = this;
				if ( target[ 0 ].resetValues ) {
					$this.resetKeys.forEach( function( key ) {
						target.css( key, target[ 0 ].resetValues[ key ] );
					} );
					target[ 0 ].resetValues = null;
				}
				target.attr( 'data-marker_animation', false );
			},
			create: function( op ) {
				const $this = this;
				this.setOption( op );
				let css = {
					'display': 'inline',
					'background-position': 'left 0 center',
					'padding-bottom': $this.op.padding_bottom,
				};
				if ( $this.op.stripe ) {
					css [ 'background-size' ] = '0 ' + $this.op.thickness;
					css [ 'background-repeat' ] = 'no-repeat';
					// eslint-disable-next-line no-magic-numbers
					css[ 'background-image' ] = 'repeating-linear-gradient(-45deg, ' + $this.op.color + ', ' + $this.op.color + ' ' + $this.op.stripe_thickness + 'px,transparent ' + $this.op.stripe_thickness + 'px,transparent ' + ( $this.op.stripe_thickness * 2 ) + 'px)';
				} else {
					css[ 'background-size' ] = '200% ' + $this.op.thickness;
					css[ 'background-repeat' ] = 'repeat-x';
					css[ 'background-image' ] = 'linear-gradient(to right, rgba(255,255,255,0) 50%, ' + $this.op.color + ' 50%)';
				}
				if ( $this.op.font_weight ) {
					css[ 'font-weight' ] = $this.op.font_weight;
				}
				target[ 0 ].resetValues = {};
				$this.resetKeys.forEach( function( key ) {
					target[ 0 ].resetValues[ key ] = target.css( key );
				} );
				css = $this.op.cssFilter( css );
				if ( '0s' === $this.op.delay && '0s' === $this.op.duration ) {
					if ( $this.op.stripe ) {
						target.css( css ).css( {
							'background-size': '100% ' + $this.op.thickness,
						} ).attr( 'data-marker_animation', true );
					} else {
						target.css( css ).css( {
							'background-position': 'left -100% center',
						} ).attr( 'data-marker_animation', true );
					}
				} else {
					target.data( 'inview', false ).on( 'inview.' + namespace, function( event, isInView ) {
						if ( isInView ) {
							$this.onInView();
						} else {
							$this.offInView();
						}
					} ).css( css ).attr( 'data-marker_animation', true );
				}
			},
			refresh: function() {
				this.destroy();
				this.stop();
				this.create();
			},
			removeEvent: function() {
				target.off( '.' + namespace );
			},
			stop: function() {
				target.off( 'inview.' + namespace );
			},
			onInView: function() {
				const $this = this;
				const css = {};
				if ( $this.op.stripe ) {
					css[ 'transition' ] = 'background-size ' + this.op.duration + ' ' + this.op.function + ' ' + this.op.delay;
					css[ 'background-size' ] = '100% ' + $this.op.thickness;
				} else {
					css[ 'transition' ] = 'background-position ' + this.op.duration + ' ' + this.op.function + ' ' + this.op.delay;
					css[ 'background-position' ] = 'left -100% center';
				}
				target.stop( true, true ).css( css );
				if ( ! this.op.repeat ) {
					this.stop();
				}
			},
			offInView: function() {
				if ( this.op.repeat ) {
					target.trigger( 'refresh.' + namespace );
				}
			},
		};
		if ( typeof args[ 0 ] === 'string' && args[ 0 ] === 'destroy' ) {
			target.trigger( 'destroy.' + namespace );
		} else if ( typeof args[ 0 ] === 'string' && args[ 0 ] === 'refresh' ) {
			target.trigger( 'refresh.' + namespace );
		} else {
			if ( target.attr( 'data-marker_animation' ) ) {
				markerAnimationObj.destroy();
				markerAnimationObj.removeEvent();
			}

			const options = $.extend( {}, args[ 0 ] );
			Object.keys( markerAnimationObj.op ).forEach( function( key ) {
				const data = target.data( overridePrefix + key );
				if ( undefined !== data ) {
					options[ key ] = data;
				}
				if ( 'string' === typeof options[ key ] ) {
					options[ key ] = options[ key ].trim();
					if ( 'delay' === key || 'duration' === key ) {
						if ( ! /^-?\d*\.?\d+m?s$/.test( options[ key ] ) ) {
							options[ key ] = '0s';
						} else if ( /^-?0?\.?0+m?s$/.test( options[ key ] ) ) {
							options[ key ] = '0s';
						}
					} else if ( 'stripe_thickness' === key ) {
						options[ key ] = parseInt( options[ key ], 10 );
						if ( isNaN( options[ key ] ) ) {
							options[ key ] = 2;
						}
					}
				}
			} );
			markerAnimationObj.create( options );

			target.on( 'destroy.' + namespace, function() {
				markerAnimationObj.destroy();
				markerAnimationObj.removeEvent();
			} ).on( 'refresh.' + namespace, function() {
				markerAnimationObj.refresh();
			} );

			if ( options.test ) {
				target[ 0 ].markerAnimationObj = markerAnimationObj;
			}
		}
	} );
};