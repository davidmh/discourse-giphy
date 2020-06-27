# name: discourse-giphy
# about: giphy integration
# version: 0.1.0
# authors: David Mejorado, cpradio
# url: https://github.com/cpradio/discourse-giphy

enabled_site_setting :giphy_enabled

register_asset 'stylesheets/giphy.scss'

register_svg_icon 'far-play-circle' if respond_to?(:register_svg_icon)
