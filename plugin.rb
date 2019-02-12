# name: discourse-giphy
# about: giphy integration
# version: 0.0.1
# authors: David Mejorado
# url: https://github.com/davidmh/discourse-giphy

enabled_site_setting :giphy_enabled

register_asset 'stylesheets/giphy.scss'

register_svg_icon 'play-circle-o' if respond_to?(:register_svg_icon)
