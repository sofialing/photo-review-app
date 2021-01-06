/**
 * Helper Functions
 */
import { db, storage } from '../firebase';

/**
 * Delete an album from Firebase
 *
 * @param {String} id		The id of the album to delete
 */
export const deleteAlbum = async id => {
	console.log('wants to delete album with id', id)
	await db.collection('albums').doc(id).delete();
}

/**
 * Delete an image from Firebase and storage
 *
 * @param {String} id		The id of the image to delete
 * @param {String} path		The path of the image to delete
 */
export const deleteImage = async (id, path) => {
	// delete document from firestore
	await db.collection('images').doc(id).delete();
	// delete image from storage
	return await storage.ref(path).delete();
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
 * @param {Sting} id		The id of the album to share
 */
export const getReviewLink = async (id) => {
	const doc = await db.collection('albums').doc(id).get()
	const { title, review_id } = doc.data()

	return `${window.location.origin}/review/${slugify(title)}/${review_id}`
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
