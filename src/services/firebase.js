/**
 * Cloud Firestore & Storage Services
 */

import { db, storage } from '../firebase'
import { nanoid } from 'nanoid'
import slugify from 'slugify'

/**
 * Create a new album in Cloud Firestore
 *
 * @param {String} title	The title of the new album
 * @param {Object} user		The owner of the new album
 */
export const createAlbum = (title, user) => {
	return db.collection('albums').add({
		createdAt: Date.now(),
		ownerId: user.uid,
		ownerName: user.displayName,
		reviewId: nanoid(6),
		title,
		updatedAt: null
	})
}

/**
 * Delete an album from Cloud Firestore
 *
 * @param {String} albumId	The ID of the album
 */
export const deleteAlbum = (albumId) => {
	// check if album has photos, if so delete them first
	db.collection('photos')
		.where('album', '==', db.collection('albums').doc(albumId)).get()
		.then(snapshot => {
			if (snapshot.empty) {
				return;
			}
			snapshot.docs.forEach(async doc => {
				await deletePhoto(doc.id, doc.data().path);
			})
		})

	return db.collection('albums').doc(albumId).delete();
}

/**
 * Delete a photo from Cloud Firestore
 *
 * @param {String} photoId	The ID of the photo
 * @param {String} path 	The path to the photo
 */
export const deletePhoto = (photoId, path) => {
	return db.collection('photos').doc(photoId).delete()
		.then(() => deleteFromStorage(path));
}

/**
 * Delete a photo from Firebase Storage
 *
 * @param {String} path		The path to the photo
 */
export const deleteFromStorage = (path) => {
	// check if photo exists in other albums, if so return
	db.collection('photos').where('path', '==', path).get()
		.then(snapshot => {
			if (!snapshot.empty) {
				return;
			}
			return storage.ref(path).delete();
		});
}

/**
 * Get an album by ID <-- TODO: add onSnapshot?
 *
 * @param {String} albumId	The ID of the album
 */
export const getAlbumById = (albumId) => {
	return db.collection('albums').doc(albumId).get();
}

/**
 * Get all albums owned by user
 *
 * @param {String} userId	The ID of the user
 */
export const getAlbumsSnapshot = (userId) => {
	return db.collection('albums')
		.where('ownerId', '==', userId)
		.orderBy('createdAt', 'desc')
}



/**
 * Search for albums by field and value
 *
 * @param {String} field	The document field to search in
 * @param {String} value	The field value to search for
 */
export const searchAlbums = (field, value) => {
	return db.collection('albums')
		.where(field, '==', value)
		.get();
}

/**
 * Get all photos by album reference
 *
 * @param {String} albumId	The ID of the album
 */
export const getPhotos = (albumId) => {
	return db.collection('photos')
		.where('album', '==', getAlbumRef(albumId))
		.get();
}

/**
 * Get photos snapshot by album ID
 *
 * @param {String} albumId The album ID
 */
export const getPhotosSnaphot = albumId => {
	return db.collection('photos')
		.where('album', '==', getAlbumRef(albumId));
}

/**
 * Update album with new data
 *
 * @param {String} albumId	The ID of the album to update
 * @param {Object} data		The new album data
 */
export const updateAlbum = (albumId, data) => {
	return db.collection('albums')
		.doc(albumId)
		.update(data);
}

/**
 * Get reference to an album by it's ID
 *
 * @param {String} albumId	The ID of the album
 */
export const getAlbumRef = (albumId) => {
	return db.collection('albums').doc(albumId);
}

/**
 * Add photo to Cloud Firestore
 *
 * @param {Object} photo The photo to add
 */
export const addPhoto = (photo) => {
	return db.collection('photos').add(photo);
}

/**
 * Get review link for album
 *
 * @param {String} albumId	The ID of the album
 */
export const getReviewLink = async (albumId) => {
	const album = await getAlbumById(albumId);
	const { title, reviewId } = album.data();

	return `${window.location.origin}/review/${slugify(title)}/${reviewId}`;
}

/**
 * Creates a new album with approved photos
 *
 * @param {Array} photos 	Photos to add to new album
 * @param {Object} albumRef	Album used as reference
 */
export const createReviewedAlbum = async (photos, prevAlbum) => {
	const currentTime = new Date().toISOString().slice(0, 10)
	const title = `${prevAlbum.title}_reviewed_${currentTime}`

	// create new album instance
	const albumRef = await createAlbum(title, {
		uid: prevAlbum.ownerId,
		displayName: prevAlbum.ownerName
	})

	// add approved photos to new album
	photos.forEach(async photo => {
		await addPhoto({
			...photo,
			album: albumRef
		})
	})
}
