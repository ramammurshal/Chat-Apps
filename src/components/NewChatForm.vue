<template>
  <form @submit.prevent="handleSubmit">
    <textarea placeholder="Ketikkan sesuatu dan kirim..." v-model="message"></textarea>
    <button>Kirim</button>
    <div class="error">{{ error }}</div>
  </form>
</template>

<script>
import getUser from "../composables/getUser";
import useCollection from "../composables/useCollection";
import { ref } from "vue";
import { timestamp } from "../firebase/config";

export default {
  setup() {
    const { user } = getUser();
    const message = ref("");
    const { addDoc, error } = useCollection("messages");

    const handleSubmit = async () => {
      const chat = {
        name: user.value.displayName,
        message: message.value,
        createdAt: timestamp(),
      };

      await addDoc(chat);

      if (!error.value) {
        message.value = "";
      }
    };

    return { message, handleSubmit, error };
  },
};
</script>

<style scoped>
form {
  margin: 10px;
  padding: 10px;
}

textarea {
  width: 100%;
  max-width: 100%;
  margin-bottom: 6px;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid grey;
  border-radius: 4px;
  font-family: inherit;
  outline: none;
}

textarea:focus {
  border: 2px solid #666;
}
</style>
