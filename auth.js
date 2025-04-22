import  { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "./firebase.js"
const signupform = document.getElementById("sign_up");
const signinform = document.getElementById("log_in");

if (signupform) {
  signupform.addEventListener("submit", (event) => {
    event.preventDefault();
    let email = event.target[0].value;
    let password = event.target[1].value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((data) => {
        if (data.user) {
          alert("You have Successfully registered");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Unable to register, Already have an account");
      });
  });
}

if (signinform) {
  signinform.addEventListener("submit", (event) => {
    event.preventDefault();
    let email = event.target[0].value;
    let password = event.target[1].value;

    signInWithEmailAndPassword(auth, email, password)
      .then((data) => {
        if (data.user.accessToken) {
          alert("Login successful");
          location.assign("./log-succ_page.html")
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Unable to Login or Credentials are incorrect");
      });
  });
}
