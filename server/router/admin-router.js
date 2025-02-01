const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");
const {getAllUsers} = require("../controllers/admin-users-controller");
const getAllContacts = require('../controllers/admin-contact-controller');
const {getSingleUser} = require('../controllers/admin-users-controller')
const deleteUser = require("../controllers/admin-delete-user");
const {updateUserById} = require("../controllers/admin-users-controller");
const deleteMessage = require("../controllers/admin-contact-delete");
const {getAllServices, deleteService} = require("../controllers/admin-service-controller");
router.route("/users").get(authMiddleware,adminMiddleware,getAllUsers);
router.route("/contact").get(authMiddleware,adminMiddleware,getAllContacts);
router.route("/delete/:id").delete(deleteUser);
router.route("/users/:id").get(authMiddleware,adminMiddleware,getSingleUser);
router.route("/users/update/:id").patch(updateUserById)
router.route("/message/delete/:id").delete(deleteMessage)
router.route("/services").get(authMiddleware,adminMiddleware,getAllServices);
router.route("/services/delete/:id").delete(deleteService);
module.exports = router;