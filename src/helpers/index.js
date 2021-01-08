/* eslint-disable no-useless-escape */
/**
 * Helper Functions
 */
import { db, storage } from '../firebase'
import { nanoid } from 'nanoid'

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
	try {
		// create new album
		const albumRef = await db.collection('albums').add({
			owner_id: user.uid,
			owner_name: user.displayName,
			review_id: nanoid(6),
			title: `${title}_copy`,
		})

		// add photos to new album
		photos.forEach(async photo => {
			await db.collection('photos').add({
				...photo,
				album: albumRef
			})
		})

		return albumRef
	} catch (error) {
		console.log('something went wrong', error.message)
	}
}

/**
 * Creates a new album with approved photos
 * @param {Object} oldAlbum	Album used as reference
 * @param {Array} photos 	Photos to add to new album
 */
export const submitPhotoReview = async (oldAlbum, photos) => {
	try {
		const currentTime = new Date().toISOString().slice(0, 10);

		// create new album
		const albumRef = await db.collection('albums').add({
			owner_id: oldAlbum.owner_id,
			owner_name: oldAlbum.owner_name,
			review_id: nanoid(6),
			title: `${oldAlbum.title}_${currentTime}`,
		})

		// add photos to new album
		photos.forEach(async photo => {
			await db.collection('photos').add({
				...photo,
				album: albumRef
			})
		})
	} catch (error) {
		console.log('something went wrong', error.message)
	}
}

const slugify = (string) => {
	const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
	const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
	const p = new RegExp(a.split('').join('|'), 'g')

	return string.toString().toLowerCase()
		.replace(/\s+/g, '-') // Replace spaces with -
		.replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
		.replace(/&/g, '-and-') // Replace & with 'and'
		.replace(/[^\w\-]+/g, '') // Remove all non-word characters
		.replace(/\-\-+/g, '-') // Replace multiple - with single -
		.replace(/^-+/, '') // Trim - from start of text
		.replace(/-+$/, '') // Trim - from end of text
}
