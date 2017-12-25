/*
 * Constants
 */


var CONTACT_TEMPLATE = { name: "", email: "", description: "", errors: null }



/*
 * Model
 */


// The app's complete current state
var state = {};

// Make the given changes to the state and perform any required housekeeping
function setState(changes) {
    Object.assign(state, changes);

    var component;

    switch (state.location) {
        case "#/contacts":
            {
                component = React.createElement(ContactsView, Object.assign({}, state, {
                    onNewContactChange: updateNewContact,
                    onNewContactSubmit: submitNewContact,
                }));
            }
            break;
        default:
            {
                component = React.createElement("div", {},
                    React.createElement("h1", {}, "Not Found"),
                    React.createElement("a", { herf: "#/contacts" }, "contacts list")
                );
            }
            break;
    }
    ReactDOM.render(component, document.getElementById('react-app'));

}

function navigated() {
    setState({ location: window.location.hash });
}

window.addEventListener("hashchange", navigated, false);

document.addEventListener("load", function() {
    // Set initial data
    Object.assign(state, {
        contacts: [
            { key: 1, name: "James K Nelson", email: "james@jamesknelson.com", description: "Front-end Unicorn" },
            { key: 2, name: "Jim", email: "jim@example.com" },
        ],
        newContact: Object.assign({}, CONTACT_TEMPLATE),
        location: window.location.hash
    });

    navigated();
});

/*
 * Actions
 */


function updateNewContact(contact) {
    setState({ newContact: contact });
}


function submitNewContact() {
    var contact = Object.assign({}, state.newContact, { key: state.contacts.length + 1, errors: {} });

    if (!contact.name) {
        contact.errors.name = ["Please enter your new contact's name"]
    }
    if (!/.+@.+\..+/.test(contact.email)) {
        contact.errors.email = ["Please enter your new contact's email"]
    }

    setState(
        Object.keys(contact.errors).length === 0 ? {
            newContact: Object.assign({}, CONTACT_TEMPLATE),
            contacts: state.contacts.slice(0).concat(contact),
        } : { newContact: contact }
    )
}