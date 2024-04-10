import type { PluginAPI } from 'tailwindcss/types/config.d'

export const gridExtension = function({ addComponents }: PluginAPI) {
  const flexGrid = {
    '.flex-center': {
      'display': 'flex',
      'justify-content': 'center',
      'align-items': 'center',
    },
    '.flex-center-y': {
      'display': 'flex',
      'align-items': 'center',
    },
    '.flex-center-x': {
      'display': 'flex',
      'justify-content': 'center',
    },
    '.flex-center-col': {
      'display': 'flex',
      'justify-content': 'center',
      'align-items': 'center',
      'flex-direction': 'column',
    },
    '.flex-split': {
      'display': 'flex',
      'justify-content': 'space-between',
      'align-items': 'center',
    },
    '.absolute-full': {
      'position': 'absolute',
      'top': '0',
      'right': '0',
      'bottom': '0',
      'left': '0',
    },
  }

  addComponents(flexGrid)
}
