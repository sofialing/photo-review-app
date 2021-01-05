/**
 * Helper Functions
 */
import { db, storage } from '../firebase';

/**
 * Delete an album from Firebase
 *
 * @param {String} id The id of the album to delete
 */
export const deleteAlbum = async id => {
	console.log('wants to delete album with id', id)
	await db.collection('albums').doc(id).delete();
}

/**
 * Delete an image from Firebase and storage
 *
 * @param {String} id	The id of the image to delete
 * @param {String} path	The path of the image to delete
 */
export const deleteImage = async (id, path) => {
	// delete document from firestore
	await db.collection('images').doc(id).delete();
	// delete image from storage
	return await storage.ref(path).delete();
}
