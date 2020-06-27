import { withPluginApi } from "discourse/lib/plugin-api";
import Composer from "discourse/components/d-editor";
import showModal from "discourse/lib/show-modal";

function initializePlugin(api) {
  const siteSettings = api.container.lookup("site-settings:main");

  if (siteSettings.giphy_enabled && siteSettings.giphy_api_key) {
    Composer.reopen({
      actions: {
        showGiphyModal: function() {
          showModal("giphy", { title: "giphy.modal_title" }).setProperties({
            composerView: this
          });
        }
      }
    });

    api.onToolbarCreate(toolbar => {
      toolbar.addButton({
        id: "giphy_button",
        group: "extras",
        icon: "far-play-circle",
        action: "showGiphyModal"
      });
    });
  }
}

export default {
  name: "giphy",
  initialize(container) {
    withPluginApi("0.1", initializePlugin);
  }
};
