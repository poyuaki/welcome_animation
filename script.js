welcomeAudioFile = ""

let styleValueObj = {
    startSpacing: "30px"
}

if (window.matchMedia && window.matchMedia('(max-device-width: 768px)').matches) {
    styleValueObj.startSpacing = "8px"
}

async function showStartView (audioOk) {
    document.getElementById("worldName").innerHTML = document.getElementById("inputWorldName").value
    document.title = document.getElementById("startWords").innerText
    const waitTime = 1000
    $("#start").fadeIn(waitTime)
    await new Promise(resolve => setTimeout(resolve, waitTime + 100))
    $("#startLineTop, #startLineBottom").animate({width: 0}, 1000, 'swing')
    await new Promise(resolve => setTimeout(resolve, 2000))
    let welcomeVoice = new Audio(welcomeAudioFile)
    if (audioOk && welcomeAudioFile !== "") welcomeVoice.play()
    $("#startWords").animate({opacity: 1, letterSpacing: styleValueObj.startSpacing}, 250, 'swing')
    await new Promise(resolve => setTimeout(resolve, 2000))
    const openTime = 800
    $("#startTopUp").animate({height: 0}, openTime, 'swing')
    $("#startBottomDown").animate({height: 0, top: $("#startBottomDown").height()}, openTime, 'swing')
    $("#startWords").animate({opacity: 0}, openTime, 'swing')
    await new Promise(resolve => setTimeout(resolve, openTime))
    $("#start").hide()
    await new Promise(resolve => setTimeout(resolve, 500))
    showMain()
}

async function showMain () {
    $("#main").fadeIn()
    createText = async (text, countPerSec, time) => {
        const chars = "abcdefjhijklmnopqrstuvwxyz"
        for (let i = 0; i < text.length; i++) {
            const viewText = text.substr(i,1)
            const beforeText = document.getElementById("mainText").innerHTML
            const secPerCount = 1 / countPerSec
            let nowCount = 0
            while ((viewText != " " || viewText != "," || viewText != ".") && secPerCount * nowCount < time ) {
                document.getElementById("mainText").innerText = beforeText + chars.substr(Math.floor(Math.random() * chars.length), 1)
                await new Promise(resolve => setTimeout(resolve, secPerCount * 1000))
                document.getElementById("mainText").innerText = beforeText
                nowCount++
            }
            $("#mainText").text(beforeText + viewText)
        }
    }
    $("#mainTextLine").animate({width: "100vw"}, document.getElementById("inputTime").value * document.getElementById("inputMainText").value.length * 1000, "swing")
    await createText(document.getElementById("inputMainText").value, document.getElementById("inputCountPerSec").value, document.getElementById("inputTime").value)
    await new Promise(resolve => setTimeout(resolve, 2000))
    $("#mainText").animate({letterSpacing: "10px", opacity: 0}, 2000, "swing")
    await new Promise(resolve => setTimeout(resolve, 500))
    $("#mainTextLine").animate({width: 0}, 2000, "swing")
    await new Promise(resolve => setTimeout(resolve, 2000))
    $("#main").hide()
}

async function okAudio(type) {
    $("#audio").fadeOut()
    await new Promise(resolve => setTimeout(resolve, 1000))
    showStartView(type)
}

function showAudioView () {
    $("#audio").fadeIn()
}

function fileChanged (input) {
    if (input.files.length === 0) {
        welcomeAudioFile = ""
        return
    }
    const file = input.files[0]
    const reader = new FileReader()
    reader.onload = () => {
        welcomeAudioFile = reader.result
    }
    reader.readAsDataURL(file)
}

showAudioView()
