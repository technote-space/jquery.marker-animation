import $ from 'jquery';
import './index';
import './plugin.scss';

$(() => {
  $('#app').html(`
<div>
	<div class="">
		This page is demonstration of <a href="https://github.com/technote-space/jquery.marker-animation">jQuery Marker Animation</a>.
	</div>
	<div class="blank-box">
		<p>
			Hello, Dolly
		</p>
		<p>
			<span class="marker-animation" data-ma_repeat="true">Well, hello, Dolly</span>
		</p>
		<p>
			It's so nice to have you back where you belong
		</p>
		<p>
			You're lookin' swell, Dolly
		</p>
		<p>
			I can tell, Dolly
		</p>
		<p>
			<span class="marker-animation" data-ma_color="blue">You're still glowin', you're still crowin'</span>
		</p>
		<p>
			You're still goin' strong
		</p>
		<p>
			I feel the room swayin'
		</p>
		<p>
			While the band's playin'
		</p>
		<p>
			One of our old favorite songs from way back when
		</p>
		<p>
			<span class="marker-animation" data-ma_color="red">So, take her wrap, fellas<br>Dolly, never go away again</span>
		</p>
		<p>
			Hello, Dolly
		</p>
		<p>
			Well, hello, Dolly
		</p>
		<p>
			It's so nice to have you back where you belong
		</p>
		<p>
			<span class="marker-animation" data-ma_font_weight="null"> You're lookin' swell, Dolly<br>I can tell, Dolly<br>You're still glowin'</span>, you're still crowin'
		</p>
		<p>
			You're still goin' strong
		</p>
		<p>
			I feel the room swayin'
		</p>
		<p>
			<span class="marker-animation" data-ma_duration="6s">While the band's playin'<br>One of our old favorite songs from way back when</span>
		</p>
		<p>
			So, golly, gee, fellas
		</p>
		<p>
			<span class="marker-animation" data-ma_stripe="true" data-ma_color="#00ffcc">Have a little faith in me, fellas<br>Dolly, never go away</span>
		</p>
		<p>
			Promise, you'll never go away
		</p>
		<p>
			Dolly'll never go away again
		</p>
		<p style="direction: rtl">
			<bdo lang="ar" dir="rtl">
				<span class="marker-animation" data-ma_rtl="true" data-ma_repeat="true">
				هذا اختبار اللغة العربية.
				</span>
				هل هذه المكتبة تعمل بشكل صحيح؟
				<span class="marker-animation" data-ma_rtl="true" data-ma_color="#00ffcc">
				إذا كان لديك أي مشاكل ، يرجى الإبلاغ عنها.
				</span>
			</bdo>
		</p>
		<p>
			<a class="btn btn-light-blue reset-animation">Reset</a>
		</p>
	</div>
</div>`);

  $('#app .marker-animation').markerAnimation();
  $('#app .reset-animation').on('click', () => {
    $('#app .marker-animation').markerAnimation('refresh');
  });
});
