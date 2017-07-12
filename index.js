const functions = require('firebase-functions');

//import admin module
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// Listens for new coordinate added to Coordinates/:pushId
exports.pushNotification = functions.database.ref('/Coordinates/pushId').onWrite( event => {

    console.log('Push notification event triggered');

    //  Grab the current value of what was written to the Realtime Database.
    var valueObject = event.data.val();

  // Create a notification
    const payload = {
		data: {valueObject.latitude,
			   valueObject.longitude},
        notification: {
            title: valueObject.userID,
            body:" Want to share location with you, click to view!",
            sound: "default"
        },
    };

  //Create an options object that contains the time to live for the notification and the priority
    const options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };


    return admin.messaging().sendToTopic("pushNotifications", payload, options)
			.then(function (response) {
                // See the MessagingTopicResponse reference documentation for the
                // contents of response.
                console.log("Successfully sent message:", response);
            })
            .catch(function (error) {
                console.log("Error sending message:", error);
            });
});