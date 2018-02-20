export default Ember.Component.extend({
  tagName: "span",
  classNames: ["giphy-imgwrap"],
  style: "display:inline-block;margin-bottom:3px;",

  click: function() {
    this.sendAction("pick", this.get("content"));
  },

  imagePath: function() {
    return this.get("content.preview.url");
  }.property("content.preview.url")
});
