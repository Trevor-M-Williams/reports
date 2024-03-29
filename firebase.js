import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDQORTt989pqIxC_xh6a5Ln5cH7P6UEjdQ",
  authDomain: "pagespeed-1678208278796.firebaseapp.com",
  databaseURL: "https://pagespeed-1678208278796-default-rtdb.firebaseio.com",
  projectId: "pagespeed-1678208278796",
  storageBucket: "pagespeed-1678208278796.appspot.com",
  messagingSenderId: "109722274213",
  appId: "1:109722274213:web:fe2a33b24bf0f44892004c",
  measurementId: "G-54VJR863VY",
};

const app = initializeApp(firebaseConfig);

export function getReports(setReports) {
  const db = getDatabase();
  const reportsRef = ref(db, "reports/");

  onValue(
    reportsRef,
    (snapshot) => {
      const reportsData = snapshot.val();
      if (reportsData) {
        const reportsList = Object.values(reportsData);
        setReports(reportsList);
      }
    },
    (error) => {
      console.log("The read failed: " + error.name);
    }
  );
}

export function postReport(data) {
  if (!data) return;
  let id = data.title;
  const db = getDatabase();
  const reference = ref(db, "reports/" + id);
  set(reference, data);
}

export function deleteReport(data) {
  if (!data) return;
  let id = data.title;
  const db = getDatabase();
  const reference = ref(db, "reports/" + id);
  set(reference, null);
}

export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;
