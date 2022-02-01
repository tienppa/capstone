import firebase from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import Compressor from "compressorjs";

class MyUploadAdapter {
	constructor(loader) {
		this.loader = loader;
	}

	fileCompress = (file) => {
		return new Promise((resolve, reject) => {
			new Compressor(file, {
				file: "File",
				quality: 0.5,
				width: 900,
				success(file) {
					return resolve({
						success: true,
						file: file,
					});
				},
				error(err) {
					return resolve({
						success: false,
						message: err.message,
					});
				},
			});
		});
	};

	upload() {
		return this.loader.file.then(
			(file) =>
				new Promise(async (resolve, reject) => {
					const compressState = await this.fileCompress(file);
					if (compressState.success) {
						let storage = firebase.storage().ref();
						let fileName = uuidv4();
						let uploadTask = storage.child(fileName).put(compressState.file);
						uploadTask.on(
							firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
							function (snapshot) {
								var progress =
									(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
								switch (snapshot.state) {
									case firebase.storage.TaskState.PAUSED: // or 'paused'
										console.log("Upload is paused");
										break;
									case firebase.storage.TaskState.RUNNING: // or 'running'
										console.log("Upload is running");
										break;
								}
							},
							function (error) {
								switch (error.code) {
									case "storage/unauthorized":
										reject(
											" User doesn't have permission to access the object"
										);
										break;

									case "storage/canceled":
										reject("User canceled the upload");
										break;

									case "storage/unknown":
										reject(
											"Unknown error occurred, inspect error.serverResponse"
										);
										break;
								}
							},
							function () {
								uploadTask.snapshot.ref
									.getDownloadURL()
									.then(function (downloadURL) {
										// console.log("File available at", downloadURL);
										resolve({
											default: downloadURL,
										});
									});
							}
						);
					}
				})
		);
	}
}

export default MyUploadAdapter;
