export const isStoreOpenNow = (business) => {
  const currentDate = new Date();
  const currentDay = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
  });
  const currentHour = currentDate.getHours();

  const currentTiming = business?.timing?.find(
    (item) => item.day === currentDay,
  );

  if (currentTiming && currentTiming.isOpen) {
    if (currentTiming.from && currentTiming.to) {
      const [fromHour, fromMinute] = currentTiming.from.split(":");
      const [toHour, toMinute] = currentTiming.to.split(":");

      const fromTime = new Date();
      fromTime.setHours(Number(fromHour));
      fromTime.setMinutes(Number(fromMinute));

      const toTime = new Date();
      toTime.setHours(Number(toHour));
      toTime.setMinutes(Number(toMinute));

      return (
        currentDay === currentTiming.day &&
        currentHour >= fromTime.getHours() &&
        currentHour < toTime.getHours()
      );
    }
  }

  return false;
};

export const daysAgoFormatDate = (dateString) => {
  const currentDate = new Date();
  const inputDate = new Date(dateString);

  // Check if the inputDate is today
  if (
    inputDate.getDate() === currentDate.getDate() &&
    inputDate.getMonth() === currentDate.getMonth() &&
    inputDate.getFullYear() === currentDate.getFullYear()
  ) {
    const hoursDifference = Math.round(
      (currentDate - inputDate) / (1000 * 60 * 60),
    );
    if (hoursDifference > 0) {
      return `${hoursDifference} ${
        hoursDifference === 1 ? "hour" : "hours"
      } ago`;
    } else {
      return "Just now";
    }
  }

  const elapsedDays = Math.round(
    (currentDate - inputDate) / (1000 * 60 * 60 * 24),
  );

  if (elapsedDays <= 1) {
    return "Yesterday";
  } else if (elapsedDays <= 30) {
    return `${elapsedDays} ${elapsedDays === 1 ? "day" : "days"} ago`;
  } else if (elapsedDays <= 365) {
    const elapsedMonths = Math.round(elapsedDays / 30);
    return `${elapsedMonths} ${elapsedMonths === 1 ? "month" : "months"} ago`;
  } else {
    const elapsedYears = Math.round(elapsedDays / 365);
    return `${elapsedYears} ${elapsedYears === 1 ? "year" : "years"} ago`;
  }
};
