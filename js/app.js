//Alias Jquery with $*/
(function ($) {

////////////////////////The data//////////////////////
    //Array of things*/
    var contacts = [
        { first_name: "Bob", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", product: "gloves", number: "IH932823h", amount: "15", price: "$10.99", type: "clothing" },
        { first_name: "Karrie", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", product: "gloves", number: "IH932823h", amount: "15", price: "$10.99", type: "hats" },
        { first_name: "James", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", product: "gloves", number: "IH932823h", amount: "15", price: "$10.99", type: "hats" },
        { first_name: "Eric", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", product: "gloves", number: "IH932823h", amount: "15", price: "$10.99", type: "socks" },
        { first_name: "Jeb", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", product: "gloves", number: "IH932823h", amount: "15", price: "$10.99", type: "animal" },
        { first_name: "Tim", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", product: "gloves", number: "IH932823h", amount: "15", price: "$10.99", type: "clothing" },
        { first_name: "Mark", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", product: "gloves", number: "IH932823h", amount: "15", price: "$10.99", type: "socks" },
        { first_name: "April", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", product: "gloves", number: "IH932823h", amount: "15", price: "$10.99", type: "hats" }
    ];
////////////////////////END the data//////////////////////

    //Create a model in Backbone just use Backbone.Model + .extend() method*/
    var Contact = Backbone.Model.extend({
    });

////////////////////////The Setup for collection//////////////////////
    //Collection is a Backbone class, extend will allow set properties and add behaviors*/
    var Directory = Backbone.Collection.extend({
        //model is used to tell the collection what class each item in the collection should be built from*/
        model: Contact
    });
////////////////////////END the Setup for collection//////////////////////

////////////////////////The Template support//////////////////////
    //View class of Backbone, */
    var ContactView = Backbone.View.extend({
        //tagName to specify the container for the view*/
        tagName: "tr",
        //className specifies a class name add to container*/
        className: "contact-container",
        //template stores a cached reference to the template, use jQuery to select*/
        //This template is on the index.html in js
        template: $("#contactTemplate").html(),

        //render function not automatica invoke unless initialize() method is used to make it self-render*/
        render: function () {
                //a template() method from Underscore.js will pass a stored tempalate. When passed a single argument, will return a method to render the template*/
                var tmpl = _.template(this.template);
                //Set HTML content of <article> element created by the view. Calls the templating function of Underscore.js return from above and passes the data.*/
                //Data is obtained from the model using Backbone's toJSON() method. Use $el to set the HTML content, which is a caches jQuery element for easy reference.*/
                $(this.el).html(tmpl(this.model.toJSON()));
                //this object points to the view instance that render() calls on.*/
                return this;
        }
    });
///////////////END the Template support//////////////////////

////////////////////////The data push to the HTML $el on the index.html//////////////////////
    //This view will be attached to an element that exists on the index.html*/
    var DirectoryView = Backbone.View.extend({
        //Select the element with jQuery and set it to el property*/
        el: $("#contacts"),

        //Simple initialize to create an instance of the collection class and calls render() method, it's now self rendering.*/
        initialize: function () {
                this.collection = new Directory(contacts);
                this.render();
        },

        //Define render() method for the master view.*/
        render: function () {
                var that = this;
                //_.each method will iterate over each model in the collection*/
                _.each(this.collection.models, function (item) {
                        //renderContact () passed current item to callback*/
                        that.renderContact(item);
                }, this);
        },
        //el property is of the DirectoryView master view, append the element created by the view's render() method to the $el property.*/
        //renderContact() method is defined by creating a new instance of ContactView class and set its model property to the item pass by the method.*/
        renderContact: function (item) {
                var contactView = new ContactView({
                        model: item
                });
                //In this el (#contacts) render the directory content in to the conteactView (the template)
                //Append those together for the $el
                this.$el.append(contactView.render().el);
        }
    });
////////////////////////END the data push to the HTML//////////////////////

////////////////////////Run the damn thing!//////////////////////
    //Initialize master view
    var directory = new DirectoryView();

} (jQuery));