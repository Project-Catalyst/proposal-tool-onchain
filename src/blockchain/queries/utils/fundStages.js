import dayjs from "dayjs";

export function isCurrentStage(fund, stageName, now) {
  const _now = dayjs.utc(now);
  const startDate = dayjs(fund[`${stageName}StartDate`]);
  const endDate = dayjs(fund[`${stageName}EndDate`]);
  return startDate.isBefore(_now) && endDate.isAfter(_now);
}

export function isCurrentOrUpcomingStage(fund, stageName, now) {
  const _now = dayjs.utc(now);
  const endDate = dayjs(fund[`${stageName}EndDate`]);
  return endDate.isAfter(_now);
}

export function isUpcomingStage(fund, stageName, now) {
  const _now = dayjs.utc(now);
  const startDate = dayjs(fund[`${stageName}StartDate`]);
  return startDate.isAfter(_now);
}

export function isPastStage(fund, stageName, now) {
  const _now = dayjs.utc(now);
  const endDate = dayjs(fund[`${stageName}EndDate`]);
  return endDate.isBefore(_now);
}

export function fundActivityPeriod(fund, now) {
  const _now = dayjs.utc(now);
  const startDate = dayjs(fund.startDate);
  const endDate = dayjs(fund.endDate);

  if (endDate.isBefore(_now)) {
    return -1;
  } else if (startDate.isBefore(_now) && endDate.isAfter(_now)) {
    return 0;
  } else {
    return 1;
  }
}

export function fundCurrentStages(fund, now) {
  const stageNames = Object.keys(fund)
    .filter((key) => !!fund[key] && key.endsWith("StartDate"))
    .map((key) => key.replace("StartDate", ""));

  return stageNames.filter((stageName) => isCurrentStage(fund, stageName, now));
}
