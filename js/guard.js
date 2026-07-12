(async () => {

    const { data, error } = await db.auth.getSession();

    if (error || !data.session) {

        location.replace("login.html");

    }

})();