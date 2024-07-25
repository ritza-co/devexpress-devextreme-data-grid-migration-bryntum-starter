import { GridWrapper } from "@/components/GridWrapper";
import "@bryntum/grid/grid.material.css";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <GridWrapper />
    </main>
  );
}
