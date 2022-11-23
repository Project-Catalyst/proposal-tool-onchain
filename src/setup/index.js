import "./dayjs";
import "./style";

import setupComponents from "./components";
import setupOruga from "./oruga";
import setupPinia from "./pinia";
import setupRouter from "./router";
import setupVueQuery from "./vueQuery";

export default function setup(app) {
  setupComponents(app);
  setupOruga(app);
  setupPinia(app);
  setupVueQuery(app);
  setupRouter(app);
  return app;
}
