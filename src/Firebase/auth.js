import firebase from "./firebase"
import M from 'materialize-css'
import { db } from "./firestore";
import { getCookie } from "../cookies";
export const auth = firebase.auth();

// user Sign Up 
export const SignUpCall = () => {
    // e.preventDefault();
    var fname = document.getElementById('reg-fname').value;
    var lname = document.getElementById('reg-lname').value;
    var email = document.getElementById("reg-email").value;
    var pass = document.getElementById("reg-password").value;

    if ((fname.length && lname.length && email.length && pass.length) !== 0) {

            auth.createUserWithEmailAndPassword(email, pass)
            .then(async () => {
                await auth.currentUser.updateProfile({displayName: fname + " " + lname});
                await db.collection('Users').doc(auth.currentUser.uid).set({
                    userid: auth.currentUser.uid,
                    email: auth.currentUser.email? auth.currentUser.email: '',
                    fname: fname,
                    lname: lname,
                    profilepic: "https://firebasestorage.googleapis.com/v0/b/the-gestor.appspot.com/o/profile%2Fuser.png?alt=media&token=df2b9ca4-a73a-4312-b61f-1faf1c2fe374",
                    nif: '',
                    profession: '',
                    inc: [0,0,0,0,0,0,0,0,0,0,0,0],
                    exp: [0,0,0,0,0,0,0,0,0,0,0,0],
                    retExp: [0,0,0,0,0,0,0,0,0,0,0,0],
                    ivaExp: [0,0,0,0,0,0,0,0,0,0,0,0],
                    irpfExp: [0,0,0,0,0,0,0,0,0,0,0,0],
                    retInc: [0,0,0,0,0,0,0,0,0,0,0,0],
                    ivaInc: [0,0,0,0,0,0,0,0,0,0,0,0],
                    irpfInc: [0,0,0,0,0,0,0,0,0,0,0,0],
                    
                })
                await db.collection('Users').doc(auth.currentUser.uid).collection("models").doc('303').add({ name: '303', days: '27', amount: 130.00, qtr: 'IRPF (IT 2020)', status: true});
                await db.collection('Users').doc(auth.currentUser.uid).collection("models").doc('130').add({ name: '130', days: '24', amount: 170.00, qtr: 'IRPF (IT 2020)', status: true});
                await db.collection('Users').doc(auth.currentUser.uid).collection("models").doc('303').add({ name: '390', days: '21', amount: 210.00, qtr: 'Annual IVA (2020)', status: true});
                await db.collection('Users').doc(auth.currentUser.uid).collection("models").doc('303').add({ name: '111', days: '21', amount: 130.00, qtr: 'VAT 2020', status: false },);
                await db.collection('Users').doc(auth.currentUser.uid).collection("models").doc('303').add({ name: '349', days: '12',amount: 170.00, qtr: 'IRPF (IT 2020)', status: false});
                await db.collection('Users').doc(auth.currentUser.uid).collection("models").doc('347').add({ name: '347', days: '21', amount: 210.00, qtr: 'Annual IVA (2020)', status: false});        
                M.toast({html: "User Added!"})
                if(getCookie("language") == "spanish"){
                    window.location.replace('/es/home')
                }
                else{
                    window.location.replace('/home')
                }

            })
            .catch((error) => {console.log(error, error.message)})

    } else {
            M.toast({html: 'Every Field is Mandatory!'})
    }
}

// User login 
export const SignInCall = () => {
    // e.preventDefault();
    const email = document.getElementById("login-email").value;
    const pass = document.getElementById("login-pass").value;

    auth.signInWithEmailAndPassword(email, pass)
        .then( res => {
            if (res) {
                if(getCookie("language") == "spanish"){
                    window.location.replace('/es/home')
                }
                else{
                    window.location.replace('/home')
                }
                console.log(auth.currentUser);
            }
        }).catch(err => {
                M.toast({html: err.message})
        });
}
// User Pass Reset
export const PassReset = () => {
var emailAddress = document.getElementById("reset-email").value;

auth.sendPasswordResetEmail(emailAddress).then(function() {
  window.location.replace("/");
  SignOut();
}).catch(function(error) {
  console.log(error);
});
}
export const NewPassword = (oobCode) => {
    let newPassword = document.getElementById("newPass").value;
    let confirmPassword = document.getElementById("confirmPass").value;
    if(newPassword === confirmPassword){

        auth.confirmPasswordReset(oobCode, newPassword)
            .then(function() {
                if(getCookie("language") == "spanish"){
                    window.location.replace('/es/home')
                }
                else{
                    window.location.replace('/home')
                }
            })
            .catch(function(error) {
                console.log(error);
            })
    }
    else{
        alert("Confirm password and new password are different!");
    }
}


// User Sign Out
export const SignOut = () => {
    auth.signOut().then(res => {
        M.toast({html: 'LOGGING OUT'})        
        setTimeout(() => {
            M.toast({html: 'You\'re Logged Out Successfully'})
            if(getCookie("language") == "spanish"){
                window.location.replace('/es')
            }
            else{
                window.location.replace('/')
            }
        }, 1000);
    }).catch(err => {
        M.toast({html: err.message})
    })
}

export const nextFiling = [

  ]