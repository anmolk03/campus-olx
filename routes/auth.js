const router = require("express").Router();
const passport = require('passport')

router.get('/login/success', (req, res) => {
    if (req.user) {
        console.log("request for details")
        res.status(200).json({
            success: true,
            message: "successfull",
            user: req.user,
            //   cookies: req.cookies
        });
    }
    else {
        console.log("user logged out")
    }

});
router.get("/login/failed", (req, res) => {
    res.status(401).json({
        success: false,
        message: "failure",
    });
});
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("https://olx-clone-aman.herokuapp.com/");
  });




router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

router.get('/google/callback', passport.authenticate('google', {
    successRedirect: "https://olx-clone-aman.herokuapp.com/",
    failureRedirect: "/login/failed",
}));




router.get('/outlook', passport.authenticate('microsoft', {
    // https://graph.microsoft.com/v1.0/me/photo/$value,
    // scope: ['https://graph.microsoft.com/v1.0/me/photo/$value'],
    // scope: ['User.ReadBasic.All'],
    GET:" /me/photo/$value",
    prompt: 'select_account',
}));

router.get('/outlook/callback', passport.authenticate('microsoft', {
    successRedirect: "https://olx-clone-aman.herokuapp.com/",
    failureRedirect: "/login/failed",
}));

module.exports = router;