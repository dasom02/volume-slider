let player;
let videoTitle = [];

const params = new URL(location.href).searchParams;
if (params.get('id')) {
  onYouTubeIframeAPIReady(params.get('id'));
}

/**
 * youtube button click event
 */
function onVideoButtonClick() {
  const url = document.getElementById("youtube_url").value;
  const id = getVideoId(url);

  player ? onVideoIdChange(id) : onYouTubeIframeAPIReady(id);
}

/**
 * 유튜브 고유 ID 가져오기
 * @param url 입력한 주소
 * @returns ID
 */
function getVideoId(url) {
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

  return match[1];
}

/**
 * video id change event
 * @param id 변경할 영상 고유 ID
 */
function onVideoIdChange(id) {
  if (id) {
    player.loadVideoById(id);
    videoTitle.push(player.videoTitle);
  }
}

/**
 * youtube setting
 * @param id 영상 고유 ID
 */
function onYouTubeIframeAPIReady(id) {
  if (id) {
    YT.ready(() => {
      player = new YT.Player("player", {
        height: "200",
        width: "350",
        videoId: id,
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      });
      
      videoTitle.push(player.videoTitle);
    });
  }
}

function onPlayerReady(event) {
  event.target.playVideo();
}

function onPlayerStateChange(event) {
  event.target.playVideo();
}
