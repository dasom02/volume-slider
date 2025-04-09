let player;

/**
 * youtube button click event
 */
function onVideoButtonClick() {
  const url = document.getElementById("youtube_url").value;

  if (!url) {
    alert("재생할 유튜브 주소를 입력해주세요.");
    return;
  }

  // 정규식으로 youtube id만 추출
  const regex = /(?:v=|youtu.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  if (!match) {
    alert("영상을 불러올 수 없는 url입니다.\n올바른 경로를 입력해주세요.");
    return;
  }

  const id = match[1]; // 유튜브 id 추출
  player ? onVideoIdChange(id) : onYouTubeIframeAPIReady(id);
}

/**
 * video id change event
 * @param id 변경할 영상 고유 ID
 */
function onVideoIdChange(id) {
  if (id) {
    player.loadVideoById(id);
  }
}

/**
 * youtube setting
 * @param id 영상 고유 ID
 */
function onYouTubeIframeAPIReady(id) {
  if (id) {
    player = new YT.Player("player", {
      height: "200",
      width: "350",
      videoId: id,
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });
  }
}

function onPlayerReady(event) {
  event.target.playVideo();
}

function onPlayerStateChange(event) {}
