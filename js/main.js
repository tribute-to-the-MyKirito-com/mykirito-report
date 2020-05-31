window.addEventListener("load", () => {
    if (location.hash == "") {
        location.hash = "#5ec8bb781d7de1000a18ab2a";
    } else {
        fetchData();
    }
});

window.addEventListener("hashchange", () => {
    // 初始化戰報內容
    document.querySelector("div#reportInfo").innerHTML = `
        <div id="reportInfoHeader"></div>
    `;

    fetchData();
});

async function fetchData() {
    let id = location.hash.substr(1);

    let report = await fetch(`reports/${id}.json`).then(
        r => r.json()
    ).then(
        j => j
    ).catch(
        e => "error"
    )

    if (report == "error") {
        alert("錯誤：找不到戰報");
    } else {
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
}