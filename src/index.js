// arranca la aplicación
import app from "./app";
import "./database";

// servidor
app.set("port", process.env.PORT || 4000);
app.listen(app.get("port"), () => {
    console.log("Server listen on port", app.get("port"));
});

/**
 * // heroku config
app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
 */