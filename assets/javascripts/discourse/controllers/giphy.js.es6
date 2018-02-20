import ModalFunctionality from "discourse/mixins/modal-functionality";

const cache = {};

export default Ember.Controller.extend(ModalFunctionality, {
  loading: false,
  currentGifs: [],
  query: "",

  actions: {
    pick: function({ title, medium }) {
      const markdownImg = `\n![${title}](${medium})`;

      if (this.composerViewOld) {
        this.composerViewOld.addMarkdown(markdownImg);
      } else if (this.composerView) {
        this.composerView._addText(this.composerView._getSelected(), markdownImg);
      }

      this.send("closeModal");
    },
    refresh: function(q) {
      this.set("query", q);
      Ember.run.debounce(null, () => {
        const query = this.get("query");
        if (query && query.length > 2) {
          this.set("loading", true);
          const params = {
            url: this.getEndpoint(query)
          };

          if (query in cache) {
            this.get("currentGifs").setObjects(cache[query]);
            this.set("loading", false);
          } else {
            $.ajax(params).done(({ data = [] }) => {
              const images = data.map(gif => ({
                title: gif.title,
                preview: gif.images.fixed_height_small,
                medium: gif.images.downsized_medium.url
              }));
              // save it
              cache[query] = images;
              // and send it
              this.get("currentGifs").setObjects(images);
              this.set("loading", false);
            });
          }
        }
      }, 50, 50);
    }
  },

  onShow: function() {
    this.setProperties({
      loading: false,
      query: "",
    });
  },

  getEndpoint: function(query) {
    return "https://api.giphy.com/v1/gifs/search?" +
      $.param({
        api_key: this.siteSettings.giphy_api_key,
        lang: 'en',
        limit: 8,
        offset: 0,
        q: query,
        rating: 'G',
      });
  }
});
