window.addEventListener("hashchange", async () => {
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
        console.log("exist");
    }
});