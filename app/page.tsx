import QRClient from "@/components/QRClient/QRClient";
import styles from "@/components/QRClient/page.module.css"
export default function Home() {
  return (
    <div className={styles.page}>
    <main className={styles.main}>
      <QRClient />
    </main>
  </div>
  
);
}
