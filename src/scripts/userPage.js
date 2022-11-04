import { checkPermission } from "./restrictions.js";
import { exitPage } from "./localStorage.js";

const redirectAdminPage = '/src/pages/adminPage/index.html'

checkPermission(true, redirectAdminPage)

exitPage()