
const firebaseConfig = {
    apiKey: "AIzaSyDCdhgsnlKAE2WQFkUuyo1luajKvvleDW8",
    authDomain: "orange-32123.firebaseapp.com",
    databaseURL: "https://orange-32123-default-rtdb.firebaseio.com",
    projectId: "orange-32123",
    storageBucket: "orange-32123.appspot.com",
    messagingSenderId: "293771634914",
    appId: "1:293771634914:web:5fb87a0e00d6afee6ed6bb"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase();

// Set up register function
function Register() {
    // Get all input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value
    
    //validate input fields
    if (validate_email(email) == false || validate_password(password) == false){
        alert('Email or Password is not correct') 
    }

    // Authentication
    auth.createUserWithEmailAndPassword(email, password)
    .then(function(){

        var user = auth.currentUser

        // Add this user to Firebase Database
        var database_ref = database.ref()

        //Create User data
        var user_data = {
            email: email,
            last_login: Date.now()
        }

        database_ref.child('users/' + user.uid).set(user_data)


        alert('User Created')

    })
    .catch(function(error){
        var error_code = error.code
        var error_message = err.message

        alert(error_message)
    })

    
}

// Set up login function
function Login() {
    email = document.getElementById('email').value
    password = document.getElementById('password').value

    // Validate input field
    if (validate_email(email) == false || validate_password(password) == false){
        alert('Email or Password is not correct') 
        return
        // Don't continue running the code
    }

    auth.signInWithEmailAndPassword(email, password)
    .then (function(){
        var user = auth.currentUser

        // Add this user to Firebase Database
        var database_ref = database.ref()
    
        //Create User data
        var user_data = {
            last_login: Date.now()
        }
    
        database_ref.child('users/' + user.uid).update(user_data)
    
    
        alert('User Logged In')
    })
    .catch (function(error){
        var error_code = error.code
        var error_message = err.message
    
        alert(error_message)
    })

}


// Validate Functions
function validate_email(email){
     expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
        return true
    } else {
        return false
    }
}

function validate_password(password) {
    if(password <6){
        return false
    } else {
        return true
    }
}