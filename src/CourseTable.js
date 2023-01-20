import React from "react";

const CourseTable = () => {
    console.log("시작");
    console.log(props);
    console.log(props.arr);

    let cellArr = [];
    let parsedTime = [];
    let dayNum = 2,
        startTime = 2,
        endTime = 3,
        count = 0;
    for (let i = 0; i < props.arr.length; i++) {
        parsedTime = props.arr[i].parsed_time;
        let color = randomRgbHex();
        for (let j = 0; j < parsedTime.length; j++) {
            count++;
            dayNum = changeDayToNum(parsedTime[j].day);
            startTime = changeTimeToNum(parsedTime[j].start_time);
            endTime = changeTimeToNum(parsedTime[j].end_time);
            console.log("수업");
            console.log(dayNum);
            console.log(startTime);
            console.log(endTime);

            cellArr.push(
                <StyledCell
                    columnStart={String(dayNum)}
                    columnEnd={String(dayNum + 1)}
                    rowStart={String(startTime)}
                    rowEnd={String(endTime)}
                    opacity="1"
                    backgroundColor={color}
                    key={count}
                >
                    {props.arr[i].name}
                </StyledCell>
            );
        }
    }
    setShow(true);
    return cellArr();
}

export default CourseTable;