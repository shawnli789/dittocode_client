import seedrandom from 'seedrandom'
// Get data map from raw data
// key: problemNumber + " ." + problemTitle
// value: an array of practices of that problem.
export function getProblemsMap(practices) {
  if (!practices) return new Map();
  const res = new Map();
  for (let problem of practices) {
    const key = problem.number + ". " + problem.title;
    if (res.has(key)) {
      res.get(key).push(problem);
    } else {
      res.set(key, [problem]);
    }
  }
  return res;
}


// Get all problems latest practices.
export function getProblemsLatestPractices(problemsMap) {
  if (!problemsMap.keys) return [];
  const res = [];
  problemsMap.forEach((practices) => {
    if (practices.length === 1) {
      res.push(practices[0]);
    } else {
      res.push(findLatestPractice(practices));
    }
  })
  return res;
}


// Find a problem's latest practice.
export function findLatestPractice(practices) {
  if (!practices) return [];
  let res = practices[0];
  for (let i = 1; i < practices.length; i++) {
    if (new Date(practices[i].created_at).getTime() > new Date(res.created_at).getTime()) {
      res = practices[i];
    }
  }
  return res;
}


// Get formatted duration between a local date to current local date.
// Example output: "1 hour ago", "2 days ago", "2 weeks ago"
export function getFormattedDuration(date) {

  // Calculate the total milliseconds from a date to midnight January 1 1970 (Unix Epoch)
  const currTime = new Date().getTime();
  const dateTime = date.getTime();

  // Calculate the time difference in milliseconds
  let timeDiff = currTime - dateTime;

  const one_minute = 1000 * 60;
  const one_hour = one_minute * 60;
  const one_day = one_hour * 24;
  const one_week = one_day * 7;
  const one_month = one_day * 30;
  const one_year = one_month * 12;

  // Calculate years
  const years = Math.floor(timeDiff / one_year);
  timeDiff %= one_year;
  if (years > 0) {
    return addUnit(years, "year");
  }

  // Calculate months
  const months = Math.floor(timeDiff / one_month);
  timeDiff %= one_month;
  if (months > 0) {
    return addUnit(months, "month");
  }

  // Calculate weeks
  const weeks = Math.floor(timeDiff / one_week);
  timeDiff %= one_week;
  if (weeks > 0) {
    return addUnit(weeks, "week");
  }

  // Calculate days
  const days = Math.floor(timeDiff / one_day);
  timeDiff %= one_day;
  if (days > 0) {
    return addUnit(days, "day");
  }

  // Calculate hours
  const hours = Math.floor(timeDiff / one_hour);
  timeDiff %= one_hour;
  if (hours > 0) {
    return addUnit(hours, "hour");
  }

  // Calculate minutes
  const minutes = Math.floor(timeDiff / one_minute);
  timeDiff %= one_minute;
  if (minutes > 0) {
    return addUnit(minutes, "minute");
  }

  // Less than a minute
  return "Just Now"
}

function addUnit(value, unit) {
  unit = value > 1 ? " " + unit + "s ago" : " " + unit + " ago";
  return value + unit;
}


// Based on all practices time, estimate total practice time in hours.
export const getTotalPracticeHours = (practices) => {
  if (!practices) return 0;
  let totalMinutes = 0;
  for (let p of practices) {
    totalMinutes += p.time_spent;
  }
  return (totalMinutes / 60).toFixed(2);
}


// Based on the completion status of all practices, calculate the completedRate.
export const getCompletedRate = (practices) => {
  if (!practices || practices.length === 0) return "%";
  let count = 0;
  for (let p of practices) {
    if (p.completed) {
      count++;
    }
  }
  return (count / practices.length * 100).toFixed(2) + " %"
}


// Generate a daily recommendation list from problems' latest practices. 
// Current Algorithm: Three random uncompleted questions
export const getDailyRecommendation = (practices) => {
  if (!practices) return [];
  const recommendationNumber = 3;
  const incompletedPractices = [];
  const oneDay = 1000 * 60 * 60 * 24;

  // total days past since Unix Epoch
  const currentDays = Math.floor(new Date().getTime() / oneDay);
  for (const p of practices) {
    if (!p.completed && Math.floor(convertUTCToLocal(p.created_at).getTime() / oneDay) !== currentDays) {
      incompletedPractices.push(p);
    }
  }

  if (incompletedPractices.length <= recommendationNumber) return incompletedPractices;

  const primeNumber = 5972718671;
  const seed = currentDays; 
  const A = Math.floor(seedrandom(seed)() * (primeNumber - 1)) + 1;
  const B =  Math.floor(seedrandom(seed)() * primeNumber);
  for (const p of incompletedPractices) {
    const x = convertUTCToLocal(p.created_at).getTime();
    p.hash = (A * x + B) % primeNumber;
  }

  const hashSort = (a, b) => {
    if (a.hash > b.hash) return 1;
    else return -1;
  }

  incompletedPractices.sort(hashSort)

  return incompletedPractices.splice(0, recommendationNumber);
}


