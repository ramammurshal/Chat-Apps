import { ref } from "vue";
import { projectAuth } from "../firebase/config";

// property dari firebase yang menunjukkan data/status user saat ini
const user = ref(projectAuth.currentUser);

// method dari firebase yang akan "selalu" terpanggil ketika keadaan user berubah (signup, login, logout)
// menyediakan callback function yang berisi argument user saat itu
projectAuth.onAuthStateChanged((_user) => {
  // console.log("User state change. Current user is: ", _user);
  user.value = _user;
});

const getUser = () => {
  return { user };
};

export default getUser;
