import axios from "axios";

const taskCheck = document.querySelector(".fa-check-circle");

if (taskCheck) {
  taskCheck.addEventListener("click", event => {
    const icon = event.target;
    const taskId = icon.parentElement.parentElement.dataset.taskId;
    axios
      .patch(`${window.location.origin}/tasks/${taskId}`)
      .then(
        res => res.status === 200 && icon.classList.toggle("completo")
      )
      .catch(console.error);
  });
}

export default taskCheck;
