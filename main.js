/*
 * Constants
 */


var CONTACT_TEMPLATE = { name: "", email: "", description: "", errors: null }



/*
 * Model
 */


// The app's complete current state
// Set initial data
var state = {
    contacts: [
        { key: 1, name: "James K Nelson", email: "james@jamesknelson.com", description: "Front-end Unicorn" },
        { key: 2, name: "Jim", email: "jim@example.com" },
    ],
    newContact: Object.assign({}, CONTACT_TEMPLATE),
    location: window.location.hash
};

// Make the given changes to the state and perform any required housekeeping
function setState(changes) {
    Object.assign(state, changes);

    var component;

    var actions = state.location.replace(/^#\/|\/$/g, "").split("/");

    if (!actions || actions.length === 0) {
        component = React.createElement("div", {},
            React.createElement("h1", {}, "Not Found"),
            React.createElement("a", { href: "#/contacts" }, "See Contacts")
        );
    } else {
        switch (actions[0]) {
            case "contacts":
                if (actions[1]) {
                    component = React.createElement(ContactView, {
                        contacts: state.contacts,
                        id: actions[1]
                    });
                } else {
                    component = React.createElement(ContactsView, Object.assign({}, state, {
                        onNewContactChange: updateNewContact,
                        onNewContactSubmit: submitNewContact,
                    }));
                }

                break;

            default:
                component = React.createElement("div", {},
                    React.createElement("h1", {}, "Not Found"),
                    React.createElement("a", { href: "#/contacts" }, "See Contacts")
                );

                break;
        }
    }

    ReactDOM.render(component, document.getElementById('react-app'));

}

function navigated() {
    setState({ location: window.location.hash });
}

window.addEventListener("hashchange", navigated, false);

document.addEventListener("load", function() {

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