// Calculate daily number of practices from today and *displayNumber days ago.
// Example: [1, 2, 3, 4, 5] means today I finished 5 practices, yesterday I finished 4 practices, etc. 
// Based on number of days, generate a list of labels. For example: [8/23, 8/24, 8/25]
export const getDailyPracticesNumber = (practices, numberOfDays) => {
  if (!practices || numberOfDays <= 0) return {};
  const values = Array(numberOfDays).fill(0);
  const labels = Array(numberOfDays).fill('');

  const oneDay = 1000 * 60 * 60 * 24;
  // Since getTime always uses UTC for time representation, we don't need to manually convert it to UTC.
  // Calculate number of days from Unix Epoch.
  const currentDays = Math.floor(new Date().getTime() / oneDay);

  for (const p of practices) {
    // First convert UTC time to local. 
    // Without this step, new Date(d.created_at) will create a local time with UTC value, which is no what we want.
    const practiceDate = convertUTCToLocal(p.created_at)
    // getTime() will convert the current time to UTC and then calculate. 
    const practiceDays = Math.floor(practiceDate.getTime() / oneDay);
    if (currentDays - practiceDays < numberOfDays) {
      values[numberOfDays - 1 - (currentDays - practiceDays)] += 1;
    }
  }

  const today = new Date();
  for (let i = 0; i < numberOfDays; i++) {
    const month = today.getMonth() + 1;
    const date = today.getDate();
    labels[numberOfDays - 1 - i] = month + '/' + date;
    today.setDate(today.getDate() - 1);
  }

  return {
    values: values,
    labels: labels
  }
}


// Get total number of practices catagarized by difficulty.
// For example, [10, 20, 15] means: easy: 10, medium: 20, hard: 15
export const getProblemNumbersByDifficulty = (problemsLatestPractices) => {
  if (!problemsLatestPractices) return {}
  const values = [];
  const labels = [];
  const map = {};
  for (const p of problemsLatestPractices) {
    switch (p.difficulty) {
      case 'easy':
        if (map['easy']) {
          map['easy']++;
        } else {
          map['easy'] = 1;
        }
        break;
      case 'medium':
        if (map['medium']) {
          map['medium']++;
        } else {
          map['medium'] = 1;
        }
        break;
      case 'hard':
        if (map['hard']) {
          map['hard']++;
        } else {
          map['hard'] = 1;
        }
        break;
      default:
        break;
    }
  }
  for (const key in map) {
    values.push(map[key]);
    labels.push(key);
  }

  return {
    values: values,
    labels: labels
  }
}


// *numberOfTags keeps a cap on total displayed tags. 
export const getProblemNumbersByTag = (tagObjects, numberOfTags) => {
  if (!tagObjects || numberOfTags <= 0) return {};
  const values = [];
  const labels = [];
  let othersCount = 0

  for (let i = 0; i < tagObjects.length; i++) {
    if (i < numberOfTags - 1) {
      values.push(tagObjects[i].count);
      labels.push(tagObjects[i].tag);
    } else {
      // add the last tag instead of using "Others"
      if (numberOfTags === tagObjects.length) {
        values.push(tagObjects[i].count);
        labels.push(tagObjects[i].tag);
      } else {
        othersCount += tagObjects[i].count;
      }
    }
  }
  if (othersCount > 0) {
    values.push(othersCount);
    labels.push("Others")
  }
  return {
    values: values,
    labels: labels
  }
}


// Get total number of practices catagarized by tags.
export const getTagObjectsByTag = (problemsLatestPractices) => {
  if (!problemsLatestPractices) return {};
  const tagMap = new Map();
  for (const p of problemsLatestPractices) {
    const tags = p.tags.split(',');
    for (let tag of tags) {
      tag = tag.trim();
      if (tagMap.has(tag)) {
        tagMap.set(tag, tagMap.get(tag) + 1);
      } else {
        tagMap.set(tag, 1);
      }
    }
  }
  const res = [];
  for (const key of tagMap.keys()) {
    res.push({
      tag: key,
      count: tagMap.get(key)
    });
  }

  res.sort((a, b) => {
    if (a.count < b.count) return 1;
    else return -1;
  });

  return res;
}


