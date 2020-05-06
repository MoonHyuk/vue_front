function labelRecent(size) { //size에 label 표시 갯수를 넣으면 된다
    let date = new Date();

    let now = date.getHours(); //현재 시간

    let label = new Array(); // return 할 배열
    // 참고! 23:59:59 다음은 24 말고 다음날 00:00:00으로 정하자!

    if (now < size - 1) { //size 시 이전이라 전날 시간으로 넘어가야 하는 경우
        var start = 25 - size + now;
        for (let index = start; index < 24; index++) //전날의 시간 추가하는 로직
            label.push(index + "시");

        for (let index = 0; index <= now; index++) //오늘의 시간 추가하는 로직
            label.push(index + "시");
    } else { //size 시 이상일 경우는 당일에서만 값이 움직인다
        var start = now - (size - 1);
        for (let index = start; index <= now; index++)
            label.push(index + "시");

    }

    // 기댓값 (ex 현재 : 03시, size=6)
    // lable = [22시,23시,0시,1시,2시,3시];
    return label;
}

module.exports = {
    labelRecent
}