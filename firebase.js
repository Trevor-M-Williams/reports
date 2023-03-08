import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDKDByGLjA21VRE8puTfqQvGAMUrLpVTeU",
  authDomain: "pagespeed-1678208278796.firebaseapp.com",
  databaseURL: "https://pagespeed-1678208278796-default-rtdb.firebaseio.com",
  projectId: "pagespeed-1678208278796",
  storageBucket: "pagespeed-1678208278796.appspot.com",
  messagingSenderId: "109722274213",
  appId: "1:109722274213:web:fe2a33b24bf0f44892004c",
  measurementId: "G-54VJR863VY",
};

const app = initializeApp(firebaseConfig);

export function postReport(data) {
  if (!data) return;
  if (!data.url) return;

  let id = data.url
    .replace("http://", "")
    .replace("https://", "")
    .replace("www.", "")
    .split(".")[0];
  const db = getDatabase();
  const reference = ref(db, "reports/" + id);
  set(reference, data);
}
