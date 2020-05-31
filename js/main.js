let _reportId = "";
let _reportData = "";

// 網頁讀取完畢
window.addEventListener("load", () => {
    if (location.hash == "") {
        location.hash = "#5ec8bb781d7de1000a18ab2a";
    } else {
        fetchData();
    }
});

// hash change
window.addEventListener("hashchange", () => {
    fetchData();
});

// 點擊 讀取戰報檔
document.querySelector("a#readFileButton").addEventListener("click", () => {
    document.querySelector("div#hidden input").click();
});

// 點擊 隱藏的 input （由讀取戰報檔按鈕觸發）
document.querySelector("div#hidden input").addEventListener("change", (e) => {
    let file = e.target.files[0];
    let id = e.target.files[0].name;

    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
        const result = event.target.result;
        let report = JSON.parse(result);

        _reportId = id;
        _reportData = JSON.stringify(report);

        renderData(report);
    });

    reader.readAsText(file, "UTF-8");
});

// 點擊 讀取戰報連結
document.querySelector("a#readLinkButton").addEventListener("click", () => {
    let url = prompt("請輸入戰報網址（註：只有第三輪適用）\n（再註：不知道戰報什麼時候會被刪除，屆時這個功能就廢了）", "https://mykirito.com/report/5ec8bb781d7de1000a18ab2a");

    // 必須按確定
    if (url != null) {
        let id = url.match(/([0-9a-f]{24})/);
        if (id != null) {
            id = id[1];
            fetchData(id);
        } else {
            alert("網址格式錯誤");
        }
    }
});

// 點擊 下載此戰報
document.querySelector("a#downloadButton").addEventListener("click", () => {
    console.log(_reportData);
    download(_reportId, _reportData);
});

// 抓取資料
async function fetchData(reportId = "") {
    let fetchUrl = "";
    if (reportId == "") {
        reportId = location.hash.substr(1);
        fetchUrl = `reports/${reportId}.json`;
    } else {
        fetchUrl = `https://storage.googleapis.com/kirito-1585904519813.appspot.com/reports2/${reportId}.json`;
    }

    let report = await fetch(fetchUrl).then(
        r => r.json()
    ).then(
        j => j
    ).catch(
        e => "error"
    )

    if (report == "error") {
        alert("錯誤：找不到戰報");
    } else {
        _reportId = reportId;
        _reportData = JSON.stringify(report);
        renderData(report);
    }
}

// 渲染資料
function renderData(report) {
    let atkData = document.querySelectorAll("table.playerDataTable:nth-child(1) tr");
    let defData = document.querySelectorAll("table.playerDataTable:nth-child(2) tr");
    let infoHeader = document.querySelector("div#reportInfoHeader");
    let infoContent = document.querySelector("div#reportInfo");

    // 攻擊方資料
    atkData[1].querySelector("img").src = `https://storage.googleapis.com/kirito-1585904519813.appspot.com/avatars/${report.a.avatar}.png`;

    atkData[2].querySelector("td").innerText = report.a.lv;
    atkData[3].querySelector("td").innerText = report.a.nickname;
    atkData[4].querySelector("td").innerText = report.a.character;
    atkData[5].querySelector("td").innerText = report.a.title;
    atkData[6].querySelector("td").innerText = report.a.hp;
    atkData[7].querySelector("td").innerText = report.a.atk;
    atkData[8].querySelector("td").innerText = report.a.def;
    atkData[9].querySelector("td").innerText = report.a.stm;
    atkData[10].querySelector("td").innerText = report.a.agi;
    atkData[11].querySelector("td").innerText = report.a.spd;
    atkData[12].querySelector("td").innerText = report.a.tec;
    atkData[13].querySelector("td").innerText = report.a.int;
    atkData[14].querySelector("td").innerText = report.a.lck;

    // 防禦方資料
    defData[1].querySelector("img").src = `https://storage.googleapis.com/kirito-1585904519813.appspot.com/avatars/${report.b.avatar}.png`;

    defData[2].querySelector("td").innerText = report.b.lv;
    defData[3].querySelector("td").innerText = report.b.nickname;
    defData[4].querySelector("td").innerText = report.b.character;
    defData[5].querySelector("td").innerText = report.b.title;
    defData[6].querySelector("td").innerText = report.b.hp;
    defData[7].querySelector("td").innerText = report.b.atk;
    defData[8].querySelector("td").innerText = report.b.def;
    defData[9].querySelector("td").innerText = report.b.stm;
    defData[10].querySelector("td").innerText = report.b.agi;
    defData[11].querySelector("td").innerText = report.b.spd;
    defData[12].querySelector("td").innerText = report.b.tec;
    defData[13].querySelector("td").innerText = report.b.int;
    defData[14].querySelector("td").innerText = report.b.lck;

    // 戰報
    let date = new Date(report.timestamp);
    let m = date.getMonth() + 1;
    let d = date.getDate();
    let y = date.getFullYear();
    let h = date.getHours();
    let i = date.getMinutes();
    let s = date.getSeconds();
    let ampm = h >= 12 ? 'pm' : 'am';
    h = h > 12 ? h - 12 : h;
    let type = ["友好切磋", "認真對決", "決一死戰", "我要殺死你"];

    infoHeader.innerText = `${m}/${d}/${y}, ${h}:${i}:${s} ${ampm} 的 ${type[report.type]}`;

    let temp = "";
    for (let i = 1; i <= report.messages.length; i++) {
        let msg = report.messages[i - 1];
        temp += `
                <div class="fight ${msg.s}">
                    <div class="lineNumber">${i}</div>
                    ${msg.m}
                </div>
            `;
    }

    infoContent.innerHTML += temp;
}

function download(filename, text) {
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', `${filename}.json`);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

// 初始化戰報內容
function reportInfoInit() {
    document.querySelector("div#reportInfo").innerHTML = `
        <div id="reportInfoHeader"></div>
    `;
}