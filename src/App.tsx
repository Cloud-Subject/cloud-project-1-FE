import Table from "./components/Layout/components/Table/Table";
import { DefaultLayout } from "./components/Layout/exportLayout";

import classNames from "classnames/bind";
import styles from "./App.module.scss";

const cx = classNames.bind(styles);

function App() {
  return (
    <DefaultLayout>
      <div className={cx("App")}>
        <Table></Table>
      </div>
    </DefaultLayout>
  );
}

export default App;
