declare global {
  interface Window {
    B3: any
    B3Local: any
    B3CustomConfig: any
    cartElementId: string
  }
}

interface ThemeElementsProps {
  [key: string]: string
}

const localConfig = () => {
  if (window?.B3) {
    return window.B3
  }

  return window.B3Local
}

const themeOtherElementConfig = () => {
  const originElement =
    '[href^="/account.php"],  [href^="/account.php"] .navUser-item-accountLabel, [href^="/account.php?action=address_book"], [href^="/account.php?action=order_status"], [href^="/account.php?action=account_details"], [href="/login.php"], [href="/login.php?action=create_account"]'
  let allOtherElement = originElement
  // Deadline: September 05, 2023--[Theme Camden and theme RightRope] and [Theme LifeStyle and theme Vault] require the same configuration, so only one is required
  // Camden: '[href="/account.php"] svg, [href="/account.php"] svg use, [href="/account.php"] span, [href="/account.php"], [href="/login.php"] span, [href="/login.php"] svg use, [href="/login.php"] svg, [href="/login.php"]'
  // Vault: '.navUser-item--account a, .navUser-item--account a svg',
  // Fortune: '[href="/login.php?action=create_account"]',
  // Pinnacle: Theme Pinnacle and NextGen are compatible with the theme LifeStyle;; Artisan、CoventGarden、 Artify: method compatible
  const themeElements: ThemeElementsProps = {
    Hera: '[href^="/account.php"] span, .account-item .account-action span svg, .account-item .account-action span svg use, [href^="/login.php?action=logout"], [href="/login.php"] .icon, .account-item .account-action span',
    RightRope:
      '[href="/account.php"] svg, [href="/account.php"] svg use, [href="/account.php"] span, [href="/account.php"], [href="/login.php"] span, [href="/login.php"] svg use, [href="/login.php"] svg, [href="/login.php"]',
    SuperMarket: '[href="/login.php"] span, [href="/account.php"] span',
    LifeStyle:
      '.navUser-item--account a, .navUser-item--account a svg, .navUser-section-sub .navUser-item .needsclick, .navUser-section-sub .navUser-item .needsclick svg, .navUser-section-sub .navUser-item .needsclick span, .navUser-section-sub .navUser-item a, .navUser-section-sub .navUser-item a svg, .navUser-section-sub .navUser-item a svg use, .navUser-section-sub .navUser-item a span',
    Chiara:
      '.navUser-item--more, #navUser-more-toggle, #navUser-more-toggle .navUser-item-icon, #navUser-more-toggle .navUser-item-icon svg, #navUser-more-toggle .navUser-item-icon svg use, #navUser-more-toggle .navUser-item-moreLabel, .header-top-item--login, .header-top-item--login .header-top-action, .header-top-item--logout, .header-top-item--logout [href^="/login.php?action=logout"]',
    HaloOne:
      '[href^="/account.php"] svg, [href^="/account.php"] svg path, [href="/login.php"] svg path',
    FinchUS: '[href^="/account.php"] img',
  }

  if (window?.B3CustomConfig) {
    const customConfig = window.B3CustomConfig['dom.allOtherElement']

    allOtherElement = allOtherElement.concat(',', customConfig)
  }

  const keys: string[] = Object.keys(themeElements)
  keys.forEach((key: string) => {
    allOtherElement = allOtherElement.concat(themeElements[key], ',')
  })
  allOtherElement = allOtherElement.slice(0, -1)

  return {
    'dom.allOtherElement': `${allOtherElement}`,
  }
}

const globalB3 = {
  'dom.registerElement':
    '[href^="/login.php"], #checkout-customer-login, [href="/login.php"] .navUser-item-loginLabel, #checkout-customer-returning .form-legend-container [href="#"]',
  'dom.registerUrl': '/register',
  'dom.checkoutRegisterParentElement': '#checkout-app',
  'dom.navUserLoginElement': '.navUser-item.navUser-item--account',
  'dom.setToQuote': '#form-action-addToCart',
  'dom.setToShoppingListParentEl': '#add-to-cart-wrapper',
  'dom.setToNoPuchasable': '#add-to-cart-wrapper',
  'dom.cartActions.container': '.cart-actions',
  'dom.openB3Checkout': 'checkout-customer-continue',
  'dom.cart':
    '[href="/cart.php"], #form-action-addToCart, [data-button-type="add-cart"], [data-emthemesmodez-cart-item-add]',
  'dom.productView': '.productView',
  'dom.register': '[href^="/login.php?action=create_account"]',
  before_login_goto_page: '/account.php?action=order_status',
  checkout_super_clear_session: 'true',
  setting: {
    b2b_url: 'https://api-b2b.staging.zone',
    b2b_socket_url: 'https://api-b2b.staging.zone',
    store_hash: `1l3zp8c753`,
    channel_id: 1,
    b2b_client_id: 'r2x8j3tn54wduq47b4efct5tqxio5z2',
  },
  ...localConfig(),
  ...(window?.B3CustomConfig || {}),
  ...themeOtherElementConfig(),
}

export default globalB3
