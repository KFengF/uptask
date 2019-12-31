import Swal from "sweetalert2";
import axios from "axios";

const taskCheck = document.querySelector(".fa-check-circle");

if (taskCheck) {
  taskCheck.addEventListener("click", event => {
    const icon = event.target;
    const taskId = icon.parentElement.parentElement.dataset.taskId;
    axios
      .patch(`${window.location.origin}/tasks/${taskId}`)
      .then(() => icon.classList.toggle("completo"))
      .catch(() =>
        Swal.fire({
          icon: "error",
          title: "There's something wrong...",
          text: "Task couldn't be checked or unchecked"
        })
      );
  });
}

export default taskCheck;
