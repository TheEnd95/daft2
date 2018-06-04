
$(".player-songs").slick({
  centerMode: true,
  centerPadding: '0px',
  slidesToShow: 3,
  infinite:true,
  arrows:true,
  nextArrow: $(".icon-next"),
  prevArrow: $(".icon-prev")
});
var totalTime = $(".time-total").text().split(":");
var timeElap = $(".time-passed");
var miliseconds = ((parseInt(totalTime[0])*60)+(parseInt(totalTime[1])))*1000;
var intervalTime = miliseconds/100;
var i = 1,
	j = 0;
var minutes = 0;
var seconds = 0;
$(".player-songs").on("afterChange", function(event, slick, currentSlide, nextSlide){
  var cover = $("[data-slick-index='" +currentSlide+ "'] img").attr("src");
  var songName = $("[data-slick-index='" +currentSlide+ "'] .song-name").text();
  var songArtist = $("[data-slick-index='" +currentSlide+ "'] .song-artist").text();
  var songTime = $("[data-slick-index='" +currentSlide+ "'] .song-cover-wrapper").data("time");
  $(".album-view .song-name").text("").text(songName);
  $(".album-view .song-artist").text("").text(songArtist);
  $(".album-view .album-cover-wrapper img").attr("src",cover);
  $(".player-timer .time-total").text(songTime);
	totalTime = $(".time-total").text().split(":");
	timeElap = $(".time-passed");
 	miliseconds = ((parseInt(totalTime[0])*60)+(parseInt(totalTime[1])))*1000;
 	intervalTime = miliseconds/100;
});
function resetPlayer(){
	minutes=0;
	seconds=0;
	i=1;
	clearInterval(timer);
	clearInterval(barProgress);
	$(".time-passed").text("00:00");
	$(".icon-play").removeClass("playing");
	$(".time-bar,.player-waveform-container").css("width","0%");
}
$(".icon-next,.icon-prev").on("click",function(){
	if($(".icon-play").hasClass("playing")){
		resetPlayer();
	}
});

$(".back-icon,.downArrow-button,.back").on("click",function(){
	$(this).parent().parent().removeClass("active");
});
$(".icon-play").on("click",function(){
	$(this).toggleClass("playing");
	if($(this).hasClass("playing")){
		barProgress = setInterval(function(){
			$(".time-bar,.player-waveform-container").css("width",i+"%");
			i++;
			},intervalTime);
		timer = setInterval(function(){
			var minutesString = minutes;		
			var secondsString = seconds;
				seconds++;
				if(j==60){
					seconds=0;
					minutes++;
					j=0;
				}
				if(((minutes*60)+seconds)*1000 >= miliseconds){
					resetPlayer();
					$(".icon-next").click();
				}
				minutesString = (minutes < 10 ? "0"+minutes : minutes);
				secondsString = (seconds < 10 ? "0"+seconds : seconds);
				$(".time-passed").text(minutes+":"+secondsString);
				j++;
		},1000)
	}else {
		clearInterval(timer);
		clearInterval(barProgress);
	}

});
$(".playlist-icon").on("click",function(){
	$(".playlist-view").addClass("active");
});
$(".album-view-btn").on("click",function(){
	$(".album-view").addClass("active");
});