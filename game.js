var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStarted = false;

// 準備開始遊戲時調用 nextSequence 函數
$(document).keypress(function() {
    if (!gameStarted) {
        gameStarted = true;
        nextSequence();
    }
});

function nextSequence() {
    level++;
    $("#level-title").text("Level " + level); // 更新標題，顯示當前等級

    userClickedPattern = []; // 清空用戶選擇的顏色

    // 生成隨機顏色
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber]; // 從 buttonColours 中選擇隨機顏色
    
    // 將選擇的顏色添加到 gamePattern
    gamePattern.push(randomChosenColour);

    // 使用 jQuery 選擇相同 ID 的按鈕，並觸發閃爍效果
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
    // 播放聲音或其他效果
    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id"); // 獲取被點擊按鈕的 ID
    playSound(userChosenColour); // 播放對應顏色的聲音
    userClickedPattern.push(userChosenColour); // 將用戶選擇的顏色添加到 userClickedPattern
    animatePress(userChosenColour); // 添加動畫效果
    console.log(userClickedPattern); // 可以用於檢查，顯示用戶選擇的顏色
    
    // 檢查用戶選擇的顏色是否正確
    checkAnswer(userClickedPattern.length - 1); // 檢查用戶最後一次點擊的顏色
});

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    // 檢查用戶的選擇是否與遊戲模式相符
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("成功!");
        // 如果用戶點擊的是最後一個顏色，調用 nextSequence() 以生成下一個顏色
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000); // 延遲 1 秒以便用戶看到最後一個顏色
        }
    } else {
        console.log("失敗!");
        // 播放失敗音效，並重置遊戲
        $("body").addClass("game-over");
        playSound("wrong");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        startOver(); // 重置遊戲
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    gameStarted = false;
}

