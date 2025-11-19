import Contact from "../db/models/Contact.js";


// Повертає масив контактів.
export function listContacts() {
    return Contact.findAll();
}

// Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
export function getContactById(id) {
    return Contact.findByPk(id);
}

// Повертає об'єкт доданого контакту (з id).
export function addContact(payload) {
    return Contact.create(payload);
}

// Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
export async function removeContact(id) {
    const contact = await getContactById(id);
    if (!contact) return null;
    await contact.destroy();
    return contact;
}

// Повертає об'єкт оновленого контакту. Повертає null, якщо контакт з таким id не знайдений.
export async function updateContact(id, payload) {
    const contact = await getContactById(id);
    if (!contact) return null;
    await contact.update(payload);
    return contact;
}
