import Contact from "../db/models/Contact.js";


// Повертає масив контактів.
export function listContacts() {
    return Contact.findAll();
}

// Повертає об'єкт контакту з таким id.
export function getContactById(id) {
    return Contact.findByPk(id);
}

// Повертає об'єкт доданого контакту (з id).
export function addContact(payload) {
    return Contact.create(payload);
}


// Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
export function removeContact(id) {
    return Contact.destroy({
        where: {
            id
        }
    });
}

//
//
// export async function updateContact(id, payload) {
//     const allContacts = await listContacts();
//     const index = allContacts.findIndex(item => item.id === id);
//     if (index === -1) return null;
//     allContacts[index] = {...allContacts[index], ...payload};
//     await updateContacts(allContacts);
//     return allContacts[index];
// }
