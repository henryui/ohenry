import React, { Fragment } from 'react';
import styled from 'styled-components';
import { cloneDeep } from 'lodash';
import { Divider, Typography } from 'antd';
import { CourseInfo, Days } from './types';

const { Text, Title } = Typography;

const HOUR_PIXEL = 50;

const DEFAULT_HOURS = [
  '9:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00',
];

const CLASS_CONFIG = ['A', 'B', 'C', 'D', 'E'];

const CLASS_COLOUR = ['#A02C3D', '#812CA0', '#2C64A0', '#238044', '#8C7126'];

/**
 * input strings are in format of `hour:minute`
 */
const formatTime = (time: string) => {
  const [hourStr, minuteStr] = time.split(':');
  const hour = Number(hourStr);

  if (hour < 12) {
    return `${time} AM`;
  }
  if (hour > 12) {
    return `${hour - 12}:${minuteStr} PM`;
  }
  // 12 PM range
  return `${time} PM`;
};

const formatTimes = (time1: string, time2: string) => {
  let formattedTime1 = formatTime(time1);
  const formattedTime2 = formatTime(time2);

  if (formattedTime1.slice(-3) === formattedTime2.slice(-3)) {
    formattedTime1 = formattedTime1.slice(0, -3);
  }

  return `${formattedTime1} - ${formattedTime2}`;
};

const formatHour = (time: string) => {
  const [hour] = time.split(':').map(Number);

  if (hour < 12) {
    return `${hour}AM`;
  }
  if (hour > 12) {
    return `${hour - 12}PM`;
  }
  // 12 PM range
  return `${hour}PM`;
};

/**
 * input strings are in format of `hour:minute`
 */
const isSameOrBefore = (time1: string, time2: string) => {
  const [time1Hour, time1Minute] = time1.split(':').map(Number);
  const [time2Hour, time2Minute] = time2.split(':').map(Number);

  // If hour values differ
  if (time1Hour < time2Hour) return true;
  if (time1Hour > time2Hour) return false;
  // If both on same hour, compare minutes
  if (time1Minute <= time2Minute) return true;
  return false;
};

type TimeSlot = {
  startTime: string;
  endTime: string;
  classInfo?: {
    name: string;
    time: string;
  }[];
};

const generateTimeSlot = (
  className: string,
  classTimes?: string[][],
): TimeSlot[] => {
  const timeSlots: TimeSlot[] = [];
  const sortedClass = cloneDeep(classTimes).sort((a, b) => {
    if (isSameOrBefore(a[0], b[0])) return -1;
    return 1;
  });
  const classSlots: TimeSlot[] = [];

  for (let i = 0; i < sortedClass.length; i += 1) {
    let currentTime = sortedClass[i];
    const currentClass: TimeSlot = {
      startTime: currentTime[0],
      endTime: currentTime[1],
      classInfo: [
        {
          name: `${className.toUpperCase()} ${currentTime[2]}`,
          time: formatTimes(currentTime[0], currentTime[1]),
        },
      ],
    };

    let nextTime = sortedClass[i + 1];
    while (nextTime && !isSameOrBefore(currentTime[1], nextTime[0])) {
      currentClass.classInfo.push({
        name: `${className.toUpperCase()} ${nextTime[2]}`,
        time: formatTimes(nextTime[0], nextTime[1]),
      });
      if (!isSameOrBefore(nextTime[1], currentClass.endTime)) {
        [, currentClass.endTime] = nextTime;
      }

      // Move to next item check
      i += 1;
      currentTime = sortedClass[i];
      nextTime = sortedClass[i + 1];
    }

    classSlots.push(currentClass);
  }

  const defaultSlots: TimeSlot[] = DEFAULT_HOURS.map((time, index, arr) => {
    if (index >= arr.length - 1) return null;

    return {
      startTime: time,
      endTime: arr[index + 1],
    };
  }).filter(Boolean);

  while (defaultSlots.length) {
    const nextClass = classSlots[0];
    const currentDefault = defaultSlots.shift();

    if (
      !nextClass ||
      isSameOrBefore(currentDefault.endTime, nextClass.startTime)
    ) {
      // 1. If time slot is fully before next class
      timeSlots.push(currentDefault);
    } else {
      if (!isSameOrBefore(nextClass.startTime, currentDefault.startTime)) {
        timeSlots.push({
          startTime: currentDefault.startTime,
          endTime: nextClass.startTime,
        });
      }

      const next = classSlots.shift();
      timeSlots.push(next);

      let { endTime } = currentDefault;
      while (!isSameOrBefore(next.endTime, endTime) && defaultSlots.length) {
        ({ endTime } = defaultSlots.shift());
      }

      const newNext = classSlots[0];
      if (
        !isSameOrBefore(endTime, next.endTime) &&
        (!newNext || isSameOrBefore(endTime, newNext.startTime))
      ) {
        timeSlots.push({
          startTime: next.endTime,
          endTime,
        });
      }
    }
  }
  if (classSlots.length) {
    timeSlots.push(...classSlots);
  }

  return timeSlots;
};

