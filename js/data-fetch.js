// get the data
fetch("./js/ukc-data.json")
  .then(res => res.json())
  .then(res => {
    // output charts
    yearChart(res);
  })
  .catch(err => console.log(err));
