const firebaseConfig = {
  apiKey: "AIzaSyDZvyJfE8-cog0KpTdNqSmAc3I6JbUWBqA",
  authDomain: "sign-up-cfe61.firebaseapp.com",
  projectId: "sign-up-cfe61",
  storageBucket: "sign-up-cfe61.appspot.com",
  messagingSenderId: "860273104307",
  appId: "1:860273104307:web:6d74ef46f2229470bca7c6",
  measurementId: "G-CWVBBGGW3H"
};

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Initialize variables
  const auth = firebase.auth()
  const database = firebase.database()


const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});
 
document.getElementById('sign-up-form').addEventListener('submit',submitForm);
document.getElementById('sign-in-form').addEventListener('submit',sub);

function submitForm(e){
  e.preventDefault();
  names = document.getElementById('name').value
  email = document.getElementById('email').value
  password = document.getElementById('password').value
  password1 = document.getElementById('password1').value
 
 
  if(match(password,password1)==false){
    alert('your passwords do not match')
    return
  }
  /*if ( validate_password(password) == false) {
    alert('choose a strong password!!')
    return
    // Don't continue running the code
  }*/
  if (validate_field(names) == false || validate_field(password) == false || validate_field(password1) == false) {
    alert('One or More Extra Fields is Empty!!')
    return
  }
 
  console.log(email,password);


auth.createUserWithEmailAndPassword(email, password)
.then(function() {
  // Declare user variable
  var user = auth.currentUser

  // Add this user to Firebase Database
  var database_ref = database.ref()

  // Create User data
  var user_data = {
    email : email,
    names : names,
    password:password,
    password1:password,
    last_login : Date.now()
  }

  // Push to Firebase Database
  database_ref.child('users/' + user.uid).set(user_data)

  // DOne
  alert('User Created!!')
})
.catch(function(error) {
  // Firebase will use this to alert of its errors
  var error_code = error.code
  var error_message = error.message

  alert(error_message)
})
}
function sub(e){
  e.preventDefault();

  email1 = document.getElementById('email1').value
  pass = document.getElementById('pass').value
  console.log(email1,pass);
  
  auth.signInWithEmailAndPassword(email1, pass)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
      // Create User data
      var user_data = {
        last_login : Date.now()
      }
  
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).update(user_data)
  
      // DOne
      alert('User Logged In!!')
  
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
}
document.getElementById('social-icon').addEventListener('click', GoogleLogin)


let provider = new firebase.auth.GoogleAuthProvider()
function GoogleLogin(){
  console.log('Login Btn Call')
  firebase.auth().signInWithPopup(provider).then(res=>{
    console.log(res.user)
    
  }).catch(e=>{
    console.log(e)
  })
}
function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false
  } else {
    return true
  }
}
function match(password,password1){
  if(password==password1)
    return true;
  return false;
}
function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}