const getHeightFromTime = (start: string, end: string) => {
  const [startHour, startMinute] = start.split(':').map(Number);
  const [endHour, endMinute] = end.split(':').map(Number);

  return (
    ((endHour * 60 + endMinute - (startHour * 60 + startMinute)) * HOUR_PIXEL) /
    60
  );
};

const getColourFromClass = (
  classInfo: {
    name: string;
    time: string;
  }[],
) => {
  const classCodes = classInfo.map(({ name }) => name.slice(-1));
  for (let i = 0; i < CLASS_CONFIG.length; i += 1) {
    if (classCodes.includes(CLASS_CONFIG[i])) {
      return CLASS_COLOUR[i];
    }
  }
  return '#444';
};

interface WeeklyCalendarProps {
  courseInfo: CourseInfo;
}

const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({ courseInfo }) => (
  <>
    <StyledWeeklyCalendar>
      <StyledRow>
        <StyledTimezoneHeader>
          <StyledTimezoneText>Eastern Standard Time</StyledTimezoneText>
        </StyledTimezoneHeader>
        {Object.values(Days).map(day => (
          <StyledDayHeader key={`day-header-${day}`}>
            <StyledDay>{day}</StyledDay>
          </StyledDayHeader>
        ))}
      </StyledRow>
      <StyledRow>
        <StyledTimeMarkContainer>
          {DEFAULT_HOURS.slice(1, -1).map(hour => (
            <StyledTimeMark key={`time-mark-${hour}`}>
              <StyledDay>{formatHour(hour)}</StyledDay>
              <Divider
                style={{
                  width: '10px',
                  minWidth: '6px',
                  border: '0.5px #ccc solid',
                  marginLeft: '3px',
                }}
              />
            </StyledTimeMark>
          ))}
        </StyledTimeMarkContainer>
        {Object.values(Days).map(day => (
          <StyledDayValue key={`day-value-${day}`}>
            {generateTimeSlot(
              courseInfo.enrollName,
              courseInfo.classTimes
                .map((classTime, index) => {
                  const times = classTime[day];
                  if (!times?.length) return null;

                  return [...times, CLASS_CONFIG[index]];
                })
                .filter(Boolean),
            ).map(({ startTime, endTime, classInfo }, index, arr) => (
              <StyledValue
                key={`val-${day}-${startTime}`}
                $height={getHeightFromTime(startTime, endTime)}
                $colour={classInfo ? getColourFromClass(classInfo) : undefined}
                $isLast={!classInfo && index === arr.length - 1}
              >
                {classInfo
                  ? classInfo.map(info => (
                      <Fragment key={`info-${day}-${startTime}-${info.name}`}>
                        <StyledClassInfo>{info.name}</StyledClassInfo>
                        <br />
                        <StyledClassInfo>{info.time}</StyledClassInfo>
                      </Fragment>
                    ))
                  : ''}
              </StyledValue>
            ))}
          </StyledDayValue>
        ))}
      </StyledRow>
    </StyledWeeklyCalendar>
    <StyledDivider />
  </>
);

export default WeeklyCalendar;

const StyledWeeklyCalendar = styled.div`
  background-color: #eee;
  width: 100%;
  padding: 25px 15px;
  border-radius: 10px;
  margin-top: 30px;
`;

const StyledRow = styled.div`
  display: flex;
  width: 100%;
`;

const StyledTimezoneHeader = styled.div`
  border-bottom: 2px #ccc solid;
  width: 9%;
  height: 60px;
`;

const StyledTimezoneText = styled(Text)`
  font-size: 9px;
  margin-bottom: 5px;
  font-weight: 700;

  && {
    text-align: center;
  }
`;

const StyledDayHeader = styled.div`
  width: 13%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px #ccc solid;
  border-bottom: 2px #ccc solid;
`;

const StyledDay = styled(Text)`
  font-size: 17px;
  font-weight: 700;
`;

const StyledTimeMarkContainer = styled.div`
  width: 9%;
  padding-top: ${HOUR_PIXEL / 2 - 0.5}px;
`;

const StyledTimeMark = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: ${HOUR_PIXEL}px;
`;

const StyledDayValue = styled.div`
  width: 13%;
  border-left: 1px #ccc solid;
`;

const StyledValue = styled.div<{
  $height: number;
  $colour?: string;
  $isLast?: boolean;
}>`
  width: 100%;
  padding: 4px;
  overflow: hidden;
  height: ${({ $height, $isLast }) => `${$height / ($isLast ? 2 : 1)}px`};
  ${({ $colour, $isLast }) =>
    $colour
      ? `
  background-color: ${$colour};
  border-radius: 4px;
  `
      : `
  border-bottom: ${$isLast ? 'none' : '1px #ccc solid'};
  `}
`;

const StyledClassInfo = styled(Text)`
  font-size: 10px;
  color: white;
`;

const StyledDivider = styled(Divider)`
  border-width: 3px;
  margin-top: 40px;
  margin-bottom: 30px;
`;
