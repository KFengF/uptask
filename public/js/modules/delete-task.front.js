import Swal from "sweetalert2";
import axios from "axios";

const deleteTask = document.querySelector(".fa-trash");

if (deleteTask) {
  deleteTask.addEventListener("click", event => {
    const taskSelected = event.target.parentElement.parentElement;
    const tasksList = taskSelected.parentElement;
    const taskId = taskSelected.dataset.taskId;

    Swal.fire({
      title: "Are you sure deleting this task?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(196, 0, 0)",
      cancelButtonColor: "rgb(219, 184, 29)",
      confirmButtonText: "Delete it",
      cancelButtonText: "Cancel"
    }).then(result => {
      if (result.value)
        axios
          .delete(`${location.origin}/tasks/${taskId}`)
          .then(() => {
            tasksList.removeChild(taskSelected);
            Swal.fire(
              "Deleted",
              "Your task has been deleted",
              "success"
            );
          })
          .catch(() =>
            Swal.fire({
              icon: "error",
              title: "There's something wrong...",
              text: "Task couldn't be deleted"
            })
          );
    });
  });
}

export default deleteTask;
