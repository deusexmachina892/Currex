// config for admin form commons
export const ADMIN_CONFIG = [
    { label:'Commission' , name: 'commissionPct'},
    { label:'Surcharge' , name: 'surcharge'},
    { label:'Minimum Commission' , name: 'minCommission'},
    { label:'Margin' , name: 'margin'}
];

// config for modal display
export const DISPLAY_CONFIG = [
    'rate', 
    'subtotal', 
    'commission', 
    'totalBase'
];

// config for nav menu items
export interface NavMenuConfigProps{
    item: string,
    link: string
}
export const NAV_MENU_CONFIG = [
    {item: 'Home' , link: '/'},
    {item: 'Admin', link: '/admin'}
];

export const DATE_FORMAT = 'YYYY/MM/DD hh:mm:ss a';

// config for initial modal state
export const INITIAL_STATE = {
    rate: { title: 'Exchange Rate', value: '0' }, 
    subtotal: { title: 'Subtotal', value: '0'}, 
    commission: { title: 'Commission', value: '0' },
    totalBase: { title: 'Total', value: '0'},
    type: '',
    currency: '',
    currencyAmount: '',
    msg: {},
}