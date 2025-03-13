// Login page functionality: for poping up and disappearing.
let popup = document.getElementById("poplog")
    let create_account = document.getElementById("crt_acc_but")
    let login_account = document.getElementById("log_acc_but")
    create_account.addEventListener("click", () => {
      location.assign("./sign-up_page.html")
    })
    login_account.addEventListener("click", () => {
      location.assign("./log-in_page.html")
    })
    window.onload = () => {
      if (sessionStorage.getItem("pop_hiding") === "true") {
        popup.style.display = "none"
      }
    }