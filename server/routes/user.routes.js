import express from "express";
import userCtrl from "../controllers/user.controller";
import authCtrl from "../controllers/auth.controller";

const router = express.Router();

router
  .route("/api/users")
  .get(userCtrl.list)
  .post(userCtrl.create);

router
  .route("/api/users/:userId")
  //simply more zzmiddleware, so first is require signin! by zzjwt, so if delete that, then no signin needed, zzwow, zzPowerful ((ℹ️ zzpp._06._y20.0208-1401))
  .get(authCtrl.requireSignin, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove);

//this will go FIRST! zzPowerful zzmagic ((ℹ️ zzpp._06._y20.0208-1947 ))
router.param("userId", userCtrl.userByID);

export default router;
