var ContactView = React.createClass({
    propTypes: {
        contacts: React.PropTypes.array.isRequired,
        id: React.PropTypes.string.isRequired
    },
    render: function() {
        var key = this.props.id;
        var contactForm = this.props.contacts.filter(function(contact) {
            return contact.key == key;
        })[0];

        return !contactForm ?
            React.createElement("h1", {}, "Not Found") :
            React.createElement("div", { className: "contactView" },
                React.createElement("h1", { className: "ContactView-title" }, "Edit Contact"),
                React.createElement(ContactForm, {
                    value: contactForm,
                    onChange: function() {},
                    onSubmit: function() {}
                }));
    }
});