import { faCartShopping, faPlus, faTruckFast, faUsers } from '@fortawesome/free-solid-svg-icons'

export const Links = [
    {
        name: "Users",
        path: "Users",
        icon: faUsers,
        role: '1995'
    },
    {
        name: "Add Users",
        path: "/dashboard/user/add",
        icon: faPlus,
        role: '1995'
    },
    {
        name: "Categories",
        path: "/dashboard/categories",
        icon: faCartShopping,
        role: ['1995', '1999']
    },
    {
        name: "Add Categories",
        path: "/dashboard/categorie/add",
        icon: faPlus,
        role: ['1995', '1999']
    },
    {
        name: "Products",
        path: "/dashboard/products",
        icon: faTruckFast,
        role: ['1995', '1999']
    },
    {
        name: "Add Products",
        path: "/dashboard/product/add",
        icon: faPlus,
        role: ['1995', '1999']
    },
    {
        name: "Writer",
        path: "/dashboard/writer",
        icon: faPlus,
        role: ['1996', '1995']
    }
]