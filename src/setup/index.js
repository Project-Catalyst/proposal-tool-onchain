import setupComponents from "./components";
import setupOruga from "./oruga";
import setupPinia from "./pinia";
import setupVueQuery from "./vueQuery";
import setupRouter from "./router";
import "./dayjs";
import "./style";

export default function setup(app) {
  setupComponents(app);
  setupOruga(app);
  setupPinia(app);
  setupVueQuery(app);
  setupRouter(app);
  return app;
}
