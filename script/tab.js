let selectedTab = null;

// setting tab data
const tabData = JSON.parse(JSON.stringify(tabs));

const parents = document.getElementById("tabs");
for (tab of tabData) {
  let div = document.createElement("div");
  if (tab.tab) {
    div.id = tab.tab;
    div.onclick = () => {
      onTabClick(div.id);
    };
  }
  div.className = "tab";
  div.innerHTML = tab.tabDesc;

  parents.appendChild(div);
}

/**
 * tab click event
 * @param id
 */
function onTabClick(id) {
  clear();
  selectedTab = id;

  // setting explain data
  const sliderData = JSON.parse(JSON.stringify(sliders));
  const slider = sliderData?.find((item) => item.id === id);

  const ctrlPanel = document.querySelector(".control-panel");
  // 제목 추가
  let title = ctrlPanel.querySelector(".title");
  title.innerHTML = slider.title;

  // 설명박스 추가
  const explainBox = ctrlPanel.querySelector(".explain-box");
  for (explain of slider.explain) {
    let p = document.createElement("p");
    p.className = "explain";
    p.innerHTML = explain;

    explainBox.appendChild(p);
  }

  // ID에 맞는 콘텐츠 추가
  let object = document.createElement("object");
  object.type = "text/html";
  object.data = `src/${id}.html`;
  object.width = "100%";
  object.height = "100%";

  ctrlPanel.appendChild(object);
}

/**
 * 데이터 초기화
 */
function clear() {
  // 설명박스
  const explain = document.getElementsByClassName("explain");
  for (let i = explain.length - 1; i >= 0; i--) {
    explain[i].remove();
  }

  // 콘텐츠
  const object = document.getElementsByTagName("object")[0];
  if (object) {
    object.remove();
  }
}
