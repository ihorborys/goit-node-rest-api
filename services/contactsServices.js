import Contact from "../db/models/Contact.js";


// Повертає масив контактів.
export const listContacts = (where) => Contact.findAll({where});

// Повертає об'єкт контакту з таким id.
export const getContactById = where => Contact.findOne({where});

// Повертає об'єкт доданого контакту (з id).
export function addContact(payload) {
    return Contact.create(payload);
}

// Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
export const removeContact = async where => {
    const contact = await getContactById(where);
    if (!contact) return null;
    await contact.destroy();
    return contact;
};

// Повертає об'єкт оновленого контакту. Повертає null, якщо контакт з таким id не знайдений.
export const updateContact = async (where, payload) => {
    const contact = await getContactById(where);
    if (!contact) return null;
    await contact.update(payload);
    return contact;
};

export const updateStatusContact = async (where, body) => {
    const contact = await getContactById(where);
    if (!contact) return null;
    await contact.update(body);
    return contact;
};

