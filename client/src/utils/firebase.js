import firebase from 'firebase';
import API from './API';

export const fbapp = firebase.initializeApp({
    apiKey: "AIzaSyAc6AeqA_ePg70BX04lrb2j8aw7J24f4lg",
    authDomain: "vision-boarder.firebaseapp.com",
    projectId: "vision-boarder",
    storageBucket: "vision-boarder.appspot.com",
    messagingSenderId: "729873887848",
    appId: "1:729873887848:web:91726957fb9d66f97d01dd",
    measurementId: "G-DB8H24C33C"
  });

export function fileUpload(file, currentBid) {
    // Points to the root reference
    var storageRef = firebase.storage().ref();

    // Points to 'images'
    var imagesRef = storageRef.child('images');

    // Points to 'images/space.jpg'
    // Note that you can use variables to create child values
    var fileName = file.name;

    // Create the file metadata
    var metadata = {
        contentType: file.type,
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    var uploadTask = storageRef.child('images/' + file.name).put(file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
                default:
                    console.log('No upload currently');
            }
        },
        (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    break;

                // ...

                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
                default:
                    console.log('No upload currently');
            }
        },
        () => {
            const bid = parseInt(currentBid)
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                API.newNote({url: downloadURL}, bid)
                .then((res) => {
                    console.log('File saved successfully', res);
                })
                .catch(err => console.error(err));
            });
        }
    );
}