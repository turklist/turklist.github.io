function userList() {
    var user_data = [];
  
    for (var i = 0; i < list.length; i++) {
      var entry = list[i];
  
      var checkVerify = false;
      var verifier = "";
      if (entry.author.split("[").length != 2) {
        verifier = entry.author;
      } else {
        verifier = entry.author.split("[")[1].replace("]", "");
      }
      for (var b = 0; b < user_data.length; b++) {
        if (user_data[b].name.toUpperCase() == verifier.toUpperCase()) {
          checkVerify = true;
        }
      }
  
      var p = roundNumber(
        getUserPoint(i + 1, 100, entry.percentToQualify, "144hz") * 1,
        3
      );
      if (checkVerify == true) {
        for (var b = 0; b < user_data.length; b++) {
          var user_name = user_data[b].name.toUpperCase();
          var data_name = verifier.toUpperCase();
          if (user_name == data_name) {
            user_data[b].point = user_data[b].point + p;
            user_data[b].verified.push(i + 1);
          }
        }
      } else {
        var prog = [];
        var verified = [];
        verified.push(i + 1);
  
        user_data.push({
          name: verifier,
          highest: "null",
          progress: prog,
          point: p,
          verified: verified,
        });
      }
  
      for (var a = 0; a < entry.vids.length; a++) {
        var entry2 = entry.vids[a];
        var isLoot = false;
        for (var b = 0; b < user_data.length; b++) {
          if (user_data[b].name.toUpperCase() == entry2.user.toUpperCase()) {
            isLoot = true;
          }
        }
        var p = getUserPoint(
          i + 1,
          entry2.percent,
          entry.percentToQualify,
          entry2.hz
        );
        if (isLoot == true) {
          for (var b = 0; b < user_data.length; b++) {
            var user_name = user_data[b].name.toUpperCase();
            var data_name = entry2.user.toUpperCase();
            if (user_name == data_name) {
              user_data[b].point = user_data[b].point + p;
  
              if (
                user_data[b].highest == "null" &&
                parseInt(entry2.percent) == 100
              ) {
                user_data[b].highest = entry.name;
              }
              user_data[b].progress.push({
                map: entry.name.toString(),
                progress: entry2.percent.toString(),
                link: entry2.link,
                score: roundNumber(p, 3),
                rank: i + 1,
                hz: entry2.hz != null ? entry2.hz : "144hz",
              });
            }
          }
        } else {
          var map = entry.name.toString();
          if (parseInt(entry2.percent) != 100) {
            map = "null";
          }
  
          var prog = [];
          prog.push({
            map: entry.name.toString(),
            progress: entry2.percent.toString(),
            link: entry2.link,
            score: roundNumber(p, 3),
            rank: i + 1,
            hz: entry2.hz != null ? entry2.hz : "144hz",
          });
  
          user_data.push({
            name: entry2.user,
            highest: map,
            progress: prog,
            point: p,
            verified: [],
          });
        }
      }
    }
  
    var sortingField = "point";
    user_data.sort(function (a, b) {
      return b[sortingField] - a[sortingField];
    });
  
    for (var i = 0; i < user_data.length; i++) {
      user_data[i].point = roundNumber(user_data[i].point, 3);
      user_data[i].progress.sort(function (a, b) {
        return b["score"] - a["score"];
      });
    }
    return user_data;
  }
  
  function getUserData(user) {
    var user_data = userList();
  
    var progresses = "<ol>";
    var clears = 0;
  
    for (var i = 0; i < user_data[user].verified.length; i++) {
      rank = user_data[user].verified[i] - 1;
      clears++;
      progresses =
        progresses +
        "<li>" +
        list[rank].name +
        " Verified </strong>(#" +
        (rank + 1) +
        " / UP: " +
        roundNumber(
          getUserPoint(rank + 1, 100, list[rank].percentToQualify, "144hz") * 1,
          3
        ) +
        ")<strong></a></li>";
    }
  
    for (var i = 0; i < user_data[user].progress.length; i++) {
      progresses =
        progresses +
        '<li><a href="' +
        user_data[user].progress[i].link +
        '" target="blank_">' +
        user_data[user].progress[i].map +
        " " +
        user_data[user].progress[i].progress +
        "% </strong>(#" +
        user_data[user].progress[i].rank +
        " / UP: " +
        user_data[user].progress[i].score +
        "" +
        (parseInt(user_data[user].progress[i].hz.replace("hz", "")) >= 120
          ? ""
          : " / " + user_data[user].progress[i].hz) +
        ")<strong></a></li>";
      if (user_data[user].progress[i].progress == 100) {
        clears++;
      }
    }
    progresses = progresses + "</ol>";

    Swal.fire({
        title : "#"+(user+1)+" : "+user_data[user].name,
        html : '<center><strong>Skor : '+user_data[user].point + '<br>'+
            'Geçilen Leveller : '+clears+' Level(s)<br>'+
            '<br>Record List : '+progresses+'<br>'+
            '</strong></center>',
            color: "white",
      background:
        "linear-gradient(311.7deg, rgb(31, 34, 53)35%, rgb(29, 31, 49)35%, rgb(29, 31, 49)65% , rgb(26, 28, 44)65%)",
      confirmButtonColor: "#fa8039",
    });

}