export const getAcedProblemsNumber = (practices, problemsMap, numberOfDays) => {
  if (!practices || numberOfDays <= 0 || !problemsMap.keys) return {};

  const oneDay = 1000 * 60 * 60 * 24;
  // total days past since Unix Epoch
  const currentDays = Math.floor(new Date().getTime() / oneDay);
  const startingDays = currentDays - numberOfDays + 1;

  // Get total number of solved problems on the starting day.
  let sum = 0;
  for (let key of problemsMap.keys()) {
    const practices = problemsMap.get(key);
    const latestPractice = findLatestPracticeBeforeDate(practices, startingDays)
    if (latestPractice != null && latestPractice.completed) {
      sum++;
    }
  }

  // Add initial value to starting day.
  const values = Array(numberOfDays).fill(0);
  values[0] = sum;
  for (let i = 0; i < numberOfDays; i++) {
    for (let key of problemsMap.keys()) {
      const practices = problemsMap.get(key);
      const latestPraticeBeforeDate = findLatestPracticeBeforeDate(practices, startingDays + i);
      const latestPracticeOnDate = findLatestPracticeOnDate(practices, startingDays + i)
      if (latestPraticeBeforeDate != null) {
        if (!latestPraticeBeforeDate.completed) {
          if (latestPracticeOnDate != null && latestPracticeOnDate.completed) {
            values[i]++;
          }
        } else {
          if (latestPracticeOnDate != null && !latestPracticeOnDate.completed) {
            values[i]--;
          }
        }
      } else {
        if (latestPracticeOnDate != null && latestPracticeOnDate.completed) {
          values[i]++;
        }
      }
    }
  }

  // Accumulate the numbers
  let prev = 0;
  for (let i = 0; i < numberOfDays; i++) {
    values[i] += prev;
    prev = values[i];
  }

  const labels = Array(numberOfDays).fill('');
  const today = new Date();
  for (let i = 0; i < numberOfDays; i++) {
    const month = today.getMonth() + 1;
    const date = today.getDate();
    labels[numberOfDays - 1 - i] = month + '/' + date;
    today.setDate(today.getDate() - 1);
  }
  return {
    values: values,
    labels: labels
  }
}


// Find the latest practice of a problem before a specific date.
const findLatestPracticeBeforeDate = (practices, daysToUnix) => {
  if (!practices) return null;
  const oneDay = 1000 * 60 * 60 * 24;
  let res = null;
  let latestTime = 0;
  for (const p of practices) {
    const practiceDate = convertUTCToLocal(p.created_at);
    if (Math.floor(practiceDate.getTime() / oneDay) < daysToUnix) {
      const time = practiceDate.getTime();
      if (time > latestTime) {
        res = p;
        latestTime = time;
      }
    }
  }
  return res;
}


// Find the latest practice of a problem on a specific date.
const findLatestPracticeOnDate = (practices, daysToUnix) => {
  if (!practices) return null;
  const oneDay = 1000 * 60 * 60 * 24;
  let res = null;
  let latestTime = 0;
  for (const p of practices) {
    if (Math.floor(convertUTCToLocal(p.created_at).getTime() / oneDay) === daysToUnix) {
      const time = new Date(p.created_at).getTime();
      if (time > latestTime) {
        res = p;
        latestTime = time;
      }
    }
  }
  return res;
}

export const getTotalDaysFromFirstPractice = (practices) => {
  if (!practices) return 0;

  const oneDay = 1000 * 60 * 60 * 24;
  const currentDays = Math.floor(new Date().getTime() / oneDay);
  let res = 0;
  for (const p of practices) {
    const practiceDate = convertUTCToLocal(p.created_at);
    const practiceDays = Math.floor(practiceDate.getTime() / oneDay);
    res = Math.max(currentDays - practiceDays, res);
  }
  return res + 2;
}

export const convertUTCToLocal = (UTCString) => {
  const UTCDate = new Date(UTCString);
  UTCDate.setMinutes(UTCDate.getMinutes() - UTCDate.getTimezoneOffset());
  return UTCDate;
}
