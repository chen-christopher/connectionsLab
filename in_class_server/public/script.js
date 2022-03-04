fetch("/cats")
  .then((response) => response.json())
  .then((data) => console.log(data));
