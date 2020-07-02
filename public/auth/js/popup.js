const openPopupAdd = () => {
  document.getElementById("add-popup").style.display = "block";
}

const closePopupAdd = () => {
  document.getElementById("add-popup").style.display = "none";
}

const Action = () => {
  return confirm('Do you want to action ?');
}