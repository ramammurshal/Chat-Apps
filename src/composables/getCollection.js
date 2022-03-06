import { ref, watchEffect } from "vue";
import { projectFirestore } from "../firebase/config";

const getCollection = (collection) => {
  const documents = ref(null);
  const error = ref(null);

  let collectionRef = projectFirestore.collection(collection).orderBy("createdAt");

  const unsub = collectionRef.onSnapshot(
    (snap) => {
      console.log("snapshot");
      let results = [];
      snap.docs.forEach((doc) => {
        // doc.data di kiri memastikan data yang ada sudah up to date
        doc.data().createdAt && results.push({ ...doc.data(), id: doc.id });
      });
      documents.value = results;
      error.value = null;
    },
    (err) => {
      console.log(err.message);
      documents.value = null;
      error.value = "Could not fetch the data";
    }
  );
  // parameter kedua dari onSnapshot() adalah untuk case jika terjadi error

  watchEffect((onInvalidate) => {
    // unsub from prev collection when watcher is stopped (component unmounted)
    // sepertinya onInvalidate akan berjalan ketika component unmounted
    onInvalidate(() => unsub());
  });
  // ketika kita melakukan ini, maka kita akan memberhentikan proses stack dari snapshot yang telah terjadi sebelumnya saat component unmounted
  // di dalam watchEffect akan otomatis terdapat onInvalidate (fungsi yang akan berjalan ketika watchEffect berhenti)

  return { documents, error };
};

export default getCollection;
