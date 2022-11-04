import { checkPermission } from "./restrictions.js";
import { exitPage } from "./localStorage.js";

const redirectUserPage = '/src/pages/userPage/index.html'

checkPermission(false, redirectUserPage)

exitPage()