import Swal from "sweetalert2";
import axios from "axios";

const deleteProject = document.getElementById("delete-project");

if (deleteProject)
  deleteProject.addEventListener("click", event => {
    const projectUrl = event.target.dataset.projectUrl;

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(196, 0, 0)",
      cancelButtonColor: "rgb(219, 184, 29)",
      confirmButtonText: "Delete it",
      cancelButtonText: "Cancel"
    }).then(result => {
      if (result.value)
        axios
          .delete(`${location.origin}/projects/${projectUrl}`)
          .then(() =>
            Swal.fire(
              "Deleted",
              "Your project has been deleted",
              "success"
            )
          )
          .then(() => (location.href = "/"))
          .catch(() =>
            Swal.fire({
              icon: "error",
              title: "There's something wrong...",
              text: "Project couldn't be deleted"
            })
          );
    });
  });

export const putProjectProcess = () => {
  const tasks = document.querySelectorAll("li.tarea");

  if (tasks.length) {
    const completedTasks = document.querySelectorAll("i.completo");
    const process = Math.round(
      (completedTasks.length / tasks.length) * 100
    );
    const processBar = document.querySelector(".porcentaje");

    processBar.style.width = process + "%";

    process === 100 &&
      Swal.fire(
        "Project completed",
        "You have completed every task available",
        "success"
      );
  }
};
