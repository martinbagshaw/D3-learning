// - - - -
// 1. ascents by year / month / day, e.g.
// - get a count by year and month for data visualisation test
// - need to reverse order to work with js date - I think
// {
//   2019: {
//       totalCount: 60,
//       jan: {
//           totalCount: 20,
//           ascents: {
//               01: 5,
//               02: 0,
//               ...
//           }
//       },
//       feb: {
//           totalCount: 10,
//           ascents: {
//               01: 0,
//               02: 0
//           }
//       }
//   }
// }

// count the ascents per year

const yearCount = rawData => {
  // get date function
  const dateYear = date =>
    new Date(
      date
        .split("/")
        .reverse()
        .join("/")
    ).getFullYear();

  // return the result
  return rawData
    .map(i => dateYear(i.Date))
    .reduce((acc, val) => {
      if (val in acc) {
        acc[val]++;
      } else {
        acc[val] = 1;
      }
      return acc;
    }, {});
};
