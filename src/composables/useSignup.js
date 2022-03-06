import { ref } from "vue";
import { projectAuth } from "../firebase/config";

const error = ref(null);

const signup = async (email, password, displayName) => {
  // reset error value to null again (when user try to signup again)
  error.value = null;

  try {
    // signup method firebase
    const res = await projectAuth.createUserWithEmailAndPassword(email, password);
    // jika berhasil, maka akan mengembalikan response (didalamnya terdapat property user)

    if (!res) {
      throw new Error("Could not complete the signup");
    }

    // console.log(res.user);

    // set displayName
    await res.user.updateProfile({ displayName });
    error.value = null;

    return res;
  } catch (err) {
    console.log(err.message);
    error.value = err.message;
  }
};

// function: just return value
const useSignup = () => {
  return { error, signup };
};

export default useSignup;
