import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {Notify} from "./models/Notify";


admin.initializeApp();
const database = admin.firestore();


// eslint-disable-next-line max-len
export const notifyUsers = functions.firestore.document("/notifications/{idUserNotify}/listNotify/{idNotify}").onCreate(async (snapshot, context) => {
  const idUserNotify = context.params.idUserNotify;
  const idNotify = context.params.idNotify;
  const notify=snapshot.data() as Notify;
  notify.id=idNotify;
  notify.timestamp=snapshot.get("timestamp").toMillis();
  const docUser = await database.collection("users").doc(idUserNotify).get();
  const token=docUser.get("token");
  return admin.messaging().sendToDevice(token, {
    data: {
      notify: JSON.stringify(notify),
    },
  });
});

