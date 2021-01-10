/* eslint-disable no-useless-escape */
/**
 * Firebase Services
 */
import { db, storage } from '../firebase'
import { nanoid } from 'nanoid'
import slugify from 'slugify'

/**
 * Create new album in Firebase
 *
 * @param {String} title
 * @param {Object} user
 */
export const createAlbum = (title, user) => {
	return db.collection('albums').add({
		owner_id: user.uid,
		owner_name: user.displayName,
		review_id: nanoid(6),
		title,
	})
}

/**
 * Delete an album and its photos from Firebase
 *
 * @param {String} id		The id of the album to delete
 */
export const deleteAlbum = async id => {
	// check if album has photos, if so delete them first
	const snapshot = await db.collection('photos')
		.where('album', '==', db.collection('albums').doc(id))
		.get()

	if (!snapshot.empty) {
		// album has photos to delete
		snapshot.docs.forEach(async doc => {
			await deletePhoto(doc.id, doc.data().path)
		});
	}

	// delete document from firestore
	await db.collection('albums').doc(id).delete()
}

/**
 * Delete an photo from Firebase and storage
 *
 * @param {String} id		The id of the photo to delete
 * @param {String} path		The path of the photo to delete
 */
export const deletePhoto = async (id, path) => {
	// delete document from firestore
	await db.collection('photos').doc(id).delete();

	// check if photo exists in other albums, if not delete it from storage
	const photos = await db.collection('photos').where('path', '==', path).get()
	if (photos.empty) {
		await storage.ref(path).delete()
	}
}

/**
 * Update album title
 *
 * @param {String} id		The id of the album to update
 * @param {String} title	The new album title
 */
export const updateAlbumTitle = async (id, title) => {
	return await db.collection('albums').doc(id).update({ title })
}

/**
 * Get review link for album (review/slug/review_id)
 *
 * @param {String} id		The id of the album to share
 */
export const getReviewLink = async (id) => {
	const doc = await db.collection('albums').doc(id).get()
	const { title, review_id } = doc.data()

	return `${window.location.origin}/review/${slugify(title)}/${review_id}`
}

/**
 * Create new album with photos
 *
 * @param {Array} photos	Photos to add to album
 * @param {String} title	Title of album
 * @param {Object} user 	Owner of album
 */
export const createNewAlbum = async (photos, title, user) => {
	const album = {
		owner_id: user.uid,
		owner_name: user.displayName,
		review_id: nanoid(6),
		title: `${title}_copy`,
	}

	const albumRef = db.collection('albums')
		.add(album)
		.then(albumRef => {
			photos.forEach(async photo => {
				await db.collection('photos').add({
					...photo,
					album: albumRef
				})
			})
		})

	// try {
	// 	// create new album
	// 	const albumRef = await db.collection('albums').add({
	// 		owner_id: user.uid,
	// 		owner_name: user.displayName,
	// 		review_id: nanoid(6),
	// 		title: `${title}_copy`,
	// 	})

	// 	// add photos to new album
	// 	photos.forEach(async photo => {
	// 		await db.collection('photos').add({
	// 			...photo,
	// 			album: albumRef
	// 		})
	// 	})

	// 	return albumRef
	// } catch (error) {
	// 	console.log('something went wrong', error.message)
	// }
}

/**
 * Creates a new album with approved photos
 *
 * @param {Array} photos 	Photos to add to new album
 * @param {Object} albumRef	Album used as reference
 */
export const createReviewedAlbum = async (photos, prevAlbum) => {
	// get current time
	const currentTime = new Date().toISOString().slice(0, 10)

	// create new album instance
	const album = {
		owner_id: prevAlbum.owner_id,
		owner_name: prevAlbum.owner_name,
		review_id: nanoid(6),
		title: `${prevAlbum.title}_reviewed_${currentTime}`,
	}

	return db.collection('albums')
		.add(album)
		.then(albumRef => {
			photos.forEach(async photo => {
				await db.collection('photos').add({
					...photo,
					album: albumRef
				})
			})
		})
}

/**
 * Get an album by ID
 *
 * @param {String} id The album ID
 */
export const getAlbumById = id => {
	return db.collection('albums').doc(id).get()
}

/**
 * Get photos by album ID
 *
 * @param {String} id The album ID
 */
export const getPhotosByAlbumId = id => {
	return db.collection('photos')
		.where('album', '==', db.collection('albums').doc(id))
}

/**
 * Get an album by review ID
 *
 * @param {String} id The review ID
 */
export const getReviewAlbumById = id => {
	return db.collection('albums')
		.where('review_id', '==', id)
		.get()
}

/**
 * Get albums by owner ID
 *
 * @param {String} id The user ID
 */
export const getAlbumByOwnerId = id => {
	return db.collection('albums')
		.where('owner_id', '==', id)
		.orderBy('title')
}

/**
 * Get reference the album by ID
 * @param {String} id The album ID
 */
export const getAlbumRef = (id) => {
	return db.collection('albums').doc(id)
}

/**
 * Add photo reference to Firebase
 *
 * @param {Object} photo The photo to add
 */
export const addPhoto = (photo) => {
	return db.collection('photos').add(photo)
}

/**
 * Add photos to album
 * @param {*} photos
 * @param {*} albumRef
 */
export const addPhotosToAlbum = (photos, albumRef) => {
	photos.forEach(async photo => {
		await db.collection('photos').add({
			...photo,
			album: albumRef
		})
	})
}
