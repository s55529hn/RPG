//名前の入力
let name = prompt("名前を入力してください");
plySt0.textContent = name;
let flag = true;
//プレイヤーデータ
let plyLv = 1;
let plyHp = 6;
let plyHpMax = 6;
let plyAtt = 1;
let plyHeal = 1;
let plyExp = 0;
let plyExpNext = [
  0,
  5,
  10,
  15,
  20,
  30,
  40,
  50,
  60,
  80,
  100,
  120,
  140,
  200,
  300,
  400,
  500,
  650,
  1000,
  1300,
  1700,
  2000,
  2600,
  3000,
  4000,
  5000,
];
let plyExpNeed = [
  5,
  10,
  15,
  20,
  30,
  40,
  50,
  60,
  80,
  100,
  120,
  140,
  200,
  300,
  400,
  500,
  650,
  1000,
  1300,
  1700,
  2000,
  2600,
  3000,
  4000,
  5000,
];
let plyImg = document.getElementById("plyImg");
let plySt = new Array(7);
for (let i = 0; plySt.length > i; i++) {
  plySt[i] = document.getElementById("plySt" + i);
}

//敵のデータ
let eneLv = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
let eneHp = new Array(5, 15, 20, 30, 60, 100, 150, 300, 500, 1000);
let eneExp = new Array(1, 3, 5, 10, 20, 50, 70, 100, 300, 1000);
let eneHpMax = new Array(5, 15, 20, 30, 60, 100, 150, 300, 500, 1000);
let eneAtt = new Array(1, 2, 2, 4, 5, 6, 8, 10, 15, 30);
let eneKill = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
let eneCntMax = new Array(4, 5, 2, 3, 4, 5, 6, 6, 8, 6);
let eneCnt = new Array(4, 5, 2, 3, 4, 5, 6, 6, 8, 6);
let eneName = new Array(
  "ぴよ子",
  "スラリン",
  "ミッ〇ー",
  "人食いカブト",
  "人面毒キノコ",
  "トリッピー",
  "マタンゴ",
  "クマー",
  "ウイス〇ーウッズ",
  "Boss オーク"
);
let eneNam = 0;
let eneImg = document.getElementById("eneImg");
let eneSec = document.getElementById("eneSec");
let eneSt = new Array(5);
for (let i = 0; eneSt.length > i; i++) {
  eneSt[i] = document.getElementById("eneSt" + i);
}
function change() {
  eneHp[eneNam] = eneHpMax[eneNam];
  eneImg.src = "草原/enemyA" + eneNam + ".png";
  eneSt0.textContent = eneName[eneNam];
  eneSt1.textContent = "レベル:" + eneLv[eneNam];
  eneSt2.textContent = "HP:" + eneHp[eneNam];
  eneSt3.textContent = "攻撃力:" + eneAtt[eneNam];
  eneSt4.textContent = "倒した回数" + eneKill[eneNam];
}

//プレイヤーを回復
plyImg.addEventListener("mousedown", () => {
  if (flag) {
    plyImg.src = "img/playerC.png";
  }
});
plyImg.addEventListener("mouseup", () => {
  if (flag) {
    plyImg.src = "img/playerA.png";
    plyHp += plyHeal;
    if (plyHp > plyHpMax) {
      plyHp = plyHpMax;
    }
    plySt2.textContent = "HP:" + plyHp;
  }
});

//敵を攻撃
eneImg.addEventListener("mousedown", () => {
  if (flag) {
    eneImg.src = "草原/enemyB" + eneNam + ".png";
  }
});
eneImg.addEventListener("mouseup", () => {
  if (flag) {
    eneImg.src = "草原/enemyA" + eneNam + ".png";
    if (eneHp[eneNam] > 0) {
      eneHp[eneNam] -= plyAtt;
      if (eneHp[eneNam] < 0) {
        eneHp[eneNam] = 0;
      }
    } else {
      eneHp[eneNam] = eneHpMax[eneNam];
      eneKill[eneNam]++;
      eneSt4.textContent = "倒した回数:" + eneKill[eneNam];
      //ゲームクリア
      if (eneKill[9] > 0) {
        flag = false;
        clearInterval(loop);
        eneSec.textContent = "ゲームクリア！おめでとう！！";
      }
      //経験値の処理
      plyExp += eneExp[eneNam];
      plySt5.textContent = "経験値:" + plyExp;
      plyExpNext[plyLv] -= eneExp[eneNam];
      //レベルアップ
      if (plyExpNext[plyLv] <= 0) {
        plyLv++;
        plyExpNext[plyLv] = plyExpNeed[plyLv];
        plySt1.textContent = "レベル" + plyLv;
        plyHpMax = plyLv * 2 + 6;
        plyHp = plyHpMax;
        plySt2.textContent = "HP:" + plyHp;
        plyAtt++;
        plySt3.textContent = "攻撃力:" + plyAtt;
        plyHeal++;
        plySt4.textContent = "回復魔法:" + plyHeal;
      }

      plySt6.textContent =
        "次のレベルまでの経験値" + plyExpNext[plyLv] + "ポイント";
    }
    eneSt2.textContent = "HP:" + eneHp[eneNam];
  }
});

//逃げる＆次の敵
let left = document.getElementById("left");
let right = document.getElementById("right");
left.addEventListener("click", () => {
  if (flag) {
    if (eneNam > 0) {
      eneNam--;
      change();
    }
  }
});
right.addEventListener("click", () => {
  if (flag) {
    if (eneNam < 9) {
      eneNam++;
      change();
    }
  }
});
//敵が時間ごとに攻撃
let loop = setInterval(() => {
  if (eneCnt[eneNam] > 0) {
    eneCnt[eneNam]--;
    eneSec.textContent = "モンスターの攻撃まで" + eneCnt[eneNam] + "秒";
  } else {
    plyImg.src = "img/playerB.png";
    plyHp = plyHp - eneAtt[eneNam];
    if (plyHp > 0) {
      plySt2.textContent = "HP:" + plyHp;
      eneSec.textContent = "モンスターの攻撃まで" + eneCnt[eneNam] + "秒";
    } else {
      flag = false;
      clearInterval(loop);
      plySt2.textContent = "HP:" + plyHp;
      eneSec.textContent = "ゲームオーバー";
    }
    setTimeout(() => {
      if (flag) {
        eneCnt[eneNam] = eneCntMax[eneNam];
        plyImg.src = "img/playerA.png";
        eneSec.textContent = "モンスターの攻撃まで" + eneCnt[eneNam] + "秒";
      }
    }, 500);
  }
}, 1000);
